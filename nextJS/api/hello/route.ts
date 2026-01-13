// Route Handler (API) w App Router – zwraca JSON.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js API route" });
}

// ---
// Dlaczego tak:
// - App Router używa plików route.ts dla endpointów; GET zwraca NextResponse z JSON.
// - Minimalny przykład pokazuje kształt API route bez zewnętrznych zależności.
// - Export GET jest czytelny i wspiera cache/revalidate, jeśli dodamy opcje w NextResponse.
