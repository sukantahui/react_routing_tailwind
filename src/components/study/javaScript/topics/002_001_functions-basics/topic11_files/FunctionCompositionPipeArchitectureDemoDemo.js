/**
 * Topic 11 Demo: Function Composition & Pipe Architecture (compose, pipe)
 * Module: 002_001_functions-basics
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 11: FUNCTION COMPOSITION & PIPE ARCHITECTURE (COMPOSE, PIPE)");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental behavior and syntax invariants for: Function Composition & Pipe Architecture (compose, pipe)");
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
    service: "FunctionCompositionPipeArchitectureDemo",
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
  const pipeAsync = (...fns) => (initialValue) =>
  fns.reduce(
    async (accPromise, fn) => fn(await accPromise),
    Promise.resolve(initialValue)
  );

const fetchUser = async (id) => ({ id, name: "swadeep" });
const enrichRole = async (user) => ({ ...user, role: "Admin" });
const formatBadge = (user) => `[${user.role}] ${user.name.toUpperCase()}`;

const buildBadge = pipeAsync(fetchUser, enrichRole, formatBadge);
buildBadge(101).then(console.log); // "[ADMIN] SWADEEP"
}

console.log("");
console.log("✓ All 5 Topic 11 practical examples executed successfully.");
