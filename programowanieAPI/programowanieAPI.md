# Programowanie API – Kompletny Przewodnik

Przewodnik krok po kroku dotyczący tworzenia i wykorzystywania API (Application Programming Interface) w własnych projektach. Zawiera teorię, praktyczne przykłady i najlepsze praktyki.

---

## Spis treści

1. [Wprowadzenie do API](#wprowadzenie-do-api)
2. [Rodzaje API](#rodzaje-api)
3. [REST API – Podstawy](#rest-api--podstawy)
4. [Tworzenie API – Krok po kroku](#tworzenie-api--krok-po-kroku)
5. [Metody HTTP](#metody-http)
6. [Statusy odpowiedzi HTTP](#statusy-odpowiedzi-http)
7. [Wykorzystywanie API](#wykorzystywanie-api)
8. [Autentykacja i autoryzacja](#autentykacja-i-autoryzacja)
9. [Walidacja danych](#walidacja-danych)
10. [Obsługa błędów](#obsługa-błędów)
11. [Najlepsze praktyki](#najlepsze-praktyki)
12. [Przykłady praktyczne](#przykłady-praktyczne)

---

## Wprowadzenie do API

### Co to jest API?

**API (Application Programming Interface)** to zestaw reguł, protokołów i narzędzi umożliwiających komunikację między różnymi aplikacjami lub komponentami systemu.

**Analogia:** API działa jak kelner w restauracji:
- **Klient (aplikacja frontendowa)** składa zamówienie (żądanie)
- **Kelner (API)** przekazuje zamówienie do kuchni (backend)
- **Kuchnia (serwer)** przygotowuje danie (przetwarza dane)
- **Kelner** przynosi gotowe danie (odpowiedź) do klienta

### Dlaczego używamy API?

1. **Rozdzielenie frontendu i backendu** – pozwala na niezależny rozwój
2. **Wieloplatformowość** – jedno API może obsługiwać web, mobile, desktop
3. **Skalowalność** – łatwiejsze zarządzanie i rozbudowa
4. **Bezpieczeństwo** – centralne zarządzanie dostępem do danych
5. **Reużywalność** – jedna logika biznesowa dla wielu klientów

### Jak działa API?

```
┌─────────────┐         HTTP Request          ┌─────────────┐
│   Klient    │ ────────────────────────────> │     API     │
│ (Frontend)  │                                │  (Backend)  │
└─────────────┘                                └─────────────┘
       │                                              │
       │                                              │
       │         HTTP Response (JSON/XML)             │
       │ <─────────────────────────────────────────── │
       │                                              │
       │                                              ▼
       │                                      ┌─────────────┐
       │                                      │   Baza      │
       │                                      │   Danych    │
       └──────────────────────────────────────> └─────────────┘
```

**Przykład żądania:**
```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
```

**Przykład odpowiedzi:**
```json
{
  "id": 123,
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## Rodzaje API

### 1. REST API (Representational State Transfer)

**Najpopularniejszy typ API** wykorzystujący standardowe metody HTTP.

**Charakterystyka:**
- Bezstanowe (stateless) – każde żądanie jest niezależne
- Używa standardowych metod HTTP (GET, POST, PUT, DELETE)
- Dane zwracane w formacie JSON lub XML
- Zasoby identyfikowane przez URL

**Przykład:**
```
GET    /api/users          → lista użytkowników
GET    /api/users/123      → użytkownik o ID 123
POST   /api/users          → utworzenie użytkownika
PUT    /api/users/123      → aktualizacja użytkownika
DELETE /api/users/123      → usunięcie użytkownika
```

### 2. GraphQL API

**Alternatywa dla REST**, pozwala klientowi określić dokładnie jakie dane chce otrzymać.

**Charakterystyka:**
- Jeden endpoint dla wszystkich zapytań
- Klient określa strukturę odpowiedzi
- Mniej nadmiarowych danych
- Wymaga bardziej złożonej implementacji

**Przykład:**
```graphql
query {
  user(id: 123) {
    name
    email
    posts {
      title
      content
    }
  }
}
```

### 3. SOAP API (Simple Object Access Protocol)

**Starszy protokół**, głównie używany w systemach enterprise.

**Charakterystyka:**
- XML jako format danych
- Ścisła struktura i walidacja
- Wbudowane zabezpieczenia
- Bardziej złożony niż REST

### 4. WebSocket API

**Dwukierunkowa komunikacja w czasie rzeczywistym.**

**Charakterystyka:**
- Połączenie trwałe
- Serwer może wysyłać dane bez żądania klienta
- Idealne dla czatów, notyfikacji, gier online

---

## REST API – Podstawy

### Zasady projektowania REST API

#### 1. Zasoby (Resources)

Zasoby to obiekty, które reprezentujemy w API. Powinny być rzeczownikami w liczbie mnogiej.

**Dobrze:**
```
/api/users
/api/products
/api/orders
```

**Źle:**
```
/api/getUser
/api/createProduct
/api/userData
```

#### 2. URL Structure (Struktura URL)

**Hierarchiczna struktura:**
```
/api/v1/users/123/posts/456
```

**Wyjaśnienie:**
- `/api` – prefiks API
- `/v1` – wersja API
- `/users` – kolekcja użytkowników
- `/123` – konkretny użytkownik (ID)
- `/posts` – kolekcja postów użytkownika
- `/456` – konkretny post (ID)

#### 3. Metody HTTP

Każda metoda ma określone znaczenie:

| Metoda | Akcja | Idempotentna? | Body? |
|--------|-------|---------------|-------|
| GET | Pobranie danych | Tak | Nie |
| POST | Utworzenie zasobu | Nie | Tak |
| PUT | Pełna aktualizacja | Tak | Tak |
| PATCH | Częściowa aktualizacja | Nie | Tak |
| DELETE | Usunięcie zasobu | Tak | Nie |

**Idempotentność** – wielokrotne wykonanie tej samej operacji daje ten sam wynik.

#### 4. Status Codes (Kody statusu)

Każda odpowiedź powinna mieć odpowiedni kod statusu HTTP (szczegóły w sekcji "Statusy odpowiedzi HTTP").

---

## Tworzenie API – Krok po kroku

### Krok 1: Przygotowanie środowiska

#### Node.js + Express

```bash
# Inicjalizacja projektu
npm init -y

# Instalacja zależności
npm install express cors dotenv

# Opcjonalnie: narzędzia deweloperskie
npm install --save-dev nodemon
```

#### Struktura projektu

```
projekt-api/
├── server.js           # Główny plik serwera
├── routes/             # Definicje tras
│   ├── users.js
│   └── products.js
├── controllers/        # Logika biznesowa
│   ├── userController.js
│   └── productController.js
├── models/             # Modele danych
│   └── User.js
├── middleware/         # Middleware
│   ├── auth.js
│   └── validation.js
├── config/             # Konfiguracja
│   └── database.js
├── .env               # Zmienne środowiskowe
└── package.json
```

### Krok 2: Podstawowy serwer

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());              // Zezwalaj na żądania z innych domen
app.use(express.json());      // Parsuj JSON w body żądań

// Podstawowa trasa
app.get('/', (req, res) => {
  res.json({ message: 'API działa!' });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
```

**Uruchomienie:**
```bash
node server.js
```

### Krok 3: Definiowanie tras (Routes)

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// Tymczasowa "baza danych" w pamięci
let users = [
  { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
  { id: 2, name: 'Anna Nowak', email: 'anna@example.com' }
];

// GET /api/users - Pobierz wszystkich użytkowników
router.get('/', (req, res) => {
  res.json(users);
});

// GET /api/users/:id - Pobierz użytkownika po ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
  }
  
  res.json(user);
});

// POST /api/users - Utwórz nowego użytkownika
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Brakuje wymaganych pól' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
```

**Podłączenie tras do serwera:**
```javascript
// server.js
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);
```

### Krok 4: Kontrolery (Controllers)

Kontrolery zawierają logikę biznesową, oddzieloną od definicji tras.

```javascript
// controllers/userController.js
let users = []; // W rzeczywistości to byłoby połączenie z bazą danych

// Pobierz wszystkich użytkowników
const getAllUsers = (req, res) => {
  res.json(users);
};

// Pobierz użytkownika po ID
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
  }
  
  res.json(user);
};

// Utwórz nowego użytkownika
const createUser = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Brakuje wymaganych pól' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
```

**Użycie w trasach:**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

module.exports = router;
```

### Krok 5: Middleware

Middleware to funkcje wykonywane przed dotarciem żądania do kontrolera.

#### Przykład: Middleware logowania

```javascript
// middleware/logger.js
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next(); // Przekaż kontrolę do następnego middleware/handlera
};

module.exports = logger;
```

#### Przykład: Middleware autentykacji

```javascript
// middleware/auth.js
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego' });
  }
  
  // W rzeczywistości tutaj weryfikowalibyśmy token (JWT, OAuth, itp.)
  if (token !== 'Bearer valid-token') {
    return res.status(403).json({ error: 'Nieprawidłowy token' });
  }
  
  // Dodaj informacje o użytkowniku do żądania
  req.user = { id: 1, name: 'Jan Kowalski' };
  next();
};

module.exports = authenticate;
```

**Użycie middleware:**
```javascript
// routes/users.js
const authenticate = require('../middleware/auth');
const logger = require('../middleware/logger');

// Zastosuj middleware do wszystkich tras
router.use(logger);
router.use(authenticate);

// Lub do konkretnych tras
router.get('/private', authenticate, (req, res) => {
  res.json({ message: 'To jest chroniona trasa' });
});
```

---

## Metody HTTP

### GET – Pobieranie danych

**Charakterystyka:**
- Tylko do odczytu
- Nie zmienia stanu serwera
- Może mieć parametry query string
- Nie powinien mieć body

**Przykład:**
```javascript
// GET /api/users?page=1&limit=10
router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  const paginatedUsers = users.slice(start, end);
  res.json({
    data: paginatedUsers,
    page,
    limit,
    total: users.length
  });
});
```

### POST – Tworzenie zasobów

**Charakterystyka:**
- Tworzy nowy zasób
- Wymaga body z danymi
- Zwraca kod 201 (Created)
- Nie jest idempotentna

**Przykład:**
```javascript
// POST /api/users
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
  // Walidacja
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Brakuje wymaganych pól' });
  }
  
  // Sprawdź czy email już istnieje
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email już istnieje' });
  }
  
  const newUser = {
    id: Date.now(), // Prosty sposób na unikalne ID
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});
```

### PUT – Pełna aktualizacja

**Charakterystyka:**
- Aktualizuje cały zasób
- Idempotentna (wielokrotne wywołanie daje ten sam efekt)
- Jeśli zasób nie istnieje, może go utworzyć

**Przykład:**
```javascript
// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    // Utwórz nowy zasób, jeśli nie istnieje
    const newUser = {
      id,
      name,
      email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return res.status(201).json(newUser);
  }
  
  // Aktualizuj istniejący zasób
  users[userIndex] = {
    ...users[userIndex],
    name,
    email,
    updatedAt: new Date().toISOString()
  };
  
  res.json(users[userIndex]);
});
```

### PATCH – Częściowa aktualizacja

**Charakterystyka:**
- Aktualizuje tylko podane pola
- Nie jest idempotentna
- Jeśli zasób nie istnieje, zwraca 404

**Przykład:**
```javascript
// PATCH /api/users/:id
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
  }
  
  // Aktualizuj tylko podane pola
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  res.json(users[userIndex]);
});
```

### DELETE – Usuwanie zasobów

**Charakterystyka:**
- Usuwa zasób
- Idempotentna (usunięcie nieistniejącego zasobu zwraca 404, ale efekt jest taki sam)
- Nie wymaga body

**Przykład:**
```javascript
// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.status(200).json({ message: 'Użytkownik usunięty', user: deletedUser });
});
```

---

## Statusy odpowiedzi HTTP

### Kategorie kodów statusu

#### 2xx – Sukces

| Kod | Nazwa | Opis | Kiedy używać |
|-----|-------|------|--------------|
| 200 | OK | Żądanie zakończone sukcesem | GET, PUT, PATCH, DELETE |
| 201 | Created | Zasób został utworzony | POST (utworzenie) |
| 204 | No Content | Sukces bez zawartości | DELETE (bez zwracania danych) |

#### 4xx – Błąd klienta

| Kod | Nazwa | Opis | Kiedy używać |
|-----|-------|------|--------------|
| 400 | Bad Request | Nieprawidłowe żądanie | Błędne dane w body |
| 401 | Unauthorized | Brak autoryzacji | Brak lub nieprawidłowy token |
| 403 | Forbidden | Zabronione | Brak uprawnień |
| 404 | Not Found | Nie znaleziono | Zasób nie istnieje |
| 409 | Conflict | Konflikt | Duplikat (np. email już istnieje) |
| 422 | Unprocessable Entity | Nie można przetworzyć | Walidacja nie przeszła |

#### 5xx – Błąd serwera

| Kod | Nazwa | Opis | Kiedy używać |
|-----|-------|------|--------------|
| 500 | Internal Server Error | Błąd serwera | Nieoczekiwany błąd |
| 503 | Service Unavailable | Serwis niedostępny | Serwer przeciążony lub w konserwacji |

### Przykłady użycia

```javascript
// 200 OK - Sukces
res.status(200).json({ data: users });

// 201 Created - Utworzono zasób
res.status(201).json({ message: 'Użytkownik utworzony', user: newUser });

// 400 Bad Request - Błędne dane
res.status(400).json({ error: 'Brakuje wymaganych pól: name, email' });

// 401 Unauthorized - Brak autoryzacji
res.status(401).json({ error: 'Wymagana autoryzacja' });

// 404 Not Found - Nie znaleziono
res.status(404).json({ error: 'Użytkownik o ID 123 nie został znaleziony' });

// 500 Internal Server Error - Błąd serwera
res.status(500).json({ error: 'Wystąpił błąd serwera' });
```

---

## Wykorzystywanie API

### Fetch API (natywny JavaScript)

**Fetch** to wbudowane API przeglądarki do wykonywania żądań HTTP.

#### Podstawowe użycie

```javascript
// GET - Pobierz dane
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Błąd:', error));
```

#### GET z parametrami

```javascript
// Query string
const url = new URL('https://api.example.com/users');
url.searchParams.append('page', '1');
url.searchParams.append('limit', '10');

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

#### POST – Wysyłanie danych

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'Jan Kowalski',
    email: 'jan@example.com'
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Utworzono:', data))
  .catch(error => console.error('Błąd:', error));
```

#### PUT/PATCH – Aktualizacja

```javascript
// PUT - Pełna aktualizacja
fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jan Nowak',
    email: 'jan.nowak@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Zaktualizowano:', data));

// PATCH - Częściowa aktualizacja
fetch('https://api.example.com/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jan Kowalski-Nowak'
  })
})
  .then(response => response.json())
  .then(data => console.log('Zaktualizowano:', data));
```

#### DELETE – Usuwanie

```javascript
fetch('https://api.example.com/users/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer token123'
  }
})
  .then(response => {
    if (response.status === 204) {
      console.log('Usunięto pomyślnie');
    } else {
      return response.json();
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Błąd:', error));
```

#### Async/Await (nowoczesna składnia)

```javascript
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Błąd:', error);
  }
}

// Wywołanie
fetchUsers();
```

#### Obsługa błędów

```javascript
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Błąd z serwera (4xx, 5xx)
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    // Błąd sieci lub parsowania
    console.error('Błąd podczas tworzenia użytkownika:', error);
    throw error;
  }
}
```

### Axios (biblioteka zewnętrzna)

**Axios** to popularna biblioteka do wykonywania żądań HTTP z dodatkowymi funkcjami.

#### Instalacja

```bash
npm install axios
```

#### Podstawowe użycie

```javascript
const axios = require('axios');

// GET
axios.get('https://api.example.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error('Błąd:', error));

// POST
axios.post('https://api.example.com/users', {
  name: 'Jan Kowalski',
  email: 'jan@example.com'
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Błąd:', error));
```

#### Konfiguracja globalna

```javascript
// Utwórz instancję axios z domyślną konfiguracją
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});

// Użycie
apiClient.get('/users')
  .then(response => console.log(response.data));
```

#### Interceptory (przechwytywanie żądań/odpowiedzi)

```javascript
// Interceptor żądań (dodaj token do każdego żądania)
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor odpowiedzi (obsługa błędów)
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Przekieruj do logowania
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Autentykacja i autoryzacja

### Różnica między autentykacją a autoryzacją

- **Autentykacja (Authentication)** – "Kim jesteś?" – weryfikacja tożsamości
- **Autoryzacja (Authorization)** – "Co możesz robić?" – sprawdzenie uprawnień

### Metody autentykacji

#### 1. API Keys (Klucze API)

**Proste, ale mniej bezpieczne** – klucz w nagłówku lub query string.

```javascript
// Middleware
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Nieprawidłowy klucz API' });
  }
  
  next();
};

// Użycie
router.get('/protected', apiKeyAuth, (req, res) => {
  res.json({ message: 'To jest chroniona trasa' });
});
```

#### 2. JWT (JSON Web Tokens)

**Popularna metoda** – token zawierający informacje o użytkowniku.

**Instalacja:**
```bash
npm install jsonwebtoken
```

**Generowanie tokenu:**
```javascript
const jwt = require('jsonwebtoken');

// Logowanie użytkownika
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Weryfikuj dane logowania (w rzeczywistości sprawdź w bazie danych)
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
  }
  
  // Generuj token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, email: user.email } });
});
```

**Weryfikacja tokenu:**
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Nieprawidłowy token' });
    }
    
    req.user = user;
    next();
  });
};

// Użycie
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profil użytkownika', user: req.user });
});
```

**Użycie tokenu po stronie klienta:**
```javascript
// Zapisanie tokenu po logowaniu
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { token } = await response.json();
localStorage.setItem('token', token);

// Użycie tokenu w żądaniach
fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 3. OAuth 2.0

**Standard dla autoryzacji zewnętrznej** (Google, Facebook, GitHub).

**Przepływ:**
1. Klient przekierowuje użytkownika do dostawcy OAuth
2. Użytkownik autoryzuje aplikację
3. Dostawca zwraca kod autoryzacyjny
4. Aplikacja wymienia kod na token dostępu
5. Token jest używany do żądań API

---

## Walidacja danych

### Dlaczego walidacja jest ważna?

- **Bezpieczeństwo** – zapobiega atakom (SQL injection, XSS)
- **Spójność danych** – zapewnia poprawny format
- **Lepsze błędy** – jasne komunikaty dla klienta

### Walidacja po stronie serwera

#### Podstawowa walidacja ręczna

```javascript
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  
  // Walidacja name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Imię jest wymagane i musi być niepustym stringiem');
  }
  
  if (name && name.length < 2) {
    errors.push('Imię musi mieć co najmniej 2 znaki');
  }
  
  // Walidacja email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email jest wymagany i musi być poprawnym adresem email');
  }
  
  // Walidacja password
  if (!password || password.length < 8) {
    errors.push('Hasło jest wymagane i musi mieć co najmniej 8 znaków');
  }
  
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  
  next();
};

