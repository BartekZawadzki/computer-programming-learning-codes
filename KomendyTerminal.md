# Komendy terminalowe – skrót dla projektów i narzędzi

Zestaw podstawowych i najczęściej potrzebnych komend do pracy z repozytorium, frontendem, backendem, Dockerem oraz narzędziami JS/TS (Node, npm, React/React Native, Angular, Vue, Next, Vite) i Git. Składnia podana w stylu shell (PowerShell/Bash); na Windows możesz używać PowerShell lub wbudowanego terminala w IDE.

---
## 1) System plików (PowerShell/Bash)
- Lista plików: `ls` (PS: `ls`, CMD: `dir`); szczegóły: `ls -l` (Bash) / `ls -Force` (PS)
- Wejście do katalogu: `cd nazwa_folderu`; do home: `cd ~` (Bash) / `cd $HOME` (PS)
- W górę: `cd ..`; do root: `cd /` (Bash) / `cd \` (PS)
- Utworzenie folderu: `mkdir nazwa`; rekurencyjnie: `mkdir -p a/b/c` (Bash) / `New-Item -ItemType Directory -Force -Path a/b/c` (PS)
- Utworzenie pliku: `ni plik.txt` (PowerShell) / `touch plik.txt` (Bash)
- Kopia pliku: `cp źródło cel`; rekurencyjnie: `cp -r folder/ cel/` (Bash) / `Copy-Item -Recurse folder/ cel/` (PS)
- Przeniesienie/zmiana nazwy: `mv źródło cel`
- Usunięcie pliku: `rm plik` (uwaga na `rm -r` dla folderów); wymuszenie: `rm -f plik` (Bash) / `Remove-Item -Force plik` (PS)
- Podgląd pliku: `cat plik` (PS też `gc plik`); pierwsze linie: `head -n 20 plik` (Bash) / `Get-Content plik -Head 20` (PS); ostatnie: `tail -n 20 plik` (Bash) / `Get-Content plik -Tail 20` (PS)
- Podgląd stronicowany: `less plik` (Bash) / `more plik` (Windows/PS)
- Wyszukiwanie tekstu: `rg "fraza"` (ripgrep); alternatywa: `grep -r "fraza" .` (Bash)
- Wyszukiwanie plików: `find . -name "*.js"` (Bash) / `Get-ChildItem -Recurse -Filter "*.js"` (PS)
- Rozmiar pliku/katalogu: `du -sh folder` (Bash) / `Get-ChildItem -Recurse | Measure-Object -Property Length -Sum` (PS)
- Liczba linii/słów: `wc -l plik` (linie), `wc -w plik` (słowa) (Bash)
- Wolne miejsce: `df -h` (Bash) / `Get-PSDrive` (PS)

---
## 2) Node / npm / pnpm / yarn
- Wersja node: `node -v`; npm: `npm -v`; pnpm: `pnpm -v`; yarn: `yarn -v`
- Inicjalizacja projektu: `npm init -y` (lub interaktywnie bez `-y`)
- Instalacja zależności: `npm install` / `npm i`; tylko prod: `npm i --production`
- Instalacja paczki (prod/dev): `npm i paczka` / `npm i -D paczka`; konkretna wersja: `npm i paczka@1.2.3`
- Usunięcie paczki: `npm uninstall paczka` / `npm rm paczka`
- Uruchomienie skryptu: `npm run nazwa_scryptu` (np. `npm run dev`, `npm run build`, `npm test`)
- Lista zainstalowanych: `npm list` (lokalne) / `npm list -g` (globalne); tylko top-level: `npm list --depth=0`
- Informacje o paczce: `npm info paczka`; wersje: `npm view paczka versions`
- Wyszukiwanie: `npm search fraza`
- Sprawdź przestarzałe: `npm outdated`; aktualizuj wszystkie: `npm update` (lub `npm up`)
- Audyt bezpieczeństwa: `npm audit`; napraw: `npm audit fix`; wymuszenie: `npm audit fix --force`
- Czyszczenie cache: `npm cache clean --force`
- Globalne narzędzia (ostrożnie): `npm i -g pnpm`, `npm i -g yarn`; lista globalnych: `npm list -g --depth=0`
- pnpm: `pnpm i`, `pnpm run dev`, `pnpm add paczka`, `pnpm remove paczka`, `pnpm outdated`, `pnpm audit`
- yarn: `yarn`, `yarn dev`, `yarn add paczka`, `yarn remove paczka`, `yarn outdated`, `yarn audit`, `yarn upgrade`

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
## 8) Git (podstawy i zaawansowane)
- Status: `git status`; krótki: `git status -s`
- Dodaj pliki: `git add .` (lub wybiórczo `git add plik`); interaktywny: `git add -p`
- Commit: `git commit -m "wiadomość"`; edytuj ostatni: `git commit --amend`
- Log: `git log --oneline --graph --decorate -n 10`; wszystkie gałęzie: `git log --all --graph`
- Różnice: `git diff` (working vs staged: `git diff`, staged vs repo: `git diff --cached`, między commitami: `git diff commit1 commit2`)
- Gałęzie: `git branch` (lista), `git branch nowa-galaz` (utwórz), `git checkout -b nowa-galaz` (utwórz i przełącz), `git switch main` (przełącz), `git branch -d galaz` (usuń), `git branch -D galaz` (usuń wymuszenie)
- Merge: `git merge galaz` (scal do aktualnej); rebase: `git rebase main` (przenieś commity na wierzch main)
- Pull/Push: `git pull` (lub `git pull --rebase`), `git push`; do konkretnej gałęzi: `git push origin main`; pierwszy push: `git push -u origin main`
- Force push (ostrożnie): `git push --force-with-lease` (bezpieczniejsze niż `--force`)
- Stash: `git stash` (zapisz zmiany), `git stash pop` (przywróć i usuń), `git stash list` (lista), `git stash apply` (przywróć bez usuwania), `git stash drop` (usuń)
- Reset: `git reset --soft HEAD~1` (cofnij commit, zostaw zmiany staged), `git reset --mixed HEAD~1` (cofnij commit i unstage, zostaw w working), `git reset --hard HEAD~1` (cofnij commit i usuń zmiany)
- Clone: `git clone https://github.com/user/repo.git`; z SSH: `git clone git@github.com:user/repo.git`
- Remote: `git remote -v` (lista), `git remote add origin url`, `git remote remove origin`, `git remote set-url origin nowy-url`
- Fetch: `git fetch` (pobierz zmiany bez merge), `git fetch origin main` (konkretna gałąź)
- Tag: `git tag v1.0.0` (utwórz), `git tag -a v1.0.0 -m "Wersja 1.0.0"` (annotated), `git push origin v1.0.0` (wyślij tag)
- Cherry-pick: `git cherry-pick commit-hash` (przenieś konkretny commit)
- Reflog: `git reflog` (historia wszystkich operacji, pomocne przy odzyskiwaniu)

