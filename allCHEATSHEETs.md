## CHEATSHEET – legenda
- **Definicja**: krótki opis pojęcia.
- **Po co**: problem, który rozwiązuje.
- **Kiedy używać**: typowe scenariusze.
- **Przykład**: minimalny fragment kodu lub komendy.
- **Opracowanie**: kluczowe uwagi, tipy, pułapki.
- **Słowa kluczowe**: hasła pomocne przy wyszukiwaniu/łączeniu zagadnień.

---

## CHEATSHEET: Frontend & UI

### React
- **Definicja**: Biblioteka JS do budowy interfejsów z komponentów.
- **Po co**: Deklaratywne UI, stan lokalny, ekosystem hooków.
- **Kiedy używać**: SPA/MPA z dynamicznym stanem, duże ekosystemy.
- **Przykład**:
```jsx
function Hello({ name }) {
  return <h1>Hello {name}</h1>;
}
```
- **Opracowanie**: myśl komponentami, hooki zamiast klas, klucz `key` w listach, unikać lifting state jeśli można użyć context/Redux/query lib.
- **Słowa kluczowe**: component, props, state, hooks, JSX, reconciliation.

### React Native
- **Definicja**: Framework do natywnych aplikacji mobilnych z React.
- **Po co**: Jeden kod JS → iOS/Android.
- **Kiedy używać**: Mobilne UI z dostępem do natywnych API bez pełnego Swift/Kotlin.
- **Przykład**:
```jsx
import { Text } from "react-native";
export default () => <Text>Hello</Text>;
```
- **Opracowanie**: używaj `StyleSheet`, pamiętaj o różnicach platform, nawigacja (React Navigation), bridging dla natywnych modułów.
- **Słowa kluczowe**: bridge, metro, flexbox mobile, native modules.

### Angular
- **Definicja**: Framework SPA z TypeScript i DI w rdzeniu.
- **Po co**: Kompletny zestaw (routing, HTTP, formularze) z silnym CLI.
- **Kiedy używać**: Duże zespoły, enterprise, jasna struktura modułów.
- **Przykład**:
```ts
@Component({ selector: "hello", template: "<h1>Hello</h1>" })
export class HelloComponent {}
```
- **Opracowanie**: DI + RxJS w usługach, moduły/standalone components, change detection (OnPush), formularze reaktywne.
- **Słowa kluczowe**: components, services, DI, RxJS, modules, CLI.

### Vue
- **Definicja**: Progresywny framework do tworzenia UI z reaktywnym rdzeniem.
- **Po co**: Łatwy start, składnia template, kompozycje funkcji (Composition API).
- **Kiedy używać**: Szybkie prototypy, projekty z template-first podejściem.
- **Przykład**:
```vue
<script setup>
const msg = "Hello";
</script>
<template><h1>{{ msg }}</h1></template>
```
- **Opracowanie**: Composition API, reactivity caveats, Single File Components, Vite jako bundler.
- **Słowa kluczowe**: SFC, reactivity, Composition API, directives.

### Next.js
- **Definicja**: Framework React z SSR/SSG/ISR i routingiem plikowym.
- **Po co**: SEO + performance + edge rendering.
- **Kiedy używać**: Strony marketingowe, hybrydowe aplikacje, API routes.
- **Przykład**:
```tsx
export default function Page() {
  return <main>Hello</main>;
}
```
- **Opracowanie**: app router (server/client components), data fetching na serwerze, route handlers, optymalizacja obrazów i fontów.
- **Słowa kluczowe**: SSR, SSG, ISR, server components, app router.

### Redux
- **Definicja**: Kontener stanu globalnego opartego na reducerach.
- **Po co**: Przewidywalne zmiany stanu, time travel debug.
- **Kiedy używać**: Gdy stan jest współdzielony szeroko i często modyfikowany.
- **Przykład**:
```ts
const slice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: { inc: (s) => { s.value += 1; } }
});
```
- **Opracowanie**: preferuj Redux Toolkit, trzymaj stan serializowalny, używaj RTK Query dla danych z API.
- **Słowa kluczowe**: store, reducer, action, middleware, RTK.

