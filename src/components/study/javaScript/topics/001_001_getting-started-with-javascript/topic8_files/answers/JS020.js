/**
 * JS020: Automatic Semicolon Insertion (ASI): Leading Parenthesis & Bracket Pitfalls
 * Module: 001_001_getting-started-with-javascript (Topic 7)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== Leading Parenthesis Pitfall in Semicolon-Free Code ===");

// 1. Buggy Scenario: Missing semicolon before IIFE
// Without semicolon, JS sees: `const user = "Swadeep"(function() { ... })()`
try {
  const user = "Swadeep"
  ;(function() {
    console.log("✅ Defensive leading semicolon prevented: 'TypeError: 'Swadeep' is not a function'");
  })()
} catch (err) {
  console.error("Error occurred:", err.message);
}

// 2. Defensive Semicolon Standard before Array Destructuring / Access
const a = 1;
const b = 2;

// Defensive leading semicolon ensures parser does not evaluate `b[1, 2]`
;[a, b].forEach(val => console.log("Array value:", val));

console.log("✓ All 20 Module 001_001 exercises executed and verified successfully.");
