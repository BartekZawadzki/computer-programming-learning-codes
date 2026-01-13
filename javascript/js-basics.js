// Deklaracje zmiennych i typy podstawowe
const appName = "Cheatsheet"; // stała tekstowa (string)
let counter = 0; // zmienna licznik (number)
let isReady = true; // wartość logiczna (boolean)
let nothing = null; // brak wartości
let notDefined; // undefined, gdy nie przypiszemy

// Operatory porównania
// === i !== sprawdzają typ i wartość (rekomendowane)
const strictEqual = 2 === "2"; // false, bo typy różne
const looseEqual = 2 == "2"; // true, bo następuje konwersja (unikać)

// Instrukcje warunkowe
function canVote(age) {
  // if/else do prostych decyzji
  if (age >= 18) return "Możesz głosować";
  return "Za młody";
}

// Operator warunkowy (ternary) dla prostych wyborów
const isAdult = (age) => (age >= 18 ? "dorosły" : "niepełnoletni");

// Pętle: for...of iteruje po elementach kolekcji
const numbers = [1, 2, 3];
for (const n of numbers) {
  counter += n; // sumowanie elementów
}

// Pętle: for...in iteruje po kluczach obiektu
const user = { id: 1, name: "Ala" };
for (const key in user) {
  // key to np. "id" lub "name"
  // user[key] daje wartość pola
}

// Funkcje strzałkowe i wartości domyślne
const greet = (name = "świat") => `Cześć ${name}!`;

// Destrukturyzacja obiektów i tablic
const person = { firstName: "Jan", lastName: "Kowalski", age: 30 };
const { firstName, age } = person; // wyjmujemy pola do zmiennych
const coords = [10, 20];
const [x, y] = coords; // przypisanie pozycyjne

// Rest/Spread: kopiowanie i łączenie struktur
const moreNumbers = [...numbers, 4, 5]; // nowa tablica z dodatkami
const cloneUser = { ...user, role: "admin" }; // kopia z nadpisaniem pola

// Funkcje wyższego rzędu: przekazujemy funkcje jako argument
function applyTwice(fn, value) {
  // wywołujemy fn dwa razy na wartości
  return fn(fn(value));
}
const double = (v) => v * 2;
const doubledTwice = applyTwice(double, 3); // 12

// Closures (domknięcia): funkcja zapamiętuje leksykalny zakres
function createCounter() {
  let value = 0; // prywatny stan
  return {
    inc() {
      value += 1;
      return value;
    },
    dec() {
      value -= 1;
      return value;
    },
    current() {
      return value;
    },
  };
}
const c = createCounter();
c.inc(); // 1
c.inc(); // 2
c.current(); // 2

// Truthy/Falsy: wartości oceniane jako false w if
const falsyValues = [false, 0, "", null, undefined, NaN]; // wszystko inne jest truthy

// Optional chaining i nullish coalescing
const city = person.address?.city ?? "brak danych"; // gdy address nie istnieje, domyślnie tekst

// Modułowy eksport (CommonJS) – pozwala użyć funkcji w innych plikach Node
module.exports = {
  canVote,
  isAdult,
  greet,
  createCounter,
};

// ---
// Dlaczego tak:
// - Pokrywa fundamenty JS: zmienne, porównania, warunki, pętle, funkcje, destrukturyzację, rest/spread i closure.
// - Używa strict equality ===, co minimalizuje niejawne konwersje typów.
// - Optional chaining/nullish coalescing pokazują bezpieczny dostęp do zagnieżdżonych pól.
// - Eksport CommonJS pozwala łatwo importować funkcje w środowisku Node/testów.
