PROGRAMOWANIE I TWORZENIE OPROGRAMOWANIA  
Kompletny przewodnik praktyczny w prostym języku, z przykładami z pracy w firmach i projektach komercyjnych.

## 1. Podstawy programowania (CORE)

### 1.1 Myślenie algorytmiczne
- **Problem → rozwiązanie**: zaczynamy od jasnego sformułowania problemu, np. „klient chce widzieć listę zamówień posortowaną po dacie”.
- **Rozbijanie problemu**: dzielimy zadanie na kroki (pobierz dane → przefiltruj → posortuj → zwróć użytkownikowi). Mniejsze części łatwiej zakodować i przetestować.
- **Abstrakcja**: skupiamy się na tym, co ważne dla rozwiązania. Przykład: w systemie faktur nie interesują nas szczegóły serwera poczty, tylko wynik „e-mail wysłany”.
- **Pseudokod**: zapis kroków w języku zrozumiałym dla człowieka, np.  
  „dla każdego zamówienia: jeśli status = 'opłacone', dodaj do listy”.
  Pseudokod pozwala szybko uzgodnić logikę z biznesem zanim napiszemy kod.
- **Diagramy blokowe**: wizualne pokazanie przepływu (start → warunek → decyzja → koniec). Przydaje się w rozmowie z nietechnicznymi osobami.

### 1.2 Podstawowe konstrukcje językowe
- **Zmienne**: nazwane pudełka na dane. Np. `currentBalance` trzyma kwotę konta klienta.
- **Typy danych**: liczby, tekst, wartości logiczne, daty, struktury (np. obiekt `order` z polami `id`, `amount`, `status`). W systemach enterprise typy pomagają walidować dane już na wejściu.
- **Stałe**: wartości, które nie powinny się zmieniać, np. `VAT_RATE = 0.23`. Chronią przed przypadkowym nadpisaniem.
- **Operatory**: arytmetyczne (`+`, `-`), logiczne (`&&`, `||`), porównania (`==`, `>`, `<`). Używamy ich do budowania warunków biznesowych, np. „jeśli kwota > limit → wymagaj dodatkowej autoryzacji”.
- **Instrukcje warunkowe**: `if / else` pozwala reagować na różne przypadki, np. „jeśli klient VIP → pomiń opłatę dostawy”.
- **Pętle**: powtarzanie operacji, np. przejście przez listę zamówień. Warto wybierać pętle, które jasno pokazują intencję (np. `forEach` dla listy, `while` dla operacji do momentu spełnienia warunku).

### 1.3 Struktury danych (podstawowe)
- **Tablice**: uporządkowana lista elementów. Przykład: lista identyfikatorów zamówień do dalszego przetwarzania.
- **Listy**: dynamiczne kolekcje, łatwe do dodawania/usuwania. W praktyce często to samo co tablica w językach wysokiego poziomu.
- **Stosy (LIFO)**: ostatni wchodzi, pierwszy wychodzi. W firmach używane np. do cofania ostatnich zmian (undo).
- **Kolejki (FIFO)**: pierwszy wchodzi, pierwszy wychodzi. Typowe w przetwarzaniu zadań: kolejka e-maili, kolejka faktur do księgowania.
- **Mapy (słowniki)**: para klucz-wartość, np. `userId → profil`. Szybki dostęp do danych po kluczu.
- **Zbiory**: unikalne elementy, np. lista unikalnych adresów e-mail bez duplikatów.

### 1.4 Funkcje i procedury
- **Definicja funkcji**: fragment kodu realizujący konkretną czynność, który można wielokrotnie wywołać, np. `calculateDiscount(order)`.
- **Parametry**: dane wejściowe funkcji. Walidujemy je, by nie przyjąć pustych lub błędnych wartości (np. `order.amount` nie może być ujemny).
- **Zwracanie wartości**: funkcja oddaje wynik, np. obliczoną kwotę po rabacie. Jeżeli funkcja nic nie zwraca, pełni rolę procedury (np. tylko zapisuje log).
- **Rekurencja**: funkcja wywołuje samą siebie dla mniejszego problemu, np. przetwarzanie drzewa kategorii. Stosujemy, gdy upraszcza kod, ale dbamy o warunek stopu.
- **Zasięg zmiennych (scope)**: zmienne lokalne widoczne tylko wewnątrz funkcji/bloku. Chroni to przed przypadkowym użyciem danych w innych miejscach programu.

## 2. Algorytmy i struktury danych (praktyka)

### 2.1 Algorytmy klasyczne
- **Sortowanie**: porządkowanie danych, np. faktur według daty. W praktyce biblioteczne sortowanie (quicksort/mergesort) jest wystarczające; ważniejsze jest sortowanie po właściwym polu i z poprawnym kierunkiem (rosnąco/malejąco).
- **Wyszukiwanie**: znajdowanie elementu, np. klienta po e-mailu. Dla małych kolekcji wystarczy liniowe wyszukiwanie; dla dużych używamy struktur indeksowanych (mapy, b-tree).
- **Przechodzenie struktur**: iteracja po drzewach/grafach/listach. Przykład: przejście drzewa kategorii w e-commerce w głąb (DFS) lub wszerz (BFS) by zbudować menu.

