/**
 * İÇERİK DOSYASI — "Güçlü İş Birlikleri" bölümü (G3 → G3.2, logo duvarı).
 *
 * Bu, projenin İLK ayrı içerik dosyasıdır. Kural: kullanıcıya görünen metin
 * ve veri koda gömülmez; buraya toplanır. Bileşenler (LogoMarquee, LogoWall,
 * ana sayfa, /markalar) bu dosyadan besleniyor — metin/logolar değişince tek
 * dosya değişir.
 *
 * Logolar: public/logos/{dosyaAdi}.png (74 adet, dosya adları slug).
 * G3.2 (2026-07-07): 30 → 74 markaya çıkarıldı (Hakan'ın yeni logo paketi).
 *   - Ana sayfa: LogoMarquee TÜM logoları iki/üç zıt satırda akıtır (slice yok).
 *   - /markalar: LogoWall tam duvarı (74) gösterir.
 *   - V5 (2026-09-12): ana sayfadaki "X markanın tamamı" bağlantısı kaldırıldı;
 *     o bölümde yalnız logo akışı kalıyor.
 *   - Pepsi, PepsiCo kurumsal logosunun yerine geçti (Hakan kararı).
 *   - Emlak Konut, mevcut Emlak Yönetim kaydının yerine geçti (Hakan kararı).
 *   - Çakışan 15 marka (a101, arçelik, beko, bim, civil, dyson, getir,
 *     hatemoğlu, migros, nissan, paulmark, toki, trendyol, vodafone,
 *     yemeksepeti) daha net/renkli yeni sürümlerle güncellendi — eski soluk
 *     logolar (VakıfBank hariç) böylece yenilenmiş oldu.
 */

