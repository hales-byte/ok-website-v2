import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  EK_MECRALAR,
  EK_MECRALAR_BASLIK,
} from "@/src/data/content/ek-mecralar";
import { getFormatToplam, sayiTr } from "@/src/data/envanter";

/**
 * G4b — "+12 mecra" genişletilebilir grid'i.
 * Native <details> ile açılır (JS'siz, FAQ ile aynı desen).
 * Adetler envanter.json'dan otomatik; adet 0 olan mecra kendiliğinden gizlenir.
 */
export function EkMecraGrid() {
  const mecralar = EK_MECRALAR.map((m) => ({
    ...m,
    adet: getFormatToplam(m.envanterAd),
  })).filter((m) => m.adet > 0);

  if (mecralar.length === 0) return null;

  return (
    <details className="group mt-10">
      <summary className="flex cursor-pointer list-none flex-col items-center gap-2 text-center [&::-webkit-details-marker]:hidden">
        <span className="text-base text-[var(--color-text-secondary)]">
          {EK_MECRALAR_BASLIK.ozet}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
          {EK_MECRALAR_BASLIK.butonAc}
          <ChevronDown
            size={16}
            className="transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mecralar.map((m) => (
          <div
            key={m.envanterAd}
            className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
          >
            {m.gorsel && (
              <div className="relative h-36 w-full">
                <Image
                  src={`/images/formats/${m.gorsel}.jpg`}
                  alt={`${m.ad} örnek uygulama`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold">{m.ad}</h3>
                <span className="shrink-0 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary-deep,var(--color-primary))]">
                  {m.donem}
                </span>
              </div>
              <div className="text-2xl font-bold text-gradient">
                {sayiTr(m.adet)}
                <span className="ml-1 text-xs font-normal uppercase tracking-widest text-[var(--color-text-muted)]">
                  ünite
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {m.aciklama}
              </p>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
