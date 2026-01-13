# OOP w Pythonie: klasy, dziedziczenie, abstrakcje, dataclasses, property.

from abc import ABC, abstractmethod  # abstrakcyjne klasy bazowe
from dataclasses import dataclass     # automatyczne __init__/__repr__

# Zwykła klasa z inicjalizacją i metodą
class BankAccount:
    def __init__(self, owner: str):
        self.owner = owner            # publiczne pole
        self._balance = 0.0           # konwencja: "_" jako pole chronione

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Kwota musi być > 0")  # walidacja
        self._balance += amount        # aktualizacja stanu
        return self._balance

    def withdraw(self, amount: float) -> float:
        if amount > self._balance:
            raise ValueError("Brak środków")        # walidacja salda
        self._balance -= amount        # aktualizacja stanu
        return self._balance

    @property
    def balance(self) -> float:
        return self._balance           # właściwość tylko do odczytu

# Klasa abstrakcyjna
class Notifier(ABC):
    @abstractmethod
    def notify(self, message: str) -> None:
        """Metoda, którą muszą nadpisać podklasy."""

class EmailNotifier(Notifier):
    def __init__(self, target: str):
        self.target = target

    def notify(self, message: str) -> None:
        print(f"Email to {self.target}: {message}")  # implementacja

# Dziedziczenie i polimorfizm
class Animal:
    def speak(self) -> str:
        return "Some sound"            # metoda bazowa

class Dog(Animal):
    def speak(self) -> str:
        return "Woof"                  # nadpisanie metody

# Dataclass – prostsza definicja klasy danych
@dataclass
class User:
    id: int
    name: str
    active: bool = True

if __name__ == "__main__":
    acct = BankAccount("Ala")          # stworzenie konta
    acct.deposit(100)                  # wpłata
    notifier: Notifier = EmailNotifier("test@example.com")  # polimorfizm
    notifier.notify("Hello")           # wywołanie
    dog = Dog()
    print(dog.speak())                 # "Woof"

# ---
# Dlaczego tak:
# - BankAccount pokazuje inkapsulację (pole chronione), walidację i property do kontrolowanego dostępu.
# - Notifier/EmailNotifier ilustrują abstrakcję i polimorfizm z ABC/abstractmethod.
# - Animal/Dog demonstrują proste dziedziczenie i override metod.
# - Dataclass User upraszcza klasy danych (init/eq/repr), co jest typowe w Pythonie 3.10+.
# - Blok __main__ pozwala szybko wywołać przykłady bez pisania testów ręcznie.
