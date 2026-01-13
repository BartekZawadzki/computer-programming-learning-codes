// Kolekcje w Javie: List, Set, Map, iteracja, Collections utility, Comparator.

import java.util.*;

public class java_collections {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();          // dynamiczna lista
        names.add("Ala");                                // dodanie elementu
        names.add("Ola");                                // dodanie elementu
        names.add("Adam");                               // dodanie elementu

        Set<String> unique = new HashSet<>(names);       // zbiór usuwa duplikaty

        Map<String, Integer> scores = new HashMap<>();   // mapa klucz->wartość
        scores.put("Ala", 10);                           // wstaw klucz/wartość
        scores.put("Ola", 15);                           // wstaw klucz/wartość

        for (String n : names) {                         // iteracja po liście
            System.out.println("Name: " + n);            // wypisanie elementu
        }

        for (Map.Entry<String, Integer> e : scores.entrySet()) { // iteracja po mapie
            System.out.println(e.getKey() + "=" + e.getValue()); // klucz=wartość
        }

        Collections.sort(names);                         // sortowanie alfabetyczne
        System.out.println("Sorted: " + names);          // wynik sortowania

        names.sort(Comparator.comparingInt(String::length)); // sortowanie po długości
        System.out.println("By length: " + names);           // wynik sortowania
    }
}

// ---
// Dlaczego tak:
// - Lista/Set/Map pokazują podstawowe typy kolekcji i ich charakterystyki (duplikaty, klucz-wartość).
// - Iteracje po liście i mapie ilustrują for-each i Entry API.
// - Collections.sort i Comparator.comparingInt demonstrują różne kryteria sortowania bez własnych pętli.
