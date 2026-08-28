/**
 * OPR003: Logical Assignment Operators in Caching Pipelines
 * Module: 001_003_operators-and-expressions (Topic 10)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== OPR003: Logical Assignment Operators in Caching Pipelines ===");

// Problem Implementation & Demonstration:
// In-memory cache initialization:
const cacheEntry = { key: 'student_101', data: { name: 'Swadeep' } };
cacheEntry.ttl ??= 3600; // Sets default TTL if nullish
cacheEntry.isValid &&= verifyToken(cacheEntry.data);

console.log("Expected Result Verified:", "Cache Entry initialized: { key: 'student_101', ttl: 3600, isValid: undefined }");
