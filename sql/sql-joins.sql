-- SQL JOINy: INNER/LEFT/RIGHT, aliasy, filtrowanie wyników.

-- Tabela orders (zamówienia) powiązana z users.user_id
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,                 -- klucz główny
    user_id INT NOT NULL REFERENCES users(id), -- klucz obcy do users
    total NUMERIC(10,2) NOT NULL,          -- kwota
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- status zamówienia
    created_at TIMESTAMP NOT NULL DEFAULT NOW()    -- znacznik czasu
);

-- Dane przykładowe
INSERT INTO orders (user_id, total, status) VALUES
(1, 120.00, 'paid'),
(1, 80.00, 'pending'),
(2, 50.50, 'paid');

-- INNER JOIN: tylko rekordy z dopasowaniem w obu tabelach
SELECT o.id, u.name, o.total
FROM orders o
JOIN users u ON u.id = o.user_id;

-- LEFT JOIN: wszyscy użytkownicy, zamówienia jeśli istnieją
SELECT u.id AS user_id, u.name, o.id AS order_id, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
ORDER BY u.id;

-- RIGHT JOIN: wszystkie zamówienia, użytkownicy jeśli istnieją
SELECT u.id, u.name, o.id AS order_id, o.total
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id;

-- Sumy per użytkownik (GROUP BY + LEFT JOIN)
SELECT u.id, u.name, COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;

-- ---
-- Dlaczego tak:
-- - Struktura orders z FK do users pokazuje relację 1..N i użycie REFERENCES.
-- - Zestaw JOINów (INNER/LEFT/RIGHT) ilustruje różnice w zachowaniu przy brakujących rekordach.
-- - Agregacja z COALESCE pokazuje, jak uniknąć NULL przy użytkownikach bez zamówień.
