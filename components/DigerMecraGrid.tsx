import Image from "next/image";
import { DIGER_MECRALAR } from "@/src/data/content/diger-mecralar";
import { getFormatToplam, getFormatIller, sayiTr } from "@/src/data/envanter";

/**
 * /mecralar sayfası — "Diğer mecralarımız" grid'i.
 * (Ana sayfadaki eski G4b akordeonunun yerine geçti; artık her zaman açık.)
 * Adetler ve il listesi envanter.json'dan otomatik türetilir;
 * adedi 0 olan mecra kendiliğinden gizlenir.
 */
export function DigerMecraGrid() {
  const mecralar = DIGER_MECRALAR.map((m) => ({
    ...m,
    adet: getFormatToplam(m.envanterAd),
    iller: getFormatIller(m.envanterAd),
  })).filter((m) => m.adet > 0);

  if (mecralar.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mecralar.map((m) => {
        const gorunenIller = m.iller.slice(0, 3);
        const kalanIl = m.iller.length - gorunenIller.length;
        return (
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
                {m.donem && (
                  <span className="shrink-0 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary-deep,var(--color-primary))]">
                    {m.donem}
                  </span>
                )}
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
              <p className="mt-auto pt-2 text-xs text-[var(--color-text-muted)]">
                {gorunenIller.map((x) => x.il).join(", ")}
                {kalanIl > 0 ? ` +${kalanIl} il` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
