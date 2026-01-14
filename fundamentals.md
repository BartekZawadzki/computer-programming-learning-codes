# Fundamentals – Podstawowe elementy składni programowania

Kompletny przewodnik po wszystkich znakach, operatorach, elementach składniowych i strukturach używanych w programowaniu (JavaScript, TypeScript, HTML, CSS i powiązane). Każdy element ma pełną definicję, wyjaśnienie działania i przykłady użycia.

---

## Operatory arytmetyczne

### `+` – Operator dodawania / konkatenacji
- **Typ:** Operator binarny
- **Definicja:** Dodaje dwie liczby lub łączy (konkatenuje) dwa stringi
- **Działanie:** 
  - Dla liczb: `5 + 3` → `8`
  - Dla stringów: `"Hello" + " " + "World"` → `"Hello World"`
  - Mieszane typy: `"5" + 3` → `"53"` (konwersja do stringa)
- **Użycie:** Operacje matematyczne, łączenie tekstów, konwersja typów

### `-` – Operator odejmowania / negacji
- **Typ:** Operator binarny (odejmowanie) lub unarny (negacja)
- **Definicja:** Odejmuje jedną liczbę od drugiej lub zmienia znak liczby na przeciwny
- **Działanie:**
  - Binarny: `10 - 4` → `6`
  - Unarny: `-5` → `-5`, `-(-3)` → `3`
- **Użycie:** Operacje matematyczne, negacja wartości

### `*` – Operator mnożenia
- **Typ:** Operator binarny
- **Definicja:** Mnoży dwie liczby
- **Działanie:** `6 * 7` → `42`
- **Użycie:** Operacje matematyczne, obliczenia

### `/` – Operator dzielenia
- **Typ:** Operator binarny
- **Definicja:** Dzieli pierwszą liczbę przez drugą
- **Działanie:** 
  - `15 / 3` → `5`
  - `10 / 3` → `3.333...` (dzielenie zmiennoprzecinkowe)
- **Użycie:** Operacje matematyczne, obliczenia

### `%` – Operator modulo (reszta z dzielenia)
- **Typ:** Operator binarny
- **Definicja:** Zwraca resztę z dzielenia pierwszej liczby przez drugą
- **Działanie:**
  - `10 % 3` → `1` (10 = 3*3 + 1)
  - `15 % 5` → `0` (podzielne bez reszty)
  - `7 % 2` → `1` (sprawdzanie parzystości)
- **Użycie:** Sprawdzanie podzielności, parzystości, cykliczne indeksy

### `**` – Operator potęgowania
- **Typ:** Operator binarny
- **Definicja:** Podnosi pierwszą liczbę do potęgi drugiej
- **Działanie:** `2 ** 3` → `8` (2 do potęgi 3), `10 ** 2` → `100`
- **Użycie:** Obliczenia matematyczne, potęgi

### `++` – Operator inkrementacji
- **Typ:** Operator unarny (pre/post)
- **Definicja:** Zwiększa wartość zmiennej o 1
- **Działanie:**
  - Post-inkrementacja: `let x = 5; x++` → `x` staje się `6`, ale wyrażenie zwraca `5`
  - Pre-inkrementacja: `let x = 5; ++x` → `x` staje się `6` i wyrażenie zwraca `6`
- **Użycie:** Pętle, liczniki, zwiększanie wartości

### `--` – Operator dekrementacji
- **Typ:** Operator unarny (pre/post)
- **Definicja:** Zmniejsza wartość zmiennej o 1
- **Działanie:**
  - Post-dekrementacja: `let x = 5; x--` → `x` staje się `4`, ale wyrażenie zwraca `5`
  - Pre-dekrementacja: `let x = 5; --x` → `x` staje się `4` i wyrażenie zwraca `4`
- **Użycie:** Pętle, liczniki, zmniejszanie wartości

---

## Operatory przypisania

### `=` – Operator przypisania
- **Typ:** Operator przypisania
- **Definicja:** Przypisuje wartość do zmiennej
- **Działanie:** `let x = 10;` → zmienna `x` otrzymuje wartość `10`
- **Użycie:** Podstawowe przypisanie wartości

### `+=` – Operator przypisania z dodawaniem
- **Typ:** Operator przypisania złożonego
- **Definicja:** Dodaje wartość do zmiennej i przypisuje wynik
- **Działanie:** `x += 5` jest równoważne `x = x + 5`
- **Użycie:** Skrócona forma dodawania

### `-=` – Operator przypisania z odejmowaniem
- **Typ:** Operator przypisania złożonego
- **Definicja:** Odejmuje wartość od zmiennej i przypisuje wynik
- **Działanie:** `x -= 3` jest równoważne `x = x - 3`
- **Użycie:** Skrócona forma odejmowania

### `*=` – Operator przypisania z mnożeniem
- **Typ:** Operator przypisania złożonego
- **Definicja:** Mnoży zmienną przez wartość i przypisuje wynik
- **Działanie:** `x *= 2` jest równoważne `x = x * 2`
- **Użycie:** Skrócona forma mnożenia

### `/=` – Operator przypisania z dzieleniem
- **Typ:** Operator przypisania złożonego
- **Definicja:** Dzieli zmienną przez wartość i przypisuje wynik
- **Działanie:** `x /= 2` jest równoważne `x = x / 2`
- **Użycie:** Skrócona forma dzielenia

### `%=` – Operator przypisania z modulo
- **Typ:** Operator przypisania złożonego
- **Definicja:** Oblicza resztę z dzielenia i przypisuje wynik
- **Działanie:** `x %= 3` jest równoważne `x = x % 3`
- **Użycie:** Skrócona forma modulo

### `**=` – Operator przypisania z potęgowaniem
- **Typ:** Operator przypisania złożonego
- **Definicja:** Podnosi zmienną do potęgi i przypisuje wynik
- **Działanie:** `x **= 2` jest równoważne `x = x ** 2`
- **Użycie:** Skrócona forma potęgowania

---

## Operatory porównania

### `==` – Operator równości (luźne porównanie)
- **Typ:** Operator porównania
- **Definicja:** Porównuje wartości z konwersją typów (type coercion)
- **Działanie:**
  - `5 == "5"` → `true` (konwersja typów)
  - `null == undefined` → `true`
  - `0 == false` → `true`
