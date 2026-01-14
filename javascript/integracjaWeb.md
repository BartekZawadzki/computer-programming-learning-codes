# Integracja JS z HTML i CSS – kompletny przewodnik

Dokładnie opisane: jak JavaScript łączy się z HTML/CSS, jak współpracują warstwy, jak manipulować DOM-em, stylami i zdarzeniami, oraz dobre praktyki.

---

## 1) Architektura: HTML + CSS + JS
- **HTML**: struktura dokumentu (semantyka, elementy, atrybuty).
- **CSS**: prezentacja (layout, kolory, typografia, animacje).
- **JS**: zachowanie (logika, dane, interakcje, asynchroniczność).
- **DOM** (Document Object Model): drzewo reprezentujące HTML w pamięci. JS manipuluje DOM, co wpływa na render w przeglądarce.
- **CSSOM**: model obliczonych stylów; zmiany w DOM/CSS wpływają na reflow/repaint.

---

## 2) Jak włączać JS w HTML
- **Script w dokumencie**:
  ```html
  <script src="app.js" defer></script>
  ```
  - `defer` – skrypt pobierany równolegle, wykonany po parsowaniu HTML (kolejność zachowana).
  - `async` – skrypt pobierany równolegle, wykonany jak tylko gotowy (kolejność może się zmienić, dobre dla niezależnych).
  - Bez `defer/async` – blokuje parsowanie; unikaj w `<head>` bez powodu.
- **ES Modules**:
  ```html
  <script type="module" src="main.js"></script>
  ```
  - wspiera `import/export`, domyślnie w trybie strict, async z zachowaniem kolejności między modułami zależnymi.
- **Inline** (niezalecane): `<script>console.log('inline');</script>` – trudniejsze w utrzymaniu, ryzyko XSS.

---

## 3) Jak włączać CSS
- **Link zewnętrzny**:
  ```html
  <link rel="stylesheet" href="styles.css">
  ```
- **Style w `<style>`**: lokalne do dokumentu.
- **Inline style**: `style="color:red"` – unikaj dla większych projektów; trudne do utrzymania.

---

## 4) Selekcja i manipulacja DOM
- **Wybór elementów**:
  - `document.getElementById("id")`
  - `document.querySelector(".class")` / `querySelectorAll("div[data-x]")`
- **Tworzenie/usuwanie**:
  ```js
  const el = document.createElement("div");
  el.textContent = "Hello";
  document.body.appendChild(el);
  el.remove(); // usuń z DOM
  ```
- **Atrybuty i dane**:
  - `el.setAttribute("aria-label", "Close")`
  - `el.getAttribute("aria-label")`
  - `el.dataset.key = "value"; // data-key="value"`
- **Tekst/HTML**:
  - `el.textContent = "bezpieczny tekst";` (escapuje)
  - `el.innerHTML = "<strong>uwaga</strong>";` (wstrzykuje HTML, ryzyko XSS – tylko z zaufanym inputem)
- **Klasy i style**:
  - `el.classList.add("active");`
  - `el.style.backgroundColor = "red";`
  - Złożone style lepiej w CSS, a JS tylko przełącza klasy.

---

## 5) Zdarzenia (Events)
- **Dodawanie**:
  ```js
  el.addEventListener("click", (e) => {
    e.preventDefault(); // zatrzymaj domyślną akcję (np. submit linka)
    e.stopPropagation(); // zatrzymaj dalsze propagowanie (opcjonalnie)
  }, { passive: true /* dla scroll/touch */, capture: false });
  ```
- **Delegacja zdarzeń**: nasłuch na kontenerze, sprawdzanie `event.target`:
  ```js
  list.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    // obsłuż kliknięcie w .item
  });
  ```
- **Typowe zdarzenia**: click, input/change, submit, keydown/keyup, focus/blur, mouseenter/mouseleave, pointerdown/pointerup/move, touchstart/move/end, scroll, resize.

---

## 6) DOM → CSS: sterowanie wyglądem
- **Przełączanie klas** (preferowane):
  ```js
  el.classList.toggle("open");
  ```
- **CSS custom properties (zmienne)**:
  ```css
  :root { --brand: #0d6efd; }
  .btn { background: var(--brand); }
  ```
  JS:
  ```js
  document.documentElement.style.setProperty("--brand", "#ff6600");
  ```
- **Inline style**: szybkie, ale ograniczone; do pojedynczych wartości (np. dynamiczna szerokość).

