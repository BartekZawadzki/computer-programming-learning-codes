// Composable useFetch dla Vue 3 (Composition API) – loading/error/refetch.
import { ref } from "vue";
import { api } from "../apiClient"; // klient API z bazowym URL

export default function useFetch(path) {
  const data = ref(null);                // dane z API
  const loading = ref(true);             // stan ładowania
  const error = ref("");                 // komunikat błędu

  async function load() {
    loading.value = true;
    error.value = "";
    try {
      const res = await api.get(path);   // GET
      data.value = res;                  // zapis danych
    } catch (e) {
      error.value = e.message || "API error"; // zapis błędu
    } finally {
      loading.value = false;             // koniec ładowania
    }
  }

  load();                                // fetch przy pierwszym wywołaniu

  return { data, loading, error, refetch: load }; // eksport stanu i refetch
}

// ---
// Dlaczego tak:
// - composable skupia logikę fetch (loading/error/data) poza komponentem, co upraszcza template.
// - refetch pozwala na manualne odświeżenie (np. przycisk).
// - ref/async/try-catch to prosty wzorzec dla małych projektów; można łatwo podmienić na axios/SWR/Query.
