/**
 * İL ZOOM HARİTASI — o ile odaklanan statik SVG.
 *
 * Tasarım kararları:
 * - Server component: sıfır client JS, dış servis yok (Mapbox YASAK).
 * - Koordinat/pin YOK — sadece ilin silueti vurgulanır; kapsama bilgisi
 *   envanter.json'dan türetilen rakamlarla verilir (elle rakam yazılmaz).
 * - /envanter'deki 81 ilin tamamı burada ÇİZİLMEZ: tr-il-paths.ts 188 KB'dir,
 *   hepsini her il sayfasına gömmek LCP'yi bozardı. Sadece hedef il + görüş
 *   alanına giren komşular çizilir (bağlam korunur, ağırlık düşer).
 * - CLS koruması: çerçeve her ilde SABİT 16/10 oranındadır (viewBox ile
 *   harmanlanır, kap ile değil) → il şekli ne olursa olsun ayrılan yer aynı,
 *   yerleşim kaymaz. `content-visibility: auto` + `contain-intrinsic-size`
 *   fold altındaki çizim maliyetini erteler (inline SVG'de lazy'nin karşılığı).
 */

import { MapPin } from "lucide-react";
import { TR_IL_PATHS } from "@/src/data/tr-il-paths";
import { sayiTr, lokatifEk } from "@/src/data/envanter";

/** Çerçeve en/boy oranı — tüm il sayfalarında aynı (CLS güvencesi). */
const ORAN = 16 / 10;
/** Bbox'ın etrafına bırakılan pay (ilin sınırları kenara yapışmasın). */
const PAY = 0.12;

type Kutu = { x0: number; y0: number; x1: number; y1: number };

/** Path (d) verisinden sınırlayıcı kutu. Veri yalnız M/L/C/z kullanır →
 *  tüm sayılar x,y çiftidir, ikişer okumak birebir doğrudur. */
function bbox(d: string): Kutu {
  const n = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < n.length; i += 2) {
    if (n[i] < x0) x0 = n[i];
    if (n[i] > x1) x1 = n[i];
    if (n[i + 1] < y0) y0 = n[i + 1];
    if (n[i + 1] > y1) y1 = n[i + 1];
  }
  return { x0, y0, x1, y1 };
}

const kesisiyor = (a: Kutu, b: Kutu) =>
  a.x0 <= b.x1 && a.x1 >= b.x0 && a.y0 <= b.y1 && a.y1 >= b.y0;

/** Hedef ilin kutusunu payla genişletip sabit orana oturtur. */
function gorusAlani(k: Kutu): Kutu {
  const payX = (k.x1 - k.x0) * PAY;
  const payY = (k.y1 - k.y0) * PAY;
  let { x0, y0, x1, y1 } = { x0: k.x0 - payX, y0: k.y0 - payY, x1: k.x1 + payX, y1: k.y1 + payY };
  const g = x1 - x0;
  const y = y1 - y0;
  // Kısa kenarı büyüterek orana getir — il asla kırpılmaz, sadece etrafı açılır.
  if (g / y < ORAN) {
    const hedef = y * ORAN;
    const fark = (hedef - g) / 2;
    x0 -= fark;
    x1 += fark;
  } else {
    const hedef = g / ORAN;
    const fark = (hedef - y) / 2;
    y0 -= fark;
    y1 += fark;
  }
  return { x0, y0, x1, y1 };
}

export function IlHarita({
  slug,
  ilAdi,
  unite,
  mecraSayisi,
}: {
  slug: string;
  ilAdi: string;
  /** Envanterdeki ünite adedi (kaynak: envanter.json) */
  unite: number;
  /** İlde bulunan mecra türü adedi (kaynak: envanter.json) */
  mecraSayisi: number;
}) {
  const hedef = TR_IL_PATHS.find((p) => p.id === slug);
  if (!hedef) return null;

  const alan = gorusAlani(bbox(hedef.d));
  const viewBox = `${alan.x0} ${alan.y0} ${alan.x1 - alan.x0} ${alan.y1 - alan.y0}`;
  // Görüş alanına giren komşular — yalnız bağlam için, soluk çizilir.
  const komsular = TR_IL_PATHS.filter(
    (p) => p.id !== slug && kesisiyor(bbox(p.d), alan)
  );

  return (
    <section className="py-20 border-t border-[var(--color-border-subtle)]">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-primary)] uppercase tracking-wider">
              <MapPin size={14} />
              Kapsama
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {ilAdi}
              {lokatifEk(ilAdi)} nerede yayın yapıyoruz?
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {ilAdi} envanterimiz {sayiTr(unite)} üniteyle {mecraSayisi} mecra
              türüne yayılıyor. Lokasyon listesini talebinize göre çıkarıyoruz.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 overflow-hidden">
            <div
              className="relative w-full aspect-[16/10]"
              style={{ contentVisibility: "auto", containIntrinsicSize: "800px 500px" }}
            >
              <svg
                viewBox={viewBox}
                className="absolute inset-0 w-full h-full"
                role="img"
                aria-label={`${ilAdi} konum haritası — il sınırları vurgulanmış`}
              >
                {komsular.map((p) => (
                  <path
                    key={p.id}
                    d={p.d}
                    fill="var(--color-surface-elevated)"
                    fillOpacity={0.55}
                    stroke="var(--color-border-subtle)"
                    strokeWidth={0.6}
                  />
                ))}
                <path
                  d={hedef.d}
                  fill="var(--color-primary)"
                  fillOpacity={0.85}
                  stroke="var(--color-primary-darker)"
                  strokeWidth={1.1}
                />
              </svg>
            </div>
            {/* Kapsama özeti — rakamlar envanter.json'dan türetilir */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4 border-t border-[var(--color-border-subtle)] text-sm">
              <span className="font-semibold text-[var(--color-text-primary)]">
                {ilAdi}
              </span>
              <span className="text-[var(--color-text-secondary)]">
                {sayiTr(unite)} reklam ünitesi
              </span>
              <span className="text-[var(--color-text-secondary)]">
                {mecraSayisi} mecra türü
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
