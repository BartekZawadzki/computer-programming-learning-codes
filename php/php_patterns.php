<?php
// Wzorce w PHP: Singleton, Factory, Strategy, Observer, Decorator (funkcyjny).

declare(strict_types=1);

// Singleton (lazy) – edukacyjny, bez synchronizacji
class Singleton {
    private static ?Singleton $instance = null;           // statyczna instancja
    private function __construct() {}                      // prywatny konstruktor
    public static function getInstance(): Singleton {
        if (self::$instance === null) {                    // jeśli brak instancji
            self::$instance = new self();                  // utwórz nową
        }
        return self::$instance;                            // zwróć instancję
    }
}

// Factory
interface Animal { public function speak(): string; }      // interfejs
class Dog implements Animal { public function speak(): string { return "Woof"; } } // implementacja
class Cat implements Animal { public function speak(): string { return "Meow"; } } // implementacja
class AnimalFactory {
    public static function create(string $kind): Animal {
        return match ($kind) {                             // wybór implementacji
            "dog" => new Dog(),
            "cat" => new Cat(),
            default => throw new InvalidArgumentException("Unknown kind"),
        };
    }
}

// Strategy
interface DiscountStrategy { public function apply(float $price): float; } // kontrakt
class NoDiscount implements DiscountStrategy { public function apply(float $p): float { return $p; } }
class TenPercent implements DiscountStrategy { public function apply(float $p): float { return $p * 0.9; } }
class PriceCalculator {
    public function __construct(private DiscountStrategy $strategy) {} // wstrzyknięcie strategii
    public function calc(float $base): float { return $this->strategy->apply($base); } // użycie strategii
}

// Observer
interface Observer { public function update(string $msg): void; } // obserwator
class Subject {
    /** @var Observer[] */
    private array $observers = [];                               // lista obserwatorów
    public function subscribe(Observer $o): void { $this->observers[] = $o; } // dodaj
    public function notifyAll(string $msg): void {               // powiadom wszystkich
        foreach ($this->observers as $o) { $o->update($msg); }   // wywołaj update
    }
}

// Dekorator funkcjonalny (closure opakowujące funkcję)
function withBrackets(callable $fn): callable {
    return function (string $s) use ($fn): string {              // zwróć nową funkcję
        return "[" . $fn($s) . "]";                              // dodaj nawiasy
    };
}

if (PHP_SAPI === "cli") {
    $s1 = Singleton::getInstance(); $s2 = Singleton::getInstance(); // singleton demo
    // var_dump($s1 === $s2);                                    // true (zakomentowane)

    $a = AnimalFactory::create("dog");                           // factory demo
    // echo $a->speak() . "\n";                                  // Woof (zakomentowane)

    $calc = new PriceCalculator(new TenPercent());               // strategia 10%
    // echo $calc->calc(100) . "\n";                             // 90 (zakomentowane)

    $subj = new Subject();                                       // observer demo
    $subj->subscribe(new class implements Observer {
        public function update(string $msg): void { /* echo "obs1 $msg\n"; */ }
    });
    $subj->notifyAll("hi");                                      // powiadom (bez wypisu)

    $decorated = withBrackets('strtoupper');                     // dekorator
    // echo $decorated("test") . "\n";                           // [TEST] (zakomentowane)
}

// ---
// Dlaczego tak:
// - Zbiór klasycznych wzorców (Singleton/Factory/Strategy/Observer/Dekorator) w idiomatycznym PHP 8.
// - match w fabryce i property promotion w strategii upraszczają kod i są nowoczesnymi konstrukcjami.
// - Observer na prostych klasach pokazuje luźne powiązanie i łatwą rozbudowę.
// - Dekorator funkcjonalny (callable) ilustruje podejście funkcyjne obok obiektowego.
