/**
 * /deneyim sayfasına özel stil (yalnız bu sayfada basılır; globals.css'e dokunmaz).
 * Sabitlenmiş (sticky) fotoğraf sahnesi + üstünde kayan metin kartları.
 * Fotoğraf hareketi yalnız transform/opacity (DeneyimAkisi yazar); burada yerleşim.
 */
export const DENEYIM_CSS = `
.dn{position:relative;background:#0A1220}
.dn-sahne{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:#0A1220}
.dn-foto{position:absolute;inset:0;will-change:transform,opacity;backface-visibility:hidden}
.dn-foto img{width:100%;height:100%;object-fit:cover;display:block}
.dn-karart{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,18,32,.08) 0%,rgba(10,18,32,0) 30%,rgba(10,18,32,.22) 100%);pointer-events:none}
.dn-gece{position:absolute;inset:0;background:#0A1220;opacity:0;pointer-events:none;will-change:opacity}
.dn-saat{position:absolute;top:calc(69px + 16px);right:16px;z-index:2;display:flex;align-items:center;gap:8px;
  padding:8px 14px;border-radius:999px;background:rgba(10,18,32,.72);color:#fff;
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
  font-family:var(--font-display);font-weight:700;font-size:18px;letter-spacing:.04em;font-variant-numeric:tabular-nums;will-change:opacity}
.dn-saat-nokta{width:8px;height:8px;border-radius:50%;background:#00D2FF;box-shadow:0 0 0 4px rgba(0,210,255,.18)}
.dn-bolumler{position:relative;z-index:1;margin-top:-100vh;margin-top:-100svh;pointer-events:none}
.dn-bolum{min-height:170vh;min-height:170svh}
.dn-bolum .container-narrow{position:sticky;top:0;min-height:100vh;min-height:100svh;display:flex;align-items:flex-end;padding-bottom:24px}
.dn-kart{pointer-events:auto;width:100%;max-width:34rem;border-radius:20px;padding:22px;
  background:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.65);
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 20px 60px -20px rgba(10,18,32,.5)}
.dn-kart.band-dark{background:rgba(10,18,32,.82);border-color:rgba(255,255,255,.08)}
.dn-final{min-height:130vh;min-height:130svh}
.dn-final .container-narrow{align-items:center}
.dn-final .dn-kart{max-width:56rem}
.dn-ipucu{display:flex}
@media (min-width:768px){
  .dn-saat{top:calc(69px + 24px);right:32px;font-size:22px;padding:10px 18px}
  .dn-bolum .container-narrow{align-items:center;padding-bottom:0}
  .dn-kart{padding:28px}
}
@media (prefers-reduced-motion:reduce){.dn-ipucu span{animation:none}}
`;
