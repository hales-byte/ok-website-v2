"use client";

import { useEffect, useRef } from "react";

type AgBaglantisi = { effectiveType?: string; saveData?: boolean };

/**
 * 3D sahneyi YALNIZ uygun ortamda ve sayfa boşa çıkınca yükler (three.js ayrı parça).
 * Telefon / "hareketi azalt" → CSS zaten sabit görselleri gösterir, burada hiçbir şey yüklenmez.
 * Yavaş bağlantı, WebGL yok ya da sahne çökerse → data-mod="sabit" ile sabit görsele döner.
 * `?yakala=N` (0…4): sabit görselleri üretmek için donuk anahtar kare modu.
 */
export function DeneyimYukleyici() {
  const kap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = kap.current;
    const kok = el?.closest<HTMLElement>("[data-deneyim]");
    if (!el || !kok) return;

    const sabiteGec = () => {
      kok.dataset.mod = "sabit";
    };
    const yakala = new URLSearchParams(window.location.search).get("yakala");
    if (yakala !== null) kok.dataset.yakala = "1";

    const genis = window.matchMedia("(min-width: 768px)").matches;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (yakala === null && (!genis || azHareket)) return;

    const ag = (navigator as Navigator & { connection?: AgBaglantisi }).connection;
    const yavas = !!ag && (ag.saveData === true || ["slow-2g", "2g", "3g"].includes(ag.effectiveType ?? ""));
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    if (yakala === null && (yavas || !webgl)) {
      sabiteGec();
      return;
    }

    let iptal = false;
    let durdur: (() => void) | undefined;
    const yukle = () =>
      import("./sahne/sahne3d")
        .then(({ sahneyiBaslat }) => {
          if (iptal) return;
          const sahne = sahneyiBaslat(el, {
            kaydirmaKaynagi: kok,
            bolumler: Array.from(kok.querySelectorAll<HTMLElement>("[data-bolum]")),
            sabitKare: yakala !== null ? Number(yakala) : undefined,
            hazir: () => {
              kok.dataset.hazir = "1";
            },
            hata: sabiteGec,
          });
          durdur = sahne.durdur;
        })
        .catch(sabiteGec);

    const bosta = "requestIdleCallback" in window
      ? (f: () => void) => window.requestIdleCallback(f, { timeout: 1200 })
      : (f: () => void) => window.setTimeout(f, 200);
    bosta(() => void yukle());

    return () => {
      iptal = true;
      durdur?.();
    };
  }, []);

  return <div ref={kap} className="dn-tuval" aria-hidden="true" />;
}
