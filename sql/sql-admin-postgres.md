# Postgres – notatki admina (psql, role, backup) z komentarzami

## Role i użytkownicy
- Tworzenie użytkownika: `CREATE USER app WITH PASSWORD 'secret';`
- Nadanie uprawnień do DB: `GRANT CONNECT ON DATABASE app TO app;`
- Ustawienie schematu domyślnego: `ALTER ROLE app SET search_path TO public;`

## Backup/restore
- Pełny dump: `pg_dump -Fc -U app -h localhost app > backup.dump` (format custom)
- Przywracanie: `pg_restore -c -d app -U app -h localhost backup.dump` (`-c` = drop objects)
- Plain SQL: `pg_dump -U app app > backup.sql`; restore: `psql -U app app < backup.sql`

## Podgląd indeksów i statystyk
- `\d users` (psql) – struktura tabeli
- `\di` – lista indeksów
- `SELECT * FROM pg_stat_user_indexes WHERE relname = 'orders';`

## Blokady i transakcje
- `SELECT * FROM pg_locks WHERE NOT granted;` – oczekujące blokady
- `SELECT pid, state, query FROM pg_stat_activity;` – aktywne zapytania
- Zabicie backendu: `SELECT pg_terminate_backend(pid);`

## Vacuum/Analyze
- Ręczny vacuum: `VACUUM ANALYZE;`
- Auto-vacuum: sterowanie w `postgresql.conf` (`autovacuum`, `autovacuum_vacuum_scale_factor`, itp.)

## Poziom izolacji domyślny
- PostgreSQL: `READ COMMITTED`
- Można ustawić: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`

## Przydatne psql
- `\l` – listuj bazy
- `\c app` – przełącz bazę
- `\dt` – tabele w schemacie
- `\df` – funkcje
- `\timing` – włącz pomiar czasu zapytań

---
Dlaczego tak:
- Zebrane komendy psql i narzędzia (pg_dump/pg_restore) to podstawowy zestaw administracyjny do codziennej pracy.
- Wzmianki o blokadach/vacuum/isolacji pomagają diagnozować problemy z wydajnością i konkurencją transakcji.
- Oddzielne sekcje rola/backup/monitoring czynią notatkę szybką ściągą bez wchodzenia w szczegóły dokumentacji.
