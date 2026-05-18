import type { FormState, FormAction } from "./types";
import { TOTAL_STEPS, BUTCE_BANTLARI_SEGMENT } from "./types";

/**
 * Form'un başlangıç durumu.
 * Kullanıcı sayfayı ilk açtığında bu state'le başlar.
 */
export const initialState: FormState = {
  currentStep: 1,

  // Adım 1
  segment: null,

  // Adım 2
  sehirler: [],

  // Adım 3
  formatlar: [],
  oneriIstiyor: false,

  // Adım 4
  butce: null,
  zaman: null,

  // Adım 5
  iletisim: {
    adsoyad: "",
    email: "",
    telefon: "",
    sirket: "",
    sektor: "",
  },

  // Adım 5 (ek): Ajans bilgileri — Step1'de "ajans" seçildiyse Step5'in
  // başında doldurulur, başka segmentlerde dokunulmaz.
  ajansBilgisi: {
    musteriMarka: "",
    kreatifDurum: null,
    dogrudanIletisim: null,
  },

  // Adım 6
  mesaj: "",
  kvkk: false,
  pazarlama: false,

  // Submit
  submitting: false,
  submitted: false,
  error: null,
};

/**
 * Reducer — tüm state geçişleri burada yönetilir.
 * Her action saf bir fonksiyon: (state, action) => newState
 */
export function formReducer(
  state: FormState,
  action: FormAction
): FormState {
  switch (action.type) {
    // ═══ NAVİGASYON ═══
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: Math.max(1, Math.min(TOTAL_STEPS, action.step)),
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(TOTAL_STEPS, state.currentStep + 1),
      };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
      };

    // ═══ ADIM 1: SEGMENT ═══
    case "SET_SEGMENT": {
      // Edge: Kullanıcı Step4'te bir bütçe seçtikten sonra Step1'e dönüp
      // segmenti değiştirebilir. Yeni segment ile uyumsuz bütçe seçimi
      // sessizce kalırsa kullanıcı UI'da o seçeneği görmez ama state'te
      // hâlâ valid sayılır (Step4 "İleri" aktif kalır). Bu kafa karıştırır.
      // Çözüm: Yeni segmentin bantlarında olmayan bütçeyi null'a çek.
      const allowedBudgets = new Set(BUTCE_BANTLARI_SEGMENT[action.segment]);
      const butce =
        state.butce && allowedBudgets.has(state.butce) ? state.butce : null;
      return { ...state, segment: action.segment, butce };
    }

    // ═══ ADIM 2: ŞEHİRLER ═══
    case "TOGGLE_SEHIR": {
      const exists = state.sehirler.includes(action.sehir);
      return {
        ...state,
        sehirler: exists
          ? state.sehirler.filter((s) => s !== action.sehir)
          : [...state.sehirler, action.sehir],
      };
    }

    case "SET_SEHIRLER":
      return { ...state, sehirler: action.sehirler };

    case "CLEAR_SEHIRLER":
      return { ...state, sehirler: [] };

    // ═══ ADIM 3: FORMATLAR ═══
    case "TOGGLE_FORMAT": {
      const exists = state.formatlar.includes(action.format);
      return {
        ...state,
        formatlar: exists
          ? state.formatlar.filter((f) => f !== action.format)
          : [...state.formatlar, action.format],
        // Format seçilince "öneri istiyorum" iptal edilir
        oneriIstiyor: exists ? state.oneriIstiyor : false,
      };
    }

    case "SET_FORMATLAR":
      // Deep-link prefill için (örn. /teklif-al?format=billboard) — listeyi
      // doğrudan ayarlar, varsa "öneri istiyorum"u iptal eder.
      return {
        ...state,
        formatlar: action.formatlar,
        oneriIstiyor: action.formatlar.length > 0 ? false : state.oneriIstiyor,
      };

    case "TOGGLE_ONERI":
      return {
        ...state,
        oneriIstiyor: !state.oneriIstiyor,
        // Öneri isteyince mevcut format seçimleri temizlenir
        formatlar: !state.oneriIstiyor ? [] : state.formatlar,
      };

    case "CLEAR_FORMATLAR":
      return { ...state, formatlar: [], oneriIstiyor: false };

    // ═══ ADIM 4: BÜTÇE + ZAMAN ═══
    case "SET_BUTCE":
      return { ...state, butce: action.butce };

    case "SET_ZAMAN":
      return { ...state, zaman: action.zaman };

    // ═══ ADIM 5: İLETİŞİM ═══
    case "UPDATE_ILETISIM":
      return {
        ...state,
        iletisim: {
          ...state.iletisim,
          [action.field]: action.value,
        },
      };

    // ═══ ADIM 5: AJANS BİLGİLERİ (segment === "ajans" iken) ═══
    case "SET_AJANS_MUSTERI_MARKA":
      return {
        ...state,
        ajansBilgisi: { ...state.ajansBilgisi, musteriMarka: action.value },
      };

    case "SET_AJANS_KREATIF":
      return {
        ...state,
        ajansBilgisi: { ...state.ajansBilgisi, kreatifDurum: action.value },
      };

    case "SET_AJANS_DOGRUDAN_ILETISIM":
      return {
        ...state,
        ajansBilgisi: {
          ...state.ajansBilgisi,
          dogrudanIletisim: action.value,
        },
      };

    // ═══ ADIM 6: MESAJ + KVKK + PAZARLAMA ═══
    case "SET_MESAJ":
      return { ...state, mesaj: action.mesaj };

    case "SET_KVKK":
      return { ...state, kvkk: action.value };

    case "SET_PAZARLAMA":
      return { ...state, pazarlama: action.value };

    // ═══ SUBMIT LIFECYCLE ═══
    case "SUBMITTING":
      return { ...state, submitting: true, error: null };

    case "SUBMITTED":
      return { ...state, submitting: false, submitted: true, error: null };

    case "SUBMIT_ERROR":
      return { ...state, submitting: false, error: action.error };

    // ═══ RESET & RESTORE ═══
    case "RESET":
      return initialState;

    case "LOAD_FROM_STORAGE":
      // localStorage'dan gelen state'i yükle, ama submit durumunu sıfırla
      return {
        ...action.state,
        submitting: false,
        submitted: false,
        error: null,
      };

    default:
      return state;
  }
}
