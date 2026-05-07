"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { FormState, TalepPayload } from "./types";
import {
  BUTCE_LABELS,
  ZAMAN_LABELS,
} from "./types";
import { buildNotificationEmail } from "./email-template";

/**
 * Aydınlatma metni versiyonu — KVKK kaydı için.
 * Aydınlatma metni güncellendiğinde bu değer de güncellenmeli.
 */
const AYDINLATMA_VERSIYONU = "v1-2026-05";

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Form'u Supabase'e kaydeden Server Action.
 * Server-side çalışır, IP/user-agent bilgilerini güvenli şekilde alır.
 */
export async function submitTeklif(
  state: FormState
): Promise<SubmitResult> {
  // ─── Server-side validation ───
  if (!state.kvkk) {
    return {
      success: false,
      error: "KVKK onayı zorunludur.",
    };
  }

  if (!state.iletisim.email || !state.iletisim.adsoyad) {
    return {
      success: false,
      error: "Ad soyad ve e-posta zorunludur.",
    };
  }

  // E-posta format kontrolü (server-side de)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(state.iletisim.email.trim())) {
    return {
      success: false,
      error: "Geçerli bir e-posta adresi girin.",
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

  // ─── Supabase client (anon key) ───
  // RLS policy talepler INSERT'e izin veriyor olmalı
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env değişkenleri eksik");
    return {
      success: false,
      error: "Sistem hatası. Lütfen bizi e-posta ile bilgilendirin.",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // ─── Payload hazırla ───
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

  // ─── Insert ───
  // NOT: .select() / .single() KASITLI olarak kullanılmıyor.
  // anon role'a column-level INSERT verilmiş ama SELECT yok; RETURNING SELECT
  // gerektirir ve "permission denied for table talepler" (42501) hatası fırlatır.
  // talep_id istemcide kullanılmıyor, INSERT yeterli.
  const { error } = await supabase
    .schema("website")
    .from("talepler")
    .insert(payload);

  if (error) {
    console.error("Supabase insert hatası:", error);
    return {
      success: false,
      error:
        "Talebiniz kaydedilemedi. Lütfen tekrar deneyin veya bize e-posta gönderin.",
    };
  }

  // ─── Bildirim maili (best-effort) ───
  // DB insert başarılı oldu — talep kaydı güvende. Mail gönderimi başarısız
  // olursa kullanıcıya success dönmeye devam ederiz; sadece sunucu log'una
  // hata düşer ki manuel takip edebilelim.
  await sendNotificationEmail(state, payload);

  return {
    success: true,
  };
}

/**
 * Resend ile bildirim mailini gönderir. Hata olursa sessizce yutar — DB'de
 * talep zaten var, kullanıcı deneyimi bozulmasın. Sunucu log'una düşer.
 */
async function sendNotificationEmail(
  state: FormState,
  payload: TalepPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;

  if (!apiKey || !from || !to) {
    // Env eksikse sessizce atla — geliştirme/test ortamında normal
    console.warn(
      "Resend env değişkenleri eksik; mail bildirimi gönderilmedi."
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { subject, html, text } = buildNotificationEmail(state, payload);

    const result = await resend.emails.send({
      from,
      to,
      replyTo: payload.email, // Kullanıcıya direkt yanıt için
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend gönderim hatası:", result.error);
    }
  } catch (e) {
    console.error("Mail bildirim hatası (catch):", e);
  }
}

/**
 * Kullanıcının yazdığı mesaja meta bilgi (öneri istiyor mu vs.) ekler.
 * Form'da görünmeyen ama backend için faydalı bilgileri buraya yedirir.
 */
function buildMesaj(state: FormState): string | null {
  const parts: string[] = [];

  if (state.oneriIstiyor) {
    parts.push("[Format konusunda öneri istiyor — bütçe ve hedefe göre planlanacak]");
  }

  if (state.mesaj.trim()) {
    parts.push(state.mesaj.trim());
  }

  return parts.length > 0 ? parts.join("\n\n") : null;
}
