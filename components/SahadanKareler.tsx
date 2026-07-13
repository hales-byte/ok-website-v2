import Image from "next/image";
import {
  getSehirFotolar,
  SAHADAN_METIN,
} from "@/src/data/content/sehir-fotolar";

/**
 * R3 — Şehir sayfası "Sahadan Kareler" şeridi.
 * - Salt CSS marquee: LogoMarquee ile aynı altyapı (ok-marquee-track,
 *   hover'da durma, reduced-motion'da statik sarmal — globals.css).
 * - Kart çerçevesi (Hakan onayı, 13.07): koyu lacivert mat (--color-ink üstünde
 *   koyu kart) + ince beyaz iç kenar + sağ altta cyan chevron imzası +
 *   DİK köşeler (yuvarlama yok). İl·mecra bilgisi görsele gömülmez;
 *   mecra etiketi kartın altında metin olarak durur.
 * - Kart yüksekliği sabit, genişlik fotoğraf oranından gelir → dikey kareler
 *   kırpılmadan akar; w/h önceden bilindiği için CLS 0.
 * - Kısa listelerde dikişsiz döngü için içerik yeterli genişliğe ulaşana
 *   kadar tekrarlanır (yarım başına min ~2400px).
 */

const KART_YUKSEKLIK = 240; // px — foto alanı yüksekliği (çerçeve hariç)
const TUR_SURESI_TABAN = 45; // sn — logo şeridinden yavaş, foto okunsun

function Chevronlar() {
  return (
    <svg width="42" height="14" viewBox="0 0 42 14" aria-hidden="true">
      {[0, 14, 28].map((x, i) => (
        <path
          key={x}
          d={`M${x + 2} 1 L${x + 12} 7 L${x + 2} 13`}
          fill="none"
          stroke={["#9BEFFB", "#4DE9FF", "#00E4FF"][i]}
          strokeWidth="3.2"
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}

export function SahadanKareler({ slug, ilAdi }: { slug: string; ilAdi: string }) {
  const fotolar = getSehirFotolar(slug);
  if (fotolar.length === 0) return null;

  // Kart genişlikleri (foto oranından) → yarım genişliği; dikişsiz döngü
  // için içeriği min genişliğe ulaşana dek tekrarla.
  const genislikler = fotolar.map((f) =>
    Math.round((KART_YUKSEKLIK * f.w) / f.h)
  );
  const setGenislik = genislikler.reduce((a, b) => a + b + 16, 0); // gap ~16px
  const tekrar = Math.max(1, Math.ceil(2400 / Math.max(setGenislik, 1)));
  const liste = Array.from({ length: tekrar }, () => fotolar).flat();
  const turSuresi = Math.max(30, Math.round((setGenislik * tekrar) / 90));

  const Yarim = ({ dup }: { dup?: boolean }) => (
    <div
      aria-hidden={dup ? "true" : undefined}
      className={`flex gap-4 pr-4 ${dup ? "ok-marquee-dup" : ""}`}
    >
      {liste.map((f, i) => {
        const kw = Math.round((KART_YUKSEKLIK * f.w) / f.h);
        return (
          <figure
            key={`${dup ? "d-" : ""}${i}-${f.dosya}`}
            className="shrink-0 m-0"
          >
            {/* Çerçeve: koyu mat + dik köşeler + alt bantta chevron */}
            <div className="bg-[#060B14] p-[6px] pb-0 shadow-xl shadow-black/30">
              <div className="relative border border-white/80" style={{ width: kw, height: KART_YUKSEKLIK }}>
                <Image
                  src={`/images/sehir/${slug}/${f.dosya}`}
                  alt={`${ilAdi} ${f.mecra} reklam uygulaması — saha fotoğrafı`}
                  width={kw}
                  height={KART_YUKSEKLIK}
                  sizes={`${kw}px`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex h-8 items-center justify-end px-2">
                <Chevronlar />
              </div>
            </div>
            <figcaption className="pt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              {f.mecra}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );

  return (
    <div className="ok-marquee-band overflow-hidden">
      <div
        className="ok-marquee-track"
        style={{ animation: `ok-marquee-sol ${turSuresi}s linear infinite` }}
      >
        <Yarim />
        <Yarim dup />
      </div>
      <p className="sr-only">{SAHADAN_METIN.aciklama}</p>
    </div>
  );
}
