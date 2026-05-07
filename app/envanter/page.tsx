import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import EnvanterMap, { type SehirFeature } from "./EnvanterMap";
import { getSehirCoordinates } from "@/lib/sehir-koordinatlari";

export const metadata: Metadata = {
  title: "Envanter — Türkiye Geneli Reklam Lokasyonları",
  description:
    "Objektif Kriter envanteri: Türkiye genelinde 80+ lokasyon, 30.000+ reklam yüzü. Billboard, CLP, megalight ve dijital OOH lokasyonlarını harita üzerinde keşfedin.",
};

// Envanter veri sıklığı düşük — 5 dakika revalidate yeterli, statik build'de
// kayıtlanmasın diye PPR/SSR-friendly.
export const revalidate = 300;

type EnvanterRow = {
  id: number;
  sehir: string;
  unite: string | null;
  format_kategori: string;
  toplam_face: number | null;
  birim_fiyat: number | null;
  donem: string | null;
  network_adeti: number | null;
  asim_gunu: string | null;
};

type EksikSehir = { sehir: string; lokasyon_sayisi: number };

/**
 * Envanteri şehir bazında agreg eder. Her şehir için:
 *  - Toplam lokasyon sayısı (ünite kayıt sayısı)
 *  - Toplam reklam yüzü
 *  - Format dağılımı (kaç farklı format, her format için sayı + yüz)
 *  - Ünite listesi (UI'da liste için)
 *
 * Koordinatı sözlükte olmayan şehirler `eksikSehirler`'e düşer (uyarı/log için).
 */
async function getSehirFeatures(): Promise<{
  features: SehirFeature[];
  eksikSehirler: EksikSehir[];
  toplamLokasyon: number;
  toplamYuz: number;
}> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .schema("website")
    .from("envanter")
    .select(
      "id, sehir, unite, format_kategori, toplam_face, birim_fiyat, donem, network_adeti, asim_gunu"
    )
    .eq("aktif", true);

  if (error) {
    console.error("Envanter fetch hatası:", error);
    return {
      features: [],
      eksikSehirler: [],
      toplamLokasyon: 0,
      toplamYuz: 0,
    };
  }

  const rows = (data ?? []) as EnvanterRow[];

  // Şehir bazlı toplama
  type Acc = {
    sehir: string;
    lokasyon_sayisi: number;
    toplam_yuz: number;
    formatlar: Map<string, { count: number; yuz: number }>;
    uniteler: Array<{
      unite: string;
      format: string;
      toplam_face: number;
      birim_fiyat: number | null;
      donem: string | null;
    }>;
  };

  const bySehir = new Map<string, Acc>();

  for (const r of rows) {
    const key = r.sehir;
    if (!bySehir.has(key)) {
      bySehir.set(key, {
        sehir: key,
        lokasyon_sayisi: 0,
        toplam_yuz: 0,
        formatlar: new Map(),
        uniteler: [],
      });
    }
    const agg = bySehir.get(key)!;
    agg.lokasyon_sayisi += 1;
    agg.toplam_yuz += r.toplam_face ?? 0;

    const fmt = r.format_kategori;
    const cur = agg.formatlar.get(fmt) ?? { count: 0, yuz: 0 };
    cur.count += 1;
    cur.yuz += r.toplam_face ?? 0;
    agg.formatlar.set(fmt, cur);

    agg.uniteler.push({
      unite: r.unite ?? "",
      format: fmt,
      toplam_face: r.toplam_face ?? 0,
      birim_fiyat: r.birim_fiyat,
      donem: r.donem,
    });
  }

  const features: SehirFeature[] = [];
  const eksikSehirler: EksikSehir[] = [];

  for (const agg of bySehir.values()) {
    const coords = getSehirCoordinates(agg.sehir);
    if (!coords) {
      eksikSehirler.push({
        sehir: agg.sehir,
        lokasyon_sayisi: agg.lokasyon_sayisi,
      });
      continue;
    }

    features.push({
      sehir: agg.sehir,
      lng: coords[0],
      lat: coords[1],
      lokasyon_sayisi: agg.lokasyon_sayisi,
      toplam_yuz: agg.toplam_yuz,
      formatlar: Array.from(agg.formatlar.entries()).map(([format, v]) => ({
        format,
        count: v.count,
        yuz: v.yuz,
      })),
      uniteler: agg.uniteler,
    });
  }

  // Büyük şehirler önce görünsün (lokasyon sayısına göre)
  features.sort((a, b) => b.lokasyon_sayisi - a.lokasyon_sayisi);

  const toplamLokasyon = features.reduce(
    (s, f) => s + f.lokasyon_sayisi,
    0
  );
  const toplamYuz = features.reduce((s, f) => s + f.toplam_yuz, 0);

  if (eksikSehirler.length > 0) {
    console.warn(
      "Koordinatı eksik şehirler (sehir-koordinatlari.ts'e ekle):",
      eksikSehirler
    );
  }

  return { features, eksikSehirler, toplamLokasyon, toplamYuz };
}

export default async function EnvanterPage() {
  const { features, toplamLokasyon, toplamYuz } = await getSehirFeatures();

  return (
    <div className="h-[calc(100vh-65px)] w-full">
      <EnvanterMap
        features={features}
        toplamLokasyon={toplamLokasyon}
        toplamYuz={toplamYuz}
      />
    </div>
  );
}
