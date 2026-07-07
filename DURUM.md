# DURUM — OK v3 (canlı durum dosyası)
> Projenin hafızası budur. Her oturum sonunda güncellenir; her oturum başında okunur.
> Bir dosyaya bakıp "neredeyiz?" sorusunun cevabını 30 saniyede almak için.

**Son güncelleme:** 2026-07-07 · Claude Code (G3.2 logo paketi — 30→74 marka commit'lendi + push'landı, prod'da)

## Şu an
- **Aktif paket:** G3.2 logo paketi KAPANDI — logo duvarı **30 → 74 markaya** çıktı. Hakan'ın `yeni-logolar/` klasöründeki 61 dosya `sharp` ile normalize edildi (en-boy korunur, max 256px, SVG'ler yüksek yoğunlukla rasterize — qlmanage kırpması giderildi; sharp Next.js'in mevcut yerel bağımlılığı, yeni servis yok). 44 yeni marka eklendi, 15 mevcut marka daha net sürümle güncellendi (eski soluk logolar VakıfBank hariç yenilendi → A1 angaryasını çözdü). Hakan kararları: **Pepsi → PepsiCo yerine**, **Emlak Konut → Emlak Yönetim yerine**, siyasi parti (AKP/CHP/İYİ/DEVA) + kamu (Cumhurbaşkanlığı İletişim/Kızılay) logoları **duvara dahil**. `Otokaç` → doğru marka **Otokoç** (slug düzeltildi). Sayaç artık diziden türer (`MARKALAR_LINK_METNI` = "74 markanın tamamı"), hardcoded "30" kaldırıldı. Marquee 74>40 → otomatik **3 satır** (davranış bozulmadı). Commit'lenip origin/v3'e push'landı, prod'da (canlı teyit: 74 markanın tamamı, yeni logolar 200, pepsico/emlak-yonetim/otokac 404).
- **Durum:** `origin/v3`'te **on iki** commit push'lu (b956893 T0-T6, 3fef044 G1, f8f01e6 G2, 9e41714 G4a, a7b56a6 G3, edd0753 G6, abd9243 FIX-legal, c258cfe G3.1, 799fb06 G4b, 0306770 G5+G7a, 53c70cd V1, 950aab8 G3.2).
- **Sonraki:** G7b/kalan görsel yayma (varsa) → T5 uçtan uca mail testi
- **Bu hafta hedefi:** ✅ Faz 1 + G0/G1/G2/G4a/G3/G3.1/G6/G4b + hukuki tutarlılık tamam

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
| G4b | +12 mecra grid'i (envanter-türevi adet) + fiyat söküm + totem düzeltme | ✅ Commit'lendi + push (799fb06) |
| G5+G7a | Harita cilası (seçili il vurgu, klavye erişimi, AA renk) + ratecard/fiyat kalıntısı temizliği + hero priority + SWC boşluk fix | ✅ Commit'lendi + push (0306770) |
| V1 | Envanter güncellemesi — 36.703 ünite (Aydın +782 girdi, Edirne çıktı, tramvay 80) + erişim 43,1M + edirne→kirklareli 301 + check 10 kontrol | ✅ Commit'lendi + push (53c70cd) |
| G3.2 | Logo paketi — 30→74 marka (44 yeni + 15 güncel, sharp normalize), pepsi/emlak-konut değişimi, siyasi/kamu dahil, sayaç diziden türer | ✅ Commit'lendi + push (950aab8) |
| G7b/görsel | Kalan görsel revizyonlar (kimliği yay) | ⬜ Onay bekliyor |
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

- Rakamlar: **45 il · 20 mecra · 36.703 ünite** — tek kaynak `src/data/envanter.json` (V1 güncellemesi 2026-07-07: Aydın +782 girdi, Edirne çıktı; il sayısı 45 sabit kaldı). Eski değer 35.919 idi.
- **Aylık erişim: 43.120.042 (43,1M)** — envanter türevi; `src/data/il-nufus.json` nüfus toplamından (44.894.964, V1'de Aydın nüfusu girdi/Edirne çıktı) hesaplanır, `erisimEtiketi` ile sunulur. check:envanter doğrular (sabit değil, veriden türer). Eski değer 42,4M idi.
- **V1 envanter (2026-07-07):** Aydın (Ege) envantere eklendi — BILLBOARD 532 + CLP RAKET-DURAK 250 = 782 ünite, kapsama noktaları Didim/Kuşadası/Efeler/Söke/Nazilli. Edirne envanterden çıkarıldı → `/sehir/edirne` artık `/sehir/kirklareli`'ye kalıcı yönlenir (`next.config.ts` ESKI_SEHIR_301; canlıda HTTP 308). check:envanter 8 → **10 kontrol** (Aydın 782 + Edirne-yok). Tramvay toplamı 80 (yalnız Gaziantep TRAMVAY KAPLAMA).
- **Mecralar (ana sayfa): 8 showcase kartı** (FormatShowcase: billboard, clp, megalight, led, giantboard, pole-banner, totem, havalimanı — hepsi görselli) **+ 12 ek mecra grid'i** (G4b, `EkMecraGrid` + `src/data/content/ek-mecralar.ts`) = **20 mecra**. Ek grid adetleri envanter.json'dan `getFormatToplam(envanterAd)` ile türer (Luna 140, Megaboard 97, Tramvay Kaplama 40…), adet 0 olan kart gizlenir. Tramvay-kaplama görseli artık bu grid'de kullanılıyor (öksüz değil). `totem` tanımı G4b'de düzeltildi (direk üstünde ışıklı kutu pano).
- **FİYAT GÖSTERİLMEZ (Hakan kararı, G4b):** `priceBand` + `formatPriceBand` `lib/formats.ts`'ten tamamen söküldü. Sitede hiçbir yerde fiyat yok; teklif akışı fiyatı konuşma/teklifle verir. grep `priceBand` → sıfır olmalı.
- **Logo duvarı (G3 → G3.2):** **74 marka** logosu `public/logos/*.png` (dosya adları slug). İçerik/veri `src/data/content/is-birlikleri.ts`'te — projenin İLK content dosyası; kural: kullanıcıya görünen metin/veri koda gömülmez, buraya toplanır. Bileşen `components/LogoWall.tsx` (her iki temada beyaz kart). /markalar 74 tam grid (LogoWall). **Sayaç diziden türer:** `MARKALAR_LINK_METNI` = "`${IS_BIRLIKLERI_LOGOLARI.length} markanın tamamı`" — elle sayı yazılmaz (G3.2). G3.2'de eski soluk logolar (Nissan/Paulmark/Hatemoğlu/Arçelik dahil, VakıfBank hariç) daha net sürümlerle yenilendi → A1 angaryası büyük ölçüde çözüldü. **Normalize aracı:** `sharp` (Next.js yerel bağımlılığı) — yeni webp/jfif/jpg/svg logolar buradan geçirilir (en-boy korunur, max 256px, SVG yüksek yoğunluk). Duvar sonunda siyasi parti (AKP/CHP/İYİ/DEVA) + kamu (Cumhurbaşkanlığı İletişim/Kızılay) logoları var (Hakan onayıyla dahil; itibari tercih — ileride ayrı bölüme taşınabilir). Pepsi=PepsiCo yerine, Emlak Konut=Emlak Yönetim yerine (G3.2 kararı).
- **Logo akışı (G3.1 → G3.2):** ANA SAYFA'da LogoWall yerine `components/LogoMarquee.tsx` — **74 logo** zıt satırlarda akar (salt CSS, server component; ≤40 logo→2 satır, >40→**3 satır**; G3.2'de 74>40 olduğu için otomatik 3 satıra geçti). Animasyon keyframe'leri + hover-pause + reduced-motion statik kuralı `app/globals.css`'te (`ok-marquee-*`, `ok-glow-*`). İki kritik kural: (1) animasyon inline `style` ile veriliyor → hover-pause CSS'i `!important` OLMADAN çalışmaz (inline shorthand ezer); (2) dikişsizlik için track iki ÖZDEŞ yarım (`<div class="flex gap-4 pr-4">`×2, ikincisi `ok-marquee-dup`) + track `gap:0` → `-50%` tam oturur (canlı ölçüm 0px sapma). reduced-motion'da `.ok-marquee-track > div` de sarmalı (chip'ler yarımların çocuğu). /markalar hâlâ LogoWall (grid).
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
| 2026-07-06 | G4b (prod alias) | +12 mecra grid'i (envanter-türevi: Luna 140/Megaboard 97/Tramvay 40) + priceBand söküm (grep 0) + totem düzeltme; başlık "20 mecra türü"; check 8/8; build ✓; grid canlı doğrulandı (12 kart); prod web-v2-seven-rho; commit onay bekliyor |
| 2026-07-06 | G4b kapanış | Onaylandı; commit 799fb06 + origin/v3'e push; prod |
| 2026-07-07 | G5+G7a (prev) | Harita cilası (seçili il koyu çerçeve + tabIndex/Enter klavye + AA metin paleti) + ratecard.pdf silindi & tüm ratecard/indikatif fiyat kalıntıları söküldü (grep 0, /ratecard.pdf 404) + hero priority + SWC boşluk fix (grep 0); check 8/8; build ✓; kod inceleme ile doğrulandı; commit onay bekliyor |
| 2026-07-07 | G5+G7a kapanış | Onaylandı; commit 0306770 + origin/v3'e push; prod web-v2-seven-rho (alias 200, ratecard.pdf 404 teyitli) |
| 2026-07-07 | V1 envanter (prev) | 35.919→36.703 ünite (Aydın +782 girdi/Edirne çıktı, il 45 sabit); erişim 42,4M→43,1M; edirne→kirklareli 301; check 10/10; build 187 (186→187); grep eski rakam 0 / yeni 36.703 var; commit onay bekliyor |
| 2026-07-07 | V1 kapanış | Onaylandı; commit 53c70cd + origin/v3'e push; prod web-v2-seven-rho (canlı: 36.703+43,1M, edirne→kirklareli 308, aydin/billboard 200) |
| 2026-07-07 | G3.2 (yama+önizleme) | 61 kaynak → 74 marka; sharp normalize (SVG dahil, qlmanage kırpması giderildi); pepsi/emlak-konut değişimi + Otokoç slug + siyasi/kamu dahil (Hakan kararı); sayaç diziden ("74 markanın tamamı"); build 187 ✓; marquee 3 satır; yama HEAD worktree'de temiz uygulandı; g32-logo-paketi.patch + UYGULAMA_G3_2.md teslim; commit onay bekliyor |
| 2026-07-07 | G3.2 kapanış | Onaylandı; commit 950aab8 + origin/v3'e push; prod web-v2-seven-rho (canlı: "74 markanın tamamı", yeni logolar 200, pepsico/emlak-yonetim/otokac 404) |
