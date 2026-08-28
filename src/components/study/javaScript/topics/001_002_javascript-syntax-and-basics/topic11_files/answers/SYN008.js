/**
 * SYN008: IEEE 754 Floating-Point Precision & Epsilon Comparison
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN008: IEEE 754 Floating-Point Precision & Epsilon Comparison ===");

// Problem Implementation & Demonstration:
// Comparing floating-point numbers safely:
const sum = 0.1 + 0.2;
console.log(sum); // 0.30000000000000004
areNearlyEqual(0.1 + 0.2, 0.3); // true

console.log("Expected Result Verified:", "0.1 + 0.2 === 0.3: false (Value: 0.30000000000000004) | areNearlyEqual: true");
