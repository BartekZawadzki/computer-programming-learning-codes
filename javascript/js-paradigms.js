// Paradymaty programowania: imperatywny, strukturalny, obiektowy, funkcyjny,
// deklaratywny, reaktywny, logiczny (zarys w JS)

// Imperatywny: opisujemy instrukcje zmieniające stan
let counter = 0; // stan
counter += 1; // instrukcja zmieniająca stan

// Strukturalny: kontrola przepływu przez bloki/warunki/pętle
function sumStructured(arr) {
  let s = 0; // akumulator
  for (const x of arr) { // pętla to podstawowy blok
    if (x > 0) s += x; // warunek kontroluje przepływ
  }
  return s; // wynik
}

// Obiektowy (OOP): klasy, obiekty, enkapsulacja, dziedziczenie, polimorfizm
class Animal {
  constructor(name) { this.name = name; } // konstruktor ustawia stan
  speak() { return `${this.name} wydaje dźwięk`; } // metoda bazowa
}

class Dog extends Animal { // dziedziczenie
  speak() { return `${this.name} szczeka`; } // polimorfizm: nadpisanie
}

const rex = new Dog("Reksio"); // obiekt klasy pochodnej
rex.speak(); // "Reksio szczeka"

// Enkapsulacja: ukrycie szczegółów (np. pole prywatne #balance)
class Wallet {
  #balance = 0; // prywatny stan
  deposit(x) { this.#balance += x; } // metoda modyfikuje stan
  get balance() { return this.#balance; } // dostęp kontrolowany getterem
}

// Funkcyjny: funkcje czyste, niemutowalność, wyższe rzędy
const double = (x) => x * 2; // czysta funkcja (brak efektów ubocznych)
const map = (arr, fn) => arr.map(fn); // funkcja wyższego rzędu
const immutableUpdate = (obj, patch) => ({ ...obj, ...patch }); // tworzy kopię (bez mutacji)

// Monada (intuicyjnie): struktura z bind/flatMap, np. Promise jako monada async
const p = Promise.resolve(2) // monada z wartością
  .then((x) => x + 1) // flatMap: transformacja
  .then((x) => x * 3); // kolejne łańcuchy

// Deklaratywny: opisujemy co chcemy, nie jak (np. filter/map, JSX)
const evens = [1, 2, 3, 4].filter((x) => x % 2 === 0); // deklaracja selekcji
// JSX/templating (przykład ideowy): <List items={evens} />

// Reaktywny: strumienie zdarzeń, reagowanie asynchroniczne (przykład EventEmitter)
const { EventEmitter } = require("events"); // węzeł emitera
const bus = new EventEmitter(); // strumień zdarzeń
bus.on("data", (v) => console.log("otrzymano", v)); // subskrypcja
bus.emit("data", { ts: Date.now(), value: 42 }); // emisja zdarzenia

// Logic programming (zarys w JS): definiujemy fakty/reguły, wnioskujemy (tu uproszczony matcher)
const facts = [
  { parent: "Ala", child: "Bob" },
  { parent: "Bob", child: "Cezary" },
];

function grandchildren(person) {
  // reguła: wnuk to child(child(person))
  const children = facts.filter((f) => f.parent === person).map((f) => f.child); // dzieci osoby
  const grand = facts.filter((f) => children.includes(f.parent)).map((f) => f.child); // dzieci dzieci
  return grand; // wnuki
}

// ---
// Dlaczego tak:
// - Plik zarysowuje różne paradygmaty na przykładach w JS: imperatywny/strukturalny/OOP/funkcyjny/deklaratywny/reaktywny/logiczny.
// - Każdy fragment pokazuje idiom danego podejścia (np. klasy z dziedziczeniem, czyste funkcje + immutability, EventEmitter jako reaktywność).
// - Promise łańcuch ilustruje monadę w ujęciu intuicyjnym (bind/flatMap), a filter/map deklaratywność.
// - Funkcja grandchildren demonstruje prostą regułę w stylu logic programming, pracując na zbiorze faktów. 
