"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Animasyon yönü (default: "up") */
  direction?: "up" | "down" | "left" | "right" | "fade";
  /** Animasyon başlama gecikmesi (ms) — peş peşe öğeleri kaskadlamak için */
  delay?: number;
  /** Animasyon süresi (ms) — default 700ms */
  duration?: number;
  /** Custom className */
  className?: string;
  /** Bir kez tetiklenince tekrar tetiklenmesin (default: true) */
  once?: boolean;
}

/**
 * Element viewport'a girince fade-in + slide animasyonuyla belirir.
 * Apple-style scroll reveal animasyonu, native Intersection Observer ile.
 *
 * Kullanım:
 *   <ScrollReveal>...</ScrollReveal>
 *   <ScrollReveal delay={150}>...</ScrollReveal>
 *   <ScrollReveal direction="left" delay={300}>...</ScrollReveal>
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion tercihi varsa animasyon yapma
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  // Başlangıç transform'u (gizli durum)
  const hiddenTransform = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    fade: "translateY(0)",
  }[direction];

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : hiddenTransform,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
