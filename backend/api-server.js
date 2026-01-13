// Podstawowy serwer API w Node/Express z komentarzami (JS).
// Zawiera: middleware JSON, CORS, logger, trasy z walidacją, obsługę błędów.

const express = require("express");           // framework HTTP
const morgan = require("morgan");             // logger żądań
const cors = require("cors");                 // CORS dla przeglądarek
const apiRoutes = require("../api/api-routes");    // trasy aplikacji
const { notFound, errorHandler } = require("../api/api-error"); // middleware błędów

const app = express();                        // instancja aplikacji
const PORT = process.env.PORT || 4000;        // port nasłuchu

// Middleware globalne
app.use(cors());                              // zezwalaj na CORS (domyślnie *)
app.use(express.json());                      // parse JSON body
app.use(morgan("dev"));                       // logi w konsoli (dev format)

// Główne trasy API (prefiks /api)
app.use("/api", apiRoutes);                   // delegacja do routera

// Obsługa 404 (brak trasy)
app.use(notFound);                            // middleware 404
// Obsługa błędów (ostatnie middleware)
app.use(errorHandler);                        // middleware błędów

// Start serwera
app.listen(PORT, () => {
  console.log(`API działa na http://localhost:${PORT}`); // log startu
});

// ---
// Dlaczego tak:
// - Express + middlewares (CORS, JSON, morgan) to lekki szkielet dla REST API.
// - Oddzielenie routera i handlerów błędów utrzymuje single responsibility (server vs routes vs errors).
// - Konfiguracja portu z env/4000 ułatwia uruchamianie w różnych środowiskach i kontenerach.
