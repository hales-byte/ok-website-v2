/**
 * Multi-step form için TypeScript tip tanımları.
 * State, action ve form data yapısı burada.
 */

// Form segment seçenekleri (1. adım)
export type Segment = "marka" | "ajans" | "ilk";

// Bütçe seçenekleri
export type ButceSecimi =
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
  "100k_alti": "100.000 TL altı",
  "100_250k": "100.000 — 250.000 TL",
  "250_500k": "250.000 — 500.000 TL",
  "500k_1m": "500.000 TL — 1.000.000 TL",
  "1m_uzeri": "1.000.000 TL üzeri",
  belirsiz: "Henüz net değil",
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
