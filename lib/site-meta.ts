
/**
 * Site genelinde sabit "son güncelleme" tarihleri.
 *
 * Sitemap `lastmod` değerleri için kullanılır. Google bot'u "her sayfa
 * her gün değişti" sinyaliyle yanıltmamak için bu tarihler içerik
 * gerçekten değiştiğinde güncellenir.
 */
import { ENVANTER } from "@/src/data/envanter";

/**
 * Envanter datasının son revizyon tarihi — envanter.json'daki "guncelleme"
 * alanından OTOMATİK türetilir. Envanter değişince sitemap kendiliğinden
 * doğru tarihi alır; elle güncelleme yok.
 */
export const INVENTORY_REVISION = new Date(ENVANTER.guncelleme);

/** Statik içerik sayfalarının (hizmetler, hakkımızda, vb.) son revizyon tarihi.
 *  v3 birleştirmesiyle içerik yenilendi: 2026-07-04. İçerik değişince güncelle. */
export const CONTENT_REVISION = new Date("2026-07-04");
