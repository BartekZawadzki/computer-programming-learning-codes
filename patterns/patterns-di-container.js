// Dependency Injection (prostą formą) za pomocą kontenera: rejestr usług i ich pobieranie.
// Uwaga: prosty kontener, bez lifecycle/zakresów; do nauki podstaw idei DI.

class Container {
  constructor() {
    this.registry = new Map(); // mapa klucz -> fabryka/usługa
  }

  register(name, factory) {
    this.registry.set(name, factory); // rejestruj fabrykę
  }

  resolve(name) {
    const factory = this.registry.get(name); // pobierz fabrykę
    if (!factory) throw new Error(`Service ${name} not registered`); // brak usługi
    return factory(this); // wywołaj fabrykę z kontenerem (do zależności)
  }
}

// Przykładowe usługi
class LoggerService {
  log(msg) { console.log("LOG:", msg); } // logowanie
}

class UserService {
  constructor(logger) { this.logger = logger; } // injekcja loggera
  getUser(id) {
    this.logger.log(`Fetching user ${id}`); // użycie zależności
    return { id, name: "User " + id }; // dane przykładowe
  }
}

// Konfiguracja kontenera
const container = new Container();
container.register("logger", () => new LoggerService()); // rejestruj logger
container.register("userService", (c) => new UserService(c.resolve("logger"))); // rejestruj userService z injekcją loggera

// Przykład użycia
const userService = container.resolve("userService"); // pobierz z kontenera
const user = userService.getUser(1); // korzystaj z usługi

module.exports = {
  Container,
  LoggerService,
  UserService,
  container,
  userService,
  user,
};

// ---
// Dlaczego tak:
// - Container rejestruje fabryki usług i pozwala je rozwiązywać po nazwie, eliminując twarde zależności w kodzie.
// - Fabryka userService dostaje logger z kontenera, więc zależności są wstrzykiwane, a nie tworzone wewnątrz klasy.
// - resolve rzuca błąd dla brakujących usług, co szybko ujawnia błędy konfiguracji.
// - Przykład userService/getUser pokazuje, że serwis używa loggera bez wiedzy, skąd się wziął, co ułatwia testy/mocking.
