// Generics: uogólnione funkcje/klasy, ograniczenia (constraints), keyof, mapped types (prosty przykład)

// Generyczna funkcja tożsamości (zachowuje typ wejścia)
function identity<T>(value: T): T {
  return value; // zwraca dokładnie ten typ
}
const numId = identity(5); // T = number
const strId = identity("tekst"); // T = string

// Generyczna funkcja z ograniczeniem (constraint)
interface HasId { id: number; } // wymagany kształt
function withId<T extends HasId>(obj: T): number {
  return obj.id; // wiemy, że istnieje pole id
}

// Generyczna klasa stosu
class Stack<T> {
  private items: T[] = []; // wewnętrzne dane typu T
  push(item: T): void { this.items.push(item); } // dodaj
  pop(): T | undefined { return this.items.pop(); } // zdejmij
  peek(): T | undefined { return this.items[this.items.length - 1]; } // podejrzyj
}
const numStack = new Stack<number>(); // stos liczb
numStack.push(1); numStack.push(2);

// keyof – zbiór kluczy typu obiektowego
type KeysOfUser = keyof HasId; // "id"

// Mapped type: klonuje i ustawia opcjonalność
type PartialRecord<T> = { [K in keyof T]?: T[K] }; // każde pole T staje się opcjonalne
type OptionalId = PartialRecord<HasId>; // { id?: number }

// Pick/Omit (prosty re-implement)
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }; // wybiera pola K z T
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }; // wyklucza pola K

// Infer (przykład wydobycia typu z funkcji)
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never; // jeśli T jest funkcją, zwróć typ R
type IdReturn = ReturnTypeOf<typeof identity>; // number | string | ...
