"use client";

/**
 * SVG TÜRKİYE HARİTASI — Mapbox'ın yerine geçen tamamen statik bileşen.
 * - İl sınırları: src/data/tr-il-paths.ts (gömülü veri, dış servis YOK)
 * - Envanter: props ile server'dan gelir (kaynak: envanter.json)
 * - RENK DİLİ (Eylül 2026 revizyonu): il dolgusu ENVANTER YOĞUNLUĞUNU gösterir,
 *   marka kitinin cyan rampasıyla (soft → primary-darker). Eski 7-bölge gökkuşağı
 *   paleti (kehribar/mor/gül/turuncu) marka kitinde yoktu ve renk hiçbir bilgi
 *   taşımıyordu; bölge artık filtre + panel etiketiyle veriliyor, HUE ile değil.
 * - Saydamlık yalnız filtre/seçim sönümlemesi yapar; renkle görev karışmaz.
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
  /** Detay linki — standalone il için /sehir/<il>, taşınan il için /bolge/<bölge> */
  detayHref: string;
  /** Buton metni — "<il> sayfasına git" ya da "<Bölge> bölge sayfasına git" */
  detayLabel: string;
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

/** ENVANTER YOĞUNLUĞU RAMPASI — tamamı marka kiti cyan ailesinden.
 *  Açıktan koyuya: kit soft → kit mid → ara ton → primary-darker.
 *  En açık basamak bile belirgin cyan; "envanteri az il" soluk/silik
 *  görünmez, yalnız daha az doygun okunur. */
const YOGUNLUK_RAMPA = ["#7CE2FF", "#38C7FA", "#0891B2", "#075985"] as const;

/** Filtre dışında kalan envanterli il — kitin en açık tonu (pale). */
const SONUK_RENK = "var(--color-cyan-pale)";

/** İl konturu: primary %28 — hem açık hem koyu dolguda görünen ince hat. */
const KONTUR = "rgba(3, 105, 161, 0.28)";

const sayiTr = (n: number) => n.toLocaleString("tr-TR");

/** Kova sınırı etiketi — rakamlar eşiklerden, yani veriden türer (elle yazılmaz). */
function kovaEtiketi(i: number, esikler: number[]): string {
  if (esikler.length === 0) return "Tümü";
  const alt = i === 0 ? 1 : esikler[i - 1] + 1;
  if (i >= esikler.length) return `${sayiTr(alt)}+`;
  return `${sayiTr(alt)}–${sayiTr(esikler[i])}`;
}

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

  /** Yoğunluk eşikleri — envanterin ÇEYREKLİKLERİNDEN türer, sabit sayı yok.
   *  Envanter büyüyüp küçülse de rampa kendini ayarlar; eşit değer yığılması
   *  varsa benzersizleştirme kova sayısını kendiliğinden düşürür. */
  const esikler = useMemo(() => {
    const veri = iller.map((i) => i.toplam).filter((n) => n > 0).sort((a, b) => a - b);
    if (veri.length === 0) return [];
    const ceyreklik = (p: number) => veri[Math.min(veri.length - 1, Math.floor(veri.length * p))];
    return [ceyreklik(0.25), ceyreklik(0.5), ceyreklik(0.75)].filter(
      (v, i, a) => i === 0 || v > a[i - 1]
    );
  }, [iller]);

  /** Ünite adedi → rampa basamağı (0 = en açık). */
  const kova = (toplam: number) => esikler.filter((e) => toplam > e).length;

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
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 p-4 sm:p-6">
        <svg
          viewBox={TR_HARITA_VIEWBOX}
          className="w-full h-auto select-none"
          role="img"
          aria-label="Türkiye envanter haritası — envanter bulunan iller, ünite yoğunluğuna göre koyulaşan marka tonlarıyla"
        >
          {/* Seçili il EN SON çizilir: konturu sonraki komşuların altında kalmasın */}
          {[
            ...TR_IL_PATHS.filter((p) => p.id !== seciliSlug),
            ...TR_IL_PATHS.filter((p) => p.id === seciliSlug),
          ].map((p) => {
            const il = illerBySlug.get(p.id);
            const aktif = !!il;
            const gorunur = il ? filtredeMi(il) : false;
            const secildi = seciliSlug === p.id;
            // Dolgu = yoğunluk (marka rampası). Saydamlık SADECE sönümleme yapar.
            const fill = !aktif
              ? "var(--color-surface-elevated)"
              : gorunur
                ? YOGUNLUK_RAMPA[kova(il!.toplam)]
                : SONUK_RENK;
            const opacity = !aktif ? 1 : gorunur ? (seciliSlug && !secildi ? 0.5 : 1) : 0.6;
            return (
              <path
                key={p.id}
                d={p.d}
                fill={fill}
                fillOpacity={opacity}
                stroke={secildi ? "var(--color-ink)" : aktif ? KONTUR : "var(--color-border-subtle)"}
                strokeWidth={secildi ? 2.2 : aktif ? 0.9 : 0.8}
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
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          Renkli iller envanterimizin bulunduğu {iller.length} ili gösterir; ton
          koyulaştıkça o ildeki ünite sayısı artar. İl üzerine gelin, tıklayın
          veya Tab ile gezinin.
        </p>
      </div>

      {/* SAĞ: detay paneli */}
      <aside ref={panelRef} className="lg:sticky lg:top-24 h-fit scroll-mt-24">
        {secili ? (
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[var(--color-primary)]">
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
              <Link href={secili.detayHref} className="btn-primary justify-center">
                {secili.detayLabel}
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
            <div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Envanter yoğunluğu
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--color-text-muted)]">
                {YOGUNLUK_RAMPA.slice(0, esikler.length + 1).map((renk, i) => (
                  <li key={renk} className="flex items-center gap-2">
                    <span
                      className="w-5 h-3 rounded-[3px] border border-[var(--color-border-subtle)]"
                      style={{ background: renk }}
                    />
                    {kovaEtiketi(i, esikler)} ünite
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span className="w-5 h-3 rounded-[3px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]" />
                  Envanter dışı il
                </li>
              </ul>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
