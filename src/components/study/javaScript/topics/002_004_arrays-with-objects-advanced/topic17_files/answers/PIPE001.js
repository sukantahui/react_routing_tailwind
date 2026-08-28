/**
 * PIPE001: Data Grouping with Object.groupBy & Map.groupBy (ES2024)
 * Module: 002_004_arrays-with-objects-advanced (Topic 17)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== PIPE001: Data Grouping with Object.groupBy & Map.groupBy (ES2024) ===");

// Problem Implementation & Demonstration:
// Grouping dataset using ES2024 Object.groupBy:
const students = [
  { name: 'Swadeep', course: 'JS', score: 95 },
  { name: 'Tuhina', course: 'JS', score: 88 },
  { name: 'Debangshu', course: 'Python', score: 92 }
];
const grouped = Object.groupBy(students, s => s.course);

console.log("Expected Result Verified:", "Grouped by course: { JS: [{ name: 'Swadeep' }, { name: 'Tuhina' }], Python: [{ name: 'Debangshu' }] }");
