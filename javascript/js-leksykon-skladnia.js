// Leksykon składni JavaScript – skrót najważniejszych konstrukcji i słów kluczowych.
// Każdy blok zawiera definicję + krótki przykład. Używaj jako szybkiego skorowidza.

// ---------------------------------------------------------------------------
// Literaly i typy prymitywne
// ---------------------------------------------------------------------------
const numberLiteral = 42; // liczba (number, IEEE 754 double)
const bigintLiteral = 42n; // liczba całkowita o dowolnej długości (bigint)
const stringLiteral = "tekst"; // string (UTF-16)
const booleanLiteral = true; // boolean
const nullLiteral = null; // brak wartości (typ null)
const undefinedLiteral = undefined; // niezainicjalizowane / brak
const symbolLiteral = Symbol("id"); // unikalny identyfikator

// ---------------------------------------------------------------------------
// Operatory i priorytety (wybór)
// ---------------------------------------------------------------------------
// Arytmetyka: + - * / % ** (potęgowanie)
// Porównania: === !== (ścisłe) / == != (luźne, z konwersją – unikaj)
// Logiczne: && || ?? (nullish coalescing), ! (negacja)
// Bitowe: & | ^ ~ << >> >>>
// Przypisanie złożone: += -= *= /= %= **=
// Warunkowy: condition ? a : b
// Łańcuchy: optional chaining obj?.prop?.() / nullish-coalescing ??
// Przykład:
const safePort = process.env.PORT ?? 3000; // fallback tylko dla null/undefined

// ---------------------------------------------------------------------------
// Deklaracje zmiennych
// ---------------------------------------------------------------------------
let zmienna = 1; // blokowy zakres, można przypisać ponownie
const stala = 2; // blokowy zakres, bez ponownego przypisania (mutacja obiektów możliwa)
var legacy = 3; // funkcja-zakres, hoisting – unikaj w nowym kodzie

// ---------------------------------------------------------------------------
// Struktury sterujące
// ---------------------------------------------------------------------------
if (zmienna > 0) {
  // blok if
} else if (zmienna === 0) {
  // else if
} else {
  // else
}

switch (zmienna) {
  case 1:
    // dopasowanie
    break; // ważne: przerwij, jeśli nie chcesz fall-through
  default:
    // domyślne
    break;
}

for (let i = 0; i < 3; i += 1) {
  // klasyczna pętla
}

for (const value of [1, 2, 3]) {
  // iteracja po iterowalnych (Tablica, Map, Set, string)
}

for (const key in { a: 1, b: 2 }) {
  // iteracja po kluczach własnych + odziedziczonych enumerowalnych (ostrożnie)
}

while (zmienna > 0) {
  zmienna -= 1; // pętla while
}

do {
  zmienna += 1; // wykona się co najmniej raz
} while (zmienna < 1);

// ---------------------------------------------------------------------------
// Funkcje i zakres
// ---------------------------------------------------------------------------
function deklaracja(a, b = 0) {
  return a + b; // deklaracja hoistowana
}

const wyrazenie = function (a) {
  return a * 2; // wyrażenie funkcyjne
};

const strzalkowa = (a) => a * 2; // funkcja strzałkowa (brak własnego this/arguments)

function zRestem(first, ...reszta) {
  return [first, reszta]; // ... zbiera resztę argumentów w tablicę
}

function zDestrukturyzacja({ name = "anon", age = 0 }) {
  return `${name} (${age})`; // destrukturyzacja parametrów + wartości domyślne
}

// ---------------------------------------------------------------------------
// this, call/apply/bind
// ---------------------------------------------------------------------------
const obiektThis = {
  x: 10,
  getX() {
    return this.x; // this wskazuje na obiekt wywołania (dla metod)
  },
};
const metoda = obiektThis.getX;
metoda.call(obiektThis); // jawne ustawienie this

// ---------------------------------------------------------------------------
// Obiekty, prototypy, klasy
// ---------------------------------------------------------------------------
const osoba = { imie: "Ala", wiek: 20 }; // literał obiektu
const klucz = "dynamiczne";
osoba[klucz] = true; // dynamiczny dostęp do właściwości

// Tworzenie z prototypem:
const bazowy = { hi() { return "hi"; } };
const pochodny = Object.create(bazowy); // prototyp bazowy
pochodny.name = "X";

