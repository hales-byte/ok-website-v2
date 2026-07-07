#!/usr/bin/env node
/**
 * G3.3 — Logo optik boyut normalizasyonu
 * ---------------------------------------
 * Sorun: LogoMarquee her logoyu aynı kutuya `object-contain` ile sığdırıyor.
 * Kare/amblem logolar (Kızılay, BP, Koç, Bosch…) minik; geniş yazı-logolar
 * (Vodafone, Arçelik, A101…) kocaman görünüyor. Ölçülen görsel büyüklük farkı 5,4×.
 *
 * Çözüm: her logoyu KENDİ ÖZELİNDE işle →
 *   1) kenar boşluklarını kırp (gerçek içerik kutusu),
 *   2) EŞİT OPTİK ALAN hedefine göre ölçekle (genişlik/yükseklik tavanıyla),
 *   3) hepsini TEK TİP tuvale (260×116) ortala.
 * Sonuç: görsel büyüklük farkı ~1,6× (yalnız aşırı ince/geniş logolar tavana takılır).
 *
 * `sharp` zaten Next.js'in yerel bağımlılığı — YENİ dış servis EKLENMEZ.
 *
 * Kullanım (repo kökünden):
 *   node scripts/normalize-logos.mjs           # public/logos/*.png dosyalarını YERİNDE günceller
 *   node scripts/normalize-logos.mjs --dry     # hiçbir dosyayı yazmaz, sadece rapor basar
 *   node scripts/normalize-logos.mjs --src X    # kaynak klasörü değiştir (varsayılan public/logos)
 *
 * İDEMPOTENT: ikinci kez çalıştırmak sonucu değiştirmez (kırpma şeffaf dolguyu geri alır).
 * Git altında çalışır — istenmeyen sonuç olursa `git checkout -- public/logos` ile geri alınır.
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

// ── Ayarlar (tek yerden) ─────────────────────────────────────────────
const CANVAS_W = 260;   // tüm çıktı tuvalleri tek boy
const CANVAS_H = 116;
const PAD_X = 16;       // yatay güvenli boşluk
const PAD_Y = 12;       // dikey güvenli boşluk
const MAX_W = CANVAS_W - 2 * PAD_X;   // 228 — en geniş logo bunu aşmaz
const MAX_H = CANVAS_H - 2 * PAD_Y;   //  92 — en uzun logo bunu aşmaz
const TARGET_H = 84;                  // kare bir logonun hedef yüksekliği
const AREA = TARGET_H * TARGET_H;     // eşit optik ALAN hedefi (~7056)
const TRIM_THRESHOLD = 12;            // kırpma eşiği (köşe rengine göre)
// ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const srcIdx = args.indexOf("--src");
const SRC = srcIdx !== -1 ? args[srcIdx + 1] : "public/logos";

if (!fs.existsSync(SRC)) {
  console.error(`✗ Kaynak klasör yok: ${SRC} (repo kökünden çalıştır)`);
  process.exit(1);
}

const files = fs.readdirSync(SRC).filter((f) => f.toLowerCase().endsWith(".png"));
if (files.length === 0) {
  console.error(`✗ ${SRC} içinde .png bulunamadı`);
  process.exit(1);
}

async function processOne(file) {
  const p = path.join(SRC, file);
  const base = await sharp(p, { density: 384 }).ensureAlpha().png().toBuffer();

  // 1) kırp → gerçek içerik kutusu
  let data, info;
  try {
    const r = await sharp(base).trim({ threshold: TRIM_THRESHOLD }).toBuffer({ resolveWithObject: true });
    data = r.data; info = r.info;
  } catch {
    const r = await sharp(base).toBuffer({ resolveWithObject: true });
    data = r.data; info = r.info;
  }
  const w = info.width, h = info.height, ar = w / h;

  // 2) eşit optik alan + tavanlar
  let hr = Math.sqrt(AREA / ar);
  let wr = Math.sqrt(AREA * ar);
  if (wr > MAX_W) { wr = MAX_W; hr = MAX_W / ar; }
  if (hr > MAX_H) { hr = MAX_H; wr = MAX_H * ar; }
  wr = Math.max(1, Math.round(wr));
  hr = Math.max(1, Math.round(hr));

  // 3) tek tip tuvale ortala
  const scaled = await sharp(data).resize(wr, hr, { fit: "fill" }).png().toBuffer();
  const out = await sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  }).composite([{ input: scaled, gravity: "center" }]).png().toBuffer();

  if (!DRY) fs.writeFileSync(p, out);
  return { file, ar: +ar.toFixed(2), render: `${wr}x${hr}`, area: wr * hr };
}

const rows = [];
for (const f of files) {
  try { rows.push(await processOne(f)); }
  catch (e) { console.error(`✗ ${f}: ${String(e).slice(0, 80)}`); }
}

rows.sort((a, b) => a.area - b.area);
const areas = rows.map((r) => r.area);
const min = Math.min(...areas), max = Math.max(...areas);
console.log(`\n${DRY ? "[DRY] " : ""}Normalize edilen logo: ${rows.length} · tuval ${CANVAS_W}×${CANVAS_H}`);
console.log("En küçük optik alan:", min, "· En büyük:", max, "· Fark:", (max / min).toFixed(2) + "×");
console.log("(hedef: ~1,6× — yalnız aşırı ince/geniş logolar tavana takılır)");
if (DRY) console.log("\nHiçbir dosya YAZILMADI (--dry). Onaylıyorsan --dry'siz çalıştır.");
