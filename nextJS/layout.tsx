// Układ globalny Next 13+ (App Router) z komentarzami.
// Zawiera metadane i globalne style (opcjonalnie).
import "./globals.css"; // jeśli masz globalne style
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Przykład Next.js",
  description: "Szablon strony głównej z komentarzami",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

// ---
// Dlaczego tak:
// - RootLayout w App Router definiuje wspólny HTML/body i metadane dla wszystkich stron.
// - Import globals.css w jednym miejscu zapewnia spójne style w całej aplikacji.
// - metadata ułatwia SEO i współdzielenie podstawowych informacji między podstronami.
