import type { MetadataRoute } from "next";
import { CONTENT_REVISION, INVENTORY_REVISION } from "@/lib/site-meta";
import { getIller, getKombinasyonlar, slugifyTr } from "@/src/data/envanter";

const BASE_URL = "https://objektifkriter.com.tr";

/**
 * Sitemap — tamamen statik, envanter.json'dan türetilir (Supabase kaldırıldı).
 * lastmod mantığı:
 *  - Envanterden türeyen sayfalar (şehir, şehir×format, /envanter):
 *    INVENTORY_REVISION = envanter.json'daki "guncelleme" tarihi.
 *  - Statik içerik sayfaları: CONTENT_REVISION (lib/site-meta.ts).
 * Böylece Google bot'a "her build'de her şey değişti" sinyali gitmez.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const contentRev = CONTENT_REVISION;
  const inventoryRev = INVENTORY_REVISION;

  // 1. STATİK SAYFALAR
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: contentRev, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/hizmetler`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/hakkimizda`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/iletisim`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/teklif-al`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/envanter`, lastModified: inventoryRev, changeFrequency: "weekly", priority: 0.8 },
    // Segment landing'leri (persona bazlı)
    { url: `${BASE_URL}/markalar`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ajanslar`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ilk-kampanyaniz`, lastModified: contentRev, changeFrequency: "monthly", priority: 0.8 },
    // Hukuki sayfalar
    { url: `${BASE_URL}/kvkk-aydinlatma`, lastModified: contentRev, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/gizlilik`, lastModified: contentRev, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cerez-politikasi`, lastModified: contentRev, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/kullanim-kosullari`, lastModified: contentRev, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 2. ŞEHİR SAYFALARI — envanter.json'daki 45 il
  const sehirPages: MetadataRoute.Sitemap = getIller().map((il) => ({
    url: `${BASE_URL}/sehir/${slugifyTr(il.il)}`,
    lastModified: inventoryRev,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 3. ŞEHİR×FORMAT SAYFALARI — sadece üretilen kombinasyonlar (adet ≥ 5)
  const kombinasyonPages: MetadataRoute.Sitemap = getKombinasyonlar().map(
    ({ slug, format }) => ({
      url: `${BASE_URL}/sehir/${slug}/${format}`,
      lastModified: inventoryRev,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...sehirPages, ...kombinasyonPages];
}
