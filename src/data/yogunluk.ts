/**
 * ENVANTER YOĞUNLUĞU — tek kaynak (G9 kuralı, G11'de ortaklaştırıldı).
 *
 * /envanter haritası (TurkiyeHaritasi) ve ana sayfa hero haritası (HeroHarita)
 * ilin "kaç basamak yoğun" olduğunu AYNI fonksiyondan okur; iki yüzey asla
 * farklı eşik kullanamaz. Eşikler envanterin ÇEYREKLİKLERİNDEN türer — elle
 * rakam yok; envanter büyüyüp küçülünce rampa kendini ayarlar.
 */

/** Yoğunluk rampası (açık zemin) — tamamı marka kiti cyan ailesinden.
 *  Açıktan koyuya: kit soft → kit mid → ara ton → primary-darker.
 *  En açık basamak bile belirgin cyan; "envanteri az il" soluk/silik
 *  görünmez, yalnız daha az doygun okunur. */
export const YOGUNLUK_RAMPA = ["#7CE2FF", "#38C7FA", "#0891B2", "#075985"] as const;

/**
 * Yoğunluk eşikleri — toplamların %25 / %50 / %75 çeyreklikleri.
 * Eşit değer yığılması varsa benzersizleştirme kova sayısını kendiliğinden
 * düşürür (ör. üç eşik de aynıysa tek kova kalır).
 */
export function yogunlukEsikleri(toplamlar: number[]): number[] {
  const veri = toplamlar.filter((n) => n > 0).sort((a, b) => a - b);
  if (veri.length === 0) return [];
  const ceyreklik = (p: number) => veri[Math.min(veri.length - 1, Math.floor(veri.length * p))];
  return [ceyreklik(0.25), ceyreklik(0.5), ceyreklik(0.75)].filter(
    (v, i, a) => i === 0 || v > a[i - 1]
  );
}

/** Ünite adedi → rampa basamağı (0 = en açık / en seyrek, esikler.length = en yoğun). */
export function yogunlukKovasi(toplam: number, esikler: number[]): number {
  return esikler.filter((e) => toplam > e).length;
}
