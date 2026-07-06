# DURUM — OK v3 (canlı durum dosyası)
> Projenin hafızası budur. Her oturum sonunda güncellenir; her oturum başında okunur.
> Bir dosyaya bakıp "neredeyiz?" sorusunun cevabını 30 saniyede almak için.

**Son güncelleme:** 2026-07-06 · Claude Code (G3.1 logo akışı/marquee commit'lendi + push'landı, prod'da)

## Şu an
- **Aktif paket:** G3.1 KAPANDI — ana sayfa İş Birlikleri bölümü **logo akışına (marquee)** geçti: 30 logo iki zıt satırda akar (20sn/24sn), hover'da durur, 2 cyan glow gezinir (22/28sn), reduced-motion'da statik ızgara. İki düzeltme: (1) hover-pause bug'ı (inline `animation` shorthand hover CSS'i eziyordu) → hover kuralına `!important`; (2) dikiş hizası → track iki eş yarım (her biri `pr-4`) + track `gap:0` → `-50%` sapması 0px (canlı ölçüm: total 4980 = 2×2490). Commit'lenip origin/v3'e push'landı, prod'da.
- **Durum:** `origin/v3`'te sekiz commit push'lu (b956893 T0-T6, 3fef044 G1, f8f01e6 G2, 9e41714 G4a, a7b56a6 G3, edd0753 G6, abd9243 FIX-legal, c258cfe G3.1).
- **Sonraki:** G4b-G7 (kalan görsel/kimlik yayma) + tramvay-kaplama formatı kararı → T5 uçtan uca mail testi
- **Bu hafta hedefi:** ✅ Faz 1 + G0/G1/G2/G4a/G3/G3.1/G6 + hukuki tutarlılık tamam — kalan görsel yayma (G4b-G7)

## Paket durumu

