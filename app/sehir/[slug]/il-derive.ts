/**
 * İL SAYFASI TÜRETİMLERİ — iç linkler + JSON-LD şema kurucular.
 * Hepsi envanter.json'dan türer; page.tsx'i ince tutmak için burada yaşar.
 */
import {
  getIl,
  getIller,
  getFormatlarByIl,
  FORMAT_PAGE_KEY,
  MIN_FORMAT_PAGE_UNITE,
  formatAdi,
  sayiTr,
  slugifyTr,
} from "@/src/data/envanter";
import type { SSSMaddesi } from "@/src/data/content/sss";
import { SEHIRLER } from "@/lib/turkiye-sehirler";
import { isStandalone } from "@/src/data/bolgeler";

const BASE_URL = "https://objektifkriter.com.tr";

/** İl adı → bölge (lib/turkiye-sehirler tek kaynak) */
const BOLGE_BY_AD = new Map(SEHIRLER.map((s) => [s.ad, s.bolge]));

export interface KomsuIl {
  slug: string;
  il: string;
  toplam: number;
}

/**
 * Aynı bölgeden, envanteri olan en büyük komşu iller (kendisi hariç).
 * SADECE standalone iller — taşınan illere link vermeyiz (301 zinciri olmasın).
 * Bölge eşi yetmezse en büyük standalone illerle tamamlanır (sayfa dolu kalsın).
 */
export function getKomsuIller(slug: string, adet = 4): KomsuIl[] {
  const il = getIl(slug);
  if (!il) return [];
  const bolge = BOLGE_BY_AD.get(il.il);

  const hepsi = getIller()
    .filter((i) => slugifyTr(i.il) !== slug && isStandalone(slugifyTr(i.il)))
    .map((i) => ({ slug: slugifyTr(i.il), il: i.il, toplam: i.toplam }));

  const ayniBolge = hepsi.filter((i) => BOLGE_BY_AD.get(i.il) === bolge);
  const secilen = [...ayniBolge];
  if (secilen.length < adet) {
    for (const i of hepsi) {
      if (secilen.length >= adet) break;
      if (!secilen.some((s) => s.slug === i.slug)) secilen.push(i);
    }
  }
  return secilen.slice(0, adet);
}

export interface MecraLink {
  pageKey: string;
  label: string;
  adet: number;
}

/** İlin sayfası olan (adet ≥ eşik) en büyük mecraları — iç link için. */
export function getIlMecraSayfalari(slug: string, adet = 2): MecraLink[] {
  return getFormatlarByIl(slug)
    .filter(({ format, adet: a }) => {
      const pageKey = FORMAT_PAGE_KEY[format];
      return pageKey != null && a >= MIN_FORMAT_PAGE_UNITE;
    })
    .slice(0, adet)
    .map(({ format, adet: a }) => ({
      pageKey: FORMAT_PAGE_KEY[format] as string,
      label: formatAdi(format),
      adet: a,
    }));
}

/** İl sayfası için Service + BreadcrumbList JSON-LD (rich result). */
export function buildIlJsonLd(slug: string) {
  const il = getIl(slug);
  if (!il) return null;
  const sehir = il.il;
  const pageUrl = `${BASE_URL}/sehir/${slug}`;
  const mecraSayisi = Object.keys(il.formatlar).length;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sehir} Açıkhava Reklam`,
    serviceType: "Açıkhava (OOH) Reklam",
    description: `${sehir} ilinde ${sayiTr(il.toplam)} reklam ünitesi, ${mecraSayisi} mecra türü. Billboard, CLP, megalight ve dijital açıkhava çözümleri.`,
    provider: { "@type": "Organization", name: "Objektif Kriter", url: BASE_URL },
    areaServed: {
      "@type": "City",
      name: sehir,
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
      { "@type": "ListItem", position: 3, name: sehir, item: pageUrl },
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
