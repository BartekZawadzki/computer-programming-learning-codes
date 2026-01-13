// Testcontainers dla .NET: uruchomienie tymczasowego PostgreSQL do testów integracyjnych.
// Wymaga pakietu Testcontainers.PostgreSql oraz xUnit.
using System.Threading.Tasks;
using Testcontainers.PostgreSql;
using Xunit;

public class PostgresContainerTests
{
    [Fact]
    public async Task StartsPostgresContainer()
    {
        await using var pg = new PostgreSqlBuilder()          // builder kontenera
            .WithImage("postgres:15-alpine")                  // obraz
            .WithUsername("test")                             // user
            .WithPassword("test")                             // hasło
            .WithDatabase("app")                              // nazwa DB
            .Build();                                         // zbuduj kontener

        await pg.StartAsync();                                // uruchom

        var connString = pg.GetConnectionString();            // JDBC-like connection string
        Assert.Contains("Host=", connString);                 // prosta asercja

        // Tutaj można otworzyć połączenie (Npgsql) i wykonać zapytanie testowe.
        // await using var conn = new NpgsqlConnection(connString);
        // await conn.OpenAsync();
        // ... DDL/DML ...

        await pg.StopAsync();                                 // zatrzymaj (opcjonalnie, Dispose też zadziała)
    }
}

// ---
// Dlaczego tak:
// - Testcontainers uruchamia realny Postgres na czas testu, bez instalacji lokalnej DB.
// - Builder z obrazem/credentials/DB pokazuje konfigurację kontenera w kodzie.
// - GetConnectionString umożliwia podpięcie Npgsql i wykonanie realnych zapytań w teście.
// - StopAsync/Dispose utrzymują porządek i zwalniają zasoby po zakończeniu testu.
