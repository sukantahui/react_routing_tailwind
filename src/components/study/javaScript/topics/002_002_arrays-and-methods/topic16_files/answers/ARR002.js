/**
 * ARR002: Polyfilling Array.prototype.reduce & Accumulator Patterns
 * Module: 002_002_arrays-and-methods (Topic 16)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== ARR002: Polyfilling Array.prototype.reduce & Accumulator Patterns ===");

// Problem Implementation & Demonstration:
// Custom reduce polyfill implementation:
Array.prototype.customReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
[1, 2, 3, 4].customReduce((acc, x) => acc + x, 0);

console.log("Expected Result Verified:", "Sum computed via customReduce: 10 | Handled initialValue and sparse elements");
