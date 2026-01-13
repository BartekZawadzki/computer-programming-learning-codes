// PostCSS config dla Tailwind (przykład) z komentarzami.
// Użyj w pipeline build (np. npm scripts, Vite, CRA eject lub Next custom).
module.exports = {
  plugins: {
    tailwindcss: {},          // generuje klasy z tailwind.config.js
    autoprefixer: {},         // dodaje prefiksy przeglądarkowe
  },
};

// ---
// Dlaczego tak:
// - Minimalna konfiguracja: Tailwind + Autoprefixer to najczęstszy zestaw w projektach front.
// - PostCSS jako warstwa pośrednia pozwala dołożyć kolejne pluginy (nesting, cssnano) bez zmiany bundlera.
// - Trzymanie configu w osobnym pliku ułatwia integrację z różnymi narzędziami (Vite, Webpack, CRA). 
