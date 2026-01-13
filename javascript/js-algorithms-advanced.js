// Algorytmy zaawansowane: DP, zachłanne, grafowe, równoległe (uwagi)

// Dynamiczne programowanie: przykład – fibonacci z pamięcią O(n), czas O(n)
function fibDP(n) {
  if (n <= 1) return n; // baza
  const dp = Array(n + 1).fill(0); // tablica wyników
  dp[1] = 1; // fib(1)
  for (let i = 2; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2]; // relacja rekurencyjna
  }
  return dp[n]; // wynik
}

// Zachłanny (greedy): problem rozmiany – wybieraj największy nominał (działa dla kanonicznych systemów)
function coinChangeGreedy(amount, coins = [5, 2, 1]) {
  const used = []; // przechowane monety
  let remaining = amount; // ile zostało
  for (const c of coins) {
    while (remaining >= c) { // dopóki możemy użyć monety
      remaining -= c; // odejmij
      used.push(c); // zapisz
    }
  }
  return used; // lista monet
}

// Grafowe: najkrótsza ścieżka Dijkstra (lista sąsiedztwa z wagami)
function dijkstra(adj, start) {
  const dist = new Map(); // odległości
  const visited = new Set(); // odwiedzeni
  const pq = []; // prosta kolejka (dla prostoty, bez kopca)
  for (const v of adj.keys()) dist.set(v, Infinity); // init
  dist.set(start, 0); // start = 0
  pq.push([0, start]); // [dystans, wierzchołek]

  while (pq.length) {
    // wybierz wierzchołek o najmniejszej odległości (linowo)
    pq.sort((a, b) => a[0] - b[0]); // sort rosnąco
    const [d, v] = pq.shift(); // pobierz minimum
    if (visited.has(v)) continue; // pomiń jeśli już był
    visited.add(v); // oznacz
    for (const [nei, w] of adj.get(v) || []) { // sąsiedzi z wagą
      const nd = d + w; // nowa odległość
      if (nd < dist.get(nei)) { // lepsza droga?
        dist.set(nei, nd); // zaktualizuj
        pq.push([nd, nei]); // dodaj do kolejki
      }
    }
  }
  return dist; // mapa wierzchołek -> dystans
}

// Równoległe: w JS można równoleglić CPU w worker threads / Web Workers lub używać Promise.all dla I/O
async function parallelFetch(urls) {
  // równoległe I/O; nie przyspieszy CPU-bound
  return Promise.all(urls.map((u) => fetch(u).then((r) => r.json()))); // czeka na wszystkie
}

// Grafowe: DFS iteracyjny (stos) – alternatywa do rekurencji
function dfsIterative(adj, start) {
  const visited = new Set(); // odwiedzeni
  const stack = [start]; // stos
  while (stack.length) {
    const v = stack.pop(); // zdejmij wierzchołek
    if (visited.has(v)) continue; // pomiń jeśli odwiedzony
    visited.add(v); // oznacz
    for (const nei of adj.get(v) || []) stack.push(nei); // dodaj sąsiadów
  }
  return visited; // zbiór odwiedzonych
}

// Uwagi o wyborze strategii:
// - DP: gdy mamy podproblemy zachodzące na siebie i strukturę optymalną (np. plecak 0/1, LCS).
// - Greedy: gdy lokalny optymalny wybór prowadzi do globalnego optimum (np. aktywności, Huffman).
// - Grafowe: dobierz algorytm do celu (Dijkstra najkrótsza ścieżka z wagami dodatnimi, BFS dla nieważonych).
// - Równoległe: w JS równoleglimy I/O przez async/await; dla CPU używaj worker threads/Web Workers.

// ---
// Dlaczego tak:
// - Łączy przykłady DP, greedy, Dijkstry i równoległości w jednym pliku jako skrót do wyboru strategii.
// - Dijkstra używa prostej kolejki (sort/shift) dla czytelności; komentarz wskazuje na zamianę na kopiec w produkcji.
// - parallelFetch pokazuje, że Promise.all dotyczy I/O, a nie przyspieszy CPU-bound.
// - Uwagi na końcu pomagają dobrać algorytm do problemu (podproblemy, optymalność lokalna, wagi dodatnie, itp.).
