// Główny komponent React z komentarzami: stan, efekt, fetch danych, komponenty podrzędne.
import { useState, useEffect } from "react";
import { api } from "./apiClient";     // klient API z bazowym URL
import useFetch from "./useFetch";     // przykładowy hook fetch

export default function App() {
  const [count, setCount] = useState(0);               // prosty stan licznika
  const { data: users, loading, error, refetch } = useFetch("/users"); // fetch użytkowników

  // Przykład efektu – loguje przy zmianie count
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <main className="app">
      <h1>React – przykładowa aplikacja</h1>
      <p>Stan, efekt, hook useFetch, klient API.</p>

      <section className="card">
        <h2>Licznik (local state)</h2>
        <div className="counter">
          <button onClick={() => setCount((c) => c - 1)}>-</button>
          <span>{count}</span>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
        </div>
      </section>

      <section className="card">
        <h2>Użytkownicy (fetch)</h2>
        {loading && <p>Ładowanie...</p>}
        {error && <p className="error">Błąd: {error}</p>}
        {!loading && !error && (
          <ul>
            {(users || []).map((u) => (
              <li key={u.id}>
                <strong>{u.name}</strong> – {u.email}
              </li>
            ))}
          </ul>
        )}
        <button onClick={refetch} disabled={loading}>Odśwież</button>
      </section>

      <section className="card">
        <h2>Wywołanie ręczne klienta API</h2>
        <button
          onClick={async () => {
            try {
              const res = await api.get("/health");       // GET /health
              alert(`Health: ${JSON.stringify(res)}`);    // pokaż wynik
            } catch (e) {
              alert("Błąd API: " + e.message);            // pokaż błąd
            }
          }}
        >
          Sprawdź /health
        </button>
      </section>
    </main>
  );
}

// ---
// Dlaczego tak:
// - useState do lokalnego stanu licznika; useEffect pokazuje przykład reakcji na zmianę stanu.
// - useFetch kapsułkuje logikę pobierania (loading/error/refetch), dzięki czemu UI jest prostszy.
// - api.get w przycisku demonstruje ręczne wywołanie endpointu (np. healthcheck).
// - Sekcje/cardy rozdzielają funkcjonalności, co ułatwia dalszą rozbudowę (np. routing lub kontekst).