| Paket | İş | Durum |
|---|---|---|
| T0 | Ortam + v3 branch + dokümanlar | ✅ Kod hazır (patch'te) |
| T1 | envanter.json veri modülü + check:envanter | ✅ Kod hazır — doğrulama 7/7 |
| T2 | Sayfalar statik veriye + 301'ler | ✅ Kod hazır — 45 il + 122 kombinasyon |
| T3 | SVG harita (Mapbox söküm) | ✅ Kod hazır — il sınırlı SVG, bağımlılıksız |
| T4 | Rakam senkronu (45/20/35.919) | ✅ Kod hazır — grep temiz |
| T5 | Lead hattı (Resend + FormSubmit yedek) | 🟡 Kod hazır — E2E mail testi Hakan'da (Resend key gerek) |
| T6 | SEO teknik (sitemap, meta, JSON-LD) | ✅ Kod hazır — FAQPage G6'da eklendi (SSS canlıya çıktı) |
| T7 | QA + deploy | 🟡 Build 186 sayfa ✓ + Vercel preview ✓ (2 tur) — Lighthouse kaldı |
| G0 | Tasarım kimliği kararı | ✅ Seçenek B — aydınlık gövde + koyu vurgu (cyan #00E4FF) |
| G1 | Tema token + tipografi + chevron + SectionHeader | ✅ Denetlendi + commit'lendi (3fef044) |
| G2 | Hero eyebrow + 4 KPI bandı + erişim metriği (42,4M) | 🟡 Kod hazır (preview) — denetim + onay bekliyor |
| G4a | Mecra fotoğrafları (Gemini) — 6 kart + havalimanı | ✅ Commit'lendi + push (9e41714) |
| G3 | Logo duvarı — "Güçlü İş Birlikleri" + /markalar entegrasyonu | ✅ Commit'lendi + push (a7b56a6) |
| G3.1 | Logo akışı (marquee) + arka plan cyan glow — ana sayfa | ✅ Commit'lendi + push (c258cfe) |
| G6 | SSS + FAQPage JSON-LD + footer tam iletişim + sabit WhatsApp | ✅ Commit'lendi + push (edd0753) |
| FIX-legal | KVKK/gizlilik'ten kaldırılmış servis (Supabase/Mapbox) temizliği + 3 hukuki sayfa tutarlılığı | ✅ Commit'lendi + push (abd9243) |
| G4b-G7 | Kalan görsel revizyonlar (kimliği yay) + tramvay-kaplama formatı | ⬜ Onay bekliyor |
| O0 | Hesap sahipliği envanteri | 🟡 Tufan'a 2 soru + Resend hesabı |
| O1 | İçerik girdileri (foto, 42,4M teyidi, SSS, vaka) | 🟡 Hakan toplayacak |
| O2-O4 | Cutover hazırlık → cutover → sonrası | ⬜ Bekliyor |
| A1-A10 | Angarya sırası | ⬜ Cutover sonrası (A5 LinkedIn slug ✅ düzeltilip push edildi — Footer + iletişim) |

## Blokerler (kim ne bekliyor)

1. ~~**G1 preview onayı**~~ ✅ ÇÖZÜLDÜ — denetim geçti, commit + push edildi
2. **Resend hesabı + API key** — Hakan (öneri: satis@ ile aç) · T5 mail testi için şart; anahtar yokken form FormSubmit yedeğiyle çalışır
3. ~~**G0 tasarım kararı**~~ ✅ ÇÖZÜLDÜ — Seçenek B (aydınlık gövde + koyu vurgu) kesinleşti
4. **Fotoğraflar** `photos/formats/` — Hakan · G4'ten önce, kısmî de olur
5. **O0 Tufan cevapları**: satis@ hangi mail serviste (MX)? + registrar/DNS paneli nerede? — cutover randevusundan önce şart

## Kilit gerçekler (değişmez — tereddütte buraya bak)

- Rakamlar: **45 il · 20 mecra · 35.919 ünite** — tek kaynak `src/data/envanter.json`
- **Aylık erişim: 42.400.011 (42,4M)** — envanter türevi; `src/data/il-nufus.json` nüfus toplamından (44.145.295) hesaplanır, `erisimEtiketi` ile sunulur. check:envanter doğrular (sabit değil, veriden türer).
- **Format kartları: 8 adet**, hepsi gerçek görsele bağlı (billboard, clp, megalight, led, giantboard, pole-banner, totem, havalimanı). ⚠️ `public/images/formats/tramvay-kaplama.{jpg,webp}` G4a'da eklendi ama HİÇBİR karta bağlı değil (formats.ts'te referansı yok) — yeni bir "tramvay/transit" formatı açılırsa kullanılacak; şu an sitede görünmüyor.
- **Logo duvarı (G3):** 30 marka logosu `public/logos/*.png` (dosya adları slug). İçerik/veri `src/data/content/is-birlikleri.ts`'te — projenin İLK content dosyası; kural: kullanıcıya görünen metin/veri koda gömülmez, buraya toplanır. Bileşen `components/LogoWall.tsx` (her iki temada beyaz kart). /markalar 30 tam grid (LogoWall). Soluk logolar (VakıfBank, Nissan, Paulmark, Hatemoğlu, Arçelik) A1'de koyu varyantla yenilenecek — şimdilik olduğu gibi.
- **Logo akışı (G3.1):** ANA SAYFA'da LogoWall yerine `components/LogoMarquee.tsx` — 30 logo iki zıt satırda akar (salt CSS, server component; ≤40 logo→2 satır, >40→3). Animasyon keyframe'leri + hover-pause + reduced-motion statik kuralı `app/globals.css`'te (`ok-marquee-*`, `ok-glow-*`). İki kritik kural: (1) animasyon inline `style` ile veriliyor → hover-pause CSS'i `!important` OLMADAN çalışmaz (inline shorthand ezer); (2) dikişsizlik için track iki ÖZDEŞ yarım (`<div class="flex gap-4 pr-4">`×2, ikincisi `ok-marquee-dup`) + track `gap:0` → `-50%` tam oturur (canlı ölçüm 0px sapma). reduced-motion'da `.ok-marquee-track > div` de sarmalı (chip'ler yarımların çocuğu). /markalar hâlâ LogoWall (grid).
- **SSS (G6):** 9 soru `src/data/content/sss.ts`'te (2. content dosyası; kaynak ok-iframe canlı sitesi). Rakamlar TOPLAM'dan türetilir (elle yazılmaz). Bileşen `components/FAQ.tsx` — native `<details>/<summary>` (JS'siz, erişilebilir). Ana sayfada süreç ile alt-CTA arasında + FAQPage JSON-LD (`sssJsonLd()`). ⚠️ Angarya A2'de gerçek müşteri sorularıyla güncellenecek.
- **İletişim (G6, footer):** telefon `+90 552 918 58 64` (tel: linki) + açık adres "Gümüşsuyu Mah. İnönü Cad. Zampak Apt. No: 7/5, Beyoğlu / İstanbul". Sabit WhatsApp düğmesi (`components/WhatsAppFloat.tsx`) tüm sayfalarda sağ altta (layout'ta), aynı numara — pop-up'sız, iframe'deki gibi.
- **Hukuki sayfalar (KVKK / gizlilik / çerez) — TEK sağlayıcı seti:** yalnızca **Vercel** (barındırma) + **Resend** (yalnızca teklif formu e-posta iletimi). Supabase ve Mapbox projeden kaldırıldı → hiçbir hukuki metinde geçmemeli. Veri tabanı YOK: form bilgisi saklanmaz, e-posta ile iletilir; site statik envanterle çalışır. KVKK versiyonu `lib/kvkk.ts` (AYDINLATMA_VERSIYONU, güncel: 2026.07.06) — metin anlamlı değişince ARTIRILIR.
- **CountUp animasyon uyarısı:** ana sayfa/hakkımızda/şehir istatistikleri `components/CountUp.tsx` ile 0→hedef animasyonlu sayar; rakamlar `TOPLAM`'a bağlı (elle gömülü DEĞİL). Ekran görüntüsü animasyon ortasında yakalanırsa ara değer (ör. 44/35.632) görünebilir — bu bir HATA değildir, capture artefaktıdır. Doğrulama için grep + kaynağa bak, screenshot'a değil.
- Lead: Resend → satis@objektifkriter.com.tr (cutover'a kadar Resend default göndericisi — normaldir; API key yoksa FormSubmit yedeği devrede)
- MX kayıtlarına DOKUNULMAZ (şirket maili)
- İl×format sayfası: adet ≥ 5 ise üret; altındakiler il sayfasına 301 (next.config.ts otomatik üretir)
- Commit daima Hakan onayından sonra
- **Kimlik (G0=Seçenek B):** vurgu cyan `#00E4FF`; koyu bant zemini `#0A1220` (sadece hero+footer); açık gövde `#FFFFFF/#F7FAFC`, metin `#0F172A`, muted `#64748B`. Başlık serif = Cormorant Garamond (SADECE h1/h2 + büyük rakam), gövde = Inter.
- **Kontrast kuralı:** açık zeminde cyan yalnız büyük metin/ikon vurgusu; küçük metin/link `#0369A1` ailesi (WCAG AA). Teknik: `.band-dark` scope'unda CSS token'ları koyu-zemin karşılığına döner → hero/footer'a tek class yeter.
- Sandbox build notu: Google Fonts erişimi olmayan ortamda `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` mock'u kullanılır; Hakan'ın makinesинde gerekmez

## Oturum geçmişi (son 5 — eskiler GUNLUK.md'de)

| Tarih | Paket | Sonuç |
|---|---|---|
| 2026-07-04 | Kuruluş | Planlar + kit hazırlandı (Cowork) |
| 2026-07-04 | T0-T6 (otonom) | Cowork tüm teknik paketleri kodladı; QA 11/11; yama teslim edildi |
| 2026-07-04 | T0-T6 uygulama | Yama v3 branch'e uygulandı; check:envanter 7/7; build 186 sayfa; preview + push (b956893) |
| 2026-07-04 | A5 LinkedIn | Bozuk slug (objekti%CC%87...) Footer + iletişim'de düzeltildi; b956893'e dahil |
| 2026-07-04 | G0 + G1 | Seçenek B kesinleşti; cyan #00E4FF + Cormorant serif teması, hero/footer koyu bant, Chevrons + SectionHeader bileşenleri; preview'da |
| 2026-07-04 | G1 kapanış | Cowork denetimi geçti; kimlik commit'lendi + origin/v3'e push edildi |
| 2026-07-04 | G2 (preview) | Hero eyebrow + 4 KPI bandı + erişim metriği (42,4M) kodlandı; check 8 kontrol ✓; build 186; preview |
| 2026-07-04 | G2 kapanış | Onaylandı; commit f8f01e6 + origin/v3'e push |
| 2026-07-05 | G4a (preview) | 6 mecra fotoğrafı yenilendi + havalimanı ilk kez gerçek görsele bağlandı; build 186; preview |
| 2026-07-05 | G4a kapanış | Commit 9e41714 + origin/v3'e push; preview: web-v2-4vg8eg2ma |
| 2026-07-06 | G3 (preview) | Logo duvarı: 30 logo kopyalandı + ilk content dosyası (is-birlikleri.ts) + LogoWall + ana sayfa & /markalar entegrasyonu; build 186; preview: web-v2-1nqoi5pat |
| 2026-07-06 | G3 revize + kapanış | KPI 3→2 öğe (8 KÖO kaldırıldı, 21→180+ ajans; 890+ marka aynı), 2'li ortalanmış grid; build ✓; commit a7b56a6 + origin/v3'e push |
| 2026-07-06 | G6 (preview) | SSS (9 soru, details akordeon) + FAQPage JSON-LD + footer telefon/adres + sabit WhatsApp; patch temiz; build ✓; preview: web-v2-4c7h4x9gu |
| 2026-07-06 | G6 kapanış | Onaylandı; commit edd0753 + origin/v3'e push |
| 2026-07-06 | Ekran görüntüleri | 15 sayfa full-page çekildi (Desktop/…/ekran-goruntuleri); prod alias web-v2-seven-rho üzerinden |
| 2026-07-06 | FIX-legal (preview) | KVKK'dan Supabase+Mapbox satırları, gizlilik'ten Supabase+RLS kaldırıldı → 3 hukuki sayfa Vercel+Resend'de hizalandı; KVKK v2026.07.06; hakkımızda ihlali gerçek değildi (CountUp artefaktı); check 8/8; build ✓; preview: web-v2-3gomp07mq |
| 2026-07-06 | FIX-legal kapanış | Onaylandı; commit abd9243 + origin/v3'e push |
| 2026-07-06 | Ekran görüntüleri v2 | 15 sayfa yeniden çekildi (çerez ön-onay + reduced-motion + gerçek-son scroll); artefaktlar bitti |
| 2026-07-06 | G3.1 (prod alias) | Logo marquee patch'i uygulandı; hover-pause bug'ı (inline animation) globals.css !important ile düzeltildi; akış/hover/glow programatik doğrulandı; build ✓; prod alias web-v2-seven-rho; commit onay bekliyor |
| 2026-07-06 | G3.1 dikiş + kapanış | Dikişsizlik: iki eş yarım (pr-4) + track gap:0 → -50% sapması 0px (canlı ölçüm); reduced-motion statik doğrulandı; commit c258cfe + origin/v3'e push; prod |