### JavaScript / TypeScript
- **Definicja**: JS — język uruchamiany w przeglądarce i Node. TS — superset z typami.
- **Po co**: JS — uniwersalne skrypty; TS — bezpieczeństwo typów i lepsze narzędzia.
- **Kiedy używać**: TS w średnich/dużych projektach; JS w prostych skryptach lub gdy brak kompilacji.
- **Przykład (TS)**:
```ts
type User = { id: string; name: string };
```
- **Opracowanie**: unikaj any, używaj strict mode, typuj funkcje, korzystaj z ESLint/TSConfig strict.
- **Słowa kluczowe**: closures, promises, async/await, generics, union.

### HTML / CSS / SCSS
- **Definicja**: HTML struktura, CSS styl, SCSS preprocesor z zmiennymi/mixins.
- **Po co**: Budowa i stylowanie dokumentów web.
- **Kiedy używać**: Zawsze w UI; SCSS gdy potrzebujesz zmiennych i nesting.
- **Przykład (SCSS)**:
```scss
$primary: #0d6efd;
button { color: $primary; &:hover { opacity: 0.9; } }
```
- **Opracowanie**: semantyczne tagi, BEM lub utility-first, mobile-first, unikać nadmiernego zagnieżdżania w SCSS.
- **Słowa kluczowe**: semantics, flex, grid, variables, mixins, BEM.

### Tailwind CSS / Bootstrap / Material UI
- **Definicja**: Tailwind — utility-first CSS; Bootstrap — komponenty + grid; MUI — komponenty React z design systemem.
- **Po co**: Szybsze stylowanie i spójność.
- **Kiedy używać**: Tailwind przy szybkim prototypowaniu i kontroli nad stylem; Bootstrap/MUI gdy chcesz gotowe komponenty.
- **Przykład (Tailwind)**:
```html
<button class="px-4 py-2 bg-blue-600 text-white rounded">OK</button>
```
- **Opracowanie**: konwencje klas, theming, tree-shaking nieużywanych klas (Tailwind jit), dostosowanie design tokens w MUI.
- **Słowa kluczowe**: utilities, grid, components, theming, design tokens.

### UI ogólne
- **Definicja**: Zbiór praktyk tworzenia interfejsów.
- **Po co**: Spójność, dostępność, skalowalność.
- **Kiedy używać**: Zawsze w projektach frontendowych.
- **Przykład**: Atomic Design (atomy → molekuły → organizmy).
- **Opracowanie**: WCAG, focus states, kontrast, responsywność, design system.
- **Słowa kluczowe**: accessibility, ARIA, responsive, design system, Atomic Design.

---

## CHEATSHEET: Backend & DevOps

### Node.js
- **Definicja**: Runtime JS na V8 poza przeglądarką.
- **Po co**: Serwery, CLI, narzędzia, integracje.
- **Kiedy używać**: I/O-bound serwisy, szybkie API, realtime.
- **Przykład**:
```js
import http from "http";
http.createServer((req, res) => res.end("ok")).listen(3000);
```
- **Opracowanie**: event loop, async/await, unikaj blokujących operacji, zarządzaj zależnościami (nvm), obserwuj pamięć.
- **Słowa kluczowe**: event loop, non-blocking, modules, npm, pnpm.

### Express
- **Definicja**: Minimalistyczny framework HTTP dla Node.
- **Po co**: Routing, middleware, szybkie REST API.
- **Kiedy używać**: Lekkie API, gdy nie potrzebujesz opinionated frameworka.
- **Przykład**:
```js
import express from "express";
const app = express();
app.get("/health", (_, res) => res.json({ ok: true }));
```
- **Opracowanie**: middleware kolejność ma znaczenie, walidacja (celebrate/zod), error handler, security headers (helmet), rate limiting.
- **Słowa kluczowe**: middleware, router, body-parser, helmet, cors.

### Nest / MVC
- **Definicja**: (opcjonalnie) strukturalny framework oparty na DI i dekoratorach.
- **Po co**: Modularność, testowalność, wbudowane wzorce (controllers/services).
- **Kiedy używać**: Większe systemy potrzebujące struktury.
- **Przykład**:
```ts
@Controller("health")
export class HealthController { @Get() ok() { return { ok: true }; } }
```
- **Opracowanie**: moduły, providery, pipes/filters/guards, DTO + walidacja (class-validator).
- **Słowa kluczowe**: DI, controllers, providers, pipes, guards.

