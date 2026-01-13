// Punkt wejścia React (np. dla Vite) z komentarzami.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";            // główny komponent aplikacji
import "./App.css";                // globalne style (przykład)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>               {/* StrictMode dla dodatkowych ostrzeżeń w dev */}
    <App />                        {/* renderuj główny komponent */}
  </React.StrictMode>
);

// ---
// Dlaczego tak:
// - createRoot z React 18 jest zalecany zamiast legacy render.
// - StrictMode w dev pomaga wykrywać potencjalne problemy (np. podwójne wywołania efektów).
// - Import App i CSS w jednym miejscu trzyma punkt wejścia prostym i czytelnym.
