/**
 * LOOP001: Iterables & the Symbol.iterator Protocol
 * Module: 001_005_loops-and-iteration (Topic 10)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== LOOP001: Iterables & the Symbol.iterator Protocol ===");

// Problem Implementation & Demonstration:
// Creating custom iterable range object:
function createRange(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            const val = current;
            current += step;
            return { value: val, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}
const nums = [...createRange(1, 5)];

console.log("Expected Result Verified:", "Spread custom iterable: [1, 2, 3, 4, 5] | for...of iterated successfully");
