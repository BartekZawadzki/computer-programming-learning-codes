// Interfejsy, klasy, modyfikatory dostępu, dziedziczenie, implementacje

// Interfejs opisujący obiekt
interface IUser {
  id: number; // wymagane pole
  name: string; // wymagane pole
  email?: string; // opcjonalne pole
}

// Interfejs funkcji
interface Fetcher {
  (url: string): Promise<string>; // sygnatura funkcji: przyjmuje url, zwraca Promise<string>
}

// Klasa z modyfikatorami i getterem/setterem
class Account {
  private _balance: number; // prywatne pole, dostęp tylko w klasie
  readonly owner: string; // tylko do odczytu po inicjalizacji

  constructor(owner: string, initial = 0) {
    this.owner = owner; // ustaw właściciela
    this._balance = initial; // saldo początkowe
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Kwota musi być > 0"); // walidacja
    this._balance += amount; // zwiększ saldo
  }

  withdraw(amount: number): void {
    if (amount > this._balance) throw new Error("Brak środków"); // walidacja
    this._balance -= amount; // zmniejsz saldo
  }

  get balance(): number {
    return this._balance; // getter salda
  }
}

// Dziedziczenie i polimorfizm
abstract class Notifier {
  abstract notify(message: string): void; // metoda abstrakcyjna – implementacja w pochodnych
}

class EmailNotifier extends Notifier {
  constructor(private target: string) { super(); } // injekcja adresu
  notify(message: string): void {
    // tu byłaby logika wysyłki email
    console.log(`Email to ${this.target}: ${message}`); // demonstracja
  }
}

class SmsNotifier extends Notifier {
  constructor(private phone: string) { super(); } // injekcja numeru
  notify(message: string): void {
    // tu byłaby logika SMS
    console.log(`SMS to ${this.phone}: ${message}`); // demonstracja
  }
}

// Implementacja interfejsu
class HttpFetcher implements Fetcher {
  async fetchText(url: string): Promise<string> {
    const res = await fetch(url); // wywołanie HTTP
    return res.text(); // zwróć tekst
  }
  // dopasowanie do interfejsu: implementujemy sygnaturę (url: string) => Promise<string>
  async call(url: string): Promise<string> {
    return this.fetchText(url); // delegacja
  }
  // TS wymaga zgodności nazwy, więc dopiszemy właściwą sygnaturę:
  async invoke(url: string): Promise<string> { return this.fetchText(url); }
}

// Uwaga: interfejsy w TS są strukturalne – liczy się kształt, nie nazwa.
