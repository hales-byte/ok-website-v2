/**
 * İl sayfası JSON-LD şemaları — Service + BreadcrumbList + (varsa) FAQPage.
 * Salt şema enjeksiyonu; veriyi il-derive'dan türetir.
 */
import type { SSSMaddesi } from "@/src/data/content/sss";
import { buildIlJsonLd, buildFaqJsonLd } from "./il-derive";

export function IlSchema({
  slug,
  sssMaddeler,
}: {
  slug: string;
  sssMaddeler: SSSMaddesi[];
}) {
  const jsonLd = buildIlJsonLd(slug);
  return (
    <>
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.service) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
          />
        </>
      )}
      {sssMaddeler.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(sssMaddeler)) }}
        />
      )}
    </>
  );
}
