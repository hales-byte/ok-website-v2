/**
 * envanter.json veri tipleri — TEK DOĞRULUK KAYNAĞI şeması.
 * JSON yapısına birebir uyar; alan eklenirse önce JSON, sonra burası güncellenir.
 */

/** Bir ilin envanter kaydı */
export interface IlKaydi {
  /** İl adı — görünen yazımla ("Gaziantep", "İzmir") */
  il: string;
  /** İldeki toplam ünite (reklam yüzü) sayısı */
  toplam: number;
  /** Envanterin bulunduğu ilçe / alt lokasyonlar */
  ilceler: string[];
  /** Mecra türü → ünite adedi (adlar envanterdeki UPPERCASE yazımla) */
  formatlar: Record<string, number>;
}

/** envanter.json kök yapısı */
export interface EnvanterData {
  /** Son envanter revizyon tarihi (YYYY-MM-DD) */
  guncelleme: string;
  /** Kaynak dosya notu */
  kaynak: string;
  /** Özet sayılar — doğrulama scripti bunların türetilmiş değerlerle eşleştiğini test eder */
  toplam: { il: number; unite: number };
  iller: IlKaydi[];
}
