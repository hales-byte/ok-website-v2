#!/usr/bin/env node
/**
 * ENVANTER DOĞRULAMA — npm run check:envanter
 * Tek doğruluk kaynağının iç tutarlılığını test eder:
 *   1. Toplam ünite = 36.699 (json.toplam.unite ile ve il toplamlarıyla eşleşir)
 *   2. İl sayısı = 45
 *   3. Ankara toplamı = 2.946
 *   4. Her ilin toplamı, format dağılımının toplamına eşit
 *   5. Mecra türü sayısı = 20
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(readFileSync(join(root, "src/data/envanter.json"), "utf8"));

let fail = 0;
const check = (ad, gerçek, beklenen) => {
  const ok = gerçek === beklenen;
  if (!ok) fail++;
  console.log(`${ok ? "✓" : "✗"} ${ad}: ${gerçek}${ok ? "" : ` (beklenen: ${beklenen})`}`);
};

const iller = data.iller;
const uniteToplam = iller.reduce((s, i) => s + i.toplam, 0);
const ankara = iller.find((i) => i.il === "Ankara");
const mecralar = new Set(iller.flatMap((i) => Object.keys(i.formatlar)));

check("Toplam ünite", uniteToplam, 36699);
check("json.toplam.unite alanı", data.toplam.unite, uniteToplam);
check("İl sayısı", iller.length, 45);
check("json.toplam.il alanı", data.toplam.il, iller.length);
check("Ankara toplamı", ankara?.toplam, 2946);
check("Mecra türü sayısı", mecralar.size, 20);

// V1 (2026-07-07) güncelleme nöbetçileri
const aydin = iller.find((i) => i.il === "Aydın");
const edirne = iller.find((i) => i.il === "Edirne");
check("Aydın toplamı (V1'de eklendi)", aydin?.toplam, 782);
check("Edirne envanterde YOK (V1'de çıktı)", edirne === undefined, true);

// V2 (2026-07-20) güncelleme nöbetçisi: tek değişiklik Adana LED 16→12
const adana = iller.find((i) => i.il === "Adana");
check("Adana LED (V2'de 16→12)", adana?.formatlar?.["LED"], 12);

const bozukIller = iller.filter(
  (i) => Object.values(i.formatlar).reduce((s, a) => s + a, 0) !== i.toplam
);
check("İl toplam = format toplamı tutarlılığı (bozuk il sayısı)", bozukIller.length, 0);
if (bozukIller.length) console.log("  Bozuk:", bozukIller.map((i) => i.il).join(", "));


// ── Erişim modeli kontrolleri (G2) ──
const nufusData = JSON.parse(readFileSync(join(root, "src/data/il-nufus.json"), "utf8"));
const nufus = nufusData.nufus;
const nufussuz = iller.filter((i) => nufus[i.il] === undefined);
check("Nüfus kaydı olmayan envanter ili", nufussuz.length, 0);
if (nufussuz.length) console.log("  Eksik:", nufussuz.map((i) => i.il).join(", "));

const ERISIM_KATSAYISI = 0.960465; // src/data/envanter.ts ile aynı — değişirse ikisini birden güncelle
const nufusToplam = iller.reduce((s, i) => s + (nufus[i.il] ?? 0), 0);
// Global erişim = Σ per-il erişim (sitedeki tek türetim); aggregate ise round(Σnüfus×K).
const perIlErisim = iller.reduce(
  (s, i) => s + (nufus[i.il] !== undefined ? Math.round(nufus[i.il] * ERISIM_KATSAYISI) : 0),
  0
);
const aggErisim = Math.round(nufusToplam * ERISIM_KATSAYISI);
// Σ getIlErisim(45) ile getAylikErisim() aynı kaynaktan türer; iki formül
// yuvarlama toleransında (±il sayısı) örtüşmeli — biri bayatlarsa yakalanır.
check(
  "Σ per-il erişim == global erişim (±il sayısı tolerans)",
  Math.abs(perIlErisim - aggErisim) <= iller.length,
  true
);
console.log(`ℹ Nüfus toplamı: ${nufusToplam.toLocaleString("tr-TR")} → aylık erişim (Σ per-il): ${perIlErisim.toLocaleString("tr-TR")} (${(perIlErisim / 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}M)`);

// ── Stub uyarısı (bilgi amaçlı, başarısız ETMEZ) ──
// toplam ≤ 3 olan iller büyük olasılıkla eksik/placeholder envanter (örn. tek
// havalimanı LED'i). İl sayfası revizyonunda bunlar bölge sayfasında toplanır;
// gerçek veri girilince buradan düşerler.
const stublar = iller.filter((i) => i.toplam <= 3).sort((a, b) => a.toplam - b.toplam);
if (stublar.length) {
  console.log(`ℹ Düşük envanter (toplam ≤ 3) ${stublar.length} il — muhtemel eksik veri: ${stublar.map((i) => `${i.il}(${i.toplam})`).join(", ")}`);
}

if (fail > 0) { console.error(`\n${fail} kontrol BAŞARISIZ`); process.exit(1); }
console.log("\nTüm kontroller geçti — envanter.json tutarlı.");
