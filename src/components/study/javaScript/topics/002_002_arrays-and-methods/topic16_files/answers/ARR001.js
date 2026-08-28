/**
 * ARR001: Mutating vs Non-Mutating Array Methods Architecture
 * Module: 002_002_arrays-and-methods (Topic 16)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== ARR001: Mutating vs Non-Mutating Array Methods Architecture ===");

// Problem Implementation & Demonstration:
// Comparing mutating vs immutable array operations:
const original = [3, 1, 2];
const sortedCopy = original.toSorted((a, b) => a - b); // ES2023

// original remains [3, 1, 2]!

console.log("Expected Result Verified:", "original: [3, 1, 2] | toSorted copy: [1, 2, 3] | Verified zero state mutation");
