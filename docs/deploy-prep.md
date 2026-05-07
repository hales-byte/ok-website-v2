# Deploy Hazırlığı — Faz 7

> Hazırlandı: 8 Mayıs 2026

Bu doküman canlıya çıkarken atılacak somut adımları, kullanılacak env
var listesini ve DNS sahibine gönderilecek Resend domain doğrulama
mektubunun şablonunu içerir.

---

## 1. Pre-flight: Yerel Sağlık Kontrolü

Tamamlandı (8 Mayıs):

- [x] Lint temiz (`npm run lint` → 0 errors, 0 warnings)
  - `CountUp.tsx`, `ScrollReveal.tsx`: `useSyncExternalStore`
    ile `usePrefersReducedMotion` hook'una refactor edildi
    (yeni dosya: `lib/use-prefers-reduced-motion.ts`)
  - `CookieBanner.tsx`: `useEffect` + setState pattern'i
    `useSyncExternalStore` ile localStorage okumaya çevrildi
  - `TeklifWizard.tsx:92`: tek satır
    `eslint-disable-next-line react-hooks/set-state-in-effect`
    + sebep yorumu (one-shot hydration için meşru istisna)
- [x] Type check temiz (`tsc --noEmit` sessiz)
- [x] Dev server smoke test — tüm rotalar HTTP 200, 404 sayfası çalışıyor:
  `/`, `/hizmetler`, `/hakkimizda`, `/iletisim`, `/teklif-al`,
  `/envanter`, `/cerez-politikasi`, `/gizlilik`, `/kvkk-aydinlatma`,
  `/kullanim-kosullari`, `/sehir/[sehir]-[format]-reklam`
- [x] Cookie banner end-to-end: kabul → kapat → yenile → tekrar açılmıyor
- [x] CountUp animasyonu çalışıyor (0 → hedef değer)
- [x] ScrollReveal animasyonu çalışıyor (opacity 0 → 1 viewport girişinde)

Bekleyen küçük not:
- `[browser] Image with src "/logo.png" has either width or height
  modified, but not the other` — Next.js Image aspect-ratio uyarısı.
  `Logo.tsx`'te `style={{ width: "auto" }}` ya da
  `height: "auto"` eklenince susar. Deploy blocker değil ama temiz
  konsol için yapılabilir.

---

## 2. Env Var Listesi (Vercel'e eklenecek)

| Var | Durum | Not |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Var | `https://fkagnwhljbkjxihfuccv.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Var | `sb_publishable_...` (anon, RLS aktif olduğu için açık paylaşılır) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ⚠️ Yok | `/envanter` haritası için zorunlu. [Mapbox dashboard](https://account.mapbox.com/access-tokens/) → "Create token" → `pk.eyJ...` |
| `RESEND_API_KEY` | ✅ Var | Test mode'da çalışıyor |
| `RESEND_FROM` | 🟡 Test | Domain doğrulanana kadar Resend default. Doğrulanınca → `bildirim@objektifkriter.com.tr` |
| `RESEND_TO` | 🟡 Test | Şu an `yhakan.karacam@gmail.com`. Doğrulanınca → `hakan.karacam@objektifkriter.com.tr` |

**Vercel'e eklerken:**
- Production, Preview, Development için ayrı eklenebilir. Production +
  Preview yeterli; Development'ta `.env.local` dosyası kullanılır.
- `NEXT_PUBLIC_*` ile başlayan değişkenler tarayıcıya iner — public anon
  key zaten açık olduğu için sorun yok, ama Mapbox token'ında URL
  kısıtlaması (allowed URLs) tanımlamak iyi pratik (Mapbox panelinde).

---

## 3. Vercel Deploy Adımları

1. **Repo push:** `git push origin main` — şu an 3 commit önde
   (`c15bc24`, `df9139d`, `f990d4c` + bu oturumdaki lint fix
   commit'i).
2. **Vercel dashboard:** [vercel.com/new](https://vercel.com/new) →
   GitHub repo seç → import.
3. **Framework preset:** Next.js (otomatik algılanır).
4. **Environment Variables:** Yukarıdaki tablodan Production +
   Preview için ekle. Mapbox yoksa şimdilik boş bırak — `/envanter`
   haritası gri görünür, başka sayfalar etkilenmez.
5. **Deploy:** Vercel otomatik build alır. İlk build ~2-3 dk.
6. **Preview test:** `[proje].vercel.app` URL'inde:
   - Form gönderimini test et (Resend mail gelmeli)
   - Light tema, mobile responsive
   - Mapbox token eklendiyse harita
7. **Custom domain:** Vercel project → Settings → Domains →
   `objektifkriter.com.tr` ekle. DNS yönlendirme adımı 6'da.

---

## 4. Wix → Vercel Cutover (DNS)

> Riskli adım — geri dönüşü zor. Önce subdomain'de stage et, sonra
> ana domain.

### 4.1 Stage (önerilen)

1. Vercel domain panel: `yeni.objektifkriter.com.tr` ekle
2. Wix DNS panel (ya da kim yönetiyorsa):
   - `yeni` için CNAME → `cname.vercel-dns.com`
3. 5-30 dk DNS propagasyonu → `https://yeni.objektifkriter.com.tr`
   açılmalı
