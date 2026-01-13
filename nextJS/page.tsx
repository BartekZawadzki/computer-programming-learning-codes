// Strona główna (server component) Next.js z komentarzami.
// Pokazuje prosty fetch na serwerze i klientowy licznik.
import ClientCounter from "./ClientCounter";

// Przykładowy fetch na serwerze (SSR) – wykorzystuje cache domyślne Next (revalidacja on demand).
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    // next: { revalidate: 60 }, // odkomentuj, aby ustawić ISR (rebuild co 60s)
  });
  if (!res.ok) throw new Error("Błąd pobierania danych");
  return res.json() as Promise<Array<{ id: number; title: string }>>;
}

export default async function Page() {
  const posts = await getPosts(); // dane pobrane na serwerze

  return (
    <main style={{ padding: "24px", maxWidth: 960, margin: "0 auto" }}>
      <h1>Next.js – przykładowa strona</h1>
      <p>Server Component: dane z fetch na serwerze.</p>

      <section style={{ margin: "16px 0" }}>
        <h2>Posty (SSR)</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </section>

      <section style={{ margin: "16px 0" }}>
        <h2>Client Component (interakcja)</h2>
        <ClientCounter />
      </section>
    </main>
  );
}

// ---
// Dlaczego tak:
// - Server Component może wykonywać fetch na serwerze (SSR/ISR) i zwracać gotowe dane do renderu.
// - Podział na sekcje SSR (posts) i client (counter) pokazuje hybrydowy model Next 13+.
// - ISR (komentarz revalidate) wskazuje miejsce, gdzie można włączyć odświeżanie cache bez pełnego rebuild.
