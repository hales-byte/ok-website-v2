import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight, Layers } from "lucide-react";
import type { Metadata } from "next";
import { getFormatByKey, getFormatLabel } from "@/lib/formats";

function slugify(str: string): string {
  return str
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getSehirler(): Promise<string[]> {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir")
    .eq("aktif", true);

  if (!data) return [];
  return [...new Set(data.map((d) => d.sehir))].filter(Boolean) as string[];
}

async function findSehirBySlug(slug: string): Promise<string | null> {
  const sehirler = await getSehirler();
  return sehirler.find((s) => slugify(s) === slug) || null;
}

async function getKombinasyon(sehirAdi: string, formatKategori: string) {
  const supabase = getSupabase();
  // Açık kolon listesi: birim_fiyat ve internal not kolonlarının network
  // response'una sızmasını engeller. UI'da sadece sayım kullanılıyor.
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("toplam_face")
    .eq("sehir", sehirAdi)
    .eq("format_kategori", formatKategori)
    .eq("aktif", true);

  if (!data || data.length === 0) return null;

  const toplamYuz = data.reduce(
    (sum, d) => sum + (d.toplam_face || 0),
    0
  );

  return {
    lokasyonSayisi: data.length,
    toplamYuz,
  };
}

/**
 * İç linkleme için: aynı şehirde aktif olan farklı formatlar.
 * Bu sayfa zaten {sehirAdi, formatKategori} altında; diğer formatları
 * "kendi sayfasına link" olarak gösteriyoruz.
 */
async function getAyniSehirDigerFormatlar(
  sehirAdi: string,
  mevcutFormat: string
) {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("format_kategori, toplam_face")
    .eq("sehir", sehirAdi)
    .eq("aktif", true);

  if (!data) return [];

  const map = new Map<string, { lokasyon: number; yuz: number }>();
  for (const row of data) {
    if (!row.format_kategori || row.format_kategori === mevcutFormat) continue;
    const prev = map.get(row.format_kategori) ?? { lokasyon: 0, yuz: 0 };
    map.set(row.format_kategori, {
      lokasyon: prev.lokasyon + 1,
      yuz: prev.yuz + (row.toplam_face || 0),
    });
  }
  return Array.from(map.entries())
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.yuz - a.yuz);
}

/**
 * İç linkleme için: aynı format farklı şehirlerde — orphan sayfa fix.
 * En çok reklam yüzü olan ilk N şehir.
 */
