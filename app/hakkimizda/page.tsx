import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Eye,
  Layers,
  BarChart3,
  Zap,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Objektif Kriter — Türkiye genelinde 80+ şehirde, 30.000+ reklam yüzü ile OOH reklam çözümleri sunan lokasyon odaklı bir ajans.",
};

const yaklasimlar = [
  {
    icon: Layers,
    title: "Tek elden çözüm",
    desc: "Strateji, lokasyon planlaması, üretim, baskı, montaj ve yayın takibi — kampanyanızın her aşamasında yanınızdayız.",
  },
  {
    icon: BarChart3,
    title: "Veri odaklı planlama",
    desc: "Demografik veri, trafik yoğunluğu ve sektörel deneyimle desteklenen lokasyon önerileri. Tahmin değil, kanıt.",
  },
  {
    icon: Zap,
    title: "Hızlı yanıt",
    desc: "Brief'inizi aldıktan sonra 24 saat içinde lokasyon planı ve teklif sunuyoruz. İhalelerden önce, kampanyanız hazır.",
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

export default function HakkimizdaPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
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
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24">
        <div className="container-narrow">
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
                80&apos;den fazla şehirde 30.000&apos;den fazla reklam yüzünü
                yöneten ekibimizle, markanızın hedef kitlesine en kısa yoldan
                ulaşmasını sağlıyoruz. Billboard&apos;dan dijital LED&apos;e,
                havalimanı ekranlarından şehir merkezindeki CLP&apos;lere kadar
                tüm formatlar tek bir noktadan, tek bir teklifle.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Bizim için her kampanya bir lokasyon problemidir: sınırlı
                bütçeyle maksimum görünürlüğü hangi karışımda elde edebileceğinizi
                hesaplıyor, alternatifleri karşılaştırılabilir biçimde
                sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YAKLAŞIMIMIZ - 3 KART */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Müşteri için neyi farklı yapıyoruz
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              OOH reklam ajansı seçmek bir dosya, bir telefon ve birkaç fiyat
              listesi değildir. Biz şu üç şeyle ayrışıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yaklasimlar.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                    <Icon size={24} className="text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAYILAR */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gradient">
                80+
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Şehir
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gradient">
                30K+
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Reklam Yüzü
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gradient">
                7
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Ana Format
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gradient">
                24h
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Yanıt Süresi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Değerlerimiz
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Çalışma prensiplerimiz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {degerler.map((deger) => {
              const Icon = deger.icon;
              return (
                <div
                  key={deger.title}
                  className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                    <Icon size={24} className="text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{deger.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {deger.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
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
        </div>
      </section>
    </>
  );
}