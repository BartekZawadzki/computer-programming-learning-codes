// Współbieżność w C#: kanały (System.Threading.Channels), Producer/Consumer, Parallel.ForEach.
using System;
using System.Collections.Generic;
using System.Threading.Channels;
using System.Threading.Tasks;

public class CSharpConcurrencyChannels
{
    public static async Task Main()
    {
        var channel = Channel.CreateUnbounded<int>();          // kanał bez ograniczeń

        // Producent: zapisuje liczby do kanału
        var producer = Task.Run(async () =>
        {
            for (int i = 1; i <= 5; i++)                       // generuj 5 liczb
            {
                await channel.Writer.WriteAsync(i);            // zapisz do kanału
            }
            channel.Writer.Complete();                         // sygnalizuj koniec
        });

        // Konsument: odczytuje liczby z kanału
        var consumer = Task.Run(async () =>
        {
            await foreach (var item in channel.Reader.ReadAllAsync()) // asynchroniczna iteracja
            {
                Console.WriteLine($"got {item}");             // przetwarzanie elementu
            }
        });

        await Task.WhenAll(producer, consumer);               // poczekaj na oba zadania

        // Parallel.ForEach – równoległe przetwarzanie kolekcji
        var data = new List<int> { 1, 2, 3, 4, 5 };
        Parallel.ForEach(data, item =>                        // iteracja równoległa
        {
            // Console.WriteLine($"square {item * item} on {Task.CurrentId}"); // przykładowe logi
        });
    }
}

// ---
// Dlaczego tak:
// - Channels dają bezpieczny wzorzec producer/consumer bez blokad; ReadAllAsync upraszcza asynchroniczny odczyt.
// - WriteAsync/Complete pokazują poprawne zamknięcie kanału po zakończeniu produkcji.
// - Parallel.ForEach demonstruje prostą równoległą pracę na kolekcji CPU-bound.
// - Task.WhenAll synchronizuje producenta i konsumenta, co zapobiega przedwczesnemu zakończeniu programu.
