import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center py-20">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="text-8xl md:text-9xl font-bold text-gradient leading-none">
            404
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Sayfa bulunamadı
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Aradığınız sayfa taşınmış, kaldırılmış ya da hiç var olmamış
              olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/" className="btn-primary">
              <Home size={18} />
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="btn-secondary">
              <ArrowLeft size={18} />
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
