// Współbieżność w Javie: Thread, Runnable, synchronized, ExecutorService, Future, CompletableFuture.

import java.util.concurrent.*;

public class java_concurrency {
    public static void main(String[] args) throws Exception {
        Thread t = new Thread(() -> {                     // nowy wątek z Runnable
            System.out.println("Hello from thread");      // praca w wątku
        });
        t.start();                                        // start wątku
        t.join();                                         // poczekaj na zakończenie

        Counter c = new Counter();                        // współdzielony licznik
        Runnable incTask = () -> {                        // zadanie inkrementacji
            for (int i = 0; i < 1000; i++) c.inc();       // zwiększ licznik
        };
        Thread t1 = new Thread(incTask);                  // wątek 1
        Thread t2 = new Thread(incTask);                  // wątek 2
        t1.start(); t2.start();                           // start obu
        t1.join(); t2.join();                             // poczekaj
        System.out.println("counter=" + c.get());         // wynik po synchronizacji

        ExecutorService pool = Executors.newFixedThreadPool(2); // pula 2 wątków
        Future<Integer> f = pool.submit(() -> 2 + 2);     // zadanie zwracające wynik
        System.out.println("future result=" + f.get());   // pobranie wyniku (blokujące)
        pool.shutdown();                                  // zamknięcie puli

        CompletableFuture<String> cf = CompletableFuture   // future z łańcuchami
            .supplyAsync(() -> "hi")                       // etap 1
            .thenApply(s -> s + " there")                  // etap 2
            .thenApply(String::toUpperCase);               // etap 3
        System.out.println("cf=" + cf.get());              // wynik async
    }
}

// Prosty licznik z synchronizacją
class Counter {
    private int value = 0;                            // pole współdzielone
    public synchronized void inc() { value++; }       // synchronized chroni sekcję
    public synchronized int get() { return value; }   // odczyt też chroniony
}

// ---
// Dlaczego tak:
// - Pokazuje podstawowe API współbieżności: Thread/Runnable, synchronized, ExecutorService/Future, CompletableFuture.
// - Counter z synchronized ilustruje ochronę sekcji krytycznej w prosty sposób.
// - Pula wątków i futures to produkcyjny sposób uruchamiania zadań zamiast tworzenia wątków ręcznie.
// - thenApply w CompletableFuture demonstruje łańcuch asynchronicznych przekształceń.
