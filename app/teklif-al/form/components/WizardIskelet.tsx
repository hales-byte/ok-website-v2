"use client";

import { initialState } from "../state";
import { getStepInfo } from "../step-info";
import { WizardLayout } from "./WizardLayout";
import { Step1Segment } from "./Step1Segment";

const bos = () => {};

/**
 * Formun 1. adım iskeleti — gerçek form tarayıcıda açılana kadar gösterilir.
 * Sunucuda (derleme anında) HTML'e basılır: başlık, açıklama ve adım
 * göstergesi HTML'de hazır gelir. Görünüm gerçek 1. adımla birebir aynı
 * (aynı WizardLayout + Step1Segment) → form devraldığında yerleşim kaymaz.
 * Düğmeler bu aşamada işlevsiz; state/gönderim mantığına dokunmaz.
 */
export function WizardIskelet() {
  const { title, subtitle } = getStepInfo(1);
  return (
    <WizardLayout
      currentStep={1}
      stepTitle={title}
      stepSubtitle={subtitle}
      canGoBack={false}
      canGoForward={false}
      isLastStep={false}
      isSubmitting={false}
      onBack={bos}
      onForward={bos}
      onReset={bos}
    >
      <Step1Segment state={initialState} dispatch={bos} />
    </WizardLayout>
  );
}
