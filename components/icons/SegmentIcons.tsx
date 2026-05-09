/**
 * Ana sayfa "3 Kart Segment" bölümü için özgün SVG ikonlar.
 *
 * Üçü ortak dilde: dikdörtgen geometrik iskelet + tek organik jest.
 * - MarkalarIcon: pin damlası içinde hedef halkaları (kurumsal + ROI)
 * - AjanslarIcon: brief belgesi + sağa hızlı ok (30 dakika çevrimi)
 * - IlkKampanyamIcon: küçük billboard çerçevesi + filizlenen sürgün (sıcaklık)
 *
 * Lucide drop-in: `size` ve `className` prop'larını destekler, `currentColor`
 * kullanır → parent'taki `text-[var(--color-primary)]` ile renklenir.
 */

type IconProps = {
  size?: number;
  className?: string;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Markalar (Pelin) — Hedef Pin
 * Klasik konum pini, üst yarısında hedef halkaları. "Doğru sokakta" vaadinin
 * tek-glif karşılığı: pin (lokasyon) + hedef (stratejik konumlama).
 */
export function MarkalarIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...baseProps}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx={12} cy={9} r={3.5} />
      <circle cx={12} cy={9} r={1.2} />
    </svg>
  );
}

/**
 * Reklam Ajansları (Mert) — Brief → Teklif Oku
 * Sol üstte köşeli brief belgesi (sayfa katlanma detayıyla), sağ alta
 * uzanan hızlı ok. "30 dakikada teklif" sloganının görsel çevirisi.
 */
export function AjanslarIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...baseProps}>
      <path d="M4 3h8l4 4v5" />
      <path d="M4 3v14h6" />
      <path d="M12 3v4h4" />
      <path d="M13 19h7" />
      <path d="M17 16l3 3-3 3" />
    </svg>
  );
}

/**
 * İlk Açıkhava Kampanyam (Burak) — Filizli Billboard
 * Küçük billboard çerçevesi içinde iki yapraklı sürgün, altında zemin
 * çizgisi. "İlk afişinizi birlikte sokağa çıkaralım" sıcaklığı +
 * büyüme metaforu — Burak'ın "yalnız değilim" ihtiyacına dokunuyor.
 */
export function IlkKampanyamIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...baseProps}>
      <rect x={4} y={4} width={16} height={11} rx={1.5} />
      <path d="M12 15v-3" />
      <path d="M12 12c0-1.5-1-3-2.5-3.2" />
      <path d="M12 12c0-1.5 1-3 2.5-3.2" />
      <path d="M8 19h8" />
    </svg>
  );
}
