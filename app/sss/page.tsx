import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { sayfaMeta } from "@/lib/seo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQ } from "@/components/FAQ";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  SSS_BASLIK,
  SSS_LISTESI,
  SSS_SAYFA,
  sssJsonLd,
} from "@/src/data/content/sss";

/**
 * /sss — Sıkça Sorulan Sorular (2026-11-24).
 * Ana sayfa sadeleşince SSS bölümü buraya taşındı; üst menüde "Kurumsal"
 * altında. İçerik ve FAQPage JSON-LD aynı kaynaktan: src/data/content/sss.ts.
 */
export const metadata: Metadata = sayfaMeta({
  title: SSS_SAYFA.metaBaslik,
  description: SSS_SAYFA.metaAciklama,
  path: "/sss",
});

export default function SSSPage() {
  return (
    <>
      {/* BAŞLIK */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-3xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-[var(--color-primary-deep)] font-medium">
                {SSS_BASLIK.eyebrow}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                {SSS_BASLIK.baslik}
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {SSS_BASLIK.altMetin}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SORULAR — native <details>, JS'siz açılır */}
      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <FAQ maddeler={SSS_LISTESI} />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sssJsonLd()) }}
      />

      {/* ALT ÇAĞRI */}
      <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              {SSS_SAYFA.altCta.baslik}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {SSS_SAYFA.altCta.metin}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <WhatsAppIcon size={18} />
                WhatsApp ile yaz
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
