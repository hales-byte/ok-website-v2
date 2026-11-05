#!/usr/bin/env python3
"""
TÜRKİYE KONTURU ÜRETİCİ — src/data/tr-kontur.ts dosyasını üretir.

Ana sayfa hero haritası (components/HeroHarita.tsx) 81 ilin tam path verisini
(tr-il-paths.ts, ~188 KB) sayfaya gömmez — G7d dersi: inline SVG payload'u
ana sayfanın HTML'ini şişirir. Bunun yerine illerin BİRLEŞİMİNDEN türetilmiş
tek bir sade Türkiye silueti (~7 KB) kullanılır.

Bu script BİR DEFALIK çalıştırılır; coğrafya değişmediği sürece çıktı sabittir.
Yalnız tr-il-paths.ts değişirse yeniden koşturulur.

Bağımlılık (repo bağımlılığı DEĞİL, tek seferlik):
    pip install shapely svgpathtools
Kullanım (repo kökünden):
    python3 scripts/tr-kontur-uret.py
"""
import re
import sys
from pathlib import Path

try:
    from svgpathtools import parse_path
    from shapely.geometry import Polygon, MultiPolygon
    from shapely.ops import unary_union
except ImportError:  # pragma: no cover
    sys.exit("shapely + svgpathtools gerekli: pip install shapely svgpathtools")

KOK = Path(__file__).resolve().parent.parent
KAYNAK = KOK / "src/data/tr-il-paths.ts"
HEDEF = KOK / "src/data/tr-kontur.ts"

ORNEKLEME_ADIMI = 3.0   # her ~3 birimde bir nokta (viewBox birimi)
SADELESTIRME = 1.5      # Douglas-Peucker toleransı (viewBox birimi)
MIN_PARCA_ALANI = 30    # bundan küçük adacıklar atılır (kırıntı)
MIN_IC_BOSLUK = 200     # bundan küçük iç boşluklar (göl) kapatılır

metin = KAYNAK.read_text(encoding="utf-8")
viewbox = re.search(r'TR_HARITA_VIEWBOX\s*=\s*"([^"]+)"', metin).group(1)
kayitlar = re.findall(r'\{\s*id:\s*"([^"]+)",\s*plaka:\s*(\d+),\s*ad:\s*"([^"]+)",\s*d:\s*"([^"]+)"\s*\}', metin)
assert len(kayitlar) == 81, f"81 il bekleniyordu, {len(kayitlar)} bulundu"


def poligonlar(d: str):
    parcalar = []
    for alt in parse_path(d).continuous_subpaths():
        n = max(12, int(alt.length() / ORNEKLEME_ADIMI))
        pts = [alt.point(i / n) for i in range(n)]
        poly = Polygon([(p.real, p.imag) for p in pts])
        if not poly.is_valid:
            poly = poly.buffer(0)
        if not poly.is_empty and poly.area > 1:
            parcalar.append(poly)
    return parcalar


hepsi = []
for _id, _plaka, _ad, d in kayitlar:
    hepsi.extend(poligonlar(d))

# İnce dikişleri kapat (küçük tampon ileri-geri), sonra sadeleştir
birlesim = unary_union(hepsi).buffer(0.6).buffer(-0.6)
sade = birlesim.simplify(SADELESTIRME, preserve_topology=True)
parcalar = list(sade.geoms) if isinstance(sade, MultiPolygon) else [sade]

kontur = ""
for g in parcalar:
    if g.area < MIN_PARCA_ALANI:
        continue
    kontur += "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in g.exterior.coords) + "Z"
    for ic in g.interiors:
        if Polygon(ic).area > MIN_IC_BOSLUK:
            kontur += "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in ic.coords) + "Z"

HEDEF.write_text(
    "/**\n"
    " * TÜRKİYE SİLUETİ (sade kontur) — scripts/tr-kontur-uret.py ÜRETİR, ELLE DÜZENLENMEZ.\n"
    " * Kaynak: src/data/tr-il-paths.ts (81 ilin birleşimi, sadeleştirilmiş).\n"
    " * Ana sayfa hero haritası (HeroHarita) bunu çizer; il sınırları yoktur, yalnız dış hat.\n"
    " * viewBox tr-il-paths ile aynı → il merkezleri (lib/il-merkez.ts) aynı koordinat düzlemindedir.\n"
    " */\n\n"
    f'export const TR_KONTUR_VIEWBOX = "{viewbox}";\n\n'
    f'export const TR_KONTUR_PATH =\n  "{kontur}";\n',
    encoding="utf-8",
)
print(f"yazıldı: {HEDEF.relative_to(KOK)} — {len(kontur)} karakter, {len(parcalar)} parça")
