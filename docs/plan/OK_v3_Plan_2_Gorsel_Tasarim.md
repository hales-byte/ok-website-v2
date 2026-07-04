# OK v3 · PLAN 2 — GÖRSEL YAPI & TASARIM REVİZYONLARI
**Uygulama: Claude Code · Görsel denetim + öneri: Cowork · Karar: Hakan**
Master plan: OK_v3_Birlestirme_Plani.md (Faz 3) · Ön koşul: Plan 1'de T2 bitmiş olmalı

## Akış kuralı (iframe'de kanıtlanan döngü — her bölümde aynı)

1. **Cowork:** bölümün mevcut halini özetler + numaralı öneriler sunar (A/B/C/D/E)
2. **Hakan:** seçer ("A+C" gibi) veya kendi metnini yazar
3. **Cowork:** hazır Claude Code prompt'u üretir
4. **Claude Code:** uygular + build + Vercel preview (COMMIT ETMEZ)
5. **Cowork:** canlı preview'ı tarayıcıda denetler (desktop + mobile), ekran görüntülü rapor
6. **Hakan onaylar → commit** → sonraki bölüm

## G0 — TASARIM KİMLİĞİ KARARI (her şeyden önce, 1 saat)

İki aday:

| | Seçenek A: Koyu Editorial (iframe kimliği) | Seçenek B: Aydınlık + Koyu Vurgu (öneri) |
|---|---|---|
| Zemin | Koyu lacivert/siyah + cyan | Beyaz/açık gri gövde; koyu hero-footer bantları |
| His | Premium, iddialı, gece-şehir | Kurumsal, güvenilir, okunaklı |
| Risk | Uzun sayfalarda okuma yorgunluğu; ajans gözünde "karanlık şablon" algısı | Vurgular iyi işlenmezse sıradanlaşır |
| Uyum | Fotoğraflar koyu zeminde çok iyi parlar | Uzun içerik + tablo + şehir sayfalarında üstün |

**Cowork yöntemi:** iki tabı yan yana açarım (ok-iframe / ok-website-v2), bölüm bölüm gezdiririm; karar 30 dk'da çıkar. Karar ne olursa olsun taşınacak A-imzaları sabit: chevron motifi, Cormorant serif başlık aksanı, logo duvarı, counter animasyonu, koyu footer.

## G1 — Tasarım token'ları (Claude Code, 2 saat) · PROMPT HAZIR (B kararı varsayımıyla)

```
Tailwind v4 tema token'larını v3 kimliğine göre düzenle:

1. Renk: --cyan: #00E4FF (vurgu), koyu bant zemini #0A1220, açık gövde #FFFFFF/#F7FAFC,
   metin #0F172A, muted #64748B. Mevcut teal/petrol tonlarını cyan ailesiyle değiştir.
2. Tipografi: başlıklarda Cormorant Garamond (display serif, sadece h1/h2 ve büyük rakamlar),
   gövdede mevcut sans (Inter) kalsın. next/font ile yükle.
3. Chevron motifi: ok-iframe'deki ">>>" akış SVG'sini ortak bileşen yap (Chevrons.tsx),
   prefers-reduced-motion desteğiyle.
4. Bölüm başlığı bileşeni: eyebrow (küçük cyan etiket) + serif başlık + muted alt yazı.
Görsel değişiklik dışında sayfa yapısına DOKUNMA. COMMIT ETME. Build + preview.
```

## G2 — Hero + istatistik bandı (yarım gün)

İçerik (kesin): eyebrow "Türkiye'nin Anadolu Açıkhava Lideri" · H1 mevcut "Doğru lokasyonda..." yapısı KORUNUR (SEO + net mesaj) · alt satır: **"45 il, 20 mecra türü, 35.919 ünite — Anadolu'nun her köşesinde markanızın yanındayız."** · CTA'lar: "Ücretsiz Mecra Planı Al" + "WhatsApp ile yaz" + "Envanteri Gör" · hero üstüne chevron animasyonu · altına 4 KPI counter (45 İL / 20 MECRA / 35.919 ÜNİTE / 42,4M AYLIK ERİŞİM*).
*42,4M erişim rakamı Tufan'a teyit ettirilecek — teyitsizse KPI 3'lü olur.

