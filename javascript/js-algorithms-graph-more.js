// Dodatkowe algorytmy grafowe: Prim (MST), topo DFS, Bellman-Ford, Floyd-Warshall

// Prim MST (lista sąsiedztwa: Map node -> Array<[nei, weight]>)
function mstPrim(adj, start) {
  const visited = new Set(); // zbiór odwiedzonych wierzchołków
  const edges = []; // wyjściowe krawędzie MST
  const pq = []; // kolejka priorytetowa (tu tablica sortowana dla prostoty)

  const pushEdges = (v) => {
    for (const [nei, w] of adj.get(v) || []) {
      if (!visited.has(nei)) pq.push([w, v, nei]); // [waga, z, do]
    }
  };

  visited.add(start); // zaczynamy od startu
  pushEdges(start); // dodaj krawędzie wychodzące

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // wybierz najlżejszą krawędź
    const [w, u, v] = pq.shift(); // krawędź o najmniejszej wadze
    if (visited.has(v)) continue; // jeśli już odwiedzone, pomiń
    visited.add(v); // oznacz
    edges.push([u, v, w]); // dodaj do MST
    pushEdges(v); // dorzuć nowe krawędzie
  }
  return edges; // krawędzie MST
}

// Topologiczne sortowanie DFS (DAG)
function topoSortDFS(adj) {
  const visited = new Set(); // odwiedzone
  const temp = new Set(); // stos rekursji do wykrywania cykli
  const order = []; // wynik w odwróconej kolejności

  function dfs(v) {
    if (temp.has(v)) throw new Error("Cycle detected"); // cykl
    if (visited.has(v)) return; // już przetworzony
    temp.add(v); // oznacz na stosie
    for (const nei of adj.get(v) || []) dfs(nei); // przejdź do sąsiadów
    temp.delete(v); // zdejmij ze stosu
    visited.add(v); // oznacz odwiedzony
    order.push(v); // dodaj do wyniku (post-order)
  }

  for (const v of adj.keys()) { // uruchom DFS dla każdego wierzchołka
    if (!visited.has(v)) dfs(v); // start jeśli nieodwiedzony
  }
  return order.reverse(); // odwróć, by uzyskać topologiczną kolejność
}

// Bellman-Ford: najkrótsze ścieżki z jednym źródłem, obsługuje ujemne wagi (bez cykli ujemnych)
// edges = Array<[u, v, w]>, n = liczba wierzchołków, start = źródło
function bellmanFord(n, edges, start) {
  const dist = Array(n).fill(Infinity); // odległości
  dist[start] = 0; // źródło = 0
  for (let i = 0; i < n - 1; i += 1) { // relaksacje n-1 razy
    let changed = false; // flaga zmian
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w; // relaksacja
        changed = true; // zanotuj zmianę
      }
    }
    if (!changed) break; // brak zmian -> zakończ wcześniej
  }
  // wykrywanie cyklu ujemnego: kolejna relaksacja zmienia dystans
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) throw new Error("Negative cycle detected"); // cykl ujemny
  }
  return dist; // tablica odległości
}

// Floyd-Warshall: najkrótsze ścieżki między wszystkimi parami (macierz n x n)
function floydWarshall(matrix) {
  const n = matrix.length; // liczba wierzchołków
  const dist = matrix.map((row) => row.slice()); // kopia macierzy
  for (let k = 0; k < n; k += 1) { // wierzchołek pośredni
    for (let i = 0; i < n; i += 1) { // start
      for (let j = 0; j < n; j += 1) { // cel
        const viaK = dist[i][k] + dist[k][j]; // droga i->k->j
        if (viaK < dist[i][j]) dist[i][j] = viaK; // aktualizacja jeśli krótsza
      }
    }
  }
  return dist; // macierz najkrótszych odległości
}

module.exports = {
  mstPrim,
  topoSortDFS,
  bellmanFord,
  floydWarshall,
};

// ---
// Dlaczego tak:
// - Zestawia kluczowe algorytmy grafowe: MST (Prim), topo sort DFS, Bellman-Ford (ujemne wagi), Floyd-Warshall (all-pairs).
// - Prim używa prostej kolejki (sort) dla czytelności; w praktyce można podmienić na kopiec dla O(E log V).
// - topoSortDFS wykrywa cykle przez zbiór temp, co zabezpiecza przed błędnym użyciem na grafie z cyklem.
// - Bellman-Ford i Floyd-Warshall zwracają odpowiednio tablicę/macierze odległości, gotowe do dalszej analizy.
