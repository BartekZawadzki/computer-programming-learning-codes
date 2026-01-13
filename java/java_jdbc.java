// JDBC: połączenie, SELECT, INSERT z PreparedStatement, transakcje.
// Wymaga drivera (np. mysql/postgres) na classpath.

import java.sql.*;

public class java_jdbc {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:postgresql://localhost:5432/app"; // URL DB
        String user = "app";                                 // użytkownik
        String pass = "secret";                              // hasło

        try (Connection conn = DriverManager.getConnection(url, user, pass)) { // połączenie
            conn.setAutoCommit(false);                       // ręczne transakcje

            String insertSql = "INSERT INTO users(name,email) VALUES (?, ?)"; // SQL z param.
            try (PreparedStatement ps = conn.prepareStatement(insertSql)) {   // prepared stmt
                ps.setString(1, "Ala");                      // param 1
                ps.setString(2, "ala@example.com");          // param 2
                ps.executeUpdate();                          // wykonanie INSERT
            }

            String selectSql = "SELECT id, name, email FROM users"; // prosty SELECT
            try (PreparedStatement ps = conn.prepareStatement(selectSql);
                 ResultSet rs = ps.executeQuery()) {                // wykonanie
                while (rs.next()) {                                 // iteracja wyników
                    System.out.println(rs.getInt("id") + " " + rs.getString("name"));
                }
            }

            conn.commit();                                         // commit transakcji
        } catch (Exception ex) {
            ex.printStackTrace();                                  // log błędu
            // ewentualny rollback (tu pominięty dla skrótu)
        }
    }
}

// ---
// Dlaczego tak:
// - Pokazuje podstawowy przepływ JDBC: Connection z autoCommit=false, PreparedStatement dla parametrów, commit.
// - PreparedStatement chroni przed SQL injection i poprawia wydajność przez prekompilację.
// - Blok try-with-resources zapewnia automatyczne zamknięcie połączeń/statementów/ResultSetów.
// - Komentarz o rollback przypomina o poprawnej obsłudze błędów w realnym kodzie.
