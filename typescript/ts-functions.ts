// Funkcje w TypeScript: typowanie parametrów, overloads, rest, this, unknown/never

// Parametry domyślne i opcjonalne
function greet(name: string = "świat", prefix?: string): string {
  const p = prefix ? `${prefix} ` : ""; // prefix opcjonalny
  return `Cześć ${p}${name}`; // zwrot string
}

// Parametry rest (dowolna liczba argumentów)
function sumAll(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0); // suma liczb
}

// Funkcja jako typ (function type alias)
type Predicate<T> = (value: T) => boolean; // typ funkcji zwracającej boolean
const isEven: Predicate<number> = (n) => n % 2 === 0; // implementacja

// Overload: różne sygnatury wejściowe, jedna implementacja
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: string | number): Array<string | number> {
  return [value]; // implementacja dla obu typów (zwraca tablicę)
}

// this w funkcji – w TS można typować kontekst this
type PersonCtx = { name: string }; // kontekst dla this
function sayHello(this: PersonCtx, shout: boolean = false): string {
  const text = `Hello ${this.name}`; // użycie this.name
  return shout ? text.toUpperCase() : text; // opcjonalny krzyk
}
const bound = sayHello.bind({ name: "Ala" }); // bindowanie kontekstu

// unknown vs any: unknown wymaga zawężenia przed użyciem
function parseJsonSafe(input: string): unknown {
  return JSON.parse(input); // typ unknown – trzeba zawęzić
}

function useParsed(value: unknown) {
  if (typeof value === "object" && value !== null && "id" in value) {
    // po sprawdzeniu możemy rzutować wąsko
    const id = (value as { id: number }).id; // asercja typu
    return id;
  }
  return null; // brak zgodności
}

// never – gdy kod nie powinien się zdarzyć (np. exhaustiveness check)
type Shape = { kind: "circle"; radius: number } | { kind: "square"; size: number };
function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2; // pole koła
    case "square": return s.size * s.size; // pole kwadratu
    default: {
      const _exhaustive: never = s; // jeśli pojawi się nowy wariant, TS zgłosi błąd
      return _exhaustive;
    }
  }
}
