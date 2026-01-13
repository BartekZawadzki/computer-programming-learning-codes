// ASP.NET Core minimal API: endpointy, DI, walidacja DTO, odpowiedzi JSON.
// Wymaga projektu szablonu `dotnet new web` (Program.cs) i pakietów z .NET SDK.

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;

// DTO z walidacją
public record CreateUserDto(
    [Required, StringLength(100)] string Name,      // imię wymagane, max 100
    [Required, EmailAddress] string Email           // email wymagany
);

// Prosty serwis wstrzykiwany przez DI
public class UserService
{
    // Tu mógłby być DbContext; szkic przykładu
    public object Create(CreateUserDto dto) => new { id = 1, dto.Name, dto.Email }; // symulacja zwrotu
    public object Get(int id) => new { id, name = "Ala", email = "ala@example.com" }; // symulacja rekordu
}

// Program minimal API
var builder = WebApplication.CreateBuilder(args);        // host builder
builder.Services.AddEndpointsApiExplorer();              // swagger (opcjonalnie)
builder.Services.AddSwaggerGen();                        // swagger (opcjonalnie)
builder.Services.AddSingleton<UserService>();            // rejestracja serwisu

var app = builder.Build();                               // budowa aplikacji
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); app.UseSwaggerUI();                 // swagger w dev
}

// POST /api/users – tworzenie z walidacją modelu
app.MapPost("/api/users", (CreateUserDto dto, UserService svc) =>
{
    var user = svc.Create(dto);                          // logika serwisu
    return Results.Created($"/api/users/{1}", user);     // Created 201 z payloadem
})
.WithName("CreateUser")
.Produces(201)
.ProducesValidationProblem();                            // sygnalizuj walidację

// GET /api/users/{id}
app.MapGet("/api/users/{id:int}", (int id, UserService svc) =>
{
    var user = svc.Get(id);                              // pobierz
    return user is null ? Results.NotFound() : Results.Ok(user); // 404 lub 200
})
.WithName("GetUser")
.Produces<object>(200)
.Produces(404);

app.Run();                                               // uruchom

// ---
// Dlaczego tak:
// - Minimal API pokazuje nowy styl ASP.NET Core: mapowanie endpointów bez kontrolerów MVC.
// - Walidowane DTO z adnotacjami DataAnnotations zapewnia automatyczne sprawdzanie danych wejściowych.
// - DI w sygnaturze handlerów (CreateUserDto dto, UserService svc) upraszcza dostęp do usług.
// - UseSwagger w dev ułatwia eksplorację endpointów; Results.* pokazuje idiomatyczne odpowiedzi HTTP.
