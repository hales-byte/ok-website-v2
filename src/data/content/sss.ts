/**
 * SIKÇA SORULAN SORULAR — içerik dosyası (kural: metin koda gömülmez).
 * Kaynak: ok-iframe canlı sitesindeki 9 soru (G6'da taşındı, 2026-07-05).
 * Rakamlar elle yazılmaz — TOPLAM modülünden türetilir.
 * NOT: Angarya A2'de bu sorular gerçek müşteri sorularıyla güncellenecek.
 */
import { TOPLAM, sayiTr } from "@/src/data/envanter";

export interface SSSMaddesi {
  soru: string;
  cevap: string;
}

export const SSS_BASLIK = {
  eyebrow: "SSS",
  baslik: "Sıkça Sorulan Sorular",
  altMetin:
    "Açıkhava kampanyalarınız hakkında en sık karşılaştığımız sorular ve cevapları.",
};

export const SSS_LISTESI: SSSMaddesi[] = [
  {
    soru: "Bir kampanya için ne kadar önceden rezervasyon yapmam gerekiyor?",
    cevap:
      "Yoğun dönemlerde (kampanya, sezon başı, Ramazan ayı vb.) en az 2-3 hafta önceden, normal dönemlerde 7-10 gün önceden rezervasyon önerilir. Acil ihtiyaçlarınız için 48 saat içinde size dönüş yapabilir, uygunluk araştırması başlatabiliriz.",
  },
  {
    soru: "Hangi şehirlerde hizmet veriyorsunuz?",
    cevap: `Türkiye genelinde ${TOPLAM.il} ilde aktif olarak hizmet veriyoruz. Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu ve Güneydoğu Anadolu olmak üzere 7 coğrafi bölgenin tamamını kapsayan Türkiye'nin en geniş Anadolu açıkhava ağına sahibiz. Listede olmayan şehirler için bize ulaşın — ağımıza ekleyebiliriz.`,
  },
  {
    soru: "Kampanya süresi ne kadar olmalı?",
    cevap:
      "Marka bilinirliği kampanyaları için minimum 4 hafta (1 ay) önerilir; bu süre etkili frekans yakalamak için optimumdur. Lansman, etkinlik veya kısa süreli kampanyalar için 1-2 haftalık periyotlar mümkündür. LED ekranlarda günlük yayın da satın alınabilir.",
  },
  {
    soru: "Üretim (baskı) ve uygulama dahil mi?",
    cevap:
      "Evet — açıkhava sürecinin tamamını biz yönetiyoruz. Tüm mecralar için kreatif uyarlama, baskı/üretim, montaj ve uygulama hizmetlerini tek paket olarak sunuyoruz. Sadece tasarımınızı (PDF, AI veya katmanlı PSD) gönderin; gerisini biz halledelim.",
  },
  {
    soru: "Kampanya sırasında raporlama alabilir miyim?",
    cevap:
      "Evet. Üç ana raporlama noktamız var: başlangıç raporu (uygulanan tüm noktaların fotoğraflı belgesi), ara rapor (kampanya ortasında durum güncellemesi) ve final rapor (kampanya sonu foto-raporlu özet). İsteğe bağlı olarak tahmini erişim ve frekans projeksiyonları da paylaşılır.",
  },
  {
    soru: "Lokasyon değişikliği yapabilir miyim?",
    cevap:
      "Kampanya öncesi onaylanan lokasyonlar, üretim aşamasına geçilmeden 5 iş günü öncesine kadar ücretsiz değiştirilebilir. Kampanya başladıktan sonra teknik imkânlara (üretim maliyeti, mecra müsaitliği) göre değerlendirilir.",
  },
  {
    soru: "Bütçeme uygun bir mecra önerisi nasıl alabilirim?",
    cevap:
      "Teklif formundan bütçe aralığınızı, hedef şehir ve mecra tercihinizi belirterek bilgi bırakın. Satış uzmanımız 15 dakika içinde size dönüş yapar ve bütçenize uygun, en yüksek erişimli mecra karmasını sunar.",
  },
  {
    soru: "Ödeme koşulları nelerdir?",
    cevap:
      "Standart ödeme: %50 sözleşme imzalandığında, %50 kampanya bitiminden önce. Kurumsal müşterilerimize ve medya ajanslarına özel ödeme planları (vadeli, bölünmüş taksit) tanımlanabilir. Tüm faturalar e-fatura olarak düzenlenir.",
  },
  {
    soru: "Açıkhava ile dijital kampanya nasıl entegre edilir?",
    cevap:
      "Hibrit kampanyalarda en çok kullanılan yöntem: QR kod veya kısa URL ile açıkhavadan dijital sayfaya trafik. QR tarama oranı ve sayfa görüntülenmesi ile açıkhavanın katkısı ölçülebilir hale gelir.",
  },
];

/** FAQPage JSON-LD — SSS içeriğiyle daima senkron (T6'dan ertelenen iş) */
export function sssJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SSS_LISTESI.map((m) => ({
      "@type": "Question",
      name: m.soru,
      acceptedAnswer: { "@type": "Answer", text: m.cevap },
    })),
  };
}
