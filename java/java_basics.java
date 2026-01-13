// Podstawy Javy: typy, zmienne, operatory, warunki, pętle, tablice, metody.

public class java_basics {
    // Metoda main – punkt startowy programu
    public static void main(String[] args) {
        int age = 28;                              // liczba całkowita
        double pi = 3.1415;                        // liczba zmiennoprzecinkowa
        boolean active = true;                     // wartość logiczna
        char letter = 'A';                         // pojedynczy znak
        String name = "Ala";                       // napis (obiekt klasy String)

        if (age >= 18) {                           // warunek if
            System.out.println("Pełnoletni");      // gałąź true
        } else {
            System.out.println("Niepełnoletni");   // gałąź false
        }

        for (int i = 0; i < 3; i++) {              // pętla for z licznikem
            System.out.println("i=" + i);          // wypisanie licznika
        }

        int j = 0;                                 // inicjalizacja
        while (j < 3) {                            // pętla while
            System.out.println("j=" + j);          // wypisanie
            j++;                                   // inkrementacja
        }

        int[] numbers = {1, 2, 3};                 // tablica intów
        for (int n : numbers) {                    // for-each po tablicy
            System.out.println(n * n);             // kwadrat elementu
        }

        int sum = add(2, 3);                       // wywołanie funkcji dodawania
        System.out.println("Suma=" + sum);         // wypisanie wyniku
    }

    // Prosta metoda statyczna z dwoma argumentami
    public static int add(int a, int b) {
        return a + b;                              // zwrócenie sumy
    }
}

// ---
// Dlaczego tak:
// - Zawiera fundamenty Javy: typy prymitywne, String, if/else, pętle for/while, foreach na tablicy.
// - Metoda add ilustruje definicję i wywołanie funkcji z parametrami/zwrotem.
// - main jako punkt startu pozwala uruchomić przykład bez dodatkowych klas.
