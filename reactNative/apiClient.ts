// Prosty klient fetch dla React Native z bazowym URL i obsługą błędów.
const API_BASE = process.env.API_URL || "http://localhost:4000/api"; // baza API (dostosuj)

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(API_BASE + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }, // nagłówki
    ...options,
  });
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json"); // sprawdź typ
  const data = isJson ? await res.json() : ((await res.text()) as any); // parsowanie
  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.error || "API error"; // opis błędu
    throw new Error(message);
  }
  return data as T; // zwróć dane typowane
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),             // GET
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body || {}) }),  // POST
  // Możesz dodać PUT/PATCH/DELETE analogicznie
};

// ---
// Dlaczego tak:
// - Wspólna funkcja request centralizuje nagłówki, parsowanie JSON i obsługę błędów.
// - API_BASE z env pozwala łatwo przełączać backend (dev/prod/emulator).
// - Typowanie generyczne (request<T>) ułatwia uzyskanie IntelliSense i bezpieczeństwa typów w hookach/komponentach.
