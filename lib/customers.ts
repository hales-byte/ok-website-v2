/**
 * Müşteri logoları ve mini case study verileri.
 *
 * Persona feedback (8 Mayıs 2026): Üç kullanıcı tipinin de aynı anda
 * istediği şey "kim sizinle çalıştı, ne sonuç aldı". Bu dosyayı doldurmak
 * site genelinde kritik bir güven kaynağı oluşturur.
 *
 * ## Nasıl doldurulur?
 *
 * 1. Müşteri logosu için:
 *    - Logoyu `public/customers/` altına SVG olarak ekle (şeffaf arka plan)
 *    - `CUSTOMER_LOGOS` dizisine bir kayıt ekle (logo dosya adı + müşteri adı)
 *
 * 2. Case study (mini hikaye) için:
 *    - `CASE_STUDIES` dizisine bir kayıt ekle
 *    - Görsel opsiyonel — `public/case-studies/` altına ekleyebilirsin
 *
 * ## Önemli
 *
 * Bu dosya boş ise homepage'deki sosyal kanıt bölümü otomatik gizlenir.
 * Yani sadece gerçek veri eklendiğinde göster — fake müşteri/case görünmez.
 */

export interface CustomerLogo {
  /** Müşteri görünür adı (alt text için) */
  name: string;
  /** public/customers/ altındaki dosya adı (örn. "marka-x.svg" → "/customers/marka-x.svg") */
  file: string;
  /** Opsiyonel: müşteri sektörü (filtre için ileride kullanılabilir) */
  sector?: string;
}

export interface CaseStudy {
  /** Kart başlığı ("Marka X — İstanbul kampanyası" gibi) */
  title: string;
  /** Müşteri segmenti — "marka" / "ajans" / "ilk-kez" */
  segment: "marka" | "ajans" | "ilk-kez";
  /** Tek cümlelik özet (kart üzerinde gösterilir) */
  oneLiner: string;
  /** Kullanılan formatlar */
  formats: string[];
  /** Kapsanan şehir(ler) */
  cities: string[];
  /** Süre (örn. "30 gün", "Q3 2025") */
  duration: string;
  /** Sonuç (somut metrik tercih edilir; "trafik %18 arttı", "12K marka maruziyeti/gün" gibi) */
  outcome: string;
  /** Opsiyonel: public/case-studies/ altında görsel dosya adı */
  image?: string;
}

/**
 * Müşteri logo şeridi.
 * Boş array → homepage'deki "Çalıştığımız markalar" bölümü gizlenir.
 *
 * Örnek (gerçek müşteri eklenince yorum kaldır + güncelle):
 *
 * { name: "Marka X", file: "marka-x.svg", sector: "FMCG" },
 * { name: "Y Ajansı", file: "y-ajansi.svg", sector: "Reklam Ajansı" },
 */
export const CUSTOMER_LOGOS: CustomerLogo[] = [];

/**
 * Mini case study'ler.
 * Boş array → homepage'deki "Bizimle çalıştılar" bölümü gizlenir.
 *
 * Önerilen: 3 farklı segment'ten birer örnek (marka, ajans, ilk-kez).
 *
 * Örnek (gerçek vaka eklenince yorum kaldır + güncelle):
 *
 * {
 *   title: "Marka X — Q3 sezonluk kampanya",
 *   segment: "marka",
 *   oneLiner: "Anadolu'nun 12 şehrinde 6 hafta süren billboard ve raket kombinasyonu.",
 *   formats: ["billboard", "clp"],
 *   cities: ["İstanbul", "Ankara", "İzmir", "Bursa"],
 *   duration: "6 hafta",
 *   outcome: "Kampanya sonu marka hatırlanırlığı +%24, web trafiği 2.1x.",
 * },
 */
export const CASE_STUDIES: CaseStudy[] = [];
