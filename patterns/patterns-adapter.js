// Adapter: dopasowuje interfejs klasy do oczekiwań klienta bez zmiany oryginalnej klasy.

// Oryginalna klasa (legacy) – ma metodę request(), ale klient chce specjalny format
class OldApi {
  request() { return "old-result"; } // zwraca string
}

// Nowy interfejs, którego oczekuje klient (metoda fetchData z obiektem)
class NewApiAdapter {
  constructor(oldApi) {
    this.oldApi = oldApi; // przechowuje instancję starego API
  }

  fetchData() {
    const result = this.oldApi.request(); // używa starej metody
    return { data: result }; // zwraca w nowym formacie
  }
}

// Przykład użycia: klient korzysta z newApiAdapter.fetchData()
const legacy = new OldApi(); // stara implementacja
const adapter = new NewApiAdapter(legacy); // adapter
const data = adapter.fetchData(); // wynik w nowym formacie { data: "old-result" }

module.exports = { OldApi, NewApiAdapter, legacy, adapter, data };

// ---
// Dlaczego tak:
// - Adapter owija OldApi i wystawia metodę fetchData w formacie oczekiwanym przez nowy kod.
// - Dzięki temu nie trzeba modyfikować klasy legacy, a klienci dostają wynik jako obiekt { data }.
// - Konstruktor wymaga instancji oldApi, więc można wstrzykiwać różne implementacje bez zmian w kliencie.
// - Przykład data pokazuje, jak translacja z request() na fetchData() usuwa konieczność zmian w kodzie konsumentów.
