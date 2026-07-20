/**
 * İL AÇIKLAMA METİNLERİ — içerik dosyası (kural: metin koda gömülmez).
 *
 * IL_ACIKLAMA: slug → 2-3 cümlelik ile ÖZGÜN giriş metni (Hakan onaylı,
 * OK_v3_Icerik_Metinleri.md · Bölüm 3). Rakam gömülmez; sayfada koddan gelir.
 * Metni OLMAYAN il için getIlAciklama() veriden zarif bir yedek üretir.
 *
 * NOT (lokasyon doğrulaması): metinlerdeki lokasyon adları güncel
 * envanter.json'a (36.134) göre teyit edildi. Ankara ilceler'i envanter.json'da
 * boş olduğu için Güvenpark/Kocatepe/AŞTİ/Beytepe/Keçiören çıkarıldı; Ordu'da
 * "Fatsa" ilceler'de olmadığı için çıkarıldı. (Envanter.json'a bu noktalar
 * eklenirse metin daha spesifik yazılabilir.)
 */
import {
  getIl,
  getFormatlarByIl,
  getIlErisimEtiketi,
  formatAdi,
  sayiTr,
  lokatifEk,
} from "@/src/data/envanter";

/** İle özel, elle yazılmış giriş metinleri. Anahtar = il slug'ı ("izmir"). */
export const IL_ACIKLAMA: Record<string, string> = {
  ankara:
    "Ankara'da görünür olmak, başkentin nabzının attığı yerlerde olmak demek — en yoğun yaya kalabalıklarından ana arterlerin durmayan trafiğine, şehrin her gün kalabalıklaşan akışına kadar. Ağırlıklı CLP/raket ağımız markanızı hem ana arterlerde hem insanların her gün durakladığı noktalarda tekrar tekrar göz hizasına getiriyor. Ankara planınızı bütçenize göre 15 dakikada çıkarıyor, asımdan foto-raporlu takibe süreci yönetiyoruz.",
  gaziantep:
    "Gaziantep, Anadolu'nun en canlı sanayi ve ticaret şehirlerinden biri; envanterimiz de bunu yansıtıyor. Nizip'ten OSB'ye, Gaziantep Üniversitesi ve Primall–Era AVM akslarından havalimanı kavşağına kadar şehrin en yoğun geçiş noktalarında CLP, pole banner ve billboard karması sunuyoruz. Gaziantep planınızı 15 dakikada çıkarıyor, montaj ve foto-raporlu takibi biz üstleniyoruz.",
  mersin:
    "Mersin'de açıkhava, limanın ve sahil şeridinin kesintisiz trafiğiyle çalışır. En çok mecra türüne sahip illerimizden biri olan Mersin ağımız, CLP ve billboard ağırlığıyla şehrin ana arterlerini ve yoğun yaya bölgelerini kapsıyor. Mersin planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  balikesir:
    "Balıkesir hem şehir hem sahil demek: Bandırma'nın liman trafiğinden Ayvalık, Edremit ve Altınoluk–Güre hattının yaz hareketliliğine kadar. Ağırlıklı CLP/raket ve billboard ağımız markanızı hem şehir merkezinde hem tatil güzergâhlarında görünür kılıyor. Balıkesir planınızı 15 dakikada çıkarıyoruz.",
  adana:
    "Adana, güneyin en büyük metropollerinden; açıkhava trafiği gün boyu kesilmiyor. Çok sayıda mecra türünde, CLP ve billboard ağırlıklı güçlü bir ağla şehrin ana bulvarlarını ve en çok görülen kavşaklarını kapsıyoruz. Adana planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  tekirdag:
    "Tekirdağ, Trakya sanayisinin kalbi: Çorlu, Çerkezköy, Kapaklı ve Ergene'nin fabrika bulvarları boyunca yoğun bir pole banner ağımız var, Silivri ve Marmara Ereğlisi hattıyla tamamlanıyor. Cadde boyu tekrar eden bu görünürlük markanızı sanayi ve geçiş trafiğinin tam ortasına taşıyor. Tekirdağ planınızı 15 dakikada çıkarıyoruz.",
  erzurum:
    "Erzurum, Doğu Anadolu'nun merkezi ve büyük bir üniversite şehri. Atatürk ve Teknik Üniversite akslarından şehir bulvarlarına kadar CLP, pole banner ve billboard karmasıyla en yoğun noktalardayız. Erzurum planınızı 15 dakikada hazırlıyor, asımdan foto-rapora süreci biz yönetiyoruz.",
  eskisehir:
    "Eskişehir, Türkiye'nin en genç ve hareketli şehirlerinden; öğrenci ve yaya trafiği açıkhava için ideal. CLP/raket ve billboard ağırlıklı ağımız şehir merkezinin en çok görülen noktalarını kapsıyor. Eskişehir planınızı bütçenize göre 15 dakikada çıkarıyoruz.",
  diyarbakir:
    "Diyarbakır, bölgenin en kalabalık metropollerinden; açıkhava görünürlüğü yüksek. CLP ve billboard ağırlıklı çok mecralı ağımızla şehrin ana arterlerini ve yoğun yaya bölgelerini kapsıyoruz. Diyarbakır planınızı 15 dakikada hazırlıyoruz.",
  trabzon:
    "Trabzon'da açıkhava, sahil yolunun ritminde çalışır: Akçaabat, Beşikdüzü, Of ve Maçka boyunca yoğun bir pole banner ağıyla şehir merkezini ve geçiş güzergâhlarını kapsıyoruz. Karadeniz'in bu merkez şehrinde markanız hem sahil hattında hem şehir içinde tekrar tekrar görünür oluyor. Trabzon planınızı 15 dakikada çıkarıyoruz.",
  sakarya:
    "Sakarya, hızla büyüyen bir sanayi ve şehir merkezi. CLP/raket, billboard ve megalight karmasıyla şehrin ana bulvarlarında ve en yoğun kavşaklarında güçlü bir görünürlük sunuyoruz. Sakarya planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  samsun:
    "Samsun, Karadeniz'in en büyük şehri ve önemli bir liman merkezi. CLP ve billboard ağırlıklı ağımız Çarşamba istikametinden şehir merkezine kadar en çok görülen noktaları kapsıyor. Samsun planınızı 15 dakikada çıkarıyoruz.",
  van:
    "Van, Doğu'nun en canlı ticaret şehirlerinden. CLP ve billboard ağırlıklı çok mecralı ağımızla göl kıyısındaki şehrin ana arterlerini ve yoğun yaya bölgelerini kapsıyoruz. Van planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  kars:
    "Kars, tarih ve kış turizminin buluştuğu şehir; Sarıkamış hattı da envanterimizde. Pole banner ve CLP ağırlıklı ağımız şehir merkezini ve turizm güzergâhlarını kapsıyor. Kars planınızı 15 dakikada çıkarıyoruz.",
  hatay:
    "Hatay, İskenderun limanı ve şehir merkeziyle güneyin önemli bir ticaret hattı. CLP ve billboard ağırlıklı ağımızla en yoğun geçiş noktalarında markanızı görünür kılıyoruz. Hatay planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  aydin:
    "Aydın, Ege'nin turizm ve tarım hareketliliğini bir arada taşıyan ili. Billboard ve CLP ağırlıklı ağımız şehir merkezinden yoğun yaz güzergâhlarına kadar en çok görülen noktaları kapsıyor. Aydın planınızı 15 dakikada çıkarıyoruz.",
  batman:
    "Batman, Güneydoğu'nun hızla büyüyen şehirlerinden. CLP ve billboard ağırlıklı ağımızla şehir merkezinin ana arterlerini ve en yoğun yaya bölgelerini kapsıyoruz. Batman planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  denizli:
    "Denizli, tekstil ve sanayinin şehri; gün boyu yoğun bir araç ve yaya trafiği var. Billboard ağırlıklı ağımız şehir girişlerinden ana bulvarlara kadar en çok görülen noktaları kapsıyor. Denizli planınızı 15 dakikada çıkarıyoruz.",
  agri:
    "Ağrı, Doğu'nun sınır ticareti ve geçiş şehri. Pole banner ve CLP ağırlıklı ağımızla şehir bulvarları boyunca tekrar eden bir görünürlük sunuyoruz. Ağrı planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  rize:
    "Rize, çay ve yayla turizminin sahil şehri. CLP ve billboard ağırlıklı ağımız sahil yolu boyunca şehir merkezinin en çok görülen noktalarını kapsıyor. Rize planınızı bütçenize göre 15 dakikada hazırlıyoruz.",
  ordu:
    "Ordu, fındık ve sahil turizminin Karadeniz şehri. Sahil yolu boyunca pole banner ağırlıklı ağımızla markanız her durakta yeni bir kitleyle buluşuyor. Ordu planınızı 15 dakikada çıkarıyoruz.",
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
  // Mecra adı düzgün büyük harfle (formatAdi zaten "CLP (Raket / Durak)" döner).
  const enBuyuk = formatlar[0] ? formatAdi(formatlar[0].format) : "açıkhava";
  const erisim = getIlErisimEtiketi(slug);

  return (
    `${sehir}${ek} ${sayiTr(il.toplam)} reklam ünitesinden oluşan açıkhava ağımız, ` +
    `${enBuyuk} başta olmak üzere ${formatlar.length} farklı mecra türüyle ` +
    `şehrin en çok görülen noktalarını kapsar. Aylık ${erisim} kişilik erişim potansiyeliyle ` +
    `markanızı ${sehir} özelinde doğru hedef kitleyle buluşturuyor, kampanya planını 15 dakikada hazırlıyoruz.`
  );
}
