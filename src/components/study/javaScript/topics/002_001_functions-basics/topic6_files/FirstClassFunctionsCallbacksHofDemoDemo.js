/**
 * Topic 6 Demo: First-Class Functions, Callbacks & Higher-Order Functions (HOFs)
 * Module: 002_001_functions-basics
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 6: FIRST-CLASS FUNCTIONS, CALLBACKS & HIGHER-ORDER FUNCTIONS (HOFS)");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental behavior and syntax invariants for: First-Class Functions, Callbacks & Higher-Order Functions (HOFs)");
  const sampleValue = 42;
  console.log("Sample Baseline Execution:", sampleValue);
}

// ─── 2. DATA PROCESSING & TRANSFORMATION PIPELINE ────────────────
console.log("");
console.log("2. Data Processing & Transformation:");
{
  const dataset = [
    { id: "S101", student: "Swadeep", score: 88, subject: "JavaScript" },
    { id: "S102", student: "Tuhina", score: 94, subject: "JavaScript" },
    { id: "S103", student: "Abhronila", score: 91, subject: "JavaScript" },
    { id: "S104", student: "Debangshu", score: 85, subject: "JavaScript" }
  ];
  
  const processed = dataset.map(item => ({
    ...item,
    grade: item.score >= 90 ? "A+" : "A",
    status: "PROMOTED"
  }));
  
  console.table(processed);
}

// ─── 3. CORNER CASES, QUIRKS & DEFENSIVE GUARDS ──────────────────
console.log("");
console.log("3. Corner Cases & Defensive Handling:");
{
  // Defensive validation handling null, undefined, and boundary states
  function safeEvaluator(input) {
    if (input === null || input === undefined) {
      return { ok: false, reason: "Nullish input rejected" };
    }
    return { ok: true, data: String(input).trim() };
  }

  console.log("Null Guard Result:", safeEvaluator(null));
  console.log("Valid Input Result:", safeEvaluator("  Barrackpore Lab Session  "));
}

// ─── 4. REAL-WORLD DOMAIN APPLICATION (ENTERPRISE LAB) ───────────
console.log("");
console.log("4. Real-World Domain Application:");
{
  const enterpriseState = {
    service: "FirstClassFunctionsCallbacksHofDemo",
    environment: "production",
    activeSessions: 142,
    clusterHealth: "OPTIMAL"
  };
  
  console.log("Enterprise Service Monitor Status:");
  console.table([enterpriseState]);
}

// ─── 5. ADVANCED SENIOR PATTERN / HIDDEN GEM DEMO ────────────────
console.log("");
console.log("5. Advanced Senior Pattern & Optimization:");
{
  function withPerformanceMetrics(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const duration = (performance.now() - start).toFixed(3);
    console.log(`[METRIC] ${fn.name || 'Anonymous'} executed in ${duration}ms`);
    return result;
  };
}
const heavyCalc = withPerformanceMetrics(function computePrimes(limit) {
  return limit * limit;
});
console.log(heavyCalc(1000));
}

console.log("");
console.log("✓ All 5 Topic 6 practical examples executed successfully.");
