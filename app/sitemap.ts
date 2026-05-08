import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { CONTENT_REVISION, INVENTORY_REVISION } from "@/lib/site-meta";

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
  // Sabit revizyon tarihleri — Google bot her build'de "değişti" sinyali
  // almasın diye lib/site-meta.ts'ten geliyor. İçerik gerçekten değiştiğinde
  // o dosyadaki tarih güncellenir.
  const contentRev = CONTENT_REVISION;
  const inventoryRev = INVENTORY_REVISION;

  // 1. STATİK SAYFALAR
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: contentRev,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/teklif-al`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/envanter`,
      lastModified: inventoryRev,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Segment landing'leri (persona bazlı)
    {
      url: `${BASE_URL}/markalar`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ajanslar`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ilk-kampanyaniz`,
      lastModified: contentRev,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Hukuki sayfalar
    {
      url: `${BASE_URL}/kvkk-aydinlatma`,
      lastModified: contentRev,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/gizlilik`,
      lastModified: contentRev,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cerez-politikasi`,
      lastModified: contentRev,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kullanim-kosullari`,
      lastModified: contentRev,
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

    // updated_at varsa gerçek değişiklik tarihini sitemap'e koy.
    // Yoksa Google "her sayfa her gün değişti" sinyali alır → crawl bütçesi heba olur.
    const { data, error } = await supabase
      .schema("website")
      .from("envanter")
      .select("sehir, format_kategori, updated_at")
      .eq("aktif", true);

    if (error || !data) {
      console.error("Sitemap: Supabase hatası", error);
      return staticPages;
    }

    // 2a. Şehir bazlı son değişiklik (max updated_at per şehir)
    const sehirLastMod = new Map<string, Date>();
    const kombinasyonLastMod = new Map<string, Date>();

    for (const row of data) {
      if (!row.sehir) continue;
      // updated_at yoksa lib/site-meta.ts'teki sabit envanter revizyonuna düş
      const rowDate = row.updated_at ? new Date(row.updated_at) : inventoryRev;

      const prevSehir = sehirLastMod.get(row.sehir);
      if (!prevSehir || rowDate > prevSehir) {
        sehirLastMod.set(row.sehir, rowDate);
      }

      if (row.format_kategori) {
        const key = `${row.sehir}|${row.format_kategori}`;
        const prevKombo = kombinasyonLastMod.get(key);
        if (!prevKombo || rowDate > prevKombo) {
          kombinasyonLastMod.set(key, rowDate);
        }
      }
    }

    const sehirPages: MetadataRoute.Sitemap = Array.from(
      sehirLastMod.entries()
    ).map(([sehir, lastMod]) => ({
      url: `${BASE_URL}/sehir/${slugify(sehir)}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // 2b. Şehir + format kombinasyon sayfaları
    const kombinasyonPages: MetadataRoute.Sitemap = Array.from(
      kombinasyonLastMod.entries()
    ).map(([kombo, lastMod]) => {
      const [sehir, format] = kombo.split("|");
      return {
        url: `${BASE_URL}/sehir/${slugify(sehir)}/${format}`,
        lastModified: lastMod,
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
