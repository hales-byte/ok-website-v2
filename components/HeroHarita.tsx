import type { CSSProperties } from "react";
import { getIller, ilSlug, sayiTr, TOPLAM } from "@/src/data/envanter";
import { yogunlukEsikleri, yogunlukKovasi } from "@/src/data/yogunluk";
import { TR_KONTUR_PATH, TR_KONTUR_VIEWBOX } from "@/src/data/tr-kontur";
import { ilMerkezi } from "@/lib/il-merkez";

/**
 * G11 — Ana sayfa hero haritası: "il nabzı".
 *
 * Sade Türkiye silueti üzerinde envanterdeki her il bir nokta; iller batıdan
 * doğuya SIRAYLA yanar, yanında il adı + ünite sayısı belirir, döngü başa döner.
 * Hakan 05.11.2026'da dört varyant arasından bunu seçti.
 *
 * ENVANTERLE EŞLENİK — hiçbir şey elle yazılmaz:
 *  - il listesi, ünite sayıları, toplam il  → envanter.json (getIller / TOPLAM)
 *  - yoğunluk basamağı (nokta boyu/parlaklığı) → src/data/yogunluk.ts
 *    (/envanter haritasıyla AYNI eşikler)
 *  - nokta konumu → lib/il-merkez.ts (tr-il-paths siluetinden hesaplanır)
 *  - silüet → src/data/tr-kontur.ts (tr-il-paths'ten üretilmiş sade kontur, ~7 KB)
 *  Envanter değişince noktalar, etiketler, sıra ve döngü süresi kendiliğinden değişir.
 *
 * Teknik: SERVER COMPONENT, JS yok. Animasyon tamamen CSS — her ile kendi
 * gecikmesi (--d) ve ortak döngü süresi (--cycle) inline değişkenle verilir;
 * döngüye bağlı keyframe yüzdeleri il sayısından hesaplanıp bileşenin kendi
 * <style>'ında basılır (il sayısı değişince yüzdeler de değişir). Statik
 * kurallar app/globals.css "G11" bloğunda. prefers-reduced-motion: nabız ve
 * etiket kapanır, tüm noktalar sabit yanar.
 *
 * Yerleşim: SVG, viewBox oranında yer ayırır (aspect-ratio) → CLS 0.
 */

/** Bunun altındaki iller nabız + etiket ALMAZ, yalnız sönük nokta olarak durur.
 *  Havalimanı LED "stub" illeri (1-3 ünite) hero'da "İzmir · 1 ünite" diye öne
 *  çıkmasın; il envanterde kalır, toplam rakamlar değişmez. */
const NABIZ_ESIGI = 10;

/** Her ilin sahnede kalma süresi (saniye). Döngü = il sayısı × bu. */
const IL_PAYI_SN = 1.6;

/** Koyu zeminde yoğunluk, rampanın rengiyle değil parlaklığıyla okunur:
 *  basamak 0 (en seyrek) → %45, basamak 3 (en yoğun) → %100 cyan. Eşikler
 *  /envanter haritasıyla aynı (yogunluk.ts); yalnız gösterim koyu zemine uyarlı. */
const KOVA_OPAKLIK = [0.45, 0.62, 0.82, 1] as const;

/** Etiket, sağ kenara yakın illerde noktanın SOLUNA açılır (viewBox x eşiği). */
const ETIKET_SOLA_ESIGI = 760;

type CssDegisken = CSSProperties & Record<`--${string}`, string>;

