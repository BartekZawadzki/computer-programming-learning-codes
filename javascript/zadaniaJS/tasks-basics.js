// Zadania: podstawy JS (zmienne, typy, funkcje, scope, operatory).
// Każde zadanie ma komentarze edukacyjne — rozwiązuj krok po kroku.

// 1) Konwersje typów i operatory porównania
//    Uzupełnij funkcję compareStrict, aby zwracała true tylko gdy
//    a i b są równe wartościowo i typowo (===). Dodaj testy w kodzie.
function compareStrict(a, b) {
  // TODO: zwróć wynik porównania z użyciem operatora ścisłego
}

// 2) Falsy/truthy
//    Uzupełnij funkcję isTruthy tak, by zwracała string:
//    - "truthy" jeśli value jest traktowane jako prawda w if
//    - "falsy" w przeciwnym razie.
function isTruthy(value) {
  // TODO: użyj prostego if (value) { ... } else { ... }
}

// 3) Funkcja strzałkowa i domyślne argumenty
//    Uzupełnij greet, by zwracało "Cześć <name>!".
//    Jeśli name nie podano, użyj domyślnej wartości "świat".
const greet = (name /*= ??? */) => {
  // TODO: zwróć poprawny string z użyciem template literal
};

// 4) Destrukturyzacja obiektu
//    Funkcja formatUser powinna pobrać pola firstName i lastName z obiektu user
//    i zwrócić string "Imię: <firstName>, Nazwisko: <lastName>".
function formatUser(user) {
  // TODO: użyj destrukturyzacji w linii poniżej (const { ... } = user;)
  // TODO: zwróć sformatowany string
}

// 5) Domknięcie (closure)
//    Stwórz funkcję makeCounter, która zwraca obiekt z metodami inc, dec i value.
//    Każda operacja modyfikuje prywatny licznik (zasięg leksykalny).
function makeCounter(start = 0) {
  // TODO: zadbaj o prywatny stan (let count = start)
  // TODO: zwróć obiekt z metodami inc/dec/value (value zwraca bieżący count)
}

// 6) Pętle for...of i for...in
//    Uzupełnij funkcję collectKeysValues:
//    - użyj for...in do zebrania kluczy obiektu
//    - użyj Object.values lub for...of na Object.values do zebrania wartości
function collectKeysValues(obj) {
  // TODO: zwróć obiekt { keys: [...], values: [...] }
}

// 7) Operator spread/rest
//    Funkcja mergeUsers powinna przyjąć tablicę userów i tablicę nowych userów
//    i zwrócić jedną połączoną tablicę bez mutowania wejść.
function mergeUsers(users, newUsers) {
  // TODO: użyj operatora spread [...users, ...newUsers]
}

// 8) Template literals i toFixed
//    Funkcja formatPrice powinna przyjmować liczbę i zwracać tekst "Cena: X.XX PLN"
function formatPrice(value) {
  // TODO: value.toFixed(2) + " PLN" w template literal
}

// 9) try/catch
//    Funkcja safeJson parseuje JSON i zwraca obiekt albo null, jeśli parse się nie powiedzie.
function safeJson(text) {
  // TODO: try { return JSON.parse(text); } catch { return null; }
}

// 11) Operator nullish coalescing (??)
//     Zwróć value, a jeśli jest null lub undefined, zwróć fallback.
function withFallback(value, fallback = "brak") {
  // TODO: użyj value ?? fallback
}

// 12) Optional chaining
//     Pobierz city z obiektu user.address.city, a jeśli brak którejś części, zwróć "unknown".
function getCity(user) {
  // TODO: const city = user?.address?.city ?? "unknown"; zwróć city
}

// 13) Zamiana wartości przez destrukturyzację tablicy
//     Podmień miejscami a i b i zwróć [a,b] po zamianie.
function swapPair(pair) {
  // TODO: użyj destrukturyzacji [pair[0], pair[1]] = [pair[1], pair[0]]
  // TODO: zwróć zmodyfikowaną tablicę pair
}

// 14) Ucinanie tekstu z wielokropkiem
//     Jeśli tekst jest dłuższy niż max, obetnij i dodaj "..." na końcu.
function truncate(text, max = 10) {
  // TODO: jeśli length <= max zwróć text; wpp text.slice(0, max) + "..."
}

// 15) Parsowanie liczby ze stringa
//     Zamień wejście na liczbę; jeśli nie jest liczbą skończoną, zwróć null.
function parseNumberStrict(raw) {
  // TODO: const num = Number(raw); return Number.isFinite(num) ? num : null;
}

// 10) Eksport funkcji do testów/manualnego sprawdzenia
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
