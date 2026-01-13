// Zaawansowane struktury: drzewo BST, kopiec (min-heap), graf (lista sąsiedztwa),
// trie (prefiksy), tabela haszująca (prosty bucket)

// Drzewo BST: wstawianie i wyszukiwanie w O(log n) średnio
class BSTNode {
  constructor(value) {
    this.value = value; // wartość węzła
    this.left = null; // lewy potomek
    this.right = null; // prawy potomek
  }
}

class BST {
  constructor() { this.root = null; }
  insert(value, node = this.root) {
    if (!this.root) { this.root = new BSTNode(value); return; } // puste drzewo
    if (value < node.value) {
      if (!node.left) node.left = new BSTNode(value); // wstaw w lewo
      else this.insert(value, node.left); // rekurencja
    } else {
      if (!node.right) node.right = new BSTNode(value); // wstaw w prawo
      else this.insert(value, node.right); // rekurencja
    }
  }
  find(value, node = this.root) {
    if (!node) return null; // brak węzła
    if (node.value === value) return node; // trafiono
    return value < node.value ? this.find(value, node.left) : this.find(value, node.right); // zejście
  }
}

// Kopiec minimalny (tablica jako drzewo binarne)
class MinHeap {
  constructor() { this.data = []; } // wewnętrzna tablica
  parent(i) { return Math.floor((i - 1) / 2); } // indeks rodzica
  left(i) { return 2 * i + 1; } // lewe dziecko
  right(i) { return 2 * i + 2; } // prawe dziecko
  swap(a, b) { [this.data[a], this.data[b]] = [this.data[b], this.data[a]]; } // zamiana

  push(x) {
    this.data.push(x); // dodaj na koniec
    this.heapifyUp(this.data.length - 1); // przywróć własność kopca
  }
  heapifyUp(i) {
    while (i > 0 && this.data[this.parent(i)] > this.data[i]) {
      this.swap(i, this.parent(i)); // zamień z rodzicem
      i = this.parent(i); // idź w górę
    }
  }
  pop() {
    if (this.data.length === 0) return undefined; // pusty
    const min = this.data[0]; // najmniejszy
    const last = this.data.pop(); // ostatni element
    if (this.data.length) {
      this.data[0] = last; // przenieś ostatni na górę
      this.heapifyDown(0); // przywróć własność
    }
    return min; // zwróć minimum
  }
  heapifyDown(i) {
    const n = this.data.length; // długość kopca
    while (true) {
      let smallest = i; // zakładamy bieżący jako najmniejszy
      const l = this.left(i), r = this.right(i); // indeksy dzieci
      if (l < n && this.data[l] < this.data[smallest]) smallest = l; // mniejsze lewe
      if (r < n && this.data[r] < this.data[smallest]) smallest = r; // mniejsze prawe
      if (smallest === i) break; // własność spełniona
      this.swap(i, smallest); // zamień z mniejszym dzieckiem
      i = smallest; // kontynuuj w dół
    }
  }
}

// Graf jako lista sąsiedztwa: Map wierzchołek -> tablica sąsiadów
class Graph {
  constructor() { this.adj = new Map(); } // mapa sąsiedztwa
  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, []); // dodaj pustą listę sąsiadów
  }
  addEdge(u, v) {
    this.addVertex(u); this.addVertex(v); // upewnij się, że wierzchołki istnieją
    this.adj.get(u).push(v); // krawędź u->v
    this.adj.get(v).push(u); // dla grafu nieskierowanego dodaj v->u
  }
  neighbors(v) { return this.adj.get(v) || []; } // lista sąsiadów
}

// Trie: przechowywanie słów po prefiksach
class TrieNode {
  constructor() {
    this.children = new Map(); // litera -> węzeł
    this.isEnd = false; // czy koniec słowa
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root; // start od korzenia
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode()); // twórz węzeł
      node = node.children.get(ch); // przejdź do dziecka
    }
    node.isEnd = true; // oznacz koniec słowa
  }
  search(word) {
    let node = this.root; // start
    for (const ch of word) {
      node = node.children.get(ch); // przejście
      if (!node) return false; // brak ścieżki
    }
    return node.isEnd; // true tylko jeśli koniec słowa
  }
  startsWith(prefix) {
    let node = this.root; // start
    for (const ch of prefix) {
      node = node.children.get(ch); // przejście
      if (!node) return false; // brak prefiksu
    }
    return true; // prefiks istnieje
  }
}

// Prosta tabela haszująca z łańcuchowaniem (kolizje przechowywane w bucketach)
class HashTable {
  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []); // tablica bucketów
  }
  hash(key) {
    const str = String(key); // klucz jako string
    let h = 0; // akumulator
    for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0; // prosty hash
    return h % this.buckets.length; // indeks bucketu
  }
  set(key, value) {
    const idx = this.hash(key); // znajdź bucket
    const bucket = this.buckets[idx]; // bucket
    const found = bucket.find((pair) => pair[0] === key); // szukaj istniejącego
    if (found) found[1] = value; // aktualizuj
    else bucket.push([key, value]); // dodaj nową parę
  }
  get(key) {
    const idx = this.hash(key); // bucket
    const bucket = this.buckets[idx]; // dane
    const found = bucket.find((pair) => pair[0] === key); // szukaj pary
    return found ? found[1] : undefined; // wartość lub undefined
  }
  has(key) {
    return this.get(key) !== undefined; // sprawdź obecność
  }
}

// ---
// Dlaczego tak:
// - Zebrano kilka kluczowych struktur: BST (średnio O(log n) dla insert/find), MinHeap (priorytety), Graph (lista sąsiedztwa), Trie (prefiksy), HashTable (łańcuchowanie kolizji).
// - MinHeap utrzymuje własność kopca przez heapifyUp/heapifyDown, co pozwala na push/pop w O(log n).
// - Trie pokazuje, jak przechowywać słowa znak po znaku i sprawdzać prefiks/pełne słowo bez liniowego szukania w tablicy stringów.
// - HashTable używa prostego hasha i bucketów, ilustrując ideę rozpraszania i obsługi kolizji przez listy.
// - Graph na Mapach ułatwia operacje na wierzchołkach dowolnego typu, a addEdge dodaje krawędzie nieskierowane jako przykład.
