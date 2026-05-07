import Link from "next/link";
import {
  ArrowRight,
  Layers,
  BarChart3,
  Zap,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Objektif Kriter — Türkiye genelinde aktif lokasyonlar ve binlerce reklam yüzü ile OOH reklam çözümleri sunan lokasyon odaklı bir ajans.",
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
    return { sehirSayisi: 0, yuzSayisi: 0, lokasyonSayisi: 0 };
  }

  const sehirSayisi = new Set(data.map((d) => d.sehir)).size;
  const yuzSayisi = data.reduce((sum, d) => sum + (d.toplam_face || 0), 0);
  const lokasyonSayisi = data.length;

  return { sehirSayisi, yuzSayisi, lokasyonSayisi };
}

const yaklasimlar = [
  {
    icon: Layers,
    title: "Operasyon sadeliği",
    desc: "Lokasyon planlaması, asım ve uzun dönemli kampanyalarınızda afiş değişikliği operasyonlarını sizin için sadeleştiriyoruz.",
  },
  {
    icon: BarChart3,
    title: "Veri odaklı planlama",
    desc: "Demografik veri, trafik yoğunluğu ve sektörel deneyimle desteklenen lokasyon önerileri. Tahmin değil, kanıt.",
  },
  {
    icon: Zap,
    title: "Hızlı yanıt",
    desc: "Brief'inizi aldıktan 30 dakika içinde teklifiniz hazır. Uzmanlarımız tüm karar süreçlerinizde yanınızda.",
  },
];

const degerler = [
  {
    icon: Shield,
    title: "Şeffaflık",
    desc: "Gördüğünüz her lokasyon, her fiyat, her rapor — gerçek. Gizli koşul yok, sürpriz fatura yok.",
  },
  {
    icon: Target,
    title: "Lokasyon odaklılık",
    desc: "Bütçenizi en yüksek görünürlüğe çevirmek için her lokasyonu özelliğine göre değerlendiriyoruz.",
  },
  {
    icon: Users,
    title: "Uzun vadeli ilişki",
    desc: "Tek seferlik kampanyadan stratejik ortaklığa — başarılı projeler tekrar etmeye değer.",
  },
];

export default async function HakkimizdaPage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000}>
            <div className="max-w-3xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                Hakkımızda
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Reklamı{" "}
                <span className="text-gradient">doğru yere</span> taşıyoruz
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Objektif Kriter, Türkiye genelinde OOH reklam çözümleri sunan
                lokasyon odaklı bir ajans. Markanın hangi lokasyonda, hangi
                formatta görünmesi gerektiğine veri ile karar veriyoruz.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-4xl space-y-12">
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                  Yaklaşımımız
                </div>
                <p className="text-2xl md:text-3xl leading-relaxed text-[var(--color-text-primary)] font-medium">
                  Out-of-home reklam, doğru lokasyonda doğru mesajla{" "}
                  <span className="text-gradient">tek bir baskıdan</span>{" "}
                  kampanyanın tamamına dönüşür.
                </p>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Bizim için her kampanya bir lokasyon problemidir: sınırlı
                  bütçeyle maksimum görünürlüğü hangi karışımda elde edebileceğinizi
                  hesaplıyor, alternatifleri karşılaştırılabilir biçimde
                  sunuyoruz.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* YAKLAŞIMIMIZ - 3 KART */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Bizi farklı kılan üç şey
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                OOH planlamasını sadece bir teklif değil, somut bir lokasyon
                stratejisi olarak görüyoruz. İşte ayrıştığımız üç nokta.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yaklasimlar.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  direction="up"
                  delay={i * 120}
                  duration={700}
                >
                  <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 transition-colors h-full">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                      <Icon size={24} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAYILAR — animasyonlu */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <ScrollReveal direction="up" delay={0}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.sehirSayisi} suffix="+" duration={1800} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Şehir
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={stats.yuzSayisi} formatTr suffix="+" duration={2200} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reklam Yüzü
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={7} duration={1500} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Ana Format
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={360}>
              <div>
                <div className="text-4xl md:text-6xl font-bold text-gradient">
                  <CountUp end={30} suffix=" dk" duration={1800} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Yanıt Süresi
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Değerlerimiz
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Çalışma prensiplerimiz
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {degerler.map((deger, i) => {
              const Icon = deger.icon;
              return (
                <ScrollReveal
                  key={deger.title}
                  direction="up"
                  delay={i * 120}
                  duration={700}
                >
                  <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 transition-colors h-full">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                      <Icon size={24} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{deger.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {deger.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Birlikte çalışmaya{" "}
                <span className="text-gradient">başlayalım</span>
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Yeni bir kampanya, yenileme ya da sadece sektörel bir görüş
                alışverişi — bize her zaman ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/teklif-al" className="btn-primary">
                  Teklif Al
                  <ArrowRight size={18} />
                </Link>
                <Link href="/iletisim" className="btn-secondary">
                  İletişime Geç
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
