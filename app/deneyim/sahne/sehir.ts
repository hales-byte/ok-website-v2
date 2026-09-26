/**
 * Şehir: cadde, kaldırım, binalar (malzeme başına tek birleşik geometri),
 * ağaçlar ve sokak lambaları (instanced), hareketli arabalar. Yalnız basit geometri.
 */
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { asfaltDokusu, cepheDokulari, kaldirimDokusu, tohumluRastgele } from "./dokular";

/** Ünitelerin önüne ağaç/lamba dikilmesin diye boş bırakılan x aralıkları (kuzey kaldırımı) */
const BOS_X: Array<[number, number]> = [[-5, 4], [26, 36], [53, 79]];
const bosMu = (x: number) => BOS_X.some(([a, b]) => x > a && x < b);

/** Bina kutusu: cephe UV'si metreye göre tekrarlanır, çatı UV'si dokunun düz köşesine sıkıştırılır */
function binaGeometrisi(w: number, h: number, d: number, x: number, z: number) {
  const g = new BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  const KARO = 12; // doku karosu = 4 sütun × 3 m, 4 kat × 3 m
  for (let yuz = 0; yuz < 6; yuz++) {
    const genislik = yuz < 2 ? d : w;
    for (let k = 0; k < 4; k++) {
      const i = yuz * 4 + k;
      if (yuz === 2 || yuz === 3) uv.setXY(i, 0.02, 0.02);
      else uv.setXY(i, uv.getX(i) * (genislik / KARO), uv.getY(i) * (h / KARO));
    }
  }
  g.translate(x, h / 2, z);
  return g;
}

export type Sehir = {
  grup: Group;
  cepheMalzemeleri: MeshStandardMaterial[];
  lambaMalzeme: MeshStandardMaterial;
  farMalzeme: MeshStandardMaterial;
  arabalariGuncelle: (t: number) => void;
};