### 2.2 Złożoność obliczeniowa
- **Czas**: ile kroków rośnie wraz z liczbą danych. Optymalizujemy, gdy operacja jest w krytycznej ścieżce (np. przeliczanie koszyka).
- **Pamięć**: ile dodatkowej pamięci wymaga algorytm. Przykład: kopiowanie dużej listy zamówień podwaja zużycie RAM.
- **Notacja O**: `O(1)` stały czas (odczyt z mapy), `O(n)` liniowy (przejście listy), `O(n log n)` sortowanie, `O(n^2)` zagnieżdżone pętle. Używamy jej do porównywania rozwiązań i przewidywania skalowania.

### 2.3 Struktury danych (zaawansowane)
- **Drzewa**: hierarchie, np. kategorie produktów. Ułatwiają szybkie wstawianie/odczyt w strukturach typu BST lub B-Tree (bazy danych).
- **Kopce**: struktura do szybkiego pobierania minimum/maksimum, np. priorytet zadań w kolejce płatności.
- **Grafy**: węzły i krawędzie, np. sieć dostawców i magazynów. Pozwalają liczyć najkrótsze trasy (Dijkstra).
- **Trie**: drzewo prefiksowe do szybkiego wyszukiwania po prefiksie, np. podpowiedzi wyszukiwania „progr…” → „programowanie”.
- **Hash tables**: mapowanie klucz → wartość przez funkcję haszującą. Szybki dostęp do danych, kluczowy w cache (np. sesje użytkowników).

### 2.4 Algorytmy zaawansowane
- **Dynamiczne programowanie**: dzielimy problem na podproblemy i zapamiętujemy wyniki. Przykład: obliczenie najtańszej trasy dostaw z wieloma przesiadkami.
- **Zachłanne**: bierzemy najlepszą decyzję lokalnie, licząc na dobry wynik globalny. Przykład: pakowanie zamówień do samochodów według dostępnej przestrzeni.
- **Grafowe**: algorytmy na grafach (BFS, DFS, Dijkstra, A*). Używane w routingu, rekomendacjach (graf powiązań).
- **Równoległe**: dzielenie pracy na wiele rdzeni/maszyn. Przykład: równoległe przeliczanie raportów sprzedaży na klastrze.

## 3. Paradygmaty programowania

### 3.1 Programowanie imperatywne
- **Instrukcje**: opisujemy krok po kroku „jak to zrobić”. Przykład: najpierw pobierz dane, potem je przefiltruj, potem zapisz.
- **Stan programu**: zmienne przechowują bieżący stan (np. lista zamówień). Zmiany stanu trzeba kontrolować, by uniknąć błędów.

### 3.2 Programowanie strukturalne
- **Bloki**: kod zorganizowany w funkcje i moduły zamiast „spaghetti”.
- **Kontrola przepływu**: czytelne użycie pętli i warunków; unikanie `goto`. W praktyce: małe funkcje z jedną odpowiedzialnością.

### 3.3 Programowanie obiektowe (OOP)
- **Klasy**: szablony obiektów (np. `Invoice`, `User`), opisujące dane i zachowania razem.
- **Obiekty**: konkretne instancje klasy, np. faktura o ID 123.
- **Enkapsulacja**: ukrywanie szczegółów, wystawianie tylko potrzebnych metod (np. `pay()` zamiast bezpośredniej zmiany pól).
- **Dziedziczenie**: tworzenie bardziej specyficznych klas z bazowej, np. `VipCustomer` dziedziczy po `Customer`.
- **Polimorfizm**: wspólne interfejsy, różne implementacje. Przykład: `PaymentMethod` z metodą `charge()`, różne klasy dla kart, BLIK, PayPal.

### 3.4 Programowanie funkcyjne
- **Funkcje czyste**: wynik zależy tylko od wejścia, bez efektów ubocznych. Ułatwia testy i równoległość.
- **Niemutowalność**: nie zmieniamy istniejących struktur, tworzymy nowe (np. nowa lista z dodanym elementem). Mniej błędów współbieżności.
- **Wyższe rzędy**: funkcje przyjmują/zw racają funkcje, np. `map`, `filter`, `reduce` w przetwarzaniu list.
- **Monady**: opakowania na wartość i kontekst (np. wynik lub błąd). W praktyce podobne do obiektów `Result/Option` w wielu językach.

### 3.5 Programowanie deklaratywne
- **Opis „co”, nie „jak”**: mówimy systemowi rezultat, a nie kroki. Przykład: SQL „SELECT … WHERE status='PAID'” zamiast ręcznego filtrowania w pętli.

