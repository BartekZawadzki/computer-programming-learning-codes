-- Podstawy SQL: tworzenie tabeli, dane przykładowe, proste SELECT/WHERE/ORDER/GROUP.

-- Tworzenie tabeli users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,               -- klucz główny (PostgreSQL auto-increment)
    name VARCHAR(100) NOT NULL,          -- imię
    email VARCHAR(200) UNIQUE NOT NULL,  -- email unikalny
    created_at TIMESTAMP NOT NULL DEFAULT NOW() -- znacznik czasu
);

-- Dane przykładowe
INSERT INTO users (name, email) VALUES
('Ala', 'ala@example.com'),
('Ola', 'ola@example.com'),
('Adam', 'adam@example.com');

-- Prosty SELECT
SELECT id, name, email FROM users;

-- Filtrowanie WHERE
SELECT id, name FROM users WHERE email LIKE '%@example.com';

-- Sortowanie
SELECT id, name FROM users ORDER BY name ASC;

-- Agregacja i GROUP BY
SELECT COUNT(*) AS total_users FROM users;

-- ---
-- Dlaczego tak:
-- - Prosty schemat users demonstruje PK, unikalność i znaczniki czasu.
-- - Przykłady SELECT/WHERE/ORDER/GROUP pokazują podstawowe operacje na danych.
-- - INSERT z kilkoma rekordami umożliwia szybkie lokalne testy zapytań.
