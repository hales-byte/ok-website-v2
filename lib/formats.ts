/**
 * Tüm site genelinde kullanılan ANA MECRA meta bilgileri.
 * Sıra = sitedeki gösterim sırası (Hakan kararı, 2026-07-12):
 * CLP → Billboard → Pole Banner → Megalight → LED & Dijital → Giantboard.
 * Ana liste dışındaki tanıtılan mecralar: src/data/content/diger-mecralar.ts
 * (Havalimanı LED ayrı mecra değildir; LED & Dijital'in alt bölümü olarak
 * hizmetler sayfasında anlatılır — HAVALIMANI_LED export'u oradan kullanılır.)

 * FİYAT KARARI (Hakan, 2026-07-06): Sitede fiyat GÖSTERİLMEZ — "15 dakikada
 * teklif" hattı esastır. Bu dosyaya fiyat alanı ekleme.
 */

import {
  RectangleHorizontal,
  Smartphone,
  Monitor,
  Tv,
  Maximize2,
  Flag,
  Plane,
  type LucideIcon,
} from "lucide-react";

export interface FormatMeta {
  /** URL slug ve teklif formu mecra key değeri */
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
}

export const ANA_MECRALAR: FormatMeta[] = [
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
  },
  {
    key: "billboard",
    name: "Billboard",
    shortDesc: "Yüksek görünürlük, geniş etki alanı",
    tagline: "Otoyolda ve şehir girişinde herkesin gördüğü reklam",
    description:
      "Ana arterler, otoyol kavşakları ve şehir girişlerinde konumlandırılan sabit, yüksek görünürlüklü reklam yüzü. Hızlı geçen trafikte bile mesajınızı net bir şekilde iletir.",
    benefits: [
      "Geniş hedef kitleye ulaşım",
      "24 saat sürekli görünürlük",
      "Güçlü marka hatırlanırlığı",
      "Şehirlerarası ve şehiriçi kapsama",
    ],
    useCases: "Marka bilinirliği, ürün lansmanı, sezonluk kampanyalar",
    icon: RectangleHorizontal,
    image: "billboard",
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
  },
  {
    key: "megalight",
    name: "Megalight",
    shortDesc: "Aydınlatmalı, premium konumlar",
    tagline: "Ana cadde ve kavşakların büyük formatlı, gece de aktif paneli",
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
  },
  {
    key: "giantboard",
    name: "Giantboard",
    shortDesc: "Anıtsal boyut, yüksek etki",
    tagline: "Bina cephesinde, kilometrelerce uzaktan görünür",
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
  },
];

/**
 * Havalimanı LED — ayrı bir mecra türü değil; LED & Dijital ailesinin
 * premium alt bölümü olarak hizmetler sayfasında anlatılır.
 */
export const HAVALIMANI_LED: FormatMeta = {
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
  image: "havalimani",
};

/**
 * Yardımcı: key ile ana mecra meta'sını bul.
 * (Teklif formu prefill doğrulaması da bunu kullanır — ana listede olmayan
 * key'ler prefill edilmez, form 6 ana mecra + "öneri istiyorum" ile ilerler.)
 */
export function getFormatByKey(key: string): FormatMeta | undefined {
  return ANA_MECRALAR.find((f) => f.key === key);
}

/**
 * Yardımcı: mecra URL'inde kullanılan slug
 */
export function getFormatSlug(key: string): string {
  return key; // Şu an aynı, gelecekte değişebilir
}

/** Eski linklerden gelebilecek, ana listede olmayan key'lerin okunabilir adları */
const LEGACY_KEY_LABELS: Record<string, string> = {
  havalimani: "Havalimanı LED",
  totem: "Totem",
};

/**
 * UI'da gösterilecek mecra etiketi.
 * `format_kategori = 'diger'` gibi ANA_MECRALAR listesinde olmayan kayıtlar
 * için de okunabilir bir Türkçe karşılık döndürür.
 */
export function getFormatLabel(key: string): string {
  if (key === "diger") return "Diğer";
  const meta = getFormatByKey(key);
  if (meta) return meta.name;
  if (LEGACY_KEY_LABELS[key]) return LEGACY_KEY_LABELS[key];
  // Bilinmeyen key'i temiz basmak için ilk harfi büyüt
  return key.charAt(0).toLocaleUpperCase("tr") + key.slice(1).toLocaleLowerCase("tr");
}
