<?php
// Redis w PHP z biblioteką predis/predis (klient).
// Wymaga zainstalowanego serwera Redis i zależności predis/predis.

declare(strict_types=1);

// require __DIR__ . '/vendor/autoload.php';               // autoloader Composera
// $client = new Predis\Client([                           // konfiguracja klienta
//     'scheme' => 'tcp',
//     'host' => '127.0.0.1',
//     'port' => 6379,
// ]);
//
// // SET/GET klucza
// $client->set('greeting', 'hello');                      // zapis klucza
// $val = $client->get('greeting');                        // odczyt klucza
// // echo $val . PHP_EOL;                                 // hello
//
// // Inkrementacja licznika
// $client->incr('counter');                               // zwiększ licznik
//
// // Listy
// $client->lpush('tasks', 't1');                          // wstaw z lewej
// $client->rpush('tasks', 't2');                          // wstaw z prawej
// $task = $client->lpop('tasks');                         // pobierz z lewej
//
// // Publikacja w kanale (pub/sub)
// $client->publish('events', json_encode(['type' => 'ping'])); // wyślij event

// ---
// Dlaczego tak:
// - Predis demonstruje podstawowe operacje Redis (klucze, licznik, lista, pub/sub) w jednym miejscu.
// - Jawna konfiguracja host/port ułatwia podmianę środowisk i debug.
// - Operacje listy pokazują kolejkę FIFO/LIFO, a publish ilustruje integrację eventową.
// - Komentarz o autoloaderze przypomina o instalacji przez Composera przed użyciem.
