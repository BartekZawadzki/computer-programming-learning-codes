// Prosty "playground" testowy bez frameworka – ręczne asercje
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`❌ ${message} (actual=${actual}, expected=${expected})`);
  }
  console.log(`✅ ${message}`);
}

// Przykład testów dla funkcji z innych plików
const { greet, canVote } = require("./js-basics");

function runTests() {
  assertEqual(greet("Ada"), "Cześć Ada!", "greet zwraca poprawny tekst");
  assertEqual(greet(), "Cześć świat!", "greet używa wartości domyślnej");
  assertEqual(canVote(18), "Możesz głosować", "canVote dla 18+");
  assertEqual(canVote(10), "Za młody", "canVote dla niepełnoletnich");
}

// Uruchomienie testów przy wywołaniu pliku
if (require.main === module) {
  runTests();
}

module.exports = { assertEqual, runTests };

// ---
// Dlaczego tak:
// - Plik pokazuje minimalny framework asercji (assertEqual) bez zależności, by zrozumieć ideę testów.
// - runTests demonstruje wywołanie funkcji z innych modułów i ręczne sprawdzanie wyników.
// - require.main guard pozwala uruchomić testy tylko przy bezpośrednim wywołaniu pliku, a w importach korzystać z funkcji.
// - Komunikaty sukces/błąd ułatwiają szybkie wykrycie regresji w przykładach bez instalacji narzędzi.
