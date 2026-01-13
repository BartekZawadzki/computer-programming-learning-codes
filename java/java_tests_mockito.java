// Testy z Mockito (JUnit 5): mock serwisu, weryfikacja wywołań.
// Wymaga zależności junit-jupiter + mockito-core (+ mockito-junit-jupiter dla @ExtendWith).

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import static org.mockito.Mockito.*;
// import static org.junit.jupiter.api.Assertions.*;

// Prosty serwis zależny od repo
class Repo {
    String save(String value) { return "saved:" + value; } // szkic repozytorium
}

class Service {
    private final Repo repo;                              // zależność
    Service(Repo repo) { this.repo = repo; }              // konstruktor
    String process(String v) {
        if (v == null) throw new IllegalArgumentException(); // walidacja
        return repo.save(v.toUpperCase());               // delegacja + logika
    }
}

// @ExtendWith(MockitoExtension.class)
public class java_tests_mockito {
    // @Mock Repo repo;                   // mock repozytorium
    // @InjectMocks Service service;      // SUT z wstrzykniętym mockiem

    // @Test
    void savesUppercased() {
        // when(repo.save("ABC")).thenReturn("ok");     // stub zwrotu
        // String result = service.process("abc");      // wywołanie SUT
        // assertEquals("ok", result);                  // asercja wyniku
        // verify(repo).save("ABC");                    // weryfikacja wywołania
    }

    // @Test
    void nullInputThrows() {
        // assertThrows(IllegalArgumentException.class, () -> service.process(null));
        // verifyNoInteractions(repo);                  // brak wywołań na repo
    }
}

// ---
// Dlaczego tak:
// - Pokazuje klasyczny układ testu z Mockito: @Mock, @InjectMocks, when/verify.
// - Stub uppercased wejścia demonstruje, że logika SUT może modyfikować dane przed repo.save.
// - verifyNoInteractions sprawdza brak wywołań przy niepoprawnych danych, co jest ważne w walidacji.
// - Komentarze z importami/annotacjami przypominają, co włączyć w prawdziwym środowisku JUnit 5.
