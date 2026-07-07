/**
 * KVKK Aydınlatma Metni Versiyonu — TEK KAYNAK
 *
 * Bu sabit hem /kvkk-aydinlatma sayfasında gösterilir hem de
 * /teklif-al formu submit edildiğinde satış ekibine giden e-posta
 * içeriğine kullanıcının gördüğü versiyon olarak eklenir
 * (KVKK m.10 ispat yükü — veri tabanı yok, e-posta ile iletilir).
 *
 * Aydınlatma metni içeriğinde anlamlı bir değişiklik yapıldığında
 * bu versiyon ARTIRILIR — eski submission'ların hangi metni
 * gördüğü kaybolmaz.
 *
 * Versiyon formatı: "YYYY.MM.DD" (yayın tarihi).
 */
export const AYDINLATMA_VERSIYONU = "2026.07.07";
