# Cloudflare DNS Talimatı — objektifkriter.com.tr

> Selam Tufan! Objektif Kriter web sitesi Vercel'e taşındı, formdan gelen brief'ler Resend ile email olarak gönderilecek. Cloudflare DNS'e **6 kayıt** eklemen yeterli, **10 dakikalık bir iş**. Aşağıdaki adımları sırayla uygula.

---

## Adım 1: Cloudflare'a giriş yap

https://dash.cloudflare.com

Giriş yaptıktan sonra hesaplardan **objektifkriter.com.tr** alan adına tıkla.

---

## Adım 2: DNS panelini aç

Sol menüden **DNS → Records** sekmesini aç.

---

## Adım 3: Eski Wix kayıtlarını SİL

Şunlardan **varsa hepsini sil** (apex ve www için olanlar):

- `Type: A`, `Name: @` veya `objektifkriter.com.tr` — SİL
- `Type: CNAME`, `Name: @` — SİL
- `Type: A`, `Name: www` — SİL
- `Type: CNAME`, `Name: www` — SİL

Diğer kayıtlara (MX kayıtları varsa email için — Google Workspace/Yandex vs., TXT — Google verification gibi) **DOKUNMA**.

---

## Adım 4: 6 yeni kayıt ekle

Her kayıt için "Add record" tıkla, alanları doldur, Save de.

### Kayıt 1 — Vercel apex CNAME

| Alan | Değer |
|---|---|
| Type | `CNAME` |
| Name | `@` |
| Target | `b33e16f4b76f1cac.vercel-dns-017.com.` |
| Proxy status | **DNS only** ⚪ (gri bulut — turuncu DEĞİL) |
| TTL | Auto |

### Kayıt 2 — Vercel www CNAME

| Alan | Değer |
|---|---|
| Type | `CNAME` |
| Name | `www` |
| Target | `b33e16f4b76f1cac.vercel-dns-017.com.` |
| Proxy status | **DNS only** ⚪ |
| TTL | Auto |

### Kayıt 3 — Resend DKIM (form email gönderimi için imza)

| Alan | Değer |
|---|---|
| Type | `TXT` |
| Name | `resend._domainkey` |
| Content | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsYTzVpX+rzZsQQqVSNGAypAwZOxxvWad2Z/nK8eN8mQP2zlFSgpPIo04AiznB9SePM0y6oBnlzN/vAKIuww0O6RRy2fbhtzNe/d1MXdxhG8x0tkCW/gWmyb2ktbsFo7ld4CpKIGdC4EpQQm+v+tjUiknZ2bZ7hqTL1FeUsWpHxwIDAQAB` |
| TTL | Auto |

> Not: Content çok uzun. **Tek satır olarak yapıştır**, boşluk veya satır sonu eklenirse hata verir.

### Kayıt 4 — Resend SPF MX

| Alan | Değer |
|---|---|
| Type | `MX` |
| Name | `send` |
| Mail server / Target | `feedback-smtp.eu-west-1.amazonses.com` |
| Priority | `10` |
| TTL | Auto |

### Kayıt 5 — Resend SPF TXT

| Alan | Değer |
|---|---|
| Type | `TXT` |
| Name | `send` |
| Content | `v=spf1 include:amazonses.com ~all` |
| TTL | Auto |

### Kayıt 6 — DMARC (opsiyonel ama tavsiye edilir)

| Alan | Değer |
|---|---|
| Type | `TXT` |
| Name | `_dmarc` |
| Content | `v=DMARC1; p=none;` |
| TTL | Auto |

---

## ⚠️ KRİTİK NOTLAR

### Proxy ayarı (sadece Vercel CNAME'leri için)
Cloudflare'da her satırın yanında bulut ikonu var:
- **Gri bulut ⚪ = DNS only** ← ✅ Vercel CNAME'lerinde bunu seç
- **Turuncu bulut 🟠 = Proxied** ← ❌ Vercel için SEÇME (SSL bozulur)

TXT ve MX kayıtlarında proxy seçeneği zaten yok, sorun değil.

### Name yazımı
Cloudflare otomatik olarak `objektifkriter.com.tr`'yi sona ekler. Yani:
- `Name: send` yazınca tam isim `send.objektifkriter.com.tr` olur
- `Name: resend._domainkey` yazınca tam isim `resend._domainkey.objektifkriter.com.tr` olur

Tam isim yazma!

---

## Adım 5: Bilgilendir

DNS kayıtlarını ekledikten sonra **Hakan'a "tamam" yaz** (WhatsApp: +90 552 918 5864).

Hakan Vercel + Resend panellerinden "verify" çalıştırıp her şey yeşil mi diye kontrol edecek. Bekleme süresi 5-30 dk.

---

## Sorun çıkarsa

- WhatsApp: +90 552 918 5864
- Panel screenshot paylaş, çözeriz.

---

**Teşekkürler!**
