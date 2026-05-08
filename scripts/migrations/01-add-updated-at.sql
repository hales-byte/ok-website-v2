-- Migration: envanter tablosuna updated_at kolonu + auto-update trigger
--
-- Etki: Sitemap.xml'de her satırın gerçek son değişiklik tarihini gösterir.
-- Şu an lib/site-meta.ts'teki INVENTORY_REVISION sabit tarih fallback olarak
-- kullanılıyor. Bu migration uygulanınca sitemap.ts otomatik DB tarihlerini
-- kullanmaya geçer (ek kod değişikliği gerekmiyor).
--
-- Uygulama yöntemleri:
--   A) Supabase Dashboard → SQL Editor → bu dosyayı yapıştır → Run
--   B) supabase CLI ile:
--      supabase db push --include-all   (proje linkliyse)
--   C) psql ile direkt:
--      psql "$SUPABASE_DB_URL" -f scripts/migrations/01-add-updated-at.sql
--
-- Geri al (rollback):
--   ALTER TABLE website.envanter DROP COLUMN updated_at;
--   DROP FUNCTION IF EXISTS website.set_updated_at();

BEGIN;

-- 1. Kolonu ekle (mevcut satırlar için NOW() ile başlat)
ALTER TABLE website.envanter
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT NOW();

-- 2. Trigger fonksiyonu — UPDATE'de updated_at'i otomatik tazele
CREATE OR REPLACE FUNCTION website.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Trigger'ı bağla
DROP TRIGGER IF EXISTS trg_envanter_updated_at ON website.envanter;
CREATE TRIGGER trg_envanter_updated_at
BEFORE UPDATE ON website.envanter
FOR EACH ROW
EXECUTE FUNCTION website.set_updated_at();

-- 4. anon rol için ekstra grant gerekmez (mevcut SELECT yeterli — RLS aktif)

COMMIT;

-- Doğrulama (opsiyonel, ayrı çalıştır):
-- SELECT sehir, format_kategori, updated_at FROM website.envanter LIMIT 5;
