import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight, Layers } from "lucide-react";
import type { Metadata } from "next";
import { getFormatByKey, getFormatLabel } from "@/lib/formats";
import {
  getIl,
  getIlFormatAdet,
  getIllerByFormat,
  getFormatlarByIl,
  getKombinasyonlar,
  FORMAT_PAGE_KEY,
  MIN_FORMAT_PAGE_UNITE,
  sayiTr,
  slugifyTr,
  lokatifEk,
} from "@/src/data/envanter";
import { isStandalone } from "@/src/data/bolgeler";

/**
 * SAYFA ÜRETİM KURALI (SEO ince içerik önlemi):
 * - İl×format sayfası SADECE o ilde o format ≥ 5 ünite ise üretilir.
 * - 5'in altındaki kombinasyonlar il sayfasına kalıcı yönlendirilir (308).
 * - Bilinmeyen format + geçerli il → il sayfasına yönlendirme (eski URL'ler kırılmasın).
 */
/**
 * Bilinmeyen parametreler için GERÇEK 404 (Next 16 akışlı metadata,
 * runtime notFound/redirect'i HTTP koduna yansıtamıyor — QA bulgusu).
 * Tüm geçerli sayfalar build'de üretilir; gerisi router'da 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  // Sadece 22 standalone ilin format sayfaları üretilir; taşınan illerin
  // /sehir/<il>/<format> adresleri next.config.ts'te bölgeye 301'lenir.
  return getKombinasyonlar()
    .filter(({ slug }) => isStandalone(slug))
    .map(({ slug, format }) => ({ slug, format }));
}

/** Aynı şehirde sayfası olan diğer formatlar (iç linkleme) */
function getAyniSehirDigerFormatlar(slug: string, mevcutFormat: string) {
  const il = getIl(slug);
  if (!il) return [];
  const agg = new Map<string, number>();
  for (const { format, adet } of getFormatlarByIl(slug)) {
    const key = FORMAT_PAGE_KEY[format];
    if (!key || key === mevcutFormat) continue;
    agg.set(key, (agg.get(key) ?? 0) + adet);
  }
  return Array.from(agg.entries())
    .map(([key, adet]) => ({ key, adet }))
    .filter((f) => f.adet >= MIN_FORMAT_PAGE_UNITE)
    .sort((a, b) => b.adet - a.adet);
}

/** Aynı format diğer şehirlerde (orphan sayfa önlemi) — sadece standalone iller
 *  (taşınan illerin format sayfası yok, 301 olur; link vermeyiz). */
function getAyniFormatDigerSehirler(formatKey: string, mevcutSlug: string, limit = 9) {
  return getIllerByFormat(formatKey)
    .filter((x) => x.slug !== mevcutSlug && x.adet >= MIN_FORMAT_PAGE_UNITE && isStandalone(x.slug))
    .slice(0, limit);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}): Promise<Metadata> {
  const { slug, format } = await params;
  const il = getIl(slug);

  // Durum kodu kararları metadata aşamasında — gövde akışından ÖNCE —
  // verilir; aksi halde 404/308 yerine 200 sızar (QA bulgusu).
  if (!il) {
    notFound();
  }

  const formatMeta = getFormatByKey(format);
  const adet = formatMeta ? getIlFormatAdet(slug, format) : 0;

  if (!formatMeta || adet < MIN_FORMAT_PAGE_UNITE) {
    permanentRedirect(`/sehir/${slug}`);
  }

  const ek = lokatifEk(il.il);
  const formatLow = formatMeta.name.toLowerCase();

  return {
    title: `${il.il} ${formatMeta.name} Reklam — ${sayiTr(adet)} Ünite`,
    description: `${il.il}${ek} ${formatLow} reklam: ${sayiTr(adet)} reklam ünitesi. ${formatMeta.tagline}. 15 dakikada teklif, hedeflenmiş lokasyon önerisi.`,
    alternates: {
      canonical: `https://objektifkriter.com.tr/sehir/${slug}/${format}`,
    },
    openGraph: {
      title: `${il.il} ${formatMeta.name} Reklam`,
      description: `${il.il} açıkhava reklam: ${sayiTr(adet)} ${formatLow} ünitesi. ${formatMeta.tagline}.`,
      url: `https://objektifkriter.com.tr/sehir/${slug}/${format}`,
      type: "website",
    },
  };
}

