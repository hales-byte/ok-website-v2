"use client";

import { Clock, RotateCcw, ArrowRight } from "lucide-react";

type ResumeBannerProps = {
  step: number;
  ageHours: number;
  completedSteps: number;
  totalSteps: number;
  onResume: () => void;
  onReset: () => void;
};

/**
 * Kullanıcı /teklif-al'a dönüp localStorage'da yarım form varsa
 * gösterilen banner. Kullanıcı yönetiminde hissetsin diye
 * default Adım 1'de başlar, banner ile devam etme/sıfırlama tercih sunar.
 */
export function ResumeBanner({
  step,
  ageHours,
  completedSteps,
  totalSteps,
  onResume,
  onReset,
}: ResumeBannerProps) {
  const ageText =
    ageHours < 1
      ? "az önce başladınız"
      : ageHours < 24
      ? `${ageHours} saat önce başladınız`
      : ageHours < 48
      ? "dün başladınız"
      : `${Math.floor(ageHours / 24)} gün önce başladınız`;

  function handleReset() {
    const ok = window.confirm(
      "Tüm bilgileriniz silinecek ve baştan başlayacaksınız. Emin misiniz?"
    );
    if (ok) onReset();
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)]/8 via-[var(--color-primary)]/5 to-[var(--color-primary-hover)]/8 border-b border-[var(--color-primary)]/20 animate-fadeIn">
      {/* Subtle pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)",
          backgroundSize: "8px 8px",
          color: "var(--color-primary)",
        }}
      />

      <div className="container-narrow py-4 relative">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          {/* SOL — Bilgi */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-[var(--color-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                Yarım kalan bir teklif talebiniz var
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] truncate">
                Adım {step}&apos;te kaldınız • {ageText} •{" "}
                <span className="font-medium text-[var(--color-primary)]">
                  {completedSteps}/{totalSteps} dolduruldu
                </span>
              </div>
            </div>
          </div>

          {/* SAĞ — Aksiyon butonları */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)]/50 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)] transition-all"
              title="Tüm bilgileri sil, baştan başla"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>
            <button
              type="button"
              onClick={onResume}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-md shadow-[var(--color-primary)]/20"
              title={`Adım ${step}'ten devam et`}
            >
              <span>Devam Et</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
