import type { FormState, FormAction } from "./types";
import { TOTAL_STEPS } from "./types";

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
    case "SET_SEGMENT":
      return { ...state, segment: action.segment };

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
