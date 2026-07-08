/**
 * BÖLGE AÇIKLAMA METİNLERİ — içerik dosyası (kural: metin koda gömülmez).
 * BOLGE_ACIKLAMA: bölge slug → özgün giriş metni (Hakan sonra doldurur).
 * Metni olmayan bölge için getBolgeAciklama() veriden zarif yedek üretir.
 */
import { getBolgeOzet, erisimKisa } from "@/src/data/bolgeler";
import { sayiTr } from "@/src/data/envanter";

export const BOLGE_ACIKLAMA: Record<string, string> = {
  // örnek: "ege": "Ege bölgesi, turizm ve ticaretin yoğun olduğu ..."
};

/** Bölge giriş metni: özgün varsa o, yoksa veriden türetilen yedek. */
export function getBolgeAciklama(bolgeSlug: string): string {
  const ozel = BOLGE_ACIKLAMA[bolgeSlug];
  if (ozel && ozel.trim().length > 0) return ozel;

  const b = getBolgeOzet(bolgeSlug);
  if (!b) return "";

  const enBuyuk = b.iller.slice(0, 3).map((i) => i.il);
  const liste =
    enBuyuk.length > 1
      ? `${enBuyuk.slice(0, -1).join(", ")} ve ${enBuyuk[enBuyuk.length - 1]}`
      : enBuyuk[0] ?? "";

  return (
    `${b.meta.ad} bölgesinde ${b.iller.length} ilde toplam ${sayiTr(b.toplamUnite)} reklam ünitesiyle ` +
    `açıkhava kampanyalarınızı yürütüyoruz. ${liste} başta olmak üzere bölgenin en çok görülen ` +
    `noktalarını kapsayan ağımız, aylık ${erisimKisa(b.toplamErisim)} kişilik erişim potansiyeli sunar. ` +
    `İl bazında lokasyon planını 15 dakikada hazırlıyoruz.`
  );
}
