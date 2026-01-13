<?php
// Testy w PHP: PHPUnit (asercje), prosty przykład. Wymaga phpunit w projekcie.

declare(strict_types=1);

// Kod do testów
function add(int $a, int $b): int {
    return $a + $b;                           // zwraca sumę
}

// Klasa testowa (szkic, asercje w komentarzach)
// use PHPUnit\Framework\TestCase;
// final class AddTest extends TestCase {
//     public function testAddsPositive(): void {
//         $this->assertSame(5, add(2, 3));    // asercja równości
//     }
//     public function testAddsNegative(): void {
//         $this->assertSame(-3, add(-1, -2)); // suma ujemnych
//     }
// }

if (PHP_SAPI === "cli") {
    // echo add(2, 2) . "\n";                 // demo wywołania (zakomentowane)
}

// ---
// Dlaczego tak:
// - Prostą funkcję add łatwo pokryć testami, co ilustruje podstawy PHPUnit.
// - Komentarze z TestCase/asercjami przypominają, jak wygląda struktura klasy testowej.
// - Typowanie funkcji i strict_types zmniejsza ryzyko niejawnych konwersji w testowanym kodzie.
// - Blok CLI pozwala szybko odpalić demo bez odpalania całego runnera testów.
