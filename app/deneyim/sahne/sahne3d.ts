/**
 * "Şehirde bir gün" 3D sahnesi — yalnız /deneyim sayfasında, dinamik import ile yüklenir.
 * Kaydırma → kamera yolu + günün saati. Görünmüyorsa çizim durur.
 */
import {
  ACESFilmicToneMapping,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  PCFShadowMap,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  PointLight,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { sehriKur } from "./sehir";
import { uniteleriKur } from "./uniteler";
import { KAMERA_HEDEF, KAMERA_KONUM, KARE_SAYISI, kartKaymasi, kaydirmadanKare, zamanDegerleri } from "./zaman";
import { tohumluRastgele } from "./dokular";

const BEYAZ = new Color("#FFFFFF");

export type SahneSecenekleri = {
  /** Kaydırma ilerlemesinin ölçüldüğü sarmalayıcı */
  kaydirmaKaynagi: HTMLElement;
  /** Sırayla 5 bölüm (giriş, sabah, gün, gece, final) — durak noktaları bunlardan ölçülür */
  bolumler: HTMLElement[];
  /** Yakalama modu: sabit anahtar kare (0…4), zaman donuk */
  sabitKare?: number;
  /** İlk kareler çizildiğinde */
  hazir?: () => void;
  /** WebGL kaybolursa (sabit görsele dön) */
  hata?: () => void;
};

function gokKubbesi() {
  const malz = new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    uniforms: { ust: { value: new Color() }, ufuk: { value: new Color() } },
    vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 ust; uniform vec3 ufuk; varying vec3 vP;
      void main(){ float h = clamp(vP.y * 1.6 + 0.08, 0.0, 1.0); gl_FragColor = vec4(mix(ufuk, ust, pow(h, 0.7)), 1.0); }`,
  });
  const m = new Mesh(new SphereGeometry(950, 32, 16), malz);
  m.frustumCulled = false;
  return { m, malz };
}

function yildizlar() {
  const rnd = tohumluRastgele(99);
  const n = 900;
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const th = rnd() * Math.PI * 2;
    const y = 0.12 + rnd() * 0.88;
    const r = Math.sqrt(1 - y * y);
    p.set([Math.cos(th) * r * 880, y * 880, Math.sin(th) * r * 880], i * 3);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(p, 3));
  const malz = new PointsMaterial({ color: "#DDE8FF", size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false });
  return { m: new Points(g, malz), malz };
}

export function sahneyiBaslat(kap: HTMLElement, s: SahneSecenekleri) {
  const renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  kap.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.3, 1400);
  scene.fog = new Fog(0xffffff, 40, 400);

  const gok = gokKubbesi();
  const yildiz = yildizlar();
  scene.add(gok.m, yildiz.m);

  const hemi = new HemisphereLight("#CFE3FF", "#5C6156", 0.8);
  const gunes = new DirectionalLight("#FFFFFF", 2);
  gunes.castShadow = true;
  gunes.shadow.mapSize.set(2048, 2048);
  Object.assign(gunes.shadow.camera, { left: -80, right: 80, top: 60, bottom: -60, near: 1, far: 500 });
  gunes.shadow.bias = -0.0004;
  gunes.shadow.normalBias = 0.03;
  gunes.target.position.set(30, 0, 6);
  scene.add(hemi, gunes, gunes.target);

  const sehir = sehriKur();
  const unite = uniteleriKur();
  scene.add(sehir.grup, unite.grup);

  // Gece cadde aydınlatması (kamera yolundaki lambaların altına)
  const caddeIsiklari = [-9, 18, 45, 72].map((x) => {
    const l = new PointLight("#FFD9A0", 0, 22, 2);
    l.position.set(x, 5.6, -3.6);
    scene.add(l);
    return l;
  });

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new Vector2(256, 256), 0.3, 0.32, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  let durak: number[] = [0, 0.25, 0.5, 0.75, 1];
  const durakOlc = () => {
    const kok = s.kaydirmaKaynagi.getBoundingClientRect();
    const menzil = Math.max(1, kok.height - window.innerHeight);
    durak = s.bolumler.map((b) => {
      const r = b.getBoundingClientRect();
      return Math.min(1, Math.max(0, (r.top - kok.top + r.height / 2 - window.innerHeight / 2) / menzil));
    });
  };
  let gen = 1;
  let yuk = 1;
  const boyutla = () => {
    const w = kap.clientWidth || 1;
    const h = kap.clientHeight || 1;
    gen = w;
    yuk = h;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    durakOlc();
  };
  const ro = new ResizeObserver(boyutla);
  ro.observe(kap);
  boyutla();

  const hedefIlerleme = () => {
    const r = s.kaydirmaKaynagi.getBoundingClientRect();
    return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
  };

  const saat = new Timer();
  saat.connect(document);
  const bak = new Vector3();
  const gunesYon = new Vector3();
  let ilerleme = s.sabitKare === undefined ? hedefIlerleme() : 0;
  let gorunur = true;
  let kare = 0;
  let raf = 0;

  const io = new IntersectionObserver(([e]) => {
    gorunur = e.isIntersecting;
    if (gorunur && !raf) raf = requestAnimationFrame(ciz);
  });
  io.observe(kap);

  function ciz() {
    raf = 0;
    if (!gorunur || document.hidden) return;
    saat.update();
    const dt = Math.min(0.05, saat.getDelta());
    // yakalama modunda zaman donuk: arabalar ünitelerin önünde değil, LED temiz karede
    const t = s.sabitKare === undefined ? saat.getElapsed() : 45;

    let u: number;
    if (s.sabitKare === undefined) {
      ilerleme += (hedefIlerleme() - ilerleme) * (1 - Math.exp(-dt * 3.2));
      u = kaydirmadanKare(ilerleme, durak);
    } else u = s.sabitKare;

    const oran = u / (KARE_SAYISI - 1);
    KAMERA_KONUM.getPoint(oran, camera.position);
    KAMERA_HEDEF.getPoint(oran, bak);
    if (s.sabitKare === undefined) {
      camera.position.x += Math.sin(t * 0.21) * 0.12;
      camera.position.y += Math.sin(t * 0.17) * 0.06;
    }
    camera.lookAt(bak);
    // Metin kartı solda: görüntüyü sağa kaydır (yakalama modunda kart yok → kayma yok)
    const kayma = s.sabitKare === undefined ? kartKaymasi(u) : 0;
    camera.setViewOffset(gen, yuk, -kayma * gen, 0, gen, yuk);

    const z = zamanDegerleri(u);
    gok.malz.uniforms.ust.value.copy(z.gokUst);
    gok.malz.uniforms.ufuk.value.copy(z.gokUfuk);
    (scene.fog as Fog).color.copy(z.gokUfuk);
    (scene.fog as Fog).far = z.sisUzak;
    hemi.intensity = z.hemiGuc;
    hemi.color.copy(z.gokUst).lerp(BEYAZ, 0.45);
    gunes.color.copy(z.gunesRenk);
    gunes.intensity = z.gunesGuc;
    const yk = (z.gunesYukseklik * Math.PI) / 180;
    const yn = (z.gunesYon * Math.PI) / 180;
    // yön: doğudan (+x) güneye (−z) doğru ölçülür → güneş cephelerin kameraya bakan yüzünü aydınlatır
    gunesYon.set(Math.cos(yk) * Math.cos(yn), Math.sin(yk), -Math.cos(yk) * Math.sin(yn)).normalize();
    gunes.position.copy(gunes.target.position).addScaledVector(gunesYon, 220);
    for (const m of sehir.cepheMalzemeleri) m.emissiveIntensity = z.sehirIsik * 0.75;
    sehir.lambaMalzeme.emissiveIntensity = z.sehirIsik * 2.2;
    sehir.farMalzeme.emissiveIntensity = 0.2 + z.sehirIsik * 1.4;
    for (const m of unite.arkadanIsikli) m.emissiveIntensity = z.panoIsik;
    unite.billboardYuz.emissiveIntensity = Math.max(z.panoIsik * 1.5, z.projektor * 0.5);
    unite.projektorMalzeme.emissiveIntensity = z.projektor * 3;
    unite.spot.intensity = z.projektor * 90;
    unite.ledMalzeme.emissiveIntensity = z.led;
    for (const l of unite.noktalar) l.intensity = z.panoIsik * 5;
    unite.hale.opacity = Math.min(1, Math.max(0, (z.panoIsik - 0.25) / 0.37)) * 0.5;
    for (const l of caddeIsiklari) l.intensity = z.sehirIsik * 45;
    yildiz.malz.opacity = z.yildiz;
    bloom.strength = z.bloom;
    renderer.toneMappingExposure = z.pozlama;

    unite.led.guncelle(t);
    sehir.arabalariGuncelle(t);
    composer.render(dt);

    kare++;
    if (kare === 24) s.hazir?.();
    raf = requestAnimationFrame(ciz);
  }

  const gorunurlukDegisti = () => {
    if (!document.hidden && !raf) {
      raf = requestAnimationFrame(ciz);
    }
  };
  document.addEventListener("visibilitychange", gorunurlukDegisti);
  const kayip = (e: Event) => {
    e.preventDefault();
    s.hata?.();
  };
  renderer.domElement.addEventListener("webglcontextlost", kayip);
  raf = requestAnimationFrame(ciz);

  return {
    durdur() {
      cancelAnimationFrame(raf);
      saat.disconnect();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", gorunurlukDegisti);
      renderer.domElement.removeEventListener("webglcontextlost", kayip);
      scene.traverse((o) => {
        const m = o as Mesh;
        m.geometry?.dispose();
        const mat = m.material as Material | Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
