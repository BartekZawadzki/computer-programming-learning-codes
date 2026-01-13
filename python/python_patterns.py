// Wzorce w Pythonie: singleton (modułowy), factory, strategy, observer, decorator (funkcyjny),
// context manager, DI prosty.
from typing import Protocol, Callable, Any, List
from contextlib import contextmanager

# Singleton modułowy: w Pythonie moduł jest instancją jednokrotnie importowaną.
# Jeśli potrzebny jest kontrolowany singleton klasowy:
class _Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)  # utwórz raz
        return cls._instance                      # zawsze zwracaj tę samą instancję

singleton = _Singleton()  # jedna instancja

# Factory (prosta): wybór obiektu zależnie od parametru
def animal_factory(kind: str):
    if kind == "dog":
        return Dog()
    if kind == "cat":
        return Cat()
    raise ValueError("Unknown kind")

class Animal(Protocol):
    def speak(self) -> str: ...

class Dog:
    def speak(self) -> str: return "Woof"

class Cat:
    def speak(self) -> str: return "Meow"

# Strategy: przekazujemy funkcję jako strategię
def process(items: list[int], strategy: Callable[[int], int]) -> list[int]:
    return [strategy(x) for x in items]  # stosuje strategię do elementów

# Observer: prosta lista callbacków
class Subject:
    def __init__(self):
        self._observers: List[Callable[[Any], None]] = []  # obserwatorzy
    def subscribe(self, fn: Callable[[Any], None]):
        self._observers.append(fn)                        # dodaj obserwatora
    def notify(self, payload: Any):
        for fn in self._observers: fn(payload)            # powiadom wszystkich

# Decorator (funkcyjny): logowanie wejścia/wyjścia
def log_call(fn: Callable):
    def wrapper(*args, **kwargs):
        print(f"calling {fn.__name__} args={args} kwargs={kwargs}")  # log wejścia
        result = fn(*args, **kwargs)                                  # wywołanie oryginału
        print(f"{fn.__name__} -> {result}")                           # log wyniku
        return result                                                # zwróć wynik
    return wrapper

@log_call
def add(a: int, b: int) -> int:
    return a + b                                                     # dodawanie

# Context manager: własny @contextmanager
@contextmanager
def managed_resource():
    print("open resource")        # setup
    try:
        yield "resource"          # udostępnij zasób
    finally:
        print("close resource")   # cleanup

# Prosty DI: rejestr funkcji tworzących zależności
class Container:
    def __init__(self):
        self._registry = {}                       # mapa klucz -> factory
    def register(self, name: str, factory: Callable):
        self._registry[name] = factory            # rejestracja
    def resolve(self, name: str):
        if name not in self._registry:
            raise KeyError(f"{name} not registered")  # błąd braku
        return self._registry[name]()                # wywołaj factory

if __name__ == "__main__":
    # Factory demo
    d = animal_factory("dog"); c = animal_factory("cat")
    print(d.speak(), c.speak())
    # Strategy demo
    print(process([1, 2, 3], lambda x: x * 2))
    # Observer demo
    subj = Subject(); subj.subscribe(lambda p: print("obs:", p)); subj.notify("hi")
    # Decorator demo
    add(2, 3)
    # Context manager demo
    with managed_resource() as r:
        print("using", r)
    # DI demo
    di = Container(); di.register("logger", lambda: print)
    logger = di.resolve("logger"); logger("hello from di")

# ---
# Dlaczego tak:
# - Singleton modułowy/klasowy pokazuje jak ograniczyć liczbę instancji w Pythonie mimo dynamiczności.
# - Factory/Strategy/Observer/Decorator to podstawowe wzorce GoF, pokazane w wersjach funkcyjno-obiektowych Pythona.
# - @contextmanager demonstruje idiom zasobów z automatycznym cleanupem.
# - Prosty Container ilustruje ręczny DI (rejestracja/resolve), co ułatwia testowanie i zamianę implementacji.
# - Blok __main__ uruchamia mini-demonstracje każdego wzorca bez osobnych skryptów.
