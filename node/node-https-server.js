// Prosty serwer HTTPS w Node (wymaga certyfikatów). Użyj samopodpisanych do testów.
// Generowanie (dev): openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -subj "/CN=localhost"

const https = require("https"); // moduł HTTPS
const fs = require("fs"); // do wczytania certów
const path = require("path"); // do budowy ścieżek

// Ścieżki do plików klucza/certyfikatu
const keyPath = path.join(__dirname, "key.pem"); // klucz prywatny
const certPath = path.join(__dirname, "cert.pem"); // certyfikat

// Załaduj certyfikaty (sync dla prostoty demonstracji)
const options = {
  key: fs.readFileSync(keyPath), // wczytaj klucz
  cert: fs.readFileSync(certPath), // wczytaj cert
};

// Handler żądań HTTPS
function handler(req, res) {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" }); // nagłówki
    res.end(JSON.stringify({ ok: true, protocol: "https" })); // odpowiedź
    return;
  }
  res.writeHead(404); // brak zasobu
  res.end("Not Found"); // komunikat
}

const server = https.createServer(options, handler); // utwórz serwer HTTPS

function start(port = 3443) {
  server.listen(port, () => {
    console.log(`HTTPS server nasłuchuje na https://localhost:${port}`); // log
  });
}

if (require.main === module) {
  start(); // start na 3443 jeśli uruchamiany bezpośrednio
}

module.exports = { start, server };

// ---
// Dlaczego tak:
// - Pokazuje minimalną konfigurację HTTPS w Node z własnymi certyfikatami (dev/test).
// - readFileSync dla klucza/certu jest akceptowalne w prostym przykładzie startowym.
// - Ścieżka /health pozwala łatwo sprawdzić działanie TLS, a fallback 404 utrzymuje prostotę.
// - Export serwera/start ułatwia testy i ponowne użycie w innych modułach.
