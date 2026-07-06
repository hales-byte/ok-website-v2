/**
 * SSS akordeonu — native <details>/<summary>: JS'siz çalışır, erişilebilir,
 * hydration yükü yok. İçerik src/data/content/sss.ts'ten gelir.
 */
import { ChevronDown } from "lucide-react";
import type { SSSMaddesi } from "@/src/data/content/sss";

export function FAQ({ maddeler }: { maddeler: SSSMaddesi[] }) {
  return (
    <div className="max-w-3xl space-y-3">
      {maddeler.map((m) => (
        <details
          key={m.soru}
          className="group rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] open:border-[var(--color-primary)]/40"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-left text-base font-medium text-[var(--color-text-primary)] [&::-webkit-details-marker]:hidden">
            {m.soru}
            <ChevronDown
              size={18}
              className="shrink-0 text-[var(--color-primary)] transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">
            {m.cevap}
          </div>
        </details>
      ))}
    </div>
  );
}
