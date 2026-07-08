import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { BOLGELER, getBolgeMeta, getBolgeOzet, erisimKisa } from "@/src/data/bolgeler";
import { formatAdi, sayiTr, TOPLAM } from "@/src/data/envanter";
import { getBolgeAciklama } from "@/src/data/content/bolge-aciklama";
import { getBolgeSSS } from "@/src/data/content/bolge-sss";
import { FAQ } from "@/components/FAQ";
import { buildBolgeJsonLd, buildFaqJsonLd } from "./bolge-derive";
import { BolgeIller } from "./BolgeIller";

export const dynamicParams = false;

export function generateStaticParams() {
  return BOLGELER.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBolgeOzet(slug);
  if (!b) notFound();

  return {
    title: `${b.meta.ad} Bölgesi Açıkhava Reklam — ${b.iller.length} İl, ${sayiTr(b.toplamUnite)} Ünite`,
    description: `${b.meta.ad} bölgesinde ${b.iller.length} ilde ${sayiTr(b.toplamUnite)} reklam ünitesi, ${b.mecra.length} mecra türü. Aylık ${erisimKisa(b.toplamErisim)} erişim. Billboard, CLP, megalight ve dijital açıkhava — hızlı teklif.`,
    alternates: { canonical: `https://objektifkriter.com.tr/bolge/${slug}` },
    openGraph: {
      title: `${b.meta.ad} Bölgesi Açıkhava Reklam — ${sayiTr(b.toplamUnite)} Ünite`,
      description: `${b.meta.ad} bölgesinde ${b.iller.length} ilde ${sayiTr(b.toplamUnite)} reklam ünitesi. Hızlı teklif, foto-raporlu uygulama.`,
      url: `https://objektifkriter.com.tr/bolge/${slug}`,
      type: "website",
    },
  };
}

export default async function BolgePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getBolgeMeta(slug);
  const b = getBolgeOzet(slug);
  if (!meta || !b) notFound();

  const aciklama = getBolgeAciklama(slug);
  const sssMaddeler = getBolgeSSS(slug);
  const jsonLd = buildBolgeJsonLd(slug);

  return (
    <>
      {jsonLd && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.service) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
        </>
      )}
      {sssMaddeler.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(sssMaddeler)) }} />
      )}

      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Ana sayfa</Link>
            <ChevronRight size={14} />
            <Link href="/envanter" className="hover:text-[var(--color-primary)] transition-colors">Envanter</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--color-text-secondary)]">{meta.ad} Bölgesi</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <MapPin size={16} />
              {meta.ad} Bölgesi
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">{meta.ad}</span> Bölgesi Açıkhava Reklam
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {aciklama}
            </p>
          </div>
        </div>
      </section>

      {/* SAYAÇ — il · ünite · aylık erişim */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">{b.iller.length}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Kapsanan İl</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">{sayiTr(b.toplamUnite)}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Reklam Ünitesi</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-gradient">{erisimKisa(b.toplamErisim)}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Aylık Erişim</div>
            </div>
          </div>
        </div>
      </section>

      {/* MECRA DAĞILIMI */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{meta.ad} envanteri</h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Bölge genelinde mecra türü bazında reklam ünitesi dağılımı — rakamlar güncel envanterden otomatik gelir.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {b.mecra.map(({ format, adet }) => (
              <div key={format} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div className="text-3xl font-bold text-[var(--color-primary)]">{sayiTr(adet)}</div>
                <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{formatAdi(format)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KAPSANAN İLLER */}
      <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30">
        <div className="container-narrow">
          <div className="max-w-2xl mb-8">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Kapsama alanı</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{meta.ad} bölgesinde envanterin bulunduğu iller</h2>
          </div>
          <BolgeIller iller={b.iller} />
        </div>
      </section>

      {/* SSS */}
      {sssMaddeler.length > 0 && (
        <section className="py-24 border-t border-[var(--color-border-subtle)]">
          <div className="container-narrow">
            <div className="max-w-2xl mb-10">
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">SSS</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">{meta.ad} açıkhava reklam — sık sorulanlar</h2>
            </div>
            <FAQ maddeler={sssMaddeler} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {meta.ad} kampanyası için <span className="text-gradient">teklif</span> alın
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hedef il ve bütçenize uygun lokasyonları 15 dakika içinde önerelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
              <Link href="/envanter" className="btn-secondary">Tüm envanteri gör</Link>
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