- **Użycie:** Rzadko zalecane; preferuj `===`

### `===` – Operator równości (ścisłe porównanie)
- **Typ:** Operator porównania
- **Definicja:** Porównuje wartości i typy bez konwersji
- **Działanie:**
  - `5 === 5` → `true`
  - `5 === "5"` → `false` (różne typy)
  - `null === undefined` → `false`
- **Użycie:** Zalecane porównanie wartości

### `!=` – Operator nierówności (luźne)
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy wartości nie są równe (z konwersją typów)
- **Działanie:** `5 != "5"` → `false` (po konwersji są równe)
- **Użycie:** Rzadko zalecane; preferuj `!==`

### `!==` – Operator nierówności (ścisłe)
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy wartości lub typy nie są równe
- **Działanie:**
  - `5 !== "5"` → `true` (różne typy)
  - `5 !== 5` → `false`
- **Użycie:** Zalecane sprawdzanie nierówności

### `>` – Operator większe niż
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy pierwsza wartość jest większa od drugiej
- **Działanie:** `10 > 5` → `true`, `3 > 7` → `false`
- **Użycie:** Porównania numeryczne, sortowanie

### `<` – Operator mniejsze niż
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy pierwsza wartość jest mniejsza od drugiej
- **Działanie:** `3 < 7` → `true`, `10 < 5` → `false`
- **Użycie:** Porównania numeryczne, sortowanie

### `>=` – Operator większe lub równe
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy pierwsza wartość jest większa lub równa drugiej
- **Działanie:** `5 >= 5` → `true`, `5 >= 3` → `true`, `5 >= 7` → `false`
- **Użycie:** Porównania numeryczne, warunki zakresu

### `<=` – Operator mniejsze lub równe
- **Typ:** Operator porównania
- **Definicja:** Sprawdza, czy pierwsza wartość jest mniejsza lub równa drugiej
- **Działanie:** `5 <= 5` → `true`, `3 <= 5` → `true`, `7 <= 5` → `false`
- **Użycie:** Porównania numeryczne, warunki zakresu

---

## Operatory logiczne

### `&&` – Operator logiczny AND (i)
- **Typ:** Operator logiczny binarny
- **Definicja:** Zwraca pierwszą wartość falsy lub ostatnią wartość truthy (short-circuit evaluation)
- **Działanie:**
  - `true && true` → `true`
  - `true && false` → `false`
  - `false && true` → `false` (nie sprawdza drugiej wartości)
  - `"hello" && "world"` → `"world"` (zwraca ostatnią truthy)
- **Użycie:** Warunki logiczne, sprawdzanie wielu warunków

### `||` – Operator logiczny OR (lub)
- **Typ:** Operator logiczny binarny
- **Definicja:** Zwraca pierwszą wartość truthy lub ostatnią wartość falsy (short-circuit evaluation)
- **Działanie:**
  - `true || false` → `true` (nie sprawdza drugiej wartości)
  - `false || true` → `true`
  - `false || false` → `false`
  - `null || "default"` → `"default"` (wartość domyślna)
- **Użycie:** Warunki logiczne, wartości domyślne

### `!` – Operator logiczny NOT (negacja)
- **Typ:** Operator logiczny unarny
- **Definicja:** Zwraca przeciwną wartość logiczną
- **Działanie:**
  - `!true` → `false`
  - `!false` → `true`
  - `!0` → `true` (0 jest falsy)
  - `!""` → `true` (pusty string jest falsy)
- **Użycie:** Negacja warunków, konwersja do boolean

### `??` – Operator nullish coalescing
- **Typ:** Operator logiczny binarny
- **Definicja:** Zwraca prawą wartość tylko gdy lewa jest `null` lub `undefined`
- **Działanie:**
  - `null ?? "default"` → `"default"`
  - `undefined ?? "default"` → `"default"`
  - `0 ?? "default"` → `0` (0 nie jest null/undefined)
  - `"" ?? "default"` → `""` (pusty string nie jest null/undefined)
- **Użycie:** Wartości domyślne tylko dla null/undefined

---

## Operatory bitowe

### `&` – Operator bitowy AND
- **Typ:** Operator bitowy binarny
- **Definicja:** Wykonuje operację AND na bitach dwóch liczb
- **Działanie:** `5 & 3` → `1` (0101 & 0011 = 0001)
- **Użycie:** Manipulacja bitami, flagi, maski

### `|` – Operator bitowy OR
- **Typ:** Operator bitowy binarny
- **Definicja:** Wykonuje operację OR na bitach dwóch liczb
- **Działanie:** `5 | 3` → `7` (0101 | 0011 = 0111)
- **Użycie:** Manipulacja bitami, flagi

### `^` – Operator bitowy XOR
- **Typ:** Operator bitowy binarny
- **Definicja:** Wykonuje operację XOR (exclusive OR) na bitach dwóch liczb
- **Działanie:** `5 ^ 3` → `6` (0101 ^ 0011 = 0110)
- **Użycie:** Manipulacja bitami, szyfrowanie

### `~` – Operator bitowy NOT
- **Typ:** Operator bitowy unarny
- **Definicja:** Odwraca wszystkie bity liczby
- **Działanie:** `~5` → `-6` (w JavaScript liczby są 32-bitowe signed)
- **Użycie:** Manipulacja bitami, negacja bitowa

### `<<` – Operator przesunięcia w lewo
- **Typ:** Operator bitowy binarny
- **Definicja:** Przesuwa bity w lewo o określoną liczbę pozycji
- **Działanie:** `5 << 1` → `10` (0101 << 1 = 1010, czyli mnożenie przez 2)
- **Użycie:** Szybkie mnożenie przez potęgi 2

### `>>` – Operator przesunięcia w prawo (signed)
- **Typ:** Operator bitowy binarny
- **Definicja:** Przesuwa bity w prawo z zachowaniem znaku
- **Działanie:** `-5 >> 1` → `-3` (zachowuje znak)
- **Użycie:** Szybkie dzielenie przez potęgi 2 (ze znakiem)

