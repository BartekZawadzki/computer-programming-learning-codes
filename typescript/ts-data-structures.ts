// Generyczne struktury danych w TS: stos, kolejka, Maybe/Option, prosty graph

// Stos (LIFO)
class Stack<T> {
  private items: T[] = []; // wewnętrzna tablica
  push(item: T): void { this.items.push(item); } // dodaj na wierzch
  pop(): T | undefined { return this.items.pop(); } // zdejmij z wierzchu
  peek(): T | undefined { return this.items[this.items.length - 1]; } // podejrzyj wierzch
  isEmpty(): boolean { return this.items.length === 0; } // czy pusty
}

// Kolejka (FIFO)
class Queue<T> {
  private items: T[] = []; // dane
  enqueue(item: T): void { this.items.push(item); } // dodaj na koniec
  dequeue(): T | undefined { return this.items.shift(); } // zdejmij z początku
  front(): T | undefined { return this.items[0]; } // podejrzyj początek
  isEmpty(): boolean { return this.items.length === 0; } // czy pusta
}

// Maybe/Option – prosty monadyczny wrapper na wartość, która może być pusta
class Maybe<T> {
  private constructor(private value: T | null | undefined) {} // prywatny konstruktor
  static some<T>(v: T): Maybe<T> { return new Maybe(v); } // wariant z wartością
  static none<T>(): Maybe<T> { return new Maybe<T>(undefined); } // wariant pusty

  map<U>(fn: (v: T) => U): Maybe<U> {
    if (this.value === null || this.value === undefined) return Maybe.none<U>(); // brak wartości
    return Maybe.some(fn(this.value)); // przekształć wartość
  }

  getOrElse(fallback: T): T {
    if (this.value === null || this.value === undefined) return fallback; // zwróć zapas
    return this.value; // zwróć wartość
  }
}

// Graf nieskierowany jako mapa: wierzchołek -> lista sąsiadów
class Graph<T> {
  private adj: Map<T, T[]> = new Map(); // lista sąsiedztwa

  addVertex(v: T): void {
    if (!this.adj.has(v)) this.adj.set(v, []); // dodaj wierzchołek
  }

  addEdge(u: T, v: T): void {
    this.addVertex(u); this.addVertex(v); // upewnij się, że istnieją
    this.adj.get(u)!.push(v); // dodaj krawędź u->v
    this.adj.get(v)!.push(u); // i v->u (nieskierowany)
  }

  neighbors(v: T): T[] {
    return this.adj.get(v) ?? []; // lista sąsiadów lub pusty array
  }
}
