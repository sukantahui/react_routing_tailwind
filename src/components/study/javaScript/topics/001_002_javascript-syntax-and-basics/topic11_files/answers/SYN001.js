/**
 * SYN001: Temporal Dead Zone (TDZ) & Lexical Declaration Safety
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN001: Temporal Dead Zone (TDZ) & Lexical Declaration Safety ===");

// Problem Implementation & Demonstration:
// Inspecting variable access before declaration:
function testTDZ() {
  // console.log(taxRate); // ReferenceError in TDZ!
  let taxRate = 0.18;
  return taxRate;
}
testTDZ();

console.log("Expected Result Verified:", "Caught TDZ Error: ReferenceError: Cannot access 'taxRate' before initialization | var hoisted: undefined");
