/**
 * Reklam üniteleri — yalnız basit geometri (kutu, silindir, düzlem).
 * Yüzey kuralı: beyaz zemin + cyan chevron (dokular.ts); yazı/logo yok.
 * Konumlar metre; cadde x ekseni boyunca, kuzey kaldırımı z ≈ 4…7.
 */
import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  SpotLight,
  Color,
  AdditiveBlending,
  MeshBasicMaterial,
  type Texture,
} from "three";
import { LedEkran, haleDokusu, yuzDokusu } from "./dokular";

const METAL = new MeshStandardMaterial({ color: "#2B3440", roughness: 0.55, metalness: 0.6 });
const METAL_ACIK = new MeshStandardMaterial({ color: "#8A95A3", roughness: 0.5, metalness: 0.5 });

function golgeli<T extends Mesh>(m: T): T {
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Işıklı/ışıksız yüz malzemesi — emissiveIntensity zaman ayarıyla değişir */
function yuzMalzemesi(map: Texture) {
  return new MeshStandardMaterial({
    map,
    emissiveMap: map,
    emissive: new Color("#FFFFFF"),
    emissiveIntensity: 0,
    roughness: 0.42,
    metalness: 0,
  });
}

/** Gece hale malzemesi — tek doku, tüm ışıklı panolar paylaşır; opaklık zaman ayarından */
const HALE = new MeshBasicMaterial({
  map: null,
  color: "#D8F4FF",
  transparent: true,
  opacity: 0,
  blending: AdditiveBlending,
  depthWrite: false,
});

/** Çerçeveli pano: yüzü +z'ye bakar (grup.lookAt ile kameraya çevrilir). hale → arkasında gece ışığı */
function pano(en: number, boy: number, malzeme: MeshStandardMaterial, derinlik = 0.18, hale = false) {
  const g = new Group();
  const kasa = golgeli(new Mesh(new BoxGeometry(en + 0.14, boy + 0.14, derinlik), METAL));
  const yuz = new Mesh(new PlaneGeometry(en, boy), malzeme);
  yuz.position.z = derinlik / 2 + 0.004;
  g.add(kasa, yuz);
  if (hale) {
    const h = new Mesh(new PlaneGeometry(en * 1.6, boy * 1.8), HALE);
    h.position.z = -derinlik / 2 - 0.05;
    h.renderOrder = -1;
    g.add(h);
  }
  return g;
}

function direk(x: number, z: number, boy: number, r = 0.08, malzeme = METAL) {
  const m = golgeli(new Mesh(new CylinderGeometry(r, r * 1.15, boy, 14), malzeme));
  m.position.set(x, boy / 2, z);
  return m;
}

/** Kameranın yere izdüşümüne bakacak şekilde (dik kalarak) döndür */
function bak(g: Group, x: number, z: number) {
  g.lookAt(x, g.position.y, z);
}

export type Uniteler = {
  grup: Group;
  /** Arkadan aydınlatmalı yüzeyler (CLP, megalight) */
  arkadanIsikli: MeshStandardMaterial[];
  /** Önden projektörle aydınlanan billboard yüzü */
  billboardYuz: MeshStandardMaterial;
  ledMalzeme: MeshStandardMaterial;
  led: LedEkran;
  projektorMalzeme: MeshStandardMaterial;
  spot: SpotLight;
  noktalar: PointLight[];
  /** Işıklı panoların arkasındaki hale malzemesi (gece opaklığı) */
  hale: MeshBasicMaterial;
};

export function uniteleriKur(): Uniteler {
  HALE.map = haleDokusu();
  const grup = new Group();
  const arkadanIsikli: MeshStandardMaterial[] = [];
  const noktalar: PointLight[] = [];

  /* ── Sahne 1 · Otobüs durağı + CLP/Raket ── */
  const durak = new Group();
  durak.position.set(0.6, 0, 5.8);
  const cati = golgeli(new Mesh(new BoxGeometry(4.4, 0.12, 1.6), METAL));
  cati.position.set(0, 2.45, 0);
  const cam = new Mesh(
    new BoxGeometry(4.1, 1.9, 0.04),
    new MeshStandardMaterial({ color: "#BFE6F2", transparent: true, opacity: 0.28, roughness: 0.1 })
  );
  cam.position.set(0, 1.3, 0.62);
  const bank = golgeli(new Mesh(new BoxGeometry(2.4, 0.08, 0.42), METAL_ACIK));
  bank.position.set(0.3, 0.48, 0.35);
  durak.add(cati, cam, bank);
  for (const [x, z] of [[-2.1, -0.7], [2.1, -0.7], [-2.1, 0.7], [2.1, 0.7]]) durak.add(direk(x, z, 2.45, 0.05));
  // Durakta bekleyen üç kişi ("doğru kitle") — gövde + baş, sade
  const kisiRenk = ["#34495E", "#8E6E53", "#5D6D7E"];
  [[-1.2, 0.1, 0.4], [0.2, 0.55, -0.5], [1.4, -0.1, 2.8]].forEach(([x, z, don], i) => {
    const kisi = new Group();
    const govde = golgeli(new Mesh(new CylinderGeometry(0.2, 0.17, 1.2, 12), new MeshStandardMaterial({ color: kisiRenk[i], roughness: 0.8 })));
    govde.position.y = 0.76;
    const bacak = golgeli(new Mesh(new CylinderGeometry(0.15, 0.12, 0.6, 10), METAL));
    bacak.position.y = 0.3;
    const bas = golgeli(new Mesh(new CylinderGeometry(0.12, 0.12, 0.26, 12), new MeshStandardMaterial({ color: "#C9A58A", roughness: 0.7 })));
    bas.position.y = 1.52;
    kisi.add(govde, bacak, bas);
    kisi.position.set(x, 0.16, z - 0.2);
    kisi.rotation.y = don;
    durak.add(kisi);
  });
  grup.add(durak);

  const clpMalz = yuzMalzemesi(yuzDokusu(1.18, 1.75));
  arkadanIsikli.push(clpMalz);
  const clp = pano(1.18, 1.75, clpMalz, 0.16, true);
  clp.position.set(-2.3, 1.38, 5.2);
  clp.add(direk(-0.45, 0, 0.5, 0.04).translateY(-1.13), direk(0.45, 0, 0.5, 0.04).translateY(-1.13));
  grup.add(clp);
  bak(clp, -4.5, -1.5);

  const clpIsik = new PointLight("#DDF6FF", 0, 7, 2);
  clpIsik.position.set(-2.3, 1.2, 4.4);
  noktalar.push(clpIsik);
  grup.add(clpIsik);

  /* ── Sahne 2 · Billboard (6 × 3 m) ── */
  const billboardYuz = yuzMalzemesi(yuzDokusu(6, 3));
  const bb = pano(6, 3, billboardYuz, 0.35);
  bb.position.set(31, 7.2, 11.5);
  grup.add(bb);
  const bbDirek = direk(31, 11.8, 5.8, 0.28);
  grup.add(bbDirek);
  const podyum = golgeli(new Mesh(new BoxGeometry(6.4, 0.08, 0.7), METAL));
  podyum.position.set(0, -1.62, 0.5);
  bb.add(podyum);
  const projektorMalzeme = new MeshStandardMaterial({ color: "#1E2630", emissive: new Color("#FFF1D6"), emissiveIntensity: 0 });
  for (const x of [-2, 0, 2]) {
    const kol = new Mesh(new BoxGeometry(0.06, 0.06, 0.9), METAL);
    kol.position.set(x, 1.72, 0.5);
    const lamba = new Mesh(new BoxGeometry(0.34, 0.14, 0.22), projektorMalzeme);
    lamba.position.set(x, 1.72, 0.98);
    bb.add(kol, lamba);
  }
  bak(bb, 21, -3);
  const spot = new SpotLight("#FFF1D6", 0, 14, 0.75, 0.5, 1.2);
  spot.position.set(31, 9.6, 9.4);
  spot.target.position.set(31, 6.6, 11.4);
  grup.add(spot, spot.target);

  /* ── Sahne 3 · Megalight + LED ekran ── */
  const mlMalz = yuzMalzemesi(yuzDokusu(3.2, 2.4));
  arkadanIsikli.push(mlMalz);
  const ml = pano(3.2, 2.4, mlMalz, 0.3, true);
  ml.position.set(61.5, 4.4, 8.6);
  grup.add(ml, direk(61.5, 8.7, 3.3, 0.18));
  bak(ml, 55, -2);

  const led = new LedEkran();
  const ledMalzeme = new MeshStandardMaterial({
    map: led.doku,
    emissiveMap: led.doku,
    emissive: new Color("#FFFFFF"),
    emissiveIntensity: 0.6,
    roughness: 0.3,
  });
  const ledPano = pano(4.8, 2.8, ledMalzeme, 0.4, true);
  ledPano.position.set(68.2, 5.1, 10);
  grup.add(ledPano, direk(66.6, 10.1, 3.7, 0.12), direk(69.8, 10.1, 3.7, 0.12));
  bak(ledPano, 58, -3);

  const gIsik = new PointLight("#E6F8FF", 0, 12, 2);
  gIsik.position.set(64.5, 3.2, 6.5);
  noktalar.push(gIsik);
  grup.add(gIsik);

  return { grup, arkadanIsikli, billboardYuz, ledMalzeme, led, projektorMalzeme, spot, noktalar, hale: HALE };
}
