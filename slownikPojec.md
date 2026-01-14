# Słownik pojęć IT – JavaScript, Web, Frontend, Backend

Słownik najważniejszych pojęć, terminów i słów kluczowych używanych w programowaniu webowym, JavaScript, HTML, CSS, frontendzie, backendzie i powiązanych technologiach.

---

## A

- **AJAX** (Asynchronous JavaScript and XML) – technika asynchronicznej komunikacji z serwerem bez przeładowania strony, obecnie często używana z JSON zamiast XML.

- **Angular** – framework JavaScript/TypeScript do budowania aplikacji SPA; pełny framework z dependency injection, routing, formularze, testy.

- **API** (Application Programming Interface) – interfejs programistyczny umożliwiający komunikację między aplikacjami lub komponentami; zbiór endpointów, metod i protokołów.

- **API Endpoint** – konkretny URL/ścieżka w API, która obsługuje określone żądanie HTTP; np. `GET /api/users/123`.

- **Array** – tablica; uporządkowana kolekcja elementów w JavaScript; indeksowana od 0, dynamiczny rozmiar.

- **Arrow Function** – funkcja strzałkowa; skrócona składnia funkcji w ES6+; `(params) => expression`; nie ma własnego `this`.

- **Async/Await** – składnia JavaScript do obsługi asynchroniczności, pozwalająca pisać kod asynchroniczny w stylu synchronicznym; `async` oznacza funkcję asynchroniczną, `await` czeka na zakończenie Promise.

- **Asynchroniczność** – wykonywanie operacji bez blokowania głównego wątku; operacje mogą trwać w tle, a kod kontynuuje działanie.

- **Atom** – najmniejsza jednostka w Atomic Design; pojedyncze, niepodzielne komponenty UI (np. przycisk, input).

- **Authentication** – uwierzytelnianie; proces weryfikacji tożsamości użytkownika (np. login/hasło, JWT, OAuth).

- **Authorization** – autoryzacja; proces sprawdzania uprawnień użytkownika do wykonania określonej akcji.

- **Axios** – biblioteka JavaScript do wykonywania żądań HTTP; Promise-based, obsługuje interceptors, automatyczną konwersję JSON.

---

## B

- **Backend** – część aplikacji działająca po stronie serwera; obsługuje logikę biznesową, bazy danych, API, autoryzację.

- **Babel** – transpiler JavaScript, konwertuje nowoczesny ES6+ kod na starsze wersje dla kompatybilności z przeglądarkami.

- **Base64** – schemat kodowania danych binarnych do tekstu ASCII; używany do osadzania obrazów w HTML/CSS, przesyłania danych.

- **BEM** (Block Element Modifier) – metodologia nazewnictwa klas CSS; struktura: `block__element--modifier`.

- **BigInt** – typ danych JavaScript do reprezentowania bardzo dużych liczb całkowitych, większych niż `Number.MAX_SAFE_INTEGER`.

- **Boolean** – typ danych logicznych; może przyjmować wartości `true` lub `false`.

- **Browser** – przeglądarka internetowa (Chrome, Firefox, Safari, Edge).

- **Bundler** – narzędzie łączące wiele plików JS/CSS w jeden lub kilka plików produkcyjnych (np. Webpack, Vite, Rollup).

- **Build** – proces kompilacji/bundlowania kodu źródłowego do wersji produkcyjnej; optymalizacja, minifikacja, transpilacja.

---

## C

- **Cache** – pamięć podręczna; przechowywanie danych w szybkiej pamięci dla szybszego dostępu; cache przeglądarki, CDN, Redis.

- **Callback** – funkcja przekazywana jako argument do innej funkcji, wywoływana po zakończeniu operacji (często asynchronicznej).

- **Call Stack** – stos wywołań; struktura danych śledząca wywołania funkcji; LIFO (Last In First Out).

- **CDN** (Content Delivery Network) – sieć serwerów rozproszonych geograficznie, dostarczająca statyczne zasoby (JS, CSS, obrazy) szybciej użytkownikom.

- **CJS** (CommonJS) – system modułów używany w Node.js; `require()` i `module.exports`.

- **Class** – klasa; szablon do tworzenia obiektów w JavaScript (ES6+); definiuje właściwości i metody.

- **Closure** – mechanizm JavaScript, gdzie funkcja wewnętrzna ma dostęp do zmiennych z zakresu funkcji zewnętrznej nawet po jej zakończeniu.

- **CMS** (Content Management System) – system zarządzania treścią (np. WordPress, Drupal, Strapi).

