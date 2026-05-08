"use client";

import { useEffect } from "react";
import { Briefcase, Users, Sparkles, Check } from "lucide-react";
import type { FormState, FormAction, Segment } from "../types";
import { SEGMENT_LABELS } from "../types";

type Step1SegmentProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const segmentler: Array<{
  key: Segment;
  icon: typeof Briefcase;
  description: string;
  bullets: string[];
}> = [
  {
    key: "marka",
    icon: Briefcase,
    description:
      "Marka yöneticisiyim, kampanyalarım için stratejik medya planlaması arıyorum.",
    bullets: [
      "Raporlanabilir kampanya yönetimi",
      "Sektörel deneyim",
      "Marka prestijini koruyan lokasyonlar",
    ],
  },
  {
    key: "ajans",
    icon: Users,
    description:
      "Reklam ajansındayım, hızlı ve esnek iş ortağı arıyorum.",
    bullets: [
      "30 dakikada teklif",
      "Detaylı lokasyon listesi",
      "Esnek satın alma",
    ],
  },
  {
    key: "ilk",
    icon: Sparkles,
    description:
      "İlk açıkhava kampanyamı planlıyorum, sıfırdan rehberlik istiyorum.",
    bullets: [
      "Brief yazma yardımı",
      "Şeffaf fiyatlandırma",
      "Kolay anlaşılır süreç",
    ],
  },
];

export function Step1Segment({
  state,
  dispatch,
}: Step1SegmentProps) {
  // Klavye desteği: 1, 2, 3 tuşları ile direkt seç
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Input'larda yazılırken çalışmasın
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "1") {
        dispatch({ type: "SET_SEGMENT", segment: "marka" });
      } else if (e.key === "2") {
        dispatch({ type: "SET_SEGMENT", segment: "ajans" });
      } else if (e.key === "3") {
        dispatch({ type: "SET_SEGMENT", segment: "ilk" });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dispatch]);

  function handleSelect(segment: Segment) {
    // Sadece seçim yap; ileri geçişi kullanıcı "Devam" butonuyla yapsın.
    // WCAG 3.2.2 (On Input) — beklenmedik bağlam değişikliği yok.
    dispatch({ type: "SET_SEGMENT", segment });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      {segmentler.map((seg, i) => {
        const Icon = seg.icon;
        const isSelected = state.segment === seg.key;

        return (
          <button
            key={seg.key}
            type="button"
            onClick={() => handleSelect(seg.key)}
            className={`group relative text-left p-7 md:p-8 rounded-2xl border-2 transition-all duration-300 ${
              isSelected
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-xl shadow-[var(--color-primary)]/15"
                : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:-translate-y-1"
            }`}
            aria-pressed={isSelected}
          >
            {/* Seçildi ikonu — sağ üst */}
            {isSelected && (
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center animate-fadeIn">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            )}

            {/* Klavye ipucu — sol üst */}
            <div className="absolute top-4 left-4 w-7 h-7 rounded-md bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center text-xs font-mono text-[var(--color-text-muted)]">
              {i + 1}
            </div>

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-8 transition-colors ${
                isSelected
                  ? "bg-[var(--color-primary)]/15"
                  : "bg-[var(--color-primary)]/8 group-hover:bg-[var(--color-primary)]/15"
              }`}
            >
              <Icon size={32} className="text-[var(--color-primary)]" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 leading-tight">
              {SEGMENT_LABELS[seg.key]}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
              {seg.description}
            </p>

            {/* Bullets */}
            <ul className="space-y-2">
              {seg.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                >
                  <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
                    <Check
                      size={9}
                      className="text-[var(--color-primary)]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
