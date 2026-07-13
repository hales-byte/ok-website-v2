import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TOPLAM } from "@/src/data/envanter";
import type { Metadata } from "next";
import { ANA_MECRALAR, HAVALIMANI_LED } from "@/lib/formats";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    `CLP, billboard, pole banner, megalight, LED ve giantboard — ${TOPLAM.mecra} mecra türü içinden ana mecralarla markanız için doğru açıkhava çözümü.`,
  alternates: { canonical: "https://objektifkriter.com.tr/hizmetler" },
  openGraph: {
    title: "Hizmetlerimiz — Objektif Kriter",
    description: `CLP, billboard, pole banner, megalight, LED ve giantboard — ${TOPLAM.mecra} mecra türüyle markanız için doğru açıkhava çözümü.`,
    url: "https://objektifkriter.com.tr/hizmetler",
    type: "website",
  },
};

export default function HizmetlerPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-3xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                Hizmetlerimiz
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Markanız için{" "}
                <span className="text-gradient">{ANA_MECRALAR.length} ana mecra</span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Yaya seviyesindeki CLP&apos;den otoyol billboard&apos;una, cadde boyu
                pole banner&apos;dan dijital LED&apos;e kadar — kampanyanız için
                doğru görünürlüğü birlikte buluyoruz. Toplam {TOPLAM.mecra} mecra türünün tamamı tek envanterde.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum.%20Mecralar%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp ile sor
                </a>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Net teklif briefiniz üzerinden 15 dakikada hazırlanır.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* HIZLI NAVIGASYON — pill butonlar */}
      <section className="py-8 sticky top-[73px] z-40 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {ANA_MECRALAR.map((format) => (
              <Link
                key={format.key}
                href={`#${format.key}`}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors"
              >
                {format.name}
              </Link>
            ))}
            <Link
              href="#havalimani"
              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors"
            >
              {HAVALIMANI_LED.name}
            </Link>
            <Link
              href="/mecralar"
              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors inline-flex items-center gap-1.5"
            >
              Diğer mecralar
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* MECRA BÖLÜMLERI - Apple tarzi buyuk gorsellerle */}
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {ANA_MECRALAR.map((format, index) => {
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
                          Mecra {String(index + 1).padStart(2, "0")}
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

                      <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link
                          href={`/teklif-al?format=${format.key}`}
                          className="btn-primary text-sm py-2.5 px-5"
                        >
                          {format.name} fiyatı sor
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] pt-1">
                        <Clock size={11} aria-hidden="true" />
                        15 dakika içinde yanıt
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* HAVALİMANI LED — ayrı mecra değil, LED & Dijital ailesinin
                    premium alt bölümü (Hakan kararı, 2026-07-12). Eski
                    #havalimani çapaları buraya iner. */}
                {format.key === "led" && (
                  <ScrollReveal direction="up" delay={150} duration={900}>
                    <div
                      id="havalimani"
                      className="mt-14 scroll-mt-32 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 p-6 md:p-10"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                              <HAVALIMANI_LED.icon
                                size={24}
                                className="text-[var(--color-primary)]"
                              />
                            </div>
                            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                              LED &amp; Dijital ailesinin premium yüzü
                            </div>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                            {HAVALIMANI_LED.name}
                          </h3>
                          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                            {HAVALIMANI_LED.description}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            Tipik kullanım:{" "}
                            <span className="text-[var(--color-text-primary)]">
                              {HAVALIMANI_LED.useCases}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-4">
                          <ul className="space-y-2">
                            {HAVALIMANI_LED.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-3">
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
                          <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                            <Link
                              href="/teklif-al?format=led"
                              className="btn-primary text-sm py-2.5 px-5"
                            >
                              {HAVALIMANI_LED.name} fiyatı sor
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                          <p className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                            <Clock size={11} aria-hidden="true" />
                            15 dakika içinde yanıt
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )}
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
                Hangi mecra kampanyanıza uyar?
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Hedefinizi ve bütçenizi paylaşın, size en uygun mecra ve
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
