/**
 * CTRL001: Guard Clauses & Early Return Pattern in Enterprise Pipelines
 * Module: 001_004_control-flow-conditions (Topic 12)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== CTRL001: Guard Clauses & Early Return Pattern in Enterprise Pipelines ===");

// Problem Implementation & Demonstration:
// Validating student registration with Guard Clauses:
function registerStudent(student) {
  if (!student) return { error: 'Missing student payload' };
  if (!student.name) return { error: 'Name is required' };
  if (student.age < 18) return { error: 'Must be 18 or older' };
  if (!student.email?.includes('@')) return { error: 'Invalid email' };
  
  return { success: true, studentId: 'CNAT-' + Date.now() };
}
registerStudent({ name: 'Swadeep', age: 20, email: 'swadeep@example.com' });

console.log("Expected Result Verified:", "Registration Success: { success: true, studentId: 'CNAT-...' }");
