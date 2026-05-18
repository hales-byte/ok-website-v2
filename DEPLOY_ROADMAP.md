# Objektif Kriter Web v2 — Canlıya Çıkış Yol Haritası

> **Tarih:** 17 Mayıs 2026
> **Hedef domain:** objektifkriter.com.tr (şu an Wix'te)
> **Hosting hedefi:** Vercel

---

## 0. Şu anki durum (tespit özeti)

- **Yerel kod:** Git tamir edildi, fresh repo ile merge edildi. **17 dosyada commit edilmemiş geliştirme** mevcut (~941 satır, çoğunlukla teklif formu submit-action, markalar, şehir dinamik sayfaları).
- **Bağımlılıklar:** Kaynak repo eksiksiz (`package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `components/`, `lib/` hepsi yerli yerinde).
- **Build kalıntıları:** Eski `node_modules/`, `.next/`, `tmp/` klasörleri yerelde duruyor — yeni `npm install` ile temiz başlamak en sağlıklısı.
- **Repo:** GitHub'da public/private (şu an public, deploy sonrası tekrar private yapılabilir).

---

## 1. Yerelde temiz başlangıç (~10 dk)

Terminal'de:

```bash
cd ~/Projects/HalesCOMP/06-OK-Objektif-Kriter/web-v2

# Eski artifacts'i temizle
rm -rf node_modules .next tmp .DS_Store
rm -rf .claude .claude-flow  # Cursor/Claude config artifact'leri, gerekli değil
rm -f .git/index.lock  # Sandbox'ın bıraktığı kilit dosyası

# Bağımlılıkları kur
npm install

# .env.local oluştur
cp .env.local.example .env.local
# Sonra .env.local'i aç ve Supabase anon key'i tam olarak yapıştır
# (Supabase Dashboard → Settings → API → Project API keys → anon public)

# Lokal dev test
npm run dev
# Tarayıcıda http://localhost:3000 — sayfalar açılıyor mu kontrol et

# Lokal production build test
npm run build
# Build geçtiyse:
npm run start
# http://localhost:3000 → production modunda
```

**Beklenen:** Hem `npm run dev` hem `npm run build` hatasız çalışmalı.
**Eğer build hata verirse:** Yereldeki 17 modifiye dosyada lint/type hatası olabilir. Hata mesajını paylaş.

---

## 2. Yereldeki çalışmayı commit et (~5 dk)

Mevcut 17 değişmiş dosya henüz commit'lenmemiş. Önce bunları kaydet:

```bash
cd ~/Projects/HalesCOMP/06-OK-Objektif-Kriter/web-v2
git status  # 17 modifiye dosya görmen lazım
git diff app/teklif-al/form/submit-action.ts  # Örnek diff'e bak
git add -A
git commit -m "feat: teklif form submit, markalar ve sehir sayfalari guncellemesi"
git push origin main
```

**Eğer git push'ta auth sorun olursa:** GitHub Personal Access Token ile veya SSH key ile auth gerek.

---

## 3. Vercel'e bağla (~5 dk)

1. https://vercel.com → "Add New Project"
2. **Import Git Repository** → GitHub hesabına bağlan → `hales-byte/ok-website-v2` seç
3. Framework Preset: **Next.js** (otomatik algılanır)
4. Build & Output Settings: **default** bırak (Next.js standart)
5. Environment Variables — şu anda 2 zorunlu var (Resend ve Mapbox sonra eklenecek):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://fkagnwhljbkjxihfuccv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Supabase Dashboard'dan tam anon key)
6. **Deploy** → ilk build ~2 dk
7. Vercel sana `ok-website-v2-xxx.vercel.app` gibi geçici URL verecek — orada test et

---

## 4. Custom domain ekle (~5 dk Vercel tarafı)

Vercel'de:
1. Project Settings → **Domains**
2. `objektifkriter.com.tr` ekle → "Add"
3. Vercel sana iki seçenek sunar:
   - **A Record** → `76.76.21.21` (Vercel'in apex IP'si)
   - **CNAME (www için)** → `cname.vercel-dns.com`
4. Aynı şekilde `www.objektifkriter.com.tr` da ekle (apex → www redirect tercih edilir)

---

## 5. DNS ayarlarını Wix'ten geç (~10 dk + propagation süresi)

**Önemli:** Wix domain hangi yerden yönetiliyor? İhtimaller:
- **A) Domain Wix'ten alınmış** → Wix DNS panelinden yönet
- **B) Domain başka kayıt eden firmada** (Natro, GoDaddy, Nictr, vb.) ve Wix'e nameserver olarak verilmiş

### A senaryosu (Wix'ten alındıysa)
1. Wix → Domains → objektifkriter.com.tr → **Advanced DNS** veya "Connect a domain to a different site"
2. Mevcut A kayıtlarını sil
3. Şu kayıtları ekle:
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
4. **DİKKAT:** Wix'in site'i otomatik kapatma uyarısı çıkabilir — onayla.

### B senaryosu (başka kayıt edici)
1. Mevcut kayıt edicide (Natro/GoDaddy vs.) DNS panelini aç
2. Yukarıdaki A ve CNAME kayıtlarını ekle
3. Eğer nameserver Wix'e işaret ediyorsa, önce nameserver'ı kayıt edicinin default'una geri çevir, sonra A/CNAME ekle.

### DNS propagation
- Genelde 5 dk ile 2 saat arası, max 48 saat
- Test: `dig objektifkriter.com.tr` veya https://dnschecker.org
- Vercel'de Domain Settings'te domain ✓ yeşil olduğunda hazır.

---

## 6. SSL sertifikası (otomatik)

Vercel domain bağlandıktan sonra Let's Encrypt SSL'i 1-2 dakikada otomatik kurar. Yapacağın bir şey yok.

---

## 7. Sonrası — Faz 4 ve Faz 5 entegrasyonları

Bu adımlardan sonra site canlı ama 2 özellik henüz eksik:

### Faz 4: Teklif formu email gönderimi (Resend)
- Yereldeki `app/teklif-al/form/submit-action.ts` zaten Resend kullanacak şekilde yazılmış görünüyor (kodu kontrol et)
- Resend hesabı aç → API key al → DNS'te `objektifkriter.com.tr` için Resend SPF + DKIM ekle
- Vercel'e 3 env var ekle: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`
- Redeploy

### Faz 5: Mapbox harita (/envanter)
- Mapbox hesabı aç → Public token al
- Vercel'e 2 env var ekle: `NEXT_PUBLIC_MAPBOX_TOKEN`, `NEXT_PUBLIC_MAPBOX_STYLE_URL`
- Redeploy

---

## Önemli notlar

- **Supabase RLS:** Anon role için `website.envanter` SELECT izni ve `website.talepler` INSERT izni olmalı. Yoksa form/envanter sayfası 401 verir.
- **Supabase Exposed Schemas:** Dashboard → Integrations → Data API → Settings'te `website` schema'sı listede olmalı. Yoksa PostgREST 406 döner.
- **Wix down-time:** A kayıtlarını değiştirdiğin anda Wix sitesi erişilemez hale gelir. Yeni site Vercel'de hazırken (propagation ~5-30 dk) bir kısa süre 404 görenler olabilir. Geceyarısı/sabaha karşı zaman aralığı tercih edilebilir.
- **Wix → Vercel'e geçiş öncesi:** Eski Wix sitesinin bazı URL'leri Google'da indekslenmişse, eski URL paternleri için 301 redirect kurman gerekebilir. Önce `app/sitemap.ts` çıktısıyla yeni URL listesini kontrol et.

---

## DNS YAPILDIKTAN sonra ne çalışır?

Yukarıdaki 1-6 adımlar tamamlandıktan sonra:

- ✅ Anasayfa + tüm statik sayfalar (hizmetler, hakkımızda, iletişim, KVKK, çerez politikası, kullanım koşulları, gizlilik, ajanslar, ilk kampanyanız)
- ✅ Markalar sayfası (Supabase'den müşteri verileri çekiyor)
- ✅ Şehir bazlı dinamik sayfalar (`/sehir/[slug]`, `/sehir/[slug]/[format]`) — Supabase envanter'den `generateStaticParams` ile
- ✅ /envanter sayfası — Supabase'den envanter listesi (ama Mapbox token yoksa harita boş görünür)
- ✅ /teklif-al wizard — 6 adımlı form çalışır, validation ve localStorage ile resume bantı çalışır
- ⚠️ Form GÖNDERİMİ — Resend env vars yoksa 500 verir. **Form aktif değil demektir.**
- ✅ SEO altyapısı (sitemap.xml, robots.txt, OpenGraph image)
- ✅ SSL otomatik (HTTPS)

---

## Tahmini toplam süre

| Adım | Süre |
|---|---|
| 1. Yerelde npm install + build test | 10 dk |
| 2. Commit + push | 5 dk |
| 3. Vercel bağla | 5 dk |
| 4. Custom domain | 5 dk |
| 5. DNS değişikliği | 10 dk |
| 6. DNS propagation bekleme | 5 dk - 2 saat |
| **TOPLAM (aktif çalışma)** | **~35 dk** |
| **TOPLAM (propagation dahil)** | **1-3 saat** |

---

## Geri dönüş planı

Bir sorun çıkarsa:

- **Vercel'de hata:** Domains'ten objektifkriter.com.tr'yi kaldır → Wix DNS'i geri yükle (~5 dk down-time)
- **Yerel'de build hatası:** `.next` sil, `npm install --force` dene, hata mesajını paylaş
- **Git push reddedilirse:** PAT/SSH auth gerek, GitHub Settings → Developer Settings → PAT oluştur