### Nginx / Apache
- **Definicja**: Serwery HTTP/reverse proxy.
- **Po co**: Terminacja SSL, load balancing, cache statyczny.
- **Kiedy używać**: Front dla aplikacji, serwowanie plików, proxy do backendów.
- **Przykład (Nginx)**:
```
location /api { proxy_pass http://localhost:3000; }
```
- **Opracowanie**: gzip/brotli, HTTP/2, rate limit, cache headers, logs/metrics.
- **Słowa kluczowe**: reverse proxy, upstream, TLS, caching, rewrite.

### Docker
- **Definicja**: Konteneryzacja aplikacji.
- **Po co**: Powtarzalne środowiska, łatwe wdrożenia.
- **Kiedy używać**: Od startu projektu do dev/prod.
- **Przykład**:
```
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm","start"]
```
- **Opracowanie**: multi-stage build, nie kopiuj `.env`, używaj `.dockerignore`, taguj wersje obrazów.
- **Słowa kluczowe**: image, container, volume, network, multi-stage.

### Jenkins
- **Definicja**: Serwer CI/CD open-source.
- **Po co**: Automatyzacja build/test/deploy.
- **Kiedy używać**: Gdy potrzebny samohostowany, elastyczny pipeline.
- **Przykład**:
```
pipeline { stages { stage("Test"){ steps { sh "npm test" } } } }
```
- **Opracowanie**: deklaratywne pipeline, agenty, credentials, artefakty, blue-green/canary w deploy stage.
- **Słowa kluczowe**: pipeline, stages, agents, credentials, artifacts.

### Git
- **Definicja**: System kontroli wersji.
- **Po co**: Historia zmian, współpraca, branchowanie.
- **Kiedy używać**: Zawsze w projektach programistycznych.
- **Przykład**: `git clone <url>`
- **Opracowanie**: feature branches, pull requests, rebase/squash zgodnie z polityką, tagi semver.
- **Słowa kluczowe**: commit, branch, merge, rebase, tag, cherry-pick.

### Terminal
- **Definicja**: Interfejs linii komend.
- **Po co**: Automatyzacja, skróty, praca z narzędziami.
- **Kiedy używać**: Zawsze gdy potrzebna szybkość/powtarzalność.
- **Przykład**: `ls`, `cd`, `grep`, `curl`.
- **Opracowanie**: aliasy, skrypty, piping, exit codes, shellcheck dla skryptów.
- **Słowa kluczowe**: shell, pipes, scripts, permissions, env.

### Docker Compose (stack)
- **Definicja**: Orkiestracja wielu kontenerów lokalnie.
- **Po co**: Spójne środowisko (frontend, backend, db, cache).
- **Kiedy używać**: Dev/stage, lokalne integracje.
- **Przykład**:
```yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
  db:
    image: postgres:16
```
- **Opracowanie**: sieci domyślne, zależności `depends_on`, wolumeny na dane, profile usług.
- **Słowa kluczowe**: services, volumes, networks, profiles, env_file.

### CI/CD
- **Definicja**: Automatyczny build/test/deploy.
- **Po co**: Szybsze i bezpieczniejsze wydania.
- **Kiedy używać**: Od początku projektu.
- **Przykład**: pipeline test → build → deploy (blue-green/canary).
- **Opracowanie**: artefakty, wersjonowanie, rollbacks, secrets management, quality gates.
- **Słowa kluczowe**: pipeline, artifacts, blue-green, canary, rollback.

---

## CHEATSHEET: Bazy danych

### SQL / PostgreSQL
- **Definicja**: Relacyjne bazy z językiem zapytań SQL.
- **Po co**: Spójność, relacje, ACID, złożone zapytania.
- **Kiedy używać**: Dane ustrukturyzowane, relacje, raporty.
- **Przykład**:
```sql
SELECT id, name FROM users WHERE active = true;
```
- **Opracowanie**: indeksy na kluczach filtrów/joinów, transakcje, migracje z rollbackiem, EXPLAIN do planów.
- **Słowa kluczowe**: ACID, index, join, transaction, migration.

### MongoDB
- **Definicja**: Dokumentowa NoSQL (JSON/BSON).
- **Po co**: Elastyczne schematy, szybkie prototypy.
- **Kiedy używać**: Dane pół-strukturalne, wysokie throughputy zapisów.
- **Przykład**:
```js
db.users.find({ active: true });
```
- **Opracowanie**: indeksy na polach zapytań, walidacja schematu (JSON Schema), agregacje, limit/skip ostrożnie.
- **Słowa kluczowe**: collection, document, index, aggregation, shard.

