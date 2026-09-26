"use client";

import { useEffect } from "react";

type Props = {
  /** Fotoğrafların ait olduğu bölüm + ünitenin fotoğraftaki yeri (yüzde) */
  fotolar: Array<{ sahne: string; odak: [number, number] }>;
  /** Köşedeki saatin bölüm ortalarındaki değeri */
  saatler: Array<{ bolum: string; saat: string }>;
};

const kis = (v: number) => Math.min(1, Math.max(0, v));
const yumusak = (v: number) => {
  const t = kis(v);
  return t * t * (3 - 2 * t);
};
const dakika = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
const saatYaz = (dk: number) => {
  const d = Math.round(dk);
  return `${String(Math.floor(d / 60)).padStart(2, "0")}:${String(d % 60).padStart(2, "0")}`;
};

/**
 * Kaydırma → fotoğraf anlatımı. Yalnız transform/opacity yazar (yerleşim değişmez, CLS yok).
 * Her fotoğraf kendi aralığında odağa doğru yavaşça yaklaşır; aralık sınırında bir sonraki
 * fotoğraf yumuşakça belirir. "Hareketi azalt" → yaklaşma yok, yalnız geçiş.
 */
export function DeneyimAkisi({ fotolar, saatler }: Props) {
  useEffect(() => {
    const kok = document.querySelector<HTMLElement>("[data-deneyim]");
    if (!kok) return;
    const katmanlar = Array.from(kok.querySelectorAll<HTMLElement>("[data-foto]"));
    const gece = kok.querySelector<HTMLElement>("[data-gece]");
    const saatKutu = kok.querySelector<HTMLElement>("[data-saat-kutu]");
    const saatYazi = kok.querySelector<HTMLElement>("[data-saat]");
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)");

    let araliklar: Array<{ a: number; b: number }> = [];
    let saatNoktalari: Array<{ y: number; dk: number }> = [];
    let finalA = Infinity;

    const bolum = (id: string) => {
      const el = kok.querySelector<HTMLElement>(`[data-bolum='${id}']`);
      const r = el?.getBoundingClientRect();
      const a = (r?.top ?? 0) + window.scrollY;
      const h = r?.height ?? 0;
      return { a, b: a + h, m: a + h / 2 };
    };

    const olc = () => {
      const adet: Record<string, number> = {};
      fotolar.forEach((f) => (adet[f.sahne] = (adet[f.sahne] ?? 0) + 1));
      const sira: Record<string, number> = {};
      araliklar = fotolar.map((f, i) => {
        const B = bolum(f.sahne);
        const k = (sira[f.sahne] = (sira[f.sahne] ?? -1) + 1);
        const n = adet[f.sahne];
        const a = i === 0 ? bolum("giris").a : B.a + ((B.b - B.a) * k) / n;
        return { a, b: B.a + ((B.b - B.a) * (k + 1)) / n };
      });
      // Saat, bölümün ilk fotoğraf durağının ortasında hedef değerine ulaşır
      saatNoktalari = saatler.map((s) => {
        const B = bolum(s.bolum);
        return { y: B.a + (B.b - B.a) / (2 * (adet[s.bolum] ?? 1)), dk: dakika(s.saat) };
      });
      finalA = bolum("final").a;
    };

    let son = "";
    const ciz = () => {
      raf = 0;
      const y = window.scrollY + window.innerHeight / 2;
      const T = window.innerHeight * 0.38;
      const dar = window.innerWidth < 768;
      // Telefonda dikey kırpma zaten yakın → yaklaşma daha az
      const zoom = azHareket.matches ? 0 : dar ? 0.08 : 0.22;
      const kayma = azHareket.matches ? 0 : dar ? 0.8 : 1.4;

      katmanlar.forEach((el, i) => {
        const { a, b } = araliklar[i];
        const gorunur = i === 0 ? 1 : yumusak((y - (a - T / 2)) / T);
        const p = yumusak((y - a) / (b - a));
        const s = 1 + zoom * p;
        el.style.opacity = gorunur.toFixed(3);
        el.style.transform = `translate3d(${(-kayma * p).toFixed(2)}%,0,0) scale(${s.toFixed(4)})`;
      });

      const karanlik = yumusak((y - (finalA - T / 2)) / T);
      if (gece) gece.style.opacity = (karanlik * 0.82).toFixed(3);
      if (saatKutu) saatKutu.style.opacity = (1 - karanlik).toFixed(3);

      if (saatYazi && saatNoktalari.length) {
        let dk = saatNoktalari[0].dk;
        for (let i = 0; i < saatNoktalari.length - 1; i++) {
          const n0 = saatNoktalari[i];
          const n1 = saatNoktalari[i + 1];
          if (y >= n0.y) dk = n0.dk + (n1.dk - n0.dk) * kis((y - n0.y) / (n1.y - n0.y));
        }
        const yazi = saatYaz(dk);
        if (yazi !== son) {
          saatYazi.textContent = yazi;
          son = yazi;
        }
      }
    };

    let raf = 0;
    const iste = () => {
      if (!raf) raf = requestAnimationFrame(ciz);
    };
    const yeniden = () => {
      olc();
      iste();
    };
    olc();
    ciz();
    window.addEventListener("scroll", iste, { passive: true });
    window.addEventListener("resize", yeniden);
    azHareket.addEventListener("change", iste);
    const ro = new ResizeObserver(yeniden);
    ro.observe(kok);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", iste);
      window.removeEventListener("resize", yeniden);
      azHareket.removeEventListener("change", iste);
      ro.disconnect();
    };
  }, [fotolar, saatler]);

  return null;
}
