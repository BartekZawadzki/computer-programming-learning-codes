/**
 * PROGRAMOWANIE API - Kompletny Przewodnik Praktyczny
 * 
 * Ten plik zawiera praktyczne przykłady tworzenia i wykorzystywania API
 * z pełnymi komentarzami wyjaśniającymi każdy krok.
 * 
 * Struktura:
 * 1. Podstawowy serwer Express
 * 2. Definicje tras (Routes)
 * 3. Kontrolery (Controllers)
 * 4. Middleware
 * 5. Walidacja danych
 * 6. Autentykacja JWT
 * 7. Obsługa błędów
 * 8. Wykorzystywanie API (klient)
 * 
 * Wymagane pakiety:
 * npm install express cors dotenv jsonwebtoken joi express-rate-limit
 */

// ============================================================================
// SEKCJA 1: PODSTAWOWY SERWER EXPRESS
// ============================================================================

/**
 * KROK 1: Importowanie modułów
 * 
 * express - framework do tworzenia serwerów HTTP w Node.js
 * cors - middleware do obsługi Cross-Origin Resource Sharing
 * dotenv - do ładowania zmiennych środowiskowych z pliku .env
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Ładuje zmienne z .env do process.env

/**
 * KROK 2: Utworzenie instancji aplikacji Express
 * 
 * app - główny obiekt aplikacji, który obsługuje routing i middleware
 */
const app = express();

/**
 * KROK 3: Definicja portu
 * 
 * PORT - port na którym serwer będzie nasłuchiwał
 * process.env.PORT - port z zmiennych środowiskowych (dla produkcji)
 * || 3000 - domyślny port jeśli nie ustawiono zmiennej środowiskowej
 */
const PORT = process.env.PORT || 3000;

/**
 * KROK 4: Konfiguracja middleware globalnego
 * 
 * Middleware to funkcje wykonywane przed dotarciem żądania do handlera.
 * app.use() - aplikuje middleware do wszystkich tras
 */

// CORS - pozwala na żądania z innych domen (np. z frontendu)
// W produkcji ustaw konkretne domeny zamiast '*' dla bezpieczeństwa
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// express.json() - parsuje body żądań w formacie JSON
// Automatycznie konwertuje JSON string na obiekt JavaScript
app.use(express.json());

// express.urlencoded() - parsuje body żądań w formacie form-urlencoded
// extended: true - pozwala na zagnieżdżone obiekty
app.use(express.urlencoded({ extended: true }));

/**
 * KROK 5: Podstawowa trasa testowa
 * 
 * app.get() - definiuje trasę dla metody HTTP GET
 * '/' - ścieżka URL (root)
 * (req, res) => {} - handler funkcji (callback)
 *   req - obiekt żądania (request) zawierający dane od klienta
 *   res - obiekt odpowiedzi (response) do wysłania danych do klienta
 */
app.get('/', (req, res) => {
  // res.json() - wysyła odpowiedź w formacie JSON
  // Automatycznie ustawia Content-Type: application/json
  res.json({
    message: 'API działa poprawnie!',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      tasks: '/api/tasks'
    }
  });
});

// ============================================================================
// SEKCJA 2: TYMCZASOWA "BAZA DANYCH" W PAMIĘCI
// ============================================================================

/**
 * W rzeczywistym projekcie dane byłyby w bazie danych (MongoDB, PostgreSQL, itp.)
 * Tutaj używamy tablic w pamięci dla uproszczenia przykładu
 */

// Tablica użytkowników - symulacja bazy danych
let users = [
  {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    password: 'haslo123', // W rzeczywistości powinno być zahashowane!
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Anna Nowak',
    email: 'anna@example.com',
    password: 'haslo456',
    createdAt: new Date().toISOString()
  }
];

