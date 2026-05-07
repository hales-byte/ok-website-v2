import Link from "next/link";
import { ArrowRight, Cookie } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Objektif Kriter web sitesinde kullanılan çerezler ve benzeri teknolojiler hakkında bilgi.",
};

export default function CerezPoliticasiPage() {
  return (
    <>
      <section className="pt-24 pb-12 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <Cookie size={16} />
              Çerezler
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">Çerez</span> Politikası
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

            <Bolum baslik="Çerez Nedir?">
              <p>
                Çerezler (cookies), bir web sitesini ziyaret ettiğinizde
                tarayıcınız tarafından cihazınıza (bilgisayar, telefon, tablet)
                kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin sizi
                tanımasını, tercihlerinizi hatırlamasını ve kullanıcı
                deneyiminizi geliştirmesini sağlar.
              </p>
              <p className="mt-3">
                Çerez kullanımı, 6698 sayılı KVKK ve AB GDPR/ePrivacy mevzuatı
                kapsamında düzenlenmektedir.
              </p>
            </Bolum>

            <Bolum baslik="Hangi Çerezleri Kullanıyoruz?">
              <p>
                Web sitemizde aşağıdaki kategorilerde çerezler
                kullanılmaktadır:
              </p>

              <div className="mt-6 space-y-6">
                <CerezKart
                  baslik="Zorunlu Çerezler"
                  aciklama="Sitenin temel işlevleri için gerekli olan çerezlerdir. Bunlar olmadan site düzgün çalışmaz."
                  ornekler="Oturum yönetimi, güvenlik, form işleme"
                  zorunluMu={true}
                />
                <CerezKart
                  baslik="İşlevsel Çerezler"
                  aciklama="Site tercihlerinizin (örn. dil, görüntüleme tercihleri) hatırlanmasını sağlar."
                  ornekler="Kullanıcı tercihleri, çerez onay durumu"
                  zorunluMu={false}
                />
                <CerezKart
                  baslik="Analitik Çerezler"
                  aciklama="Ziyaretçilerin siteyle nasıl etkileşimde bulunduğunu anlamamıza yardımcı olur. Tüm veriler anonim toplanır."
                  ornekler="Sayfa görüntüleme istatistikleri (varsa)"
                  zorunluMu={false}
                />
                <CerezKart
                  baslik="Pazarlama Çerezleri"
                  aciklama="Şu anda kullanılmıyor. Gelecekte kullanılması durumunda açık rıza alınacaktır."
                  ornekler="—"
                  zorunluMu={false}
                />
              </div>
            </Bolum>

            <Bolum baslik="Çerez Tercihinizi Yönetme">
              <p>
                Sitemize ilk girişinizde çerez tercihlerinizi belirleyebileceğiniz
                bir bildirim göreceksiniz. Tercihlerinizi istediğiniz zaman
                değiştirebilirsiniz.
              </p>
              <p className="mt-3">
                Tarayıcı ayarlarınızdan da çerezleri yönetebilirsiniz:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Chrome:
                  </strong>{" "}
                  Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Safari:
                  </strong>{" "}
                  Tercihler &gt; Gizlilik &gt; Çerezler
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Firefox:
                  </strong>{" "}
                  Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Edge:
                  </strong>{" "}
                  Ayarlar &gt; Çerezler ve Site İzinleri
                </li>
              </ul>
              <p className="mt-4">
                <strong className="text-[var(--color-text-primary)]">
                  Not:
                </strong>{" "}
                Zorunlu çerezleri devre dışı bırakırsanız sitenin bazı bölümleri
                düzgün çalışmayabilir.
              </p>
            </Bolum>

            <Bolum baslik="Üçüncü Taraf Çerezler">
              <p>
                Sitemizin altyapı sağlayıcıları (Vercel, Supabase) sınırlı
                teknik çerezler kullanabilir. Bu sağlayıcıların kendi gizlilik
                politikalarına bağlı kalınmaktadır:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  Vercel:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                </li>
                <li>
                  Supabase:{" "}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    supabase.com/privacy
                  </a>
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="Saklama Süresi">
              <p>Çerezler, türüne göre farklı sürelerde saklanır:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Oturum çerezleri:
                  </strong>{" "}
                  Tarayıcı kapatılınca silinir
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Kalıcı çerezler:
                  </strong>{" "}
                  En fazla 12 ay
                </li>
                <li>
                  <strong className="text-[var(--color-text-primary)]">
                    Çerez onay tercihiniz:
                  </strong>{" "}
                  6 ay (sonra tekrar onay istenir)
                </li>
              </ul>
            </Bolum>

            <Bolum baslik="Değişiklikler">
              <p>
                Çerez politikamız zaman zaman güncellenebilir. Önemli
                değişikliklerde sizi bilgilendiririz ve gerektiğinde tekrar onay
                talep ederiz.
              </p>
            </Bolum>

            <Bolum baslik="İletişim">
              <p>
                Çerez kullanımıyla ilgili sorularınız için:{" "}
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

function CerezKart({
  baslik,
  aciklama,
  ornekler,
  zorunluMu,
}: {
  baslik: string;
  aciklama: string;
  ornekler: string;
  zorunluMu: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          {baslik}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            zorunluMu
              ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
              : "bg-[var(--color-text-muted)]/15 text-[var(--color-text-muted)]"
          }`}
        >
          {zorunluMu ? "Zorunlu" : "Opsiyonel"}
        </span>
      </div>
      <p className="text-sm mb-3">{aciklama}</p>
      <p className="text-xs text-[var(--color-text-muted)]">
        <strong>Örnekler:</strong> {ornekler}
      </p>
    </div>
  );
}
