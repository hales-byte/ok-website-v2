"use client";

/**
 * EnvanterMap — /envanter sayfasının ana harita bileşeni.
 *
 * Faz 2.1 ✓: Base map (Türkiye merkezli, default Mapbox Light).
 * Faz 2.3 ✓: Şehir-bazlı agregasyon, lokasyon sayısı interpolate radius.
 * Faz 2.5 ✓: Sol sidebar (search + bölge/format filtre + liste).
 * Faz 2.6 ✓: Click → flyTo + sağdan slide-in detay paneli.
 * Faz 2.7 ✓: Mobile bottom-sheet (FAB + drawer).
 *
 * NOT: react-map-gl@8'de uncontrolled mode (initialViewState) tercih edildi.
 * State-driven viewState dev server'da bazı durumlarda mount sırasında map'in
 * style/tile fetch'ini başlatmamasına yol açabiliyor. flyTo ref üzerinden
 * çalışıyor; controlled mode'a ihtiyaç yok.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapboxMap, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  type LayerProps,
  type MapMouseEvent,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { SlidersHorizontal, X } from "lucide-react";
import SehirDetayPanel from "./SehirDetayPanel";
import EnvanterSidebar, { type Filters } from "./EnvanterSidebar";
import { getSehirBolge } from "@/lib/sehir-koordinatlari";

const TR_CENTER = { latitude: 39.0, longitude: 35.0 };
const INITIAL_ZOOM = 5.3;

const TR_MAX_BOUNDS: [[number, number], [number, number]] = [
  [22.0, 34.0],
  [48.0, 43.5],
];

// Mapbox stil URL'i. Mapbox Studio'da custom style hazırlandıysa
// `.env.local`'a NEXT_PUBLIC_MAPBOX_STYLE_URL=mapbox://styles/<user>/<style-id>
// olarak eklenir; tanımlı değilse default Light v11 kullanılır.
const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ||
  "mapbox://styles/mapbox/light-v11";

const PIN_COLOR = "#0F766E"; // brand teal

const SEHIRLER_LAYER: LayerProps = {
  id: "envanter-sehirler",
  type: "circle",
  source: "envanter",
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["get", "lokasyon_sayisi"],
      1, 7,
      5, 12,
      18, 22,
      50, 30,
    ],
    "circle-color": PIN_COLOR,
    "circle-stroke-color": "#FFFFFF",
    "circle-stroke-width": 2,
    "circle-opacity": 0.9,
  },
};

const SEHIRLER_LABEL_LAYER: LayerProps = {
  id: "envanter-sehirler-label",
  type: "symbol",
  source: "envanter",
  layout: {
    "text-field": ["to-string", ["get", "lokasyon_sayisi"]],
    "text-size": 11,
    "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
    "text-allow-overlap": true,
    "text-ignore-placement": true,
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": PIN_COLOR,
    "text-halo-width": 0.5,
  },
};

export type SehirFeature = {
  sehir: string;
  lng: number;
  lat: number;
  lokasyon_sayisi: number;
  toplam_yuz: number;
  formatlar: { format: string; count: number; yuz: number }[];
  uniteler: Array<{
    unite: string;
    format: string;
    toplam_face: number;
    birim_fiyat: number | null;
    donem: string | null;
  }>;
};

type Props = {
  features: SehirFeature[];
  toplamLokasyon: number;
  /** Şu an UI'da gösterilmiyor, ileride mobile FAB rozetinde kullanılabilir. */
  toplamYuz?: number;
};

function formatNumber(n: number): string {
  return n.toLocaleString("tr-TR");
}

const INITIAL_FILTERS: Filters = {
  query: "",
  bolgeler: new Set(),
  formatlar: new Set(),
};

/** Filtreleri features'a uygular. Boş set = "filtre yok" anlamına gelir. */
function applyFilters(
  features: SehirFeature[],
  filters: Filters
): SehirFeature[] {
  const q = filters.query.trim().toLocaleLowerCase("tr");

  return features.filter((f) => {
    if (q) {
      const sehirL = f.sehir.toLocaleLowerCase("tr");
      if (!sehirL.includes(q)) return false;
    }
    if (filters.bolgeler.size > 0) {
      const b = getSehirBolge(f.sehir);
      if (!b || !filters.bolgeler.has(b)) return false;
    }
    if (filters.formatlar.size > 0) {
      const hasAny = f.formatlar.some((x) => filters.formatlar.has(x.format));
      if (!hasAny) return false;
    }
    return true;
  });
}

