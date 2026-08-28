/**
 * Topic 0 Demo: What is JavaScript and Where It Runs?
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 0: WHAT IS JAVASCRIPT & WHERE IT RUNS");
console.log("==================================================");

// ─── 1. RUNTIME ENVIRONMENT DETECTION ────────────────────────────
console.log("");
console.log("1. Runtime Environment Detection:");

function detectJavaScriptRuntime() {
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  const isNode = typeof process !== "undefined" && process.versions && process.versions.node;
  const isDeno = typeof Deno !== "undefined";
  const isBun = typeof Bun !== "undefined";
  const isWebWorker = typeof importScripts === "function" && typeof WorkerGlobalScope !== "undefined";

  let runtime = "Unknown Runtime";
  let engine = "Unknown Engine";
  let globalObjName = "globalThis";

  if (isBun) {
    runtime = "Bun (JavaScriptCore based high-performance runtime)";
    engine = "JavaScriptCore (WebKit)";
  } else if (isDeno) {
    runtime = "Deno (Secure V8 runtime with native TS)";
    engine = "V8 (Google)";
  } else if (isNode) {
    runtime = "Node.js (Server-side V8 runtime)";
    engine = "V8 (Google)";
  } else if (isBrowser) {
    runtime = "Web Browser Window Context";
    engine = navigator.userAgent.includes("Chrome") ? "V8 (Blink)" : 
             navigator.userAgent.includes("Firefox") ? "SpiderMonkey (Gecko)" : 
             navigator.userAgent.includes("Safari") ? "JavaScriptCore (Nitro)" : "Browser Engine";
  } else if (isWebWorker) {
    runtime = "Dedicated Web Worker Thread";
  }

  return {
    environment: runtime,
    underlyingEngine: engine,
    hasWindow: typeof window !== "undefined",
    hasProcess: typeof process !== "undefined",
    globalUnifiedObject: typeof globalThis !== "undefined" ? "globalThis supported (ES2020)" : "Legacy Global"
  };
}

const runtimeInfo = detectJavaScriptRuntime();
console.log("Current Execution Host:");
console.table([runtimeInfo]);

// ─── 2. V8 MEMORY LAYOUT: CALL STACK (PRIMITIVES) VS HEAP (OBJECTS) ─
console.log("");
console.log("2. V8 Memory Layout: Primitives vs Reference Allocation:");

// Primitive stored directly on the execution Call Stack (immutable value)
let studentRoll = 101;
let copyRoll = studentRoll;
copyRoll = 102; // Modifying copy does NOT affect original

// Reference type allocated in the Memory Heap (stack holds pointer address)
const studentProfile = {
  name: "Swadeep",
  center: "Barrackpore Lab",
  course: "JS-PRO-101",
  skills: ["HTML5", "CSS3"]
};

// Copying reference pointer (points to the SAME heap address)
const profileAlias = studentProfile;
profileAlias.skills.push("JavaScript ES2024");

console.log("Stack Primitive Comparison -> studentRoll:", studentRoll, "| copyRoll:", copyRoll);
console.log("Heap Object Mutation Effect -> Original studentProfile.skills:", studentProfile.skills);
console.log("Are pointers pointing to identical memory address?:", studentProfile === profileAlias);

// ─── 3. SINGLE-THREADED CONCURRENCY & THE EVENT LOOP ─────────────
console.log("");
console.log("3. Single-Threaded Concurrency (Event Loop Tick):");

console.log("[Tick 1] Synchronous script execution starts on Call Stack");

// Asynchronous Macrotask scheduled to Web APIs / Libuv timer thread
setTimeout(() => {
  console.log("[Tick 4] Macrotask Timer callback executed after call stack cleared");
}, 0);

// Asynchronous Microtask scheduled to Microtask Queue (higher priority than timers)
Promise.resolve().then(() => {
  console.log("[Tick 3] Microtask Promise resolved (runs BEFORE Macrotask)");
});

console.log("[Tick 2] Synchronous script execution finishes on Call Stack");

// ─── 4. PLATFORM API DIVERGENCE (BROWSER VS NODE APIS) ────────────
console.log("");
console.log("4. Platform Host API Simulation & Feature Detection:");

function verifyPlatformCapabilities() {
  const capabilities = [
    { capability: "DOM Access (document.getElementById)", supported: typeof document !== "undefined" },
    { capability: "Local Storage (window.localStorage)", supported: typeof localStorage !== "undefined" },
    { capability: "File System I/O (fs.readFile)", supported: typeof process !== "undefined" && typeof require !== "undefined" },
    { capability: "Fetch Web API (fetch)", supported: typeof fetch === "function" },
    { capability: "Crypto Subtle API (crypto.subtle)", supported: typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" },
    { capability: "Timer Functions (setTimeout/setInterval)", supported: typeof setTimeout === "function" }
  ];

  console.table(capabilities);
}

verifyPlatformCapabilities();

// ─── 5. UNIVERSAL JAVASCRIPT & globalThis CROSS-RUNTIME PATTERN ───
console.log("");
console.log("5. Senior Cross-Runtime Universal Context Accessor:");

const UniversalContext = (function() {
  // ES2020 globalThis standardization resolves window / self / global differences
  const root = (function() {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    throw new Error("Unable to locate global execution context");
  })();

  return {
    setGlobal(key, val) {
      root[key] = val;
    },
    getGlobal(key) {
      return root[key];
    }
  };
})();

UniversalContext.setGlobal("__STUDENT_LAB_SESSION__", {
  student: "Swadeep",
  center: "Barrackpore Lab",
  status: "Active"
});

console.log("Retrieved from Universal Context:", UniversalContext.getGlobal("__STUDENT_LAB_SESSION__"));
console.log("");
console.log("✓ All 5 Topic 0 practical examples executed successfully.");
