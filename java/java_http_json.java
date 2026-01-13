// HTTP klient i JSON: HttpClient (Java 11+), Jackson do serializacji/deserializacji.
// Wymaga zależności jackson-databind na classpath dla JSON.

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

class PostDto {
    public int userId;           // pola publiczne dla prostoty
    public int id;
    public String title;
    public String body;
}

public class java_http_json {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();          // klient HTTP
        HttpRequest req = HttpRequest.newBuilder()               // builder żądania
            .uri(URI.create("https://jsonplaceholder.typicode.com/posts/1")) // URL
            .GET()                                               // metoda GET
            .build();                                            // zbuduj

        HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString()); // wyślij
        if (res.statusCode() != 200) {                           // sprawdź status
            throw new RuntimeException("HTTP " + res.statusCode()); // błąd
        }

        ObjectMapper om = new ObjectMapper();                    // mapper JSON
        PostDto post = om.readValue(res.body(), PostDto.class);  // JSON -> obiekt
        System.out.println("title=" + post.title);               // użycie danych

        String json = om.writeValueAsString(post);               // obiekt -> JSON
        System.out.println("json=" + json);                      // wypisanie
    }
}

// ---
// Dlaczego tak:
// - HttpClient (Java 11+) to wbudowany sposób na HTTP bez zewnętrznych zależności.
// - Jackson ObjectMapper pokazuje prostą serializację/deserializację DTO.
// - Sprawdzenie statusu przed parsowaniem chroni przed niespodziewanym body.
// - Oddzielny DTO z polami publicznymi upraszcza przykład; w realu użyj getterów/setterów lub record.