---
## 9) Docker / docker-compose
- Build obrazu: `docker build -t nazwa:tag .`; z Dockerfile: `docker build -f Dockerfile.dev -t nazwa:tag .`
- Lista kontenerów: `docker ps` (aktywne), `docker ps -a` (wszystkie)
- Lista obrazów: `docker images`; przestrzeń: `docker system df`
- Uruchom obraz: `docker run -p 3000:3000 nazwa:tag`; w tle: `docker run -d -p 3000:3000 nazwa:tag`; z env: `docker run -e PORT=3000 -p 3000:3000 nazwa:tag`; z volume: `docker run -v $(pwd):/app nazwa:tag`
- Zatrzymaj/usuń kontener: `docker stop id` / `docker rm id`; wymuszenie: `docker rm -f id`
- Logi: `docker logs id`; śledzenie: `docker logs -f id`; ostatnie N linii: `docker logs --tail 50 id`
- Wykonaj komendę w kontenerze: `docker exec -it id /bin/bash` (lub `/bin/sh`); jednorazowa: `docker exec id ls`
- Restart: `docker restart id`
- Przerwij build: `Ctrl+C`; wymuś: `docker kill id`
- Czyszczenie: `docker system prune` (nieużywane), `docker system prune -a` (wszystko), `docker volume prune` (wolumeny), `docker image prune` (obrazy)
- docker-compose: `docker-compose up -d` (w tle), `docker-compose up` (foreground), `docker-compose down` (zatrzymaj i usuń), `docker-compose logs -f` (logi), `docker-compose ps` (status), `docker-compose build` (rebuild), `docker-compose restart` (restart), `docker-compose exec service bash` (wejście do serwisu)
- Network: `docker network ls` (lista), `docker network create nazwa`, `docker network inspect nazwa`
- Volume: `docker volume ls` (lista), `docker volume create nazwa`, `docker volume inspect nazwa`

---
## 10) Narzędzia pomocnicze (Windows / ogólne)
- Otwórz VS Code w katalogu: `code .`
- Sprawdź porty (PowerShell): `Get-NetTCPConnection -State Listen | ? { $_.LocalPort -eq 3000 }`
- Czyszczenie npm cache: `npm cache clean --force`
- Aktualizacja paczki: `npm update paczka`
- Global PATH info: `where node` (CMD) / `Get-Command node` (PS)

