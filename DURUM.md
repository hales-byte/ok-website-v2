# DURUM — OK v3 (canlı durum dosyası)
> Projenin hafızası budur. Her oturum sonunda güncellenir; her oturum başında okunur.
> Bir dosyaya bakıp "neredeyiz?" sorusunun cevabını 30 saniyede almak için.

**Son güncelleme:** 2026-07-05 · Claude Code (G4a mecra fotoğrafları kodlandı, preview'da)

## Şu an
- **Aktif paket:** G4a TESLİM (preview) — Gemini mecra fotoğrafları: 6 kart yenilendi + havalimanı ilk kez gerçek görsele bağlandı; Hakan onayı bekleniyor
- **Durum:** `origin/v3`'te üç commit push'lu (b956893 T0-T6, 3fef044 G1, f8f01e6 G2). G4a değişiklikleri henüz commit EDİLMEDİ — onay sonrası girecek.
- **Sonraki:** G4a onayı → commit → G3 (kimliği diğer bölümlere yay) / kalan format görselleri → T5 uçtan uca mail testi
- **Bu hafta hedefi:** ✅ Faz 1 + G0/G1/G2 + G4a görseller tamam — kalan görsel yayma (G3) + tramvay-kaplama formatı kararı

## Paket durumu

| Paket | İş | Durum |
|---|---|---|
| T0 | Ortam + v3 branch + dokümanlar | ✅ Kod hazır (patch'te) |
| T1 | envanter.json veri modülü + check:envanter | ✅ Kod hazır — doğrulama 7/7 |
| T2 | Sayfalar statik veriye + 301'ler | ✅ Kod hazır — 45 il + 122 kombinasyon |
| T3 | SVG harita (Mapbox söküm) | ✅ Kod hazır — il sınırlı SVG, bağımlılıksız |
| T4 | Rakam senkronu (45/20/35.919) | ✅ Kod hazır — grep temiz |
| T5 | Lead hattı (Resend + FormSubmit yedek) | 🟡 Kod hazır — E2E mail testi Hakan'da (Resend key gerek) |
| T6 | SEO teknik (sitemap, meta, JSON-LD) | ✅ Kod hazır — FAQPage G6'ya bırakıldı (SSS henüz yok) |
| T7 | QA + deploy | 🟡 Build 186 sayfa ✓ + Vercel preview ✓ (2 tur) — Lighthouse kaldı |
| G0 | Tasarım kimliği kararı | ✅ Seçenek B — aydınlık gövde + koyu vurgu (cyan #00E4FF) |
| G1 | Tema token + tipografi + chevron + SectionHeader | ✅ Denetlendi + commit'lendi (3fef044) |
| G2 | Hero eyebrow + 4 KPI bandı + erişim metriği (42,4M) | 🟡 Kod hazır (preview) — denetim + onay bekliyor |
| G4a | Mecra fotoğrafları (Gemini) — 6 kart + havalimanı | 🟡 Kod hazır (preview) — onay bekliyor |
| G3/G4b-G7 | Görsel revizyonlar (kimliği yay) + tramvay-kaplama formatı | ⬜ G4a onayı bekliyor |
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
