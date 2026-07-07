import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import { LegalIcerik } from "@/components/legal/LegalIcerik";
import { YazdirButonu } from "@/components/legal/YazdirButonu";
import { KVKK_BASVURU_FORMU } from "@/src/data/content/legal/kvkk-basvuru-formu";

export const metadata: Metadata = {
  title: "İlgili Kişi Başvuru Formu",
  description:
    "KVKK m.11 kapsamındaki haklarınız için İlgili Kişi (Veri Sahibi) Başvuru Formu. Doldurup iletisim@objektifkriter.com.tr adresine iletebilirsiniz.",
};

export default function KvkkBasvuruFormuPage() {
  const doc = KVKK_BASVURU_FORMU;
  return (
    <>
      <section className="pt-24 pb-12 border-b border-[var(--color-border-subtle)] print-gizle">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              <FileText size={16} />
              KVKK Başvuru
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              İlgili Kişi{" "}
              <span className="text-gradient">Başvuru Formu</span>
            </h1>
            <p className="text-base text-[var(--color-text-muted)]">
              Versiyon {doc.versiyon} · Son güncelleme: {doc.guncelleme}
            </p>
            <div className="pt-2">
              <YazdirButonu />
            </div>
          </div>
        </div>
      </section>

      {/* Yazdırma başlığı — yalnız çıktıda görünür */}
      <div className="hidden print:block px-6 pt-6">
        <h1 className="text-2xl font-bold">{doc.baslik}</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Objektif Kriter Reklam Pazarlama Ticaret Limited Şirketi · Versiyon{" "}
          {doc.versiyon}
        </p>
      </div>

      <section className="py-16 print:py-4">
        <div className="container-narrow">
          <LegalIcerik doc={doc} />

          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-[var(--color-border-subtle)] print-gizle">
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
                  href="/gizlilik-politikasi"
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
