// Testcontainers: uruchomienie tymczasowej bazy (np. PostgreSQL) do testów integracyjnych.
// Wymaga zależności testcontainers, junit-jupiter, driver DB.

// import org.junit.jupiter.api.Test;
// import org.testcontainers.containers.PostgreSQLContainer;
// import static org.junit.jupiter.api.Assertions.*;

public class java_tests_testcontainers {
    // @Test
    void startsPostgres() {
        // try (PostgreSQLContainer<?> pg = new PostgreSQLContainer<>("postgres:15-alpine")) {
        //     pg.start();                                         // start kontenera
        //     String url = pg.getJdbcUrl();                       // JDBC URL
        //     String user = pg.getUsername();                     // user
        //     String pass = pg.getPassword();                     // pass
        //     assertTrue(url.contains("jdbc:postgresql"));        // prosta asercja
        // }
    }
}

// ---
// Dlaczego tak:
// - Testcontainers pozwala na prawdziwe środowisko DB w testach bez ręcznej instalacji.
// - Użycie try-with-resources gwarantuje sprzątnięcie kontenera po teście.
// - Prosta asercja na JDBC URL pokazuje minimalną weryfikację startu; w realu podłącz tu repo/DAO.
