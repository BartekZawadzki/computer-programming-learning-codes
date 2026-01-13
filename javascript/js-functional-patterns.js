// Funkcja czysta: zależy tylko od argumentów, brak efektów ubocznych
const add = (a, b) => a + b; // zwraca zawsze ten sam wynik dla tych samych danych

// Immutability: nie mutujemy wejścia, zwracamy nowe obiekty
const setRole = (user, role) => ({ ...user, role }); // kopia + nowe pole

// Map/Filter/Reduce – funkcjonalne przekształcenia
const products = [
  { id: 1, name: "Book", price: 30 },
  { id: 2, name: "Pen", price: 5 },
];

const names = products.map((p) => p.name); // ["Book","Pen"]
const cheap = products.filter((p) => p.price < 10); // tylko tanie
const total = products.reduce((acc, p) => acc + p.price, 0); // suma cen

// Currying – dzielimy funkcję na częściowo zastosowane argumenty
const multiply = (a) => (b) => a * b; // zwraca funkcję oczekującą b
const double = multiply(2); // funkcja mnożąca przez 2
const triple = multiply(3); // funkcja mnożąca przez 3

// Kompozycja funkcji – łączenie prostych operacji w pipeline
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value); // przekazuje wynik do kolejnej funkcji

const toUpper = (s) => s.toUpperCase(); // zamiana na wielkie litery
const exclaim = (s) => `${s}!`; // dodanie wykrzyknika
const shout = pipe(toUpper, exclaim); // kompozycja

// Predykaty i logika – małe funkcje do filter/some/every
const isActive = (u) => u.active === true; // sprawdza aktywność
const isAdult = (u) => u.age >= 18; // sprawdza pełnoletność

// Funkcje wyższego rzędu dla retry (prosta implementacja)
function withRetry(fn, attempts = 3) {
  return async (...args) => {
    let lastError; // zapamiętujemy błąd
    for (let i = 0; i < attempts; i += 1) {
      try {
        return await fn(...args); // próbujemy wykonać fn
      } catch (err) {
        lastError = err; // zapisujemy błąd
      }
    }
    throw lastError; // po niepowodzeniu rzutujemy ostatni błąd
  };
}

// Memoizacja – cache wyników funkcji zależnej od argumentu prymitywnego
function memoize(fn) {
  const cache = new Map(); // przechowuje wyniki
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg); // zwraca z cache
    const result = fn(arg); // oblicza wynik
    cache.set(arg, result); // zapisuje w cache
    return result; // zwraca nowy wynik
  };
}

const slowSquare = (n) => n * n; // przykładowa funkcja
const memoSquare = memoize(slowSquare); // wersja z cache

// Guard clause – wcześniejsze wyjścia zamiast zagnieżdżania if
function normalizeName(name) {
  if (!name) return ""; // szybki powrót dla pustej wartości
  return name.trim().toLowerCase(); // przycięcie i małe litery
}

// Eksport funkcji do ćwiczeń
module.exports = {
  add,
  setRole,
  names,
  cheap,
  total,
  multiply,
  double,
  triple,
  pipe,
  shout,
  isActive,
  isAdult,
  withRetry,
  memoize,
  memoSquare,
  normalizeName,
};

// ---
// Dlaczego tak:
// - Zbiera kluczowe elementy podejścia funkcyjnego: czyste funkcje, immutability, map/filter/reduce, currying, composition.
// - withRetry i memoize pokazują funkcje wyższego rzędu, które opakowują inne funkcje logiką odporności/cache.
// - pipe łączy funkcje w jeden pipeline, co upraszcza czytanie transformacji danych.
// - Przykłady setRole/normalizeName podkreślają brak mutacji wejścia (spread, trim/toLowerCase).
