// Zmienne środowiskowe Angular (dev). W produkcji zwykle jest environment.prod.ts.
export const environment = {
  production: false,                        // flaga dev/prod
  apiUrl: 'http://localhost:4000/api',      // baza URL API backendu
};

// ---
// Dlaczego tak:
// - environment.ts trzyma konfigurację dev; w prod używa się zwykle environment.prod.ts.
// - apiUrl w jednym miejscu ułatwia zmianę backendu bez edycji serwisów.
// - Flaga production może sterować zachowaniem logów, trybów debug w aplikacji.
