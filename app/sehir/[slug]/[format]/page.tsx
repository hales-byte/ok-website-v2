import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

// Format meta bilgileri (slug + insan dostu isim + açıklama)
const FORMAT_META: Record<
  string,
  { name: string; tagline: string; description: string }
> = {
  billboard: {
    name: "Billboard",
    tagline: "Yüksek görünürlük, geniş etki alanı",
    description:
      "Ana arterler ve şehir girişlerinde konumlandırılan, yüksek görünürlüklü reklam yüzleri.",
  },
  clp: {
    name: "CLP / Raket",
    tagline: "Şehir merkezleri ve duraklarda yaya trafiğine yönelik",
    description:
      "Aydınlatmalı, dikey reklam panelleri. Yoğun yaya bölgelerinde tekrarlı temas sağlar.",
  },
  megalight: {
    name: "Megalight",
    tagline: "Premium konumlarda büyük format aydınlatmalı panel",
    description:
      "Ana cadde ve kavşaklarda yer alan, gece de aktif aydınlatmalı reklam paneli.",
  },
  led: {
    name: "LED & Dijital",
    tagline: "Dinamik içerik, gerçek zamanlı yayın",
    description:
      "Hareketli görsel ve video desteği ile değişen içerik gösterimi yapan dijital ekranlar.",
  },
  giantboard: {
    name: "Giantboard",
    tagline: "Anıtsal boyut, maksimum etki",
    description:
      "Standart billboard'lardan çok daha büyük, anıtsal ölçekte reklam yüzleri.",
  },
  "pole-banner": {
    name: "Pole Banner",
    tagline: "Cadde ve bulvar boyunca tekrarlı görünürlük",
    description:
      "Aydınlatma direklerine asılan dikey banner reklamlar, kampanya temalarını destekler.",
  },
  havalimani: {
    name: "Havalimanı LED",
    tagline: "Premium kitleye doğrudan erişim",
    description:
      "Havalimanı check-in, gümrük ve gate noktalarındaki dijital ekranlar.",
  },
  diger: {
    name: "Özel Formatlar",
    tagline: "Otobüs, tramvay, totem ve özel uygulamalar",
    description:
      "Standart formatların dışındaki özel reklam alanları ve kreatif uygulamalar.",
  },
};

// Türkçe karakterleri slug formatına çevir
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

// Şehir + format kombinasyonunun gerçek envanteri
async function getKombinasyon(sehirAdi: string, formatKategori: string) {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("*")
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
    lokasyonlar: data,
  };
}

// Build time'da tüm gerçek kombinasyonlar için statik sayfa üret
export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir, format_kategori")
    .eq("aktif", true);

  if (!data) return [];

  // Eşsiz şehir + format kombinasyonları
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

// Dinamik SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}): Promise<Metadata> {
  const { slug, format } = await params;
  const sehir = await findSehirBySlug(slug);
  const formatMeta = FORMAT_META[format];

  if (!sehir || !formatMeta) {
    return { title: "Sayfa bulunamadı" };
  }

  return {
    title: `${sehir} ${formatMeta.name} Reklam`,
    description: `${sehir} ilinde ${formatMeta.name} reklam çözümleri. ${formatMeta.description} Hızlı teklif, profesyonel takip.`,
  };
}

export default async function SehirFormatPage({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}) {
  const { slug, format } = await params;
  const sehir = await findSehirBySlug(slug);
  const formatMeta = FORMAT_META[format];

  if (!sehir || !formatMeta) {
    notFound();
  }

  const detay = await getKombinasyon(sehir, format);
  if (!detay) {
    notFound();
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          {/* Breadcrumb */}
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

      {/* SAYAÇ */}
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

      {/* FORMAT AÇIKLAMASI */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Format hakkında
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
                {formatMeta.name} formatını detaylı incele
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {sehir} {formatMeta.name} kampanyası için{" "}
              <span className="text-gradient">teklif</span> alın
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedefinize ve bütçenize uygun {formatMeta.name.toLowerCase()}{" "}
              lokasyonlarını 24 saat içinde önerelim.
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
