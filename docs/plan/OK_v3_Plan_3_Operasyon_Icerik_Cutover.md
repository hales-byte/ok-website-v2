# OK v3 · PLAN 3 — OPERASYON · İÇERİK · CUTOVER · ANGARYA
**Araç: Cowork (koordinasyon/denetim) + Hakan (girdiler) + Tufan (DNS) + Claude Code (nokta işler)**
Master plan: OK_v3_Birlestirme_Plani.md (Faz 0 girdileri, Faz 4-5)

## O0 — HESAP SAHİPLİĞİ ENVANTERİ (ilk iş — Supabase dersi tekrarlanmasın)

> Supabase hesabı belirsizleşince veri katmanı çöktü. Aynısı bir daha yaşanmasın diye tüm hesaplar yazılır, tek tabloda tutulur (docs/HESAPLAR.md — şifresiz, sadece "hangi hesap kimde + hangi mail").

| Servis | Soru | Doldurulacak |
|---|---|---|
| Domain registrar | objektifkriter.com.tr nerede kayıtlı, panel kimde? | Tufan'a sorulacak |
| DNS (Cloudflare?) | Yönetim kimde, Hakan'a görüntüleme erişimi açılabilir mi? | Tufan |
| Vercel | v3 hangi hesapta yaşayacak (hales-projects mi, yeni ortak hesap mı)? Domain ekleme yetkisi? | Hakan |
| Resend | Hesap kimin mailiyle açılacak? API key Vercel env'e kim girecek? | Hakan (öneri: satis@ ile aç) |
| GitHub | hales-byte org erişimi + yedek erişim | Hakan |
| Google Search Console / Analytics | Mülk sahibi hangi Google hesabı? | Hakan |
| Mail hosting | satis@objektifkriter.com.tr hangi serviste (MX kimi gösteriyor)? | Tufan — **cutover için kritik** |

Kural: her serviste en az bir yedek erişim (ikinci mail veya ortak kasa notu).

## O1 — İçerik girdileri (Hakan toplar, paralel yürür — hiçbir fazı bloklamaz)

| Girdi | Kimden | Nereye | Son tarih önerisi |
|---|---|---|---|
| Mecra fotoğrafları (billboard.jpg, clp.jpg, megalight.jpg, led.jpg, giantboard.jpg, totem.jpg, pole.jpg + opsiyonel 13) — 1200×800, <300 KB | Hakan / saha ekibi | `photos/formats/` | G4'ten önce (kısmî de olur) |
| 42,4M aylık erişim rakamı teyidi | Tufan | G2 KPI kararı | G2'den önce |
| Gerçek SSS soruları (8-10, WhatsApp/mail geçmişinden) | Satış ekibi | Angarya A2 | Cutover sonrası |
| Gerçek vaka: kampanya + 2-3 metrik + foto (anonim olabilir) | Satış ekibi | Angarya A3 | Cutover sonrası |
| MERSIS + KEP | Tufan | KVKK sayfası | Cutover sonrası |

**Cowork rolü:** İstersen fotoğraf adlandırma/boyutlandırmayı ben yaparım — klasörü bağlarsın, toplu optimize ederim.

## O2 — Cutover hazırlığı (Faz 4 operasyon ayağı)

