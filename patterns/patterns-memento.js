// Memento: zapisywanie i przywracanie stanu obiektu bez naruszania enkapsulacji.
// Przykład: edytor tekstu z undo opartym o memento (snapshots stanu).

// Memento – przechowuje stan (tutaj prosty string)
class Memento {
  constructor(state) {
    this.state = state; // zapisany stan
  }
  getState() { return this.state; } // dostęp do stanu
}

// Originator – obiekt, którego stan zapisujemy/przywracamy
class TextEditor {
  constructor() {
    this.content = ""; // bieżąca zawartość
  }
  type(text) { this.content += text; } // dopisz tekst
  save() { return new Memento(this.content); } // utwórz memento (snapshot)
  restore(memento) { this.content = memento.getState(); } // przywróć stan
}

// Caretaker – zarządza historią mement
class History {
  constructor() { this.stack = []; } // stos mement
  push(memento) { this.stack.push(memento); } // zapisz memento
  pop() { return this.stack.pop(); } // pobierz ostatnie memento
}

// Przykład użycia
const editorM = new TextEditor(); // edytor
const history = new History(); // historia mement

editorM.type("Ala "); // pisz
history.push(editorM.save()); // snapshot po "Ala "

editorM.type("ma kota"); // pisz dalej
history.push(editorM.save()); // snapshot po "Ala ma kota"

editorM.type(" i psa"); // dodaj
// Cofnij do poprzedniego stanu
const prev = history.pop(); // pobierz ostatni snapshot
editorM.restore(prev); // przywróć
// editorM.content === "Ala ma kota"

module.exports = { Memento, TextEditor, History, editorM, history };

// ---
// Dlaczego tak:
// - Memento przechowuje stan, a TextEditor tworzy/przywraca snapshoty bez ujawniania wewnętrznej struktury.
// - History działa jako caretaker i zarządza stosem mement, rozdzielając odpowiedzialności (SRP).
// - type/save/restore pokazują, jak uzyskać undo bez kopiowania logiki edytora w innych klasach.
// - Stos push/pop ilustruje naturalny kierunek historii (LIFO), ułatwiając wiele cofnięć.
