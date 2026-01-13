// Spring Boot: minimalny REST + DI + walidacja.
// Uwaga: to szkic klas; do działania potrzebne zależności spring-boot-starter-web,
// spring-boot-starter-validation i konfiguracja w projekcie Maven/Gradle.

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.stereotype.Service;
// import jakarta.validation.constraints.*;
// import org.springframework.validation.annotation.Validated;

// @SpringBootApplication
public class java_spring_boot {
    public static void main(String[] args) {
        // SpringApplication.run(java_spring_boot.class, args); // uruchom kontekst
    }
}

// DTO z walidacją
class CreateUserRequest {
    // @NotBlank(message = "name required")
    private String name; // imię
    // @Email(message = "invalid email")
    private String email; // email
    public String getName() { return name; }          // getter
    public void setName(String name) { this.name = name; } // setter
    public String getEmail() { return email; }             // getter
    public void setEmail(String email) { this.email = email; } // setter
}

// Serwis jako bean
// @Service
class UserService {
    public String create(String name, String email) {
        // tutaj zapis do repo/DB (pominięty)
        return "created:" + name + ":" + email; // zwrot przykładowy
    }
}

// Kontroler REST
// @RestController
// @RequestMapping("/api/users")
// @Validated
class UserController {
    private final UserService service; // wstrzyknięty serwis
    // @Autowired
    UserController(UserService service) { this.service = service; } // konstruktor

    // @PostMapping
    // public String create(@RequestBody @Valid CreateUserRequest body) {
    public String create(CreateUserRequest body) {
        return service.create(body.getName(), body.getEmail()); // delegacja do serwisu
    }

    // @GetMapping("/{id}")
    public String get(String id) {
        return "user:" + id; // szkic odpowiedzi
    }
}

// ---
// Dlaczego tak:
// - Szkic pokazuje kluczowe elementy Spring Boot: @SpringBootApplication, kontroler, serwis, walidację DTO.
// - Komentarze z importami/annotacjami przypominają, co odkomentować w realnym projekcie z zależnościami.
// - Rozdzielenie DTO/Service/Controller wspiera czystą architekturę i łatwe testowanie warstw.
