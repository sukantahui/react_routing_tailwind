/**
 * Topic 5 Demo: Using console.log & Basic Debugging
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 5: CONSOLE API & ADVANCED DEBUGGING");
console.log("==================================================");

// ─── 1. COMPLETE CONSOLE API METHODS SHOWCASE ────────────────────
console.log("");
console.log("1. Full Console API Method Suite:");

console.log("Standard output: Student Swadeep enrolled in JS-PRO-101");
console.info("Informational message: V8 Ignition interpreter initialized");
console.warn("Warning alert: Local storage quota nearing 80% threshold");
console.error("Error notification: Simulated network timeout (Code 504)");

// ─── 2. TABULAR PROFILING WITH CONSOLE.TABLE ─────────────────────
console.log("");
console.log("2. Tabular Data Visualization (console.table):");

const labStudents = [
  { roll: 101, name: "Swadeep", center: "Barrackpore", grade: "A+", points: 980 },
  { roll: 102, name: "Tuhina", center: "Naihati", grade: "A+", points: 995 },
  { roll: 103, name: "Abhronila", center: "Ichapur", grade: "A", points: 940 },
  { roll: 104, name: "Debangshu", center: "Shyamnagar", grade: "A+", points: 990 }
];

console.table(labStudents, ["roll", "name", "center", "grade"]);

// ─── 3. LOGGING ACCURACY: LIVE REFERENCE VS SERIALIZED SNAPSHOT ──
console.log("");
console.log("3. The Live Object Mutation Trap vs Serialized Snapshot:");

const stateRecord = { user: "Tuhina", status: "PENDING", tasksCompleted: 0 };

// In browser DevTools, logging live object may show mutated state when expanded!
console.log("Direct Live Object Reference:", stateRecord);

// Senior Pattern: Clone or serialize to freeze exact snapshot at log time
console.log("Frozen Snapshot at Log Time:", JSON.parse(JSON.stringify(stateRecord)));

// Mutate object afterwards
stateRecord.status = "VERIFIED_COMPLETED";
stateRecord.tasksCompleted = 5;

console.log("State after subsequent mutation:", stateRecord);

// ─── 4. PERFORMANCE BENCHMARKING (CONSOLE.TIME / TIMEEND) ────────
console.log("");
console.log("4. Algorithmic Execution Benchmarking (console.time):");

function benchmarkArrayOperations(count) {
  console.time("Array Creation & Map Benchmark");
  
  const arr = new Array(count);
  for (let i = 0; i < count; i++) {
    arr[i] = i * 2;
  }
  const filtered = arr.filter(x => x % 4 === 0);
  
  console.timeEnd("Array Creation & Map Benchmark");
  return filtered.length;
}

const matchingCount = benchmarkArrayOperations(100000);
console.log("Matching items count:", matchingCount);

// ─── 5. STRUCTURED LOG GROUPING & CALL STACK TRACING ─────────────
console.log("");
console.log("5. Hierarchical Log Groups & Call Stack Tracing:");

function executeNestedRoutineA() {
  executeNestedRoutineB();
}

function executeNestedRoutineB() {
  executeNestedRoutineC();
}

function executeNestedRoutineC() {
  console.log("Inspecting Call Stack via console.trace():");
  console.trace("Execution Trace from executeNestedRoutineC");
}

console.group("🚀 Outer Initialization Group");
console.log("Step 1: Parsing configurations");
console.group("🔧 Sub-routine: Database Bridge");
console.log("Step 1.1: Establishing socket");
console.log("Step 1.2: Socket verified");
console.groupEnd();
console.log("Step 2: Startup complete");
console.groupEnd();

executeNestedRoutineA();

console.log("");
console.log("✓ All 5 Topic 5 practical examples executed successfully.");
