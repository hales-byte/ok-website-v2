# DNS Kayıt Talebi — DNS Yöneticisine Gönderilebilir Mektup

> **Durum (8 Mayıs 2026):**
> - Domain `objektifkriter.com.tr` Resend'de eklendi (region: Ireland / eu-west-1)
> - `yeni.objektifkriter.com.tr` Vercel'de site staging için eklendi
> - Domain Cloudflare'da host'lanıyor — DNS yöneticisi **Cloudflare panel**'inde 5 kayıt eklemeli
>
> **DMARC değeri Chrome MCP tarafından "Cookie/query string data" olarak
> blok edildiği için aşağıda Resend default değeri (`v=DMARC1; p=none;`)
> kullanıldı.** Eğer Resend dashboard'da farklı (örn. reporting URL'li)
> bir DMARC değeri görüyorsan, Copy butonuyla alıp aşağıdaki ilgili
> alanı değiştir.

---

## E-posta / Mesaj Şablonu

**Konu:** objektifkriter.com.tr — Cloudflare DNS kayıt eklemesi (5 dakika, mevcut mail/site trafiğini etkilemez)

---

Merhaba,

`objektifkriter.com.tr` domain'i için **Cloudflare**'da aşağıdaki **5 DNS
kaydını** ekleyebilir misin? İki kullanım için:

1. **Site yeni adresinin staging'i** (`yeni.objektifkriter.com.tr` → Vercel)
2. **Kurumsal mail gönderim doğrulaması** (Resend — form bildirimleri vb.)

Mevcut mail (Workspace/Gmail) ve mevcut Wix sitesi bundan etkilenmez —
yeni kayıtlar farklı subdomain'ler altında.

---

### 1️⃣ Site Stage (CNAME) — `yeni.objektifkriter.com.tr` → Vercel

| Alan | Değer |
|---|---|
| Type | CNAME |
| Name | `yeni` |
| Target / Value | `fc3d0053447bc674.vercel-dns-017.com` |
| **Proxy status** | **DNS only (gri bulut)** ⚠️ |
| TTL | Auto |

> **⚠️ Cloudflare proxy KAPALI olmalı (gri bulut).** Turuncu bulut (proxy
> ON) olursa Vercel SSL üretemez ve site açılmaz. Bu kayıt eklenirken
> proxy iconunu gri (kapalı) konumda bırak.

---

### 2️⃣ DKIM (TXT) — Resend olarak gönderim yetkisi

| Alan | Değer |
|---|---|
| Type | TXT |
| Name | `resend._domainkey` |
| Value | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsYTzVpX+rzZsQQqVSNGAypAwZOxxvWad2Z/nK8eN8mQP2zlFSgpPIo04AiznB9SePM0y6oBnlzN/vAKIuww0O6RRy2fbhtzNe/d1MXdxhG8x0tkCW/gWmyb2ktbsFo7ld4CpKIGdC4EpQQm+v+tjUiknZ2bZ7hqTL1FeUsWpHxwIDAQAB` |
| TTL | Auto |

> **Not:** Bazı DNS panellerinde TXT değerini eklerken otomatik olarak
> tırnak işareti çevreleyebilir. Cloudflare bunu kendisi halleder, ham
> string olarak yapıştır yeterli.

---

### 3️⃣ Resend SPF MX — bounce/feedback rotaları

| Alan | Değer |
|---|---|
| Type | MX |
| Name | `send` |
| Value / Mail Server | `feedback-smtp.eu-west-1.amazonses.com` |
| Priority | 10 |
| TTL | Auto |

---

### 4️⃣ Resend SPF TXT — gönderim yetkilendirmesi

| Alan | Değer |
|---|---|
| Type | TXT |
| Name | `send` |
| Value | `v=spf1 include:amazonses.com ~all` |
| TTL | Auto |

> **Not:** Bu SPF kaydı `send` subdomain'i altında (root `@` değil).
> Domain'in mevcut root SPF kaydı varsa **etkilenmez**.

---

### 5️⃣ DMARC (TXT) — opsiyonel ama önerilen

| Alan | Değer |
|---|---|
| Type | TXT |
| Name | `_dmarc` |
| Value | `v=DMARC1; p=none;` |
| TTL | Auto |

> **Eğer `_dmarc` zaten varsa** yenisini ekleme — mevcut kaydı koru, bana
> haber ver, birlikte değerlendirelim.

---

### Eklenmemesi gereken kayıtlar ⚠️

Resend dashboard'da `inbound-smtp.eu-west-1.amazonaws.com` (MX, root `@`)
gibi bir "Enable Receiving" kaydı görüyor olabilirsin. **Bunu ekleme.**
Mevcut Workspace/Gmail mail kurulumunu kırar. Toggle Resend
dashboard'unda OFF olarak bıraktım.

---

### Notlar

- 5 kaydın hepsi **alt subdomain** altında (`yeni`, `send`,
  `resend._domainkey`, `_dmarc`) — root `@` ya da `www`'a dokunulmuyor.
- **Mevcut Wix sitesi `objektifkriter.com.tr` ana adresinde çalışmaya devam eder.** Ana site DNS'i değişmiyor.
- **Mevcut email (Google Workspace/Gmail)** etkilenmez. Root MX kayıtları olduğu gibi kalıyor.
- Eklendikten sonra ben Resend + Vercel dashboard'larında kontrol edeceğim — doğrulama 10 dakika - 24 saat içinde tamamlanıyor (genelde 1 saat).
- Soru olursa direkt yazabilirsin.

Teşekkürler,
Hakan
hakan.karacam@objektifkriter.com.tr
+90 552 918 58 64

---

## Hatırlatma — Kayıtlar eklendikten sonra ne yapılacak

### Senin tarafında:

1. **Resend dashboard** → domains → `objektifkriter.com.tr` → "Verified" yeşil tik bekle
2. **Vercel dashboard** → Settings → Domains → `yeni.objektifkriter.com.tr` "Valid Configuration" bekle
3. `https://yeni.objektifkriter.com.tr` adresinde site açılmalı (SSL otomatik)

### Ben (Claude) yardım edeceğim:

4. Vercel project → Settings → Environment Variables güncellemesi:
   - `RESEND_FROM` → `bildirim@objektifkriter.com.tr`
   - `RESEND_TO` → `hakan.karacam@objektifkriter.com.tr`
5. Vercel **Redeploy** ile yeni env'leri build'a sok
6. Form üzerinden test mesajı gönder, mail'in artık `bildirim@objektifkriter.com.tr` adresinden geldiğini doğrula

### Sonraki büyük adım — Wix → Vercel ana domain cutover:

Stage URL'inde 1-2 hafta gez, gerçek müşteri trafiğine açmak için
hazır olduğunda apex domain (`objektifkriter.com.tr` + `www`) Wix'ten
Vercel'e taşınır. Bu adım için ayrı plan gerek (301 redirect haritası,
DNS değişikliği), o zaman beraber yaparız.
