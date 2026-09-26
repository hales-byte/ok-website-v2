/**
 * Adım başlığı + açıklaması. Hem form (TeklifWizard) hem sunucuda çizilen
 * iskelet (WizardIskelet) buradan okur — metin tek yerde.
 */
export function getStepInfo(step: number): { title: string; subtitle: string } {
  switch (step) {
    case 1:
      return {
        title: "Kim için kampanya?",
        subtitle:
          "Size en doğru deneyimi sunabilmemiz için kendinizi tanıtmanızı istiyoruz. Tek tıklama yeter.",
      };
    case 2:
      return {
        title: "Hangi şehirler?",
        subtitle:
          "Kampanyanızın görünürlük yapacağı şehirleri seçin. Birden fazla seçebilirsiniz.",
      };
    case 3:
      return {
        title: "Hangi üniteler?",
        subtitle:
          "İlgilendiğiniz reklam ünitelerini seçin. Henüz emin değilseniz \"Bana öner\" seçebilirsiniz.",
      };
    case 4:
      return {
        title: "Bütçe ve zaman?",
        subtitle:
          "Planlama için yaklaşık bir bütçe ve zaman aralığı. Her ikisinde de \"henüz net değil\" seçeneği var.",
      };
    case 5:
      return {
        title: "Sizinle nasıl iletişime geçelim?",
        subtitle:
          "15 dakika içinde geri dönüş yapacağız. Sadece zorunlu alanları doldurmanız yeterli.",
      };
    case 6:
      return {
        title: "Son adım",
        subtitle: "Talebinizi gözden geçirin, KVKK onayını verip gönderin.",
      };
    default:
      return { title: "", subtitle: "" };
  }
}
