// Klasyczne algorytmy: sortowanie, wyszukiwanie, przechodzenie struktur

// Sortowanie bąbelkowe (bubble sort) – O(n^2)
function bubbleSort(arr) {
  const a = [...arr]; // nie mutuj wejścia
  for (let i = 0; i < a.length - 1; i += 1) {
    for (let j = 0; j < a.length - i - 1; j += 1) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // zamiana miejscami
      }
    }
  }
  return a; // posortowana tablica
}

// Szybkie sortowanie (quick sort) – średnio O(n log n)
function quickSort(arr) {
  if (arr.length <= 1) return arr; // baza rekurencji
  const pivot = arr[Math.floor(arr.length / 2)]; // wybór pivota
  const left = arr.filter((x) => x < pivot); // mniejsze
  const mid = arr.filter((x) => x === pivot); // równe
  const right = arr.filter((x) => x > pivot); // większe
  return [...quickSort(left), ...mid, ...quickSort(right)]; // łączenie
}

// Wyszukiwanie liniowe – O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === target) return i; // znaleziono
  }
  return -1; // brak
}

// Wyszukiwanie binarne – O(log n); wymaga posortowanej tablicy
function binarySearch(sortedArr, target) {
  let l = 0; // lewy indeks
  let r = sortedArr.length - 1; // prawy indeks
  while (l <= r) {
    const m = Math.floor((l + r) / 2); // środek
    if (sortedArr[m] === target) return m; // trafiono
    if (sortedArr[m] < target) l = m + 1; // szukaj w prawej części
    else r = m - 1; // szukaj w lewej
  }
  return -1; // brak
}

// Przechodzenie struktur: DFS i BFS na grafie w postaci list sąsiedztwa
function dfs(graph, start, visited = new Set()) {
  visited.add(start); // oznacz jako odwiedzone
  for (const nei of graph.get(start) || []) {
    if (!visited.has(nei)) dfs(graph, nei, visited); // odwiedź rek.
  }
  return visited; // zbiór odwiedzonych
}

function bfs(graph, start) {
  const visited = new Set([start]); // start odwiedzony
  const q = [start]; // kolejka BFS
  while (q.length) {
    const node = q.shift(); // zdejmij z kolejki
    for (const nei of graph.get(node) || []) {
      if (!visited.has(nei)) {
        visited.add(nei); // oznacz
        q.push(nei); // dodaj do kolejki
      }
    }
  }
  return visited; // zbiór odwiedzonych
}

// ---
// Dlaczego tak:
// - Zawiera klasyczne algorytmy sortowania/wyszukiwania i przeszukiwania grafów (DFS/BFS) w zwięzłej formie.
// - quickSort/bubbleSort nie mutują wejścia (kopie/tablice po filter), co ułatwia testowanie.
// - binarySearch podkreśla wymaganie posortowanej tablicy; DFS/BFS działają na liście sąsiedztwa (Map).
// - Zwracanie Set odwiedzonych ułatwia dalszą obróbkę lub asercje w testach.
