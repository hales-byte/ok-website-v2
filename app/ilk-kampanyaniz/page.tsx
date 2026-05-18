import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  HelpCircle,
  Wallet,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CustomerProof } from "@/components/CustomerProof";

export const metadata: Metadata = {
  title: "İlk Açıkhava Kampanyanız",
  description:
    "İlk açıkhava reklamınız mı? Brief'inizi olmasa da olur. Şeffaf fiyat, anlaşılır süreç, sıcak destek — birlikte planlayalım.",
};

const endiseler = [
  {
    soru: "Benim büyüklüğümde işletmeler de mi çalışıyor sizinle?",
    cevap:
      "Evet. Mahalle kafesinden e-ticaret KOBİ'sine, klinikten butik mağazaya — küçük-orta işletmeler müşterimizin yarısından fazlası. İsteğinize göre benzer örnekler paylaşırız.",
  },
  {
    soru: "Yayında sorun olursa kime ulaşırım, ne kadar sürede dönüş alırım?",
    cevap:
      "Size atanmış tek temas noktası var — WhatsApp ve telefon ile direkt ulaşırsınız. Mesai içi 30 dakika, mesai dışı ertesi gün ilk yarısı içinde dönüş veriyoruz.",
  },
];

const adimlar = [
  {
    num: "01",
    title: "Bir konuşma yapalım",
    desc: "WhatsApp ya da telefonla 5-10 dakikalık bir konuşma. Hangi işi yapıyorsunuz, ne istiyorsunuz, ne kadar bütçe düşünüyorsunuz — bu kadar.",
  },
  {
    num: "02",
    title: "Birlikte plan çıkaralım",
    desc: "Şehir mi, mahalle mi, hangi format mantıklı, kaç gün, neye dikkat — birlikte değerlendiriyoruz. Kararı siz veriyorsunuz.",
  },
  {
    num: "03",
    title: "Üretim ve asım",
    desc: "Tasarım yardıma ihtiyacınız varsa onda da yanınızdayız. Baskıdan asıma kadar süreç bizde — siz işinizle ilgilenin.",
  },
  {
    num: "04",
    title: "Yayında!",
    desc: "Reklamınız sokakta. Yayın fotoğrafıyla onaylıyoruz, kampanya boyunca takipte kalıyoruz, biten gün net dönüş.",
  },
];

const fiyatBant = [
  {
    range: "5K – 15K TL",
    title: "Mahalle / cadde paketi",
    desc: "Birkaç CLP/Raket ya da Pole Banner kombinasyonu. Lokal müşteri çekmek için yeterli görünürlük.",
    examples: "Kafe, lokal market, semt restoranı, butik mağaza",
  },
  {
    range: "15K – 40K TL",
    title: "Şehir geneli paket",
    desc: "Billboard veya megalight ile geniş kapsama, opsiyonel CLP desteği. Şehir genelinde marka tanıtımı.",
    examples: "Yeni açılan zincir, otomotiv galeri, eğitim kurumu, klinik",
  },
  {
    range: "40K+ TL",
    title: "Çoklu şehir / format kombinasyonu",
    desc: "Birden fazla şehirde ve formatta kampanya. Markanızı bölgesel/ulusal düzeye çıkartıyoruz.",
    examples: "E-ticaret kampanyası, sezonluk lansman, marka konsolidasyon",
  },
];

export default function IlkKampanyanizPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-20 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up" duration={1000} priority>
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
                <Sparkles size={16} />
                İlk Açıkhava Kampanyam
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                İlk afişinizi{" "}
                <span className="text-gradient">birlikte</span> sokağa
                çıkaralım.
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                Açıkhava reklamı yaptırmak hiç de korkutucu değil. Brief&apos;iniz
                olmasa da olur — hedefinizi anlatın, ihtiyacınızı birlikte
                netleştirelim. Şeffaf fiyat, gerçek lokasyon, sürpriz fatura
                yok.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20ilk%20kez%20a%C3%A7%C4%B1khava%20reklam%C4%B1%20yapt%C4%B1rmak%20istiyorum.%20Bilgi%20alabilir%20miyim%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp ile başlayalım
                </a>
                <Link href="/teklif-al" className="btn-secondary">
                  Form üzerinden başlat
                  <ArrowRight size={18} />
                </Link>
              </div>
              <p className="pt-3 text-sm text-[var(--color-text-muted)]">
                Önce konuşmayı tercih ediyorsanız WhatsApp daha rahat — baskı
                yapmıyoruz, vaktiniz olduğunda dönmeniz yeter.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ENDİŞELERİN CEVAPLARI */}
      <section className="py-24">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                <HelpCircle size={14} />
                Sıkça duyduğumuz endişeler
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Doğru sorularınız var, doğru cevaplarımız da
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {endiseler.map((q, i) => (
              <ScrollReveal
                key={q.soru}
                direction="up"
                delay={i * 100}
                duration={700}
              >
                <div className="h-full p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                  <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                    {q.soru}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {q.cevap}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BÜTÇE REHBERİ — geçici olarak gizli, canlıya alındıktan sonra revize edilip açılacak */}
      <section className="hidden py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                <Wallet size={14} />
                Bütçe rehberi
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Hangi bütçeyle ne yapılır?
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Mertebeyi bilmek karar vermeyi rahatlatır. Tahmini bantlar —
                kampanyanıza göre özel teklifle netleşir.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fiyatBant.map((bant, i) => (
              <ScrollReveal
                key={bant.range}
                direction="up"
                delay={i * 120}
                duration={700}
              >
                <div className="h-full p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 transition-all flex flex-col">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                    {bant.range}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{bant.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-grow">
                    {bant.desc}
                  </p>
                  <div className="text-xs text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border-subtle)]">
                    <span className="font-medium">Tipik müşteri:</span>{" "}
                    {bant.examples}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                <HeartHandshake size={14} />
                Süreç
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Baskı yapmıyor olabiliriz ama işinde iyi baskı merkezleri sizin için listeleyebiliriz
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {adimlar.map((adim, i) => (
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

      {/* ALT CTA — WhatsApp odaklı */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-primary)]">
                <MessageCircle size={14} />
                İlk adım kolay
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Önce konuşalım, formu sonra dolduruz
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Mesai içi 30 dakika, mesai dışı en geç ertesi sabah dönüş
                yapıyoruz. Sorularınızı sormak için WhatsApp en rahat yol.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/905529185864?text=Merhaba%2C%20ilk%20kez%20a%C3%A7%C4%B1khava%20reklam%C4%B1%20yapt%C4%B1rmak%20istiyorum.%20Bilgi%20alabilir%20miyim%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp ile yaz
                </a>
                <Link href="/teklif-al" className="btn-secondary">
                  Form üzerinden başla
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
