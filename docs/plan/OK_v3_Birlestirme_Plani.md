# OK v3 — Birleştirme Planı
**web-v2 gövdesi + ok-iframe kimliği + güncel envanter → tek site, tek cutover**

Hazırlayan: Claude · Tarih: 04.07.2026 · Durum: Onay bekliyor

---

## Hedef

İki paralel hattı (ok-iframe.vercel.app + ok-website-v2.vercel.app) tek sitede birleştirmek.
Domain (`objektifkriter.com.tr`) doğrudan v3'e taşınır — ara cutover yok.

**Tek doğruluk kaynağı:** `envanter.json` → **44 il · 20 mecra · 36.134 ünite** *(V3 güncellemesi 2026-07-20, Malatya çıktı; plan metinlerindeki 35.919 tarihseldir)*

## Çalışma kuralları (iframe hattında kanıtlanan disiplin)

1. Bir Claude Code oturumu = bir iş paketi. Bitir, onaylat, commit.
2. Commit'ler Hakan onayından sonra atılır (önce build + preview).
3. Sıralama: önce veri, sonra görsel. Tasarım kararı Faz 1'i bloklamaz.

## Kaynak stratejisi (Claude Max — verimli ama cimri değil)

| İlke | Uygulama |
|---|---|
| **Bağlam tekrarı sıfır** | T0'da repo'ya `CLAUDE.md` yazılır (proje kuralları, veri kaynağı, komutlar, yasaklar). Her oturum otomatik okur — proje bir daha baştan anlatılmaz. En büyük tasarruf kalemi budur |
| **Kısa oturum, temiz bağlam** | Oturum uzadıkça her mesaj daha pahalı. Paket bitti → oturumu kapat, yenisini aç. Ufak angaryalar (A5, A6, A7) tek oturumda seri bitirilir |
| **Model seçimi işe göre** | Rutin/mekanik işler (rakam senkronu, redirect, toplu değiştirme): Sonnet. Mimari işler (Supabase söküm, harita taşıma): Opus. `/model` ile geçiş |
| **Hedefli okuma** | "Tüm repoyu oku/incele" yasak. Prompt'lar hangi dosyaya dokunulacağını söyler (bu plandaki promptlar öyle yazıldı) |
| **5 saatlik pencereye göre bloklama** | Büyük paketler (T2, G4) tek yoğun bloğa; Cowork görsel denetimleri toplu tur halinde (ekran ekran değil) |
| **Cimrilik yok** | Build doğrulama, lead testi, QA turu asla kısılmaz — hata sonradan daha pahalı |

## Sürdürülebilirlik — "güncellemesi 3 adım" mimarisi

Gelecekteki her güncelleme tek dosyaya insin diye:

1. **Envanter değişti** → `src/data/envanter.json` değiştir → build → deploy. Başka hiçbir dosyaya dokunulmaz (rakamlar, harita, şehir sayfaları, sitemap hepsi buradan türer).
2. **Metin/içerik değişti** → format açıklamaları, SSS, vaka metinleri kodda değil `src/data/content/` altında tutulur; metin değişikliği = tek veri dosyası.
3. **Fotoğraf değişti/eklendi** → `photos/formats/{mecra}.jpg` konvansiyonu; dosyayı at, otomatik görünür.
4. **Bağımlılık diyeti** → DB yok, harita token'ı yok, form=e-posta. Süresi dolacak/kırılacak dış servis kalmıyor.
5. `docs/UPDATE.md` runbook'u (Plan 3 / O6): 5 güncelleme senaryosu adım adım — 6 ay sonra bile kimseye sormadan güncellenebilir.

---

## FAZ 0 — Kararlar + paralel hazırlık (yarım gün, birleştirmeyi bloklamaz)

