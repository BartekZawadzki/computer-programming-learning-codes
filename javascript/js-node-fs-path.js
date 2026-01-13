// Przykłady Node.js: praca z plikami i ścieżkami (synchronizacja dla uproszczenia)
const fs = require("fs"); // moduł systemu plików
const path = require("path"); // narzędzia do ścieżek

// Budowanie ścieżek niezależnych od systemu
const baseDir = __dirname; // katalog, w którym leży plik
const filePath = path.join(baseDir, "sample.txt"); // łączy fragmenty z separatorami

// Zapis pliku (synchronizacja – blokuje wątek, ale proste do nauki)
function writeSample(content) {
  fs.writeFileSync(filePath, content, "utf8"); // zapisuje tekst do pliku
}

// Odczyt pliku
function readSample() {
  if (!fs.existsSync(filePath)) return null; // sprawdza istnienie
  const data = fs.readFileSync(filePath, "utf8"); // zwraca zawartość
  return data; // tekst pliku
}

// Dodanie na końcu pliku
function appendSample(line) {
  fs.appendFileSync(filePath, `\n${line}`, "utf8"); // dopisuje nową linię
}

// Lista plików w katalogu
function listFiles(dir = baseDir) {
  return fs.readdirSync(dir); // zwraca tablicę nazw plików/katalogów
}

// Informacje o pliku
function statSample() {
  if (!fs.existsSync(filePath)) return null; // gdy nie istnieje
  const stats = fs.statSync(filePath); // metadane pliku
  return {
    size: stats.size, // rozmiar w bajtach
    modified: stats.mtime, // data modyfikacji
    isFile: stats.isFile(), // czy plik
  };
}

// Usunięcie pliku
function removeSample() {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // usuwa plik
    return true; // sukces
  }
  return false; // brak pliku
}

// Eksport funkcji i ścieżek do ćwiczeń
module.exports = {
  baseDir,
  filePath,
  writeSample,
  readSample,
  appendSample,
  listFiles,
  statSample,
  removeSample,
};

// ---
// Dlaczego tak:
// - Plik demonstruje podstawowe operacje fs/path w Node: zapis, odczyt, append, listowanie, stat, usuwanie.
// - path.join + __dirname zapewniają poprawne ścieżki niezależnie od systemu operacyjnego.
// - Wersje synchroniczne są krótkie i czytelne edukacyjnie; w produkcji zwykle używa się async API.
// - Guards na existsSync przed read/stat/remove zapobiegają błędom przy pracy na nieistniejącym pliku.
