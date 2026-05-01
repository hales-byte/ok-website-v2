export default function Loading() {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-6">
          {/* Pulse spinner */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-border-subtle)]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-primary)] animate-spin" />
          </div>
          <p className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
            Yükleniyor
          </p>
        </div>
      </section>
    );
  }