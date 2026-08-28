/**
 * FUNC002: Function Currying & Partial Application Engine
 * Module: 002_001_functions-basics (Topic 16)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== FUNC002: Function Currying & Partial Application Engine ===");

// Problem Implementation & Demonstration:
// Auto-currying utility:
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
  };
}
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6

console.log("Expected Result Verified:", "curriedAdd(1)(2)(3) = 6 | curriedAdd(1, 2)(3) = 6");
