import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Users,
  Sparkles,
  Bot,
  ListChecks,
  Headphones,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { FormatShowcase } from "@/components/FormatShowcase";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CustomerProof } from "@/components/CustomerProof";

// Ana sayfa: layout default'unun template'ine düşmemesi için title.absolute kullan.
// Layout'un title.template'i "%s | Objektif Kriter" — homepage'te çift "Objektif Kriter"
// olmaması için absolute ile override.
export const metadata: Metadata = {
  title: {
    absolute: "Objektif Kriter — Türkiye OOH Reklam | 47+ Şehir, 33.812+ Reklam Yüzü",
  },
  description:
    "Doğru lokasyonda, doğru zamanda, doğru kitleye. Türkiye'nin 47+ şehrinde 33.812+ reklam yüzü ile billboard, CLP, megalight ve dijital OOH reklam çözümleri. 30 dakika içinde teklif.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://objektifkriter.com.tr",
    siteName: "Objektif Kriter",
    title: "Objektif Kriter — Türkiye OOH Reklam",
    description:
      "Doğru lokasyonda, doğru zamanda, doğru kitleye. 47+ şehir, 33.812+ reklam yüzü. 30 dakika içinde teklif.",
  },
};

async function getStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir, toplam_face")
    .eq("aktif", true);

  if (error || !data) {
    return { sehirSayisi: 0, yuzSayisi: 0 };
  }

  const sehirSayisi = new Set(data.map((d) => d.sehir)).size;
  const yuzSayisi = data.reduce((sum, d) => sum + (d.toplam_face || 0), 0);

  return { sehirSayisi, yuzSayisi };
}

const surec = [
  {
    num: "01",
    title: "Sizi dinleyelim",
    desc: "Hedefinizi, hedef kitlenizi ve mesajınızı anlıyoruz, ihtiyacınızı netleştiriyoruz. İlk açıkhava kampanyanız mı? Sıfırdan birlikte planlayalım. Reklam Ajansı mısınız?",
  },
  {
    num: "02",
    title: "Planlayalım",
    desc: "Şehir, format ve süreye göre lokasyon önerisi hazırlıyoruz.",
  },
  {
    num: "03",
    title: "Mesajınızı Taşıyalım",
    desc: "Tasarım, baskı ve lojistik süreçlerini biz yönetiyoruz.",
  },
  {
    num: "04",
    title: "Yayın",
    desc: "Yayın takibi, fotoğraf raporu ve performans değerlendirmesi.",
  },
];

