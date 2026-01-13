// Decorator: dodaje nowe zachowanie do obiektu bez zmiany jego kodu źródłowego.
// Przykład: logger dekorujący prosty serwis kalkulacji.

// Bazowa klasa (komponent)
class Calculator {
  compute(a, b) { return a + b; } // prosta operacja
}

// Dekorator: owija komponent i dodaje logowanie
class LoggingCalculator {
  constructor(calculator) {
    this.calculator = calculator; // oryginalny komponent
  }
  compute(a, b) {
    console.log("Wejście:", { a, b }); // log wejścia
    const result = this.calculator.compute(a, b); // delegacja
    console.log("Wynik:", result); // log wyniku
    return result; // zwróć wynik
  }
}

// Przykład użycia
const baseCalc = new Calculator(); // podstawowy kalkulator
const decoratedCalc = new LoggingCalculator(baseCalc); // dekorujemy
const decoratedResult = decoratedCalc.compute(2, 3); // wywołanie z logowaniem

module.exports = { Calculator, LoggingCalculator, baseCalc, decoratedCalc, decoratedResult };

// ---
// Dlaczego tak:
// - Dekorator owija oryginalny komponent (Calculator) i dodaje logowanie bez modyfikacji jego kodu.
// - LoggingCalculator deleguje compute do wewnętrznego kalkulatora, więc zachowuje oryginalną funkcję + rozszerzenie.
// - Tworzenie decoratedCalc pokazuje, że można dekorować wiele instancji selektywnie, nie zmieniając klasy bazowej.
// - Wzorzec jest przydatny do cross-cutting concerns (logi, cache, metryki) bez dziedziczenia łańcuchów klas.
