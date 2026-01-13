// Programowanie systemowe i niskopoziomowe w Javie: pamięć, GC, procesy, wątki, synchronizacja, deadlock.

public class java_system_lowlevel {
    // Pamięć:
    // - Stos (stack): ramki wywołań, zmienne prymitywne/referencje.
    // - Sterta (heap): obiekty; zarządzana przez GC (stop-the-world / generational).
    // - GC: automatyczne zwalnianie; można sugerować System.gc(), ale to tylko hint.

    // Procesy – uruchomienie procesu zewnętrznego
    public static void runProcess() throws Exception {
        Process p = new ProcessBuilder("echo", "hello").start(); // start procesu
        p.waitFor();                                             // czekaj na zakończenie
    }

    // Wątki i synchronizacja
    static class Counter {
        private int value = 0;                                  // współdzielone pole
        public synchronized void inc() { value++; }             // synchronized = blokada na this
        public synchronized int get() { return value; }         // odczyt chroniony
    }

    public static int runThreads() throws InterruptedException {
        Counter c = new Counter();                              // współdzielony licznik
        Runnable task = () -> {                                 // lambda jako Runnable
            for (int i = 0; i < 100_000; i++) c.inc();          // sekcja krytyczna
        };
        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();                                  // start wątków
        t1.join(); t2.join();                                    // czekaj na koniec
        return c.get();                                          // powinno być 200000
    }

    // Deadlock – dwa zamki w odwrotnej kolejności
    static final Object lockA = new Object();
    static final Object lockB = new Object();
    public static boolean[] deadlockDemo() throws InterruptedException {
        Thread t1 = new Thread(() -> {
            synchronized (lockA) {
                try { Thread.sleep(100); } catch (InterruptedException ignored) {}
                synchronized (lockB) { /* ... */ }
            }
        });
        Thread t2 = new Thread(() -> {
            synchronized (lockB) {
                try { Thread.sleep(100); } catch (InterruptedException ignored) {}
                synchronized (lockA) { /* ... */ }
            }
        });
        t1.start(); t2.start();
        t1.join(500); t2.join(500);
        return new boolean[]{t1.isAlive(), t2.isAlive()};       // true/true -> zakleszczenie
    }

    public static void main(String[] args) throws Exception {
        runProcess();                                           // demo procesu
        System.out.println("Threads counter=" + runThreads());  // demo wątków
        boolean[] dl = deadlockDemo();                          // demo deadlock
        System.out.println("Deadlock alive flags: " + dl[0] + "," + dl[1]);
    }
}

// ---
// Dlaczego tak:
// - Komentarze o stosie/stercie/GC przypominają model pamięci Javy i rolę garbage collectora.
// - ProcessBuilder demonstruje uruchamianie procesów zewnętrznych (API systemu).
// - Counter z synchronized pokazuje prostą synchronizację wątków na współdzielonych danych.
// - DeadlockDemo ilustruje klasyczny błąd kolejności locków i jak go wykryć przez sprawdzenie isAlive.
// - main scala przykłady, umożliwiając szybki podgląd efektów bez dodatkowych narzędzi.
