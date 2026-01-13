// Metro bundler config (podstawowy) z komentarzami.
// W większości przypadków default wystarcza; tu pokazane rozszerzenie resolvera.

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    resolver: {
      sourceExts: [...defaultConfig.resolver.sourceExts, "cjs"], // dodaj wsparcie .cjs
    },
    transformer: defaultConfig.transformer, // użyj domyślnego transformera
  };
})();

// ---
// Dlaczego tak:
// - getDefaultConfig zapewnia bazowe ustawienia Metro i minimalizuje ryzyko konfliktów.
// - Dodanie .cjs do sourceExts pomaga przy pakietach, które publikują CommonJS w RN.
// - Reszta pozostaje domyślna, by nie komplikować konfiguracji, jeśli nie ma potrzeby.
