import type { Metadata } from "next";
import TurkiyeHaritasi, { type HaritaIl } from "./TurkiyeHaritasi";
import { SEHIRLER } from "@/lib/turkiye-sehirler";
import {
  getIller,
  formatAdi,
  slugifyTr,
  sayiTr,
  TOPLAM,
} from "@/src/data/envanter";
import { isStandalone, bolgeOfIl } from "@/src/data/bolgeler";

export const metadata: Metadata = {
  title: "Envanter — Türkiye Geneli Reklam Lokasyonları",
  description: `Objektif Kriter envanteri: Türkiye genelinde ${TOPLAM.il} il, ${TOPLAM.mecra} mecra türü, ${sayiTr(TOPLAM.unite)} reklam ünitesi. Lokasyonları harita üzerinde keşfedin.`,
};

/**
 * Envanter sayfası — tamamen statik (Supabase + Mapbox kaldırıldı).
 * Harita verisi build anında envanter.json'dan hazırlanır; sayfa
 * prerender edilir, dış servis/token bağımlılığı yoktur.
 */
export default function EnvanterPage() {
  const bolgeByAd = new Map(SEHIRLER.map((s) => [s.ad, s.bolge as string]));

  const iller: HaritaIl[] = getIller().map((il) => {
    const slug = slugifyTr(il.il);
    // Standalone il → kendi zengin sayfası; taşınan il → bölge sayfası.
    const std = isStandalone(slug);
    const b = bolgeOfIl(slug);
    const detayHref = std ? `/sehir/${slug}` : b ? `/bolge/${b.slug}` : `/sehir/${slug}`;
    const detayLabel = std
      ? `${il.il} sayfasına git`
      : b
        ? `${b.ad} bölge sayfasına git`
        : `${il.il} sayfasına git`;
    return {
      slug,
      il: il.il,
      bolge: bolgeByAd.get(il.il) ?? "İç Anadolu",
      toplam: il.toplam,
      ilceler: il.ilceler,
      detayHref,
      detayLabel,
      formatlar: Object.entries(il.formatlar)
        .map(([format, adet]) => ({ label: formatAdi(format), adet }))
        .sort((a, b) => b.adet - a.adet),
    };
  });

  return (
    <>
      {/* BAŞLIK + KPI */}
      <section className="pt-24 pb-10 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium">
              Mecra Ağımız
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Türkiye genelinde{" "}
              <span className="text-gradient">{TOPLAM.il} ilde</span> envanter
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {TOPLAM.mecra} mecra türü, {sayiTr(TOPLAM.unite)} reklam ünitesi
              — bölge veya mecra seçin, ile tıklayın.
            </p>
          </div>
        </div>
      </section>

      {/* HARİTA */}
      <section className="py-12">
        <div className="container-narrow">
          <TurkiyeHaritasi iller={iller} />
        </div>
      </section>
    </>
  );
}
