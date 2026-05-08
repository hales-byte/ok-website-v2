"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit3,
  MapPin,
  Layers,
  Wallet,
  Calendar,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";
import type { FormState, FormAction } from "../types";
import {
  SEGMENT_LABELS,
  BUTCE_LABELS,
  ZAMAN_LABELS,
} from "../types";
import { FORMATLAR } from "@/lib/formats";

type Step6OnayProps = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

export function Step6Onay({ state, dispatch }: Step6OnayProps) {
  const [showFullKvkk, setShowFullKvkk] = useState(false);

  const formatNames =
    state.formatlar.length > 0
      ? state.formatlar
          .map((key) => FORMATLAR.find((f) => f.key === key)?.name || key)
          .join(", ")
      : state.oneriIstiyor
      ? "Bana öner"
      : "—";

  return (
    <div className="max-w-2xl space-y-8">
      {/* TALEP ÖZETİ */}
      <div className="rounded-2xl border-2 border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 overflow-hidden">
        <div className="px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              Talep Özeti
            </h3>
            <span className="text-xs text-[var(--color-text-muted)]">
              Hatalı bir şey varsa &ldquo;Geri&rdquo; ile düzenleyebilirsiniz
            </span>
          </div>
        </div>

        <div className="divide-y divide-[var(--color-border-subtle)]">
          <SummaryRow
            icon={User}
            label="Kitle"
            value={
              state.segment ? SEGMENT_LABELS[state.segment] : "—"
            }
            stepNumber={1}
            dispatch={dispatch}
          />
          <SummaryRow
            icon={MapPin}
            label="Şehirler"
            value={
              state.sehirler.length > 0
                ? state.sehirler.length > 5
                  ? `${state.sehirler.slice(0, 5).join(", ")} +${
                      state.sehirler.length - 5
                    } şehir daha`
                  : state.sehirler.join(", ")
                : "—"
            }
            stepNumber={2}
            dispatch={dispatch}
          />
          <SummaryRow
            icon={Layers}
            label="Üniteler"
            value={formatNames}
            stepNumber={3}
            dispatch={dispatch}
          />
          <SummaryRow
            icon={Wallet}
            label="Bütçe"
            value={state.butce ? BUTCE_LABELS[state.butce] : "—"}
            stepNumber={4}
            dispatch={dispatch}
          />
          <SummaryRow
            icon={Calendar}
            label="Zaman"
            value={state.zaman ? ZAMAN_LABELS[state.zaman] : "—"}
            stepNumber={4}
            dispatch={dispatch}
          />
          <SummaryRow
            icon={Mail}
            label="İletişim"
            value={
              state.iletisim.adsoyad
                ? `${state.iletisim.adsoyad} • ${state.iletisim.email}`
                : state.iletisim.email
            }
            stepNumber={5}
            dispatch={dispatch}
          />
        </div>
      </div>

      {/* MESAJ — Opsiyonel */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          <MessageSquare size={14} className="text-[var(--color-text-muted)]" />
          Eklemek istediğiniz bir şey var mı? (opsiyonel)
        </label>
        <textarea
          value={state.mesaj}
          onChange={(e) =>
            dispatch({ type: "SET_MESAJ", mesaj: e.target.value })
          }
          placeholder="Kampanya hedefiniz, hedef kitleniz veya eklemek istediğiniz başka bir bilgi varsa buraya yazabilirsiniz..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border-subtle)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:bg-[var(--color-bg)] outline-none transition-colors text-sm placeholder:text-[var(--color-text-muted)] resize-none"
        />
      </div>

      {/* KVKK ONAYI — Zorunlu */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Onaylar
        </h4>

        {/* KVKK */}
        <label
          className={`flex gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${
            state.kvkk
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40"
          }`}
        >
          <Checkbox
            checked={state.kvkk}
            onChange={(checked) =>
              dispatch({ type: "SET_KVKK", value: checked })
            }
            required
          />
          <div className="flex-1 text-sm">
            <div className="text-[var(--color-text-primary)] leading-relaxed">
              <span className="text-[var(--color-primary-deep)] font-medium">
                * Zorunlu —{" "}
              </span>
              KVKK m.10 kapsamında{" "}
              <Link
                href="/kvkk-aydinlatma"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--color-primary-deep)] hover:underline font-medium"
              >
                Aydınlatma Metnini
              </Link>{" "}
              okudum <strong>ve</strong> KVKK m.5/1 kapsamında kişisel
              verilerimin teklif sürecinin yürütülmesi amacıyla işlenmesine{" "}
              <strong>açık rıza</strong> veriyorum.
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFullKvkk(!showFullKvkk);
              }}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mt-2 underline"
            >
              {showFullKvkk ? "Detayları gizle" : "Detayları göster"}
            </button>
            {showFullKvkk && (
              <div className="mt-3 p-3 bg-[var(--color-bg)] rounded-lg text-xs text-[var(--color-text-secondary)] leading-relaxed animate-fadeIn">
                <p>
                  <strong>Veri Sorumlusu:</strong> Objektif Kriter
                </p>
                <p className="mt-2">
                  <strong>İşleme Amacı:</strong> Teklif talebinizin
                  değerlendirilmesi, kampanya planlaması ve müşteri ilişkilerinin
                  yönetimi.
                </p>
                <p className="mt-2">
                  <strong>Haklarınız:</strong> KVKK m.11 kapsamında verilerinize
                  erişim, düzeltme, silme ve itiraz haklarına sahipsiniz.
                  Detaylar için tam aydınlatma metnini inceleyebilirsiniz.
                </p>
              </div>
            )}
          </div>
        </label>

        {/* PAZARLAMA */}
        <label
          className={`flex gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${
            state.pazarlama
              ? "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5"
              : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30"
          }`}
        >
          <Checkbox
            checked={state.pazarlama}
            onChange={(checked) =>
              dispatch({ type: "SET_PAZARLAMA", value: checked })
            }
          />
          <div className="flex-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <span className="text-[var(--color-text-muted)] text-xs">
              Opsiyonel —{" "}
            </span>
            Sektörel bilgilendirme, kampanya duyuruları ve içeriklerin
            tarafıma e-posta yoluyla gönderilmesini onaylıyorum. Onayımı her
            zaman geri çekebilirim.
          </div>
        </label>
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
        Detaylı bilgi için{" "}
        <Link
          href="/gizlilik"
          target="_blank"
          className="text-[var(--color-primary)] hover:underline"
        >
          Gizlilik Politikası
        </Link>{" "}
        ve{" "}
        <Link
          href="/cerez-politikasi"
          target="_blank"
          className="text-[var(--color-primary)] hover:underline"
        >
          Çerez Politikası
        </Link>{" "}
        sayfalarımızı inceleyebilirsiniz.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SUMMARY ROW — özet tablosunda her satır
// ═══════════════════════════════════════════════════════════

function SummaryRow({
  icon: Icon,
  label,
  value,
  stepNumber,
  dispatch,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  stepNumber: number;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-6 py-4 group hover:bg-[var(--color-surface)]/60 transition-colors">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <Icon
          size={16}
          className="text-[var(--color-text-muted)] mt-0.5 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            {label}
          </div>
          <div className="text-sm text-[var(--color-text-primary)] break-words">
            {value}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: "GO_TO_STEP", step: stepNumber })}
        className="opacity-0 group-hover:opacity-100 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] flex items-center gap-1 shrink-0 transition-opacity"
        aria-label={`${label} bilgisini düzenle`}
      >
        <Edit3 size={12} />
        Düzenle
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CHECKBOX — özel tasarım
// ═══════════════════════════════════════════════════════════

function Checkbox({
  checked,
  onChange,
  required,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-required={required}
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
        checked
          ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
          : "bg-[var(--color-bg)] border-[var(--color-border)] hover:border-[var(--color-primary)]/60"
      }`}
    >
      {checked && (
        <svg
          className="w-3.5 h-3.5 text-white animate-fadeIn"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8L6.5 11.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
