// Utility Types: Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Parameters

interface User {
  id: number; // identyfikator
  name: string; // imię
  email?: string; // email opcjonalny
}

// Partial – wszystkie pola opcjonalne
type UserPatch = Partial<User>; // { id?: number; name?: string; email?: string }

// Required – wszystkie pola wymagane
type UserRequired = Required<User>; // email staje się wymagany

// Readonly – pola tylko do odczytu
type UserReadonly = Readonly<User>; // brak możliwości nadpisania pól

// Pick – wybiera część pól
type UserPublic = Pick<User, "id" | "name">; // tylko id i name

// Omit – wyklucza pola
type UserNoEmail = Omit<User, "email">; // usuwa email

// Record – mapa klucz → wartość
type UserMap = Record<string, User>; // obiekt z dowolnymi kluczami string, wartości typu User

// ReturnType – typ zwracany funkcji
function makeUser(id: number, name: string) {
  return { id, name }; // zwraca obiekt
}
type MakeUserReturn = ReturnType<typeof makeUser>; // { id: number; name: string }

// Parameters – krotka typów parametrów funkcji
type MakeUserParams = Parameters<typeof makeUser>; // [number, string]
