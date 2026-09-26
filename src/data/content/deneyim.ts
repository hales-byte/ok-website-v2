/**
 * /deneyim — "Şehirde bir gün" prototip sayfasının metinleri + fotoğraf listesi.
 * Rakam YOK: ünite/il sayıları sayfada envanter.json'dan türetilir.
 * `envanterAd` alanı envanter.json'daki mecra anahtarıdır (sayı buradan hesaplanır).
 */

export type DeneyimSahnesi = {
  id: "sabah" | "alinlik" | "gun" | "aksam";
  /** Köşedeki saat etiketi bu sahnenin ortasında bu değeri gösterir (SS:DD) */
  saat: string;
  /** Kart üst etiketi */
  etiket: string;
  baslik: string;
  metin: string;
  /** Sahnedeki ünitenin envanter anahtarları (rakam bunlardan türetilir) */
  envanterAd: string[];
  /** Kartta gösterilen mecra adı */
  mecraAdi: string;
};

/**
 * Sahne fotoğrafları — sırayla gösterilir. `odak`: ünitenin fotoğraftaki yeri (yüzde);
 * kaydırdıkça görüntü bu noktaya doğru yaklaşır, dar ekranda kırpma da bu noktayı korur.
 * `sahne`: fotoğrafın ait olduğu bölüm; aynı bölümde iki fotoğraf varsa bölüm ikiye bölünür.
 */
export type DeneyimFotografi = {
  src: string;
  alt: string;
  en: number;
  boy: number;
  odak: [number, number];
  sahne: DeneyimSahnesi["id"];
  /** Geçici fotoğraf (sahneye tam uymuyor / çözünürlük yetersiz) — rapor için */
  gecici?: string;
};

export const DENEYIM_META = {
  baslik: "Şehirde bir gün",
  aciklama:
    "Sabahtan iş çıkışına bir şehirde açıkhava reklamı: durakta CLP, trafikte alınlık, öğlen billboard, akşamüstü megalight ve LED.",
};

export const DENEYIM_GIRIS = {
  ust: "Deneyim",
  baslik: "Şehirde bir gün",
  metin:
    "Bir reklamın gün boyu kimlere, nerede ve ne zaman göründüğünü izleyin. Aşağı kaydırın — şehir uyanıyor.",
  kaydirIpucu: "Kaydırın",
  /** Köşedeki saatin girişteki değeri */
  saat: "08:00",
};

export const DENEYIM_SAHNELERI: DeneyimSahnesi[] = [
  {
    id: "sabah",
    saat: "08:15",
    etiket: "Sabah · 08:15",
    baslik: "Doğru kitleye",
    metin:
      "Durakta bekleyen herkes aynı yüzeye bakıyor. CLP/Raket, işe ve okula giden kalabalığın göz hizasında; her sabah, aynı saatte.",
    envanterAd: ["CLP RAKET-DURAK"],
    mecraAdi: "CLP / Raket",
  },
  {
    id: "alinlik",
    saat: "08:30",
    etiket: "Sabah · 08:30",
    baslik: "Dur-kalk trafikte",
    metin:
      "Köprü ve alt geçitlerin üstünde, yolun tam karşısında. Alınlık, trafiğin yavaşladığı her dakika sürücünün önünde durur.",
    envanterAd: ["ALINLIK"],
    mecraAdi: "Alınlık",
  },
  {
    id: "gun",
    saat: "13:00",
    etiket: "Öğle · 13:00",
    baslik: "Doğru lokasyonda",
    metin:
      "Ana arterde, öğle ışığında büyük ve net bir yüzey. Billboard ve giantboard, şehrin en çok geçilen hattında markanızı ölçeğiyle gösterir.",
    envanterAd: ["BILLBOARD", "GIANTBOARD"],
    mecraAdi: "Billboard + Giantboard",
  },
  {
    id: "aksam",
    saat: "17:30",
    etiket: "İş çıkışı · 17:30",
    baslik: "Doğru zamanda",
    metin:
      "Meydanlar dolar, herkes eve dönüyor. Arkadan aydınlatmalı megalight ve LED ekran gündüz bile parlak; mesaj en kalabalık saatte konuşur.",
    envanterAd: ["MEGALIGHT", "LED"],
    mecraAdi: "Megalight + LED",
  },
];

export const DENEYIM_FOTOGRAFLARI: DeneyimFotografi[] = [
  {
    src: "/images/formats/clp.webp",
    alt: "Sabah otobüs durağı; bekleyenlerin yanında beyaz zeminli, cyan chevron desenli CLP panosu",
    en: 1200, boy: 800, odak: [76, 54], sahne: "sabah",
    gecici: "1200 px — sahneye uygun, çözünürlük düşük",
  },
  {
    src: "/images/formats/giantboard.webp",
    alt: "Yol kenarında akan trafiğin yanında uzun, beyaz zeminli chevron desenli pano",
    en: 1200, boy: 800, odak: [51, 47], sahne: "alinlik",
    gecici: "Alınlık fotoğrafı yok — yerine giantboard kullanıldı (1200 px)",
  },
  {
    src: "/images/formats/billboard.webp",
    alt: "Öğle güneşinde yol kenarında yan yana dört billboard, yüzeylerde cyan chevron",
    en: 1200, boy: 800, odak: [50, 45], sahne: "gun",
    gecici: "1200 px — sahneye uygun, çözünürlük düşük",
  },
  {
    src: "/images/formats/megalight.webp",
    alt: "Akşamüstü kalabalık meydanda ışıklı megalight, yüzeyde cyan chevron",
    en: 1200, boy: 800, odak: [54, 28], sahne: "aksam",
    gecici: "1200 px — ön planda yüzü seçilen yayalar",
  },
  {
    src: "/images/formats/led.webp",
    alt: "Metro çıkışında iş çıkışı kalabalığı ve parlak LED ekran, ekranda cyan chevron",
    en: 1200, boy: 800, odak: [71, 27], sahne: "aksam",
    gecici: "1200 px — ön planda yüzü seçilen yayalar",
  },
];

export const DENEYIM_FINAL = {
  ust: "Türkiye geneli",
  baslik: "Bir şehirde değil, Türkiye'nin her yerinde",
  metin:
    "Aynı gün, aynı saatlerde; farklı şehirlerde, farklı mecralarda. Kampanyanızı tek teklifte planlayalım.",
  ilEtiket: "il",
  uniteEtiket: "reklam ünitesi",
  mecraEtiket: "mecra türü",
  erisimEtiket: "aylık erişim",
  cta: "Teklif Al",
  haritaAciklama: "Türkiye haritası — envanterde bulunan iller vurgulu",
};

export const DENEYIM_NOT =
  "Bu sayfa bir prototiptir. Fotoğraflardaki üniteler temsilidir; yüzeylerde yalnız marka deseni kullanılmıştır.";
