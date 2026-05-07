import Link from "next/link";
import { Mail, MapPin, ArrowRight, Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Objektif Kriter ile iletişime geçin. OOH reklam kampanyalarınız için 30 dakika içinde dönüş yapıyoruz.",
};

async function getStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir")
    .eq("aktif", true);

  if (error || !data) {
    return { sehirSayisi: 0 };
  }

  const sehirSayisi = new Set(data.map((d) => d.sehir)).size;
  return { sehirSayisi };
}

// Bu projedeki lucide-react sürümü brand ikonlarını export etmiyor; inline SVG kullanıyoruz.
function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default async function IletisimPage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-16 border-b border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl space-y-6">
            <div className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-medium">
              İletişim
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Konuşalım, planlayalım,{" "}
              <span className="text-gradient">yayına çıkaralım</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Kampanyanız ne aşamada olursa olsun — fikir aşaması, lokasyon
              araştırması veya hızlı teklif — bize ulaşın. 30 dakika içinde
              dönüş yapıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* İLETİŞİM NOKTALARI */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:satis@objektifkriter.com.tr"
              className="group p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-elevated)] transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                <Mail size={24} className="text-[var(--color-primary)]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Email
              </div>
              <div className="text-base font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors break-all">
                satis@objektifkriter.com.tr
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Teklif talebi, lokasyon önerisi ve tüm sorularınız için.
              </p>
            </a>

            <a
              href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum."
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-elevated)] transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                <WhatsAppIcon size={24} />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                WhatsApp
              </div>
              <div className="text-lg font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                +90 552 918 58 64
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Tek tıkla mesaj atın, hızlı geri dönüş için.
              </p>
            </a>

            <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                <MapPin size={24} className="text-[var(--color-primary)]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Merkez
              </div>
              <div className="text-lg font-semibold mb-3">İstanbul, Türkiye</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Türkiye genelinde {stats.sehirSayisi}+ şehirde aktif
                lokasyonlarımızla yanınızdayız.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                <Clock size={24} className="text-[var(--color-primary)]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Çalışma Saatleri
              </div>
              <div className="text-lg font-semibold mb-3">
                Pazartesi — Cuma
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                09:00 — 18:00 arası ofiste, email ile her zaman ulaşılabilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOSYAL MEDYA */}
      <section className="py-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                Sosyal medya
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Çalışmalarımızı takip edin
              </h2>
              <p className="mt-4 text-base text-[var(--color-text-secondary)]">
                Yeni kampanyalar, lokasyonlar ve sektör içerikleri için
                bizi takip edin.
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/objektif-kriter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-14 h-14 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] transition-all"
              >
                <LinkedinIcon size={22} />
              </a>
              <a
                href="https://www.instagram.com/objektifkriter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-14 h-14 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] transition-all"
              >
                <InstagramIcon size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Hızlıca <span className="text-gradient">teklif</span> almak
              istiyorsanız
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Sektörünüzü, hedefinizi ve bütçenizi paylaşın. Size en uygun
              format ve lokasyon kombinasyonunu 30 dakika içinde gönderelim.
            </p>
            <div className="pt-4">
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
