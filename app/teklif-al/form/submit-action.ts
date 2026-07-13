"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import type { FormState, TalepPayload } from "./types";
import {
  BUTCE_LABELS,
  ZAMAN_LABELS,
} from "./types";
import { buildNotificationEmail } from "./email-template";
import { AYDINLATMA_VERSIYONU } from "@/lib/kvkk";

/**
 * Hata loglarında PII echo'sunu engellemek için Resend/FormSubmit hata
 * objesinden sadece kod + mesaj çekilir. Saldırgan recon değeri en aza
 * indirilir, KVKK m.12 veri güvenliği prensibine uyum sağlanır.
 */
function safeErrorInfo(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { code?: string; message?: string; status?: number };
    const parts: string[] = [];
    if (e.code) parts.push(`code=${e.code}`);
    if (typeof e.status === "number") parts.push(`status=${e.status}`);
    if (e.message) parts.push(`message=${e.message.slice(0, 200)}`);
    return parts.length > 0 ? parts.join(" ") : "unknown error";
  }
  return String(err).slice(0, 200);
}

/**
 * Defense-in-depth: server-side payload schema. Gerçek browser kullanıcısı
 * bu sınırlardan rahat geçer; saldırgan/bot devasa string veya kötü tip
 * gönderirse erken kapı kapanır. Sınırlar UI maxLength ile uyumlu — UI
 * client-side aynı disiplini uygular ama bypass edilebilir.
 */
const TalepSchema = z.object({
  segment: z.enum(["marka", "ajans", "ilk"]).nullable(),
  sehirler: z.array(z.string().min(1).max(80)).max(50),
  formatlar: z.array(z.string().min(1).max(40)).max(20),
  oneriIstiyor: z.boolean(),
  butce: z
    .enum([
      // İlk-kez küçük işletme bantları (segment === "ilk")
      "ilk_5_15k",
      "ilk_15_40k",
      "ilk_40_100k",
      // Marka / ajans bantları
      "100k_alti",
      "100_250k",
      "250_500k",
      "500k_1m",
      "1m_uzeri",
      "belirsiz",
    ])
    .nullable(),
  zaman: z.enum(["acil", "bu_ay", "1_3_ay", "3_6_ay", "belirsiz"]).nullable(),
  iletisim: z.object({
    adsoyad: z.string().trim().min(2).max(120),
    email: z.string().trim().toLowerCase().email().max(254),
    telefon: z.string().trim().max(25),
    sirket: z.string().trim().max(160),
    sektor: z.string().trim().max(80),
  }),
  // Ajans-spesifik mini-blok (Step5'te yalnızca segment === "ajans"
  // iken görünür). DB'de ayrı sütunu yok — buildMesaj mesaj alanına
  // embed eder. Schema burada üç alanı doğrular: marka adı text,
  // kreatif & iletişim enum (null olabilir).
  ajansBilgisi: z.object({
    musteriMarka: z.string().trim().max(120),
    kreatifDurum: z.enum(["hazir", "yardim"]).nullable(),
    dogrudanIletisim: z.enum(["evet", "hayir"]).nullable(),
  }),
  mesaj: z.string().max(2000),
  kvkk: z.literal(true),
  pazarlama: z.boolean(),
});

/**
 * Spam koruma metası — client'tan gelir ama doğrulanır:
 * - honeypot: gizli input (görünmez); bot doldurursa reject
 * - formStartTime: form mount unix timestamp; submit < 3sn sonraysa bot
 */
export type SubmitMeta = {
  honeypot?: string;
  formStartTime?: number;
};

const MIN_FORM_DURATION_MS = 3000;

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Formu e-postayla satış ekibine ileten Server Action (Supabase kaldırıldı — lead hattı: Resend, yedek: FormSubmit).
 * Server-side çalışır, IP/user-agent bilgilerini güvenli şekilde alır.
 *
 * `meta` parametresi spam korumalarını içerir (honeypot + form-fill duration).
 * Eski çağrı imzası (`submitTeklif(state)`) hâlâ çalışır — meta opsiyonel.
 */
