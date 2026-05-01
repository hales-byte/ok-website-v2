import type { MetadataRoute } from "next";

const SITE_URL = "https://objektifkriter.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Statik sayfalar
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

  // Hizmetler sayfası anchor'ları (her format ayrı SEO sinyali)
  const formatAnchors = [
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

  return [...staticPages, ...formatAnchors];
}