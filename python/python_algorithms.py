// Algorytmy w Pythonie: sortowanie, wyszukiwanie, BFS/DFS, Dijkstra z heapq
import heapq  # min-heap do Dijkstry
from typing import List, Dict, Set, Tuple

# Bubble sort – O(n^2)
def bubble_sort(arr: List[int]) -> List[int]:
    a = arr.copy()  # nie mutujemy wejścia
    n = len(a)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]  # zamiana
    return a

# Quick sort – średnio O(n log n)
def quick_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr  # baza rekurencji
    pivot = arr[len(arr) // 2]  # wybór pivota
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)

# Wyszukiwanie binarne – O(log n), tablica musi być posortowana
def binary_search(arr: List[int], target: int) -> int:
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2  # środkowy indeks
        if arr[m] == target:
            return m  # znaleziono
        if arr[m] < target:
            l = m + 1  # szukaj w prawej części
        else:
            r = m - 1  # szukaj w lewej
    return -1  # brak

# BFS na grafie nieskierowanym (lista sąsiedztwa jako dict: node -> lista sąsiadów)
def bfs(graph: Dict[str, List[str]], start: str) -> Set[str]:
    visited: Set[str] = set([start])  # odwiedzeni
    queue: List[str] = [start]        # kolejka
    while queue:
        node = queue.pop(0)           # zdejmij z kolejki (dla wydajności użyj deque)
        for nei in graph.get(node, []):
            if nei not in visited:
                visited.add(nei)      # oznacz odwiedzony
                queue.append(nei)     # dodaj do kolejki
    return visited

# DFS rekurencyjny
def dfs(graph: Dict[str, List[str]], start: str, visited=None) -> Set[str]:
    if visited is None:
        visited = set()              # inicjalizacja zbioru
    visited.add(start)               # oznacz odwiedzony
    for nei in graph.get(start, []):
        if nei not in visited:
            dfs(graph, nei, visited) # odwiedź rekurencyjnie
    return visited

# Dijkstra dla dodatnich wag (adj: node -> lista (nei, weight))
def dijkstra(adj: Dict[str, List[Tuple[str, int]]], start: str) -> Dict[str, int]:
    dist = {v: float("inf") for v in adj.keys()}  # odległości
    dist[start] = 0                              # start = 0
    heap: List[Tuple[int, str]] = [(0, start)]   # kopiec (dystans, wierzchołek)

    while heap:
        d, v = heapq.heappop(heap)               # najmniejsza odległość
        if d != dist[v]:
            continue                             # pomiń nieaktualne wpisy
        for nei, w in adj.get(v, []):
            nd = d + w                           # nowa odległość
            if nd < dist.get(nei, float("inf")):
                dist[nei] = nd                   # aktualizuj odległość
                heapq.heappush(heap, (nd, nei))  # dodaj do kopca
    return dist

if __name__ == "__main__":
    arr = [5, 3, 8, 1]
    print(bubble_sort(arr))
    print(quick_sort(arr))
    print(binary_search(sorted(arr), 3))

# ---
# Dlaczego tak:
# - Zestaw obejmuje klasyczne algorytmy: sortowania O(n^2)/O(n log n), binsearch, BFS/DFS i Dijkstrę.
# - Kopia wejścia w bubble_sort chroni przed mutacją; quick_sort pokazuje podział pivot/rekurencję.
# - BFS/DFS ilustrują różne strategie przeszukiwania grafu, a komentarz o deque sygnalizuje optymalizację.
# - Dijkstra z heapq to standard dla dodatnich wag; sprawdzanie d != dist[v] usuwa przestarzałe wpisy z kopca.
