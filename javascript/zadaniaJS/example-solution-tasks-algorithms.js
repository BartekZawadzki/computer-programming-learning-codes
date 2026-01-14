// Przykładowe rozwiązania zadań algorytmicznych z pliku tasks-algorithms.js.
// Każda linia ma krótki komentarz wyjaśniający logikę.

function binarySearch(arr, target) {
  let l = 0; // lewa granica
  let r = arr.length - 1; // prawa granica
  while (l <= r) {
    const mid = Math.floor((l + r) / 2); // środek
    if (arr[mid] === target) return mid; // trafienie
    if (arr[mid] < target) l = mid + 1; // szukamy w prawej połowie
    else r = mid - 1; // szukamy w lewej połowie
  }
  return -1; // brak elementu
}

function bubbleSort(arr) {
  const out = [...arr]; // kopia wejścia
  for (let i = 0; i < out.length; i += 1) {
    for (let j = 0; j < out.length - 1 - i; j += 1) {
      if (out[j] > out[j + 1]) {
        [out[j], out[j + 1]] = [out[j + 1], out[j]]; // zamiana gdy nie w porządku
      }
    }
  }
  return out; // posortowana kopia
}

function quickSort(arr) {
  if (arr.length <= 1) return arr; // baza rekurencji
  const mid = Math.floor(arr.length / 2); // indeks pivotu
  const pivot = arr[mid]; // wartość pivotu
  const less = []; // mniejsze elementy
  const equal = []; // równe pivotowi
  const greater = []; // większe elementy
  for (const x of arr) {
    if (x < pivot) less.push(x); // dodaj do mniejszych
    else if (x > pivot) greater.push(x); // dodaj do większych
    else equal.push(x); // równe
  }
  return [...quickSort(less), ...equal, ...quickSort(greater)]; // scalenie wyników
}

function dfs(adj, start, visited = new Set()) {
  visited.add(start); // oznacz bieżący
  for (const nei of adj.get(start) || []) {
    if (!visited.has(nei)) dfs(adj, nei, visited); // rekurencja dla nieodwiedzonych
  }
  return visited; // zwrot zbioru odwiedzonych
}

function bfs(adj, start) {
  const visited = new Set([start]); // start odwiedzony
  const q = [start]; // kolejka BFS
  while (q.length) {
    const node = q.shift(); // pobierz z kolejki
    for (const nei of adj.get(node) || []) {
      if (!visited.has(nei)) {
        visited.add(nei); // oznacz odwiedzony
        q.push(nei); // dodaj do kolejki
      }
    }
  }
  return visited; // zwrot odwiedzonych
}

function dijkstra(n, edges, start) {
  const adj = Array.from({ length: n }, () => []); // listy sąsiedztwa
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]); // krawędź u->v
    adj[v].push([u, w]); // krawędź v->u (nieskierowany)
  }
  const dist = Array(n).fill(Infinity); // odległości
  dist[start] = 0; // start ma 0
  const pq = [[0, start]]; // kolejka priorytetowa [d, node]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // sort malejący kosztów
    const [d, node] = pq.shift(); // najmniejszy dystans
    if (d !== dist[node]) continue; // pomijamy nieaktualne wpisy
    for (const [nei, w] of adj[node]) {
      const nd = d + w; // nowa potencjalna odległość
      if (nd < dist[nei]) {
        dist[nei] = nd; // aktualizacja
        pq.push([nd, nei]); // dodanie do kolejki
      }
    }
  }
  return dist; // zwrot tablicy dystansów
}

function topoSort(adj) {
  const indeg = new Map(); // mapa indegree
  for (const [node, list] of adj.entries()) {
    if (!indeg.has(node)) indeg.set(node, 0); // inicjalizacja węzła
    for (const nei of list) {
      indeg.set(nei, (indeg.get(nei) || 0) + 1); // zwiększ indegree sąsiada
    }
  }
  const q = []; // kolejka indegree=0
  for (const [node, deg] of indeg.entries()) {
    if (deg === 0) q.push(node); // dodaj źródła
  }
  const order = []; // wynikowa kolejność
  while (q.length) {
    const node = q.shift(); // zdejmij z kolejki
    order.push(node); // dodaj do wyniku
    for (const nei of adj.get(node) || []) {
      indeg.set(nei, indeg.get(nei) - 1); // zmniejsz indegree
      if (indeg.get(nei) === 0) q.push(nei); // gdy 0 dodaj do kolejki
    }
  }
  return order; // zwrot topologicznej kolejności
}

