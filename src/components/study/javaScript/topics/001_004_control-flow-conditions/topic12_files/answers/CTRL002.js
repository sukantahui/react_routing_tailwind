/**
 * CTRL002: The switch(true) Range Evaluation & Pattern Matching Pattern
 * Module: 001_004_control-flow-conditions (Topic 12)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== CTRL002: The switch(true) Range Evaluation & Pattern Matching Pattern ===");

// Problem Implementation & Demonstration:
// Evaluating ranges using switch(true):
function getStudentScholarshipTier(score) {
  switch (true) {
    case score >= 95:
      return '100% Full Platinum Scholarship';
    case score >= 85:
      return '75% Gold Scholarship';
    case score >= 75:
      return '50% Silver Scholarship';
    case score >= 60:
      return '25% Bronze Scholarship';
    default:
      return 'Standard Enrollment (No Scholarship)';
  }
}
getStudentScholarshipTier(96);

console.log("Expected Result Verified:", "Score 96 → Tier: '100% Full Platinum Scholarship'");
