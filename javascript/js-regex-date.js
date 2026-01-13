// Podstawy RegExp: testowanie wzorca
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // prosty wzorzec e-mail
const isEmail = (text) => emailRegex.test(text); // true/false dla dopasowania

// Grupowanie i wyłuskiwanie (match)
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/; // grupy rok-miesiąc-dzień
function parseDate(text) {
  const match = text.match(dateRegex); // wynik lub null
  if (!match) return null; // brak dopasowania
  const [, year, month, day] = match; // destrukturyzacja grup
  return { year, month, day }; // obiekt z częściami
}

// Zamiana (replace) – maskowanie danych
function maskEmail(text) {
  return text.replace(/(.{2}).+(@.+)/, "$1***$2"); // zachowaj 2 znaki + domenę
}

// Flagi RegExp: g (global), i (ignore case), m (multiline)
const multiLine = `Line1
Line2
Line3`; // tekst wielowierszowy
const lineCount = (multiLine.match(/^Line\d/gm) || []).length; // 3

// Date: tworzenie i parsowanie
const now = new Date(); // aktualna data/czas
const fromIso = new Date("2024-05-17T10:00:00Z"); // z ISO 8601
const fromParts = new Date(2024, 4, 17, 12, 30); // rok, miesiąc(0-11), dzień, godz, min

// Pobieranie składowych daty
const year = now.getFullYear(); // np. 2026
const month = now.getMonth() + 1; // 1-12 (dodaj 1)
const day = now.getDate(); // 1-31

// Formatowanie daty Intl.DateTimeFormat
const formatPl = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "long", // styl daty
  timeStyle: "short", // styl czasu
  timeZone: "Europe/Warsaw", // strefa czasowa
});
const pretty = formatPl.format(now); // np. "13 stycznia 2026, 12:34"

// Różnica czasu w ms i dniach
function diffDays(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24; // ms w dniu
  return Math.round((b - a) / msPerDay); // zaokrąglona różnica dni
}

// Walidacja daty (sprawdzenie poprawności obiektu Date)
function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d.getTime()); // true gdy data OK
}

// Eksporty do ćwiczeń
module.exports = {
  isEmail,
  parseDate,
  maskEmail,
  lineCount,
  now,
  fromIso,
  fromParts,
  year,
  month,
  day,
  pretty,
  diffDays,
  isValidDate,
};

// ---
// Dlaczego tak:
// - Plik łączy podstawowe operacje RegExp (test/match/replace z grupami) z przykładami pracy na Datach w JS.
// - parseDate pokazuje grupy przechwytujące i destrukturyzację dopasowania, a maskEmail demonstruje proste anonimizowanie.
// - Intl.DateTimeFormat służy do czytelnego formatowania w strefie PL, a diffDays/isValidDate ilustrują obliczenia i walidację dat.
// - Eksporty ułatwiają użycie/ćwiczenia w testach lub konsoli bez kopiowania kodu. 
