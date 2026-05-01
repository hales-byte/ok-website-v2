"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Envanter", href: "/envanter" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-[var(--color-border-subtle)]">
      <div className="container-narrow py-4 flex items-center justify-between">
        <Logo size="sm" />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
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
          <nav className="container-narrow py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[var(--color-text-primary)] py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/teklif-al"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2"
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}