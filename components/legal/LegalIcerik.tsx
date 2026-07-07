import Link from "next/link";
import type { LegalDoc, Metin, Parca } from "@/src/data/content/legal/types";

/**
 * Hukuki metin renderer'ı — blok modelini (LegalDoc) mevcut legal sayfa
 * stiline uygun JSX'e çevirir. Markdown kütüphanesi YOK. Server component.
 *
 * Kullanım: <LegalIcerik doc={KVKK_AYDINLATMA} /> — sayfanın <article> gövdesi.
 */

function Satir({ metin }: { metin: Metin }) {
  return (
    <>
      {metin.map((p: Parca, i) => {
        if (p.link) {
          const cls =
            "text-[var(--color-primary)] hover:underline font-medium";
          if (p.dis) {
            return (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {p.metin}
              </a>
            );
          }
          return (
            <Link key={i} href={p.link} className={cls}>
              {p.metin}
            </Link>
          );
        }
        if (p.kalin) {
          return (
            <strong key={i} className="text-[var(--color-text-primary)]">
              {p.metin}
            </strong>
          );
        }
        return <span key={i}>{p.metin}</span>;
      })}
    </>
  );
}

export function LegalIcerik({ doc }: { doc: LegalDoc }) {
  return (
    <article className="max-w-3xl mx-auto space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
      {doc.bloklar.map((blok, i) => {
        switch (blok.tip) {
          case "h2":
            return (
              <h2
                key={i}
                className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] leading-tight pt-6"
              >
                {blok.metin}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] leading-tight pt-2"
              >
                {blok.metin}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-base">
                <Satir metin={blok.icerik} />
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="space-y-2 list-disc pl-5 marker:text-[var(--color-primary)] text-base"
              >
                {blok.ogeler.map((oge, j) => (
                  <li key={j}>
                    <Satir metin={oge} />
                  </li>
                ))}
              </ul>
            );
          case "not":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[var(--color-primary)]/50 bg-[var(--color-surface)]/60 pl-4 py-3 rounded-r-lg text-sm text-[var(--color-text-secondary)]"
              >
                <Satir metin={blok.icerik} />
              </blockquote>
            );
          case "tablo":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full text-sm border border-[var(--color-border-subtle)] rounded-lg">
                  <thead>
                    <tr className="bg-[var(--color-surface)] text-left">
                      {blok.basliklar.map((baslik, j) => (
                        <th
                          key={j}
                          className="px-3 py-2 font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)]"
                        >
                          {baslik}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blok.satirlar.map((satir, r) => (
                      <tr
                        key={r}
                        className="border-b border-[var(--color-border-subtle)] last:border-0 align-top"
                      >
                        {satir.map((hucre, c) => (
                          <td key={c} className="px-3 py-2">
                            {hucre}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </article>
  );
}
