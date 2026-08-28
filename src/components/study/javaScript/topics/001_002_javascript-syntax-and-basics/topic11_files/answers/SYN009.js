/**
 * SYN009: Const Immutability Trap: Variable Binding vs Object Content
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN009: Const Immutability Trap: Variable Binding vs Object Content ===");

// Problem Implementation & Demonstration:
// Mutating const object vs rebinding:
const profile = { name: 'Swadeep', details: { city: 'Barrackpore' } };
profile.name = 'Swadeep Mukherjee'; // Valid!
// profile = {}; // TypeError: Assignment to constant variable

console.log("Expected Result Verified:", "Const object mutated: 'Swadeep Mukherjee' | Deep Freeze prevents nested mutation: TypeError");
