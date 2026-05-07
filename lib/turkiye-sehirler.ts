/**
 * Türkiye'nin 81 ili — bölge ve büyükşehir bilgisiyle.
 * Form'daki şehir seçimi ve hızlı seçim butonları için kullanılır.
 */

export type Bolge =
  | "Marmara"
  | "Ege"
  | "Akdeniz"
  | "İç Anadolu"
  | "Karadeniz"
  | "Doğu Anadolu"
  | "Güneydoğu Anadolu";

export type Sehir = {
  ad: string;
  bolge: Bolge;
  buyuksehir: boolean;
};

export const SEHIRLER: Sehir[] = [
  // MARMARA
  { ad: "İstanbul", bolge: "Marmara", buyuksehir: true },
  { ad: "Bursa", bolge: "Marmara", buyuksehir: true },
  { ad: "Kocaeli", bolge: "Marmara", buyuksehir: true },
  { ad: "Tekirdağ", bolge: "Marmara", buyuksehir: true },
  { ad: "Balıkesir", bolge: "Marmara", buyuksehir: true },
  { ad: "Sakarya", bolge: "Marmara", buyuksehir: true },
  { ad: "Çanakkale", bolge: "Marmara", buyuksehir: false },
  { ad: "Edirne", bolge: "Marmara", buyuksehir: false },
  { ad: "Kırklareli", bolge: "Marmara", buyuksehir: false },
  { ad: "Yalova", bolge: "Marmara", buyuksehir: false },
  { ad: "Bilecik", bolge: "Marmara", buyuksehir: false },

  // EGE
  { ad: "İzmir", bolge: "Ege", buyuksehir: true },
  { ad: "Aydın", bolge: "Ege", buyuksehir: true },
  { ad: "Denizli", bolge: "Ege", buyuksehir: true },
  { ad: "Manisa", bolge: "Ege", buyuksehir: true },
  { ad: "Muğla", bolge: "Ege", buyuksehir: true },
  { ad: "Afyonkarahisar", bolge: "Ege", buyuksehir: false },
  { ad: "Kütahya", bolge: "Ege", buyuksehir: false },
  { ad: "Uşak", bolge: "Ege", buyuksehir: false },

  // AKDENİZ
  { ad: "Antalya", bolge: "Akdeniz", buyuksehir: true },
  { ad: "Mersin", bolge: "Akdeniz", buyuksehir: true },
  { ad: "Adana", bolge: "Akdeniz", buyuksehir: true },
  { ad: "Hatay", bolge: "Akdeniz", buyuksehir: true },
  { ad: "Kahramanmaraş", bolge: "Akdeniz", buyuksehir: true },
  { ad: "Isparta", bolge: "Akdeniz", buyuksehir: false },
  { ad: "Burdur", bolge: "Akdeniz", buyuksehir: false },
  { ad: "Osmaniye", bolge: "Akdeniz", buyuksehir: false },

  // İÇ ANADOLU
  { ad: "Ankara", bolge: "İç Anadolu", buyuksehir: true },
  { ad: "Konya", bolge: "İç Anadolu", buyuksehir: true },
  { ad: "Kayseri", bolge: "İç Anadolu", buyuksehir: true },
  { ad: "Eskişehir", bolge: "İç Anadolu", buyuksehir: true },
  { ad: "Sivas", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Yozgat", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Aksaray", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Karaman", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Kırıkkale", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Kırşehir", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Nevşehir", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Niğde", bolge: "İç Anadolu", buyuksehir: false },
  { ad: "Çankırı", bolge: "İç Anadolu", buyuksehir: false },

  // KARADENİZ
  { ad: "Samsun", bolge: "Karadeniz", buyuksehir: true },
  { ad: "Trabzon", bolge: "Karadeniz", buyuksehir: true },
  { ad: "Ordu", bolge: "Karadeniz", buyuksehir: true },
  { ad: "Bolu", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Düzce", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Zonguldak", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Karabük", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Bartın", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Kastamonu", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Sinop", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Çorum", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Amasya", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Tokat", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Giresun", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Gümüşhane", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Bayburt", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Rize", bolge: "Karadeniz", buyuksehir: false },
  { ad: "Artvin", bolge: "Karadeniz", buyuksehir: false },

  // DOĞU ANADOLU
  { ad: "Van", bolge: "Doğu Anadolu", buyuksehir: true },
  { ad: "Malatya", bolge: "Doğu Anadolu", buyuksehir: true },
  { ad: "Erzurum", bolge: "Doğu Anadolu", buyuksehir: true },
  { ad: "Elazığ", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Erzincan", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Bingöl", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Tunceli", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Muş", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Bitlis", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Hakkari", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Ağrı", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Iğdır", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Kars", bolge: "Doğu Anadolu", buyuksehir: false },
  { ad: "Ardahan", bolge: "Doğu Anadolu", buyuksehir: false },

  // GÜNEYDOĞU ANADOLU
  { ad: "Gaziantep", bolge: "Güneydoğu Anadolu", buyuksehir: true },
  { ad: "Şanlıurfa", bolge: "Güneydoğu Anadolu", buyuksehir: true },
  { ad: "Diyarbakır", bolge: "Güneydoğu Anadolu", buyuksehir: true },
  { ad: "Mardin", bolge: "Güneydoğu Anadolu", buyuksehir: true },
  { ad: "Adıyaman", bolge: "Güneydoğu Anadolu", buyuksehir: false },
  { ad: "Batman", bolge: "Güneydoğu Anadolu", buyuksehir: false },
  { ad: "Şırnak", bolge: "Güneydoğu Anadolu", buyuksehir: false },
  { ad: "Siirt", bolge: "Güneydoğu Anadolu", buyuksehir: false },
  { ad: "Kilis", bolge: "Güneydoğu Anadolu", buyuksehir: false },
];

// İsimlerin alfabetik sıralı listesi
export const SEHIR_ISIMLERI: string[] = SEHIRLER.map((s) => s.ad).sort(
  (a, b) => a.localeCompare(b, "tr")
);

// Tüm büyükşehirler
export const BUYUKSEHIRLER: string[] = SEHIRLER.filter((s) => s.buyuksehir)
  .map((s) => s.ad)
  .sort((a, b) => a.localeCompare(b, "tr"));

// Bölgeye göre şehir listesi
export function bolgeyeGoreSehirler(bolge: Bolge): string[] {
  return SEHIRLER.filter((s) => s.bolge === bolge)
    .map((s) => s.ad)
    .sort((a, b) => a.localeCompare(b, "tr"));
}

// Türkçe karakter normalleştirme (arama için)
export function normalize(str: string): string {
  return str
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

// Şehir araması — kullanıcının yazdığıyla eşleşenleri döner
export function sehirAra(query: string, hariç: string[] = []): string[] {
  const q = normalize(query.trim());
  if (!q) return [];

  return SEHIR_ISIMLERI.filter((sehir) => {
    if (hariç.includes(sehir)) return false;
    return normalize(sehir).startsWith(q);
  }).slice(0, 8); // En fazla 8 öneri
}
