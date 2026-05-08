/**
 * Site genelinde sabit "son güncelleme" tarihleri.
 *
 * Sitemap `lastmod` değerleri için kullanılır. Google bot'u "her sayfa
 * her gün değişti" sinyaliyle yanıltmamak için bu sabit tarihleri
 * envanter veya statik içerik gerçekten değiştiğinde güncelle.
 *
 * Tercih sırası (sitemap.ts'te):
 *   1. Supabase'den gelen `envanter.updated_at` (eğer DB'de varsa)
 *   2. Buradaki `INVENTORY_REVISION` (fallback)
 *
 * Migration ile `updated_at` eklendiğinde (1) otomatik kullanılır.
 * Migration: scripts/migrations/01-add-updated-at.sql
 */

/** Envanter datasının (şehir, format, lokasyon sayısı, reklam yüzü) son revizyon tarihi. */
export const INVENTORY_REVISION = new Date("2026-05-08");

/** Statik içerik sayfalarının (hizmetler, hakkımızda, vb.) son revizyon tarihi. */
export const CONTENT_REVISION = new Date("2026-05-08");
