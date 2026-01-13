// Prototype: klonowanie obiektów bez zależności od ich konkretnych klas.
// Prosty przykład głębokiego klonu z metodą clone().

class DocumentPrototype {
  constructor({ title, content, meta }) {
    this.title = title; // tytuł dokumentu
    this.content = content; // treść
    this.meta = meta; // metadane (np. autor)
  }

  clone() {
    // głębsza kopia prostych struktur (przy złożonych użyj strukturalClone/lodash.cloneDeep)
    const copy = JSON.parse(JSON.stringify(this)); // prosta głęboka kopia danych
    return new DocumentPrototype(copy); // nowa instancja z kopiami pól
  }
}

// Przykład użycia
const original = new DocumentPrototype({
  title: "Specyfikacja",
  content: "Treść dokumentu",
  meta: { author: "Ala", version: 1 },
});

const draft = original.clone(); // klon
draft.meta.version = 2; // zmiana w klonie nie wpływa na oryginał

module.exports = { DocumentPrototype, original, draft };

// ---
// Dlaczego tak:
// - Prototype udostępnia clone(), co pozwala tworzyć kopie bez znajomości konkretnej klasy przy tworzeniu.
// - JSON.parse/stringify demonstruje prosty deep copy dla prymitywów/obiektów; w realnych złożonych strukturach użyj głębszych narzędzi.
// - Mutacja draft.meta nie wpływa na original, pokazując izolację stanu kopii.
// - Przykład original/draft ilustruje szybkie tworzenie wariantów dokumentu bez ponownego konstruowania od zera.
