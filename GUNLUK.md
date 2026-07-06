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

### 2026-07-06 — G3: Ana sayfaya "Güçlü İş Birlikleri" logo duvarı eklendi (30 marka)
**Ne yapıldı:** Ana sayfaya ve Markalar sayfasına, birlikte çalışılan 30 markanın logolarından oluşan bir "Güçlü İş Birlikleri" bölümü eklendi; üstünde iki rakamlı bir güven şeridi var (180+ Ajans İş Birliği · 890+ Marka Deneyimi — ortalanmış). Ana sayfa ilk 15 logoyu gösterip "30 markanın tamamı" diye Markalar sayfasına yönlendiriyor; Markalar sayfası 30'un tamamını gösteriyor. Logolar beyaz kartlar içinde, yumuşak kayarak beliriyor.
**Neden:** Ziyaretçi "bu firmaya kimler güvenmiş?" sorusunun cevabını tanıdık markaların logolarıyla anında görmeli — sosyal kanıt, teklif isteme kararını en çok etkileyen unsurlardan biri.
**Ne işe yaradı:** Site artık somut bir referans duvarı gösteriyor; büyük markaların yan yana durması güven veriyor. Ayrıca bu iş, sitenin metin/verisini koddan ayıran ilk "içerik dosyası"nı (is-birlikleri.ts) kurdu — bundan sonra logolar/metin değişince tek dosya düzenlenecek, koda dokunulmayacak.
**Sırada:** Cowork denetimi + Hakan onayı → repoya işlenmesi → kalan görsel/kimlik yayma işleri (G4b-G7) ve birkaç soluk logonun (VakıfBank, Nissan vb.) koyu varyantla yenilenmesi.

### 2026-07-05 — G4a: Mecra kartlarına gerçek fotoğraflar geldi (havalimanı ilk kez)
**Ne yapıldı:** Ana sayfadaki reklam formatı kartlarının fotoğrafları yenilendi (6 kart); havalimanı formatı ilk kez gerçek bir görsele kavuştu (önceden boş/yer tutucu tasarımla görünüyordu). Görseller marka kimliğiyle uyumlu (cyan ok motifi işlenmiş). Ayrıca ileride açılabilecek bir "tramvay giydirme" formatı için hazır bir görsel de klasöre eklendi ama henüz bir karta bağlanmadı.
**Neden:** Yer tutucu/eski görseller yerine, her formatın nasıl göründüğünü net gösteren gerçek sahneler ziyaretçinin "ürünü" anlamasını kolaylaştırır; havalimanı premium bir format olduğu için görselsiz durması eksiklikti.
**Ne işe yaradı:** 8 format kartının hepsi artık gerçek görselle sunuluyor; havalimanı kartı tamamlandı. Sayfa yapısı değişmedi, sadece görseller güçlendi.
**Sırada:** Hakan onayı → repoya işlenmesi → kimliğin diğer bölümlere yayılması (G3) ve tramvay formatının açılıp açılmayacağı kararı.

### 2026-07-04 — G2: Giriş bölümüne güç kanıtı eklendi (42,4 milyon aylık erişim)
**Ne yapıldı:** Ana sayfanın giriş bölümüne "Türkiye'nin Anadolu Açıkhava Lideri" üst etiketi ve dört rakamlı bir güven bandı (il · mecra türü · ünite · aylık erişim) eklendi. En önemlisi: "42,4 milyon aylık erişim" rakamı elle yazılmak yerine il nüfuslarından otomatik hesaplanıyor; envanter değişirse rakam kendiliğinden güncellenir ve kontrol aracı bunu doğruluyor.
**Neden:** Ziyaretçi daha giriş ekranında "bu firma ne kadar büyük, kaç kişiye ulaşıyorum?" sorusunun cevabını görmeli; ayrıca pazarlama rakamlarının uydurma değil, gerçek veriden türemesi güven verir.
**Ne işe yaradı:** Giriş bölümü artık tek bakışta ölçek anlatıyor (45 il, 20 mecra, ~35,9 bin ünite, 42,4M erişim); rakam tek bir doğruluk kaynağından geldiği için ileride "sitede yanlış sayı" riski yok.
**Sırada:** Cowork denetimi + Hakan onayı → repoya işlenmesi → kimliğin diğer sayfa bölümlerine yayılması (G3+).

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
