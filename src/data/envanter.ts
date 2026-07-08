/**
 * STATİK VERİ MODÜLÜ — src/data/envanter.json'un tek erişim noktası.
 *
 * KURAL (CLAUDE.md): Sitedeki HİÇBİR rakam elle yazılmaz; hepsi bu modülden
 * türetilir. envanter.json değişince site rakamları otomatik güncellenir.
 *
 * Eski Supabase sorgularının drop-in karşılıkları buradadır.
 */
import rawData from "./envanter.json";
import type { EnvanterData, IlKaydi } from "./types";

export const ENVANTER = rawData as unknown as EnvanterData;

/* ─────────────── Slug yardımcıları ─────────────── */

/**
 * Türkçe karakter dönüşümlü slug ("Gaziantep"→"gaziantep", "İzmir"→"izmir").
 * app/sehir sayfalarındaki mevcut slugify ile birebir aynı mantık —
 * tek kopya burada yaşar.
 */
export function slugifyTr(str: string): string {
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

/* ─────────────── İl erişimi ─────────────── */

/** Tüm iller — toplam ünite sayısına göre azalan sırada */
export function getIller(): IlKaydi[] {
  return [...ENVANTER.iller].sort((a, b) => b.toplam - a.toplam);
}

/** Slug'dan il kaydı ("gaziantep" → Gaziantep kaydı) */
export function getIl(slug: string): IlKaydi | undefined {
  return ENVANTER.iller.find((i) => slugifyTr(i.il) === slug);
}

/** İl adından slug */
export function ilSlug(il: string): string {
  return slugifyTr(il);
}

/** Bir ilin format dağılımı (envanter yazımıyla, adede göre azalan) */
export function getFormatlarByIl(slug: string): Array<{ format: string; adet: number }> {
  const il = getIl(slug);
  if (!il) return [];
  return Object.entries(il.formatlar)
    .map(([format, adet]) => ({ format, adet }))
    .sort((a, b) => b.adet - a.adet);
}

/* ─────────────── Format (mecra) eşlemesi ─────────────── */

/**
 * Envanterdeki mecra adı → sayfa format anahtarı (lib/formats.ts key'i).
 * SADECE kendi sayfası olan 7 ana kategori eşlenir; kalan mecralar il
 * sayfasındaki tabloda görünür ama ayrı sayfa üretmez (G4'te genişletilecek).
 * null = sayfası yok.
 */
export const FORMAT_PAGE_KEY: Record<string, string | null> = {
  "BILLBOARD": "billboard",
  "CLP RAKET-DURAK": "clp",
  "MEGALIGHT": "megalight",
  "LED": "led",
  "GIANTBOARD": "giantboard",
  "POLE BANNER": "pole-banner",
  "TOTEM": "totem",
  "ALINLIK": null,
  "LUNA": null,
  "BILLBOARD PLUS": null,
  "MEGABOARD": null,
  "BIGBOARD": null,
  "TRAMVAY KAPLAMA": null,
  "RAKET LED": null,
  "KULEBOARD": null,
  "PARAPET": null,
  "OTOBÜS KAPLAMA": null,
  "SÜPER LED EKRAN": null,
  "SİLİNDİR KULE": null,
  "PRİZMA LED": null,
};

/** Sayfa format anahtarı → o anahtara eşlenen envanter mecra adları */
function envanterAdlariByPageKey(pageKey: string): string[] {
  return Object.entries(FORMAT_PAGE_KEY)
    .filter(([, key]) => key === pageKey)
    .map(([ad]) => ad);
}

/** Bir ilde bir sayfa-formatının toplam ünitesi (örn. ankara+billboard → 342) */
export function getIlFormatAdet(slug: string, pageKey: string): number {
  const il = getIl(slug);
  if (!il) return 0;
  return envanterAdlariByPageKey(pageKey).reduce(
    (sum, ad) => sum + (il.formatlar[ad] ?? 0),
    0
  );
}

/** Bir formatın bulunduğu iller (adede göre azalan) */
export function getIllerByFormat(pageKey: string): Array<{ il: string; slug: string; adet: number }> {
  const adlar = envanterAdlariByPageKey(pageKey);
  return ENVANTER.iller
    .map((i) => ({
      il: i.il,
      slug: slugifyTr(i.il),
      adet: adlar.reduce((s, ad) => s + (i.formatlar[ad] ?? 0), 0),
    }))
    .filter((x) => x.adet > 0)
    .sort((a, b) => b.adet - a.adet);
}

/* ─────────────── Sayfa üretim kuralı (SEO ince içerik önlemi) ─────────────── */

/**
 * İl×format sayfası üretim eşiği: adet < 5 ise ayrı sayfa üretilmez,
 * il sayfasına yönlendirilir (Google'a zayıf sayfa gitmesin).
 */
export const MIN_FORMAT_PAGE_UNITE = 5;

/** Üretilecek il×format kombinasyonları — generateStaticParams girdisi */
export function getKombinasyonlar(): Array<{ slug: string; format: string; adet: number }> {
  const out: Array<{ slug: string; format: string; adet: number }> = [];
  const pageKeys = [...new Set(Object.values(FORMAT_PAGE_KEY).filter((k): k is string => k !== null))];
  for (const il of ENVANTER.iller) {
    const slug = slugifyTr(il.il);
    for (const key of pageKeys) {
      const adet = getIlFormatAdet(slug, key);
      if (adet >= MIN_FORMAT_PAGE_UNITE) out.push({ slug, format: key, adet });
    }
  }
  return out;
}

/* ─────────────── Türetilmiş toplam sayılar ─────────────── */

function distinctMecraSayisi(): number {
  const s = new Set<string>();
  for (const il of ENVANTER.iller) for (const f of Object.keys(il.formatlar)) s.add(f);
  return s.size;
}

/**
 * TEK doğru rakam seti — HER YERDE bunlar kullanılır.
 * Elle yazılmaz: il sayısı, mecra sayısı ve ünite toplamı JSON'dan türetilir.
 */
export const TOPLAM = {
  il: ENVANTER.iller.length,
  mecra: distinctMecraSayisi(),
  unite: ENVANTER.iller.reduce((s, i) => s + i.toplam, 0),
} as const;

/** Türkçe biçimli sayı ("35.919") */
export function sayiTr(n: number): string {
  return n.toLocaleString("tr-TR");
}

/** Hero/meta metinlerinde kullanılan hazır ifadeler */
export const RAKAM_METNI = {
  il: `${TOPLAM.il} il`,
  mecra: `${TOPLAM.mecra} mecra türü`,
  unite: `${sayiTr(TOPLAM.unite)} ünite`,
  ozet: `${TOPLAM.il} il · ${TOPLAM.mecra} mecra türü · ${sayiTr(TOPLAM.unite)} ünite`,
} as const;

/* ─────────────── Mecra görünen adları ─────────────── */

/** Envanter yazımı (UPPERCASE) → kullanıcıya gösterilen ad */
export const FORMAT_LABELS: Record<string, string> = {
  "BILLBOARD": "Billboard",
  "CLP RAKET-DURAK": "CLP (Raket / Durak)",
  "POLE BANNER": "Pole Banner",
  "MEGALIGHT": "Megalight",
  "GIANTBOARD": "Giantboard",
  "LED": "LED Ekran",
  "ALINLIK": "Alınlık",
  "LUNA": "Luna",
  "BILLBOARD PLUS": "Billboard Plus",
  "MEGABOARD": "Megaboard",
  "BIGBOARD": "Bigboard",
  "TRAMVAY KAPLAMA": "Tramvay Kaplama",
  "RAKET LED": "Raket LED",
  "TOTEM": "Totem",
  "KULEBOARD": "Kuleboard",
  "PARAPET": "Parapet",
  "OTOBÜS KAPLAMA": "Otobüs Kaplama",
  "SÜPER LED EKRAN": "Süper LED Ekran",
  "SİLİNDİR KULE": "Silindir Kule",
  "PRİZMA LED": "Prizma LED",
};

/** Envanter mecra adını görünen ada çevirir (bilinmeyene ham adı döner) */
export function formatAdi(envanterAd: string): string {
  return FORMAT_LABELS[envanterAd] ?? envanterAd;
}

/* ─────────────── Türkçe bulunma eki ─────────────── */

/**
 * İl adına doğru bulunma eki üretir: Ankara→'da, İzmir→'de,
 * Gaziantep→'te, Muş→'ta (ünlü uyumu + ünsüz sertleşmesi).
 */
export function lokatifEk(ad: string): string {
  const lower = ad.toLocaleLowerCase("tr");
  let unlu = "e";
  for (let i = lower.length - 1; i >= 0; i--) {
    const c = lower[i];
    if ("aıou".includes(c)) { unlu = "a"; break; }
    if ("eiöü".includes(c)) { unlu = "e"; break; }
  }
  const son = lower[lower.length - 1];
  const sessiz = "fstkçşhp".includes(son) ? "t" : "d";
  return `'${sessiz}${unlu}`;
}

/** Bir ilin ağdaki sırası (ünite sayısına göre, 1'den başlar) */
export function ilSirasi(slug: string): number {
  const sirali = getIller();
  const idx = sirali.findIndex((i) => slugifyTr(i.il) === slug);
  return idx + 1;
}

/* ─────────────── Aylık erişim (envanter-türevi dinamik metrik) ─────────────── */

import ilNufusData from "./il-nufus.json";

const IL_NUFUS: Record<string, number> = (ilNufusData as { nufus: Record<string, number> }).nufus;

/**
 * KALİBRASYON SABİTİ — Hakan kararı, 2026-07-04.
 * Mevcut 45-il seti tam 42,4M aylık erişim verecek şekilde sabitlendi:
 * 42.400.000 / 44.145.295 (o günkü TÜİK nüfus toplamı) = 0.960465.
 * İl nüfusu + günlük şehir ziyaretçisi modelinin NET katsayısıdır.
 * İl seti değişince ERİŞİM otomatik değişir; KATSAYI DEĞİŞMEZ —
 * yeniden kalibre etmeye kalkma (rakamın oynaması tasarım gereği).
 */
export const ERISIM_KATSAYISI = 0.960465;

/** Tek ilin aylık erişimi: nüfus × katsayı (yuvarlanmış). Per-il tek türetim noktası. */
function erisimDegeri(nufus: number): number {
  return Math.round(nufus * ERISIM_KATSAYISI);
}

/**
 * Bir ilin aylık tekrarsız erişimi (slug'dan). Nüfus kaydı yoksa 0.
 * getAylikErisim() bunların toplamıdır → Σ getIlErisim(45) === getAylikErisim().
 */
export function getIlErisim(slug: string): number {
  const il = getIl(slug);
  if (!il) return 0;
  const n = IL_NUFUS[il.il];
  return n === undefined ? 0 : erisimDegeri(n);
}

/**
 * Envanterdeki tüm illerin aylık erişim TOPLAMI — per-il değerlerin toplamı.
 * (round(Σnüfus×K) yerine Σround(nüfus×K): global ile per-il birebir tutarlı.)
 */
export function getAylikErisim(): number {
  let toplam = 0;
  for (const il of ENVANTER.iller) {
    const n = IL_NUFUS[il.il];
    if (n === undefined) {
      console.warn(`il-nufus.json'da eksik il: ${il.il} — erişim hesabına katılmadı`);
      continue;
    }
    toplam += erisimDegeri(n);
  }
  return toplam;
}

/** "43,1M" biçiminde global etiket (milyon, 1 ondalık, TR virgül) */
export function erisimEtiketi(): string {
  const milyon = getAylikErisim() / 1_000_000;
  return `${milyon.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
}

/**
 * İl sayaçında gösterilecek erişim etiketi:
 * ≥1M → "~5,7M" (yaklaşık, milyon), altı → tam gruplu sayı ("79.561").
 */
export function getIlErisimEtiketi(slug: string): string {
  const e = getIlErisim(slug);
  if (e >= 1_000_000) {
    const milyon = e / 1_000_000;
    return `~${milyon.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
  }
  return sayiTr(e);
}

/** Bir mecranın (envanter yazımıyla) Türkiye toplamı — örn. "LUNA" → 140 */
export function getFormatToplam(envanterAd: string): number {
  return ENVANTER.iller.reduce(
    (s, il) => s + (il.formatlar[envanterAd] ?? 0),
    0
  );
}
