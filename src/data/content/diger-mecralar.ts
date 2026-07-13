/**
 * DİĞER MECRALARIMIZ — /mecralar sayfası + ana sayfa "Diğer mecralarımız"
 * kartının içeriği. (Eski adı: ek-mecralar.ts / G4b grid'i.)
 *
 * Kurallar:
 * - Metin koda gömülmez; adetler envanter.json'dan otomatik türetilir
 *   (envanterAd alanı üzerinden getFormatToplam ile). Adedi 0 olan mecra
 *   kendiliğinden gizlenir.
 * - Sıra = gösterim sırası (güncel envanter ünite sayısına göre).
 * - TANITIM KAPSAMI (Hakan kararı, 2026-07-12): Parapet, Süper LED Ekran,
 *   Silindir Kule ve Prizma LED envanterde MEVCUTTUR ancak sitedeki tanıtım
 *   akışında YER ALMAZ — bu listeye ekleme. Envanter verisine dokunulmaz.
 * - Dönem etiketleri saha envanterindeki asım dönemlerinden derlendi.
 */

export interface DigerMecra {
  /** envanter.json'daki yazım — adet buradan türetilir */
  envanterAd: string;
  ad: string;
  /** Asım dönemi etiketi (bilinmiyorsa boş bırakılır, rozet gizlenir) */
  donem?: string;
  aciklama: string;
  /** public/images/formats/{gorsel}.jpg varsa kartta gösterilir */
  gorsel?: string;
}

export const DIGER_MECRALAR: DigerMecra[] = [
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
    envanterAd: "TRAMVAY KAPLAMA",
    ad: "Tramvay Kaplama",
    donem: "6 Ay / Yıl",
    aciklama: "Şehrin içinden geçen hareketli reklam; hat boyunca her durakta yeni bir kitleyle buluşur.",
    gorsel: "tramvay-kaplama",
  },
  {
    envanterAd: "BIGBOARD",
    ad: "Bigboard",
    donem: "Hafta",
    aciklama: "Bulvar kenarında geniş tek parça yüzey; yaya ve araç trafiğine aynı anda konuşur.",
  },
  {
    envanterAd: "RAKET LED",
    ad: "Raket LED",
    donem: "Hafta",
    aciklama: "Yaya caddelerinde dikey dijital ekran; gündüz bile parlak, içerik anında güncellenebilir.",
  },
  {
    envanterAd: "TOTEM",
    ad: "Totem",
    aciklama: "Tek yüksek direk üzerinde içten aydınlatmalı kutu pano; AVM ve işletme girişleri ile ana arterlerde, gökyüzüne karşı çok uzaktan okunur.",
    gorsel: "totem",
  },
  {
    envanterAd: "KULEBOARD",
    ad: "Kuleboard",
    donem: "Hafta / Ay",
    aciklama: "Yüksek kolon üstünde kavşaklara hükmeden pano; kilometrelerce öteden ilk görülen yüz.",
  },
  {
    envanterAd: "OTOBÜS KAPLAMA",
    ad: "Otobüs Kaplama",
    donem: "Hafta+",
    aciklama: "Rota boyunca şehri dolaşan giydirme; durak durak değişen kitleye kesintisiz temas.",
    gorsel: "otobus-kaplama",
  },
];
