-- Transakcje i izolacja: BEGIN/COMMIT/ROLLBACK, poziomy izolacji, blokady.

-- Przykładowa transakcja (PostgreSQL)
BEGIN;                                     -- start transakcji
    UPDATE orders SET status = 'paid' WHERE id = 2; -- zmiana statusu
    INSERT INTO orders (user_id, total, status) VALUES (2, 30.00, 'pending'); -- nowy rekord
COMMIT;                                    -- zatwierdzenie

-- ROLLBACK cofnie wszystkie zmiany w obrębie transakcji
BEGIN;
    UPDATE orders SET total = total + 10 WHERE id = 1;
ROLLBACK;                                  -- cofnięcie

-- Poziom izolacji (SET TRANSACTION) – przykład ustawienia na SERIALIZABLE
BEGIN;
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    SELECT * FROM orders WHERE status = 'pending' FOR UPDATE; -- blokada rekordów
COMMIT;

-- Uwagi:
-- - READ COMMITTED (domyślnie w PG) – każda instrukcja widzi zatwierdzone dane na moment startu instrukcji.
-- - REPEATABLE READ – spójny snapshot na czas transakcji, zapobiega non-repeatable read.
-- - SERIALIZABLE – najwyższa izolacja, może zgłaszać błędy „could not serialize” przy konfliktach.
-- - FOR UPDATE/SHARE – blokady wierszy przy odczycie w transakcjach, stosuj ostrożnie.

-- ---
-- Dlaczego tak:
-- - Przykład pokazuje podstawowy cykl transakcji (BEGIN/COMMIT/ROLLBACK) i wpływ na dane.
-- - SET TRANSACTION ISOLATION LEVEL podkreśla, że izolacja może być per-transakcja, nie tylko globalnie.
-- - FOR UPDATE ilustruje mechanizm blokowania rekordów, co jest kluczowe przy konkurencyjnych zapisach.
