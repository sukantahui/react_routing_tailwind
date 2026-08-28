/**
 * JS003: V8 Memory Layout: Call Stack vs Heap References
 * Module: 001_001_getting-started-with-javascript (Topic 0)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// 1. Primitive stored on Call Stack by VALUE
let originalScore = 95;
let copiedScore = originalScore;
copiedScore = 100; // Modifying copy leaves original intact

console.log("=== 1. Primitive Call Stack Value Copying ===");
console.log("originalScore (unchanged):", originalScore); // 95
console.log("copiedScore (updated):", copiedScore);       // 100

// 2. Object stored in Memory Heap by REFERENCE (Pointer Address)
const originalStudent = {
  id: 101,
  name: "Swadeep",
  skills: ["HTML5", "CSS3"]
};

const studentReference = originalStudent; // Copies pointer address, NOT object data

// Mutating via reference alias
studentReference.skills.push("JavaScript ES2026");
studentReference.name = "Swadeep Mukherjee";

console.log("\n=== 2. Memory Heap Object Reference Mutation ===");
console.log("originalStudent.name:", originalStudent.name);     // 'Swadeep Mukherjee'
console.log("originalStudent.skills:", originalStudent.skills); // ['HTML5', 'CSS3', 'JavaScript ES2026']
console.log("Pointers point to exact same memory cell:", originalStudent === studentReference); // true
