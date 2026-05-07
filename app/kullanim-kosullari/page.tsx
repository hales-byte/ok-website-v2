import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description:
    "Objektif Kriter web sitesinin kullanım koşulları ve hizmet şartları.",
};

export default function KullanimKosullariPage() {
  return (
    <>
      <section className="pt-24 pb-12 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <Scale size={16} />
              Koşullar
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">Kullanım</span> Koşulları
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

            <Bolum baslik="1. Genel">
              <p>
                Bu Kullanım Koşulları, Objektif Kriter (&quot;Şirket&quot;,
                &quot;biz&quot;) tarafından işletilen{" "}
                <strong className="text-[var(--color-text-primary)]">
                  objektifkriter.com.tr
                </strong>{" "}
                web sitesini (&quot;Site&quot;) kullanan tüm ziyaretçileri
                (&quot;Kullanıcı&quot;, &quot;siz&quot;) bağlar.
              </p>
              <p className="mt-3">
                Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.
                Koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
              </p>
            </Bolum>

            <Bolum baslik="2. Hizmetlerin Tanımı">
              <p>
                Site, açık hava reklam (Out-of-Home / OOH) hizmetleri sunan
                Objektif Kriter&apos;in faaliyetleri, envanteri ve iletişim
                bilgileri hakkında bilgi sağlar. Site üzerinden:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Reklam envanteri hakkında bilgi alabilirsiniz</li>
                <li>Teklif talebinde bulunabilirsiniz</li>
                <li>Bizimle iletişim kurabilirsiniz</li>
              </ul>
              <p className="mt-3">
                Site üzerinde sözleşme bağlayıcı olmayan bilgiler yer alır.
                Resmi teklif ve sözleşme süreçleri, talep sonrasında ayrıca
                yürütülür.
              </p>
            </Bolum>

            <Bolum baslik="3. Kullanıcı Sorumluluğu">
              <p>Kullanıcı olarak:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Verdiğiniz bilgilerin doğru ve güncel olduğunu</li>
                <li>Siteyi yalnızca yasal amaçlarla kullanacağınızı</li>
                <li>
                  Sitenin işleyişini bozacak, güvenliğini tehdit edecek
                  davranışlardan kaçınacağınızı
                </li>
                <li>
                  Diğer kullanıcıların ve üçüncü tarafların haklarına saygı
                  göstereceğinizi
                </li>
                <li>
                  Site içeriğini izinsiz kopyalamayacağınızı, çoğaltmayacağınızı
                </li>
              </ul>
              <p className="mt-3">kabul ve taahhüt edersiniz.</p>
            </Bolum>

            <Bolum baslik="4. Fikri Mülkiyet Hakları">
              <p>
                Sitedeki tüm içerik (metin, görsel, logo, marka, kod, veri
                tabanı) Objektif Kriter&apos;e aittir veya Objektif Kriter
                tarafından lisanslı kullanılmaktadır. 5846 sayılı Fikir ve
                Sanat Eserleri Kanunu kapsamında korunmaktadır.
              </p>
              <p className="mt-3">
                İçerikleri yazılı izin olmaksızın kopyalamak, çoğaltmak,
                yayınlamak, ticari amaçla kullanmak yasaktır.
              </p>
            </Bolum>

            <Bolum baslik="5. Sorumluluk Sınırlaması">
              <p>
                Site, &quot;olduğu gibi&quot; (as is) sunulmaktadır. Aşağıdaki
                hususlarda Objektif Kriter sorumluluk kabul etmez:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Sitenin kesintisiz veya hatasız çalışmasını</li>
                <li>Sitedeki bilgilerin her an güncel olmasını</li>
                <li>
                  Üçüncü taraf bağlantı ve hizmetlerin (LinkedIn, Instagram,
                  vb.) güvenliği ve içeriği
                </li>
                <li>
                  Kullanıcı tarafından siteye sağlanan bilgilerin doğruluğu ve
                  bunlardan doğan zararlar
                </li>
              </ul>
              <p className="mt-3">
                Envanter bilgileri (lokasyonlar, fiyatlar, müsaitlik) bilgi
                amaçlıdır; kesin teklif ve sözleşme süreci sonrası
                netleştirilir.
              </p>
            </Bolum>

            <Bolum baslik="6. Kişisel Verilerin Korunması">
              <p>
                Kişisel verilerinizin işlenmesine ilişkin detaylı bilgi için{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  KVKK Aydınlatma Metni
                </Link>{" "}
                ve{" "}
                <Link
                  href="/gizlilik"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Gizlilik Politikası
                </Link>{" "}
                sayfalarımızı inceleyebilirsiniz.
              </p>
            </Bolum>

            <Bolum baslik="7. Değişiklikler">
              <p>
                Objektif Kriter, bu Kullanım Koşullarını önceden bildirmeksizin
                değiştirme hakkını saklı tutar. Değişiklikler bu sayfada
                yayınlandığı andan itibaren geçerli olur. Sitedeki kullanımınız
                güncel koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </Bolum>

            <Bolum baslik="8. Uyuşmazlık Çözümü">
              <p>
                Bu koşullarla ilgili her türlü uyuşmazlıkta Türkiye
                Cumhuriyeti yasaları uygulanır. Uyuşmazlıkların çözümünde
                İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
              </p>
            </Bolum>

            <Bolum baslik="9. İletişim">
              <p>
                Kullanım koşullarıyla ilgili sorularınız için:{" "}
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
                  href="/gizlilik"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Gizlilik Politikası
                </Link>
              </div>
              <Link href="/" className="btn-secondary">
                Ana Sayfa
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
