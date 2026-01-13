// Zaawansowane fetch: nagłówki, retry, AbortController, JSON helpery

// Helper do JSON: automatycznie ustawia nagłówek i obsługuje parse
async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json", // oczekujemy/ wysyłamy JSON
      ...(options.headers || {}), // pozwala nadpisać/uzupełnić nagłówki
    },
    ...options, // metoda, body itd.
  });
  if (!res.ok) {
    // błąd HTTP
    const text = await res.text(); // treść dla debugu
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json(); // parsuje i zwraca obiekt
}

// Retry z opóźnieniem i backoffem
async function fetchWithRetry(url, options = {}, attempts = 3, delayMs = 200) {
  let lastError; // przechowuje ostatni błąd
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fetchJson(url, options); // próbujemy pobrać
    } catch (err) {
      lastError = err; // zapisujemy błąd
      await new Promise((r) => setTimeout(r, delayMs * (i + 1))); // prosty backoff
    }
  }
  throw lastError; // po wyczerpaniu prób
}

// AbortController: możliwość anulowania żądania (np. gdy użytkownik zmieni widok)
async function fetchWithAbort(url, timeoutMs = 3000) {
  const controller = new AbortController(); // tworzymy kontroler
  const timer = setTimeout(() => controller.abort(), timeoutMs); // planujemy abort
  try {
    const res = await fetch(url, { signal: controller.signal }); // fetch z sygnałem
    clearTimeout(timer); // czyścimy timer po sukcesie
    return res.json(); // zwracamy dane
  } finally {
    clearTimeout(timer); // safety: czyścimy nawet przy błędzie
  }
}

// Wysyłanie JSON metodą POST/PUT/PATCH
async function sendJson(url, data, method = "POST") {
  return fetchJson(url, {
    method, // np. "POST"
    body: JSON.stringify(data), // serializacja danych
  });
}

// Obsługa plików: multipart/form-data z FormData
async function uploadFile(url, file, extraFields = {}) {
  const form = new FormData(); // tworzymy FormData
  form.append("file", file); // dodajemy plik
  Object.entries(extraFields).forEach(([key, value]) => form.append(key, value)); // dodatkowe pola
  const res = await fetch(url, { method: "POST", body: form }); // wysyłamy
  if (!res.ok) throw new Error(`Upload failed ${res.status}`); // weryfikacja statusu
  return res.json(); // odpowiedź JSON
}

// Prosta kolejka żądań: ograniczenie równoległości
function createHttpQueue(limit = 2) {
  let active = 0; // aktualnie wykonywane żądania
  const queue = []; // oczekujące funkcje

  const runNext = () => {
    if (active >= limit || queue.length === 0) return; // brak slotu lub zadań
    const { task, resolve, reject } = queue.shift(); // pobieramy zadanie
    active += 1; // zwiększamy licznik
    task()
      .then(resolve) // sukces
      .catch(reject) // błąd
      .finally(() => {
        active -= 1; // zwalniamy slot
        runNext(); // uruchamiamy kolejne
      });
  };

  const enqueue = (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ task: fn, resolve, reject }); // dodajemy do kolejki
      runNext(); // próbujemy uruchomić
    });

  return { enqueue }; // zwracamy API kolejki
}

module.exports = {
  fetchJson,
  fetchWithRetry,
  fetchWithAbort,
  sendJson,
  uploadFile,
  createHttpQueue,
};

// ---
// Dlaczego tak:
// - fetchJson centralizuje nagłówki i obsługę statusów, zwracając od razu zparsowany JSON.
// - fetchWithRetry dodaje prosty backoff i powtarza próby, co stabilizuje połączenia sieciowe.
// - fetchWithAbort używa AbortController z timeoutem, aby uniknąć wiszących żądań.
// - sendJson upraszcza POST/PUT/PATCH z JSON body, a uploadFile demonstruje FormData dla multipart.
// - createHttpQueue ogranicza równoległość żądań, co zapobiega zalaniu API i pokazuje prostą kolejkę obietnic.
