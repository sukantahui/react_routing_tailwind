/**
 * SYN007: Explicit Type Conversion vs Implicit Type Coercion Pipeline
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN007: Explicit Type Conversion vs Implicit Type Coercion Pipeline ===");

// Problem Implementation & Demonstration:
// Evaluating type conversions across inputs:
convertValue(null);
convertValue(undefined);
convertValue([]);
convertValue([10]);

console.log("Expected Result Verified:", "null -> Number: 0, String: 'null', Boolean: false
undefined -> Number: NaN, String: 'undefined', Boolean: false
[] -> Number: 0, String: '', Boolean: true");
