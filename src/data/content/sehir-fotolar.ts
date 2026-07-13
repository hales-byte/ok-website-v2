/**
 * R3 — Şehir sayfası "Sahadan Kareler" foto manifesti.
 * Kaynak: saha arşivi (Mecra Fotoğrafları, 2026-07-13 kürasyonu — 24+5 kare
 * KVKK/siyasi kreatif/filigran/rakip-kaide elemesiyle seçildi).
 * Dosyalar: public/images/sehir/<il>/ · w,h = gerçek piksel (CLS-0 rezervasyon).
 * Yeni il eklemek için: klasöre webp koy + buraya kayıt ekle.
 * Bölge illerinin (Karabük, Kilis, Osmaniye, Sivas, Tokat) kareleri
 * OK_v3_yama/r3-fotolar/ altında hazır bekliyor (R3c — bölge şeridi).
 */

export interface SehirFoto {
  dosya: string;
  /** Kart altında görünen mecra etiketi */
  mecra: string;
  w: number;
  h: number;
}

export const SAHADAN_METIN = {
  etiket: "Sahadan Kareler",
  /** {il} sayfada il adıyla değiştirilir */
  baslik: "sokaklarından gerçek uygulamalar",
  aciklama:
    "Aşağıdaki kareler stok görsel değil; ekibimizin sahada yayına aldığı kampanyalardan seçildi.",
};

