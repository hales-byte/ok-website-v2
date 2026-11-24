"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Logo } from "@/components/Logo";
import { COZUMLER_MENU, KURUMSAL_MENU } from "@/src/data/content/menu";

/*
 * ÜST MENÜ (2026-11-24): Hizmetler · Çözümler ▾ · Envanter · Kurumsal ▾ + Teklif Al.
 * Ana sayfa sadeleşince "Kim için biz?" kartları Çözümler'e, SSS Kurumsal'a
 * taşındı; Hakkımızda ve İletişim de Kurumsal altında toplandı.
 * Bağlantı metinleri src/data/content/menu.ts'te (Footer da oradan okur).
 */

// Çözüm kartlarının ikonları — metin içerik dosyasında, ikon burada
const COZUM_IKONLARI: Record<string, LucideIcon> = {
  "/markalar": Briefcase,
  "/ajanslar": Users,
  "/ilk-kampanyaniz": Sparkles,
};

type AcikMenu = "cozumler" | "kurumsal" | null;

const NAV_LINK =
  "text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [acikMenu, setAcikMenu] = useState<AcikMenu>(null);
  const cozumlerRef = useRef<HTMLDivElement>(null);
  const kurumsalRef = useRef<HTMLDivElement>(null);

  const degistir = (ad: Exclude<AcikMenu, null>) =>
    setAcikMenu((simdiki) => (simdiki === ad ? null : ad));
  const kapat = () => setAcikMenu(null);

  // Açık menünün dışına tıklayınca veya Escape'te kapat (dokunmatik + klavye)
  useEffect(() => {
    if (!acikMenu) return;
    const ref = acikMenu === "cozumler" ? cozumlerRef : kurumsalRef;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAcikMenu(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setAcikMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [acikMenu]);

  const cozumlerOpen = acikMenu === "cozumler";
  const kurumsalOpen = acikMenu === "kurumsal";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-[var(--color-border-subtle)]">
      <div className="container-narrow py-4 flex items-center justify-between">
        <Logo size="sm" />

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/hizmetler" className={NAV_LINK}>
            Hizmetler
          </Link>

          {/* Çözümler — 3 kartlık geniş panel */}
          <div className="relative" ref={cozumlerRef}>
            <button
              type="button"
              onClick={() => degistir("cozumler")}
              aria-expanded={cozumlerOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-1 ${NAV_LINK}`}
            >
              {COZUMLER_MENU.baslik}
              <ChevronDown
                size={14}
                className={`transition-transform ${cozumlerOpen ? "rotate-180" : ""}`}
              />
            </button>

            {cozumlerOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(92vw,760px)] rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden animate-fadeIn"
              >
                {/* Üst başlık */}
                <div className="px-6 pt-5 pb-2 border-b border-[var(--color-border-subtle)]">
                  <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                    {COZUMLER_MENU.ustBaslik}
                  </div>
                </div>

                {/* 3 sütun kart grid */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3">
                  {COZUMLER_MENU.ogeler.map((c) => {
                    const Icon = COZUM_IKONLARI[c.href] ?? Sparkles;
                    return (
                      <li key={c.href} role="none">
                        <Link
                          href={c.href}
                          role="menuitem"
                          onClick={kapat}
                          className="h-full flex flex-col p-5 rounded-xl border border-transparent hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)] transition-all group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 group-hover:scale-105 transition-all">
                            <Icon
                              size={22}
                              className="text-[var(--color-primary-deep)]"
                            />
                          </div>
                          <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-primary-deep)] mb-1">
                            {c.tag}
                          </div>
                          <div className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                            {c.label}
                          </div>
                          <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed flex-grow">
                            {c.desc}
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[var(--color-primary-deep)] opacity-0 group-hover:opacity-100 transition-opacity">
                            İncele
                            <ArrowRight size={12} />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Alt CTA */}
                <div className="px-6 py-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
                  <a
                    href="https://wa.me/905529185864?text=Merhaba%2C%20a%C3%A7%C4%B1khava%20reklam%C4%B1%20i%C3%A7in%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={kapat}
                    className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
                  >
                    <span>
                      {COZUMLER_MENU.altCta.oncesi}{" "}
                      <span className="text-[var(--color-text-primary)] font-medium">
                        {COZUMLER_MENU.altCta.vurgu}
                      </span>
                    </span>
                    <WhatsAppIcon
                      size={16}
                      className="text-[var(--color-primary-deep)] shrink-0 group-hover:scale-110 transition-transform"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>

          <Link href="/envanter" className={NAV_LINK}>
            Envanter
          </Link>

          {/* Kurumsal — kısa liste paneli (Hakkımızda · SSS · İletişim) */}
          <div className="relative" ref={kurumsalRef}>
            <button
              type="button"
              onClick={() => degistir("kurumsal")}
              aria-expanded={kurumsalOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-1 ${NAV_LINK}`}
            >
              {KURUMSAL_MENU.baslik}
              <ChevronDown
                size={14}
                className={`transition-transform ${kurumsalOpen ? "rotate-180" : ""}`}
              />
            </button>

            {kurumsalOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden animate-fadeIn"
              >
                <ul className="p-2">
                  {KURUMSAL_MENU.ogeler.map((k) => (
                    <li key={k.href} role="none">
                      <Link
                        href={k.href}
                        role="menuitem"
                        onClick={kapat}
                        className="flex items-start justify-between gap-3 px-4 py-3 rounded-xl hover:bg-[var(--color-surface)] transition-colors group"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[var(--color-text-primary)]">
                            {k.label}
                          </span>
                          <span className="block mt-0.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            {k.desc}
                          </span>
                        </span>
                        <ArrowRight
                          size={14}
                          className="mt-1 shrink-0 text-[var(--color-primary-deep)] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:block">
          <Link href="/teklif-al" className="btn-primary text-sm py-2 px-4">
            Teklif Al
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-primary)]"
          aria-label="Menüyü aç/kapat"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
          <nav className="container-narrow py-4 flex flex-col gap-1">
            <Link
              href="/hizmetler"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-[var(--color-text-primary)] py-3"
            >
              Hizmetler
            </Link>

            {/* Çözümler */}
            <div className="border-y border-[var(--color-border-subtle)] py-3 my-1">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] py-2 mb-1">
                {COZUMLER_MENU.ustBaslik}
              </div>
              {COZUMLER_MENU.ogeler.map((c) => {
                const Icon = COZUM_IKONLARI[c.href] ?? Sparkles;
                return (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-start gap-3 py-3 text-[var(--color-text-primary)]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                      <Icon
                        size={18}
                        className="text-[var(--color-primary-deep)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-primary-deep)]">
                        {c.tag}
                      </div>
                      <div className="text-base font-medium text-[var(--color-text-primary)]">
                        {c.label}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                        {c.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/envanter"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-[var(--color-text-primary)] py-3"
            >
              Envanter
            </Link>

            {/* Kurumsal */}
            <div className="border-t border-[var(--color-border-subtle)] pt-3 mt-1">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] py-2">
                {KURUMSAL_MENU.baslik}
              </div>
              {KURUMSAL_MENU.ogeler.map((k) => (
                <Link
                  key={k.href}
                  href={k.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-[var(--color-text-primary)] py-3"
                >
                  {k.label}
                </Link>
              ))}
            </div>

            <Link
              href="/teklif-al"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3"
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
