import type { FormState } from "./types";

/**
 * Her adımın valid olup olmadığını kontrol eden saf fonksiyonlar.
 * "İleri" butonunun aktif olması için bu fonksiyonlar true döner.
 */

// Email regex — RFC 5322 basit versiyon
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Adım 1: Segment seçildi mi?
export function isStep1Valid(state: FormState): boolean {
  return state.segment !== null;
}

// Adım 2: En az 1 şehir seçildi mi?
export function isStep2Valid(state: FormState): boolean {
  return state.sehirler.length > 0;
}

// Adım 3: Format seçildi VEYA "bana öner" işaretli mi?
export function isStep3Valid(state: FormState): boolean {
  return state.formatlar.length > 0 || state.oneriIstiyor;
}

// Adım 4: Bütçe ve zaman seçildi mi?
export function isStep4Valid(state: FormState): boolean {
  return state.butce !== null && state.zaman !== null;
}

// Adım 5: Ad soyad ve geçerli email var mı?
export function isStep5Valid(state: FormState): boolean {
  const adsoyad = state.iletisim.adsoyad.trim();
  const email = state.iletisim.email.trim();

  return adsoyad.length >= 2 && EMAIL_REGEX.test(email);
}

// Adım 6: KVKK onayı verildi mi?
export function isStep6Valid(state: FormState): boolean {
  return state.kvkk === true;
}

/**
 * Verilen adımın valid olup olmadığını döner.
 * Adım numarasına göre doğru fonksiyon çağrılır.
 */
export function isStepValid(state: FormState, step: number): boolean {
  switch (step) {
    case 1:
      return isStep1Valid(state);
    case 2:
      return isStep2Valid(state);
    case 3:
      return isStep3Valid(state);
    case 4:
      return isStep4Valid(state);
    case 5:
      return isStep5Valid(state);
    case 6:
      return isStep6Valid(state);
    default:
      return false;
  }
}

/**
 * Şu anki adım valid mi?
 */
export function isCurrentStepValid(state: FormState): boolean {
  return isStepValid(state, state.currentStep);
}

/**
 * Tüm form valid mi (gönderilebilir mi)?
 * Submit butonu için kullanılır.
 */
export function isFormSubmittable(state: FormState): boolean {
  return (
    isStep1Valid(state) &&
    isStep2Valid(state) &&
    isStep3Valid(state) &&
    isStep4Valid(state) &&
    isStep5Valid(state) &&
    isStep6Valid(state)
  );
}

/**
 * Email'in geçerli formatta olup olmadığını döner.
 * Inline validation için kullanılır.
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Telefon numarasını basit kontrol et.
 * (Türkiye formatı: en az 10 hane, opsiyonel)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Opsiyonel alan
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10 && digitsOnly.length <= 13;
}
