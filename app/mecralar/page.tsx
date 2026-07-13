import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DigerMecraGrid } from "@/components/DigerMecraGrid";
import { ANA_MECRALAR } from "@/lib/formats";
import { TOPLAM, sayiTr } from "@/src/data/envanter";
import {
  MECRALAR_HERO,
  MECRALAR_ANA_BOLUM,
  MECRALAR_DIGER_BOLUM,
  MECRALAR_CTA,
} from "@/src/data/content/mecralar";

export const metadata: Metadata = {
  title: "Mecralarımız — Tüm Açıkhava Reklam Mecraları",
  description: `Billboard, CLP, pole banner, megalight, LED ve giantboard'un yanında alınlık, luna, megaboard, tramvay kaplama ve daha fazlası — ${TOPLAM.mecra} mecra türü, ${sayiTr(TOPLAM.unite)} reklam ünitesi tek envanterde.`,
  alternates: { canonical: "https://objektifkriter.com.tr/mecralar" },
  openGraph: {
    title: "Mecralarımız — Objektif Kriter",
    description: `${TOPLAM.mecra} mecra türü, ${sayiTr(TOPLAM.unite)} reklam ünitesi — Türkiye genelinde tek envanter.`,
    url: "https://objektifkriter.com.tr/mecralar",
    type: "website",
  },
};

export default function MecralarPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-3xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                {MECRALAR_HERO.etiket}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                {MECRALAR_HERO.baslikOn}{" "}
                <span className="text-gradient">
                  {TOPLAM.mecra} {MECRALAR_HERO.baslikVurgu}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {MECRALAR_HERO.aciklama}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
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

      {/* ANA MECRALAR — kompakt kartlar, detay Hizmetler'de */}
      <section className="py-20">
        <div className="container-narrow space-y-10">
          <ScrollReveal direction="up">
            <div className="max-w-2xl space-y-4">
              <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium">
                {MECRALAR_ANA_BOLUM.etiket}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {MECRALAR_ANA_BOLUM.baslik}
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                {MECRALAR_ANA_BOLUM.aciklama}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ANA_MECRALAR.map((mecra) => {
                const Icon = mecra.icon;
                return (
                  <div
                    key={mecra.key}
                    className="flex flex-col gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-[var(--color-primary)]" />
                      </div>
                      <h3 className="text-lg font-semibold">{mecra.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {mecra.tagline}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                      <Link
                        href={`/hizmetler#${mecra.key}`}
                        className="text-sm font-medium text-[var(--color-primary-deep)] hover:text-[var(--color-primary-darker)] inline-flex items-center gap-1.5 group"
                      >
                        {MECRALAR_ANA_BOLUM.detayLink}
                        <ArrowRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                      <Link
                        href={`/teklif-al?format=${mecra.key}`}
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {mecra.name} {MECRALAR_ANA_BOLUM.teklifLink}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DİĞER MECRALAR — adetler + iller envanterden */}
      <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow space-y-10">
          <ScrollReveal direction="up">
            <div className="max-w-2xl space-y-4">
              <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium">
                {MECRALAR_DIGER_BOLUM.etiket}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {MECRALAR_DIGER_BOLUM.baslik}
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                {MECRALAR_DIGER_BOLUM.aciklama}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <DigerMecraGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {MECRALAR_CTA.baslik}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                {MECRALAR_CTA.aciklama}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  {MECRALAR_CTA.birincil}
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum.%20Mecralar%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsAppIcon size={18} />
                  {MECRALAR_CTA.ikincil}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
