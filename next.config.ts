import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * 301 STRATEJİSİ (tamamı statik, build'de üretilir):
 *  1. Eski/kalkan şehir slug'ları → en yakın il (aşağıdaki el listesi)
 *  2. Eşik altı il×format kombinasyonları → il sayfası
 *     (SEO ince içerik önlemi: adet<5 sayfa ÜRETİLMEZ; eski URL'ler 301 ile
 *      il sayfasına taşınır. Liste envanter.json'dan otomatik türetilir.)
 * dynamicParams=false olduğundan liste dışı her şey gerçek 404 döner.
 */

const ESKI_SEHIR_301: Array<{ eski: string; yeni: string }> = [
  { eski: "ayvalik", yeni: "balikesir" },
  { eski: "bandirma", yeni: "balikesir" },
  { eski: "safranbolu", yeni: "karabuk" },
  { eski: "iskenderun", yeni: "hatay" },
  { eski: "giresun", yeni: "ordu" },
  { eski: "edirne", yeni: "kirklareli" }, // V1 (2026-07-07): Edirne envanterden çıktı
  { eski: "cankiri", yeni: "ankara" },
];

/* ── envanter.json'dan eşik altı kombinasyon yönlendirmeleri ──
 * DİKKAT: slugify + FORMAT_PAGE_KEY, src/data/envanter.ts ile aynı mantık
 * olmalıdır (config Next uygulama modüllerini import edemediği için burada
 * küçük bir kopya yaşar; değişirse İKİSİNİ birden güncelle). */
const MIN_FORMAT_PAGE_UNITE = 5;
const ESKI_FORMAT_KEYLERI = [
  "billboard", "clp", "megalight", "led", "giantboard",
  "pole-banner", "totem", "havalimani",
];
const FORMAT_PAGE_KEY: Record<string, string> = {
  "BILLBOARD": "billboard",
  "CLP RAKET-DURAK": "clp",
  "MEGALIGHT": "megalight",
  "LED": "led",
  "GIANTBOARD": "giantboard",
  "POLE BANNER": "pole-banner",
  "TOTEM": "totem",
};

function slugifyTr(str: string): string {
  return str
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function esikAltiRedirects(
  standalone: Set<string>
): Array<{ source: string; destination: string; permanent: boolean }> {
  const data = JSON.parse(
    readFileSync(join(__dirname, "src/data/envanter.json"), "utf8")
  ) as { iller: Array<{ il: string; formatlar: Record<string, number> }> };

  const out: Array<{ source: string; destination: string; permanent: boolean }> = [];
  for (const il of data.iller) {
    const slug = slugifyTr(il.il);
    // Sadece standalone iller: taşınan illerin format yolları zaten /sehir/<il>/:format*
    // kuralıyla bölgeye 301'lenir (301 zinciri olmasın).
    if (!standalone.has(slug)) continue;
    const adetByKey = new Map<string, number>();
    for (const [ad, adet] of Object.entries(il.formatlar)) {
      const key = FORMAT_PAGE_KEY[ad];
      if (key) adetByKey.set(key, (adetByKey.get(key) ?? 0) + adet);
    }
    for (const key of ESKI_FORMAT_KEYLERI) {
      if ((adetByKey.get(key) ?? 0) < MIN_FORMAT_PAGE_UNITE) {
        out.push({
          source: `/sehir/${slug}/${key}`,
          destination: `/sehir/${slug}`,
          permanent: true,
        });
      }
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // Bölge revizyonu tek kaynağı: src/data/bolge-config.json (config Next
    // app modüllerini import edemez, bu yüzden readFileSync ile okunur).
    const bolgeCfg = JSON.parse(
      readFileSync(join(__dirname, "src/data/bolge-config.json"), "utf8")
    ) as { standalone: string[]; movedToBolge: Record<string, string> };
    const standalone = new Set(bolgeCfg.standalone);
    const moved = bolgeCfg.movedToBolge;

    // /sehir/<slug> nihai hedefi: taşınansa bölge, değilse kendi sayfası.
    const sehirHedef = (slug: string) =>
      moved[slug] ? `/bolge/${moved[slug]}` : `/sehir/${slug}`;

    // Eski/kalkan slug 301'leri — hedef taşınan ilse doğrudan bölgeye (zincir yok)
    const eskiler = ESKI_SEHIR_301.flatMap(({ eski, yeni }) => {
      const dest = sehirHedef(yeni);
      return [
        { source: `/sehir/${eski}`, destination: dest, permanent: true },
        { source: `/sehir/${eski}/:format*`, destination: dest, permanent: true },
      ];
    });

    // Taşınan 23 il: /sehir/<il> ve /sehir/<il>/:format* → /bolge/<bölge>
    const tasinan = Object.entries(moved).flatMap(([slug, bolge]) => [
      { source: `/sehir/${slug}`, destination: `/bolge/${bolge}`, permanent: true },
      { source: `/sehir/${slug}/:format*`, destination: `/bolge/${bolge}`, permanent: true },
    ]);

    // Hukuki sayfa slug tutarlılığı: /gizlilik → /gizlilik-politikasi (KVKK paketi)
    const hukuki = [
      { source: "/gizlilik", destination: "/gizlilik-politikasi", permanent: true },
    ];
    return [...eskiler, ...tasinan, ...hukuki, ...esikAltiRedirects(standalone)];
  },
  // Güvenlik başlıkları + CSP (şimdilik Report-Only: tarayıcı ihlalleri sadece
  // raporlar, engellemez — bir sonraki pakette güvenle enforce'a çevrilecek).
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "upgrade-insecure-requests",
    ].join("; ");
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
