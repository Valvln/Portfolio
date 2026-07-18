import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import reveal from 'astro-reveal';

// Output "static" in v1: sito interamente statico, senza server richiesto per
// funzionare (plan.md § Constraints). L'adapter Vercel resta configurato così
// che passare a "hybrid"/"server" in futuro richieda solo di cambiare `output`,
// senza cambiare hosting né riscrivere i componenti (Principio "Scalabilità
// Architetturale").
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    // mode "observer" (non il default "scroll"): rivela una volta e resta a
    // piena opacità, invece di restare scrubbed alla posizione di scroll.
    // Necessario per l'accessibilità: in modalità "scroll" le card sotto la
    // piega restano a opacità/contrasto ridotti finché non vengono
    // scrollate in vista, il che viene rilevato come difetto di contrasto
    // da Lighthouse/axe-core al primo caricamento (vedi tasks.md T040/T041).
    reveal({ mode: 'observer' }),
  ],
  site: 'https://example-portfolio.vercel.app',
});
