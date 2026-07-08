/**
 * İL AÇIKLAMA METİNLERİ — içerik dosyası (kural: metin koda gömülmez).
 *
 * IL_ACIKLAMA: slug → 2-3 cümlelik ile ÖZGÜN giriş metni. Asıl metinleri
 * Hakan sonradan doldurur; buraya il eklendikçe SEO/özgünlük artar.
 * Metni OLMAYAN il için getIlAciklama() veriden zarif bir yedek üretir —
 * sayfa asla boş kalmaz. Rakamlar elle yazılmaz; envanter modülünden türer.
 */
import {
  getIl,
  getFormatlarByIl,
  getIlErisimEtiketi,
  formatAdi,
  sayiTr,
  lokatifEk,
} from "@/src/data/envanter";

/**
 * İle özel, elle yazılmış giriş metinleri. Anahtar = il slug'ı ("izmir").
 * Boş bırakılabilir; eksik iller yedek metne düşer.
 */
export const IL_ACIKLAMA: Record<string, string> = {
  // örnek: "izmir": "İzmir, Ege'nin ticaret ve turizm başkenti olarak ...",
};

/**
 * İl giriş metni: özgün metin varsa onu, yoksa veriden türetilen zarif
 * yedek paragrafı döner (2-3 cümle, jargonsuz, rakamlar envanterden).
 */
export function getIlAciklama(slug: string): string {
  const ozel = IL_ACIKLAMA[slug];
  if (ozel && ozel.trim().length > 0) return ozel;

  const il = getIl(slug);
  if (!il) return "";

  const sehir = il.il;
  const ek = lokatifEk(sehir);
  const formatlar = getFormatlarByIl(slug);
  const enBuyuk = formatlar[0] ? formatAdi(formatlar[0].format) : "açıkhava";
  const erisim = getIlErisimEtiketi(slug);

  return (
    `${sehir}${ek} ${sayiTr(il.toplam)} reklam ünitesinden oluşan açıkhava ağımız, ` +
    `${enBuyuk.toLocaleLowerCase("tr")} başta olmak üzere ${formatlar.length} farklı mecra türüyle ` +
    `şehrin en çok görülen noktalarını kapsar. Aylık ${erisim} kişilik erişim potansiyeliyle ` +
    `markanızı ${sehir} özelinde doğru hedef kitleyle buluşturuyor, kampanya planını 15 dakikada hazırlıyoruz.`
  );
}
