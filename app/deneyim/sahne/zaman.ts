/**
 * Anahtar kareler: kamera yolu + günün saati (ışık, gök, parlaklıklar).
 * Sıra sayfadaki bölümlerle aynı: 0 giriş (şafak) · 1 sabah · 2 gün · 3 gece · 4 final.
 */
import { CatmullRomCurve3, Color, Vector3 } from "three";

const v = (x: number, y: number, z: number) => new Vector3(x, y, z);

export const KAMERA_KONUM = new CatmullRomCurve3(
  [v(-34, 7.5, -1.2), v(-4.6, 1.75, -0.4), v(19.5, 2.4, -3.4), v(55.8, 2.5, -2.8), v(30, 62, -150)],
  false,
  "centripetal"
);
export const KAMERA_HEDEF = new CatmullRomCurve3(
  [v(6, 3.2, 4), v(-1.6, 1.45, 5.6), v(31, 6.4, 11.5), v(65, 4.4, 9), v(44, 16, 70)],
  false,
  "centripetal"
);

type Kare = {
  gokUst: string;
  gokUfuk: string;
  gunesRenk: string;
  gunesGuc: number;
  /** güneş yüksekliği (derece) ve yönü (derece, +x = doğu) */
  gunesYukseklik: number;
  gunesYon: number;
  hemiGuc: number;
  /** pencereler + sokak lambaları */
  sehirIsik: number;
  /** panoların kendi parlaklığı: gündüz beyazın gri görünmemesi için hafif, gece arkadan aydınlatma */
  panoIsik: number;
  led: number;
  /** billboard projektörü */
  projektor: number;
  bloom: number;
  yildiz: number;
  sisUzak: number;
  pozlama: number;
};

const KARELER: Kare[] = [
  { gokUst: "#5B7DB6", gokUfuk: "#F6B889", gunesRenk: "#FFB070", gunesGuc: 1.6, gunesYukseklik: 6, gunesYon: 12, hemiGuc: 0.5, sehirIsik: 0.35, panoIsik: 0.4, led: 0.7, projektor: 0.35, bloom: 0.2, yildiz: 0.2, sisUzak: 300, pozlama: 1.0 },
  { gokUst: "#6FA9E4", gokUfuk: "#F7DDBE", gunesRenk: "#FFD9A8", gunesGuc: 2.9, gunesYukseklik: 32, gunesYon: 40, hemiGuc: 0.85, sehirIsik: 0.04, panoIsik: 0.08, led: 0.7, projektor: 0, bloom: 0.08, yildiz: 0, sisUzak: 360, pozlama: 1.0 },
  { gokUst: "#3587D8", gokUfuk: "#CFE6F6", gunesRenk: "#FFFFFF", gunesGuc: 3.2, gunesYukseklik: 58, gunesYon: 95, hemiGuc: 0.95, sehirIsik: 0, panoIsik: 0.12, led: 0.75, projektor: 0, bloom: 0.06, yildiz: 0, sisUzak: 420, pozlama: 1.0 },
  { gokUst: "#050A18", gokUfuk: "#172641", gunesRenk: "#9DB4FF", gunesGuc: 0.3, gunesYukseklik: 40, gunesYon: 140, hemiGuc: 0.14, sehirIsik: 1.0, panoIsik: 0.62, led: 0.8, projektor: 1, bloom: 0.3, yildiz: 0.9, sisUzak: 260, pozlama: 1.0 },
  { gokUst: "#03060F", gokUfuk: "#0E1A30", gunesRenk: "#9DB4FF", gunesGuc: 0.25, gunesYukseklik: 50, gunesYon: 140, hemiGuc: 0.12, sehirIsik: 1.0, panoIsik: 0.62, led: 0.8, projektor: 1, bloom: 0.34, yildiz: 1, sisUzak: 520, pozlama: 1.0 },
];

export const KARE_SAYISI = KARELER.length;

export type ZamanDegerleri = Omit<Kare, "gokUst" | "gokUfuk" | "gunesRenk"> & {
  gokUst: Color;
  gokUfuk: Color;
  gunesRenk: Color;
};

const sayisal = [
  "gunesGuc", "gunesYukseklik", "gunesYon", "hemiGuc", "sehirIsik", "panoIsik",
  "led", "projektor", "bloom", "yildiz", "sisUzak", "pozlama",
] as const;

const cikti: ZamanDegerleri = {
  ...KARELER[0],
  gokUst: new Color(),
  gokUfuk: new Color(),
  gunesRenk: new Color(),
};
const ca = new Color();
const cb = new Color();

/** u: 0…(KARE_SAYISI-1) arası sürekli değer — iki kare arasında doğrusal karışım */
export function zamanDegerleri(u: number): ZamanDegerleri {
  const i = Math.min(KARE_SAYISI - 2, Math.max(0, Math.floor(u)));
  const t = Math.min(1, Math.max(0, u - i));
  const a = KARELER[i];
  const b = KARELER[i + 1];
  for (const k of sayisal) cikti[k] = a[k] + (b[k] - a[k]) * t;
  cikti.gokUst.copy(ca.set(a.gokUst)).lerp(cb.set(b.gokUst), t);
  cikti.gokUfuk.copy(ca.set(a.gokUfuk)).lerp(cb.set(b.gokUfuk), t);
  cikti.gunesRenk.copy(ca.set(a.gunesRenk)).lerp(cb.set(b.gunesRenk), t);
  return cikti;
}

/**
 * Kaydırma (0…1) → anahtar kare ekseni (0…4). `durak` dizisi her bölümün
 * ortasının geldiği kaydırma oranıdır (DOM'dan ölçülür). İki durak arasında
 * önce kısa bir bekleme, sonra yumuşak geçiş olur → metin okunurken sahne sabit.
 */
export function kaydirmadanKare(p: number, durak: number[]): number {
  if (p <= durak[0]) return 0;
  const son = durak.length - 1;
  if (p >= durak[son]) return son;
  let i = 0;
  while (i < son - 1 && p > durak[i + 1]) i++;
  const yerel = (p - durak[i]) / (durak[i + 1] - durak[i]);
  const e = Math.min(1, Math.max(0, (yerel - 0.18) / 0.64));
  return i + e * e * (3 - 2 * e);
}

/**
 * Sol taraftaki metin kartı üniteyi örtmesin diye görüntünün sağa kayma oranı
 * (ekran genişliğine göre). Finalde kart ortada → kayma yok.
 */
const KART_KAYMASI = [0.14, 0.17, 0.15, 0.19, 0];
export function kartKaymasi(u: number): number {
  const i = Math.min(KARE_SAYISI - 2, Math.max(0, Math.floor(u)));
  const t = Math.min(1, Math.max(0, u - i));
  return KART_KAYMASI[i] + (KART_KAYMASI[i + 1] - KART_KAYMASI[i]) * t;
}
