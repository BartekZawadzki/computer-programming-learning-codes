// Przykładowe rozwiązania zadań tablice/obiekty z pliku tasks-arrays-objects.js.
// Każda linia ma krótki komentarz wyjaśniający logikę.

const users = [
  { id: 1, name: "Ala", active: true, score: 12 },
  { id: 2, name: "Bob", active: false, score: 7 },
  { id: 3, name: "Cezary", active: true, score: 18 },
]; // przykładowe dane wejściowe

function getNames(list) {
  return list.map((u) => u.name); // map wyciąga pole name
}

function getActive(list) {
  return list.filter((u) => u.active === true); // filtruje tylko aktywnych
}

function totalScore(list) {
  return list.reduce((acc, u) => acc + u.score, 0); // sumuje score
}

function findById(list, id) {
  return list.find((u) => u.id === id); // zwraca pierwszy pasujący obiekt
}

function allActive(list) {
  return list.every((u) => u.active); // true gdy każdy ma active=true
}

function anyHighScore(list, minScore = 15) {
  return list.some((u) => u.score > minScore); // true gdy ktoś przekracza próg
}

function sortByScoreDesc(list) {
  return [...list].sort((a, b) => b.score - a.score); // kopia + sort malejąco
}

function addUser(list, user) {
  return [...list, user]; // nowa tablica z dodanym elementem
}

function activateUser(list, id) {
  return list.map((u) =>
    u.id === id ? { ...u, active: true } : u
  ); // zamienia active na true dla wskazanego id
}

function groupByActive(list) {
  return list.reduce(
    (acc, u) => {
      const key = String(u.active); // klucz "true"/"false"
      acc[key].push(u); // dodanie użytkownika do właściwej grupy
      return acc; // zwrot akumulatora
    },
    { true: [], false: [] }
  ); // inicjalny akumulator z dwoma grupami
}

function deepCloneSimple(obj) {
  return JSON.parse(JSON.stringify(obj)); // prosty deep copy dla prymitywów/obiektów
}

function uniqueTags(tags) {
  return Array.from(new Set(tags)); // Set usuwa duplikaty, Array.from tworzy tablicę
}

function countOccurrences(nums) {
  return nums.reduce((acc, n) => {
    acc[n] = (acc[n] || 0) + 1; // zwiększa licznik dla wartości
    return acc; // zwrot akumulatora
  }, {}); // start pusty obiekt
}

function flattenOneLevel(arr) {
  return arr.flat(); // spłaszcza o jeden poziom
}

// Dodatkowe zadanie A: podział na porcje (chunk).
function chunk(list, size = 2) {
  const out = []; // wynikowa tablica kawałków
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size)); // wycinanie fragmentów
  }
  return out; // zwrot pokawałkowanej tablicy
}

// Dodatkowe zadanie B: mediana wyniku.
function medianScore(list) {
  const scores = sortByScoreDesc(list).map((u) => u.score).reverse(); // rosnące wyniki
  const mid = Math.floor(scores.length / 2); // indeks środkowy
  if (scores.length % 2 === 1) return scores[mid]; // nieparzysta liczba elementów
  return (scores[mid - 1] + scores[mid]) / 2; // średnia dwóch środkowych
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