async function getAyniFormatDigerSehirler(
  formatKategori: string,
  mevcutSehir: string,
  limit = 9
) {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir, toplam_face")
    .eq("format_kategori", formatKategori)
    .eq("aktif", true);

  if (!data) return [];

  const map = new Map<string, { lokasyon: number; yuz: number }>();
  for (const row of data) {
    if (!row.sehir || row.sehir === mevcutSehir) continue;
    const prev = map.get(row.sehir) ?? { lokasyon: 0, yuz: 0 };
    map.set(row.sehir, {
      lokasyon: prev.lokasyon + 1,
      yuz: prev.yuz + (row.toplam_face || 0),
    });
  }
  return Array.from(map.entries())
    .map(([sehir, v]) => ({ sehir, ...v }))
    .sort((a, b) => b.yuz - a.yuz)
    .slice(0, limit);
}

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir, format_kategori")
    .eq("aktif", true);

  if (!data) return [];

  const kombinasyonlar = new Set<string>();
  for (const item of data) {
    if (item.sehir && item.format_kategori) {
      kombinasyonlar.add(`${item.sehir}|${item.format_kategori}`);
    }
  }

  return Array.from(kombinasyonlar).map((kombo) => {
    const [sehir, format] = kombo.split("|");
    return {
      slug: slugify(sehir),
      format,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}): Promise<Metadata> {
  const { slug, format } = await params;
  const sehir = await findSehirBySlug(slug);
  const formatMeta = getFormatByKey(format);

  if (!sehir || !formatMeta) {
    return { title: "Sayfa bulunamadı" };
  }

  // Supabase'den şehir-spesifik detay → her sayfaya unique description
  const detay = await getKombinasyon(sehir, format);
  const lokasyonText = detay
    ? `${detay.lokasyonSayisi} lokasyonda ${detay.toplamYuz.toLocaleString("tr-TR")} reklam yüzü`
    : "aktif lokasyonlar";

  const formatLow = formatMeta.name.toLowerCase();

  return {
    title: `${sehir} ${formatMeta.name} Reklam — Fiyat ve Lokasyonlar`,
    description: `${sehir}'da ${formatLow} reklam: ${lokasyonText}. ${formatMeta.tagline}. 30 dakikada teklif, hedeflenmiş lokasyon önerisi.`,
    alternates: {
      canonical: `https://objektifkriter.com.tr/sehir/${slug}/${format}`,
    },
    openGraph: {
      title: `${sehir} ${formatMeta.name} Reklam`,
      description: `${sehir} OOH reklam: ${lokasyonText}. ${formatMeta.tagline}.`,
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
  const sehir = await findSehirBySlug(slug);
  const formatMeta = getFormatByKey(format);

  if (!sehir || !formatMeta) {
    notFound();
  }

  const detay = await getKombinasyon(sehir, format);
  if (!detay) {
    notFound();
  }

  // İç linkleme için ek veri (paralel)
  const [digerFormatlar, digerSehirler] = await Promise.all([
    getAyniSehirDigerFormatlar(sehir, format),
    getAyniFormatDigerSehirler(format, sehir),
  ]);

  // JSON-LD: Service + BreadcrumbList — SEO rich-result için
  const baseUrl = "https://objektifkriter.com.tr";
  const pageUrl = `${baseUrl}/sehir/${slug}/${format}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sehir} ${formatMeta.name} Reklam`,
    serviceType: `${formatMeta.name} OOH Reklam`,
    description: `${sehir} ilinde ${formatMeta.name.toLowerCase()} reklam çözümleri — ${detay.lokasyonSayisi} lokasyonda ${detay.toplamYuz} reklam yüzü.`,
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
    // priceBand spesifik rakamları kaldırıldı (UI'da "fiyatı sor" stratejisiyle
    // tutarlı olsun); priceRange ile yine "fiyat aralığı var" sinyali
    // korunur — Google rich snippet için yeterli.
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana sayfa",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${baseUrl}/hizmetler`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: sehir,
        item: `${baseUrl}/sehir/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: formatMeta.name,
        item: pageUrl,
      },
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
              &apos;da {formatMeta.name} Reklam
            </h1>
            <p className="text-lg text-[var(--color-primary)]">
              {formatMeta.tagline}
            </p>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {sehir}&apos;daki {detay.lokasyonSayisi} {formatMeta.name}{" "}
              lokasyonunda toplam{" "}
              {detay.toplamYuz.toLocaleString("tr-TR")} reklam yüzü ile
              kampanyanız için doğru görünürlüğü hazırlıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {detay.toplamYuz.toLocaleString("tr-TR")}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Reklam Yüzü
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {detay.lokasyonSayisi}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Lokasyon
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
                Aynı format farklı şehirlerde
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
                <li key={d.sehir}>
                  <Link
                    href={`/sehir/${slugify(d.sehir)}/${format}`}
                    className="block p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-deep)]">
                      <MapPin size={14} />
                      {d.sehir}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {d.lokasyon} lokasyon · {d.yuz.toLocaleString("tr-TR")} yüz
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
                {sehir}&apos;da {formatMeta.name} dışında format alternatifleri
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-secondary)]">
                Kampanyanızın etkisini farklı temas noktalarıyla artırmak için{" "}
                {sehir}&apos;daki diğer reklam üniteleri:
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
                      {f.lokasyon} lokasyon · {f.yuz.toLocaleString("tr-TR")} yüz
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
              lokasyonlarını 30 dakika içinde önerelim.
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
