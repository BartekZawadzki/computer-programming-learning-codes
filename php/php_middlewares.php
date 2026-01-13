<?php
// Middleware (pipeline) w czystym PHP: prosty łańcuch funkcji przetwarzających request/response.

declare(strict_types=1);

// Request/Response jako proste tablice dla uproszczenia
$request = ["path" => "/hello", "headers" => [], "body" => null]; // wejście

// Handler końcowy (kontroler)
$finalHandler = function (array $req): array {
    return ["status" => 200, "body" => "Hello world"];     // odpowiedź końcowa
};

// Middleware typ: fn($request, $next): array
$logging = function (array $req, callable $next): array {
    // echo "LOG start {$req['path']}\n";                  // log przed (zakoment.)
    $res = $next($req);                                   // wywołaj następny
    // echo "LOG end status {$res['status']}\n";          // log po (zakoment.)
    return $res;                                          // przekaż odpowiedź
};

$auth = function (array $req, callable $next): array {
    $authorized = true;                                   // tu byłaby realna logika auth
    if (!$authorized) {                                   // brak autoryzacji
        return ["status" => 401, "body" => "Unauthorized"]; // zwróć 401
    }
    return $next($req);                                   // przejdź dalej
};

// Budowanie pipeline (składanie middleware w odwrotnej kolejności)
$pipeline = array_reduce(
    array_reverse([$logging, $auth]),                     // lista middleware
    fn($next, $mw) => fn($req) => $mw($req, $next),       // zagnieżdżenie callables
    $finalHandler                                         // początkowy handler
);

$response = $pipeline($request);                          // uruchom pipeline
// print_r($response);                                    // podgląd odpowiedzi (zakoment.)

// ---
// Dlaczego tak:
// - Funkcyjny pipeline pokazuje, jak łączyć middleware bez frameworka (callable $req,$next).
// - array_reduce + array_reverse buduje łańcuch w kolejności wywołań, naśladując popularne frameworki.
// - logging/auth ilustrują cross-cutting concerns przed/po handlerze końcowym.
// - Proste struktury tablicowe podkreślają ideę bez dodatkowych zależności.
