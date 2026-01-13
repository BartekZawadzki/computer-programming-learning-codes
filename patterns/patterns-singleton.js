// Singleton: jedna instancja w aplikacji, ukryty konstruktor, globalny punkt dostępu.
// Uwaga: w Node moduły są cache’owane, więc prosty eksport obiektu często wystarcza.

class ConfigSingleton {
  // prywatna statyczna instancja
  static #instance = null; // trzyma jedyny obiekt

  constructor(options = {}) {
    if (ConfigSingleton.#instance) {
      return ConfigSingleton.#instance; // zwróć istniejącą instancję
    }
    this.options = options; // ustawienia
    ConfigSingleton.#instance = this; // zapisz instancję
  }

  set(key, value) {
    this.options[key] = value; // ustaw opcję
  }

  get(key) {
    return this.options[key]; // pobierz opcję
  }
}

// Przykład użycia: new ConfigSingleton({ env: "dev" }) zwróci jedną instancję
const configA = new ConfigSingleton({ env: "dev" }); // pierwsze utworzenie
const configB = new ConfigSingleton(); // zwraca tę samą instancję
configB.set("featureX", true); // modyfikacja przez drugą referencję

module.exports = { ConfigSingleton, configA, configB };

// ---
// Dlaczego tak:
// - Prywatne pole statyczne #instance wymusza jedną instancję klasy i zwracanie jej przy kolejnych konstruktorach.
// - new ConfigSingleton zwraca tę samą instancję niezależnie od miejsca wywołania, co pokazują configA/configB.
// - Metody set/get ilustrują centralne przechowywanie konfiguracji; w Node często wystarczy cache modułu, ale tu pokazujemy klasyczną formę.
