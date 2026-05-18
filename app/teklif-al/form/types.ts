/**
 * Multi-step form için TypeScript tip tanımları.
 * State, action ve form data yapısı burada.
 */

// Form segment seçenekleri (1. adım)
export type Segment = "marka" | "ajans" | "ilk";

// Bütçe seçenekleri
//
// İlk-kez küçük işletme bantları (`ilk_*`) — kafe, butik, klinik gibi
// 5K-100K arası kampanyalar. /ilk-kampanyaniz landing'iyle uyumlu.
//
// Marka bantları (`100k_*` → `1m_uzeri`) — D2C ve kurumsal markalar.
// Mevcut. 100K altı en küçük kademe; "100K altı"nı görmek bir küçük
// işletmede küçültücü olduğu için segment === "ilk" iken
// `ilk_*` bantları gösterilir (Step4ButceZaman.tsx).
export type ButceSecimi =
  // Küçük işletme (ilk-kez) bantları
  | "ilk_5_15k"
  | "ilk_15_40k"
  | "ilk_40_100k"
  // Marka / ajans bantları (orta-büyük)
  | "100k_alti"
  | "100_250k"
  | "250_500k"
  | "500k_1m"
  | "1m_uzeri"
  | "belirsiz";

// Zaman seçenekleri
export type ZamanSecimi =
  | "acil"
  | "bu_ay"
  | "1_3_ay"
  | "3_6_ay"
  | "belirsiz";

// İletişim bilgileri
export type IletisimBilgileri = {
  adsoyad: string;
  email: string;
  telefon: string;
  sirket: string;
  sektor: string;
};

// Ajans-spesifik ek bilgiler (segment === "ajans" iken Step5'in başında
// toplanır). DB'de ayrı kolonu yok — `mesaj` alanına embed edilerek
// taşınır (submit-action.ts buildMesaj). Bu sayede tablo şeması
// değişmeden ajans triage bilgisi ekibe ulaşır.
export type KreatifDurum = "hazir" | "yardim" | null;
export type DogrudanIletisimTercihi = "evet" | "hayir" | null;

export type AjansBilgisi = {
  // Hangi marka için teklif istiyor — opsiyonel, satış triage için faydalı
  musteriMarka: string;
  // Tasarımı kendi yaptılar mı, yoksa OK'ten yardım mı bekliyorlar
  kreatifDurum: KreatifDurum;
  // Marka müşterisi ile direkt iletişim kurulmasını istiyorlar mı
  // (kanal hırsızlığı kaygısının ters tarafı: bazıları hızlı çözüm için
  // direkt iletişim ister)
  dogrudanIletisim: DogrudanIletisimTercihi;
};

// Tüm form state'i
export type FormState = {
  // Navigasyon
  currentStep: number; // 1-6

  // Adım 1: Segment
  segment: Segment | null;

  // Adım 2: Şehirler
  sehirler: string[];

  // Adım 3: Formatlar
  formatlar: string[];
  oneriIstiyor: boolean; // "Bana öner" seçildi mi

  // Adım 4: Bütçe + Zaman
  butce: ButceSecimi | null;
  zaman: ZamanSecimi | null;

  // Adım 5: İletişim
  iletisim: IletisimBilgileri;

  // Adım 5 (ek): Ajans bilgileri — segment === "ajans" iken doldurulur
  ajansBilgisi: AjansBilgisi;

  // Adım 6: Mesaj + KVKK + Pazarlama
  mesaj: string;
  kvkk: boolean;
  pazarlama: boolean;

  // Submit durumu
  submitting: boolean;
  submitted: boolean;
  error: string | null;
};

