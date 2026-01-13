// Asynchroniczność w Pythonie (asyncio): async/await, gather, timeout, cancel.
import asyncio  # standardowa biblioteka async

# Prosta korutyna: zwraca wartość po opóźnieniu
async def fetch_value(name: str, delay: float) -> str:
    await asyncio.sleep(delay)               # symulacja I/O
    return f"{name}-done"                    # wynik po opóźnieniu

# Równoległe uruchamianie z gather
async def run_parallel():
    results = await asyncio.gather(          # uruchom kilka zadań równolegle
        fetch_value("a", 0.2),
        fetch_value("b", 0.1),
        fetch_value("c", 0.3),
    )
    return results                           # lista wyników

# Timeout (wait_for)
async def run_with_timeout():
    try:
        return await asyncio.wait_for(fetch_value("slow", 2), timeout=0.5)  # limit czasu
    except asyncio.TimeoutError:
        return "timeout"                     # obsługa przekroczenia czasu

# Anulowanie zadania
async def cancel_task():
    task = asyncio.create_task(fetch_value("cancel", 5))  # uruchom zadanie
    await asyncio.sleep(0.1)                              # poczekaj chwilę
    task.cancel()                                         # anuluj
    try:
        await task                                        # oczekiwanie na anulowanie
    except asyncio.CancelledError:
        return "cancelled"                                # potwierdzenie anulowania

if __name__ == "__main__":
    print(asyncio.run(run_parallel()))      # ['a-done','b-done','c-done']
    print(asyncio.run(run_with_timeout()))  # 'timeout'
    print(asyncio.run(cancel_task()))       # 'cancelled'

# ---
# Dlaczego tak:
# - fetch_value + gather pokazuje równoległe I/O w asyncio bez blokowania.
# - wait_for ilustruje kontrolę czasu wykonania i obsługę TimeoutError.
# - cancel_task demonstruje lifecycle tasków i obsługę CancelledError.
# - asyncio.run w __main__ upraszcza uruchomienie korutyn w pojedynczym skrypcie.
