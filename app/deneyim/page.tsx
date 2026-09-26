import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sayfaMeta } from "@/lib/seo";
import { TOPLAM, sayiTr, erisimEtiketi, getFormatToplam, getFormatIller } from "@/src/data/envanter";
import {
  DENEYIM_META,
  DENEYIM_GIRIS,
  DENEYIM_GIRIS_GORSEL,
  DENEYIM_SAHNELERI,
  DENEYIM_FINAL,
  DENEYIM_NOT,
} from "@/src/data/content/deneyim";
import { DeneyimYukleyici } from "./DeneyimYukleyici";
import { TurkiyeSiluet } from "./TurkiyeSiluet";
import { DENEYIM_CSS } from "./deneyim-css";

/**
 * /deneyim — "Şehirde bir gün" 3D prototipi. Menüde/sitemap'te YOK, noindex.
 * Metinler + rakamlar sunucuda çizilir; 3D sahne (three.js) yalnız bu sayfada,
 * arkadan ve yalnız uygun cihazda yüklenir (DeneyimYukleyici).
 */
export const metadata: Metadata = {
  ...sayfaMeta({ title: DENEYIM_META.baslik, description: DENEYIM_META.aciklama, path: "/deneyim" }),
  robots: { index: false, follow: false },
};

/** Sahnedeki mecra(lar)ın envanter toplamı + bulunduğu il sayısı (elle rakam yok) */
function mecraOzeti(envanterAd: string[]) {
  const iller = new Set(envanterAd.flatMap((ad) => getFormatIller(ad).map((x) => x.il)));
  const adet = envanterAd.reduce((s, ad) => s + getFormatToplam(ad), 0);
  return { adet, il: iller.size };
}

/** Sabit görsel: telefonda dikey, geniş ekranda yatay kare (3D sahneden yakalanmış) */
function SabitGorsel({ id, alt }: { id: string; alt: string }) {
  return (
    <picture className="dn-sabit">
      <source media="(max-width: 767px)" srcSet={`/deneyim/${id}-dikey.webp`} width={900} height={1125} />
      <img
        src={`/deneyim/${id}-yatay.webp`}
        alt={alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default function DeneyimPage() {
  return (
    <div className="dn" data-deneyim>
      <style>{DENEYIM_CSS}</style>
      <noscript>
        <style>{".dn .dn-sabit{display:block!important}"}</style>
      </noscript>

      <div className="dn-sahne">
        <DeneyimYukleyici />
      </div>

      <div className="dn-bolumler">
        {/* 0 · Giriş */}
        <section data-bolum="giris" className="dn-bolum">
          <div className="container-narrow">
            <div className="w-full">
              <SabitGorsel id="giris" alt={DENEYIM_GIRIS_GORSEL} />
              <div className="dn-kart dn-kart-acik">
                <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">
                  {DENEYIM_GIRIS.ust}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                  <span className="text-gradient">{DENEYIM_GIRIS.baslik}</span>
                </h1>
                <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">{DENEYIM_GIRIS.metin}</p>
                <div className="dn-ipucu mt-6 items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  <span className="inline-block w-px h-6 bg-[var(--color-text-muted)] animate-pulse" />
                  {DENEYIM_GIRIS.kaydirIpucu}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1–3 · Sahneler */}
        {DENEYIM_SAHNELERI.map((s) => {
          const ozet = s.envanterAd ? mecraOzeti(s.envanterAd) : null;
          const gece = s.id === "gece";
          return (
            <section key={s.id} data-bolum={s.id} className="dn-bolum">
              <div className="container-narrow">
                <div className="w-full">
                  <SabitGorsel id={s.id} alt={s.gorselAciklama} />
                  <div className={`dn-kart ${gece ? "band-dark" : "dn-kart-acik"}`}>
                    <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">
                      {s.saat}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                      <span className="text-gradient">{s.baslik}</span>
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{s.metin}</p>
                    {ozet && (
                      <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)] flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">{s.mecraAdi}</span>
                        <span className="text-sm text-[var(--color-text-muted)]">
                          · {sayiTr(ozet.adet)} ünite · {ozet.il} ilde
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* 4 · Final */}
        <section data-bolum="final" className="dn-bolum dn-final">
          <div className="container-narrow">
            <div className="w-full flex justify-center">
              <div className="w-full">
                <SabitGorsel id="final" alt={DENEYIM_FINAL.gorselAciklama} />
                <div className="dn-kart band-dark mx-auto">
                  <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">
                    {DENEYIM_FINAL.ust}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">{DENEYIM_FINAL.baslik}</h2>
                  <p className="mt-4 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                    {DENEYIM_FINAL.metin}
                  </p>
                  <div className="mt-8 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
                    <TurkiyeSiluet aciklama={DENEYIM_FINAL.haritaAciklama} />
                    <dl className="grid grid-cols-2 gap-5">
                      {[
                        { deger: String(TOPLAM.il), etiket: DENEYIM_FINAL.ilEtiket },
                        { deger: sayiTr(TOPLAM.unite), etiket: DENEYIM_FINAL.uniteEtiket },
                        { deger: String(TOPLAM.mecra), etiket: DENEYIM_FINAL.mecraEtiket },
                        { deger: erisimEtiketi(), etiket: DENEYIM_FINAL.erisimEtiket },
                      ].map((x) => (
                        <div key={x.etiket}>
                          <dt className="sr-only">{x.etiket}</dt>
                          <dd className="text-3xl md:text-4xl font-bold text-gradient font-[family-name:var(--font-display)]">{x.deger}</dd>
                          <dd className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mt-1">{x.etiket}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link href="/teklif-al" className="btn-primary">
                      {DENEYIM_FINAL.cta}
                      <ArrowRight size={18} />
                    </Link>
                    <span className="text-xs text-[var(--color-text-muted)]">{DENEYIM_NOT}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
