import Link from "next/link";
import { TOPLAM, sayiTr, erisimEtiketi } from "@/src/data/envanter";
import type { Metadata } from "next";
import { sayfaMeta } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { FormatShowcase } from "@/components/FormatShowcase";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CustomerProof } from "@/components/CustomerProof";
import { Chevrons } from "@/components/Chevrons";
import { SectionHeader } from "@/components/SectionHeader";
import { LogoMarquee } from "@/components/LogoMarquee";
import { HeroHarita } from "@/components/HeroHarita";
import { SSS_KISA_YOL } from "@/src/data/content/sss";
import {
  IS_BIRLIKLERI,
  IS_BIRLIKLERI_LOGOLARI,
  IS_BIRLIKLERI_KPI,
} from "@/src/data/content/is-birlikleri";

// Ana sayfa: layout default'unun template'ine düşmemesi için title.absolute kullan.
// Layout'un title.template'i "%s | Objektif Kriter" — homepage'te çift "Objektif Kriter"
// olmaması için absolute ile override.
export const metadata: Metadata = sayfaMeta({
  title: `Objektif Kriter — Türkiye OOH Reklam | ${TOPLAM.il} İl, ${sayiTr(TOPLAM.unite)} Reklam Ünitesi`,
  absolute: true,
  description:
    `Doğru lokasyonda, doğru zamanda, doğru kitleye. Türkiye'nin ${TOPLAM.il} ilinde ${sayiTr(TOPLAM.unite)} reklam ünitesi ile billboard, CLP, megalight ve dijital OOH reklam çözümleri. 15 dakika içinde teklif.`,
  path: "/",
});

function getStats() {
  // TEK doğruluk kaynağı: src/data/envanter.json (Supabase kaldırıldı)
  return { sehirSayisi: TOPLAM.il, mecraSayisi: TOPLAM.mecra, yuzSayisi: TOPLAM.unite };
}

const surec = [
  {
    num: "01",
    title: "Sizi dinleyelim",
    desc: "Hedefinizi, hedef kitlenizi ve mesajınızı anlıyoruz, ihtiyacınızı netleştiriyoruz. İlk açıkhava kampanyanız mı, yoksa reklam ajansı mısınız — ikisinde de sıfırdan birlikte planlıyoruz.",
  },
  {
    num: "02",
    title: "Planlayalım",
    desc: "Şehir, mecra ve süreye göre lokasyon önerisi hazırlıyoruz.",
  },
  {
    num: "03",
    title: "Mesajınızı Taşıyalım",
    desc: "Asım, montaj ve lojistiği biz yönetiyoruz; baskı için sizi doğru merkeze yönlendiriyor, gerektiğinde süreci de üstleniyoruz.",
  },
  {
    num: "04",
    title: "Yayın",
    desc: "Yayın takibi, fotoğraf raporu ve performans değerlendirmesi.",
  },
];

