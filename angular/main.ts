// Bootstrap aplikacji Angular (standalone entry).
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // uruchamia moduł w przeglądarce
import { AppModule } from './app.module';                                   // główny moduł aplikacji

platformBrowserDynamic()
  .bootstrapModule(AppModule)                                               // start modułu
  .catch(err => console.error(err));                                        // log błędu bootstrapa

// ---
// Dlaczego tak:
// - platformBrowserDynamic + bootstrapModule to standardowy bootstrap Angular w przeglądarce.
// - Osobny plik main.ts utrzymuje start aplikacji w jednym miejscu, oddzielnie od logiki modułów/komponentów.
// - catch z logiem ułatwia diagnozę problemów startowych (brak modułu, błędne zależności).
