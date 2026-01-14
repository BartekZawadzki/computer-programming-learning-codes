// Zadania: asynchroniczność (callback → Promise → async/await), timeout, race.
// Komentarze prowadzą przez kolejne kroki. Testuj w Node (18+) lub przeglądarce.

// 1) Promisy: zamień setTimeout na Promise, który zwraca wartość po ms.
function delay(value, ms = 200) {
  // TODO: zwróć new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// 2) Promise.all: pobierz dane równolegle.
//    Uzupełnij fetchAll tak, by wykonywał równolegle promisy z tablicy fnList (funkcji zwracających promisy).
async function fetchAll(fnList) {
  // TODO: Promise.all(fnList.map(fn => fn()))
}

// 3) Promise.race z timeoutem.
//    Zaimplementuj withTimeout(promise, ms) — jeśli promise nie zakończy się przed ms, rzuć błąd Timeout.
async function withTimeout(promise, ms = 300) {
  // TODO: Promise.race([promise, new Promise((_,rej)=>setTimeout(()=>rej(new Error("Timeout")), ms))])
}

// 4) async/await: bez zbędnych then-ów.
//    Uzupełnij getData, by używało await delay, a błędy łapało w try/catch i zwracało "ERROR".
async function getData(value) {
  // TODO: try { return await delay(value, 100); } catch { return "ERROR"; }
}

// 5) Kolejka z ograniczeniem równoległości (prostokonkureny throttling).
//    enqueue(fn) powinno zwracać promisa, ale nie uruchomi fn od razu, jeśli aktywnych zadań >= limit.
function createQueue(limit = 2) {
  let active = 0;
  const queue = [];

  const runNext = () => {
    if (active >= limit) return;
    const item = queue.shift();
    if (!item) return;
    active += 1;
    item.fn()
      .then(item.resolve)
      .catch(item.reject)
      .finally(() => {
        active -= 1;
        runNext();
      });
  };

  const enqueue = (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      runNext();
    });

  return { enqueue };
}

// 6) Retry z ograniczoną liczbą prób.
//    Funkcja withRetry(fn, attempts) wywołuje fn (zwracającego Promise) do skutku lub do wyczerpania prób.
async function withRetry(fn, attempts = 3, delayMs = 100) {
  // TODO: pętla for, try/catch, przy błędzie sleep (delay) i kolejne podejście
}

// 7) Kolejkowanie + opóźnienie startu (debounce-like)
//    Zaimplementuj debouncePromise(fn, wait), który zwraca funkcję opóźniającą wywołanie fn o wait ms
//    (jeśli w tym czasie nastąpi kolejne wywołanie, poprzednie odrzuć).
function debouncePromise(fn, wait = 200) {
  let timer;
  return (...args) =>
    new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          const res = await fn(...args);
          resolve(res);
        } catch (e) {
          reject(e);
        }
      }, wait);
    });
}

// 8) Kolejka priorytetowa (prosty wariant) — sortuj zadania po priority malejąco.
function createPriorityQueue() {
  const queue = [];
  const enqueue = (fn, priority = 0) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, priority, resolve, reject });
      queue.sort((a, b) => b.priority - a.priority); // najwyższy priorytet pierwszy
      runNext();
    });

  let running = false;
  const runNext = () => {
    if (running) return;
    const item = queue.shift();
    if (!item) return;
    running = true;
    item
      .fn()
      .then(item.resolve)
      .catch(item.reject)
      .finally(() => {
        running = false;
        runNext();
      });
  };

  return { enqueue };
}

// 9) Mapowanie z limitem współbieżności
//    Przyjmij tablicę items, limit i worker zwracający Promise; zachowaj kolejność wyników.
async function mapWithLimit(items, limit, worker) {
  // TODO: użyj createQueue(limit); enqueue worker; zwróć tablicę wyników w kolejności wejścia
}

// 10) Polyfill allSettled (uprośc)
//     Zwróć tablicę obiektów { status: "fulfilled", value } lub { status: "rejected", reason }.
function allSettledSimple(promises) {
  // TODO: Promise.all(promises.map(p => Promise.resolve(p).then(...).catch(...)))
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
