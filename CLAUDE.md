# CLAUDE.md — Objektif Kriter v3
> Bu dosya her Claude Code oturumunda otomatik okunur. Buradaki kurallar tartışmasızdır.

## Proje
- **OK v3**: web-v2 gövdesi + ok-iframe kimliğinin birleşimi. Repo: `hales-byte/ok-website-v2`, branch: **v3**
- Amaç: objektifkriter.com.tr'nin yeni sitesi — statik veri, e-posta lead hattı, programatik SEO
- Planlar: `docs/plan/` (master + teknik + görsel + operasyon). Görev numaraları (T1, G3, A5…) oradan gelir.

## TEK DOĞRULUK KAYNAĞI
- `src/data/envanter.json` → **46 il · 19 mecra türü · 35.235 ünite** (V5 güncellemesi, 2026-09-12)
- Rakam ASLA elle yazılmaz — her sayı bu dosyadan türetilir
- Eski rakam görürsen sil, envanter.json'a bağla. Bayat setler: **36.141 / 44 il / 20 mecra / 42,4M** (V4) · 36.703 / 45 il / 43,1M (V1) · 35.919 · 36.134 · 36.699 · 39/18/35.861 · 47+/8/33.812+

## Yasaklar
1. Supabase, Mapbox veya yeni dış servis eklemek YASAK (tek istisna: Resend)
2. Onaysız commit YASAK — akış: build + preview raporu → Hakan onayı → commit
3. "Tüm repoyu oku/incele" YASAK — sadece görevin dosyalarına dokun
4. İçerik metnini koda gömmek YASAK — metinler `src/data/content/` altında
5. MX kayıtları ve mail ayarlarıyla ilgili hiçbir öneri/değişiklik yapma — o Plan 3'ün işi

## Komutlar
- Doğrulama: `npm run build`
- Deploy: `vercel --prod` (repo kökünden)
- Veri kontrolü: `npm run check:envanter` (beklenen: toplam 35.235, il 46, mecra 19, Ankara 2.946, Adana 845, Bolu 39, Giresun 14)

## SÜREKLİLİK PROTOKOLÜ — her oturumda zorunlu

### Açılışta (otomatik)
1. `DURUM.md`'yi oku: aktif paket, son kalınan yer, blokerler
2. Verilen görev DURUM.md ile çelişiyorsa işe başlamadan ÖNCE söyle

### Kapanışta (paket bitince veya Hakan "kapat" deyince)
1. `DURUM.md` güncelle: biten işi ✓ yap, aktif paketi değiştir, yeni bloker varsa ekle, "Son güncelleme" satırını tazele
2. `GUNLUK.md`'ye girdi ekle — şablon dosyanın başında. **Teknik olmayan dilde**, 3-4 satır
3. Hakan'a **5 satırlık sade Türkçe özet** ver:
   - Ne değişti (tek cümle, jargonsuz)
   - Neden yaptık
   - Ne işe yaradı / neyi çözdü
   - Sırada ne var
   - Hakan'dan ne bekleniyor (onay / karar / girdi / hiçbir şey)

### Dil kuralı
Tüm raporlar sade Türkçe. Teknik terim zorunluysa yanına bir cümle açıklama:
"301 redirect (eski adresi kalıcı olarak yenisine yönlendirme) ekledim."
