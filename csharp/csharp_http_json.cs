// HttpClient + System.Text.Json: GET/POST JSON, deserializacja, opcje json.
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

public record PostDto(int UserId, int Id, string Title, string Body); // DTO z init-only

public class CSharpHttpJson
{
    private static readonly HttpClient client = new HttpClient();          // współdzielony klient
    private static readonly JsonSerializerOptions jsonOptions = new()      // opcje JSON
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,                 // camelCase
        WriteIndented = true                                               // formatowanie
    };

    public static async Task Main()
    {
        var post = await GetPost(1);                                       // GET
        Console.WriteLine(post?.Title);                                    // wypisz tytuł

        var created = await CreatePost(new PostDto(1, 0, "Hello", "Body")); // POST
        Console.WriteLine(created.Id);                                     // nowe ID (symulacja API)
    }

    // GET z deserializacją do rekordu
    private static async Task<PostDto?> GetPost(int id)
    {
        return await client.GetFromJsonAsync<PostDto>(
            $"https://jsonplaceholder.typicode.com/posts/{id}", jsonOptions); // pobierz i zdeserializuj
    }

    // POST z body JSON i odczytem odpowiedzi
    private static async Task<PostDto?> CreatePost(PostDto dto)
    {
        var res = await client.PostAsJsonAsync(
            "https://jsonplaceholder.typicode.com/posts", dto, jsonOptions);  // wyślij POST
        res.EnsureSuccessStatusCode();                                        // rzuci gdy != 2xx
        return await res.Content.ReadFromJsonAsync<PostDto>(jsonOptions);    // odczyt odpowiedzi
    }
}

// ---
// Dlaczego tak:
// - HttpClient w singletonie ogranicza koszty połączeń; JsonOptions camelCase/Indented dopasowują do typowego API.
// - GetFromJsonAsync/PostAsJsonAsync/ReadFromJsonAsync upraszczają (de)serializację bez ręcznego JsonSerializer.
// - EnsureSuccessStatusCode wymusza obsługę błędów HTTP zamiast cichego przejścia.
// - Rekord PostDto z init-only właściwościami jest prostym i bezpiecznym DTO.
