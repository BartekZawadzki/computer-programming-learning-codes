// Hook useFetch dla React Native: loading/error/refetch, typowany.
import { useEffect, useState, useCallback } from "react";
import { api } from "./apiClient";

export default function useFetch<T>(path: string) {
  const [data, setData] = useState<T | null>(null);     // dane typowane
  const [loading, setLoading] = useState(true);         // stan ładowania
  const [error, setError] = useState("");               // komunikat błędu

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<T>(path);               // GET
      setData(res);                                     // zapis danych
    } catch (e: any) {
      setError(e.message || "API error");               // zapis błędu
    } finally {
      setLoading(false);                                // koniec ładowania
    }
  }, [path]);

  useEffect(() => {
    load();                                             // fetch przy montowaniu/zmianie path
  }, [load]);

  return { data, loading, error, refetch: load };       // zwróć stan i refetch
}

// ---
// Dlaczego tak:
// - Composable hook trzyma cykl pobierania (loading/error/data) w jednym miejscu.
// - useCallback stabilizuje load, więc efekt zależny od load nie wywoła się niepotrzebnie.
// - Zwrócony refetch umożliwia manualne ponowienie zapytania (np. przycisk Odśwież).