// Tablica zadań - symulacja bazy danych
let tasks = [
  {
    id: 1,
    userId: 1,
    title: 'Nauczyć się API',
    description: 'Przeczytać dokumentację REST API',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    userId: 1,
    title: 'Stworzyć projekt',
    description: 'Zaimplementować własne API',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Licznik ID - do generowania nowych unikalnych ID
let nextUserId = 3;
let nextTaskId = 3;

// ============================================================================
// SEKCJA 3: MIDDLEWARE - FUNKCJE POMOCNICZE
// ============================================================================

/**
 * MIDDLEWARE 1: Logger - loguje wszystkie żądania
 * 
 * Middleware to funkcja z 3 parametrami: (req, res, next)
 * next() - przekazuje kontrolę do następnego middleware/handlera
 */
const logger = (req, res, next) => {
  // Pobierz aktualny czas
  const timestamp = new Date().toISOString();
  
  // Pobierz metodę HTTP (GET, POST, itp.)
  const method = req.method;
  
  // Pobierz ścieżkę URL
  const path = req.path;
  
  // Pobierz adres IP klienta
  const ip = req.ip || req.connection.remoteAddress;
  
  // Wyświetl informacje o żądaniu
  console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);
  
  // Przekaż kontrolę dalej
  next();
};

// Zastosuj logger do wszystkich tras
app.use(logger);

/**
 * MIDDLEWARE 2: Sprawdzanie Content-Type dla POST/PUT/PATCH
 * 
 * Wymusza, aby żądania z body miały poprawny Content-Type
 */
const checkContentType = (req, res, next) => {
  // Sprawdź czy żądanie ma body (POST, PUT, PATCH)
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    // Sprawdź czy Content-Type jest ustawiony
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Content-Type musi być application/json'
      });
    }
  }
  
  next();
};

// Zastosuj tylko do tras API (nie do root)
app.use('/api', checkContentType);

// ============================================================================
// SEKCJA 4: WALIDACJA DANYCH
// ============================================================================

/**
 * WALIDACJA 1: Walidacja użytkownika (ręczna, bez biblioteki)
 * 
 * Sprawdza czy dane użytkownika są poprawne przed zapisaniem
 */
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  
  // Walidacja name
  if (!name) {
    errors.push('Pole "name" jest wymagane');
  } else if (typeof name !== 'string') {
    errors.push('Pole "name" musi być stringiem');
  } else if (name.trim().length < 2) {
    errors.push('Pole "name" musi mieć co najmniej 2 znaki');
  } else if (name.trim().length > 50) {
    errors.push('Pole "name" nie może mieć więcej niż 50 znaków');
  }
  
  // Walidacja email
  if (!email) {
    errors.push('Pole "email" jest wymagane');
  } else {
    // Regex do sprawdzania formatu email
    // Format: tekst@tekst.tekst
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Pole "email" musi być poprawnym adresem email');
    }
    
    // Sprawdź czy email już istnieje
    const emailExists = users.some(u => u.email === email);
    if (emailExists) {
      errors.push('Email już istnieje w systemie');
    }
  }
  
  // Walidacja password
  if (!password) {
    errors.push('Pole "password" jest wymagane');
  } else if (password.length < 8) {
    errors.push('Pole "password" musi mieć co najmniej 8 znaków');
  } else if (!/[A-Z]/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jedną wielką literę');
  } else if (!/[0-9]/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jedną cyfrę');
  }
  
  // Jeśli są błędy, zwróć je
  if (errors.length > 0) {
    return res.status(422).json({
      error: 'Błąd walidacji',
      errors: errors
    });
  }
  
  // Jeśli wszystko OK, przejdź dalej
  next();
};

/**
 * WALIDACJA 2: Walidacja zadania
 */
const validateTask = (req, res, next) => {
  const { title, description, userId } = req.body;
  const errors = [];
  
  // Walidacja title
  if (!title) {
    errors.push('Pole "title" jest wymagane');
  } else if (typeof title !== 'string') {
    errors.push('Pole "title" musi być stringiem');
  } else if (title.trim().length < 3) {
    errors.push('Pole "title" musi mieć co najmniej 3 znaki');
  } else if (title.trim().length > 100) {
    errors.push('Pole "title" nie może mieć więcej niż 100 znaków');
  }
  
  // Walidacja description (opcjonalne)
  if (description && typeof description !== 'string') {
    errors.push('Pole "description" musi być stringiem');
  }
  
  // Walidacja userId
  if (userId) {
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      errors.push('Pole "userId" musi być liczbą');
    } else {
      // Sprawdź czy użytkownik istnieje
      const userExists = users.some(u => u.id === userIdNum);
      if (!userExists) {
        errors.push('Użytkownik o podanym ID nie istnieje');
      }
    }
  }
  
  if (errors.length > 0) {
    return res.status(422).json({
      error: 'Błąd walidacji',
      errors: errors
    });
  }
  
  next();
};

