import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

// Aydınlatma metni versiyonu — değişiklik yapılırsa güncellenmeli
// Form gönderimlerinde bu versiyon DB'ye kaydedilir
export const AYDINLATMA_VERSIYONU = "v1-2026-05";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Objektif Kriter olarak kişisel verilerinizin işlenmesine ilişkin 6698 sayılı KVKK kapsamında aydınlatma metnimiz.",
};

export default function KvkkPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-12 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <ShieldCheck size={16} />
              KVKK
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Kişisel Verilerin Korunması{" "}
              <span className="text-gradient">Aydınlatma Metni</span>
            </h1>
            <p className="text-base text-[var(--color-text-muted)]">
              Versiyon: {AYDINLATMA_VERSIYONU} • Son güncelleme: Mayıs 2026
            </p>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-16">
        <div className="container-narrow">
          <article className="max-w-3xl mx-auto space-y-10 text-[var(--color-text-secondary)] leading-relaxed">

            <Bolum baslik="1. Veri Sorumlusu">
              <p>
                İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
                Kanunu&apos;nun (&quot;KVKK&quot;) 10. maddesi ve Aydınlatma
                Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar
                Hakkında Tebliğ kapsamında, veri sorumlusu sıfatıyla{" "}
                <strong className="text-[var(--color-text-primary)]">
                  Objektif Kriter
                </strong>{" "}
                tarafından hazırlanmıştır.
              </p>
              <p className="mt-3">
                <strong className="text-[var(--color-text-primary)]">
                  İletişim:
                </strong>{" "}
                <a
                  href="mailto:satis@objektifkriter.com.tr"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  satis@objektifkriter.com.tr
                </a>
              </p>
            </Bolum>

            <Bolum baslik="2. İşlenen Kişisel Veriler">
              <p>
                Web sitemiz üzerinden teklif talebinde bulunmanız, iletişim
                kurmanız veya site ziyaretiniz sırasında aşağıdaki kategorilerde
                kişisel verileriniz işlenmektedir:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Kimlik Bilgileri:
                  </strong>{" "}
                  Ad, soyad
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    İletişim Bilgileri:
                  </strong>{" "}
                  E-posta adresi, telefon numarası
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Mesleki Bilgiler:
                  </strong>{" "}
                  Şirket adı, sektör, pozisyon
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Talep Bilgileri:
                  </strong>{" "}
                  Reklam tercihleri (şehir, format), bütçe, kampanya zamanı,
                  mesaj içeriği
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    İşlem Güvenliği Bilgileri:
                  </strong>{" "}
                  IP adresi, tarayıcı bilgileri (user agent), referans URL,
                  ziyaret zamanı
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="3. Kişisel Verilerin İşlenme Amaçları">
              <p>
                Yukarıda belirtilen kişisel verileriniz, aşağıdaki amaçlarla
                işlenmektedir:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Teklif taleplerinizin değerlendirilmesi ve yanıtlanması</li>
                <li>
                  Reklam kampanyalarının planlanması, yürütülmesi ve takibi
                </li>
                <li>Müşteri ilişkilerinin yönetilmesi ve sürdürülmesi</li>
                <li>
                  Hukuki yükümlülüklerimizin yerine getirilmesi (ticari mevzuat,
                  vergi mevzuatı vb.)
                </li>
                <li>
                  Web sitesi ve hizmetlerimizin güvenliğinin sağlanması, kötüye
                  kullanımın önlenmesi
                </li>
                <li>
                  Açık rızanız bulunması halinde, kampanya ve hizmet
                  bilgilendirmelerinin yapılması
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri">
              <p>
                Kişisel verileriniz, KVKK&apos;nın 5. maddesinde yer alan
                aşağıdaki hukuki sebeplere dayalı olarak işlenmektedir:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Açık rızanızın bulunması
                  </strong>{" "}
                  (KVKK m. 5/1) — teklif formu üzerinden tarafınızca verilen
                  açık rıza ile
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Sözleşmenin kurulması veya ifası için gerekli olması
                  </strong>{" "}
                  (KVKK m. 5/2-c) — teklif sürecinin yürütülmesi
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Hukuki yükümlülüğün yerine getirilmesi
                  </strong>{" "}
                  (KVKK m. 5/2-ç) — ticari ve vergi mevzuatı kapsamında
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Meşru menfaat
                  </strong>{" "}
                  (KVKK m. 5/2-f) — hizmet kalitesi ve site güvenliği için
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="5. Kişisel Verilerin Aktarılması">
              <p>
                Kişisel verileriniz, hizmetlerin sunulması amacıyla aşağıdaki
                taraflara, KVKK&apos;nın 8. ve 9. maddelerine uygun olarak
                aktarılabilir:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  Reklam kampanyasının ifası için iş ortakları (medya sahipleri,
                  baskı/üretim/montaj firmaları)
                </li>
                <li>
                  Bulut hizmet sağlayıcıları ve veri tabanı altyapı
                  sağlayıcıları (Supabase Inc., Vercel Inc.)
                </li>
                <li>
                  Yetkili kamu kurum ve kuruluşlarına, yargı mercilerine, yasal
                  zorunluluk halinde
                </li>
              </ul>
              <p className="mt-4">
                <strong className="text-[var(--color-text-primary)]">
                  Yurt dışına aktarım:
                </strong>{" "}
                Kullandığımız bulut altyapı sağlayıcıları (Supabase, Vercel)
                Avrupa Birliği üyesi ülkelerde sunucularını barındırmaktadır.
                Kişisel verileriniz, KVKK&apos;nın 9. maddesi ve ilgili Kurul
                kararları çerçevesinde, açık rızanız ya da yeterli koruma
                bulunan ülkeler kapsamında aktarılmaktadır.
              </p>
            </Bolum>

            <Bolum baslik="6. Kişisel Veri Toplama Yöntemi">
              <p>
                Kişisel verileriniz; web sitemiz üzerindeki formlar, e-posta,
                telefon görüşmeleri, çerezler ve benzeri otomatik veya yarı
                otomatik yöntemlerle elektronik ortamda toplanmaktadır.
              </p>
            </Bolum>

            <Bolum baslik="7. Saklama Süresi">
              <p>
                Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca
                ve ilgili mevzuatta öngörülen asgari sürelerin altında
                kalmamak kaydıyla saklanır:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  Teklif talepleri ve müşteri iletişim verileri: 3 yıl
                </li>
                <li>
                  Sözleşme ilişkisi kurulan müşterilerin verileri: ilişki
                  sonlandıktan sonra 10 yıl (Türk Ticaret Kanunu)
                </li>
                <li>
                  Vergi mevzuatı kapsamındaki belgeler: 5 yıl (Vergi Usul
                  Kanunu)
                </li>
                <li>
                  IP adresi ve teknik log kayıtları: 1 yıl (5651 sayılı Kanun
                  kapsamında)
                </li>
              </ul>
              <p className="mt-4">
                Saklama süresi dolan veriler imha edilir veya
                anonimleştirilir.
              </p>
            </Bolum>

            <Bolum baslik="8. KVKK Madde 11 Kapsamında Haklarınız">
              <p>
                KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak aşağıdaki
                haklara sahipsiniz:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>
                  İşlenme amacını ve bunların amacına uygun kullanılıp
                  kullanılmadığını öğrenme
                </li>
                <li>
                  Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı
                  üçüncü kişileri bilme
                </li>
                <li>
                  Kişisel verilerin eksik veya yanlış işlenmiş olması halinde
                  bunların düzeltilmesini isteme
                </li>
                <li>
                  KVKK m. 7&apos;de öngörülen şartlar çerçevesinde silinmesini
                  veya yok edilmesini isteme
                </li>
                <li>
                  Yapılan düzeltme, silme veya yok etme işlemlerinin, kişisel
                  verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme
                </li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                  analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                  çıkmasına itiraz etme
                </li>
                <li>
                  Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle
                  zarara uğramanız halinde zararın giderilmesini talep etme
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="9. Başvuru Yöntemi">
              <p>
                Yukarıda belirtilen haklarınızı kullanmak için, Veri Sorumlusuna
                Başvuru Usul ve Esasları Hakkında Tebliğ&apos;e uygun olarak
                aşağıdaki yöntemlerle başvuruda bulunabilirsiniz:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>
                  E-posta:{" "}
                  <a
                    href="mailto:satis@objektifkriter.com.tr"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    satis@objektifkriter.com.tr
                  </a>
                </li>
                <li>Konu satırına &quot;KVKK Başvurusu&quot; yazınız</li>
                <li>
                  Başvurunuzda kimlik bilgileriniz, talebinizin niteliği ve
                  iletişim bilgilerinize yer veriniz
                </li>
              </ul>
              <p className="mt-4">
                Başvurularınız KVKK&apos;nın 13. maddesi uyarınca en geç
                <strong className="text-[var(--color-text-primary)]">
                  {" "}30 gün içinde
                </strong>{" "}
                yanıtlanır. İşlemin ayrıca bir maliyet gerektirmesi halinde,
                Kurul tarafından belirlenen tarifedeki ücret talep edilebilir.
              </p>
            </Bolum>

            <Bolum baslik="10. AB Genel Veri Koruma Tüzüğü (GDPR)">
              <p>
                AB&apos;de ikamet eden veri sahipleri için, GDPR kapsamında
                yukarıda belirtilen haklara ek olarak{" "}
                <strong className="text-[var(--color-text-primary)]">
                  veri taşınabilirliği hakkı (GDPR m. 20)
                </strong>{" "}
                ve{" "}
                <strong className="text-[var(--color-text-primary)]">
                  denetim makamına şikayet hakkı (GDPR m. 77)
                </strong>{" "}
                bulunmaktadır. Otomatik karar verme veya profil çıkarma süreci
                yürütülmemektedir.
              </p>
            </Bolum>

            <Bolum baslik="11. Değişiklikler">
              <p>
                İşbu aydınlatma metni gerektiğinde güncellenebilir. Güncel
                versiyon her zaman bu sayfadan erişilebilir. Önemli
                değişikliklerde versiyon numarası ve tarih güncellenir, gerekli
                hallerde tekrar onay talep edilir.
              </p>
            </Bolum>

          </article>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-[var(--color-border-subtle)]">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText
                  size={20}
                  className="text-[var(--color-text-muted)]"
                />
                <div className="text-sm text-[var(--color-text-secondary)]">
                  İlgili belgeler:{" "}
                  <Link
                    href="/gizlilik"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    Gizlilik Politikası
                  </Link>
                  {" • "}
                  <Link
                    href="/cerez-politikasi"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    Çerez Politikası
                  </Link>
                </div>
              </div>
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Bölüm bileşeni */
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
