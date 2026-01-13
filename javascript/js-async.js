// Callback (starszy wzorzec) – łatwo o "callback hell"
function fetchDataWithCallback(url, cb) {
  setTimeout(() => {
    // symulacja sieci: zwracamy dane po czasie
    cb(null, { url, data: "ok" });
  }, 200);
}

// Promisy – podstawowa abstrakcja asynchroniczna
function fetchDataPromise(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ url, data: "ok" }), 200);
  });
}

// async/await – czytelny zapis kodu asynchronicznego
async function getData(url) {
  // await wstrzymuje do spełnienia promisy
  const response = await fetchDataPromise(url);
  return response.data;
}

// Obsługa błędów w async/await
async function safeGetData(url) {
  try {
    const response = await fetchDataPromise(url);
    return response.data;
  } catch (err) {
    return `Błąd: ${err.message}`;
  }
}

// Równoległe wykonywanie promisy (Promise.all)
async function getMany(urls) {
  // Promise.all rzuci błąd, jeśli jedna promisa się odrzuci
  const results = await Promise.all(urls.map(fetchDataPromise));
  return results.map((r) => r.data);
}

// Timeout i wyścig promisy (Promise.race)
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
}

async function getWithTimeout(url, ms = 300) {
  // wyścig: dane vs timeout
  return Promise.race([fetchDataPromise(url), timeout(ms)]);
}

// Strumieniowe przetwarzanie: prosty przykład EventEmitter w Node
const { EventEmitter } = require("events");
const bus = new EventEmitter();

function listenToEvents() {
  // reagujemy na zdarzenia "data"
  bus.on("data", (payload) => {
    // side-effect: log do konsoli
    console.log("otrzymano", payload);
  });
}

function emitData() {
  // emitowanie zdarzenia z danymi
  bus.emit("data", { ts: Date.now(), value: Math.random() });
}

// Eksport funkcji do ćwiczeń w innych plikach
module.exports = {
  fetchDataWithCallback,
  fetchDataPromise,
  getData,
  safeGetData,
  getMany,
  getWithTimeout,
  listenToEvents,
  emitData,
};

// ---
// Dlaczego tak:
// - Pokazuje ewolucję asynchroniczności w JS: callback → Promise → async/await.
// - Promise.all/race demonstrują równoległość i timeouty, a try/catch pokazuje obsługę błędów w async.
// - EventEmitter ilustruje model zdarzeń/strumieni w Node poza fetch/HTTP.
// - Eksporty pozwalają łatwo przetestować funkcje lub użyć ich w innych modułach.
