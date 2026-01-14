// Przykładowe rozwiązania zadań RegExp i dat z pliku tasks-regex-date.js.
// Każda linia ma krótki komentarz wyjaśniający logikę.

function isEmailRegex(text) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // prosty wzorzec e-mail
  return re.test(text); // test dopasowania
}

function parseDate(text) {
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/); // grupy roku/miesiąca/dnia
  if (!match) return null; // brak dopasowania
  const [, year, month, day] = match; // destrukturyzacja grup
  return { year, month, day }; // zwrot obiektu
}

function maskEmail(text) {
  return text.replace(/(.{2}).+(@.+)/, "$1***$2"); // zamiana środkowej części na ***
}

function countLines(text) {
  return (text.match(/^Line\d/gm) || []).length; // zlicza linie zaczynające się od Line + cyfra
}

function diffDays(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24; // liczba ms w dniu
  return Math.round((b - a) / msPerDay); // różnica zaokrąglona do dni
}

function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d.getTime()); // sprawdza typ i poprawność czasu
}

function formatPl(date) {
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }); // formatter PL
  return fmt.format(date); // zwrot sformatowanej daty
}

function rewriteDateFormat(text) {
  return text.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, (_, d, m, y) => `${y}-${m}-${d}`); // zamiana DD/MM/YYYY na YYYY-MM-DD
}

function isInRange(date, min, max) {
  if (!isValidDate(date) || !isValidDate(min) || !isValidDate(max)) return false; // walidacja
  const t = date.getTime(); // czas badanego dnia
  return t >= min.getTime() && t <= max.getTime(); // sprawdzenie przedziału
}

function parseIsoSafe(text) {
  const d = new Date(text); // próba parsowania ISO
  return isValidDate(d) ? d : null; // zwrot daty lub null
}

// Dodatkowe zadanie A: wyciąganie URL-i z tekstu.
function extractUrls(text) {
  const re = /(https?:\/\/[^\s]+)/g; // wzorzec adresu http/https
  return text.match(re) || []; // zwrot tablicy dopasowań lub pustej
}

// Dodatkowe zadanie B: formatowanie "wczoraj/dzisiaj/jutro" lub pełna data.
function formatRelative(date, now = new Date()) {
  const diff = diffDays(new Date(now.toDateString()), new Date(date.toDateString())); // różnica dni w lokalnej strefie
  if (diff === 0) return "dzisiaj"; // ten sam dzień
  if (diff === -1) return "wczoraj"; // wczoraj
  if (diff === 1) return "jutro"; // jutro
  return formatPl(date); // fallback do pełnej daty
}

module.exports = {
  isEmailRegex,
  parseDate,
  maskEmail,
  countLines,
  diffDays,
  isValidDate,
  formatPl,
  rewriteDateFormat,
  isInRange,
  parseIsoSafe,
  extractUrls,
  formatRelative,
};