// Użycie
router.post('/users', validateUser, createUser);
```

#### Walidacja z biblioteką (Joi)

**Instalacja:**
```bash
npm install joi
```

**Użycie:**
```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().integer().min(0).max(120).optional()
});

const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false // Zwróć wszystkie błędy, nie tylko pierwszy
  });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).json({ errors });
  }
  
  // Zastąp req.body zwalidowanymi danymi (np. usunie dodatkowe pola)
  req.body = value;
  next();
};

// Użycie
router.post('/users', validateUser, createUser);
```

---

## Obsługa błędów

### Globalny handler błędów

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Błąd:', err);
  
  // Błąd walidacji
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: 'Błąd walidacji',
      details: err.message
    });
  }
  
  // Błąd autoryzacji
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Brak autoryzacji'
    });
  }
  
  // Domyślny błąd serwera
  res.status(err.status || 500).json({
    error: err.message || 'Wystąpił błąd serwera'
  });
};

module.exports = errorHandler;
```

**Użycie:**
```javascript
// server.js
const errorHandler = require('./middleware/errorHandler');

// Na końcu, po wszystkich trasach
app.use(errorHandler);
```

### Rzucanie błędów w kontrolerach

```javascript
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      const error = new Error('Użytkownik nie znaleziony');
      error.status = 404;
      throw error;
    }
    
    res.json(user);
  } catch (error) {
    next(error); // Przekaż błąd do errorHandler
  }
};
```

