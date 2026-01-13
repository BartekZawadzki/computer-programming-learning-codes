// EventEmitter i proste strumienie w Node
const { EventEmitter } = require("events"); // wbudowany EventEmitter
const { Readable, Writable, Transform } = require("stream"); // moduł stream

// EventEmitter: pub/sub wewnątrz procesu
const bus = new EventEmitter(); // kanał zdarzeń
bus.on("data", (payload) => {
  console.log("otrzymano payload", payload); // reakcja na zdarzenie
});
bus.emit("data", { ts: Date.now(), value: 42 }); // publikacja zdarzenia

// Strumień czytający: generuje liczby 1..3
class NumberSource extends Readable {
  constructor(options) { super(options); this.current = 1; } // start od 1
  _read() {
    if (this.current <= 3) {
      this.push(String(this.current)); // wypchnij liczbę jako tekst
      this.current += 1; // kolejna
    } else {
      this.push(null); // koniec strumienia (EOF)
    }
  }
}

// Transform: dodaje nawiasy do danych tekstowych
class BracketTransform extends Transform {
  _transform(chunk, _enc, callback) {
    const input = chunk.toString(); // konwersja do string
    const output = `[${input}]`; // dodaj nawiasy
    this.push(output); // wyślij dalej
    callback(); // sygnalizacja zakończenia transformacji
  }
}

// Writable: wypisuje do konsoli
class ConsoleSink extends Writable {
  _write(chunk, _enc, callback) {
    console.log("sink:", chunk.toString()); // wypisanie danych
    callback(); // zakończ zapis
  }
}

// Przykładowe połączenie strumieni
function demoStreams() {
  const source = new NumberSource(); // źródło liczb
  const transform = new BracketTransform(); // transformacja
  const sink = new ConsoleSink(); // odbiornik
  source.pipe(transform).pipe(sink); // łączenie rurociągiem
}

if (require.main === module) {
  demoStreams(); // uruchom demo przy bezpośrednim wywołaniu pliku
}

module.exports = { bus, demoStreams, NumberSource, BracketTransform, ConsoleSink };

// ---
// Dlaczego tak:
// - EventEmitter pokazuje prosty pub/sub wewnątrz procesu, bez zewnętrznych brokerów.
// - Strumienie Readable/Transform/Writable ilustrują model streamów Node (pull/push, backpressure).
// - demoStreams łączy source→transform→sink, co odzwierciedla typowy pipeline (np. plik → gzip → sieć).
// - Eksport klas/instancji ułatwia testowanie i ponowne użycie komponentów strumieniowych.
