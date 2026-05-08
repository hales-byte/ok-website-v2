# Cowork Başlangıç Promptu — OK Website v2 (Editöryel Değişiklikler)

> Bu dosyayı yeni bir Cowork session'unun ilk mesajı olarak kullan.
> Aşağıdaki bütün metni kopyala-yapıştır → "Devam et" de.
> Cowork agent zaten codebase'in tamamını okuyabilir, sadece doğru
> bağlamı + sınırları tanıttıktan sonra hızlı işe geçebilir.

---

## 📋 KOPYALANACAK PROMPT (BURADAN BAŞLAR)

Sen "Objektif Kriter" web sitesinin (`ok-website-v2`) v2 sürümünde
editöryel iyileştirme yapacaksın. Aşağıdaki bağlamı önce sindir, sonra
benim isteklerime göre değişiklik yap.

### Proje Özeti

Objektif Kriter — Türkiye'de OOH (out-of-home / açıkhava) reklam
çözümleri sunan firma. 47+ şehirde, 33.812+ reklam yüzü envanteri var.
Eski Wix sitesinden tamamen yeniden yazıldı. v2 Next.js 16 + Supabase +
Mapbox + Resend stack'iyle 8 Mayıs 2026'da Vercel'de yayına çıktı.

**Live URL:** https://ok-website-v2.vercel.app/
**Repo:** https://github.com/hales-byte/ok-website-v2 (origin/main otomatik deploy)
**Local path:** /Users/hakan/ok-website-v2

### Stack

- **Next.js 16** (App Router, Turbopack) — `app/` route klasörü
- **TypeScript** + ESLint
- **Tailwind v4** (CSS değişkenleri `app/globals.css`)
- **Supabase** (envanter ve form veritabanı, schema: `website`)
- **Mapbox** (harita gösterimi)
- **Resend** (form bildirim mailleri)
- **Vercel** (build + deploy + custom domain)

### Site Yapısı

```
app/
├── layout.tsx          # Root layout, metadata, JSON-LD Org, skip link
├── page.tsx            # Ana sayfa (hero, segment cards, FormatShowcase, 30dk, CTA)
├── globals.css         # Tailwind v4 tema değişkenleri + animations
├── opengraph-image.tsx # Site geneli OG (1200×630)
├── markalar/           # Persona landing — Pelin (kurumsal markalar)
├── ajanslar/           # Persona landing — Mert (reklam ajansları)
├── ilk-kampanyaniz/    # Persona landing — Burak (ilk açıkhava)
├── hizmetler/          # 8 OOH format detaylı, indikatif fiyat bantları
├── envanter/           # Mapbox harita + 47 şehir liste filtreleme
├── hakkimizda/         # Şirket hikayesi + değerler
├── iletisim/           # 4 kart (Email/WhatsApp/Merkez/Saatler) + sosyal
├── teklif-al/          # 6 adımlı multi-step form wizard
│   └── form/
│       ├── components/ # Step1...Step6 + WizardLayout + ResumeBanner
│       ├── submit-action.ts  # Server Action: Supabase + Resend
│       └── types.ts, state.ts, validation.ts, storage.ts, email-template.ts
├── sehir/[slug]/       # 47 şehir landing
│   └── [format]/       # 158 şehir+format kombinasyonu (dynamic)
│       └── opengraph-image.tsx  # Per-page dinamik OG
├── kvkk-aydinlatma/    # KVKK m.10 aydınlatma metni v2-2026-05
├── gizlilik/, cerez-politikasi/, kullanim-kosullari/  # Hukuki

components/
├── layout/{Header,Footer}.tsx
├── CookieBanner.tsx    # KVKK uyumlu çerez tercihi (opt-in)
├── CountUp.tsx, ScrollReveal.tsx  # Animasyon
├── CustomerProof.tsx   # Sosyal kanıt (lib/customers.ts boş ise gizli)
├── FormatShowcase.tsx  # Sticky scroll 8 format showcase
├── Logo.tsx, icons/WhatsAppIcon.tsx

lib/
├── formats.ts          # 8 OOH format meta (key, name, description, benefits, priceBand)
├── customers.ts        # Müşteri logo + case study TEMPLATE (boş — kullanıcı doldurur)
├── sehir-koordinatlari.ts, turkiye-sehirler.ts  # Şehir verisi
├── site-meta.ts        # Sabit revizyon tarihleri (sitemap için)
└── use-prefers-reduced-motion.ts  # WCAG için useSyncExternalStore hook
```

### Editöryel Değişiklik Yaparken Kurallar

#### 1. Dil ve Ton

Site **Türkçe**. İçerik tonu segment'e göre farklı kalibre:

