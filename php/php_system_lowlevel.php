<?php
// Programowanie systemowe w PHP: procesy (pcntl), forki, sygnały, pamięć, wątki (pthreads/Swoole uwaga).
// Uwaga: pcntl_* dostępne tylko w CLI i na systemach unixowych; wątków natywnie brak (pthreads to rozszerzenie).

declare(strict_types=1);

// Pamięć:
// - PHP jest zarządzany przez własny GC (zliczanie referencji + cykle).
// - Stos dotyczy ramek funkcji, dane obiektów/tablic są na stercie engine PHP.

// Proces potomny przez pcntl_fork (Unix)
function fork_example(): array {
    if (!function_exists('pcntl_fork')) {
        return ['supported' => false];                   // brak wsparcia na danej instalacji
    }
    $pid = pcntl_fork();                                // utwórz proces potomny
    if ($pid === -1) {
        return ['error' => 'fork failed'];              // błąd
    } elseif ($pid === 0) {                             // gałąź dziecka
        // echo "Child PID=" . getmypid() . PHP_EOL;    // praca dziecka
        exit(0);                                        // zakończ dziecko
    } else {                                            // gałąź rodzica
        pcntl_wait($status);                            // poczekaj na dziecko
        return ['child_pid' => $pid, 'status' => $status];
    }
}

// Deadlock – w PHP przy blokadach (np. plikowych) można zablokować się nawzajem; tu prosty szkic z flock.
function file_lock_demo(string $path): bool {
    $fh = fopen($path, 'w+');
    if (!$fh) return false;
    if (!flock($fh, LOCK_EX)) return false;             // blokada wyłączna
    // ... praca krytyczna ...
    flock($fh, LOCK_UN);                                // zwolnij
    fclose($fh);
    return true;
}

// Wątki: pthreads/swoole to rozszerzenia; domyślnie PHP używa procesów (np. FPM worker), nie wątków użytkownika.

if (PHP_SAPI === 'cli') {
    // $res = fork_example();                           // uruchom demo forka (zakomentowane domyślnie)
    // print_r($res);
}

// ---
// Dlaczego tak:
// - Opisuje realia niskiego poziomu w PHP: brak natywnych wątków (poza rozszerzeniami), GC refcount + cykle.
// - fork_example pokazuje użycie pcntl_fork/pcntl_wait na Unixie i przewiduje brak wsparcia.
// - file_lock_demo ilustruje sekcję krytyczną na blokadzie plikowej (flock) i ryzyko deadlocków.
// - Komentarz o pthreads/Swoole przypomina, że współbieżność w PHP zwykle realizuje się procesami (FPM/CLI).
