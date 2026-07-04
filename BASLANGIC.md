# BAŞLANGIÇ — OK v3 Cowork Projesi Kullanım Kılavuzu
> Bu proje iki araçla yürür: **Claude Code** (terminal — kodu yazar) ve **Cowork** (bu uygulama — yönetir, denetler, anlatır). Bu dosya nasıl çalışacağımızı anlatır.

## Proje 3 cümlede
Objektif Kriter'in iki ayrı site denemesi tek sitede birleşiyor: çok sayfalı gövde + beğenilen görsel kimlik + bugün çıkarılan gerçek envanter (45 il · 20 mecra · 35.919 ünite). Form mailleri kaybolmayacak, Google'dan şehir bazlı müşteri gelecek. Bittiğinde güncellemek 10 dakikalık iş olacak.

## Doküman haritası — hangi dosya ne işe yarar

| Dosya | Ne işe yarar | Kim günceller |
|---|---|---|
| `CLAUDE.md` | Repo anayasası — her Claude Code oturumu otomatik okur, kurallar + süreklilik protokolü | Değişmez (gerekirse Cowork) |
| `DURUM.md` | **Canlı durum**: neredeyiz, sırada ne var, blokerler. "Bağlam tazeliği" bu dosyadır | Claude Code (her oturum sonu) |
| `GUNLUK.md` | **Sade dille günce**: ne yapıldı / neden / ne işe yaradı. Senin 1 dakikalık özetin | Claude Code (her oturum sonu) |
| `docs/plan/OK_v3_Birlestirme_Plani.md` | Master plan (fazlar, riskler, kaynak stratejisi) | Cowork |
| `docs/plan/OK_v3_Plan_1_Teknik.md` | T0-T7 oturumları + hazır promptlar | Cowork |
| `docs/plan/OK_v3_Plan_2_Gorsel_Tasarim.md` | G0-G7 görsel revizyon akışı | Cowork |
| `docs/plan/OK_v3_Plan_3_Operasyon_Icerik_Cutover.md` | O0-O6: hesaplar, içerik, DNS, bakım | Cowork |
| `src/data/envanter.json` | TEK doğruluk kaynağı (45/20/35.919) | Sadece yeni envanter gelince |

## Bağlam tazeliği nasıl çalışır (otomatik)

**Claude Code tarafı:** Her oturum `CLAUDE.md`'yi otomatik okur → o da `DURUM.md`'ye bakmayı zorunlu kılar. Yani her oturum "neredeyiz"i bilerek başlar; hiçbir şeyi baştan anlatmazsın. Oturum sonunda `DURUM.md` + `GUNLUK.md` güncellenir — bilgi hep taze.

**Cowork tarafı (ben):** İki yol —
1. **Önerilen:** Proje klasörünü Cowork'e bağla (klasör seç). O zaman "durum" yazman yeter; DURUM.md ve GUNLUK.md'yi kendim okur, sade özet + sonraki adımın hazır prompt'unu veririm.
2. Alternatif: Claude Code'un oturum kapanış özetini bana yapıştırırsın.
Ayrıca önemli kararları kendi kalıcı hafızama işliyorum — oturumlar arası unutma olmaz.

## Oturum ritüeli (her Claude Code oturumu)

**Açılış:** Terminal → `cd /tmp/web-v2 && claude` → plandaki paketin prompt'unu yapıştır (promptları ben hazır veriyorum).

**Kapanış:** Paket bitince şunu yapıştır:

```
Oturumu kapatıyoruz:
1) DURUM.md'yi güncelle (biten iş, aktif paket, blokerler, son güncelleme satırı)
2) GUNLUK.md'ye şablona uygun girdi ekle (teknik dil yok)
3) Bana 5 satırlık sade özet ver: ne değişti / neden / ne işe yaradı / sırada ne / benden ne bekleniyor
```

**Cowork check-in:** Özeti bana getir (veya klasör bağlıysa "durum" yaz) → ben: denetim + varsa düzeltme + sonraki paketin hazır prompt'u.

## İlk gün — adım adım

1. Bu klasördeki tüm dosyaları indir → `~/Downloads/ok-v3-docs/` klasörüne koy (envanter.json dahil)
2. Terminal → `claude` → **Plan 1'deki T0 prompt'unu** yapıştır (dosyaları repoya yerleştirir, build'i doğrular, süreklilik protokolünü başlatır)
3. T0 kapanış ritüeli → özeti bana getir
4. Ben T1 prompt'unu veririm → devam

## Karar bekleyenler (senden)

| Karar | Ne zaman lazım |
|---|---|
| G0: Tasarım kimliği (koyu editorial / aydınlık+koyu vurgu — önerim ikincisi) | G1'den önce; T'leri bloklamaz |
| Fotoğraflar `photos/formats/` klasörüne | G4'ten önce (kısmî olur) |
| Tufan'a O0 soruları (MX + registrar) — mesaj taslağını benden iste | Cutover randevusundan önce |
| G4: Fiyat göster/gösterme | G4 başında |