function hasCycleDirected(adj) {
  const temp = new Set(); // stos rekurencji
  const perm = new Set(); // trwałe odwiedzenie
  const visit = (node) => {
    if (temp.has(node)) return true; // cykl wykryty
    if (perm.has(node)) return false; // już przetworzony
    temp.add(node); // dodaj do stosu
    for (const nei of adj.get(node) || []) {
      if (visit(nei)) return true; // cykl w poddrzewie
    }
    temp.delete(node); // usuń ze stosu
    perm.add(node); // oznacz jako trwały
    return false; // brak cyklu na ścieżce
  };
  for (const node of adj.keys()) {
    if (visit(node)) return true; // jeśli znajdziesz cykl zwróć true
  }
  return false; // brak cyklu
}

function kruskal(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i); // rodzice DSU
  const rank = Array(n).fill(0); // rank dla union by rank
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]); // kompresja ścieżki
    return parent[x]; // korzeń zbioru
  };
  const union = (a, b) => {
    const ra = find(a); // korzeń a
    const rb = find(b); // korzeń b
    if (ra === rb) return false; // już w tym samym zbiorze
    if (rank[ra] < rank[rb]) parent[ra] = rb; // podpinanie niższego pod wyższy
    else if (rank[ra] > rank[rb]) parent[rb] = ra; // odwrotnie
    else {
      parent[rb] = ra; // dowolne połączenie
      rank[ra] += 1; // zwiększenie rangi
    }
    return true; // udane połączenie
  };

  const sorted = [...edges].sort((a, b) => a[2] - b[2]); // sortowanie rosnąco po wadze
  const mst = []; // krawędzie drzewa
  for (const [u, v, w] of sorted) {
    if (union(u, v)) mst.push([u, v, w]); // dodaj gdy łączy różne komponenty
  }
  return mst; // zwrot minimalnego drzewa rozpinającego
}

// Dodatkowe zadanie A: merge sort (niemutujący).
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // baza rekurencji
  const mid = Math.floor(arr.length / 2); // środek tablicy
  const left = mergeSort(arr.slice(0, mid)); // sort lewa połowa
  const right = mergeSort(arr.slice(mid)); // sort prawa połowa
  const out = []; // wynikowe scalenie
  let i = 0; // indeks lewej
  let j = 0; // indeks prawej
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]); // mniejszy z lewej
    else out.push(right[j++]); // mniejszy z prawej
  }
  while (i < left.length) out.push(left[i++]); // dołóż resztę lewej
  while (j < right.length) out.push(right[j++]); // dołóż resztę prawej
  return out; // zwrot scalonej tablicy
}

// Dodatkowe zadanie B: liczba spójnych składowych w grafie nieskierowanym.
function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []); // lista sąsiedztwa
  for (const [u, v] of edges) {
    adj[u].push(v); // dodaj krawędź u->v
    adj[v].push(u); // dodaj krawędź v->u
  }
  const visited = new Set(); // odwiedzone węzły
  let components = 0; // licznik składowych
  const stack = []; // stos do DFS iteracyjnego
  for (let i = 0; i < n; i += 1) {
    if (visited.has(i)) continue; // pomiń odwiedzone
    components += 1; // nowa składowa
    stack.push(i); // rozpocznij DFS
    while (stack.length) {
      const node = stack.pop(); // pobierz ze stosu
      if (visited.has(node)) continue; // pomiń jeśli już odwiedzony
      visited.add(node); // oznacz jako odwiedzony
      for (const nei of adj[node]) {
        if (!visited.has(nei)) stack.push(nei); // dodaj nieodwiedzonych sąsiadów
      }
    }
  }
  return components; // zwrot liczby składowych
}

module.exports = {
  binarySearch,
  bubbleSort,
  quickSort,
  dfs,
  bfs,
  dijkstra,
  topoSort,
  hasCycleDirected,
  kruskal,
  mergeSort,
  countComponents,
};
