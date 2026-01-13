// Uzupełnienie algorytmów z listy: MST (Kruskal), topologiczne sortowanie,
// DP (plecak 0/1), greedy (wybór aktywności), grafowe dodatkowe.

// Struktura do Kruskala: Union-Find (DSU) – łączenie i znajdowanie reprezentanta
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i); // rodzic
    this.rank = Array(n).fill(0); // rank (wysokość drzewa)
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // kompresja ścieżki
    return this.parent[x]; // reprezentant
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b); // znajdź reprezentantów
    if (ra === rb) return false; // już w jednej składowej
    if (this.rank[ra] < this.rank[rb]) this.parent[ra] = rb; // podpinanie niższego
    else if (this.rank[ra] > this.rank[rb]) this.parent[rb] = ra;
    else { this.parent[rb] = ra; this.rank[ra] += 1; } // zwiększ rank
    return true; // połączono
  }
}

// MST Kruskal: wejście edges = [u,v,w], n = liczba wierzchołków
function mstKruskal(n, edges) {
  const dsu = new DSU(n); // struktura DSU
  const sorted = [...edges].sort((a, b) => a[2] - b[2]); // sort wg wagi
  const mst = []; // wynikowa lista krawędzi
  for (const [u, v, w] of sorted) {
    if (dsu.union(u, v)) mst.push([u, v, w]); // dodaj, jeśli nie tworzy cyklu
  }
  return mst; // krawędzie MST
}

// Sortowanie topologiczne (Kahn) – graf DAG, lista sąsiedztwa jako Map
function topoSort(adj) {
  const indeg = new Map(); // stopnie wejściowe
  for (const [u, list] of adj.entries()) {
    if (!indeg.has(u)) indeg.set(u, 0); // init
    for (const v of list) indeg.set(v, (indeg.get(v) || 0) + 1); // zlicz
  }
  const q = []; // kolejka wierzchołków o indeg 0
  for (const [v, d] of indeg.entries()) if (d === 0) q.push(v); // start
  const order = []; // wynik
  while (q.length) {
    const v = q.shift(); // zdejmij z kolejki
    order.push(v); // dodaj do wyniku
    for (const nei of adj.get(v) || []) {
      indeg.set(nei, indeg.get(nei) - 1); // zmniejsz stopień
      if (indeg.get(nei) === 0) q.push(nei); // dodaj gdy indeg=0
    }
  }
  return order; // kolejność topologiczna (jeśli DAG)
}

// DP: plecak 0/1 – maksymalna wartość przy limicie wagi
function knapsack01(weights, values, capacity) {
  const n = weights.length; // liczba przedmiotów
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0)); // tablica dp
  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      if (weights[i - 1] <= w) {
        const take = values[i - 1] + dp[i - 1][w - weights[i - 1]]; // bierzemy przedmiot
        const skip = dp[i - 1][w]; // nie bierzemy
        dp[i][w] = Math.max(take, skip); // wybierz lepsze
      } else {
        dp[i][w] = dp[i - 1][w]; // za ciężki, pomijamy
      }
    }
  }
  return dp[n][capacity]; // optymalna wartość
}

// Greedy: wybór aktywności maksymalizujący liczbę zadań (sort po końcu)
function activitySelection(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]); // sort po końcu
  const chosen = []; // wybrane aktywności
  let lastEnd = -Infinity; // koniec ostatniej wybranej
  for (const [start, end] of sorted) {
    if (start >= lastEnd) { // jeśli nie koliduje
      chosen.push([start, end]); // dodaj
      lastEnd = end; // aktualizuj koniec
    }
  }
  return chosen; // lista aktywności
}

// Dodatkowe grafowe: wykrywanie cyklu w DAG podczas topo sort
function hasCycleDAG(adj) {
  const order = topoSort(adj); // sortowanie topologiczne
  const nodeCount = new Set([...adj.keys(), ...[...adj.values()].flat()]).size; // liczba wierzchołków
  return order.length !== nodeCount; // jeśli nie uporządkowano wszystkich, jest cykl
}

module.exports = {
  DSU,
  mstKruskal,
  topoSort,
  knapsack01,
  activitySelection,
  hasCycleDAG,
};

// ---
// Dlaczego tak:
// - Zawiera DSU + Kruskal (MST), topo sort (Kahn), plecak 0/1 (DP), greedy aktywności i detekcję cyklu w DAG.
// - DSU z kompresją ścieżki i union by rank daje near O(α(n)) operacje find/union.
// - topoSort zwraca kolejność, a hasCycleDAG pokazuje, jak wykryć cykl przez długość wyniku vs liczba wierzchołków.
// - knapsack01 i activitySelection ilustrują odpowiednio podejście DP i greedy do klasycznych problemów optymalizacyjnych.
