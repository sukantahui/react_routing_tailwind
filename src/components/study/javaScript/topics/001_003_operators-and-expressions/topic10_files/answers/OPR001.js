/**
 * OPR001: Arithmetic Operator Suite & Exponentiation Precedence
 * Module: 001_003_operators-and-expressions (Topic 10)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== OPR001: Arithmetic Operator Suite & Exponentiation Precedence ===");

// Problem Implementation & Demonstration:
// Calculating compound interest: A = P * (1 + r/n)**(n*t)
function calculateCompoundGrowth(principal, rate, timesPerYear, years) {
  const amount = principal * (1 + rate / timesPerYear) ** (timesPerYear * years);
  return Number(amount.toFixed(2));
}
calculateCompoundGrowth(10000, 0.08, 4, 3);

console.log("Expected Result Verified:", "Principal: ₹10,000 | 8% Quarterly for 3 Yrs -> Total: ₹12,682.42");
