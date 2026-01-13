// Wybrane algorytmy w TypeScript: wyszukiwanie, sortowanie, BFS/DFS, Dijkstra (typowane)

// Binary Search – O(log n), wymaga tablicy posortowanej rosnąco
export function binarySearch(arr: number[], target: number): number {
  let l = 0, r = arr.length - 1; // granice
  while (l <= r) {
    const m = Math.floor((l + r) / 2); // środek
    if (arr[m] === target) return m; // znaleziono
    if (arr[m] < target) l = m + 1; // szukaj w prawej części
    else r = m - 1; // szukaj w lewej części
  }
  return -1; // brak wyniku
}

// Quick Sort – średnio O(n log n)
export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // baza rekurencji
  const pivot = arr[Math.floor(arr.length / 2)]; // pivot
  const left = arr.filter((x) => x < pivot); // mniejsze
  const mid = arr.filter((x) => x === pivot); // równe
  const right = arr.filter((x) => x > pivot); // większe
  return [...quickSort(left), ...mid, ...quickSort(right)]; // łączenie
}

// BFS na grafie (lista sąsiedztwa)
export function bfs<T>(graph: Map<T, T[]>, start: T): Set<T> {
  const visited = new Set<T>([start]); // odwiedzeni
  const queue: T[] = [start]; // kolejka
  while (queue.length) {
    const v = queue.shift() as T; // pobierz element
    for (const nei of graph.get(v) || []) {
      if (!visited.has(nei)) {
        visited.add(nei); // oznacz odwiedzonego
        queue.push(nei); // dodaj do kolejki
      }
    }
  }
  return visited; // wynik
}

// DFS rekurencyjny
export function dfs<T>(graph: Map<T, T[]>, start: T, visited = new Set<T>()): Set<T> {
  visited.add(start); // oznacz
  for (const nei of graph.get(start) || []) {
    if (!visited.has(nei)) dfs(graph, nei, visited); // odwiedź nieodwiedzone
  }
  return visited; // wynik
}

// Dijkstra dla grafu z wagami dodatnimi (lista sąsiedztwa: Map<Node, Array<[Node, weight]>>)
export function dijkstra<T>(adj: Map<T, Array<[T, number]>>, start: T): Map<T, number> {
  const dist = new Map<T, number>(); // odległości
  const visited = new Set<T>(); // odwiedzeni
  const pq: Array<[number, T]> = []; // prosta kolejka (sortowana)

  for (const v of adj.keys()) dist.set(v, Number.POSITIVE_INFINITY); // init
  dist.set(start, 0); // start = 0
  pq.push([0, start]); // wrzucamy start

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // wybierz min
    const [d, v] = pq.shift() as [number, T]; // pobierz
    if (visited.has(v)) continue; // pomijaj odwiedzonych
    visited.add(v); // oznacz

    for (const [nei, w] of adj.get(v) || []) {
      const nd = d + w; // nowa odległość
      if (nd < (dist.get(nei) ?? Number.POSITIVE_INFINITY)) {
        dist.set(nei, nd); // aktualizuj
        pq.push([nd, nei]); // dodaj do kolejki
      }
    }
  }
  return dist; // mapa odległości
}