### `>>>` – Operator przesunięcia w prawo (unsigned)
- **Typ:** Operator bitowy binarny
- **Definicja:** Przesuwa bity w prawo bez zachowania znaku (wypełnia zerami)
- **Działanie:** `-5 >>> 1` → `2147483645` (traktuje jako unsigned)
- **Użycie:** Szybkie dzielenie przez potęgi 2 (bez znaku)

---

## Operatory dostępu i wywołania

### `.` – Operator dostępu do właściwości
- **Typ:** Operator dostępu
- **Definicja:** Umożliwia dostęp do właściwości obiektu lub metody
- **Działanie:**
  - `obj.property` → dostęp do właściwości
  - `obj.method()` → wywołanie metody
  - `arr.length` → dostęp do właściwości tablicy
- **Użycie:** Dostęp do właściwości obiektów, wywołania metod

### `[]` – Operator dostępu przez indeks / bracket notation
- **Typ:** Operator dostępu
- **Definicja:** Umożliwia dostęp do właściwości obiektu lub elementu tablicy przez indeks/nazwę
- **Działanie:**
  - `arr[0]` → pierwszy element tablicy
  - `obj["property"]` → dostęp do właściwości (dynamiczna nazwa)
  - `obj[computedKey]` → dostęp z użyciem zmiennej
- **Użycie:** Dynamiczny dostęp, indeksy tablic, właściwości ze spacjami

### `()` – Nawiasy okrągłe (wywołanie funkcji / grupowanie)
- **Typ:** Operator wywołania / grupowania
- **Definicja:** 
  - Wywołuje funkcję: `func()`
  - Grupuje wyrażenia: `(2 + 3) * 4`
  - Określa parametry funkcji: `function add(a, b)`
- **Działanie:**
  - `myFunction()` → wywołuje funkcję
  - `(5 + 3) * 2` → najpierw dodaje, potem mnoży
- **Użycie:** Wywołania funkcji, kontrola kolejności operacji, parametry

### `new` – Operator konstruktora
- **Typ:** Operator konstruktora
- **Definicja:** Tworzy nową instancję obiektu z klasy lub konstruktora
- **Działanie:** `new Date()` → nowy obiekt Date, `new Array(5)` → tablica z 5 elementami
- **Użycie:** Tworzenie instancji klas, obiektów wbudowanych

### `?.` – Operator optional chaining
- **Typ:** Operator dostępu bezpiecznego
- **Definicja:** Bezpiecznie uzyskuje dostęp do właściwości, zwracając `undefined` jeśli obiekt jest null/undefined
- **Działanie:**
  - `obj?.property` → `undefined` jeśli `obj` jest null/undefined
  - `obj?.method?.()` → wywołuje metodę tylko jeśli istnieje
  - `arr?.[0]` → dostęp do elementu tylko jeśli tablica istnieje
- **Użycie:** Bezpieczny dostęp do zagnieżdżonych właściwości

### `??=` – Operator nullish coalescing assignment
- **Typ:** Operator przypisania złożonego
- **Definicja:** Przypisuje wartość tylko jeśli zmienna jest null/undefined
- **Działanie:** `x ??= "default"` jest równoważne `x = x ?? "default"`
- **Użycie:** Inicjalizacja zmiennych tylko gdy są null/undefined

---

## Operatory rozprzestrzeniania i destrukturyzacji

### `...` – Operator spread / rest
- **Typ:** Operator rozprzestrzeniania / reszty
- **Definicja:** 
  - **Spread:** Rozprzestrzenia elementy tablicy/obiektu
  - **Rest:** Zbiera pozostałe elementy do tablicy/obiektu
- **Działanie:**
  - Spread: `[...arr1, ...arr2]` → łączy tablice
  - Spread: `{...obj1, ...obj2}` → łączy obiekty
  - Rest w parametrach: `function(...args)` → zbiera argumenty do tablicy
  - Rest w destrukturyzacji: `const [first, ...rest] = arr`
- **Użycie:** Kopiowanie, łączenie, zbieranie argumentów

---

## Operatory specjalne

### `typeof` – Operator typu
- **Typ:** Operator unarny
- **Definicja:** Zwraca string reprezentujący typ wartości
- **Działanie:**
  - `typeof 5` → `"number"`
  - `typeof "hello"` → `"string"`
  - `typeof true` → `"boolean"`
  - `typeof undefined` → `"undefined"`
  - `typeof null` → `"object"` (znany błąd JavaScript)
  - `typeof function(){}` → `"function"`
- **Użycie:** Sprawdzanie typów, debugowanie

### `instanceof` – Operator instancji
- **Typ:** Operator binarny
- **Definicja:** Sprawdza, czy obiekt jest instancją danej klasy/konstruktora
- **Działanie:**
  - `obj instanceof Date` → `true` jeśli obj jest instancją Date
  - `arr instanceof Array` → `true` dla tablic
- **Użycie:** Sprawdzanie typu obiektu, dziedziczenie

### `in` – Operator przynależności
- **Typ:** Operator binarny
- **Definicja:** Sprawdza, czy właściwość istnieje w obiekcie
- **Działanie:**
  - `"name" in obj` → `true` jeśli obj ma właściwość "name"
  - `"length" in arr` → `true` (właściwość tablicy)
- **Użycie:** Sprawdzanie istnienia właściwości

### `delete` – Operator usuwania
- **Typ:** Operator unarny
- **Definicja:** Usuwa właściwość z obiektu
- **Działanie:**
  - `delete obj.property` → usuwa właściwość z obiektu
  - `delete arr[0]` → usuwa element (zostawia "hole" w tablicy)
- **Użycie:** Usuwanie właściwości obiektów

### `void` – Operator void
- **Typ:** Operator unarny
- **Definicja:** Wykonuje wyrażenie i zawsze zwraca `undefined`
- **Działanie:** `void 0` → `undefined`, `void expression` → `undefined`
- **Użycie:** Rzadko używany, czasem w minifikacji kodu

---

## Znaki i symbole strukturalne

### `{}` – Nawiasy klamrowe (blok kodu / obiekt)
- **Typ:** Separator bloku / literał obiektu
- **Definicja:**
  - **Blok kodu:** Grupuje instrukcje w zakres (scope)
  - **Literał obiektu:** Definiuje obiekt JavaScript
