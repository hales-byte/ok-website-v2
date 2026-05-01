import Link from "next/link";
import {
  ArrowRight,
  Square,
  Smartphone,
  Monitor,
  Tv,
  Maximize2,
  Flag,
  Plane,
  Check,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Billboard, CLP, megalight, LED, giantboard, pole banner ve havalimanı reklamları — 7 OOH formatıyla markanız için doğru çözüm.",
};

interface Format {
  id: string;
  icon: typeof Square;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  useCases: string;
}

const formatlar: Format[] = [
  {
    id: "billboard",
    icon: Square,
    name: "Billboard",
    tagline: "Yüksek görünürlük, geniş etki alanı",
    description:
      "Ana arterler, otoyol kavşakları ve şehir girişlerinde konumlandırılan sabit, yüksek görünürlüklü reklam yüzü. Hızlı geçen trafikte bile mesajınızı net bir şekilde iletir.",
    benefits: [
      "Geniş hedef kitleye ulaşım",
      "24 saat sürekli görünürlük",
      "Güçlü marka hatırlanırlığı",
      "Şehirlerarası ve şehiriçi kapsama",
    ],
    useCases: "Marka bilinirliği, ürün lansmanı, sezonluk kampanyalar",
  },
  {
    id: "clp",
    icon: Smartphone,
    name: "CLP / Raket",
    tagline: "Şehir merkezleri ve duraklarda yaya trafiğine yönelik",
    description:
      "Dikey, aydınlatmalı reklam paneli. Genellikle otobüs duraklarında ve şehir merkezlerindeki yoğun yaya bölgelerinde bulunur. Bekleyen ve yürüyen kitleye doğrudan ulaşır.",
    benefits: [
      "Yüksek frekans, tekrarlı temas",
      "Yaya seviyesinde okunabilirlik",
      "Gece/gündüz aydınlatmalı",
      "Premium şehir merkezi konumları",
    ],
    useCases: "Lokal işletmeler, perakende, hizmet sektörü, kentsel kampanyalar",
  },
  {
    id: "megalight",
    icon: Monitor,
    name: "Megalight",
    tagline: "Premium konumlarda büyük format aydınlatmalı panel",
    description:
      "Genellikle 8×4m veya 6×3m boyutlarında, ana cadde ve kavşaklarda yer alan aydınlatmalı reklam paneli. Megalight'lar prestij ve görünürlüğü birleştirir.",
    benefits: [
      "Aydınlatma ile gece de aktif",
      "Premium kavşak konumları",
      "Geniş ve net görsel alan",
      "Prestijli marka algısı",
    ],
    useCases: "Premium markalar, lüks ürünler, kurumsal kampanyalar",
  },
  {
    id: "led",
    icon: Tv,
    name: "LED & Dijital",
    tagline: "Dinamik içerik, gerçek zamanlı yayın",
    description:
      "Dijital ekran teknolojisi ile hareketli ve değişen içerik gösterimi. Tek konumda birden fazla reklam dönüşümlü yayınlanır, kreatifler anlık güncellenebilir.",
    benefits: [
      "Hareketli görsel ve video desteği",
      "Hızlı kreatif değişikliği",
      "Saat bazlı planlama (day-parting)",
      "A/B test ve canlı kampanya optimizasyonu",
    ],
    useCases: "Promosyonlar, etkinlik duyuruları, gerçek zamanlı kampanyalar",
  },
  {
    id: "giantboard",
    icon: Maximize2,
    name: "Giantboard",
    tagline: "Anıtsal boyut, maksimum etki",
    description:
      "Standart billboard'lardan çok daha büyük, anıtsal ölçekte reklam yüzü. Bina cepheleri veya stratejik açık alanlarda yer alır. Uzak mesafelerden bile görünür.",
    benefits: [
      "Maksimum görsel etki",
      "Anıtsal marka anlatımı",
      "Uzun mesafeden görünürlük",
      "Marka prestijinde güçlü artış",
    ],
    useCases: "Büyük marka lansmanları, film vizyon, prestij kampanyaları",
  },
  {
    id: "pole-banner",
    icon: Flag,
    name: "Pole Banner",
    tagline: "Cadde ve bulvar boyunca tekrarlı görünürlük",
    description:
      "Cadde ve bulvarlardaki aydınlatma direklerine asılan dikey banner reklamlar. Genellikle bir kampanya kapsamında onlarca direkte tekrar eden mesajla uygulanır.",
    benefits: [
      "Tekrar etkisiyle güçlü hatırlatma",
      "Cadde boyunca süreklilik",
      "Ekonomik yüksek görünürlük",
      "Kampanya teması ve atmosfer",
    ],
    useCases: "Festival ve etkinlikler, kentsel kampanyalar, perakende temaları",
  },
  {
    id: "havalimani",
    icon: Plane,
    name: "Havalimanı LED",
    tagline: "Premium kitleye doğrudan erişim",
    description:
      "Havalimanlarındaki check-in, gümrük ve gate noktalarında yer alan dijital ekranlar. Bekleyen yolcular, yüksek dikkat süresi ve premium demografiyle birleşir.",
    benefits: [
      "Yüksek gelirli, premium kitle",
      "Uluslararası seyahat eden tüketici",
      "Uzun bekleme sürelerinde maruziyet",
      "Prestijli, kurumsal konum",
    ],
    useCases: "Premium markalar, lüks tüketim, finans, B2B, otomotiv",
  },
];

export default function HizmetlerPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              Hizmetlerimiz
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Markanız için <span className="text-gradient">7 ayrı format</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Klasik billboard&apos;dan dijital LED&apos;e, premium havalimanı
              ekranından yaya seviyesindeki CLP&apos;ye kadar — kampanyanız için
              doğru görünürlüğü birlikte buluyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* HIZLI NAVIGASYON */}
      <section className="py-8 sticky top-[73px] z-40 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {formatlar.map((format) => (
              <Link
                key={format.id}
                href={`#${format.id}`}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors"
              >
                {format.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT BÖLÜMLERI */}
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {formatlar.map((format, index) => {
          const Icon = format.icon;
          const reverse = index % 2 === 1;

          return (
            <section
              key={format.id}
              id={format.id}
              className="py-20 md:py-28 scroll-mt-32"
            >
              <div className="container-narrow">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* SOL: Açıklama */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <Icon
                          size={28}
                          className="text-[var(--color-primary)]"
                        />
                      </div>
                      <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                        Format {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="space-y-4">
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

                    <div className="pt-2">
                      <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Tipik kullanım
                      </div>
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {format.useCases}
                      </p>
                    </div>
                  </div>

                  {/* SAĞ: Avantajlar */}
                  <div className="lg:pt-20">
                    <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                      <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
                        Öne çıkan avantajlar
                      </div>
                      <ul className="space-y-4">
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

                      <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
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
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Hangi format kampanyanıza uyar?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedefinizi ve bütçenizi paylaşın, size en uygun format ve
              lokasyon kombinasyonunu önerelim.
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
        </div>
      </section>
    </>
  );
}