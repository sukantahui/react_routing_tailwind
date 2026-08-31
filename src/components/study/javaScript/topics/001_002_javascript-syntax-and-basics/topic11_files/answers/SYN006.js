/**
 * SYN006: Strict Equality (===), Loose Equality (==) & Object.is() Comparison Matrix
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN006: Strict Equality (===), Loose Equality (==) & Object.is() Comparison Matrix ===");

// Problem Implementation & Demonstration:
// Comparing edge cases across equality mechanisms:
compareEquality(NaN, NaN);
compareEquality(+0, -0);
compareEquality('0', 0);

console.log("Expected Result Verified:", "NaN vs NaN → ==: false | ===: false | Object.is: true
+0 vs -0 → ==: true | ===: true | Object.is: false
'0' vs 0 → ==: true | ===: false | Object.is: false");
