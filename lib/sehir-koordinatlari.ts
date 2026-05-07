/**
 * Envanterdeki şehir/ilçe adları → [lng, lat] koordinat eşlemesi.
 *
 * KAYNAK: Türkiye il/ilçe merkez koordinatları (yaklaşık).
 * KEY FORMATI: DB'deki yazımla birebir aynı (UPPERCASE, Türkçe karakter dahil).
 *
 * Eşleşmeyen şehir gelirse `getCoordinates()` null döner → harita o noktayı
 * sessizce atlar (filtreyi `page.tsx` yapar). Yeni envanter şehri eklendiğinde
 * bu sözlüğe de bir satır eklenmeli.
 *
 * Not: Bazı kayıtlar ilçe (BANDIRMA, AYVALIK, İSKENDERUN, SAFRANBOLU vb.) — bu
 * normal, çünkü reklam envanteri il merkezinde değil ilçede olabilir.
 */

export type LngLat = [number, number];

// [lng, lat] formatı — Mapbox/GeoJSON konvansiyonu (X, Y).
export const SEHIR_KOORDINAT: Record<string, LngLat> = {
  // İLLER
  ANKARA: [32.8597, 39.9334],
  TEKİRDAĞ: [27.5167, 40.9833],
  TRABZON: [39.7178, 41.0015],
  MERSİN: [34.6415, 36.8121],
  ERZURUM: [41.2700, 39.9000],
  ADANA: [35.3213, 37.0000],
  UŞAK: [29.4082, 38.6823],
  ESKİŞEHİR: [30.5206, 39.7767],
  GAZİANTEP: [37.3833, 37.0662],
  DİYARBAKIR: [40.2306, 37.9144],
  ELAZIĞ: [39.2264, 38.6810],
  SAMSUN: [36.3300, 41.2867],
  ORDU: [37.8833, 40.9833],
  VAN: [43.3800, 38.4942],
  DÜZCE: [31.1565, 40.8438],
  KİLİS: [37.1212, 36.7184],
  ADIYAMAN: [38.2786, 37.7648],
  ARTVİN: [41.8183, 41.1828],
  BALIKESİR: [27.8826, 39.6484],
  ÇANKIRI: [33.6134, 40.6013],
  GİRESUN: [38.3895, 40.9128],
  BATMAN: [41.1351, 37.8812],
  ZONGULDAK: [31.7987, 41.4564],
  KARABÜK: [32.6204, 41.2061],
  SAKARYA: [30.4035, 40.7834],
  YOZGAT: [34.8147, 39.8181],
  AĞRI: [43.0503, 39.7191],
  MALATYA: [38.3095, 38.3552],
  RİZE: [40.5234, 41.0201],
  OSMANİYE: [36.2464, 37.0746],
  KARS: [43.0975, 40.6013],
  BİLECİK: [29.9793, 40.1450],
  AFYONKARAHİSAR: [30.5567, 38.7507],
  DENİZLİ: [29.0864, 37.7765],
  TOKAT: [36.5500, 40.3167],
  IĞDIR: [44.0450, 39.9180],
  BAYBURT: [40.2249, 40.2552],
  AMASYA: [35.8353, 40.6499],
  ARDAHAN: [42.7022, 41.1105],
  İZMİR: [27.1287, 38.4192],
  SİVAS: [37.0179, 39.7477],
  ERZİNCAN: [39.4920, 39.7468],
  KOCAELİ: [29.9408, 40.7654],

  // İLÇELER (envanterde il yerine ilçe adıyla geçen kayıtlar)
  BANDIRMA: [27.9762, 40.3522], // Balıkesir
  AYVALIK: [26.6963, 39.3192], // Balıkesir
  İSKENDERUN: [36.1737, 36.5867], // Hatay
  SAFRANBOLU: [32.6905, 41.2567], // Karabük
};

/** Verilen şehir adından koordinat döndürür; bulamazsa null. */
export function getSehirCoordinates(sehir: string): LngLat | null {
  return SEHIR_KOORDINAT[sehir] ?? null;
}

/**
 * Envanterdeki şehir adından bölge çıkarır.
 * `lib/turkiye-sehirler.ts`'teki il listesi normal case'de, envanter UPPERCASE.
 * İlçeler (BANDIRMA, AYVALIK, vb.) için elle bağlama gerekiyor.
 */
import { SEHIRLER, type Bolge } from "./turkiye-sehirler";

const ILCE_BOLGE: Record<string, Bolge> = {
  BANDIRMA: "Marmara", // Balıkesir
  AYVALIK: "Marmara", // Balıkesir
  İSKENDERUN: "Akdeniz", // Hatay
  SAFRANBOLU: "Karadeniz", // Karabük
};

export function getSehirBolge(sehir: string): Bolge | null {
  if (ILCE_BOLGE[sehir]) return ILCE_BOLGE[sehir];
  const ilUpper = SEHIRLER.find(
    (s) => s.ad.toLocaleUpperCase("tr") === sehir
  );
  return ilUpper?.bolge ?? null;
}

/**
 * Türkçe locale-aware title case dönüşümü.
 * "ANKARA" → "Ankara", "TEKİRDAĞ" → "Tekirdağ", "BANDIRMA" → "Bandırma".
 * URL'den gelen UPPERCASE şehir adlarını UI/state'e dönüştürmek için kullan.
 */
export function titleCaseTr(input: string): string {
  return input
    .toLocaleLowerCase("tr")
    .split(" ")
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase("tr") + w.slice(1) : w))
    .join(" ");
}
