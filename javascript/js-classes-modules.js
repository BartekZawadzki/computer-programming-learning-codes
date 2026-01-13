// Klasa z polami prywatnymi (#) i metodami publicznymi
class BankAccount {
  #balance = 0; // prywatne pole – dostępne tylko wewnątrz klasy

  constructor(owner) {
    this.owner = owner; // publiczne pole opisujące właściciela
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Kwota musi być > 0");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Brak środków");
    this.#balance -= amount;
    return this.#balance;
  }

  get balance() {
    // getter – dostęp do stanu bez bezpośredniej modyfikacji
    return this.#balance;
  }
}

// Dziedziczenie i nadpisanie metody
class SavingAccount extends BankAccount {
  constructor(owner, rate) {
    super(owner); // wywołanie konstruktora bazowego
    this.rate = rate; // stopa procentowa
  }

  applyInterest() {
    // naliczanie odsetek
    const interest = this.balance * this.rate;
    return this.deposit(interest);
  }
}

// Wzorzec Strategy – wstrzyknięcie algorytmu do klasy
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy; // obiekt z metodą pay
  }

  pay(amount) {
    return this.strategy.pay(amount);
  }
}

class CardStrategy {
  pay(amount) {
    // tu symulacja płatności kartą
    return `Zapłacono kartą: ${amount}`;
  }
}

class BlikStrategy {
  pay(amount) {
    // tu symulacja płatności Blikiem
    return `Zapłacono BLIK: ${amount}`;
  }
}

// Eksporty (CommonJS) – umożliwiają import w innych plikach Node
module.exports = {
  BankAccount,
  SavingAccount,
  PaymentProcessor,
  CardStrategy,
  BlikStrategy,
};

// ---
// Dlaczego tak:
// - Prywatne pola (#) i gettery pokazują enkapsulację stanu w nowoczesnym JS.
// - SavingAccount demonstruje dziedziczenie i użycie super w konstruktorze.
// - PaymentProcessor ze strategiami ilustruje wzorzec Strategy poprzez wstrzyknięcie obiektu z metodą pay.
// - Eksporty CommonJS umożliwiają łatwe użycie klas w Node/testach i utrzymują separację odpowiedzialności.
