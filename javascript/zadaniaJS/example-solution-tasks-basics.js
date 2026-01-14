// Przykładowe rozwiązania zadań z pliku tasks-basics.js.
// Każda linia ma krótki komentarz wyjaśniający logikę.

// 1) Ścisłe porównanie wartości i typu.
function compareStrict(a, b) {
  return a === b; // true tylko gdy typ i wartość są identyczne
}

// 2) Sprawdzenie truthy/falsy.
function isTruthy(value) {
  return value ? "truthy" : "falsy"; // if rozdziela przypadek prawdy i fałszu
}

// 3) Powitanie z domyślnym argumentem.
const greet = (name = "świat") => `Cześć ${name}!`; // domyślna wartość + template literal

// 4) Destrukturyzacja obiektu.
function formatUser(user) {
  const { firstName, lastName } = user; // pobranie pól z obiektu
  return `Imię: ${firstName}, Nazwisko: ${lastName}`; // złożenie stringu
}

// 5) Domknięcie z licznikiem.
function makeCounter(start = 0) {
  let count = start; // prywatny stan w zasięgu funkcji
  return {
    inc: () => {
      count += 1; // zwiększenie stanu
      return count; // zwrot nowej wartości
    },
    dec: () => {
      count -= 1; // zmniejszenie stanu
      return count; // zwrot nowej wartości
    },
    value: () => count, // podgląd stanu bez modyfikacji
  };
}

// 6) Zbieranie kluczy i wartości.
function collectKeysValues(obj) {
  const keys = []; // tablica na klucze
  for (const k in obj) {
    keys.push(k); // dodanie klucza
  }
  const values = Object.values(obj); // pobranie wartości
  return { keys, values }; // zwrot zebranych danych
}

// 7) Łączenie tablic bez mutacji.
function mergeUsers(users, newUsers) {
  return [...users, ...newUsers]; // spread tworzy nową tablicę
}

// 8) Formatowanie ceny.
function formatPrice(value) {
  return `Cena: ${value.toFixed(2)} PLN`; // toFixed(2) zapewnia dwa miejsca
}

// 9) Bezpieczne parsowanie JSON.
function safeJson(text) {
  try {
    return JSON.parse(text); // próba parsowania
  } catch {
    return null; // fallback w razie błędu
  }
}

// 11) Nullish coalescing.
function withFallback(value, fallback = "brak") {
  return value ?? fallback; // wybór pierwszej nie-nullish wartości
}

// 12) Optional chaining.
function getCity(user) {
  const city = user?.address?.city ?? "unknown"; // bezpieczny dostęp do głębokiego pola
  return city; // zwrot miasta lub domyślnej wartości
}

// 13) Zamiana miejscami w tablicy.
function swapPair(pair) {
  [pair[0], pair[1]] = [pair[1], pair[0]]; // destrukturyzacja zamienia elementy
  return pair; // zwrot zmodyfikowanej tablicy
}

// Dodatkowe zadanie A: ucinanie i dopisywanie wielokropka.
function truncate(text, max = 10) {
  if (text.length <= max) return text; // brak zmian gdy krótszy od limitu
  return `${text.slice(0, max)}...`; // obcięcie i dodanie wielokropka
}

// Dodatkowe zadanie B: parsowanie liczby ze stringa lub null.
function parseNumberStrict(raw) {
  const num = Number(raw); // konwersja na liczbę
  return Number.isFinite(num) ? num : null; // walidacja finitości
}

module.exports = {
  compareStrict,
  isTruthy,
  greet,
  formatUser,
  makeCounter,
  collectKeysValues,
  mergeUsers,
  formatPrice,
  safeJson,
  withFallback,
  getCity,
  swapPair,
  truncate,
  parseNumberStrict,
};
