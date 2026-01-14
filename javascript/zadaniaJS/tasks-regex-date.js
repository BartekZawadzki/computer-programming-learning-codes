// Zadania: RegExp i daty — nawiązanie do pliku js-regex-date.js.
// Dodane komentarze pomagają przećwiczyć wzorce i pracę z Date/Intl.

// 1) Walidacja e-mail — uzupełnij isEmailRegex tak, by używało regexu i test().
function isEmailRegex(text) {
  // TODO: const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return re.test(text);
}

// 2) Parsowanie daty YYYY-MM-DD — zwróć obiekt { year, month, day } lub null.
function parseDate(text) {
  // TODO: użyj match z grupami (\d{4})-(\d{2})-(\d{2}); jeśli brak dopasowania → null
}

// 3) Maskowanie e-maila — pierwsze 2 znaki + *** + domena.
function maskEmail(text) {
  // TODO: text.replace(/(.{2}).+(@.+)/, "$1***$2")
}

// 4) Zliczanie linii dopasowanych do regexu w tekście wielowierszowym.
//    Zwróć liczbę linii zaczynających się od "Line" i cyfry (Line\d).
function countLines(text) {
  // TODO: (text.match(/^Line\d/gm) || []).length
}

// 5) Różnica dni — zwróć zaokrągloną różnicę w dniach między dwiema datami Date.
function diffDays(a, b) {
  // TODO: const msPerDay = 1000*60*60*24; return Math.round((b - a)/msPerDay);
}

// 6) Walidacja obiektu Date — sprawdź instanceof i !isNaN(getTime()).
function isValidDate(d) {
  // TODO: return d instanceof Date && !Number.isNaN(d.getTime());
}

// 7) Formatowanie daty po polsku z użyciem Intl.DateTimeFormat.
function formatPl(date) {
  // TODO: const fmt = new Intl.DateTimeFormat("pl-PL", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Warsaw" });
  // TODO: return fmt.format(date);
}

// 8) Zamiana kolejności dat w tekście
//    Znajdź wszystkie wystąpienia DD/MM/YYYY i zamień na YYYY-MM-DD.
function rewriteDateFormat(text) {
  // TODO: użyj replace z regexem /(\d{2})\/(\d{2})\/(\d{4})/g i zwracaj `${year}-${month}-${day}`
}

// 9) Walidacja zakresu daty
//    Sprawdź, czy przekazana data (Date) mieści się między min a max (Date); zwróć bool.
function isInRange(date, min, max) {
  // TODO: porównaj date.getTime() z zakresem, pamiętaj o validacji isValidDate
}

// 10) Parsowanie ISO z fallbackiem
//     Spróbuj utworzyć Date z tekstu ISO; jeśli niepoprawny, zwróć null.
function parseIsoSafe(text) {
  // TODO: const d = new Date(text); return isValidDate(d) ? d : null;
}

// 11) Wyciąganie adresów URL z tekstu
//     Znajdź wszystkie http/https URL i zwróć je w tablicy (lub pustą, gdy brak).
function extractUrls(text) {
  // TODO: const re = /(https?:\/\/[^\s]+)/g; return text.match(re) || [];
}

// 12) Formatowanie względne daty ("wczoraj/dzisiaj/jutro")
//     Dla daty porównanej z now: zwróć "wczoraj", "dzisiaj", "jutro" albo sformatowaną datę PL.
function formatRelative(date, now = new Date()) {
  // TODO: użyj diffDays dla now/date (zaokrąglone do dni), obsłuż 0/-1/1, wpp formatPl(date)
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
