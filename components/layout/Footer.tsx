import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Envanter", href: "/envanter" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const formatLinks = [
  { label: "Billboard", href: "/hizmetler#billboard" },
  { label: "CLP / Raket", href: "/hizmetler#clp" },
  { label: "Megalight", href: "/hizmetler#megalight" },
  { label: "LED & Dijital", href: "/hizmetler#led" },
  { label: "Havalimanı", href: "/hizmetler#havalimani" },
];

// Bu projedeki lucide-react sürümü brand ikonlarını export etmiyor; inline SVG kullanıyoruz.
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] mt-24">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Sol: Logo + tanıtım */}
          <div className="md:col-span-5 space-y-6">
            <Logo size="sm" href={null} />
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
              Türkiye genelinde 80+ lokasyon, 30.000+ reklam yüzü ile
              outdoor reklam çözümleri. Markanızı doğru yerde, doğru zamanda
              gösterin.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/objektif-kriter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/objektifkriter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Orta: Sayfalar */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
              Sayfalar
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Orta: Formatlar */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
              Formatlar
            </h4>
            <ul className="space-y-2">
              {formatLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ: İletişim */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:satis@objektifkriter.com.tr"
                  className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <span>satis@objektifkriter.com.tr</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çizgi: Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Objektif Kriter. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}