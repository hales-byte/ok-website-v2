# OK Website v2 — Yol Haritası (Faz 3 ve sonrası)

Faz 1 (Form) ve Faz 2 (Harita) tamamlandı. Bu doküman sırada bekleyen
fazları takip eder.

---

## Faz 3 — Bildirim & İletişim Otomasyonu

### 3.1 Resend Mail Bildirimi ✅ (test mode aktif)

Form submit sonrası `RESEND_TO` adresine HTML bildirim maili gider.
Subject: "Yeni Teklif: [Ad Soyad] — [Segment]". İletişim + talep
detayları + KVKK meta + Supabase quick-link. `replyTo` müşteri adresi
(Hakan tek tıkla yanıtlar).

**Mevcut durum:**
- ✅ Resend API key tanımlı, integration çalışıyor (test edildi, mail ID
  döndü)
- ⚠ **Test mode kısıtı**: yeni Resend hesapları sadece kayıt email'ine
  (`yhakan.karacam@gmail.com`) gönderebilir. Diğer adresler 403 reddi.
- 🟡 Geçici çözüm: `RESEND_TO=yhakan.karacam@gmail.com`. Hakan formları
  gmail'inde okur, "Yanıtla"yla müşteriye direkt cevap verir.

**Production'a geçmek için: domain doğrulama (Faz 3.1.1)**

`objektifkriter.com.tr` DNS başka birinin yönetiminde. İki seçenek:

**(a)** Domain admin'inden DKIM/SPF/DMARC TXT kayıtlarının eklenmesini iste:
1. https://resend.com/domains → "Add domain" → `objektifkriter.com.tr`
2. Resend 4 satır kayıt verir (DKIM 1 CNAME, SPF 1 TXT, DMARC 1 TXT,
   MX kontrol)
3. DNS admin'i bu kayıtları ekler — herkesin DNS panelinde "Add Record"
   ile ~5 dk iş, herhangi bir mail trafiğini etkilemez
4. Doğrulama 10 dk - 24 saat sürer (genelde 1 saat)
5. Doğrulanınca: `RESEND_FROM=bildirim@objektifkriter.com.tr`,
   `RESEND_TO=hakan.karacam@objektifkriter.com.tr`, restart → kurumsal
   görünür ("via resend.dev" kaybolur)

**(b)** Yeni alt-domain veya basit domain al → DNS yönet sende →
yukarıdaki adımlar 5 dk içinde biter. Eğer domain admin'i ile temas
zor olacaksa bu yol daha pratik.

**Free tier limitleri:**
- 100 mail/gün
- 3000 mail/ay
- Trafik artışında ücretli plana geç (~$20/ay)

### 3.2 Form ↔ Müşteri Yanıt Akışı (manuel, kısa vadeli)

Mevcut flow: müşteri form gönderir → Hakan mail alır → Hakan müşteriye
manuel mail/telefon ile döner → satış görüşmesi.

Bu yeterli olduğu sürece otomasyon gereksiz. Otomasyon kararı şu
sinyalde verilir: günlük >5 form, 30 dk vaadi tutturulamayan zamanlar
çoğalır, müşteri iki kere yazıp cevap alamadığını söyler.

---

## Faz 4 — AI Destekli İletişim & Teklif Otomasyonu (vizyon)

**Hedef:** Müşteri formdan gelir → AI saniyeler içinde özet + ilk yanıt
gönderir → uygun lokasyonlar + tahmini fiyat + sonraki adım sunulur →
gerek olduğunda Hakan görüşmeye girer. Hakan'ın "form'a tek tek bakıp
yanıtlama" yükü ortadan kalkar; sadece kapanışta ve özel taleplerde
müdahil olur.

### 4.1 İlk Adım: AI ile Otomatik İlk Yanıt (~6-10 saat)

Resend ile gelen bildirimden hemen sonra:
1. Müşterinin form bilgileri + envanter + standart fiyat tablosu AI'ya
   verilir (Claude API veya OpenAI).
2. AI şu çıktıyı üretir:
   - 2-3 cümlelik özet (Hakan için)
   - Müşteriye gidecek hazır taslak yanıt: "Talebinizi aldık,
     [şehir/format] için [şu ünitelerimiz] var, tahmini bütçe X-Y
     bandında, X tarihte detaylı görüşelim mi?" tonunda
