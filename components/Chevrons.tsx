/**
 * Chevron akış motifi — ">>>" cyan akış animasyonu.
 * Kimlik: Seçenek B hero motifi (kaynak: ok-iframe hero).
 * Renk `currentColor` üzerinden cyan; stil app/globals.css `.chev-flow` bloğunda.
 * prefers-reduced-motion: akış durur (globals.css @media reduce).
 */

function Chevron() {
  return (
    <svg
      className="chev"
      viewBox="0 0 16 28"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4l9 10-9 10" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Chevrons({
  count = 6,
  width = 320,
  className = "",
}: {
  /** Görünen chevron sayısı (desen 2× tekrarlanır, kesintisiz döngü için) */
  count?: number;
  /** Piksel genişlik (mask + overflow penceresi) */
  width?: number;
  className?: string;
}) {
  // translateX(-50%) döngüsü için desen iki kez basılır.
  const chevrons = Array.from({ length: count * 2 });

  return (
    <div
      className={`chev-flow ${className}`}
      style={{ width, maxWidth: "80%", height: 28 }}
      aria-hidden="true"
    >
      <div className="chev-track">
        {chevrons.map((_, i) => (
          <Chevron key={i} />
        ))}
      </div>
    </div>
  );
}
