import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import { LegalIcerik } from "@/components/legal/LegalIcerik";
import { GIZLILIK_POLITIKASI } from "@/src/data/content/legal/gizlilik-politikasi";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Objektif Kriter olarak ziyaretçilerimizin ve müşterilerimizin verilerini nasıl topladığımız, kullandığımız ve koruduğumuz.",
};

export default function GizlilikPolitikasiPage() {
  const doc = GIZLILIK_POLITIKASI;
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
              Versiyon {doc.versiyon} · Son güncelleme: {doc.guncelleme}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-narrow">
          <LegalIcerik doc={doc} />

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
