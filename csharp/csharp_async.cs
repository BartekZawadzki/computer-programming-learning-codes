// Asynchroniczność w C#: async/await, Task, HttpClient, timeout, anulowanie.
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

public class CSharpAsync
{
    private static readonly HttpClient client = new HttpClient(); // współdzielony klient

    public static async Task Main()
    {
        var parallel = await RunParallel();                       // równoległe zadania
        Console.WriteLine(string.Join(", ", parallel));           // wypisz wyniki

        var withTimeout = await RunWithTimeout();                 // przykład timeout
        Console.WriteLine(withTimeout);                           // wypisz wynik/timeout

        var cancelled = await CancelTask();                       // przykład anulowania
        Console.WriteLine(cancelled);                             // wypisz status
    }

    // Prosta korutyna: zwraca wartość po opóźnieniu
    private static async Task<string> FetchValue(string name, int delayMs)
    {
        await Task.Delay(delayMs);                                // symulacja I/O
        return $"{name}-done";                                    // zwróć wynik
    }

    // Równoległe uruchomienie z Task.WhenAll
    private static async Task<string[]> RunParallel()
    {
        var tasks = new[]
        {
            FetchValue("a", 200),
            FetchValue("b", 100),
            FetchValue("c", 300)
        };
        return await Task.WhenAll(tasks);                         // poczekaj na wszystkie
    }

    // Timeout z CancellationTokenSource
    private static async Task<string> RunWithTimeout()
    {
        using var cts = new CancellationTokenSource(500);         // timeout 500 ms
        try
        {
            var resp = await client.GetAsync("https://httpbin.org/delay/2", cts.Token);
            return $"status={resp.StatusCode}";                   // zwróć kod statusu
        }
        catch (OperationCanceledException)                        // przerwanie
        {
            return "timeout";                                     // sygnał timeout
        }
    }

    // Anulowanie zadania
    private static async Task<string> CancelTask()
    {
        using var cts = new CancellationTokenSource();            // token anulowania
        var task = FetchValue("cancel", 5000);                    // długie zadanie
        cts.CancelAfter(100);                                     // anuluj po 100 ms
        try
        {
            return await task;                                    // oczekiwanie (może zostać przerwane)
        }
        catch (OperationCanceledException)                        // anulowanie
        {
            return "cancelled";                                   // status
        }
    }
}

// ---
// Dlaczego tak:
// - Pokazuje fundamenty async/await w C#: Task.WhenAll, timeout z CancellationTokenSource, anulowanie.
// - Wspólny HttpClient ogranicza koszty tworzenia socketów i jest zalecany w .NET.
// - Przykłady timeout/cancel ilustrują, jak reagować na długie operacje I/O.
// - Oddzielne metody FetchValue/RunParallel/RunWithTimeout/CancelTask ułatwiają testowanie i rozbudowę.
