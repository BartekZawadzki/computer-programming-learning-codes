// Zaawansowane typy w TS: Conditional Types, Discriminated Unions, Template Literal Types,
// Partial aplikowane warunkowo, branded types (lekka nominalność).

// Discriminated Union: stan ładowania z polami specyficznymi dla wariantów
type LoadState =
  | { status: "idle" } // brak akcji
  | { status: "loading"; startedAt: number } // w trakcie
  | { status: "success"; data: string } // sukces
  | { status: "error"; error: string }; // błąd

function handleState(state: LoadState): string {
  switch (state.status) {
    case "idle": return "Nic nie robimy"; // wariant idle
    case "loading": return `Start: ${state.startedAt}`; // dostęp do startedAt
    case "success": return `Dane: ${state.data}`; // dostęp do data
    case "error": return `Błąd: ${state.error}`; // dostęp do error
    default: {
      const _exhaustive: never = state; // exhaustiveness check
      return _exhaustive;
    }
  }
}

// Conditional Types: wylicz typ rozmiaru w zależności od boolean
type SizeFlag<T extends boolean> = T extends true ? "big" : "small"; // warunkowy typ
type Big = SizeFlag<true>; // "big"
type Small = SizeFlag<false>; // "small"

// Template Literal Types: dynamiczne stringi z formatem
type Route = `/api/${string}`; // każdy string zaczynający się od /api/
const r1: Route = "/api/users"; // OK
// const r2: Route = "/auth"; // błąd: nie spełnia patternu

// Branded Types: lekkie rozróżnienie typów prymitywnych (pseudo-nominalne)
type Brand<K, T> = K & { __brand: T }; // strukturalny znacznik
type UserId = Brand<number, "UserId">; // unikalny typ UserId
type OrderId = Brand<number, "OrderId">; // unikalny typ OrderId

function asUserId(n: number): UserId { return n as UserId; } // utwórz UserId
function asOrderId(n: number): OrderId { return n as OrderId; } // utwórz OrderId

// Bezpieczeństwo: nie pomylimy UserId z OrderId
const uid: UserId = asUserId(5); // UserId
const oid: OrderId = asOrderId(7); // OrderId
// uid = oid; // błąd: różne brandy

// Conditional + infer: wyciąganie element type z tablicy
type ElementOf<T> = T extends (infer U)[] ? U : T; // jeśli tablica, zwróć element; inaczej T
type ElemNum = ElementOf<number[]>; // number
type ElemStr = ElementOf<string[]>; // string
type ElemOther = ElementOf<boolean>; // boolean (nie tablica)
