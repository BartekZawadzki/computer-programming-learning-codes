// Hook useFetch: prosty fetch z obsługą loading/error i refetch.
import { useEffect, useState, useCallback } from "react";
import { api } from "./apiClient"; // klient API z bazowym URL

export default function useFetch(path) {
  const [data, setData] = useState(null);        // dane z API
  const [loading, setLoading] = useState(true);  // stan ładowania
  const [error, setError] = useState("");        // komunikat błędu

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(path);           // GET
      setData(res);
    } catch (e) {
      setError(e.message || "API error");        // zapis błędu
    } finally {
      setLoading(false);                         // koniec ładowania
    }
  }, [path]);

  useEffect(() => {
    load();                                     // fetch przy montowaniu/zmianie path
  }, [load]);

  return { data, loading, error, refetch: load }; // zwracamy dane i refetch
}

// ---
// Dlaczego tak:
// - Hook enkapsuluje cykl pobierania: loading/error/refetch, by komponenty były proste.
// - useCallback zabezpiecza load przed zbędnym tworzeniem referencji (przydaje się w zależnościach efektu).
// - Zwracamy refetch, by komponent mógł ponowić zapytanie na żądanie (np. przycisk Odśwież).
