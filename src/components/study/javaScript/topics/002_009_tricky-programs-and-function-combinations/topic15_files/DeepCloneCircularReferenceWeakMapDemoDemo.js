/**
 * Topic 15 Demo: Deep Object Clone & Circular Reference Graph Resolver with WeakMap
 * Module: 002_009_tricky-programs-and-function-combinations
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 15: DEEP OBJECT CLONE & CIRCULAR REFERENCE GRAPH RESOLVER WITH WEAKMAP");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental algorithmic mechanics for: Deep Object Clone & Circular Reference Graph Resolver with WeakMap");
  console.log("Subject Code: JS-PRO-101 | Lab: Barrackpore");
}

// ─── 2. DATA PROCESSING & TRANSFORMATION PIPELINE ────────────────
console.log("");
console.log("2. Data Processing & Transformation:");
{
  const studentMetrics = [
    { student: "Swadeep", test: "Tricky Algorithms", score: 98 },
    { student: "Tuhina", test: "Function Combinations", score: 99 },
    { student: "Abhronila", test: "Async Mechanics", score: 95 },
    { student: "Debangshu", test: "V8 Engine Optimization", score: 97 }
  ];
  console.table(studentMetrics);
}

// ─── 3. CORNER CASES, QUIRKS & DEFENSIVE GUARDS ──────────────────
console.log("");
console.log("3. Corner Cases & Defensive Handling:");
{
  function defensiveExecution(input) {
    if (input === null || input === undefined) {
      return { status: "REJECTED", reason: "Nullish input guard triggered" };
    }
    return { status: "SUCCESS", value: input };
  }
  console.log("Null Guard Evaluation:", defensiveExecution(null));
  console.log("Valid Execution Guard:", defensiveExecution("Valid Data Stream"));
}

// ─── 4. REAL-WORLD DOMAIN APPLICATION (ENTERPRISE LAB) ───────────
console.log("");
console.log("4. Real-World Domain Application:");
{
  const productionTelemetry = {
    module: "002_009_tricky-programs-and-function-combinations",
    topicIndex: 15,
    health: "OPTIMAL",
    activeWorkers: 8,
    memoryPointers: "PACKED_SMI"
  };
  console.table([productionTelemetry]);
}

// ─── 5. ADVANCED SENIOR PATTERN / HIDDEN GEM DEMO ────────────────
console.log("");
console.log("5. Advanced Senior Pattern & Optimization:");
{
  // 💎 SENIOR SECRET: Bulletproof Deep Clone with Circular Reference Handling
function deepClone(value, hash = new WeakMap()) {
  if (Object(value) !== value) return value;
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (hash.has(value)) return hash.get(value);
  
  const result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  hash.set(value, result);
  
  if (value instanceof Map) {
    value.forEach((v, k) => result.set(deepClone(k, hash), deepClone(v, hash)));
    return result;
  }
  if (value instanceof Set) {
    value.forEach(v => result.add(deepClone(v, hash)));
    return result;
  }
  
  return Object.assign(
    result,
    ...Object.keys(value).map(k => ({ [k]: deepClone(value[k], hash) }))
  );
}
const circular = { name: "Swadeep" };
circular.self = circular;
const copy = deepClone(circular);
console.log("Cloned cycle check:", copy.self === copy); // true
}

console.log("");
console.log("✓ All 5 Topic 15 practical examples executed successfully.");
