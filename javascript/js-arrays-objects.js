// Przykładowe dane
const users = [
  { id: 1, name: "Ala", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Cezary", active: true },
];

// map: przekształca każdy element, zwraca nową tablicę
const names = users.map((u) => u.name); // ["Ala","Bob","Cezary"]

// filter: wybiera elementy spełniające warunek
const activeUsers = users.filter((u) => u.active); // tylko aktywni

// reduce: agregacja do jednej wartości (np. liczba aktywnych)
const activeCount = users.reduce(
  (acc, u) => acc + (u.active ? 1 : 0),
  0 // wartość startowa akumulatora
);

// find: pierwszy pasujący element lub undefined
const firstInactive = users.find((u) => !u.active);

// some/every: sprawdzanie warunku dla tablicy
const hasInactive = users.some((u) => !u.active); // true, bo Bob
const allActive = users.every((u) => u.active); // false

// sort: mutuje tablicę – lepiej kopiować przed sortowaniem
const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));

// flatMap: map + spłaszczanie
const orders = [
  { userId: 1, items: ["book", "pen"] },
  { userId: 2, items: ["laptop"] },
];
const allItems = orders.flatMap((o) => o.items); // ["book","pen","laptop"]

// Destrukturyzacja obiektu z aliasami i wartościami domyślnymi
const user = { id: 7, name: "Daria" };
const { name: displayName = "Anon", role = "user" } = user;

// Operator rest w funkcji – zbiera resztę argumentów
function joinWithComma(first, ...rest) {
  // łączy pierwszy element z resztą
  return [first, ...rest].join(", ");
}

// Nie mutuj – używaj kopii przy aktualizacji obiektu
function setActive(u, active) {
  // zwraca nowy obiekt z nadpisanym polem active
  return { ...u, active };
}

// Głębokie klonowanie (prosty przypadek bez funkcji/daty)
const clonedUsers = JSON.parse(JSON.stringify(users));

// Zamiana tablicy na mapę (słownik) dla szybkiego dostępu po id
const usersById = new Map(users.map((u) => [u.id, u]));
const user1 = usersById.get(1); // O(1) dostęp

// Zbiór unikalnych wartości (Set)
const tags = ["js", "node", "js", "react"];
const uniqueTags = [...new Set(tags)]; // ["js","node","react"]

// Eksport do użycia w innych plikach
module.exports = {
  users,
  names,
  activeUsers,
  activeCount,
  firstInactive,
  hasInactive,
  allActive,
  sortedByName,
  allItems,
  joinWithComma,
  setActive,
  usersById,
  uniqueTags,
};

// ---
// Dlaczego tak:
// - Demonstruje najczęstsze operacje na tablicach/obiektach: map/filter/reduce/find/some/every/sort/flatMap.
// - Pokazuje defensywne kopiowanie przed sortowaniem i aktualizacją, by uniknąć mutacji oryginałów.
// - new Map/Set ilustrują struktury dla O(1) dostępu i deduplikacji.
// - Eksport CommonJS umożliwia użycie funkcji/danych w testach lub innych modułach Node.
