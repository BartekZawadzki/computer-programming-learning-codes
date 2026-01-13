// Podstawy algorytmów: wyszukiwanie i sortowanie

// Wyszukiwanie liniowe: O(n), działa na dowolnej tablicy
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === target) return i; // zwraca indeks gdy znajdzie
  }
  return -1; // brak wyniku
}

// Wyszukiwanie binarne: O(log n), wymaga posortowanej tablicy rosnąco
function binarySearch(sortedArr, target) {
  let left = 0; // początek zakresu
  let right = sortedArr.length - 1; // koniec zakresu
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // środkowy indeks
    if (sortedArr[mid] === target) return mid; // trafiony
    if (sortedArr[mid] < target) left = mid + 1; // szukamy w prawej części
    else right = mid - 1; // szukamy w lewej części
  }
  return -1; // brak wyniku
}

// Bubble sort (prosty, edukacyjny): O(n^2)
function bubbleSort(arr) {
  const copy = [...arr]; // nie mutujemy wejścia
  const n = copy.length; // długość tablicy
  for (let i = 0; i < n - 1; i += 1) {
    for (let j = 0; j < n - i - 1; j += 1) {
      if (copy[j] > copy[j + 1]) {
        // zamiana elementów
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
      }
    }
  }
  return copy; // posortowana kopia
}

// Quick sort (rekurencyjny, średnio O(n log n))
function quickSort(arr) {
  if (arr.length <= 1) return arr; // baza rekurencji
  const pivot = arr[Math.floor(arr.length / 2)]; // wybór pivota
  const left = []; // elementy mniejsze
  const right = []; // elementy większe
  const equal = []; // elementy równe pivot
  for (const val of arr) {
    if (val < pivot) left.push(val);
    else if (val > pivot) right.push(val);
    else equal.push(val);
  }
  return [...quickSort(left), ...equal, ...quickSort(right)]; // łączenie wyników
}

// Złożoności czasowe (big-O) w skrócie:
// - linearSearch: O(n)
// - binarySearch: O(log n) (tablica musi być posortowana)
// - bubbleSort: O(n^2) (wolny, edukacyjny)
// - quickSort: O(n log n) średnio, w najgorszym O(n^2) przy złym pivocie

module.exports = {
  linearSearch,
  binarySearch,
  bubbleSort,
  quickSort,
};

// ---
// Dlaczego tak:
// - Zbiera podstawowe algorytmy: wyszukiwanie liniowe/binarne i sortowania bubble/quick z ich założeniami.
// - binarySearch wymaga posortowanej tablicy, co jest zaznaczone; bubble/quick zwracają kopię, nie mutują wejścia.
// - Komentarze o złożoności pomagają ocenić, kiedy użyć którego algorytmu.
// - Eksport umożliwia ponowne użycie w testach lub innych modułach.
