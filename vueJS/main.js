// Punkt wejścia Vue (Vite). Tworzy aplikację i montuje do #app.
import { createApp } from "vue";           // funkcja tworząca instancję
import App from "./App.vue";               // główny komponent
import "./style.css";                      // globalne style (opcjonalnie)

const app = createApp(App);                // utwórz aplikację
app.mount("#app");                         // zamontuj do elementu #app

// ---
// Dlaczego tak:
// - createApp/App to standardowy punkt startu Vue 3 (Vite).
// - Import globalnych styli w jednym miejscu upraszcza zarządzanie CSS.
// - mount na #app jest zgodny z domyślnym index.html Vite.
