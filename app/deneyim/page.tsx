import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sayfaMeta } from "@/lib/seo";
import { TOPLAM, sayiTr, erisimEtiketi, getFormatToplam, getFormatIller } from "@/src/data/envanter";
import {
  DENEYIM_META,
  DENEYIM_GIRIS,
  DENEYIM_SAHNELERI,
  DENEYIM_FOTOGRAFLARI,
  DENEYIM_FINAL,
  DENEYIM_NOT,
} from "@/src/data/content/deneyim";
import { DeneyimAkisi } from "./DeneyimAkisi";
import { TurkiyeSiluet } from "./TurkiyeSiluet";
import { DENEYIM_CSS } from "./deneyim-css";

/**
 * /deneyim — "Şehirde bir gün" fotoğraf anlatımı. Menüde/sitemap'te YOK, noindex.
 * Metinler + rakamlar + fotoğraflar sunucuda; kaydırma hareketi DeneyimAkisi (transform/opacity).
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

const FOTO_ICIN = DENEYIM_FOTOGRAFLARI.map((f) => ({ sahne: f.sahne, odak: f.odak }));
const SAATLER = [
  { bolum: "giris", saat: DENEYIM_GIRIS.saat },
  ...DENEYIM_SAHNELERI.map((s) => ({ bolum: s.id, saat: s.saat })),
];

export default function DeneyimPage() {
  return (
    <div className="dn" data-deneyim>
      <style>{DENEYIM_CSS}</style>

      {/* Sabitlenmiş fotoğraf sahnesi */}
      <div className="dn-sahne">
        {DENEYIM_FOTOGRAFLARI.map((f, i) => (
          <div
            key={f.src}
            className="dn-foto"
            data-foto={i}
            style={{ opacity: i === 0 ? 1 : 0, transformOrigin: `${f.odak[0]}% ${f.odak[1]}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- katmanlı sahne: boyut CSS'te, dönüşüm JS'te */}
            <img
              src={f.src}
              alt={f.alt}
              width={f.en}
              height={f.boy}
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              decoding={i === 0 ? "sync" : "async"}
              style={{ objectPosition: `${f.odak[0]}% ${f.odak[1]}%` }}
            />
          </div>
        ))}
        <div className="dn-karart" />
        <div className="dn-gece" data-gece />
        <div className="dn-saat" data-saat-kutu aria-hidden="true">
          <span className="dn-saat-nokta" />
          <span data-saat>{DENEYIM_GIRIS.saat}</span>
        </div>
        <DeneyimAkisi fotolar={FOTO_ICIN} saatler={SAATLER} />
      </div>

      <div className="dn-bolumler">
        {/* Giriş */}
        <section data-bolum="giris" className="dn-bolum">
          <div className="container-narrow">
            <div className="dn-kart">
              <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">
                {DENEYIM_GIRIS.ust}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-gradient">{DENEYIM_GIRIS.baslik}</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{DENEYIM_GIRIS.metin}</p>
              <div className="dn-ipucu mt-5 items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                <span className="inline-block w-px h-6 bg-[var(--color-text-muted)] animate-pulse" />
                {DENEYIM_GIRIS.kaydirIpucu}
              </div>
            </div>
          </div>
        </section>

        {/* Sahneler */}
        {DENEYIM_SAHNELERI.map((s) => {
          const ozet = mecraOzeti(s.envanterAd);
          // Birden çok fotoğraflı sahne (akşam: megalight → LED) her fotoğraf için ayrı durak alır
          const fotoSayisi = DENEYIM_FOTOGRAFLARI.filter((f) => f.sahne === s.id).length;
          return (
            <section
              key={s.id}
              data-bolum={s.id}
              className="dn-bolum"
              style={fotoSayisi > 1 ? { minHeight: `${170 * fotoSayisi}svh` } : undefined}
            >
              <div className="container-narrow">
                <div className="dn-kart">
                  <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">{s.etiket}</div>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                    <span className="text-gradient">{s.baslik}</span>
                  </h2>
                  <p className="mt-3 md:mt-4 text-sm md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{s.metin}</p>
                  <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{s.mecraAdi}</span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      · {sayiTr(ozet.adet)} ünite · {ozet.il} ilde
                    </span>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Final */}
        <section data-bolum="final" className="dn-bolum dn-final">
          <div className="container-narrow">
            <div className="dn-kart band-dark mx-auto">
              <div className="text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium mb-3">{DENEYIM_FINAL.ust}</div>
              <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">{DENEYIM_FINAL.baslik}</h2>
              <p className="mt-3 md:mt-4 text-sm md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                {DENEYIM_FINAL.metin}
              </p>
              <div className="mt-6 md:mt-8 grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 items-center">
                <TurkiyeSiluet aciklama={DENEYIM_FINAL.haritaAciklama} />
                <dl className="grid grid-cols-2 gap-4 md:gap-5">
                  {[
                    { deger: String(TOPLAM.il), etiket: DENEYIM_FINAL.ilEtiket },
                    { deger: sayiTr(TOPLAM.unite), etiket: DENEYIM_FINAL.uniteEtiket },
                    { deger: String(TOPLAM.mecra), etiket: DENEYIM_FINAL.mecraEtiket },
                    { deger: erisimEtiketi(), etiket: DENEYIM_FINAL.erisimEtiket },
                  ].map((x) => (
                    <div key={x.etiket}>
                      <dt className="sr-only">{x.etiket}</dt>
                      <dd className="text-2xl md:text-4xl font-bold text-gradient font-[family-name:var(--font-display)]">{x.deger}</dd>
                      <dd className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mt-1">{x.etiket}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4">
                <Link href="/teklif-al" className="btn-primary">
                  {DENEYIM_FINAL.cta}
                  <ArrowRight size={18} />
                </Link>
                <span className="text-xs text-[var(--color-text-muted)]">{DENEYIM_NOT}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
