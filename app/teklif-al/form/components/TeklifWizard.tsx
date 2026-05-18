"use client";

import {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { formReducer, initialState } from "../state";
import {
  saveFormState,
  loadFormState,
  clearFormState,
  getStoredProgress,
  type StoredProgress,
} from "../storage";
import { isCurrentStepValid, isFormSubmittable } from "../validation";
import { TOTAL_STEPS } from "../types";
import { submitTeklif } from "../submit-action";
import { titleCaseTr } from "@/lib/sehir-koordinatlari";
import { getFormatByKey } from "@/lib/formats";
import { WizardLayout } from "./WizardLayout";
import { ResumeBanner } from "./ResumeBanner";
import { Step1Segment } from "./Step1Segment";
import { Step2Sehirler } from "./Step2Sehirler";
import { Step3Formatlar } from "./Step3Formatlar";
import { Step4ButceZaman } from "./Step4ButceZaman";
import { Step5Iletisim } from "./Step5Iletisim";
import { Step6Onay } from "./Step6Onay";

/**
 * Multi-step form wizard'ın ana orchestration bileşeni.
 * UX iyileştirmeleri:
 *   - Resume Banner (yarım kalan formdan haberdar et)
 *   - 7 gün veri sıfırlama (storage'da)
 *   - URL deep linking (?step=N)
 *   - Sıfırla butonu
 */
export function TeklifWizard() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [resumeData, setResumeData] = useState<StoredProgress | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  // Spam koruması: honeypot ref (gizli input controlled value, gerçek kullanıcı
  // dolduramaz) + form mount unix timestamp (server-side <3sn submit'leri reddeder).
  // useState lazy init Date.now()'u sadece mount'ta bir kez çağırır — saf değer
  // sonraki render'larda korunur. (useRef'te initializer impure sayılır.)
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formStartTime] = useState(() => Date.now());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL update'larında loop oluşmasın diye guard
  const isInternalUpdate = useRef(false);

  // ─── HYDRATE: localStorage + URL'den initial state ───
  useEffect(() => {
    const saved = loadFormState();
    const progress = getStoredProgress();
    const stepFromUrl = parseInt(searchParams?.get("step") || "1", 10);
    const validStepFromUrl =
      !isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= TOTAL_STEPS;

    // Envanter haritasından deep-link: ?sehir=ANKARA gibi parametre form'u
    // o şehirle başlatır. Title case'e dönüştürüp state'e prefill ediyoruz.
    // localStorage'daki eski state varsa bile URL önceliklidir — kullanıcı
    // "Ankara için teklif al" tıkladıysa Ankara'yı görmek istiyor.
    const sehirFromUrl = searchParams?.get("sehir");
    const sehirPrefill = sehirFromUrl ? [titleCaseTr(sehirFromUrl)] : null;

    // FormatShowcase "Bu formatla teklif al" CTA'sı: ?format=billboard gibi
    // parametre form'u o formatla başlatır. Bilinmeyen key'ler atılır.
    const formatFromUrl = searchParams?.get("format");
    const formatPrefill =
      formatFromUrl && getFormatByKey(formatFromUrl) ? [formatFromUrl] : null;

    if (saved && progress && progress.completedSteps > 0) {
      // localStorage'da kayıt var
      // URL'de sehir/format varsa stored seçimleri override et (taze CTA niyeti)
      const mergedSehirler = sehirPrefill ?? saved.sehirler;
      const mergedFormatlar = formatPrefill ?? saved.formatlar;
      if (validStepFromUrl && stepFromUrl > 1) {
        // URL'de spesifik step → direkt ona git (deep link)
        dispatch({
          type: "LOAD_FROM_STORAGE",
          state: {
            ...saved,
            sehirler: mergedSehirler,
            formatlar: mergedFormatlar,
            currentStep: stepFromUrl,
          },
        });
      } else {
        // URL'de step yok → state'i yükle ama Adım 1'den başla, banner göster
        dispatch({
          type: "LOAD_FROM_STORAGE",
          state: {
            ...saved,
            sehirler: mergedSehirler,
            formatlar: mergedFormatlar,
            currentStep: 1,
          },
        });
        // sehir/format override varsa banner gösterme (kullanıcı yeni akışta)
        if (!sehirPrefill && !formatPrefill) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration: localStorage + URL'i okuyup başlangıç state'ine sokuyoruz, sürekli senkronizasyon yok
          setResumeData(progress);
          setShowBanner(true);
        }
      }
    } else if (validStepFromUrl && stepFromUrl > 1) {
      // localStorage boş ama URL'de step var → URL geçersiz, Adım 1'e zorla
      isInternalUpdate.current = true;
      router.replace(pathname, { scroll: false });
    } else {
      // localStorage boş; URL'den prefill varsa state'e bas
      if (sehirPrefill) {
        dispatch({ type: "SET_SEHIRLER", sehirler: sehirPrefill });
      }
      if (formatPrefill) {
        dispatch({ type: "SET_FORMATLAR", formatlar: formatPrefill });
      }
    }

    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── PERSISTENCE: state değişiminde localStorage'a yaz ───
  useEffect(() => {
    if (hydrated && !state.submitted) {
      saveFormState(state);
    }
  }, [state, hydrated]);

  // ─── URL SYNC: state.currentStep değişince URL'i güncelle ───
  useEffect(() => {
    if (!hydrated) return;
    if (state.submitted) return;

    isInternalUpdate.current = true;
    const newUrl =
      state.currentStep === 1
        ? pathname
        : `${pathname}?step=${state.currentStep}`;
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentStep, hydrated, state.submitted]);

  // ─── HANDLERS ───
  const handleBack = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleForward = useCallback(() => {
    if (isCurrentStepValid(state)) {
      dispatch({ type: "NEXT_STEP" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state]);

  const handleReset = useCallback(() => {
    clearFormState();
    dispatch({ type: "RESET" });
    setShowBanner(false);
    setResumeData(null);
    isInternalUpdate.current = true;
    router.replace(pathname, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResumeFromBanner = useCallback(() => {
    if (resumeData) {
      dispatch({ type: "GO_TO_STEP", step: resumeData.currentStep });
    }
    setShowBanner(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [resumeData]);

  const handleSubmit = useCallback(async () => {
    if (!isFormSubmittable(state)) return;

    dispatch({ type: "SUBMITTING" });

    try {
      const meta = {
        honeypot: honeypotRef.current?.value ?? "",
        formStartTime,
      };
      const result = await submitTeklif(state, meta);

      if (result.success) {
        dispatch({ type: "SUBMITTED" });
        clearFormState();
      } else {
        dispatch({ type: "SUBMIT_ERROR", error: result.error });
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
      dispatch({ type: "SUBMIT_ERROR", error: errorMsg });
    }
  }, [state, formStartTime]);

  // ─── KLAVYE ───
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === "TEXTAREA") return;

      if (e.key === "Enter" && !e.shiftKey) {
        if (target.tagName === "INPUT") return;
        if (isCurrentStepValid(state) && !state.submitting) {
          if (state.currentStep === TOTAL_STEPS) {
            handleSubmit();
          } else {
            dispatch({ type: "NEXT_STEP" });
          }
        }
      } else if (e.key === "Escape" && state.currentStep > 1) {
        dispatch({ type: "PREV_STEP" });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state, handleSubmit]);

  // ─── RENDER ───
  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-border-subtle)] border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (state.submitted) {
    return <SuccessScreen />;
  }

  const stepInfo = getStepInfo(state.currentStep);

  return (
    <>
      {/* RESUME BANNER — yarım kalan formdan haber */}
      {showBanner && resumeData && (
        <ResumeBanner
          step={resumeData.currentStep}
          ageHours={resumeData.ageHours}
          completedSteps={resumeData.completedSteps}
          totalSteps={TOTAL_STEPS}
          onResume={handleResumeFromBanner}
          onReset={handleReset}
        />
      )}

      <WizardLayout
        currentStep={state.currentStep}
        stepTitle={stepInfo.title}
        stepSubtitle={stepInfo.subtitle}
        canGoBack={state.currentStep > 1}
        canGoForward={isCurrentStepValid(state)}
        isLastStep={state.currentStep === TOTAL_STEPS}
        isSubmitting={state.submitting}
        onBack={handleBack}
        onForward={handleForward}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {state.currentStep === 1 && (
          <Step1Segment state={state} dispatch={dispatch} />
        )}
        {state.currentStep === 2 && (
          <Step2Sehirler state={state} dispatch={dispatch} />
        )}
        {state.currentStep === 3 && (
          <Step3Formatlar state={state} dispatch={dispatch} />
        )}
        {state.currentStep === 4 && (
          <Step4ButceZaman state={state} dispatch={dispatch} />
        )}
        {state.currentStep === 5 && (
          <Step5Iletisim state={state} dispatch={dispatch} />
        )}
        {state.currentStep === 6 && (
          <Step6Onay state={state} dispatch={dispatch} />
        )}

        {/*
         * Honeypot input — bot spam koruması.
         * Görünmez (left:-9999px), klavye odaklanamaz (tabIndex=-1),
         * screen reader gizli (aria-hidden), şifre yöneticisi doldurmasın
         * diye autoComplete=off + name="website" (klişe alan).
         * Gerçek kullanıcı dolduramaz; bot otomatik form doldurma yaparken
         * bu alanı dolduracaktır → server-side reject.
         */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label htmlFor="hp-website">Website (boş bırakın)</label>
          <input
            ref={honeypotRef}
            id="hp-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {state.error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-fadeIn">
            <div className="shrink-0 mt-0.5">⚠️</div>
            <div>
              <div className="font-medium mb-1">Talebiniz gönderilemedi</div>
              <div>{state.error}</div>
              <div className="text-xs mt-2 text-red-600">
                Sorun devam ederse{" "}
                <a
                  href="mailto:satis@objektifkriter.com.tr"
                  className="underline font-medium"
                >
                  satis@objektifkriter.com.tr
                </a>{" "}
                üzerinden bize ulaşabilirsiniz.
              </div>
            </div>
          </div>
        )}
      </WizardLayout>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
function getStepInfo(step: number): { title: string; subtitle: string } {
  switch (step) {
    case 1:
      return {
        title: "Kim için kampanya?",
        subtitle:
          "Size en doğru deneyimi sunabilmemiz için kendinizi tanıtmanızı istiyoruz. Tek tıklama yeter.",
      };
    case 2:
      return {
        title: "Hangi şehirler?",
        subtitle:
          "Kampanyanızın görünürlük yapacağı şehirleri seçin. Birden fazla seçebilirsiniz.",
      };
    case 3:
      return {
        title: "Hangi üniteler?",
        subtitle:
          "İlgilendiğiniz reklam ünitelerini seçin. Henüz emin değilseniz \"Bana öner\" seçebilirsiniz.",
      };
    case 4:
      return {
        title: "Bütçe ve zaman?",
        subtitle:
          "Planlama için yaklaşık bir bütçe ve zaman aralığı. Her ikisinde de \"henüz net değil\" seçeneği var.",
      };
    case 5:
      return {
        title: "Sizinle nasıl iletişime geçelim?",
        subtitle:
          "30 dakika içinde geri dönüş yapacağız. Sadece zorunlu alanları doldurmanız yeterli.",
      };
    case 6:
      return {
        title: "Son adım",
        subtitle: "Talebinizi gözden geçirin, KVKK onayını verip gönderin.",
      };
    default:
      return { title: "", subtitle: "" };
  }
}

function SuccessScreen() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="container-narrow max-w-2xl text-center space-y-8">
        <div className="inline-flex w-20 h-20 rounded-full bg-[var(--color-primary)]/10 items-center justify-center mx-auto animate-fadeIn">
          <CheckCircle2
            size={48}
            className="text-[var(--color-primary)]"
            strokeWidth={2}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Talebiniz <span className="text-gradient">ulaştı</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            30 dakika içinde Satış Uzmanımız sizinle iletişime geçecek.
          </p>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
            Soru ve talepleriniz için:{" "}
            <a
              href="mailto:satis@objektifkriter.com.tr"
              className="text-[var(--color-primary)] hover:underline"
            >
              satis@objektifkriter.com.tr
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/" className="btn-secondary">
            Ana Sayfa
          </Link>
          <Link href="/hizmetler" className="btn-primary">
            Hizmetlerimiz
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
