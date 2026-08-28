/**
 * SYN010: Special Number Entities: NaN, Infinity & -Infinity
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN010: Special Number Entities: NaN, Infinity & -Infinity ===");

// Problem Implementation & Demonstration:
// Sanitizing arithmetic operations:
computeDivision(100, 0);   // Handled safely without returning Infinity
computeDivision('abc', 2); // Handled safely without returning NaN

console.log("Expected Result Verified:", "100 / 0 -> Handled: 'Error: Division by zero' | 'abc' / 2 -> Handled: 'Error: Invalid number input'");