export const SEHIR_FOTOLAR: Record<string, SehirFoto[]> = {
  // Adana
  "adana": [
    { dosya: "adana-billboard-01.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "adana-giantboard-01.webp", mecra: "Giantboard", w: 1365, h: 768 },
    { dosya: "adana-led-01.webp", mecra: "LED", w: 1600, h: 1201 },
    { dosya: "adana-led-02.webp", mecra: "LED", w: 1600, h: 1201 },
    { dosya: "adana-megaboard-01.webp", mecra: "Megaboard", w: 1365, h: 768 },
    { dosya: "adana-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1200 },
    { dosya: "adana-megalight-02.webp", mecra: "Megalight", w: 1600, h: 1200 },
  ],
  // Ankara
  "ankara": [
    { dosya: "ankara-alinlik-01.webp", mecra: "Alınlık", w: 1600, h: 1200 },
    { dosya: "ankara-alinlik-02.webp", mecra: "Alınlık", w: 1600, h: 1200 },
    { dosya: "ankara-alinlik-03.webp", mecra: "Alınlık", w: 1600, h: 1200 },
    { dosya: "ankara-megalight-01.webp", mecra: "Megalight", w: 1536, h: 2048 },
  ],
  // Balıkesir
  "balikesir": [
    { dosya: "balikesir-megalight-01.webp", mecra: "Megalight", w: 1152, h: 2048 },
    { dosya: "balikesir-megalight-02.webp", mecra: "Megalight", w: 1080, h: 1920 },
  ],
  // Batman
  "batman": [
    { dosya: "batman-billboard-01.webp", mecra: "Billboard", w: 1599, h: 1200 },
    { dosya: "batman-billboard-02.webp", mecra: "Billboard", w: 1599, h: 1200 },
    { dosya: "batman-clp-01.webp", mecra: "CLP", w: 1600, h: 1200 },
    { dosya: "batman-giantboard-01.webp", mecra: "Giantboard", w: 1599, h: 1200 },
    { dosya: "batman-megalight-01.webp", mecra: "Megalight", w: 1599, h: 1200 },
  ],
  // Diyarbakır
  "diyarbakir": [
    { dosya: "diyarbakir-clp-01.webp", mecra: "CLP", w: 1440, h: 1080 },
    { dosya: "diyarbakir-clp-02.webp", mecra: "CLP", w: 1440, h: 1080 },
    { dosya: "diyarbakir-led-01.webp", mecra: "LED", w: 1600, h: 1200 },
    { dosya: "diyarbakir-megaboard-01.webp", mecra: "Megaboard", w: 1600, h: 1200 },
    { dosya: "diyarbakir-megaboard-02.webp", mecra: "Megaboard", w: 1600, h: 1200 },
    { dosya: "diyarbakir-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1200 },
  ],
  // Erzurum
  "erzurum": [
    { dosya: "erzurum-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1600 },
    { dosya: "erzurum-billboard-02.webp", mecra: "Billboard", w: 1600, h: 1600 },
    { dosya: "erzurum-billboard-03.webp", mecra: "Billboard", w: 1600, h: 1600 },
    { dosya: "erzurum-clp-01.webp", mecra: "CLP", w: 1600, h: 1200 },
    { dosya: "erzurum-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 901 },
  ],
  // Gaziantep
  "gaziantep": [
    { dosya: "gaziantep-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "gaziantep-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 1200 },
    { dosya: "gaziantep-giantboard-02.webp", mecra: "Giantboard", w: 1600, h: 720 },
    { dosya: "gaziantep-kuleboard-01.webp", mecra: "Kuleboard", w: 1600, h: 1200 },
    { dosya: "gaziantep-megaboard-01.webp", mecra: "Megaboard", w: 1600, h: 1200 },
    { dosya: "gaziantep-megaboard-02.webp", mecra: "Megaboard", w: 1600, h: 1200 },
    { dosya: "gaziantep-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1200 },
  ],
  // Hatay
  "hatay": [
    { dosya: "hatay-billboard-01.webp", mecra: "Billboard", w: 1364, h: 768 },
    { dosya: "hatay-billboard-02.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "hatay-billboard-03.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "hatay-clp-01.webp", mecra: "CLP", w: 1024, h: 768 },
    { dosya: "hatay-clp-02.webp", mecra: "CLP", w: 1024, h: 768 },
    { dosya: "hatay-clp-03.webp", mecra: "CLP", w: 1024, h: 768 },
    { dosya: "hatay-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 1200 },
    { dosya: "hatay-megalight-01.webp", mecra: "Megalight", w: 1600, h: 737 },
    { dosya: "hatay-megalight-02.webp", mecra: "Megalight", w: 1600, h: 737 },
  ],
  // Mersin
  "mersin": [
    { dosya: "mersin-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 900 },
    { dosya: "mersin-giantboard-02.webp", mecra: "Giantboard", w: 1600, h: 1204 },
    { dosya: "mersin-giantboard-03.webp", mecra: "Giantboard", w: 1600, h: 1204 },
  ],
  // Ordu
  "ordu": [
    { dosya: "ordu-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "ordu-billboard-02.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "ordu-billboard-03.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "ordu-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 1200 },
    { dosya: "ordu-led-01.webp", mecra: "LED", w: 1600, h: 1200 },
    { dosya: "ordu-megaboard-01.webp", mecra: "Megaboard", w: 1600, h: 1200 },
    { dosya: "ordu-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1200 },
    { dosya: "ordu-megalight-02.webp", mecra: "Megalight", w: 1600, h: 1200 },
  ],
  // Sakarya
  "sakarya": [
    { dosya: "sakarya-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "sakarya-billboard-02.webp", mecra: "Billboard", w: 1600, h: 1201 },
    { dosya: "sakarya-billboard-03.webp", mecra: "Billboard", w: 1600, h: 1201 },
    { dosya: "sakarya-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1201 },
    { dosya: "sakarya-megalight-02.webp", mecra: "Megalight", w: 1600, h: 1201 },
  ],
  // Samsun
  "samsun": [
    { dosya: "samsun-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "samsun-billboard-03.webp", mecra: "Billboard", w: 1600, h: 721 },
    { dosya: "samsun-giantboard-01.webp", mecra: "Giantboard", w: 1600, h: 1200 },
    { dosya: "samsun-led-01.webp", mecra: "LED", w: 1600, h: 900 },
    { dosya: "samsun-led-02.webp", mecra: "LED", w: 1600, h: 900 },
  ],
  // Tekirdağ
  "tekirdag": [
    { dosya: "tekirdag-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "tekirdag-billboard-02.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "tekirdag-billboard-03.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "tekirdag-clp-03.webp", mecra: "CLP", w: 1024, h: 768 },
    { dosya: "tekirdag-megalight-01.webp", mecra: "Megalight", w: 1600, h: 1200 },
    { dosya: "tekirdag-megalight-02.webp", mecra: "Megalight", w: 1600, h: 1200 },
  ],
  // Trabzon
  "trabzon": [
    { dosya: "trabzon-billboard-01.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "trabzon-billboard-02.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "trabzon-billboard-03.webp", mecra: "Billboard", w: 1024, h: 768 },
    { dosya: "trabzon-giantboard-01.webp", mecra: "Giantboard", w: 1365, h: 768 },
    { dosya: "trabzon-giantboard-02.webp", mecra: "Giantboard", w: 1024, h: 768 },
  ],
  // Van
  "van": [
    { dosya: "van-billboard-01.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "van-billboard-02.webp", mecra: "Billboard", w: 1600, h: 1200 },
    { dosya: "van-billboard-03.webp", mecra: "Billboard", w: 1280, h: 960 },
    { dosya: "van-clp-01.webp", mecra: "CLP", w: 1600, h: 2844 },
    { dosya: "van-clp-02.webp", mecra: "CLP", w: 1600, h: 2844 },
    { dosya: "van-giantboard-01.webp", mecra: "Giantboard", w: 1280, h: 960 },
    { dosya: "van-led-01.webp", mecra: "LED", w: 1600, h: 1200 },
  ],
};

export function getSehirFotolar(slug: string): SehirFoto[] {
  return SEHIR_FOTOLAR[slug] ?? [];
}
