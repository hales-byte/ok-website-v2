"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  ListChecks,
  X,
  ArrowRight,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type ViewState = "choose" | "upload-channels";

const WHATSAPP_BRIEF_URL =
  "https://wa.me/905529185864?text=Merhaba%2C%20Reklam%20ajans%C4%B1ndan%20brief%20payla%C5%9Fmak%20istiyorum.";
const EMAIL_BRIEF =
  "mailto:satis@objektifkriter.com.tr?subject=Brief%20Payla%C5%9F%C4%B1m%C4%B1%20%E2%80%94%20Reklam%20Ajans%C4%B1&body=Merhaba%2C%0AReklam%20ajans%C4%B1ndan%20yaz%C4%B1yorum.%20Brief%20dosyam%C4%B1z%20ekte%20iletiyorum.%0A%0AAjans%20ad%C4%B1%3A%20%0AKampanya%20markas%C4%B1%3A%20%0AT%C3%BCr%20(PDF%2FWord%2FExcel)%3A%20%0A%0ATe%C5%9Fekk%C3%BCrler.";

export function BriefModal({
  triggerLabel = "Brief Gönder",
  triggerClassName = "btn-primary",
  triggerIcon = true,
}: {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerIcon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewState>("choose");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc ile kapat + body scroll lock
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    // Modal kapanırken view'ı bir tick sonra resetle (animasyon görünmesin)
    setTimeout(() => setView("choose"), 200);
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
        {triggerIcon && <ArrowRight size={18} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="brief-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={handleBackdrop}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <X size={18} />
            </button>

            {view === "choose" && (
              <div className="p-8 md:p-10">
                <h2
                  id="brief-modal-title"
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  Brief gönderme yöntemi seçin
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                  Hangisi daha kolaysa onu seçin — sonrasını biz sürüyoruz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kart 1: Yükle */}
                  <button
                    type="button"
                    onClick={() => setView("upload-channels")}
                    className="text-left p-6 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <Upload
                        size={22}
                        className="text-[var(--color-primary-deep)]"
                      />
                    </div>
                    <div className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                      Brief dosyamı yüklemek istiyorum
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      Hazır brief dosyanız varsa (PDF / Word / Excel) — bize
                      doğrudan iletin.
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary-deep)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Devam
                      <ArrowRight size={12} />
                    </div>
                  </button>

                  {/* Kart 2: Envanter seçerek */}
                  <Link
                    href="/teklif-al"
                    onClick={close}
                    className="p-6 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <ListChecks
                        size={22}
                        className="text-[var(--color-primary-deep)]"
                      />
                    </div>
                    <div className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                      Envanter seçerek ilerlemek istiyorum
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      6 adımlı form ile şehir, format, bütçe ve süreyi
                      birlikte netleştirelim.
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary-deep)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Forma git
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                </div>

                <p className="mt-6 text-xs text-[var(--color-text-muted)] text-center">
                  30 dakikada teklif. Brief gizliliği KVKK uyumlu.
                </p>
              </div>
            )}

            {view === "upload-channels" && (
              <div className="p-8 md:p-10">
                <button
                  type="button"
                  onClick={() => setView("choose")}
                  className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
                >
                  <ArrowLeft size={14} />
                  Geri
                </button>

                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Brief dosyanızı bize ulaştırın
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                  PDF, Word ya da Excel — fark etmez. İki kanaldan birinden
                  iletebilirsiniz, biz 30 dakika içinde değerlendirip dönüş
                  yapıyoruz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <a
                    href={WHATSAPP_BRIEF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="flex flex-col p-6 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <WhatsAppIcon
                        size={22}
                        className="text-[var(--color-primary-deep)]"
                      />
                    </div>
                    <div className="text-base font-semibold mb-1">
                      WhatsApp&apos;tan gönder
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      +90 552 918 5864 — dosyayı doğrudan ek olarak paylaşın.
                      En hızlı kanal.
                    </div>
                  </a>

                  {/* E-posta */}
                  <a
                    href={EMAIL_BRIEF}
                    onClick={close}
                    className="flex flex-col p-6 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <Mail
                        size={22}
                        className="text-[var(--color-primary-deep)]"
                      />
                    </div>
                    <div className="text-base font-semibold mb-1">
                      E-postayla gönder
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      satis@objektifkriter.com.tr — büyük dosyalar ve detaylı
                      açıklama için ideal.
                    </div>
                  </a>
                </div>

                <p className="mt-6 text-xs text-[var(--color-text-muted)] text-center">
                  Brief gönderildiğinde otomatik onay yanıtı geliyor — kayboldu
                  endişesine girmeyin.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
