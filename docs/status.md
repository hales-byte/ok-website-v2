# Çalışma Durumu

> Son güncelleme: 8 Mayıs 2026

Bu dosya kısa vadeli operasyonel durumu tutar. Faz planı için
[roadmap.md](./roadmap.md)'ye bak.

---

## Son oturumda yapılanlar (8 Mayıs)

### 🚀 Yayına çıkış

- **Vercel canlı**: [`ok-website-v2.vercel.app`](https://ok-website-v2.vercel.app/) — Next.js 16, 7 env var, 224 sayfa prerender
- **Form gönderim canlı test ✅** — gmail'e mail düştü (Resend test mode)
- **Resend domain**: `objektifkriter.com.tr` Resend'de eklendi (Ireland region)
- **Vercel custom domain stage**: `yeni.objektifkriter.com.tr` eklendi (DNS doğrulanmayı bekliyor)
- **DNS yöneticisi mektubu**: [`docs/dns-records.md`](./dns-records.md) — 5 kayıt (4 Resend + 1 Vercel CNAME), Cloudflare bulk import için BIND zone file dahil. DNS yöneticisine iletildi, yanıt bekleniyor.

### 🕵️ 5 paralel agent denetimi → Top 5 fix uygulandı

5 paralel uzman ajan: UX/Tasarım, Erişilebilirlik (WCAG), SEO, Code Quality, KVKK. Detay: [`docs/persona-feedback.md`](./persona-feedback.md) (3 persona) + 5 ajan raporu sentezi.

Uygulanan düzeltmeler:

**Erişilebilirlik (WCAG 2.1 AA)**
- `.btn-primary` kontrast: #01B5CC (~2.55:1) → `#017A8A` (~5.4:1) ✅ AA pass
- Yeni `--color-primary-darker: #015F6D` (hover, ~7:1)
- Global `:focus-visible` outline (klavye odağı her yerde görünür)
- "İçeriğe atla" skip-link (`layout.tsx`, klavye Tab'la görünür)
- `Step5Iletisim` form etiketleri: `useId` + `htmlFor` + `aria-required` + `aria-invalid` + `aria-describedby` (FieldWrapper render-prop'a çevrildi)
- Step1Segment 350ms otomatik ileri geçişi kaldırıldı (WCAG 3.2.2)

**SEO**
- `Organization` JSON-LD (root layout)
- `Service` + `BreadcrumbList` JSON-LD (158 dynamic /sehir/[slug]/[format] sayfası)
- Şehir-spesifik meta description'lar (`Ankara'da billboard reklam: 18 lokasyon · 2.946 reklam yüzü...`)
- Site geneli **OG image** 1200×630 (`app/opengraph-image.tsx`)
- Per-page **OG image** sehir/format için (158 unique görsel)
- **İç linkleme grid** sehir/format sayfasında: "Aynı format diğer şehirlerde" + "Aynı şehirde diğer formatlar" (orphan fix)
- Sitemap `lastmod` sabit revizyon tarihi (`lib/site-meta.ts`) — önceki `now()` her dakika değişiyordu, Google bot crawl bütçesi heba ediyordu
- Migration SQL: `scripts/migrations/01-add-updated-at.sql` (uygulanırsa sitemap otomatik DB tarihlerini kullanır)

**KVKK Uyumu (v2-2026-05)**
- Aydınlatma Metni → Bölüm 5: Resend (AB-İrlanda eu-west-1) + Mapbox + Supabase + Vercel sağlayıcılar **tablosu** (hizmet / sağlayıcı / sunucu konumu / aktarılan veri)
- Bölüm 9: `kvkk@objektifkriter.com.tr` ayrı başvuru kanalı eklendi
- Form Step6 onay metni: KVKK m.10 (aydınlatma) + m.5/1 (açık rıza) atıfları belirgin

**Marka & İçerik**
- Sayı tutarlılığı: "80+ lokasyon, 30.000+" → "47+ şehir, 33.812+ reklam yüzü" (4 yerde — layout meta, Footer, envanter meta)
- Hero priority prop ile flicker yok (önceki ScrollReveal IntersectionObserver gecikmesi)
- CountUp başlangıç değeri = end (kullanıcı sayacı geçse "0+" şoku görmez)

**Navigation**
- Header'a **Çözümler ▾** dropdown: Markalar / Reklam Ajansları / İlk Açıkhava Kampanyam → 3 persona landing'ine sitewide link

**Form & Mail**
- `submit-action.ts`: `RESEND_TO` virgülle ayrılmış multi-recipient destekli (DNS doğrulanınca iki adrese gönderim)

### 🛑 Atlanan / İlerletilmeyen

- **Wix → Vercel cutover + 301 redirect haritası** — `site:objektifkriter.com.tr` Google sonucu = **0 indeks**. Cutover'da gereksiz, basit DNS yönlendirmesi yeterli olacak.
- **ScrollReveal CSS-only refactor** — büyük scope, marginal performance getiri, sonraya bırakıldı.
- **`lib/customers.ts`** — boş (gerçek müşteri logo + case study eklendiğinde homepage + 3 landing CustomerProof bölümü otomatik göstermeye başlar; veri yoksa gizli kalır).

### 📋 Bekleyen tek adım

DNS yöneticisi Cloudflare'a 5 kaydı eklesin → Resend ve Vercel domain'leri otomatik doğrulanır → 2 dakika iş kalır:

1. Vercel env: `RESEND_TO=hakan.karacam@objektifkriter.com.tr,yhakan.karacam@gmail.com`
2. Vercel **Redeploy**
3. `https://yeni.objektifkriter.com.tr` smoke test
4. Test mail gönder, iki inbox'ta da görünüyor mu doğrula

---

## Son oturumda yapılanlar (7 Mayıs)

### Adsız klasördeki 7 görselden gelen içerik düzenlemeleri

- **Ana sayfa segment kartları** yeniden yazıldı: *Markalar / Reklam
  Ajansları / İlk Açıkhava Kampanyam* — duygusal/hedef-kitle odaklı
  bölüm başlığı.
- **4 adım süreç** başlıkları eylem fiiline çevrildi: *Sizi dinleyelim
  / Planlayalım / Mesajınızı Taşıyalım / Yayın*.
- **Form başarı ekranı**: "Talebiniz **ulaştı**" + "30 dakika içinde
  Satış Uzmanımız sizinle iletişime geçecek" + iletişim email satırı.
- **Hakkımızda**: "47+ şehirde N+ reklam yüzü…" paragrafı kaldırıldı;
  Operasyon sadeliği + Hızlı yanıt kart metinleri yenilendi; sayaçtaki
  "24h Yanıt Süresi" → "30 dk Yanıt Süresi".
- **İletişim**: WhatsApp kartı eklendi (`+90 552 918 58 64`,
  `wa.me` linki ile), grid 3 → 4 sütun (sm:2 / lg:4).
- **24 saat → 30 dakika** site genelinde tutarlı (6 yerde): iletişim
  hero + meta description, şehir CTA, API success mesajı, hakkımızda
  sayacı, ana sayfa CTA.

### Form akışı netleştirildi

Legacy temizlendi:
- `app/api/teklif-al/route.ts` — silindi (REST endpoint, kullanılmıyordu)
- `app/teklif-al/teklif-form.tsx` — silindi (eski tek-sayfa form)

Aktif yol artık tek: `TeklifWizard` → `submit-action.ts` (server action,
Resend bildirimi entegre, KVKK meta tam).

### Git temizliği

Birikim 3 anlamlı commit'e bölündü (henüz `git push` edilmedi):

| Hash | Konu |
|---|---|
| `c15bc24` | feat(form): wizard + KVKK paketi (4 sayfa) + cookie banner + Resend + paylaşılan lib |
| `df9139d` | feat(envanter): Mapbox harita + sitemap güncellemesi |
| `f990d4c` | feat(content+theme): light tema + ana sayfa modernizasyonu + içerik refresh |

`tsc --noEmit` hatasız. Working tree temiz. Branch `origin/main`'in
**3 commit önünde** — `git push` bekliyor.

---

## Yarın ilk yapılacaklar (sırayla)

### 1. Yerelde gözle test (en ucuz, en yüksek değer)

`npm run dev` ile baştan sona kontrol:
- [ ] **Form akışı**: wizard 6 adımı sırayla doldur, gönder. Kontrol:
  - Supabase `website.talepler` tablosuna satır düştü mü?
  - Resend mail geldi mi? (env var ise)
  - Success ekranı doğru gözüküyor mu?
  - localStorage resume banner çalışıyor mu? (yarıda kapatıp
    geri dönerek dene)
  - URL deep-link `?step=3` ya da `?sehir=ANKARA` çalışıyor mu?
- [ ] **Light tema göz testi**: hero gradient, sayaçlar, kart hover'ları,
  FormatShowcase sticky scroll, envanter haritası — kontrast yeterli mi,
  okunaklı mı?
- [ ] **Mobile responsive**: özellikle iletişim 4-sütun WhatsApp
  grid'i (sm:2 / lg:4), wizard adımları, envanter sidebar+harita,
  FormatShowcase.
- [ ] **404 / error / loading sayfaları** light temada güncel mi?
- [ ] **Mapbox token**: `.env.local`'de `NEXT_PUBLIC_MAPBOX_TOKEN` var
  mı? Yoksa /envanter haritası gri kalır.

### 2. Lint düzeltme

`npm run lint`'te **4 react-hooks hatası** var:
- `components/CountUp.tsx:50` — "setState in effect"
- `components/ScrollReveal.tsx:49` — "setState in effect"

CI'da blocker olabilir. Düzeltme: ya effect'ten önce derived value
kullan, ya da `useLayoutEffect` + ref. (Hızlı çözüm:
`useState`'in initializer fonksiyonunda `prefersReducedMotion` kontrolü.)

### 3. Resend domain doğrulama hazırlığı

DNS sahibine gönderilecek istek metnini yaz. Roadmap 3.1.1'de
adımlar yazılı:
- DKIM (1 CNAME)
- SPF (1 TXT)
- DMARC (1 TXT)
- MX kontrolü

Resend dashboard'dan ham kayıtları al, kısa bir email/WhatsApp
mesajıyla gönder. Doğrulama 10 dk - 24 saat sürer.

---

## Sonra — Yayına çıkış (Faz 7)

### 4. Vercel deploy

- Vercel hesabına bağlan, GitHub repo seç
- Environment variables ekle:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_MAPBOX_TOKEN`
  - `RESEND_API_KEY`
  - `RESEND_FROM` (domain doğrulanınca `bildirim@objektifkriter.com.tr`)
  - `RESEND_TO` (domain doğrulanınca `hakan.karacam@objektifkriter.com.tr`)
- Preview deploy → bir tur test → production

### 5. Wix → Vercel cutover

- Eski Wix URL'lerinden yeni Next.js URL'lerine **301 redirect haritası**
  çıkar (SEO için kritik).
- Önce subdomain'de (`yeni.objektifkriter.com.tr` gibi) stage et,
  sonra ana domain'i transfer et.
- Wix sitesi tek seferde gider — geri dönüş zor, sakin yap.

---

## Yayın sonrası bekleyen (uzak)

- **Faz 3.2** — Manuel müşteri yanıt akışı (zaten yeterli, otomasyon
  henüz gerekmiyor)
- **Faz 4** — AI destekli ilk yanıt taslağı + WhatsApp Business
- **Faz 5** — Operasyon dashboard

---

## Bilinen sorunlar / notlar

- Sandbox build network'e erişemiyor (SWC binary). Yerel Mac'te
  `npm run build` çalıştırılmalı.
- `lib/formats.ts:50`'deki "24 saat sürekli görünürlük" billboard
  özelliği bağlamında doğru, **değiştirilmedi**.
- `.next/` cache temizlendi (stale type validator referansı vardı).
