"use client";

/**
 * SVG TÜRKİYE HARİTASI — Mapbox'ın yerine geçen tamamen statik bileşen.
 * - İl sınırları: src/data/tr-il-paths.ts (gömülü veri, dış servis YOK)
 * - Envanter: props ile server'dan gelir (kaynak: envanter.json)
 * - 7 bölge renk kodlu; envanterli iller tıklanınca detay paneli açılır.
 * Token, API, ağ isteği yoktur — "0 şehir" hatası kökten tarih olmuştur.
 */

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, X } from "lucide-react";
import { TR_IL_PATHS, TR_HARITA_VIEWBOX } from "@/src/data/tr-il-paths";

export interface HaritaIl {
  slug: string;
  il: string;
  bolge: string;
  toplam: number;
  ilceler: string[];
  formatlar: Array<{ label: string; adet: number }>;
}

const BOLGELER = [
  "Marmara",
  "Ege",
  "Akdeniz",
  "İç Anadolu",
  "Karadeniz",
  "Doğu Anadolu",
  "Güneydoğu Anadolu",
] as const;

/** Bölge → dolgu rengi (aydınlık zeminde doygun tonlar — G5 cilası) */
const BOLGE_RENK: Record<string, string> = {
  "Marmara": "#0EA5E9",
  "Ege": "#14B8A6",
  "Akdeniz": "#F59E0B",
  "İç Anadolu": "#8B5CF6",
  "Karadeniz": "#22C55E",
  "Doğu Anadolu": "#F43F5E",
  "Güneydoğu Anadolu": "#F97316",
};

/** Bölge → metin rengi (beyaz zeminde ≥4.5:1 — panel etiketi bunlarla yazılır) */
const BOLGE_RENK_METIN: Record<string, string> = {
  "Marmara": "#0369A1",
  "Ege": "#0F766E",
  "Akdeniz": "#B45309",
  "İç Anadolu": "#6D28D9",
  "Karadeniz": "#15803D",
  "Doğu Anadolu": "#BE123C",
  "Güneydoğu Anadolu": "#C2410C",
};

const sayiTr = (n: number) => n.toLocaleString("tr-TR");

