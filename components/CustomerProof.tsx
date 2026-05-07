import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { CUSTOMER_LOGOS, CASE_STUDIES } from "@/lib/customers";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getFormatLabel } from "@/lib/formats";

const SEGMENT_LABEL: Record<"marka" | "ajans" | "ilk-kez", string> = {
  marka: "Marka",
  ajans: "Ajans",
  "ilk-kez": "İlk Kampanya",
};

/**
 * Sosyal kanıt bölümü: müşteri logo şeridi + 1-3 mini case study.
 * Veri (lib/customers.ts) boşsa hiçbir şey render etmez — fake gösterim olmaz.
 */
export function CustomerProof() {
  const hasLogos = CUSTOMER_LOGOS.length > 0;
  const hasCases = CASE_STUDIES.length > 0;

  if (!hasLogos && !hasCases) {
    return null;
  }

  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="container-narrow space-y-20">
        {/* LOGO ŞERİDİ */}
        {hasLogos && (
          <ScrollReveal direction="up">
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                  Bizimle çalışıyorlar
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  Türkiye&apos;nin yetkin markaları ve ajanslarıyla yan yanayız
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-80">
                {CUSTOMER_LOGOS.map((logo) => (
                  <div
                    key={logo.file}
                    className="relative h-10 md:h-12 w-32 md:w-40 grayscale hover:grayscale-0 transition-all"
                    title={logo.name}
                  >
                    <Image
                      src={`/customers/${logo.file}`}
                      alt={logo.name}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* CASE STUDIES */}
        {hasCases && (
          <div className="space-y-12">
            <ScrollReveal direction="up">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                  Vaka çalışmaları
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  Sokağa çıkardığımız hikayeler
                </h2>
                <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                  Markalar, ajanslar ve sokağa ilk adımını atan girişimler için
                  yürüttüğümüz kampanyalardan kısa kesitler.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_STUDIES.map((cs, i) => (
                <ScrollReveal
                  key={cs.title}
                  direction="up"
                  delay={i * 100}
                  duration={700}
                >
                  <article className="h-full p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:shadow-lg transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-medium">
                        {SEGMENT_LABEL[cs.segment]}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {cs.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight mb-3">
                      {cs.title}
                    </h3>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 flex-grow">
                      {cs.oneLiner}
                    </p>

                    <div className="space-y-2 text-xs text-[var(--color-text-muted)] mb-5">
                      <div>
                        <span className="font-medium text-[var(--color-text-secondary)]">
                          Format:
                        </span>{" "}
                        {cs.formats.map(getFormatLabel).join(", ")}
                      </div>
                      <div>
                        <span className="font-medium text-[var(--color-text-secondary)]">
                          Şehir:
                        </span>{" "}
                        {cs.cities.join(", ")}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-start gap-3">
                      <Quote
                        size={16}
                        className="text-[var(--color-primary)] shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                        {cs.outcome}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up">
              <div className="text-center pt-4">
                <Link
                  href="/teklif-al"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium inline-flex items-center gap-2 group"
                >
                  Sıradaki hikaye sizinki olsun — teklif alın
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}
