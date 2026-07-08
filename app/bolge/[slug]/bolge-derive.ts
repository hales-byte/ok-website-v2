/**
 * BÖLGE SAYFASI TÜRETİMLERİ — Service + BreadcrumbList + FAQPage JSON-LD.
 * Veri getBolgeOzet'ten (envanter.json) türer; page.tsx'i ince tutar.
 */
import type { SSSMaddesi } from "@/src/data/content/sss";
import { getBolgeOzet } from "@/src/data/bolgeler";
import { sayiTr } from "@/src/data/envanter";

const BASE_URL = "https://objektifkriter.com.tr";

/** Bölge için Service + BreadcrumbList JSON-LD. */
export function buildBolgeJsonLd(bolgeSlug: string) {
  const b = getBolgeOzet(bolgeSlug);
  if (!b) return null;
  const pageUrl = `${BASE_URL}/bolge/${bolgeSlug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${b.meta.ad} Bölgesi Açıkhava Reklam`,
    serviceType: "Açıkhava (OOH) Reklam",
    description: `${b.meta.ad} bölgesinde ${b.iller.length} ilde ${sayiTr(b.toplamUnite)} reklam ünitesi, ${b.mecra.length} mecra türü. Billboard, CLP, megalight ve dijital açıkhava çözümleri.`,
    provider: { "@type": "Organization", name: "Objektif Kriter", url: BASE_URL },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${b.meta.ad} Bölgesi`,
      address: { "@type": "PostalAddress", addressCountry: "TR" },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      priceRange: "$$",
      availability: "https://schema.org/InStock",
    },
    url: pageUrl,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Envanter", item: `${BASE_URL}/envanter` },
      { "@type": "ListItem", position: 3, name: `${b.meta.ad} Bölgesi`, item: pageUrl },
    ],
  };

  return { service, breadcrumb };
}

/** SSS dizisinden FAQPage JSON-LD. */
export function buildFaqJsonLd(maddeler: SSSMaddesi[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: maddeler.map((m) => ({
      "@type": "Question",
      name: m.soru,
      acceptedAnswer: { "@type": "Answer", text: m.cevap },
    })),
  };
}
