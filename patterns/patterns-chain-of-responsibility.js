// Chain of Responsibility: łańcuch handlerów, każdy decyduje czy obsłużyć żądanie, czy przekazać dalej.

// Bazowy handler z referencją do następnego
class Handler {
  setNext(next) {
    this.next = next; // ustaw następny handler
    return next; // pozwala łańcuchować setNext
  }

  handle(request) {
    if (this.next) return this.next.handle(request); // domyślnie przekaż dalej
    return null; // brak obsługi
  }
}

// Konkretne handlery
class AuthHandler extends Handler {
  handle(request) {
    if (!request.user) return "Unauthorized"; // brak użytkownika
    return super.handle(request); // przekaż dalej
  }
}

class RoleHandler extends Handler {
  constructor(role) { super(); this.role = role; } // wymagany role
  handle(request) {
    if (request.user.role !== this.role) return "Forbidden"; // niewłaściwa rola
    return super.handle(request); // przekaż dalej
  }
}

class DataHandler extends Handler {
  handle(request) {
    // finalna obsługa (zwraca dane)
    return { ok: true, data: `Secret for ${request.user.name}` }; // odpowiedź
  }
}

// Konfiguracja łańcucha: Auth -> Role -> Data
const auth = new AuthHandler();
const role = new RoleHandler("admin");
const data = new DataHandler();
auth.setNext(role).setNext(data); // zbuduj łańcuch

// Przykładowe wywołania
const req1 = {}; // brak user
const req2 = { user: { name: "Bob", role: "user" } }; // zła rola
const req3 = { user: { name: "Alice", role: "admin" } }; // właściwy user

const res1 = auth.handle(req1); // "Unauthorized"
const res2 = auth.handle(req2); // "Forbidden"
const res3 = auth.handle(req3); // { ok: true, data: ... }

module.exports = {
  Handler,
  AuthHandler,
  RoleHandler,
  DataHandler,
  auth,
  role,
  data,
  res1,
  res2,
  res3,
};

// ---
// Dlaczego tak:
// - Handler trzyma next i domyślnie przekazuje żądanie dalej, co pozwala łańcuchować logikę bez zagnieżdżonych if-ów.
// - AuthHandler/RoleHandler walidują dane wejściowe etapami; każdy może zakończyć przepływ, zwracając błąd.
// - DataHandler jest końcowym handlerem i zwraca wynik tylko jeśli wcześniejsze warunki przeszły.
// - Konfiguracja auth -> role -> data pokazuje, jak zmienić kolejność/reguły bez modyfikacji kodu poszczególnych handlerów.
