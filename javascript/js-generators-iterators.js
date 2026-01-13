// Iteratory i generatory – praca z sekwencjami

// Własny iterator: obiekt z metodą next()
function makeRangeIterator(start = 0, end = 5) {
  let current = start; // bieżąca wartość
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false }; // zwracamy kolejną liczbę
      }
      return { value: undefined, done: true }; // koniec iteracji
    },
  };
}

// Generator: prostszy zapis iteratora
function* rangeGen(start = 0, end = 5, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i; // yield zwraca kolejne wartości
  }
}

// Lazy przetwarzanie: nieskończony generator i limitowanie
function* naturalNumbers() {
  let n = 1; // start od 1
  while (true) {
    yield n++; // kolejne liczby
  }
}

function take(gen, count) {
  const result = []; // zbiera elementy
  for (const value of gen) {
    result.push(value); // dodaje do listy
    if (result.length === count) break; // przerywa po osiągnięciu limitu
  }
  return result; // zwraca zebrane wartości
}

// Pipeline z generatorami: map i filter w trybie lazy
function* mapGen(iterable, mapper) {
  for (const item of iterable) {
    yield mapper(item); // przekształca i yield
  }
}

function* filterGen(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) yield item; // yield tylko spełniające warunek
  }
}

// Przykład użycia: liczby parzyste podniesione do kwadratu, pierwsze 5
const evensSquared = take(
  mapGen(
    filterGen(naturalNumbers(), (n) => n % 2 === 0), // filtr parzystych
    (n) => n * n // kwadrat
  ),
  5 // limit wyników
); // [4, 16, 36, 64, 100]

module.exports = {
  makeRangeIterator,
  rangeGen,
  naturalNumbers,
  take,
  mapGen,
  filterGen,
  evensSquared,
};

// ---
// Dlaczego tak:
// - Pokazuje własny iterator (makeRangeIterator) oraz generator (rangeGen) jako krótszą składnię tworzenia iteratorów.
// - naturalNumbers + take ilustrują leniwe generowanie nieskończonej sekwencji i jej ograniczanie.
// - mapGen/filterGen tworzą lazy pipeline, dzięki czemu przetwarzanie działa na żądanie, a nie na całej tablicy.
// - Przykład evensSquared pokazuje łączenie filtracji i mapowania na strumieniu bez alokacji dużych tablic pośrednich.
