import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { LegalIcerik } from "@/components/legal/LegalIcerik";
import { KVKK_AYDINLATMA } from "@/src/data/content/legal/kvkk-aydinlatma";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Objektif Kriter olarak kişisel verilerinizin işlenmesine ilişkin 6698 sayılı KVKK kapsamında aydınlatma metnimiz.",
};

export default function KvkkAydinlatmaPage() {
  const doc = KVKK_AYDINLATMA;
  return (
    <>
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
                  href="/gizlilik-politikasi"
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
                {" • "}
                <Link
                  href="/kvkk-basvuru-formu"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  İlgili Kişi Başvuru Formu
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
