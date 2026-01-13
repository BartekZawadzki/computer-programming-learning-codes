// Złożoność obliczeniowa: czas i pamięć, notacja Big-O, przykłady

/*
Big-O mówi, jak rośnie koszt (czas/pamięć) względem rozmiaru danych n.
Pomijamy stałe i małe składniki, patrzymy na trend asymptotyczny.
*/

// Czas: O(1) – stały
function getFirst(arr) {
  return arr[0]; // jedno odwołanie niezależnie od n
}

// Czas: O(n) – liniowy
function sumArr(arr) {
  let s = 0; // suma
  for (const x of arr) s += x; // przejście po wszystkich
  return s; // wynik
}

// Czas: O(n^2) – kwadratowy (np. podwójna pętla)
function hasDuplicateQuadratic(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[i] === arr[j]) return true; // znaleziono duplikat
    }
  }
  return false; // brak duplikatów
}

// Czas: O(log n) – logarytmiczny (binarne zawężanie przestrzeni)
function binarySearch(sortedArr, target) {
  let l = 0, r = sortedArr.length - 1; // granice
  while (l <= r) {
    const m = Math.floor((l + r) / 2); // środek
    if (sortedArr[m] === target) return m; // trafiono
    if (sortedArr[m] < target) l = m + 1; else r = m - 1; // zawężenie
  }
  return -1; // brak
}

// Pamięć: O(1) – stała (używamy kilku zmiennych niezależnie od n)
function maxValue(arr) {
  let max = -Infinity; // bieżące maksimum
  for (const x of arr) if (x > max) max = x; // aktualizacja
  return max; // wynik
}

// Pamięć: O(n) – liniowa (tworzymy tablicę długości n)
function copyArr(arr) {
  return [...arr]; // nowa tablica = n elementów
}

/*
Reguły skracania:
- n + n -> O(n)
- n^2 + n -> O(n^2)
- 3^n dominuje nad 2^n -> O(3^n) (eksplozja przy brute force)
- log n z dowolną podstawą różnią się stałą -> O(log n)
*/

// ---
// Dlaczego tak:
// - Plik pokazuje przykłady funkcji o różnych złożonościach czasowych (O(1), O(n), O(n^2), O(log n)) i pamięciowych (O(1), O(n)).
// - Funkcje są minimalne, by skupić się na wzorcu pętli/operacji zamiast na szczegółach domeny.
// - Komentarze z regułami skracania Big-O ilustrują, jak upraszczać wyrażenia złożoności.
// - binarySearch używa zawężania zakresu, by zobrazować logarytmiczny wzrost pracy względem n.
