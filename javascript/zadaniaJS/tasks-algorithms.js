// Zadania: algorytmy podstawowe (search, sort, DFS/BFS), z komentarzami.
// Na bazie plików z folderu javascript (np. js-algorithms-*.js).

// 1) Binary search (na posortowanej tablicy rosnącej).
//    Zaimplementuj i zwróć indeks target lub -1, jeśli nie ma.
function binarySearch(arr, target) {
  // TODO: klasyczny while (l<=r) z mid, porównaniem i przesuwaniem granic
}

// 2) Bubble sort (niemutujący) — zwróć nową posortowaną tablicę.
function bubbleSort(arr) {
  // TODO: skopiuj tablicę [...arr], użyj dwóch pętli, zamieniaj elementy gdy a[j]>a[j+1]
}

// 3) Quick sort (niemutujący, rekurencyjny) — pivot ze środka.
function quickSort(arr) {
  // TODO: jeśli length<=1 zwróć arr; wybierz pivot, podziel na < == >, rekurencja
}

// 4) DFS (rekurencyjny) na grafie w postaci listy sąsiedztwa Map<node, node[]>.
function dfs(adj, start, visited = new Set()) {
  // TODO: visited.add(start); iteruj po adj.get(start) || []; rekurencyjnie odwiedzaj nieodwiedzone
  // TODO: zwróć visited
}

// 5) BFS na tym samym grafie.
function bfs(adj, start) {
  // TODO: użyj kolejki (array shift lub pointer), dodawaj sąsiadów, zwróć visited Set
}

// 6) Dijkstra (prosty wariant) — graf nieskierowany/dodatnie wagi.
//    edges: Array<[u,v,w]>, n = liczba wierzchołków (0..n-1), start = indeks startowy.
function dijkstra(n, edges, start) {
  // TODO: zbuduj listę sąsiedztwa, użyj tablicy dist z Infinity, dist[start]=0,
  // TODO: prostą kolejkę priorytetową jako array sort/shift (dla edukacji), aktualizuj gdy krótsza ścieżka
  // TODO: zwróć dist
}

// 7) Topologiczne sortowanie (Kahn) — graf DAG jako Map<node, node[]>.
function topoSort(adj) {
  // TODO: oblicz indegree, kolejka z indegree=0, zdejmuj i zmniejszaj indegree sąsiadów
}

// 8) Cykl w grafie (DFS) — wykryj, czy istnieje cykl w grafie skierowanym.
function hasCycleDirected(adj) {
  // TODO: użyj kolorowania/stosu rekurencji (visited/temp) lub iteracyjnie
}

// 9) Kruskal MST — edges [u,v,w], n wierzchołków; zwróć listę krawędzi MST.
function kruskal(n, edges) {
  // TODO: posortuj krawędzie po wadze, DSU union-find, dodawaj gdy łączą różne komponenty
}

// 10) Merge sort (niemutujący)
//     Zaimplementuj rekurencyjny merge sort zwracający nową posortowaną tablicę.
function mergeSort(arr) {
  // TODO: podziel tablicę na pół, rekurencja lewa/prawa, scalenie dwóch posortowanych list
}

// 11) Liczba spójnych składowych w grafie nieskierowanym
//     n wierzchołków (0..n-1), edges: Array<[u,v]>. Zwróć liczbę komponentów.
function countComponents(n, edges) {
  // TODO: zbuduj listę sąsiedztwa; iteracyjny DFS/BFS po nieodwiedzonych, zliczaj komponenty
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
