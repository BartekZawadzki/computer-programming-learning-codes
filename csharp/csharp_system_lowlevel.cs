// Programowanie systemowe i niskopoziomowe w C#: pamięć, GC, procesy, wątki, synchronizacja, deadlock.
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

public class CSharpSystemLowlevel
{
    // Pamięć:
    // - Stos: ramki wywołań, wartości typów prostych (struct) przekazywane by value.
    // - Sterta: obiekty referencyjne; zarządzane przez GC (generational, server/workstation).
    // - GC: automatyczne; GC.Collect() to tylko sugestia (zwykle nie wywoływać ręcznie).

    // Uruchomienie procesu zewnętrznego (System.Diagnostics.Process)
    public static void RunProcess()
    {
        var psi = new ProcessStartInfo("dotnet", "--info") { RedirectStandardOutput = true }; // start dotnet
        using var proc = Process.Start(psi)!;                           // uruchom
        proc.WaitForExit();                                            // czekaj
    }

    // Wątki i synchronizacja
    private static int counter = 0;                                    // współdzielona zmienna
    private static readonly object locker = new();                     // lock obiekt

    public static void IncSafe()
    {
        for (int i = 0; i < 100_000; i++)
        {
            lock (locker)                                              // sekcja krytyczna
            {
                counter++;                                             // aktualizacja współdzielonej zmiennej
            }
        }
    }

    public static int RunThreads()
    {
        counter = 0;
        var t1 = new Thread(IncSafe);
        var t2 = new Thread(IncSafe);
        t1.Start(); t2.Start();
        t1.Join(); t2.Join();
        return counter;                                                // oczekiwane 200000
    }

    // Deadlock: dwa locki w odwrotnej kolejności
    private static readonly object lockA = new();
    private static readonly object lockB = new();
    public static (bool, bool) DeadlockDemo()
    {
        var t1 = new Thread(() =>
        {
            lock (lockA)
            {
                Thread.Sleep(100);
                lock (lockB) { }
            }
        });
        var t2 = new Thread(() =>
        {
            lock (lockB)
            {
                Thread.Sleep(100);
                lock (lockA) { }
            }
        });
        t1.Start(); t2.Start();
        t1.Join(500); t2.Join(500);
        return (t1.IsAlive, t2.IsAlive);                               // true/true -> zakleszczenie
    }

    public static async Task Main()
    {
        RunProcess();                                                  // demo procesu
        Console.WriteLine("Threads counter=" + RunThreads());          // demo wątków
        var dl = DeadlockDemo();
        Console.WriteLine($"Deadlock alive: {dl.Item1},{dl.Item2}");   // sygnał deadlocku
        await Task.CompletedTask;                                      // placeholder async
    }
}

// ---
// Dlaczego tak:
// - Komentarze o stosie/stercie/GC przypominają model pamięci i rolę garbage collectora w .NET.
// - ProcessStartInfo demonstruje uruchamianie procesu zewnętrznego i pobieranie outputu.
// - lock na wspólnym obiekcie pokazuje podstawową synchronizację wątków na współdzielonej zmiennej.
// - DeadlockDemo ilustruje błąd odwrotnej kolejności locków i prosty sposób jego wykrycia.
// - Main łączy przykłady, umożliwiając szybkie uruchomienie demonstracji.
