<?php
// Bezpieczeństwo w PHP: JWT (pakiet firebase/php-jwt), CSRF token, kontekst XSS (escapowanie).

declare(strict_types=1);

// JWT – przykładowe tworzenie/parsowanie (firebase/php-jwt)
// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;
//
// $secret = "super-secret";                                // klucz HMAC
// $payload = [                                             // dane w tokenie
//     "sub" => 123,                                        // subject (użytkownik)
//     "exp" => time() + 3600,                              // wygaśnięcie (1h)
// ];
// $jwt = JWT::encode($payload, $secret, 'HS256');          // wygeneruj token
// $decoded = JWT::decode($jwt, new Key($secret, 'HS256')); // weryfikacja i dekodowanie

// CSRF token (prosty przykład oparty o sesję)
session_start();                                           // start sesji
if (empty($_SESSION['csrf'])) {                            // gdy brak tokenu
    $_SESSION['csrf'] = bin2hex(random_bytes(16));         // wygeneruj losowy
}
$csrf = $_SESSION['csrf'];                                 // aktualny token
// W formularzu: <input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf, ENT_QUOTES) ?>">

// Walidacja CSRF przy POST
function validateCsrf(string $tokenFromPost): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $tokenFromPost)) { // porównanie stałoczasowe
        http_response_code(403);                            // 403 Forbidden
        exit("CSRF invalid");                               // zatrzymaj
    }
}

// XSS – escapowanie outputu
function e(string $raw): string {
    return htmlspecialchars($raw, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); // bezpieczny output
}

// Przykład użycia e():
// echo "<p>" . e($userInput) . "</p>";                     // unikanie XSS

// ---
// Dlaczego tak:
// - JWT sekcja pokazuje minimalny przepływ: payload, exp, podpis i weryfikacja biblioteki firebase/php-jwt.
// - CSRF token w sesji + hash_equals to prosty, skuteczny mechanizm ochrony formularzy.
// - htmlspecialchars z ENT_QUOTES/UTF-8 to podstawowy sposób na eliminację XSS przy renderowaniu HTML.
// - Komentarze z przykładami w formularzu/echo ułatwiają przeniesienie fragmentów do realnego kodu.
