// Podstawy C#: typy, zmienne, warunki, pętle, metody, tablice.
using System;

public class CSharpBasics
{
    // Metoda Main – punkt startowy
    public static void Main(string[] args)
    {
        int age = 28;                           // liczba całkowita
        double pi = 3.1415;                     // liczba zmiennoprzecinkowa
        bool active = true;                     // wartość logiczna
        char letter = 'A';                      // znak
        string name = "Ala";                    // tekst

        if (age >= 18)                          // warunek
            Console.WriteLine("Pełnoletni");    // gałąź true
        else
            Console.WriteLine("Niepełnoletni"); // gałąź false

        for (int i = 0; i < 3; i++)             // pętla for
            Console.WriteLine($"i={i}");        // interpolacja string

        int j = 0;                              // inicjalizacja
        while (j < 3)                           // pętla while
        {
            Console.WriteLine($"j={j}");        // wypisanie
            j++;                                // inkrementacja
        }

        int[] numbers = { 1, 2, 3 };            // tablica
        foreach (var n in numbers)              // foreach po tablicy
            Console.WriteLine(n * n);           // kwadrat

        int sum = Add(2, 3);                    // wywołanie funkcji
        Console.WriteLine($"Suma={sum}");       // wypisanie
    }

    // Prosta metoda statyczna
    public static int Add(int a, int b)
    {
        return a + b;                           // zwróć sumę
    }
}

// ---
// Dlaczego tak:
// - Pokazuje fundamenty C#: typy prymitywne, string, if/else, pętle for/while/foreach, tablice.
// - Metoda Add ilustruje definicję i wywołanie funkcji z parametrami/zwrotem.
// - Main scala wszystkie przykłady w jednym miejscu, umożliwiając szybkie uruchomienie.
