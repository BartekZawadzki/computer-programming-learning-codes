# Jak czytać kod JavaScript — przewodnik krok po kroku

Poniższy opis ma pomóc w „tłumaczeniu” kodu JS na zrozumiały język. Znajdziesz tu schemat podejścia, przykłady czytania linijek, listę najczęstszych konstrukcji i wskazówki, jak krokowo analizować pliki.

---

## 1) Ogólna strategia czytania
- **Najpierw struktura pliku**: sprawdź importy/eksporty, funkcje główne, klasy, zmienne globalne.
- **Co jest wejściem i wyjściem**: szukaj parametrów funkcji, obiektów konfiguracyjnych, danych z zewnątrz (API, pliki, DOM).
- **Przepływ sterowania**: if/else, switch, pętle, async/await, promisy, return-y.
- **Skutki uboczne (side effects)**: zapisy do plików, fetch, logi, mutacje obiektów, ustawianie stanu, manipulacja DOM.
- **Dane i ich transformacje**: map/filter/reduce, destructuring, spread, tworzenie nowych obiektów/tabl.
- **Błędy i bezpieczeństwo**: try/catch, walidacja wejścia, fallbacki (??, ||), guard clauses.
- **Konwencje i kontekst**: nazwy funkcji/zmiennych często zdradzają przeznaczenie; sprawdzaj komentarze i README.

---

## 2) Jak tłumaczyć linijki na język potoczny

### Zmienne i stałe
- `const x = 5;` → „Ustal stałą o nazwie x i zapisz w niej liczbę 5”.
- `let user = {};` → „Utwórz zmienną user, która na start jest pustym obiektem”.

### Destrukturyzacja
- `const { name, age } = person;` → „Wyciągnij z obiektu `person` pola `name` i `age` do osobnych zmiennych o tych samych nazwach”.
- `const [first, ...rest] = arr;` → „Weź pierwszy element tablicy `arr` jako `first`, a resztę elementów zbierz do tablicy `rest`”.

### Spread / Rest
- `const copy = { ...original, active: true };` → „Skopiuj właściwości z `original` i nadpisz/uzupełnij `active: true`”.
- `function logAll(...args) {}` → „Funkcja zbiera dowolną liczbę argumentów do tablicy `args`”.

### Funkcje
- `function add(a, b) { return a + b; }` → „Zdefiniuj funkcję add, która przyjmuje dwie liczby i zwraca ich sumę”.
- `const double = (n) => n * 2;` → „Utwórz funkcję strzałkową double: weź n, zwróć n pomnożone przez 2”.

### Warunki
- `if (x > 0) { ... } else { ... }` → „Jeśli x jest większe niż 0, wykonaj pierwszy blok; w przeciwnym razie drugi”.
- `condition ? a : b` → „Jeśli condition prawda — użyj a, w przeciwnym razie b”.

### Pętle
- `for (let i = 0; i < arr.length; i++) { ... }` → „Przejdź po tablicy arr od początku do końca; i to indeks bieżącego elementu”.
- `for (const item of list) { ... }` → „Dla każdego elementu w iterowalnej kolekcji list wykonaj blok”.
- `array.map(fn)` → „Dla każdego elementu wywołaj fn, zbierz zwrócone wartości w nową tablicę”.
- `array.filter(fn)` → „Zachowaj tylko te elementy, dla których fn zwróci true”.
- `array.reduce(fn, init)` → „Akumuluj wartość startując od init, dla każdego elementu aktualizuj akumulator wynikiem fn”.

### Async/await i Promisy
- `const data = await fetch(url);` → „Poczekaj, aż fetch zakończy się i da odpowiedź; zapisz ją w data”.
- `promise.then(v => ...)` → „Gdy promise się spełni, uruchom funkcję z wynikiem v”.
- `try { ... } catch (e) { ... }` → „Spróbuj wykonać blok; jeśli wystąpi wyjątek, przechwyć go w e i obsłuż”.

### Optional chaining / Nullish coalescing
- `user?.address?.city` → „Jeśli user istnieje, a w nim address i city, zwróć city; w przeciwnym razie undefined”.
- `value ?? 'fallback'` → „Jeśli value jest null lub undefined, użyj 'fallback'; inaczej użyj value”.

### Importy/eksporty (moduły)
- `import { readFile } from 'fs';` → „Zaimportuj funkcję readFile z modułu fs”.
- `export function foo() {}` → „Udostępnij na zewnątrz funkcję foo”.

### Obiekty i klasy
- `class User { constructor(name) { this.name = name; } }` → „Zdefiniuj klasę User; konstruktor zapisuje name do this”.
- `User.prototype.greet = function() { ... }` → „Dodaj metodę greet do prototypu User (działa na wszystkich instancjach)”.

---

