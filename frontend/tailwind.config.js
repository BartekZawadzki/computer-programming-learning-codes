// Tailwind CSS config (przykład) z komentarzami.
// W projekcie: zainstaluj tailwindcss/postcss/autoprefixer i uruchom `npx tailwindcss init`.

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",  // skany plików źródłowych (dopasuj do projektu)
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          500: "#3b82f6",              // kolor marki (przykład)
          700: "#1d4ed8",
        },
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.08)", // cień dla kart
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),     // plugin formularzy (opcjonalny)
    require("@tailwindcss/typography") // plugin typografii (opcjonalny)
  ],
};

// ---
// Dlaczego tak:
// - content wskazuje pliki do purge, by Tailwind generował tylko używane klasy.
// - extend pozwala dodać brandowe kolory/cienie bez nadpisywania całego theme.
// - Pluginy forms/typography to typowe dodatki poprawiające bazowy wygląd formularzy i treści.
