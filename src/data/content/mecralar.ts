/**
 * /mecralar sayfası + ana sayfa "Diğer mecralarımız" kartı — sayfa metinleri.
 * Rakam içeren ifadeler şablonda değil, sayfada envanter yardımcılarıyla
 * (TOPLAM, getFormatToplam) kurulur — elle rakam yazılmaz.
 */

export const MECRALAR_HERO = {
  etiket: "Mecralarımız",
  /** h1: "<sayı> mecra türü" kısmı sayfada TOPLAM.mecra ile kurulur */
  baslikOn: "Tek envanterde",
  baslikVurgu: "mecra türü", // "20 mecra türü" — sayı sayfada eklenir
  aciklama:
    "Marka bilinirliği kuran billboard'dan lokal trafiği besleyen CLP'ye, meydanların dijital ekranlarından tramvay kaplamaya — kampanyanızın hedefine ve ölçeğine göre doğru mecrayı birlikte seçiyoruz. Tüm adetler güncel envanterimizden türetilir.",
};

export const MECRALAR_ANA_BOLUM = {
  etiket: "Ana Mecralarımız",
  baslik: "Kampanyaların taşıyıcı kolonu: ana mecralar",
  aciklama:
    "Envanterimizin büyük bölümünü oluşturan, hemen her kampanyanın planına giren mecralar. Her birinin detaylı anlatımı Hizmetler sayfasında.",
  detayLink: "Detayları gör",
  teklifLink: "fiyatı sor",
};

export const MECRALAR_DIGER_BOLUM = {
  etiket: "Diğer Mecralarımız",
  baslik: "Şehrin her ölçeğine bir mecra",
  aciklama:
    "Ana mecraları tamamlayan, doğru şehirde ve doğru hedefte fark yaratan mecralar. Adetler güncel envanterden; hangi şehirlerde bulunduğunu her kartta görürsünüz.",
};

export const MECRALAR_CTA = {
  baslik: "Hangi mecra kampanyanıza uyar?",
  aciklama:
    "Hedefinizi ve bütçenizi paylaşın, size en uygun mecra ve lokasyon kombinasyonunu önerelim. Brief'iniz olsun olmasın, doğru kombinasyonu birlikte buluyoruz.",
  birincil: "Teklif Al",
  ikincil: "WhatsApp ile yaz",
};

/** Ana sayfa şeridindeki 7. kart — "Diğer mecralarımız" */
export const DIGER_MECRA_SLIDE = {
  ad: "Diğer mecralarımız",
  tagline: "Alınlık'tan tramvay kaplamaya, Luna'dan kuleboard'a",
  aciklama:
    "Ana mecraların ötesinde, şehrine ve hedefe göre öne çıkan tamamlayıcı mecralar — hepsi aynı envanterde, tek partnerden.",
  cta: "Tüm mecraları gör",
};
