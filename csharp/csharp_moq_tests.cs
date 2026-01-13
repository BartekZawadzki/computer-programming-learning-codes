// Testy z Moq + xUnit: mockowanie zależności, verify wywołań, setup zwrotów/wyjątków.
// Wymaga pakietów: Moq, xunit, xunit.runner.visualstudio.
using Moq;
using Xunit;

public interface IRepo
{
    string Save(string value);               // kontrakt repozytorium
}

public class Service
{
    private readonly IRepo repo;             // zależność
    public Service(IRepo repo) { this.repo = repo; } // ctor

    public string Process(string input)
    {
        if (input == null) throw new ArgumentNullException(nameof(input)); // walidacja
        return repo.Save(input.ToUpper());         // logika + delegacja do repo
    }
}

public class ServiceTests
{
    [Fact]
    public void Process_SavesUppercased()
    {
        var repo = new Mock<IRepo>();              // utwórz mock
        repo.Setup(r => r.Save("ABC")).Returns("ok"); // setup dla konkretnego argumentu

        var sut = new Service(repo.Object);        // SUT z mockiem
        var result = sut.Process("abc");           // wywołanie

        Assert.Equal("ok", result);                // asercja wyniku
        repo.Verify(r => r.Save("ABC"), Times.Once); // verify że Save z "ABC" raz
    }

    [Fact]
    public void Process_ThrowsOnNull()
    {
        var repo = new Mock<IRepo>();              // mock (tu nieużywany)
        var sut = new Service(repo.Object);        // SUT

        Assert.Throws<ArgumentNullException>(() => sut.Process(null!)); // oczekiwany wyjątek
        repo.VerifyNoOtherCalls();                 // brak wywołań na mocku
    }
}

// ---
// Dlaczego tak:
// - Moq + xUnit to popularny duet do testowania z mockami; pokazujemy setup/verify i obsługę wyjątków.
// - Walidacja null w SUT chroni przed błędnym wejściem i jest testowana osobno.
// - Verify/VerifyNoOtherCalls upewnia, że interakcje z zależnością są dokładnie takie, jak oczekiwane.
// - Setup na konkretnym argumencie demonstruje, jak sterować zachowaniem mocka w zależności od wejścia.
