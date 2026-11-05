/**
 * İL MERKEZLERİ — her ilin harita üzerindeki ağırlık merkezi (viewBox koordinatı).
 *
 * Kaynak: src/data/tr-il-paths.ts (81 il silueti). Ayrı bir koordinat listesi
 * TUTULMAZ; merkez, silueti örnekleyip alan ağırlıklı (shoelace) hesaplanır.
 * Böylece tr-il-paths ile hero haritası (HeroHarita) hiçbir zaman ayrışmaz.
 *
 * Yalnız sunucu tarafında, modül yüklenirken BİR kez hesaplanır (81 path,
 * ~ms mertebesi); tarayıcıya path verisi gitmez.
 *
 * Path verisi yalnız M / C / L / z komutlarını kullanır (mutlak koordinat) —
 * bu çözümleyici de yalnız onları tanır; başka komut gelirse hata atar ki
 * sessizce yanlış merkez üretilmesin.
 */
import { TR_IL_PATHS } from "@/src/data/tr-il-paths";

export interface IlMerkez {
  x: number;
  y: number;
}

type Nokta = [number, number];

/** Kübik Bézier üzerinde t noktası */
function bezier(p0: Nokta, p1: Nokta, p2: Nokta, p3: Nokta, t: number): Nokta {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
}

/** Path'i alt yollara (kapalı çokgenlere) böler; eğriler 5 noktayla örneklenir. */
function altYollar(d: string): Nokta[][] {
  const tokenler = d.match(/[MCLZz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const yollar: Nokta[][] = [];
  let yol: Nokta[] = [];
  let komut = "";
  let i = 0;
  const sayi = () => Number(tokenler[i++]);
  while (i < tokenler.length) {
    const t = tokenler[i];
    if (/^[MCLZz]$/.test(t)) {
      komut = t;
      i++;
      if (komut === "Z" || komut === "z") {
        if (yol.length >= 3) yollar.push(yol);
        yol = [];
      }
      continue;
    }
    if (komut === "M") {
      if (yol.length >= 3) yollar.push(yol);
      yol = [[sayi(), sayi()]];
      komut = "L"; // M'den sonra gelen çiftler L sayılır (SVG kuralı)
    } else if (komut === "L") {
      yol.push([sayi(), sayi()]);
    } else if (komut === "C") {
      const p0 = yol[yol.length - 1];
      const p1: Nokta = [sayi(), sayi()];
      const p2: Nokta = [sayi(), sayi()];
      const p3: Nokta = [sayi(), sayi()];
      for (let k = 1; k <= 5; k++) yol.push(bezier(p0, p1, p2, p3, k / 5));
    } else {
      throw new Error(`il-merkez: desteklenmeyen path komutu "${komut}"`);
    }
  }
  if (yol.length >= 3) yollar.push(yol);
  return yollar;
}

/** Çokgenin işaretli alanı ve ağırlık merkezi (shoelace) */
function alanVeMerkez(p: Nokta[]): { alan: number; merkez: IlMerkez } {
  let a = 0, cx = 0, cy = 0;
  for (let k = 0; k < p.length; k++) {
    const [x0, y0] = p[k];
    const [x1, y1] = p[(k + 1) % p.length];
    const c = x0 * y1 - x1 * y0;
    a += c;
    cx += (x0 + x1) * c;
    cy += (y0 + y1) * c;
  }
  a /= 2;
  if (Math.abs(a) < 1e-9) return { alan: 0, merkez: { x: p[0][0], y: p[0][1] } };
  return { alan: Math.abs(a), merkez: { x: cx / (6 * a), y: cy / (6 * a) } };
}

/** Ada/parça varsa EN BÜYÜK parçanın merkezi — nokta anakarada kalsın (Çanakkale, Balıkesir). */
function ilMerkeziHesapla(d: string): IlMerkez {
  let enBuyuk = { alan: -1, merkez: { x: 0, y: 0 } };
  for (const yol of altYollar(d)) {
    const s = alanVeMerkez(yol);
    if (s.alan > enBuyuk.alan) enBuyuk = s;
  }
  return { x: Math.round(enBuyuk.merkez.x * 10) / 10, y: Math.round(enBuyuk.merkez.y * 10) / 10 };
}

const MERKEZLER: ReadonlyMap<string, IlMerkez> = new Map(
  TR_IL_PATHS.map((il) => [il.id, ilMerkeziHesapla(il.d)])
);

/** Slug (slugifyTr) → merkez; siluet yoksa undefined (check-envanter bunu yakalar). */
export function ilMerkezi(slug: string): IlMerkez | undefined {
  return MERKEZLER.get(slug);
}
