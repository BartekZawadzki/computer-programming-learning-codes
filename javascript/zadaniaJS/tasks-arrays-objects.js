// Zadania: tablice i obiekty (map/filter/reduce, immutowalność, kopiowanie).
// Każde zadanie ma opis i komentarze, rozwiązuj we własnym tempie.

// Przykładowe dane wejściowe (możesz modyfikować w testach):
const users = [
  { id: 1, name: "Ala", active: true, score: 12 },
  { id: 2, name: "Bob", active: false, score: 7 },
  { id: 3, name: "Cezary", active: true, score: 18 },
];

// 1) map: zwróć tablicę nazw użytkowników (string).
function getNames(list) {
  // TODO: użyj map, zwróć list.map(u => u.name)
}

// 2) filter: zwróć tylko aktywnych użytkowników.
function getActive(list) {
  // TODO: filter po polu active === true
}

// 3) reduce: policz sumę score.
function totalScore(list) {
  // TODO: reduce((acc, u) => acc + u.score, 0)
}

// 4) find: znajdź użytkownika po id (zwróć obiekt lub undefined).
function findById(list, id) {
  // TODO: find(u => u.id === id)
}

// 5) some/every: sprawdź, czy wszyscy są active; czy ktoś ma score > 15.
function allActive(list) {
  // TODO: użyj every
}
function anyHighScore(list, minScore = 15) {
  // TODO: użyj some
}

// 6) sort bez mutacji: zwróć nową tablicę posortowaną po score malejąco.
function sortByScoreDesc(list) {
  // TODO: skopiuj tablicę [...list] i użyj sort((a,b)=>b.score-a.score)
}

// 7) immutowalne dodanie elementu do tablicy
function addUser(list, user) {
  // TODO: zwróć nową tablicę, nie mutuj list
}

// 8) immutowalna aktualizacja użytkownika (po id) — zmień active na true.
function activateUser(list, id) {
  // TODO: map: jeśli u.id===id, zwróć nowy obiekt z active: true
}

// 9) groupBy (prosty) — pogrupuj po active: true/false
function groupByActive(list) {
  // TODO: zwróć obiekt { true: [...], false: [...] } (klucze string)
}

// 10) Kopia głęboka (dla prostych struktur) — użyj JSON.parse/stringify
function deepCloneSimple(obj) {
  // TODO: return JSON.parse(JSON.stringify(obj));
}

// 11) Unikalne wartości z tablicy (Set)
//     Zwróć tablicę unikalnych tagów z listy stringów.
function uniqueTags(tags) {
  // TODO: Array.from(new Set(tags))
}

// 12) Zliczanie wystąpień (frequency map)
//     Zwróć obiekt { wartość: liczba_wystąpień } dla tablicy liczb.
function countOccurrences(nums) {
  // TODO: reduce, akumulator obiekt
}

// 13) Flatten (1 poziom) — spłaszcz tablicę tablic w jedną.
function flattenOneLevel(arr) {
  // TODO: użyj arr.flat() lub reduce([...acc, ...cur], [])
}

// 14) Podział tablicy na porcje (chunk)
//     Zwróć nową tablicę podtablic o długości size (ostatnia może być krótsza).
function chunk(list, size = 2) {
  // TODO: iteruj i slice co size; zbieraj do out; zwróć out
}

// 15) Mediana punktów (score) użytkowników
//     Oblicz medianę z wartości score (dla parzystej średnia dwóch środkowych).
function medianScore(list) {
  // TODO: posortuj rosnąco score, znajdź środek; obsłuż parzystą/nieparzystą liczbę
}

module.exports = {
  users,
  getNames,
  getActive,
  totalScore,
  findById,
  allActive,
  anyHighScore,
  sortByScoreDesc,
  addUser,
  activateUser,
  groupByActive,
  deepCloneSimple,
  uniqueTags,
  countOccurrences,
  flattenOneLevel,
  chunk,
  medianScore,
};