// ============================================================================
// SEKCJA 5: AUTENTYKACJA JWT
// ============================================================================

/**
 * JWT (JSON Web Token) - metoda autentykacji używająca tokenów
 * 
 * Wymagany pakiet: npm install jsonwebtoken
 */
const jwt = require('jsonwebtoken');

// Sekretny klucz do podpisywania tokenów (w produkcji użyj zmiennej środowiskowej!)
const JWT_SECRET = process.env.JWT_SECRET || 'tajny-klucz-do-podpisywania-tokenow';

/**
 * FUNKCJA: Generowanie tokenu JWT
 * 
 * @param {Object} payload - Dane do zapisania w tokenie (np. userId, email)
 * @returns {String} - Token JWT
 */
const generateToken = (payload) => {
  // jwt.sign() - tworzy token JWT
  // payload - dane do zapisania w tokenie
  // JWT_SECRET - klucz do podpisywania tokenu
  // expiresIn - czas wygaśnięcia tokenu (np. '24h', '7d')
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

/**
 * MIDDLEWARE: Weryfikacja tokenu JWT
 * 
 * Sprawdza czy żądanie zawiera prawidłowy token i czy użytkownik jest zalogowany
 */
const authenticateToken = (req, res, next) => {
  // Pobierz token z nagłówka Authorization
  // Format: "Bearer TOKEN"
  const authHeader = req.headers['authorization'];
  
  // Sprawdź czy nagłówek istnieje
  if (!authHeader) {
    return res.status(401).json({
      error: 'Brak tokenu autoryzacyjnego',
      message: 'Dodaj nagłówek: Authorization: Bearer YOUR_TOKEN'
    });
  }
  
  // Wyciągnij token (usuń "Bearer " z początku)
  // split(' ') dzieli string na tablicę: ['Bearer', 'TOKEN']
  // [1] pobiera drugi element (token)
  const token = authHeader.split(' ')[1];
  
  // Sprawdź czy token istnieje
  if (!token) {
    return res.status(401).json({
      error: 'Nieprawidłowy format tokenu',
      message: 'Format powinien być: Bearer YOUR_TOKEN'
    });
  }
  
  // Weryfikuj token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    // err - błąd jeśli token jest nieprawidłowy lub wygasł
    if (err) {
      return res.status(403).json({
        error: 'Nieprawidłowy lub wygasły token',
        message: err.message
      });
    }
    
    // decoded - zdekodowane dane z tokenu (payload)
    // Zapisz dane użytkownika w req.user, aby były dostępne w handlerach
    req.user = decoded;
    
    // Przejdź do następnego middleware/handlera
    next();
  });
};

// ============================================================================
// SEKCJA 6: TRASY API - UŻYTKOWNICY
// ============================================================================

/**
 * ROUTER: Definicja tras dla użytkowników
 * 
 * express.Router() - tworzy nowy router (moduł tras)
 * Pozwala na organizację tras w osobnych plikach
 */
const userRouter = express.Router();

/**
 * TRASA 1: GET /api/users
 * 
 * Pobiera listę wszystkich użytkowników
 * 
 * Query parameters (opcjonalne):
 * - page: numer strony (domyślnie 1)
 * - limit: liczba wyników na stronę (domyślnie 10)
 * - search: wyszukiwanie po imieniu lub emailu
 */
