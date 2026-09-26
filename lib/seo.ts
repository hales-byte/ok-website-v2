import type { Metadata } from "next";

/**
 * Sitenin RESMİ adresi — canonical, og:url, sitemap, robots ve JSON-LD
 * yalnız buradan beslenir. (Hukuki metinlerdeki "Web:" satırı bilerek hariç.)
 */
export const SITE_URL = "https://www.objektifkriter.com.tr";
export const SITE_NAME = "Objektif Kriter";

/** Kök-göreli yolu mutlak adrese çevirir: "/mecralar" → "https://www…/mecralar" */
export function siteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** app/opengraph-image.tsx'in ürettiği site geneli paylaşım görseli */
const VARSAYILAN_GORSEL = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Objektif Kriter — Türkiye OOH Reklam",
};

/**
 * Sayfa metadata'sı: canonical + openGraph + twitter AYNI değerlerle üretilir.
 *
 * Neden: Next metadata'yı sığ birleştirir — sayfa kendi `openGraph`'ını
 * tanımlayınca kökteki paylaşım görseli düşer. Görsel burada açıkça eklenir.
 * Kendi opengraph-image dosyası olan rotalar `kendiGorseli: true` verir;
 * o zaman görsel alanı boş bırakılır ve rotanın dosyası devreye girer.
 */
export function sayfaMeta({
  title,
  description,
  path,
  absolute = false,
  kendiGorseli = false,
}: {
  title: string;
  description: string;
  path: string;
  /** true → layout'taki "%s | Objektif Kriter" şablonu uygulanmaz */
  absolute?: boolean;
  kendiGorseli?: boolean;
}): Metadata {
  const tamBaslik = absolute ? title : `${title} | ${SITE_NAME}`;
  const url = siteUrl(path);
  const images = kendiGorseli ? undefined : [VARSAYILAN_GORSEL];

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: SITE_NAME,
      url,
      title: tamBaslik,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: tamBaslik,
      description,
      ...(images && { images }),
    },
  };
}
