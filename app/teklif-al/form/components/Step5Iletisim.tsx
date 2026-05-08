"use client";

import { useId, useState } from "react";
import { Mail, User, Phone, Building2, Briefcase, ChevronDown, Check, AlertCircle } from "lucide-react";
import type { FormState, FormAction } from "../types";
import { isValidEmail, isValidPhone } from "../validation";

type Step5IletisimProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const SEKTORLER = [
  "Perakende / Mağaza Zinciri",
  "Otomotiv",
  "Gıda & İçecek",
  "Finans / Bankacılık",
  "Telekomünikasyon",
  "İnşaat / Gayrimenkul",
  "Sağlık",
  "Eğitim",
  "Turizm / Otel",
  "Eğlence / Etkinlik",
  "Reklam Ajansı",
  "Diğer",
];

export function Step5Iletisim({ state, dispatch }: Step5IletisimProps) {
  const [showOptional, setShowOptional] = useState(
    !!state.iletisim.telefon || !!state.iletisim.sirket || !!state.iletisim.sektor
  );

  const adsoyadValid =
    state.iletisim.adsoyad.trim().length === 0
      ? null
      : state.iletisim.adsoyad.trim().split(/\s+/).length >= 2;

  const emailValid =
    state.iletisim.email.trim().length === 0
      ? null
      : isValidEmail(state.iletisim.email);

  const telefonValid =
    state.iletisim.telefon.trim().length === 0
      ? null
      : isValidPhone(state.iletisim.telefon);

  return (
    <div className="max-w-xl space-y-6">
      {/* EMAIL — Zorunlu, ilk öne */}
      <FieldWrapper
        label="E-posta adresiniz"
        icon={Mail}
        required
        valid={emailValid}
        validMessage="Geçerli e-posta"
        errorMessage="Geçerli bir e-posta adresi girin"
      >
        {({ inputId, describedById }) => (
          <input
            id={inputId}
            type="email"
            value={state.iletisim.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ILETISIM",
                field: "email",
                value: e.target.value,
              })
            }
            placeholder="ahmet@sirket.com"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={emailValid === false || undefined}
            aria-describedby={emailValid != null ? describedById : undefined}
            className="w-full bg-transparent outline-none text-base placeholder:text-[var(--color-text-muted)]"
          />
        )}
      </FieldWrapper>

      {/* AD SOYAD — Zorunlu */}
      <FieldWrapper
        label="Ad ve Soyad"
        icon={User}
        required
        valid={adsoyadValid}
        validMessage="✓"
        errorMessage="Lütfen ad ve soyadınızı girin"
      >
        {({ inputId, describedById }) => (
          <input
            id={inputId}
            type="text"
            value={state.iletisim.adsoyad}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ILETISIM",
                field: "adsoyad",
                value: e.target.value,
              })
            }
            placeholder="Ahmet Yılmaz"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={adsoyadValid === false || undefined}
            aria-describedby={adsoyadValid != null ? describedById : undefined}
            className="w-full bg-transparent outline-none text-base placeholder:text-[var(--color-text-muted)]"
          />
        )}
      </FieldWrapper>

      {/* OPSİYONEL ALANLAR — Collapse */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
          aria-expanded={showOptional}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              showOptional ? "rotate-180" : ""
            }`}
          />
          {showOptional ? "Daha az bilgi" : "Daha fazla bilgi (opsiyonel)"}
        </button>

        {showOptional && (
          <div className="mt-5 space-y-5 animate-fadeIn">
            {/* TELEFON */}
            <FieldWrapper
              label="Telefon"
              icon={Phone}
              valid={telefonValid}
              validMessage="✓"
              errorMessage="Geçerli bir telefon numarası girin"
            >
              {({ inputId, describedById }) => (
                <input
                  id={inputId}
                  type="tel"
                  value={state.iletisim.telefon}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ILETISIM",
                      field: "telefon",
                      value: e.target.value,
                    })
                  }
                  placeholder="0532 123 45 67"
                  autoComplete="tel"
                  aria-invalid={telefonValid === false || undefined}
                  aria-describedby={telefonValid != null ? describedById : undefined}
                  className="w-full bg-transparent outline-none text-base placeholder:text-[var(--color-text-muted)]"
                />
              )}
            </FieldWrapper>

            {/* ŞİRKET */}
            <FieldWrapper label="Şirket" icon={Building2}>
              {({ inputId }) => (
                <input
                  id={inputId}
                  type="text"
                  value={state.iletisim.sirket}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ILETISIM",
                      field: "sirket",
                      value: e.target.value,
                    })
                  }
                  placeholder="Şirketiniz"
                  autoComplete="organization"
                  className="w-full bg-transparent outline-none text-base placeholder:text-[var(--color-text-muted)]"
                />
              )}
            </FieldWrapper>

            {/* SEKTÖR */}
            <FieldWrapper label="Sektör" icon={Briefcase}>
              {({ inputId }) => (
                <select
                  id={inputId}
                  value={state.iletisim.sektor}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ILETISIM",
                      field: "sektor",
                      value: e.target.value,
                    })
                  }
                  className="w-full bg-transparent outline-none text-base text-[var(--color-text-primary)] cursor-pointer appearance-none"
                >
                  <option value="">Sektörünüzü seçin</option>
                  {SEKTORLER.map((sektor) => (
                    <option key={sektor} value={sektor}>
                      {sektor}
                    </option>
                  ))}
                </select>
              )}
            </FieldWrapper>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--color-text-muted)] pt-2">
        * işaretli alanlar zorunludur. Bilgilerinizi yalnızca teklif sürecinin
        yürütülmesi için kullanırız.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FIELD WRAPPER — etiket + ikon + input + validation
// ═══════════════════════════════════════════════════════════

function FieldWrapper({
  label,
  icon: Icon,
  required,
  valid,
  validMessage,
  errorMessage,
  children,
}: {
  label: string;
  icon: typeof Mail;
  required?: boolean;
  valid?: boolean | null;
  validMessage?: string;
  errorMessage?: string;
  children: (ids: { inputId: string; describedById: string }) => React.ReactNode;
}) {
  // Etiketi input'a bağlamak için unique id'ler. WCAG 1.3.1 + 4.1.2.
  const inputId = useId();
  const describedById = useId();
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]"
        >
          <Icon size={14} className="text-[var(--color-text-muted)]" />
          {label}
          {required && (
            <>
              <span className="text-[var(--color-primary-deep)]" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(zorunlu)</span>
            </>
          )}
        </label>
        {valid === true && validMessage && (
          <span
            id={describedById}
            className="text-xs text-green-700 flex items-center gap-1 animate-fadeIn"
            aria-live="polite"
          >
            <Check size={12} strokeWidth={3} />
            {validMessage}
          </span>
        )}
        {valid === false && errorMessage && (
          <span
            id={describedById}
            className="text-xs text-red-600 flex items-center gap-1 animate-fadeIn"
            role="alert"
          >
            <AlertCircle size={12} />
            {errorMessage}
          </span>
        )}
      </div>
      <div
        className={`px-4 py-3 rounded-xl border-2 transition-colors ${
          valid === false
            ? "border-red-200 bg-red-50/30"
            : valid === true
            ? "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5"
            : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] focus-within:border-[var(--color-primary)] focus-within:bg-[var(--color-bg)]"
        }`}
      >
        {children({ inputId, describedById })}
      </div>
    </div>
  );
}
