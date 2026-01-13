// Podstawy Express: proste API z middleware, JSON, params, error handling.
const express = require("express"); // framework HTTP
const app = express(); // instancja aplikacji

// Middleware globalny: parsowanie JSON
app.use(express.json()); // req.body dostępne dla JSON

// Prosty logger middleware
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`); // log metody i ścieżki
  next(); // przejdź dalej
});

// Endpoint zdrowia
app.get("/health", (_req, res) => {
  res.json({ ok: true }); // zwraca JSON
});

// Parametry w ścieżce: /users/:id
app.get("/users/:id", (req, res) => {
  const { id } = req.params; // pobierz id
  res.json({ id, name: `User ${id}` }); // zwróć dane przykładowe
});

// POST z walidacją prostą
app.post("/echo", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "body required" }); // błąd gdy brak body
  }
  res.json({ received: req.body }); // odsyłamy to, co przyszło
});

// Obsługa 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" }); // brak zasobu
});

// Obsługa błędów (error-handling middleware musi mieć 4 argumenty)
app.use((err, _req, res, _next) => {
  console.error("Error middleware:", err); // log błędu
  res.status(500).json({ error: "Internal Server Error" }); // ogólny błąd
});

function start(port = 3001) {
  app.listen(port, () => {
    console.log(`Express API nasłuchuje na http://localhost:${port}`); // log startu
  });
}

if (require.main === module) {
  start(); // start jeśli uruchomiono bezpośrednio
}

module.exports = { app, start };

// ---
// Dlaczego tak:
// - express.json() udostępnia req.body dla JSON, co jest najczęstszą potrzebą w API.
// - Prosty logger pokazuje kolejność middleware i minimalne logowanie requestów.
// - Przykłady GET z parametrem i POST z walidacją ilustrują typowe wzorce tras.
// - Oddzielne middleware 404 i error-handling zapewniają spójne odpowiedzi błędów.
// - start w require.main pozwala użyć pliku zarówno jako modułu (np. w testach), jak i aplikacji.
