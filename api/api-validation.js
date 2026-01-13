// Middleware walidujące wejście (parametry i body) – lekka walidacja bez zewnętrznych bibliotek.

// Walidacja parametru :id (musi być liczbą dodatnią)
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);               // konwersja do number
  if (!Number.isInteger(id) || id <= 0) {         // sprawdź czy dodatnia liczba całkowita
    return res.status(400).json({ error: "Param id musi być dodatnią liczbą całkowitą" });
  }
  next();                                         // kontynuuj
}

// Walidacja body użytkownika (name/email wymagane, prosta walidacja)
function validateUserBody(req, res, next) {
  const { name, email } = req.body || {};         // pobierz pola z body
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Pole name jest wymagane (min 2 znaki)" });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Pole email jest wymagane i musi zawierać @" });
  }
  next();                                         // walidacja OK, idź dalej
}

module.exports = { validateIdParam, validateUserBody };

// ---
// Dlaczego tak:
// - Walidacja oddzielona od kontrolera pozwala utrzymać jednolitą obsługę błędów 400.
// - Proste reguły (id > 0, email zawiera @) są wystarczające do przykładu; łatwo podmienić na joi/zod.
// - Zwracanie JSON z error ułatwia konsumpcję przez frontend i testy API.
