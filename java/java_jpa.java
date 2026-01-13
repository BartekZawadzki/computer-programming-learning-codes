// JPA/Hibernate: encja, repozytorium, serwis, prosty CRUD.
// Wymaga spring-boot-starter-data-jpa + driver DB + konfiguracji w application.yml/properties.

// import jakarta.persistence.*;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// @Entity
class UserEntity {
    // @Id @GeneratedValue
    private Long id;                 // klucz główny
    private String name;             // kolumna name
    private String email;            // kolumna email

    public Long getId() { return id; }           // getter
    public String getName() { return name; }     // getter
    public String getEmail() { return email; }   // getter
    public void setName(String name) { this.name = name; }   // setter
    public void setEmail(String email) { this.email = email; } // setter
}

// interface UserRepo extends JpaRepository<UserEntity, Long> { }

// @Service
// @Transactional
class UserJpaService {
    // private final UserRepo repo;
    // UserJpaService(UserRepo repo) { this.repo = repo; } // wstrzyknięcie

    public UserEntity create(String name, String email) {
        UserEntity u = new UserEntity();       // nowa encja
        u.setName(name);                       // ustawienie pól
        u.setEmail(email);                     // ustawienie pól
        // return repo.save(u);                // zapis do DB
        return u;                              // szkic zwrotu
    }

    public UserEntity get(Long id) {
        // return repo.findById(id).orElseThrow(); // pobranie lub wyjątek
        return null;                              // szkic
    }
}

// ---
// Dlaczego tak:
// - Szkic pokazuje kluczowe elementy JPA: encja z @Entity/@Id, repozytorium JpaRepository, serwis @Transactional.
// - Komentarze zostawiają miejsce na prawdziwą integrację ze Spring Data, zachowując strukturę warstw.
// - Metoda create/get demonstrują wzorzec serwisu nad repozytorium, co ułatwia testy i logikę domenową.
