// Mediator: centralny obiekt koordynujący interakcje między uczestnikami (colleagues).
// Przykład: prosty czat, gdzie użytkownicy komunikują się przez mediatora ChatRoom.

// Mediator
class ChatRoom {
  constructor() {
    this.users = new Map(); // mapa id -> User
  }

  register(user) {
    this.users.set(user.id, user); // zarejestruj użytkownika
    user.room = this; // wstrzyknij referencję do mediatora
  }

  send(fromId, toId, message) {
    const toUser = this.users.get(toId); // znajdź odbiorcę
    if (!toUser) return `User ${toId} not found`; // brak odbiorcy
    return toUser.receive(fromId, message); // dostarcz wiadomość
  }
}

// Kolega (participant)
class User {
  constructor(id, name) {
    this.id = id; // identyfikator
    this.name = name; // nazwa
    this.room = null; // referencja do mediatora
  }

  send(toId, message) {
    if (!this.room) throw new Error("User not registered in any room"); // brak mediatora
    return this.room.send(this.id, toId, message); // delegacja do mediatora
  }

  receive(fromId, message) {
    return `User ${this.id} (${this.name}) got message from ${fromId}: ${message}`; // odbiór
  }
}

// Przykład użycia
const room = new ChatRoom(); // mediator
const alice = new User(1, "Alice");
const bob = new User(2, "Bob");
room.register(alice);
room.register(bob);

const msg = alice.send(2, "Cześć Bob!"); // Alice -> Bob

module.exports = {
  ChatRoom,
  User,
  room,
  alice,
  bob,
  msg,
};

// ---
// Dlaczego tak:
// - ChatRoom koordynuje komunikację, więc User nie musi znać referencji do innych uczestników.
// - register wstrzykuje room do użytkownika, co wymusza korzystanie z mediatora zamiast bezpośrednich połączeń.
// - send deleguje do room.send, a receive jest prostą metodą odbioru — separacja wysyłki/odbioru ułatwia testy.
// - Przykład Alice->Bob pokazuje, jak mediator upraszcza routing wiadomości i pozwala łatwo dodać logowanie/filtry centralnie.