userRouter.get('/', (req, res) => {
  try {
    // Pobierz parametry query string z URL
    // Przykład: /api/users?page=1&limit=5&search=jan
    const page = parseInt(req.query.page) || 1; // Domyślnie strona 1
    const limit = parseInt(req.query.limit) || 10; // Domyślnie 10 wyników
    const search = req.query.search?.toLowerCase(); // Wyszukiwanie (opcjonalne)
    
    // Filtruj użytkowników jeśli jest wyszukiwanie
    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }
    
    // PAGINACJA - podziel wyniki na strony
    // Oblicz indeks początkowy i końcowy
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Wyciągnij tylko użytkowników z aktualnej strony
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    // Usuń hasła z odpowiedzi (bezpieczeństwo!)
    const usersWithoutPasswords = paginatedUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    // Zwróć odpowiedź z informacjami o paginacji
    res.json({
      data: usersWithoutPasswords,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    });
  } catch (error) {
    // Obsługa błędów
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 2: GET /api/users/:id
 * 
 * Pobiera pojedynczego użytkownika po ID
 * 
 * :id - parametr URL (route parameter)
 * Dostępny w req.params.id
 */
userRouter.get('/:id', (req, res) => {
  try {
    // Pobierz ID z parametrów URL i przekonwertuj na liczbę
    const id = parseInt(req.params.id);
    
    // Sprawdź czy ID jest liczbą
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID',
        message: 'ID musi być liczbą'
      });
    }
    
    // Znajdź użytkownika po ID
    // find() zwraca pierwszy element spełniający warunek lub undefined
    const user = users.find(u => u.id === id);
    
    // Sprawdź czy użytkownik istnieje
    if (!user) {
      return res.status(404).json({
        error: 'Użytkownik nie znaleziony',
        message: `Użytkownik o ID ${id} nie istnieje`
      });
    }
    
    // Usuń hasło z odpowiedzi
    const { password, ...userWithoutPassword } = user;
    
    // Zwróć użytkownika
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 3: POST /api/users
 * 
 * Tworzy nowego użytkownika
 * 
 * Body (JSON):
 * {
 *   "name": "Jan Kowalski",
 *   "email": "jan@example.com",
 *   "password": "haslo123"
 * }
 */
userRouter.post('/', validateUser, (req, res) => {
  try {
    // Pobierz dane z body żądania
    // req.body jest już sparsowane przez express.json()
    const { name, email, password } = req.body;
    
    // Utwórz nowego użytkownika
    const newUser = {
      id: nextUserId++, // Zwiększ licznik ID
      name: name.trim(), // Usuń spacje z początku i końca
      email: email.toLowerCase().trim(), // Normalizuj email
      password: password, // W rzeczywistości powinno być zahashowane (bcrypt)!
      createdAt: new Date().toISOString() // Aktualny czas w formacie ISO
    };
    
    // Dodaj użytkownika do "bazy danych"
    users.push(newUser);
    
    // Usuń hasło z odpowiedzi
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Zwróć utworzonego użytkownika z kodem 201 (Created)
    res.status(201).json({
      message: 'Użytkownik utworzony pomyślnie',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 4: PUT /api/users/:id
 * 
 * Aktualizuje CAŁEGO użytkownika (pełna aktualizacja)
 * 
 * PUT jest idempotentne - wielokrotne wywołanie daje ten sam efekt
 */
userRouter.put('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    // Znajdź indeks użytkownika w tablicy
    const userIndex = users.findIndex(u => u.id === id);
    
    // Sprawdź czy użytkownik istnieje
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'Użytkownik nie znaleziony'
      });
    }
    
    // Sprawdź czy użytkownik aktualizuje swoje własne dane
    // (lub czy ma uprawnienia administratora)
    if (req.user.userId !== id) {
      return res.status(403).json({
        error: 'Brak uprawnień',
        message: 'Możesz aktualizować tylko swoje własne dane'
      });
    }
    
    // Pobierz dane z body
    const { name, email, password } = req.body;
    
    // Walidacja (uproszczona - w rzeczywistości użyj tego samego validateUser)
    if (!name || !email) {
      return res.status(400).json({
        error: 'Brakuje wymaganych pól: name, email'
      });
    }
    
    // Zaktualizuj użytkownika (zastąp cały obiekt)
    users[userIndex] = {
      ...users[userIndex], // Zachowaj istniejące pola
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password || users[userIndex].password, // Zachowaj hasło jeśli nie podano
      updatedAt: new Date().toISOString()
    };
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    
    res.json({
      message: 'Użytkownik zaktualizowany',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 5: PATCH /api/users/:id
 * 
 * Aktualizuje TYLKO PODANE pola użytkownika (częściowa aktualizacja)
 * 
 * PATCH nie jest idempotentne - może mieć różne efekty przy wielokrotnym wywołaniu
 */
userRouter.patch('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'Użytkownik nie znaleziony'
      });
    }
    
    // Sprawdź uprawnienia
    if (req.user.userId !== id) {
      return res.status(403).json({
        error: 'Brak uprawnień'
      });
    }
    
    // Aktualizuj tylko podane pola (częściowa aktualizacja)
    // Spread operator (...) łączy obiekty
    users[userIndex] = {
      ...users[userIndex], // Zachowaj istniejące pola
      ...req.body, // Nadpisz tylko podane pola
      id: users[userIndex].id, // Nie pozwól zmienić ID
      createdAt: users[userIndex].createdAt, // Nie pozwól zmienić daty utworzenia
      updatedAt: new Date().toISOString() // Dodaj datę aktualizacji
    };
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    
    res.json({
      message: 'Użytkownik zaktualizowany',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 6: DELETE /api/users/:id
 * 
 * Usuwa użytkownika
 * 
 * DELETE jest idempotentne - usunięcie nieistniejącego zasobu zwraca 404, ale efekt jest taki sam
 */
userRouter.delete('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'Użytkownik nie znaleziony'
      });
    }
    
    // Sprawdź uprawnienia
    if (req.user.userId !== id) {
      return res.status(403).json({
        error: 'Brak uprawnień'
      });
    }
    
    // Usuń użytkownika z tablicy
    // splice(index, 1) - usuwa 1 element od indeksu index
    const deletedUser = users.splice(userIndex, 1)[0];
    
    // Usuń również wszystkie zadania użytkownika
    tasks = tasks.filter(task => task.userId !== id);
    
    const { password: _, ...userWithoutPassword } = deletedUser;
    
    res.json({
      message: 'Użytkownik usunięty pomyślnie',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 7: POST /api/users/login
 * 
 * Logowanie użytkownika - zwraca token JWT
 */
userRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Walidacja
    if (!email || !password) {
      return res.status(400).json({
        error: 'Brakuje wymaganych pól: email, password'
      });
    }
    
    // Znajdź użytkownika po emailu
    const user = users.find(u => u.email === email.toLowerCase().trim());
    
    // Sprawdź czy użytkownik istnieje
    if (!user) {
      return res.status(401).json({
        error: 'Nieprawidłowe dane logowania',
        message: 'Email lub hasło jest nieprawidłowe'
      });
    }
    
    // Sprawdź hasło (w rzeczywistości porównaj zahashowane hasła!)
    if (user.password !== password) {
      return res.status(401).json({
        error: 'Nieprawidłowe dane logowania',
        message: 'Email lub hasło jest nieprawidłowe'
      });
    }
    
    // Generuj token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email
    });
    
    // Zwróć token i podstawowe informacje o użytkowniku
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Logowanie pomyślne',
      token: token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

// ============================================================================
// SEKCJA 7: TRASY API - ZADANIA (TASKS)
// ============================================================================

const taskRouter = express.Router();

/**
 * TRASA 1: GET /api/tasks
 * 
 * Pobiera listę zadań z opcjonalnym filtrowaniem
 */
taskRouter.get('/', authenticateToken, (req, res) => {
  try {
    // Pobierz userId z tokenu (użytkownik jest zalogowany)
    const userId = req.user.userId;
    
    // Pobierz parametry query
    const completed = req.query.completed; // 'true' lub 'false'
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Filtruj zadania użytkownika
    let userTasks = tasks.filter(task => task.userId === userId);
    
    // Filtruj po statusie ukończenia
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      userTasks = userTasks.filter(task => task.completed === isCompleted);
    }
    
    // Paginacja
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = userTasks.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedTasks,
      pagination: {
        page,
        limit,
        total: userTasks.length,
        totalPages: Math.ceil(userTasks.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 2: GET /api/tasks/:id
 * 
 * Pobiera pojedyncze zadanie
 */
taskRouter.get('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    const task = tasks.find(t => t.id === id && t.userId === userId);
    
    if (!task) {
      return res.status(404).json({
        error: 'Zadanie nie znalezione'
      });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 3: POST /api/tasks
 * 
 * Tworzy nowe zadanie
 */
taskRouter.post('/', authenticateToken, validateTask, (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description } = req.body;
    
    const newTask = {
      id: nextTaskId++,
      userId: userId, // Przypisz do zalogowanego użytkownika
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    
    res.status(201).json({
      message: 'Zadanie utworzone pomyślnie',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 4: PATCH /api/tasks/:id
 * 
 * Aktualizuje zadanie (np. oznacza jako ukończone)
 */
taskRouter.patch('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === id && t.userId === userId);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Zadanie nie znalezione'
      });
    }
    
    // Aktualizuj zadanie
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
      id: tasks[taskIndex].id,
      userId: tasks[taskIndex].userId, // Nie pozwól zmienić właściciela
      createdAt: tasks[taskIndex].createdAt,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      message: 'Zadanie zaktualizowane',
      task: tasks[taskIndex]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

/**
 * TRASA 5: DELETE /api/tasks/:id
 * 
 * Usuwa zadanie
 */
taskRouter.delete('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format ID'
      });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === id && t.userId === userId);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Zadanie nie znalezione'
      });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    res.json({
      message: 'Zadanie usunięte',
      task: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      error: 'Błąd serwera',
      message: error.message
    });
  }
});

// ============================================================================
// SEKCJA 8: PODŁĄCZENIE ROUTERÓW DO APLIKACJI
// ============================================================================

/**
 * app.use() - podłącza router do aplikacji
 * 
 * Pierwszy parametr - prefiks URL (wszystkie trasy routera będą miały ten prefiks)
 * Drugi parametr - router
 */
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// ============================================================================
// SEKCJA 9: OBSŁUGA BŁĘDÓW
// ============================================================================

/**
 * MIDDLEWARE: Obsługa 404 (nie znaleziono trasy)
 * 
 * Musi być na końcu, przed errorHandler
 * Jeśli żadna trasa nie pasuje, zwróć 404
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Nie znaleziono',
    message: `Trasa ${req.method} ${req.path} nie istnieje`,
    availableEndpoints: {
      users: '/api/users',
      tasks: '/api/tasks',
      login: 'POST /api/users/login'
    }
  });
});

/**
 * MIDDLEWARE: Globalny handler błędów
 * 
 * Musi być ostatnim middleware
 * Przechwytuje wszystkie błędy z aplikacji
 */
app.use((err, req, res, next) => {
  console.error('Błąd:', err);
  
  // Sprawdź typ błędu
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: 'Błąd walidacji',
      message: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Brak autoryzacji',
      message: err.message
    });
  }
  
  // Domyślny błąd serwera
  res.status(err.status || 500).json({
    error: 'Błąd serwera',
    message: err.message || 'Wystąpił nieoczekiwany błąd'
  });
});

// ============================================================================
// SEKCJA 10: URUCHOMIENIE SERWERA
// ============================================================================

/**
 * app.listen() - uruchamia serwer HTTP
 * 
 * PORT - port na którym serwer będzie nasłuchiwał
 * Callback - funkcja wykonywana po uruchomieniu serwera
 */
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Serwer API działa na porcie ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log('='.repeat(50));
  console.log('\nDostępne endpointy:');
  console.log('  GET    /api/users          - Lista użytkowników');
  console.log('  GET    /api/users/:id      - Pojedynczy użytkownik');
  console.log('  POST   /api/users          - Utworzenie użytkownika');
  console.log('  POST   /api/users/login   - Logowanie');
  console.log('  PUT    /api/users/:id      - Aktualizacja użytkownika');
  console.log('  PATCH  /api/users/:id      - Częściowa aktualizacja');
  console.log('  DELETE /api/users/:id     - Usunięcie użytkownika');
  console.log('  GET    /api/tasks          - Lista zadań');
  console.log('  GET    /api/tasks/:id      - Pojedyncze zadanie');
  console.log('  POST   /api/tasks          - Utworzenie zadania');
  console.log('  PATCH  /api/tasks/:id     - Aktualizacja zadania');
  console.log('  DELETE /api/tasks/:id     - Usunięcie zadania');
  console.log('\n' + '='.repeat(50));
});

// ============================================================================
// SEKCJA 11: PRZYKŁADY WYKORZYSTYWANIA API (KLIENT)
// ============================================================================

/**
 * Poniższe przykłady pokazują jak używać API z poziomu klienta (frontend)
 * 
 * Uwaga: Te funkcje nie są wykonywane na serwerze - to tylko przykłady
 * do użycia w przeglądarce lub innym kliencie HTTP
 */

/**
 * PRZYKŁAD 1: Pobranie listy użytkowników (GET)
 * 
 * Użycie Fetch API (natywny JavaScript)
 */
async function fetchUsers() {
  try {
    // fetch() - wbudowana funkcja przeglądarki do wykonywania żądań HTTP
    const response = await fetch('http://localhost:3000/api/users');
    
    // Sprawdź czy odpowiedź jest OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parsuj odpowiedź JSON
    const data = await response.json();
    
    console.log('Użytkownicy:', data);
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 2: Utworzenie użytkownika (POST)
 */
async function createUser(userData) {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST', // Metoda HTTP
      headers: {
        'Content-Type': 'application/json' // Typ zawartości
      },
      body: JSON.stringify(userData) // Konwertuj obiekt na JSON string
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Błąd podczas tworzenia użytkownika');
    }
    
    const data = await response.json();
    console.log('Utworzono użytkownika:', data);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 3: Logowanie i zapisanie tokenu
 */
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Błąd logowania');
    }
    
    const data = await response.json();
    
    // Zapisz token w localStorage (przeglądarka)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    console.log('Zalogowano:', data);
    return data;
  } catch (error) {
    console.error('Błąd logowania:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 4: Pobranie zadań z autoryzacją (GET z tokenem)
 */
async function fetchTasks() {
  try {
    // Pobierz token z localStorage
    const token = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    if (!token) {
      throw new Error('Brak tokenu - zaloguj się najpierw');
    }
    
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Dodaj token do nagłówka
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token wygasł lub jest nieprawidłowy
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('token');
        }
        throw new Error('Sesja wygasła - zaloguj się ponownie');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Zadania:', data);
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania zadań:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 5: Utworzenie zadania (POST z autoryzacją)
 */
async function createTask(taskData) {
  try {
    const token = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    if (!token) {
      throw new Error('Brak tokenu');
    }
    
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Błąd podczas tworzenia zadania');
    }
    
    const data = await response.json();
    console.log('Utworzono zadanie:', data);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 6: Aktualizacja zadania (PATCH)
 */
async function updateTask(taskId, updates) {
  try {
    const token = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    if (!token) {
      throw new Error('Brak tokenu');
    }
    
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Błąd podczas aktualizacji');
    }
    
    const data = await response.json();
    console.log('Zaktualizowano zadanie:', data);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
}

/**
 * PRZYKŁAD 7: Usunięcie zadania (DELETE)
 */
async function deleteTask(taskId) {
  try {
    const token = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    if (!token) {
      throw new Error('Brak tokenu');
    }
    
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Błąd podczas usuwania');
    }
    
    const data = await response.json();
    console.log('Usunięto zadanie:', data);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
}

// ============================================================================
// EKSPORTOWANIE FUNKCJI (dla użycia w innych plikach)
// ============================================================================

// Jeśli używasz modułów ES6 (import/export):
// export { fetchUsers, createUser, loginUser, fetchTasks, createTask, updateTask, deleteTask };

// Jeśli używasz CommonJS (require/module.exports):
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchUsers,
    createUser,
    loginUser,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
}

// ============================================================================
// INSTRUKCJE URUCHOMIENIA
// ============================================================================

/**
 * KROK 1: Zainstaluj zależności
 * 
 * npm install express cors dotenv jsonwebtoken
 * 
 * KROK 2: Utwórz plik .env (opcjonalnie)
 * 
 * PORT=3000
 * JWT_SECRET=tajny-klucz-do-podpisywania-tokenow
 * ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
 * 
 * KROK 3: Uruchom serwer
 * 
 * node programowanieAPI.js
 * 
 * lub z nodemon (automatyczne przeładowanie):
 * 
 * npx nodemon programowanieAPI.js
 * 
 * KROK 4: Przetestuj API
 * 
 * Użyj Postman, Insomnia, curl lub przeglądarki:
 * 
 * curl http://localhost:3000/
 * curl http://localhost:3000/api/users
 * 
 * KROK 5: Przetestuj z autoryzacją
 * 
 * 1. Zaloguj się:
 *    curl -X POST http://localhost:3000/api/users/login \
 *      -H "Content-Type: application/json" \
 *      -d '{"email":"jan@example.com","password":"haslo123"}'
 * 
 * 2. Skopiuj token z odpowiedzi
 * 
 * 3. Użyj tokenu w żądaniach:
 *    curl http://localhost:3000/api/tasks \
 *      -H "Authorization: Bearer YOUR_TOKEN"
 */

