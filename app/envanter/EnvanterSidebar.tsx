"use client";

/**
 * EnvanterSidebar — sol kenar paneli.
 * Faz 2.5: Search + bölge filter + format filter + filtreli şehir listesi.
 *
 * Filtre mantığı:
 *  - query: şehir adında case-insensitive substring (TR locale)
 *  - bolgeler: Set<Bolge>; boşsa tüm bölgeler
 *  - formatlar: Set<format>; boşsa tüm formatlar (şehirde o formattan
 *    en az 1 lokasyon varsa şehir kalır)
 *
 * Liste card click → parent'a geri sinyal: haritada o şehre flyTo + panel aç.
 */

import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { getFormatLabel } from "@/lib/formats";
import type { Bolge } from "@/lib/turkiye-sehirler";
import type { SehirFeature } from "./EnvanterMap";

const BOLGELER: Bolge[] = [
  "Marmara",
  "Ege",
  "Akdeniz",
  "İç Anadolu",
  "Karadeniz",
  "Doğu Anadolu",
  "Güneydoğu Anadolu",
];

export type Filters = {
  query: string;
  bolgeler: Set<Bolge>;
  formatlar: Set<string>;
};

type Props = {
  allFeatures: SehirFeature[];
  filteredFeatures: SehirFeature[];
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  onSelectSehir: (f: SehirFeature) => void;
  selectedSehir: string | null;
  /**
   * `desktop` (default) — viewport >= md'de sabit sol kenar paneli olarak gözükür.
   * `mobile` — parent container kontrol eder (örn. bottom-sheet wrapper); component
   * her viewport'ta tüm yüksekliği kaplayacak şekilde render olur.
   */
  variant?: "desktop" | "mobile";
};

// TR locale title-case
function titleCase(input: string): string {
  return input
    .toLocaleLowerCase("tr")
    .split(" ")
    .map((w) => w.charAt(0).toLocaleUpperCase("tr") + w.slice(1))
    .join(" ");
}

function formatNumber(n: number): string {
  return n.toLocaleString("tr-TR");
}

export default function EnvanterSidebar({
  allFeatures,
  filteredFeatures,
  filters,
  onFiltersChange,
  onSelectSehir,
  selectedSehir,
  variant = "desktop",
}: Props) {
  // Format listesi: envanterde fiilen var olan formatlar (UI temiz dursun)
  const availableFormats = useMemo(() => {
    const set = new Set<string>();
    for (const f of allFeatures) {
      for (const fmt of f.formatlar) set.add(fmt.format);
    }
    return Array.from(set).sort();
  }, [allFeatures]);

  const filterActive =
    filters.query.length > 0 ||
    filters.bolgeler.size > 0 ||
    filters.formatlar.size > 0;

  const toggleBolge = (b: Bolge) => {
    const next = new Set(filters.bolgeler);
    if (next.has(b)) next.delete(b);
    else next.add(b);
    onFiltersChange({ ...filters, bolgeler: next });
  };

  const toggleFormat = (fmt: string) => {
    const next = new Set(filters.formatlar);
    if (next.has(fmt)) next.delete(fmt);
    else next.add(fmt);
    onFiltersChange({ ...filters, formatlar: next });
  };

  const resetFilters = () => {
    onFiltersChange({
      query: "",
      bolgeler: new Set(),
      formatlar: new Set(),
    });
  };

  const rootClass =
    variant === "desktop"
      ? "hidden md:flex w-[340px] shrink-0 flex-col border-r border-slate-200 bg-white"
      : "flex h-full w-full flex-col bg-white";

  return (
    <aside className={rootClass}>
      {/* Search */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filters.query}
            onChange={(e) =>
              onFiltersChange({ ...filters, query: e.target.value })
            }
            placeholder="Şehir ara..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-9 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
          {filters.query && (
            <button
              onClick={() =>
                onFiltersChange({ ...filters, query: "" })
              }
              aria-label="Aramayı temizle"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filtre: bölge */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            Bölge
          </h3>
          {filters.bolgeler.size > 0 && (
            <button
              onClick={() =>
                onFiltersChange({ ...filters, bolgeler: new Set() })
              }
              className="text-xs text-teal-700 hover:text-teal-800"
            >
              Temizle
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {BOLGELER.map((b) => {
            const active = filters.bolgeler.has(b);
            return (
              <button
                key={b}
                onClick={() => toggleBolge(b)}
                className={
                  active
                    ? "px-2.5 py-1 rounded-full text-xs font-medium bg-teal-700 text-white"
                    : "px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtre: format */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            Format
          </h3>
          {filters.formatlar.size > 0 && (
            <button
              onClick={() =>
                onFiltersChange({ ...filters, formatlar: new Set() })
              }
              className="text-xs text-teal-700 hover:text-teal-800"
            >
              Temizle
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {availableFormats.map((fmt) => {
            const label = getFormatLabel(fmt);
            const active = filters.formatlar.has(fmt);
            return (
              <button
                key={fmt}
                onClick={() => toggleFormat(fmt)}
                className={
                  active
                    ? "px-2.5 py-1 rounded-full text-xs font-medium bg-teal-700 text-white"
                    : "px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonuç sayısı */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          <span className="text-slate-900 font-medium">
            {filteredFeatures.length}
          </span>
          {" / "}
          {allFeatures.length} şehir
        </span>
        {filterActive && (
          <button
            onClick={resetFilters}
            className="text-xs text-teal-700 hover:text-teal-800 font-medium"
          >
            Tümünü temizle
          </button>
        )}
      </div>

      {/* Liste */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {filteredFeatures.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            Filtreyle eşleşen şehir yok.
          </div>
        ) : (
          <ul>
            {filteredFeatures.map((f) => {
              const isSelected = selectedSehir === f.sehir;
              return (
                <li key={f.sehir}>
                  <button
                    onClick={() => onSelectSehir(f)}
                    className={
                      isSelected
                        ? "w-full text-left px-4 py-3 border-b border-slate-100 bg-teal-50 hover:bg-teal-50"
                        : "w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={
                          isSelected
                            ? "font-semibold text-teal-900"
                            : "font-medium text-slate-900"
                        }
                      >
                        {titleCase(f.sehir)}
                      </span>
                      <span className="text-xs tabular-nums text-slate-500 shrink-0">
                        {f.lokasyon_sayisi} lokasyon
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {formatNumber(f.toplam_yuz)} reklam yüzü •{" "}
                      {f.formatlar.length} format
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
