# Struktury danych w Pythonie: stos/kolejka (list/deque), lista jednokierunkowa, dict/set, heapq.
from collections import deque  # efektywna kolejka/stack
import heapq                   # kopiec binarny (min-heap)

# Stos (LIFO) przy użyciu listy
class Stack:
  def __init__(self):
    self.items = []             # przechowywane elementy
  def push(self, item):
    self.items.append(item)     # dodaj na wierzch
  def pop(self):
    return self.items.pop() if self.items else None  # zdejmij z wierzchu
  def peek(self):
    return self.items[-1] if self.items else None    # podejrzyj
  def is_empty(self):
    return len(self.items) == 0                     # czy pusty

# Kolejka (FIFO) przy użyciu deque (lepsza niż list dla pop/append z obu stron)
class Queue:
  def __init__(self):
    self.items = deque()        # przechowywane elementy
  def enqueue(self, item):
    self.items.append(item)     # dodaj na koniec
  def dequeue(self):
    return self.items.popleft() if self.items else None  # zdejmij z początku
  def front(self):
    return self.items[0] if self.items else None        # podejrzyj początek
  def is_empty(self):
    return len(self.items) == 0                         # czy pusta

# Lista jednokierunkowa
class ListNode:
  def __init__(self, value, next=None):
    self.value = value          # wartość węzła
    self.next = next            # wskaźnik na następny

class LinkedList:
  def __init__(self):
    self.head = None            # pierwszy węzeł
  def prepend(self, value):
    self.head = ListNode(value, self.head)  # wstaw na początek
  def append(self, value):
    if not self.head:
      return self.prepend(value)            # jeśli pusta, użyj prepend
    cur = self.head
    while cur.next:
      cur = cur.next                        # idź do końca
    cur.next = ListNode(value)              # dodaj nowy węzeł
  def find(self, value):
    cur = self.head
    while cur:
      if cur.value == value:
        return cur                           # znaleziono
      cur = cur.next
    return None                              # brak

# Dict i set (wbudowane, O(1) średnio)
phone_book = {"Ala": "111-222"}    # słownik
tags = {"python", "js", "python"}   # zbiór usuwa duplikaty

# Kopiec (min-heap) – przydatny w algorytmach
nums = [5, 3, 8]
heapq.heapify(nums)                 # zamienia listę w kopiec
heapq.heappush(nums, 1)             # dodaj element
smallest = heapq.heappop(nums)      # usuń najmniejszy

if __name__ == "__main__":
  stack = Stack(); stack.push(1); stack.push(2)
  queue = Queue(); queue.enqueue("a"); queue.enqueue("b")
  ll = LinkedList(); ll.append(10); ll.prepend(5)
  print(smallest)                   # przykład użycia kopca

# ---
# Dlaczego tak:
# - Stack/Queue pokazują podstawowe struktury na list/deque i ich operacje O(1).
# - LinkedList demonstruje ręczne wskaźniki next, co pomaga zrozumieć listy powiązane.
# - Dict/set i heapq to wbudowane, wydajne struktury często używane w zadaniach algorytmicznych.
# - Blok __main__ daje szybki smoke test struktur bez osobnych testów.
