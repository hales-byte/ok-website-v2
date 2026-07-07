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

### 2026-07-07 — V1: Envanter gerçek sayıya güncellendi (36.703 ünite)
**Ne yapıldı:** Sitedeki envanter rakamları gerçek duruma çekildi. Aydın ili envantere eklendi (782 ünite: 532 billboard + 250 CLP/raket-durak; Didim, Kuşadası, Efeler, Söke ve Nazilli'de sahalar), Edirne ise envanterden çıkarıldı. Böylece toplam ünite sayısı 35.919'dan **36.703**'e yükseldi (il sayısı 45 sabit kaldı — biri girdi, biri çıktı). Nüfus tabanımız da değiştiği için "aylık erişim" rakamı 42,4 milyondan **43,1 milyona** çıktı — bu sayı elle yazılmıyor, envanterdeki illerin nüfusundan otomatik hesaplanıyor. Edirne'yi arayan ya da eski linkten gelen ziyaretçi otomatik olarak Kırklareli sayfasına yönlendiriliyor (arama motorlarına "kalıcı taşındı" sinyali veren yönlendirme). Tüm site sayfaları bu tek envanter dosyasından beslendiği için rakam her yerde (ana sayfa, harita, şehir sayfaları) kendiliğinden güncellendi.
**Neden:** Envanter sahada değişti (Aydın'da yeni sahalar devreye girdi, Edirne'deki iş sonlandı); sitenin bunu yansıtması hem doğruluk hem güven meselesi. Rakamları tek dosyadan türetmek "bir yerde güncelledim, başka yerde eski kaldı" hatasını baştan engelliyor. Edirne linkinin boşa düşmemesi için en yakın/ilgili ile (Kırklareli) yönlendirme kondu — hem ziyaretçi kaybı hem arama motoru cezası önlenir.
**Ne işe yaradı:** Site artık gerçek envanteri gösteriyor: 45 il, 20 mecra, 36.703 ünite, 43,1M aylık erişim. Aydın sayfası ve alt format sayfaları (billboard/CLP) yayında; Edirne linki sorunsuz Kırklareli'ye taşınıyor. Otomatik kontrol aracı da genişletildi (Aydın'ın eklendiğini ve Edirne'nin çıktığını ayrıca sınıyor), böylece ileride yanlış rakam sızması engellenir. Hepsi canlı ortamda tek tek doğrulandı.
**Sırada:** Kalan görsel/kimlik yayma işleri (varsa) → teklif formunun uçtan uca e-posta testi (Resend anahtarı Hakan'da).

### 2026-07-07 — G5+G7a: Harita cilalandı + fiyat kalıntıları temizlendi
**Ne yapıldı:** İki iş bir arada yapıldı. (1) Envanter sayfasındaki Türkiye haritası cilalandı: bir ile tıklayınca il artık koyu bir çerçeveyle belirgin şekilde vurgulanıyor, seçili olmayan iller hafifçe soluyor; klavyeyle de gezilebiliyor (Tab ile ile gel, Enter/boşluk ile seç) ve odaklanınca görünür bir çerçeve çıkıyor; sağdaki bilgi panelinde bölge etiketinin rengi, beyaz zeminde net okunacak koyu tonlara çekildi (görme kolaylığı/erişilebilirlik standardı). Telefonda ile tıklayınca panel otomatik görüş alanına kayıyor. (2) Sitede kalan bütün "fiyat listesi (ratecard) indir" izleri temizlendi: indirilecek PDF dosyası kaldırıldı, hizmetler/ajanslar/markalar sayfalarındaki ve menüdeki "Ratecard'ı indir" butonları ile "indikatif fiyat bantları" ifadeleri söküldü — artık o dosyanın adresi açılmıyor (404). Yan düzeltmeler: birkaç sayfada başlık bölümü artık anında görünüyor (hafif gecikme kalktı), hizmetler başlığı "8 ana format" oldu, ana sayfadaki "35.919 ünite" yazısında sayı ile kelimenin yapışması giderildi.
**Neden:** Harita tıklanabiliyordu ama hangi ili seçtiğin yeterince belli olmuyordu ve yalnızca fareyle kullanılabiliyordu; klavye + belirgin vurgu + okunur renkler hem kullanım kolaylığı hem erişilebilirlik için gerekliydi. Fiyat tarafında ise Hakan'ın kararıyla siteden tüm fiyatlar zaten kaldırılmıştı; geriye kalan "ratecard indir" butonları artık var olmayan bir dosyayı gösterdiği için hem tutarsızdı hem de tıklayanı boşa çıkarıyordu.
**Ne işe yaradı:** Envanter haritası artık hem daha anlaşılır (seçili il net) hem herkesçe kullanılabilir (klavye + kontrastlı renkler); ziyaretçi hiçbir yerde çalışmayan bir fiyat-indirme butonuyla karşılaşmıyor, fiyat beklentisi tümüyle teklif görüşmesine taşınmış oluyor. Tüm kontroller geçti (envanter doğrulaması 8/8, üretim derlemesi hatasız, fiyat/ratecard izi taraması sıfır, /ratecard.pdf 404). Repoya işlendi ve canlıya alındı.
**Sırada:** Kalan görsel/kimlik yayma işleri (varsa G7b) → sonra teklif formunun uçtan uca e-posta testi (Resend anahtarı Hakan'da).

### 2026-07-06 — G4b: 20 mecranın tamamı görünür oldu + fiyatlar sit'ten kaldırıldı
**Ne yapıldı:** Ana sayfada, öne çıkan 8 reklam formatının altına "12 mecrayı daha gör" diye açılan bir bölüm eklendi; tıklayınca 12 ek mecra kartı çıkıyor (Alınlık, Luna, Megaboard, Tramvay Kaplama, Otobüs Kaplama vb.). Her karttaki ünite adedi elle yazılmıyor, tek envanter dosyasından otomatik hesaplanıyor (örn. Luna 140, Megaboard 97, Tramvay 40) — envanter değişirse sayılar kendiliğinden güncelleniyor. Böylece "20 mecra türü" iddiası artık sayfada görünür karşılığını buldu. Ayrıca daha önce eklenip hiçbir yere bağlanmamış tramvay görseli bu bölümde kullanıldı. İki temizlik daha: (1) sitedeki bütün indikatif fiyat aralıkları koddan tamamen söküldü — fiyat artık yalnızca teklif/konuşma aşamasında veriliyor; (2) "Totem" formatının yanlış tarifi (dikey kule) düzeltilip doğru anlatımıyla (direk üstünde ışıklı kutu pano) değiştirildi.
**Neden:** Site "20 mecra" diyip yalnızca 8'ini gösteriyordu; kalanları da göstermek hem iddiayı doğruluyor hem de daha fazla satış fırsatı sunuyor. Sayıların envanterden gelmesi "yanlış rakam" riskini sıfırlıyor. Fiyatların kaldırılması Hakan'ın kararı: açıkhava fiyatı lokasyon/döneme göre çok değiştiği için sabit aralık yanıltıcı olur.
**Ne işe yaradı:** Ziyaretçi artık tek bakışta tüm mecra yelpazesini ve gerçek envanter büyüklüklerini görüyor; fiyat beklentisi teklif görüşmesine taşınıyor; hatalı bir format tarifi düzeldi. Hepsi canlı ortamda ölçülerek doğrulandı (12 kart, doğru adetler).
**Sırada:** Cowork denetimi + Hakan onayı → repoya işlenmesi → kalan görsel/kimlik işleri (G5/G7).

### 2026-07-06 — G3.1: Marka logoları artık akıyor (iki zıt satır) + hafif cyan ışıma
**Ne yapıldı:** Ana sayfadaki "Güçlü İş Birlikleri" bölümünde logolar artık sabit bir ızgara yerine yavaşça yatay akıyor: iki satır ters yönlerde kayıyor (biri sola, biri sağa), fareyle üzerine gelince duruyor, arka planda hafif cyan ışıklar dolaşarak canlılık katıyor. Hareketi rahatsız edici bulan/azaltılmış hareket tercihi açık kullanıcılarda animasyon kapanıp sade ızgaraya dönüyor. Bu paket dışarıdan hazır bir yama olarak geldi; test ederken "fareyle üzerine gelince durma" özelliğinin çalışmadığı fark edildi ve tek satırlık bir düzeltmeyle giderildi.
**Neden:** Akan logolar hem daha fazla markayı kaydırma gerektirmeden gösterir hem de bölüme hareket/canlılık katar; "hover'da durma" ise okumak isteyen ziyaretçiye kontrol verir. Gelen yamada bu durma özelliği teknik bir nedenle devre dışıydı — istenen davranışın gerçekten çalışması için düzeltildi.
**Ne işe yaradı:** Bölüm artık istenen üç davranışın hepsini yapıyor (akış · hover'da durma · arka plan ışıması) ve bunlar canlı ortamda ölçülerek doğrulandı. Erişilebilirlik korundu (hareket azaltma tercihinde sade görünüm). Ek olarak, akışın döngü başa dönerken oluşabilecek ~8 piksellik hafif zıplama giderildi: satır içeriği iki özdeş yarım hâline getirildi, böylece kayma tam oturuyor (canlı ölçümle 0 piksel sapma). Sonuçta repoya işlendi ve canlıya alındı.
**Sırada:** Kalan görsel/kimlik yayma işleri (G4b-G7).

### 2026-07-06 — Düzeltme: Hukuki metinler artık gerçek durumu anlatıyor
**Ne yapıldı:** KVKK Aydınlatma Metni ve Gizlilik Politikası'nda, artık kullanmadığımız iki servisin (Supabase adlı veri tabanı ve Mapbox adlı harita) verilerinizin gittiği yerler arasında hâlâ yazdığı görüldü — bunlar temizlendi. Üç hukuki sayfa (KVKK, gizlilik, çerez) artık aynı doğruyu söylüyor: veriniz yalnızca siteyi barındıran Vercel ve teklif formunu e-postayla ileten Resend üzerinden geçer, hiçbir veri tabanında saklanmaz. KVKK metninin sürüm tarihi de güncellendi (Temmuz 2026). Ayrıca "Hakkımızda sayfasında rakamlar yanlış" şüphesi araştırıldı: rakamlar aslında doğru ve tek envanter dosyasına bağlı — ekran görüntüsünde görünen düşük değerler, sayının animasyonla yukarı sayarken yakalanmış ara kareleriymiş; düzeltilecek bir hata yoktu.
**Neden:** Bir gizlilik/KVKK metni, kişisel verinin gerçekte gittiği yerleri doğru listelemek zorundadır; kaldırılmış servisleri "veriniz buraya aktarılıyor" diye yazmak hem yanlış hem de hukuki risk. Doğru olmayan bir "düzeltmeyi" de yapmamak (uydurma değişiklik) aynı derecede önemli.
**Ne işe yaradı:** Site ziyaretçisine ve olası bir denetime karşı hukuki metinler artık gerçeğe birebir uyuyor ve kendi aralarında çelişmiyor. Gereksiz/yanlış bir kod değişikliğinden de kaçınıldı.
**Sırada:** Cowork denetimi + Hakan onayı → repoya işlenmesi → kalan görsel/kimlik yayma işleri (G4b-G7).

### 2026-07-06 — G6: Sıkça Sorulan Sorular + eksiksiz iletişim bilgileri
**Ne yapıldı:** Ana sayfaya, ziyaretçinin en çok merak ettiği 9 sorunun cevabını içeren bir "Sıkça Sorulan Sorular" bölümü eklendi (tıkla-aç akordeon). Alt bilgideki (footer) iletişim kutusu tamamlandı: artık telefon numarası ve açık adres de var. Ayrıca sitenin her sayfasında sağ altta, açılır pencere çıkarmadan doğrudan WhatsApp'a götüren sabit bir düğme var. Google'ın bu soruları arama sonuçlarında zengin biçimde gösterebilmesi için görünmez bir teknik etiket (FAQPage) de eklendi.
**Neden:** Sık gelen sorulara sayfada cevap vermek hem ziyaretçinin işini kolaylaştırır hem de "önce sorayım" adımını atlayıp doğrudan teklife yönlendirir; eksik iletişim bilgisi ise güveni düşürür. Sabit WhatsApp düğmesi, karar anında en hızlı iletişim kanalını hep elde tutar.
**Ne işe yaradı:** Site artık kendi kendine cevap veren, iletişim bilgisi tam ve her an bir tık uzağında olan bir yapıya kavuştu; SSS'ler arama motorunda da avantaj sağlayacak. Sorular ayrı bir içerik dosyasında (sss.ts) — ileride gerçek müşteri sorularıyla güncellemek tek dosya işi.
**Sırada:** Cowork denetimi + Hakan onayı → repoya işlenmesi → kalan görsel/kimlik yayma işleri (G4b-G7); SSS'lerin gerçek müşteri sorularıyla güncellenmesi (angarya A2).

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
