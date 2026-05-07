"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin, Sparkles, Check } from "lucide-react";
import type { FormState, FormAction } from "../types";
import {
  sehirAra,
  BUYUKSEHIRLER,
  bolgeyeGoreSehirler,
  SEHIR_ISIMLERI,
} from "@/lib/turkiye-sehirler";

type Step2SehirlerProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

export function Step2Sehirler({ state, dispatch }: Step2SehirlerProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = query ? sehirAra(query, state.sehirler) : [];

  // Click outside → öneriyi kapat
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function addSehir(sehir: string) {
    if (state.sehirler.includes(sehir)) return;
    dispatch({ type: "TOGGLE_SEHIR", sehir });
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  function removeSehir(sehir: string) {
    dispatch({ type: "TOGGLE_SEHIR", sehir });
  }

  function handleInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      e.stopPropagation(); // Wizard'ın Enter handler'ını blokla
      addSehir(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (
      e.key === "Backspace" &&
      query === "" &&
      state.sehirler.length > 0
    ) {
      // Boş input + Backspace → son şehri kaldır
      removeSehir(state.sehirler[state.sehirler.length - 1]);
    }
  }

  const tumTurkiyeSecili =
    state.sehirler.length === SEHIR_ISIMLERI.length;
  const tumBuyuksehirlerSecili =
    BUYUKSEHIRLER.every((b) => state.sehirler.includes(b)) &&
    state.sehirler.length === BUYUKSEHIRLER.length;

  return (
    <div className="max-w-3xl space-y-8">
      {/* SEARCH INPUT */}
      <div ref={containerRef} className="relative">
        <div
          className={`relative flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-colors ${
            showSuggestions
              ? "border-[var(--color-primary)] bg-[var(--color-bg)]"
              : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
          }`}
        >
          <Search
            size={20}
            className="text-[var(--color-text-muted)] shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setActiveIndex(0);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleInputKey}
            placeholder="Şehir ara — örn. İstanbul, Ankara, İzmir..."
            className="flex-1 bg-transparent outline-none text-base placeholder:text-[var(--color-text-muted)]"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              aria-label="Aramayı temizle"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* SUGGESTIONS DROPDOWN */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-xl shadow-2xl overflow-hidden z-20 animate-fadeIn">
            {suggestions.map((sehir, i) => (
              <button
                key={sehir}
                type="button"
                onClick={() => addSehir(sehir)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
                  i === activeIndex
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "hover:bg-[var(--color-surface)]"
                }`}
              >
                <MapPin size={16} className="shrink-0" />
                <span className="text-sm">{sehir}</span>
              </button>
            ))}
          </div>
        )}

        {/* "Hiç bulunamadı" durumu */}
        {showSuggestions && query && suggestions.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-xl shadow-lg overflow-hidden z-20 animate-fadeIn">
            <div className="px-5 py-4 text-sm text-[var(--color-text-muted)]">
              &quot;{query}&quot; ile eşleşen şehir bulunamadı
            </div>
          </div>
        )}
      </div>

      {/* HIZLI SEÇİM */}
      <div>
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Hızlı seçim
        </div>
        <div className="flex flex-wrap gap-2">
          <ShortcutButton
            label="Tüm Türkiye"
            active={tumTurkiyeSecili}
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: tumTurkiyeSecili ? [] : SEHIR_ISIMLERI,
              })
            }
          />
          <ShortcutButton
            label="Büyükşehirler"
            active={tumBuyuksehirlerSecili}
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: tumBuyuksehirlerSecili ? [] : BUYUKSEHIRLER,
              })
            }
          />
          <ShortcutButton
            label="Marmara"
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: bolgeyeGoreSehirler("Marmara"),
              })
            }
          />
          <ShortcutButton
            label="Ege"
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: bolgeyeGoreSehirler("Ege"),
              })
            }
          />
          <ShortcutButton
            label="Akdeniz"
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: bolgeyeGoreSehirler("Akdeniz"),
              })
            }
          />
          <ShortcutButton
            label="İç Anadolu"
            onClick={() =>
              dispatch({
                type: "SET_SEHIRLER",
                sehirler: bolgeyeGoreSehirler("İç Anadolu"),
              })
            }
          />
          {state.sehirler.length > 0 && (
            <ShortcutButton
              label="Sıfırla"
              variant="danger"
              onClick={() => dispatch({ type: "CLEAR_SEHIRLER" })}
            />
          )}
        </div>
      </div>

      {/* SEÇİLİ ŞEHİRLER */}
      {state.sehirler.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              Seçili şehirler
            </div>
            <div className="text-xs font-mono text-[var(--color-primary)]">
              {state.sehirler.length} şehir
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.sehirler.map((sehir) => (
              <Chip
                key={sehir}
                label={sehir}
                onRemove={() => removeSehir(sehir)}
              />
            ))}
          </div>
        </div>
      )}

      {/* BOŞ DURUM ipucu */}
      {state.sehirler.length === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
          <Sparkles
            size={18}
            className="text-[var(--color-primary)] shrink-0 mt-0.5"
          />
          <div className="text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-[var(--color-text-primary)]">
              İpucu:
            </span>{" "}
            Birden fazla şehir seçebilirsiniz. Hızlı seçim ile tüm bir bölgeyi
            tek tıklamayla ekleyebilirsiniz. Henüz emin değilseniz &ldquo;Tüm
            Türkiye&rdquo; ile başlayıp daha sonra daraltabiliriz.
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ALT BİLEŞENLER
// ═══════════════════════════════════════════════════════════

function ShortcutButton({
  label,
  active,
  variant = "default",
  onClick,
}: {
  label: string;
  active?: boolean;
  variant?: "default" | "danger";
  onClick: () => void;
}) {
  if (variant === "danger") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="px-4 py-2 rounded-full text-xs font-medium border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
        active
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/20"
          : "bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5"
      }`}
    >
      {active && <Check size={12} strokeWidth={3} />}
      {label}
    </button>
  );
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm text-[var(--color-primary)] animate-fadeIn">
      <span className="font-medium">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="w-5 h-5 rounded-full bg-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/30 flex items-center justify-center transition-colors"
        aria-label={`${label} şehrini kaldır`}
      >
        <X size={12} strokeWidth={3} />
      </button>
    </div>
  );
}
