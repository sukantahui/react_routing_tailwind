/**
 * SYN002: Block Scope vs Function Scope with let, const & var
 * Module: 001_002_javascript-syntax-and-basics (Topic 11)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== SYN002: Block Scope vs Function Scope with let, const & var ===");

// Problem Implementation & Demonstration:
{
  var functionScoped = 'Available outside block';
  let blockScoped = 'Confined to block';
  const immutableRef = 100;
}
console.log(functionScoped);

console.log("Expected Result Verified:", "Outside block -> var: 'Available outside block' | let in outer scope: ReferenceError");
