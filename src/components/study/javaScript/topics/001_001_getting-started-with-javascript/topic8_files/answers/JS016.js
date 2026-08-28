/**
 * JS016: Strict Mode: 'this' Keyword Coercion Defense
 * Module: 001_001_getting-started-with-javascript (Topic 6)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// Function 1: Non-strict mode (sloppy mode)
function getSloppyThis() {
  return this; // Coerced to global window (in browser) or global (in Node)
}

// Function 2: Strict mode
function getStrictThis() {
  "use strict";
  return this; // Preserved as undefined when invoked without an explicit receiver
}

console.log("=== 'this' Keyword Binding Comparison ===");

const sloppyResult = getSloppyThis();
const isSloppyGlobal = typeof window !== "undefined" ? sloppyResult === window : typeof global !== "undefined" && sloppyResult === global;
console.log("Sloppy Mode 'this' bound to global:", isSloppyGlobal); // true

const strictResult = getStrictThis();
console.log("Strict Mode 'this' value:", strictResult);             // undefined
console.log("Strict Mode protects against accidental global mutation:", strictResult === undefined); // true
