"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

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
  // İlk render'da ve animasyon başlamadan önce hedef değeri göster.
  // Animasyon başlayınca tick fonksiyonu count'u 0'dan hedefe doğru animasyonlu güncelliyor.
  // Bu sayede kullanıcı sayacı hızla geçse bile "0+" şoku görmez, gerçek değeri görür.
  const [count, setCount] = useState(end);
  const [started, setStarted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;

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
  }, [started, prefersReducedMotion]);

  useEffect(() => {
    if (!started || prefersReducedMotion) return;

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
  }, [started, end, duration, prefersReducedMotion]);

  const displayValue = prefersReducedMotion ? end : count;
  const display = formatTr
    ? displayValue.toLocaleString("tr-TR")
    : displayValue.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
