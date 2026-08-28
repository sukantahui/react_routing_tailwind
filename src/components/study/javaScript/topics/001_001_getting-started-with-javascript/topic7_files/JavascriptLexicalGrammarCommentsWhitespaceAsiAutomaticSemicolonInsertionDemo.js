/**
 * Topic 7 Demo: JavaScript Lexical Grammar, Comments, Whitespace & ASI
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 7: LEXICAL GRAMMAR, COMMENTS & ASI");
console.log("==================================================");

// ─── 1. AUTOMATIC SEMICOLON INSERTION (ASI) RETURN TRAP ──────────
console.log("");
console.log("1. The Classic ASI 'return' Statement Hazard:");

// Broken Function: Newline immediately following 'return'
function calculateTuitionBroken(baseFee) {
  return
  {
    course: "JS-PRO-101",
    total: baseFee * 1.18
  };
}

// Correct Function: Opening brace on same physical line
function calculateTuitionCorrect(baseFee) {
  return {
    course: "JS-PRO-101",
    total: baseFee * 1.18
  };
}

console.log("Broken Return Result (ASI inserted ';' after return):", calculateTuitionBroken(5000));
console.log("Correct Return Result:", calculateTuitionCorrect(5000));

// ─── 2. IIFE & ARRAY ACCESS ASI COLLISION TRAP ───────────────────
console.log("");
console.log("2. Leading Parenthesis / Bracket Collision with ASI:");

// When a line begins with '(' or '[', ASI does NOT insert a semicolon on preceding line!
// It treats it as a function invocation: previousLine(arg)
const sampleValue = 42;
// In un-semicoloned code:
// const a = 42
// (function() { ... })() -> Evaluates as: 42(function() { ... }) -> Throws TypeError: 42 is not a function!

function simulateParenthesisCollision() {
  try {
    const fn = 100;
    // Simulating: 100()
    return eval("const x = 50; const y = x; (function() { return 'Safe'; })();");
  } catch (err) {
    return `Collision Caught: ${err.message}`;
  }
}

console.log("Parenthesis / Bracket Guard Status:", simulateParenthesisCollision());

// ─── 3. UNICODE IDENTIFIERS & VARIABLE NAMING RULES ──────────────
console.log("");
console.log("3. Lexical Identifiers & Unicode Property Support:");

// JavaScript permits Unicode identifiers, $ (dollar), and _ (underscore)
const π = Math.PI;
const $studentCount = 45;
const _labLocation = "Barrackpore Lab";
const বাংলা_কোর্স = "JavaScript Complete Masterclass";

console.table([
  { identifier: "π", value: π, valid: "✓ Valid ECMAScript Identifier" },
  { identifier: "$studentCount", value: $studentCount, valid: "✓ Valid ($ allowed)" },
  { identifier: "_labLocation", value: _labLocation, valid: "✓ Valid (_ allowed)" },
  { identifier: "বাংলা_কোর্স", value: বাংলা_কোর্স, valid: "✓ Valid Unicode Identifier" }
]);

// ─── 4. JSDOC DOCUMENTATION COMMENT SPECIFICATION ────────────────
console.log("");
console.log("4. Professional JSDoc Documentation Annotations:");

/**
 * Calculates final student grade and lab verification certificate.
 * @param {string} studentName - The full name of the student.
 * @param {number} rawScore - Marks scored between 0 and 100.
 * @param {string} labCenter - The training center location.
 * @returns {object} Verification payload with grade and honors status.
 */
function evaluateStudentCertification(studentName, rawScore, labCenter) {
  const isHonors = rawScore >= 90;
  return {
    candidate: studentName,
    center: labCenter,
    score: rawScore,
    grade: rawScore >= 80 ? "A+" : "A",
    honors: isHonors ? "🌟 DISTINCTION HONORS" : "STANDARD PASS",
    issuedBy: "Coder & AccoTax (Sukanta Hui)"
  };
}

const report = evaluateStudentCertification("Swadeep", 96, "Barrackpore Lab");
console.log("Generated Certified Report:");
console.table([report]);

// ─── 5. GRAMMAR TOKENIZER & RESERVED KEYWORDS MATRIX ──────────────
console.log("");
console.log("5. ECMAScript Reserved Keyword Classification Matrix:");

const keywordRegistry = [
  { keyword: "let, const, var", category: "Variable Declarations", contextAllowed: "Strict & Sloppy" },
  { keyword: "await, yield", category: "Async / Generator Flow", contextAllowed: "Contextual Keywords" },
  { keyword: "implements, interface, package", category: "Strict Mode Future Reserved", contextAllowed: "Disallowed in Strict Mode" },
  { keyword: "class, extends, super", category: "Object-Oriented Syntax", contextAllowed: "Strict & Sloppy" }
];

console.table(keywordRegistry);

console.log("");
console.log("✓ All 5 Topic 7 practical examples executed successfully.");