export function HeroHarita({ className = "" }: { className?: string }) {
  const esikler = yogunlukEsikleri(getIller().map((i) => i.toplam));

  const noktalar = getIller().flatMap((il) => {
    const merkez = ilMerkezi(ilSlug(il.il));
    if (!merkez) return []; // siluet yoksa çizme — check-envanter bunu zaten yakalar
    const kova = yogunlukKovasi(il.toplam, esikler);
    return [{
      ad: il.il,
      toplam: il.toplam,
      x: merkez.x,
      y: merkez.y,
      r: 5 + Math.sqrt(il.toplam) * 0.13,
      opaklik: KOVA_OPAKLIK[Math.min(kova, KOVA_OPAKLIK.length - 1)],
    }];
  });

  // Batıdan doğuya sıra — göz haritayı soldan sağa okur
  const nabizli = noktalar.filter((n) => n.toplam >= NABIZ_ESIGI).sort((a, b) => a.x - b.x);
  const donguSn = nabizli.length * IL_PAYI_SN;
  const sira = new Map(nabizli.map((n, i) => [n.ad, i]));

  // Döngüye bağlı keyframe yüzdeleri: her ilin payı = 100 / il sayısı.
  // Etiket payın %15'inde tam görünür, %82'sinde solmaya başlar, %95'inde biter →
  // aynı anda tek etiket. Halka payın %85'inde dağılmış olur.
  const pay = 100 / Math.max(nabizli.length, 1);
  const y = (k: number) => (pay * k).toFixed(3);
  const keyframes = `
@keyframes hero-nabiz-halka{0%{opacity:.9;transform:scale(.3)}${y(0.85)}%{opacity:0;transform:scale(2.6)}100%{opacity:0;transform:scale(2.6)}}
@keyframes hero-nabiz-parla{0%{opacity:1}${y(0.82)}%{opacity:1}${y(0.95)}%{opacity:0}100%{opacity:0}}
@keyframes hero-nabiz-etiket{0%{opacity:0;transform:translateY(4px)}${y(0.15)}%{opacity:1;transform:translateY(0)}${y(0.82)}%{opacity:1}${y(0.95)}%{opacity:0;transform:translateY(0)}100%{opacity:0}}`;

  const degisken = (ad: string): CssDegisken | undefined => {
    const i = sira.get(ad);
    if (i === undefined) return undefined;
    // Negatif gecikme: i. il döngünün i×pay saniyesinde "şimdi" yanıyor olsun
    return { "--d": `${(-(donguSn - i * IL_PAYI_SN)).toFixed(1)}s`, "--cycle": `${donguSn.toFixed(1)}s` };
  };

  // Yer ayırma: viewBox oranı inline → ilk boyamadan önce yükseklik belli (CLS 0)
  const [, , vbW, vbH] = TR_KONTUR_VIEWBOX.split(" ").map(Number);

  return (
    <div className={`hero-harita ${className}`}>
      <style>{keyframes}</style>
      <svg
        viewBox={TR_KONTUR_VIEWBOX}
        style={{ aspectRatio: `${vbW} / ${vbH}` }}
        role="img"
        aria-label={`Türkiye haritası — envanterimizin bulunduğu ${TOPLAM.il} il`}
        className="hero-harita-svg"
      >
        <path className="hero-harita-kontur" d={TR_KONTUR_PATH} />
        <g className="hero-harita-noktalar">
          {noktalar.map((n) => {
            const d = degisken(n.ad);
            return (
              <g key={n.ad}>
                <circle className="hero-harita-nokta" cx={n.x} cy={n.y} r={n.r.toFixed(1)} style={{ opacity: n.opaklik }} />
                {d && (
                  <>
                    <circle className="hero-harita-halka" style={d} cx={n.x} cy={n.y} r={(n.r + 8).toFixed(1)} />
                    <circle className="hero-harita-parla" style={d} cx={n.x} cy={n.y} r={(n.r * 0.75).toFixed(1)} />
                  </>
                )}
              </g>
            );
          })}
        </g>
        {/* Etiketler noktaların ÜSTÜNDE çizilir; ekran okuyucuya tekrar okutulmaz */}
        <g className="hero-harita-etiketler" aria-hidden="true">
          {nabizli.map((n) => {
            const sola = n.x > ETIKET_SOLA_ESIGI;
            return (
              <text
                key={n.ad}
                className="hero-harita-etiket"
                style={degisken(n.ad)}
                x={sola ? n.x - n.r - 12 : n.x + n.r + 12}
                y={n.y + 8}
                textAnchor={sola ? "end" : "start"}
              >
                {n.ad}
                <tspan className="hero-harita-etiket-sayi" dx="8">{sayiTr(n.toplam)} ünite</tspan>
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
