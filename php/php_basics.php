<?php
// Podstawy PHP: typy, zmienne, operatory, warunki, pętle, funkcje.

declare(strict_types=1);                     // włącz ścisłe typowanie argumentów/zwrotów

$name = "Ala";                               // string
$age = 28;                                   // int
$pi = 3.14;                                  // float
$active = true;                              // bool
$nothing = null;                             // null

// Tablice (w PHP: mapy asocjacyjne lub indeksowane)
$nums = [1, 2, 3];                           // tablica indeksowana
$user = ["id" => 1, "name" => "Ala"];        // tablica asocjacyjna

// Warunek if/elseif/else
function classifyTemp(float $t): string {
    if ($t < 0) {                            // gałąź <0
        return "mróz";                       // zwróć opis
    } elseif ($t < 20) {                     // gałąź <20
        return "chłodno";                    // zwróć opis
    }
    return "ciepło";                         // pozostałe przypadki
}

// Pętla for
$sum = 0;                                    // akumulator
for ($i = 0; $i < count($nums); $i++) {      // iteracja po indeksach
    $sum += $nums[$i];                       // dodaj element
}

// Pętla foreach
foreach ($user as $key => $val) {            // iteracja po mapie
    // echo "$key=$val\n";                   // przykład wypisu (zakomentowany)
}

// Funkcja z parametrem domyślnym i typowaniem
function greet(string $who = "świecie"): string {
    return "Cześć $who!";                    // konkatenacja z interpolacją
}

// Funkcja variadic
function sumAll(int ...$args): int {
    return array_sum($args);                 // suma wszystkich argumentów
}

// Anonimowa funkcja (closure) i array_map
$squares = array_map(fn($n) => $n * $n, $nums); // kwadraty liczb

// Prosty import pliku (require/require_once/include)
// require_once "inny_plik.php";              // dołączenie pliku (zakomentowane)

if (PHP_SAPI === "cli") {                    // kod uruchamiany z CLI
    // echo greet() . "\n";                  // przywitanie (zakomentowane)
}

// ---
// Dlaczego tak:
// - Pokazuje fundamenty PHP 8+: strict_types, typowane parametry/zwroty, tablice asocjacyjne i indeksowane.
// - Funkcje z domyślnymi parametrami, variadic i array_map ilustrują typowe idiomy funkcyjne w PHP.
// - Rozdzielenie pętli for/foreach oraz przykładowy warunek if/elseif/else daje szybki przegląd składni kontrolnej.
// - Blok CLI guard (PHP_SAPI) wskazuje, jak odróżnić uruchomienie z wiersza poleceń od serwera www.
