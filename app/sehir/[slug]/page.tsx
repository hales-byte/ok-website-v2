import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

// Türkçe-bilinçli display capitalize: "PAZAR" → "Pazar", "clp" → "CLP" gibi
// karışık case'leri kullanıcıya gösterilebilir hale getirir.
//
// Strateji: 4 harften kısa girişler tamamen büyük (CLP, LED) — kısaltma
// olma olasılığı yüksek. Daha uzunlar Title Case (Türkçe locale ile,
// "İstanbul" / "Çarşamba" doğru çıkar). "HERGÜN" gibi tek kelimeler de
// 4'ten uzun → Title Case → "Hergün".
function displayCase(str: string | null): string {
  if (!str) return "—";
  const trimmed = str.trim();
  if (!trimmed) return "—";
  if (trimmed.length <= 4) return trimmed.toLocaleUpperCase("tr");
  return trimmed
    .toLocaleLowerCase("tr")
    .split(/(\s+|-)/)
    .map((part) =>
      part.match(/^\s+|-$/) ? part : part.charAt(0).toLocaleUpperCase("tr") + part.slice(1)
    )
    .join("");
}

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
  // Açık kolon listesi: birim_fiyat, lat/lng, notlar gibi hassas/internal
  // kolonlar bilinçli olarak çekilmiyor (network response'una sızmasın).
  // Ünite tablosu için: unite (format adı), toplam_face (yüz sayısı),
  // network_adeti (lokasyon ağı sayısı), asim_gunu (min kampanya süresi),
  // format_kategori (üst kategori) — bunlar persona-3 (switching marka)
  // için RFP doğrulamasına yetecek granülerlik.
  const { data } = await supabase
    .schema("website")
    .from("envanter")
    .select(
      "sehir, unite, toplam_face, network_adeti, asim_gunu, format_kategori"
    )
    .eq("sehir", sehirAdi)
    .eq("aktif", true);

  if (!data || data.length === 0) return null;

  const toplamYuz = data.reduce(
    (sum, d) => sum + (d.toplam_face || 0),
    0
  );
  const lokasyonSayisi = data.length;

  // Format dağılımı (unite alanına göre, sayım için)
  const formatlar: Record<string, number> = {};
  for (const item of data) {
    const unite = item.unite || "Diğer";
    formatlar[unite] = (formatlar[unite] || 0) + (item.toplam_face || 0);
  }

  // Ünite detay listesi: format adı, yüz sayısı, network adeti, min süre,
  // kategori. Tabloda yüz sayısına göre azalan sıralı render.
  type UniteDetay = {
    unite: string;
    toplamYuz: number;
    networkAdeti: number | null;
    asimGunu: string | null;
    kategori: string | null;
  };
  const uniteler: UniteDetay[] = data
    .map((d) => ({
      unite: d.unite || "Diğer",
      toplamYuz: d.toplam_face || 0,
      networkAdeti:
        typeof d.network_adeti === "number" ? d.network_adeti : null,
      asimGunu: d.asim_gunu ?? null,
      kategori: d.format_kategori ?? null,
    }))
    .sort((a, b) => b.toplamYuz - a.toplamYuz);

  return {
    sehir: sehirAdi,
    toplamYuz,
    lokasyonSayisi,
    formatlar,
    formatSayisi: Object.keys(formatlar).length,
    uniteler,
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

      {/* ÜNİTE DETAY TABLOSU — Persona 3 (switching marka) için RFP cephanesi */}
      <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30">
        <div className="container-narrow">
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Şeffaf envanter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {sehir} ünite detayları
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--color-text-secondary)]">
              {detay.uniteler.length} format kategorisi, asım günü ve
              lokasyon ağı bilgisiyle birlikte.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                  <th className="text-left p-4 font-semibold text-[var(--color-text-muted)]">
                    Format
                  </th>
                  <th className="text-right p-4 font-semibold text-[var(--color-text-muted)] whitespace-nowrap">
                    Reklam Yüzü
                  </th>
                  <th className="text-right p-4 font-semibold text-[var(--color-text-muted)] whitespace-nowrap hidden md:table-cell">
                    Network Ağı
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-text-muted)] whitespace-nowrap hidden md:table-cell">
                    Asım Günü
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-text-muted)] whitespace-nowrap hidden lg:table-cell">
                    Kategori
                  </th>
                </tr>
              </thead>
              <tbody>
                {detay.uniteler.map((u, i) => (
                  <tr
                    key={u.unite}
                    className={`border-b border-[var(--color-border-subtle)] ${
                      i % 2 === 0 ? "bg-transparent" : "bg-[var(--color-surface)]/30"
                    } last:border-b-0`}
                  >
                    <td className="p-4 font-medium align-top">{u.unite}</td>
                    <td className="p-4 text-right font-semibold text-[var(--color-primary)] align-top whitespace-nowrap">
                      {u.toplamYuz.toLocaleString("tr-TR")}
                    </td>
                    <td className="p-4 text-right text-[var(--color-text-secondary)] align-top hidden md:table-cell">
                      {u.networkAdeti != null
                        ? u.networkAdeti.toLocaleString("tr-TR")
                        : "—"}
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)] align-top hidden md:table-cell whitespace-nowrap">
                      {displayCase(u.asimGunu)}
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)] align-top hidden lg:table-cell">
                      {displayCase(u.kategori)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3">
            Ünite-bazlı (sokak/lokasyon) liste teklif aşamasında
            paylaşılır. Bu tablo format kategorisi düzeyinde kapsama
            doğrulamanız için açık.
          </p>
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
              Hedefinize ve bütçenize uygun lokasyonları 30 dakika içinde
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
