import Image from "next/image";
import Link from "next/link";

const sizes = {
  sm: { width: 140, height: 50 },
  md: { width: 200, height: 70 },
  lg: { width: 320, height: 110 },
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
  href?: string | null;
  className?: string;
  /**
   * Marka kiti "Zemin Varyasyonları" kuralı:
   *  - false (varsayılan) → açık zemin: antrasit yazı + degrade oklar, saydam fon
   *  - true → koyu zemin (negatif): beyaz yazı, "İ" noktaları ve oklar cyan kalır
   * Koyu bant (`.band-dark`) üzerinde HER ZAMAN negatif kullanılır; beyaz fonlu
   * logoyu koyu zemine koymak kiti ihlal eder (beyaz kutu efekti).
   */
  negatif?: boolean;
}

export function Logo({
  size = "md",
  href = "/",
  className = "",
  negatif = false,
}: LogoProps) {
  const { width, height } = sizes[size];

  const image = (
    <Image
      src={negatif ? "/logo-negatif.png" : "/logo-acik.png"}
      alt="Objektif Kriter"
      width={width}
      height={height}
      priority
      style={{ height: "auto", width: "auto", maxHeight: `${height}px` }}
    />
  );

  if (href === null) {
    return <div className={`inline-flex items-center ${className}`}>{image}</div>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
      aria-label="Objektif Kriter ana sayfa"
    >
      {image}
    </Link>
  );
}