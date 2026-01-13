// Proces i zmienne środowiskowe w Node

// Dostęp do argv (parametry uruchomienia)
const args = process.argv.slice(2); // pomija "node" i ścieżkę pliku
// Przykład: node script.js one two => args = ["one","two"]

// Zmienne środowiskowe (process.env)
const nodeEnv = process.env.NODE_ENV || "development"; // domyślnie dev
const apiKey = process.env.API_KEY || "brak"; // pobranie klucza lub fallback

// Informacje o procesie
const pid = process.pid; // identyfikator procesu
const cwd = process.cwd(); // katalog roboczy

// Wyjście z kodem
function exitWith(code = 0) {
  process.exit(code); // zakończ proces z kodem (0 = sukces)
}

// Obsługa sygnałów (Ctrl+C = SIGINT)
process.on("SIGINT", () => {
  console.log("Odebrano SIGINT, kończę..."); // log
  process.exit(0); // zamknij
});

module.exports = { args, nodeEnv, apiKey, pid, cwd, exitWith };

// ---
// Dlaczego tak:
// - Pokazuje podstawowe API procesu: argv, env, pid, cwd, exit.
// - Domyślne wartości (fallback) chronią przed brakiem zmiennych środowiskowych.
// - Obsługa sygnału SIGINT ilustruje łagodne zamykanie aplikacji z CLI.
// - Eksporty umożliwiają wielokrotne użycie w innych modułach i testach.
