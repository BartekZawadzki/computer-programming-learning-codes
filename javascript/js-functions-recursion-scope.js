// Funkcje i procedury: definicja, parametry, zwracanie, rekurencja, zasięg

// Definicja funkcji deklaracją
function add(a, b) {
  return a + b; // zwracamy wynik
}

// Funkcja strzałkowa (wyrażenie)
const multiply = (a, b) => a * b; // krótsza składnia

// Parametry domyślne
const greet = (name = "świat") => `Cześć ${name}!`; // domyślny argument

// Parametry rest (zbiera resztę argumentów)
function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + n, 0); // suma dowolnej liczby argumentów
}

// Zwracanie wartości: jeśli brak return → undefined
function noReturn() {
  const x = 2 + 2;
} // zwróci undefined

// Rekurencja: funkcja wywołuje samą siebie
function factorial(n) {
  if (n <= 1) return 1; // warunek stopu
  return n * factorial(n - 1); // wywołanie rekurencyjne
}

// Rekurencja ogonowa (teoretycznie optymalizowalna, w JS różnie wspierana)
function sumTail(n, acc = 0) {
  if (n === 0) return acc; // warunek stopu
  return sumTail(n - 1, acc + n); // przekazujemy wynik w akumulatorze
}

// Zasięg zmiennych: blokowy (let/const) vs funkcyjny (var)
function scopeDemo() {
  if (true) {
    let local = "blok"; // widoczne tylko w bloku if
    var legacy = "funkcja"; // var wycieka na poziom funkcji
  }
  // console.log(local); // błąd: local nie jest zdefiniowane tutaj
  console.log(legacy); // działa: var ma zasięg funkcji
}

// Zamknięcia (closures): funkcja zapamiętuje otaczający zakres
function makeCounter() {
  let value = 0; // prywatny stan
  return function inc() {
    value += 1; // używa zmiennej z zewnętrznego zakresu
    return value; // zwraca aktualny stan
  };
}

// Lexical scope: zasięg określony miejscem w kodzie (nie wywołaniem)
const x = 10; // zmienna globalna
function outer() {
  const x = 20; // cieniowanie zmiennej globalnej
  function inner() {
    return x; // zwróci 20, bo sięga do najbliższego zakresu leksykalnego
  }
  return inner(); // wykonanie
}

// ---
// Dlaczego tak:
// - Zbiera kluczowe zagadnienia: deklaracje/wyrażenia funkcji, parametry domyślne i rest, rekurencja, zasięg.
// - Przykłady closure i lexical scope pokazują, jak JS wiąże zmienne na podstawie miejsca definicji.
// - sumAll/factorial/sumTail ilustrują różne style akumulacji i bazę/rekurencję z warunkiem stopu.
// - scopeDemo uwypukla różnicę let/const (blokowy) vs var (funkcyjny), co jest częstą pułapką legacy.
