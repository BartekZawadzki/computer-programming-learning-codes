// Kolekcje i LINQ w C#: List/Dictionary, sortowanie, LINQ (Where, Select, Sum, FirstOrDefault).
using System;
using System.Collections.Generic;
using System.Linq;

public class CSharpCollectionsLinq
{
    public static void Main()
    {
        var names = new List<string> { "Ala", "Ola", "Adam" };    // lista
        names.Add("Zenon");                                       // dodanie

        var scores = new Dictionary<string, int>                  // mapa klucz->wartość
        {
            ["Ala"] = 10,
            ["Ola"] = 15
        };

        foreach (var n in names)                                  // iteracja listy
            Console.WriteLine(n);                                 // wypisz

        foreach (var kv in scores)                                // iteracja słownika
            Console.WriteLine($"{kv.Key}={kv.Value}");            // klucz=wartość

        names.Sort();                                             // sort alfabetyczny
        Console.WriteLine(string.Join(", ", names));             // wypisz posortowane

        // LINQ: filter + map + collect
        var evenSquares = Enumerable.Range(1, 5)                  // 1..5
            .Where(n => n % 2 == 0)                               // filtr parzystych
            .Select(n => n * n)                                   // kwadrat
            .ToList();                                            // do listy
        Console.WriteLine(string.Join(", ", evenSquares));       // 4, 16

        int sum = scores.Values.Sum();                            // suma wartości
        Console.WriteLine($"sum={sum}");                          // wypisz sumę

        var firstLong = names.FirstOrDefault(n => n.Length > 3);  // pierwszy spełniający
        Console.WriteLine(firstLong ?? "brak");                   // wypisz lub "brak"
    }
}

// ---
// Dlaczego tak:
// - List/Dictionary pokazują podstawowe kolekcje .NET i iterację po nich.
// - Sort i string.Join ilustrują szybkie sortowanie/wyświetlanie listy.
// - LINQ z Where/Select/ToList demonstruje funkcyjny pipeline na kolekcjach.
// - Sum i FirstOrDefault pokazują agregacje i bezpieczne wyszukiwanie elementu.
