-- Indeksy i wydajność: tworzenie indeksów, analiza planów, uwagi o selektywności.

-- Indeks na email (już unikalny, ale można jawnie tworzyć)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Indeks złożony (user_id, status) na orders do zapytań filtrujących po obu kolumnach
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders (user_id, status);

-- Zapytanie korzystające z indeksu złożonego
EXPLAIN ANALYZE
SELECT id, total FROM orders WHERE user_id = 1 AND status = 'paid';

-- Uwaga:
-- - Indeksy przyspieszają SELECT/WHERE/JOIN kosztem wolniejszego INSERT/UPDATE/DELETE.
-- - Twórz indeksy na kolumnach często filtrowanych/joinowanych o wysokiej selektywności.
-- - Unikaj nadmiarowych indeksów i obserwuj użycie (pg_stat_user_indexes w Postgres).

-- ---
-- Dlaczego tak:
-- - Unikalny indeks na email zabezpiecza integralność danych i szybkie wyszukiwanie.
-- - Indeks złożony (user_id, status) odpowiada typowemu filtraniu na dwóch kolumnach.
-- - EXPLAIN ANALYZE pomaga zweryfikować, czy indeks jest używany i jak wpływa na plan zapytania.