- **Działanie:**
  - Blok: `{ let x = 5; }` → tworzy zakres blokowy
  - Obiekt: `{ name: "John", age: 30 }` → tworzy obiekt
- **Użycie:** Funkcje, pętle, warunki, obiekty

### `[]` – Nawiasy kwadratowe (tablica / dostęp)
- **Typ:** Literał tablicy / operator dostępu
- **Definicja:**
  - **Literał tablicy:** Definiuje tablicę JavaScript
  - **Dostęp:** Umożliwia dostęp do elementów przez indeks
- **Działanie:**
  - Tablica: `[1, 2, 3]` → tworzy tablicę
  - Dostęp: `arr[0]` → pierwszy element
- **Użycie:** Tablice, dostęp do właściwości, destrukturyzacja

### `()` – Nawiasy okrągłe (wywołanie / grupowanie)
- **Typ:** Operator wywołania / grupowanie wyrażeń
- **Definicja:**
  - **Wywołanie funkcji:** `func()`
  - **Grupowanie:** Kontroluje kolejność wykonywania
  - **Parametry:** Definiuje parametry funkcji
- **Działanie:**
  - `(2 + 3) * 4` → najpierw dodaje, potem mnoży
  - `myFunction(arg1, arg2)` → wywołuje funkcję z argumentami
- **Użycie:** Wyrażenia, funkcje, warunki, pętle

### `;` – Średnik (kończenie instrukcji)
- **Typ:** Separator instrukcji
- **Definicja:** Kończy instrukcję w JavaScript (opcjonalny w wielu przypadkach dzięki ASI)
- **Działanie:** `let x = 5;` → kończy deklarację zmiennej
- **Użycie:** Kończenie instrukcji (zalecane dla czytelności)

### `,` – Przecinek (separator)
- **Typ:** Separator elementów
- **Definicja:** Oddziela elementy w listach, parametrach, deklaracjach
- **Działanie:**
  - Parametry: `function add(a, b, c)`
  - Argumenty: `add(1, 2, 3)`
  - Deklaracje: `let a = 1, b = 2, c = 3`
  - Elementy tablicy: `[1, 2, 3]`
- **Użycie:** Listy, parametry, deklaracje wielu zmiennych

### `:` – Dwukropek (etykieta / obiekt / ternary)
- **Typ:** Separator etykiety / właściwości / warunku
- **Definicja:**
  - **Właściwości obiektu:** `{ name: "John" }`
  - **Etykiety:** `label: statement` (rzadko używane)
  - **Ternary operator:** `condition ? value1 : value2`
- **Działanie:**
  - Obiekt: `{ age: 30 }` → definiuje właściwość
  - Ternary: `x > 0 ? "positive" : "negative"` → warunkowa wartość
- **Użycie:** Obiekty, ternary operator, etykiety

### `?` – Znak zapytania (ternary / optional chaining)
- **Typ:** Operator warunkowy / optional chaining
- **Definicja:**
  - **Ternary:** `condition ? valueIfTrue : valueIfFalse`
  - **Optional chaining:** `obj?.property`
- **Działanie:**
  - Ternary: `x > 0 ? "positive" : "negative"`
  - Optional: `user?.address?.city` → bezpieczny dostęp
- **Użycie:** Warunki jednoliniowe, bezpieczny dostęp

---

## Słowa kluczowe i struktury kontrolne

### `if` – Instrukcja warunkowa
- **Typ:** Słowo kluczowe (instrukcja warunkowa)
- **Definicja:** Wykonuje kod tylko jeśli warunek jest prawdziwy
- **Składnia:** `if (condition) { code }`
- **Działanie:** Sprawdza warunek, jeśli `true` wykonuje blok kodu
- **Użycie:** Warunki, logika warunkowa

### `else` – Alternatywa warunkowa
- **Typ:** Słowo kluczowe (część instrukcji warunkowej)
- **Definicja:** Wykonuje kod gdy warunek `if` jest fałszywy
- **Składnia:** `if (condition) { code1 } else { code2 }`
- **Działanie:** Wykonuje `code2` gdy `condition` jest `false`
- **Użycie:** Alternatywne ścieżki wykonania

### `else if` – Kaskadowa warunkowość
- **Typ:** Słowo kluczowe (rozszerzenie if-else)
- **Definicja:** Sprawdza kolejny warunek jeśli poprzedni był fałszywy
- **Składnia:** `if (cond1) { } else if (cond2) { } else { }`
- **Działanie:** Sprawdza warunki sekwencyjnie
- **Użycie:** Wiele warunków, kaskadowe sprawdzanie

### `switch` – Instrukcja przełączająca
- **Typ:** Słowo kluczowe (instrukcja wielowarunkowa)
- **Definicja:** Porównuje wartość z wieloma przypadkami
- **Składnia:**
  ```javascript
  switch (value) {
    case 1: code; break;
    case 2: code; break;
    default: code;
  }
  ```
- **Działanie:** Porównuje `value` z każdym `case`, wykonuje dopasowany kod
- **Użycie:** Wielowarunkowe wybory, zastępowanie wielu if-else

### `case` – Przypadek w switch
- **Typ:** Słowo kluczowe (część switch)
- **Definicja:** Definiuje wartość do porównania w instrukcji switch
- **Składnia:** `case value: code;`
- **Działanie:** Jeśli wartość switch pasuje do `value`, wykonuje kod
- **Użycie:** Definiowanie przypadków w switch

### `default` – Domyślny przypadek
- **Typ:** Słowo kluczowe (część switch)
- **Definicja:** Wykonuje się gdy żaden `case` nie pasuje
- **Składnia:** `default: code;`
- **Działanie:** Wykonuje kod gdy brak dopasowania
- **Użycie:** Obsługa nieoczekiwanych wartości

### `break` – Przerwanie wykonania
- **Typ:** Słowo kluczowe (kontrola przepływu)
- **Definicja:** Przerywa wykonanie pętli lub switch
- **Składnia:** `break;`
- **Działanie:** Natychmiast wychodzi z pętli/switch
- **Użycie:** Przerwanie pętli, zapobieganie fall-through w switch

