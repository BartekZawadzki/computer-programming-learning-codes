# React Native – szkic plików z komentarzami

Pliki:
- `App.tsx` – główny komponent aplikacji (RN), przykładowe listy i przyciski.
- `apiClient.ts` – prosty klient fetch z bazowym URL.
- `useFetch.ts` – hook do pobierania danych (loading/error/refetch).
- `metro.config.js` – konfiguracja Metro bundlera (podstawowa).
- `android/app/build.gradle` – szkic konfiguracji Gradle (komentarze).
- `android/build.gradle` – główny build Gradle (komentarze).

Uwaga: to szkic edukacyjny, nie zawiera pełnej struktury wygenerowanej przez `npx react-native init`. Dostosuj do realnego projektu.  

---
Dlaczego tak:
- Rozdzielenie App/hook/klienta API/metra/Gradle pokazuje warstwy aplikacji RN (UI, dane, bundler, Android).
- Typowane pliki TS (App, useFetch, apiClient) poprawiają DX i redukują błędy.
- Konfiguracje Metro/Gradle są minimalne, by łatwo je dostosować, ale wskazują kluczowe elementy (SDK, pluginy, sourceExts).
