# Komendy terminalowe – skrót dla projektów i narzędzi

Zestaw podstawowych i najczęściej potrzebnych komend do pracy z repozytorium, frontendem, backendem, Dockerem oraz narzędziami JS/TS (Node, npm, React/React Native, Angular, Vue, Next, Vite) i Git. Składnia podana w stylu shell (PowerShell/Bash); na Windows możesz używać PowerShell lub wbudowanego terminala w IDE.

---
## 1) System plików (PowerShell/Bash)
- Lista plików: `ls` (PS: `ls`, CMD: `dir`)
- Wejście do katalogu: `cd nazwa_folderu`
- W górę: `cd ..`
- Utworzenie folderu: `mkdir nazwa`
- Utworzenie pliku: `ni plik.txt` (PowerShell) / `touch plik.txt` (Bash)
- Kopia pliku: `cp źródło cel`
- Przeniesienie/zmiana nazwy: `mv źródło cel`
- Usunięcie pliku: `rm plik` (uwaga na `rm -r` dla folderów)
- Podgląd pliku: `cat plik` (PS też `gc plik`)
- Wyszukiwanie tekstu: `rg "fraza"` (ripgrep)

---
## 2) Node / npm / pnpm / yarn
- Wersja node: `node -v`; npm: `npm -v`
- Inicjalizacja projektu: `npm init -y`
- Instalacja zależności: `npm install` / `npm i`
- Instalacja paczki (prod/dev): `npm i paczka` / `npm i -D paczka`
- Usunięcie paczki: `npm uninstall paczka`
- Uruchomienie skryptu: `npm run nazwa_scryptu` (np. `npm run dev`, `npm run build`, `npm test`)
- Globalne narzędzia (ostrożnie): `npm i -g pnpm`, `npm i -g yarn`
- pnpm: `pnpm i`, `pnpm run dev`; yarn: `yarn`, `yarn dev`

---
## 3) Bundlery / scaffolding (nowoczesne)
- Vite (React/Vue/Vanilla/TS): `npm create vite@latest myapp -- --template react` (zmień template: `vue`, `vanilla`, `react-ts` itp.)
- Next.js: `npx create-next-app@latest my-next-app`
- React Native (Expo): `npx create-expo-app my-rn-app`
- React Native CLI (bare): `npx react-native init MyApp`
- Angular: `npm i -g @angular/cli` → `ng new my-app` → `ng serve`
- Vue (Vite): `npm create vite@latest my-vue -- --template vue`

---
## 4) Frameworki – komendy dev/build
- React (Vite): `npm run dev` (domyślnie port 5173), `npm run build`, `npm run preview`
- Next.js: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- Angular: `ng serve`, `ng build`, `ng test`, `ng lint`
- Vue (Vite): `npm run dev`, `npm run build`, `npm run preview`
- React Native (Expo): `npx expo start` (wybór platformy), `npx expo run:android`, `npx expo run:ios` (na macOS)
- React Native CLI: `npx react-native start`, `npx react-native run-android`, `npx react-native run-ios`

---
## 5) TypeScript / lint / format
- TS kompilacja: `npx tsc -p tsconfig.json` / `npx tsc --noEmit` (sprawdź typy)
- ESLint: `npx eslint .`
- Prettier: `npx prettier . --check` / `npx prettier . --write`

---
## 6) Testy
- Jest/Vitest (przykład): `npm test` lub `npx vitest` / `npx jest`
- Cypress/Playwright (E2E): `npx cypress open` / `npx playwright test`

---
## 7) Backend / Node narzędziowo
- Uruchom skrypt Node: `node plik.js`
- Nodemon (live reload): `npx nodemon app.js`
- HTTP serwer prosty: `npx http-server dist -p 8080`
- Env (przykład uruchomienia): `PORT=3000 node app.js` (PowerShell: `$env:PORT=3000; node app.js`)

---
## 8) Git (podstawy)
- Status: `git status`
- Dodaj pliki: `git add .` (lub wybiórczo `git add plik`)
- Commit: `git commit -m "wiadomość"`
- Log: `git log --oneline --graph --decorate -n 10`
- Różnice: `git diff` (staged vs repo: `git diff --cached`)
- Gałęzie: `git branch`, `git checkout -b nowa-galaz`, `git switch main`
- Pull/Push: `git pull`, `git push`
- Stash: `git stash`, `git stash pop`