export async function submitTeklif(
  state: FormState,
  meta?: SubmitMeta
): Promise<SubmitResult> {
  // ─── Honeypot: gizli input boş gelmiyorsa bot ───
  // Generic mesaj — saldırgan hangi kontrolün yakaladığını anlamasın.
  if (meta?.honeypot && meta.honeypot.length > 0) {
    return { success: false, error: "Talep işlenemedi. Lütfen tekrar deneyin." };
  }

  // ─── Min duration: form mount → submit < 3sn ise bot ───
  if (meta?.formStartTime && typeof meta.formStartTime === "number") {
    const elapsed = Date.now() - meta.formStartTime;
    if (elapsed >= 0 && elapsed < MIN_FORM_DURATION_MS) {
      return { success: false, error: "Talep işlenemedi. Lütfen tekrar deneyin." };
    }
  }

  // ─── Schema validation: tip + uzunluk + KVKK literal kontrolü ───
  const parsed = TalepSchema.safeParse(state);
  if (!parsed.success) {
    // Generic kullanıcı mesajı; detay sadece log'a (PII içerebilir, kısıt 200 char).
    const issue = parsed.error.issues[0];
    console.error(
      "Form schema validation hatası:",
      `path=${issue?.path.join(".")} code=${issue?.code}`
    );
    return {
      success: false,
      error:
        "Form bilgilerinde geçersiz bir alan var. Lütfen kontrol edip tekrar deneyin.",
    };
  }

  // ─── Request headers'tan ek bilgiler ───
  let ip: string | null = null;
  let userAgent: string | null = null;
  let referrer: string | null = null;

  try {
    const h = await headers();
    // x-forwarded-for liste olabilir, ilkini al
    const xff = h.get("x-forwarded-for");
    ip = xff ? xff.split(",")[0].trim() : h.get("x-real-ip") || null;
    userAgent = h.get("user-agent") || null;
    referrer = h.get("referer") || null;
  } catch {
    // Headers alınamazsa devam et, kritik değil
  }

  // ─── Payload hazırla (e-posta şablonunun beklediği yapı) ───
  const payload: TalepPayload = {
    ad_soyad: state.iletisim.adsoyad.trim(),
    email: state.iletisim.email.trim().toLowerCase(),
    sirket: state.iletisim.sirket.trim() || null,
    telefon: state.iletisim.telefon.trim() || null,
    sektor: state.iletisim.sektor.trim() || null,
    sehirler: state.sehirler,
    formatlar: state.oneriIstiyor ? [] : state.formatlar,
    butce_araligi: state.butce ? BUTCE_LABELS[state.butce] : null,
    kampanya_zamani: state.zaman ? ZAMAN_LABELS[state.zaman] : null,
    mesaj: buildMesaj(state),
    kvkk_onay: state.kvkk,
    pazarlama_onay: state.pazarlama,
    segment: state.segment,
    ip_address: ip || undefined,
    user_agent: userAgent || undefined,
    referrer: referrer || undefined,
    kvkk_onay_tarihi: new Date().toISOString(),
    aydinlatma_versiyonu: AYDINLATMA_VERSIYONU,
  };

  // ─── LEAD HATTI (kritik yol): Resend → satis@ · yedek: FormSubmit ───
  // Veritabanı YOK — talep ancak e-posta ulaşırsa "alındı" sayılır.
  // Bu yüzden gönderim hatası kullanıcıya açıkça bildirilir.
  const gonderildi = await sendNotificationEmail(state, payload);

  if (!gonderildi) {
    return {
      success: false,
      error:
        "Talebiniz şu anda iletilemedi. Lütfen tekrar deneyin veya bize WhatsApp / satis@objektifkriter.com.tr üzerinden ulaşın.",
    };
  }

  return {
    success: true,
  };
}

