// Middleware obsługi błędów i 404 w Express.

// 404 handler – gdy żadna trasa nie pasuje
function notFound(req, res, next) {
  res.status(404).json({ error: "Not found" });   // odpowiedź 404 JSON
}

// Błąd globalny – łapie next(err) z kontrolerów
function errorHandler(err, req, res, next) {
  const status = err.status || 500;               // kod błędu (domyślnie 500)
  const message = err.message || "Internal Server Error"; // opis błędu
  console.error(err);                              // log na serwerze (minimalny)
  res.status(status).json({ error: message });     // odpowiedź JSON z błędem
}

module.exports = { notFound, errorHandler };

// ---
// Dlaczego tak:
// - Centralny handler błędów upraszcza kontrolery (mogą tylko rzucać next(err)).
// - 404 osobno utrzymuje spójny format odpowiedzi dla brakujących tras.
// - Logowanie na serwerze minimalne, ale pozwala diagnozować problemy bez zalewania konsoli szczegółami w kodzie.
