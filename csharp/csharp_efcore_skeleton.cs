// EF Core szkic: DbContext, encja, konfiguracja i prosty CRUD w serwisie.
// Wymaga pakietów Microsoft.EntityFrameworkCore + provider (np. Sqlite/InMemory/SqlServer).

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

// Encja z adnotacjami
public class UserEntity
{
    public int Id { get; set; }                                  // klucz PK
    [Required, StringLength(100)] public string Name { get; set; } = ""; // kolumna name
    [Required, EmailAddress] public string Email { get; set; } = "";     // kolumna email
}

// DbContext z konfiguracją
public class AppDbContext : DbContext
{
    public DbSet<UserEntity> Users => Set<UserEntity>();         // DbSet użytkowników

    public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserEntity>()
            .HasIndex(u => u.Email)
            .IsUnique();                                         // indeks unikalny email
    }
}

// Serwis aplikacyjny korzystający z DbContext
public class UserEfService
{
    private readonly AppDbContext db;                            // wstrzyknięty kontekst
    public UserEfService(AppDbContext db) { this.db = db; }      // ctor

    public UserEntity Create(string name, string email)
    {
        var u = new UserEntity { Name = name, Email = email };   // nowa encja
        db.Users.Add(u);                                         // dodaj do kontekstu
        db.SaveChanges();                                        // zapisz
        return u;                                                // zwróć zapisany
    }

    public UserEntity? Get(int id) => db.Users.Find(id);         // pobierz po PK
}

// Przykładowa konfiguracja w Program.cs (minimal API):
// builder.Services.AddDbContext<AppDbContext>(opts =>
//     opts.UseSqlite("Data Source=app.db"));                    // provider SQLite
// builder.Services.AddScoped<UserEfService>();                 // rejestracja serwisu

// ---
// Dlaczego tak:
// - Pokazuje pełny minimalny szkielet EF Core: encja z adnotacjami, DbContext, unikalny indeks na email.
// - UserEfService izoluje logikę DB od reszty aplikacji i łatwo go wstrzyknąć przez DI.
// - OnModelCreating ustawia unikalność email, co zapewnia integralność na poziomie DB.
// - Komentarz z konfiguracją w Program.cs wskazuje, jak podpiąć kontekst i serwis w minimal API.
