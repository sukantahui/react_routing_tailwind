/**
 * Topic 15 Demo: Functions, Scopes & Reusable Logic – Practical Projects & Question Lab
 * Module: 002_001_functions-basics
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 15: FUNCTIONS, SCOPES & REUSABLE LOGIC – PRACTICAL PROJECTS & QUESTION LAB");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental behavior and syntax invariants for: Functions, Scopes & Reusable Logic – Practical Projects & Question Lab");
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
    service: "FunctionsPracticalProjectsQuestionLabDemo",
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
  function createEventBus() {
  const topics = new Map();
  return {
    on(event, handler) {
      if (!topics.has(event)) topics.set(event, new Set());
      topics.get(event).add(handler);
      return () => topics.get(event).delete(handler); // Clean unsubscribe
    },
    emit(event, payload) {
      if (topics.has(event)) {
        topics.get(event).forEach(handler => handler(payload));
      }
    }
  };
}
const bus = createEventBus();
const unsub = bus.on("orderCreated", data => console.log("Order:", data.id));
bus.emit("orderCreated", { id: "ORD_789" });
unsub(); // Unsubscribed
}

console.log("");
console.log("✓ All 5 Topic 15 practical examples executed successfully.");