### `continue` – Kontynuacja pętli
- **Typ:** Słowo kluczowe (kontrola przepływu)
- **Definicja:** Pomija resztę iteracji i przechodzi do następnej
- **Składnia:** `continue;`
- **Działanie:** Przechodzi do następnej iteracji pętli
- **Użycie:** Pomijanie niektórych iteracji

---

## Pętle

### `for` – Pętla for
- **Typ:** Słowo kluczowe (pętla)
- **Definicja:** Pętla z inicjalizacją, warunkiem i inkrementacją
- **Składnia:** `for (init; condition; increment) { code }`
- **Działanie:**
  1. Wykonuje `init` (raz)
  2. Sprawdza `condition`
  3. Jeśli `true`, wykonuje `code`
  4. Wykonuje `increment`
  5. Powtarza od kroku 2
- **Użycie:** Iteracja z licznikiem, znana liczba iteracji

### `while` – Pętla while
- **Typ:** Słowo kluczowe (pętla)
- **Definicja:** Pętla wykonująca się dopóki warunek jest prawdziwy
- **Składnia:** `while (condition) { code }`
- **Działanie:** Sprawdza warunek, jeśli `true` wykonuje kod i powtarza
- **Użycie:** Pętle z nieznaną liczbą iteracji, warunki zewnętrzne

### `do...while` – Pętla do-while
- **Typ:** Słowo kluczowe (pętla)
- **Definicja:** Pętla wykonująca kod przynajmniej raz, potem sprawdzająca warunek
- **Składnia:** `do { code } while (condition);`
- **Działanie:** Wykonuje kod, potem sprawdza warunek, powtarza jeśli `true`
- **Użycie:** Pętle wymagające wykonania przynajmniej raz

### `for...in` – Pętla for-in
- **Typ:** Słowo kluczowe (pętla iteracyjna)
- **Definicja:** Iteruje po kluczach/właściwościach obiektu
- **Składnia:** `for (key in object) { code }`
- **Działanie:** Iteruje po wszystkich wyliczalnych właściwościach obiektu
- **Użycie:** Iteracja po właściwościach obiektu (uwaga: może iterować po prototypie)

### `for...of` – Pętla for-of
- **Typ:** Słowo kluczowe (pętla iteracyjna)
- **Definicja:** Iteruje po wartościach iterowalnych (tablice, stringi, Map, Set)
- **Składnia:** `for (value of iterable) { code }`
- **Działanie:** Iteruje po wartościach, nie po indeksach
- **Użycie:** Iteracja po tablicach, stringach, kolekcjach (preferowane nad for-in dla tablic)

---

## Funkcje

### `function` – Deklaracja funkcji
- **Typ:** Słowo kluczowe (deklaracja funkcji)
- **Definicja:** Tworzy funkcję z nazwą (hoisted)
- **Składnia:** `function name(params) { code }`
- **Działanie:** Tworzy funkcję dostępną w całym zakresie (hoisting)
- **Użycie:** Definiowanie funkcji, funkcje nazwane

### `=>` – Arrow function (funkcja strzałkowa)
- **Typ:** Operator (składnia funkcji)
- **Definicja:** Skrócona składnia funkcji z automatycznym `this` binding
- **Składnia:**
  - `(params) => expression` (implicit return)
  - `(params) => { code }` (explicit return)
- **Działanie:** 
  - Nie ma własnego `this` (dziedziczy z zakresu zewnętrznego)
  - Nie ma `arguments`
  - Nie może być konstruktorem
- **Użycie:** Funkcje krótkie, callbacks, zachowanie `this`

### `return` – Zwracanie wartości
- **Typ:** Słowo kluczowe (kontrola przepływu)
- **Definicja:** Kończy wykonanie funkcji i zwraca wartość
- **Składnia:** `return value;` lub `return;` (zwraca `undefined`)
- **Działanie:** Natychmiast kończy funkcję, zwraca wartość
- **Użycie:** Zwracanie wyników z funkcji

### `arguments` – Obiekt arguments
- **Typ:** Obiekt wbudowany (tylko w funkcjach tradycyjnych)
- **Definicja:** Obiekt podobny do tablicy zawierający argumenty funkcji
- **Działanie:** `arguments[0]`, `arguments.length` (nie działa w arrow functions)
- **Użycie:** Dostęp do argumentów bez deklaracji parametrów (rzadko używane)

---

## Klasy i obiekty

### `class` – Deklaracja klasy
- **Typ:** Słowo kluczowe (definicja klasy)
- **Definicja:** Tworzy szablon dla obiektów (ES6+)
- **Składnia:**
  ```javascript
  class Name {
    constructor(params) { }
    method() { }
  }
  ```
- **Działanie:** Definiuje klasę z konstruktorem i metodami
- **Użycie:** Programowanie obiektowe, enkapsulacja

### `constructor` – Konstruktor klasy
- **Typ:** Słowo kluczowe (metoda specjalna)
- **Definicja:** Metoda wywoływana przy tworzeniu instancji
- **Składnia:** `constructor(params) { this.property = value; }`
- **Działanie:** Inicjalizuje nową instancję klasy
- **Użycie:** Inicjalizacja właściwości instancji

### `this` – Kontekst wykonania
- **Typ:** Słowo kluczowe (kontekst)
- **Definicja:** Odnosi się do obiektu, w kontekście którego wykonuje się kod
- **Działanie:**
  - W metodzie: `this` = instancja obiektu
  - W arrow function: `this` z zakresu zewnętrznego
  - W funkcji globalnej: `this` = `window` (browser) / `global` (Node)
- **Użycie:** Dostęp do właściwości/method obiektu

### `super` – Odwołanie do klasy nadrzędnej
- **Typ:** Słowo kluczowe (dziedziczenie)
- **Definicja:** Odwołuje się do konstruktora/metody klasy nadrzędnej
- **Składnia:** `super(params)` (konstruktor), `super.method()` (metoda)
- **Działanie:** Wywołuje konstruktor/metodę klasy bazowej
- **Użycie:** Dziedziczenie, rozszerzanie klas

