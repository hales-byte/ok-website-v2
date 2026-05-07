import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://objektifkriter.com.tr";

// Türkçe karakterleri slug formatına çevir (sehir/[slug] ile aynı mantık)
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
  const now = new Date();

  // 1. STATİK SAYFALAR
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/teklif-al`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/envanter`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Segment landing'leri (persona bazlı)
    {
      url: `${BASE_URL}/markalar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ajanslar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ilk-kampanyaniz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Hukuki sayfalar
    {
      url: `${BASE_URL}/kvkk-aydinlatma`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/gizlilik`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cerez-politikasi`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kullanim-kosullari`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. DİNAMİK SAYFALAR — Supabase'den
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .schema("website")
      .from("envanter")
      .select("sehir, format_kategori")
      .eq("aktif", true);

    if (error || !data) {
      console.error("Sitemap: Supabase hatası", error);
      return staticPages;
    }

    // 2a. Şehir landing sayfaları (her şehir için 1 URL)
    const sehirSet = new Set<string>();
    const kombinasyonSet = new Set<string>();

    for (const row of data) {
      if (row.sehir) {
        sehirSet.add(row.sehir);
      }
      if (row.sehir && row.format_kategori) {
        kombinasyonSet.add(`${row.sehir}|${row.format_kategori}`);
      }
    }

    const sehirPages: MetadataRoute.Sitemap = Array.from(sehirSet).map(
      (sehir) => ({
        url: `${BASE_URL}/sehir/${slugify(sehir)}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    );

    // 2b. Şehir + format kombinasyon sayfaları
    const kombinasyonPages: MetadataRoute.Sitemap = Array.from(
      kombinasyonSet
    ).map((kombo) => {
      const [sehir, format] = kombo.split("|");
      return {
        url: `${BASE_URL}/sehir/${slugify(sehir)}/${format}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });

    return [...staticPages, ...sehirPages, ...kombinasyonPages];
  } catch (e) {
    console.error("Sitemap: beklenmeyen hata", e);
    return staticPages;
  }
}