export function sehriKur(): Sehir {
  const grup = new Group();
  const rnd = tohumluRastgele(20260926);

  /* Zemin + ana cadde + ızgara sokaklar */
  const zemin = new Mesh(new PlaneGeometry(900, 900), new MeshStandardMaterial({ color: "#9AA19C", roughness: 1 }));
  zemin.rotation.x = -Math.PI / 2;
  zemin.receiveShadow = true;
  grup.add(zemin);

  const asfalt = asfaltDokusu();
  asfalt.repeat.set(26, 1);
  const cadde = new Mesh(new PlaneGeometry(320, 8), new MeshStandardMaterial({ map: asfalt, roughness: 0.92 }));
  cadde.rotation.x = -Math.PI / 2;
  cadde.position.set(40, 0.01, 0);
  cadde.receiveShadow = true;
  grup.add(cadde);

  const yanSokak = new MeshStandardMaterial({ color: "#4A5058", roughness: 0.95 });
  for (const z of [-58, 58, -104, 104]) {
    const s = new Mesh(new PlaneGeometry(420, 7), yanSokak);
    s.rotation.x = -Math.PI / 2;
    s.position.set(40, 0.008, z);
    grup.add(s);
  }
  // Dik sokaklar ana caddeyi ve kaldırımları kesmez (üst üste binen düzlem titremesin)
  for (const x of [-72, -12, 48, 108, 168]) {
    for (const yon of [1, -1]) {
      const s = new Mesh(new PlaneGeometry(7, 202), yanSokak);
      s.rotation.x = -Math.PI / 2;
      s.position.set(x, 0.009, yon * (7.2 + 101));
      grup.add(s);
    }
  }

  const kaldirim = kaldirimDokusu();
  kaldirim.repeat.set(107, 1);
  const kMalz = new MeshStandardMaterial({ map: kaldirim, roughness: 0.9 });
  for (const z of [5.6, -5.6]) {
    const k = new Mesh(new BoxGeometry(320, 0.16, 3.2), kMalz);
    k.position.set(40, 0.08, z);
    k.receiveShadow = true;
    grup.add(k);
  }

  /* Binalar — 4 cephe varyantı, her biri tek birleşik geometri */
  const cepheMalzemeleri = [11, 23, 37, 41].map((tohum) => {
    const { renk, isik } = cepheDokulari(tohum);
    return new MeshStandardMaterial({
      map: renk,
      emissiveMap: isik,
      emissive: new Color("#FFFFFF"),
      emissiveIntensity: 0,
      roughness: 0.78,
    });
  });
  const kovalar: BufferGeometry[][] = [[], [], [], []];
  const binaEkle = (x: number, z: number, w: number, d: number, h: number) =>
    kovalar[Math.floor(rnd() * 4)].push(binaGeometrisi(w, h, d, x, z));

  // Caddeye bakan sıralar
  for (const yon of [1, -1]) {
    let x = -70;
    while (x < 160) {
      const w = 7 + rnd() * 7;
      const d = 9 + rnd() * 6;
      const merkezeYakin = x > -10 && x < 80;
      const h = (merkezeYakin ? 9 : 12) + rnd() * (merkezeYakin ? 14 : 30);
      binaEkle(x + w / 2, yon * (13 + d / 2), w, d, h);
      x += w + 0.6 + rnd() * 1.8;
    }
  }
  // Uzak bloklar (yukarıdan bakışta şehir dokusu)
  for (let bx = -130; bx < 230; bx += 60) {
    for (let bz = -150; bz <= 150; bz += 46) {
      if (Math.abs(bz) < 40) continue;
      for (let i = 0; i < 6; i++) {
        const w = 8 + rnd() * 10;
        const d = 8 + rnd() * 10;
        binaEkle(bx + rnd() * 44, bz + rnd() * 30 - 15, w, d, 8 + rnd() * 46);
      }
    }
  }
  kovalar.forEach((geos, i) => {
    if (!geos.length) return;
    const m = new Mesh(mergeGeometries(geos), cepheMalzemeleri[i]);
    m.castShadow = true;
    m.receiveShadow = true;
    grup.add(m);
    geos.forEach((g) => g.dispose());
  });

  /* Ağaçlar + sokak lambaları (instanced) */
  const kukla = new Object3D();
  const agacNoktalari: Array<[number, number]> = [];
  for (let x = -60; x < 150; x += 9) {
    if (!bosMu(x)) agacNoktalari.push([x + rnd() * 2, 6.6]);
    agacNoktalari.push([x + 4 + rnd() * 2, -6.6]);
  }
  const govde = new InstancedMesh(new CylinderGeometry(0.12, 0.16, 2.2, 8), new MeshStandardMaterial({ color: "#5B4636" }), agacNoktalari.length);
  const tac = new InstancedMesh(new IcosahedronGeometry(1.4, 1), new MeshStandardMaterial({ color: "#4E7A4F", roughness: 0.9, flatShading: true }), agacNoktalari.length);
  agacNoktalari.forEach(([x, z], i) => {
    kukla.position.set(x, 1.1, z);
    kukla.scale.setScalar(1);
    kukla.updateMatrix();
    govde.setMatrixAt(i, kukla.matrix);
    kukla.position.set(x, 2.9 + rnd() * 0.4, z);
    kukla.scale.setScalar(0.85 + rnd() * 0.35);
    kukla.updateMatrix();
    tac.setMatrixAt(i, kukla.matrix);
  });
  govde.castShadow = tac.castShadow = true;
  grup.add(govde, tac);

  const lambaNoktalari: Array<[number, number]> = [];
  for (let x = -54; x < 150; x += 18) {
    if (!bosMu(x)) lambaNoktalari.push([x, 4.4]);
    lambaNoktalari.push([x + 9, -4.4]);
  }
  const lambaMalzeme = new MeshStandardMaterial({ color: "#E8EEF3", emissive: new Color("#FFE2B0"), emissiveIntensity: 0 });
  const direk = new InstancedMesh(new CylinderGeometry(0.06, 0.08, 6, 8), new MeshStandardMaterial({ color: "#39424D", metalness: 0.5, roughness: 0.5 }), lambaNoktalari.length);
  const bas = new InstancedMesh(new BoxGeometry(0.5, 0.1, 0.22), lambaMalzeme, lambaNoktalari.length);
  lambaNoktalari.forEach(([x, z], i) => {
    kukla.scale.setScalar(1);
    kukla.position.set(x, 3, z);
    kukla.updateMatrix();
    direk.setMatrixAt(i, kukla.matrix);
    kukla.position.set(x, 6, z - Math.sign(z) * 0.5);
    kukla.updateMatrix();
    bas.setMatrixAt(i, kukla.matrix);
  });
  direk.castShadow = true;
  grup.add(direk, bas);

  /* Arabalar — iki şerit, döngüsel */
  const farMalzeme = new MeshStandardMaterial({ color: "#FFFFFF", emissive: new Color("#FFF6E0"), emissiveIntensity: 0.2 });
  const stopMalzeme = new MeshStandardMaterial({ color: "#7A1010", emissive: new Color("#FF2A2A"), emissiveIntensity: 0.4 });
  const renkler = ["#E5E8EC", "#1F2A36", "#8C96A3", "#0369A1", "#B8C2CC", "#2E3B4A", "#D9DEE3", "#4A5563"];
  const arabalar = renkler.map((renk, i) => {
    const a = new Group();
    const govdeM = new MeshStandardMaterial({ color: renk, roughness: 0.35, metalness: 0.4 });
    const alt = new Mesh(new BoxGeometry(4.2, 0.7, 1.8), govdeM);
    alt.position.y = 0.55;
    const kabin = new Mesh(new BoxGeometry(2.3, 0.6, 1.6), new MeshStandardMaterial({ color: "#1B232C", roughness: 0.2, metalness: 0.6 }));
    kabin.position.set(-0.2, 1.15, 0);
    alt.castShadow = kabin.castShadow = true;
    const far1 = new Mesh(new BoxGeometry(0.06, 0.16, 0.36), farMalzeme);
    far1.position.set(2.11, 0.62, 0.6);
    const far2 = far1.clone();
    far2.position.z = -0.6;
    const stop1 = new Mesh(new BoxGeometry(0.06, 0.14, 0.34), stopMalzeme);
    stop1.position.set(-2.11, 0.65, 0.6);
    const stop2 = stop1.clone();
    stop2.position.z = -0.6;
    a.add(alt, kabin, far1, far2, stop1, stop2);
    const doguya = i % 2 === 0;
    a.rotation.y = doguya ? 0 : Math.PI;
    grup.add(a);
    return { a, doguya, hiz: 7 + (i % 3) * 1.8, faz: i * 27 };
  });
  const arabalariGuncelle = (t: number) => {
    for (const { a, doguya, hiz, faz } of arabalar) {
      const yol = (faz + t * hiz) % 220;
      a.position.set(doguya ? -70 + yol : 150 - yol, 0, doguya ? -1.9 : 1.9);
    }
  };
  arabalariGuncelle(0);

  return { grup, cepheMalzemeleri, lambaMalzeme, farMalzeme, arabalariGuncelle };
}
