# Multi-stage Dockerfile (Node.js app) z komentarzami.
# Etap 1: build front/back (npm install + build)
FROM node:20-alpine AS build                    # mały obraz bazowy
WORKDIR /app                                    # katalog roboczy
COPY package*.json ./                           # kopiuj pliki zależności
RUN npm ci --prefer-offline --no-audit          # instalacja zależności (powtarzalna)
COPY . .                                        # skopiuj resztę źródeł
# RUN npm test                                  # (opcjonalnie) uruchom testy
RUN npm run build                               # zbuduj aplikację (np. front/back)

# Etap 2: runtime (bez dev-deps)
FROM node:20-alpine AS runtime                  # lekki obraz uruchomieniowy
WORKDIR /app                                    # katalog roboczy
ENV NODE_ENV=production                         # zmienna środowiskowa
COPY --from=build /app/dist ./dist              # kopiuj artefakty build
COPY --from=build /app/package*.json ./         # kopiuj package files
RUN npm ci --only=production --prefer-offline   # instaluj tylko prod zależności
EXPOSE 3000                                     # odsłoń port aplikacji
CMD ["node", "dist/index.js"]                   # komenda startowa

# ---
# Dlaczego tak:
# - Multi-stage zmniejsza obraz runtime (brak devDependencies i plików źródłowych).
# - npm ci gwarantuje powtarzalne instalacje zgodne z lockfile; w runtime tylko prod deps.
# - Oddzielenie build/run ułatwia cache warstw i szybsze przebudowy.