- **Component** – komponent; niezależna, wielokrotnego użytku część interfejsu; w React/Vue/Angular.

- **CORS** (Cross-Origin Resource Sharing) – mechanizm pozwalający stronom z jednej domeny na żądania do innej domeny; wymaga odpowiednich nagłówków HTTP.

- **CRUD** – akronim operacji na danych: Create (utwórz), Read (odczytaj), Update (zaktualizuj), Delete (usuń).

- **CSS** (Cascading Style Sheets) – język stylowania dokumentów HTML; definiuje wygląd, layout, kolory, typografię.

- **CSS Grid** – system layoutu CSS oparty na siatce dwuwymiarowej; pozwala na precyzyjne pozycjonowanie elementów w rzędach i kolumnach.

- **CSS Variables** (Custom Properties) – zmienne CSS definiowane w `:root` lub selektorze, dostępne przez `var(--nazwa)`.

- **CSR** (Client-Side Rendering) – renderowanie aplikacji po stronie klienta (w przeglądarce); JavaScript buduje DOM dynamicznie.

- **CSRF** (Cross-Site Request Forgery) – atak polegający na wykonaniu nieautoryzowanych żądań w imieniu użytkownika; zapobieganie: tokeny CSRF.

---

## D

- **Database** – baza danych; zorganizowany zbiór danych przechowywanych elektronicznie; relacyjne (SQL) lub nierelacyjne (NoSQL).

- **Debounce** – technika ograniczająca częstotliwość wywołań funkcji; funkcja wykonuje się dopiero po ustaniu aktywności przez określony czas (np. wyszukiwanie podczas pisania).

- **Decorator** – wzorzec projektowy i składnia (w TypeScript/ES2022) pozwalająca na modyfikację klas, metod lub właściwości bez zmiany ich kodu.

- **Dependency Injection** – wzorzec projektowy, gdzie zależności są przekazywane z zewnątrz zamiast być tworzone wewnątrz klasy/funkcji.

- **Destructuring** – składnia JavaScript do wyciągania wartości z tablic lub obiektów do zmiennych; `const {name, age} = user`.

- **DevOps** – praktyka łącząca rozwój oprogramowania (Dev) z operacjami IT (Ops); automatyzacja, CI/CD, monitoring.

- **Docker** – platforma konteneryzacji; pozwala pakować aplikacje w kontenery działające w izolacji.

- **DOM** (Document Object Model) – reprezentacja dokumentu HTML w pamięci jako drzewo obiektów; JavaScript manipuluje DOM, co wpływa na render strony.

