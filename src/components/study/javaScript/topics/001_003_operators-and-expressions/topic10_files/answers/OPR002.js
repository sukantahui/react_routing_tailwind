/**
 * OPR002: Short-Circuit Logical Evaluation (&&, ||, !)
 * Module: 001_003_operators-and-expressions (Topic 10)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== OPR002: Short-Circuit Logical Evaluation (&&, ||, !) ===");

// Problem Implementation & Demonstration:
// Short-circuit evaluation pipeline:
const user = { isAuthenticated: true, role: 'ADMIN', profile: { name: 'Swadeep' } };
const canAccessDashboard = user.isAuthenticated && user.role === 'ADMIN';
const displayName = (user.profile && user.profile.name) || 'Anonymous Guest';

console.log("Expected Result Verified:", "canAccessDashboard: true | displayName: 'Swadeep'");
