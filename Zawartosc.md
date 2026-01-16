# Zawartość repozytorium

Poniżej lista elementów w katalogu głównym `ProgramowanieWiedza` z krótkimi opisami i odnośnikami do podkatalogów/pliki. Linki są względne, więc działają w edytorze/IDE.

## Pliki w katalogu głównym
- [allCHEATSHEETs.md](allCHEATSHEETs.md) — zbiorczy cheat sheet.
- [spistresci.md](spistresci.md) — spis treści.
- [wiedza.md](wiedza.md) — notatki ogólne.
- [.gitignore](.gitignore), [.gitattributes](.gitattributes), [.dockerignore](.dockerignore) — konfiguracje repo/Docker.
- [docker-compose.yml](docker-compose.yml) — stack frontend/backend/db.
- [.gitignore](.gitignore) / [.gitattributes](.gitattributes) / [.dockerignore](.dockerignore) — pliki konfiguracyjne VCS i Dockera.
- [gitconfig.sample](gitconfig.sample) — przykładowe ustawienia Git.

## Katalogi i kluczowe pliki
- [angular/](angular/) — przykładowa aplikacja Angular; główne pliki: `main.ts`, `app.module.ts`, komponent `app.component.*`, routing `app-routing.module.ts`, serwis `app.service.ts`.
- [api/](api/) — szkic API (Node/Express): `api-server.js`, `api-routes.js`, `api-validation.js`, `api-error.js`, README.
- [programowanieAPI/](programowanieAPI/) — kompletny przewodnik po tworzeniu i wykorzystywaniu API: `programowanieAPI.md` (teoria, przykłady, najlepsze praktyki), `programowanieAPI.js` (praktyczne przykłady z pełnymi komentarzami krok po kroku).
- [backend/](backend/) — konfiguracje serwerów (Apache/Nginx), Next.js config oraz przykładowe endpointy API.
- [csharp/](csharp/) — 5 przykładów w C# (tematy: podstawy/OOP/patterns/tests itp.).
- [css/](css/) — zestaw arkuszy CSS (layout, animacje, tokeny, utility, dark mode itp.).
- [html/](html/) — przykładowe strony HTML (semantyka, formularze, layout flex/grid, meta/SEO, dostępność).
- [java/](java/) — 15 plików edukacyjnych (podstawy, kolekcje, streamy, OOP, wzorce, Spring Boot, I/O, HTTP/JSON, JDBC, JPA, testy JUnit/Mockito/Testcontainers, concurrency, system low-level).
- [javascript/](javascript/) — 35 plików JS (paradygmaty, struktury danych, algorytmy, HTTP, funkcjonalne, regex/date, workers/tests, generatory, Node fs/path, patterns, itd.) + `zadaniaJS/` z zadaniami i przykładami.
  - [javascript/zadaniaJS/](javascript/zadaniaJS/) — zadania (tasks-*.js) oraz rozwiązania (example-solution-*.js) dla podstaw, tablic/obiektów, async, algorytmów, regex/date.