| # | İş | Kim | Not |
|---|----|-----|-----|
| 0.1 | **Tasarım kimliği kararı**: (a) A'nın koyu editorial teması, (b) B'nin aydınlık teması + A vurguları *(öneri: b)* | Hakan (+Tufan) | Faz 3'e kadar verilmesi yeter |
| 0.2 | Repo stratejisi: yeni repo YOK — `ok-website-v2` içinde `v3` branch | — | Karar verildi sayılır |
| 0.3 | Lead hattı: Resend (repo'da mevcut) + FormSubmit yedek | — | Karar verildi sayılır |
| 0.4 | **Fotoğrafları klasöre koy** (`photos/formats/`, adlandırma: billboard.jpg, clp.jpg…) | Hakan | Faz 3'ün girdisi — erken başla |
| 0.5 | 30 logo PNG'si ok-iframe repo'sundan hazır | ✓ | Taşınacak |

---

## FAZ 1 — Veri katmanı (kritik yol · Claude Code · 1-2 gün)

> Supabase tamamen sökülür. 190 satırlık envanter için DB gereksiz — bugünkü tek arıza noktası.

| # | İş paketi (≈1 oturum) | Çıktı |
|---|----|-----|
| 1.1 | `ok-website-v2`'yi klonla, `v3` branch aç, mevcut build'i doğrula | Çalışan temel |
| 1.2 | `envanter.json` → `src/data/envanter.json` + TypeScript tipleri + yardımcı fonksiyonlar (ilByToplam, formatByIl…) | Statik veri modülü |
| 1.3 | Şehir/format sayfalarını Supabase yerine statik modülden besle; **envanterde olmayan şehir sayfalarını kaldır + 301 redirect** | 45 il gerçeğine uyumlu sayfa ağacı |
| 1.4 | `/envanter` sayfası: Mapbox söküm → iframe'deki SVG Türkiye haritasını taşı, JSON'dan beslenir yap | Boş harita sorunu kökten biter, token bağımlılığı kalkar |
| 1.5 | Rakam senkronu: hero, title, meta, JSON-LD, footer — her yerde 45 / 20 / 35.919 | Üç rakam evreni biter |

**Kabul testi:** `npm run build` hatasız · /envanter dolu harita · /sehir/ankara/billboard = 342 ünite (Excel ile birebir).

---

## FAZ 2 — Lead hattı (Claude Code · yarım gün)

| # | İş | Çıktı |
|---|----|-----|
| 2.1 | Teklif sihirbazı submit → Resend ile satis@objektifkriter.com.tr'ye e-posta; Supabase yazımı kaldır | Kaybolmayan lead |
| 2.2 | Uçtan uca test: test teklifi gönder → mail düştü mü doğrula; WhatsApp CTA kontrol | Kanıtlı kanal |

**Kabul testi:** Test lead 60 sn içinde inbox'ta.

---

## FAZ 3 — Kimlik + görsel birleşim (Claude Code · 2-4 gün)

| # | İş paketi | Kaynak |
|---|----|-----|
| 3.1 | Tema uygulaması (0.1 kararına göre): chevron motifi, serif başlık aksanları, koyu footer | A'dan |
| 3.2 | 30 logo duvarı → ana sayfa "İş Birlikleri" + /markalar sayfası | A'dan |
| 3.3 | Format showcase'e gerçek fotoğraflar (0.4 klasöründen); foto gelmeyen formata geçici SVG | Hakan + A |
| 3.4 | Hero/istatistik: tek rakam seti + counter animasyonu; 20 mecra diline geçiş (8 format ifadeleri temizlenir) | A'dan |
| 3.5 | SSS bölümünü taşı (FAQPage JSON-LD ile birlikte) | A'dan |

**Kabul testi:** Ana sayfa + 3 örnek şehir sayfası görsel onayı (Hakan), mobile dahil.

---

## FAZ 4 — Cutover hazırlığı (Claude Code + Tufan · 1 gün)

| # | İş | Kim |
|---|----|-----|
| 4.1 | SEO hijyeni: sitemap yeniden üret (güncel lastmod), tüm sayfalara özel OG/meta, 3 JSON-LD (LocalBusiness + Organization + FAQPage) | Claude Code |
| 4.2 | QA turu: form, harita, 404, mobile, Lighthouse | Claude Code + Hakan |
| 4.3 | `TUFAN_DNS_TALIMAT.md` güncelle (Vercel A kaydı + www CNAME + Resend kayıtları eksiksiz: SPF `~all`, DMARC dahil) | Claude Code |
| 4.4 | **DNS cutover** — Tufan'a talimat + birlikte uygulama + doğrulama | Tufan + Hakan |
| 4.5 | Cutover sonrası: Wix kapatma kararı, ok-iframe.vercel.app → ana domaine redirect | Hakan |

---

## FAZ 5 — ANGARYA (cutover'ı BEKLEMEZ, hemen ardından sırayla)

> Bunlar kalite işleri; hiçbiri canlıya çıkışı bloklamaz. Sıra öncelik sırasıdır.

| # | İş | Kim | Süre |
|---|----|-----|-----|
| A1 | Açık renkli logoların koyu varyantları (VakıfBank, Nissan, Paulmark, Hatemoğlu, Arçelik) | Claude Code | 30 dk |
| A2 | SSS'yi gerçek müşteri sorularıyla değiştir | Hakan + satış ekibi | 1 saat |
| A3 | Vaka çalışması: "Marka X" → gerçek (anonim olabilir) kampanya + foto | Hakan + satış ekibi | 1 saat |
| A4 | Havalimanı LED'e özel fotoğraf (tekrarlayan billboard görseli yerine) | Hakan | 15 dk |
| A5 | LinkedIn slug standardizasyonu (bozuk Unicode `objekti̇fkri̇ter` linki tek doğru slug'a) | Claude Code | 15 dk |
| A6 | Metin tutarlılığı taraması: "7 Ana Format" vb. eski ifadeler → 20 mecra dili | Claude Code | 30 dk |
| A7 | KVKK'ya MERSIS + KEP bilgisi | Tufan'dan alınacak | 10 dk |
| A8 | Google Search Console + Analytics kurulumu, sitemap gönderimi | Claude Code + Hakan | 30 dk |
| A9 | Eski varlıkların emekliliği: Wix aboneliği, ok-iframe repo arşivi | Hakan | 30 dk |

---

## Zaman çizelgesi (yarı zamanlı tempo)

| Gün | İş |
|---|---|
| 1 | Faz 0 kararlar + 1.1, 1.2 |
| 2 | 1.3, 1.4, 1.5 |
| 3 | Faz 2 (lead) + 3.1 başlangıç |
| 4-5 | Faz 3 (tema, logolar, fotoğraflar) |
| 6 | Faz 4 (SEO + QA + Tufan talimatı) |
| 7 | **DNS cutover** |
| 7+ | Faz 5 angarya sırası |

## Riskler

| Risk | Önlem |
|---|---|
| Kapsam şişmesi (v3 tuzağı) | Bölüm-onay-commit disiplini; bu plana olmayan iş eklenmez, angarya listesine yazılır |
| Tasarım kararı gecikir | Faz 1-2 tasarımdan bağımsız — beklemeden başlanır |
| DNS yine tıkanır | Talimat 4.3'te eksiksiz hazır; cutover randevusu Tufan'la önceden sabitlenir |
| Fotoğraflar gecikir | 3.3 geçici SVG ile çıkar; fotoğraflar A4 kapsamında sonradan girer |
| **DNS değişiminde MX silinir → şirket maili kesilir** | Tufan talimatının en üstünde ⛔ "MX'e dokunma" kutusu + mevcut MX kayıtları talimata kopyalanır (Plan 3 / O2.1) |
| **Hesap sahipliği belirsizliği (Supabase dersi)** | O0 hesap envanteri: registrar, DNS, Vercel, Resend, GitHub, GSC — kimde + yedek erişim, docs/HESAPLAR.md (Plan 3 / O0) |
| **Zayıf sayfa enflasyonu (SEO)** | İl×format sayfası sadece adet>0 ise; adet<5 ise il sayfasına redirect (Plan 1 / T2) |

## İlk adım

Onay verildiğinde ilk Claude Code oturumu (1.1 + 1.2) prompt'u hazırlanır:
klonla → `v3` branch → envanter.json + tipler → build doğrula.
