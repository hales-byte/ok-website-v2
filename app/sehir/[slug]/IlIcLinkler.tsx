/**
 * İl sayfası iç linkleri — yakındaki iller + ilin mecra sayfaları.
 * Salt sunum; veri page.tsx'te il-derive'dan türetilir. SEO iç link ağı.
 */
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { sayiTr } from "@/src/data/envanter";
import type { BolgeMeta } from "@/src/data/bolgeler";
import type { KomsuIl, MecraLink } from "./il-derive";

export function IlIcLinkler({
  sehir,
  slug,
  komsular,
  mecraSayfalari,
  bolge,
}: {
  sehir: string;
  slug: string;
  komsular: KomsuIl[];
  mecraSayfalari: MecraLink[];
  bolge?: BolgeMeta;
}) {
  if (komsular.length === 0 && mecraSayfalari.length === 0 && !bolge) return null;

  return (
    <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30">
      <div className="container-narrow space-y-10">
        {komsular.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
              Yakındaki iller
            </div>
            <div className="flex flex-wrap gap-3">
              {komsular.map((k) => (
                <Link
                  key={k.slug}
                  href={`/sehir/${k.slug}`}
                  className="px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {k.il}
                  <span className="text-[var(--color-text-muted)]"> · {sayiTr(k.toplam)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        {mecraSayfalari.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
              {sehir} mecra sayfaları
            </div>
            <div className="flex flex-wrap gap-3">
              {mecraSayfalari.map((m) => (
                <Link
                  key={m.pageKey}
                  href={`/sehir/${slug}/${m.pageKey}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {sehir} {m.label}
                  <ChevronRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        )}
        {bolge && (
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
              Bölge
            </div>
            <Link
              href={`/bolge/${bolge.slug}`}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Tüm {bolge.ad} bölgesi envanteri
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