export default async function Home() {
  const stats = await getStats();

  const segmentler = [
    {
      icon: Briefcase,
      etiket: "Markalar",
      slogan: `Markanızın izi ${stats.sehirSayisi}+ şehirde, doğru sokakta.`,
      desc: "Stratejik medya planlaması, raporlanabilir kampanya yönetimi. Sektörel deneyimle desteklenen lokasyon önerileriyle markanızın görünürlüğünü Anadolu'nun her köşesine taşıyoruz.",
      cta: "Marka için detaylar",
      href: "/markalar",
    },
    {
      icon: Users,
      etiket: "Reklam Ajansları",
      slogan: "Brief'iniz 30 dakikada teklife dönsün.",
      desc: "Hızlı geri dönüş, esnek satın alma, detaylı lokasyon listeleri. Ajansınızın açıkhava operasyonlarındaki güvenilir iş ortağıyız.",
      cta: "Ajanslar için detaylar",
      href: "/ajanslar",
    },
    {
      icon: Sparkles,
      etiket: "İlk Açıkhava Kampanyam",
      slogan: "İlk afişinizi birlikte sokağa çıkaralım.",
      desc: "Brief'iniz olmasa da olur. Hedefinizi anlatın, ihtiyacınızı birlikte netleştirelim, sıfırdan planlayalım. Şeffaf fiyat, gerçek lokasyon, sürpriz fatura yok.",
      cta: "Sıfırdan başlayalım",
      href: "/ilk-kampanyaniz",
    },
  ];

  return (
    <>
      {/* HERO — Cinematic + mesh gradient bg */}
      <section className="relative min-h-[92vh] flex items-center pt-12 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(1, 181, 204, 0.35) 0%, rgba(1, 181, 204, 0) 70%)",
            }}
          />
          <div
            className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 204, 228, 0.4) 0%, rgba(0, 204, 228, 0) 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(1, 122, 138, 0.35) 0%, rgba(1, 122, 138, 0) 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-narrow w-full relative">
          <div className="max-w-5xl space-y-10">
            <ScrollReveal direction="up" delay={100} duration={1000} priority>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
                <span className="text-gradient">Doğru lokasyonda</span>,
                <br />
                <span className="text-gradient">Doğru zamanda</span>,
                <br />
                <span className="text-gradient">Doğru kitleye</span>.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} duration={1000} priority>
              <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
                Türkiye genelinde {stats.sehirSayisi}+ şehirde,{" "}
                {stats.yuzSayisi.toLocaleString("tr-TR")}+ reklam yüzü ile
                markanızı doğru yere konumlandırıyoruz.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700} duration={1000} priority>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
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
        </div>
      </section>

      {/* SAYAÇ — 2 sütun */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-7xl font-bold text-gradient">
                  <CountUp end={stats.sehirSayisi} suffix="+" duration={1800} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  Şehir
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-7xl font-bold text-gradient">
                  <CountUp
                    end={stats.yuzSayisi}
                    formatTr
                    suffix="+"
                    duration={2200}
                  />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reklam Yüzü
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3 KART SEGMENT */}
      <section className="py-24">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Kim için biz?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Her marka kendi yolunu çizer — biz lokasyonunu kuruyoruz.
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Kurumsal markalar, reklam ajansları ve sokağa ilk adımını atan
                girişimler — her birinin hikâyesi farklı, ama hepsi aynı şeyi
                arıyor: doğru anda, doğru insanın gözüne değen bir mesaj.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segmentler.map((segment, i) => {
              const Icon = segment.icon;
              return (
                <ScrollReveal
                  key={segment.etiket}
                  direction="up"
                  delay={i * 120}
                  duration={700}
                >
                  <div className="group h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <Icon
                        size={28}
                        className="text-[var(--color-primary)]"
                      />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                      {segment.etiket}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4 text-[var(--color-text-primary)]">
                      {segment.slogan}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-grow">
                      {segment.desc}
                    </p>
                    <Link
                      href={segment.href}
                      className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium inline-flex items-center gap-2 group/link"
                    >
                      {segment.cta}
                      <ArrowRight
                        size={14}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STICKY SCROLL FORMAT SHOWCASE — Apple-tarzı */}
      <FormatShowcase />

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

      {/* 30 DK NASIL — vaadi destekleyen mekanizma */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                30 dakikada nasıl?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Hızımızın arkasında bir <span className="text-gradient">akıllı süreç</span> var.
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                30 dakika sözü pazarlama lafı değil — taleplerinizi ön-işleyen
                otomasyon, hazır lokasyon paketleri ve karar veren kıdemli ekibin
                birleşiminden çıkıyor.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Bot size={22} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">Brief otomatik özetleniyor</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Form&apos;dan gelen talep saniyeler içinde özetlenip ekibe iletiliyor.
                  Sektörünüz, hedefiniz ve bütçeniz daha siz e-mailinize bakmadan
                  görüşülmüş oluyor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <ListChecks size={22} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">Hazır lokasyon paketleri</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  47+ şehirde format ve sektör bazlı önceden hazırlanmış kombinasyonlar.
                  Sıfırdan plan çıkarmıyoruz — sizin durumunuza yakın paket üzerinden
                  başlıyoruz, dakikalar içinde size özelleştiriyoruz.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Headphones size={22} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">Karar veren kıdemli ekip</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Aramanızı bekleyen junior değil, fiyat ve lokasyon önerisini
                  anında verebilen kıdemli planner. &quot;Müdüre soracağım&quot; turlarına
                  vakit kaybetmiyorsunuz.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
                30 dakika içinde alın.
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
