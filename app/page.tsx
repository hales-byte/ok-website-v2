import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { count, error } = await supabase
    .schema("website")
    .from("envanter")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 container-narrow">
        <h1 className="text-6xl font-bold">
          <span className="text-gradient">Objektif Kriter</span>
        </h1>
        <p className="text-xl text-text-secondary">
          Türkiye OOH reklam ağı
        </p>

        {error ? (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-500 rounded-lg text-left">
            <p className="text-red-400 font-bold mb-2">Hata oluştu:</p>
            <pre className="text-red-300 text-xs overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="space-y-4 pt-8">
            <p className="text-7xl font-bold text-primary">
              {count}
            </p>
            <p className="text-sm text-text-muted uppercase tracking-widest">
              aktif envanter satırı
            </p>
            <div className="pt-6">
              <button className="btn-primary">
                Test Buton
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}