# DNS Kayıtları — objektifkriter.com.tr

> **Hedef:** Cloudflare panel'inde 5 DNS kaydı eklenecek
> **Etki:** Mevcut Wix sitesi ve Workspace email kurulumu **etkilenmez**
> (5 kayıt tamamen alt-subdomain'lerde: `yeni`, `send`, `resend._domainkey`, `_dmarc`)
> **Süre:** 5 dakikalık iş, doğrulama 10 dk - 24 saat

---

## Tablo Görünümü (Cloudflare panel'inde manuel ekleme)

| # | Type | Name | Target / Value | Priority | Proxy | TTL |
|---|------|------|----------------|----------|-------|-----|
| 1 | **CNAME** | `yeni` | `fc3d0053447bc674.vercel-dns-017.com` | — | **DNS only (gri bulut)** ⚠️ | Auto |
| 2 | **TXT** | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsYTzVpX+rzZsQQqVSNGAypAwZOxxvWad2Z/nK8eN8mQP2zlFSgpPIo04AiznB9SePM0y6oBnlzN/vAKIuww0O6RRy2fbhtzNe/d1MXdxhG8x0tkCW/gWmyb2ktbsFo7ld4CpKIGdC4EpQQm+v+tjUiknZ2bZ7hqTL1FeUsWpHxwIDAQAB` | — | — | Auto |
| 3 | **MX** | `send` | `feedback-smtp.eu-west-1.amazonses.com` | **10** | — | Auto |
| 4 | **TXT** | `send` | `v=spf1 include:amazonses.com ~all` | — | — | Auto |
| 5 | **TXT** | `_dmarc` | `v=DMARC1; p=none;` | — | — | Auto |

---

## BIND Zone File (Cloudflare bulk import için)

> **Cloudflare** → DNS → **Records** → üst sağda `⋯` → **Import and Export** → **Import** → aşağıdaki bloğu yapıştır:

```dns
$ORIGIN objektifkriter.com.tr.
$TTL 3600

; 1) Vercel site stage — yeni.objektifkriter.com.tr
yeni                3600    IN      CNAME   fc3d0053447bc674.vercel-dns-017.com.

; 2) Resend DKIM — domain doğrulama
resend._domainkey   3600    IN      TXT     "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsYTzVpX+rzZsQQqVSNGAypAwZOxxvWad2Z/nK8eN8mQP2zlFSgpPIo04AiznB9SePM0y6oBnlzN/vAKIuww0O6RRy2fbhtzNe/d1MXdxhG8x0tkCW/gWmyb2ktbsFo7ld4CpKIGdC4EpQQm+v+tjUiknZ2bZ7hqTL1FeUsWpHxwIDAQAB"

; 3) Resend SPF MX — bounce/feedback rotaları
send                3600    IN      MX      10 feedback-smtp.eu-west-1.amazonses.com.

; 4) Resend SPF TXT — gönderim yetkilendirmesi
send                3600    IN      TXT     "v=spf1 include:amazonses.com ~all"

; 5) DMARC — opsiyonel ama önerilen
_dmarc              3600    IN      TXT     "v=DMARC1; p=none;"
```

> **Bulk import sonrası**: Cloudflare 5 kaydı listeleyip onay isteyecek. Onayla.
> **`yeni` CNAME için proxy**: Bulk import sonrası `yeni` satırında bulutu **gri (DNS only)** yap. Default'ta turuncu (proxied) gelirse Vercel SSL üretemez.

---

## Önemli Uyarılar

### ⚠️ Cloudflare proxy kapalı kalmalı (sadece `yeni` CNAME için)
- **DNS only / gri bulut**: Vercel SSL üretebilsin diye
- **Proxied / turuncu bulut**: SSL bozar, "ERR_TOO_MANY_REDIRECTS" hatası verir

### 🚫 Eklenmeyecek kayıt: `inbound-smtp.eu-west-1.amazonaws.com` (MX `@`)
Resend dashboard'unda görünebilir ("Enable Receiving"). **Eklemeyin** — Workspace/Gmail mail kurulumunu kırar. Resend tarafında toggle OFF olarak ayarlandı.

### Mevcut kayıtlarla çakışma kontrolleri
- **`@` (root) MX**: Eski mail kayıtları (Workspace / başka MX) **olduğu gibi kalır**.
- **`@` (root) TXT SPF (varsa)**: Yeni SPF `send.` alt-subdomain'inde → root SPF etkilenmez.
- **`_dmarc` (varsa)**: Cloudflare zaten `_dmarc` görürse import duplicate uyarısı verir → **mevcut DMARC korunur**, yenisini ekleme. Var olan policy yeterli olabilir.

---

## Doğrulama (DNS yöneticisi ekledikten sonra biz yapacağız)

| Servis | Beklenen sonuç | Süre |
|---|---|---|
| Resend dashboard → Domains | `objektifkriter.com.tr` yanında yeşil **Verified** | 10 dk - 24 sa |
| Vercel dashboard → Domains | `yeni.objektifkriter.com.tr` → **Valid Configuration** | 5 dk - 1 sa |
| `https://yeni.objektifkriter.com.tr` | Site açılır + geçerli SSL | DNS propagation sonrası |

CLI ile manuel doğrulama (DNS yöneticisi isterse):
```bash
dig +short TXT resend._domainkey.objektifkriter.com.tr
dig +short MX send.objektifkriter.com.tr
dig +short TXT send.objektifkriter.com.tr
dig +short TXT _dmarc.objektifkriter.com.tr
dig +short CNAME yeni.objektifkriter.com.tr
```

---

## İletişim

Sorun çıkarsa:
**Hakan Karacam** — `hakan.karacam@objektifkriter.com.tr` — `+90 552 918 58 64`

---

*Son güncelleme: 8 Mayıs 2026*
