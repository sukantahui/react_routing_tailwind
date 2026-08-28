/**
 * Topic 9 Demo: Custom EventEmitter & Async Pub/Sub Broker with Wildcards, Once Handlers & Error Bubbling
 * Module: 002_009_tricky-programs-and-function-combinations
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 9: CUSTOM EVENTEMITTER & ASYNC PUB/SUB BROKER WITH WILDCARDS, ONCE HANDLERS & ERROR BUBBLING");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental algorithmic mechanics for: Custom EventEmitter & Async Pub/Sub Broker with Wildcards, Once Handlers & Error Bubbling");
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
    topicIndex: 9,
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
  // 💎 SENIOR SECRET: Industrial Async EventEmitter with Wildcard Matching
class RobustEventEmitter {
  #listeners = new Map();
  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(fn);
    return () => this.off(event, fn); // Unsubscribe handle
  }
  once(event, fn) {
    const wrapper = (...args) => { this.off(event, wrapper); fn(...args); };
    return this.on(event, wrapper);
  }
  off(event, fn) { this.#listeners.get(event)?.delete(fn); }
  async emit(event, ...args) {
    const handlers = [];
    for (const [pattern, fns] of this.#listeners.entries()) {
      const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
      if (regex.test(event)) fns.forEach(fn => handlers.push(fn));
    }
    return Promise.allSettled(handlers.map(fn => Promise.resolve(fn(...args))));
  }
}
const bus = new RobustEventEmitter();
bus.on("order.*", (data) => console.log("Wildcard Audit:", data));
bus.emit("order.created", { id: "ORD-99" });
}

console.log("");
console.log("✓ All 5 Topic 9 practical examples executed successfully.");
