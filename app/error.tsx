"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Sayfa hatası:", error);
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center py-20">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <AlertTriangle
              size={40}
              className="text-[var(--color-primary)]"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Bir şeyler ters gitti
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Beklenmeyen bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilir
              ya da ana sayfaya dönebilirsiniz.
            </p>
            {error.digest && (
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Hata kodu: {error.digest}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={reset} className="btn-primary">
              <RefreshCw size={18} />
              Tekrar Dene
            </button>
            <Link href="/" className="btn-secondary">
              <Home size={18} />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