### Firebase
- **Definicja**: BaaS z auth, realtime db, storage, hosting.
- **Po co**: Szybki start bez własnego backendu.
- **Kiedy używać**: MVP, prototypy, realtime funkcje, push notifications.
- **Przykład**:
```js
import { getFirestore, collection, getDocs } from "firebase/firestore";
```
- **Opracowanie**: reguły bezpieczeństwa, koszty odczytów/zapisów, struktura dokumentów pod zapytania, Cloud Functions do logiki.
- **Słowa kluczowe**: Firestore, Auth, Functions, Storage, Rules.

---

## CHEATSHEET: Architektura, wzorce, paradygmaty

### Programowanie funkcyjne
- **Definicja**: Paradygmat oparty na funkcjach czystych i immutability.
- **Po co**: Przewidywalność, łatwiejsze testowanie.
- **Kiedy używać**: Transformacje danych, logika domenowa bez efektów ubocznych.
- **Przykład**:
```js
const add = (a, b) => a + b;
```
- **Opracowanie**: unikaj mutacji, map/filter/reduce, kompozycja funkcji, monady w zaawansowanych przypadkach.
- **Słowa kluczowe**: pure function, immutability, composition, higher-order.

### Programowanie obiektowe
- **Definicja**: Paradygmat wokół obiektów z danymi i metodami.
- **Po co**: Modelowanie domeny przez obiekty, enkapsulacja.
- **Kiedy używać**: Złożone modele domenowe, gdy potrzebne dziedziczenie/polimorfizm.
- **Przykład**:
```ts
class User {
  constructor(private name: string) {}
  greet() { return `Hi ${this.name}`; }
}
```
- **Opracowanie**: preferuj kompozycję nad dziedziczenie, enkapsuluj stan, interfejsy/protokoły.
- **Słowa kluczowe**: encapsulation, inheritance, polymorphism, composition.

### Wzorce projektowe
- **Definicja**: Sprawdzone schematy rozwiązań.
- **Po co**: Powtarzalne problemy, wspólny język w zespole.
- **Kiedy używać**: Gdy wzorzec upraszcza kod i jest adekwatny.
- **Przykład (Factory Method)**:
```ts
abstract class Transport { abstract deliver(): void; }
class Truck extends Transport { deliver() { /* ... */ } }
```
- **Opracowanie**: dobierać wzorzec do problemu, unikać overengineering, dokumentować motywację.
- **Słowa kluczowe**: Singleton, Factory, Strategy, Observer, Adapter, DI.

### SOLID / DRY / KISS / Clean Code
- **Definicja**: Zbiór zasad utrzymania jakości kodu.
- **Po co**: Łatwiejsze utrzymanie, testowanie, rozwój.
- **Kiedy używać**: Zawsze jako heurystyki, nie dogmaty.
- **Przykład**:
```ts
// SRP: jedna odpowiedzialność
class PasswordHasher { hash(pw: string) { /* ... */ } }
```
- **Opracowanie**: SOLID (SRP,OCP,LSP,ISP,DIP), DRY bez przesady, KISS prostota, Clean Code czytelność > spryt.
- **Słowa kluczowe**: SRP, OCP, LSP, ISP, DIP, readability.

### Agile / Scrum
- **Definicja**: Zwinne metodyki dostarczania wartości iteracyjnie.
- **Po co**: Szybsze feedbacki, adaptacja do zmian.
- **Kiedy używać**: Projekty z niepewnymi wymaganiami, zespoły iteracyjne.
- **Przykład**: Sprint 2 tyg., backlog, daily, review, retro.
- **Opracowanie**: Definition of Done, priorytety wg wartości, inspekcja/adaptacja, ogranicz WIP, estymacje względne.
- **Słowa kluczowe**: sprint, backlog, daily, review, retro, DoD, WIP.

---

## Następne kroki do rozbudowy
- Dodać pełniejsze przykłady kodu dla każdego tematu.
- Rozszerzyć sekcje o anty-wzorce i pułapki.
- Dodać sekcję narzędzia: linting, testy (Jest, Playwright, k6).
- Uzupełnić checklisty bezpieczeństwa (OWASP Top 10) i monitoring (Prometheus/Grafana).
