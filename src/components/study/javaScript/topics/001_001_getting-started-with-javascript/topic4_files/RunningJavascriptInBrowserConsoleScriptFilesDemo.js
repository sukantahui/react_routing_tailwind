/**
 * Topic 4 Demo: Running JavaScript in Browser Console & Script Files
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 4: RUNNING JS IN CONSOLE & SCRIPT FILES");
console.log("==================================================");

// ─── 1. SCRIPT EXECUTION CONTEXT LIFECYCLE TRACKER ───────────────
console.log("");
console.log("1. Script Lifecycle & Execution Order Tracker:");

const executionLog = [];

function recordExecutionPhase(phaseName, description) {
  const entry = {
    timestamp: new Date().toISOString().split("T")[1].replace("Z", ""),
    phase: phaseName,
    detail: description,
    context: typeof window !== "undefined" ? "Browser Window" : "Node.js Environment"
  };
  executionLog.push(entry);
  console.log(`[${entry.timestamp}] ${phaseName}: ${description}`);
}

recordExecutionPhase("PARSING", "Initial HTML parser encounters <script> tag");
recordExecutionPhase("COMPILING", "V8 engine tokenizes and compiles script to bytecode");
recordExecutionPhase("EXECUTING", "Top-level synchronous JavaScript statements execute");

// ─── 2. ES MODULE SCOPE VS GLOBAL SCOPE ENCAPSULATION ────────────
console.log("");
console.log("2. Scope Encapsulation: Classic Script vs ES Module:");

// Classic script attaches to global window (Global Pollution)
// In ES Module (type="module"), top-level variables remain module-scoped!
const ModuleScopeSimulator = (function() {
  const privateModuleSecret = "BarrackporeLab_Encrypted_Key_2026";
  const publicApi = {
    courseName: "JS-PRO-101",
    getPublicGreeting: (name) => `Welcome ${name} to Module Scope Sandbox!`
  };

  return {
    publicApi,
    isPrivateAccessible: typeof privateModuleSecret !== "undefined"
  };
})();

console.log("Exported Public API:", ModuleScopeSimulator.publicApi);
console.log("Can outer scope access privateModuleSecret directly?:", typeof privateModuleSecret === "undefined" ? "NO (Protected by Lexical Closure)" : "YES");

// ─── 3. PROMISE-BASED DYNAMIC SCRIPT INJECTION LOADER ────────────
console.log("");
console.log("3. Dynamic Script Injection Pipeline Simulation:");

function simulateDynamicScriptLoader(scriptUrl, timeoutMs = 1000) {
  console.log(`Requesting dynamic script injection for: '${scriptUrl}'`);
  
  return new Promise((resolve, reject) => {
    const isMockSuccess = !scriptUrl.includes("broken-cdn");
    setTimeout(() => {
      if (isMockSuccess) {
        resolve({
          url: scriptUrl,
          status: "LOADED_AND_EVALUATED",
          executionDurationMs: 42,
          exports: { plugin: "ChartJS_Mock", version: "4.4.0" }
        });
      } else {
        reject(new Error(`Network error 404 loading script: ${scriptUrl}`));
      }
    }, 60);
  });
}

simulateDynamicScriptLoader("https://cdn.coder.com/libs/chart.js")
  .then(res => {
    console.log("Dynamic Script Load Success:");
    console.table([res]);
  })
  .catch(err => console.error("Script Load Failed:", err.message));

// ─── 4. DEVTOOLS CONSOLE REPL EXPRESSION EVALUATOR ───────────────
console.log("");
console.log("4. Console REPL Expression Evaluator Simulation:");

function evaluateConsoleExpression(exprString) {
  console.log(`Evaluating in Console REPL: > ${exprString}`);
  try {
    // Simulating safe evaluation of pure expressions
    const result = new Function(`return (${exprString});`)();
    return { expression: exprString, output: result, type: typeof result };
  } catch (err) {
    return { expression: exprString, error: err.message, status: "Evaluation Error" };
  }
}

const repl1 = evaluateConsoleExpression("2 + 2 * 10");
const repl2 = evaluateConsoleExpression("[1, 2, 3].map(x => x ** 2)");
const repl3 = evaluateConsoleExpression("({ student: 'Swadeep', roll: 101 })");

console.table([repl1, repl2, repl3]);

// ─── 5. SCRIPT STRATEGY BENCHMARK & COMPARISON ───────────────────
console.log("");
console.log("5. Script Loading Strategy Feature Matrix:");

const strategyMatrix = [
  { method: "DevTools Console", idealFor: "Ad-hoc debugging & quick testing", persistence: "Temporary (Lost on reload)" },
  { method: "Inline <script>", idealFor: "Critical bootstrapping scripts", persistence: "Embedded in HTML" },
  { method: "External .js file", idealFor: "Clean separation & browser caching", persistence: "Cached HTTP resource" },
  { method: "Module <script type=module>", idealFor: "Modern modular architecture (ESM)", persistence: "Scoped & Deferred by default" }
];

console.table(strategyMatrix);

console.log("");
console.log("✓ All 5 Topic 4 practical examples executed successfully.");
