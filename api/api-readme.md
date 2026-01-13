# API (Node/Express) – opis plików i działania

Pliki:
- `api-server.js` – uruchamia Express, middleware (JSON, CORS, morgan), podłącza router `/api`, obsługa 404 i błędów.
- `api-routes.js` – definicje ścieżek: `/health`, `/users` (GET/POST), `/users/:id` (GET); wiąże kontrolery i walidację.
- `api-controller.js` – logika: pamięciowa „baza” users, healthcheck, list, getById, create.
- `api-validation.js` – proste middleware walidujące `:id` oraz body `name/email`.
- `api-error.js` – middleware 404 i globalny handler błędów.

Uruchomienie (dev):
1. `npm install express morgan cors`
2. `node api-server.js` (domyślnie port 4000)

Przykładowe żądania:
- `GET http://localhost:4000/api/health` → status API.
- `GET http://localhost:4000/api/users` → lista użytkowników (in-memory).
- `GET http://localhost:4000/api/users/1` → użytkownik o id=1 lub 404.
- `POST http://localhost:4000/api/users` body JSON `{ "name": "Nowy", "email": "nowy@example.com" }` → tworzy usera (201).

Uwaga:
- To przykład in-memory; w realnym projekcie zastąp tablicę `users` warstwą DB/ORM i dodaj auth, rate limiting, logowanie strukturalne.

---
Dlaczego tak:
- Rozdzielenie serwera, routera, kontrolerów, walidacji i handlerów błędów utrzymuje SRP i ułatwia testowanie.
- In-memory dane pokazują kształt API bez zależności od DB, co czyni przykład lekki.
- Opis uruchomienia i przykładowe żądania pozwalają szybko sprawdzić API i rozszerzyć je o kolejne endpointy.
