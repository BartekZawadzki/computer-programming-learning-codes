<?php
// Tablice i funkcje w PHP: map/filter/reduce, sortowania, destrukturyzacja.

declare(strict_types=1);

$nums = [5, 2, 9, 1];                             // tablica liczb
$assoc = ["a" => 1, "b" => 2];                    // tablica asocjacyjna

// map
$squares = array_map(fn($n) => $n * $n, $nums);   // kwadraty

// filter
$even = array_filter($nums, fn($n) => $n % 2 === 0); // tylko parzyste

// reduce
$sum = array_reduce($nums, fn($acc, $n) => $acc + $n, 0); // suma

// sortowania
$sorted = $nums;                                   // kopia
sort($sorted);                                     // sort rosnąco (in-place)
$sortedDesc = $nums;                               // kopia
rsort($sortedDesc);                                // sort malejąco

// sort po kluczach/wartościach tablicy asocjacyjnej
$assocByKey = $assoc; ksort($assocByKey);          // sortuj po kluczu
$assocByVal = $assoc; asort($assocByVal);          // sortuj po wartości

// Destrukturyzacja list()
list($first, $second) = $nums;                     // pierwszy, drugi element

// Funkcja przyjmująca tablicę typowaną
function average(array $values): float {
    if (count($values) === 0) {                    // walidacja pustej tablicy
        throw new InvalidArgumentException("empty array");
    }
    return array_sum($values) / count($values);    // średnia
}

if (PHP_SAPI === "cli") {
    // echo average($nums) . "\n";                  // przykład użycia (zakomentowany)
}

// ---
// Dlaczego tak:
// - array_map/filter/reduce pokazują funkcyjny styl operacji na kolekcjach w PHP.
// - sort/rsort/ksort/asort ilustrują różne sposoby porządkowania tablic indeksowanych i asocjacyjnych.
// - list() demonstruje destrukturyzację dla szybkiego przypisania elementów.
// - average zawiera walidację i typowanie, co promuje bezpieczniejsze API funkcji.
