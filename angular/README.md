# Angular (nowoczesny) – szkic plików i komentarze

Struktura (przykładowa, uproszczona):
- `main.ts` – bootstrap modułu.
- `app.module.ts` – główny moduł (declarations/imports/providers/bootstrap).
- `app-routing.module.ts` – definicja routingu.
- `app.component.*` – root component (HTML/TS/CSS).
- `app.service.ts` – przykładowy serwis HTTP.
- `environments/environment.ts` – zmienne środowiskowe.
- `angularjs-app.html` / `angularjs-app.js` – przykłady AngularJS 1.x.

Uwaga: to szkic edukacyjny, nie pełny projekt CLI; dostosuj pod realny build (Angular CLI, Vite+ng).

---
Dlaczego tak:
- Struktura odwzorowuje standard Angulara (moduł, routing, komponent root, serwis, env).
- AngularJS przykład jest oddzielony, by pokazać różnicę między nowoczesnym Angular a 1.x.
- Szkic ma być lekki – bez CLI scaffold – ale wystarczający do zrozumienia przepływu (bootstrap → moduł → komponent → serwis HTTP).
