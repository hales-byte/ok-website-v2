"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import type { FormState, FormAction } from "../types";
import { FORMATLAR } from "@/lib/formats";

type Step3FormatlarProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

export function Step3Formatlar({ state, dispatch }: Step3FormatlarProps) {
  return (
    <div className="space-y-8">
      {/* FORMAT KARTLARI */}
      <div className={state.oneriIstiyor ? "opacity-40 pointer-events-none" : ""}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
            Reklam Üniteleri
          </div>
          {state.formatlar.length > 0 && (
            <div className="text-xs font-mono text-[var(--color-primary)]">
              {state.formatlar.length} seçildi
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FORMATLAR.map((format) => {
            const Icon = format.icon;
            const isSelected = state.formatlar.includes(format.key);

            return (
              <button
                key={format.key}
                type="button"
                onClick={() =>
                  dispatch({ type: "TOGGLE_FORMAT", format: format.key })
                }
                disabled={state.oneriIstiyor}
                className={`group relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/15"
                    : "border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:-translate-y-1"
                }`}
                aria-pressed={isSelected}
              >
                {/* GÖRSEL */}
                <div className="relative aspect-[4/3] bg-[var(--color-surface)]">
                  {format.image ? (
                    <Image
                      src={`/images/formats/${format.image}.jpg`}
                      alt={format.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-surface)] flex items-center justify-center">
                      <Icon size={32} className="text-[var(--color-primary)]" />
                    </div>
                  )}

                  {/* Seçildi overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[var(--color-primary)]/15 flex items-start justify-end p-3 animate-fadeIn">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
                        <Check size={16} className="text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                {/* İSİM + TAGLINE */}
                <div
                  className={`p-4 transition-colors ${
                    isSelected
                      ? "bg-[var(--color-primary)]/5"
                      : "bg-[var(--color-bg)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      size={14}
                      className="text-[var(--color-primary)] shrink-0"
                    />
                    <h3 className="font-semibold text-sm leading-tight">
                      {format.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-snug line-clamp-2">
                    {format.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* "BANA ÖNER" — Alternatif yol */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          veya
        </div>
        <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_ONERI" })}
        className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4 text-left ${
          state.oneriIstiyor
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-xl shadow-[var(--color-primary)]/15"
            : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-lg"
        }`}
        aria-pressed={state.oneriIstiyor}
      >
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
          <Sparkles size={24} className="text-[var(--color-primary)]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">Bana öner</h3>
            {state.oneriIstiyor && (
              <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center animate-fadeIn">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Format seçimi konusunda emin değilseniz, bütçeniz ve hedefinize
            göre size en uygun ünite kombinasyonunu biz öneririz.
          </p>
        </div>
      </button>

      {/* İPUCU */}
      {state.formatlar.length === 0 && !state.oneriIstiyor && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
          <Sparkles
            size={18}
            className="text-[var(--color-primary)] shrink-0 mt-0.5"
          />
          <div className="text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-[var(--color-text-primary)]">
              Birden fazla seçebilirsiniz.
            </span>{" "}
            Genellikle marka kampanyalarında 2-3 farklı ünite kombinasyonu
            kullanılır. Karar veremiyorsanız &ldquo;Bana öner&rdquo; seçin.
          </div>
        </div>
      )}
    </div>
  );
}
