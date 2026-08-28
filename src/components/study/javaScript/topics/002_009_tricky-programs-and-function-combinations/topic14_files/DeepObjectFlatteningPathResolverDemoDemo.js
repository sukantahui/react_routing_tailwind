/**
 * Topic 14 Demo: Deep Object Flattening & Dynamic String Path Resolver (get(obj, "a.b[0].c") & set(obj, "x.y.z", val))
 * Module: 002_009_tricky-programs-and-function-combinations
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 14: DEEP OBJECT FLATTENING & DYNAMIC STRING PATH RESOLVER (GET(OBJ, \"A.B[0].C\") & SET(OBJ, \"X.Y.Z\", VAL))");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental algorithmic mechanics for: Deep Object Flattening & Dynamic String Path Resolver (get(obj, \"a.b[0].c\") & set(obj, \"x.y.z\", val))");
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
    topicIndex: 14,
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
  // 💎 SENIOR SECRET: Pure JavaScript Deep Get & Set Path Resolver
function get(obj, path, defaultValue = undefined) {
  const tokens = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let current = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return defaultValue;
    current = current[token];
  }
  return current === undefined ? defaultValue : current;
}

function set(obj, path, value) {
  const tokens = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let current = obj;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    const nextIsNum = !isNaN(tokens[i + 1]);
    if (!(token in current)) current[token] = nextIsNum ? [] : {};
    current = current[token];
  }
  current[tokens[tokens.length - 1]] = value;
  return obj;
}
const data = {};
set(data, "users[0].profile.city", "Barrackpore");
console.log("Resolved City:", get(data, "users[0].profile.city")); // "Barrackpore"
}

console.log("");
console.log("✓ All 5 Topic 14 practical examples executed successfully.");