export default async function SehirFormatPage({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}) {
  const { slug, format } = await params;
  const il = getIl(slug);

  if (!il) {
    notFound();
  }

  const formatMeta = getFormatByKey(format);
  const adet = formatMeta ? getIlFormatAdet(slug, format) : 0;

  // Eski/ince sayfa koruması: bilinmeyen format veya eşik altı adet →
  // il sayfasına kalıcı yönlendirme (301 sınıfı). Sayfa hiç üretilmez.
  if (!formatMeta || adet < MIN_FORMAT_PAGE_UNITE) {
    permanentRedirect(`/sehir/${slug}`);
  }

  const sehir = il.il;
  const ek = lokatifEk(sehir);
  const digerFormatlar = getAyniSehirDigerFormatlar(slug, format);
  const digerSehirler = getAyniFormatDigerSehirler(format, slug);

  // Bu formatta ilin ağdaki sırası (iç zenginlik, elle rakam yok)
  const formatIlleri = getIllerByFormat(format);
  const buFormatSira = formatIlleri.findIndex((x) => x.slug === slug) + 1;

  // JSON-LD: Service + BreadcrumbList — SEO rich-result için
  const baseUrl = "https://objektifkriter.com.tr";
  const pageUrl = `${baseUrl}/sehir/${slug}/${format}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sehir} ${formatMeta.name} Reklam`,
    serviceType: `${formatMeta.name} Açıkhava Reklam`,
    description: `${sehir} ilinde ${formatMeta.name.toLowerCase()} reklam çözümleri — ${sayiTr(adet)} reklam ünitesi.`,
    provider: {
      "@type": "Organization",
      name: "Objektif Kriter",
      url: baseUrl,
    },
    areaServed: {
      "@type": "City",
      name: sehir,
      address: { "@type": "PostalAddress", addressCountry: "TR" },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      priceRange: "$$",
      availability: "https://schema.org/InStock",
    },
    url: pageUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${baseUrl}/hizmetler` },
      { "@type": "ListItem", position: 3, name: sehir, item: `${baseUrl}/sehir/${slug}` },
      { "@type": "ListItem", position: 4, name: formatMeta.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link
              href="/hizmetler"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Hizmetler
            </Link>
            <ChevronRight size={14} />
            <Link
              href={`/sehir/${slug}`}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {sehir}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[var(--color-text-secondary)]">
              {formatMeta.name}
            </span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <MapPin size={16} />
              {sehir} • {formatMeta.name}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">{sehir}</span>
              {ek} {formatMeta.name} Reklam
            </h1>
            <p className="text-lg text-[var(--color-primary)]">
              {formatMeta.tagline}
            </p>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {sehir}{ek} toplam {sayiTr(adet)} {formatMeta.name} reklam
              ünitesi ile kampanyanız için doğru görünürlüğü hazırlıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {sayiTr(adet)}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Reklam Ünitesi
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                #{buFormatSira}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Bu Formatta Ağdaki Sırası
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Ünite hakkında
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {formatMeta.name} nedir?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {formatMeta.description}
            </p>
            <div className="pt-4">
              <Link
                href={`/hizmetler#${format}`}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium inline-flex items-center gap-2 group"
              >
                {formatMeta.name} ünitesini detaylı incele
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* İÇ LİNKLEME — aynı format diğer şehirlerde */}
      {digerSehirler.length > 0 && (
        <section className="py-20 border-t border-[var(--color-border-subtle)]">
          <div className="container-narrow">
            <div className="max-w-2xl mb-10">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Aynı mecra farklı şehirlerde
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Diğer şehirlerde {formatMeta.name} reklam
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-secondary)]">
                Kampanyanızı çoklu şehre taşımak ister misiniz? En geniş{" "}
                {formatMeta.name.toLowerCase()} envanterine sahip diğer
                şehirler:
              </p>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {digerSehirler.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/sehir/${d.slug}/${format}`}
                    className="block p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-deep)]">
                      <MapPin size={14} />
                      {d.il}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {sayiTr(d.adet)} ünite
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* İÇ LİNKLEME — aynı şehirde diğer formatlar */}
      {digerFormatlar.length > 0 && (
        <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
          <div className="container-narrow">
            <div className="max-w-2xl mb-10">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Aynı şehirde diğer üniteler
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {sehir}{ek} {formatMeta.name} dışında format alternatifleri
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-secondary)]">
                Kampanyanızın etkisini farklı temas noktalarıyla artırmak için{" "}
                {sehir}{ek}ki diğer reklam üniteleri:
              </p>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {digerFormatlar.map((f) => (
                <li key={f.key}>
                  <Link
                    href={`/sehir/${slug}/${f.key}`}
                    className="block p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)] hover:border-[var(--color-primary)]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-deep)]">
                      <Layers size={14} />
                      {getFormatLabel(f.key)}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {sayiTr(f.adet)} ünite
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {sehir} {formatMeta.name} kampanyası için{" "}
              <span className="text-gradient">teklif</span> alın
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedefinize ve bütçenize uygun {formatMeta.name.toLowerCase()}{" "}
              lokasyonlarını 15 dakika içinde önerelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
              <Link href={`/sehir/${slug}`} className="btn-secondary">
                {sehir} envanterinin tamamı
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
