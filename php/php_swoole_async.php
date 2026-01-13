<?php
// Szkic Swoole (async serwer HTTP) – pokazuje serwer i prostą trasę.
// Wymaga rozszerzenia Swoole zainstalowanego w PHP.

// swoole_server.php (uruchom: php swoole_server.php)
// $server = new Swoole\Http\Server("0.0.0.0", 9501);          // serwer HTTP
// $server->on("request", function ($req, $res) {
//     $path = $req->server['request_uri'] ?? '/';             // ścieżka
//     if ($path === '/hello') {                               // prosta trasa
//         $res->header("Content-Type", "application/json");   // nagłówek
//         $res->end(json_encode(["msg" => "hello async"]));   // body
//         return;
//     }
//     $res->status(404); $res->end("Not Found");              // 404 dla reszty
// });
// $server->start();                                           // start serwera

// ---
// Dlaczego tak:
// - Swoole pozwala na asynchroniczny serwer HTTP bez Nginx/Apache, ten szkic pokazuje minimalną trasę.
// - Nagłówek Content-Type i zwrot JSON demonstrują typową odpowiedź API.
// - 404 fallback pokazuje, jak obsłużyć nieznane ścieżki w prostym handlerze.
// - Komentarz o uruchomieniu podaje dokładną komendę startu serwera.
