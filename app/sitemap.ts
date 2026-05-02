import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://objektifkriter.com.tr";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // 1. Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/hizmetler`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/iletisim`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Hizmetler anchor'ları
  const formatAnchors: MetadataRoute.Sitemap = [
    "billboard",
    "clp",
    "megalight",
    "led",
    "giantboard",
    "pole-banner",
    "havalimani",
  ].map((slug) => ({
    url: `${SITE_URL}/hizmetler#${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 3. Dinamik şehir + format sayfaları (Supabase'ten)
  const dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
      .schema("website")
      .from("envanter")
      .select("sehir, format_kategori")
      .eq("aktif", true);

    if (data) {
      // Eşsiz şehirler
      const sehirler = new Set<string>();
      // Eşsiz şehir+format kombinasyonları
      const kombinasyonlar = new Set<string>();

      for (const item of data) {
        if (item.sehir) {
          sehirler.add(item.sehir);
          if (item.format_kategori) {
            kombinasyonlar.add(`${item.sehir}|${item.format_kategori}`);
          }
        }
      }

      // Şehir landing'leri
      for (const sehir of sehirler) {
        dynamicPages.push({
          url: `${SITE_URL}/sehir/${slugify(sehir)}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }

      // Şehir + format kombinasyonları
      for (const kombo of kombinasyonlar) {
        const [sehir, format] = kombo.split("|");
        dynamicPages.push({
          url: `${SITE_URL}/sehir/${slugify(sehir)}/${format}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap dynamic pages error:", error);
    // Hata olursa statik sayfalar yine döner
  }

  return [...staticPages, ...formatAnchors, ...dynamicPages];
}