export default async function Home() {
  const stats = getStats();

  return (
    <>
      {/*
       * AKIŞ (2026-11-24, Hakan: "ana sayfa akışını mantıklı hale getir"):
       * Hero → Sayaçlar → Mecra vitrini (ne satıyoruz) → İş birlikleri (kimlerle)
       * → 4 adımda yayında (nasıl) → Alt CTA. "Kim için biz?" kartları ana
       * sayfadan çıktı — aynı üç yol üst menüde "Çözümler" altında. SSS kendi
       * sayfasına (/sss) taşındı; üst menüde "Kurumsal" altında, alt CTA'da kısa yol.
       */}
      {/* HERO — koyu bant (band-dark) + cyan mesh gradient */}
      <section className="band-dark relative min-h-[92vh] flex items-center pt-12 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 210, 255, 0.30) 0%, rgba(0, 210, 255, 0) 70%)",
            }}
          />
          <div
            className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 204, 228, 0.35) 0%, rgba(0, 204, 228, 0) 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(3, 105, 161, 0.40) 0%, rgba(3, 105, 161, 0) 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-narrow w-full relative">
          {/* G11: lg ve üstünde iki sütun — metin sol, il nabzı haritası sağ;
              altında tek sütun, harita metnin altına iner. */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="max-w-5xl space-y-10 min-w-0">
            <ScrollReveal direction="up" delay={0} duration={1000} priority>
              <Chevrons count={6} width={280} />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={60} duration={800} priority>
              <div className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[var(--color-primary)]">
                Türkiye&apos;nin Anadolu Açıkhava Lideri
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100} duration={1000} priority>
              <h1 className="text-5xl md:text-7xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight">
                <span className="text-gradient">Doğru lokasyonda</span>,
                <br />
                <span className="text-gradient">Doğru zamanda</span>,
                <br />
                <span className="text-gradient">Doğru kitleye</span>.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} duration={1000} priority>
              <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
                Türkiye genelinde {stats.sehirSayisi} il, {stats.mecraSayisi}{" "}
                mecra türü, {sayiTr(stats.yuzSayisi)}{" "}ünite — Anadolu&apos;nun
                her köşesinde markanızın yanındayız.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700} duration={1000} priority>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Ücretsiz Mecra Planı Al
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum.%20Reklam%20konusunda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label="WhatsApp ile yaz"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp ile yaz
                </a>
                <Link href="/envanter" className="btn-secondary">
                  Envanteri Gör
                </Link>
              </div>
              <p className="pt-3 text-sm text-[var(--color-text-muted)]">
                İlk kez mi açıkhava düşünüyorsun? <span className="text-[var(--color-text-secondary)]">WhatsApp ile yaz, baskı yapmadan konuşalım.</span>
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="fade" delay={500} duration={1200} priority className="min-w-0">
            <HeroHarita />
          </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SAYAÇ — 4 KPI (G2) */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.sehirSayisi} duration={1800} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  İl
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.mecraSayisi} duration={1800} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  Mecra Türü
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.yuzSayisi} formatTr duration={2200} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reklam Ünitesi
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={360}>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  {erisimEtiketi()}
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  Aylık Erişim*
                </div>
              </div>
            </ScrollReveal>
          </div>
          <p className="mt-8 text-xs text-[var(--color-text-muted)] text-center md:text-left">
            * Aylık erişim; il nüfusları (TÜİK ADNKS 2025) ve günlük şehir
            ziyaretçileri üzerinden envantere bağlı hesaplanır.
          </p>
        </div>
      </section>

      {/* STICKY SCROLL MECRA SHOWCASE — 6 ana mecra + Diğer mecralarımız kartı (→ /mecralar) */}
      <FormatShowcase />

      {/* GÜÇLÜ İŞ BİRLİKLERİ — logo duvarı (G3) */}
      <section className="relative overflow-hidden py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        {/* G3.1: arka planda yavaşça gezinen cyan ışımalar (hero diliyle) */}
        <div
          aria-hidden="true"
          className="ok-glow pointer-events-none absolute -left-16 -top-24 h-[340px] w-[340px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 210, 255, 0.20) 0%, rgba(0, 210, 255, 0) 70%)",
            animation: "ok-glow-a 22s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="ok-glow pointer-events-none absolute -bottom-32 -right-24 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(3, 105, 161, 0.15) 0%, rgba(3, 105, 161, 0) 70%)",
            animation: "ok-glow-b 28s ease-in-out infinite",
          }}
        />
        <div className="container-narrow space-y-14">
          <ScrollReveal direction="up">
            <SectionHeader
              eyebrow={IS_BIRLIKLERI.eyebrow}
              title={IS_BIRLIKLERI.baslik}
              subtitle={IS_BIRLIKLERI.altMetin}
            />
          </ScrollReveal>

          {/* KPI ŞERİDİ — 2 öğe, ortalanmış */}
          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-2 gap-8 md:gap-16 border-y border-[var(--color-border-subtle)] py-8 max-w-lg mx-auto">
              {IS_BIRLIKLERI_KPI.map((kpi) => (
                <div key={kpi.etiket} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient">
                    {kpi.deger}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                    {kpi.etiket}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* G3.1: LOGO AKIŞI — tüm logolar iki zıt satırda akar (20sn/24sn),
              hover'da durur, reduced-motion'da statik ızgara */}
          {/* V5 (2026-09-12, Hakan kararı): logo akışının altındaki
              "X markanın tamamı → /markalar" bağlantısı kaldırıldı.
              Bu bölümde yalnız logo akışı kalır. /markalar segment sayfası
              ve menüdeki yeri DOKUNULMADAN durur (ana sayfadaki segment
              kartları 2026-11-24'te kaldırıldı — üst menü "Çözümler"de).
              V5-düzeltme: V5'te bağlantı bloğuyla birlikte LogoMarquee de
              yanlışlıkla silinmişti; geri kondu. Bu satır BU BÖLÜMÜN TEK
              İÇERİĞİ — silinmemeli. */}
          <LogoMarquee logolar={IS_BIRLIKLERI_LOGOLARI} />
        </div>
      </section>

      {/* SOSYAL KANIT — lib/customers.ts boş ise otomatik gizlenir */}
      <CustomerProof />

      {/* SÜREÇ */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                4 adımda yayında
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                İlk konuşmadan yayına kadar her aşamada yanınızdayız.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {surec.map((adim, i) => (
              <ScrollReveal
                key={adim.num}
                direction="up"
                delay={i * 120}
                duration={700}
              >
                <div className="space-y-4">
                  <div className="text-sm font-mono text-[var(--color-primary)]">
                    {adim.num}
                  </div>
                  <h3 className="text-2xl font-bold">{adim.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {adim.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/*
       * NOT: "15 dakikada nasıl" mekanizma bölümü kaldırıldı (akıllı süreç +
       * 3 kart: Brief otomatik özetleniyor / Hazır lokasyon paketleri /
       * Karar veren kıdemli ekip). İleride yapay zeka destekli "Hakan K."
       * isimli AI ajan ile mesajlaşma deneyimine evrilecek — Faz 4 kapsamı.
       * Bkz: docs/roadmap.md.
       */}

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Kampanyanız için{" "}
                <span className="text-gradient">lokasyon planı</span> çıkaralım
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Sektörünüze, hedefinize ve bütçenize uygun lokasyon önerilerini
                15 dakika içinde alın.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
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
              <p className="text-sm text-[var(--color-text-muted)]">
                {SSS_KISA_YOL.oncesi}{" "}
                <Link
                  href="/sss"
                  className="font-medium text-[var(--color-primary-deep)] underline-offset-4 hover:underline"
                >
                  {SSS_KISA_YOL.link}
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
