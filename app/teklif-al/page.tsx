import { Suspense } from "react";
import type { Metadata } from "next";
import { sayfaMeta } from "@/lib/seo";
import { TeklifWizard } from "./form/components/TeklifWizard";

export const metadata: Metadata = sayfaMeta({
  title: "Teklif Al",
  description:
    "OOH reklam kampanyanız için 15 dakika içinde özel lokasyon planı ve teklif. Şehir, mecra ve bütçenizi paylaşın.",
  path: "/teklif-al",
});

export default function TeklifAlPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--color-border-subtle)] border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      }
    >
      <TeklifWizard />
    </Suspense>
  );
}
