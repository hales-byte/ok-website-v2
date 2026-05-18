"use client";

import {
  Check,
  Wallet,
  Calendar,
  Zap,
  CalendarDays,
  CalendarClock,
  CalendarRange,
  HelpCircle,
} from "lucide-react";
import type {
  FormState,
  FormAction,
  ButceSecimi,
  ZamanSecimi,
} from "../types";
import { BUTCE_LABELS, ZAMAN_LABELS, BUTCE_BANTLARI_SEGMENT } from "../types";

type Step4ButceZamanProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

// Her bütçe key'i için ipucu metni. Segment-bağımsız sabit liste; render
// sırasında BUTCE_BANTLARI_SEGMENT ile filtrelenip sadece o segmentin
// görmesi gereken bantlar gösterilir.
const BUTCE_HINTS: Record<ButceSecimi, string> = {
  ilk_5_15k: "Tek lokasyon / yerel görünürlük",
  ilk_15_40k: "İlk kampanya, kapsamlı test",
  ilk_40_100k: "Çoklu lokasyon, bölgesel",
  "100k_alti": "Test / lokal kampanya",
  "100_250k": "Bölgesel kampanya",
  "250_500k": "Çok şehirli orta ölçek",
  "500k_1m": "Geniş kapsamlı",
  "1m_uzeri": "Premium / ulusal",
  belirsiz: "Birlikte değerlendirelim",
};

// state.segment'e göre Step4'te gösterilecek bütçe bantları. Segment
// seçilmemişse (edge case — Step1 tamamlanmadan deep-link ile gelinmişse)
// orta-ölçek bantları default'tur.
function getButceSecenekleri(state: FormState): Array<{
  key: ButceSecimi;
  ikon: typeof Wallet;
  hint: string;
}> {
  const segment = state.segment ?? "marka";
  return BUTCE_BANTLARI_SEGMENT[segment].map((key) => ({
    key,
    ikon: key === "belirsiz" ? HelpCircle : Wallet,
    hint: BUTCE_HINTS[key],
  }));
}

const zamanSecenekleri: Array<{
  key: ZamanSecimi;
  ikon: typeof Zap;
  hint?: string;
}> = [
  { key: "acil", ikon: Zap, hint: "Hızlı planlama gerekli" },
  { key: "bu_ay", ikon: Calendar },
  { key: "1_3_ay", ikon: CalendarDays },
  { key: "3_6_ay", ikon: CalendarRange, hint: "Stratejik planlama" },
  { key: "belirsiz", ikon: HelpCircle, hint: "Henüz net değil" },
];

export function Step4ButceZaman({ state, dispatch }: Step4ButceZamanProps) {
  // Segment-koşullu bütçe seçenekleri. İlk-kez küçük işletme için
  // 5K-100K bantları; marka/ajans için 100K-1M+ bantları.
  const butceSecenekleri = getButceSecenekleri(state);

  return (
    <div className="space-y-12">
      {/* BÜTÇE */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[var(--color-primary)]" />
            <h3 className="text-lg font-semibold">Bütçe aralığı</h3>
          </div>
          {state.butce && (
            <div className="text-xs font-mono text-[var(--color-primary)] animate-fadeIn">
              ✓ Seçildi
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {butceSecenekleri.map((opt) => {
            const Icon = opt.ikon;
            const isSelected = state.butce === opt.key;

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => dispatch({ type: "SET_BUTCE", butce: opt.key })}
                className={`group relative text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/10"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-md"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center animate-fadeIn">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}

                <Icon
                  size={20}
                  className={`mb-3 ${
                    isSelected
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                />

                <div className="font-semibold text-sm mb-1 leading-tight">
                  {BUTCE_LABELS[opt.key]}
                </div>
                {opt.hint && (
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {opt.hint}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ZAMAN */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <CalendarClock
              size={18}
              className="text-[var(--color-primary)]"
            />
            <h3 className="text-lg font-semibold">Kampanya ne zaman?</h3>
          </div>
          {state.zaman && (
            <div className="text-xs font-mono text-[var(--color-primary)] animate-fadeIn">
              ✓ Seçildi
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {zamanSecenekleri.map((opt) => {
            const Icon = opt.ikon;
            const isSelected = state.zaman === opt.key;

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => dispatch({ type: "SET_ZAMAN", zaman: opt.key })}
                className={`group relative text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/10"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-md"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center animate-fadeIn">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}

                <Icon
                  size={20}
                  className={`mb-3 ${
                    isSelected
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                />

                <div className="font-semibold text-sm mb-1 leading-tight">
                  {ZAMAN_LABELS[opt.key]}
                </div>
                {opt.hint && (
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {opt.hint}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
