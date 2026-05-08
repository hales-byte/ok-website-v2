"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Briefcase, Users, Sparkles } from "lucide-react";
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
    label: "Markalar",
    desc: "Stratejik medya planlaması, raporlanabilir kampanya",
    icon: Briefcase,
  },
  {
    href: "/ajanslar",
    label: "Reklam Ajansları",
    desc: "30 dakika teklif, white-label rapor, ajansa özel ratecard",
    icon: Users,
  },
  {
    href: "/ilk-kampanyaniz",
    label: "İlk Açıkhava Kampanyam",
    desc: "Brief'iniz olmasa da olur, sıfırdan rehberlik",
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
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden animate-fadeIn"
              >
                <ul className="p-2">
                  {cozumler.map((c) => {
                    const Icon = c.icon;
                    return (
                      <li key={c.href} role="none">
                        <Link
                          href={c.href}
                          role="menuitem"
                          onClick={() => setCozumlerOpen(false)}
                          className="flex gap-3 p-3 rounded-xl hover:bg-[var(--color-surface)] transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                            <Icon
                              size={18}
                              className="text-[var(--color-primary-deep)]"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                              {c.label}
                            </div>
                            <div className="mt-0.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                              {c.desc}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
            <div className="border-y border-[var(--color-border-subtle)] py-2 my-1">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] py-2">
                Çözümler
              </div>
              {cozumler.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-3 text-[var(--color-text-primary)]"
                  >
                    <Icon
                      size={16}
                      className="text-[var(--color-primary-deep)]"
                    />
                    <span className="text-base font-medium">{c.label}</span>
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
