/**
 * Tüm site genelinde kullanılan OOH format meta bilgileri.
 * Yeni format eklemek için: bu dosyaya yeni FormatMeta objesi ekle,
 * görselini public/images/formats/ klasörüne koy, hepsi otomatik güncellenir.
 *
 * NOT: priceBand alanları indikatiftir, sektör ortalama bantlarına göre
 * yerleştirilmiştir. **Production öncesi güncel ratecard ile gözden geçir.**
 * Müşteriye somut fiyat değil "mertebe" iletmek için kullanılır.
 */

import {
  Square,
  Smartphone,
  Monitor,
  Tv,
  Maximize2,
  Flag,
  Plane,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface FormatMeta {
  /** URL slug ve database format_kategori değeri */
  key: string;
  /** Kullanıcıya gösterilen ad */
  name: string;
  /** Kart desc / tagline kısa */
  shortDesc: string;
  /** Detay sayfa tagline */
  tagline: string;
  /** Detay sayfa açıklaması (uzun) */
  description: string;
  /** Avantajlar listesi */
  benefits: string[];
  /** Tipik kullanım alanı */
  useCases: string;
  /** Lucide ikon */
  icon: LucideIcon;
  /** public/images/formats/ altında dosya base name (örn. "billboard" → billboard.webp + billboard.jpg) */
  image: string | null;
  /**
   * İndikatif fiyat bandı (TL). Müşteriye somut fiyat değil mertebe vermek için.
   * **TODO: Production öncesi güncel ratecard ile değerleri kontrol et.**
   */
  priceBand: {
    /** Düşük uç (TL) */
    from: number;
    /** Üst uç (TL) */
    to: number;
    /** "tek yüz / ay" gibi birim açıklaması */
    unit: string;
    /** "İstanbul tier-1, sezon ortası" gibi bağlam notu */
    context: string;
  };
}

export const FORMATLAR: FormatMeta[] = [
  {
    key: "billboard",
    name: "Billboard",
    shortDesc: "Yüksek görünürlük, geniş etki alanı",
    tagline: "Yüksek görünürlük, geniş etki alanı",
    description:
      "Ana arterler, otoyol kavşakları ve şehir girişlerinde konumlandırılan sabit, yüksek görünürlüklü reklam yüzü. Hızlı geçen trafikte bile mesajınızı net bir şekilde iletir.",
    benefits: [
      "Geniş hedef kitleye ulaşım",
      "24 saat sürekli görünürlük",
      "Güçlü marka hatırlanırlığı",
      "Şehirlerarası ve şehiriçi kapsama",
    ],
    useCases: "Marka bilinirliği, ürün lansmanı, sezonluk kampanyalar",
    icon: Square,
    image: "billboard",
    priceBand: {
      from: 8000,
      to: 18000,
      unit: "tek yüz / ay",
      context: "İstanbul ortalama, sezon ortası — premium konumlar üst banda yakın",
    },
  },
  {
    key: "clp",
    name: "CLP / Raket",
    shortDesc: "Şehir merkezleri ve duraklarda",
    tagline: "Şehir merkezleri ve duraklarda yaya trafiğine yönelik",
    description:
      "Dikey, aydınlatmalı reklam paneli. Genellikle otobüs duraklarında ve şehir merkezlerindeki yoğun yaya bölgelerinde bulunur. Bekleyen ve yürüyen kitleye doğrudan ulaşır.",
    benefits: [
      "Yüksek frekans, tekrarlı temas",
      "Yaya seviyesinde okunabilirlik",
      "Gece/gündüz aydınlatmalı",
      "Premium şehir merkezi konumları",
    ],
    useCases:
      "Lokal işletmeler, perakende, hizmet sektörü, kentsel kampanyalar",
    icon: Smartphone,
    image: "clp",
    priceBand: {
      from: 3000,
      to: 8000,
      unit: "tek yüz / ay",
      context: "Şehir merkezi konumları, gece aydınlatmalı dahil",
    },
  },
  {
    key: "megalight",
    name: "Megalight",
    shortDesc: "Aydınlatmalı, premium konumlar",
    tagline: "Premium konumlarda büyük format aydınlatmalı panel",
    description:
      "Genellikle 8×4m veya 6×3m boyutlarında, ana cadde ve kavşaklarda yer alan aydınlatmalı reklam paneli. Megalight'lar prestij ve görünürlüğü birleştirir.",
    benefits: [
      "Aydınlatma ile gece de aktif",
      "Premium kavşak konumları",
      "Geniş ve net görsel alan",
      "Prestijli marka algısı",
    ],
    useCases: "Premium markalar, lüks ürünler, kurumsal kampanyalar",
    icon: Monitor,
    image: "megalight",
    priceBand: {
      from: 12000,
      to: 25000,
      unit: "tek yüz / ay",
      context: "Ana arter ve premium kavşak konumları, aydınlatma dahil",
    },
  },
  {
    key: "led",
    name: "LED & Dijital",
    shortDesc: "Dinamik içerik, gerçek zamanlı",
    tagline: "Dinamik içerik, gerçek zamanlı yayın",
    description:
      "Dijital ekran teknolojisi ile hareketli ve değişen içerik gösterimi. Tek konumda birden fazla reklam dönüşümlü yayınlanır, kreatifler anlık güncellenebilir.",
    benefits: [
      "Hareketli görsel ve video desteği",
      "Hızlı kreatif değişikliği",
      "Saat bazlı planlama (day-parting)",
      "A/B test ve canlı kampanya optimizasyonu",
    ],
    useCases: "Promosyonlar, etkinlik duyuruları, gerçek zamanlı kampanyalar",
    icon: Tv,
    image: "led",
    priceBand: {
      from: 10000,
      to: 25000,
      unit: "tek konum / hafta",
      context: "Dijital ekran, dönüşümlü yayında 4-6 marka ile paylaşım",
    },
  },
  {
    key: "giantboard",
    name: "Giantboard",
    shortDesc: "Anıtsal boyut, yüksek etki",
    tagline: "Anıtsal boyut, maksimum etki",
    description:
      "Standart billboard'lardan çok daha büyük, anıtsal ölçekte reklam yüzü. Bina cepheleri veya stratejik açık alanlarda yer alır. Uzak mesafelerden bile görünür.",
    benefits: [
      "Maksimum görsel etki",
      "Anıtsal marka anlatımı",
      "Uzun mesafeden görünürlük",
      "Marka prestijinde güçlü artış",
    ],
    useCases: "Büyük marka lansmanları, film vizyon, prestij kampanyaları",
    icon: Maximize2,
    image: "giantboard",
    priceBand: {
      from: 25000,
      to: 60000,
      unit: "tek yüz / ay",
      context: "Anıtsal ölçek, bina cephesi veya stratejik açık alan",
    },
  },
  {
    key: "pole-banner",
    name: "Pole Banner",
    shortDesc: "Cadde ve bulvar boyunca",
    tagline: "Cadde ve bulvar boyunca tekrarlı görünürlük",
    description:
      "Cadde ve bulvarlardaki aydınlatma direklerine asılan dikey banner reklamlar. Genellikle bir kampanya kapsamında onlarca direkte tekrar eden mesajla uygulanır.",
    benefits: [
      "Tekrar etkisiyle güçlü hatırlatma",
      "Cadde boyunca süreklilik",
      "Ekonomik yüksek görünürlük",
      "Kampanya teması ve atmosfer",
    ],
    useCases: "Festival ve etkinlikler, kentsel kampanyalar, perakende temaları",
    icon: Flag,
    image: "pole-banner",
    priceBand: {
      from: 800,
      to: 2000,
      unit: "tek banner / ay",
      context: "Genelde 20-50 banner'lık paket halinde alınır, cadde boyunca",
    },
  },
  {
    key: "totem",
    name: "Totem",
    shortDesc: "Merkezi konumlarda dikey, yüksek görünürlük",
    tagline: "Dikey kule formatında konumsal etki",
    description:
      "Dikey kule formatında reklam yapısı. Genellikle organize sanayi bölgeleri, alışveriş merkezleri ve şehir giriş noktalarında konumlandırılır. Uzaktan görünür anıtsal yapısıyla bölgesel marka anlatımı için ideal.",
    benefits: [
      "Dikey format ile uzun mesafeden okunabilirlik",
      "Stratejik giriş ve düğüm noktaları",
      "OSB ve AVM çevresinde yoğun trafik",
      "Bölgesel marka konumlandırma",
    ],
    useCases: "OSB tanıtımları, AVM çevre kampanyaları, bölgesel markalar",
    icon: Layers,
    image: "totem",
    priceBand: {
      from: 6000,
      to: 15000,
      unit: "tek yüz / ay",
      context: "OSB ve AVM çevresi, bölgesel görünürlük",
    },
  },
  {
    key: "havalimani",
    name: "Havalimanı LED",
    shortDesc: "Premium kitleye doğrudan erişim",
    tagline: "Premium kitleye doğrudan erişim",
    description:
      "Havalimanlarındaki check-in, gümrük ve gate noktalarında yer alan dijital ekranlar. Bekleyen yolcular, yüksek dikkat süresi ve premium demografiyle birleşir.",
    benefits: [
      "Yüksek gelirli, premium kitle",
      "Uluslararası seyahat eden tüketici",
      "Uzun bekleme sürelerinde maruziyet",
      "Prestijli, kurumsal konum",
    ],
    useCases: "Premium markalar, lüks tüketim, finans, B2B, otomotiv",
    icon: Plane,
    image: null, // Görsel henüz yok, kart fallback design kullanır
    priceBand: {
      from: 30000,
      to: 80000,
      unit: "tek konum / hafta",
      context: "Check-in / gate noktaları, premium demografi",
    },
  },
];

/**
 * Yardımcı: key ile format meta'yı bul
 */
export function getFormatByKey(key: string): FormatMeta | undefined {
  return FORMATLAR.find((f) => f.key === key);
}

/**
 * Yardımcı: format URL'inde kullanılan slug
 */
export function getFormatSlug(key: string): string {
  return key; // Şu an aynı, gelecekte değişebilir
}

/**
 * UI'da gösterilecek format etiketi.
 * `format_kategori = 'diger'` gibi FORMATLAR listesinde olmayan kayıtlar için
 * de okunabilir bir Türkçe karşılık döndürür.
 */
export function getFormatLabel(key: string): string {
  if (key === "diger") return "Diğer";
  const meta = getFormatByKey(key);
  if (meta) return meta.name;
  // Bilinmeyen key'i temiz basmak için ilk harfi büyüt
  return key.charAt(0).toLocaleUpperCase("tr") + key.slice(1).toLocaleLowerCase("tr");
}

/**
 * Fiyat bandını "8K - 18K TL" gibi okunabilir biçime çevirir.
 * Bin altı için tam değer ("800 TL"), bin üstü için "K" kısaltması.
 */
export function formatPriceBand(band: FormatMeta["priceBand"]): string {
  const fmt = (n: number): string => {
    if (n < 1000) return `${n} TL`;
    if (n % 1000 === 0) return `${n / 1000}K TL`;
    return `${(n / 1000).toFixed(1)}K TL`;
  };
  return `${fmt(band.from)} – ${fmt(band.to)}`;
}
