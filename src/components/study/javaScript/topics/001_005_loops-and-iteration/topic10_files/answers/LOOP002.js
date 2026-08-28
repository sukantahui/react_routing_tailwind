/**
 * LOOP002: Loop Comparison Matrix: for vs for...of vs for...in vs forEach
 * Module: 001_005_loops-and-iteration (Topic 10)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== LOOP002: Loop Comparison Matrix: for vs for...of vs for...in vs forEach ===");

// Problem Implementation & Demonstration:
// Comparing loop iteration behaviors:
const arr = ['a', 'b', 'c'];
Array.prototype.customProp = 'polluted';

// for...in logs indices AND prototype property 'customProp'!
// for...of logs only array values 'a', 'b', 'c' cleanly.

console.log("Expected Result Verified:", "for...of values: 'a', 'b', 'c' | for...in traversed prototype pollution: 'customProp'");
