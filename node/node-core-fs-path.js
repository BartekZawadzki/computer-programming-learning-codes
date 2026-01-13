// Podstawy Node.js: fs i path (synchronizacja dla prostoty demonstracji)
const fs = require("fs"); // moduł systemu plików
const path = require("path"); // moduł ścieżek

// Budowanie ścieżek niezależnych od systemu
const baseDir = __dirname; // katalog, w którym leży ten plik
const filePath = path.join(baseDir, "sample.txt"); // sample.txt w tym samym katalogu

// Zapis pliku (sync) – prosto do nauki, blokuje event loop
function writeSample(content) {
  fs.writeFileSync(filePath, content, "utf8"); // zapisuje tekst
}

// Odczyt pliku (sync)
function readSample() {
  if (!fs.existsSync(filePath)) return null; // jeśli plik nie istnieje
  return fs.readFileSync(filePath, "utf8"); // zwraca zawartość jako string
}

// Dopisywanie na końcu
function appendSample(line) {
  fs.appendFileSync(filePath, `\n${line}`, "utf8"); // dodaje nową linię
}

// Lista plików w katalogu
function listFiles(dir = baseDir) {
  return fs.readdirSync(dir); // zwraca tablicę nazw plików/katalogów
}

// Informacje o pliku
function statSample() {
  if (!fs.existsSync(filePath)) return null; // brak pliku
  const stats = fs.statSync(filePath); // metadane
  return {
    size: stats.size, // bajty
    modified: stats.mtime, // data modyfikacji
    isFile: stats.isFile(), // czy plik
  };
}

// Usunięcie pliku
function removeSample() {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // usuń
    return true;
  }
  return false;
}

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
// - fs/path to podstawowe moduły Node; przykład pokazuje najczęstsze operacje (read/write/append/readdir/stat/unlink).
// - Sync API jest prostsze do nauki; w produkcji zwykle używa się wersji async, ale zachowanie jest identyczne.
// - path.join + __dirname gwarantuje poprawne ścieżki niezależnie od systemu.
// - Eksport funkcji pozwala użyć ich w testach lub innych modułach bez duplikacji kodu.
