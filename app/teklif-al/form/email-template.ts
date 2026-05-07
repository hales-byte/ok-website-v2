/**
 * Form submit sonrası gönderilen bildirim mailinin gövdesi.
 * Server Action içinden çağrılır; client'a açık değil.
 */

import type { FormState, TalepPayload } from "./types";
import { SEGMENT_LABELS } from "./types";

const SUPABASE_DASHBOARD_BASE =
  "https://supabase.com/dashboard/project/fkagnwhljbkjxihfuccv/editor";

/**
 * HTML escape — özel karakterler (&, <, >, ", ') bozulmasın.
 */
function esc(s: string | null | undefined): string {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtDate(iso: string | undefined | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

type EmailPayload = {
  subject: string;
  html: string;
  text: string;
};

/**
 * Form bildirim mailini hazırlar — subject + html + text fallback.
 */
export function buildNotificationEmail(
  state: FormState,
  payload: TalepPayload
): EmailPayload {
  const segmentLabel = state.segment
    ? SEGMENT_LABELS[state.segment]
    : "Belirsiz";

  const subject = `Yeni Teklif: ${payload.ad_soyad} — ${segmentLabel}`;

  const sehirlerStr = payload.sehirler.length
    ? payload.sehirler.join(", ")
    : "—";
  const formatlarStr = state.oneriIstiyor
    ? "Öneri istiyor (format seçilmedi)"
    : payload.formatlar.length
      ? payload.formatlar.join(", ")
      : "—";
  const butceStr = payload.butce_araligi ?? "—";
  const zamanStr = payload.kampanya_zamani ?? "—";
  const mesajStr = payload.mesaj ?? "";
  const kvkkOnayTarihi = fmtDate(payload.kvkk_onay_tarihi);

  // ─── HTML versiyonu ───
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

    <div style="padding:24px 28px;background:linear-gradient(135deg,#0f766e 0%,#14b8a6 100%);color:#ffffff;">
      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.85;">Objektif Kriter</div>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:600;line-height:1.3;">Yeni teklif talebi geldi</h1>
      <div style="margin-top:6px;font-size:13px;opacity:0.9;">⏱ 30 dakika içinde geri dönüş vaadi var</div>
    </div>

    <div style="padding:24px 28px;">
      <h2 style="margin:0 0 12px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;font-weight:600;">İletişim</h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.6;">
        <tr>
          <td style="padding:6px 0;color:#64748b;width:130px;">Ad Soyad</td>
          <td style="padding:6px 0;font-weight:500;">${esc(payload.ad_soyad)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b;">E-posta</td>
          <td style="padding:6px 0;"><a href="mailto:${esc(payload.email)}" style="color:#0f766e;text-decoration:none;">${esc(payload.email)}</a></td>
        </tr>
        ${
          payload.telefon
            ? `<tr><td style="padding:6px 0;color:#64748b;">Telefon</td><td style="padding:6px 0;"><a href="tel:${esc(payload.telefon)}" style="color:#0f766e;text-decoration:none;">${esc(payload.telefon)}</a></td></tr>`
            : ""
        }
        ${
          payload.sirket
            ? `<tr><td style="padding:6px 0;color:#64748b;">Şirket</td><td style="padding:6px 0;">${esc(payload.sirket)}</td></tr>`
            : ""
        }
        ${
          payload.sektor
            ? `<tr><td style="padding:6px 0;color:#64748b;">Sektör</td><td style="padding:6px 0;">${esc(payload.sektor)}</td></tr>`
            : ""
        }
        <tr>
          <td style="padding:6px 0;color:#64748b;">Segment</td>
          <td style="padding:6px 0;"><span style="display:inline-block;padding:2px 10px;background:#f0fdfa;color:#0f766e;border-radius:999px;font-size:12px;font-weight:500;">${esc(segmentLabel)}</span></td>
        </tr>
      </table>
    </div>

    <div style="padding:0 28px 24px;">
      <h2 style="margin:0 0 12px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;font-weight:600;">Talep Detayları</h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.6;">
        <tr>
          <td style="padding:6px 0;color:#64748b;width:130px;vertical-align:top;">Şehirler</td>
          <td style="padding:6px 0;">${esc(sehirlerStr)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b;vertical-align:top;">Formatlar</td>
          <td style="padding:6px 0;">${esc(formatlarStr)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b;">Bütçe</td>
          <td style="padding:6px 0;">${esc(butceStr)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#64748b;">Zaman</td>
          <td style="padding:6px 0;">${esc(zamanStr)}</td>
        </tr>
      </table>

      ${
        mesajStr.trim()
          ? `<div style="margin-top:16px;padding:14px 16px;background:#f8fafc;border-left:3px solid #0f766e;border-radius:8px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap;"><div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;font-weight:600;margin-bottom:6px;">Mesaj</div>${esc(mesajStr)}</div>`
          : ""
      }
    </div>

    <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6;">
      <div style="margin-bottom:6px;"><strong>KVKK:</strong> Onaylandı (${esc(kvkkOnayTarihi)}, v${esc(payload.aydinlatma_versiyonu ?? "—")})</div>
      <div style="margin-bottom:6px;"><strong>Pazarlama izni:</strong> ${payload.pazarlama_onay ? "Verdi" : "Vermedi"}</div>
      ${payload.ip_address ? `<div style="margin-bottom:6px;"><strong>IP:</strong> ${esc(payload.ip_address)}</div>` : ""}
      ${payload.user_agent ? `<div style="margin-bottom:6px;"><strong>User-Agent:</strong> ${esc(payload.user_agent)}</div>` : ""}
      ${payload.referrer ? `<div style="margin-bottom:6px;"><strong>Referrer:</strong> ${esc(payload.referrer)}</div>` : ""}
    </div>

    <div style="padding:16px 28px 24px;text-align:center;font-size:12px;color:#94a3b8;">
      <a href="${SUPABASE_DASHBOARD_BASE}" style="color:#0f766e;text-decoration:none;">Supabase'te aç</a>
      <span style="margin:0 6px;color:#cbd5e1;">·</span>
      Objektif Kriter — Otomatik bildirim
    </div>
  </div>
</body>
</html>`;

  // ─── Plain text fallback ───
  const text = [
    "YENİ TEKLİF TALEBİ",
    "30 dakika içinde geri dönüş vaadi var.",
    "",
    "İLETİŞİM",
    `  Ad Soyad: ${payload.ad_soyad}`,
    `  E-posta: ${payload.email}`,
    payload.telefon ? `  Telefon: ${payload.telefon}` : null,
    payload.sirket ? `  Şirket: ${payload.sirket}` : null,
    payload.sektor ? `  Sektör: ${payload.sektor}` : null,
    `  Segment: ${segmentLabel}`,
    "",
    "TALEP",
    `  Şehirler: ${sehirlerStr}`,
    `  Formatlar: ${formatlarStr}`,
    `  Bütçe: ${butceStr}`,
    `  Zaman: ${zamanStr}`,
    "",
    mesajStr.trim() ? `MESAJ\n${mesajStr.trim()}\n` : null,
    "KVKK",
    `  Onay: ${kvkkOnayTarihi} (v${payload.aydinlatma_versiyonu ?? "—"})`,
    `  Pazarlama izni: ${payload.pazarlama_onay ? "Verdi" : "Vermedi"}`,
    payload.ip_address ? `  IP: ${payload.ip_address}` : null,
    "",
    "Supabase: " + SUPABASE_DASHBOARD_BASE,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
