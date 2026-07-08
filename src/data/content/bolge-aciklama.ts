/**
 * BÖLGE AÇIKLAMA METİNLERİ — içerik dosyası (kural: metin koda gömülmez).
 * BOLGE_ACIKLAMA: bölge slug → özgün giriş metni (Hakan onaylı,
 * OK_v3_Icerik_Metinleri.md · Bölüm 2). Rakam gömülmez; sayfada koddan gelir.
 * Metni olmayan bölge için getBolgeAciklama() veriden zarif yedek üretir.
 *
 * NOT: İç Anadolu metninden Ankara'nın Güvenpark/Kocatepe/AŞTİ noktaları
 * çıkarıldı (Ankara ilceler'i envanter.json'da boş; teyit edilemiyor).
 */
import { getBolgeOzet, erisimKisa } from "@/src/data/bolgeler";
import { sayiTr } from "@/src/data/envanter";

export const BOLGE_ACIKLAMA: Record<string, string> = {
  marmara:
    "Marmara, sanayinin ve sahilin iç içe geçtiği bölge. Çorlu–Çerkezköy hattının fabrika bulvarlarından Bandırma, Ayvalık ve Edremit'in sahil hareketliliğine, Sakarya'nın büyüyen şehir trafiğine kadar bölgenin üretim ve tatil akışının aynı anda geçtiği noktalardayız. Balıkesir, Tekirdağ ve Sakarya başta olmak üzere en çok görülen arterleri kapsıyor, bölge planınızı 15 dakikada çıkarıyoruz.",
  ege:
    "Ege, turizmle üretimin bir arada koştuğu bölge. Denizli'nin tekstil ve sanayi trafiğinden Aydın'ın tatil ve tarım hareketliliğine, Afyon ile Uşak'ın şehir merkezlerine kadar Ege'nin en yoğun geçiş noktalarında markanızı görünür kılıyoruz. Hedef il ve bütçenize göre bölge planını 15 dakikada hazırlıyoruz.",
  akdeniz:
    "Akdeniz, limanların ve büyük güney metropollerinin bölgesi. Mersin ve Adana'nın kesintisiz şehir trafiğinden Hatay–İskenderun'un liman-sanayi hareketliliğine kadar bölgenin en çok görülen arterlerinde güçlü bir açıkhava ağımız var. Akdeniz kampanyanız için lokasyon planını 15 dakikada çıkarıyoruz.",
  "ic-anadolu":
    "İç Anadolu, başkentin ve üniversite şehirlerinin bölgesi. Ankara'nın en yoğun yaya ve trafik noktalarından Eskişehir'in genç, hareketli şehir merkezine kadar bölgenin kalbindeki en görünür noktalardayız. Bölge planınızı 15 dakikada hazırlıyoruz.",
  karadeniz:
    "Karadeniz, tek bir sahil yolunun şehirleri birbirine bağladığı bölge. Samsun ve Trabzon'un liman ve şehir trafiğinden Rize ile Ordu'nun çay-fındık sahil hattına, Safranbolu'nun turist akışına kadar her durakta yenilenen bir kitlenin karşısındayız. Hedef ilinize göre bölge planını 15 dakikada çıkarıyoruz.",
  "dogu-anadolu":
    "Doğu Anadolu, Türkiye'nin en geniş coğrafyasına yayılan bölge. Erzurum ve Van'ın üniversite ve ticaret merkezlerinden Kars–Sarıkamış'ın turizm hattına, Ağrı ile Malatya'nın şehir bulvarlarına kadar birbirinden uzak ama en görünür noktaları tek elden kapsıyoruz. Bölge planınızı 15 dakikada hazırlıyoruz.",
  "guneydogu-anadolu":
    "Güneydoğu, sanayinin ve ticaretin hızla büyüdüğü bölge. Gaziantep'in OSB, üniversite ve AVM akslarından Diyarbakır ile Batman'ın kalabalık şehir merkezlerine kadar bölgenin en yoğun envanterlerinden birine sahibiz. Kampanyanız için lokasyon planını 15 dakikada çıkarıyoruz.",
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
