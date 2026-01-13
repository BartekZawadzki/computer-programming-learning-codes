// Prosty klient API (fetch) z bazowym URL i obsługą błędów.
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api"; // baza API

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }, // nagłówki
    ...options,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");  // czy JSON
  const data = isJson ? await res.json() : await res.text();                     // parsuj
  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.error || "API error"; // opis błędu
    throw new Error(message);
  }
  return data;                                                                   // zwróć dane
}

export const api = {
  get: (path) => request(path, { method: "GET" }),                               // GET
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),               // POST
  // Możesz dodać PUT/PATCH/DELETE analogicznie
};

// ---
// Dlaczego tak:
// - Wspólna funkcja request centralizuje nagłówki, parsowanie JSON i obsługę błędów.
// - API_BASE z env pozwala łatwo wskazać różne backendy (dev/prod).
// - Ekspozycja prostych metod get/post upraszcza użycie w hookach/komponentach.