### `extends` – Dziedziczenie klas
- **Typ:** Słowo kluczowe (dziedziczenie)
- **Definicja:** Określa klasę bazową dla dziedziczenia
- **Składnia:** `class Child extends Parent { }`
- **Działanie:** Klasa Child dziedziczy właściwości i metody Parent
- **Użycie:** Dziedziczenie, polimorfizm

### `static` – Metoda/właściwość statyczna
- **Typ:** Słowo kluczowe (modyfikator)
- **Definicja:** Definiuje metodę/właściwość należącą do klasy, nie instancji
- **Składnia:** `static method() { }`
- **Działanie:** Wywoływana przez klasę, nie przez instancję: `Class.method()`
- **Użycie:** Metody narzędziowe, fabryki, stałe klasowe

### `get` – Getter
- **Typ:** Słowo kluczowe (akcesor)
- **Definicja:** Definiuje metodę pobierającą wartość właściwości
- **Składnia:** `get property() { return value; }`
- **Działanie:** Dostęp jak do właściwości: `obj.property` (bez wywołania)
- **Użycie:** Obliczane właściwości, walidacja przy odczycie

### `set` – Setter
- **Typ:** Słowo kluczowe (akcesor)
- **Definicja:** Definiuje metodę ustawiającą wartość właściwości
- **Składnia:** `set property(value) { this._property = value; }`
- **Działanie:** Przypisanie jak do właściwości: `obj.property = value`
- **Użycie:** Walidacja przy zapisie, obliczenia przy przypisaniu

---

## Zmienne i zakres

### `var` – Deklaracja zmiennej (funkcyjny scope)
- **Typ:** Słowo kluczowe (deklaracja zmiennej)
- **Definicja:** Deklaruje zmienną z zakresem funkcyjnym (hoisted)
- **Składnia:** `var name = value;`
- **Działanie:** 
  - Scope: funkcja (nie blok)
  - Hoisting: tak (undefined przed deklaracją)
  - Redeclaracja: dozwolona
- **Użycie:** Rzadko zalecane (preferuj `let`/`const`)

### `let` – Deklaracja zmiennej (blokowy scope)
- **Typ:** Słowo kluczowe (deklaracja zmiennej)
- **Definicja:** Deklaruje zmienną z zakresem blokowym (ES6+)
- **Składnia:** `let name = value;`
- **Działanie:**
  - Scope: blok `{}`
  - Hoisting: tak, ale TDZ (Temporal Dead Zone)
  - Redeclaracja: niedozwolona w tym samym zakresie
  - Przypisanie: możliwe (mutable)
- **Użycie:** Zmienne, które mogą się zmieniać

### `const` – Deklaracja stałej (blokowy scope)
- **Typ:** Słowo kluczowe (deklaracja stałej)
- **Definicja:** Deklaruje stałą z zakresem blokowym (ES6+)
- **Składnia:** `const name = value;`
- **Działanie:**
  - Scope: blok `{}`
  - Hoisting: tak, ale TDZ
  - Redeclaracja: niedozwolona
  - Przypisanie: niedozwolone (ale obiekty/tablice są mutable)
- **Użycie:** Stałe, referencje do obiektów/tablic

---

## Destrukturyzacja

### Destrukturyzacja tablicy
- **Typ:** Składnia przypisania
- **Definicja:** Wyciąga wartości z tablicy do zmiennych
- **Składnia:** `const [a, b, c] = [1, 2, 3];`
- **Działanie:** Przypisuje wartości po kolei: `a=1, b=2, c=3`
- **Użycie:** Przypisanie wielu wartości, swap: `[a, b] = [b, a]`

### Destrukturyzacja obiektu
- **Typ:** Składnia przypisania
- **Definicja:** Wyciąga właściwości z obiektu do zmiennych
- **Składnia:** `const {name, age} = user;` lub `const {name: n, age: a} = user;`
- **Działanie:** Przypisuje właściwości do zmiennych o tej samej nazwie
- **Użycie:** Wyciąganie właściwości, parametry funkcji

---

## Moduły

### `import` – Import modułu
- **Typ:** Słowo kluczowe (ES Modules)
- **Definicja:** Importuje eksporty z innego modułu
- **Składnia:**
  - `import name from './module.js';` (default)
  - `import { name1, name2 } from './module.js';` (named)
  - `import * as obj from './module.js';` (namespace)
- **Działanie:** Ładuje i importuje eksporty z modułu
- **Użycie:** Importowanie funkcji, klas, wartości

### `export` – Eksport modułu
- **Typ:** Słowo kluczowe (ES Modules)
- **Definicja:** Eksportuje wartości, funkcje, klasy z modułu
- **Składnia:**
  - `export const name = value;` (named)
  - `export default value;` (default)
  - `export { name1, name2 };` (named z listy)
- **Działanie:** Udostępnia eksporty do importu w innych modułach
- **Użycie:** Udostępnianie kodu między modułami

---

## Asynchroniczność

### `async` – Funkcja asynchroniczna
- **Typ:** Słowo kluczowe (modyfikator funkcji)
- **Definicja:** Oznacza funkcję zwracającą Promise
- **Składnia:** `async function name() { }` lub `const fn = async () => { }`
- **Działanie:** Automatycznie zwraca Promise, umożliwia użycie `await`
- **Użycie:** Funkcje asynchroniczne, operacje I/O

### `await` – Oczekiwanie na Promise
- **Typ:** Słowo kluczowe (tylko w async functions)
- **Definicja:** Czeka na zakończenie Promise i zwraca jego wartość
- **Składnia:** `const result = await promise;`
- **Działanie:** Wstrzymuje wykonanie funkcji do czasu rozwiązania Promise
- **Użycie:** Asynchroniczne operacje, API calls, operacje I/O

### `Promise` – Obiekt Promise
- **Typ:** Wbudowany obiekt/konstruktor
- **Definicja:** Reprezentuje przyszły wynik operacji asynchronicznej
- **Stany:** pending, fulfilled, rejected
- **Metody:** `.then()`, `.catch()`, `.finally()`, `Promise.all()`, `Promise.race()`
- **Użycie:** Obsługa asynchroniczności, operacje I/O

