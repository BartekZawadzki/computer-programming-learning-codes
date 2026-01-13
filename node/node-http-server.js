// Minimalny serwer HTTP w Node (bez frameworków)
const http = require("http"); // wbudowany moduł HTTP

// Funkcja obsługi żądań (request handler)
function requestHandler(req, res) {
  const { method, url } = req; // metoda i adres
  if (method === "GET" && url === "/health") {
    res.statusCode = 200; // kod 200 OK
    res.setHeader("Content-Type", "application/json"); // nagłówek JSON
    res.end(JSON.stringify({ ok: true })); // odpowiedź
    return;
  }

  if (method === "POST" && url === "/echo") {
    let body = ""; // bufor na dane
    req.on("data", (chunk) => { body += chunk; }); // zbieraj dane
    req.on("end", () => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ received: body })); // odsyłamy to, co przyszło
    });
    return;
  }

  res.statusCode = 404; // nie znaleziono
  res.end("Not Found"); // komunikat
}

// Utworzenie serwera
const server = http.createServer(requestHandler); // server z handlerem

// Start na porcie 3000
function start(port = 3000) {
  server.listen(port, () => {
    console.log(`HTTP server nasłuchuje na http://localhost:${port}`); // log startu
  });
}

// Jeśli plik uruchamiany bezpośrednio, startujemy serwer
if (require.main === module) {
  start(3000); // port domyślny
}

module.exports = { start, server };

// ---
// Dlaczego tak:
// - Pokazuje najniższy poziom serwera HTTP w Node bez Express (createServer + handler).
// - Ręczne parsowanie body na POST ilustruje strumieniowy model req w Node.
// - Proste ścieżki /health i /echo pomagają zrozumieć routing przed użyciem frameworków.
// - Export serwera i start ułatwia testowanie oraz ponowne użycie w innych modułach.
