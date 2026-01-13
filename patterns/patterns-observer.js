// Observer (Publish/Subscribe): obiekty (obserwatorzy) subskrybują zdarzenia emitowane przez subject.

class Subject {
  constructor() {
    this.observers = new Set(); // zbiór obserwatorów
  }

  subscribe(fn) {
    this.observers.add(fn); // dodaj obserwatora
  }

  unsubscribe(fn) {
    this.observers.delete(fn); // usuń obserwatora
  }

  notify(payload) {
    for (const fn of this.observers) fn(payload); // powiadom wszystkich
  }
}

// Przykład: magazyn stanu, który powiadamia o zmianach
class Store extends Subject {
  constructor(initial = {}) {
    super();
    this.state = initial; // stan aplikacji
  }

  set(key, value) {
    this.state[key] = value; // aktualizacja stanu
    this.notify({ key, value, state: { ...this.state } }); // powiadom obserwatorów
  }
}

const store = new Store({ theme: "light" }); // instancja
const logger = (payload) => console.log("obserwator:", payload); // obserwator-loger
store.subscribe(logger); // subskrypcja
store.set("theme", "dark"); // zmiana, wywoła logger

module.exports = { Subject, Store, store, logger };

// ---
// Dlaczego tak:
// - Subject utrzymuje listę obserwatorów i powiadamia ich przez notify, co oddziela emiter od reakcji.
// - Store dziedziczy Subject, a przy set aktualizuje stan i wysyła payload z kopią stanu.
// - subscribe/unsubscribe pozwalają dynamicznie dodawać/usuwać obserwatorów bez zmiany logiki nadawcy.
// - Przykład logger pokazuje, jak łatwo podpiąć reaktywne logowanie/aktualizację UI do zmian stanu.
