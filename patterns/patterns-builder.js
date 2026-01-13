// Builder: rozdziela tworzenie złożonego obiektu na etapy, umożliwia płynne (fluent) API.

class Car {
  constructor({ brand, model, year, color, engine }) {
    this.brand = brand; // marka
    this.model = model; // model
    this.year = year; // rok
    this.color = color; // kolor
    this.engine = engine; // silnik
  }
}

class CarBuilder {
  constructor() {
    this.reset(); // zainicjuj stan budowy
  }

  reset() {
    this.props = { brand: "Generic", model: "Base", year: 2000, color: "gray", engine: "1.0" }; // wartości domyślne
  }

  setBrand(brand) { this.props.brand = brand; return this; } // fluent API
  setModel(model) { this.props.model = model; return this; } // fluent API
  setYear(year) { this.props.year = year; return this; } // fluent API
  setColor(color) { this.props.color = color; return this; } // fluent API
  setEngine(engine) { this.props.engine = engine; return this; } // fluent API

  build() {
    const car = new Car(this.props); // twórz obiekt
    this.reset(); // opcjonalnie resetuj builder
    return car; // zwróć gotowy obiekt
  }
}

// Przykład użycia
const builder = new CarBuilder(); // instancja buildera
const myCar = builder
  .setBrand("Tesla")
  .setModel("Model 3")
  .setYear(2024)
  .setColor("blue")
  .setEngine("EV")
  .build(); // utwórz gotowe auto

module.exports = { Car, CarBuilder, builder, myCar };

// ---
// Dlaczego tak:
// - Builder rozdziela konfigurację od konstrukcji; CarBuilder trzyma stan props i tworzy Car w build().
// - Fluent API (setX zwracające this) pozwala łańcuchować wywołania i czytelnie budować obiekt.
// - Domyślne wartości w reset zapewniają spójny start i umożliwiają wielokrotne użycie buildera.
// - Przykład myCar pokazuje, jak uniknąć konstruktora z wieloma parametrami i poprawić czytelność tworzenia obiektu.
