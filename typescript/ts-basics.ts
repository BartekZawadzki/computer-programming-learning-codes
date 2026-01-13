// Podstawy TypeScript: typowanie prymitywów, unie, typy literalne, krotki, enum, type aliasy

// Prymitywy i adnotacje typów
const username: string = "Ala"; // jawny typ string
let age: number = 28; // jawny typ number
let isActive: boolean = true; // jawny typ boolean
let nothingHere: null = null; // null
let maybeLater: undefined = undefined; // undefined

// Typ any (unikać) vs unknown (bezpieczniejszy)
let anything: any = 123; // any wyłącza sprawdzanie typów
let safeUnknown: unknown = "tekst"; // unknown wymaga sprawdzenia przed użyciem
if (typeof safeUnknown === "string") {
  const upper = safeUnknown.toUpperCase(); // po zawężeniu działa
}

// Unie (union) i typy literalne
type Status = "pending" | "success" | "error"; // literały stringowe
let state: Status = "pending"; // tylko te trzy wartości
state = "success"; // OK
// state = "idle"; // błąd: nie w unii

// Type alias – własna nazwa złożonego typu
type User = { id: number; name: string; email?: string }; // email opcjonalny
const u1: User = { id: 1, name: "Ala" }; // email pominięty (opcjonalny)

// Tuple (krotka) – ustalona liczba i typ elementów
const point: [number, number] = [10, 20]; // x, y
const httpEntry: [number, string] = [200, "OK"]; // kod, opis

// Enum – zbiór nazwanych stałych (lepiej preferować unie literalne)
enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}
const currentRole: Role = Role.Admin; // użycie enum

// Funkcja z parametrami typowanymi i typem zwracanym
function add(a: number, b: number): number {
  return a + b; // zwraca liczbę
}

// Funkcja ze zwracaniem void (brak wartości)
function log(message: string): void {
  console.log(message); // efekt uboczny, brak zwrotu
}

// Typ never: funkcja, która nie zwraca (rzuca błąd lub pętla nieskończona)
function fail(msg: string): never {
  throw new Error(msg); // zawsze rzuca
}

// Type narrowing (zawężanie) – przykład z unią number | string
function stringify(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2); // po zawężeniu do number
  }
  return value.toUpperCase(); // po zawężeniu do string
}