/**
 * Bildirim mailini gönderir — dönüş değeri lead'in ulaşıp ulaşmadığıdır.
 *
 * 1. RESEND_API_KEY varsa Resend ile gönderir.
 *    - RESEND_TO verilmemişse varsayılan alıcı: satis@objektifkriter.com.tr
 *    - RESEND_FROM verilmemişse Resend'in onboarding göndericisi kullanılır
 *      (domain doğrulaması cutover randevusunda yapılacak — o güne kadar
 *      default gönderici NORMALDİR, bkz. docs/plan Plan 1 / T5 notu).
 * 2. API anahtarı yoksa veya Resend hata verirse FormSubmit yedeği devreye
 *    girer (ek hesap/servis gerektirmez, e-posta relay'idir).
 */
const VARSAYILAN_ALICI = "satis@objektifkriter.com.tr";

async function sendNotificationEmail(
  state: FormState,
  payload: TalepPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Objektif Kriter <onboarding@resend.dev>";
  const toList = (process.env.RESEND_TO || VARSAYILAN_ALICI)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const { subject, html, text } = buildNotificationEmail(state, payload);

  // ── 1) Resend (birincil) ──
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from,
        to: toList.length === 1 ? toList[0] : toList,
        replyTo: payload.email, // Kullanıcıya direkt yanıt için
        subject,
        html,
        text,
      });
      if (!result.error) return true;
      console.error("Resend gönderim hatası:", safeErrorInfo(result.error));
    } catch (e) {
      console.error("Resend hatası (catch):", safeErrorInfo(e));
    }
  } else {
    console.warn("RESEND_API_KEY yok — FormSubmit yedeğine geçiliyor.");
  }

  // ── 2) FormSubmit (yedek) ──
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${VARSAYILAN_ALICI}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          _template: "box",
          _replyto: payload.email,
          mesaj: text,
        }),
      }
    );
    if (res.ok) return true;
    console.error("FormSubmit hatası: status=" + res.status);
  } catch (e) {
    console.error("FormSubmit hatası (catch):", safeErrorInfo(e));
  }

  return false;
}

/**
 * Kullanıcının yazdığı mesaja meta bilgi (öneri istiyor mu vs.) ekler.
 * Form'da görünmeyen ama backend için faydalı bilgileri buraya yedirir.
 *
 * Ajans bilgisi (segment === "ajans" iken) DB'de ayrı kolon olmadığı için
 * buraya embed edilir — satış ekibinin tek bakışta triage edebilmesi için
 * mesajın başında etiketli bir blok olarak görünür.
 */
function buildMesaj(state: FormState): string | null {
  const parts: string[] = [];

  // Ajans bilgisi bloğu — yalnızca segment === "ajans" ve en az bir alan
  // doldurulmuşsa eklenir. Boş bir ajansBilgisi mesaja gürültü katmasın.
  if (state.segment === "ajans") {
    const a = state.ajansBilgisi;
    const hasAnyData =
      a.musteriMarka.trim().length > 0 ||
      a.kreatifDurum !== null ||
      a.dogrudanIletisim !== null;

    if (hasAnyData) {
      const ajansLines: string[] = ["[Ajans Bilgisi]"];
      if (a.musteriMarka.trim()) {
        ajansLines.push(`- Müşteri marka: ${a.musteriMarka.trim()}`);
      }
      if (a.kreatifDurum) {
        const kreatifLabel =
          a.kreatifDurum === "hazir"
            ? "Tasarım hazır"
            : "Tasarım için yardım istiyor";
        ajansLines.push(`- Kreatif: ${kreatifLabel}`);
      }
      if (a.dogrudanIletisim) {
        const iletisimLabel =
          a.dogrudanIletisim === "evet"
            ? "Müşteriyle DİREKT iletişim isteniyor"
            : "Sadece ajans üzerinden iletişim (varsayılan)";
        ajansLines.push(`- Müşteri ile iletişim: ${iletisimLabel}`);
      }
      parts.push(ajansLines.join("\n"));
    }
  }

  if (state.oneriIstiyor) {
    parts.push("[Mecra konusunda öneri istiyor — bütçe ve hedefe göre planlanacak]");
  }

  if (state.mesaj.trim()) {
    parts.push(state.mesaj.trim());
  }

  return parts.length > 0 ? parts.join("\n\n") : null;
}
