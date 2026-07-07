import type { LegalDoc } from "./types";
import { d, b, a } from "./types";

/**
 * Kaynak: OK_KVKK_Teslim/03-cerez-politikasi.md (avukat teslimi, birebir).
 * NOT: Site yalnız zorunlu çerez kullanır; onay bandı YAYINLANMAZ (metin madde 2).
 */
export const CEREZ_POLITIKASI: LegalDoc = {
  baslik: "Çerez Politikası",
  versiyon: "2026.07.07",
  guncelleme: "Temmuz 2026",
  bloklar: [
    { tip: "h2", metin: "1. Çerez Nedir?" },
    {
      tip: "p",
      icerik: [
        d(
          "Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerez kullanımı 6698 sayılı KVKK ve AB GDPR/ePrivacy mevzuatı kapsamında düzenlenir."
        ),
      ],
    },

    { tip: "h2", metin: "2. Sitemizin Mevcut Çerez Durumu" },
    {
      tip: "p",
      icerik: [
        b(
          "Şu an sitemizde reklam/pazarlama veya üçüncü taraf analitik çerezi kullanılmamaktadır."
        ),
      ],
    },
    {
      tip: "p",
      icerik: [
        d(
          "Sitemiz yalnızca, hizmetin sunulması için kesinlikle gerekli (zorunlu) teknik unsurları kullanır. Teklif formunu yarım bırakmanız halinde girdiğiniz bilgiler, yalnızca sizin cihazınızda (tarayıcı belleği / localStorage) geçici olarak tutulur; bu bir takip çerezi değildir ve sunucularımıza gönderilmez. Bu nedenle, KVKK Çerez Rehberi uyarınca çerez onayı (rıza) gerektirmez ve sitede bir çerez onay bandı zorunlu değildir."
        ),
      ],
    },

    { tip: "h2", metin: "3. Çerez Kategorileri" },
    {
      tip: "tablo",
      basliklar: ["Kategori", "Açıklama", "Durum"],
      satirlar: [
        ["Zorunlu", "Sitenin temel işlevleri, güvenlik ve form işleme için gereklidir. Rıza gerektirmez.", "Kullanılıyor"],
        ["İşlevsel", "Dil/görüntüleme gibi tercihlerin hatırlanması.", "Kullanılmıyor"],
        ["Analitik", "Ziyaretçi etkileşiminin ölçülmesi.", "Kullanılmıyor"],
        ["Pazarlama", "Reklam ve yeniden hedefleme.", "Kullanılmıyor"],
      ],
    },

    { tip: "h2", metin: "4. Çerezleri Yönetme" },
    {
      tip: "p",
      icerik: [
        d(
          "Tarayıcı ayarlarınızdan çerezleri her zaman yönetebilir veya silebilirsiniz:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [b("Chrome: "), d("Ayarlar > Gizlilik ve Güvenlik > Çerezler")],
        [b("Safari: "), d("Tercihler > Gizlilik > Çerezler")],
        [b("Firefox: "), d("Seçenekler > Gizlilik ve Güvenlik > Çerezler")],
        [b("Edge: "), d("Ayarlar > Çerezler ve Site İzinleri")],
      ],
    },
    {
      tip: "p",
      icerik: [
        b("Not: "),
        d(
          "Zorunlu unsurları devre dışı bırakırsanız sitenin bazı bölümleri düzgün çalışmayabilir."
        ),
      ],
    },

    { tip: "h2", metin: "5. Üçüncü Taraf Altyapı" },
    {
      tip: "p",
      icerik: [
        d(
          "Sitemizin altyapı sağlayıcıları (Vercel barındırma, Resend e-posta iletimi) sınırlı teknik kayıtlar tutabilir ve kendi gizlilik politikalarına tabidir: "
        ),
        a("vercel.com/legal/privacy-policy", "https://vercel.com/legal/privacy-policy", true),
        d(" · "),
        a("resend.com/legal/privacy-policy", "https://resend.com/legal/privacy-policy", true),
        d(". Resend, teklif formu e-posta iletimi içindir ve tarayıcınıza çerez bırakmaz."),
      ],
    },

    { tip: "h2", metin: "6. Değişiklikler" },
    {
      tip: "p",
      icerik: [
        d(
          'İleride analitik veya pazarlama çerezleri eklenirse, bu politika güncellenecek ve devreye önceden açık rıza alan bir çerez onay bandı (varsayılan kapalı; eşit "Kabul / Reddet / Tercihleri Yönet" seçenekleri) konulacaktır.'
        ),
      ],
    },
  ],
};
