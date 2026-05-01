import Link from "next/link";
import {
  ArrowRight,
  Square,
  Smartphone,
  Monitor,
  Tv,
  Maximize2,
  Flag,
  Plane,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

async function getStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .schema("website")
    .from("envanter")
    .select("sehir, toplam_face")
    .eq("aktif", true);

  if (error || !data) {
    return { sehirSayisi: 0, yuzSayisi: 0 };
  }

  const sehirSayisi = new Set(data.map((d) => d.sehir)).size;
  const yuzSayisi = data.reduce((sum, d) => sum + (d.toplam_face || 0), 0);

  return { sehirSayisi, yuzSayisi };
}

const formatlar = [
  {
    icon: Square,
    name: "Billboard",
    desc: "Yüksek görünürlük, geniş etki alanı",
    href: "/hizmetler#billboard",
  },
  {
    icon: Smartphone,
    name: "CLP / Raket",
    desc: "Şehir merkezleri ve duraklarda",
    href: "/hizmetler#clp",
  },
  {
    icon: Monitor,
    name: "Megalight",
    desc: "Aydınlatmalı, premium konumlar",
    href: "/hizmetler#megalight",
  },
  {
    icon: Tv,
    name: "LED & Dijital",
    desc: "Dinamik içerik, gerçek zamanlı",
    href: "/hizmetler#led",
  },
  {
    icon: Maximize2,
    name: "Giantboard",
    desc: "Anıtsal boyut, yüksek etki",
    href: "/hizmetler#giantboard",
  },
  {
    icon: Flag,
    name: "Pole Banner",
    desc: "Cadde ve bulvar boyunca",
    href: "/hizmetler#pole-banner",
  },
  {
    icon: Plane,
    name: "Havalimanı LED",
    desc: "Premium kitleye doğrudan erişim",
    href: "/hizmetler#havalimani",
  },
];

const surec = [
  {
    num: "01",
    title: "Brief",
    desc: "Hedefinizi ve kitlenizi anlıyoruz, ihtiyacınızı netleştiriyoruz.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "Şehir, format ve süreye göre lokasyon önerisi hazırlıyoruz.",
  },
  {
    num: "03",
    title: "Üretim",
    desc: "Tasarım, baskı ve lojistik süreçlerini biz yönetiyoruz.",
  },
  {
    num: "04",
    title: "Yayın",
    desc: "Yayın takibi, fotoğraf raporu ve performans değerlendirmesi.",
  },
];

export default async function Home() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center pt-12 pb-20">
        <div className="container-narrow w-full">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-gradient">Türkiye&apos;nin</span>
              <br />
              OOH ağı
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              Türkiye genelinde {stats.sehirSayisi}+ şehirde,{" "}
              {stats.yuzSayisi.toLocaleString("tr-TR")}+ reklam yüzü ile
              markanızı doğru yere konumlandırıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/teklif-al" className="btn-primary">
                Teklif Al
                <ArrowRight size={18} />
              </Link>
              <Link href="/envanter" className="btn-secondary">
                Envanteri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAYAÇ */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container-narrow py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-7xl font-bold text-gradient">
                {stats.sehirSayisi}+
              </div>
              <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Şehir
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-7xl font-bold text-gradient">
                {stats.yuzSayisi.toLocaleString("tr-TR")}+
              </div>
              <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Reklam Yüzü
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-7xl font-bold text-gradient">7</div>
              <div className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                Ana Format
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATLAR */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Her ihtiyaca özel format
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Klasik dikkat çekiciden dijital dinamiğe, kampanyanız için en
              uygun çözümü birlikte buluyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formatlar.map((format) => {
              const Icon = format.icon;
              return (
                <Link
                  key={format.name}
                  href={format.href}
                  className="group p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-elevated)] transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Icon
                      size={24}
                      className="text-[var(--color-primary)]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{format.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {format.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              4 adımda yayında
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Brief&apos;ten yayına kadar her aşamada yanınızdayız.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {surec.map((adim) => (
              <div key={adim.num} className="space-y-4">
                <div className="text-sm font-mono text-[var(--color-primary)]">
                  {adim.num}
                </div>
                <h3 className="text-2xl font-bold">{adim.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {adim.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)]">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Kampanyanız için{" "}
              <span className="text-gradient">lokasyon planı</span> çıkaralım
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Sektörünüze, hedefinize ve bütçenize uygun lokasyon önerilerini
              24 saat içinde alın.
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
