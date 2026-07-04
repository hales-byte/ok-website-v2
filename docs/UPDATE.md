# UPDATE.md — Bakım Runbook'u (O6)
> Amaç: 6 ay sonra bile tek başına, kimseye sormadan, 10 dakikada güncelleme.
> Her senaryo kısa bir Claude Code oturumudur (Sonnet yeter).
> Değişmez kural: **COMMIT daima Hakan onayından sonra.**

## Hızlı doğrulama komutları

| Komut | Ne yapar |
|---|---|
| `npm run check:envanter` | Envanterin iç tutarlılığını test eder (35.919 / 45 / Ankara 2.946) |
| `npm run build` | Siteyi derler — hatasızsa yayınlanabilir |
| `vercel --prod` | Yayınlar (repo kökünden) |

## Senaryo 1 — Envanter güncellendi (yeni Excel geldi) · ~15 dk

1. Yeni Excel'i Cowork'e ver → `envanter.json`'u Cowork üretir
   (kurallar: Network Adeti hariç, il bazlı toplama).
2. Claude Code: `src/data/envanter.json` dosyasını yenisiyle değiştir.
3. `npm run check:envanter` → kontroller İÇİNDEKİ beklenen değerleri
   yeni toplamlarla güncellemek gerekir (scripts/check-envanter.mjs).
4. `npm run build` → onay → commit + deploy.

Başka HİÇBİR dosyaya dokunulmaz: rakamlar, harita, şehir sayfaları,
sitemap, eşik-altı 301'ler — hepsi envanter.json'dan otomatik türer.

## Senaryo 2 — Fotoğraf ekleme/değiştirme · ~5 dk

`public/images/formats/{mecra}.jpg` (1200×800, <300 KB) olarak koy →
build → deploy. Kod değişikliği yok.

## Senaryo 3 — Metin değişikliği (SSS, format açıklaması, vaka) · ~10 dk

- Format metinleri: `lib/formats.ts` (G-fazında `src/data/content/` altına
  taşınacak — taşındığında burayı güncelle).
- SSS/vaka: G6'da eklenecek içerik dosyasında.
Değiştir → build → onay → commit + deploy.

## Senaryo 4 — Yeni mecra türü · ~20 dk

1. `envanter.json`'a format ekle (ilgili illerin `formatlar` sözlüğüne).
2. `src/data/envanter.ts` → `FORMAT_LABELS`'a görünen ad ekle;
   kendi sayfası olacaksa `FORMAT_PAGE_KEY`'e anahtar ekle
   (**next.config.ts'teki kopyayı da güncelle** — dosyada uyarı notu var).
3. Sayfası olacaksa `lib/formats.ts`'e meta (açıklama/ikon) ekle.
4. build → onay → commit + deploy.

## Senaryo 5 — Yeni il · ~10 dk

`envanter.json`'a il kaydı ekle → şehir sayfası, harita rengi, sitemap,
iç linkler otomatik türer. İl adının `lib/turkiye-sehirler.ts`'te bölgesiyle
kayıtlı olduğundan emin ol (81 ilin hepsi kayıtlı — sorun çıkmaz).

## 3 aylık bakım ritüeli (Cowork ile 30 dk)

Rakam tutarlılığı · kırık link · form testi (gerçek lead) · Lighthouse.
