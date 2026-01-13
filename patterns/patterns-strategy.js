// Strategy: wymienialne algorytmy (strategie) przekazywane do kontekstu.

// Strategie płatności (interfejs nieformalny)
class PaymentStrategy {
  pay(amount) { throw new Error("pay not implemented"); } // metoda abstrakcyjna
}

class CardStrategy extends PaymentStrategy {
  pay(amount) { return `Zapłacono kartą: ${amount}`; } // implementacja kartą
}

class BlikStrategy extends PaymentStrategy {
  pay(amount) { return `Zapłacono BLIK: ${amount}`; } // implementacja Blikiem
}

// Kontekst, który używa strategii
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy; // wstrzyknięta strategia
  }
  setStrategy(strategy) {
    this.strategy = strategy; // zmiana strategii w locie
  }
  pay(amount) {
    if (!this.strategy) throw new Error("Brak strategii"); // walidacja
    return this.strategy.pay(amount); // delegacja do strategii
  }
}

// Przykład użycia
const processor = new PaymentProcessor(new CardStrategy()); // start z kartą
const resultCard = processor.pay(100); // płatność kartą
processor.setStrategy(new BlikStrategy()); // zmiana strategii
const resultBlik = processor.pay(50); // płatność Blikiem

module.exports = {
  PaymentStrategy,
  CardStrategy,
  BlikStrategy,
  PaymentProcessor,
  processor,
  resultCard,
  resultBlik,
};

// ---
// Dlaczego tak:
// - Strategy oddziela algorytm płatności od kontekstu; PaymentProcessor deleguje do strategii pay.
// - CardStrategy/BlikStrategy pokazują wymienialność implementacji bez zmian w kliencie.
// - setStrategy umożliwia zmianę zachowania w trakcie działania aplikacji (np. preferencje użytkownika).
// - Walidacja braku strategii chroni przed wywołaniem bez konfiguracji, co jest częstym źródłem błędów.