### 3.6 Programowanie reaktywne
- **Strumienie**: dane płyną w czasie, reagujemy na zdarzenia. Przykład: strumień zdarzeń zakupowych w e-commerce.
- **Zdarzenia**: reakcje na kliknięcia, płatności, webhooki. Kod rejestruje obsługę zdarzeń zamiast aktywnie czekać.
- **Asynchroniczność**: operacje I/O bez blokowania wątku (np. pobranie danych z API). Pozwala obsłużyć więcej żądań na tej samej infrastrukturze.

### 3.7 Programowanie logiczne
- **Reguły**: definiujemy zasady, a silnik wnioskuje. Przykład: reguły rabatów w systemie promocji.
- **Fakty**: baza wiedzy, na której operuje silnik.
- **Wnioskowanie**: system sam wylicza odpowiedź na podstawie reguł i faktów (np. Prolog, systemy regułowe w silnikach promocji).

## 4. Języki programowania

### 4.1 Klasyfikacja języków
- **Niskopoziomowe**: blisko sprzętu (C, Rust w trybie systemowym). Dają kontrolę nad pamięcią, ale wymagają większej ostrożności.
- **Wysokopoziomowe**: więcej automatyzacji (Python, Java, C#, JavaScript/TypeScript). Szybszy development kosztem mniejszej kontroli nad sprzętem.
- **Skryptowe**: szybkie pisanie automatyzacji (Python, JavaScript, Bash). Idealne do glue-code i integracji.

### 4.2 Typowanie
- **Statyczne**: typy sprawdzane przy kompilacji (Java, C#, TypeScript). Mniej błędów w runtime, lepsze podpowiedzi IDE.
- **Dynamiczne**: typy sprawdzane w czasie działania (Python, JavaScript). Szybsze prototypowanie, ale więcej testów potrzebnych.
- **Silne**: trudniej o niejawne konwersje (Python, Java). Chroni przed cichymi błędami.
- **Słabe**: dopuszcza łatwe mieszanie typów (JavaScript), co daje elastyczność, ale może ukryć błędy.

### 4.3 Modele wykonania
- **Kompilacja**: kod tłumaczony do binarki przed uruchomieniem (C, Rust). Szybkie wykonanie, dłuższy czas budowy.
- **Interpretacja**: kod czytany linia po linii (Python). Krótszy cykl feedbacku, zwykle wolniejsze wykonanie.
- **JIT**: kompilacja w locie (Java, .NET, V8 JS). Łączy elastyczność z optymalizacją w runtime.

### 4.4 Składnia i semantyka
- **Gramatyka**: reguły pisania kodu (średniki, nawiasy, wcięcia). Warto stosować formatery, by utrzymać spójność.
- **Semantyka**: znaczenie konstrukcji. Przykład: różnica między przypisaniem a porównaniem; między mutowaniem a tworzeniem nowej wartości.

### 4.5 Standardy i specyfikacje
- **Standardy języka**: opisują, co jest poprawne (np. ECMAScript dla JS).
- **Wersjonowanie**: kolejne edycje/specyfikacje dodają funkcje i deprecjonują stare. W projektach enterprise trzeba znać wersję języka/VM używaną na produkcji.

## 5. Środowisko programistyczne

### 5.1 Edytory i IDE
- **Edytory kodu**: lekkie (VS Code, Sublime). Idealne do szybkich zmian, skryptów, frontendu.
- **IDE**: pełne środowiska (IntelliJ, Visual Studio, Rider). Dają refaktoryzacje, podpowiedzi, debuger, integrację z testami i CI.
- W firmie ważna jest wspólna konfiguracja formattera/lintera, by kod wyglądał tak samo u wszystkich.

### 5.2 Systemy kontroli wersji
- **Git**: standard w zespołach. Kluczowe komendy: `clone`, `commit`, `branch`, `merge`, `rebase`, `push`, `pull`.
- **Workflow**: feature branch → code review → merge. Chroni główną gałąź przed przypadkowymi błędami.
- **Branching**: krótkie gałęzie na zadania, jasne nazwy (`feature/raporty-sprzedazy`). Pull Requesty z opisem i testami.

### 5.3 Debugowanie
- **Breakpointy**: zatrzymują program w IDE, pozwalają sprawdzić wartości zmiennych.
- **Logi**: `info/warn/error` z kontekstem (ID użytkownika, request ID). Logi powinny być czytelne i nie zawierać danych wrażliwych.
- **Trace**: śledzenie całej ścieżki żądania przez mikroserwisy (np. z użyciem trace-id w nagłówkach).

### 5.4 Budowanie aplikacji
- **Build**: kompilacja/packaging aplikacji do artefaktu (np. JAR, kontener Docker).
- **Dependency management**: pliki zależności (`package.json`, `pom.xml`, `requirements.txt`) plus lockfile. Wersje konkretnie przypięte, by build był powtarzalny.

## 6. Inżynieria oprogramowania

### 6.1 Analiza i projektowanie
- **Wymagania**: zbieramy i zapisujemy, co system ma robić (użytkownik, cel, wartość biznesowa).
- **Use case**: opisujemy aktora i scenariusz krok po kroku, np. „kasjer zwraca produkt”.
- **Diagramy UML**: przypadków użycia, klas, sekwencji – pomagają rozmawiać z biznesem i zespołem.

### 6.2 Architektura oprogramowania
- **Monolit**: jedna aplikacja. Szybki start, prostsze wdrożenie. Sprawdza się przy małych/średnich projektach.
- **Mikroserwisy**: wiele małych serwisów. Łatwiejsze skalowanie części systemu, ale więcej złożoności (komunikacja, monitoring, DevOps).
- **Event-driven**: serwisy wysyłają/odbierają zdarzenia (Kafka, RabbitMQ). Dobre do luźnego powiązania i integracji.

### 6.3 Wzorce projektowe
- **Creational**: jak tworzyć obiekty (Singleton, Factory Method). Np. fabryka konektorów do różnych bramek płatniczych.
- **Structural**: jak łączyć obiekty (Adapter, Facade). Np. Adapter do zewnętrznego API kuriera.
- **Behavioral**: jak obiekty współpracują (Strategy, Observer). Np. Strategy do różnych sposobów naliczania rabatów; Observer do powiadamiania o zmianie statusu zamówienia.

### 6.4 Clean Code
- **Czytelność**: krótkie funkcje z jedną odpowiedzialnością. Komentarze tylko gdy kod nie mówi sam za siebie.
- **Nazewnictwo**: jasne, zgodne z domeną biznesową (`applyLoyaltyDiscount`, `shipmentTrackingNumber`).
- **Refaktoryzacja**: regularne poprawki struktury bez zmiany zachowania. Zmniejsza dług techniczny i koszty utrzymania.

## 7. Testowanie oprogramowania

### 7.1 Rodzaje testów
- **Jednostkowe**: małe fragmenty kodu (funkcje, klasy). Szybkie, dają pewność przy refaktoryzacji.
- **Integracyjne**: współpraca modułów (np. serwis → baza → serwis). Wykrywają problemy kontraktów.
- **Systemowe**: cały system jako całość.
- **E2E**: ścieżka użytkownika przez UI/API, np. „klient loguje się, składa zamówienie, płaci”.

### 7.2 Testy niefunkcjonalne
- **Wydajność**: obciążenie (k6, JMeter, Locust). Sprawdzamy czasy odpowiedzi i stabilność.
- **Bezpieczeństwo**: skan podatności (OWASP ZAP), testy uprawnień (brak dostępu do cudzych danych).
- **Użyteczność**: czy użytkownik rozumie interfejs i szybko osiąga cel.

### 7.3 Automatyzacja testów
- **Frameworki testowe**: JUnit/PyTest/Jest itp., plus runner w CI.
- **Mocki**: zastępują zewnętrzne systemy (płatności, e-maile) by testy były powtarzalne i szybkie.
- **Test coverage**: mierzymy pokrycie kodu, szczególnie krytycznych ścieżek biznesowych. Cel: sensowne pokrycie, nie gonienie procentów kosztem jakości.

## 8. Programowanie systemowe i niskiego poziomu

### 8.1 Pamięć i zasoby
- **Stos i sterta**: stos dla wywołań funkcji i zmiennych lokalnych; sterta dla obiektów dynamicznych. Przepełnienie stosu grozi np. przy źle kontrolowanej rekurencji.
- **Garbage collection**: automatyczne zwalnianie pamięci (Java, .NET). W systemach o twardych limitach czasowych czasem wybiera się języki bez GC (C, Rust) dla przewidywalności.
- **Zarządzanie pamięcią**: w językach bez GC trzeba jawnie alokować/zwalniać, pilnować wycieków. W Rust używa się własności i pożyczania, by kompilator gwarantował bezpieczeństwo.

### 8.2 Systemy operacyjne (API)
- **Procesy**: izolowane jednostki wykonawcze. Tworzenie nowych procesów (fork/spawn) dla separacji lub bezpieczeństwa.
- **Wątki**: lżejsze jednostki współdzielące pamięć procesu. Użyte do równoległości na jednym procesorze/wielu rdzeniach.
- **Synchronizacja**: mechanizmy zapobiegające wyścigom (mutex, semafor, lock-free struktury). W praktyce: sekcje krytyczne zabezpieczone blokadą.

### 8.3 Programowanie współbieżne
- **Wielowątkowość**: kilka wątków wykonuje kod w tym samym czasie. Trzeba dbać o bezpieczeństwo danych współdzielonych.
- **Równoległość**: dzielenie pracy na niezależne części (np. map-reduce). Użyteczne przy dużych obliczeniach.
- **Deadlock**: wzajemne blokowanie wątków. Zapobiegamy przez ustalony porządek blokad i timeouty.

## 9. Programowanie rozproszone

### 9.1 Komunikacja
- **REST**: zasoby pod URL, standard HTTP. Dobre do CRUD i integracji z frontem.
- **RPC**: wywołania funkcji na odległość (gRPC/Thrift). Lepsze do szybkiej komunikacji serwis-serwis.
- **Messaging**: asynchroniczne kolejki/tematy (Kafka, RabbitMQ). Dobre do luźnego powiązania i buforowania obciążenia.

### 9.2 Spójność i skalowanie
- **Replikacja**: kopiowanie danych na wiele węzłów dla dostępności/skalowania. Ważne: wybór między spójnością a dostępnością (CAP).
- **Load balancing**: równoważenie ruchu między instancjami (round-robin, least connections). Stosowane z health-checkami.

### 9.3 Odporność systemów
- **Retry**: ponawianie z przerwą i limitem. Trzeba uważać na idempotencję, by nie wysłać podwójnie płatności.
- **Circuit breaker**: odcinanie wywołań do niesprawnego serwisu, by nie przeciążyć systemu.
- **Observability**: metryki, logi, trace, dashboardy i alerty, by szybko wykryć i zrozumieć problem w środowisku produkcyjnym.

## 10. Aplikacje i platforma

### 10.1 Aplikacje webowe
- **Frontend**: interfejs w przeglądarce (HTML/CSS/JS/TS). Ważna wydajność, dostępność i UX.
- **Backend**: API i logika biznesowa. Obsługa autoryzacji, walidacja danych, integracje z bazami i systemami zewnętrznymi.

### 10.2 Aplikacje mobilne
- **Native**: Swift/Kotlin. Najlepsza wydajność i dostęp do funkcji urządzenia.
- **Cross-platform**: React Native/Flutter. Jedna baza kodu na Android+iOS, szybszy rozwój kosztem czasem gorszej integracji z platformą.

### 10.3 Aplikacje desktopowe
- **GUI**: aplikacje z interfejsem (Electron, Qt, .NET MAUI). Dobre do narzędzi biurowych/produkcyjnych.
- **Systemowe**: narzędzia niskopoziomowe (C/C++/Rust) integrujące się ściśle z OS.

## 11. Bezpieczeństwo w programowaniu

### 11.1 Bezpieczne kodowanie
- **Walidacja danych**: sprawdzamy typ, zakres, format. Nie ufamy danym od użytkownika ani z zewnętrznych API.
- **Sanitizacja**: oczyszczamy dane zanim trafią do SQL/HTML/Logów, by uniknąć SQLi/XSS/Log injection.
- **Zasada najmniejszych uprawnień**: procesy i użytkownicy mają tylko to, co konieczne. Mniej szkód przy ewentualnym włamaniu.

### 11.2 Uwierzytelnianie i autoryzacja
- **Sesje**: identyfikator sesji przechowywany w ciasteczku, przechowywanie stanu po stronie serwera lub w pamięci współdzielonej (Redis). Ważne: ustawienia `HttpOnly`, `Secure`, `SameSite`.
- **Tokeny**: JWT lub opaque tokeny. JWT niesie dane, wymaga weryfikacji podpisu; tokeny niejawne wymagają lookupu po stronie serwera, ale łatwiej je unieważnić.
- **Role i uprawnienia**: RBAC/ABAC. Sprawdzamy uprawnienia na każdym wejściu do wrażliwego zasobu (serwis, repo, UI).

### 11.3 Kryptografia w kodzie
- **Hashowanie**: do haseł używamy funkcji z solą i kosztami (bcrypt, Argon2). Nigdy nie przechowujemy haseł w formie jawnej.
- **Szyfrowanie**: symetryczne (AES) do danych w spoczynku, asymetryczne (RSA/ECC) do wymiany kluczy. Pilnujemy rotacji kluczy i separacji środowisk.

## 12. Wydajność i optymalizacja

### 12.1 Profilowanie
- **CPU**: sprawdzamy, gdzie kod spędza czas. Narzędzia profilerów pokazują wąskie gardła.
- **Pamięć**: mierzymy użycie RAM i wykrywanie wycieków. Ważne przy długotrwałych procesach (workerach).

### 12.2 Optymalizacja kodu
- **Algorytmy**: wybieramy lepszą złożoność (np. `O(n log n)` zamiast `O(n^2)` przy sortowaniu i porównaniach).
- **Struktury**: dobieramy strukturę do operacji (mapa do szybkiego lookupu, kolejka priorytetowa do zadań wg wagi).
- **Przedwczesna optymalizacja**: najpierw mierzymy, potem poprawiamy konkretny hot path.

### 12.3 Skalowalność
- **Pozioma**: dodajemy instancje (więcej podów/VM), potrzebny load balancer i współdzielone storage/cache.
- **Pionowa**: mocniejsza maszyna. Szybkie, ale ma limit i jest droższe przy skali.

## 13. DevOps i cykl życia oprogramowania

### 13.1 CI/CD
- **Pipeline**: buduje, testuje, skanuje bezpieczeństwo, pakuje i publikuje artefakt. Automatyczne na każdy commit/PR.
- **Automatyzacja**: formatowanie, lint, testy, skany SAST/DAST. Wymagamy przejścia pipeline przed wdrożeniem.

### 13.2 Konteneryzacja
- **Docker**: spójne środowisko uruchomieniowe. Obrazy wersjonujemy, nie pakujemy w nie sekretów.
- **Orkiestracja**: Kubernetes/Nomad do zarządzania replikami, rolloutami, zdrowiem usług.

### 13.3 Monitoring i logowanie
- **Metryki**: CPU, RAM, czas odpowiedzi, liczba błędów, business KPIs (np. liczba udanych płatności).
- **Alerty**: progi na metryki i logi, by reagować zanim użytkownik zauważy problem.

## 14. Utrzymanie i rozwój oprogramowania

### 14.1 Refaktoryzacja
- **Techniczny dług**: zbiór kompromisów, które trzeba spłacać (np. brak testów, zduplikowany kod). Planujemy go w backlogu.
- **Małe kroki**: poprawiamy strukturę przy okazji zmian funkcjonalnych. Zawsze uruchamiamy testy po refaktorze.

### 14.2 Dokumentacja
- **Techniczna**: architektura, API, decyzje (ADR). Ułatwia onboarding i utrzymanie.
- **Użytkowa**: instrukcje dla klientów/supportu. Zmniejsza liczbę zgłoszeń.

### 14.3 Wsparcie i utrzymanie
- **Bugfix**: najpierw reprodukcja i test, potem naprawa, potem test regresyjny.
- **Aktualizacje**: zależności, poprawki bezpieczeństwa, migracje baz. Wdrażamy etapami (staging → produkcja).

## 15. Metodologie i organizacja pracy

### 15.1 Metodyki wytwarzania
- **Waterfall**: sekwencyjne etapy (analiza → projekt → implementacja → test → wdrożenie). Dobre przy stabilnych wymaganiach.
- **Agile**: iteracje, częste dostarczanie wartości, feedback od użytkowników.
- **Scrum**: sprinty, backlog, role (PO/SM/Zespół), spotkania (planning, daily, review, retro).

### 15.2 Praca zespołowa
- **Code review**: wykrywa błędy i rozprasza wiedzę. Dobre praktyki: małe PR, jasny opis, testy dołączone.
- **Komunikacja**: jasne statusy, ryzyka, blokery. Dokumentujemy ustalenia (ticket/ADR/komentarz w PR).

### 15.3 Zarządzanie projektem
- **Planowanie**: priorytety wg wartości biznesowej i ryzyka. Roadmapa + sprint backlog.
- **Estymacja**: story points lub czas. Lepsza dokładność dzięki rozbijaniu zadań na mniejsze.

## 16. Etyka i odpowiedzialność programisty

### 16.1 Odpowiedzialność kodu
- **Błędy**: testujemy, logujemy, reagujemy na incydenty. Transparentnie komunikujemy problemy.
- **Bezpieczeństwo**: nie wprowadzamy świadomie luk; zgłaszamy je, gdy znajdziemy. Dbamy o dane użytkowników (RODO).

### 16.2 Licencje i prawo
- **Open Source**: sprawdzamy licencje (MIT/Apache vs. GPL). Szanujemy wymagania licencyjne przy dystrybucji.
- **IP**: kod pisany w pracy zwykle należy do pracodawcy/klienta; unikamy kopiowania kodu z niepewnych źródeł.

## Załącznik: checklisty praktyczne

### Bezpieczeństwo (OWASP Top 10 skrót)
- Waliduj i sanitizuj każde wejście (API/UI/plik).
- Uwierzytelnianie: silne hasła, MFA gdzie możliwe, blokady po wielu próbach.
- Autoryzacja: sprawdzaj rolę/uprawnienia na każdym zasobie (backend).
- Sekrety: trzymane w vault/zmiennych środowisk, nigdy w repo/obrazie Docker.
- Logi: bez danych wrażliwych; korelacja po `request-id/trace-id`.
- Szyfrowanie: HTTPS wszędzie; AES dla danych w spoczynku; rotacja kluczy.
- Nagłówki bezpieczeństwa: `HSTS`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- Backups + test odtwarzania; plan incydentowy i kontakt on-call.

### Testy (piramida)
- Unit: szybkie, izolowane, >70% logiki biznesowej.
- Integracja: kontrakty z bazą/queue/API, najważniejsze ścieżki.
- E2E: krytyczne scenariusze użytkownika (login, zakup, płatność).
- Niefunkcjonalne: load (k6/JMeter), bezpieczeństwo (ZAP), accessibility (axe).
- W CI: lint + format + unit + kontrakt/integracja; E2E nightly lub na release.

### CI/CD (minimum dla zespołu)
- Każdy PR: lint, format, testy, skan SAST; blokada merge bez zielonego pipeline.
- Build artefaktów z pinowanymi wersjami zależności; publikacja do rejestru.
- Deploy: staging → smoke test → prod z rolloutem (canary/blue-green).
- Migracje DB wersjonowane, z rollbackiem; wykonywane przed/razem z deployem.

### Observability
- Metryki: latencja, błędy, throughput, zasoby (CPU/RAM), metryki domenowe (np. % udanych płatności).
- Logi: strukturalne (JSON), poziomy info/warn/error, korelacja trace-id.
- Tracing: distributed tracing między usługami.
- Alerty: progi na SLO/SLA; unikaj hałasu alertów.

### Wydajność
- Najpierw profiluj, potem optymalizuj. Mierz przed/po.
- Cache tam, gdzie to bezpieczne (idempotentne odczyty); waliduj TTL.
- DB: indeksy pod konkretne zapytania; unikaj N+1; paginacja wyników.
- Frontend: lazy loading, kompresja, CDN statyków, minimalizacja bundle.

### Gotowość do release (checklist)
- Funkcja ma testy (unit/integration/E2E dla krytycznych ścieżek).
- Monitoring/logi/metryki przygotowane; alerty skonfigurowane.
- Migration scripts gotowe i przetestowane na stagingu.
- Feature flag, jeśli ryzykowne wdrożenie; plan rollbacku opisany.

## Załącznik: krótkie przykłady kodu

### Walidacja wejścia (TypeScript/Express)
```ts
app.post("/orders", (req, res) => {
  const { amount, currency } = req.body;
  if (typeof amount !== "number" || amount <= 0) return res.status(400).send("Invalid amount");
  if (!["PLN", "EUR", "USD"].includes(currency)) return res.status(400).send("Invalid currency");
  // dalsza logika biznesowa…
  res.status(201).send({ ok: true });
});
```

### Bezpieczne zapytanie SQL (parametry zamiast konkatenacji)
```sql
-- zamiast: "SELECT * FROM users WHERE email = '" || email || "'"
SELECT * FROM users WHERE email = $1;
```

### Retry z backoffem (TypeScript)
```ts
async function withRetry(fn: () => Promise<void>, max = 3) {
  for (let i = 1; i <= max; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === max) throw err;
      await new Promise(r => setTimeout(r, i * 200)); // prosty backoff
    }
  }
}
```

### Test jednostkowy (Jest)
```ts
import { applyDiscount } from "./discount";

test("applies 10% discount for VIP", () => {
  const price = applyDiscount({ amount: 100, isVip: true });
  expect(price).toBe(90);
});
```

### Cache z TTL (pseudo-TS)
```ts
const cache = new Map<string, { value: any; expires: number }>();
function getWithCache(key: string, ttlMs: number, loader: () => Promise<any>) {
  const hit = cache.get(key);
  const now = Date.now();
  if (hit && hit.expires > now) return Promise.resolve(hit.value);
  return loader().then(value => {
    cache.set(key, { value, expires: now + ttlMs });
    return value;
  });
}
```

### Konsument kolejki z idempotencją (pseudo-TS)
```ts
async function consume(msg) {
  if (await wasProcessed(msg.id)) return ack(msg); // idempotencja
  try {
    await process(msg.payload);
    await markProcessed(msg.id);
    ack(msg);
  } catch (err) {
    nack(msg, { requeue: true }); // ponów później
  }
}
```

### Circuit breaker (pseudo-TS)
```ts
class CircuitBreaker {
  constructor(limit = 5, cooldownMs = 5000) {
    this.failures = 0; this.limit = limit; this.cooldownMs = cooldownMs; this.blockedUntil = 0;
  }
  async call(fn) {
    const now = Date.now();
    if (now < this.blockedUntil) throw new Error("circuit-open");
    try {
      const res = await fn();
      this.failures = 0;
      return res;
    } catch (err) {
      this.failures++;
      if (this.failures >= this.limit) this.blockedUntil = now + this.cooldownMs;
      throw err;
    }
  }
}
```

### Prometheus: prosta metryka (Node/Express)
```ts
import client from "prom-client";
const register = new client.Registry();
const httpReq = new client.Histogram({
  name: "http_request_seconds",
  help: "Czas odpowiedzi",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});
register.registerMetric(httpReq);

app.use((req, res, next) => {
  const end = httpReq.startTimer();
  res.on("finish", () => end({ method: req.method, route: req.path, status: res.statusCode }));
  next();
});
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
```

### Test kontraktowy (Pact, skrót)
```ts
// producent API
describe("contract: get /customers/:id", () => {
  it("returns customer", async () => {
    await pact.addInteraction({
      state: "customer exists",
      uponReceiving: "a request for customer",
      withRequest: { method: "GET", path: "/customers/123" },
      willRespondWith: { status: 200, body: { id: "123", name: like("Anna") } },
    });
    await provider.setup();
    await callApi(); // wywołanie realnego endpointu na mock server
    await provider.verify();
  });
});
```

### Rate limiting (Redis + token bucket, pseudo-TS)
```ts
async function allow(userId) {
  const key = `rl:${userId}`;
  const now = Date.now();
  const windowMs = 60_000; const limit = 100;
  const tx = redis.multi();
  tx.zremrangebyscore(key, 0, now - windowMs);
  tx.zcard(key);
  tx.zadd(key, now, `${now}-${Math.random()}`);
  tx.expire(key, windowMs / 1000);
  const [, count] = await tx.exec();
  return count < limit;
}
```

### Feature flag (konfiguracja + guard)
```ts
const flags = { newCheckout: true };
function withFlag(flag, fn) {
  return (...args) => (flags[flag] ? fn(...args) : { skipped: true });
}
const checkout = withFlag("newCheckout", processCheckout);
```

### Migracja bazy (SQL przykład)
```sql
-- dodanie kolumny z wartością domyślną i indeksem
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'NEW';
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
```

### docker-compose (bazowe)
```yaml
version: "3.9"
services:
  app:
    build: .
    env_file: .env
    depends_on:
      - db
    ports: ["3000:3000"]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  dbdata:
```

### Saga (event-driven, pseudo-flow)
- Zamówienie utworzone → event `OrderCreated`.
- Serwis Płatności rezerwuje środki → event `PaymentReserved`.
- Serwis Magazynu rezerwuje towar → event `StockReserved`.
- Jeśli oba sukcesy → event `OrderConfirmed`.
- Jeśli którykolwiek fail → event kompensujący (`PaymentRollback`, `StockRelease`) i `OrderCancelled`.

### Komenda + zdarzenie (CQRS skrót, pseudo-TS)
```ts
// command handler
async function handleCreateOrder(cmd) {
  const orderId = uuid();
  await ordersRepo.save({ id: orderId, status: "NEW", items: cmd.items });
  await events.publish("OrderCreated", { orderId, items: cmd.items });
}

// event handler
events.on("OrderCreated", async ({ orderId }) => {
  await payments.reserve(orderId);
});
```

### Rollback migracji (SQL przykład)
```sql
-- UP
ALTER TABLE orders ADD COLUMN processed_at TIMESTAMP NULL;

-- DOWN
ALTER TABLE orders DROP COLUMN processed_at;
```

### CI (GitHub Actions przykład JS)
```yaml
name: ci
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --runInBand
```

### Canary deployment – skrót procesu
- Deploy nowej wersji do 5–10% ruchu.
- Monitoruj metryki (błędy, latencja, konwersje).
- Jeśli OK: stopniowo zwiększ do 100%.
- Jeśli źle: automatyczny rollback do poprzedniej wersji.

### Monitorowanie logów (ELK/Loki skrót)
- Strukturalne logi (JSON) z polami: `timestamp`, `level`, `service`, `traceId`, `userId`, `message`.
- Wysyłka do brokera/log shippera (Filebeat/Fluent Bit) → Elasticsearch/Loki.
- Dashboardy + alerty na wzorce błędów i skoki 5xx.

### k6 – prosty test obciążeniowy (HTTP)
```js
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 20,
  duration: "1m",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const res = http.get("https://example.com/api/health");
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(0.5);
}
```

### docker-compose (pełniejsze: backend + frontend + db + cache)
```yaml
version: "3.9"
services:
  api:
    build: ./api
    env_file: .env
    depends_on: [db, cache]
    ports: ["8080:8080"]
  web:
    build: ./web
    env_file: .env
    depends_on: [api]
    ports: ["3000:3000"]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: example
    volumes: [dbdata:/var/lib/postgresql/data]
  cache:
    image: redis:7-alpine
volumes:
  dbdata:
```

### Saga – prosty orkiestrator (pseudo-TS)
```ts
async function orderSaga(cmd) {
  try {
    await payments.reserve(cmd.orderId);
    await stock.reserve(cmd.orderId, cmd.items);
    await shipping.prepare(cmd.orderId);
    await orders.markConfirmed(cmd.orderId);
  } catch (err) {
    await shipping.compensate(cmd.orderId).catch(() => {});
    await stock.release(cmd.orderId).catch(() => {});
    await payments.refund(cmd.orderId).catch(() => {});
    await orders.markCancelled(cmd.orderId, err.message);
    throw err;
  }
}
```