// Klasy (syntactic sugar nad prototypami):
class User {
  static from(obj) {
    return new User(obj.name, obj.age); // metoda statyczna
  }
  #secret = "hidden"; // prywatne pole
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Cześć, ${this.name}`; // metoda instancyjna
  }
  get secret() {
    return this.#secret; // getter
  }
}
class Admin extends User {
  constructor(name, age, role = "admin") {
    super(name, age); // wywołanie konstruktora bazowego
    this.role = role;
  }
}

// ---------------------------------------------------------------------------
// Moduły (ESM)
// ---------------------------------------------------------------------------
// Eksport w pliku modułu:
export const PI = 3.14;
export function area(r) {
  return PI * r * r;
}
// Domyślny eksport:
export default function hello(name = "świat") {
  return `Hello ${name}`;
}
// Import:
// import hello, { PI, area as circleArea } from "./module.js";

// ---------------------------------------------------------------------------
// Tablice i kolekcje
// ---------------------------------------------------------------------------
const arr = [1, 2, 3];
arr.push(4); // mutacja
const kopia = [...arr]; // płytka kopia (spread)
const mapowana = arr.map((x) => x * 2); // niemutująca transformacja
const filtrowana = arr.filter((x) => x % 2 === 0); // filtr
const zredukowana = arr.reduce((acc, x) => acc + x, 0); // akumulacja

const set = new Set([1, 2, 2]); // unikalne wartości
const map = new Map([["a", 1], ["b", 2]]); // pary klucz-wartość, klucze dowolnego typu

// ---------------------------------------------------------------------------
// Destrukturyzacja i spread/rest
// ---------------------------------------------------------------------------
const point = { x: 1, y: 2 };
const { x: px = 0, y: py = 0 } = point; // destrukturyzacja z aliasem i defaultem
const [first, ...rest] = [10, 20, 30]; // destrukturyzacja tablicy + rest
const merged = { ...point, z: 3 }; // łączenie obiektów (płytkie)

// ---------------------------------------------------------------------------
// Łańcuchy znaków i szablony
// ---------------------------------------------------------------------------
const imie = "Ala";
const powitanie = `Cześć ${imie}!`; // template literal z interpolacją
const wielolinia = `linia 1
linia 2`; // string wielolinijkowy

// ---------------------------------------------------------------------------
// JSON i serializacja
// ---------------------------------------------------------------------------
const json = JSON.stringify({ a: 1 }); // obiekt -> string JSON
const obj = JSON.parse(json); // string JSON -> obiekt

// ---------------------------------------------------------------------------
// Obsługa błędów
// ---------------------------------------------------------------------------
try {
  throw new Error("problem");
} catch (e) {
  // obsługa błędu
} finally {
  // blok zawsze wykona się
}

// ---------------------------------------------------------------------------
// Asynchroniczność
// ---------------------------------------------------------------------------
// Promisy:
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("OK"), 100);
});
promise.then((v) => v).catch((e) => e);

// async/await:
async function fetchData(url) {
  const res = await fetch(url); // czeka na Promise
  return res.json();
}

// Promise helpers: Promise.all, Promise.race, Promise.allSettled, Promise.any

// ---------------------------------------------------------------------------
// Iteratory i generatory
// ---------------------------------------------------------------------------
function* counterGen(limit = 3) {
  for (let i = 0; i < limit; i += 1) {
    yield i; // generator zwraca kolejne wartości
  }
}
for (const n of counterGen(2)) {
  // iteracja po generatorze
}

// ---------------------------------------------------------------------------
// Date, Intl
// ---------------------------------------------------------------------------
const now = new Date();
const plDate = new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(now);

// ---------------------------------------------------------------------------
// Strict mode
// ---------------------------------------------------------------------------
"use strict"; // wymusza bardziej restrykcyjną semantykę (np. zakaz użycia niezadeklarowanych zmiennych)

// ---------------------------------------------------------------------------
// Równość i konwersje
// ---------------------------------------------------------------------------
// Zawsze preferuj === i !== (bez konwersji).
// Konwersje liczb/stringów: Number("10"), String(10), Boolean(""), parseInt/parseFloat.
const luźne = "2" == 2; // true (unikaj)
const ścisłe = "2" === 2; // false (preferowane)

// ---------------------------------------------------------------------------
// Symboliczne słowa kluczowe (lista skrócona)
// ---------------------------------------------------------------------------
// break, case, catch, class, const, continue, debugger, default, delete,
// do, else, export, extends, finally, for, function, if, import, in,
// instanceof, let, new, return, super, switch, this, throw, try,
// typeof, var, void, while, with (unikaj), yield, await (w funkcji async)

// ---------------------------------------------------------------------------
// Node.js: require / module.exports (CommonJS)
// ---------------------------------------------------------------------------
// const fs = require("fs");
// module.exports = { foo, bar };

// ---------------------------------------------------------------------------
// Praktyki bezpieczeństwa i jakości (skrót)
// ---------------------------------------------------------------------------
// - Używaj const/let, unikaj var.
// - Preferuj ===/!== zamiast ==/!=.
// - Waliduj dane wejściowe, unikaj eval/new Function.
// - Korzystaj z optional chaining i nullish coalescing do bezpiecznego dostępu.
// - Unikaj mutacji globali; moduły trzymaj izolowane.
// - Formatuj i lintuj kod (Prettier, ESLint).

// ---------------------------------------------------------------------------
// Dodatkowe typy i kolekcje
// ---------------------------------------------------------------------------
// WeakMap/WeakSet przechowują klucze jako obiekty i nie blokują GC:
const wm = new WeakMap(); // brak iteracji, klucze tylko obiektowe
const ws = new WeakSet(); // brak iteracji, użyteczne do prywatnych znaczników

// ArrayBuffer + TypedArray do pracy binarnej:
const buf = new ArrayBuffer(8); // 8 bajtów
const view = new DataView(buf); // niskopoziomowy dostęp
const u32 = new Uint32Array(buf); // widok typowany
u32[0] = 0xdeadbeef; // zapis jako liczby 32-bit

// structuredClone dla głębokiej kopii struktur (bez funkcji, z Map/Set/ArrayBuffer):
const cloned = structuredClone({ a: 1, m: new Map([["x", 1]]) });

// ---------------------------------------------------------------------------
// Symbol i wbudowane well-known symbols
// ---------------------------------------------------------------------------
// Symbol.iterator, Symbol.asyncIterator, Symbol.toStringTag, Symbol.toPrimitive:
const iterableObj = {
  items: [1, 2],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => (i < this.items.length ? { value: this.items[i++], done: false } : { done: true }),
    };
  },
};
[...iterableObj]; // [1,2]

// ---------------------------------------------------------------------------
// Proxy i Reflect
// ---------------------------------------------------------------------------
const target = { a: 1 };
const proxy = new Proxy(target, {
  get(obj, prop, receiver) {
    return Reflect.get(obj, prop, receiver); // można dodać logowanie/walidację
  },
  set(obj, prop, value) {
    return Reflect.set(obj, prop, value); // można blokować lub modyfikować zapis
  },
});
proxy.a; // deleguje do target

// ---------------------------------------------------------------------------
// RegExp (wybrane nowoczesne możliwości)
// ---------------------------------------------------------------------------
// Flagi: i (case-insensitive), g (global), m (multiline), s (dotAll), u (Unicode), y (sticky).
// Named groups i lookbehind:
const re = /(?<area>\d{2})-(?<num>\d{3})-(?<rest>\d{2})/u;
const m = "12-345-67".match(re);
m?.groups?.area; // "12"
// Unicode property escapes: /\p{L}+/u dopasuje litery.

// ---------------------------------------------------------------------------
// Async iteratory i generatory
// ---------------------------------------------------------------------------
async function* asyncGen() {
  yield 1;
  yield 2;
}
for await (const v of asyncGen()) {
  // iteracja asynchroniczna
}

// ---------------------------------------------------------------------------
// Promise queue i mikrozdarzenia
// ---------------------------------------------------------------------------
// .then/.catch/.finally trafiają do mikro-kolejki (microtask), setTimeout do makro-kolejki.
Promise.resolve().then(() => {}); // wykona się przed setTimeout 0
setTimeout(() => {}, 0); // makro-zadanie

// ---------------------------------------------------------------------------
// Moduły: dodatkowe elementy
// ---------------------------------------------------------------------------
// Dynamiczny import:
// const mod = await import("./other.js");
// import.meta.url daje URL modułu (np. przy budowaniu ścieżek).
// Import assertions (np. JSON):
// import data from "./data.json" assert { type: "json" };
// Top-level await (w module ESM) pozwala await poza funkcją.

// CommonJS (Node):
// const mod = require("./mod.cjs");
// module.exports = { foo };
// W ESM preferuj import/export; w CJS używaj require.

// ---------------------------------------------------------------------------
// Web / platformowe API (skrót)
// ---------------------------------------------------------------------------
// fetch(url, { method, headers, body, signal }) zwraca Promise<Response>.
// AbortController do anulowania:
// const ac = new AbortController(); fetch(url, { signal: ac.signal }); ac.abort();
// URL/URLSearchParams do bezpiecznej pracy z adresami.
// EventTarget / addEventListener w przeglądarce; w Node: EventEmitter.

// ---------------------------------------------------------------------------
// Intl (wybrane)
// ---------------------------------------------------------------------------
// Intl.DateTimeFormat, Intl.NumberFormat, Intl.RelativeTimeFormat, Intl.ListFormat, Intl.PluralRules.
const fmtNumber = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(1234.56);
const rtf = new Intl.RelativeTimeFormat("pl", { numeric: "auto" }).format(-1, "day"); // "wczoraj"

// ---------------------------------------------------------------------------
// Błędy i ich typy
// ---------------------------------------------------------------------------
// Error, TypeError, ReferenceError, SyntaxError, RangeError, AggregateError, EvalError (rzadko).
// Optional catch binding:
try {
  throw new Error("boom");
} catch {
  // brak nazwy błędu, jeśli niepotrzebny
}

// ---------------------------------------------------------------------------
// Deprecacje i ostrożność
// ---------------------------------------------------------------------------
// with, eval, Function constructor, var, luźne porównania ==/!=, Object.prototype.__proto__, arguments.callee — unikaj.

// ---------------------------------------------------------------------------
// Model wykonania: stos wywołań, sterta, event loop
// ---------------------------------------------------------------------------
// - Kod synchroniczny trafia na stos wywołań (call stack); gdy stos pusty, pętla zdarzeń pobiera zadania.
// - Zadania makro (timers, I/O, message channel, setImmediate w Node) trafiają do kolejek makro.
// - Mikro-zadania (Promise then/catch/finally, queueMicrotask, MutationObserver) są opróżniane po bieżącym makro-zadaniu, przed kolejnym.
// - Web workers/Worker Threads mają oddzielne event loop i pamięć (tylko przez message passing lub SharedArrayBuffer + Atomics).

// ---------------------------------------------------------------------------
// Zakres, hoisting, environment records
// ---------------------------------------------------------------------------
// - var: funkcja-zakres, hoisting z inicjalizacją undefined.
// - let/const: blok-zakres, hoisting do TDZ (Temporal Dead Zone) — dostęp przed deklaracją rzuca ReferenceError.
// - function declaration: hoistowana z ciałem funkcji (w module i w skrypcie, z niuansami w blokach w starych środowiskach).

// ---------------------------------------------------------------------------
// this — reguły wiązania
// ---------------------------------------------------------------------------
// - Wywołanie jako metoda obj.metoda(): this = obj.
// - Wywołanie zwykłe f(): this = undefined w strict mode, inaczej global (window/globalThis) — unikaj.
// - call/apply/bind: jawne ustawienie this.
// - Strzałki: this lexically odziedziczone z otaczającego scope; nie nadają się jako metody do bind.
// - W konstruktorze new Fn(): this to nowo utworzony obiekt (chyba że funkcja zwróci obiekt).

// ---------------------------------------------------------------------------
// Prototypy i łańcuch wyszukiwania
// ---------------------------------------------------------------------------
// - Każdy obiekt ma [[Prototype]] wskazujący na inny obiekt lub null.
// - Wyszukiwanie właściwości idzie po łańcuchu prototypów, aż znajdzie lub trafi na null.
// - class syntactic sugar: methods na prototype; pola prywatne # nie są na prototypie, są na instancji.
// - Object.create(proto) tworzy z zadanym prototypem; Object.getPrototypeOf / setPrototypeOf czytają/ustawiają (to drugie wolne).

// ---------------------------------------------------------------------------
// Atrybuty właściwości (descriptor)
// ---------------------------------------------------------------------------
// - value, writable, enumerable, configurable; get/set dla akcesorów.
// - Object.defineProperty/defineProperties do precyzyjnego ustawiania.
// - Object.freeze (blokuje modyfikacje, dodawanie, usuwanie; płytkie), Object.seal (blokuje dod/usuń, ale pozwala modyfikować value jeśli writable).
// - Spread/Object.assign kopiują tylko własne enumerable props, płytko (bez klonowania zagnieżdżeń).

// ---------------------------------------------------------------------------
// Typy i konwersje — praktyczne pułapki
// ---------------------------------------------------------------------------
// - NaN !== NaN; Number.isNaN(n) sprawdza; Object.is lepsze dla -0/+0.
// - parseInt("08") w starych środ. mogło brać ósemkowo — zawsze podaj radix: parseInt("08", 10).
// - Number(""), Number(null) => 0; Number(undefined) => NaN; Boolean("") => false, Boolean("0") => true.
// - Falsy: 0, -0, 0n, "", null, undefined, NaN, false.
// - JSON.stringify pomija undefined, funkcje, symbole; Date -> ISO string; Map/Set -> {}.
// - Deep copy: structuredClone (jeśli dostępne) lub biblioteka; JSON hack traci daty, funkcje, Map/Set, undefined, BigInt.

// ---------------------------------------------------------------------------
// Liczby, precyzja i BigInt
// ---------------------------------------------------------------------------
// - IEEE 754 double: 0.1 + 0.2 !== 0.3 dokładnie; używaj zaokrągleń / bibliotek do finansów lub BigInt gdy brak ułamków.
// - BigInt nie miesza się z number bez jawnej konwersji; Math.* nie działa na BigInt.

// ---------------------------------------------------------------------------
// Daty i strefy
// ---------------------------------------------------------------------------
// - Date przechowuje czas w ms od epoch UTC; API bywa mylące (miesiące 0-11).
// - Intl.DateTimeFormat używaj do prezentacji; do obliczeń preferuj biblioteki (date-fns, luxon) lub Temporal (gdy będzie dostępny).

// ---------------------------------------------------------------------------
// Moduły: ESM vs CJS (Node)
// ---------------------------------------------------------------------------
// - ESM: import/export, top-level await, domyślnie w przeglądarce; w Node aktywowane przez "type": "module" lub rozszerzenie .mjs.
// - CJS: require/module.exports, domyślne w Node przy "type": "commonjs" lub .cjs.
// - Nie mieszaj syntaksów w jednym pliku; w Node przy ESM używaj import.meta.url zamiast __dirname/__filename (można odtworzyć z URL).

// ---------------------------------------------------------------------------
// Pakiety i pole "exports" (Node)
// ---------------------------------------------------------------------------
// - package.json: "exports" kontroluje, co jest widoczne przy import/require; może mieć warunki ("import", "require", "node", "default").
// - "type": "module" / "commonjs" wpływa na domyślne rozszerzenia.

// ---------------------------------------------------------------------------
// Async wzorce i odporność
// ---------------------------------------------------------------------------
// - Timeout/abort: AbortController, withTimeout (Promise.race), retry z backoff (np. exponential).
// - Kolejkowanie: semafor/limit równoległości (np. mapWithLimit), kolejka priorytetowa, throttling/debouncing.
// - Streamy (Node/web): czytaj w chunkach, reaguj na backpressure (await stream.readable).

// ---------------------------------------------------------------------------
// fetch: nagłówki, body, błędy
// ---------------------------------------------------------------------------
// - Domyślnie nie rzuca przy 4xx/5xx — sprawdzaj res.ok lub status.
// - Body: json()/text()/blob()/arrayBuffer()/formData().
// - CORS: zależy od nagłówków i trybu; credentialed requests wymagają credentials: "include".

// ---------------------------------------------------------------------------
// Web Storage i cookies (skrót)
// ---------------------------------------------------------------------------
// - localStorage/sessionStorage (synchron., string-only); JSON.stringify dla obiektów.
// - Cookies: document.cookie; zwróć uwagę na HttpOnly/SameSite/Secure ustawiane po stronie serwera.

// ---------------------------------------------------------------------------
// DOM skrót (jeśli pracujesz w przeglądarce)
// ---------------------------------------------------------------------------
// - querySelector/querySelectorAll; classList; dataset; addEventListener z passive/capture.
// - preventDefault/stopPropagation; delegacja zdarzeń.
// - requestAnimationFrame dla aktualizacji UI vs setTimeout.

// ---------------------------------------------------------------------------
// Debugging i profilowanie
// ---------------------------------------------------------------------------
// - console.log/debug/table/time/timeEnd; console.dir dla obiektów DOM.
// - debugger; w narzędziach: performance (profil CPU), memory (leaki), coverage.
// - W Node: --inspect, chrome://inspect, npx node --watch dla hot-reload (v18+).

// ---------------------------------------------------------------------------
// Testowanie
// ---------------------------------------------------------------------------
// - Jednostkowe: Jest/Vitest/Mocha; snapshoty; fake timers.
// - Integracyjne/E2E: Playwright/Cypress.
// - Mocki: msw do mockowania fetch/XHR; nock w Node dla http.

// ---------------------------------------------------------------------------
// Bezpieczeństwo
// ---------------------------------------------------------------------------
// - Nie interpoluj niesprawdzonego inputu do HTML (XSS) — używaj textContent, templating z escapowaniem.
// - Waliduj dane z zewnątrz; nigdy nie używaj eval; ogranicz uprawnienia tokenów/kluczy.
// - Unikaj prototypowych pollution (np. w merge) — filtruj __proto__, constructor, prototype.

// ---------------------------------------------------------------------------
// Style i jakość
// ---------------------------------------------------------------------------
// - Lint: ESLint; format: Prettier.
// - Struktura modułów: małe, czyste interfejsy; unikaj side effects przy imporcie.
// - Nazewnictwo: camelCase dla zmiennych/funkcji, PascalCase dla klas/komponentów.

// ---------------------------------------------------------------------------
// Garbage Collection (GC) i pamięć
// ---------------------------------------------------------------------------
// - JS używa automatycznego GC (mark-and-sweep): obiekty osiągalne z rootów (global, stos, zamknięcia) żyją.
// - Cykl nie powoduje wycieku, jeśli nie ma odniesienia z zewnątrz; ale długożyjące struktury (cache, globalne mapy) trzeba czyścić ręcznie.
// - WeakMap/WeakSet nie trzymają przy życiu kluczy; dobre do powiązań pomocniczych (np. metadata per obiekt).
// - FinalizationRegistry istnieje, ale jest niedeterministyczne; nie opieraj na nim krytycznej logiki.
// - Najczęstsze wycieki: globalne singletons trzymające cache bez limitu, event listenery nieodpięte, setInterval bez clearInterval, zamknięcia trzymające duże obiekty.

// ---------------------------------------------------------------------------
// SharedArrayBuffer, Atomics, pamięć współdzielona
// ---------------------------------------------------------------------------
// - SharedArrayBuffer udostępnia bufor między workerami (Web/Worker Threads w Node). Dane mutujesz współdzielone.
// - Atomics.* zapewniają atomowe operacje na typowanych tablicach (Int32Array/BigInt64Array i pokrewne). Pozwalają na wait/notify (blokada wątku).
// - Używaj tylko, gdy rzeczywiście potrzebna jest współdzielona pamięć i synchronizacja; inaczej preferuj message passing (postMessage).
// - Współbieżność: Atomics.wait blokuje tylko w workerze, nie w głównym wątku przeglądarki.
// - Jeśli nie znasz się na modelu pamięci, unikaj; łatwo o deadlock/race.

// ---------------------------------------------------------------------------
// TypedArray / DataView – głębiej
// ---------------------------------------------------------------------------
// - Widoki: Int8/Uint8/Uint8Clamped, Int16/Uint16, Int32/Uint32, Float32/Float64, BigInt64/BigUint64.
// - Wszystkie operują na ArrayBuffer/SharedArrayBuffer; dane są w pamięci ciągłej, indeksowane bajtowo zgodnie z rozmiarem elementu.
// - DataView daje precyzyjną kontrolę endianness i rozmiarów pól; przydatne przy protokołach binarnych.
// - Kopiowanie: subarray() współdzieli bufor; slice() kopiuje dane.

// ---------------------------------------------------------------------------
// Web Streams API / Node Streams
// ---------------------------------------------------------------------------
// - Web: ReadableStream/WritableStream/TransformStream; konsumuj przez getReader() lub async iterator (for await...of).
// - Node: pipeline/stream/promises; zwracaj uwagę na backpressure (await write / używaj pipeline).
// - fetch w nowoczesnych środowiskach daje ReadableStream w body — umożliwia strumieniowe przetwarzanie.
// - Backpressure: jeśli consumer nie nadąża, producer powinien zwolnić (await write / czekać na drain w Node).

// ---------------------------------------------------------------------------
// Temporal (propozycja zaawansowana)
// ---------------------------------------------------------------------------
// - Temporal ma zastąpić Date: Instant, PlainDate, PlainTime, PlainDateTime, ZonedDateTime, Duration, Calendar.
// - Rozwiązuje problemy z mutowalnością i strefami czasowymi; gdy będzie dostępny, preferuj do obliczeń dat/czasów.
// - Plain* bez strefy; ZonedDateTime ze strefą; Duration opisuje różnicę; Instant to punkt w czasie.

// ---------------------------------------------------------------------------
// Dekoratory (TC39 stage 3)
// ---------------------------------------------------------------------------
// - Składnia: @decorator nad klasą/polem/metodą/getterem/setterem/auto-accessor.
// - Dekorator to funkcja, która otrzymuje informacje o elemencie i może modyfikować jego definicję lub dodać inicjalizatory.
// - Wymaga wsparcia środowiska/bundlera (Babel/TS z nowymi ustawieniami).
// - Użyteczne do logowania, walidacji, DI, reagowania na zmiany pól (auto-accessors).

// ---------------------------------------------------------------------------
// Event loop – kolejki i fazy (Node vs przeglądarka)
// ---------------------------------------------------------------------------
// - Mikro-zadania: Promise then/catch/finally, queueMicrotask, MutationObserver. Wykonują się po bieżącym makro-zadaniu, przed kolejnym makro.
// - Makro-zadania: setTimeout/setInterval, I/O, messageChannel (przeglądarka), setImmediate (Node), fazy event loop w Node (timers, pending, idle, poll, check, close).
// - Zrozumienie kolejek pomaga uniknąć głodzenia makro-zadań nadmiernymi microtasks.
// - Typowy błąd: pętle generujące masę microtasks (np. Promise.resolve().then(...)) blokują UI/poll.

// ---------------------------------------------------------------------------
// fetch / HTTP – praktyka
// ---------------------------------------------------------------------------
// - Sprawdzaj res.ok lub status; 4xx/5xx nie rzucają automatycznie.
// - Używaj AbortController dla timeoutów; Promise.race z własnym timeoutem jako fallback.
// - CORS: dopasuj origin, nagłówki i credentials. Preflight OPTIONS może blokować, jeśli nagłówki są niestandardowe.
// - FormData do multipart; JSON.stringify dla application/json; pamiętaj o Content-Type.
// - strumieniowanie odpowiedzi (body jako ReadableStream) przy dużych plikach.

// ---------------------------------------------------------------------------
// Node – codzienne API (rozszerzenie)
// ---------------------------------------------------------------------------
// - fs/promises: unikaj sync w serwerach; używaj try/catch i obsługuj ENOENT.
// - path: join/resolve i fileURLToPath(import.meta.url) w ESM do budowy ścieżek.
// - process: env, argv, cwd(); ustaw process.exitCode zamiast exit() gdy to możliwe.
// - worker_threads: do zadań CPU; child_process.exec/spawn do wywołań narzędzi zewnętrznych.
// - http/https (Node core): pamiętaj o limitach timeout/keep-alive i rozmiaru body.
// - Diagnostyka: node --trace-warnings, --trace-deprecation; NODE_OPTIONS=--max-old-space-size=...

// ---------------------------------------------------------------------------
// Pakowanie/bundling i tree-shaking
// ---------------------------------------------------------------------------
// - ESM + named exports wspiera lepszy tree-shaking.
// - Ustaw sideEffects w package.json (false lub lista plików z efektami ubocznymi) by pomóc bundlerom.
// - Code splitting: dynamic import do ładowania na żądanie.
// - Unikaj require w kodzie ESM jeśli chcesz pełny tree-shaking; import inline w funkcjach ogranicza wciąganie nieużywanych modułów.

// ---------------------------------------------------------------------------
// Performance – praktyczne wskazówki
// ---------------------------------------------------------------------------
// - Profiluj: performance API w przeglądarce, perf_hooks w Node, narzędzia devtools.
// - Minimalizuj pracę w gorących pętlach; unikaj niepotrzebnych alokacji.
// - Debounce/throttle zdarzeń, lazy loading zasobów, cache (w pamięci/HTTP) z kontrolą rozmiaru/TTL.
// - Uważaj na layout thrashing w DOM: grupuj odczyty i zapisy; używaj requestAnimationFrame.

// ---------------------------------------------------------------------------
// Bezpieczeństwo – uzupełnienie
// ---------------------------------------------------------------------------
// - XSS: używaj textContent, w szablonach escapuj; Content Security Policy może ograniczyć wektory.
// - CSRF: stosuj SameSite cookies, tokeny CSRF lub nagłówki specyficzne.
// - Prototype pollution: filtruj __proto__/constructor/prototype przy merge danych zewnętrznych.
// - Deserializacja: unikaj eval/Function; JSON.parse tylko na zaufanych lub po walidacji.
// - Nagłówki bezpieczeństwa: Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options/Frame-Options, Referrer-Policy.

// ---------------------------------------------------------------------------
// Debugging/profiling – uzupełnienie
// ---------------------------------------------------------------------------
// - console.group/console.groupEnd do grupowania logów.
// - Performance timeline: performance.mark/measure; w Node performance.timerify do pomiaru funkcji.
// - Heap snapshots (devtools/Chrome/Node) do wykrywania wycieków.
// - Flame charts do identyfikacji wąskich gardeł CPU.

// ---------------------------------------------------------------------------
// Testowanie – uzupełnienie
// ---------------------------------------------------------------------------
// - Fake timers do testów czasu; msw/nock do stubów sieci; playright/cypress do E2E.
// - Property-based testing (fast-check) dla funkcji czystych.
// - Snapshoty z rozwagą: aktualizuj świadomie, waliduj kluczowe fragmenty.

// ---------------------------------------------------------------------------
// Styl i czytelność – uzupełnienie
// ---------------------------------------------------------------------------
// - Jedna odpowiedzialność na moduł/plik; eksportuj API minimalne.
// - Komentarze tłumaczące „dlaczego”, nie „co”; kod ma mówić sam za siebie nazwami.
// - Ustal konwencję importów (zewnętrzne, wewnętrzne, ścieżki względne/aliasy) i trzymaj się jej.
// - Używaj guard clauses zamiast głębokiego zagnieżdżania if; małe funkcje zamiast monolitów.

// ---------------------------------------------------------------------------
// Codzienny toolkit (praktyczne snippet’y)
// ---------------------------------------------------------------------------
// Debounce (ograniczenie częstotliwości wywołań, ostatnie wywołanie wygrywa):
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Throttle (wywołania co najwyżej raz na okno czasowe):
function throttle(fn, interval = 200) {
  let last = 0;
  let pending;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    } else {
      pending = args;
      clearTimeout(pending?._timer);
      pending._timer = setTimeout(() => {
        last = Date.now();
        fn(...pending);
      }, interval - (now - last));
    }
  };
}

// Bezpieczny dostęp i fallback:
const city = user?.address?.city ?? "unknown";

// Fetch helper z timeoutem i JSON:
async function fetchJson(url, { timeoutMs = 8000, ...opts } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ac.signal, headers: { Accept: "application/json", ...(opts?.headers || {}) } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Prosty limiter równoległości (kolejka):
function createLimiter(limit = 5) {
  let active = 0;
  const queue = [];
  const run = () => {
    if (active >= limit) return;
    const job = queue.shift();
    if (!job) return;
    active += 1;
    job()
      .finally(() => {
        active -= 1;
        run();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push(() => fn().then(resolve, reject));
      run();
    });
}

// Logger z poziomami:
const log = {
  info: (...x) => console.info("[INFO]", ...x),
  warn: (...x) => console.warn("[WARN]", ...x),
  error: (...x) => console.error("[ERROR]", ...x),
};

// Deep clone w codziennej pracy: preferuj structuredClone, gdy dostępne:
// const copy = structuredClone(obj);
// Jeśli brak, używaj bibliotek (lodash.cloneDeep) zamiast JSON hack dla złożonych struktur.

// Walidacja danych (przykład patternu):
function assertString(v, name = "value") {
  if (typeof v !== "string") throw new TypeError(`${name} must be string`);
  return v;
}

// Minimalny guard przy pracy z liczbami:
function toNumberSafe(v, name = "value") {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new TypeError(`${name} must be finite number`);
  return n;
}

// Cache w pamięci z TTL:
function createTTLCache(ttlMs = 5_000) {
  const store = new Map();
  return {
    get(key) {
      const hit = store.get(key);
      if (!hit) return undefined;
      const [value, expires] = hit;
      if (Date.now() > expires) {
        store.delete(key);
        return undefined;
      }
      return value;
    },
    set(key, value) {
      store.set(key, [value, Date.now() + ttlMs]);
    },
    clear() {
      store.clear();
    },
  };
}

// Memoizacja z TTL (dla funkcji async/sync, key z JSON.stringify argów):
function memoizeWithTTL(fn, ttlMs = 5_000) {
  const cache = createTTLCache(ttlMs);
  return async (...args) => {
    const key = JSON.stringify(args);
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Retry z prostym backoffem (async):
async function withRetry(fn, attempts = 3, baseDelay = 200) {
  let lastErr;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const delay = baseDelay * 2 ** i;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw lastErr;
}

// Safe JSON parse z walidacją try/catch:
function parseJsonSafe(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

// Normalizacja daty (Date lub string/number) -> Date lub błąd:
function toDateStrict(input, name = "date") {
  const d = input instanceof Date ? input : new Date(input);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
    throw new TypeError(`${name} is not a valid Date`);
  }
  return d;
}