## G3 — Logo duvarı + /markalar (2 saat)

- 30 PNG `~/Projects/ok-iframe/dist/logos/` → `public/logos/`
- Ana sayfaya "Güçlü İş Birlikleri": beyaz chip grid (5 sütun → 4/3/2 responsive), KPI şeridi 8 ortak / 21 ajans / 890+ marka
- /markalar sayfası aynı bileşeni genişletilmiş kullanır
- Angarya A1 (soluk logoların koyu varyantı) sonraya — bloklamaz

## G4 — Format showcase: 20 mecra (1 gün, fotoğraflara bağlı)

- 8 format → **20 mecra türü** yapısına geçiş: ana 8 slide korunur, "+12 mecra" genişletilebilir grid eklenir (Alınlık, Luna, Parapet, Kuleboard, Bigboard, Silindir Kule, Raket LED, Prizma LED, Süper LED, Tramvay Kaplama, Otobüs Kaplama, Megaboard)
- Fotoğraf eşleme: Hakan'ın `photos/formats/` klasöründen; foto olmayana iframe SVG mockup'ı
- Her mecra kartında: pazarlama başlığı (iframe'deki duygusal dil) + envanter adedi (envanter.json'dan otomatik) + dönem bilgisi (HAFTA/2 HAFTA/AY)
- Tekrarlayan görsel kusuru (Havalimanı LED = billboard fotosu) burada çözülür
- **KARAR (G4 başında, Hakan+Tufan): fiyat gösterimi.** web-v2'de fiyat bantları vardı ("İstanbul ortalaması" çelişkisiyle). Seçenekler: (a) hiç fiyat gösterme → "15 dakikada teklif" CTA'sı güçlenir *(öneri)*, (b) "…'dan başlayan" bant göster → SEO'da "fiyat" sorgularını yakalar ama güncel tutma yükü doğurur. Karar ne olursa metinler content/ dosyasında tutulur

## G5 — Harita bölümü görseli (T3 ile birlikte, 2 saat)

T3'te taşınan SVG haritanın görsel cilası: bölge renkleri, hover/tıklama panelinin kart tasarımı, il etiket tipografisi, mobile davranışı (harita üstte, panel altta akordeon).

## G6 — SSS + footer + WhatsApp (2 saat)

- SSS bölümü iframe'den taşınır (9 soru şimdilik; gerçek sorular Angarya A2)
- Footer: 4 kolon koyu bant, adres/telefon/mail (KVKK verisiyle tutarlı), sosyal linkler TEK doğru slug
- WhatsApp floating button: sade, pop-up'sız (iframe'deki gibi)

## G7 — Görsel QA turu (Cowork, yarım gün)

Ben yaparım: 1440/768/375 genişlikte tüm sayfa tipleri (ana, hizmetler, şehir×format, envanter, teklif, markalar, KVKK) — ekran görüntülü bulgu listesi: hizalama, kontrast (WCAG AA), taşma, animasyon aksaması. Hakan bulguları onaylar → tek düzeltme oturumu → Plan 3'teki cutover'a yeşil ışık.

---

## Bölüm sırası özeti

| Bölüm | Süre | Ön koşul |
|---|---|---|
| G0 kimlik kararı | 1 saat | — (hemen yapılabilir) |
| G1 token'lar | 2 saat | G0 + T2 |
| G2 hero/istatistik | ½ gün | G1 |
| G3 logo duvarı | 2 saat | G1 |
| G4 format showcase | 1 gün | G1 + fotoğraflar (kısmî foto ile de çıkılır) |
| G5 harita cilası | 2 saat | T3 |
| G6 SSS/footer | 2 saat | G1 |
| G7 görsel QA | ½ gün | hepsi |
