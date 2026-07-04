/**
 * Bölüm başlığı bileşeni — eyebrow + serif başlık + muted alt yazı.
 * Kimlik: Seçenek B. Henüz sayfalara yayılmadı; hazır bileşen (G1).
 *
 * Renk: eyebrow `--color-primary` token'ını kullanır — açık gövdede AA-safe
 * #0369A1, `.band-dark` içinde otomatik parlak cyan (#00E4FF).
 * Başlık serif (font-display, Cormorant); alt yazı gövde sans + muted.
 */

import type { ElementType, ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: TitleTag = "h2",
  className = "",
}: {
  /** Küçük cyan üst etiket (opsiyonel) */
  eyebrow?: ReactNode;
  /** Serif başlık */
  title: ReactNode;
  /** Muted alt yazı (opsiyonel) */
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Başlık etiketi (varsayılan h2) */
  as?: ElementType;
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      ) : null}

      <TitleTag className="text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
        {title}
      </TitleTag>

      {subtitle ? (
        <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
