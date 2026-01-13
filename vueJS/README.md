# Vue.js – szkic plików z komentarzami (Vite style)

Struktura (uproszczona):
- `main.js` – punkt startowy, tworzy aplikację, montuje App.
- `App.vue` – główny komponent (Composition API: counter, fetch).
- `components/UserCard.vue` – prezentacja pojedynczego użytkownika.
- `composables/useFetch.js` – prosty composable do pobierania danych.
- `apiClient.js` – klient fetch z bazowym URL i obsługą błędów.
- `vite.config.js` – konfiguracja Vite dla Vue.

Uwaga: to szkic edukacyjny, niepełny projekt CLI; dopasuj do swojego bundlera i środowiska.  

---
Dlaczego tak:
- Podział na main/App/komponenty/composables odwzorowuje typową strukturę Vue 3 z Composition API.
- Klient API i useFetch separują logikę sieciową od UI, ułatwiając testy i utrzymanie.
- Vite config jest minimalny, by pokazać podstawy (plugin Vue, port, sourcemap) i łatwo go rozszerzyć.
