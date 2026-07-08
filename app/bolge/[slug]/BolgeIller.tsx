/**
 * Bölge sayfası "kapsanan iller" bloğu.
 * - Standalone il → kendi zengin /sehir sayfasına link.
 * - Taşınan il → /teklif-al?sehir=<il> (talep yakalama: İzmir/Kocaeli gibi çok
 *   aranan ama ince iller ziyan olmasın, il adıyla teklife yönlensin).
 */
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { sayiTr } from "@/src/data/envanter";
import type { BolgeIl } from "@/src/data/bolgeler";

export function BolgeIller({ iller }: { iller: BolgeIl[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {iller.map((i) => {
        const href = i.standalone ? `/sehir/${i.slug}` : `/teklif-al?sehir=${encodeURIComponent(i.il)}`;
        return (
          <Link
            key={i.slug}
            href={href}
            className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] transition-colors hover:border-[var(--color-primary)] flex items-center justify-between gap-3"
          >
            <div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)]">{i.il}</div>
              <div className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                {sayiTr(i.toplam)} ünite
                {!i.standalone && " · teklif al"}
              </div>
            </div>
            {i.standalone ? (
              <ChevronRight size={18} className="shrink-0 text-[var(--color-primary)]" />
            ) : (
              <ArrowRight size={16} className="shrink-0 text-[var(--color-text-muted)]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
