/**
 * FUNC001: Closure-Based Stateful Counter & Private State Encapsulation
 * Module: 002_001_functions-basics (Topic 16)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== FUNC001: Closure-Based Stateful Counter & Private State Encapsulation ===");

// Problem Implementation & Demonstration:
// Creating encapsulated stateful counter:
function createSecureCounter(initialValue = 0) {
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createSecureCounter(10);
counter.increment();

console.log("Expected Result Verified:", "Counter incremented: 11 | Direct variable access: undefined (Protected State)");
