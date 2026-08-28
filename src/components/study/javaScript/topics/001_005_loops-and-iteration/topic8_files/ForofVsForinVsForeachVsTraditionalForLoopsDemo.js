/**
 * Topic 8 Demo: for...of vs for...in vs forEach vs Traditional for Loops
 * Module: 001_005_loops-and-iteration
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 8: LOOPING PARADIGMS IN JAVASCRIPT - DEMO");
console.log("==================================================");

// ─── 1. CORE MECHANICS & CONTROL FLOW (BREAK / CONTINUE) ───────────
console.log("");
console.log("1. Control Flow Comparison (break & continue support):");

const scores = [45, 78, 88, 92, 99];

console.log("--- [A] Traditional for Loop (Full break/continue/index control) ---");
for (let i = 0; i < scores.length; i++) {
  if (scores[i] < 50) continue; // Skip failed marks
  if (scores[i] > 90) {
    console.log(`First distinction score found at index ${i}: ${scores[i]} (breaking early)`);
    break;
  }
}

console.log("--- [B] for...of Loop (Clean value iteration + break support) ---");
for (const score of scores) {
  if (score > 90) {
    console.log(`Top score ${score} detected via for...of (breaking early)`);
    break;
  }
}

console.log("--- [C] forEach Loop (Cannot break! Always visits all elements) ---");
scores.forEach((score, idx) => {
  // 'break' is a SyntaxError inside forEach callback.
  // 'return' only exits the current callback iteration, NOT the loop!
  if (score > 90) {
    console.log(`forEach visited score: ${score} at index ${idx} (cannot break outer loop)`);
  }
});

// ─── 2. THE DANGEROUS for...in ON ARRAYS VS OBJECTS ─────────────────
console.log("");
console.log("2. The Pitfall of for...in on Arrays vs Object Keys:");

// Adding a custom property or prototype method
Array.prototype.customHelper = function() { return "polluted"; };
const marksList = [80, 85, 90];
marksList.studentName = "Swadeep"; // Non-numeric custom property

console.log("--- ❌ Dangerous: for...in on Array (iterates keys as strings & prototype properties) ---");
for (const key in marksList) {
  console.log(`Key: "${key}" (type: ${typeof key}) | Value: ${marksList[key]}`);
  // Notice key is STRING! ("0" + 1 = "01", NOT 1)
}

console.log("--- ✓ Recommended: for...of on Array (iterates only indexed elements) ---");
for (const mark of marksList) {
  console.log(`Direct Element Value: ${mark} (type: ${typeof mark})`);
}

// Clean up prototype pollution
delete Array.prototype.customHelper;

console.log("--- ✓ Correct usage of for...in on Plain Objects ---");
const courseProfile = {
  course: "JS-PRO-101",
  center: "Barrackpore Lab",
  instructor: "Sukanta Hui",
  durationWeeks: 12
};

for (const prop in courseProfile) {
  if (Object.hasOwn(courseProfile, prop)) {
    console.log(`Property "${prop}" -> ${courseProfile[prop]}`);
  }
}

// ─── 3. ASYNCHRONOUS ITERATION: for...of VS forEach ─────────────────
console.log("");
console.log("3. Asynchronous Execution Mechanics (Sequential vs Concurrent):");

const mockFetchMarks = (student, delay) =>
  new Promise(resolve => setTimeout(() => resolve(`${student}: 95%`), delay));

async function demonstrateAsyncLooping() {
  const students = ["Swadeep", "Tuhina", "Abhronila"];

  console.log("--- [A] Sequential async with for...of (Waits for each promise) ---");
  for (const student of students) {
    const result = await mockFetchMarks(student, 20);
    console.log(`✓ Fetched sequentially: ${result}`);
  }

  console.log("--- [B] forEach with async callback (Fires all concurrently, does NOT wait!) ---");
  students.forEach(async (student) => {
    const result = await mockFetchMarks(student, 20);
    console.log(`⚡ forEach callback resolved: ${result}`);
  });
  console.log("--> Note: Outer function continued immediately without waiting for forEach!");
}

await demonstrateAsyncLooping();

// ─── 4. ENTERPRISE DATA TRANSFORMATION & TABLE LOGGING ─────────────
console.log("");
console.log("4. Enterprise Transformation Pipeline (Comparing Performance Styles):");

const labSubmissions = [
  { id: 101, student: "Swadeep", module: "Loops", passed: true, score: 98 },
  { id: 102, student: "Tuhina", module: "Functions", passed: true, score: 94 },
  { id: 103, student: "Debangshu", module: "V8 Internals", passed: false, score: 48 },
  { id: 104, student: "Abhronila", module: "DOM Events", passed: true, score: 91 }
];

console.log("--- Index and Value Pair Traversal with for...of & entries() ---");
const processedReport = [];
for (const [index, item] of labSubmissions.entries()) {
  processedReport.push({
    rank: index + 1,
    student: item.student,
    status: item.passed ? "CERTIFIED" : "RETAKE",
    grade: item.score >= 90 ? "A+" : item.score >= 75 ? "A" : "F"
  });
}
console.table(processedReport);

// ─── 5. ADVANCED: CREATING A CUSTOM ITERABLE FOR for...of ──────────
console.log("");
console.log("5. Advanced Senior Pattern: Custom Iterable Protocol ([Symbol.iterator]):");

// Creating a custom step Range object that works seamlessly with for...of
function createNumberRange(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            const val = current;
            current += step;
            return { value: val, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

const customRange = createNumberRange(10, 50, 10);
console.log("Iterating custom range with for...of:");
for (const num of customRange) {
  console.log(`Range value: ${num}`);
}

console.log("");
console.log("✓ All 5 looping paradigm practical demonstrations completed.");
