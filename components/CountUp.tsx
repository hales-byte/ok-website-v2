"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Hedef sayı */
  end: number;
  /** Animasyon süresi (ms) — default 2000ms */
  duration?: number;
  /** Türkçe ondalık ayırıcı kullansın mı (örn. 33.812) */
  formatTr?: boolean;
  /** Sayıdan önceki prefix (örn. "₺") */
  prefix?: string;
  /** Sayıdan sonraki suffix (örn. "+") */
  suffix?: string;
  /** Custom className */
  className?: string;
}

/**
 * Sayı 0'dan hedef değere kadar animasyonlu olarak sayar.
 * Element viewport'a girince başlar, yalnızca bir kez çalışır.
 *
 * Kullanım:
 *   <CountUp end={47} suffix="+" />
 *   <CountUp end={33812} formatTr suffix="+" />
 */
export function CountUp({
  end,
  duration = 2000,
  formatTr = false,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion tercihi varsa animasyon yapma, direkt hedefi göster
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, started]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrame: number;

    // Easing fonksiyonu — cubic-bezier(0.16, 1, 0.3, 1) yaklaşımı (ease-out expo)
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(eased * end);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [started, end, duration]);

  const display = formatTr
    ? count.toLocaleString("tr-TR")
    : count.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
