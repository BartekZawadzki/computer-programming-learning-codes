<?php
// HTTP w PHP: cURL GET/POST, nagłówki, timeout, obsługa błędów.

declare(strict_types=1);

function http_get(string $url): string {
    $ch = curl_init();                                  // uchwyt cURL
    curl_setopt_array($ch, [                            // ustaw opcje
        CURLOPT_URL => $url,                            // adres
        CURLOPT_RETURNTRANSFER => true,                 // zwróć jako string
        CURLOPT_TIMEOUT => 5,                           // timeout sekund
        CURLOPT_FOLLOWLOCATION => true,                 // podążaj za redirect
    ]);
    $body = curl_exec($ch);                             // wykonaj żądanie
    if ($body === false) {                              // sprawdź błąd
        $err = curl_error($ch);                         // pobierz opis
        curl_close($ch);                                // zamknij uchwyt
        throw new RuntimeException("cURL error: $err"); // rzuć wyjątek
    }
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);    // kod statusu
    curl_close($ch);                                    // zamknij uchwyt
    if ($status >= 400) {                               // błędny status
        throw new RuntimeException("HTTP $status");     // rzuć wyjątek
    }
    return $body;                                       // zwróć body
}

function http_post_json(string $url, array $data): string {
    $json = json_encode($data);                         // serializacja do JSON
    $ch = curl_init($url);                              // uchwyt cURL
    curl_setopt_array($ch, [
        CURLOPT_POST => true,                           // metoda POST
        CURLOPT_POSTFIELDS => $json,                    // body JSON
        CURLOPT_HTTPHEADER => [                         // nagłówki
            "Content-Type: application/json",
            "Content-Length: " . strlen($json),
        ],
        CURLOPT_RETURNTRANSFER => true,                 // zwrot body
        CURLOPT_TIMEOUT => 5,                           // timeout
    ]);
    $body = curl_exec($ch);                             // wykonaj żądanie
    if ($body === false) {                              // obsługa błędu
        $err = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException("cURL error: $err");
    }
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);    // kod statusu
    curl_close($ch);                                    // zamknij
    if ($status >= 400) {                               // sprawdź kod
        throw new RuntimeException("HTTP $status");     // rzuć wyjątek
    }
    return $body;                                       // zwróć body
}

if (PHP_SAPI === "cli") {
    // $body = http_get("https://jsonplaceholder.typicode.com/posts/1"); // GET demo
    // echo $body . "\n";
    // $res = http_post_json("https://httpbin.org/post", ["hello" => "world"]); // POST demo
    // echo $res . "\n";
}

// ---
// Dlaczego tak:
// - cURL jest najpopularniejszym sposobem na HTTP w PHP; ustawiamy timeout, follow redirects, nagłówki.
// - Sprawdzanie curl_exec i kodu statusu HTTP zabezpiecza przed cichymi błędami.
// - POST JSON z Content-Type/Length pokazuje poprawne wysłanie danych w API.
// - Blok CLI pozwala szybko przetestować GET/POST bez wdrażania do serwera.
