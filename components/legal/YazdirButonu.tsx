"use client";

import { Printer } from "lucide-react";

/**
 * Basit yazdırma tetikleyicisi (window.print). Yeni bağımlılık yok.
 * Yazdırma/PDF çıktısında kendisi gizlenir (globals.css .print-gizle).
 */
export function YazdirButonu({ etiket = "Formu Yazdır" }: { etiket?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-secondary print-gizle"
    >
      <Printer size={18} />
      {etiket}
    </button>
  );
}