// Actions — reducer'a gönderilecek event'ler
export type FormAction =
  // Navigasyon
  | { type: "GO_TO_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  // Adım 1
  | { type: "SET_SEGMENT"; segment: Segment }
  // Adım 2
  | { type: "TOGGLE_SEHIR"; sehir: string }
  | { type: "SET_SEHIRLER"; sehirler: string[] }
  | { type: "CLEAR_SEHIRLER" }
  // Adım 3
  | { type: "TOGGLE_FORMAT"; format: string }
  | { type: "SET_FORMATLAR"; formatlar: string[] }
  | { type: "TOGGLE_ONERI" }
  | { type: "CLEAR_FORMATLAR" }
  // Adım 4
  | { type: "SET_BUTCE"; butce: ButceSecimi }
  | { type: "SET_ZAMAN"; zaman: ZamanSecimi }
  // Adım 5
  | { type: "UPDATE_ILETISIM"; field: keyof IletisimBilgileri; value: string }
  // Adım 5 (ajans-spesifik)
  | { type: "SET_AJANS_MUSTERI_MARKA"; value: string }
  | { type: "SET_AJANS_KREATIF"; value: KreatifDurum }
  | { type: "SET_AJANS_DOGRUDAN_ILETISIM"; value: DogrudanIletisimTercihi }
  // Adım 6
  | { type: "SET_MESAJ"; mesaj: string }
  | { type: "SET_KVKK"; value: boolean }
  | { type: "SET_PAZARLAMA"; value: boolean }
  // Submit lifecycle
  | { type: "SUBMITTING" }
  | { type: "SUBMITTED" }
  | { type: "SUBMIT_ERROR"; error: string }
  // Reset & restore
  | { type: "RESET" }
  | { type: "LOAD_FROM_STORAGE"; state: FormState };

// Supabase'e gönderilecek payload (talepler tablosu şemasıyla uyumlu)
export type TalepPayload = {
  ad_soyad: string;
  email: string;
  sirket: string | null;
  telefon: string | null;
  sektor: string | null;
  sehirler: string[];
  formatlar: string[];
  butce_araligi: string | null;
  kampanya_zamani: string | null;
  mesaj: string | null;
  kvkk_onay: boolean;
  pazarlama_onay: boolean;
  segment: Segment | null;
  // Server-side eklenecek
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  kvkk_onay_tarihi?: string;
  aydinlatma_versiyonu?: string;
};

// Bütçe seçeneklerinin etiketleri (UI'da gösterilecek)
export const BUTCE_LABELS: Record<ButceSecimi, string> = {
  // İlk-kez küçük işletme bantları
  ilk_5_15k: "5.000 — 15.000 TL",
  ilk_15_40k: "15.000 — 40.000 TL",
  ilk_40_100k: "40.000 — 100.000 TL",
  // Marka / ajans bantları
  "100k_alti": "100.000 TL altı",
  "100_250k": "100.000 — 250.000 TL",
  "250_500k": "250.000 — 500.000 TL",
  "500k_1m": "500.000 TL — 1.000.000 TL",
  "1m_uzeri": "1.000.000 TL üzeri",
  belirsiz: "Henüz net değil",
};

// Bütçe seçeneklerinin segment-bazlı kümeleri.
// Step4ButceZaman.tsx, state.segment'e göre bu listeyi seçer; segment yoksa
// veya tanımsız bir değer gelirse `default` listesi gösterilir.
//
// Kararlar:
//   - "ilk" segmentinde 100K+ bantları gizleniyor — küçük işletme için
//     "100K altı" en küçük seçenek ezici / küçültücü; 5-15K-40K-100K
//     bantları daha kalibre.
//   - "ajans" ve "marka" segmentlerinde aynı liste; ajansların
//     müşterileri için 100K-altı küçük testler de olabiliyor.
//   - "belirsiz" her listede var (hâlâ keşif aşamasındakileri kaybetme).
export const BUTCE_BANTLARI_SEGMENT: Record<Segment, ButceSecimi[]> = {
  ilk: ["ilk_5_15k", "ilk_15_40k", "ilk_40_100k", "belirsiz"],
  marka: [
    "100k_alti",
    "100_250k",
    "250_500k",
    "500k_1m",
    "1m_uzeri",
    "belirsiz",
  ],
  ajans: [
    "100k_alti",
    "100_250k",
    "250_500k",
    "500k_1m",
    "1m_uzeri",
    "belirsiz",
  ],
};

// Zaman seçeneklerinin etiketleri
export const ZAMAN_LABELS: Record<ZamanSecimi, string> = {
  acil: "Acil (1-2 hafta içinde)",
  bu_ay: "Bu ay",
  "1_3_ay": "Önümüzdeki 1-3 ay",
  "3_6_ay": "Önümüzdeki 3-6 ay",
  belirsiz: "Henüz net değil",
};

// Segment etiketleri
export const SEGMENT_LABELS: Record<Segment, string> = {
  marka: "Marka",
  ajans: "Reklam Ajansı",
  ilk: "İlk Açıkhava Kampanyası",
};

// Toplam adım sayısı (her yerden referans alınsın)
export const TOTAL_STEPS = 6;
