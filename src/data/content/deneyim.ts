/**
 * /deneyim — "Şehirde bir gün" prototip sayfasının metinleri.
 * Rakam YOK: ünite/il sayıları sayfada envanter.json'dan türetilir.
 * `envanterAd` alanı envanter.json'daki mecra anahtarıdır (sayı buradan hesaplanır).
 */

export type DeneyimSahnesi = {
  /** Sahne kimliği — görsel dosya adı ve 3D anahtar kare sırası bununla eşleşir */
  id: "giris" | "sabah" | "gun" | "gece" | "final";
  /** Üst etiket (saat dilimi) */
  saat: string;
  baslik: string;
  metin: string;
  /** Sahnedeki ünitenin envanter anahtarları (rakam bunlardan türetilir) */
  envanterAd?: string[];
  /** Kartta gösterilen mecra adı */
  mecraAdi?: string;
  /** Sabit görselin kısa açıklaması (alt metni) */
  gorselAciklama: string;
};

export const DENEYIM_META = {
  baslik: "Şehirde bir gün",
  aciklama:
    "Sabahtan geceye bir şehirde açıkhava reklamı: durakta CLP, yol kenarında billboard, gece ışıklanan megalight ve LED ekran.",
};

export const DENEYIM_GIRIS = {
  ust: "Deneyim",
  baslik: "Şehirde bir gün",
  metin:
    "Bir reklamın gün boyu kimlere, nerede ve ne zaman göründüğünü izleyin. Aşağı kaydırın — şehir uyanıyor.",
  kaydirIpucu: "Kaydırın",
};

export const DENEYIM_SAHNELERI: DeneyimSahnesi[] = [
  {
    id: "sabah",
    saat: "Sabah · 07:40",
    baslik: "Doğru kitleye",
    metin:
      "Durakta bekleyen herkes aynı yüzeye bakıyor. CLP/Raket, işe ve okula giden kalabalığın göz hizasında; her sabah, aynı saatte.",
    envanterAd: ["CLP RAKET-DURAK"],
    mecraAdi: "CLP / Raket",
    gorselAciklama: "Sabah ışığında otobüs durağı ve durağın yanındaki ışıklı CLP panosu",
  },
  {
    id: "gun",
    saat: "Öğle · 13:10",
    baslik: "Doğru lokasyonda",
    metin:
      "Ana arterde, trafiğin yavaşladığı noktada büyük bir yüzey. Billboard, şehrin en çok geçilen hattında markanızı ölçeğiyle gösterir.",
    envanterAd: ["BILLBOARD"],
    mecraAdi: "Billboard",
    gorselAciklama: "Öğle güneşinde yol kenarındaki billboard",
  },
  {
    id: "gece",
    saat: "Akşam · 21:30",
    baslik: "Doğru zamanda",
    metin:
      "Şehir kararınca ışıklı yüzeyler öne çıkar. Megalight arkadan aydınlanır, LED ekranın içeriği gün içinde değişir; mesaj saatine göre konuşur.",
    envanterAd: ["MEGALIGHT", "LED"],
    mecraAdi: "Megalight + LED",
    gorselAciklama: "Gece ışıkları yanan megalight ve içeriği değişen LED ekran",
  },
];

export const DENEYIM_GIRIS_GORSEL = "Şafakta şehir caddesi, uzakta durak ve reklam üniteleri";

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
  gorselAciklama: "Gece yukarıdan bakılan şehir ışıkları",
  haritaAciklama: "Türkiye haritası — envanterde bulunan iller vurgulu",
};

export const DENEYIM_NOT =
  "Bu sayfa bir prototiptir. Sahnedeki üniteler temsilidir; yüzeylerde yalnız marka deseni kullanılmıştır.";
