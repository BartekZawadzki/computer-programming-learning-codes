// Router API – definiuje ścieżki i wiąże je z kontrolerami oraz walidacją.
const express = require("express");
const router = express.Router();                 // router podrzędny

const controller = require("../api/api-controller");  // logika biznesowa
const { validateUserBody, validateIdParam } = require("./api-validation"); // walidatory

// GET /api/health – proste sprawdzenie stanu
router.get("/health", controller.health);        // zwraca status 200 + JSON

// GET /api/users – lista użytkowników (przykładowa pamięciowa baza)
router.get("/users", controller.listUsers);      // zwraca tablicę users

// GET /api/users/:id – pobierz użytkownika po id (liczbowe)
router.get("/users/:id", validateIdParam, controller.getUserById); // walidacja param id

// POST /api/users – dodaj użytkownika z walidacją body
router.post("/users", validateUserBody, controller.createUser);    // walidacja body JSON

module.exports = router;                         // eksport routera do użycia w serwerze

// ---
// Dlaczego tak:
// - Router grupuje trasy pod /api, co upraszcza mount w serwerze i testowanie.
// - Walidatory są wpięte per trasa, dzięki czemu kontrolery zakładają poprawne dane.
// - Oddzielenie logiki (controller) od definicji ścieżek poprawia czytelność i możliwość refaktoryzacji.
