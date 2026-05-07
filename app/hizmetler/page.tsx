import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { FORMATLAR } from "@/lib/formats";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Billboard, CLP, megalight, LED, giantboard, pole banner, totem ve havalimanı reklamları — 8 OOH formatıyla markanız için doğru çözüm.",
};

export default function HizmetlerPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000}>
            <div className="max-w-3xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                Hizmetlerimiz
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Markanız için{" "}
                <span className="text-gradient">{FORMATLAR.length} ayrı format</span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Klasik billboard&apos;dan dijital LED&apos;e, premium havalimanı
                ekranından yaya seviyesindeki CLP&apos;ye kadar — kampanyanız için
                doğru görünürlüğü birlikte buluyoruz.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* HIZLI NAVIGASYON — pill butonlar */}
      <section className="py-8 sticky top-[73px] z-40 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {FORMATLAR.map((format) => (
              <Link
                key={format.key}
                href={`#${format.key}`}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors"
              >
                {format.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT BÖLÜMLERI - Apple tarzi buyuk gorsellerle */}
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {FORMATLAR.map((format, index) => {
          const Icon = format.icon;
          const reverse = index % 2 === 1;

          return (
            <section
              key={format.key}
              id={format.key}
              className="py-20 md:py-28 scroll-mt-32"
            >
              <div className="container-narrow">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* GÖRSEL veya FALLBACK */}
                  <ScrollReveal
                    direction={reverse ? "right" : "left"}
                    duration={900}
                  >
                    {format.image ? (
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-xl">
                        <Image
                          src={`/images/formats/${format.image}.jpg`}
                          alt={`${format.name} reklam örneği`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                    ) : (
                      // Görsel yoksa estetik fallback
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center">
                        <div className="text-center space-y-4 p-8">
                          <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--color-primary)]/15 flex items-center justify-center">
                            <Icon size={40} className="text-[var(--color-primary)]" />
                          </div>
                          <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                            {format.name}
                          </div>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>

                  {/* METİN */}
                  <ScrollReveal
                    direction={reverse ? "left" : "right"}
                    delay={150}
                    duration={900}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <Icon size={24} className="text-[var(--color-primary)]" />
                        </div>
                        <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                          Format {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                          {format.name}
                        </h2>
                        <p className="text-lg text-[var(--color-primary)]">
                          {format.tagline}
                        </p>
                      </div>

                      <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {format.description}
                      </p>

                      {/* Avantajlar */}
                      <ul className="space-y-2 pt-2">
                        {format.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-1 w-5 h-5 rounded-full bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
                              <Check
                                size={12}
                                className="text-[var(--color-primary)]"
                              />
                            </div>
                            <span className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="text-sm">
                          <span className="text-[var(--color-text-muted)]">
                            Tipik kullanım:{" "}
                          </span>
                          <span className="text-[var(--color-text-primary)]">
                            {format.useCases}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/teklif-al"
                          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium inline-flex items-center gap-2 group"
                        >
                          {format.name} için teklif al
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Hangi format kampanyanıza uyar?
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Hedefinizi ve bütçenizi paylaşın, size en uygun format ve
                lokasyon kombinasyonunu önerelim. İlk açıkhava kampanyanız mı,
                yoksa süregelen bir strateji mi — Brief&apos;iniz olsun olmasın,
                doğru kombinasyonu birlikte buluyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
                  <ArrowRight size={18} />
                </Link>
                <Link href="/envanter" className="btn-secondary">
                  Envanteri Gör
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
