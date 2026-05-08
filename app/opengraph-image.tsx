import { ImageResponse } from "next/og";

/**
 * Site geneli Open Graph image (1200×630).
 * Sosyal paylaşımlarda (LinkedIn, WhatsApp, X, Slack) görünür.
 *
 * Brand renkleri (`globals.css`'teki CSS değişkenleriyle aynı):
 *   primary-deep #017A8A → primary #01B5CC → light #00CCE4
 *   bg #FFFFFF, text-primary #0F172A
 */

export const alt = "Objektif Kriter — Türkiye OOH Reklam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Sol üst gradient blob */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(1,181,204,0.35) 0%, rgba(1,181,204,0) 70%)",
            display: "flex",
          }}
        />
        {/* Sağ alt gradient blob */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(1,122,138,0.28) 0%, rgba(1,122,138,0) 70%)",
            display: "flex",
          }}
        />

        {/* OBJEKTİF KRİTER — küçük üst etiket */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#017A8A",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>›››››››</span>
          <span>OBJEKTİF KRİTER</span>
        </div>

        {/* Spacer — kalan alanı ortalayacak */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Ana başlık */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0F172A",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            zIndex: 1,
            marginBottom: 32,
          }}
        >
          <span>
            Doğru lokasyonda
            <span style={{ color: "#017A8A" }}>,</span>
          </span>
          <span>
            Doğru zamanda
            <span style={{ color: "#017A8A" }}>,</span>
          </span>
          <span style={{ color: "#017A8A" }}>Doğru kitleye.</span>
        </div>

        {/* Alt etiket — "47+ şehir, 33.812+ reklam yüzü" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            color: "#475569",
            fontSize: 32,
            fontWeight: 500,
            zIndex: 1,
          }}
        >
          <span>47+ şehir</span>
          <span style={{ color: "#94A3B8" }}>•</span>
          <span>33.812+ reklam yüzü</span>
          <span style={{ color: "#94A3B8" }}>•</span>
          <span>Türkiye OOH Reklam</span>
        </div>
      </div>
    ),
    size,
  );
}
