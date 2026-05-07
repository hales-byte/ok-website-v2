"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { TOTAL_STEPS } from "../types";

type WizardLayoutProps = {
  currentStep: number;
  stepTitle: string;
  stepSubtitle?: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onForward: () => void;
  onSubmit?: () => void;
  onReset: () => void;
  children: React.ReactNode;
};

/**
 * Wizard formunun sayfa şablonu.
 * Üstte progress + adım başlığı, ortada step content, altta navigation.
 * Progress bar'da "Sıfırla" linki var.
 */
export function WizardLayout({
  currentStep,
  stepTitle,
  stepSubtitle,
  canGoBack,
  canGoForward,
  isLastStep,
  isSubmitting,
  onBack,
  onForward,
  onSubmit,
  onReset,
  children,
}: WizardLayoutProps) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  function handleResetClick() {
    const ok = window.confirm(
      "Tüm bilgileriniz silinecek ve baştan başlayacaksınız. Emin misiniz?"
    );
    if (ok) onReset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* PROGRESS BAR — üstte yapışkan */}
      <div className="sticky top-0 z-30 bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                Adım {currentStep} / {TOTAL_STEPS}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">
                • {Math.round(progress)}% tamamlandı
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-red-600 transition-colors"
              title="Formu sıfırla, baştan başla"
            >
              <RotateCcw size={12} />
              <span>Sıfırla</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;

              return (
                <div
                  key={stepNum}
                  className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                    isCompleted
                      ? "bg-[var(--color-primary)]"
                      : isActive
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-border-subtle)]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP CONTENT */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              {stepTitle}
            </h1>
            {stepSubtitle && (
              <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {stepSubtitle}
              </p>
            )}
          </div>

          <div key={currentStep} className="animate-slideInRight">
            {children}
          </div>
        </div>
      </main>

      {/* NAVIGATION — altta yapışkan */}
      <div className="sticky bottom-0 z-30 bg-[var(--color-bg)]/85 backdrop-blur-md border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow py-5">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={!canGoBack || isSubmitting}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Önceki adım"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Geri</span>
            </button>

            <div className="hidden md:flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded font-mono text-[10px]">
                  Enter
                </kbd>
                <span>ile devam et</span>
              </span>
            </div>

            {isLastStep ? (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canGoForward || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Talebi Gönder
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onForward}
                disabled={!canGoForward || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                <span>Devam</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
