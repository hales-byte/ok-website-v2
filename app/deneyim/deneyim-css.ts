/**
 * /deneyim sayfasına özel stil (yalnız bu sayfada basılır; globals.css'e dokunmaz).
 * Varsayılan (telefon, "hareketi azalt", JS yok): akışta sabit görsel + metin.
 * Masaüstü + hareket serbest: yapışkan 3D sahne, bölümler üstünde kayar.
 * data-mod="sabit" (yavaş bağlantı / WebGL yok / sahne çöktü) → masaüstünde de sabit düzen.
 */
export const DENEYIM_CSS = `
.dn{position:relative}
.dn-sahne{display:none}
.dn-bolum{position:relative;padding:40px 0}
.dn-sabit{display:block;margin:0 0 20px}
.dn-sabit img{display:block;width:100%;height:auto;border-radius:16px;background:#E2E8F0}
.dn-kart{position:relative;max-width:34rem;border-radius:20px;padding:28px}
.dn-kart-acik{background:var(--color-surface);border:1px solid var(--color-border-subtle)}
.dn-final .dn-kart{max-width:56rem}
.dn-ipucu{display:none}
.dn-tuval{position:absolute;inset:0}
.dn-tuval::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(10,18,32,.38) 100%)}
.dn-tuval canvas{opacity:0;transition:opacity .9s ease}
.dn[data-hazir="1"] .dn-tuval canvas{opacity:1}
@media (min-width:768px) and (prefers-reduced-motion:no-preference){
  .dn:not([data-mod=sabit]) .dn-sahne{display:block;position:sticky;top:0;height:100vh;overflow:hidden;
    background:linear-gradient(180deg,#5E7FB8 0%,#9FA9C6 55%,#F4B98A 100%)}
  .dn:not([data-mod=sabit]) .dn-bolumler{margin-top:-100vh;position:relative;z-index:1;pointer-events:none}
  .dn:not([data-mod=sabit]) .dn-bolum{min-height:165vh;padding:0}
  .dn:not([data-mod=sabit]) .dn-bolum .container-narrow{position:sticky;top:0;min-height:100vh;display:flex;align-items:center}
  .dn:not([data-mod=sabit]) .dn-final .container-narrow{justify-content:center}
  .dn:not([data-mod=sabit]) .dn-kart{pointer-events:auto;box-shadow:0 20px 60px -20px rgba(10,18,32,.45)}
  .dn:not([data-mod=sabit]) .dn-kart-acik{background:rgba(255,255,255,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-color:rgba(255,255,255,.6)}
  .dn:not([data-mod=sabit]) .dn-kart.band-dark{background:rgba(10,18,32,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
  .dn:not([data-mod=sabit]) .dn-sabit{display:none}
  .dn:not([data-mod=sabit]) .dn-ipucu{display:flex}
}
.dn[data-yakala] .dn-bolumler{visibility:hidden}
`;
