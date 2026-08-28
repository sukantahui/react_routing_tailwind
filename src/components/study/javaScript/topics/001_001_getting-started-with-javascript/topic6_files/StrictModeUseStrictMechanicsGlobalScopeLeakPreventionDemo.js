/**
 * Topic 6 Demo: Strict Mode ('use strict') Mechanics & Global Scope Leak Prevention
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 6: STRICT MODE & SCOPE LEAK GUARDS");
console.log("==================================================");

// ─── 1. ACCIDENTAL GLOBAL LEAK PREVENTION ────────────────────────
console.log("");
console.log("1. Accidental Global Variable Leak Guard:");

function testAccidentalGlobalLeak() {
  "use strict";
  try {
    // In sloppy mode, assigning to undeclared identifier creates a global variable!
    // In strict mode, it throws ReferenceError.
    // Simulating: undeclaredVar = 42;
    eval("undeclaredStudent = 'Swadeep';");
    return "Leak created successfully (Sloppy Mode)";
  } catch (err) {
    return `Strict Mode Protected: ${err.name} - ${err.message}`;
  }
}

console.log("Outcome:", testAccidentalGlobalLeak());

// ─── 2. SILENT MUTATION FAILURES TURNED INTO TYPEERROR ───────────
console.log("");
console.log("2. Read-Only / Non-Writable Property Mutation Protection:");

const frozenConfig = Object.freeze({
  center: "Barrackpore Lab",
  courseCode: "JS-PRO-101"
});

function attemptFrozenMutation() {
  "use strict";
  try {
    frozenConfig.center = "Naihati Lab"; // Throws TypeError in strict mode!
    return "Mutation Succeeded (Sloppy Mode Silent Failure)";
  } catch (err) {
    return `Strict Mode Protected: ${err.name} - ${err.message}`;
  }
}

console.log("Outcome:", attemptFrozenMutation());

// ─── 3. FUNCTION THIS CONTEXT BEHAVIOR (WINDOW VS UNDEFINED) ─────
console.log("");
console.log("3. Function this Binding: Sloppy Mode (Window) vs Strict Mode (undefined):");

function sloppyFunctionThis() {
  return this; // In sloppy mode, returns window/global
}

function strictFunctionThis() {
  "use strict";
  return this; // In strict mode, remains undefined!
}

console.log("Sloppy Mode 'this':", typeof sloppyFunctionThis() !== "undefined" ? "Global Object (Window/Global)" : "undefined");
console.log("Strict Mode 'this':", strictFunctionThis() === undefined ? "✓ undefined (Secured)" : "Global");

// ─── 4. DUPLICATE PARAMETER & OCTAL LITERAL SYNTAX GUARDS ────────
console.log("");
console.log("4. Syntax Invariant Verification (Duplicate Params & Octals):");

function testDuplicateParameters() {
  try {
    // In sloppy mode: function foo(a, a, b) {} is allowed
    // In strict mode: SyntaxError: Duplicate parameter name not allowed
    new Function("'use strict'; function test(a, a) { return a; }");
    return "Allowed";
  } catch (err) {
    return `Strict Mode SyntaxError: ${err.message}`;
  }
}

function testOctalLiterals() {
  try {
    // In strict mode: legacy octals like 010 are forbidden (use 0o10 instead)
    new Function("'use strict'; var oct = 010;");
    return "Allowed";
  } catch (err) {
    return `Strict Mode Octal SyntaxError: ${err.message}`;
  }
}

console.log("Duplicate Params Check:", testDuplicateParameters());
console.log("Legacy Octal Check:", testOctalLiterals());

// ─── 5. EVAL SCOPE ISOLATION TEST ────────────────────────────────
console.log("");
console.log("5. Eval Scope Isolation in Strict Mode:");

function testEvalScopeIsolation() {
  "use strict";
  eval("var privateEvalVariable = 'Encapsulated Inside Eval';");
  
  const isLeaked = typeof privateEvalVariable !== "undefined";
  return {
    evalCodeExecuted: true,
    isVariableLeakedToOuterScope: isLeaked,
    securityStatus: !isLeaked ? "✓ Isolated (Strict Mode Sandbox)" : "❌ Leaked to Outer Scope"
  };
}

console.log("Eval Sandbox Result:", testEvalScopeIsolation());

console.log("");
console.log("✓ All 5 Topic 6 practical examples executed successfully.");
