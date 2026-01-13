// Testy w C# z xUnit (przykłady asercji). Wymaga zależności xunit + xunit.runner.
// Kod testów zwykle w osobnym projekcie *.Tests; tu szkic klas.
using Xunit;

public static class MathUtil
{
    public static int Add(int a, int b) => a + b;         // funkcja do testu
}

public class MathUtilTests
{
    [Fact]
    public void AddsPositive()
    {
        Assert.Equal(5, MathUtil.Add(2, 3));               // asercja równości
    }

    [Fact]
    public void AddsNegative()
    {
        Assert.Equal(-3, MathUtil.Add(-1, -2));            // suma ujemnych
    }

    [Theory]
    [InlineData(2, 2, 4)]
    [InlineData(7, 0, 7)]
    public void AddsWithTheory(int a, int b, int expected)
    {
        Assert.Equal(expected, MathUtil.Add(a, b));        // test parametryzowany
    }
}

// ---
// Dlaczego tak:
// - MathUtil jako statyczna klasa minimalizuje zależności i skupia test na logice.
// - xUnit z Fact/Theory/InlineData pokazuje zarówno pojedyncze przypadki, jak i testy parametryzowane.
// - Asercje Equal ilustrują podstawowy wzorzec AAA (Arrange/Act/Assert) w najprostszej formie.
// - Szkic można łatwo przenieść do osobnego projektu testowego (*.Tests) zgodnie z konwencją .NET.
