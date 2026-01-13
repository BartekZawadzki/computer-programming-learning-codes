// Worker Threads: prosty przykład delegowania pracy CPU do wątku roboczego.
// Uwaga: Worker Threads działają w Node, nie w przeglądarce.
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads"); // moduł wątków

if (isMainThread) {
  // Kod wykonywany w głównym wątku
  function runWorkerTask(value) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: value }); // uruchom worker z danymi
      worker.on("message", (msg) => resolve(msg)); // wynik z workera
      worker.on("error", reject); // błąd w workerze
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`)); // błąd zakończenia
      });
    });
  }

  // Jeśli uruchomiony bezpośrednio, wykonaj demo
  if (require.main === module) {
    runWorkerTask(21)
      .then((res) => console.log("wynik z workera:", res)) // log wyniku
      .catch((err) => console.error("błąd workera:", err)); // log błędu
  }

  module.exports = { runWorkerTask }; // eksport dla użycia w innych modułach
} else {
  // Kod wykonywany wewnątrz workera
  const input = workerData; // dane wejściowe przekazane z głównego wątku
  const result = input * 2; // przykładowa praca CPU (prosta operacja)
  parentPort.postMessage(result); // odeślij wynik do głównego wątku
}

// ---
// Dlaczego tak:
// - Worker Threads są przeznaczone dla zadań CPU-bound; przykład pokazuje minimalny wzorzec request/response.
// - Promise wrapper w runWorkerTask upraszcza użycie z async/await i obsługę błędów/exit code.
// - Rozdzielenie kodu main/worker (isMainThread) pokazuje strukturę pojedynczego pliku z workerem wbudowanym.
// - parentPort.postMessage i workerData demonstrują mechanizm komunikacji między wątkami.
