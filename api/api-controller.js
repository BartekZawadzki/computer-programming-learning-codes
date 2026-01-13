// Kontrolery API – logika obsługi żądań (przykład in-memory).
// W realnej aplikacji podmień na zapytania do DB/serwisu.

// Prosta pamięciowa "baza" użytkowników
const users = [
  { id: 1, name: "Ala", email: "ala@example.com" },
  { id: 2, name: "Ola", email: "ola@example.com" },
];

// Handler healthcheck
function health(req, res) {
  res.json({ status: "ok", timestamp: Date.now() }); // zwróć JSON
}

// Lista użytkowników
function listUsers(req, res) {
  res.json(users);                                   // zwróć całą tablicę
}

// Pobierz użytkownika po id (po walidacji id w middleware)
function getUserById(req, res, next) {
  const id = Number(req.params.id);                  // konwersja do number
  const user = users.find((u) => u.id === id);       // wyszukaj po id
  if (!user) {                                       // brak użytkownika
    const err = new Error("User not found");         // utwórz błąd
    err.status = 404;                                // kod 404
    return next(err);                                // przekaż do error handlera
  }
  res.json(user);                                    // zwróć użytkownika
}

// Dodaj użytkownika (po walidacji body w middleware)
function createUser(req, res) {
  const { name, email } = req.body;                  // dane z body JSON
  const id = users.length ? users[users.length - 1].id + 1 : 1; // prosty generator id
  const user = { id, name, email };                  // obiekt użytkownika
  users.push(user);                                  // dodaj do "bazy"
  res.status(201).json(user);                        // 201 Created + użytkownik
}

module.exports = { health, listUsers, getUserById, createUser };

// ---
// Dlaczego tak:
// - In-memory "baza" upraszcza przykład; w realu podmień na DB/ORM.
// - Kontrolery zwracają JSON i posługują się next(err) dla obsługi błędów centralnie.
// - Oddzielone funkcje (health/list/get/create) ułatwiają testowanie i dalsze rozbudowy (PUT/DELETE).
