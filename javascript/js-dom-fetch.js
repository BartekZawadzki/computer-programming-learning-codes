// DOM: wybieranie elementów
const titleEl = document.querySelector("h1"); // pierwszy pasujący element
const buttons = document.querySelectorAll("button"); // NodeList wszystkich przycisków

// Modyfikacja treści i atrybutów
titleEl.textContent = "Witaj w DOM"; // ustawia tekst
titleEl.setAttribute("data-test", "title"); // dodaje atrybut

// Tworzenie nowego elementu
const note = document.createElement("p"); // nowy paragraf
note.textContent = "Dynamiczny element"; // ustawiamy tekst
document.body.appendChild(note); // wpinamy do drzewa DOM

// Obsługa zdarzeń
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault(); // blokujemy domyślne zachowanie jeśli potrzebne
    btn.classList.toggle("active"); // przełączamy klasę CSS
  });
});

// Delegacja zdarzeń (wydajniejsze przy wielu elementach)
document.addEventListener("click", (event) => {
  const target = event.target; // element, na który kliknięto
  if (target.matches("[data-action='remove']")) {
    target.remove(); // usuń kliknięty element
  }
});

// Formularz: zbieranie wartości i walidacja prosta
function handleSubmit(formEl) {
  formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // nie przeładowujemy strony
    const formData = new FormData(formEl); // para klucz-wartość
    const name = formData.get("name"); // pobiera wartość pola "name"
    if (!name) {
      alert("Imię jest wymagane"); // prosta walidacja
      return;
    }
    console.log("wysyłam", Object.fromEntries(formData)); // log danych
  });
}

// Fetch GET – pobranie danych JSON
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users"); // żądanie HTTP
  if (!res.ok) throw new Error("Błąd sieci"); // walidacja statusu
  const data = await res.json(); // parsowanie JSON
  return data; // zwracamy tablicę użytkowników
}

// Fetch POST – wysłanie danych
async function createPost(payload) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // metoda HTTP
    headers: { "Content-Type": "application/json" }, // nagłówek typu
    body: JSON.stringify(payload), // serializacja do JSON
  });
  if (!res.ok) throw new Error("Nie udało się utworzyć"); // obsługa błędu
  return res.json(); // zwracamy utworzony obiekt
}

// Renderowanie listy elementów na podstawie danych
function renderList(container, items) {
  container.innerHTML = ""; // czyścimy zawartość
  const frag = document.createDocumentFragment(); // fragment dla wydajności
  items.forEach((item) => {
    const li = document.createElement("li"); // nowy li
    li.textContent = item.name; // treść z danych
    frag.appendChild(li); // dodajemy do fragmentu
  });
  container.appendChild(frag); // jednorazowe wpięcie
}

// Debounce – ograniczenie liczby wywołań (np. dla input)
function debounce(fn, delay = 300) {
  let timerId; // id timeoutu
  return (...args) => {
    clearTimeout(timerId); // czyścimy poprzedni timeout
    timerId = setTimeout(() => fn(...args), delay); // planujemy nowe wywołanie
  };
}

// Throttle – wywołanie nie częściej niż co interval
function throttle(fn, interval = 200) {
  let last = 0; // ostatni czas wykonania
  return (...args) => {
    const now = Date.now(); // aktualny czas
    if (now - last >= interval) {
      last = now; // aktualizujemy znacznik
      fn(...args); // wykonujemy funkcję
    }
  };
}

// Eksport w środowisku ESM można zastąpić import/eksport; tu utrzymujemy CommonJS
module.exports = {
  handleSubmit,
  fetchUsers,
  createPost,
  renderList,
  debounce,
  throttle,
};

// ---
// Dlaczego tak:
// - Łączy operacje na DOM (query, events, delegacja, tworzenie elementów) z fetch GET/POST.
// - FormData + Object.fromEntries to wygodny sposób odczytu danych formularza.
// - Debounce/Throttle ograniczają częstotliwość wywołań — typowe dla input/search/scroll.
// - Użycie fragmentu przy renderowaniu listy poprawia wydajność, a walidacja res.ok zabezpiecza fetch.