3. Hakan'a iki mail gider: (a) özet + müşteri yanıtı taslağı, (b)
   "Onayla → müşteriye otomatik gönder" linki. Hakan tek tıkla onaylar,
   AI taslağı gerçek yanıt olarak müşteriye gider. Yanlış görürse manuel
   yazar.

**Risk azaltma:** İlk versiyonda her müşteri yanıtı **Hakan onayından
geçer**. AI hiçbir şey kendi başına gönderemez. Güven kurulduktan sonra
"otomatik gönder" eşikleri (segment + bütçe + format kombinasyonuna
göre) tanımlanır.

**Maliyet:** Claude Sonnet ile teklif başına ~$0.01-0.05. Aylık 200
form bile $10/ay civarı.

### 4.2 WhatsApp Business Entegrasyonu (~10-14 saat)

Hedef: müşteri form yerine WhatsApp'tan da konuşabilsin, formdan gelen
müşteri yanıtını WhatsApp'tan alabilsin. Aynı AI altyapısı, farklı kanal.

**Teknik yol:**
- WhatsApp Business Platform (Cloud API) — Meta'nın resmi API'si.
  Ücretsiz tier'da var, mesaj başına ücretlendirme.
- Veya **Twilio WhatsApp API** — daha az setup, premium fiyat.
- Türkiye için **WATI** veya **InfoSetIn** gibi yerel WhatsApp BSP'ler
  bazen daha kolay onboarding.

**Kullanım senaryoları:**
1. Müşteri form gönderdikten sonra Resend mail + WhatsApp mesajı her
   ikisi de gider (multi-channel). Hangisi yanıtlarsa orası devam eder.
2. WhatsApp'ta serbest sohbet: "Adana'da billboard fiyatı?" → AI
   envanter + fiyat tablosundan yanıt çıkarır → Hakan'ın onayıyla
   gönderir.
3. Onaylı teklif PDF'i WhatsApp'tan da iletilebilir.

**Risk azaltma:**
- WhatsApp Business hesabı Meta'da onaylanmalı (1-3 gün).
- Initial templated mesajlar Meta'dan onay alır.
- 24 saat session window kuralı var (kullanıcı önce yazmadan biz
  template-dışı serbest mesaj atamayız).

### 4.3 Otomatik Teklif Hazırlama (~14-20 saat, en uzak)

Müşteri kabaca brief verir → AI envanter veritabanından, şehir/format/
bütçe filtresiyle, optimal kombinasyonu seçer → tek sayfa görsel teklif
PDF'i üretir (logo, tarih, müşteri adı, lokasyon listesi + harita
thumbnail + fiyat). Hakan onaylar → müşteriye yollanır.

**Bu adım için ön gereksinim:** Faz 4.1 ve 4.2 olgunlaşmalı, AI yanıt
kalitesi tutarlı olmalı. Hakan'ın "yapay zeka teklif önerisini düzelt"
manuel müdahale oranı %20'nin altına düşmeli ki tam otomasyon mantıklı
olsun.

---

## Faz 5 — Operasyon & İçgörü

(Plan oluşturulacak — Faz 4 stabilize olduktan sonra netleşir.)

İlk fikirler:
- Talep dashboard'u (Hakan için): kim, ne, ne zaman, hangi aşamada,
  conversion oranları
- Şehir/format bazlı talep ısı haritası (envanter pini ile farklı renk)
- Dönemsel kapasite raporları (envanter doluluk vs müsait)
- Müşteri segmentasyon: marka mı ajans mı, lifetime value, repeat
  oranı

---

## Karar Çerçevesi

Hangi adımı ne zaman? Tetikleyiciler:

| Tetikleyici | Adım |
|---|---|
| Form bildirimi mail'e düşmüyor | Faz 3.1 (Resend env doldur) |
| Hakan günde 5+ forma manuel yanıt yetiştiremiyor | Faz 4.1 (AI ilk yanıt taslağı) |
| Müşteriler "neden cevap yok" diye telefonla arıyor | Faz 4.2 (WhatsApp) |
| AI yanıt kalitesi %80+ "olduğu gibi gönderilebilir" | Faz 4.3 (otomatik teklif) |
| Hakan operasyon kararları için veri istiyor | Faz 5 (dashboard) |
