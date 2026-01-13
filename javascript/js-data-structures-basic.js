// Struktury danych podstawowe: tablice, lista (linked list), stos, kolejka, mapa, zbiór

// Tablica: wbudowany typ do przechowywania sekwencji
const arr = [1, 2, 3]; // literal tablicy
arr.push(4); // dodanie na koniec
arr.pop(); // usunięcie z końca
arr.unshift(0); // dodanie na początek
arr.shift(); // usunięcie z początku

// Lista jednokierunkowa: węzły z referencją next
class ListNode {
  constructor(value, next = null) {
    this.value = value; // wartość węzła
    this.next = next; // wskaźnik na następny węzeł
  }
}

class LinkedList {
  constructor() {
    this.head = null; // pierwszy węzeł
  }
  prepend(value) {
    this.head = new ListNode(value, this.head); // wstaw na początek
  }
  append(value) {
    if (!this.head) return this.prepend(value); // jeśli pusta, użyj prepend
    let curr = this.head; // start od head
    while (curr.next) curr = curr.next; // idź do końca
    curr.next = new ListNode(value); // dodaj nowy węzeł
  }
  find(value) {
    let curr = this.head; // start od head
    while (curr) {
      if (curr.value === value) return curr; // znaleziono
      curr = curr.next; // idź dalej
    }
    return null; // brak
  }
}

// Stos (LIFO) przy użyciu tablicy
class Stack {
  constructor() {
    this.items = []; // przechowywane elementy
  }
  push(x) { this.items.push(x); } // dodaj na wierzch
  pop() { return this.items.pop(); } // zdejmij z wierzchu
  peek() { return this.items[this.items.length - 1]; } // podejrzyj wierzch
  isEmpty() { return this.items.length === 0; } // czy pusty
}

// Kolejka (FIFO) – tablica z przesuwaniem przodu
class Queue {
  constructor() {
    this.items = []; // przechowywane elementy
  }
  enqueue(x) { this.items.push(x); } // dodaj na koniec
  dequeue() { return this.items.shift(); } // zdejmij z początku
  front() { return this.items[0]; } // podejrzyj początek
  isEmpty() { return this.items.length === 0; } // czy pusta
}

// Mapy: klucz-wartość (dowolny typ klucza)
const phoneBook = new Map(); // nowa mapa
phoneBook.set("Ala", "111-222"); // ustaw klucz/wartość
phoneBook.get("Ala"); // odczyt
phoneBook.has("Ala"); // sprawdzenie obecności
phoneBook.delete("Ala"); // usunięcie

// Zbiory: unikalne wartości
const tags = new Set(["js", "css", "js"]); // duplikaty znikną
tags.add("html"); // dodanie
tags.has("css"); // sprawdzenie
tags.delete("js"); // usunięcie

// ---
// Dlaczego tak:
// - Plik pokazuje podstawowe struktury danych w JS: tablice, linked list, stos, kolejka, Map, Set.
// - LinkedList ilustruje ręczne wskaźniki next, co uczy modelu list powiązanych poza wbudowanymi tablicami.
// - Stack/Queue oparte na tablicy są krótkie i czytelne; metody push/pop/shift odzwierciedlają LIFO/FIFO.
// - Map/Set prezentują wbudowane kolekcje z unikalnymi kluczami/wartościami, wskazując typowe operacje (set/get/has/delete).
