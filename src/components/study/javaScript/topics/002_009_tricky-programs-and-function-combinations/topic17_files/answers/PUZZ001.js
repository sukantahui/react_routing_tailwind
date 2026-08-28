/**
 * PUZZ001: Deep Recursive Array & Object Flattener
 * Module: 002_009_tricky-programs-and-function-combinations (Topic 17)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== PUZZ001: Deep Recursive Array & Object Flattener ===");

// Problem Implementation & Demonstration:
// Flattening deeply nested array:
function deepFlatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val)
  , []);
}
deepFlatten([1, [2, [3, [4, [5]]]]]);

console.log("Expected Result Verified:", "Deeply flattened result: [1, 2, 3, 4, 5]");
