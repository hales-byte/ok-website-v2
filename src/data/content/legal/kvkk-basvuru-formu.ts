import type { LegalDoc } from "./types";
import { d, b } from "./types";

/**
 * Kaynak: OK_KVKK_Teslim/04-basvuru-formu.md (avukat teslimi, birebir).
 * Yazdırılıp doldurulmak üzere tasarlanmıştır (boş hücreler / ☐ kutular).
 */
export const KVKK_BASVURU_FORMU: LegalDoc = {
  baslik: "İlgili Kişi (Veri Sahibi) Başvuru Formu",
  versiyon: "2026.07.07",
  guncelleme: "Temmuz 2026",
  bloklar: [
    {
      tip: "p",
      icerik: [
        d(
          "Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca. Bu form doldurularak "
        ),
        b("iletisim@objektifkriter.com.tr"),
        d(
          " adresine, KEP adresine (objektifreklam@hs01.kep.tr) veya ıslak imzalı olarak şirket merkezine iletilebilir."
        ),
      ],
    },

    { tip: "h2", metin: "1. Başvuru Sahibinin Kimlik ve İletişim Bilgileri" },
    {
      tip: "tablo",
      basliklar: ["Alan", "Bilgi"],
      satirlar: [
        ["Ad – Soyad", ""],
        ["T.C. Kimlik / Pasaport No", ""],
        ["Tebligata esas adres", ""],
        ["Telefon", ""],
        ["E-posta", ""],
        ["Şirket ile ilişkiniz", "☐ Müşteri  ☐ Ziyaretçi  ☐ Eski müşteri  ☐ Diğer: ........."],
      ],
    },

    { tip: "h2", metin: "2. Talep Konusu" },
    {
      tip: "p",
      icerik: [
        d(
          "Kanun'un 11. maddesindeki haklardan talep ettiklerinizi işaretleyiniz:"
        ),
      ],
    },
    {
      tip: "ul",
      ogeler: [
        [d("☐ Kişisel verimin işlenip işlenmediğini öğrenmek istiyorum")],
        [d("☐ İşlenmişse buna ilişkin bilgi talep ediyorum")],
        [d("☐ İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenmek istiyorum")],
        [d("☐ Yurt içinde/dışında aktarıldığı üçüncü kişileri öğrenmek istiyorum")],
        [d("☐ Eksik/yanlış işlenmişse düzeltilmesini talep ediyorum")],
        [d("☐ Silinmesini / yok edilmesini talep ediyorum")],
        [d("☐ Düzeltme/silme işlemlerinin üçüncü kişilere bildirilmesini talep ediyorum")],
        [d("☐ Otomatik analiz sonucu aleyhime çıkan sonuca itiraz ediyorum")],
        [d("☐ Kanuna aykırı işleme nedeniyle zararımın giderilmesini talep ediyorum")],
      ],
    },

    { tip: "h2", metin: "3. Talebin Açıklaması ve Yanıt Yöntemi" },
    { tip: "p", icerik: [d("Talebinize ilişkin açıklama:")] },
    {
      tip: "p",
      icerik: [d("_______________________________________________________________")],
    },
    {
      tip: "p",
      icerik: [
        d(
          "Yanıtın tarafıma ulaştırılmasını istediğim yöntem: ☐ E-posta  ☐ Posta (adresime)  ☐ Elden teslim"
        ),
      ],
    },
    {
      tip: "p",
      icerik: [d("Başvuru Tarihi: ....................    İmza: ....................")],
    },
    {
      tip: "not",
      icerik: [
        d(
          "Başvurular en geç 30 gün içinde sonuçlandırılır. Şirket, başvuru sahibinin kimliğini doğrulamak için ek bilgi/belge talep edebilir. Talebin niteliğine göre Kurul'un belirlediği tarifedeki ücret alınabilir."
        ),
      ],
    },
  ],
};
