/**
 * BÖLGE MODÜLÜ — il sayfası render kararının tek mantık noktası.
 *
 * Karar verisi: src/data/bolge-config.json (standalone listesi + taşınan il →
 * bölge). Coğrafi partition (hangi il hangi bölgede): lib/turkiye-sehirler.ts
 * (tek coğrafi kaynak). Ünite/erişim/mecra HEP envanter.json'dan türer —
 * envanter.json'a DOKUNULMAZ (44 il / 36.141 aynen durur).
 */
import config from "./bolge-config.json";
import {
  getIller,
  getIl,
  getFormatlarByIl,
  getIlErisim,
  slugifyTr,
} from "./envanter";
import { SEHIRLER } from "@/lib/turkiye-sehirler";

export interface BolgeMeta {
  ad: string;
  slug: string;
}

export const BOLGELER: BolgeMeta[] = config.bolgeler;

const BY_SLUG = new Map(BOLGELER.map((b) => [b.slug, b]));
const BY_AD = new Map(BOLGELER.map((b) => [b.ad, b]));

export function getBolgeMeta(slug: string): BolgeMeta | undefined {
  return BY_SLUG.get(slug);
}

/* ── Standalone / taşınan kararı ── */

const STANDALONE = new Set<string>(config.standalone);
const MOVED: Record<string, string> = config.movedToBolge;

/** Bu il tek başına zengin /sehir sayfası olarak kalıyor mu? */
export function isStandalone(slug: string): boolean {
  return STANDALONE.has(slug);
}

/** Taşınan ilin 301 bölge hedefi (slug); standalone ise null. */
export function hedefBolgeSlug(slug: string): string | null {
  return MOVED[slug] ?? null;
}

/** Standalone iller (üniteye göre azalan) — /sehir generateStaticParams. */
export function getStandaloneIller() {
  return getIller().filter((i) => isStandalone(slugifyTr(i.il)));
}

/* ── Coğrafi partition (lib/turkiye-sehirler tek kaynak) ── */

const BOLGE_AD_BY_IL = new Map(SEHIRLER.map((s) => [s.ad, s.bolge as string]));

/** Envanter ilinin bölge meta'sı (harita panel linki vb. için). */
export function bolgeOfIl(slug: string): BolgeMeta | undefined {
  const il = getIl(slug);
  if (!il) return undefined;
  const ad = BOLGE_AD_BY_IL.get(il.il);
  return ad ? BY_AD.get(ad) : undefined;
}

/* ── Bölge özeti (ünite/erişim/mecra — hepsi envanterden) ── */

export interface BolgeIl {
  slug: string;
  il: string;
  toplam: number;
  erisim: number;
  standalone: boolean;
}

/** Bölgedeki tüm envanter illeri (standalone + taşınan), üniteye göre azalan. */
export function getIllerByBolge(bolgeSlug: string): BolgeIl[] {
  const meta = BY_SLUG.get(bolgeSlug);
  if (!meta) return [];
  return getIller()
    .filter((i) => BOLGE_AD_BY_IL.get(i.il) === meta.ad)
    .map((i) => {
      const slug = slugifyTr(i.il);
      return {
        slug,
        il: i.il,
        toplam: i.toplam,
        erisim: getIlErisim(slug),
        standalone: isStandalone(slug),
      };
    })
    .sort((a, b) => b.toplam - a.toplam);
}

export interface BolgeOzet {
  meta: BolgeMeta;
  iller: BolgeIl[];
  toplamUnite: number;
  toplamErisim: number;
  mecra: Array<{ format: string; adet: number }>;
}

/** Bir bölgenin tam özeti — hero/mecra/il listesi bundan beslenir. */
export function getBolgeOzet(bolgeSlug: string): BolgeOzet | null {
  const meta = BY_SLUG.get(bolgeSlug);
  if (!meta) return null;
  const iller = getIllerByBolge(bolgeSlug);
  const toplamUnite = iller.reduce((s, i) => s + i.toplam, 0);
  const toplamErisim = iller.reduce((s, i) => s + i.erisim, 0);
  const agg = new Map<string, number>();
  for (const i of iller)
    for (const { format, adet } of getFormatlarByIl(i.slug))
      agg.set(format, (agg.get(format) ?? 0) + adet);
  const mecra = [...agg.entries()]
    .map(([format, adet]) => ({ format, adet }))
    .sort((a, b) => b.adet - a.adet);
  return { meta, iller, toplamUnite, toplamErisim, mecra };
}

/** "~6,7M" / tam sayı — bölge toplam erişim etiketi. */
export function erisimKisa(e: number): string {
  if (e >= 1_000_000) {
    return `~${(e / 1_000_000).toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
  }
  return e.toLocaleString("tr-TR");
}
