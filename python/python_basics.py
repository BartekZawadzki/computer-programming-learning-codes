# Podstawy Pythona: typy, zmienne, warunki, pętle, funkcje, list comprehensions, kontekst manager.

# Zmienne i typy prymitywne
username: str = "Ala"            # string z adnotacją typu (opcjonalną)
age: int = 28                    # liczba całkowita
pi: float = 3.14                 # liczba zmiennoprzecinkowa
is_active: bool = True           # wartość logiczna
nothing = None                   # brak wartości

# Kolekcje podstawowe
nums = [1, 2, 3]                 # lista (mutowalna)
coords = (10, 20)                # krotka (niemutowalna)
user = {"id": 1, "name": "Ala"}  # słownik (mapa klucz->wartość)
tags = {"python", "js"}          # zbiór (unikalne elementy)

# Warunek if/elif/else
def classify_temp(t: float) -> str:
    if t < 0:
        return "mróz"            # gałąź <0
    elif t < 20:
        return "chłodno"         # gałąź <20
    return "ciepło"              # pozostałe przypadki

# Pętla for po liście
sum_nums = 0
for n in nums:
    sum_nums += n                # sumowanie elementów listy

# Pętla while
count = 0
while count < 3:
    count += 1                   # inkrementacja aż do 3

# Funkcja z domyślnym argumentem i typowaniem
def greet(name: str = "świecie") -> str:
    return f"Cześć {name}!"      # zwraca przywitanie

# Argumenty pozycyjne/kluczowe i *args/**kwargs
def log(level: str, *args, **kwargs):
    print(level, args, kwargs)   # demonstruje zbieranie argumentów

# List comprehension (mapowanie)
squares = [n * n for n in nums]                 # kwadraty liczb
# Filter + map w jednym
even_squares = [n * n for n in nums if n % 2 == 0]

# Dict comprehension
num_map = {n: n * 2 for n in nums}              # podwójne wartości

# Context manager (with): automatyczne zamknięcie pliku
def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()                         # zawartość pliku

if __name__ == "__main__":
    print(greet())                              # przykładowe wywołanie

# ---
# Dlaczego tak:
# - Zebrane podstawy (typy, warunki, pętle, funkcje, comprehension) to minimum do dalszej nauki.
# - Adnotacje typów są opcjonalne, ale ułatwiają lint/IDE bez wymuszania statycznej kompilacji.
# - Context manager przy plikach pokazuje idiom bezpiecznego zamykania zasobów.
# - Blok __main__ pozwala uruchomić plik jako skrypt i szybko zweryfikować działanie przykładów.
