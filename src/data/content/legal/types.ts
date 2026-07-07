/**
 * İÇERİK — Hukuki metin blok modeli (KVKK/gizlilik/çerez/başvuru formu).
 *
 * Kural (CLAUDE.md): kullanıcıya görünen metin koda gömülmez; buraya toplanır.
 * Metinlerin TEK KAYNAĞI `OK_KVKK_Teslim/*.md` (avukat teslimi) — birebir
 * aktarılır, yeniden yazılmaz. Bu dosyalar o metnin yapısal (blok) hâlidir.
 *
 * Markdown kütüphanesi EKLENMEDİ (yeni bağımlılık yasağı). Bunun yerine küçük
 * bir blok modeli + `components/legal/LegalIcerik.tsx` renderer'ı kullanılır.
 */

/** Satır içi parça — düz metin, kalın ve/veya link olabilir. */
export interface Parca {
  metin: string;
  kalin?: boolean;
  /** İç link ("/kvkk-aydinlatma") ya da dış link ("https://…"). */
  link?: string;
  /** Dış link ise yeni sekmede açılır. */
  dis?: boolean;
}

/** Bir metin = satır içi parçalar dizisi (çoğu zaman tek parça). */
export type Metin = Parca[];

export type Blok =
  | { tip: "h2"; metin: string }
  | { tip: "h3"; metin: string }
  | { tip: "p"; icerik: Metin }
  | { tip: "ul"; ogeler: Metin[] }
  | { tip: "not"; icerik: Metin } // blockquote / kısa uyarı
  | { tip: "tablo"; basliklar: string[]; satirlar: string[][] };

export interface LegalDoc {
  baslik: string;
  /** "YYYY.MM.DD" — yayın/versiyon tarihi. */
  versiyon: string;
  /** "Temmuz 2026" — insan-okur güncelleme etiketi. */
  guncelleme: string;
  bloklar: Blok[];
}

/** Kısayol: düz metin parçası. */
export const d = (metin: string): Parca => ({ metin });
/** Kısayol: kalın parça. */
export const b = (metin: string): Parca => ({ metin, kalin: true });
/** Kısayol: link parçası (iç link varsayılan; dış için dis=true geç). */
export const a = (metin: string, link: string, dis = false): Parca => ({
  metin,
  link,
  dis,
});
