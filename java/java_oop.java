// OOP w Javie: klasy, enkapsulacja, dziedziczenie, interfejsy, klasy abstrakcyjne, record.

// Klasa bazowa z polami prywatnymi i getterami/setterami
class Person {
    private String name;                         // pole prywatne
    private int age;                             // pole prywatne

    public Person(String name, int age) {        // konstruktor
        this.name = name;                        // przypisanie argumentu
        this.age = age;                          // przypisanie argumentu
    }

    public String getName() { return name; }     // getter
    public int getAge() { return age; }          // getter
    public void setAge(int age) { this.age = age; } // setter z walidacją (pominięta dla skrótu)
}

// Dziedziczenie: Student rozszerza Person
class Student extends Person {
    private String university;                   // dodatkowe pole
    public Student(String name, int age, String university) {
        super(name, age);                        // wywołanie konstruktora bazowego
        this.university = university;            // ustawienie pola
    }
    public String getUniversity() { return university; } // getter
}

// Interfejs: kontrakt na metodę notifyUser
interface Notifier {
    void notifyUser(String message);             // sygnatura metody
}

// Implementacja interfejsu
class EmailNotifier implements Notifier {
    private final String email;                  // docelowy adres
    public EmailNotifier(String email) { this.email = email; } // konstruktor
    public void notifyUser(String message) {     // implementacja metody interfejsu
        System.out.println("Email to " + email + ": " + message); // symulacja wysyłki
    }
}

// Klasa abstrakcyjna z metodą abstrakcyjną
abstract class Shape {
    abstract double area();                      // abstrakcyjna metoda pola
}

// Konkretny kształt: prostokąt
class Rectangle extends Shape {
    private final double w;                      // szerokość
    private final double h;                      // wysokość
    public Rectangle(double w, double h) {       // konstruktor
        this.w = w; this.h = h;                  // ustawienia pól
    }
    double area() { return w * h; }              // implementacja pola
}

// Record (Java 16+): niezmienny nośnik danych
record UserRecord(int id, String name) { }       // automatyczne gettery/equals/hashCode/toString

public class java_oop {
    public static void main(String[] args) {
        Person p = new Person("Ala", 30);        // tworzenie obiektu
        Student s = new Student("Ola", 22, "PW");// student z rozszerzeniem
        Notifier notifier = new EmailNotifier("test@example.com"); // polimorfizm via interfejs
        notifier.notifyUser("Hello");            // wywołanie implementacji
        Shape rect = new Rectangle(2, 3);        // polimorficzna referencja
        System.out.println("Pole=" + rect.area());// wynik metody
        UserRecord ur = new UserRecord(1, "Bob");// rekord jako DTO
        System.out.println(ur);                  // automatyczny toString
    }
}

// ---
// Dlaczego tak:
// - Person/Student pokazują enkapsulację, dziedziczenie i użycie super w konstruktorze.
// - Interfejs Notifier z EmailNotifier demonstruje polimorfizm i kontrakty.
// - Shape/Rectangle ilustrują klasy abstrakcyjne i implementację metod abstrakcyjnych.
// - Record to nowoczesny, niemutowalny DTO redukujący boilerplate.
// - main scala przykłady, by zobaczyć instancjonowanie, polimorfizm i wywołania metod w praktyce.
