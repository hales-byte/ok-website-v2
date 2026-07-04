import { ImageResponse } from "next/og";
import { getFormatByKey } from "@/lib/formats";
import { getIl, getIlFormatAdet, sayiTr } from "@/src/data/envanter";

/**
 * /sehir/[slug]/[format] sayfası için unique OG image (1200×630).
 * Şehir + format + lokasyon sayısı + reklam yüzü dinamik olarak görselde
 * yer alır. Sosyal paylaşımda ("Ankara'da Billboard reklam — 18 lokasyon
 * 2.946 yüz") rakip Wix sitelerinden anlamlı bir adım önde.
 */

export const alt = "Şehir + format reklam çözümleri — Objektif Kriter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getDetay(slug: string, format: string) {
  const il = getIl(slug);
  if (!il) return null;
  const adet = getIlFormatAdet(slug, format);
  if (adet <= 0) return null;
  return { sehir: il.il, adet };
}

export default async function Image({
  params,
}: {
  params: { slug: string; format: string };
}) {
  const formatMeta = getFormatByKey(params.format);
  const detay = getDetay(params.slug, params.format);

  // Veri yoksa default brand görseli
  const sehirAdi = detay?.sehir ?? "—";
  const formatAdi = formatMeta?.name ?? params.format;
  const lokasyonText = detay
    ? `${sayiTr(detay.adet)} reklam ünitesi`
    : "Türkiye OOH";

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
            top: -180,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(1,181,204,0.32) 0%, rgba(1,181,204,0) 70%)",
            display: "flex",
          }}
        />
        {/* Sağ alt gradient blob */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(1,122,138,0.25) 0%, rgba(1,122,138,0) 70%)",
            display: "flex",
          }}
        />

        {/* Üst etiket */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#0369A1",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>›››››››</span>
          <span>OBJEKTİF KRİTER</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Şehir badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 24px",
            background: "rgba(1,122,138,0.1)",
            color: "#0369A1",
            fontSize: 26,
            fontWeight: 600,
            borderRadius: 999,
            alignSelf: "flex-start",
            marginBottom: 28,
            zIndex: 1,
          }}
        >
          {/* Lucide MapPin SVG inline — emoji yerine glyph fallback olmasın diye */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0369A1"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx={12} cy={10} r={3} />
          </svg>
          <span>{sehirAdi}</span>
        </div>

        {/* Başlık */}
        <div
          style={{
            display: "flex",
            color: "#0F172A",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            zIndex: 1,
            marginBottom: 24,
          }}
        >
          <span>
            <span style={{ color: "#0369A1" }}>{formatAdi}</span>
            <span> Reklam</span>
          </span>
        </div>

        {/* Alt etiket */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#475569",
            fontSize: 30,
            fontWeight: 500,
            zIndex: 1,
          }}
        >
          <span>{lokasyonText}</span>
        </div>
      </div>
    ),
    size,
  );
}
