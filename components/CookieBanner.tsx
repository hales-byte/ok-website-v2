"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Settings } from "lucide-react";

const STORAGE_KEY = "ok-cookie-tercihleri";
const TERCIH_VERSIYONU = "v1";
// Tercihlerin geçerlilik süresi (6 ay = 15768000000 ms)
const SAKLAMA_SURESI_MS = 6 * 30 * 24 * 60 * 60 * 1000;

interface CookieTercihleri {
  versiyon: string;
  zorunlu: true; // her zaman aktif
  islevsel: boolean;
  analitik: boolean;
  pazarlama: boolean;
  tarihTimestamp: number;
}

export function CookieBanner() {
  const [gosterilsin, setGosterilsin] = useState(false);
  const [detayMod, setDetayMod] = useState(false);
  const [islevsel, setIslevsel] = useState(true);
  const [analitik, setAnalitik] = useState(false);
  const [pazarlama, setPazarlama] = useState(false);

  useEffect(() => {
    // Kullanıcı tercihini daha önce kaydetmiş mi kontrol
    try {
      const kayit = localStorage.getItem(STORAGE_KEY);
      if (!kayit) {
        setGosterilsin(true);
        return;
      }

      const tercihler: CookieTercihleri = JSON.parse(kayit);

      // Versiyonu eski veya 6 aydan eski ise tekrar onay iste
      const sureGecti =
        Date.now() - tercihler.tarihTimestamp > SAKLAMA_SURESI_MS;
      const versiyonEski = tercihler.versiyon !== TERCIH_VERSIYONU;

      if (sureGecti || versiyonEski) {
        setGosterilsin(true);
      }
    } catch {
      setGosterilsin(true);
    }
  }, []);

  const tercihKaydet = (tercihler: Omit<CookieTercihleri, "versiyon" | "tarihTimestamp">) => {
    const data: CookieTercihleri = {
      ...tercihler,
      versiyon: TERCIH_VERSIYONU,
      tarihTimestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Cookie tercihi kaydedilemedi:", err);
    }
    setGosterilsin(false);
  };

  const handleHepsiniKabulEt = () => {
    tercihKaydet({
      zorunlu: true,
      islevsel: true,
      analitik: true,
      pazarlama: true,
    });
  };

  const handleSadeceZorunlu = () => {
    tercihKaydet({
      zorunlu: true,
      islevsel: false,
      analitik: false,
      pazarlama: false,
    });
  };

  const handleSeciliKaydet = () => {
    tercihKaydet({
      zorunlu: true,
      islevsel,
      analitik,
      pazarlama,
    });
  };

  if (!gosterilsin) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihleri"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)] backdrop-blur-md shadow-2xl overflow-hidden">

          {/* ANA BANNER (DETAY MODU DEĞİLSE) */}
          {!detayMod && (
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[var(--color-primary)]/15 items-center justify-center shrink-0">
                  <Cookie size={20} className="text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    Çerezleri kullanıyoruz
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    Sitemizde temel işlevler ve deneyiminizi geliştirmek için
                    çerezler kullanıyoruz. Tercihlerinizi yönetebilir veya{" "}
                    <Link
                      href="/cerez-politikasi"
                      className="text-[var(--color-primary)] hover:underline"
                    >
                      Çerez Politikamızı
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={handleHepsiniKabulEt}
                      className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Tümünü Kabul Et
                    </button>
                    <button
                      onClick={handleSadeceZorunlu}
                      className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Sadece Zorunlu
                    </button>
                    <button
                      onClick={() => setDetayMod(true)}
                      className="text-sm font-medium px-4 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center gap-2"
                    >
                      <Settings size={14} />
                      Tercihleri Yönet
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSadeceZorunlu}
                  aria-label="Bildirimi kapat (sadece zorunlu)"
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* DETAY MODU */}
          {detayMod && (
            <div className="p-5 md:p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="space-y-1">
                  <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Settings
                      size={16}
                      className="text-[var(--color-primary)]"
                    />
                    Çerez Tercihleri
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Hangi çerezleri kabul ettiğinizi seçin.
                  </p>
                </div>
                <button
                  onClick={() => setDetayMod(false)}
                  aria-label="Detayları kapat"
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <CerezSeviyesi
                  baslik="Zorunlu Çerezler"
                  aciklama="Sitenin temel işlevleri için gerekli (oturum, güvenlik, form). Devre dışı bırakılamaz."
                  durum={true}
                  zorunlu
                />
                <CerezSeviyesi
                  baslik="İşlevsel Çerezler"
                  aciklama="Site tercihlerinizin (örn. çerez onayı) hatırlanmasını sağlar."
                  durum={islevsel}
                  onChange={setIslevsel}
                />
                <CerezSeviyesi
                  baslik="Analitik Çerezler"
                  aciklama="Anonim istatistiklerle site kalitesinin geliştirilmesine yardımcı olur."
                  durum={analitik}
                  onChange={setAnalitik}
                />
                <CerezSeviyesi
                  baslik="Pazarlama Çerezleri"
                  aciklama="Şu anda kullanılmıyor. Onayınızı saklamak için ayarlanabilir."
                  durum={pazarlama}
                  onChange={setPazarlama}
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-[var(--color-border-subtle)]">
                <button
                  onClick={handleSeciliKaydet}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-2"
                >
                  <Check size={14} />
                  Seçimimi Kaydet
                </button>
                <button
                  onClick={handleHepsiniKabulEt}
                  className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 transition-colors"
                >
                  Tümünü Kabul Et
                </button>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] mt-4">
                Detaylı bilgi için{" "}
                <Link
                  href="/cerez-politikasi"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Çerez Politikası
                </Link>{" "}
                ve{" "}
                <Link
                  href="/gizlilik"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Gizlilik Politikası
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CerezSeviyesi({
  baslik,
  aciklama,
  durum,
  zorunlu = false,
  onChange,
}: {
  baslik: string;
  aciklama: string;
  durum: boolean;
  zorunlu?: boolean;
  onChange?: (val: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
              {baslik}
            </h4>
            {zorunlu && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                Zorunlu
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {aciklama}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={durum}
          aria-label={baslik}
          disabled={zorunlu}
          onClick={() => onChange && onChange(!durum)}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
            durum
              ? "bg-[var(--color-primary)]"
              : "bg-[var(--color-border-subtle)]"
          } ${zorunlu ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              durum ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
