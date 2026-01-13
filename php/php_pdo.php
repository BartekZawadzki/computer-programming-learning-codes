<?php
// PDO: połączenie z DB, prepared statements, transakcje, fetch assoc.
// Wymaga zainstalowanego rozszerzenia PDO i drivera (np. pdo_mysql/pdo_pgsql).

declare(strict_types=1);

$dsn = "mysql:host=localhost;dbname=app;charset=utf8mb4"; // DSN DB
$user = "app";                                            // użytkownik
$pass = "secret";                                         // hasło

try {
    $pdo = new PDO($dsn, $user, $pass, [                  // utwórz połączenie
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,      // wyjątki przy błędach
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // fetch jako tablica assoc
    ]);

    $pdo->beginTransaction();                             // start transakcji

    $stmt = $pdo->prepare("INSERT INTO users(name,email) VALUES (:name,:email)"); // SQL
    $stmt->execute([                                      // wykonaj z parametrami
        ":name" => "Ala",                                 // param :name
        ":email" => "ala@example.com",                    // param :email
    ]);

    $stmt = $pdo->prepare("SELECT id, name, email FROM users"); // SELECT
    $stmt->execute();                                     // wykonaj
    $rows = $stmt->fetchAll();                            // pobierz wszystkie
    // foreach ($rows as $row) {                          // iteracja wyników
    //     echo $row["id"] . " " . $row["name"] . "\n";   // wypisz (zakomentowane)
    // }

    $pdo->commit();                                       // commit transakcji
} catch (Throwable $e) {                                  // łap wyjątki/błędy
    // echo "DB error: " . $e->getMessage();              // log błędu (zakomentowane)
    if (isset($pdo) && $pdo->inTransaction()) {           // jeśli w transakcji
        $pdo->rollBack();                                 // rollback
    }
}

// ---
// Dlaczego tak:
// - PDO z ERRMODE_EXCEPTION i FETCH_ASSOC to bezpieczne, czytelne ustawienia domyślne.
// - Prepared statements z nazwanymi parametrami chronią przed SQL injection i poprawiają czytelność.
// - Ręczna transakcja (begin/commit/rollback) pokazuje kontrolę spójności operacji.
// - Blok try/catch z rollback zabezpiecza przed pozostawieniem otwartej transakcji po błędzie.
