<?php
// Testy Pest (lekka nakładka na PHPUnit). Wymaga pestphp/pest.
// Plik testowy: tests/Feature/AddTest.php (przykład).

declare(strict_types=1);

// Kod do testów
function add(int $a, int $b): int { return $a + $b; }  // prosta suma

// tests/Feature/AddTest.php (przykład treści w pliku)
// test('adds positive', function () {
//     expect(add(2, 3))->toBe(5);                      // asercja
// });
//
// test('adds negative', function () {
//     expect(add(-1, -2))->toBe(-3);                   // asercja
// });

if (PHP_SAPI === "cli") {
    // echo add(1, 2) . "\n";                           // demo wywołania (zakomentowane)
}

// ---
// Dlaczego tak:
// - Pest upraszcza zapis testów do funkcji + expect, bez klas/TestCase w każdym pliku.
// - Prosta funkcja add pokazuje minimalny przykład i oczekiwania z toBe.
// - Komentarz ze ścieżką tests/Feature kieruje, gdzie umieścić kod w realnym projekcie.
// - strict_types i typowana funkcja zmniejszają ryzyko niejawnych konwersji w testach.
