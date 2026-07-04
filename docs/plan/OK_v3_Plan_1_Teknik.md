# OK v3 · PLAN 1 — TEKNİK
**Araç: Claude Code (terminal) · Denetim: Cowork · Onay: Hakan**
Master plan: OK_v3_Birlestirme_Plani.md (Faz 1, 2 ve 4'ün teknik kısmı)

## İş bölümü

| Araç | Görevi |
|---|---|
| **Claude Code** | Klon, branch, kod, build, test, git, Vercel deploy |
| **Cowork (ben)** | Her oturum sonrası canlı URL'yi tarayıcıda denetler, sonraki oturumun prompt'unu hazırlar |
| **Hakan** | Prompt'u yapıştırır, preview'a bakar, commit onayı verir |

## Kurallar

1. Bir oturum = bir T-paketi. Prompt'ta daima: **"COMMIT ETME — Hakan onaylayınca commit."**
2. Her oturum sonu: `npm run build` hatasız + preview URL raporu.
3. Takılınca Cowork'e dön: hata çıktısını yapıştır, düzeltme prompt'u hazırlarım.

## Claude Max verim kuralları (savurma, ama kısma da)

| Kural | Neden |
|---|---|
| Paket bitti → oturumu KAPAT, sonraki pakete yeni oturum | Uzayan oturumda bağlam şişer, her mesaj pahalanır |
| `CLAUDE.md` T0'da yazılır — proje bir daha anlatılmaz | En büyük token tasarrufu; oturum açılışı 1 prompt'a iner |
| Model: T4/A5/A6 gibi mekanik işler **Sonnet**, T2/T3 gibi mimari işler **Opus** (`/model`) | Max kotası mimari işlere saklanır |
| "Tüm repoyu incele" deme — promptlardaki dosya hedefleriyle çalış | Keşif turu en pahalı alışkanlıktır |
| Ufak işleri (2 saatlikleri) aynı 5 saatlik pencerede seri bitir | Pencere verimi |
| Build doğrulama + lead testi + QA'dan KISILMAZ | Hatanın sonradan maliyeti daha yüksek |

---

## T0 — Ortam + branch + proje kiti (30 dk) · İLK OTURUM, PROMPT HAZIR

Ön koşul: Cowork çıktı klasöründeki TÜM dosyaları indir → `~/Downloads/ok-v3-docs/` içine koy
(CLAUDE.md, DURUM.md, GUNLUK.md, BASLANGIC.md, 4 plan dosyası, envanter.json).

Claude Code'a yapıştır:

```
GitHub'daki hales-byte/ok-website-v2 reposunu /tmp/web-v2'ye klonla.
git checkout -b v3 ile yeni branch aç.
npm install && npm run build çalıştır — mevcut halin build olduğunu doğrula.
Build çıktısını özetle: kaç sayfa prerender ediliyor, hangi env değişkenleri eksik
uyarısı var (Supabase/Mapbox/Resend), package.json'daki ana bağımlılıklar neler.

~/Downloads/ok-v3-docs/ içindeki hazır proje kitini yerleştir:
- CLAUDE.md, DURUM.md, GUNLUK.md, BASLANGIC.md → repo kökü
- OK_v3_*.md plan dosyaları → docs/plan/
- envanter.json → src/data/envanter.json (henüz koda bağlama)

CLAUDE.md'yi oku ve süreklilik protokolünü BU oturumdan itibaren uygula:
kapanışta DURUM.md + GUNLUK.md güncelle, bana 5 satırlık sade özet ver.

COMMIT ETME — rapor sonrası Hakan onaylarsa commit mesajı:
"docs: v3 proje kiti (anayasa, durum, günlük, planlar, envanter)"
```

**Kabul:** build hatasız · kit dosyaları repoda · DURUM.md "T0 ✓" gösteriyor · sade özet Cowork'e yapıştırıldı.

## T1 — Veri modülü (yarım gün) · PROMPT HAZIR

```
src/data/envanter.json için TypeScript veri katmanı yaz:

1. src/data/types.ts — Il, Ilce, FormatDagilimi tipleri (json yapısına birebir: il, toplam, ilceler[], formatlar{})
2. src/data/envanter.ts — json'u import eden yardımcılar:
   - getIller(): tüm iller (toplam sırasına göre)
   - getIl(slug): tek il (slug'lar Türkçe karakter dönüşümlü: "Gaziantep"→"gaziantep")
   - getFormatlarByIl(slug), getIllerByFormat(format)
   - TOPLAM = { il: 45, mecra: 20, unite: 35919 } sabiti
3. Mevcut Supabase'ten veri çeken fonksiyonların İMZALARINI incele, birebir aynı imzayla statik karşılıklarını yaz (drop-in replacement hedefi).
4. Unit-benzeri hızlı doğrulama scripti: toplam 35919 mu, il sayısı 45 mi, Ankara toplamı 2946 mı — çalıştır, sonucu raporla.

COMMIT ETME. Build + rapor.
```

**Kabul:** doğrulama scripti 3/3 geçer.

## T2 — Sayfaları statik veriye geçir (1 gün)

Prompt taslağı (T1 raporuna göre Cowork netleştirir):

```
Supabase çağrısı yapan tüm noktaları bul (generateStaticParams, sayfa dataFetch'leri).
Hepsini src/data/envanter.ts fonksiyonlarıyla değiştir. @supabase/* importlarını ve env bağımlılığını kaldır.

SAYFA ÜRETİM KURALI (ince içerik önlemi — Google'a zayıf sayfa gitmesin):
- İl sayfası: envanter.json'daki 45 ilin hepsi için üret.
- İl×format sayfası: SADECE o ilde o format gerçekten varsa (adet > 0) ÜRET.
- Adet < 5 olan il×format kombinasyonu için ayrı sayfa ÜRETME → il sayfasına redirect
  (örn. Kocaeli'de sadece 3 LED var → /sehir/kocaeli/led olmasın, /sehir/kocaeli yeter).

SLUG FARK LİSTESİ + 301 HARİTASI:
- Önce mevcut sitemap'teki eski şehir slug'larını çıkar (47 şehir listesi).
- Yeni 45 il listesiyle diff al: kalkan slug'lar → en yakın il sayfasına veya /envanter'e 301.
- Diff tablosunu raporla (Hakan onaylayacak).

İlçe/alt lokasyonlar il sayfasında parantez içinde listelensin.
Build: kaç sayfa üretildi + redirect listesi raporla. COMMIT ETME.
```

**Kabul:** /sehir/ankara/billboard = 342 · /sehir/gaziantep toplam 3.490 · Supabase importu sıfır.

## T3 — Harita: Mapbox söküm, SVG geçişi (yarım gün)

```
/envanter sayfasındaki Mapbox bileşenini kaldır (mapbox-gl bağımlılığı dahil).
Hakan'ın vereceği ok-iframe SVG Türkiye haritası bileşenini React'e taşı:
7 bölge renk kodlu, il noktaları envanter.json'dan, tıklayınca il detay paneli
(toplam + ilçeler + format dağılımı), bölge/format filtreleri statik veriden.
COMMIT ETME. Build + preview.
```

Not: SVG kaynağı `~/Projects/ok-iframe/scripts/map.js` + ilgili parça — oturum öncesi Cowork ile hazırlanır.

**Kabul:** /envanter dolu harita, "0 şehir" mesajı tarih oldu, mapbox-gl package.json'dan silindi.

## T4 — Rakam senkronu (2 saat)

```
Tüm repo'da eski rakamları tara ve değiştir:
"47+", "47 şehir", "33.812", "33812", "8 format", "39 şehir", "35.861", "18 mecra"
→ 45 il · 20 mecra türü · 35.919 ünite (yazım: 35.919).
Kapsam: hero, title/meta, OG, JSON-LD, footer, hakkımızda, hizmetler metinleri.
Değişen dosya listesini raporla. COMMIT ETME.
```

**Kabul:** `grep -rn "47+\|33.812\|39 şehir\|35.861"` boş döner.

## T5 — Lead hattı: Resend (yarım gün)

```
Teklif sihirbazının submit ucunu incele. Supabase'e yazan kısmı kaldır.
Yerine Resend ile e-posta: alıcı satis@objektifkriter.com.tr,
konu "Yeni Teklif Talebi — {ad} / {firma}", gövde tüm wizard alanları tablo halinde.
RESEND_API_KEY env kontrolü + anahtar yoksa FormSubmit fallback endpoint'i.
Başarı/hata durumları kullanıcıya net gösterilsin. COMMIT ETME.
```

**Uçtan uca test (Hakan):** test teklifi gönder → satis@ inbox'ta 60 sn içinde mail. Bu test GEÇMEDEN Faz 4'e geçilmez.

**Resend sıralama notu:** Domain DNS'i cutover'a kadar Tufan'da olduğu için Resend'in kendi domain doğrulaması henüz yapılamaz. T5'te mail Resend'in default göndericisinden çıkar (alıcı yine satis@) — bu normaldir, test geçerlidir. Gönderici adresin satis@objektifkriter.com.tr olması cutover randevusunda tamamlanır (Plan 3 / O2.5). İlk mailin spam klasörüne düşme ihtimaline karşı test sırasında spam klasörü de kontrol edilir.

## T6 — SEO teknik (yarım gün)

```
1. Sitemap'i envanter.json'dan yeniden üret — lastmod = bugün.
2. Her sayfa tipine özel metadata (şehir×format: "{İl}'de {Format} Reklamı | Objektif Kriter").
3. JSON-LD: LocalBusiness + Organization + FAQPage (ok-iframe'deki bloklar temel alınır).
4. robots.txt doğrula. Alt sayfalarda OG default kalmasın.
COMMIT ETME. Build + örnek 3 sayfanın <head> çıktısını raporla.
```

## T7 — QA + deploy (yarım gün)

- Claude Code: `vercel --prod` (v3 preview URL'i), Lighthouse raporu
- **Cowork (ben):** canlı URL'de tam tur — form, harita, 404, mobile, meta denetimi; bulgu listesi çıkarırım
- Hakan: bulgu onayı → düzeltme oturumu → cutover'a hazır işareti

---

## Oturum sırası özeti

| Oturum | Süre | Bağımlılık |
|---|---|---|
| T0 ortam | 30 dk | envanter.json indirildi |
| T1 veri modülü | ½ gün | T0 |
| T2 sayfalar | 1 gün | T1 |
| T3 harita | ½ gün | T1 (T2 ile paralel olabilir) |
| T4 rakamlar | 2 saat | T2 |
| T5 lead | ½ gün | bağımsız (T0 sonrası her an) |
| T6 SEO | ½ gün | T2, T4 |
| T7 QA | ½ gün | hepsi |
