// OOP w C#: klasy, właściwości, konstruktory, dziedziczenie, interfejsy, rekord.
using System;

// Klasa bazowa z enkapsulacją
public class BankAccount
{
    public string Owner { get; }             // tylko getter (read-only po ctor)
    private decimal balance;                 // pole prywatne

    public BankAccount(string owner)         // konstruktor
    {
        Owner = owner;                       // ustaw właściciela
        balance = 0m;                        // początkowe saldo
    }

    public decimal Deposit(decimal amount)   // metoda wpłaty
    {
        if (amount <= 0)                     // walidacja
            throw new ArgumentException("Amount must be > 0");
        balance += amount;                   // zwiększ saldo
        return balance;                      // zwróć nowe saldo
    }

    public decimal Withdraw(decimal amount)  // metoda wypłaty
    {
        if (amount > balance)                // brak środków
            throw new InvalidOperationException("Insufficient funds");
        balance -= amount;                   // zmniejsz saldo
        return balance;                      // zwróć nowe saldo
    }

    public decimal Balance => balance;       // właściwość tylko do odczytu
}

// Interfejs
public interface INotifier
{
    void Notify(string message);             // kontrakt powiadomień
}

// Implementacja interfejsu
public class EmailNotifier : INotifier
{
    private readonly string target;          // docelowy adres
    public EmailNotifier(string target) => this.target = target; // ctor skrócony
    public void Notify(string message)       // implementacja interfejsu
    {
        // Console.WriteLine($"Email to {target}: {message}"); // szkic wysyłki
    }
}

// Dziedziczenie
public class PremiumAccount : BankAccount
{
    public PremiumAccount(string owner) : base(owner) { } // pass do bazowego
    public decimal ApplyBonus(decimal percent)            // bonus procentowy
    {
        var bonus = Balance * percent / 100m;             // oblicz bonus
        return Deposit(bonus);                            // dopisz do salda
    }
}

// Rekord (niezmienne dane)
public record UserRecord(int Id, string Name);            // auto getery/with/eq

public class CSharpOopDemo
{
    public static void Main()
    {
        var acct = new PremiumAccount("Ala");             // utwórz konto
        acct.Deposit(100);                                // wpłać
        acct.ApplyBonus(10);                              // bonus 10%
        INotifier notifier = new EmailNotifier("test@example.com"); // polimorfizm
        notifier.Notify("Hello");                         // powiadom
        var ur = new UserRecord(1, "Bob");                // rekord jako DTO
        Console.WriteLine(ur);                            // ToString rekordu
    }
}

// ---
// Dlaczego tak:
// - BankAccount/PremiumAccount demonstrują enkapsulację, walidację i rozszerzenie klasy bazowej.
// - INotifier/EmailNotifier ilustrują polimorfizm poprzez interfejsy i wstrzyknięcie zależności.
// - Rekord UserRecord pokazuje nowoczesny, niemutowalny DTO w C#.
// - Main scala przykłady, by zobaczyć instancjonowanie, dziedziczenie i polimorfizm w praktyce.
