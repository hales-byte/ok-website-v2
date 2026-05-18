import type { FormState } from "./types";
import { initialState } from "./state";

/**
 * localStorage helper'ları — versiyonlu, timestamp'li, expiry'li.
 * Form'un mevcut durumunu sayfalar arası sakla, expiry sonrası sıfırla.
 *
 * KVKK m.4 (veri minimizasyonu) gereği:
 *  - Hassas iletişim bilgileri (ad, e-posta, telefon, şirket, sektör) ve
 *    kullanıcının yazdığı mesaj **localStorage'a yazılmaz**. Form yarım
 *    bırakılırsa kullanıcı son adımı tekrar doldurur — daha az veri,
 *    daha az risk (cihaz paylaşımı / XSS / tarayıcı eklentileri).
 *  - Saklama süresi 7 → 3 güne indirildi (form aşırı uzun sürmemeli).
 *  - Versiyon `v2` olarak bumpedldi; eski `v1` (PII içerebilir) entry'leri
 *    bir sonraki ziyarette otomatik temizleniyor.
 */

const STORAGE_KEY = "ok-teklif-form-v2";
const LEGACY_KEYS = ["ok-teklif-form-v1"]; // PII içeriyordu; varsa temizle
const STORAGE_EXPIRY_DAYS = 3;
const STORAGE_EXPIRY_MS = STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// Saklanmayacak state alanları (her zaman temiz başlasın)
const TRANSIENT_FIELDS: (keyof FormState)[] = [
  "submitting",
  "submitted",
  "error",
];

// KVKK m.4 — localStorage'a YAZILMAYACAK PII alanları.
// Bu alanlar her oturumda kullanıcı tarafından yeniden girilir.
//
// `ajansBilgisi.musteriMarka` müşteri marka adı içerir — kullanıcının
// kendi PII'si değil ama ajansın *ticari hassas* bilgisi (hangi marka
// için teklif aradığı). Cihaz paylaşımında ve XSS senaryolarında
// gereksiz risk; minimizasyon prensibi gereği saklanmıyor. Kullanıcı
// her oturumda Adım 5'te 3 opsiyonel alanı yeniden doldurur.
const PII_FIELDS: (keyof FormState)[] = ["iletisim", "mesaj", "ajansBilgisi"];

// localStorage'da saklanan veri yapısı
type StoredData = {
  state: Partial<FormState>;
  timestamp: number;
  version: 2;
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

/** Eski versiyon key'lerini sil — PII içerebilir, taşımıyoruz. */
function clearLegacyKeys(): void {
  if (!isClient()) return;
  for (const key of LEGACY_KEYS) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

/**
 * Mevcut form state'ini localStorage'a kaydet.
 * Timestamp ekler, transient + PII alanlarını çıkarır.
 */
export function saveFormState(state: FormState): void {
  if (!isClient()) return;

  try {
    const persistableState: Partial<FormState> = { ...state };
    for (const field of TRANSIENT_FIELDS) {
      delete persistableState[field];
    }
    for (const field of PII_FIELDS) {
      delete persistableState[field];
    }

    const data: StoredData = {
      state: persistableState,
      timestamp: Date.now(),
      version: 2,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage dolu/disabled ise sessizce geç
  }
}

/**
 * localStorage'dan form state'ini yükle.
 * 3 günden eskiyse otomatik temizler ve null döner.
 * PII alanları (iletisim, mesaj) artık saklanmıyor → initialState'ten gelir.
 */
export function loadFormState(): FormState | null {
  if (!isClient()) return null;

  // Her load'da legacy v1 entry'lerini sil
  clearLegacyKeys();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Versiyon mismatch / bozuk veri → temizle
    if (parsed.version !== 2 || !parsed.timestamp || !parsed.state) {
      clearFormState();
      return null;
    }

    // 3 günden eskiyse temizle
    const age = Date.now() - parsed.timestamp;
    if (age > STORAGE_EXPIRY_MS) {
      clearFormState();
      return null;
    }

    // Basic shape kontrolü
    if (typeof parsed.state.currentStep !== "number") {
      return null;
    }

    // PII initialState'ten taze gelir; persisted state üstüne uygulanır.
    return {
      ...initialState,
      ...parsed.state,
      iletisim: initialState.iletisim,
      mesaj: initialState.mesaj,
      ajansBilgisi: initialState.ajansBilgisi,
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
 * iletisim + mesaj artık saklanmadığı için onlar completedSteps'e dahil edilmez.
 */
export function getStoredProgress(): StoredProgress | null {
  if (!isClient()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || !parsed.state) return null;

    // Expiry: yüklenirken zaten silinecek
    const age = Date.now() - parsed.timestamp;
    if (age > STORAGE_EXPIRY_MS) return null;

    const state = parsed.state as Partial<FormState>;
    let completedSteps = 0;

    // Hangi adımlar gerçekten doldurulmuş (PII alanları sayılmıyor)
    if (state.segment) completedSteps++;
    if (state.sehirler && state.sehirler.length > 0) completedSteps++;
    if (
      (state.formatlar && state.formatlar.length > 0) ||
      state.oneriIstiyor
    )
      completedSteps++;
    if (state.butce && state.zaman) completedSteps++;
    // Adım 5 (iletisim) ve 6 (mesaj+kvkk) PII içerdiğinden saklanmıyor →
    // banner her zaman max 4 adım tamamlanmış gösterir; kullanıcı son adımları
    // taze doldurur. Bu kasıtlı: KVKK minimizasyon + cihaz güvenliği.

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
 * Legacy versiyonları da temizler.
 */
export function clearFormState(): void {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    clearLegacyKeys();
  } catch {
    // sessizce geç
  }
}
