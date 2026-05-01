import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    "Türkiye genelinde 80+ lokasyon, 30.000+ reklam yüzü. Billboard, CLP, megalight ve dijital OOH çözümleri.",
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
      "Türkiye genelinde 80+ lokasyon, 30.000+ reklam yüzü için OOH çözümleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Objektif Kriter — Türkiye OOH Reklam",
    description:
      "Türkiye genelinde 80+ lokasyon, 30.000+ reklam yüzü için OOH çözümleri.",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}