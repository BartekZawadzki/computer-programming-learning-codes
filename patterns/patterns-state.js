// State: obiekt zmienia zachowanie w zależności od wewnętrznego stanu (obiekty stanu).

// Interfejs stanu
class State {
  handle(ctx) { throw new Error("handle not implemented"); } // akcja stanu
}

// Konkretne stany
class LockedState extends State {
  handle(ctx) {
    ctx.setState(new UnlockedState()); // zmień stan na odblokowany
    return "Door unlocked"; // wynik akcji
  }
}

class UnlockedState extends State {
  handle(ctx) {
    ctx.setState(new LockedState()); // zmień stan na zablokowany
    return "Door locked"; // wynik akcji
  }
}

// Kontekst: deleguje do aktualnego stanu
class DoorContext {
  constructor() { this.state = new LockedState(); } // start: zamknięte
  setState(state) { this.state = state; } // ustaw aktualny stan
  pressButton() { return this.state.handle(this); } // akcja wyzwalana przez klienta
}

// Przykład użycia
const door = new DoorContext(); // drzwi
const first = door.pressButton(); // "Door unlocked"
const second = door.pressButton(); // "Door locked"

module.exports = {
  State,
  LockedState,
  UnlockedState,
  DoorContext,
  door,
  first,
  second,
};

// ---
// Dlaczego tak:
// - Wzorzec State przenosi logikę przejść do obiektów stanów (LockedState/UnlockedState) zamiast if-else w kontekście.
// - DoorContext deleguje pressButton do bieżącego stanu, a setState pozwala stanowi ustawić następny stan.
// - Każdy stan zwraca wynik działania, więc kontekst nie zna szczegółów, tylko zwraca rezultat.
// - Przykład pokazuje przełączanie blokady drzwi dwoma naciśnięciami, ilustrując cykliczne przejścia stanów.
