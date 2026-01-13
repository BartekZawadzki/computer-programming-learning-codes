// Podstawowe konstrukcje językowe JS: zmienne, typy, operatory, warunki, pętle

// Zmienne: let (zmienna), const (niezmienialne przypisanie), var (stare, unikaj)
let age = 25; // zmienna możliwa do zmiany
const appName = "EduApp"; // stała referencja, nie można nadpisać zmiennej
var legacy = "var ma zasięg funkcji i hoisting"; // stosuj tylko w kodzie legacy

// Typy prymitywne: string, number, boolean, null, undefined, symbol, bigint
const nickname = "Ala"; // string
const height = 1.75; // number (double)
const isActive = true; // boolean
const nothing = null; // brak wartości
let notDefined; // undefined, gdy nie przypisano
const unique = Symbol("id"); // symbol (unikatowy)
const big = 10n ** 20n; // bigint do wielkich liczb

// Obiekty i tablice: typy referencyjne
const user = { id: 1, name: "Ala" }; // obiekt
const nums = [1, 2, 3]; // tablica

// Operatory arytmetyczne i logiczne
const sum = 2 + 3; // dodawanie
const diff = 5 - 2; // odejmowanie
const prod = 4 * 2; // mnożenie
const div = 10 / 3; // dzielenie
const mod = 7 % 3; // reszta z dzielenia
const pow = 2 ** 3; // potęgowanie

// Operatory porównania
// === i !== porównują typ i wartość (używaj zawsze)
const strictlyEqual = 2 === "2"; // false (różne typy)
const looselyEqual = 2 == "2"; // true (konwersja - unikaj)

// Operatory logiczne
const bothTrue = true && true; // AND
const eitherTrue = true || false; // OR
const negated = !false; // NOT

// Operator warunkowy (ternary)
const canDrive = (age >= 18) ? "tak" : "nie";

// Instrukcje warunkowe
function classifyTemp(t) {
  if (t < 0) return "mróz";
  else if (t < 20) return "chłodno";
  else return "ciepło";
}

// switch do wielu gałęzi
function weekdayName(n) {
  switch (n) {
    case 1: return "Pon";
    case 2: return "Wt";
    case 3: return "Śr";
    default: return "Inny";
  }
}

// Pętle: for, while, do...while
for (let i = 0; i < 3; i += 1) {
  // iteracja znaną liczbę razy
}

let w = 0;
while (w < 3) {
  w += 1; // wykonuj dopóki warunek true
}

let d = 0;
do {
  d += 1; // wykona co najmniej raz
} while (d < 3);

// Pętle po kolekcjach: for...of (wartości), for...in (klucze obiektu)
for (const n of nums) {
  // n to kolejne elementy tablicy
}

for (const key in user) {
  // key to "id", "name"; user[key] to wartości
}

// ---
// Dlaczego tak:
// - Zawiera przekrojowo typy, operatory, warunki, pętle i switch w czystym JS.
// - Akcentuje użycie ===/!== oraz unikanie luźnych porównań i var.
// - Pokazuje różne pętle (for/while/do...while, for...of/in) dla tablic i obiektów.
// - Uwzględnia bigint/symbol i optionalne konstrukcje, by przykład był aktualny względem współczesnego JS.
