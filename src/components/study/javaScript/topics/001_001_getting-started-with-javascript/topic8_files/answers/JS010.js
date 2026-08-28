/**
 * JS010: Tabular Visualization with console.table() & Column Filtering
 * Module: 001_001_getting-started-with-javascript (Topic 5)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

const courseEnrollments = [
  { studentId: 101, name: "Swadeep", course: "JS Foundations", feePaid: 5000, score: 98, status: "Active" },
  { studentId: 102, name: "Tuhina", course: "JS Foundations", feePaid: 5000, score: 95, status: "Active" },
  { studentId: 103, name: "Debangshu", course: "JS Foundations", feePaid: 4500, score: 88, status: "Active" },
  { studentId: 104, name: "Abhronila", course: "JS Foundations", feePaid: 5000, score: 99, status: "Active" }
];

console.log("=== 1. Full Dataset Tabular Output ===");
console.table(courseEnrollments);

console.log("\n=== 2. Column-Filtered Tabular Output (name, score, status) ===");
console.table(courseEnrollments, ["name", "score", "status"]);
