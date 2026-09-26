/**
 * Türkiye silueti — sunucu bileşeni, JS yok. Kaynak: src/data/tr-il-paths.ts.
 * Envanterde bulunan iller cyan, diğerleri koyu ton. Koordinatlar derleme anında
 * 1 ondalığa yuvarlanır (HTML ağırlığı düşsün; bu ölçekte fark görünmez).
 */
import { TR_IL_PATHS, TR_HARITA_VIEWBOX } from "@/src/data/tr-il-paths";
import { getIller, slugifyTr } from "@/src/data/envanter";

const yuvarla = (d: string) => d.replace(/-?\d+\.\d+/g, (s) => String(Math.round(Number(s) * 10) / 10));

export function TurkiyeSiluet({ aciklama }: { aciklama: string }) {
  const envanterde = new Set(getIller().map((i) => slugifyTr(i.il)));
  return (
    <svg viewBox={TR_HARITA_VIEWBOX} role="img" aria-label={aciklama} className="w-full h-auto">
      {TR_IL_PATHS.map((p) => (
        <path
          key={p.id}
          d={yuvarla(p.d)}
          fill={envanterde.has(p.id) ? "#00D2FF" : "#1C2A40"}
          fillOpacity={envanterde.has(p.id) ? 0.85 : 1}
          stroke="#0A1220"
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}