### `yield` – Generator yield
- **Typ:** Słowo kluczowe (generatory)
- **Definicja:** Wstrzymuje wykonanie generatora i zwraca wartość
- **Składnia:** `function* gen() { yield value; }`
- **Działanie:** Zwraca wartość i wstrzymuje generator do następnego wywołania
- **Użycie:** Generatory, iteratory, lazy evaluation

### `function*` – Generator function
- **Typ:** Słowo kluczowe (definicja generatora)
- **Definicja:** Funkcja zwracająca Generator
- **Składnia:** `function* name() { yield value; }`
- **Działanie:** Tworzy iterator, który można kontrolować krok po kroku
- **Użycie:** Lazy sequences, iteratory, async iterators

---

## Komentarze

### `//` – Komentarz jednoliniowy
- **Typ:** Komentarz
- **Definicja:** Komentarz do końca linii
- **Składnia:** `// komentarz`
- **Działanie:** Ignorowany przez interpreter/kompilator
- **Użycie:** Komentarze, wyłączanie kodu, dokumentacja

### `/* */` – Komentarz wieloliniowy
- **Typ:** Komentarz
- **Definicja:** Komentarz blokowy, może obejmować wiele linii
- **Składnia:** `/* komentarz */`
- **Działanie:** Ignorowany przez interpreter/kompilator
- **Użycie:** Długie komentarze, blokowe wyłączanie kodu

### `/** */` – Komentarz dokumentacyjny (JSDoc)
- **Typ:** Komentarz dokumentacyjny
- **Definicja:** Specjalny format komentarza dla dokumentacji
- **Składnia:**
  ```javascript
  /**
   * Opis funkcji
   * @param {type} name - opis
   * @returns {type} opis
   */
  ```
- **Działanie:** Używany przez narzędzia dokumentacji (JSDoc)
- **Użycie:** Dokumentacja API, type hints w JavaScript

---

## Template literals i stringi

### `` ` `` – Backtick (template literal)
- **Typ:** Znak specjalny (template literal)
- **Definicja:** Definiuje string z interpolacją i wieloliniowością
- **Składnia:** `` `Hello ${name}` ``
- **Działanie:** 
  - Interpolacja: `${expression}` jest ewaluowana
  - Wieloliniowość: zachowuje znaki nowej linii
- **Użycie:** Stringi z interpolacją, wieloliniowe stringi

### `$` – Znak dolara (w template literals)
- **Typ:** Znak specjalny (część interpolacji)
- **Definicja:** Część składni `${}` w template literals
- **Składnia:** `` `Value: ${variable}` ``
- **Działanie:** Rozpoczyna wyrażenie interpolacji
- **Użycie:** Interpolacja wartości w template literals

---

## Wyjątki i obsługa błędów

### `try` – Blok try
- **Typ:** Słowo kluczowe (obsługa błędów)
- **Definicja:** Oznacza blok kodu, w którym mogą wystąpić błędy
- **Składnia:** `try { code } catch (e) { }`
- **Działanie:** Wykonuje kod, błędy są przechwytywane przez `catch`
- **Użycie:** Obsługa błędów, bezpieczne wykonanie

### `catch` – Blok catch
- **Typ:** Słowo kluczowe (obsługa błędów)
- **Definicja:** Przechwytuje i obsługuje błędy z bloku `try`
- **Składnia:** `catch (error) { code }`
- **Działanie:** Wykonuje się gdy w `try` wystąpi błąd
- **Użycie:** Obsługa błędów, logowanie, fallback

### `finally` – Blok finally
- **Typ:** Słowo kluczowe (obsługa błędów)
- **Definicja:** Wykonuje się zawsze, niezależnie od błędu
- **Składnia:** `try { } catch { } finally { }`
- **Działanie:** Wykonuje się po `try` lub `catch`
- **Użycie:** Czyszczenie zasobów, zamknięcie połączeń

### `throw` – Rzucanie wyjątku
- **Typ:** Słowo kluczowe (obsługa błędów)
- **Definicja:** Rzuca wyjątek/błąd
- **Składnia:** `throw new Error("message");`
- **Działanie:** Przerywa wykonanie, przekazuje błąd do `catch`
- **Użycie:** Sygnalizowanie błędów, walidacja

---

## Inne ważne elementy

### `null` – Wartość null
- **Typ:** Literał pierwotny
- **Definicja:** Reprezentuje celowy brak wartości (obiekt)
- **Działanie:** `typeof null` → `"object"` (znany błąd JS)
- **Użycie:** Celowy brak wartości, resetowanie referencji

### `undefined` – Wartość undefined
- **Typ:** Literał pierwotny
- **Definicja:** Reprezentuje niezdefiniowaną wartość
- **Działanie:** Domyślna wartość niezainicjalizowanych zmiennych
- **Użycie:** Brak wartości, niezdefiniowane właściwości

### `true` / `false` – Wartości boolean
- **Typ:** Literały pierwotne
- **Definicja:** Reprezentują wartości logiczne prawda/fałsz
- **Działanie:** Używane w warunkach, operacjach logicznych
- **Użycie:** Logika warunkowa, flagi, stany

### `Infinity` / `-Infinity` – Nieskończoność
- **Typ:** Właściwość globalna
- **Definicja:** Reprezentuje nieskończoność numeryczną
- **Działanie:** Wynik dzielenia przez zero, operacji przekraczających zakres
- **Użycie:** Obliczenia matematyczne, sprawdzanie zakresów

### `NaN` – Not a Number
- **Typ:** Właściwość globalna
- **Definicja:** Reprezentuje wartość "nie jest liczbą"
- **Działanie:** Wynik nieprawidłowych operacji numerycznych
- **Użycie:** Sprawdzanie poprawności obliczeń: `isNaN(value)` lub `Number.isNaN(value)`

---

## Operatory specjalne (dodatkowe)

### `?.` – Optional chaining (szczegółowo)
- **Typ:** Operator bezpiecznego dostępu
- **Definicja:** Bezpiecznie uzyskuje dostęp do właściwości/metod
- **Składnia:**
  - `obj?.property` → `undefined` jeśli `obj` jest null/undefined
  - `obj?.method?.()` → wywołuje tylko jeśli istnieje
  - `arr?.[0]` → dostęp do elementu tylko jeśli tablica istnieje
