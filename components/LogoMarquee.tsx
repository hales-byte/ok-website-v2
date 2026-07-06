import Image from "next/image";
import type { MarkaLogo } from "@/src/data/content/is-birlikleri";

/**
 * G3.1 — Logo akışı (marquee). Salt CSS animasyon: JS yükü yok,
 * server component olarak kalır.
 *
 * - Satır sayısı logo adedine göre: ≤40 → 2 satır, >40 → 3 satır
 *   (100 logo geldiğinde otomatik ölçeklenir).
 * - Satırlar zıt yönlerde akar; tur süreleri 20sn / 24sn (/ 22sn).
 * - Dikişsiz döngü için her satır içeriği iki kez basılır; ikinci kopya
 *   aria-hidden'dır ve reduced-motion'da gizlenir (globals.css).
 * - Fareyle üzerine gelince akış durur (.ok-marquee-band:hover kuralı).
 */

const TUR_SURELERI = [20, 24, 22]; // saniye/tur — Hakan onaylı tempo

function satirlaraBol(logolar: MarkaLogo[]): MarkaLogo[][] {
  const satirSayisi = logolar.length > 40 ? 3 : 2;
  const satirlar: MarkaLogo[][] = Array.from({ length: satirSayisi }, () => []);
  logolar.forEach((logo, i) => satirlar[i % satirSayisi].push(logo));
  return satirlar;
}

function Chip({ logo }: { logo: MarkaLogo }) {
  return (
    <div
      className="flex h-[76px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white transition-colors duration-300 hover:border-[var(--color-primary)]/60"
      title={logo.markaAdi}
    >
      <div className="relative h-8 w-[120px]">
        <Image
          src={`/logos/${logo.dosyaAdi}.png`}
          alt={logo.markaAdi}
          fill
          sizes="120px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function LogoMarquee({ logolar }: { logolar: MarkaLogo[] }) {
  const satirlar = satirlaraBol(logolar);

  return (
    <div className="ok-marquee-band flex flex-col gap-4">
      {satirlar.map((satir, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className="ok-marquee-track"
            style={{
              animation: `${i % 2 === 0 ? "ok-marquee-sol" : "ok-marquee-sag"} ${
                TUR_SURELERI[i % TUR_SURELERI.length]
              }s linear infinite`,
            }}
          >
            {/* İki ÖZDEŞ yarım — her biri kendi sonuna gap ekler (pr-4) →
                yarımlar eş genişlik, translateX(-50%) dikişsiz oturur.
                (Track gap'i 0; boşluk yarımların içinde: gap-4 + pr-4.) */}
            <div className="flex gap-4 pr-4">
              {satir.map((logo) => (
                <Chip key={logo.dosyaAdi} logo={logo} />
              ))}
            </div>
            <div aria-hidden="true" className="ok-marquee-dup flex gap-4 pr-4">
              {satir.map((logo) => (
                <Chip key={`dup-${logo.dosyaAdi}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