---
## 11) Wyszukiwanie i podgląd (dev)
- Szukaj tekstu w repo: `rg "pattern"`; z kontekstem: `rg "pattern" -C 3`; tylko nazwy plików: `rg -l "pattern"`; case-insensitive: `rg -i "pattern"`
- Alternatywa grep: `grep -r "pattern" .`; z kontekstem: `grep -r -C 3 "pattern" .`; tylko nazwy: `grep -r -l "pattern" .`
- Szybki serwer plików statycznych (Python): `python -m http.server 8000` (jeśli Python dostępny); Python 3: `python3 -m http.server 8000`
- Przetwarzanie tekstu: `awk '{print $1}' plik` (kolumna), `sed 's/stary/nowy/g' plik` (zamiana), `cut -d',' -f1 plik` (wycięcie kolumny), `sort plik` (sortowanie), `uniq plik` (unikalne linie)

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

---

## 20) Zarządzanie procesami
- Lista procesów: `ps aux` (Linux/macOS) / `Get-Process` (PS) / `tasklist` (CMD)
- Szukaj procesu: `ps aux | grep node` (Bash) / `Get-Process | ? { $_.ProcessName -like "*node*" }` (PS)
- Zabij proces: `kill PID` (Bash) / `Stop-Process -Id PID` (PS); wymuszenie: `kill -9 PID` (Bash) / `Stop-Process -Id PID -Force` (PS)
- Zabij po nazwie: `killall node` (Linux/macOS) / `Get-Process node | Stop-Process` (PS)
- Monitorowanie: `top` (Linux/macOS) / `Get-Process | Sort-Object CPU -Descending | Select-Object -First 10` (PS); interaktywny: `htop` (jeśli zainstalowany)
- Port w użyciu: `lsof -i :3000` (macOS/Linux) / `netstat -ano | findstr :3000` (Windows) / `Get-NetTCPConnection -LocalPort 3000` (PS)

---

## 21) Archiwizacja i kompresja
- Tar (Linux/macOS): `tar -czf archiwum.tar.gz folder/` (utwórz), `tar -xzf archiwum.tar.gz` (rozpakuj), `tar -tzf archiwum.tar.gz` (lista)
- Zip: `zip -r archiwum.zip folder/` (utwórz), `unzip archiwum.zip` (rozpakuj), `unzip -l archiwum.zip` (lista)
- Gzip: `gzip plik` (kompresuj), `gunzip plik.gz` (dekompresuj)
- PowerShell: `Compress-Archive -Path folder/ -DestinationPath archiwum.zip` (utwórz), `Expand-Archive -Path archiwum.zip -DestinationPath ./` (rozpakuj)

---

## 22) Sieć i HTTP
- Ping: `ping google.com` (Windows: `ping -n 4 google.com`, Linux/macOS: `ping -c 4 google.com`)
- Curl: `curl https://api.example.com/data` (GET), `curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' url` (POST), `curl -O url` (pobierz plik), `curl -L url` (follow redirects)
- Wget: `wget url` (pobierz), `wget -r url` (rekurencyjnie), `wget -O nazwa.txt url` (zapisz jako)
- Netstat: `netstat -an | grep LISTEN` (Linux/macOS) / `netstat -ano | findstr LISTENING` (Windows)
- SS (Linux): `ss -tulpn` (porty TCP/UDP), `ss -tulpn | grep :3000` (konkretny port)

---

## 23) SQL – rozszerzone (PostgreSQL/MySQL)
- Tworzenie tabeli: `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(255) UNIQUE);`
- Alter tabeli: `ALTER TABLE users ADD COLUMN age INT;`, `ALTER TABLE users DROP COLUMN age;`, `ALTER TABLE users RENAME COLUMN name TO full_name;`
- Usuwanie: `DROP TABLE users;` (ostrożnie!), `TRUNCATE TABLE users;` (usuń dane, zostaw strukturę)
- Indeksy: `CREATE INDEX idx_users_email ON users(email);`, `CREATE UNIQUE INDEX idx_users_email ON users(email);`, `DROP INDEX idx_users_email;`
- Ograniczenia: `ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);`, `ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles(id);`
- Widoki: `CREATE VIEW active_users AS SELECT * FROM users WHERE active = true;`, `DROP VIEW active_users;`
- Procedury (MySQL): `CREATE PROCEDURE get_user(IN user_id INT) BEGIN SELECT * FROM users WHERE id = user_id; END;`
- Funkcje (PostgreSQL): `CREATE FUNCTION get_user_count() RETURNS INT AS $$ SELECT COUNT(*) FROM users; $$ LANGUAGE sql;`
- Backup (PostgreSQL): `pg_dump -U user -d database > backup.sql`; restore: `psql -U user -d database < backup.sql`
- Backup (MySQL): `mysqldump -u user -p database > backup.sql`; restore: `mysql -u user -p database < backup.sql`

---

