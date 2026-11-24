/**
 * ÜST MENÜ + ALT BİLGİ bağlantı metinleri — içerik dosyası (kural: metin koda gömülmez).
 *
 * Ana sayfa akışı sadeleşince (2026-11-24) ana sayfadaki "Kim için biz?"
 * kartları ve SSS bölümü menüye taşındı:
 *  - "Kim için biz?" → Çözümler açılır menüsü (zaten vardı; metinler buraya alındı)
 *  - SSS → /sss sayfası, Kurumsal açılır menüsünden açılır
 * Header (masaüstü açılır menüler + mobil menü) ve Footer bu dosyadan okur;
 * bir etiket değişince üç yer birlikte güncellenir.
 */

export interface MenuOgesi {
  href: string;
  label: string;
  desc: string;
  /** Çözümler kartlarındaki küçük üst etiket */
  tag?: string;
}

export const COZUMLER_MENU = {
  baslik: "Çözümler",
  ustBaslik: "Sizi ne tanımlar?",
  altCta: {
    oncesi: "Hangisi olduğunuza emin değilseniz,",
    vurgu: "WhatsApp'tan konuşalım",
  },
  ogeler: [
    {
      href: "/markalar",
      tag: "MARKA",
      label: "Markalar",
      desc: "Kurumsal disiplinle açıkhava — stratejik planlama, şeffaf süreç, sektörel deneyim.",
    },
    {
      href: "/ajanslar",
      tag: "AJANS",
      label: "Reklam Ajansları",
      desc: "15 dakika teklif, ajansa özel koşullar, white-label raporlama.",
    },
    {
      href: "/ilk-kampanyaniz",
      tag: "YENİ BAŞLAYAN",
      label: "İlk Açıkhava Kampanyam",
      desc: "Brief'iniz olmasa da olur — sıfırdan rehberlik, baskısız konuşma.",
    },
  ] satisfies MenuOgesi[],
};

export const KURUMSAL_MENU = {
  baslik: "Kurumsal",
  ogeler: [
    {
      href: "/hakkimizda",
      label: "Hakkımızda",
      desc: "Yaklaşımımız ve değerlerimiz.",
    },
    {
      href: "/sss",
      label: "Sıkça Sorulan Sorular",
      desc: "Rezervasyon, süre, baskı, raporlama ve ödeme.",
    },
    {
      href: "/iletisim",
      label: "İletişim",
      desc: "E-posta, WhatsApp ve sosyal medya.",
    },
  ] satisfies MenuOgesi[],
};
