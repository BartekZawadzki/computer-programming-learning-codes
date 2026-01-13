// Client Component – prosty licznik z komentarzami.
"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0); // stan lokalny hook useState
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}

// ---
// Dlaczego tak:
// - "use client" wymusza render klienta, bo komponent używa stanu/hooków.
// - useState i proste przyciski pokazują minimalny interaktywny fragment obok Server Components.
// - Oddzielny plik pozwala łatwo włączać/wyłączać klientowe kawałki w App Router.
