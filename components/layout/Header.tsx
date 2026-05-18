"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Briefcase, Users, Sparkles, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Logo } from "@/components/Logo";

const navLinks = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Envanter", href: "/envanter" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const cozumler = [
  {
    href: "/markalar",
    tag: "MARKA",
    label: "Markalar",
    desc: "Kurumsal disiplinle açıkhava — stratejik planlama, şeffaf süreç, sektörel deneyim.",
    icon: Briefcase,
  },
  {
    href: "/ajanslar",
    tag: "AJANS",
    label: "Reklam Ajansları",
    desc: "30 dakika teklif, ajansa özel ratecard, white-label raporlama.",
    icon: Users,
  },
  {
    href: "/ilk-kampanyaniz",
    tag: "YENİ BAŞLAYAN",
    label: "İlk Açıkhava Kampanyam",
    desc: "Brief'iniz olmasa da olur — sıfırdan rehberlik, baskısız konuşma.",
    icon: Sparkles,
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cozumlerOpen, setCozumlerOpen] = useState(false);
  const cozumlerRef = useRef<HTMLDivElement>(null);

  // Dropdown dışına tıklayınca kapat (touch device + dışa-tık desteği)
  useEffect(() => {
    if (!cozumlerOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        cozumlerRef.current &&
        !cozumlerRef.current.contains(e.target as Node)
      ) {
        setCozumlerOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setCozumlerOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [cozumlerOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-[var(--color-border-subtle)]">
      <div className="container-narrow py-4 flex items-center justify-between">
        <Logo size="sm" />

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/hizmetler"
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Hizmetler
          </Link>

          {/* Çözümler dropdown */}
          <div className="relative" ref={cozumlerRef}>
            <button
              type="button"
              onClick={() => setCozumlerOpen(!cozumlerOpen)}
              aria-expanded={cozumlerOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Çözümler
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
                    Sizi ne tanımlar?
                  </div>
                </div>

                {/* 3 sütun kart grid */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3">
                  {cozumler.map((c) => {
                    const Icon = c.icon;
                    return (
                      <li key={c.href} role="none">
                        <Link
                          href={c.href}
                          role="menuitem"
                          onClick={() => setCozumlerOpen(false)}
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
                    onClick={() => setCozumlerOpen(false)}
                    className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
                  >
                    <span>
                      Hangisi olduğunuza emin değilseniz,{" "}
                      <span className="text-[var(--color-text-primary)] font-medium">
                        WhatsApp&apos;tan konuşalım
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

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
          <nav className="container-narrow py-4 flex flex-col gap-1">
            {/* Hizmetler */}
            <Link
              href="/hizmetler"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-[var(--color-text-primary)] py-3"
            >
              Hizmetler
            </Link>

            {/* Çözümler — accordion */}
            <div className="border-y border-[var(--color-border-subtle)] py-3 my-1">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] py-2 mb-1">
                Sizi ne tanımlar?
              </div>
              {cozumler.map((c) => {
                const Icon = c.icon;
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

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[var(--color-text-primary)] py-3"
              >
                {link.label}
              </Link>
            ))}
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