---

## 7) Layout i reflow/repaint – wydajność
- **Reflow** (zmiana układu) jest droższy niż repaint (zmiana koloru). Unikaj przeplatania odczytów i zapisów DOM.
- **Batching**: najpierw odczyty, potem zapisy.
- **requestAnimationFrame**: do animacji/UI aktualizowanego w rytmie klatek.
- **Złożone zmiany**: użyj `document.createDocumentFragment()` lub offline DOM (np. innerHTML na kopii) i podmień jednorazowo.
- **Komp. transform/opacity**: preferuj do animacji (mniej reflow).

---

## 8) Formularze i walidacja
- **Pobieranie wartości**: `input.value`, `checkbox.checked`, `select.value`.
- **Walidacja w JS**: sprawdzaj typ/długość/wzorzec, pokazuj błędy w UI.
- **Zapobieganie submit**: w submit handlerze `e.preventDefault()` i dopiero po walidacji wysyłaj (fetch/XHR).

---

## 9) Fetch/AJAX i aktualizacja UI
- **Pobieranie danych**:
  ```js
  async function load() {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    render(data);
  }
  ```
- **Aktualizacja DOM** po fetchu: wygeneruj HTML/elementy, podmień zawartość kontenera, zarządzaj stanem „loading/error”.
- **Spinner/stany**: dodaj klasę `loading`, pokaż komunikat błędu, ukryj po sukcesie.

---

## 10) Bezpieczeństwo (XSS, dostępność)
- **XSS**: zawsze traktuj dane z zewnątrz jako niebezpieczne; używaj `textContent`, unikaj `innerHTML` (chyba że sanitizujesz).
- **Atrybuty eventów** w HTML (np. `onclick="..."`) – unikaj; lepiej `addEventListener`.
- **A11y**: aria-label, role, focus management, kolejność tab; dynamiczny kontent powinien mieć komunikaty (aria-live) tam, gdzie to potrzebne.

---

## 11) Współpraca modułów, bundlerów i frameworks
- **ESM**: `type="module"` w `<script>`; importy względne/absolutne (Vite/webpack z aliasami).
- **Bundlery** (Vite/Webpack/Rollup): pozwalają pisać modułowo, używać nowego JS, kompilować do starszych przeglądarek, wstrzykiwać CSS (np. CSS Modules).
- **Frameworki** (React/Vue/Svelte/Angular): przejmują kontrolę nad DOM (virtual DOM/kompilacja) – nie manipuluj bezpośrednio tym samym fragmentem DOM; korzystaj z ich mechanizmów stanu/propsów.

---

## 12) Service Worker / PWA (sygnał, że to osobny temat)
- JS może rejestrować service worker do cache’owania zasobów/offline/push. Traktuj to jako dodatkową warstwę — wymaga HTTPS i osobnego pliku SW.

---

## 13) Przykładowy mini-flow (klik → fetch → aktualizacja UI)
```js
const btn = document.querySelector("#load");
const list = document.querySelector("#items");

btn.addEventListener("click", async () => {
  btn.disabled = true;
  list.textContent = "Ładuję...";
  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();
    list.innerHTML = items.map((x) => `<li>${x.name}</li>`).join(""); // uwaga: tylko jeśli dane zaufane
  } catch (e) {
    list.textContent = "Błąd pobierania.";
  } finally {
    btn.disabled = false;
  }
});
```
**Jak to czytać:**
1) Znajdź przycisk i listę w DOM.  
2) Po kliknięciu: wyłącz przycisk, pokaż stan „Ładuję...”.  
3) Pobierz dane z `/api/items`; sprawdź status.  
4) Jeśli sukces — wyrenderuj listę (uwaga na `innerHTML`; dla niezaufanych użyj textContent + createElement).  
5) Obsłuż błąd komunikatem.  
6) Na koniec włącz przycisk.

---

## 14) Dobre praktyki
- Trzymaj JS w osobnych plikach; używaj `defer` lub `type="module"`.
- Manipuluj DOM przez klasy i templating, nie przez setki inline-styli.
- Waliduj dane wejściowe; sanitizuj to, co wstrzykujesz do DOM (lub używaj textContent).
- Profiluj przy problemach wydajności: reflow/repaint, event flood (scroll/resize) → debounce/throttle.
- Pamiętaj o dostępności (focus, aria), bezpieczeństwie (XSS), i responsywności (layout w CSS, nie w JS).
