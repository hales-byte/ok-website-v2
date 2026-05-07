"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FORMATLAR } from "@/lib/formats";

/**
 * Apple-tarzı sticky scroll showcase.
 * Desktop: ekrana yapışan blok, scroll ile format değişir.
 * Mobile: vertical liste fallback.
 */
export function FormatShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrolledIntoSection = -rect.top;
        const totalScrollableLength = containerHeight - windowHeight;

        if (totalScrollableLength <= 0) return;

        const progress = Math.max(
          0,
          Math.min(1, scrolledIntoSection / totalScrollableLength)
        );
        const newIndex = Math.min(
          FORMATLAR.length - 1,
          Math.floor(progress * FORMATLAR.length)
        );

        setActiveIndex(newIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const active = FORMATLAR[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <>
      {/* DESKTOP — Sticky scroll showcase */}
      <section
        ref={containerRef}
        className="relative hidden lg:block bg-[var(--color-surface)]/40 border-t border-b border-[var(--color-border-subtle)]"
        style={{ height: `${FORMATLAR.length * 90}vh` }}
        aria-label="Reklam üniteleri showcase"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
          <div className="container-narrow w-full">
            {/* Üst başlık + progress dots */}
            <div className="text-center mb-12">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Reklam Üniteleri
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Her ihtiyaca özel{" "}
                <span className="text-gradient">{FORMATLAR.length} Farklı</span>{" "}
                Ünite
              </h2>
              {/* Progress dots */}
              <div className="flex justify-center gap-1.5">
                {FORMATLAR.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-12 bg-[var(--color-primary)]"
                        : i < activeIndex
                        ? "w-4 bg-[var(--color-primary)]/40"
                        : "w-4 bg-[var(--color-border-subtle)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Ana içerik — image + text */}
            <div className="grid grid-cols-2 gap-12 xl:gap-16 items-center">
              {/* IMAGE - left, crossfade */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-2xl">
                {FORMATLAR.map((format, i) => {
                  const Icon = format.icon;
                  return (
                    <div
                      key={format.key}
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{ opacity: i === activeIndex ? 1 : 0 }}
                    >
                      {format.image ? (
                        <Image
                          src={`/images/formats/${format.image}.jpg`}
                          alt={format.name}
                          fill
                          sizes="50vw"
                          className="object-cover"
                          priority={i < 2}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-surface)] flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--color-primary)]/15 flex items-center justify-center">
                              <Icon
                                size={40}
                                className="text-[var(--color-primary)]"
                              />
                            </div>
                            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                              {format.name}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* TEXT - right (animated key for fade-in on change) */}
              <div key={active.key} className="space-y-5 animate-textReveal">
                <div className="flex items-center gap-4">
                  <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(FORMATLAR.length).padStart(2, "0")}
                  </div>
                  <div className="h-px w-12 bg-[var(--color-border-subtle)]" />
                </div>

                <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <ActiveIcon
                    size={28}
                    className="text-[var(--color-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                    {active.name}
                  </h3>
                  <p className="text-lg text-[var(--color-primary)]">
                    {active.tagline}
                  </p>
                </div>

                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                  {active.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {active.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
                        <Check
                          size={12}
                          className="text-[var(--color-primary)]"
                        />
                      </div>
                      <span className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <Link
                    href={`/hizmetler#${active.key}`}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium inline-flex items-center gap-2 group"
                  >
                    Detaylı incele
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE — Vertical fallback (no sticky) */}
      <section className="lg:hidden bg-[var(--color-surface)]/40 border-t border-b border-[var(--color-border-subtle)] py-16">
        <div className="container-narrow space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Reklam Üniteleri
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Her ihtiyaca özel{" "}
              <span className="text-gradient">{FORMATLAR.length} Farklı</span>{" "}
              Ünite
            </h2>
          </div>

          {FORMATLAR.map((format, i) => {
            const Icon = format.icon;
            return (
              <div key={format.key} className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                  {format.image ? (
                    <Image
                      src={`/images/formats/${format.image}.jpg`}
                      alt={format.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-surface)] flex items-center justify-center">
                      <Icon size={40} className="text-[var(--color-primary)]" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-[var(--color-primary)]" />
                    <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(FORMATLAR.length).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">{format.name}</h3>
                  <p className="text-sm text-[var(--color-primary)]">
                    {format.tagline}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {format.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CSS animation for text fade-in on key change */}
      <style jsx>{`
        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.animate-textReveal) {
          animation: textReveal 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
