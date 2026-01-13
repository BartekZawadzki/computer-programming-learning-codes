# Jenkins – szkic konfiguracji pipeline (z komentarzami)

## Co jest w repo
- `Jenkinsfile` – deklaratywny pipeline: checkout, install, lint, test, build, przykładowy deploy.
- `jenkins/` (ten katalog) – dodatkowe notatki i przykładowy plik credentials (nie przechowuj realnych sekretów).

## Typowe kroki do uruchomienia joba
1. Utwórz pipeline job i wskaż repo (SCM).
2. Upewnij się, że agent ma:
   - Node.js w odpowiedniej wersji (np. 20.x)
   - npm/yarn/pnpm zgodnie z użyciem w projekcie
3. (Opcjonalnie) Skonfiguruj globalne narzędzia (NodeJS Tool, JDK) w Manage Jenkins.
4. Dodaj credentials (np. do deployu) i używaj ich w Jenkinsfile przez `withCredentials`.

## Przykładowe use-cases rozbudowy
- Równoległe stage’e: testy jednostkowe i e2e w osobnych agentach.
- Cache node_modules: użyj stash/unstash lub cache pluginów (np. `withEnv(["HOME=${WORKSPACE}/.cache"])`).
- Build kontenerów: dodaj stage z `docker.build` + push do registry.
- Infra: `kubectl`/`helm`/`ansible` w stage Deploy, wstrzykiwane przez credentials.

## Uwaga o sekretach
- **Nigdy** nie commituj realnych tokenów/kluczy.
- Używaj credentials store w Jenkins (Secret Text, Username/Password, SSH Key).

---
Dlaczego tak:
- Podział na etapy i notatki o narzędziach/agencie daje szybki start dla pipeline'ów JS.
- Sekcja use-cases podpowiada typowe rozszerzenia (równoległość, cache, kontenery).
- Wyróżnienie pracy z sekretami przypomina o bezpiecznym zarządzaniu danymi w Jenkinsie.
