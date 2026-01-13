// Porównanie CommonJS (require/module.exports) i ESM (import/export)

// CommonJS import
const { add } = require("./js-functional-patterns"); // wciąga funkcję z innego pliku

// CommonJS eksport wielu elementów
function helloCjs(name) {
  return `CJS mówi cześć ${name}`; // prosty tekst
}
module.exports.helloCjs = helloCjs; // przypisanie do exports
module.exports.addFromCjs = add; // re-eksport funkcji z innego modułu

// ESM przykład (do użycia w pliku .mjs lub z "type":"module" w package.json):
// export function helloEsm(name) {
//   return `ESM mówi cześć ${name}`;
// }
// import { helloEsm } from "./js-modules-esm-cjs.js"; // składnia importu ESM
//
// Różnice:
// - ESM wspiera importy statyczne (tree-shaking, top-level await)
// - CommonJS jest ładowany dynamicznie (require), działa w starych wersjach Node
// - Mieszanie bywa kłopotliwe: import CJS w ESM wymaga createRequire lub default importu

// Dynamiczny import ESM w środku funkcji (async) – działa w module ESM:
// async function loadLazy() {
//   const mod = await import("./js-functional-patterns.js"); // dynamiczny import
//   return mod.add(2, 3);
// }

// Top-level await (tylko w ESM): pozwala await poza funkcją async
// const data = await fetchJson("https://api.example.com"); // przykład użycia

// Dlaczego ESM?
// - Standard przeglądarkowy i Node
// - Lepsza analiza statyczna bundlerów (treeshaking)
// - Spójna składnia import/export w front i back

// Kiedy CJS?
// - Legacy projekty bez "type":"module"
// - Gdy zależności są tylko w CJS i brak czasu na migrację

// ---
// Dlaczego tak:
// - Zestawia w jednym miejscu podstawowe różnice CJS vs ESM (import/export, tree-shaking, top-level await).
// - Pokazuje re-eksport funkcji z innego modułu w CommonJS i przykład eksportu ESM w komentarzu.
// - Podkreśla kontekst użycia: legacy CJS vs nowoczesny ESM oraz mieszanie modułów.
// - Dynamiczny import i uwaga o createRequire sygnalizują typowe pułapki migracji.
