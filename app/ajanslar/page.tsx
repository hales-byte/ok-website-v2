import Link from "next/link";
import {
  ArrowRight,
  Users,
  Zap,
  FileText,
  Lock,
  Map,
  Check,
} from "lucide-react";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { CustomerProof } from "@/components/CustomerProof";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Reklam Ajansları İçin OOH Tedarikçi",
  description:
    "Brief'iniz 30 dakikada teklife dönüşsün. Ajanslar için Türkiye geneli OOH envanter, white-label raporlama, ajansa özel ratecard ve hızlı teslimat.",
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
  if (error || !data) return { sehirSayisi: 0, yuzSayisi: 0 };
  return {
    sehirSayisi: new Set(data.map((d) => d.sehir)).size,
    yuzSayisi: data.reduce((sum, d) => sum + (d.toplam_face || 0), 0),
  };
}

const features = [
  {
    icon: Zap,
    title: "30 dakika brief → teklif",
    desc: "Brief'inizi gönderin, teklif kıdemli planner'dan, mesaiye sığdırılarak çıkar. \"Müdüre soracağım\" turları yok.",
  },
  {
    icon: FileText,
    title: "White-label raporlama",
    desc: "Yayın fotoğraf raporları, kapsama metrikleri ve kampanya özeti — ajansınızın brand'i ile teslim edilebilir.",
  },
  {
    icon: Lock,
    title: "Ajansa özel ratecard",
    desc: "Ajans-özel iskonto bantları, kampanya hacmine göre kademeli avantaj. Kanal münhasırlığı pazarlık edilebilir.",
  },
  {
    icon: Map,
    title: "Türkiye geneli envanter",
    desc: "Tier-1 metropoller + tier-2 şehirler + Doğu/Güneydoğu kapsama. Tek tedarikçiyle 47+ şehirde paralel yürütme.",
  },
];

const briefSteps = [
  {
    num: "01",
    title: "Brief'i bize gönder",
    desc: "Form veya WhatsApp — sektör, şehir, format, süre, bütçe. Format şablonumuz yoksa serbest metin de yeterli.",
  },
  {
    num: "02",
    title: "Otomatik özetlenir",
    desc: "Sistemimiz brief'i ekibe işlerken anahtar parametreleri yapılandırır. Ekip 30 dk içinde teklif çıkarır.",
  },
  {
    num: "03",
    title: "Teklif size döner",
    desc: "Lokasyon listesi (harita ile), kapsama özeti, fiyat, üretim takvimi. Müşterinize sunabileceğiniz formatta.",
  },
  {
    num: "04",
    title: "Onay → yayın",
    desc: "Onaydan sonra üretim, lojistik, asım bizde. Yayın boyunca raporlama, kampanya sonu özet.",
  },
];

export default async function AjanslarPage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-20 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                <Users size={16} />
                Reklam Ajansları
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Brief&apos;iniz{" "}
                <span className="text-gradient">30 dakikada</span> teklife
                dönsün.
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                Ajanslar için Türkiye geneli OOH tedariki — hızlı geri dönüş,
                esnek satın alma, white-label raporlama. Müşterinize teklifle
                gitmek için partneriniz, müşteriniz arkasında değil.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Brief Gönder
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20Reklam%20ajans%C4%B1ndan%20yaz%C4%B1yorum.%20Ratecard%20payla%C5%9Fabilir%20misiniz%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsAppIcon size={18} />
                  Ratecard iste
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SAYAÇ */}
      <section className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-gradient">
                  <CountUp end={stats.sehirSayisi} suffix="+" duration={1800} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Şehir
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={120}>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-gradient">
                  <CountUp
                    end={stats.yuzSayisi}
                    formatTr
                    suffix="+"
                    duration={2200}
                  />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reklam Yüzü
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={240}>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-gradient">
                  30
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Dakika Yanıt
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={360}>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-gradient">
                  8
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Format Seçeneği
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* AJANS-SPESİFİK ÖZELLİKLER */}
      <section className="py-24">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Ajanslara özel
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Ajansınızın hızıyla çalışıyoruz
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal
                  key={f.title}
                  direction="up"
                  delay={i * 100}
                  duration={700}
                >
                  <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRIEF AKIŞI */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Brief&apos;ten yayına 4 net adım
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Ajansınızın iş yükünü üstlenelim — siz müşteri ilişkisinde
                kalın.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {briefSteps.map((adim, i) => (
              <ScrollReveal
                key={adim.num}
                direction="up"
                delay={i * 120}
                duration={700}
              >
                <div className="space-y-3">
                  <div className="text-sm font-mono text-[var(--color-primary)]">
                    {adim.num}
                  </div>
                  <h3 className="text-xl font-bold">{adim.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {adim.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOSYAL KANIT */}
      <CustomerProof />

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Brief&apos;inizi gönderin, dakikalar içinde teklifle dönelim
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                {[
                  "30 dk yanıt süresi",
                  "White-label raporlama",
                  "Ajans-özel ratecard",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <Check size={16} className="text-[var(--color-primary)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/teklif-al" className="btn-primary">
                  Brief Gönder
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20Reklam%20ajans%C4%B1ndan%20yaz%C4%B1yorum."
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
