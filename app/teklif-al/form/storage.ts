import type { FormState } from "./types";
import { initialState } from "./state";

/**
 * localStorage helper'ları — versiyonlu, timestamp'li, expiry'li.
 * Form'un mevcut durumunu sayfalar arası sakla, 7 günden sonra sıfırla.
 */

const STORAGE_KEY = "ok-teklif-form-v1";
const STORAGE_EXPIRY_DAYS = 7;
const STORAGE_EXPIRY_MS = STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// Saklanmayacak state alanları (her zaman temiz başlasın)
const TRANSIENT_FIELDS: (keyof FormState)[] = [
  "submitting",
  "submitted",
  "error",
];

// localStorage'da saklanan veri yapısı
type StoredData = {
  state: Partial<FormState>;
  timestamp: number;
  version: 1;
};

// Banner için gerekli özet bilgi
export type StoredProgress = {
  currentStep: number;
  timestamp: number;
  ageHours: number;
  completedSteps: number;
};

function isClient(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/**
 * Mevcut form state'ini localStorage'a kaydet.
 * Timestamp ekler, transient alanları çıkarır.
 */
export function saveFormState(state: FormState): void {
  if (!isClient()) return;

  try {
    const persistableState: Partial<FormState> = { ...state };
    for (const field of TRANSIENT_FIELDS) {
      delete persistableState[field];
    }

    const data: StoredData = {
      state: persistableState,
      timestamp: Date.now(),
      version: 1,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage dolu/disabled ise sessizce geç
  }
}

/**
 * localStorage'dan form state'ini yükle.
 * 7 günden eskiyse otomatik temizler ve null döner.
 */
export function loadFormState(): FormState | null {
  if (!isClient()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Eski format (versiyon yok) veya bozuk veri → temizle
    if (!parsed.version || !parsed.timestamp || !parsed.state) {
      clearFormState();
      return null;
    }

    // 7 günden eskiyse temizle
    const age = Date.now() - parsed.timestamp;
    if (age > STORAGE_EXPIRY_MS) {
      clearFormState();
      return null;
    }

    // Basic shape kontrolü
    if (typeof parsed.state.currentStep !== "number") {
      return null;
    }

    return {
      ...initialState,
      ...parsed.state,
      submitting: false,
      submitted: false,
      error: null,
    } as FormState;
  } catch {
    return null;
  }
}

/**
 * Banner için özet progress bilgisi.
 * Tam state yüklemeden, hızlıca "ne kadar dolu, ne zaman başladı" döner.
 */
export function getStoredProgress(): StoredProgress | null {
  if (!isClient()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || !parsed.state) return null;

    // 7 günden eskiyse null dön (yüklenirken zaten silinecek)
    const age = Date.now() - parsed.timestamp;
    if (age > STORAGE_EXPIRY_MS) return null;

    const state = parsed.state as Partial<FormState>;
    let completedSteps = 0;

    // Hangi adımlar gerçekten doldurulmuş
    if (state.segment) completedSteps++;
    if (state.sehirler && state.sehirler.length > 0) completedSteps++;
    if (
      (state.formatlar && state.formatlar.length > 0) ||
      state.oneriIstiyor
    )
      completedSteps++;
    if (state.butce && state.zaman) completedSteps++;
    if (state.iletisim?.email && state.iletisim?.adsoyad) completedSteps++;
    if (state.kvkk) completedSteps++;

    return {
      currentStep: state.currentStep || 1,
      timestamp: parsed.timestamp,
      ageHours: Math.floor(age / (1000 * 60 * 60)),
      completedSteps,
    };
  } catch {
    return null;
  }
}

/**
 * localStorage'daki form state'ini temizle.
 * Form gönderilince veya kullanıcı "Sıfırla" derse çağrılır.
 */
export function clearFormState(): void {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sessizce geç
  }
}
