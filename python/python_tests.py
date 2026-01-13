# Testy w Pythonie: unittest (wbudowany) i pytest (styl funkcji, asercje bez klas).
# Każda linia z komentarzem co robi.

import unittest                      # wbudowany framework testowy

# Kod do przetestowania (prosta funkcja)
def add(a: int, b: int) -> int:
    return a + b                     # zwraca sumę

# Testy w stylu unittest
class TestMath(unittest.TestCase):
    def test_add_positive(self):
        self.assertEqual(add(2, 3), 5)      # asercja równości

    def test_add_negative(self):
        self.assertEqual(add(-1, -2), -3)   # suma liczb ujemnych

    def test_add_type_error(self):
        with self.assertRaises(TypeError):  # oczekiwany wyjątek
            add("a", 1)                     # błędny typ argumentu

# Testy w stylu pytest (bez klas) – uruchomisz `pytest python_tests.py`
def test_add_pytest_positive():
    assert add(2, 2) == 4                   # prosta asercja

def test_add_pytest_zero():
    assert add(0, 5) == 5                   # suma z zerem

def test_add_pytest_type_error():
    import pytest                           # import lokalny na potrzeby przykładu
    with pytest.raises(TypeError):          # oczekiwany wyjątek
        add("x", 1)                         # błędny typ

if __name__ == "__main__":
    unittest.main()                         # uruchomienie testów unittest

# ---
# Dlaczego tak:
# - add to mała funkcja wspólna dla testów, pozwala pokazać różne style asercji.
# - unittest demonstruje klasowy styl wbudowany w standard lib; pytest funkcje pokazują podejście bez klas.
# - assertRaises/pytest.raises uczą łapania oczekiwanych wyjątków.
# - Blok __main__ umożliwia uruchomienie testów unittest bez dodatkowych komend, a pytest zadziała z linii poleceń.
