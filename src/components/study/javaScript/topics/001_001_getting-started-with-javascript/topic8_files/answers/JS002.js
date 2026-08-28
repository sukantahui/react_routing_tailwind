/**
 * JS002: Universal Global Context with globalThis (ES2020)
 * Module: 001_001_getting-started-with-javascript (Topic 0)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// Universal Global Config Registry
const UniversalConfigStore = {
  set(key, value) {
    // globalThis is universally supported in modern browsers, Node.js, Deno, Bun
    if (!globalThis.__APP_STORE__) {
      globalThis.__APP_STORE__ = {};
    }
    globalThis.__APP_STORE__[key] = value;
  },

  get(key) {
    return globalThis.__APP_STORE__ ? globalThis.__APP_STORE__[key] : undefined;
  },

  listAll() {
    return globalThis.__APP_STORE__ || {};
  }
};

// Test cross-platform global registration
UniversalConfigStore.set("institute", "Coder & AccoTax");
UniversalConfigStore.set("center", "Barrackpore Lab");
UniversalConfigStore.set("course", "JS-PRO-101: Modern JavaScript Mastery");
UniversalConfigStore.set("version", "2026.1.0");

console.log("Retrieved Config Key 'institute':", UniversalConfigStore.get("institute"));
console.log("Retrieved Config Key 'center':", UniversalConfigStore.get("center"));
console.log("Full Global Store on globalThis:", UniversalConfigStore.listAll());
