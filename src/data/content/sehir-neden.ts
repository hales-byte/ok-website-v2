/**
 * R4 — Şehir sayfası "Neden Objektif Kriter" mini şeridi.
 * Kural: yeni iddia üretilmez — maddeler sitede zaten onaylı söylemlerden
 * (15 dk teklif, asım + foto-raporlu takip, tek envanter). İl sayısı
 * envanterden (TOPLAM.il) gelir, elle yazılmaz.
 */

export const SEHIR_NEDEN = {
  etiket: "Neden Objektif Kriter",
  baslik: "Planlamadan raporlamaya tek partner",
  maddeler: [
    {
      ikon: "clock",
      baslik: "15 dakikada teklif",
      metin:
        "Brief'iniz üzerinden şehir, mecra ve süreye göre net teklif — 15 dakika içinde yanıt.",
    },
    {
      ikon: "camera",
      baslik: "Asım + foto-raporlu takip",
      metin:
        "Asım, montaj ve lojistiği biz yönetiyoruz; yayını fotoğraf raporuyla belgeliyoruz.",
    },
    {
      ikon: "map",
      baslik: "Tek envanter, tek muhatap",
      metin:
        "{il} il genelinde tüm mecralar tek envanterde — çok şehirli kampanyada bile tek muhatap.", // {il} sayfada TOPLAM.il ile doldurulur
    },
  ],
};
