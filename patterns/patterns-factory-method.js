// Factory Method: klasa bazowa definiuje metodę tworzącą obiekty, podklasy dostarczają konkretne produkty.

// Interfejs transportu (produkt)
class Transport {
  deliver() { throw new Error("deliver not implemented"); } // metoda abstrakcyjna
}

// Konkretne produkty
class Truck extends Transport {
  deliver() { return "Truck delivers by road"; } // implementacja dostawy
}

class Ship extends Transport {
  deliver() { return "Ship delivers by sea"; } // implementacja dostawy
}

// Twórca bazowy: definiuje szkielet createTransport (hook dla podklas)
class Logistics {
  planDelivery() {
    const transport = this.createTransport(); // wywołanie factory method
    return transport.deliver(); // użycie produktu
  }
  // factory method (abstrakcyjna)
  createTransport() { throw new Error("createTransport not implemented"); }
}

// Konkretni twórcy: dostarczają konkretny produkt
class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); } // tworzy Truck
}

class SeaLogistics extends Logistics {
  createTransport() { return new Ship(); } // tworzy Ship
}

// Przykład użycia
const road = new RoadLogistics();
const sea = new SeaLogistics();

module.exports = {
  Transport,
  Truck,
  Ship,
  Logistics,
  RoadLogistics,
  SeaLogistics,
  road,
  sea,
};

// ---
// Dlaczego tak:
// - Logistics definiuje wspólny szkielet (planDelivery) i factory method createTransport, którą implementują podklasy.
// - RoadLogistics/SeaLogistics zwracają odpowiednie produkty (Truck/Ship), co umożliwia rozszerzanie bez zmiany kodu bazowego.
// - Produkty implementują wspólny interfejs deliver, więc kod klienta używa ich polimorficznie.
// - Przykłady road/sea pokazują, jak różne konfiguracje zwracają różne środki transportu bez if-else w kodzie klienta.
