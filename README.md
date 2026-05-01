# Objektif Kriter — Web v2

Türkiye genelinde OOH reklam çözümleri sunan Objektif Kriter'in kurumsal web sitesi. Wix tabanlı eski siteden Next.js + Supabase mimarisine geçiş.

**Live:** [objektifkriter.com.tr](https://objektifkriter.com.tr) (deploy edilince)

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS v4 (tema değişkenleri `app/globals.css`)
- **Veritabanı:** Supabase (PostgreSQL + RLS)
- **İkonlar:** Lucide React (brand ikonlar inline SVG)
- **Font:** Inter (Google Fonts via `next/font`)
- **Deploy:** Vercel (planlı)

## Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Dev server (localhost:3000)
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint
```

## Environment Variables

`.env.local` dosyasında bulunması gereken değişkenler:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://fkagnwhljbkjxihfuccv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...

# Mapbox (Faz 5'te eklenecek)
# NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...

# Resend (Faz 4'te eklenecek)
# RESEND_API_KEY=re_...
```

## Supabase Yapısı

**Proje:** `objektif-kriter-dashboard` (`fkagnwhljbkjxihfuccv`)
**Schema:** `website` (public schema'dan ayrı, OK Satış CRM ile karışmasın diye)

### Tablolar
- `website.envanter` — 260 satır, OOH lokasyon envanteri (217 aktif)
- `website.talepler` — Form gönderimleri (Faz 4'te aktif olacak)

### RLS Politikaları
- `anon` rol: sadece `aktif=true` envanteri SELECT, `talepler`'e INSERT
- `authenticated` rol: tam erişim

### Önemli ayar
Supabase Dashboard → Integrations → Data API → Settings → **Exposed schemas** alanında `website` eklenmiş olmalı. Yoksa PostgREST 406 hatası verir.

## Klasör Yapısı

```
ok-website-v2/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer wrapper)
│   ├── page.tsx            # Ana sayfa (hero + sayaç + formatlar + süreç + CTA)
│   ├── globals.css         # Tailwind v4 tema değişkenleri
│   ├── not-found.tsx       # 404 sayfası
│   ├── loading.tsx         # Loading state
│   ├── error.tsx           # Runtime hata sayfası
│   ├── sitemap.ts          # Otomatik /sitemap.xml
│   ├── robots.ts           # Otomatik /robots.txt
│   ├── hizmetler/page.tsx  # 7 OOH formatı detaylı
│   ├── hakkimizda/page.tsx # Şirket hikayesi + değerler
│   └── iletisim/page.tsx   # İletişim + sosyal medya
├── components/
│   ├── Logo.tsx            # 3 boyutlu logo (sm/md/lg)
│   └── layout/
│       ├── Header.tsx      # Sticky header + mobile menü
│       └── Footer.tsx      # 4 sütunlu footer
├── public/
│   └── logo.png            # Saydam arka planlı logo (800×266)
└── .env.local              # Environment variables (git'e commit edilmez)
```

## Faz Durumu

### ✅ Tamamlandı

- **Faz 0 — Kurulum:** Repo, Supabase, paketler, env
- **Faz 1 — Tasarım sistemi:** Tailwind v4 tema, Header, Footer, Logo, ana sayfa hero
- **Faz 2 — İçerik sayfaları:** /hizmetler, /hakkimizda, /iletisim
- **Faz 6 — SEO altyapısı:** sitemap.ts, robots.ts
- **UX altyapısı:** 404, loading, error sayfaları

### ⏳ Yarın için kalan

- **Faz 3 — Dinamik landing pages:** `/[sehir]-[format]-reklam` paterni, `generateStaticParams` ile Supabase'den
- **Faz 4 — Form:** /teklif-al sayfası + Resend API entegrasyonu (`satis@objektifkriter.com.tr`'ye email)
- **Faz 5 — Mapbox haritası:** /envanter sayfası, "yakındakiler" geocoding
- **Faz 7 — Deploy:** Vercel + DNS (Wix'ten transfer)

## Tasarım Notları

### Renk paleti (logo gradient'inden)
- Primary: `#00E4FF` (parlak turkuaz)
- Primary hover: `#00CCE4`
- Primary deep: `#01B5CC`
- Background: `#0A0E14`
- Surface: `#131820`

### Tipografi
- Inter (latin + latin-ext, weight 400/500/700)
- Hero: 5xl-7xl, bold
- Section: 3xl-5xl
- Body: base/lg

### CSS değişkenleri
Tüm renkler `app/globals.css`'te `@theme` direktifiyle tanımlı. Component'lerde `var(--color-primary)` ile kullanılır. Tailwind v3'teki `tailwind.config.ts` yok — Tailwind v4 native CSS kullanıyor.

## Bilinen Sorunlar / Notlar

- **Lucide brand ikonları:** Yeni sürümlerde `Linkedin`, `Instagram` gibi marka ikonları kaldırıldı (telif). Bunlar inline SVG olarak `Footer.tsx` ve `app/iletisim/page.tsx`'te tanımlı.
- **Port 3000 sıkışıklığı:** Dev server'ı kapatırken bazen Node süreci ölü kalıyor. Çözüm: `killall node` sonra `rm -rf .next && npm run dev`.
- **Cursor AI müdahalesi:** Karmaşık değişikliklerde Cursor AI otomatik düzeltme öneriyor ama yanlış yöne gidiyor. Tasarım/mimari değişikliklerinde AI panelini kapatmak iyi pratik.

## Deploy (Faz 7'de yapılacak)

1. Vercel hesabına bağlan, GitHub repo seç
2. Environment variables ekle (yukarıdaki liste)
3. Build command: `npm run build`
4. Output: `.next`
5. Custom domain: `objektifkriter.com.tr` ekle
6. Wix'teki DNS A/CNAME kayıtlarını Vercel'e yönlendir

---

## Kaynaklar

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Lucide Icons](https://lucide.dev/)
