# Çalışma Durumu

> Son güncelleme: 7 Mayıs 2026

Bu dosya kısa vadeli operasyonel durumu tutar. Faz planı için
[roadmap.md](./roadmap.md)'ye bak.

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
