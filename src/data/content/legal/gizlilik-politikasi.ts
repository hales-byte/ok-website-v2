import type { LegalDoc } from "./types";
import { d, b, a } from "./types";

/**
 * Kaynak: OK_KVKK_Teslim/02-gizlilik-politikasi.md (avukat teslimi, birebir).
 */
export const GIZLILIK_POLITIKASI: LegalDoc = {
  baslik: "Gizlilik Politikası",
  versiyon: "2026.07.07",
  guncelleme: "Temmuz 2026",
  bloklar: [
    { tip: "h2", metin: "1. Giriş" },
    {
      tip: "p",
      icerik: [
        d(
          'Objektif Kriter Reklam Pazarlama Ticaret Limited Şirketi ("Şirket") olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine büyük önem veriyoruz. İşbu Gizlilik Politikası; web sitemizi ziyaret ettiğinizde veya hizmetlerimizden yararlandığınızda hangi bilgileri topladığımızı, bunları nasıl kullandığımızı ve haklarınızı açıklar. Ayrıntılı hukuki bilgilendirme için '
        ),
        a("KVKK Aydınlatma Metni", "/kvkk-aydinlatma"),
        d(
          "'ni inceleyebilirsiniz. Bu politika, 6698 sayılı KVKK ve AB GDPR ile uyumlu olacak şekilde hazırlanmıştır."
        ),
      ],
    },

    { tip: "h2", metin: "2. Topladığımız Bilgiler" },
    {
      tip: "ul",
      ogeler: [
        [b("Sizin paylaştığınız bilgiler: "), d("Teklif/iletişim formunda verdiğiniz ad, e-posta, telefon, şirket, sektör, kampanya tercihleri ve mesaj.")],
        [b("Otomatik toplanan bilgiler: "), d("IP adresi, tarayıcı türü ve sürümü, işletim sistemi, ziyaret edilen sayfalar, ziyaret zamanı, yönlendiren URL.")],
        [b("Çerezler ve benzer teknolojiler: "), d("Ayrıntılar için "), a("Çerez Politikası", "/cerez-politikasi"), d("'na bakınız.")],
      ],
    },

    { tip: "h2", metin: "3. Bilgilerin Kullanımı" },
    {
      tip: "ul",
      ogeler: [
        [d("Teklif taleplerine yanıt vermek ve hizmet sunmak")],
        [d("Kampanya planlama ve operasyon süreçlerini yürütmek")],
        [d("Müşteri ilişkilerini sürdürmek")],
        [d("Sitenin güvenliğini sağlamak ve kötüye kullanımı önlemek")],
        [d("Yasal yükümlülükleri yerine getirmek")],
        [d("Açık rızanız olması halinde — sektörel bilgilendirme ve kampanya duyuruları paylaşmak")],
      ],
    },

    { tip: "h2", metin: "4. Bilgilerin Paylaşımı" },
    {
      tip: "p",
      icerik: [
        d(
          "Bilgileriniz üçüncü taraflara satılmaz, kiralanmaz veya pazarlama amacıyla paylaşılmaz. Paylaşım yalnızca şu hallerde yapılır:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [b("İş ortakları: "), d("Kampanyanın yürütülmesi için mecra sahipleri, baskı/montaj firmaları.")],
        [b("Hizmet sağlayıcılar: "), d("Site barındırma (Vercel) ve e-posta iletimi (Resend). Site statik veriyle çalışır; form bilgileriniz bir veritabanında saklanmaz, e-posta ile satış ekibimize iletilir.")],
        [b("Yasal zorunluluk: "), d("Yetkili kamu kurumları, mahkemeler ve emniyet birimlerinin usulüne uygun talepleri üzerine.")],
      ],
    },

    { tip: "h2", metin: "5. Veri Güvenliği" },
    {
      tip: "ul",
      ogeler: [
        [d("Aktarımda SSL/TLS şifreleme")],
        [d("Veritabanı yok — form bilgileri sunucuda saklanmaz, yalnızca e-posta ile iletilir (asgari veri ayak izi)")],
        [d("Form verilerine yalnızca yetkili satış personeli erişir")],
        [d("Düzenli güvenlik gözden geçirmeleri")],
        [d("Veri ihlali halinde Kanun ve Kurul kararları uyarınca en kısa sürede (72 saat içinde) Kurul'a ve gerektiğinde ilgili kişilere bildirim")],
      ],
    },

    { tip: "h2", metin: "6. Veri Saklama Süresi" },
    {
      tip: "p",
      icerik: [
        d(
          "Verileriniz, toplanma amacının gerektirdiği süre ve yasal yükümlülüklerimiz çerçevesinde saklanır. Ayrıntılı süreler için "
        ),
        a("KVKK Aydınlatma Metni", "/kvkk-aydinlatma"),
        d("'ne bakınız."),
      ],
    },

    { tip: "h2", metin: "7. Haklarınız" },
    {
      tip: "p",
      icerik: [
        d(
          "KVKK m.11 ve GDPR kapsamında; verilerinize erişme, düzeltme, silme, işlenmeye itiraz, taşınabilirlik (GDPR) ve açık rızayı geri çekme haklarına sahipsiniz. Haklarınızı kullanmak için "
        ),
        a("iletisim@objektifkriter.com.tr", "mailto:iletisim@objektifkriter.com.tr", true),
        d(" adresine başvurabilirsiniz."),
      ],
    },

    { tip: "h2", metin: "8. Çocukların Gizliliği" },
    {
      tip: "p",
      icerik: [
        d(
          "Hizmetlerimiz kurumsal (B2B) müşterilere yöneliktir. 18 yaş altındaki kişilerden bilerek veri toplamayız; tespit edilmesi halinde ilgili veri derhal silinir."
        ),
      ],
    },

    { tip: "h2", metin: "9. Üçüncü Taraf Bağlantılar" },
    {
      tip: "p",
      icerik: [
        d(
          "Sitemizde üçüncü taraf web sitelerine (LinkedIn, Instagram vb.) bağlantılar bulunabilir. Bu sitelerin gizlilik uygulamalarından Şirket sorumlu değildir; ilgili sitelerin politikalarını incelemenizi öneririz."
        ),
      ],
    },

    { tip: "h2", metin: "10. Değişiklikler ve İletişim" },
    {
      tip: "p",
      icerik: [
        d(
          "Bu politika gerektiğinde güncellenebilir; önemli değişikliklerde sitede duyuru yapılır. Sorularınız için: Veri Sorumlusu — Objektif Kriter Reklam Pazarlama Ticaret Limited Şirketi, "
        ),
        a("iletisim@objektifkriter.com.tr", "mailto:iletisim@objektifkriter.com.tr", true),
      ],
    },
  ],
};