### Struktura odpowiedzi błędów

```javascript
// Spójna struktura błędów
res.status(400).json({
  error: {
    message: 'Brakuje wymaganych pól',
    code: 'MISSING_FIELDS',
    fields: ['name', 'email']
  }
});
```

---

## Najlepsze praktyki

### 1. Wersjonowanie API

```javascript
// Użyj prefiksu wersji
app.use('/api/v1/users', userRoutes);
app.use('/api/v2/users', userRoutesV2);
```

### 2. Paginacja

```javascript
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const users = getAllUsers().slice(skip, skip + limit);
  
  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total: getAllUsers().length,
      totalPages: Math.ceil(getAllUsers().length / limit)
    }
  });
});
```

### 3. Filtrowanie i sortowanie

```javascript
router.get('/', (req, res) => {
  let users = getAllUsers();
  
  // Filtrowanie
  if (req.query.email) {
    users = users.filter(u => u.email.includes(req.query.email));
  }
  
  // Sortowanie
  const sortBy = req.query.sortBy || 'name';
  const order = req.query.order || 'asc';
  users.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  
  res.json(users);
});
```

### 4. Rate Limiting (ograniczenie liczby żądań)

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 100 // maksymalnie 100 żądań na IP
});

app.use('/api/', limiter);
```

### 5. CORS Configuration

```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['https://example.com', 'https://www.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### 6. Dokumentacja API (Swagger/OpenAPI)

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 7. Logowanie strukturalne

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Użycie
logger.info('Użytkownik utworzony', { userId: 123 });
```

---

## Przykłady praktyczne

### Przykład 1: Proste API do zarządzania zadaniami (Todo)

Zobacz plik `programowanieAPI.js` dla pełnego przykładu implementacji.

### Przykład 2: API z połączeniem do bazy danych

```javascript
// config/database.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// controllers/userController.js
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Podsumowanie

### Kluczowe punkty

1. **API umożliwia komunikację** między różnymi częściami aplikacji
2. **REST API** to najpopularniejszy standard wykorzystujący HTTP
3. **Metody HTTP** mają określone znaczenie (GET, POST, PUT, PATCH, DELETE)
4. **Status codes** informują o wyniku operacji
5. **Autentykacja i autoryzacja** chronią API przed nieautoryzowanym dostępem
6. **Walidacja danych** zapewnia bezpieczeństwo i spójność
7. **Obsługa błędów** poprawia doświadczenie użytkownika
8. **Najlepsze praktyki** zwiększają jakość i bezpieczeństwo API

### Następne kroki

1. Przeanalizuj plik `programowanieAPI.js` z praktycznymi przykładami
2. Stwórz własne API używając poznanych wzorców
3. Połącz API z bazą danych (MongoDB, PostgreSQL, MySQL)
4. Dodaj autentykację JWT
5. Zaimplementuj testy jednostkowe i integracyjne
6. Wdróż API na serwerze (Heroku, AWS, DigitalOcean)

---

**Powodzenia w tworzeniu własnych API!** 🚀

