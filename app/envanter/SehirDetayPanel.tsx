"use client";

/**
 * Bir şehir pin'ine tıklandığında sağdan açılan detay paneli.
 * Apple Maps tarzı: rounded card, beyaz backdrop, smooth slide-in.
 *
 * Faz 2.5/2.6'nın bir kısmı burada karşılanıyor — şehir-bazlı agregasyon
 * tercih ettiğimiz için "tek lokasyonun detay kartı" yerine "şehir özeti"
 * gösteriyoruz.
 */

import { X, MapPin, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFormatLabel } from "@/lib/formats";
import type { SehirFeature } from "./EnvanterMap";

type Props = {
  feature: SehirFeature;
  onClose: () => void;
};

// Şehir adını UI için title-case'e dönüştür (TR locale).
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

export default function SehirDetayPanel({ feature, onClose }: Props) {
  const sehirAdi = titleCase(feature.sehir);

  // Formatları yüze göre azalan sırala
  const formatlarSorted = [...feature.formatlar].sort((a, b) => b.yuz - a.yuz);
  const enYogunFormat = formatlarSorted[0];

  // formatlar.map içinde meta artık kullanılmıyor; getFormatLabel helper'ı yeterli

  return (
    <aside
      role="dialog"
      aria-label={`${sehirAdi} envanter detayı`}
      className="pointer-events-auto absolute inset-2 md:left-auto md:right-4 md:top-4 md:bottom-4 md:w-[360px] md:max-w-[calc(100vw-2rem)] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden animate-in slide-in-from-right-2 fade-in duration-200"
    >
      {/* Header */}
      <header className="flex items-start justify-between p-5 border-b border-slate-100">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
            <MapPin size={12} />
            Şehir
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900 truncate">
            {sehirAdi}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Paneli kapat"
          className="shrink-0 -mt-1 -mr-1 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
        >
          <X size={18} />
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 p-5 pb-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500 font-medium">Lokasyon</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {formatNumber(feature.lokasyon_sayisi)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500 font-medium">Reklam yüzü</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {formatNumber(feature.toplam_yuz)}
          </div>
        </div>
      </div>

      {/* Format dağılımı */}
      <div className="px-5 pb-4">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">
          Format Dağılımı
        </h3>
        <ul className="space-y-2">
          {formatlarSorted.map((f) => {
            const yuzdePay =
              feature.toplam_yuz > 0
                ? (f.yuz / feature.toplam_yuz) * 100
                : 0;
            return (
              <li key={f.format} className="text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-slate-900 font-medium truncate">
                    {getFormatLabel(f.format)}
                  </span>
                  <span className="text-slate-500 tabular-nums shrink-0">
                    {formatNumber(f.yuz)} yüz
                  </span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-teal-700"
                    style={{ width: `${yuzdePay.toFixed(1)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Üniteler listesi (scrollable) */}
      <div className="flex-1 min-h-0 px-5 pb-4 overflow-y-auto border-t border-slate-100 pt-4">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3 sticky top-0 bg-white pb-1">
          Üniteler ({feature.uniteler.length})
        </h3>
        <ul className="space-y-2 text-sm">
          {feature.uniteler.map((u, i) => (
            <li
              key={i}
              className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0"
            >
              <Package
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />
              <div className="min-w-0 flex-1">
                <div className="text-slate-900 truncate">
                  {u.unite || (
                    <span className="italic text-slate-400">İsimsiz</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {getFormatLabel(u.format)} •{" "}
                  {formatNumber(u.toplam_face)} yüz
                  {u.donem ? ` • ${u.donem}` : ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <footer className="p-4 border-t border-slate-100 bg-slate-50/50">
        <Link
          href={`/teklif-al?sehir=${encodeURIComponent(feature.sehir)}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-3 transition-colors"
        >
          {sehirAdi} için teklif al
          <ArrowRight size={16} />
        </Link>
        {enYogunFormat && (
          <p className="mt-2 text-xs text-center text-slate-500">
            En yoğun format:{" "}
            <span className="text-slate-700 font-medium">
              {getFormatLabel(enYogunFormat.format)}
            </span>
          </p>
        )}
      </footer>
    </aside>
  );
}
