// Testy w Javie: JUnit 5 przykładowe asercje. Wymaga zależności junit-jupiter.

// Przykładowy kod do testów
class MathUtil {
    static int add(int a, int b) { return a + b; }      // prosta suma
}

// Klasa testowa (JUnit 5)
// Aby uruchomić: dodaj do build.gradle/maven junit-jupiter i uruchom testy.
// import org.junit.jupiter.api.Test;
// import static org.junit.jupiter.api.Assertions.*;

public class java_tests {
    // @Test
    void addsPositive() {
        // assertEquals(5, MathUtil.add(2, 3));         // oczekiwany wynik 5
    }

    // @Test
    void addsNegative() {
        // assertEquals(-3, MathUtil.add(-1, -2));      // suma ujemnych
    }

    // @Test
    void addsZero() {
        // assertEquals(7, MathUtil.add(7, 0));         // suma z zerem
    }
}

// ---
// Dlaczego tak:
// - MathUtil zapewnia prostą funkcję do przetestowania, minimalizując zależności.
// - Komentarze z importami JUnit 5 przypominają, jak włączyć testy w projekcie.
// - Przykładowe asercje pokazują typowe przypadki (pozytywne, ujemne, zero) i można je łatwo odkomentować.
