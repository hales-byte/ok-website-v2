import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import {
  getIl,
  getFormatlarByIl,
  formatAdi,
  FORMAT_PAGE_KEY,
  MIN_FORMAT_PAGE_UNITE,
  sayiTr,
  slugifyTr,
  lokatifEk,
  getIlErisimEtiketi,
  TOPLAM,
} from "@/src/data/envanter";
import { getIlAciklama } from "@/src/data/content/il-aciklama";
import { getIlSSS } from "@/src/data/content/il-sss";
import { FAQ } from "@/components/FAQ";
import { getStandaloneIller, bolgeOfIl } from "@/src/data/bolgeler";
import { getKomsuIller, getIlMecraSayfalari } from "./il-derive";
import { IlIcLinkler } from "./IlIcLinkler";
import { IlSchema } from "./IlSchema";

/**
 * Bilinmeyen parametreler için GERÇEK 404 (Next 16 akışlı metadata,
 * runtime notFound/redirect'i HTTP koduna yansıtamıyor — QA bulgusu).
 * Tüm geçerli sayfalar build'de üretilir; gerisi router'da 404.
 */
export const dynamicParams = false;

// Build time'da SADECE 22 standalone il için statik sayfa üret; taşınan 23 il
// bölge sayfasına 301'lenir (next.config.ts). dynamicParams=false → gerisi 404
// olmaz çünkü redirect routing'den önce çalışır.
export function generateStaticParams() {
  return getStandaloneIller().map((il) => ({ slug: slugifyTr(il.il) }));
}

// Her sayfa için dinamik SEO metadata — rakamlar envanter.json'dan
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const il = getIl(slug);

  // 404 kararı burada (metadata aşaması) verilir ki HTTP durum kodu
  // gövde akışı başlamadan doğru (404) dönsün.
  if (!il) {
    notFound();
  }

  const mecraSayisi = Object.keys(il.formatlar).length;
  return {
    title: `${il.il} Açıkhava Reklam — ${sayiTr(il.toplam)} Reklam Ünitesi`,
    description: `${il.il}${lokatifEk(il.il)} ${sayiTr(il.toplam)} reklam ünitesi, ${mecraSayisi} mecra türü: billboard, CLP, megalight ve dijital açıkhava çözümleri. Aylık ${getIlErisimEtiketi(slug)} erişim. Hızlı teklif, profesyonel takip.`,
    alternates: {
      canonical: `https://objektifkriter.com.tr/sehir/${slug}`,
    },
    openGraph: {
      title: `${il.il} Açıkhava Reklam — ${sayiTr(il.toplam)} Reklam Ünitesi`,
      description: `${il.il}${lokatifEk(il.il)} ${mecraSayisi} mecra türünde ${sayiTr(il.toplam)} reklam ünitesi. Hızlı teklif, foto-raporlu uygulama.`,
      url: `https://objektifkriter.com.tr/sehir/${slug}`,
      type: "website",
    },
  };
}

export default async function SehirPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const il = getIl(slug);

  if (!il) {
    notFound();
  }

  const sehir = il.il;
  const ek = lokatifEk(sehir);
  const formatlar = getFormatlarByIl(slug);
  const mecraSayisi = formatlar.length;
  const erisimEtiket = getIlErisimEtiketi(slug);
  const aciklama = getIlAciklama(slug);
  const sssMaddeler = getIlSSS(slug);
  const komsular = getKomsuIller(slug, 4);
  const mecraSayfalari = getIlMecraSayfalari(slug, 2);
  const bolge = bolgeOfIl(slug);
  const teklifHref = `/teklif-al?sehir=${encodeURIComponent(sehir)}`;

  return (
    <>
      <IlSchema slug={slug} sssMaddeler={sssMaddeler} />

      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
              Ana sayfa
            </Link>
            <ChevronRight size={14} />
            <Link href="/envanter" className="hover:text-[var(--color-primary)] transition-colors">
              Envanter
            </Link>
            <ChevronRight size={14} />
            <span className="text-[var(--color-text-secondary)]">{sehir}</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <MapPin size={16} />
              {sehir}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">{sehir}</span>
              {ek} Açıkhava Reklam
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {aciklama}
            </p>
          </div>
        </div>
      </section>

      {/* SAYAÇ — ünite · mecra türü · aylık erişim */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {sayiTr(il.toplam)}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Reklam Ünitesi
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {mecraSayisi}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Mecra Türü
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                {erisimEtiket}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Aylık Erişim
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT DAĞILIMI */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {sehir} envanteri
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Mecra türü bazında reklam ünitesi dağılımı — rakamlar güncel
              envanterden otomatik gelir.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formatlar.map(({ format, adet }) => {
              const pageKey = FORMAT_PAGE_KEY[format];
              const sayfasiVar =
                pageKey !== null &&
                pageKey !== undefined &&
                adet >= MIN_FORMAT_PAGE_UNITE;
              const kart = (
                <div
                  className={`p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] h-full ${
                    sayfasiVar
                      ? "transition-colors hover:border-[var(--color-primary)]"
                      : ""
                  }`}
                >
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {sayiTr(adet)}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
                    {formatAdi(format)}
                    {sayfasiVar && <ChevronRight size={14} />}
                  </div>
                </div>
              );
              return sayfasiVar ? (
                <Link key={format} href={`/sehir/${slug}/${pageKey}`}>
                  {kart}
                </Link>
              ) : (
                <div key={format}>{kart}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* İLÇE / KAPSAMA */}
      {il.ilceler.length > 0 && (
        <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30">
          <div className="container-narrow">
            <div className="max-w-2xl mb-8">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Kapsama alanı
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {sehir} içinde envanterin bulunduğu noktalar
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {il.ilceler.map((ilce) => (
                <span
                  key={ilce}
                  className="px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)]"
                >
                  {ilce}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              Nokta (sokak/lokasyon) bazlı liste teklif aşamasında paylaşılır.
            </p>
          </div>
        </section>
      )}

      {/* SSS — verinden üretilen ile özel sorular */}
      {sssMaddeler.length > 0 && (
        <section className="py-24 border-t border-[var(--color-border-subtle)]">
          <div className="container-narrow">
            <div className="max-w-2xl mb-10">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                SSS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {sehir} açıkhava reklam — sık sorulanlar
              </h2>
            </div>
            <FAQ maddeler={sssMaddeler} />
          </div>
        </section>
      )}

      {/* İÇ LİNKLER — komşu iller + mecra sayfaları */}
      <IlIcLinkler
        sehir={sehir}
        slug={slug}
        komsular={komsular}
        mecraSayfalari={mecraSayfalari}
        bolge={bolge}
      />

      {/* CTA — il etiketli teklif */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {sehir} kampanyası için{" "}
              <span className="text-gradient">teklif</span> alın
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedefinize ve bütçenize uygun {sehir} lokasyonlarını 15 dakika
              içinde önerelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={teklifHref} className="btn-primary">
                {sehir} için teklif al
                <ArrowRight size={18} />
              </Link>
              <Link href="/envanter" className="btn-secondary">
                Tüm envanteri gör
              </Link>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              {TOPLAM.il} ilde {sayiTr(TOPLAM.unite)} reklam ünitesi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
