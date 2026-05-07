import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Layers,
  MapPin,
  Check,
} from "lucide-react";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { CustomerProof } from "@/components/CustomerProof";

export const metadata: Metadata = {
  title: "Markalar İçin OOH Reklam Çözümleri",
  description:
    "Kurumsal markalar için Türkiye geneli OOH planlama. Stratejik medya, raporlanabilir kampanyalar, sektörel deneyim. 47+ şehirde 33.000+ reklam yüzü.",
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

const valueProps = [
  {
    icon: MapPin,
    title: "Türkiye geneli kapsam",
    desc: "Marmara'dan Doğu Anadolu'ya 47+ şehirde aktif lokasyon. Tier-1 illerin yanında tier-2 ve tier-3 şehirlerde de varız — markanızın izi metropolün dışına da çıkar.",
  },
  {
    icon: BarChart3,
    title: "Raporlanabilir kampanya",
    desc: "Yayın takip, fotoğraflı yerinde kontrol, kapsama ve maruziyet metrikleri. Pazarlama ekibinize gösterebileceğiniz somut çıktılarla bitiriyoruz.",
  },
  {
    icon: Layers,
    title: "Stratejik medya planlaması",
    desc: "Format kombinasyonu (billboard + CLP + LED) ile farklı temas noktalarında frekans kuruyoruz. Tek format yerine optimal mix.",
  },
  {
    icon: ShieldCheck,
    title: "Kurumsal disiplin",
    desc: "KVKK uyumlu süreçler, sözleşme şeffaflığı, vade ve ödeme esnekliği. Satınalma ekibinizle pürüzsüz çalışırız.",
  },
];

const sureclar = [
  {
    num: "01",
    title: "Brief & strateji",
    desc: "Marka pozisyonunuz, hedef kitleniz ve kampanya hedefiniz üzerinden başlıyoruz. KPI'lar netleşiyor.",
  },
  {
    num: "02",
    title: "Lokasyon planı",
    desc: "Demografik veri, trafik yoğunluğu ve sektörel deneyimle birleşen şehir-format kombinasyonu. Tahmin değil, kanıtlanabilir öneri.",
  },
  {
    num: "03",
    title: "Üretim & yayın",
    desc: "Tasarım onayından baskıya, lojistikten asıma kadar süreç bizde. Pazarlama ekibinizin tek temas noktası.",
  },
  {
    num: "04",
    title: "Yayın raporu",
    desc: "Fotoğraflı yerinde kontrol, kampanya boyunca sürekli rapor, kapanışta pazarlamaya sunulabilir özet.",
  },
];

export default async function MarkalarPage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-20 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                <Briefcase size={16} />
                Markalar
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Markanızın izi{" "}
                <span className="text-gradient">{stats.sehirSayisi}+ şehirde</span>,
                doğru sokakta.
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                Stratejik medya planlaması, raporlanabilir kampanya yönetimi ve
                sektörel deneyimle desteklenen lokasyon önerileri — kurumsal
                markaların açıkhava operasyonunda aradığı disipline buluşalım.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
                  <ArrowRight size={18} />
                </Link>
                <Link href="/envanter" className="btn-secondary">
                  Envanteri İnceleyin
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SAYAÇ */}
      <section className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.sehirSayisi} suffix="+" duration={1800} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Aktif Şehir
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={120}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
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
                <div className="text-4xl md:text-6xl font-bold text-gradient">
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

      {/* DEĞER ÖNERİLERİ */}
      <section className="py-24">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Markalar için neden biz?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Kurumsal disiplinle çalışan bir partner
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueProps.map((vp, i) => {
              const Icon = vp.icon;
              return (
                <ScrollReveal
                  key={vp.title}
                  direction="up"
                  delay={i * 100}
                  duration={700}
                >
                  <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{vp.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {vp.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Brief&apos;inizi alıyoruz, kampanyayı bitiriyoruz
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Tek temas noktası, sözleşme şeffaflığı, raporla bitiş — büyük
                marka süreçlerine alışmış disiplinle.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {sureclar.map((adim, i) => (
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

      {/* SOSYAL KANIT (varsa) */}
      <CustomerProof />

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Markanızın bir sonraki kampanyasını birlikte planlayalım
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Sektörünüzü, hedefinizi ve bütçenizi paylaşın. 30 dakika içinde
                stratejik bir öneriyle dönelim.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-left">
                {[
                  "Stratejik medya planı",
                  "Raporlanabilir sonuç",
                  "30 dk yanıt süresi",
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
              <div className="pt-2">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
