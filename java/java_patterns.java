// Wzorce w Javie: Singleton, Factory, Strategy, Observer, Decorator (funkcyjny via interfejs).

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

// Singleton z leniwą inicjalizacją (nie-thread-safe, wersja edukacyjna)
class LazySingleton {
    private static LazySingleton instance;          // statyczna referencja
    private LazySingleton() {}                      // prywatny konstruktor
    public static LazySingleton getInstance() {     // metoda dostępu
        if (instance == null) { instance = new LazySingleton(); } // utworzenie raz
        return instance;                            // zwrot instancji
    }
}

// Factory: tworzy obiekty zależnie od parametru
interface Animal { String speak(); }                // interfejs wspólny
class Dog implements Animal { public String speak() { return "Woof"; } } // implementacja
class Cat implements Animal { public String speak() { return "Meow"; } } // implementacja
class AnimalFactory {
    static Animal create(String kind) {             // metoda fabryczna
        return switch (kind) {                      // wybór implementacji
            case "dog" -> new Dog();                // pies
            case "cat" -> new Cat();                // kot
            default -> throw new IllegalArgumentException("Unknown kind"); // błąd
        };
    }
}

// Strategy: przekazujemy algorytm jako interfejs
interface DiscountStrategy { double apply(double price); } // strategia
class NoDiscount implements DiscountStrategy { public double apply(double p) { return p; } } // brak rabatu
class TenPercent implements DiscountStrategy { public double apply(double p) { return p * 0.9; } } // -10%
class PriceCalculator {
    private DiscountStrategy strategy;              // aktualna strategia
    public PriceCalculator(DiscountStrategy strategy) { this.strategy = strategy; } // konstruktor
    public double calc(double base) { return strategy.apply(base); } // zastosuj strategię
}

// Observer: prosta lista obserwatorów
interface Observer { void update(String msg); }     // interfejs obserwatora
class Subject {
    private final List<Observer> observers = new ArrayList<>(); // lista obserwatorów
    public void subscribe(Observer o) { observers.add(o); }      // dodaj obserwatora
    public void notifyAll(String msg) {                          // powiadom wszystkich
        for (Observer o : observers) { o.update(msg); }          // wywołaj update
    }
}

// Decorator: opakowanie funkcji (Function) – przykład funkcjonalny
class Decorators {
    static Function<String, String> withBrackets(Function<String, String> inner) { // dekorator
        return (s) -> "[" + inner.apply(s) + "]";          // dodaje nawiasy do wyniku
    }
}

public class java_patterns {
    public static void main(String[] args) {
        LazySingleton s1 = LazySingleton.getInstance();    // singleton
        LazySingleton s2 = LazySingleton.getInstance();    // ta sama instancja
        System.out.println(s1 == s2);                      // true

        Animal a = AnimalFactory.create("dog");            // factory
        System.out.println(a.speak());                     // "Woof"

        PriceCalculator calc = new PriceCalculator(new TenPercent()); // strategia -10%
        System.out.println(calc.calc(100));                // wynik 90

        Subject subj = new Subject();                      // subject
        subj.subscribe(msg -> System.out.println("obs1 " + msg)); // obserwator 1
        subj.subscribe(msg -> System.out.println("obs2 " + msg)); // obserwator 2
        subj.notifyAll("hello");                           // powiadom

        Function<String, String> base = String::toUpperCase;      // funkcja bazowa
        Function<String, String> decorated = Decorators.withBrackets(base); // dekoracja
        System.out.println(decorated.apply("test"));       // wynik "[TEST]"
    }
}

// ---
// Dlaczego tak:
// - Singleton/Factory/Strategy/Observer/Decorator to podstawowe wzorce GoF w wersji java-friendly.
// - LazySingleton pokazuje mechanizm leniwego tworzenia (z zaznaczeniem braku thread-safety w demo).
// - Factory z switch wyraźnie mapuje string -> implementacja; łatwo rozszerzyć.
// - Strategy/Observer utrzymują luźne powiązania, co upraszcza testy i wymienność zachowań.
// - Dekorator na Function pokazuje funkcjonalne podejście do opakowywania logiki.
