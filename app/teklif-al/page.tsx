import { Suspense } from "react";
import type { Metadata } from "next";
import { sayfaMeta } from "@/lib/seo";
import { TeklifWizard } from "./form/components/TeklifWizard";
import { WizardIskelet } from "./form/components/WizardIskelet";

export const metadata: Metadata = sayfaMeta({
  title: "Teklif Al",
  description:
    "OOH reklam kampanyanız için 15 dakika içinde özel lokasyon planı ve teklif. Şehir, mecra ve bütçenizi paylaşın.",
  path: "/teklif-al",
});

export default function TeklifAlPage() {
  return (
    // Form URL parametrelerini (useSearchParams) okuduğu için tarayıcıda çizilir;
    // o sırada sunucuda basılmış 1. adım iskeleti görünür (sayfa statik kalır).
    <Suspense fallback={<WizardIskelet />}>
      <TeklifWizard />
    </Suspense>
  );
}
