/**
 * İLE ÖZEL SIKÇA SORULAN SORULAR — verinden türetilir (kural: metin koda
 * gömülmez, rakam elle yazılmaz). getIlSSS(slug) → o ilin envanter verisinden
 * 3-4 soru-cevap üretir; FAQPage JSON-LD ve <FAQ> akordeonu aynı diziyi kullanır.
 */
import type { SSSMaddesi } from "@/src/data/content/sss";
import {
  getIl,
  getFormatlarByIl,
  getIlErisimEtiketi,
  formatAdi,
  sayiTr,
  lokatifEk,
} from "@/src/data/envanter";

/** Bir ilin envanterinden 3-4 maddelik SSS listesi. İl yoksa boş dizi. */
export function getIlSSS(slug: string): SSSMaddesi[] {
  const il = getIl(slug);
  if (!il) return [];

  const sehir = il.il;
  const ek = lokatifEk(sehir);
  const formatlar = getFormatlarByIl(slug);
  const mecraSayisi = formatlar.length;
  const erisim = getIlErisimEtiketi(slug);

  // En büyük 3 mecra — okunur bir listeye çevir ("billboard, CLP ve megalight")
  const ustMecralar = formatlar.slice(0, 3).map((f) => formatAdi(f.format));
  const mecraListesi =
    ustMecralar.length > 1
      ? `${ustMecralar.slice(0, -1).join(", ")} ve ${ustMecralar[ustMecralar.length - 1]}`
      : ustMecralar[0] ?? "açıkhava";

  const maddeler: SSSMaddesi[] = [
    {
      soru: `${sehir}${ek} kaç reklam ünitesi bulunuyor?`,
      cevap: `${sehir}${ek} ${mecraSayisi} farklı mecra türünde toplam ${sayiTr(il.toplam)} reklam ünitemiz bulunuyor. Envanter güncel tutulur; teklif aşamasında uygun lokasyonların tam listesini paylaşırız.`,
    },
    {
      soru: `${sehir} için hangi açıkhava reklam mecralarını sunuyorsunuz?`,
      cevap: `${sehir}${ek} en yoğun mecralarımız ${mecraListesi}. Toplam ${mecraSayisi} mecra türünden markanızın hedefine en uygun karmayı öneriyoruz.`,
    },
    {
      soru: `${sehir}${ek} aylık ne kadar erişime ulaşabilirim?`,
      cevap: `${sehir} ağımız aylık ${erisim} kişilik erişim potansiyeli sunar. Gerçek erişim; seçilen lokasyonlara, mecra sayısına ve kampanya süresine göre planlanır.`,
    },
    {
      soru: `${sehir} kampanyası için teklifi ne kadar sürede alırım?`,
      cevap: `Teklif formundan ${sehir}'i seçip bütçe ve hedefinizi bırakın; satış uzmanımız 15 dakika içinde ${sehir} özelinde lokasyon planı ve teklifle döner.`,
    },
  ];

  return maddeler;
}
