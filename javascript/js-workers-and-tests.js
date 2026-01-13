// Przykłady: Worker Threads (Node) i Web Workers (przeglądarka) — szkic
// + szkielet testów w Jest dla wybranych funkcji

// --- Worker Threads (Node) ---
// Uwaga: ten kod to przykład; aby uruchomić, potrzebny jest plik worker i środowisko Node z module 'worker_threads'.
// const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
// if (isMainThread) {
//   const worker = new Worker(__filename, { workerData: { value: 42 } }); // uruchom worker z danymi
//   worker.on("message", (msg) => console.log("wynik z workera", msg)); // odbiór wiadomości
// } else {
//   const result = workerData.value * 2; // praca CPU w workerze
//   parentPort.postMessage(result); // wyślij wynik
// }

// --- Web Workers (browser) ---
// const worker = new Worker("worker.js"); // w przeglądarce
// worker.postMessage({ value: 42 }); // wyślij dane
// worker.onmessage = (event) => console.log("wynik", event.data); // odbierz wynik

// --- Szkielet testów w Jest ---
// Ten plik nie uruchamia testów, ale pokazuje, jak wygląda prosty zestaw.
// Instalacja (poza zakresem tutaj): npm i -D jest @types/jest ts-jest (dla TS) lub sam jest dla JS.

// Przykładowe funkcje do testów (importuj z istniejących plików)
const { add } = require("./js-distributed-testing"); // funkcja add
const { binarySearch } = require("./js-algorithms-classic"); // funkcja wyszukiwania

// Przykładowe testy (syntaktyczny szkic):
// describe("add", () => {
//   test("dodaje dwie liczby", () => {
//     expect(add(2, 3)).toBe(5); // asercja
//   });
// });

// describe("binarySearch", () => {
//   test("znajduje element w posortowanej tablicy", () => {
//     const arr = [1, 3, 5, 7];
//     expect(binarySearch(arr, 5)).toBe(2); // indeks 2
//   });
//   test("zwraca -1 gdy brak", () => {
//     const arr = [1, 3, 5, 7];
//     expect(binarySearch(arr, 4)).toBe(-1);
//   });
// });

module.exports = {
  // brak realnych eksportów workers; testy importują funkcje z innych modułów
};

// ---
// Dlaczego tak:
// - Plik zarysowuje dwa modele workerów: Worker Threads w Node i Web Workers w przeglądarce, bez uruchamiania ich w tym pliku.
// - Przykłady pokazują przepływ message passing (postMessage/onmessage) zamiast współdzielonej pamięci.
// - Sekcja testów to szkic konfiguracji Jest i prostych testów dla funkcji importowanych z innych modułów.
// - Celem jest wskazanie, gdzie umieścić kod workerów/testów i jak wygląda minimalna struktura, bez pełnej konfiguracji środowiska.
