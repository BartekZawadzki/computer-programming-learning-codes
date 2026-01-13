// Interpreter (prosty): interpretacja mini-gramatyki. Przykład kalkulatora wyrażeń postaci "number op number".
// Uwaga: wersja edukacyjna – obsługuje +, -, *, / między dwoma operandami.

class Context {
  constructor(expression) {
    this.expression = expression; // wejściowe wyrażenie tekstowe
  }
}

// Abstrakcyjny wyrażenie
class Expression {
  interpret(_ctx) { throw new Error("interpret not implemented"); } // interpretacja
}

// Terminale: liczby
class NumberExpression extends Expression {
  constructor(value) {
    super();
    this.value = Number(value); // konwersja do number
  }
  interpret() { return this.value; } // zwraca liczbę
}

// Nieteriminal: binarna operacja (left op right)
class BinaryExpression extends Expression {
  constructor(left, op, right) {
    super();
    this.left = left; // lewe wyrażenie
    this.op = op; // operator
    this.right = right; // prawe wyrażenie
  }
  interpret() {
    const l = this.left.interpret(); // wartość lewa
    const r = this.right.interpret(); // wartość prawa
    switch (this.op) {
      case "+": return l + r; // dodawanie
      case "-": return l - r; // odejmowanie
      case "*": return l * r; // mnożenie
      case "/": return l / r; // dzielenie
      default: throw new Error("Unknown operator"); // błąd
    }
  }
}

// Parser bardzo prostego wyrażenia "a op b" (bez priorytetu/ nawiasów)
function parseSimple(exprText) {
  const parts = exprText.trim().split(" "); // oczekujemy "a op b"
  if (parts.length !== 3) throw new Error("Format: <number> <op> <number>");
  const [a, op, b] = parts; // rozdziel składniki
  const left = new NumberExpression(a); // operand 1
  const right = new NumberExpression(b); // operand 2
  return new BinaryExpression(left, op, right); // zbuduj AST
}

// Przykład użycia
const ctx = new Context("3 + 4"); // kontekst z wyrażeniem
const ast = parseSimple(ctx.expression); // parsowanie do AST
const result = ast.interpret(); // wynik = 7

module.exports = {
  Context,
  Expression,
  NumberExpression,
  BinaryExpression,
  parseSimple,
  ctx,
  ast,
  result,
};

// ---
// Dlaczego tak:
// - Interpreter buduje proste AST z NumberExpression i BinaryExpression, pokazując ideę gramatyki/parsowania.
// - parseSimple zakłada format "a op b", co upraszcza przykład i skupia się na mechanice interpretacji.
// - BinaryExpression wykonuje switch na operatorze, demonstrując rozszerzalność przez dodanie nowych case’ów.
// - Context trzyma surowe wejście, a interpretacja dzieje się w obiektach AST, rozdzielając etapy parse/execute.