---
## 9) Docker / docker-compose
- Build obrazu: `docker build -t nazwa:tag .`
- Lista kontenerów: `docker ps -a`
- Uruchom obraz: `docker run -p 3000:3000 nazwa:tag`
- Zatrzymaj/usuń kontener: `docker stop id` / `docker rm id`
- docker-compose: `docker-compose up -d`, `docker-compose down`, `docker-compose logs -f`, `docker-compose ps`

---
## 10) Narzędzia pomocnicze (Windows / ogólne)
- Otwórz VS Code w katalogu: `code .`
- Sprawdź porty (PowerShell): `Get-NetTCPConnection -State Listen | ? { $_.LocalPort -eq 3000 }`
- Czyszczenie npm cache: `npm cache clean --force`
- Aktualizacja paczki: `npm update paczka`
- Global PATH info: `where node` (CMD) / `Get-Command node` (PS)

---
## 11) Wyszukiwanie i podgląd (dev)
- Szukaj tekstu w repo: `rg "pattern"`
- Szybki serwer plików statycznych (Python): `python -m http.server 8000` (jeśli Python dostępny)

---
## 12) PowerShell – krótkie wstawki
- Zmienna środowiskowa (chwilowa): `$env:PORT = 3000; node app.js`
- Filtracja: `Get-Process | ? { $_.CPU -gt 100 }`
- Sort/Select: `Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 5`
- Aliasy: `ls`(Get-ChildItem), `cat/gc`(Get-Content), `ni`(New-Item), `rm`(Remove-Item), `cp`(Copy-Item), `mv`(Move-Item)
- Funkcja/alias w profilu: edytuj `$PROFILE`, np. `function gs { git status }`
- Pętla: `1..5 | % { Write-Host $_ }` (`%` = ForEach-Object)

---
## 13) Bash – krótkie wstawki
- Zmienna środowiskowa (jedno polecenie): `PORT=3000 node app.js`
- Eksport na sesję: `export PORT=3000`
- Pętla: `for f in *.js; do echo "$f"; done`
- Find/grep: `find . -name "*.js"`, `grep -R "pattern" .` (preferuj `rg`)
- Uprawnienia (Linux/macOS): `chmod +x script.sh`
- Alias (w ~/.bashrc): `alias gs="git status"`

---
## 14) SQL – podstawy (PostgreSQL/MySQL)
- Wybór: `SELECT * FROM tabela;`
- Filtrowanie: `SELECT * FROM tabela WHERE kolumna = 'wartość';`
- Sort/limit: `SELECT * FROM tabela ORDER BY kolumna DESC LIMIT 10;`
- Insert: `INSERT INTO tabela (kol1, kol2) VALUES ('a', 123);`
- Update: `UPDATE tabela SET kol1 = 'x' WHERE id = 1;`
- Delete: `DELETE FROM tabela WHERE id = 1;`
- Join: `SELECT u.id, o.total FROM users u JOIN orders o ON o.user_id = u.id;`
- Agregacje: `SELECT status, COUNT(*) FROM orders GROUP BY status;`
- Transakcja: `BEGIN; ... COMMIT;` (lub `ROLLBACK;`)
- Indeks: `CREATE INDEX idx_orders_user ON orders(user_id);`
- Schemat (psql): `\dt`; MySQL: `SHOW TABLES; DESCRIBE tabela;`

---
## 15) Przykładowe skrypty package.json (orientacyjnie)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier . --write",
    "test": "vitest"
  }
}
```

---
## 16) Dobre praktyki pracy z terminalem
- Używaj `defer` lub `type="module"` w tagach `<script>`; unikaj blokowania renderu.
- Twórz aliasy w PowerShell/Unix dla najczęstszych komend (np. `g=git`, `gs=git status`).
- Pracuj w wirtualnych środowiskach projektowych (node_modules lokalnie, nie globalnie).
- Regularnie aktualizuj zależności, ale testuj po aktualizacji (`npm outdated`, `npm update`).
- Zawsze sprawdzaj `git status` przed commit/push; czyść zbędne pliki (npm run clean, rm dist).

---
## 17) Szybka ściąga startu projektu frontend (Vite/React)
```bash
npm create vite@latest myapp -- --template react
cd myapp
npm install
npm run dev
```

---
## 18) Szybka ściąga Next.js
```bash
npx create-next-app@latest my-next
cd my-next
npm run dev
```

---
## 19) Szybka ściąga React Native (Expo)
```bash
npx create-expo-app MyApp
cd MyApp
npx expo start
```
