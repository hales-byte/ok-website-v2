/**
 * İÇERİK DOSYASI — "Güçlü İş Birlikleri" bölümü (G3, logo duvarı).
 *
 * Bu, projenin İLK ayrı içerik dosyasıdır. Kural: kullanıcıya görünen metin
 * ve veri koda gömülmez; buraya toplanır. Bileşenler (LogoWall, ana sayfa,
 * /markalar) bu dosyadan besleniyor — metin/logolar değişince tek dosya değişir.
 *
 * Logolar: public/logos/{dosyaAdi}.png (30 adet, dosya adları slug).
 * Ana sayfa ilk 15'i + "tamamı" linkini gösterir; /markalar 30'un tamamını.
 *
 * NOT: Bazı logolar kaynakta soluk (VakıfBank, Nissan, Paulmark, Hatemoğlu,
 * Arçelik) — koyu varyantları ileride A1 kapsamında yenilenecek; şimdilik
 * olduğu gibi kalıyor.
 */

/** Tek bir KPI hücresi (İş birliği güven şeridi). */
export interface IsBirligiKPI {
  /** Vurgulu değer — "8", "21", "890+" */
  deger: string;
  /** Altındaki açıklama etiketi */
  etiket: string;
}

/** Logo duvarındaki tek bir marka. */
export interface MarkaLogo {
  /** public/logos/ altındaki dosya adı, uzantısız (örn. "coca-cola" → /logos/coca-cola.png) */
  dosyaAdi: string;
  /** Marka görünür adı — alt text + kart altı attribute (Türkçe karakterli, doğru yazım) */
  markaAdi: string;
}

/**
 * Logolar. Sıra bilinçli: ana sayfada ilk 15 gösterildiği için tanınırlığı
 * yüksek markalar başa alındı. /markalar tamamını (30) gösterir.
 */
export const IS_BIRLIKLERI_LOGOLARI: MarkaLogo[] = [
  // İlk 15 — ana sayfa
  { dosyaAdi: "coca-cola", markaAdi: "Coca-Cola" },
  { dosyaAdi: "pepsico", markaAdi: "PepsiCo" },
  { dosyaAdi: "vodafone", markaAdi: "Vodafone" },
  { dosyaAdi: "samsung", markaAdi: "Samsung" },
  { dosyaAdi: "trendyol", markaAdi: "Trendyol" },
  { dosyaAdi: "getir", markaAdi: "Getir" },
  { dosyaAdi: "yemeksepeti", markaAdi: "Yemeksepeti" },
  { dosyaAdi: "migros", markaAdi: "Migros" },
  { dosyaAdi: "bim", markaAdi: "BİM" },
  { dosyaAdi: "a101", markaAdi: "A101" },
  { dosyaAdi: "akbank", markaAdi: "Akbank" },
  { dosyaAdi: "vakifbank", markaAdi: "VakıfBank" },
  { dosyaAdi: "arcelik", markaAdi: "Arçelik" },
  { dosyaAdi: "beko", markaAdi: "Beko" },
  { dosyaAdi: "teknosa", markaAdi: "Teknosa" },
  // 16-30 — sadece /markalar
  { dosyaAdi: "carrefoursa", markaAdi: "CarrefourSA" },
  { dosyaAdi: "decathlon", markaAdi: "Decathlon" },
  { dosyaAdi: "adidas", markaAdi: "Adidas" },
  { dosyaAdi: "dyson", markaAdi: "Dyson" },
  { dosyaAdi: "nissan", markaAdi: "Nissan" },
  { dosyaAdi: "suzuki", markaAdi: "Suzuki" },
  { dosyaAdi: "jeep", markaAdi: "Jeep" },
  { dosyaAdi: "lee-cooper", markaAdi: "Lee Cooper" },
  { dosyaAdi: "sutas", markaAdi: "Sütaş" },
  { dosyaAdi: "toki", markaAdi: "TOKİ" },
  { dosyaAdi: "emlak-yonetim", markaAdi: "Emlak Konut / Emlak Yönetim" },
  { dosyaAdi: "troy", markaAdi: "Troy" },
  { dosyaAdi: "civil", markaAdi: "Civil" },
  { dosyaAdi: "paulmark", markaAdi: "Paulmark" },
  { dosyaAdi: "hatemoglu", markaAdi: "Hatemoğlu" },
];

/** İş birliği güven şeridi — 2 KPI. */
export const IS_BIRLIKLERI_KPI: IsBirligiKPI[] = [
  { deger: "180+", etiket: "Ajans İş Birliği" },
  { deger: "890+", etiket: "Marka Deneyimi" },
];

/** Bölüm metinleri (başlık + eyebrow + alt metin). */
export const IS_BIRLIKLERI = {
  eyebrow: "Güçlü İş Birlikleri",
  baslik: "Türkiye'nin önde gelen markaları sokakta bizimle",
  altMetin:
    "Kamu kurumlarından global markalara, ulusal perakende zincirlerinden reklam ajanslarına kadar geniş bir çevrede iş birliği yürüttük. Aşağıdaki markaların bir bölümü, kampanyalarını Anadolu sokaklarına bizimle taşıdı.",
  markalarLinkMetni: "30 markanın tamamı",
} as const;
