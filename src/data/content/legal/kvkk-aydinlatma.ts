import type { LegalDoc } from "./types";
import { d, b, a } from "./types";

/**
 * Kaynak: OK_KVKK_Teslim/01-kvkk-aydinlatma.md (avukat teslimi, birebir).
 * Metni değiştirme — yalnızca kaynak .md güncellenince buraya taşınır.
 */
export const KVKK_AYDINLATMA: LegalDoc = {
  baslik: "Kişisel Verilerin Korunması Aydınlatma Metni",
  versiyon: "2026.07.07",
  guncelleme: "Temmuz 2026",
  bloklar: [
    { tip: "h2", metin: "1. Veri Sorumlusunun Kimliği" },
    {
      tip: "p",
      icerik: [
        d(
          'İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") m.10 ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri sorumlusu sıfatıyla aşağıdaki şirket tarafından hazırlanmıştır:'
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [b("Ticaret Unvanı: "), d("Objektif Kriter Reklam Pazarlama Ticaret Limited Şirketi")],
        [b("MERSİS No: "), d("0632032606500014")],
        [b("Vergi Dairesi / VKN: "), d("Beyoğlu Vergi Dairesi — 6320326065")],
        [b("Merkez Adresi: "), d("Gümüşsuyu Mah. İnönü Cad. Zampak Apt. No: 7/5, Beyoğlu / İstanbul")],
        [b("Telefon: "), d("+90 552 918 58 64")],
        [b("E-posta (Başvuru): "), a("iletisim@objektifkriter.com.tr", "mailto:iletisim@objektifkriter.com.tr", true)],
        [b("KEP: "), d("objektifreklam@hs01.kep.tr")],
        [b("Web: "), d("https://objektifkriter.com.tr")],
      ],
    },
    {
      tip: "p",
      icerik: [
        b("Kapsam: "),
        d(
          "İşbu Aydınlatma Metni, Şirket'in web sitesi üzerinden yürüttüğü veri işleme faaliyetlerini kapsar. Şirket'in dijital açıkhava (LED/ekran) mecraları yalnızca içerik gösterimi amaçlı olup izleyiciye ait kişisel veri toplamaz; ileride izleyici ölçümü yapılması halinde ilgili faaliyet için ayrıca ve mecra/lokasyon özelinde aydınlatma yapılır."
        ),
      ],
    },

    { tip: "h2", metin: "2. İşlenen Kişisel Veriler ve Kategorileri" },
    {
      tip: "p",
      icerik: [
        d(
          "Web sitemiz üzerinden teklif talebinde bulunmanız, iletişim kurmanız veya siteyi ziyaret etmeniz halinde aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [b("Kimlik Bilgileri: "), d("Ad, soyad.")],
        [b("İletişim Bilgileri: "), d("E-posta adresi, telefon numarası.")],
        [b("Mesleki / Şirket Bilgileri: "), d("Şirket/marka adı, sektör, pozisyon.")],
        [b("Talep ve İşlem Bilgileri: "), d("Reklam tercihleri (şehir, mecra/format, bütçe aralığı, kampanya zamanı), mesaj içeriği.")],
        [b("İşlem Güvenliği Bilgileri: "), d("IP adresi, tarayıcı ve cihaz bilgileri (user-agent), yönlendiren (referans) URL, ziyaret/işlem zamanı, sunucu kayıtları (log).")],
      ],
    },
    {
      tip: "p",
      icerik: [
        d(
          "Şirket, özel nitelikli kişisel veri (sağlık, din, biyometri vb.) talep etmez ve işlemez. Hizmetlerimiz kurumsal (B2B) niteliktedir; 18 yaşından küçüklerden bilerek veri toplanmaz."
        ),
      ],
    },

    { tip: "h2", metin: "3. Kişisel Verilerin İşlenme Amaçları" },
    {
      tip: "ul",
      ogeler: [
        [d("Teklif ve iletişim taleplerinin alınması, değerlendirilmesi ve yanıtlanması")],
        [d("Reklam/mecra kampanyalarının planlanması, yürütülmesi ve takibi")],
        [d("Müşteri ilişkilerinin yönetimi ve sürdürülmesi")],
        [d("Sözleşme öncesi görüşmelerin ve sözleşmesel süreçlerin yürütülmesi")],
        [d("Hukuki yükümlülüklerin yerine getirilmesi (ticari, vergisel ve sair mevzuat)")],
        [d("Web sitesi ve hizmetlerin güvenliğinin sağlanması, kötüye kullanımın önlenmesi")],
        [d("Yetkili kamu kurum ve kuruluşlarına bilgi verilmesi")],
      ],
    },
    {
      tip: "p",
      icerik: [
        d(
          "Pazarlama ve kampanya duyurularının gönderilmesi ancak ayrıca ve açıkça vereceğiniz açık rıza ile ve ilgili mevzuata (6563 sayılı Kanun / İYS) uygun olarak yapılır. Teklif ve iletişim talebinizin karşılanması için açık rıza gerekmez."
        ),
      ],
    },

    { tip: "h2", metin: "4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri" },
    {
      tip: "p",
      icerik: [
        d(
          "Kişisel verileriniz, Kanun'un 5. maddesinde yer alan aşağıdaki hukuki sebeplere dayalı olarak işlenir:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [b("Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (m.5/2-c)"), d(" — teklif/iletişim talebinizin karşılanması ve sözleşme öncesi süreçler.")],
        [b("Hukuki yükümlülüğün yerine getirilmesi (m.5/2-ç)"), d(" — vergi, ticaret ve 5651 sayılı Kanun kapsamındaki saklama yükümlülükleri.")],
        [b("Veri sorumlusunun meşru menfaati (m.5/2-f)"), d(" — hizmet kalitesi, müşteri ilişkisi yönetimi ve site güvenliği.")],
        [b("Açık rızanın bulunması (m.5/1)"), d(" — yalnızca pazarlama/ticari elektronik ileti gönderimi için ve varsa açık rızanız kapsamında.")],
      ],
    },

    { tip: "h2", metin: "5. Kişisel Verilerin Aktarılması" },
    { tip: "h3", metin: "Yurt içi aktarım" },
    {
      tip: "ul",
      ogeler: [
        [b("İş ortakları: "), d("Kampanyanın ifası için mecra sahipleri, baskı/üretim ve montaj firmaları.")],
        [b("Yetkili kamu kurum ve kuruluşları ile adli/idari merciler: "), d("Yasal talep ve yükümlülük halinde.")],
        [b("Hizmet sağlayıcılar: "), d("Yalnızca ilgili hizmetin gerektirdiği ölçüde (ör. hukuk/mali müşavirlik).")],
      ],
    },
    { tip: "h3", metin: "Yurt dışı aktarım (Kanun m.9)" },
    {
      tip: "p",
      icerik: [
        d(
          "Web sitemizin teknik altyapısı aşağıdaki sağlayıcılar üzerinden çalıştığından, sınırlı veri yurt dışına aktarılmaktadır:"
        ),
      ],
    },
    {
      tip: "tablo",
      basliklar: ["Hizmet", "Sağlayıcı", "Konum", "Aktarılan veri"],
      satirlar: [
        ["Site barındırma + CDN", "Vercel Inc.", "ABD / küresel CDN", "Site erişim logları, IP, user-agent"],
        ["E-posta iletimi", "Resend", "ABD / AB (eu-west-1)", "Ad, e-posta, telefon, talep özeti"],
      ],
    },
    {
      tip: "p",
      icerik: [
        d(
          "Bu aktarımlar; Kanun'un 9. maddesi ve Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelik (10.07.2024) kapsamında; bir yeterlilik kararı bulunmadığından, uygun güvencelerin sağlanması (standart sözleşme ya da veri işleme sözleşmesi/DPA) veya mevzuatta öngörülen istisnaların (ör. talebinizin ifası için gerekli olması, açık rıza) varlığı halinde gerçekleştirilir."
        ),
      ],
    },

    { tip: "h2", metin: "6. Kişisel Veri Toplama Yöntemi" },
    {
      tip: "p",
      icerik: [
        d(
          "Kişisel verileriniz; web sitesi üzerindeki formlar, e-posta ve telefon görüşmeleri ile tamamen veya kısmen otomatik yöntemlerle elektronik ortamda toplanır. Teklif formunu yarım bırakmanız halinde, formda doldurduğunuz veriler yalnızca kendi cihazınızın tarayıcı belleğinde (localStorage) geçici olarak saklanabilir; bu veri sunucularımıza gönderilmez. IP ve sunucu kayıtları site güvenliği amacıyla tutulur."
        ),
      ],
    },

    { tip: "h2", metin: "7. Kişisel Verilerin Saklanma Süreleri" },
    {
      tip: "tablo",
      basliklar: ["Veri / süreç", "Saklama süresi", "Dayanak"],
      satirlar: [
        ["Teklif ve müşteri iletişim kayıtları", "3 yıl", "Meşru menfaat / zamanaşımı"],
        ["Sözleşmesel ilişkiye dair kayıtlar", "İlişkinin sona ermesinden itibaren 10 yıl", "TBK / TTK"],
        ["Vergisel/mali belgeler", "5 yıl", "Vergi Usul Kanunu"],
        ["IP ve trafik/log kayıtları", "2 yıl", "5651 sayılı Kanun"],
      ],
    },
    {
      tip: "p",
      icerik: [d("Saklama süresi dolan veriler silinir, yok edilir veya anonim hale getirilir.")],
    },

    { tip: "h2", metin: "8. İlgili Kişi Olarak Haklarınız (Kanun m.11)" },
    {
      tip: "p",
      icerik: [
        d(
          "Kanun'un 11. maddesi uyarınca, veri sorumlusuna başvurarak aşağıdaki haklara sahipsiniz:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [d("Kişisel verinizin işlenip işlenmediğini öğrenme")],
        [d("İşlenmişse buna ilişkin bilgi talep etme")],
        [d("İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme")],
        [d("Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme")],
        [d("Eksik veya yanlış işlenmişse düzeltilmesini isteme")],
        [d("Kanun'un 7. maddesindeki şartlar çerçevesinde silinmesini/yok edilmesini isteme")],
        [d("Düzeltme/silme/yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme")],
        [d("Münhasıran otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme")],
        [d("Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme")],
      ],
    },

    { tip: "h2", metin: "9. Başvuru Yöntemi (Kanun m.13)" },
    {
      tip: "p",
      icerik: [
        d(
          "Yukarıdaki haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak; "
        ),
        a("İlgili Kişi Başvuru Formu", "/kvkk-basvuru-formu"),
        d("'nu doldurarak "),
        b("iletisim@objektifkriter.com.tr"),
        d(
          " adresine, KEP adresimize (objektifreklam@hs01.kep.tr) ya da ıslak imzalı olarak şirket merkezimize iletebilirsiniz. Başvurularınız en geç "
        ),
        b("30 gün"),
        d(
          " içinde sonuçlandırılır. İşlem ayrıca bir maliyet gerektirmesi halinde Kurul'ca belirlenen tarifedeki ücret alınabilir."
        ),
      ],
    },

    { tip: "h2", metin: "10. AB Genel Veri Koruma Tüzüğü (GDPR)" },
    {
      tip: "p",
      icerik: [
        d(
          "Avrupa Birliği'nde ikamet eden ilgili kişiler bakımından, GDPR kapsamındaki yukarıdaki haklara ek olarak "
        ),
        b("veri taşınabilirliği hakkı (GDPR m.20)"),
        d(" ve "),
        b("denetim makamına şikâyet hakkı (GDPR m.77)"),
        d(
          " bulunmaktadır. Şirket, ziyaretçileri üzerinde otomatik karar verme veya profil çıkarma faaliyeti yürütmez."
        ),
      ],
    },

    { tip: "h2", metin: "11. Değişiklikler" },
    {
      tip: "p",
      icerik: [
        d(
          "İşbu Aydınlatma Metni gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfadan erişilebilir olup, önemli değişikliklerde versiyon numarası ve tarih güncellenir."
        ),
      ],
    },
  ],
};
