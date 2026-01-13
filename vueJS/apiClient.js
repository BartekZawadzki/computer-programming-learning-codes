// Prosty klient fetch dla Vue z bazowym URL i obsługą błędów.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api"; // baza API (Vite)

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }, // nagłówki
    ...options,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();          // parsuj
  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.error || "API error"; // opis błędu
    throw new Error(message);
  }
  return data;                                                        // zwróć dane
}

export const api = {
  get: (path) => request(path, { method: "GET" }),                    // GET
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body || {}) }), // POST
  // Dodaj PUT/PATCH/DELETE analogicznie
};

// ---
// Dlaczego tak:
// - Jedna funkcja request centralizuje nagłówki, parsowanie i obsługę błędów.
// - API_BASE z import.meta.env pozwala łatwo zmieniać endpointy (dev/prod) w Vite.
// - Ekspozycja get/post upraszcza użycie w composables/komponentach i ogranicza powtarzalność.
