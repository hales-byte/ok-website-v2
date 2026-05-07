# Resend Domain Doğrulama — DNS Yönetenine Şablon Mektup

> **Kullanım:** Önce [resend.com/domains](https://resend.com/domains)
> üzerinden `objektifkriter.com.tr` ekle. Resend sana DKIM, SPF, DMARC
> ve MX kontrol satırlarını verecek. Aşağıdaki `<<DOLDURULACAK>>`
> alanlarını gerçek değerlerle değiştir, sonra DNS yönetenine
> email/WhatsApp ile gönder.

---

## E-posta / Mesaj Şablonu

**Konu:** objektifkriter.com.tr — DNS kayıt eklemesi (5 dakika, mail
trafiğini etkilemez)

---

Merhaba,

`objektifkriter.com.tr` domain'inde, kurumsal mail gönderimi (form
bildirimleri vb.) için **Resend** servisini kullanıyoruz. Bu
servisin alıcı sunucularda spam'e düşmemesi için 3 küçük DNS kaydı
eklemesi gerekiyor.

Aşağıdaki kayıtları DNS panelinde **olduğu gibi** ekleyebilir misin?

### Eklenecek 3 kayıt

#### 1. DKIM (CNAME)

| Alan | Değer |
|---|---|
| Tür | CNAME |
| Host / Name | `<<DOLDURULACAK_DKIM_HOST>>` |
| Value / Hedef | `<<DOLDURULACAK_DKIM_VALUE>>` |
| TTL | Auto (varsayılan) |

#### 2. SPF (TXT)

| Alan | Değer |
|---|---|
| Tür | TXT |
| Host / Name | `<<DOLDURULACAK_SPF_HOST>>` (genelde `@` ya da boş) |
| Value | `<<DOLDURULACAK_SPF_VALUE>>` (örn. `v=spf1 include:amazonses.com ~all`) |
| TTL | Auto |

> Eğer domain'de zaten bir SPF (TXT, `v=spf1...`) varsa **yenisini ekleme** —
> mevcut SPF'in `include:` listesine `<<DOLDURULACAK_SPF_INCLUDE>>` parçasını
> eklemek yeterli. Tek bir SPF satırı olmalı.

#### 3. DMARC (TXT)

| Alan | Değer |
|---|---|
| Tür | TXT |
| Host / Name | `<<DOLDURULACAK_DMARC_HOST>>` (genelde `_dmarc`) |
| Value | `<<DOLDURULACAK_DMARC_VALUE>>` (örn. `v=DMARC1; p=none;`) |
| TTL | Auto |

---

### Notlar

- **MX kaydı değişmez** — domain'in mevcut mail alma trafiği bundan
  etkilenmez. Bu kayıtlar sadece "bizim adımıza mail göndermeye yetkili
  olduğumuzu" ispatlar.
- Eklendikten sonra ben kontrol edeceğim, doğrulama 10 dakika - 24 saat
  içinde tamamlanıyor.
- Soru olursa direkt yazabilirsin.

Teşekkürler,
Hakan
hakan.karacam@objektifkriter.com.tr
+90 552 918 58 64

---

## Hatırlatma — Kayıtları aldıktan sonra

1. Resend dashboard'da yeşil tik gör (Verified)
2. Vercel project → Settings → Environment Variables:
   - `RESEND_FROM=bildirim@objektifkriter.com.tr`
   - `RESEND_TO=hakan.karacam@objektifkriter.com.tr`
3. Vercel'de "Redeploy" butonuna bas (env değişikliği build'a girsin)
4. Form üzerinden test mesajı gönder, mail kurumsal adresinden
   geldiğini doğrula