export default function EnvanterMap({
  features,
  toplamLokasyon,
}: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<MapRef | null>(null);

  const [selectedSehir, setSelectedSehir] = useState<SehirFeature | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const filteredFeatures = useMemo(
    () => applyFilters(features, filters),
    [features, filters]
  );

  const featureBySehir = useMemo(() => {
    const m = new Map<string, SehirFeature>();
    for (const f of features) m.set(f.sehir, f);
    return m;
  }, [features]);

  const flyToSehir = useCallback((target: SehirFeature) => {
    mapRef.current?.flyTo({
      center: [target.lng, target.lat],
      zoom: 8,
      duration: 900,
      essential: true,
    });
  }, []);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const f = e.features?.[0];
      if (!f) return;
      const sehir = f.properties?.sehir as string | undefined;
      if (!sehir) return;
      const target = featureBySehir.get(sehir);
      if (!target) return;
      setSelectedSehir(target);
      flyToSehir(target);
    },
    [featureBySehir, flyToSehir]
  );

  // Pin üzerindeyken cursor: pointer. State değil, direkt canvas style ile —
  // React re-render fırtınası olmaz, Mapbox'ın style fetch'ini etkilemez.
  const handleMouseEnter = useCallback(() => {
    const canvas = mapRef.current?.getMap?.()?.getCanvas?.();
    if (canvas) canvas.style.cursor = "pointer";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const canvas = mapRef.current?.getMap?.()?.getCanvas?.();
    if (canvas) canvas.style.cursor = "";
  }, []);

  // ESC tuşu: önce detay paneli, yoksa mobile sheet kapat.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selectedSehir) {
        setSelectedSehir(null);
      } else if (mobileSheetOpen) {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedSehir, mobileSheetOpen]);

  // Mobile sheet açıkken body scroll lock — sheet'in altındaki sayfa kayarsa
  // bottom-sheet UX bozulur (Apple Maps de aynı şeyi yapar).
  useEffect(() => {
    if (!mobileSheetOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileSheetOpen]);

  const handleSidebarSelect = useCallback(
    (target: SehirFeature) => {
      setSelectedSehir(target);
      flyToSehir(target);
      setMobileSheetOpen(false);
    },
    [flyToSehir]
  );

  if (!token) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface)] p-8 text-center">
        <div>
          <p className="text-[var(--color-text-primary)] font-medium">
            Harita yüklenemedi.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            Mapbox token tanımlı değil.
          </p>
        </div>
      </div>
    );
  }

  const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: "FeatureCollection",
    features: filteredFeatures.map((f) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [f.lng, f.lat] },
      properties: {
        sehir: f.sehir,
        lokasyon_sayisi: f.lokasyon_sayisi,
        toplam_yuz: f.toplam_yuz,
      },
    })),
  };

  return (
    <div className="flex h-full w-full">
      {/* Sol sidebar (md+ ekranlar) */}
      <EnvanterSidebar
        allFeatures={features}
        filteredFeatures={filteredFeatures}
        filters={filters}
        onFiltersChange={setFilters}
        onSelectSehir={handleSidebarSelect}
        selectedSehir={selectedSehir?.sehir ?? null}
      />

      {/* Harita alanı */}
      <div className="relative flex-1 min-w-0">
        <MapboxMap
          ref={mapRef}
          initialViewState={{
            ...TR_CENTER,
            zoom: INITIAL_ZOOM,
          }}
          mapboxAccessToken={token}
          mapStyle={MAP_STYLE}
          maxBounds={TR_MAX_BOUNDS}
          minZoom={5}
          maxZoom={17}
          style={{ width: "100%", height: "100%" }}
          interactiveLayerIds={[SEHIRLER_LAYER.id!]}
          onClick={handleMapClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavigationControl position="top-right" showCompass={false} />
          <ScaleControl position="bottom-right" unit="metric" />

          <Source id="envanter" type="geojson" data={geojson}>
            <Layer {...SEHIRLER_LAYER} />
            <Layer {...SEHIRLER_LABEL_LAYER} />
          </Source>
        </MapboxMap>

        {/* Mobile: filtre/liste butonu (sol-üst FAB). */}
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="md:hidden absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm border border-slate-200/80 hover:bg-white"
          aria-label="Filtre ve liste panelini aç"
        >
          <SlidersHorizontal size={14} />
          <span>{filteredFeatures.length} şehir</span>
          <span className="text-slate-300">·</span>
          <span>{formatNumber(toplamLokasyon)} lokasyon</span>
        </button>

        {/* Mobile sheet */}
        {mobileSheetOpen && (
          <div className="md:hidden fixed inset-0 z-30">
            <div
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setMobileSheetOpen(false)}
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 top-12 bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
              <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-900">
                  Filtre & Liste
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileSheetOpen(false)}
                  aria-label="Kapat"
                  className="p-2 -mr-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </header>
              <div className="flex-1 min-h-0">
                <EnvanterSidebar
                  variant="mobile"
                  allFeatures={features}
                  filteredFeatures={filteredFeatures}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onSelectSehir={handleSidebarSelect}
                  selectedSehir={selectedSehir?.sehir ?? null}
                />
              </div>
            </div>
          </div>
        )}

        {/* Yan panel — şehir seçildiğinde */}
        {selectedSehir && (
          <SehirDetayPanel
            feature={selectedSehir}
            onClose={() => setSelectedSehir(null)}
          />
        )}
      </div>
    </div>
  );
}
