/**
 * +12 EK MECRA — ana sayfadaki "20 mecranın tamamı" grid'inin içeriği (G4b).
 * Kural: metin koda gömülmez; adetler envanter.json'dan otomatik türetilir
 * (envanterAd alanı üzerinden getFormatToplam ile).
 * Dönem etiketleri saha envanterindeki asım dönemlerinden derlendi.
 */

export interface EkMecra {
  /** envanter.json'daki yazım — adet buradan türetilir */
  envanterAd: string;
  ad: string;
  donem: string;
  aciklama: string;
  /** public/images/formats/{gorsel}.jpg varsa kartta gösterilir */
  gorsel?: string;
}

export const EK_MECRALAR_BASLIK = {
  ozet: "Ana formatların ötesinde 12 mecra daha — hepsi aynı envanterde, tek partnerden.",
  butonAc: "12 mecrayı daha gör",
};

export const EK_MECRALAR: EkMecra[] = [
  {
    envanterAd: "ALINLIK",
    ad: "Alınlık",
    donem: "Hafta",
    aciklama: "Üstgeçit ve köprü alınlıklarında, altından akan trafiğin tam görüş hattında uzun şerit yüzey.",
  },
  {
    envanterAd: "LUNA",
    ad: "Luna",
    donem: "Hafta",
    aciklama: "Kaldırım üstünde göz hizasında kompakt ışıklı panel; yaya yoğun caddelerin samimi ölçekli mecrası.",
  },
  {
    envanterAd: "BILLBOARD PLUS",
    ad: "Billboard Plus",
    donem: "Hafta",
    aciklama: "Standart billboard'dan büyük yüzeyi ve premium kasasıyla şehir girişlerinin prestij panosu.",
  },
  {
    envanterAd: "MEGABOARD",
    ad: "Megaboard",
    donem: "Hafta / Ay",
    aciklama: "Çevre yolu ölçeğinde dev yüzey; günde on binlerce aracın görüş hattında kesintisiz görünürlük.",
  },
  {
    envanterAd: "BIGBOARD",
    ad: "Bigboard",
    donem: "Hafta",
    aciklama: "Bulvar kenarında geniş tek parça yüzey; yaya ve araç trafiğine aynı anda konuşur.",
  },
  {
    envanterAd: "KULEBOARD",
    ad: "Kuleboard",
    donem: "Hafta / Ay",
    aciklama: "Yüksek kolon üstünde kavşaklara hükmeden pano; kilometrelerce öteden ilk görülen yüz.",
  },
  {
    envanterAd: "PARAPET",
    ad: "Parapet",
    donem: "Hafta",
    aciklama: "Orta refüj hattı boyunca tekrarlanan paneller; iki yönün trafiğine aynı mesajı ritimle işler.",
  },
  {
    envanterAd: "RAKET LED",
    ad: "Raket LED",
    donem: "Hafta",
    aciklama: "Yaya caddelerinde dikey dijital ekran; gündüz bile parlak, içerik anında güncellenebilir.",
  },
  {
    envanterAd: "PRİZMA LED",
    ad: "Prizma LED",
    donem: "Hafta",
    aciklama: "Dönen üç yüzüyle tek noktadan üç kampanya; kavşakta bekleyen gözlerin hareketli odağı.",
  },
  {
    envanterAd: "SÜPER LED EKRAN",
    ad: "Süper LED Ekran",
    donem: "Hafta",
    aciklama: "Meydanlara hükmeden dev dijital yüzey; şehrin en kalabalık anlarında en parlak sahne.",
  },
  {
    envanterAd: "TRAMVAY KAPLAMA",
    ad: "Tramvay Kaplama",
    donem: "6 Ay / Yıl",
    aciklama: "Şehrin içinden geçen hareketli reklam; hat boyunca her durakta yeni bir kitleyle buluşur.",
    gorsel: "tramvay-kaplama",
  },
  {
    envanterAd: "OTOBÜS KAPLAMA",
    ad: "Otobüs Kaplama",
    donem: "Hafta+",
    aciklama: "Rota boyunca şehri dolaşan giydirme; durak durak değişen kitleye kesintisiz temas.",
  },
];
