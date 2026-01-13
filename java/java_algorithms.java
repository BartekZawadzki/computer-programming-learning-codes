// Algorytmy w Javie: bubble sort, binary search, BFS/DFS na grafie (lista sąsiedztwa).

import java.util.*;

public class java_algorithms {
    public static void main(String[] args) {
        int[] arr = {5, 3, 8, 1};                     // przykładowa tablica
        bubbleSort(arr);                              // sortowanie bąbelkowe
        System.out.println(Arrays.toString(arr));     // wypisanie posortowanej

        int idx = binarySearch(arr, 5);               // wyszukiwanie binarne
        System.out.println("index of 5=" + idx);      // indeks lub -1

        Map<String, List<String>> graph = new HashMap<>(); // graf jako mapa
        graph.put("A", Arrays.asList("B", "C"));           // sąsiedzi A
        graph.put("B", Arrays.asList("D"));                // sąsiedzi B
        graph.put("C", Arrays.asList("D"));                // sąsiedzi C
        graph.put("D", Collections.emptyList());           // sąsiedzi D

        System.out.println("BFS=" + bfs(graph, "A"));      // kolejność odwiedzin
        Set<String> visited = new LinkedHashSet<>();       // porządek odwiedzania
        dfs(graph, "A", visited);                          // uruchom DFS
        System.out.println("DFS=" + visited);              // wynik DFS
    }

    // Bubble sort in-place O(n^2)
    public static void bubbleSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {               // pętle zagnieżdżone
            for (int j = 0; j < a.length - i - 1; j++) {       // porównanie par
                if (a[j] > a[j + 1]) {                         // jeśli nie w porządku
                    int tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp; // zamiana
                }
            }
        }
    }

    // Binary search O(log n) dla posortowanej tablicy
    public static int binarySearch(int[] a, int target) {
        int l = 0, r = a.length - 1;                       // granice
        while (l <= r) {                                   // dopóki zakres istnieje
            int m = (l + r) / 2;                           // środek
            if (a[m] == target) return m;                  // znaleziono
            if (a[m] < target) l = m + 1;                  // szukaj w prawo
            else r = m - 1;                                // szukaj w lewo
        }
        return -1;                                         // nie znaleziono
    }

    // BFS z kolejką (LinkedList)
    public static List<String> bfs(Map<String, List<String>> g, String start) {
        List<String> order = new ArrayList<>();            // kolejność odwiedzin
        Set<String> seen = new HashSet<>();                // odwiedzone węzły
        Queue<String> q = new LinkedList<>();              // kolejka BFS
        q.add(start); seen.add(start);                     // wrzuć start
        while (!q.isEmpty()) {                             // dopóki coś w kolejce
            String v = q.poll();                           // zdejmij z kolejki
            order.add(v);                                  // zapisz kolejność
            for (String nei : g.getOrDefault(v, List.of())) { // sąsiedzi
                if (seen.add(nei)) {                       // jeśli jeszcze nie widziany
                    q.add(nei);                            // dodaj do kolejki
                }
            }
        }
        return order;                                      // zwróć kolejność
    }

    // DFS rekurencyjny
    public static void dfs(Map<String, List<String>> g, String v, Set<String> seen) {
        seen.add(v);                                       // oznacz odwiedzony
        for (String nei : g.getOrDefault(v, List.of())) {  // iteracja sąsiadów
            if (!seen.contains(nei)) {                     // jeśli nieodwiedzony
                dfs(g, nei, seen);                         // odwiedź rekurencyjnie
            }
        }
    }
}

// ---
// Dlaczego tak:
// - Bubble sort/binary search to klasyczne przykłady złożoności O(n^2)/O(log n) na tablicach.
// - BFS/DFS pokazują dwie strategie przeszukiwania grafu i pracę na liście sąsiedztwa.
// - Spójność z kolekcjami standardowymi (Map/List/Set/Queue) ułatwia przeniesienie do realnych projektów.
