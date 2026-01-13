/** @type {import('next').NextConfig} */
// Konfiguracja Next.js z komentarzami.
const nextConfig = {
  reactStrictMode: true,          // włącza dodatkowe ostrzeżenia w dev
  swcMinify: true,                // minifikacja przez kompilator SWC
  images: {
    domains: ["images.unsplash.com"], // dozwolone domeny dla <Image>
  },
  // rewrites / redirects można dodać w razie potrzeby
  // async redirects() {
  //   return [{ source: "/old", destination: "/new", permanent: true }];
  // },
};

module.exports = nextConfig;

// ---
// Dlaczego tak:
// - reactStrictMode/SWC to domyślne optymalizacje Next dla jakości i wydajności.
// - Lista domen dla <Image> musi być jawna, by Next mógł proxy/optimize obrazy.
// - Komentarze do rewrites/redirects pokazują, gdzie dodać migracje URL bez zmian w kodzie stron.