export default function TurkiyeHaritasi({ iller }: { iller: HaritaIl[] }) {
  const [seciliSlug, setSeciliSlug] = useState<string | null>(null);
  const [bolgeFiltre, setBolgeFiltre] = useState<string>("Tümü");
  const [formatFiltre, setFormatFiltre] = useState<string>("Tümü");
  const panelRef = useRef<HTMLElement>(null);

  /** İl seç + mobilde (panel haritanın altında) paneli görüş alanına getir */
  const ilSec = (slug: string) => {
    setSeciliSlug(slug);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: azHareket ? "auto" : "smooth", block: "start" });
      });
    }
  };

  const illerBySlug = useMemo(
    () => new Map(iller.map((i) => [i.slug, i])),
    [iller]
  );

  // Format seçenekleri — envanterdeki toplam adede göre azalan
  const formatSecenekleri = useMemo(() => {
    const agg = new Map<string, number>();
    for (const il of iller)
      for (const f of il.formatlar)
        agg.set(f.label, (agg.get(f.label) ?? 0) + f.adet);
    return Array.from(agg.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([label]) => label);
  }, [iller]);

  const filtredeMi = (il: HaritaIl): boolean => {
    if (bolgeFiltre !== "Tümü" && il.bolge !== bolgeFiltre) return false;
    if (formatFiltre !== "Tümü" && !il.formatlar.some((f) => f.label === formatFiltre && f.adet > 0))
      return false;
    return true;
  };

  const gorunenIller = iller.filter(filtredeMi);
  const gorunenUnite = gorunenIller.reduce(
    (s, i) =>
      s +
      (formatFiltre === "Tümü"
        ? i.toplam
        : i.formatlar.find((f) => f.label === formatFiltre)?.adet ?? 0),
    0
  );

  const secili = seciliSlug ? illerBySlug.get(seciliSlug) : undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      {/* SOL: filtreler + harita */}
      <div>
        {/* Bölge filtreleri */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Tümü", ...BOLGELER].map((b) => (
            <button
              key={b}
              onClick={() => setBolgeFiltre(b)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                bolgeFiltre === b
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                  : "border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              {b !== "Tümü" && (
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1.5"
                  style={{ background: BOLGE_RENK[b] }}
                />
              )}
              {b}
            </button>
          ))}
        </div>

        {/* Format filtresi */}
        <div className="flex items-center gap-3 mb-6">
          <label
            htmlFor="format-filtre"
            className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
          >
            Mecra
          </label>
          <select
            id="format-filtre"
            value={formatFiltre}
            onChange={(e) => setFormatFiltre(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)]"
          >
            <option value="Tümü">Tüm mecralar</option>
            {formatSecenekleri.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <span className="text-xs text-[var(--color-text-muted)]">
            {gorunenIller.length} il · {sayiTr(gorunenUnite)} ünite
          </span>
        </div>

        {/* HARİTA */}
        <svg
          viewBox={TR_HARITA_VIEWBOX}
          className="w-full h-auto select-none"
          role="img"
          aria-label="Türkiye envanter haritası — envanter bulunan iller renkli"
        >
          {TR_IL_PATHS.map((p) => {
            const il = illerBySlug.get(p.id);
            const aktif = !!il;
            const gorunur = il ? filtredeMi(il) : false;
            const fill = !aktif
              ? "var(--color-surface-elevated)"
              : gorunur
                ? BOLGE_RENK[il!.bolge] ?? "var(--color-primary)"
                : "var(--color-surface)";
            const secildi = seciliSlug === p.id;
            const opacity = !aktif
              ? 0.7
              : gorunur
                ? secildi
                  ? 1
                  : seciliSlug
                    ? 0.45
                    : 0.9
                : 0.35;
            return (
              <path
                key={p.id}
                d={p.d}
                fill={fill}
                fillOpacity={opacity}
                stroke={secildi ? "var(--color-primary-darker)" : "var(--color-border-subtle)"}
                strokeWidth={secildi ? 2 : 1}
                onClick={aktif ? () => ilSec(p.id) : undefined}
                onKeyDown={
                  aktif
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          ilSec(p.id);
                        }
                      }
                    : undefined
                }
                tabIndex={aktif && gorunur ? 0 : -1}
                role={aktif ? "button" : undefined}
                aria-pressed={aktif ? secildi : undefined}
                className={aktif ? "harita-il" : ""}
              >
                <title>
                  {p.ad}
                  {il ? ` — ${sayiTr(il.toplam)} reklam ünitesi` : " — bu ilde envanter yok"}
                </title>
              </path>
            );
          })}
        </svg>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          Renkli iller envanterimizin bulunduğu {iller.length} ili gösterir;
          il üzerine gelin, tıklayın veya Tab ile gezinin.
        </p>
      </div>

      {/* SAĞ: detay paneli */}
      <aside ref={panelRef} className="lg:sticky lg:top-24 h-fit scroll-mt-24">
        {secili ? (
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium" style={{ color: BOLGE_RENK_METIN[secili.bolge] ?? BOLGE_RENK[secili.bolge] }}>
                  <MapPin size={14} />
                  {secili.bolge}
                </div>
                <h3 className="mt-1 text-2xl font-bold">{secili.il}</h3>
              </div>
              <button
                onClick={() => setSeciliSlug(null)}
                aria-label="Paneli kapat"
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-gradient">
                  {sayiTr(secili.toplam)}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reklam Ünitesi
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">
                  {secili.formatlar.length}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Mecra Türü
                </div>
              </div>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {secili.formatlar.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between text-sm border-b border-[var(--color-border-subtle)]/60 pb-2 last:border-b-0"
                >
                  <span className="text-[var(--color-text-secondary)]">{f.label}</span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    {sayiTr(f.adet)}
                  </span>
                </div>
              ))}
            </div>

            {secili.ilceler.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Kapsama noktaları
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {secili.ilceler.slice(0, 8).map((ilce) => (
                    <span
                      key={ilce}
                      className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]"
                    >
                      {ilce}
                    </span>
                  ))}
                  {secili.ilceler.length > 8 && (
                    <span className="px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                      +{secili.ilceler.length - 8}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-1">
              <Link href={`/sehir/${secili.slug}`} className="btn-primary justify-center">
                {secili.il} sayfasına git
                <ArrowRight size={16} />
              </Link>
              <Link href="/teklif-al" className="btn-secondary justify-center">
                Bu il için teklif al
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-4">
            <h3 className="text-lg font-semibold">İl seçin</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Haritada renkli görünen illerden birine tıklayın; o ildeki
              mecra dağılımını, ünite sayılarını ve kapsama noktalarını
              görün.
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-muted)]">
              {BOLGELER.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: BOLGE_RENK[b] }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
