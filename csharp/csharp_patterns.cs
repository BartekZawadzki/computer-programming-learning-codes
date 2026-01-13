// Wzorce w C#: Singleton, Factory, Strategy, Observer, Decorator (funkcyjny).
using System;
using System.Collections.Generic;

// Singleton (lazy, thread-safe z Lazy<T>)
public sealed class LazySingleton
{
    private static readonly Lazy<LazySingleton> instance = new(() => new LazySingleton()); // leniwa inicjalizacja
    public static LazySingleton Instance => instance.Value;            // dostęp do instancji
    private LazySingleton() { }                                        // prywatny ctor
}

// Factory
public interface IAnimal { string Speak(); }                           // interfejs
public class Dog : IAnimal { public string Speak() => "Woof"; }        // implementacja
public class Cat : IAnimal { public string Speak() => "Meow"; }        // implementacja
public static class AnimalFactory
{
    public static IAnimal Create(string kind) => kind switch           // wybór implementacji
    {
        "dog" => new Dog(),
        "cat" => new Cat(),
        _ => throw new ArgumentException("Unknown kind")
    };
}

// Strategy
public interface IDiscountStrategy { decimal Apply(decimal price); }   // strategia
public class NoDiscount : IDiscountStrategy { public decimal Apply(decimal p) => p; } // brak rabatu
public class TenPercent : IDiscountStrategy { public decimal Apply(decimal p) => p * 0.9m; } // -10%
public class PriceCalculator
{
    private readonly IDiscountStrategy strategy;                       // wybrana strategia
    public PriceCalculator(IDiscountStrategy strategy) => this.strategy = strategy; // ctor
    public decimal Calc(decimal basePrice) => strategy.Apply(basePrice); // zastosuj strategię
}

// Observer (prosta lista subskrybentów)
public interface IObserver { void Update(string msg); }                // obserwator
public class Subject
{
    private readonly List<IObserver> observers = new();                // lista obserwatorów
    public void Subscribe(IObserver o) => observers.Add(o);            // dodaj obserwatora
    public void NotifyAll(string msg)                                  // powiadom wszystkich
    {
        foreach (var o in observers) o.Update(msg);                    // wywołaj update
    }
}

// Decorator (funkcyjny) – opakowanie Func<string, string>
public static class Decorators
{
    public static Func<string, string> WithBrackets(Func<string, string> inner) =>
        s => "[" + inner(s) + "]";                                     // dodaje nawiasy
}

public class CSharpPatternsDemo
{
    public static void Main()
    {
        var s1 = LazySingleton.Instance;                               // singleton
        var s2 = LazySingleton.Instance;                               // ta sama instancja
        Console.WriteLine(object.ReferenceEquals(s1, s2));             // true

        var animal = AnimalFactory.Create("dog");                      // factory
        Console.WriteLine(animal.Speak());                             // "Woof"

        var calc = new PriceCalculator(new TenPercent());              // strategia -10%
        Console.WriteLine(calc.Calc(100));                             // wynik 90

        var subj = new Subject();                                      // observer
        subj.Subscribe(new ConsoleObserver("obs1"));                   // dodaj obserwatora
        subj.Subscribe(new ConsoleObserver("obs2"));                   // dodaj obserwatora
        subj.NotifyAll("hello");                                       // powiadom

        Func<string, string> upper = s => s.ToUpper();                 // funkcja bazowa
        var decorated = Decorators.WithBrackets(upper);                // dekoracja
        Console.WriteLine(decorated("test"));                          // "[TEST]"
    }
}

// Prosta implementacja obserwatora
public class ConsoleObserver : IObserver
{
    private readonly string name;                                      // nazwa obserwatora
    public ConsoleObserver(string name) => this.name = name;           // ctor
    public void Update(string msg)                                     // reakcja na event
    {
        Console.WriteLine($"{name} {msg}");                            // wypisz
    }
}

// ---
// Dlaczego tak:
// - Zawiera klasyczne wzorce w idiomatycznym C#: Singleton z Lazy<T>, fabryka ze switch expression, strategie, obserwator, dekorator funkcyjny.
// - Lazy<T> zapewnia thread-safe lazy init bez ręcznego locka.
// - Factory/Strategy/Observer rozdzielają odpowiedzialności i ułatwiają wymienność oraz testowanie.
// - Dekorator na Func pokazuje, jak opakować logikę bez dziedziczenia.
// - ConsoleObserver i demo w Main ilustrują realne użycie wzorców.
