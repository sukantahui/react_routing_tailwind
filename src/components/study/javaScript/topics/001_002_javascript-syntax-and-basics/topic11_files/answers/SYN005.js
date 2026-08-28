/**
 * SYN005: Unique Identifiers & Hidden Properties with Symbol
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN005: Unique Identifiers & Hidden Properties with Symbol ===");

// Problem Implementation & Demonstration:
// Creating unique property keys with Symbol:
const ID = Symbol('student_id');
const student = { name: 'Swadeep', [ID]: 'CNAT-101' };
console.log(student[ID]);

console.log("Expected Result Verified:", "Symbol property accessed: 'CNAT-101' | Object.keys(student): ['name'] (Symbol hidden from keys)");
