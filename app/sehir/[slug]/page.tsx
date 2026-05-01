import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

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

// Aktif şehir listesini çek
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

// Slug'tan orijinal şehir adını bul
async function findSehirBySlug(slug: string): Promise<string | null> {
  const sehirler = await getSehirler();
  return sehirler.find((s) => slugify(s) === slug) || null;
}

// Bir şehirdeki envanter detayı
async function getSehirDetay(sehirAdi: string) {
  const supabase = getSupabase();
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select("*")
    .eq("sehir", sehirAdi)
    .eq("aktif", true);

  if (!data || data.length === 0) return null;

  const toplamYuz = data.reduce(
    (sum, d) => sum + (d.toplam_face || 0),
    0
  );
  const lokasyonSayisi = data.length;

  // Format dağılımı (unite alanına göre)
  const formatlar: Record<string, number> = {};
  for (const item of data) {
    const unite = item.unite || "Diğer";
    formatlar[unite] = (formatlar[unite] || 0) + (item.toplam_face || 0);
  }

  return {
    sehir: sehirAdi,
    toplamYuz,
    lokasyonSayisi,
    formatlar,
    formatSayisi: Object.keys(formatlar).length,
  };
}

// Build time'da tüm şehirler için statik sayfa üret
export async function generateStaticParams() {
  const sehirler = await getSehirler();
  return sehirler.map((sehir) => ({
    slug: slugify(sehir),
  }));
}

// Her sayfa için dinamik SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sehir = await findSehirBySlug(slug);

  if (!sehir) {
    return { title: "Sayfa bulunamadı" };
  }

  return {
    title: `${sehir} OOH Reklam`,
    description: `${sehir} ilinde billboard, CLP, megalight ve dijital OOH reklam çözümleri. Geniş lokasyon ağı, hızlı teklif, profesyonel takip.`,
  };
}

export default async function SehirPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sehir = await findSehirBySlug(slug);

  if (!sehir) {
    notFound();
  }

  const detay = await getSehirDetay(sehir);
  if (!detay) {
    notFound();
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <MapPin size={16} />
              {sehir}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">{sehir}</span>
              &apos;da OOH Reklam
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {sehir}&apos;daki{" "}
              {detay.toplamYuz.toLocaleString("tr-TR")}+ reklam yüzü ile
              markanızı şehrin doğru noktalarında konumlandırın.{" "}
              {detay.lokasyonSayisi} lokasyondan oluşan envanterimizle
              billboard, CLP, megalight ve dijital format seçenekleri hazır.
            </p>
          </div>
        </div>
      </section>

      {/* SAYAÇ */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {detay.toplamYuz.toLocaleString("tr-TR")}+
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
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {detay.formatSayisi}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Format Tipi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT DAĞILIMI */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {sehir} envanteri
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Format bazında reklam yüzü dağılımı.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(detay.formatlar)
              .sort((a, b) => b[1] - a[1])
              .map(([format, sayi]) => (
                <div
                  key={format}
                  className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]"
                >
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {sayi.toLocaleString("tr-TR")}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {format}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {sehir} kampanyası için{" "}
              <span className="text-gradient">teklif</span> alın
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedefinize ve bütçenize uygun lokasyonları 24 saat içinde
              önerelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
              <Link href="/hizmetler" className="btn-secondary">
                Formatları İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