4. Tüm sayfaları gerçek domain altında bir kez daha gez

### 4.2 Ana domain transfer

1. Vercel domain panel: `objektifkriter.com.tr` (ana) ekle. Vercel
   "DNS değiştir" diyecek, A/CNAME kaydı söyleyecek.
2. Wix DNS panel:
   - Apex (`@`) için A → `76.76.21.21` (Vercel IP)
   - `www` için CNAME → `cname.vercel-dns.com`
   - Resend için DKIM/SPF/DMARC kayıtları (5. bölüm)
3. Wix sitesi tek seferde çevrim dışına gider — DNS TTL kadar süre
   olabilir.

### 4.3 301 Redirect Haritası (SEO için kritik)

Wix sitenin URL paterni v2'ye birebir eşleşmiyorsa redirect tablosu
gerekir. Eski Wix URL'lerini listele, yeni Next.js URL'lerine map'le.
`next.config.ts`'e `redirects()` ekle:

```ts
async redirects() {
  return [
    { source: "/eski-yol", destination: "/yeni-yol", permanent: true },
    // ...
  ];
}
```

`permanent: true` → 301. Google Search Console'dan eski URL'ler
indekste varsa link equity korunur.

---

## 5. Resend Domain Doğrulama (DNS Admin'e Mektup)

`docs/resend-domain-mektup.md` dosyasına bak — DNS yönetenine direkt
gönderebileceğin Türkçe şablon mevcut. Akış:

1. Sen önce [resend.com/domains](https://resend.com/domains) →
   "Add domain" → `objektifkriter.com.tr` ekle
2. Resend sana 4 satır kayıt verir (DKIM 1 CNAME, SPF 1 TXT, DMARC 1
   TXT, MX kontrol)
3. Bu 4 satırı `docs/resend-domain-mektup.md` içindeki
   `<<DOLDURULACAK>>` yerine yapıştır
4. Mektubu DNS yönetene email/WhatsApp ile gönder
5. 10 dk - 24 saat içinde Resend dashboard'da yeşil tik
6. Doğrulanınca:
   - Vercel'de `RESEND_FROM=bildirim@objektifkriter.com.tr`
   - Vercel'de `RESEND_TO=hakan.karacam@objektifkriter.com.tr`
   - Redeploy

---

## 6. Post-Deploy Kontrol Listesi

Production'a geçtikten sonra:

- [ ] `https://objektifkriter.com.tr` ve `www.` her ikisi açılıyor
- [ ] HTTPS sertifikası geçerli (Vercel otomatik Let's Encrypt)
- [ ] Form gönderimi → Supabase `website.talepler`'e satır → Resend mail
- [ ] `/envanter` haritası açılıyor (Mapbox token eklendiyse)
- [ ] `/sehir/[sehir]-[format]-reklam` 158 sayfa erişilebilir (sitemap'te
      hepsi olmalı)
- [ ] `/sitemap.xml` ve `/robots.txt` çalışıyor
- [ ] 404 sayfası çalışıyor (`/non-existent`)
- [ ] Lighthouse skoru: Performans 85+, Best Practices 95+, SEO 95+,
      A11y 90+
- [ ] Google Search Console → eski Wix sitesini kaldır, yeni siteyi
      doğrula, sitemap submit
- [ ] Eski Wix URL'lerinden 301 sample test (search console "covered"
      raporu)

---

## 7. Acil Durum / Rollback

Vercel deploy sonrası kritik bir sorun çıkarsa:

1. **Vercel rollback:** Project → Deployments → önceki çalışan
   deploy → "Promote to Production" (1 tıkla geri)
2. **DNS rollback:** Wix DNS'i Wix sitesine geri çevir (Vercel
   IP/CNAME → Wix değerleri). Propagasyon 5-30 dk.
3. **Form sorunu:** Supabase'de RLS politikalarını kontrol et,
   `anon` rolünün `website.talepler`'e INSERT yetkisi olduğunu
   doğrula.
4. **Resend sorunu:** Domain doğrulanmamışsa `RESEND_TO=
   yhakan.karacam@gmail.com`'a geri al (test mode).
