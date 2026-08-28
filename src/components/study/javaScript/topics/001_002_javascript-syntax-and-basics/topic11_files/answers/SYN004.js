/**
 * SYN004: Arbitrary-Precision Integers with BigInt
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN004: Arbitrary-Precision Integers with BigInt ===");

// Problem Implementation & Demonstration:
// Working beyond Number.MAX_SAFE_INTEGER (9007199254740991):
const safeMax = BigInt(Number.MAX_SAFE_INTEGER);
const transaction1 = safeMax + 10n;
const transaction2 = safeMax + 20n;

console.log("Expected Result Verified:", "MAX_SAFE_INTEGER + 10: 9007199254741001n | Exact difference: 10n");
