// Facade: upraszcza złożony system, wystawia prostszy interfejs.
// Przykład: kompleksowy proces "order" złożony z płatności, magazynu, wysyłki.

class PaymentService {
  pay(amount) { return `Paid ${amount}`; } // płatność
}

class InventoryService {
  reserve(productId) { return `Reserved product ${productId}`; } // rezerwacja
}

class ShippingService {
  ship(productId) { return `Shipped product ${productId}`; } // wysyłka
}

// Fasada: używa kilku serwisów, by uprościć proces
class OrderFacade {
  constructor() {
    this.payment = new PaymentService(); // serwis płatności
    this.inventory = new InventoryService(); // serwis magazynu
    this.shipping = new ShippingService(); // serwis wysyłki
  }

  placeOrder(productId, amount) {
    const steps = []; // log kroków
    steps.push(this.inventory.reserve(productId)); // rezerwacja
    steps.push(this.payment.pay(amount)); // płatność
    steps.push(this.shipping.ship(productId)); // wysyłka
    return steps; // zwróć przebieg procesu
  }
}

// Przykład użycia fasady
const orderFacade = new OrderFacade(); // tworzymy fasadę
const orderLog = orderFacade.placeOrder("ABC123", 100); // wywołanie jedną metodą

module.exports = {
  PaymentService,
  InventoryService,
  ShippingService,
  OrderFacade,
  orderFacade,
  orderLog,
};

// ---
// Dlaczego tak:
// - Fasada OrderFacade kapsułkuje trzy serwisy (płatność, magazyn, wysyłka) i wystawia jedną metodę placeOrder.
// - Klient nie musi znać kolejności kroków ani detali integracji — woła jedną metodę.
// - steps zwraca log kroków, co ułatwia debug/testy bez wchodzenia w szczegóły poszczególnych serwisów.
// - Użycie nowych instancji serwisów w konstruktorze upraszcza przykład; w realnym kodzie można je wstrzyknąć (DI) dla testowalności.
