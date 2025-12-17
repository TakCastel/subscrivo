import '@testing-library/jest-dom';

// jsdom ne fournit pas matchMedia ni crypto.randomUUID par défaut.
if (!window.matchMedia) {
  // Fournit une implémentation minimale pour les hooks/theme checks.
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!globalThis.crypto?.randomUUID) {
  const existingCrypto = globalThis.crypto || ({} as Crypto);
  const fallback = () => `test-uuid-${Math.random().toString(16).slice(2)}`;
  // @ts-expect-error: on étend l'objet crypto pour les tests
  globalThis.crypto = { ...existingCrypto, randomUUID: fallback };
}