- [jenkins/](jenkins/) — README dot. pipeline.
- [nextJS/](nextJS/) — mini przykłady Next.js (layout, strona, klient licznika, API route).
- [node/](node/) — przykłady Node.js (fs/path, http, cluster, events, streams, worker threads, itp.).
- [patterns/](patterns/) — implementacje wzorców projektowych w JS (Singleton, Factory Method, Strategy, Observer, Decorator, Command, Adapter, Builder, Chain of Responsibility, DI, Facade, Interpreter, Mediator, Memento, Prototype, State itd.).
- [php/](php/) — 17 plików PHP (podstawy, OOP, wzorce, HTTP, PDO, bezpieczeństwo, testy itp.).
- [python/](python/) — 9 plików Python (podstawy, OOP, asyncio, typing, algorytmy, http/requests, concurrency, tests).
- [react/](react/) — mała aplikacja React (Vite): `App.jsx`, `main.jsx`, hooki `useFetch`, `useToggle`, komponenty `InfoBox`, `UserCard`, `apiClient.js`, styl `App.css`, `vite.config.js`, README.
- [reactNative/](reactNative/) — szkic RN: `App.tsx`, `apiClient.ts`, `useFetch.ts`, konfiguracje `metro.config.js`, `android/` z gradle.
- [scss/](scss/) — pliki SCSS (tokens, mixiny, utilities, layout, tables, forms, dark-mode, animacje, bootstrap-custom).
- [sql/](sql/) — pliki SQL/README (podstawy, joins, indexes, transactions, views/procs, migrations; notatki admin Postgres).
- [typescript/](typescript/) — pliki TS (basics, functions, generics, interfaces/classes, utility types, async, data structures, algorithms, advanced types).
- [vueJS/](vueJS/) — mini app Vue: `App.vue`, `main.js`, `apiClient.js`, `useFetch.js`, komponent `UserCard.vue`, style, Vite config, README.
- [frontend/](frontend/) — przykładowe strony (Bootstrap, Tailwind) i powiązane skrypty/CSS.
- [angular/](angular/) — pełen szkic aplikacji Angular (komponent, routing, serwis, środowiska).
- [nextJS/](nextJS/) — przykładowa aplikacja Next.js (layout, strona, prosty API route).
- [allCHEATSHEETs.md](allCHEATSHEETs.md) — zbiór skrótów (powtórzenie dla łatwego dostępu).
- [spistresci.md](spistresci.md) — spis treści repo.
- [wiedza.md](wiedza.md) — notatki zbiorcze.

## Odnośniki do zadań i rozwiązań (JS)
- Zadania: [`javascript/zadaniaJS/tasks-basics.js`](javascript/zadaniaJS/tasks-basics.js), [`tasks-arrays-objects.js`](javascript/zadaniaJS/tasks-arrays-objects.js), [`tasks-async.js`](javascript/zadaniaJS/tasks-async.js), [`tasks-algorithms.js`](javascript/zadaniaJS/tasks-algorithms.js), [`tasks-regex-date.js`](javascript/zadaniaJS/tasks-regex-date.js).
- Rozwiązania: [`example-solution-tasks-basics.js`](javascript/zadaniaJS/example-solution-tasks-basics.js), [`example-solution-tasks-arrays-objects.js`](javascript/zadaniaJS/example-solution-tasks-arrays-objects.js), [`example-solution-tasks-async.js`](javascript/zadaniaJS/example-solution-tasks-async.js), [`example-solution-tasks-algorithms.js`](javascript/zadaniaJS/example-solution-tasks-algorithms.js), [`example-solution-tasks-regex-date.js`](javascript/zadaniaJS/example-solution-tasks-regex-date.js).

## Noty administracyjne
- Serwery www: zob. [backend/apache-httpd.conf](backend/apache-httpd.conf), [backend/apache-vhost.conf](backend/apache-vhost.conf), [backend/nginx.conf](backend/nginx.conf), [backend/nginx-site.conf](backend/nginx-site.conf), [backend/.htaccess](backend/.htaccess).
- CI: [jenkins/README.md](jenkins/README.md).
- Docker: [Dockerfile](Dockerfile) (w wieloetapowym buildzie) oraz [docker-compose.yml](docker-compose.yml).

## Jak nawigować
- Frontend: start od [frontend/](frontend/) (Bootstrap/Tailwind przykłady) lub [react/](react/) / [vueJS/](vueJS/) / [angular/](angular/) / [nextJS/](nextJS/).
- Backend/API: kompletny przewodnik w [programowanieAPI/](programowanieAPI/), szkic w [api/](api/) oraz konfiguracje w [backend/](backend/).
- Zadania/edukacja: skup się na `javascript/zadaniaJS/` oraz katalogach językowych (`csharp/`, `php/`, `python/`, `java/`, `typescript/`, `sql/`).