| # | İş | Araç | Not |
|---|---|---|---|
| O2.1 | `TUFAN_DNS_TALIMAT.md` güncelle: A kaydı 76.76.21.21 · www CNAME cname.vercel-dns.com · Resend 4 kayıt (SPF `~all` DAHİL, _dmarc DAHİL) · **silinecek eski Wix A kayıtları açıkça listeli** · ⛔ **"MX KAYITLARINA DOKUNMA" kutusu en üstte** (satis@ maili kesilmesin) — mevcut MX kayıtları talimata aynen kopyalanır | Claude Code | 2026-05-20 denemesindeki eksikler (SPF/~all, _dmarc, Wix kayıtları) bu kez maddelenmiş olacak |
| O2.2 | Vercel'de domain binding: objektifkriter.com.tr + www → v3 production | Claude Code + Hakan | `yeni.objektifkriter.com.tr` stage kaydı zaten var |
| O2.3 | **Tufan'a v3 önizleme sunumu + onayı** (vercel.app URL ile, cutover randevusundan ÖNCE) — DNS onun şirketinde, sürprizle karşılaşmamalı | Hakan + Cowork | Cowork sunum turu hazırlar |
| O2.4 | Tufan'la **cutover randevusu** sabitle (gün + saat) — WhatsApp mesaj taslağını Cowork yazar | Hakan | İki aylık DNS tıkanıklığının panzehiri randevu |
| O2.5 | **Resend domain doğrulaması cutover randevusuna dahil**: DNS kayıtları girilince Resend panelinde "Verify" → gönderici satis@objektifkriter.com.tr olur. O güne kadar form mailleri Resend default göndericisiyle akar (T5 testi öyle yapılır) | Hakan + Tufan | Sıralama çelişkisinin çözümü |
| O2.6 | Cutover öncesi son kontrol: T5 lead testi geçti · G7 QA kapandı · sitemap güncel · 301'ler hazır · **Wix'te içerik dondurma** (cutover'a kadar değişiklik yasak) | Cowork | Ben işaretlerim |

## O3 — CUTOVER GÜNÜ (30-45 dk, Hakan + Tufan birlikte)

1. Tufan DNS panelinde kayıtları girer (talimat maddeleri sırayla, ekran görüntüsü paylaşır)
2. **Cowork doğrulama turu (ben):** dig/DNS propagasyon kontrolü · https://objektifkriter.com.tr v3 açılıyor mu · www yönlenmesi · SSL · form testi (gerçek lead) · Resend SPF/DKIM/DMARC doğrulama
3. Sorun çıkarsa geri dönüş: eski kayıtlar not edilmiş olacak (talimat dosyasının sonuna "rollback" bölümü)
4. Başarı bildirimi: Tufan'a teşekkür + "eski Wix'i şu tarihte kapatıyoruz" mesajı

## O4 — Cutover sonrası ilk 48 saat

| İş | Araç |
|---|---|
| Google Search Console: mülk doğrula, sitemap gönder | Hakan + Cowork rehberliği |
| Analytics: **öneri çerezsiz Vercel Analytics veya Plausible** (çerez onay bandı gerekmez, KVKK derdi az). GA4 istenirse çerez onay bandı ZORUNLU eklenir | Claude Code |
| ok-iframe.vercel.app → objektifkriter.com.tr 301 | Claude Code (vercel.json) |
| **Wix tam arşivi**: kapatmadan önce tüm metin + görsel snapshot (Cowork tarayıcıyla gezer, kaydeder) | Cowork |
| Wix: yayından kaldır ama aboneliği 1 ay tut (rollback sigortası), sonra iptal | Hakan |
| İlk lead'lerin düştüğünü teyit + Resend gönderici domain'inin doğrulandığını kontrol | Hakan |

**30 gün izleme (başarı ölçütleri):** GSC'de indekslenen sayfa sayısı (hedef: sitemap'in %80'i ilk ay) · haftalık lead sayısı (form + WhatsApp ayrı sayılır) · 3 temel sorguda görünürlük ("ankara billboard kiralama" tarzı) · Lighthouse ≥90. Cowork ayda bir 15 dk rapor çıkarır.

## O5 — ANGARYA SIRASI (cutover'dan hemen sonra, sırayla)

| # | İş | Araç | Süre |
|---|---|---|---|
| A1 | Soluk logoların koyu varyantları (VakıfBank, Nissan, Paulmark, Hatemoğlu, Arçelik) — marka basın sayfalarından | Cowork bulur + Claude Code basar | 30 dk |
| A2 | SSS'yi gerçek sorularla değiştir (O1 girdisi geldiyse) | Claude Code | 30 dk |
| A3 | Vaka çalışması gerçek kampanyayla | Claude Code | 30 dk |
| A4 | Havalimanı LED'e özel fotoğraf | Hakan çeker/bulur + Claude Code | 15 dk |
| A5 | LinkedIn slug standardizasyonu (bozuk Unicode link) | Claude Code | 15 dk |
| A6 | Eski ifade taraması ("7 Ana Format" vb.) → 20 mecra dili | Claude Code | 30 dk |
| A7 | KVKK: MERSIS + KEP ekle | Claude Code | 10 dk |
| A8 | OG görselleri: sayfa tipi başına özel og:image üretimi | Claude Code | 1 saat |
| A9 | ok-iframe repo arşivi + README not ("v3'e taşındı") | Claude Code | 15 dk |
| A10 | Performans turu: görsel sıkıştırma, Lighthouse 90+ hedefi | Claude Code + Cowork | 1 saat |

## O6 — BAKIM RUNBOOK'U (`docs/UPDATE.md` — T6 oturumunda repo'ya yazılır)

> Amaç: 6 ay sonra bile tek başına, kimseye sormadan, 10 dakikada güncelleme. Her senaryo = kısa Claude Code oturumu (Sonnet yeter).

| Senaryo | Adımlar | Süre |
|---|---|---|
| **Envanter güncellendi** (yeni Excel geldi) | 1) Yeni Excel'i Cowork'e ver → envanter.json'u ben üretirim (bugünkü kurallarla: Network hariç, il bazlı) 2) Claude Code: "src/data/envanter.json'u değiştir, build et" 3) Onay → commit + deploy | 15 dk |
| **Fotoğraf ekleme/değiştirme** | photos/formats/{mecra}.jpg olarak dosyayı koy → build → deploy. Kod değişikliği yok | 5 dk |
| **Metin değişikliği** (SSS, format açıklaması, vaka) | src/data/content/ altındaki ilgili dosyayı düzenle → build → deploy | 10 dk |
| **Yeni mecra türü** | envanter.json'a format ekle + content'e açıklama + photos'a görsel → sayfalar otomatik türer | 20 dk |
| **Yeni il** | envanter.json'a il ekle → şehir sayfası, harita noktası, sitemap otomatik | 10 dk |

Ritüel: **3 ayda bir 30 dk bakım turu** (Cowork ile) — rakam tutarlılığı, kırık link, form testi, Lighthouse. Takvime sabitle.

## Cowork'ün sürekli görevleri (tüm plan boyunca)

- Her Claude Code oturumu için **hazır prompt üretimi** (Plan 1-2'deki taslaklardan)
- Preview URL'lerinin tarayıcı denetimi (desktop + mobile ekran görüntülü rapor)
- Rakam/tutarlılık bekçiliği: her yerde 44 / 20 / 36.134 (V3, 2026-07-20)
- Tufan iletişim taslakları (WhatsApp mesajları)
- İlerleme kaydı: her oturum sonu proje hafızasına durum notu

## Hızlı referans — hangi iş hangi araçta

| İş türü | Araç |
|---|---|
| Kod, build, git, deploy, toplu değişiklik | **Claude Code** |
| Tarayıcı denetimi, görsel karşılaştırma, ekran raporu | **Cowork** |
| Prompt hazırlama, plan, rapor, karşılaştırma, mesaj taslağı | **Cowork** |
| Fotoğraf çekimi/temini, karar, onay, Tufan ilişkisi | **Hakan** |
| DNS panel işlemleri | **Tufan** |