/** Tek bir KPI hücresi (İş birliği güven şeridi). */
export interface IsBirligiKPI {
  /** Vurgulu değer — "180+", "890+" */
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
 * Logolar (74). Sıra bilinçli: tanınırlığı yüksek ulusal/global markalar başta;
 * reklam ajansları ve kamu/kurumsal referanslar sonda. LogoMarquee tamamını
 * akıtır; LogoWall (/markalar) tamamını ızgarada gösterir.
 */
export const IS_BIRLIKLERI_LOGOLARI: MarkaLogo[] = [
  // — Global / ulusal tüketici markaları —
  { dosyaAdi: "coca-cola", markaAdi: "Coca-Cola" },
  { dosyaAdi: "pepsi", markaAdi: "Pepsi" },
  { dosyaAdi: "eti", markaAdi: "Eti" },
  { dosyaAdi: "algida", markaAdi: "Algida" },
  { dosyaAdi: "aygaz", markaAdi: "Aygaz" },
  { dosyaAdi: "turkcell", markaAdi: "Turkcell" },
  { dosyaAdi: "vodafone", markaAdi: "Vodafone" },
  { dosyaAdi: "samsung", markaAdi: "Samsung" },
  { dosyaAdi: "bosch", markaAdi: "Bosch" },
  { dosyaAdi: "dyson", markaAdi: "Dyson" },
  { dosyaAdi: "arcelik", markaAdi: "Arçelik" },
  { dosyaAdi: "beko", markaAdi: "Beko" },
  { dosyaAdi: "media-markt", markaAdi: "MediaMarkt" },
  { dosyaAdi: "teknosa", markaAdi: "Teknosa" },
  // — Perakende zincirleri —
  { dosyaAdi: "trendyol", markaAdi: "Trendyol" },
  { dosyaAdi: "getir", markaAdi: "Getir" },
  { dosyaAdi: "yemeksepeti", markaAdi: "Yemeksepeti" },
  { dosyaAdi: "migros", markaAdi: "Migros" },
  { dosyaAdi: "bim", markaAdi: "BİM" },
  { dosyaAdi: "a101", markaAdi: "A101" },
  { dosyaAdi: "sok", markaAdi: "ŞOK" },
  { dosyaAdi: "carrefoursa", markaAdi: "CarrefourSA" },
  { dosyaAdi: "boyner", markaAdi: "Boyner" },
  { dosyaAdi: "decathlon", markaAdi: "Decathlon" },
  { dosyaAdi: "ikea", markaAdi: "IKEA" },
  { dosyaAdi: "cetinkaya", markaAdi: "Çetinkaya" },
  // — Moda / giyim —
  { dosyaAdi: "adidas", markaAdi: "Adidas" },
  { dosyaAdi: "ipekyol", markaAdi: "İpekyol" },
  { dosyaAdi: "lee-cooper", markaAdi: "Lee Cooper" },
  { dosyaAdi: "civil", markaAdi: "Civil" },
  { dosyaAdi: "paulmark", markaAdi: "Paulmark" },
  { dosyaAdi: "hatemoglu", markaAdi: "Hatemoğlu" },
  { dosyaAdi: "so-chic", markaAdi: "So Chic" },
  // — Otomotiv / enerji —
  { dosyaAdi: "fiat", markaAdi: "Fiat" },
  { dosyaAdi: "honda", markaAdi: "Honda" },
  { dosyaAdi: "nissan", markaAdi: "Nissan" },
  { dosyaAdi: "suzuki", markaAdi: "Suzuki" },
  { dosyaAdi: "jeep", markaAdi: "Jeep" },
  { dosyaAdi: "togg", markaAdi: "Togg" },
  { dosyaAdi: "otokoc", markaAdi: "Otokoç" },
  { dosyaAdi: "bp", markaAdi: "BP" },
  { dosyaAdi: "castrol", markaAdi: "Castrol" },
  // — Finans —
  { dosyaAdi: "akbank", markaAdi: "Akbank" },
  { dosyaAdi: "garanti-bbva", markaAdi: "Garanti BBVA" },
  { dosyaAdi: "vakifbank", markaAdi: "VakıfBank" },
  { dosyaAdi: "vakif-katilim", markaAdi: "Vakıf Katılım" },
  { dosyaAdi: "albayrak-finans", markaAdi: "Albayrak Finans" },
  { dosyaAdi: "iyi-finans", markaAdi: "İyi Finans" },
  // — Kurumsal / holding —
  { dosyaAdi: "koc", markaAdi: "Koç Holding" },
  { dosyaAdi: "zer", markaAdi: "Zer" },
  { dosyaAdi: "sutas", markaAdi: "Sütaş" },
  // — Gıda / yeme-içme markaları yukarıda; medya-yayın —
  { dosyaAdi: "exxen", markaAdi: "Exxen" },
  { dosyaAdi: "trt", markaAdi: "TRT" },
  { dosyaAdi: "tv100", markaAdi: "TV100" },
  { dosyaAdi: "fox", markaAdi: "Fox" },
  { dosyaAdi: "nesine", markaAdi: "Nesine" },
  // — Havacılık / sağlık / eğitim / gayrimenkul —
  { dosyaAdi: "sunexpress", markaAdi: "SunExpress" },
  { dosyaAdi: "memorial", markaAdi: "Memorial" },
  { dosyaAdi: "doping-hafiza", markaAdi: "Doping Hafıza" },
  { dosyaAdi: "emlak-konut", markaAdi: "Emlak Konut" },
  { dosyaAdi: "toki", markaAdi: "TOKİ" },
  { dosyaAdi: "troy", markaAdi: "Troy" },
  // — Reklam / medya ajansları —
  { dosyaAdi: "dentsu", markaAdi: "Dentsu" },
  { dosyaAdi: "wavemaker", markaAdi: "Wavemaker" },
  { dosyaAdi: "donanim-medya", markaAdi: "Donanım Medya" },
  { dosyaAdi: "on-medya", markaAdi: "On Medya" },
  { dosyaAdi: "out-medya", markaAdi: "Out Medya" },
  { dosyaAdi: "fikri-alem", markaAdi: "Fikri Alem" },
  // — Kamu / kurumsal-toplumsal referanslar —
  { dosyaAdi: "cumhurbaskanligi-iletisim", markaAdi: "Cumhurbaşkanlığı İletişim" },
  { dosyaAdi: "kizilay", markaAdi: "Kızılay" },
  { dosyaAdi: "akp", markaAdi: "AK Parti" },
  { dosyaAdi: "chp", markaAdi: "CHP" },
  { dosyaAdi: "iyi-parti", markaAdi: "İYİ Parti" },
  { dosyaAdi: "deva", markaAdi: "DEVA Partisi" },
];

/** İş birliği güven şeridi — 2 KPI. */
export const IS_BIRLIKLERI_KPI: IsBirligiKPI[] = [
  { deger: "180+", etiket: "Ajans İş Birliği" },
  { deger: "890+", etiket: "Marka Deneyimi" },
];

/* MARKALAR_LINK_METNI ("X markanın tamamı") V5'te (2026-09-12, Hakan kararı)
 * KALDIRILDI: ana sayfada logo akışının altındaki bağlantı sökülünce tek
 * kullanıcısı kalmadı. /markalar sayfası ve içindeki LogoWall duruyor. */

/** Bölüm metinleri (başlık + eyebrow + alt metin). */
export const IS_BIRLIKLERI = {
  eyebrow: "Güçlü İş Birlikleri",
  baslik: "Türkiye'nin önde gelen markaları sokakta bizimle",
  altMetin:
    "Kamu kurumlarından global markalara, ulusal perakende zincirlerinden reklam ajanslarına kadar geniş bir çevrede iş birliği yürüttük. Aşağıdaki markaların bir bölümü, kampanyalarını Anadolu sokaklarına bizimle taşıdı.",
} as const;
