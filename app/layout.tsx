import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://objektifkriter.com.tr"),
  title: {
    default: "Objektif Kriter — Türkiye OOH Reklam",
    template: "%s | Objektif Kriter",
  },
  description:
    "Türkiye genelinde 47+ şehir, 33.812+ reklam yüzü. Billboard, CLP, megalight ve dijital OOH çözümleri.",
  keywords: [
    "OOH reklam",
    "outdoor reklam",
    "billboard",
    "CLP raket",
    "megalight",
    "Türkiye reklam ajansı",
  ],
  authors: [{ name: "Objektif Kriter" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://objektifkriter.com.tr",
    siteName: "Objektif Kriter",
    title: "Objektif Kriter — Türkiye OOH Reklam",
    description:
      "Türkiye genelinde 47+ şehir, 33.812+ reklam yüzü için OOH çözümleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Objektif Kriter — Türkiye OOH Reklam",
    description:
      "Türkiye genelinde 47+ şehir, 33.812+ reklam yüzü için OOH çözümleri.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <a href="#main" className="skip-link">
          İçeriğe atla
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        {/* Organization JSON-LD — SEO temeli */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Objektif Kriter",
              url: "https://objektifkriter.com.tr",
              logo: "https://objektifkriter.com.tr/logo.png",
              description:
                "Türkiye genelinde 47+ şehirde billboard, CLP, megalight, LED ve dijital OOH reklam çözümleri.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-552-918-58-64",
                contactType: "sales",
                email: "satis@objektifkriter.com.tr",
                areaServed: "TR",
                availableLanguage: ["Turkish"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "İstanbul",
                addressCountry: "TR",
              },
              sameAs: [
                "https://www.linkedin.com/company/objekti%CC%87fkri%CC%87ter",
                "https://www.instagram.com/objektifkriter/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}