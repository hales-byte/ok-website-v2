import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Objektif Kriter web sitesinin kullanıcı gizliliğini koruma yaklaşımı, veri toplama ve kullanma politikası.",
};

export default function GizlilikPage() {
  return (
    <>
      <section className="pt-24 pb-12 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <Lock size={16} />
              Gizlilik
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">Gizlilik</span> Politikası
            </h1>
            <p className="text-base text-[var(--color-text-muted)]">
              Son güncelleme: Mayıs 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-narrow">
          <article className="max-w-3xl mx-auto space-y-10 text-[var(--color-text-secondary)] leading-relaxed">

            <Bolum baslik="Giriş">
              <p>
                Objektif Kriter olarak ziyaretçilerimizin ve müşterilerimizin
                gizliliğine büyük önem veriyoruz. İşbu Gizlilik Politikası, web
                sitemizi ziyaret ettiğinizde veya hizmetlerimizden
                yararlandığınızda hangi bilgileri topladığımızı, bu bilgileri
                nasıl kullandığımızı ve haklarınızı açıklamaktadır.
              </p>
              <p className="mt-3">
                Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu
                (&quot;KVKK&quot;) ve AB Genel Veri Koruma Tüzüğü
                (&quot;GDPR&quot;) ile uyumlu olarak hazırlanmıştır. Detaylı
                aydınlatma metni için{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  KVKK Aydınlatma Metni
                </Link>{" "}
                sayfamızı inceleyebilirsiniz.
              </p>
            </Bolum>

            <Bolum baslik="Topladığımız Bilgiler">
              <p>
                Sitemizi ziyaret ettiğinizde veya bizimle iletişime
                geçtiğinizde aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Sizin paylaştığınız bilgiler:
                  </strong>{" "}
                  Teklif formunda verdiğiniz ad, e-posta, telefon, şirket,
                  sektör, kampanya tercihleri ve mesaj
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Otomatik toplanan bilgiler:
                  </strong>{" "}
                  IP adresi, tarayıcı türü ve sürümü, işletim sistemi, ziyaret
                  edilen sayfalar, ziyaret zamanı, referans URL
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Çerezler ve benzer teknolojiler:
                  </strong>{" "}
                  Detaylar için{" "}
                  <Link
                    href="/cerez-politikasi"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    Çerez Politikası
                  </Link>{" "}
                  sayfasına bakınız
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="Bilgilerin Kullanımı">
              <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Teklif taleplerinize yanıt vermek ve hizmet sunmak</li>
                <li>Kampanya planlama ve operasyon süreçlerini yürütmek</li>
                <li>Müşteri ilişkilerini sürdürmek</li>
                <li>
                  Sitenin güvenliğini sağlamak ve kötüye kullanımı önlemek
                </li>
                <li>
                  Site performansını analiz etmek ve hizmet kalitemizi
                  geliştirmek
                </li>
                <li>
                  Yasal yükümlülüklerimizi yerine getirmek (vergi mevzuatı,
                  ticari mevzuat)
                </li>
                <li>
                  Açık rızanızla — sektörel bilgilendirme ve kampanya
                  duyurularımızı paylaşmak
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="Bilgilerin Paylaşımı">
              <p>
                Kişisel bilgileriniz, açık rızanız olmaksızın üçüncü taraflara
                satılmaz, kiralanmaz veya pazarlama amacıyla paylaşılmaz.
                Yalnızca aşağıdaki durumlarda paylaşım yapılır:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    İş ortaklarımız:
                  </strong>{" "}
                  Reklam kampanyasının yürütülmesi için medya sahipleri,
                  baskı/montaj firmaları
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Hizmet sağlayıcılar:
                  </strong>{" "}
                  Web altyapısı (Vercel), veritabanı (Supabase), e-posta
                  iletişim sağlayıcıları
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Yasal zorunluluk:
                  </strong>{" "}
                  Yetkili kamu kurumları, mahkemeler ve emniyet birimleri
                  tarafından usulüne uygun talepler üzerine
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="Veri Güvenliği">
              <p>
                Kişisel verilerinizin güvenliği için endüstri standartlarına
                uygun teknik ve idari tedbirler alıyoruz:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>SSL/TLS şifreleme ile veri iletimi</li>
                <li>
                  Veritabanı seviyesinde Row Level Security (RLS) politikaları
                </li>
                <li>Sadece yetkili personel erişimi (rol tabanlı yetki)</li>
                <li>Düzenli güvenlik denetimleri ve güncellemeler</li>
                <li>Veri ihlali durumunda 72 saat içinde bildirim</li>
              </ul>
            </Bolum>

            <Bolum baslik="Veri Saklama Süresi">
              <p>
                Verileriniz, toplanma amacının gerektirdiği süre boyunca ve
                yasal yükümlülüklerimiz çerçevesinde saklanır. Detaylı saklama
                süreleri için{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  KVKK Aydınlatma Metni
                </Link>{" "}
                sayfasındaki ilgili bölüme bakabilirsiniz.
              </p>
            </Bolum>

            <Bolum baslik="Haklarınız">
              <p>
                Kişisel verileriniz üzerinde KVKK m. 11 ve GDPR kapsamında bir
                dizi hakkınız vardır:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Verilerinize erişim ve kopya talep etme</li>
                <li>Yanlış bilgilerin düzeltilmesini isteme</li>
                <li>Verilerin silinmesini isteme (&quot;unutulma hakkı&quot;)</li>
                <li>Veri işlenmesine itiraz etme</li>
                <li>Verilerinizi taşınabilir formatta talep etme (GDPR)</li>
                <li>Açık rızanızı her zaman geri çekme</li>
              </ul>
              <p className="mt-4">
                Haklarınızı kullanmak için{" "}
                <a
                  href="mailto:satis@objektifkriter.com.tr"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  satis@objektifkriter.com.tr
                </a>{" "}
                adresinden bize ulaşabilirsiniz.
              </p>
            </Bolum>

            <Bolum baslik="Çocukların Gizliliği">
              <p>
                Hizmetlerimiz B2B (kurumsal) müşterilere yöneliktir. Bilerek 18
                yaş altındaki kişilerden veri toplamayız. Eğer 18 yaş altı bir
                kişiden veri topladığımızı tespit edersek, ilgili veriyi derhal
                sileriz.
              </p>
            </Bolum>

            <Bolum baslik="Üçüncü Taraf Bağlantılar">
              <p>
                Sitemizde üçüncü taraf web sitelerine (LinkedIn, Instagram vb.)
                bağlantılar bulunabilir. Bu sitelerin gizlilik uygulamalarından
                sorumlu değiliz. İlgili sitelerin gizlilik politikalarını
                incelemenizi öneririz.
              </p>
            </Bolum>

            <Bolum baslik="Politikadaki Değişiklikler">
              <p>
                Bu Gizlilik Politikası, gerektiğinde güncellenebilir. Önemli
                değişikliklerde sitede duyuru yapılır ve son güncelleme tarihi
                bu sayfada belirtilir. Sitede dolaşmaya devam etmeniz, güncel
                politikayı kabul ettiğiniz anlamına gelir.
              </p>
            </Bolum>

            <Bolum baslik="İletişim">
              <p>
                Bu politika veya kişisel verileriniz hakkında sorularınız için:
              </p>
              <p className="mt-3">
                <strong className="text-[var(--color-text-primary)]">
                  Veri Sorumlusu:
                </strong>{" "}
                Objektif Kriter
                <br />
                <strong className="text-[var(--color-text-primary)]">
                  E-posta:
                </strong>{" "}
                <a
                  href="mailto:satis@objektifkriter.com.tr"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  satis@objektifkriter.com.tr
                </a>
              </p>
            </Bolum>

          </article>

          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-[var(--color-border-subtle)]">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <Link
                  href="/kvkk-aydinlatma"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  KVKK Aydınlatma Metni
                </Link>
                {" • "}
                <Link
                  href="/cerez-politikasi"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Çerez Politikası
                </Link>
              </div>
              <Link href="/iletisim" className="btn-primary">
                İletişime Geç
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Bolum({
  baslik,
  children,
}: {
  baslik: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] leading-tight">
        {baslik}
      </h2>
      <div className="text-base">{children}</div>
    </section>
  );
}
