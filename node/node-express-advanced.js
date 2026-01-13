// Express – przykład z routerem, middleware autoryzacji, prostą walidacją i async handlerem
const express = require("express"); // framework HTTP
const app = express(); // główna aplikacja

app.use(express.json()); // parsowanie JSON w body

// Prosty middleware autoryzacji: sprawdza nagłówek Authorization: Bearer <token>
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization; // pobierz nagłówek
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Brak tokenu" }); // brak lub zły format
  }
  const token = auth.replace("Bearer ", ""); // wyciągnij token
  if (token !== "sekretny-token") {
    return res.status(403).json({ error: "Zły token" }); // weryfikacja nieudana
  }
  next(); // przekazanie do kolejnego middleware/handlera
}

// Router użytkowników
const userRouter = express.Router(); // nowy router

// Walidacja body (prosta ręczna) dla POST /users
userRouter.post("/", (req, res) => {
  const { name, email } = req.body; // dane wejściowe
  if (!name) return res.status(400).json({ error: "name required" }); // walidacja
  if (email && !email.includes("@")) return res.status(400).json({ error: "email invalid" }); // prosta walidacja email
  res.status(201).json({ id: Date.now(), name, email }); // zwróć utworzony obiekt
});

// Async handler z try/catch (bez dodatkowych bibliotek)
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // param ścieżki
    // symulacja asynchronicznego pobrania
    const user = await Promise.resolve({ id, name: `User ${id}` }); // przykładowe dane
    res.json(user); // odpowiedź JSON
  } catch (err) {
    console.error("Błąd w GET /users/:id", err); // log błędu
    res.status(500).json({ error: "Internal error" }); // odpowiedź błędu
  }
});

// Podłączenie routera z middleware autoryzacji
app.use("/users", authMiddleware, userRouter); // /users chronione tokenem

// Health check bez autoryzacji
app.get("/healthz", (_req, res) => {
  res.json({ ok: true }); // status OK
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not Found" })); // brak zasobu

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Error middleware:", err); // log błędu
  res.status(500).json({ error: "Internal Server Error" }); // ogólny błąd
});

function start(port = 3002) {
  app.listen(port, () => {
    console.log(`Express advanced API na http://localhost:${port}`); // log startu
  });
}

if (require.main === module) {
  start(); // start jeśli uruchomiono bezpośrednio
}

module.exports = { app, start, authMiddleware };

// ---
// Dlaczego tak:
// - Oddzielony router + authMiddleware pokazują komponowanie middleware per ścieżka.
// - Ręczna walidacja body i proste sprawdzenie nagłówka Authorization ilustrują podstawy zabezpieczeń bez bibliotek.
// - Async handler z try/catch demonstruje obsługę błędów w kodzie asynchronicznym bez wrapperów.
// - Osobne healthz bez auth i fallback 404/error handler trzymają spójny kontrakt API.
