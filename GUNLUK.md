# GÜNLÜK — OK v3 (sade dille proje güncesi)
> Her oturum sonunda Claude Code buraya bir girdi ekler. Amaç: Hakan'ın 1 dakikada
> "ne yapıldı, neden, ne işe yaradı" sorularına cevap alması. Teknik dil kullanılmaz.

## Girdi şablonu (Claude Code bunu kopyalar)

```
### {TARİH} — {Paket no}: {kısa başlık}
**Ne yapıldı:** (tek cümle, jargonsuz)
**Neden:** (hangi sorunu çözmek için)
**Ne işe yaradı:** (somut fayda — müşteri/lead/hız/güven açısından)
**Sırada:** (bir sonraki adım)
```

---

### 2026-07-04 — G1: Sitenin yüzü yeni kimliğe geçti (Seçenek B — aydınlık gövde + koyu vurgu)
**Ne yapıldı:** Site rengi eski petrol-turkuazdan canlı "cyan" vurguya taşındı; başlıklar zarif bir serif yazı tipine (Cormorant) geçti; ana giriş bölümü ve alt bilgi (footer) koyu banda alınıp aradaki gövde aydınlık bırakıldı; giriş bölümüne akan ">>>" ok motifi eklendi; ileride bölüm başlıklarında kullanılacak hazır bir başlık bileşeni üretildi.
**Neden:** İki eski sitenin en beğenilen görsel dili (koyu vurgu + serif + cyan) yeni siteye taşınacaktı; G0'da bu yön (Seçenek B) kesinleşti.
**Ne işe yaradı:** Site artık tek ve tutarlı bir marka görünümüne sahip; okunabilirlik korundu (açık zeminde küçük yazılar koyu tonda, parlak cyan sadece büyük vurgularda — görme erişilebilirliği/WCAG bozulmadı). Sayfaların içeriği/düzeni değişmedi, sadece görünüm değişti. **Denetimden geçti ve repoya işlendi.**
**Sırada:** Bu kimlik tek tek sayfa bölümlerine yayılacak (G2 ve sonrası).

### 2026-07-04 — Uygulama: v3 teknik paket repoya indi, önizleme yayında
**Ne yapıldı:** Cowork'ün ürettiği teknik paket (T0-T6) siteye uygulandı, doğrulandı (envanter 7/7, 186 sayfa sorunsuz üretildi) ve önizleme olarak yayınlandı; ayrıca LinkedIn adresindeki bozuk bağlantı iki sayfada düzeltildi. Hepsi tek bir kayıt olarak proje deposuna gönderildi.
**Neden:** Sandbox'ta hazırlanan değişikliklerin gerçek projeye taşınıp canlıya çok benzer bir ortamda görülmesi gerekiyordu.
**Ne işe yaradı:** Artık çalışan, gezilebilir bir önizleme adresi var; rakamlar ve sayfa üretimi teyit edildi; site deposu güncel.
**Sırada:** Görsel kimlik (G1) çalışması.

### 2026-07-04 — T0-T6: Sitenin motoru tek seferde değişti (Cowork otonom tur)
**Ne yapıldı:** Sitenin tüm sayfaları kırık veritabanından koparılıp tek envanter dosyasına bağlandı; bozuk boş harita yerine bağımsız Türkiye haritası kuruldu; teklif formu kaybolmayan e-posta hattına geçirildi; her yerdeki eski rakamlar (39/18/35.861 ve 47/33.812) 45 il · 20 mecra · 35.919 ünite olarak eşitlendi.
**Neden:** Veritabanı hesabı kaybolduğu için şehir sayfaları ve harita boş geliyordu; üç farklı rakam evreni vardı; form mailleri güvencesizdi.
**Ne işe yaradı:** Site artık hiçbir dış hesaba muhtaç değil — Google'a 45 şehir + 122 şehir-mecra sayfası açılıyor, eski adresler yeni sayfalara yönlendiriliyor, her talep e-postayla satışa düşüyor. Güncelleme artık tek dosya değiştirmek kadar basit (docs/UPDATE.md).
**Sırada:** Hakan'ın onayı → değişikliklerin repoya işlenmesi + önizleme yayını → mail testinin yapılması → tasarım kararı (G0).

### 2026-07-02 — Hazırlık: Envanter tek listeye indirildi
**Ne yapıldı:** Şirketin dağınık envanter Excel'i il il toplandı, tek temiz liste ve site dosyası (envanter.json) üretildi.
**Neden:** Üç yerde üç farklı rakam vardı (39 şehir / 47 şehir / eski toplamlar) — hangisi doğru belli değildi.
**Ne işe yaradı:** Artık tek doğru var: 45 il, 20 mecra türü, 35.919 ünite. Sitede görünen her sayı bu dosyadan gelecek; envanter değişince tek dosya değişecek.
**Sırada:** Bu dosyanın yeni siteye bağlanması (T1-T2).

### 2026-07-04 — Hazırlık: İki site karşılaştırıldı, birleştirme kararı alındı
**Ne yapıldı:** Eldeki iki site (koyu tek-sayfa tanıtım sitesi + çok sayfalı Next.js sitesi) her açıdan karşılaştırıldı; en iyi parçaların birleştirileceği "v3" kararlaştırıldı, 4 plan + bu çalışma düzeni hazırlandı.
**Neden:** İki siteyi ayrı ayrı güncellemek çift iş; birinin görseli, diğerinin altyapısı güçlüydü; ikisinin de rakamları eskiydi.
**Ne işe yaradı:** Tek yol haritası: kırık veritabanı yerine basit dosya, kaybolmayan form mailleri, Google'dan şehir bazlı müşteri getirecek sayfa yapısı — ve bakımı 10 dakikaya inen bir site.
**Sırada:** T0 — projenin bilgisayarda kurulumu.

---
<!-- Yeni girdiler BURAYA, en üstteki girdinin ALTINA değil ÜSTÜNE eklenir -->
