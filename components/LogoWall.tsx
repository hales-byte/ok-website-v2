import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { MarkaLogo } from "@/src/data/content/is-birlikleri";

/**
 * Logo duvarı — responsive chip grid (5/4/3/2 sütun).
 *
 * Her chip: her iki temada da BEYAZ kart + ince border (logolar renkli/koyu
 * olabildiği için beyaz zemin okunurluğu garanti eder), hover'da hafif cyan
 * kenar + gölge, kart altında marka adı attribute'u. ScrollReveal ile yumuşak
 * kaskadlı giriş (satır içi 5'li dalga).
 *
 * Veri: src/data/content/is-birlikleri.ts (metin/logolar koda gömülmez).
 */
export function LogoWall({
  logolar,
  limit,
  className = "",
}: {
  /** Gösterilecek logolar (is-birlikleri.ts'ten) */
  logolar: MarkaLogo[];
  /** İlk N logo ile sınırla (ana sayfa 15; verilmezse tamamı) */
  limit?: number;
  className?: string;
}) {
  const items = typeof limit === "number" ? logolar.slice(0, limit) : logolar;

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}
    >
      {items.map((logo, i) => (
        <ScrollReveal
          key={logo.dosyaAdi}
          direction="up"
          // Satır içi 5'li kaskad (lg'de 5 sütun) — dalga etkisi
          delay={(i % 5) * 70}
          duration={600}
        >
          <div
            className="group flex h-full flex-col items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-[var(--color-primary)]/60 hover:shadow-md hover:shadow-[var(--color-primary)]/10"
            title={logo.markaAdi}
          >
            <div className="relative h-11 w-full md:h-12">
              <Image
                src={`/logos/${logo.dosyaAdi}.png`}
                alt={logo.markaAdi}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
                className="object-contain"
              />
            </div>
            <span className="text-center text-[11px] leading-tight text-slate-500">
              {logo.markaAdi}
            </span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
