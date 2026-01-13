-- Przykładowa migracja (DDL) w stylu „up/down” (do narzędzi migracyjnych).

-- UP: dodanie kolumny indexowanej do orders i utworzenie indeksu
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP; -- nowa kolumna
CREATE INDEX IF NOT EXISTS idx_orders_delivered_at ON orders (delivered_at); -- indeks na nowej kolumnie

-- DOWN: usunięcie indeksu i kolumny (rollback)
-- DROP INDEX IF EXISTS idx_orders_delivered_at;
-- ALTER TABLE orders DROP COLUMN IF EXISTS delivered_at;

-- Uwaga: w narzędziach migracyjnych (Flyway/Liquibase/Knex/etc.) rozdziela się pliki up/down.

-- ---
-- Dlaczego tak:
-- - Sekcja UP/DOWN demonstruje, jak dodawać i wycofywać zmiany schematu w narzędziach migracyjnych.
-- - Indeks na nowej kolumnie od razu pokazuje, jak zadbać o wydajność zapytań po delivered_at.
-- - Komentarz o oddzielnych plikach przypomina o konwencji stosowanej przez popularne migratory.
