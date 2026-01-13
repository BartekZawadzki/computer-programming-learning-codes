<?php
// OOP w PHP: klasy, właściwości, enkapsulacja, dziedziczenie, interfejsy, trait.

declare(strict_types=1);                       // ścisłe typowanie

class BankAccount {
    private string $owner;                     // właściciel (prywatne pole)
    private float $balance = 0.0;              // saldo (prywatne)

    public function __construct(string $owner) { // konstruktor
        $this->owner = $owner;                  // ustaw właściciela
    }

    public function deposit(float $amount): float {
        if ($amount <= 0) {                     // walidacja dodatniej kwoty
            throw new InvalidArgumentException("Amount must be > 0");
        }
        $this->balance += $amount;              // zwiększ saldo
        return $this->balance;                  // zwróć nowe saldo
    }

    public function withdraw(float $amount): float {
        if ($amount > $this->balance) {         // sprawdź środki
            throw new RuntimeException("Insufficient funds");
        }
        $this->balance -= $amount;              // zmniejsz saldo
        return $this->balance;                  // zwróć nowe saldo
    }

    public function getBalance(): float {
        return $this->balance;                  // getter salda
    }
}

// Interfejs z kontraktem
interface Notifier {
    public function notify(string $message): void; // sygnatura powiadomienia
}

// Implementacja interfejsu
class EmailNotifier implements Notifier {
    public function __construct(private string $target) {} // skrócony zapis property promotion
    public function notify(string $message): void {
        // echo "Email to {$this->target}: $message\n";   // symulacja wysyłki
    }
}

// Dziedziczenie
class PremiumAccount extends BankAccount {
    public function applyBonus(float $percent): float {
        $bonus = $this->getBalance() * ($percent / 100); // oblicz bonus
        return $this->deposit($bonus);                   // dodaj do salda
    }
}

// Trait (współdzielona funkcjonalność)
trait LoggerTrait {
    protected function log(string $msg): void {
        // echo "[LOG] $msg\n";                          // szkic logowania
    }
}

class Service {
    use LoggerTrait;                                   // użycie traitu
    public function doWork(): void {
        $this->log("start");                           // log z traitu
        // ... praca
        $this->log("end");                             // log z traitu
    }
}

if (PHP_SAPI === "cli") {                              // demo CLI
    $acct = new PremiumAccount("Ala");                 // utwórz konto
    $acct->deposit(100);                               // wpłata
    $acct->applyBonus(10);                             // bonus 10%
    $notifier = new EmailNotifier("test@example.com"); // wstrzyknij adres
    $notifier->notify("Hello");                        // powiadom
}

// ---
// Dlaczego tak:
// - BankAccount/PremiumAccount pokazują enkapsulację, walidację i rozszerzenie funkcjonalności dziedziczeniem.
// - Interfejs Notifier + EmailNotifier ilustrują kontrakt i wstrzyknięcie zależności (DI) w konstruktorze.
// - Trait LoggerTrait demonstruje współdzielenie kodu między klasami bez wielokrotnego dziedziczenia.
// - Property promotion w konstruktorze to nowoczesny zapis PHP 8 upraszczający deklarację pól.
