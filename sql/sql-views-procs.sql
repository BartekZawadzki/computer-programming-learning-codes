-- Widoki, funkcje, procedury (PostgreSQL przykłady).

-- Widok: suma zamówień per użytkownik
CREATE OR REPLACE VIEW vw_user_totals AS
SELECT u.id AS user_id, u.name, COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;

-- Funkcja (SQL) – zwraca całkowitą kwotę zamówień dla user_id
CREATE OR REPLACE FUNCTION fn_user_total(p_user_id INT)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(total), 0) FROM orders WHERE user_id = p_user_id;
$$ LANGUAGE SQL;

-- Procedura (PL/pgSQL) – przykładowa procedura aktualizująca status zamówienia
CREATE OR REPLACE PROCEDURE sp_mark_paid(p_order_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE orders SET status = 'paid' WHERE id = p_order_id;
END;
$$;

-- Użycie:
-- SELECT * FROM vw_user_totals;
-- SELECT fn_user_total(1);
-- CALL sp_mark_paid(2);

-- ---
-- Dlaczego tak:
-- - Widok agreguje dane i upraszcza częste zapytania (suma zamówień per user).
-- - Funkcja SQL (fn_user_total) umożliwia ponowne użycie logiki agregacji w innych miejscach.
-- - Procedura PL/pgSQL pokazuje, jak enkapsulować operacje modyfikujące (np. mark paid) w DB.
