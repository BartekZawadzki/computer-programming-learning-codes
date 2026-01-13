// Express: przykłady dodatkowe — CORS, upload plików (multer), logger (morgan),
// JWT auth (schemat), prosty healthcheck.
// Uwaga: wymagane zależności (npm i express cors multer morgan jsonwebtoken)
const express = require("express"); // framework HTTP
const cors = require("cors"); // middleware CORS
const multer = require("multer"); // upload plików multipart/form-data
const morgan = require("morgan"); // logger HTTP
const jwt = require("jsonwebtoken"); // JWT (tu tylko schemat)

const app = express(); // instancja aplikacji
const upload = multer({ dest: "uploads/" }); // zapis plików do katalogu uploads/
const JWT_SECRET = "sekret-dev"; // w produkcji trzymamy w env

// CORS: pozwól na żądania z innych originów (domyślnie *, można ograniczyć origin)
app.use(cors()); // globalne CORS

// Logger: wypisywanie linii logów HTTP
app.use(morgan("dev")); // format 'dev'

// Parser JSON
app.use(express.json()); // req.body JSON

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// Upload pliku: odbiera pole "file" (input type="file" name="file")
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file required" }); // brak pliku
  res.json({
    filename: req.file.filename, // nazwa na dysku
    originalName: req.file.originalname, // oryginalna nazwa
    size: req.file.size, // rozmiar
  });
});

// JWT middleware: weryfikacja Authorization: Bearer <token>
function jwtAuth(req, res, next) {
  const auth = req.headers.authorization || ""; // nagłówek
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null; // wytnij token
  if (!token) return res.status(401).json({ error: "No token" }); // brak
  try {
    const payload = jwt.verify(token, JWT_SECRET); // weryfikacja
    req.user = payload; // przypnij payload do req
    next(); // przejdź dalej
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" }); // token nieważny
  }
}

// Login — generuje token (demo, brak hashowania/DB)
app.post("/login", (req, res) => {
  const { username } = req.body; // dane logowania
  if (!username) return res.status(400).json({ error: "username required" }); // walidacja
  const token = jwt.sign({ sub: username, role: "user" }, JWT_SECRET, { expiresIn: "1h" }); // token na godzinę
  res.json({ token }); // zwróć token
});

// Chroniona trasa: wymaga poprawnego JWT
app.get("/secure", jwtAuth, (req, res) => {
  res.json({ ok: true, user: req.user }); // dostęp przy poprawnym tokenie
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Error middleware
app.use((err, _req, res, _next) => {
  console.error("Error middleware:", err); // log błędu
  res.status(500).json({ error: "Internal Server Error" }); // ogólny błąd
});

function start(port = 3003) {
  app.listen(port, () => {
    console.log(`Express extras na http://localhost:${port}`); // log startu
  });
}

if (require.main === module) {
  start(); // start jeśli uruchomiono bezpośrednio
}

module.exports = { app, start, jwtAuth };

// ---
// Dlaczego tak:
// - Pokazuje częste dodatki do Express: CORS, logger morgan, upload multer, JWT middleware.
// - JWT schemat z Authorization Bearer uczy podstaw weryfikacji tokenu i przypięcia payload do req.
// - Upload single("file") ilustruje odbiór multipart/form-data z walidacją braku pliku.
// - Oddzielny login generujący token i trasa /secure demonstrują prosty przepływ auth.
// - Fallback 404 + error middleware zapewniają spójne odpowiedzi błędów w całej aplikacji.
