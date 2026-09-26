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
import { TR_IL_PATHS } from "@/src/data/tr-il-paths";
import { bbox } from "./IlHarita";
import { isStandalone } from "@/src/data/bolgeler";
import { SITE_URL as BASE_URL } from "@/lib/seo";

export interface KomsuIl {
  slug: string;
  il: string;
  toplam: number;
}

/** İl merkezi ≈ harita silüetinin sınır kutusu ortası (derleme anında, dış servis yok). */
const MERKEZ = new Map(
  TR_IL_PATHS.map((p) => {
    const k = bbox(p.d);
    return [p.id, { x: (k.x0 + k.x1) / 2, y: (k.y0 + k.y1) / 2 }];
  })
);

/**
 * Coğrafi olarak en yakın iller (kendisi hariç), merkezler arası mesafeye göre.
 * SADECE standalone iller — taşınan illere link vermeyiz (301 zinciri olmasın).
 */
export function getKomsuIller(slug: string, adet = 4): KomsuIl[] {
  const merkez = MERKEZ.get(slug);
  if (!getIl(slug) || !merkez) return [];

  return getIller()
    .flatMap((i) => {
      const s = slugifyTr(i.il);
      const m = MERKEZ.get(s);
      if (s === slug || !isStandalone(s) || !m) return [];
      return [{ slug: s, il: i.il, toplam: i.toplam, mesafe: Math.hypot(m.x - merkez.x, m.y - merkez.y) }];
    })
    .sort((a, b) => a.mesafe - b.mesafe)
    .slice(0, adet)
    .map(({ slug: s, il, toplam }) => ({ slug: s, il, toplam }));
}

export interface MecraLink {
  pageKey: string;
  label: string;
  adet: number;
}

/**
 * İlin sayfası üretilen TÜM mecraları (adet ≥ eşik), adede göre azalan — iç link için.
 * Kural generateStaticParams'la (getKombinasyonlar) aynı: sayfa anahtarı başına toplam.
 */
export function getIlMecraSayfalari(slug: string): MecraLink[] {
  const agg = new Map<string, MecraLink>();
  for (const { format, adet } of getFormatlarByIl(slug)) {
    const pageKey = FORMAT_PAGE_KEY[format];
    if (!pageKey) continue;
    const onceki = agg.get(pageKey);
    agg.set(pageKey, onceki
      ? { ...onceki, adet: onceki.adet + adet }
      : { pageKey, label: formatAdi(format), adet });
  }
  return [...agg.values()]
    .filter((m) => m.adet >= MIN_FORMAT_PAGE_UNITE)
    .sort((a, b) => b.adet - a.adet);
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
