// Command: enkapsuluje polecenie w obiekt, umożliwia kolejkowanie/undo/logowanie.

// Interfejs/klasa bazowa polecenia
class Command {
  execute() { throw new Error("execute not implemented"); } // wykonanie
  undo() { /* opcjonalne */ } // cofnięcie (tu puste domyślne)
}

// Odbiorca (receiver): prosty edytor tekstu
class TextEditor {
  constructor() { this.text = ""; } // przechowywany tekst
  insert(value) { this.text += value; } // dopisz
  deleteLast(count) { this.text = this.text.slice(0, -count); } // usuń
}

// Konkretne polecenie: InsertText
class InsertCommand extends Command {
  constructor(editor, value) {
    super();
    this.editor = editor; // odbiorca
    this.value = value; // tekst do wstawienia
  }
  execute() { this.editor.insert(this.value); } // wykonanie
  undo() { this.editor.deleteLast(this.value.length); } // cofnięcie
}

// Invoker: przechowuje historię, wykonuje i cofa
class CommandInvoker {
  constructor() { this.history = []; } // stos poleceń

  run(command) {
    command.execute(); // wykonaj polecenie
    this.history.push(command); // zapisz do historii
  }

  undo() {
    const cmd = this.history.pop(); // pobierz ostatnie
    if (cmd && cmd.undo) cmd.undo(); // cofnięcie
  }
}

// Przykład użycia
const editor = new TextEditor(); // odbiorca
const invoker = new CommandInvoker(); // invoker
invoker.run(new InsertCommand(editor, "Hello ")); // dodaj tekst
invoker.run(new InsertCommand(editor, "World")); // dodaj tekst
// editor.text === "Hello World"
invoker.undo(); // cofamy ostatnie polecenie
// editor.text === "Hello "

module.exports = {
  Command,
  TextEditor,
  InsertCommand,
  CommandInvoker,
  editor,
  invoker,
};

// ---
// Dlaczego tak:
// - Wzorzec Command pakuje akcję w obiekt z execute/undo, co pozwala na historię i cofanie.
// - TextEditor to receiver, a InsertCommand wywołuje na nim insert/deleteLast, więc logika jest w odbiorcy.
// - CommandInvoker zarządza historią i kolejnością, oddzielając wykonanie od wywołującego kodu.
// - Przykład pokazuje run/undo i stan editor.text, co ilustruje przydatność undo bez dodatkowych if-else.
