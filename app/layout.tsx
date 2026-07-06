import type { Metadata } from "next";
import { TOPLAM, sayiTr } from "@/src/data/envanter";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

// Display serif — SADECE h1/h2 ve büyük rakamlarda kullanılır (bkz. globals.css)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://objektifkriter.com.tr"),
  title: {
    default: "Objektif Kriter — Türkiye OOH Reklam",
    template: "%s | Objektif Kriter",
  },
  description:
    `Türkiye genelinde ${TOPLAM.il} il, ${sayiTr(TOPLAM.unite)} reklam ünitesi. Billboard, CLP, megalight ve dijital OOH çözümleri.`,
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
      `Türkiye genelinde ${TOPLAM.il} il, ${sayiTr(TOPLAM.unite)} reklam ünitesi için OOH çözümleri.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Objektif Kriter — Türkiye OOH Reklam",
    description:
      `Türkiye genelinde ${TOPLAM.il} il, ${sayiTr(TOPLAM.unite)} reklam ünitesi için OOH çözümleri.`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable}`}>
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
        <WhatsAppFloat />
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
                `Türkiye genelinde ${TOPLAM.il} ilde billboard, CLP, megalight, LED ve dijital OOH reklam çözümleri.`,
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
                "https://www.linkedin.com/company/objektifkriter/",
                "https://www.instagram.com/objektifkriter/",
              ],
            }),
          }}
        />
        {/* LocalBusiness JSON-LD — yerel arama görünürlüğü (T6) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://objektifkriter.com.tr/#localbusiness",
              name: "Objektif Kriter Reklamcılık ve Danışmanlık",
              image: "https://objektifkriter.com.tr/logo.png",
              url: "https://objektifkriter.com.tr",
              telephone: "+905529185864",
              email: "satis@objektifkriter.com.tr",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gümüşsuyu Mah. İnönü Cad. Zampak Apt. No: 7/5",
                addressLocality: "Beyoğlu",
                addressRegion: "İstanbul",
                addressCountry: "TR",
              },
              areaServed: { "@type": "Country", name: "Türkiye" },
              description:
                `Türkiye genelinde ${TOPLAM.il} il, ${TOPLAM.mecra} mecra türü, ${sayiTr(TOPLAM.unite)} reklam ünitesi ile açıkhava reklam ve mecra planlama.`,
            }),
          }}
        />
      </body>
    </html>
  );
}