- **DRY** (Don't Repeat Yourself) – zasada programowania: unikaj powtarzania kodu; używaj funkcji, modułów, komponentów.

---

## E

- **ECMAScript** – standard języka JavaScript; wersje ES6 (ES2015), ES7, ES2020, ES2022 itd.

- **ESLint** – narzędzie do analizy statycznej kodu JavaScript; wykrywa błędy, wymusza style, najlepsze praktyki.

- **ESM** (ES Modules) – system modułów ES6; `import` i `export`.

- **Event** – zdarzenie w przeglądarce (kliknięcie, scroll, input, submit); obsługiwane przez `addEventListener`.

- **Event Delegation** – technika nasłuchiwania zdarzeń na kontenerze zamiast na każdym dziecku; sprawdzanie `event.target` w handlerze.

- **Event Loop** – mechanizm JavaScript odpowiedzialny za kolejkowanie i wykonywanie zadań asynchronicznych; zarządza Call Stack, Callback Queue, Microtask Queue.

- **Express** – minimalistyczny framework webowy dla Node.js; ułatwia tworzenie serwerów HTTP i API.

- **Export** – eksport; udostępnianie wartości, funkcji, klas z modułu do użycia w innych modułach; `export` (ESM) lub `module.exports` (CJS).

---

## F

- **Fetch API** – nowoczesne API JavaScript do wykonywania żądań HTTP; zwraca Promise, obsługuje async/await.

- **Firebase** – platforma Google oferująca backend-as-a-service; baza danych, autoryzacja, hosting, cloud functions.

- **Flexbox** – system layoutu CSS jednowymiarowy; układa elementy w rzędzie lub kolumnie z elastycznym rozkładem przestrzeni.

- **Frontend** – część aplikacji działająca po stronie klienta (przeglądarki); HTML, CSS, JavaScript, interfejs użytkownika.

- **Framework** – szkielet aplikacji dostarczający strukturę, narzędzia i konwencje (np. React, Vue, Angular, Next.js).

- **Functional Programming** – paradygmat programowania oparty na funkcjach czystych, niezmienności danych, unikaniu efektów ubocznych.

- **Function** – funkcja; blok kodu wykonywany po wywołaniu; może przyjmować parametry i zwracać wartość.

---

## G

- **Generator** – funkcja generator w JavaScript; zwraca iterator, może być wstrzymywana i wznawiana; `function*` i `yield`.

- **Git** – system kontroli wersji; śledzi zmiany w kodzie, umożliwia współpracę, zarządzanie gałęziami.

- **GitHub** – platforma hostingowa dla repozytoriów Git; współpraca, code review, issues, pull requests.

- **GraphQL** – język zapytań i runtime do API; klient określa dokładnie, jakie dane chce otrzymać.

- **Gulp** – narzędzie automatyzacji zadań (task runner) oparte na streamach Node.js.

---

## H

- **Hash** – funkcja skrótu; przekształca dane w stałej długości wartość; używana w strukturach danych, bezpieczeństwie (hasła).

- **Hoisting** – mechanizm JavaScript, gdzie deklaracje zmiennych (`var`) i funkcji są przenoszone na górę zakresu przed wykonaniem kodu.

- **HTML** (HyperText Markup Language) – język znaczników do strukturyzacji treści strony internetowej; definiuje elementy, atrybuty, semantykę.

- **HTTP** (HyperText Transfer Protocol) – protokół komunikacji między klientem a serwerem; metody: GET, POST, PUT, DELETE, PATCH.

- **HTTPS** – bezpieczna wersja HTTP z szyfrowaniem SSL/TLS.

- **Hooks** (React) – funkcje pozwalające na użycie stanu i innych funkcji React w komponentach funkcyjnych (np. `useState`, `useEffect`).

---

## I

- **IIFE** (Immediately Invoked Function Expression) – funkcja wykonywana natychmiast po zdefiniowaniu; `(function() { ... })()`.

- **Immutable** – niezmienny; dane, które nie mogą być modyfikowane po utworzeniu; w JavaScript: `const`, `Object.freeze()`, biblioteki jak Immutable.js.

- **IndexedDB** – niskopoziomowy API przeglądarki do przechowywania dużych ilości danych strukturalnych w kliencie.

- **Interface** (TypeScript) – definicja kształtu obiektu; kontrakt określający wymagane właściwości i typy.

- **Internet** – globalna sieć komputerów połączonych protokołami komunikacyjnymi.

- **Iterator** – obiekt pozwalający na sekwencyjny dostęp do elementów kolekcji; implementuje protokół iteracji (`Symbol.iterator`).

---

## J

- **Jest** – framework testowy dla JavaScript; unit testing, mocking, snapshot testing; często używany z React.

- **JSON** (JavaScript Object Notation) – format wymiany danych oparty na składni JavaScript; tekstowy, łatwy do parsowania.

- **JSX** – rozszerzenie składni JavaScript używane w React; pozwala pisać HTML-like kod w JavaScript.

- **JWT** (JSON Web Token) – standard tokenów używanych do autoryzacji; zawiera dane w formacie JSON, podpisany cyfrowo.

---

## K

- **Key** (React) – specjalny atrybut używany do identyfikacji elementów na liście; pomaga React w efektywnym renderowaniu.

- **KISS** (Keep It Simple, Stupid) – zasada programowania: rozwiązania powinny być proste i zrozumiałe.

- **Kubernetes** – platforma orkiestracji kontenerów; automatyzacja wdrażania, skalowania i zarządzania aplikacjami konteneryzowanymi.

---

## L

- **Lazy Loading** – technika opóźniania ładowania zasobów (obrazy, komponenty) do momentu, gdy są potrzebne; poprawia wydajność.

- **Lexical Scope** – zakres leksykalny; dostęp do zmiennych zdefiniowanych w zewnętrznych zakresach na podstawie miejsca definicji w kodzie.

- **LocalStorage** – API przeglądarki do przechowywania danych w kliencie; dane przetrwają zamknięcie przeglądarki; limit ~5-10MB.

- **Linter** – narzędzie analizujące kod pod kątem błędów, stylu, najlepszych praktyk (np. ESLint).

- **Load Balancer** – równoważenie obciążenia; dystrybucja ruchu sieciowego między wiele serwerów; poprawa wydajności i niezawodności.

---

## M

- **Map** – struktura danych JavaScript (ES6+); przechowuje pary klucz-wartość; klucze mogą być dowolnego typu (nie tylko stringi jak w Object).

- **Middleware** – funkcja pośrednicząca w pipeline'ie żądań (np. w Express); wykonuje się przed głównym handlerem (autoryzacja, logowanie, parsowanie).

- **Minification** – minifikacja; proces usuwania białych znaków, komentarzy, skracania nazw zmiennych; zmniejsza rozmiar plików.

- **Module** – pojedynczy plik JavaScript zawierający kod, który może być importowany/eksportowany; izolacja zakresu.

- **MongoDB** – nierelacyjna baza danych NoSQL; przechowuje dane w formacie dokumentów (BSON/JSON).

- **MVC** (Model-View-Controller) – wzorzec architektoniczny dzielący aplikację na Model (dane), View (prezentacja), Controller (logika).

- **MVVM** (Model-View-ViewModel) – wzorzec architektoniczny używany w frameworkach jak Vue.js, Angular.

---

## N

- **Next.js** – framework React do aplikacji produkcyjnych; SSR, SSG, routing, optymalizacja obrazów, API routes.

- **Node.js** – środowisko uruchomieniowe JavaScript poza przeglądarką; pozwala na tworzenie serwerów, narzędzi CLI, aplikacji backendowych.

- **npm** (Node Package Manager) – menedżer pakietów dla Node.js; największy rejestr pakietów JavaScript.

- **NoSQL** – bazy danych nierelacyjne; nie używają tabel SQL; dokumentowe (MongoDB), klucz-wartość (Redis), grafowe, kolumnowe.

- **Nullish Coalescing** (`??`) – operator JavaScript zwracający prawą wartość, gdy lewa jest `null` lub `undefined`.

- **Number** – typ danych numerycznych w JavaScript; reprezentuje liczby całkowite i zmiennoprzecinkowe.

---

## O

- **Object** – obiekt; struktura danych JavaScript przechowująca pary klucz-wartość; podstawowy typ danych.

- **OOP** (Object-Oriented Programming) – programowanie obiektowe; paradygmat oparty na obiektach, klasach, dziedziczeniu, enkapsulacji, polimorfizmie.

- **Optional Chaining** (`?.`) – operator JavaScript pozwalający bezpiecznie odwoływać się do właściwości obiektu, które mogą nie istnieć; zwraca `undefined` zamiast błędu.

- **ORM** (Object-Relational Mapping) – technika mapowania obiektów na tabele bazy danych; biblioteki: Sequelize, TypeORM, Prisma.

- **OAuth** – protokół autoryzacji; pozwala aplikacjom na dostęp do zasobów użytkownika bez ujawniania hasła.

---

## P

- **Package** – pakiet/moduł JavaScript dystrybuowany przez npm/yarn/pnpm; zawiera kod, zależności, metadane w `package.json`.

- **Package.json** – plik konfiguracyjny projektu Node.js; definiuje zależności, skrypty, metadane, wersję.

- **Parcel** – bundler webowy z zerową konfiguracją; automatycznie wykrywa i przetwarza zasoby.

- **Polyfill** – kod implementujący funkcjonalność, która może nie być dostępna w starszych przeglądarkach; zapewnia kompatybilność wsteczną.

- **PostgreSQL** – relacyjna baza danych open-source; zaawansowane funkcje, ACID compliance, rozszerzalność.

- **Promise** – obiekt JavaScript reprezentujący przyszły wynik operacji asynchronicznej; ma stany: pending, fulfilled, rejected; obsługuje `.then()`, `.catch()`, `.finally()`.

- **Props** (React) – właściwości przekazywane do komponentu; dane płynące z rodzica do dziecka; read-only.

- **Prototype** – mechanizm dziedziczenia w JavaScript; każdy obiekt ma prototyp, z którego dziedziczy właściwości i metody.

- **Proxy** – obiekt JavaScript pozwalający na przechwytywanie i redefiniowanie operacji na obiekcie (get, set, has, deleteProperty itd.).

- **PWA** (Progressive Web App) – aplikacja webowa działająca jak natywna; offline, instalowalna, push notifications, service workers.

---

## R

- **React** – biblioteka JavaScript do budowania interfejsów użytkownika; komponenty, wirtualny DOM, jednokierunkowy przepływ danych.

- **React Native** – framework do budowania aplikacji mobilnych natywnych używając React; iOS i Android z jednego kodu.

- **Redis** – baza danych in-memory typu klucz-wartość; używana do cache'owania, sesji, kolejek, pub/sub.

- **Reflow** – proces przeglądarki polegający na ponownym obliczeniu układu elementów; kosztowny operacyjnie; wywoływany przez zmiany w DOM wpływające na layout.

- **Repaint** – proces przeglądarki polegający na ponownym rysowaniu elementów; lżejszy niż reflow; wywoływany przez zmiany kolorów, tła.

- **REST** (Representational State Transfer) – architektura API oparta na HTTP; zasoby identyfikowane przez URL, metody HTTP (GET, POST, PUT, DELETE), stateless.

- **Router** – mechanizm zarządzania nawigacją w aplikacji; mapuje URL na komponenty/widoki (np. React Router, Vue Router).

- **RWD** (Responsive Web Design) – projektowanie stron adaptujących się do różnych rozmiarów ekranów; media queries, flexible grids, responsive images.

---

## S

- **Scope** – zakres widoczności zmiennej; określa, gdzie zmienna jest dostępna (global, function, block scope).

- **Semantic HTML** – HTML używający znaczników semantycznych (`<header>`, `<nav>`, `<article>`, `<section>`, `<footer>`) zamiast generycznych `<div>`; lepsza dostępność, SEO.

- **Server-Side Rendering** (SSR) – renderowanie HTML po stronie serwera przed wysłaniem do klienta; poprawia SEO, czas pierwszego renderu.

- **Service Worker** – skrypt działający w tle przeglądarki; może przechwytywać żądania sieciowe, cache'ować zasoby, obsługiwać offline, push notifications.

- **SessionStorage** – API przeglądarki podobne do localStorage; dane są usuwane po zamknięciu karty przeglądarki.

- **Set** – struktura danych JavaScript (ES6+); przechowuje unikalne wartości; nie ma duplikatów, iterowalna.

- **Single Page Application** (SPA) – aplikacja webowa, która ładuje się raz i dynamicznie aktualizuje treść bez przeładowania strony; routing po stronie klienta.

- **SOLID** – pięć zasad programowania obiektowego: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

- **SPA** – zobacz Single Page Application.

- **SQL** (Structured Query Language) – język zapytań do relacyjnych baz danych; SELECT, INSERT, UPDATE, DELETE, JOIN.

- **State** – stan aplikacji/komponentu; dane, które mogą się zmieniać i wpływają na renderowanie; w React: `useState`, `useReducer`.

- **Strict Mode** – tryb ścisły JavaScript (`'use strict'`); wyłącza niektóre niebezpieczne funkcje, wymusza lepsze praktyki.

- **String** – typ danych tekstowych w JavaScript; sekwencja znaków; immutable.

- **String Template** (Template Literals) – składnia JavaScript do tworzenia stringów z interpolacją; backtick `` `Hello ${name}` ``.

- **Symbol** – typ danych JavaScript (ES6+); unikalna, niezmienna wartość używana jako identyfikator właściwości obiektu.

---

## T

- **TDZ** (Temporal Dead Zone) – okres między początkiem zakresu a deklaracją zmiennej `let`/`const`, gdzie zmienna nie jest dostępna; próba dostępu powoduje ReferenceError.

- **Test** – test; kod weryfikujący poprawność działania innego kodu; unit tests, integration tests, E2E tests.

- **Throttle** – technika ograniczająca częstotliwość wywołań funkcji; funkcja wykonuje się maksymalnie raz w określonym przedziale czasu (np. scroll, resize).

- **Transpiler** – narzędzie konwertujące kod z jednej wersji języka na inną (np. Babel: ES6+ → ES5).

- **TypeScript** – nadzbiór JavaScript dodający statyczne typowanie; kompiluje się do JavaScript; poprawia bezpieczeństwo typów, refaktoryzację.

---

## U

- **UI** (User Interface) – interfejs użytkownika; wizualna część aplikacji, z którą użytkownik wchodzi w interakcję.

- **URL** (Uniform Resource Locator) – adres zasobu w internecie; protokół + domena + ścieżka + parametry.

- **UX** (User Experience) – doświadczenie użytkownika; ogólne wrażenie z korzystania z aplikacji, użyteczność, dostępność, wydajność.

---

## V

- **Variable** – zmienna; kontener na dane w programie; w JavaScript: `var`, `let`, `const`.

- **Version Control** – kontrola wersji; system śledzący zmiany w kodzie (np. Git); umożliwia współpracę, historię, rollback.

- **Virtual DOM** – reprezentacja DOM w pamięci używana przez React; pozwala na efektywne aktualizacje przez porównywanie i minimalizowanie zmian w rzeczywistym DOM.

- **Vite** – nowoczesny bundler i dev server; szybki HMR (Hot Module Replacement), natywne ES Modules, optymalizacja produkcji.

- **Vue.js** – progresywny framework JavaScript do budowania interfejsów użytkownika; komponenty, reaktywność, dyrektywy.

---

## W

- **Webpack** – bundler modułów JavaScript; łączy pliki, przetwarza zasoby (CSS, obrazy), optymalizuje kod produkcyjny.

- **WebSocket** – protokół komunikacji dwukierunkowej przez pojedyncze połączenie TCP; umożliwia real-time komunikację (czaty, notyfikacje).

- **WeakMap** – struktura danych JavaScript (ES6+); Map z referencjami słabymi; klucze muszą być obiektami; nie zapobiega garbage collection.

- **WeakSet** – struktura danych JavaScript (ES6+); Set z referencjami słabymi; wartości muszą być obiektami; nie zapobiega garbage collection.

- **WYSIWYG** (What You See Is What You Get) – edytory, gdzie widok edycji odpowiada końcowemu wynikowi.

---

## X

- **XHR** (XMLHttpRequest) – starsze API JavaScript do wykonywania żądań HTTP; obecnie często zastępowane przez Fetch API.

- **XSS** (Cross-Site Scripting) – atak polegający na wstrzyknięciu złośliwego kodu JavaScript do strony; zapobieganie: sanitizacja, `textContent` zamiast `innerHTML`, CSP.

---

## Y

- **YAGNI** (You Aren't Gonna Need It) – zasada programowania: nie implementuj funkcjonalności, dopóki nie jest naprawdę potrzebna.

- **Yarn** – alternatywny menedżer pakietów dla Node.js; szybszy niż npm, deterministyczne instalacje, lepsze zarządzanie zależnościami.

---

## Z

- **Z-index** – właściwość CSS określająca kolejność nakładania się elementów; wyższa wartość = element na wierzchu; działa tylko z `position` różnym od `static`.

---

## Dodatkowe pojęcia (mniej popularne, ale ważne)

- **Accessibility (A11y)** – dostępność; projektowanie aplikacji użytecznych dla osób z niepełnosprawnościami; semantyka HTML, aria-atrybuty, keyboard navigation.

- **API Gateway** – punkt wejścia do wielu mikrousług; routuje żądania, agreguje odpowiedzi, obsługuje autoryzację, rate limiting.

- **BFF** (Backend For Frontend) – dedykowany backend dla konkretnego frontendu; optymalizuje dane pod potrzeby klienta.

- **CI/CD** (Continuous Integration/Continuous Deployment) – automatyzacja testów i wdrożeń; każda zmiana jest testowana i automatycznie wdrażana.

- **Code Splitting** – technika dzielenia kodu na mniejsze części ładowane na żądanie; poprawia czas pierwszego ładowania.

- **Content Security Policy (CSP)** – mechanizm bezpieczeństwa ograniczający źródła wykonywanego kodu; zapobiega XSS.

- **Design System** – zbiór komponentów, wzorców, wytycznych stylistycznych zapewniających spójność UI w projekcie.

- **Hot Module Replacement (HMR)** – technika zastępowania modułów w działającej aplikacji bez przeładowania strony; zachowuje stan.

- **Microservices** – architektura aplikacji jako zestaw małych, niezależnych serwisów komunikujących się przez API.

- **Monorepo** – repozytorium zawierające wiele projektów/pakietów; wspólne zarządzanie zależnościami, narzędziami.

- **Observer Pattern** – wzorzec projektowy, gdzie obiekt nasłuchuje zmian w innym obiekcie; w JavaScript: EventEmitter, Proxy, reactive frameworks.

- **Progressive Enhancement** – filozofia projektowania: podstawowa funkcjonalność działa wszędzie, zaawansowane funkcje dla nowoczesnych przeglądarek.

- **Serverless** – model architektury, gdzie kod działa w środowisku zarządzanym przez dostawcę (AWS Lambda, Vercel, Netlify Functions).

- **Tree Shaking** – eliminacja nieużywanego kodu podczas bundlowania; zmniejsza rozmiar plików produkcyjnych.

- **Web Components** – standard webowy pozwalający tworzyć własne, wielokrotnego użytku elementy HTML; Shadow DOM, Custom Elements.

- **WebAssembly (WASM)** – format binarny wykonywany w przeglądarce; pozwala uruchamiać kod w językach innych niż JavaScript z wysoką wydajnością.

- **Agile** – metodyka zarządzania projektami; iteracyjne podejście, adaptacja do zmian, współpraca, krótkie cykle (sprinty).

- **Algorithm** – algorytm; zestaw instrukcji rozwiązujących problem; określona kolejność kroków.

- **ArrayBuffer** – obiekt JavaScript reprezentujący surowy bufor danych binarnych; używany z TypedArray do pracy z danymi binarnymi.

- **Authentication Token** – token uwierzytelniający; ciąg znaków używany do weryfikacji tożsamości (np. JWT, session token).

- **Backend-as-a-Service (BaaS)** – usługa dostarczająca gotowy backend; Firebase, AWS Amplify, Supabase.

- **Block Scope** – zakres blokowy; zmienne zdefiniowane w bloku `{}` są dostępne tylko w tym bloku; `let`, `const`.

- **Browser DevTools** – narzędzia deweloperskie przeglądarki; debugowanie, inspekcja DOM, profilowanie, network monitoring.

- **Build Tool** – narzędzie budujące; kompiluje, bundluje, optymalizuje kod źródłowy do wersji produkcyjnej.

- **Cache Invalidation** – unieważnianie cache; proces usuwania przestarzałych danych z pamięci podręcznej.

- **Cookie** – mały plik tekstowy przechowywany przez przeglądarkę; używany do sesji, preferencji, śledzenia.

- **Cross-Browser Compatibility** – kompatybilność między przeglądarkami; zapewnienie działania aplikacji w różnych przeglądarkach.

- **Data Structure** – struktura danych; sposób organizacji i przechowywania danych; tablice, listy, drzewa, grafy, hash tables.

- **Debugging** – debugowanie; proces znajdowania i naprawiania błędów w kodzie; breakpoints, logi, narzędzia deweloperskie.

- **Dependency** – zależność; zewnętrzny pakiet/biblioteka wymagana przez projekt; definiowana w `package.json`.

- **Environment Variable** – zmienna środowiskowa; wartość konfiguracyjna dostępna w środowisku wykonania; `.env` files.

- **Error Handling** – obsługa błędów; mechanizmy radzenia sobie z wyjątkami i błędami; try-catch, error boundaries.

- **Event Bubbling** – propagacja zdarzeń w górę drzewa DOM; zdarzenie najpierw wywołuje się na elemencie, potem na rodzicach.

- **Event Capturing** – przechwytywanie zdarzeń w dół drzewa DOM; zdarzenie najpierw wywołuje się na rodzicu, potem na dziecku.

- **Factory Pattern** – wzorzec projektowy tworzący obiekty bez bezpośredniego użycia konstruktora; funkcja/metoda tworząca obiekty.

- **Garbage Collection** – odśmiecanie pamięci; automatyczne zwalnianie pamięci zajmowanej przez nieużywane obiekty.

- **Git Branch** – gałąź Git; niezależna linia rozwoju kodu; umożliwia równoległą pracę nad różnymi funkcjami.

- **Git Commit** – commit Git; snapshot zmian w repozytorium; punkt w historii projektu z opisem zmian.

- **Git Merge** – scalanie gałęzi Git; łączy zmiany z jednej gałęzi do drugiej.

- **Git Rebase** – rebase Git; przenosi commity z jednej gałęzi na wierzch innej; przepisuje historię.

- **HTTP Method** – metoda HTTP; typ operacji na zasobie; GET (odczyt), POST (utworzenie), PUT (aktualizacja), DELETE (usunięcie), PATCH (częściowa aktualizacja).

- **HTTP Status Code** – kod statusu HTTP; informacja o wyniku żądania; 200 (OK), 404 (Not Found), 500 (Server Error).

- **Immutable Data Structure** – niezmienna struktura danych; struktura, która nie może być modyfikowana po utworzeniu.

- **Index** – indeks; struktura danych przyspieszająca wyszukiwanie w bazie danych; podobnie w tablicach JavaScript.

- **JSON Schema** – schemat JSON; definicja struktury i walidacji danych JSON; opisuje wymagane pola, typy, formaty.

- **Library** – biblioteka; zbiór funkcji/klas do użycia w projekcie; różni się od frameworka (framework narzuca strukturę).

- **Memory Leak** – wyciek pamięci; sytuacja, gdy pamięć nie jest zwalniana mimo, że nie jest już potrzebna.

- **Method** – metoda; funkcja należąca do obiektu/klasy; wywoływana przez obiekt: `obj.method()`.

- **Mutation** – mutacja; zmiana stanu danych; w React/Vue często unikane na rzecz immutability.

- **Namespace** – przestrzeń nazw; sposób organizacji kodu; zapobiega konfliktom nazw.

- **Null** – wartość null; celowy brak wartości; różni się od `undefined` (niezdefiniowane).

- **Object Literal** – literał obiektu; sposób tworzenia obiektu bezpośrednio w kodzie; `{ key: value }`.

- **Package Manager** – menedżer pakietów; narzędzie do zarządzania zależnościami projektu; npm, yarn, pnpm.

- **Performance Optimization** – optymalizacja wydajności; proces poprawy szybkości i efektywności aplikacji.

- **Property** – właściwość; atrybut obiektu; para klucz-wartość w obiekcie JavaScript.

- **Query** – zapytanie; żądanie danych z bazy danych lub API; SQL query, GraphQL query.

- **Race Condition** – wyścig; sytuacja, gdy wynik zależy od kolejności wykonania operacji asynchronicznych.

- **Recursion** – rekurencja; funkcja wywołująca samą siebie; musi mieć warunek zakończenia (base case).

- **Refactoring** – refaktoryzacja; poprawa struktury kodu bez zmiany jego funkcjonalności.

- **Regular Expression (Regex)** – wyrażenie regularne; wzorzec do dopasowywania tekstu; `/pattern/flags`.

- **Repository** – repozytorium; miejsce przechowywania kodu (Git); lub wzorzec dostępu do danych (Repository Pattern).

- **Request** – żądanie; zapytanie wysyłane do serwera; HTTP request, API request.

- **Response** – odpowiedź; odpowiedź serwera na żądanie; HTTP response, API response.

- **RESTful API** – API zgodne z zasadami REST; używa standardowych metod HTTP, stateless, zasoby w URL.

- **Schema** – schemat; definicja struktury danych; database schema, JSON schema, TypeScript interface.

- **Selector** – selektor; sposób wyboru elementów w CSS lub DOM; `.class`, `#id`, `element`.

- **Side Effect** – efekt uboczny; zmiana stanu poza zakresem funkcji; w React: operacje I/O, subscriptions, timers.

- **Singleton Pattern** – wzorzec projektowy zapewniający jedną instancję klasy; globalny dostęp do jednego obiektu.

- **Source Map** – mapa źródłowa; plik mapujący zminifikowany kod do kodu źródłowego; ułatwia debugowanie.

- **State Management** – zarządzanie stanem; sposób przechowywania i aktualizacji stanu aplikacji; Redux, Zustand, Context API.

- **Stream** – strumień; sekwencyjny przepływ danych; Node.js streams, Web Streams API.

- **Syntactic Sugar** – cukier składniowy; składnia ułatwiająca czytelność bez zmiany funkcjonalności; arrow functions, destructuring.

- **Task Queue** – kolejka zadań; struktura przechowująca zadania do wykonania; Callback Queue, Microtask Queue w Event Loop.

- **Template** – szablon; wzorzec do generowania treści; template literals, JSX templates, HTML templates.

- **Type Coercion** – konwersja typów; automatyczna zamiana jednego typu na drugi; `"5" + 3` → `"53"`.

- **Type Safety** – bezpieczeństwo typów; gwarancja, że operacje są wykonywane na odpowiednich typach; TypeScript.

- **Unit Test** – test jednostkowy; test weryfikujący działanie pojedynczej funkcji/metody w izolacji.

- **Validation** – walidacja; sprawdzanie poprawności danych; form validation, input validation, schema validation.

- **Variable Shadowing** – cieniowanie zmiennych; sytuacja, gdy zmienna lokalna przesłania zmienną z zakresu zewnętrznego.

- **Versioning** – wersjonowanie; system numerowania wersji oprogramowania; semver (Semantic Versioning): MAJOR.MINOR.PATCH.

- **Web Server** – serwer webowy; program obsługujący żądania HTTP; Apache, Nginx, Node.js server.

- **Webhook** – webhook; mechanizm powiadamiania o zdarzeniach przez HTTP POST; callback URL.

- **Wrapper** – wrapper; funkcja/obiekt opakowujący inną funkcję/obiekt; dodaje dodatkową funkcjonalność.

- **YAML** (YAML Ain't Markup Language) – format danych podobny do JSON; używany w konfiguracjach (docker-compose, CI/CD).

---

**Uwaga:** Ten słownik zawiera podstawowe i zaawansowane pojęcia. Warto rozszerzać go o specyficzne terminy.
