<?php
// PSR-4 + Composer: przykład struktury i autoload. Nie wymaga działania kodu, pokazuje konfigurację.

// composer.json (fragment)
// {
//   "autoload": {
//     "psr-4": {
//       "App\\": "src/"              // mapowanie namespace App\ do katalogu src/
//     }
//   },
//   "require": {
//     "php": "^8.2"
//   }
// }
// Po dodaniu: uruchom `composer dump-autoload` aby wygenerować autoloader.

// Struktura plików:
// project/
// ├─ composer.json
// ├─ vendor/                 (po composer install)
// └─ src/
//    └─ Utils/
//       └─ Greeter.php       (przykładowa klasa)

// src/Utils/Greeter.php
// namespace App\Utils;
// class Greeter {
//     public function greet(string $name): string {
//         return "Cześć $name";      // proste przywitanie
//     }
// }

// index.php (użycie autoloadera)
// require __DIR__ . '/vendor/autoload.php';          // wczytaj autoloader Composera
// use App\Utils\Greeter;                             // import klasy
// $g = new Greeter();                                // utwórz obiekt
// echo $g->greet("Ala");                             // wypisz przywitanie

// ---
// Dlaczego tak:
// - PSR-4 w composer.json mapuje namespace na katalog, co umożliwia automatyczny autoload bez ręcznych require.
// - Struktura katalogów pokazuje, gdzie umieścić klasy i jak Composer generuje vendor/autoload.php.
// - Przykładowa klasa Greeter ilustruje, jak namespaces działają w praktyce przy prostym use/import.
// - Komenda composer dump-autoload przypomina o regeneracji autoloadera po zmianach w mapowaniach.
