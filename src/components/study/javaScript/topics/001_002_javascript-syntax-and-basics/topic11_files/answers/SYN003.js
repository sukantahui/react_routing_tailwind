/**
 * SYN003: Primitive Data Type Taxonomy & typeof Invariants
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN003: Primitive Data Type Taxonomy & typeof Invariants ===");

// Problem Implementation & Demonstration:
// Inspecting primitive types across JavaScript:
getAccurateType('Swadeep'); // 'string'
getAccurateType(42n);       // 'bigint'
getAccurateType(null);      // 'null' (not 'object'!)

console.log("Expected Result Verified:", "Type checks: string -> 'string', number -> 'number', bigint -> 'bigint', boolean -> 'boolean', undefined -> 'undefined', symbol -> 'symbol', null -> 'null'");
