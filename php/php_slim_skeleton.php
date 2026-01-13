<?php
// Szkic Slim (microframework): routing, middleware, JSON response.
// Zakłada zainstalowany slim/slim i nyholm/psr7 lub slim/psr7.

// public/index.php
// require __DIR__ . '/../vendor/autoload.php';               // autoloader
// use Psr\Http\Message\ResponseInterface as Response;
// use Psr\Http\Message\ServerRequestInterface as Request;
// use Slim\Factory\AppFactory;
//
// $app = AppFactory::create();                               // utwórz aplikację
//
// // Middleware globalne (np. JSON headers)
// $app->add(function (Request $req, callable $handler): Response {
//     $res = $handler($req);                                 // przekaż dalej
//     return $res->withHeader('Content-Type', 'application/json'); // nagłówek JSON
// });
//
// // Routing: GET /hello/{name}
// $app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
//     $name = $args['name'] ?? 'world';                      // parametr ścieżki
//     $response->getBody()->write(json_encode(['hello' => $name])); // body JSON
//     return $response;                                      // zwróć odpowiedź
// });
//
// // POST /users – przykładowy handler z body JSON
// $app->post('/users', function (Request $request, Response $response) {
//     $data = json_decode((string)$request->getBody(), true) ?? []; // pobierz body
//     if (!isset($data['name'])) {                          // prosta walidacja
//         $response->getBody()->write(json_encode(['error' => 'name required']));
//         return $response->withStatus(400);                // 400 gdy brak
//     }
//     $response->getBody()->write(json_encode(['created' => $data['name']]));
//     return $response->withStatus(201);                    // 201 Created
// });
//
// $app->run();                                               // uruchom aplikację

// ---
// Dlaczego tak:
// - Slim pokazuje minimalny przykład PSR-7/15: routing, middleware i JSON response bez ciężkiego frameworka.
// - Globalny middleware z nagłówkiem JSON demonstruje miejsce na cross-cutting concerns.
// - Prosty POST /users ilustruje parsowanie body i walidację z odpowiednimi kodami HTTP.
// - Komentarze z require/autoloaderem wskazują, jak wpiąć szkic w realny projekt Slim.
