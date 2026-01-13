// Konfiguracja Vite dla React z komentarzami.
// Użyj z package.json (scripts: "dev": "vite", "build": "vite build", "preview": "vite preview").
import { defineConfig } from "vite";                  // helper defineConfig
import react from "@vitejs/plugin-react";             // plugin React (SWC/JSX)

export default defineConfig({
  plugins: [react()],                                 // włącz plugin React
  server: {
    port: 5173,                                       // port dev servera
  },
  build: {
    sourcemap: true,                                  // mapy źródłowe w buildzie (przydatne do debug)
  },
  // envPrefix: "VITE_",                              // zmienne środowiskowe prefiksowane
});

// ---
// Dlaczego tak:
// - Plugin react zapewnia obsługę JSX/SWC i fast refresh.
// - Osobny port od typowego 3000 zmniejsza kolizje przy wielu projektach.
// - Sourcemap ułatwia debug w buildzie; można wyłączyć w produkcji dla mniejszych plików.
