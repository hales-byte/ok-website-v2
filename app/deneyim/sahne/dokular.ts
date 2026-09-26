/**
 * Kodla çizilen dokular (canvas → three.js). Dış görsel/model YOK.
 * Ünite yüzeyleri marka kuralı: yalnız beyaz zemin + cyan chevron; yazı/logo yok.
 */
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from "three";

/** Marka kiti cyan ailesi (globals.css token'larıyla aynı değerler) */
export const RENK = {
  cyan: "#00D2FF",
  cyanMid: "#38C7FA",
  cyanSoft: "#7CE2FF",
  cyanPale: "#C8F3FF",
  ink: "#0A1220",
  beyaz: "#FFFFFF",
} as const;

/** Tekrarlanabilir rastgele sayı (ekran görüntüleri her seferinde aynı çıksın) */
export function tohumluRastgele(tohum: number) {
  let a = tohum >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tuval(en: number, boy: number) {
  const c = document.createElement("canvas");
  c.width = en;
  c.height = boy;
  const g = c.getContext("2d");
  if (!g) throw new Error("2d bağlamı yok");
  return { c, g };
}

function doku(c: HTMLCanvasElement, srgb = true): CanvasTexture {
  const t = new CanvasTexture(c);
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** ">" biçimli tek chevron: (x,y) sol-orta, w uç uzunluğu, h yarı yükseklik, k kalınlık */
function chevron(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, k: number) {
  g.beginPath();
  g.moveTo(x, y - h);
  g.lineTo(x + k, y - h);
  g.lineTo(x + k + w, y);
  g.lineTo(x + k, y + h);
  g.lineTo(x, y + h);
  g.lineTo(x + w, y);
  g.closePath();
  g.fill();
}

const CHEVRON_RENKLERI = [RENK.cyanPale, RENK.cyanSoft, RENK.cyanSoft, RENK.cyanMid, RENK.cyanMid, RENK.cyan, RENK.cyan];

/** Soldan sağa açıktan koyu cyan'a chevron dizisi (logo ritmi) */
function chevronDizisi(g: CanvasRenderingContext2D, cx: number, cy: number, genislik: number, adet: number, alfa = 1) {
  const adim = genislik / (adet + 0.6);
  const h = adim * 0.95;
  const w = adim * 0.62;
  const k = adim * 0.42;
  const x0 = cx - genislik / 2;
  g.globalAlpha = alfa;
  for (let i = 0; i < adet; i++) {
    g.fillStyle = CHEVRON_RENKLERI[Math.round((i / Math.max(1, adet - 1)) * (CHEVRON_RENKLERI.length - 1))];
    chevron(g, x0 + i * adim, cy, w, h, k);
  }
  g.globalAlpha = 1;
}

/** Statik ünite yüzü: beyaz zemin + ortada chevron dizisi + ince cyan alt çizgi */
export function yuzDokusu(en: number, boy: number): Texture {
  const W = 1024;
  const H = Math.round((W * boy) / en);
  const { c, g } = tuval(W, H);
  g.fillStyle = RENK.beyaz;
  g.fillRect(0, 0, W, H);
  const dikey = H > W;
  const adet = dikey ? 4 : 7;
  chevronDizisi(g, W / 2, H * (dikey ? 0.46 : 0.5), W * (dikey ? 0.74 : 0.7), adet);
  g.fillStyle = RENK.cyan;
  g.fillRect(W * 0.08, H * 0.86, W * 0.84, Math.max(4, H * 0.012));
  return doku(c);
}

/** İçeriği değişen LED ekran — üç kompozisyon arasında yumuşak geçiş */
export class LedEkran {
  readonly doku: CanvasTexture;
  private readonly g: CanvasRenderingContext2D;
  private readonly W = 512;
  private readonly H = 320;

  constructor() {
    const { c, g } = tuval(this.W, this.H);
    this.g = g;
    this.doku = doku(c);
    this.guncelle(0);
  }

  private kaydiran(t: number, alfa: number) {
    const { g, W, H } = this;
    const adim = 70;
    const kay = (t * 90) % adim;
    g.globalAlpha = alfa;
    for (let i = -1; i < W / adim + 1; i++) {
      const x = i * adim + kay;
      const oran = Math.min(1, Math.max(0, x / W));
      g.fillStyle = CHEVRON_RENKLERI[Math.round(oran * (CHEVRON_RENKLERI.length - 1))];
      chevron(g, x, H / 2, 34, 62, 26);
    }
    g.globalAlpha = 1;
  }

  private tekChevron(t: number, alfa: number) {
    const { g, W, H } = this;
    const nabiz = 1 + Math.sin(t * 3) * 0.06;
    g.globalAlpha = alfa * 0.25;
    g.fillStyle = RENK.cyanPale;
    chevron(g, W / 2 - 150 * nabiz, H / 2, 130 * nabiz, 150 * nabiz, 70 * nabiz);
    g.globalAlpha = alfa;
    g.fillStyle = RENK.cyan;
    chevron(g, W / 2 - 60 * nabiz, H / 2, 80 * nabiz, 92 * nabiz, 44 * nabiz);
    g.globalAlpha = 1;
  }

  private dalga(t: number, alfa: number) {
    const { g } = this;
    for (let sat = 0; sat < 4; sat++) {
      for (let sut = 0; sut < 9; sut++) {
        const faz = Math.sin(t * 2.4 - sut * 0.6 + sat * 0.4) * 0.5 + 0.5;
        g.globalAlpha = alfa * (0.2 + faz * 0.8);
        g.fillStyle = faz > 0.6 ? RENK.cyan : RENK.cyanSoft;
        chevron(g, 28 + sut * 54, 52 + sat * 72, 18, 24, 14);
      }
    }
    g.globalAlpha = 1;
  }

  guncelle(t: number) {
    const { g, W, H } = this;
    g.fillStyle = RENK.beyaz;
    g.fillRect(0, 0, W, H);
    const SURE = 3.4;
    const GECIS = 0.6;
    const cizimler = [this.kaydiran, this.tekChevron, this.dalga];
    const i = Math.floor(t / SURE) % cizimler.length;
    const yerel = t % SURE;
    const a = yerel > SURE - GECIS ? (yerel - (SURE - GECIS)) / GECIS : 0;
    cizimler[i].call(this, t, 1 - a);
    if (a > 0) cizimler[(i + 1) % cizimler.length].call(this, t, a);
    this.doku.needsUpdate = true;
  }
}

/**
 * Bina cephesi: `renk` gündüz görünen cephe + camlar, `isik` gece yanan
 * pencereler (emissive maske). 4 sütun × 4 kat bir karo; UV ile tekrar eder.
 */
export function cepheDokulari(tohum: number) {
  const rnd = tohumluRastgele(tohum);
  const W = 256;
  const renk = tuval(W, W);
  const isik = tuval(W, W);
  const tonlar = ["#E9DCC8", "#D9C3A5", "#C9CDD2", "#E4E1DA", "#B98E73", "#D6D0C4"];
  renk.g.fillStyle = tonlar[Math.floor(rnd() * tonlar.length)];
  renk.g.fillRect(0, 0, W, W);
  isik.g.fillStyle = "#000000";
  isik.g.fillRect(0, 0, W, W);
  const hucre = W / 4;
  renk.g.fillStyle = "rgba(0,0,0,0.07)";
  for (let sat = 0; sat < 4; sat++) renk.g.fillRect(0, sat * hucre + hucre * 0.86, W, hucre * 0.08);
  for (let sat = 0; sat < 4; sat++) {
    for (let sut = 0; sut < 4; sut++) {
      const x = sut * hucre + hucre * 0.2;
      const y = sat * hucre + hucre * 0.22;
      const w = hucre * 0.6;
      const h = hucre * 0.56;
      const cam = 0.55 + rnd() * 0.25;
      renk.g.fillStyle = `rgb(${Math.round(70 * cam)},${Math.round(98 * cam)},${Math.round(122 * cam)})`;
      renk.g.fillRect(x, y, w, h);
      if (rnd() < 0.3) {
        isik.g.fillStyle = rnd() < 0.8 ? "#FFD9A0" : "#CFE8FF";
        isik.g.fillRect(x, y, w, h);
      }
    }
  }
  const tekrar = (t: CanvasTexture) => {
    t.wrapS = RepeatWrapping;
    t.wrapT = RepeatWrapping;
    return t;
  };
  return { renk: tekrar(doku(renk.c)), isik: tekrar(doku(isik.c)) };
}

/** Asfalt: şerit çizgili, x ekseni boyunca tekrar eder */
export function asfaltDokusu(): Texture {
  const { c, g } = tuval(512, 256);
  g.fillStyle = "#3B4047";
  g.fillRect(0, 0, 512, 256);
  const rnd = tohumluRastgele(7);
  for (let i = 0; i < 2600; i++) {
    const v = 50 + Math.floor(rnd() * 22);
    g.fillStyle = `rgb(${v},${v + 3},${v + 8})`;
    g.fillRect(rnd() * 512, rnd() * 256, 2, 2);
  }
  g.fillStyle = "#E9EDF1";
  g.fillRect(0, 10, 512, 5);
  g.fillRect(0, 241, 512, 5);
  for (let x = 0; x < 512; x += 128) g.fillRect(x + 20, 125, 70, 6);
  const t = doku(c);
  t.wrapS = RepeatWrapping;
  return t;
}

/** Kaldırım taşı: açık gri karo */
export function kaldirimDokusu(): Texture {
  const { c, g } = tuval(128, 128);
  g.fillStyle = "#C9CED4";
  g.fillRect(0, 0, 128, 128);
  g.strokeStyle = "#B4BAC1";
  g.lineWidth = 3;
  g.strokeRect(0, 0, 64, 64);
  g.strokeRect(64, 64, 64, 64);
  g.strokeRect(64, 0, 64, 64);
  g.strokeRect(0, 64, 64, 64);
  const t = doku(c);
  t.wrapS = RepeatWrapping;
  t.wrapT = RepeatWrapping;
  return t;
}

/** Işıklı panoların arkasındaki yumuşak hale (merkez beyaz → kenar saydam) */
export function haleDokusu(): Texture {
  const { c, g } = tuval(256, 256);
  const r = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  r.addColorStop(0, "rgba(255,255,255,0.7)");
  r.addColorStop(0.3, "rgba(200,243,255,0.32)");
  r.addColorStop(0.65, "rgba(200,243,255,0.08)");
  r.addColorStop(1, "rgba(200,243,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  return doku(c);
}
