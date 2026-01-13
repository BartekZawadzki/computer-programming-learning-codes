// Strumienie w Javie: filter, map, collect, reduce, Optional.

import java.util.*;
import java.util.stream.*;

public class java_streams {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);      // lista liczb

        List<Integer> evenSquares = nums.stream()               // start strumienia
            .filter(n -> n % 2 == 0)                            // filtr parzystych
            .map(n -> n * n)                                    // mapowanie na kwadraty
            .collect(Collectors.toList());                      // zbieranie do listy

        System.out.println("evenSquares=" + evenSquares);       // wynik: [4,16]

        int sum = nums.stream()                                 // strumień
            .reduce(0, Integer::sum);                           // redukcja do sumy
        System.out.println("sum=" + sum);                       // wynik: 15

        Optional<Integer> maybeFirstBig = nums.stream()         // strumień
            .filter(n -> n > 3)                                 // filtr >3
            .findFirst();                                       // pierwszy spełniający

        System.out.println("first>3=" + maybeFirstBig.orElse(-1)); // jeśli brak, -1
    }
}

// ---
// Dlaczego tak:
// - Przykład pokazuje typowe operacje strumieniowe: filter/map/collect i reduce.
// - Optional z findFirst demonstruje bezpieczne obchodzenie się z brakiem wyniku.
// - Integer::sum w reduce skraca kod i pokazuje użycie metod referencyjnych.