- **Działanie:** Zwraca `undefined` zamiast rzucać błąd
- **Użycie:** Bezpieczny dostęp do zagnieżdżonych właściwości

### `??` – Nullish coalescing (szczegółowo)
- **Typ:** Operator logiczny
- **Definicja:** Zwraca prawą wartość tylko dla `null`/`undefined`
- **Działanie:**
  - `null ?? "default"` → `"default"`
  - `0 ?? "default"` → `0` (0 nie jest null/undefined)
  - `"" ?? "default"` → `""` (pusty string nie jest null/undefined)
- **Użycie:** Wartości domyślne tylko dla null/undefined (lepsze niż `||`)

---

## Znaki specjalne w regex

### `/pattern/` – Literał wyrażenia regularnego
- **Typ:** Literał regex
- **Definicja:** Definiuje wzorzec wyrażenia regularnego
- **Składnia:** `/pattern/flags`
- **Działanie:** Tworzy obiekt RegExp do dopasowywania wzorców
- **Użycie:** Wyszukiwanie, walidacja, zamiana tekstu

### `^` – Początek stringa (w regex)
- **Typ:** Znak specjalny regex
- **Definicja:** Dopasowuje początek stringa
- **Działanie:** `/^start/` dopasowuje tylko jeśli string zaczyna się od "start"
- **Użycie:** Walidacja początku, anchor

### `$` – Koniec stringa (w regex)
- **Typ:** Znak specjalny regex
- **Definicja:** Dopasowuje koniec stringa
- **Działanie:** `/end$/` dopasowuje tylko jeśli string kończy się na "end"
- **Użycie:** Walidacja końca, anchor

### `*` – Zero lub więcej (w regex)
- **Typ:** Kwantyfikator regex
- **Definicja:** Dopasowuje zero lub więcej poprzedzających elementów
- **Działanie:** `/a*/` dopasowuje "", "a", "aa", "aaa"...
- **Użycie:** Opcjonalne powtórzenia

### `+` – Jeden lub więcej (w regex)
- **Typ:** Kwantyfikator regex
- **Definicja:** Dopasowuje jeden lub więcej poprzedzających elementów
- **Działanie:** `/a+/` dopasowuje "a", "aa", "aaa"... (nie "")
- **Użycie:** Wymagane powtórzenia

### `?` – Zero lub jeden (w regex)
- **Typ:** Kwantyfikator regex
- **Definicja:** Dopasowuje zero lub jeden poprzedzający element
- **Działanie:** `/a?/` dopasowuje "" lub "a"
- **Użycie:** Opcjonalne elementy

### `.` – Dowolny znak (w regex)
- **Typ:** Znak specjalny regex
- **Definicja:** Dopasowuje dowolny pojedynczy znak (oprócz nowej linii)
- **Działanie:** `/a.b/` dopasowuje "aab", "axb", "a b"...
- **Użycie:** Wildcard, placeholder

### `|` – Alternatywa (w regex)
- **Typ:** Operator regex
- **Definicja:** Dopasowuje jeden z wzorców
- **Działanie:** `/a|b/` dopasowuje "a" lub "b"
- **Użycie:** Wybór między wzorcami

### `[]` – Klasa znaków (w regex)
- **Typ:** Znak specjalny regex
- **Definicja:** Dopasowuje jeden znak z zestawu
- **Działanie:** `/[abc]/` dopasowuje "a", "b" lub "c"
- **Użycie:** Zestawy dozwolonych znaków

### `()` – Grupa (w regex)
- **Typ:** Znak specjalny regex
- **Definicja:** Grupuje wzorce, przechwytuje dopasowania
- **Działanie:** `/(ab)+/` dopasowuje "ab", "abab"...
- **Użycie:** Grupowanie, przechwytywanie, backreferences

---

## HTML i CSS (podstawowe znaki)

### `< >` – Tagi HTML
- **Typ:** Znaki specjalne HTML
- **Definicja:** Definiują elementy HTML
- **Składnia:** `<tag>content</tag>` lub `<tag />` (self-closing)
- **Działanie:** Tworzą strukturę dokumentu HTML
- **Użycie:** Wszystkie elementy HTML

### `<!-- -->` – Komentarz HTML
- **Typ:** Komentarz HTML
- **Definicja:** Komentarz w HTML, niewidoczny w przeglądarce
- **Składnia:** `<!-- komentarz -->`
- **Działanie:** Ignorowany przez parser HTML
- **Użycie:** Komentarze, wyłączanie kodu HTML

### `#` – ID selektor (CSS) / hash (URL)
- **Typ:** Znak specjalny (CSS/URL)
- **Definicja:**
  - CSS: selektor ID (`#id`)
  - URL: fragment/hash (`#section`)
- **Działanie:**
  - CSS: `#header { }` styluje element z `id="header"`
  - URL: `page.html#section` skacze do elementu z `id="section"`
- **Użycie:** Selektory CSS, anchor links

### `.` – Klasa selektor (CSS)
- **Typ:** Znak specjalny CSS
- **Definicja:** Selektor klasy w CSS
- **Składnia:** `.class-name { }`
- **Działanie:** Styluje elementy z `class="class-name"`
- **Użycie:** Selektory CSS, stylowanie grup elementów

### `:` – Pseudoklasa (CSS)
- **Typ:** Znak specjalny CSS
- **Definicja:** Definiuje pseudoklasę CSS
- **Składnia:** `a:hover { }`, `input:focus { }`
- **Działanie:** Styluje elementy w określonym stanie
- **Użycie:** Stany interakcji, selektory warunkowe

### `::` – Pseudoelement (CSS)
- **Typ:** Znak specjalny CSS
- **Definicja:** Definiuje pseudoelement CSS
- **Składnia:** `p::before { }`, `p::after { }`
- **Działanie:** Styluje części elementu lub dodaje treść
- **Użycie:** Dekoracje, treść generowana

---

**Uwaga:** Ten przewodnik zawiera większość podstawowych i zaawansowanych elementów składniowych. Niektóre elementy mogą mieć dodatkowe zastosowania w specyficznych kontekstach (np. TypeScript, JSX, różne frameworki).
