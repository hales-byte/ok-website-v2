/**
 * BÖLGE SSS — verinden türetilir (kural: metin koda gömülmez, rakam elle
 * yazılmaz). getBolgeSSS(slug) → bölgenin envanter verisinden 3-4 soru-cevap;
 * FAQPage JSON-LD ve <FAQ> akordeonu aynı diziyi kullanır.
 */
import type { SSSMaddesi } from "@/src/data/content/sss";
import { getBolgeOzet, erisimKisa } from "@/src/data/bolgeler";
import { formatAdi, sayiTr } from "@/src/data/envanter";

export function getBolgeSSS(bolgeSlug: string): SSSMaddesi[] {
  const b = getBolgeOzet(bolgeSlug);
  if (!b) return [];

  const bolge = b.meta.ad;
  const ustMecralar = b.mecra.slice(0, 3).map((m) => formatAdi(m.format));
  const mecraListesi =
    ustMecralar.length > 1
      ? `${ustMecralar.slice(0, -1).join(", ")} ve ${ustMecralar[ustMecralar.length - 1]}`
      : ustMecralar[0] ?? "açıkhava";
  const ilAdlari = b.iller.map((i) => i.il).join(", ");

  return [
    {
      soru: `${bolge} bölgesinde hangi illerde açıkhava reklam envanteriniz var?`,
      cevap: `${bolge} bölgesinde ${b.iller.length} ilde envanterimiz var: ${ilAdlari}. Toplam ${sayiTr(b.toplamUnite)} reklam ünitesiyle bölgenin tamamında kampanya kurabiliyoruz.`,
    },
    {
      soru: `${bolge} bölgesinde toplam kaç reklam ünitesi bulunuyor?`,
      cevap: `${bolge} bölgesinde ${b.mecra.length} farklı mecra türünde toplam ${sayiTr(b.toplamUnite)} reklam ünitesi bulunuyor. En yoğun mecralarımız ${mecraListesi}.`,
    },
    {
      soru: `${bolge} bölgesinde aylık ne kadar erişime ulaşabilirim?`,
      cevap: `${bolge} ağımız aylık ${erisimKisa(b.toplamErisim)} kişilik erişim potansiyeli sunar. Gerçek erişim; seçilen iller, lokasyonlar ve kampanya süresine göre planlanır.`,
    },
    {
      soru: `${bolge} bölgesi için teklifi ne kadar sürede alırım?`,
      cevap: `Teklif formundan hedef ilinizi ve bütçenizi bırakın; satış uzmanımız 15 dakika içinde ${bolge} özelinde lokasyon planı ve teklifle döner.`,
    },
  ];
}