## 24) Praca z bazami danych (CLI)
- PostgreSQL (psql): `psql -U user -d database` (połącz), `\dt` (tabele), `\d tabela` (struktura), `\l` (bazy), `\q` (wyjście), `\c database` (przełącz bazę)
- MySQL: `mysql -u user -p database` (połącz), `SHOW TABLES;`, `DESCRIBE tabela;`, `SHOW DATABASES;`, `USE database;`, `EXIT;`
- MongoDB (mongosh): `mongosh` (połącz), `show dbs`, `use database`, `show collections`, `db.collection.find()`, `exit`

---

## 25) Historia i aliasy
- Historia (Bash): `history` (lista), `history | grep "git"` (szukaj), `!123` (wykonaj komendę #123), `!!` (ostatnia komenda), `Ctrl+R` (reverse search)
- Historia (PowerShell): `Get-History`, `Invoke-History -Id 5` (wykonaj #5), `Ctrl+R` (reverse search)
- Aliasy (Bash, w ~/.bashrc lub ~/.zshrc): `alias ll='ls -alF'`, `alias gs='git status'`, `alias gco='git checkout'`, `alias ..='cd ..'`
- Aliasy (PowerShell, w $PROFILE): `Set-Alias ll Get-ChildItem`, `function gs { git status }`, `function .. { Set-Location .. }`
- Eksport aliasów: `source ~/.bashrc` (Bash) / `. $PROFILE` (PS) po edycji

---

## 26) Uprawnienia (Linux/macOS)
- Zmiana uprawnień: `chmod 755 plik` (rwxr-xr-x), `chmod +x script.sh` (dodaj execute), `chmod -w plik` (usuń write)
- Zmiana właściciela: `chown user:group plik`, `chown -R user:group folder/` (rekurencyjnie)
- Sudo: `sudo komenda` (wykonaj jako root), `sudo su` (przełącz na root), `sudo -u user komenda` (jako inny użytkownik)

---

## 27) Linki symboliczne
- Utwórz link: `ln -s /ścieżka/do/pliku link` (symboliczny), `ln /ścieżka/do/pliku link` (hard link)
- Lista linków: `ls -la | grep "^l"` (pokazuje linki)
- Usuń link: `rm link` (usuwa tylko link, nie plik źródłowy)

---

## 28) Zmienne środowiskowe (szczegółowo)
- Ustaw (Bash): `export VAR=wartość` (sesja), `VAR=wartość komenda` (jedna komenda), w pliku: dodaj do `~/.bashrc` lub `~/.zshrc`
- Ustaw (PowerShell): `$env:VAR = "wartość"` (sesja), `$env:VAR = "wartość"; komenda` (jedna komenda), trwale: `[Environment]::SetEnvironmentVariable("VAR", "wartość", "User")`
- Wyświetl: `echo $VAR` (Bash) / `echo $env:VAR` (PS) / `$VAR` (PS)
- Lista wszystkich: `env` (Bash) / `Get-ChildItem Env:` (PS)
- Usuń: `unset VAR` (Bash) / `Remove-Item Env:\VAR` (PS)
- Plik .env: użyj `dotenv` (npm: `npm i dotenv`) lub `source .env` (Bash) / `Get-Content .env | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process") } }` (PS)

---

## 29) SSH i klucze
- Połącz: `ssh user@host` (port domyślny 22), `ssh -p 2222 user@host` (niestandardowy port)
- Generuj klucz: `ssh-keygen -t ed25519 -C "email@example.com"` (nowoczesny), `ssh-keygen -t rsa -b 4096` (RSA)
- Skopiuj klucz: `ssh-copy-id user@host` (Linux/macOS) / ręcznie: `cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"`
- Konfiguracja SSH: edytuj `~/.ssh/config`:
  ```
  Host alias
    HostName host.example.com
    User username
    Port 2222
    IdentityFile ~/.ssh/id_rsa
  ```
- Test połączenia: `ssh -T git@github.com` (dla GitHub)

---

## 30) Monitorowanie i diagnostyka
- Użycie dysku: `du -sh *` (rozmiary katalogów), `df -h` (wolne miejsce)
- Użycie pamięci: `free -h` (Linux) / `vm_stat` (macOS) / `Get-Counter '\Memory\Available MBytes'` (PS)
- Użycie CPU: `top` (Linux/macOS) / `Get-Counter '\Processor(_Total)\% Processor Time'` (PS)
- I/O: `iotop` (Linux, jeśli zainstalowany) / `Get-Counter '\PhysicalDisk(_Total)\Disk Reads/sec'` (PS)
- Procesy Node: `ps aux | grep node` (Bash) / `Get-Process node` (PS)
- Porty i połączenia: `netstat -tulpn` (Linux) / `netstat -ano` (Windows) / `Get-NetTCPConnection` (PS)
