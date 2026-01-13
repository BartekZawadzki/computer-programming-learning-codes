# React – szkic plików z komentarzami (Vite/CRA style)

Struktura (uproszczona):
- `main.jsx` – punkt wejścia, render `App` do DOM, `StrictMode`.
- `App.jsx` – główny komponent, przykładowy fetch + stan.
- `App.css` – style bazowe.
- `useFetch.js` – prosty hook do pobierania danych.
- `apiClient.js` – klient fetch z bazowym URL i obsługą błędów.

Uwaga: to szkic edukacyjny, nie pełny projekt CLI. Dopasuj do wybranego bundlera (Vite/CRA/Next). W Vite domyślnie root to `main.jsx` i `App.jsx`, w CRA – `src/index.js` / `src/App.js`.***

---
Komentarz podsumowujący: Ten szkic opisuje minimalny zestaw plików potrzebnych do uruchomienia prostej aplikacji React w stylu Vite/CRA. Rozdzielenie na punkt wejścia, główny komponent, hook do fetchu oraz klient API ułatwia czytelność i wymianę poszczególnych warstw (UI, logika pobierania, konfiguracja bundlera). Dzięki temu łatwo podmienić bundler lub rozszerzyć projekt o routing, testy czy kontekst globalny bez przebudowy całej struktury.
