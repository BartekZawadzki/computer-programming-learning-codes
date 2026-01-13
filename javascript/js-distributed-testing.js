// Programowanie rozproszone + testowanie: REST/RPC/Messaging, spójność, odporność,
// oraz rodzaje testów, testy niefunkcjonalne, automatyzacja

// REST: prosta funkcja fetch GET (asynchroniczne I/O)
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`); // żądanie HTTP
  if (!res.ok) throw new Error("HTTP error"); // walidacja statusu
  return res.json(); // dane JSON
}

// RPC: wywołanie zdalnej funkcji (tu symulacja) – zazwyczaj binarny protokół, kontrakt
async function rpcCall(method, params) {
  const payload = { method, params }; // dane wywołania
  // w praktyce: gRPC/JSON-RPC/Thrift; tu pokazujemy koncepcję
  return fakeNetwork(payload); // zwraca promisa z wynikiem
}

// Messaging: publish/subscribe (tu EventEmitter jako przykład)
const { EventEmitter } = require("events");
const bus = new EventEmitter(); // kanał komunikacji
bus.on("order.created", (evt) => console.log("obsłuż zamówienie", evt)); // subskrypcja
bus.emit("order.created", { id: 123 }); // publikacja

// Spójność i skalowanie: replikacja, load balancing (pojęcia)
// - Replikacja: wiele kopii danych dla HA; tryby master-replica, multi-master.
// - Load balancing: rozdzielanie ruchu (round-robin, least-connections, hash).

// Odporność: retry i circuit breaker (prosty schemat)
async function withRetry(fn, attempts = 3, delayMs = 100) {
  let last;
  for (let i = 0; i < attempts; i += 1) {
    try { return await fn(); } // sukces
    catch (err) { last = err; await new Promise((r) => setTimeout(r, delayMs)); } // czekaj i spróbuj
  }
  throw last; // po wyczerpaniu prób
}

function makeCircuitBreaker(fn, maxFailures = 3, coolDownMs = 1000) {
  let fails = 0; // licznik porażek
  let openUntil = 0; // timestamp do kiedy obwód otwarty
  return async (...args) => {
    const now = Date.now();
    if (now < openUntil) throw new Error("Circuit open"); // odrzucenie
    try {
      const res = await fn(...args); // próba
      fails = 0; // reset po sukcesie
      return res; // wynik
    } catch (err) {
      fails += 1; // zlicz porażki
      if (fails >= maxFailures) openUntil = now + coolDownMs; // otwarcie na cooldown
      throw err; // propaguj błąd
    }
  };
}

// Observability: logowanie, metryki, trasy (tracing) – tu tylko notatka API
function logInfo(msg, ctx = {}) { console.log("info", msg, ctx); } // log informacji
function recordMetric(name, value) { /* wysyłka metryki do systemu */ } // metryka
function traceSpan(name, fn) { return fn(); } // wrapper na span (upraszczamy)

// --- TESTOWANIE ---

// Rodzaje testów: jednostkowe, integracyjne, systemowe, E2E
// Jednostkowy: testuje funkcję w izolacji
function add(a, b) { return a + b; } // prosta funkcja do testów
function test_add() {
  if (add(2, 2) !== 4) throw new Error("test_add failed");
}

// Integracyjny: sprawdza współdziałanie komponentów (np. funkcja + baza/mock)
async function test_fetchUser_withMock() {
  const res = await fetchUser(1); // w realnym teście podmieniasz fetch mockiem
  if (!res) throw new Error("brak danych"); // asercja przykładowa
}

// Systemowe/E2E: cała aplikacja od wejścia do wyjścia (tu: tylko opis)
// - E2E używa przeglądarki/drivera (Playwright/Cypress) i sprawdza ścieżki użytkownika.

// Testy niefunkcjonalne: wydajność, bezpieczeństwo, użyteczność
// - Wydajność: k6/JMeter/Locust (load, stress).
// - Bezpieczeństwo: SAST/DAST, fuzzing, skan podatności.
// - Użyteczność: badania UX, heurystyki, testy A/B.

// Automatyzacja: frameworki i mocki
// - Frameworki: Jest/Vitest/Mocha. Asercje + runner.
// - Mocki: zastępowanie realnych zależności (sieć/baza) atrapami/stubami.
// - Test coverage: raport % pokrycia (statement/branch/function/line).

module.exports = {
  fetchUser,
  rpcCall,
  bus,
  withRetry,
  makeCircuitBreaker,
  logInfo,
  recordMetric,
  traceSpan,
  add,
  test_add,
  test_fetchUser_withMock,
};

// ---
// Dlaczego tak:
// - Plik łączy pojęcia komunikacji rozproszonej (REST, RPC, messaging) z odpornością (retry, circuit breaker) i szkicem testów.
// - withRetry/makeCircuitBreaker pokazują, jak opakować dowolną funkcję, by zwiększyć niezawodność w systemach z siecią.
// - EventEmitter bus demonstruje pub/sub jako prosty kanał komunikacji między komponentami.
// - Sekcje o rodzajach testów i niefunkcjonalnych aspektach wskazują, jak myśleć o pełnym pokryciu jakościowym, nie tylko unit.
