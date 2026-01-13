// Asynchroniczność w TS: Promise, async/await, typowanie fetch, zrozumiałe unie wyników

// Prosta funkcja async zwracająca Promise<number>
async function asyncDouble(x: number): Promise<number> {
  return x * 2; // TS wnioskowuje Promise<number>
}

// Typowanie fetch – przykład GET zwracającego JSON określonego typu
type UserDto = { id: number; name: string }; // kontrakt danych
async function fetchUser(id: number): Promise<UserDto> {
  const res = await fetch(`https://api.example.com/users/${id}`); // żądanie HTTP
  if (!res.ok) throw new Error("HTTP error"); // walidacja statusu
  const data = (await res.json()) as UserDto; // asercja typu na JSON
  return data; // zwróć UserDto
}

// Unie wyników: sukces vs błąd (discriminated union)
type Ok<T> = { ok: true; data: T }; // wariant sukcesu
type Err = { ok: false; error: string }; // wariant błędu
type Result<T> = Ok<T> | Err; // unia wyników

async function safeFetchUser(id: number): Promise<Result<UserDto>> {
  try {
    const data = await fetchUser(id); // próba pobrania
    return { ok: true, data }; // sukces
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"; // wiadomość błędu
    return { ok: false, error: msg }; // wariant błędu
  }
}

// Równoległe pobranie wielu zasobów z Promise.all
async function fetchMany(ids: number[]): Promise<Result<UserDto>[]> {
  const tasks = ids.map((id) => safeFetchUser(id)); // promisy
  return Promise.all(tasks); // czeka na wszystkie
}