## 3) Checklist: czytanie pliku krok po kroku
1. **Importy/eksporty**: co wchodzi, co wychodzi z modułu; zewnętrzne zależności.
2. **Stałe konfiguracyjne**: URL-e, klucze, ustawienia.
3. **Główne funkcje/klasy**: podpisy, parametry, zwracane wartości.
4. **Przepływ**: instrukcja główna (np. main), inicjalizacja, eventy/handler’y.
5. **Dane i transformacje**: operacje na tablicach/obiektach, map/filter/reduce, walidacje.
6. **Asynchroniczność**: gdzie jest await, jakie promisy, retry/timeout/abort, obsługa błędów.
7. **Side effects**: zapis pliku, fetch, DOM, logi, mutacje stanu.
8. **Błędy i fallbacki**: try/catch, warunki brzegowe, domyślne wartości (??, ||).
9. **Czytelność**: nazwy zmiennych, guard clauses, komentarze (dlaczego), brak ukrytych zależności.

---

## 4) Przykłady „tłumaczenia” krótkich fragmentów

### Przykład: funkcja z walidacją i fetch
```js
async function loadUser(id) {
  if (!Number.isInteger(id)) throw new TypeError("id musi być liczbą całkowitą");
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```
**Jak czytać:**
1. Funkcja async `loadUser` przyjmuje `id`.
2. Jeśli id nie jest całkowite, rzuć błąd typu (walidacja).
3. Wykonaj fetch na adresie z id; poczekaj na odpowiedź.
4. Jeśli status nie jest OK, rzuć błąd.
5. Zwróć wynik sparsowany jako JSON.

### Przykład: transformacja tablicy
```js
const scores = [10, 20, 15];
const doubled = scores.map((s) => s * 2).filter((s) => s > 20);
```
**Jak czytać:**
1. Mamy tablicę scores z trzema liczbami.
2. `map`: podwój każdą wartość.
3. `filter`: zostaw tylko te, które są > 20.
4. Wynik to nowa tablica `doubled`.

### Przykład: optional chaining i fallback
```js
const city = user?.address?.city ?? "unknown";
```
**Jak czytać:**
1. Spróbuj dostać się do user.address.city.
2. Jeśli którakolwiek część nie istnieje, wynik jest undefined.
3. Operator ?? zwróci "unknown" zamiast null/undefined.

### Przykład: klasa i metoda
```js
class Counter {
  #value = 0;
  inc() { this.#value += 1; return this.#value; }
  get value() { return this.#value; }
}
```
**Jak czytać:**
1. Klasa Counter ma prywatne pole #value startujące od 0.
2. Metoda inc zwiększa #value o 1 i zwraca nową wartość.
3. Getter value pozwala podejrzeć bieżącą wartość.

---

## 5) Najczęstsze idiomy, które warto umieć czytać
- **Guard clause**: `if (!condition) return;` — szybkie wyjście, redukuje zagnieżdżenie.
- **Early return na błędach**: `if (!ok) throw new Error("...");` — jasny sygnał, że warunek jest wymagany.
- **Krótkie funkcje strzałkowe**: `const fn = (x) => x + 1;`
- **Map/Filter/Reduce**: czytaj jako „przekształć”, „odsiej”, „zredukuj do jednego wyniku”.
- **Optional chaining + nullish coalescing**: bezpieczne pobieranie głębokich pól z sensownym domyślnym wynikiem.
- **try/catch w async**: „spróbuj, złap błąd, obsłuż/loguj”.
- **Destrukturyzacja parametrów**: `function f({ a, b }) { ... }` — funkcja oczekuje obiektu z polami a, b.
- **Spread**: łączenie obiektów/tabl. w sposób niemutujący.

---

## 6) Jak oceniać skutki uboczne i bezpieczeństwo
- Szukaj miejsc, gdzie kod „dotyka świata”: fetch, fs, DB, DOM, console, zapis do globalnych zmiennych.
- Sprawdź walidacje wejścia (typy, zakresy, wymagane pola).
- Zwróć uwagę na obsługę błędów (czy są łapane, logowane, retry/abort).
- Czy mutujemy stan współdzielony? Czy potrzeba klonów lub kopii (spread, structuredClone)?

---

## 7) Podsumowanie: procedura czytania
1. Przejrzyj importy/eksporty — co wchodzi i wychodzi z pliku.
2. Zlokalizuj główne punkty wejścia (funkcje, klasy, handler’y).
3. Śledź przepływ: warunki, pętle, async/await, promisy.
4. Zidentyfikuj skutki uboczne: I/O, DOM, logi, mutacje stanu.
5. Sprawdź walidacje i obsługę błędów.
6. Przetłumacz kluczowe linijki na prosty język: „weź to, zrób to, zwróć tamto”.
7. Oceń czytelność: nazwy, guard clauses, brak zbędnego zagnieżdżania.

Ten schemat pomoże ci systematycznie rozumieć kod JS i tłumaczyć go na język naturalny. W razie wątpliwości uruchamiaj małe fragmenty w konsoli/REPL z console.log, aby zobaczyć faktyczne wartości na każdym etapie.
