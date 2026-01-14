// Przykładowe rozwiązania zadań asynchronicznych z pliku tasks-async.js.
// Każda linia ma krótki komentarz wyjaśniający logikę.

function delay(value, ms = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms)); // wrapper na setTimeout w promisie
}

async function fetchAll(fnList) {
  return Promise.all(fnList.map((fn) => fn())); // równoległe wywołanie wszystkich funkcji
}

async function withTimeout(promise, ms = 300) {
  const timeout = new Promise((_, rej) =>
    setTimeout(() => rej(new Error("Timeout")), ms)
  ); // promisa odrzucająca po czasie
  return Promise.race([promise, timeout]); // wybiera pierwszą zakończoną promesę
}

async function getData(value) {
  try {
    return await delay(value, 100); // czeka na wynik delay
  } catch {
    return "ERROR"; // zwraca komunikat w razie błędu
  }
}

function createQueue(limit = 2) {
  let active = 0; // liczba aktywnych zadań
  const queue = []; // kolejka czekających zadań

  const runNext = () => {
    if (active >= limit) return; // blokada gdy osiągnięto limit
    const item = queue.shift(); // pobranie następnego zadania
    if (!item) return; // brak zadań do uruchomienia
    active += 1; // zwiększenie licznika aktywnych
    item
      .fn() // uruchomienie funkcji
      .then(item.resolve) // przekazanie wyniku
      .catch(item.reject) // przekazanie błędu
      .finally(() => {
        active -= 1; // zmniejszenie licznika po zakończeniu
        runNext(); // próba uruchomienia kolejnego
      });
  };

  const enqueue = (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject }); // dodanie do kolejki
      runNext(); // natychmiastowa próba startu jeśli są zasoby
    });

  return { enqueue }; // API kolejki
}

async function withRetry(fn, attempts = 3, delayMs = 100) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn(); // próba wykonania
    } catch (e) {
      if (i === attempts - 1) throw e; // przy ostatniej próbie propaguj błąd
      await delay(null, delayMs); // krótkie oczekiwanie przed kolejną próbą
    }
  }
}

function debouncePromise(fn, wait = 200) {
  let timer; // uchwyt do timeoutu
  return (...args) =>
    new Promise((resolve, reject) => {
      clearTimeout(timer); // anulowanie poprzedniego timeoutu
      timer = setTimeout(async () => {
        try {
          const res = await fn(...args); // wywołanie opóźnionej funkcji
          resolve(res); // zwrot wyniku
        } catch (e) {
          reject(e); // zwrot błędu
        }
      }, wait); // ustawienie nowego timeoutu
    });
}

function createPriorityQueue() {
  const queue = []; // kolejka z priorytetami
  let running = false; // flaga trwającego zadania

  const runNext = () => {
    if (running) return; // nie uruchamiaj równolegle
    const item = queue.shift(); // pobierz najwyższy priorytet
    if (!item) return; // brak zadań
    running = true; // ustaw flagę
    item
      .fn() // uruchom zadanie
      .then(item.resolve) // przekaż wynik
      .catch(item.reject) // przekaż błąd
      .finally(() => {
        running = false; // zwolnij flagę
        runNext(); // uruchom kolejne
      });
  };

  const enqueue = (fn, priority = 0) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, priority, resolve, reject }); // dodaj zadanie
      queue.sort((a, b) => b.priority - a.priority); // sortuj malejąco po priorytecie
      runNext(); // spróbuj wystartować
    });

  return { enqueue }; // API kolejki priorytetowej
}

// Dodatkowe zadanie A: mapowanie z limitem współbieżności.
async function mapWithLimit(items, limit, worker) {
  const q = createQueue(limit); // tworzy kolejkę o danym limicie
  const results = new Array(items.length); // tablica wyników
  await Promise.all(
    items.map((item, idx) =>
      q.enqueue(() => worker(item).then((res) => (results[idx] = res)))
    )
  ); // uruchomienie zadań z zachowaniem limitu
  return results; // zwrot uporządkowanych wyników
}

// Dodatkowe zadanie B: allSettled polyfill uproszczony.
function allSettledSimple(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value) => ({ status: "fulfilled", value })) // sukces
        .catch((reason) => ({ status: "rejected", reason })) // błąd
    )
  ); // zwraca tablicę opisów wyników
}

module.exports = {
  delay,
  fetchAll,
  withTimeout,
  getData,
  createQueue,
  withRetry,
  debouncePromise,
  createPriorityQueue,
  mapWithLimit,
  allSettledSimple,
};
