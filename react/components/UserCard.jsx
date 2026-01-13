// Komponent prezentacyjny (JSX) z komentarzami – wyświetla dane użytkownika.
// Możesz go użyć np. w App.jsx: <UserCard user={u} />
export default function UserCard({ user }) {
  if (!user) return null;                          // brak danych => nic nie renderuj
  return (
    <li className="user-card">
      <strong>{user.name}</strong> {/* imię w bold */}
      <span> – {user.email}</span>  {/* email */}
    </li>
  );
}

// ---
// Dlaczego tak:
// - Komponent prezentacyjny utrzymuje odpowiedzialność tylko za wygląd danych użytkownika.
// - Sprawdzenie !user chroni przed renderem pustej wartości.
// - Prosta struktura ułatwia ponowne użycie w listach i testowanie snapshotów.
