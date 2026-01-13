# Programowanie systemowe i niskopoziomowe w Pythonie: pamięć, procesy, wątki, synchronizacja, deadlock.
# Uwaga: Python ma GIL – wątki nie przyspieszą CPU-bound, ale procesy tak.
import os
import time
import threading
import multiprocessing as mp

# Pamięć: stos vs sterta (stack vs heap)
# - Zmienne lokalne funkcji żyją na stosie Pythona (ramek wywołań).
# - Obiekty są na stercie i zarządzane przez garbage collector (GC refcount + cyclic GC).

def gc_note():
    # gc.collect() może wymusić sprzątanie cykli; zazwyczaj nie trzeba wywoływać ręcznie.
    import gc
    return gc.get_threshold()  # progi GC

# Procesy (API systemowe) – multiprocessing uruchamia osobne procesy (brak GIL współdzielonego).
def worker_proc(x):
    return x * x  # praca CPU-bound

def run_process_pool():
    with mp.Pool(processes=4) as pool:                 # 4 procesy robocze
        return pool.map(worker_proc, [1, 2, 3, 4])     # równoległe liczenie

# Wątki – współdzielona pamięć, wymaga synchronizacji przy sekcjach krytycznych.
counter = 0
lock = threading.Lock()

def inc_safe():
    global counter
    for _ in range(100000):
        with lock:                                     # sekcja krytyczna
            counter += 1                               # ochrona przed race condition

def run_threads():
    global counter
    counter = 0
    threads = [threading.Thread(target=inc_safe) for _ in range(4)]
    for t in threads: t.start()
    for t in threads: t.join()
    return counter                                     # oczekiwane 400000

# Deadlock – przykład: dwa zamki w odwrotnej kolejności.
lock_a = threading.Lock()
lock_b = threading.Lock()

def bad_deadlock():
    def t1():
        with lock_a:
            time.sleep(0.1)
            with lock_b:                               # może czekać na lock_b
                pass
    def t2():
        with lock_b:
            time.sleep(0.1)
            with lock_a:                               # może czekać na lock_a
                pass
    a = threading.Thread(target=t1)
    b = threading.Thread(target=t2)
    a.start(); b.start()
    a.join(timeout=1); b.join(timeout=1)
    return (a.is_alive(), b.is_alive())                # (True, True) sygnalizuje zakleszczenie

if __name__ == "__main__":
    print("GC thresholds:", gc_note())
    print("Proc pool:", run_process_pool())
    print("Threads counter:", run_threads())
    print("Deadlock demo (alive flags):", bad_deadlock())

# ---
# Dlaczego tak:
# - Opis stosu/sterty i GC w Pythonie przypomina, że obiekty są refcountowane + cyclic GC.
# - multiprocessing omija GIL dla zadań CPU-bound, stąd przykład pool.map.
# - Wątki z Lock pokazują konieczność synchronizacji przy współdzielonej pamięci.
# - Deadlock demo z dwoma lockami ilustruje typowy błąd kolejności blokad.
# - Blok __main__ umożliwia szybkie odpalenie i obserwację zachowania bez dodatkowych narzędzi.