- **Markalar segment** (`/markalar`): kurumsal disiplin, raporlanabilir, profesyonel ama mesafeli değil. Persona: "Pelin" — pazarlama müdürü, ROI odaklı.
- **Ajanslar segment** (`/ajanslar`): hız + esneklik, "biz iş ortağıyız" tonu, ajans terminolojisi (white-label, ratecard, brief). Persona: "Mert" — outdoor planner.
- **İlk-kez segment** (`/ilk-kampanyaniz`): sıcak, anlatıcı, "yalnız değilsin" — jargonsuz. Persona: "Burak" — Kadıköy kafe sahibi.

Persona detayları: [`docs/persona-feedback.md`](./persona-feedback.md)

#### 2. Sayı / Metrik Tutarlılığı

**Tek doğru çift:** **47+ şehir**, **33.812+ reklam yüzü**

Bu sayılar `app/page.tsx` ve `app/markalar/page.tsx`'te Supabase'den canlı çekiliyor (build-time). Statik metinde geçerse aynı çift olmalı. Önceden tutarsızlıklar (80+ lokasyon, 30.000+) düzeltildi — yeniden ekleme.

#### 3. "30 dakika yanıt" sözü

Site genelinde 6+ yerde geçer (hero, iletişim, ana sayfa CTA, form success). Her zaman **"30 dakika"** olarak yaz, "yarım saat / 24 saat / hızlıca" gibi alternatifler kullanma. Tutarlılık güven sinyali.

#### 4. KVKK / Yasal Metinler

`/kvkk-aydinlatma`, `/gizlilik`, `/cerez-politikasi`, `/kullanim-kosullari` sayfaları **avukat onaylı** sayılır — değişiklik öncesi mutlaka kullanıcıya sor. Versiyonlama: `app/kvkk-aydinlatma/page.tsx`'te `AYDINLATMA_VERSIYONU` constant. Metin değişirse versiyon artır (`v2-2026-05` → `v3-...`).

KVKK m.10 + m.5/1 atıfları Step6Onay'da var — bunlara dokunma.

#### 5. Erişilebilirlik

WCAG 2.1 AA pass durumda. Aşağıdakileri **bozmamaya dikkat et**:

