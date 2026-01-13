// Konfiguracja Vite dla Vue 3 z komentarzami.
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],                      // włącz plugin Vue
  server: {
    port: 5174,                          // port dev servera (inny niż React)
  },
  build: {
    sourcemap: true,                     // mapy źródłowe (opcjonalne, przydatne do debug)
  },
  // envPrefix: "VITE_",                 // zmienne środowiskowe prefiksowane
});

// ---
// Dlaczego tak:
// - Plugin vue zapewnia obsługę SFC i hot reload.
// - Oddzielny port minimalizuje kolizje z innymi dev serwerami (np. React 5173).
// - Sourcemap ułatwia debug w produkcji; można wyłączyć, gdy priorytetem jest mniejszy bundle.