- Buton kontrast: `--color-primary-deep` (#017A8A) — beyaz metin üzerinde 5.4:1
- Form etiketleri: `Step5Iletisim` FieldWrapper render-prop pattern (useId ile htmlFor↔id)
- Skip link: `app/layout.tsx`'te `<a href="#main">İçeriğe atla</a>`
- Global `:focus-visible` outline `globals.css`'te
- `prefers-reduced-motion` desteği `globals.css` + `use-prefers-reduced-motion.ts`

#### 6. Codebase Konvansiyonları

- **Türkçe değişken adları yok** — kod İngilizce, içerik Türkçe
- Component dosya adları **PascalCase** (`Footer.tsx`, `CustomerProof.tsx`)
- Sayfa dosyası `page.tsx`, layout `layout.tsx`
- CSS değişkenleri her yerde `var(--color-primary-deep)` formatıyla
- Lucide ikonlar default boyut 16-24
- `metadataBase: new URL("https://objektifkriter.com.tr")` (root layout)

#### 7. Pre-Commit Disiplini

Her commit öncesi **MUTLAKA**:

```bash
cd /Users/hakan/ok-website-v2
npm run lint        # 0 errors / 0 warnings olmalı
npx tsc --noEmit    # silent (no output) olmalı
```

Lint veya tsc kırılırsa commit etme — düzelt.

#### 8. Next.js 16 Uyarısı

`AGENTS.md`: **"This is NOT the Next.js you know"** — kod yazmadan önce
`node_modules/next/dist/docs/01-app/` klasörünü kontrol et. Bazı API'ler
değişmiş olabilir (params Promise vs sync, vb.).

### Mevcut Durum (8 Mayıs 2026)

✅ Site Vercel'de canlı (`ok-website-v2.vercel.app`)
✅ Form + mail akışı test edildi
✅ Lint + tsc temiz
✅ 5 ajan denetiminden Top 10+ fix uygulandı (a11y, SEO, KVKK, marka)
⏳ DNS yöneticisi Cloudflare kayıtlarını eklesin → `yeni.objektifkriter.com.tr` aktif olacak (10dk-24sa)

Detay: [`docs/status.md`](./status.md)'in 8 Mayıs bölümü.

### Sıkça Yapılacak Değişiklikler

#### Persona landing metni güncellemek
`app/markalar/page.tsx` veya `app/ajanslar/page.tsx` veya `app/ilk-kampanyaniz/page.tsx` — hero başlık, value prop'lar, FAQ, CTA. Persona tonuna sadık kal.

#### Format açıklaması güncellemek
`lib/formats.ts` — 8 format için `tagline`, `description`, `benefits`, `useCases`, `priceBand`. Burası **tek-kaynak** (single source of truth) — ana sayfa, hizmetler, sehir/format hepsi buradan okur.

#### Hero metnini değiştirmek
`app/page.tsx` — `<h1>` içindeki "Doğru lokasyonda, Doğru zamanda, Doğru kitleye." Bu cümle marka kimliğinin omurgası, çok dikkatli değiştir.

#### KVKK aydınlatma versiyonunu artırmak
`app/kvkk-aydinlatma/page.tsx`'te `AYDINLATMA_VERSIYONU = "v3-..."` artır + `Bolum`'larda metni güncelle. Form'da otomatik kaydedilir.

#### CTA buton metni
"Teklif Al", "WhatsApp ile yaz", "Envanteri Gör" — site genelinde aynı kalsın. Yeni varyant ekleme önce test gerek.

### Test ve Doğrulama Komutları

```bash
cd /Users/hakan/ok-website-v2

# Geliştirme
npm run dev          # localhost:3000

# Doğrulama
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript

# Production build
npm run build        # Lokal Mac'te (sandbox network problemi nedeniyle CI'da değil)

# Smoke test (dev server açıkken)
for p in / /hizmetler /iletisim /teklif-al /envanter /markalar /ajanslar /ilk-kampanyaniz; do
  curl -s -o /dev/null -w "$p HTTP %{http_code}\n" -m 30 "http://localhost:3000$p"
done
```

### Faydalı Dosyalar

| Dosya | Ne için |
|---|---|
| `README.md` | Proje genel bakış, stack, env vars |
| `docs/status.md` | Operasyonel durum, son oturum çalışmaları |
| `docs/roadmap.md` | Faz planı (Faz 4 AI vizyon, vs.) |
| `docs/deploy-prep.md` | Vercel deploy checklist |
| `docs/dns-records.md` | DNS yöneticisine 5 kayıt referansı |
| `docs/persona-feedback.md` | 3 persona detaylı analiz |
| `docs/resend-domain-mektup.md` | DNS yöneticisi için mektup şablonu |
| `lib/formats.ts` | 8 OOH format meta (single source) |
| `lib/site-meta.ts` | Sitemap revizyon tarihleri |
| `lib/customers.ts` | Müşteri logo + case study (BOŞ — doldurmayı bekliyor) |

### Şimdi Sen Ne Yapıyorsun?

Yukarıdaki bağlamı sindirdiysen, **sırada hangi editöryel iyileştirmeyi
yapacağımı söyleyeceğim**. Yapacağın işler genelde şunlardan biri:

- Hero / segment kart metinleri güzelleştirme
- Persona landing'lerinde içerik derinleştirme
- Format açıklamalarını netleştirme (lib/formats.ts)
- KVKK / yasal metin güncelleme (önce onayım gerekir)
- Footer / Header / iletişim kartları metinleri
- 4-adım süreç (Sizi dinleyelim → Planlayalım → Mesajınızı Taşıyalım → Yayın) açıklamaları
- Form wizard adımlarındaki açıklayıcı metinler

Her değişiklik sonrası: `npm run lint` + `npx tsc --noEmit` temiz olmalı. Commit + push otomatik Vercel deploy alır.

**Hazırsan:** "Anladım, hangi sayfada ne değiştirelim?" diye yanıtla.

---

## 📋 PROMPT BİTİYOR

Yukarıdaki kısmı kopyalayıp Cowork session'una yapıştır.

### Cowork session açma checklist

1. Cowork'te yeni session aç (`/cowork` veya plugin command)
2. Working directory: `/Users/hakan/ok-website-v2`
3. Promptu yapıştır + "Devam et" / "Hazırsan başla" yaz
4. Agent senin onayını verdiğinde editöryel komutlarına başla
5. Her commit + push origin/main → Vercel otomatik deploy
6. DNS doğrulaması paralel devam ediyor — Cowork onu beklemiyor

### Cowork agent'a hatırlatabileceğin notlar

- "Buton metni değişikliklerinde 3 segment dilini koru"
- "Form metni değişikliklerinde KVKK m.10 + m.5/1 atıflarına dokunma"
- "47+ şehir / 33.812+ yüz tutarlılığını boz ma"
- "Yeni içerik eklerken Türkçe karakter (ı, ğ, ü, ş, ö, ç) kullan, ASCII versiyonu değil"
