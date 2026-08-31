/**
 * Topic 0 Demo: while Loop
 * Module: 001_005_loops-and-iteration
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 0: THE while LOOP IN JAVASCRIPT - DEMO");
console.log("==================================================");

// ─── 1. CORE MECHANICS & ENTRY-CONTROLLED EVALUATION ──────────────
console.log("");
console.log("1. Entry-Controlled Loop Evaluation (0 vs N executions):");

let counter = 0;
while (counter < 3) {
  console.log(`Counter value: ${counter} → Condition (${counter} < 3) is TRUE`);
  counter++;
}
console.log(`Loop finished with counter = ${counter}`);

let neverExecutes = 10;
while (neverExecutes < 5) {
  console.log("This will NEVER print because 10 < 5 is FALSE initially.");
}
console.log("Verified zero-execution behavior when condition is false initially.");

// ─── 2. DRAIN QUEUE PATTERN (DYNAMIC DATA STRUCTURE) ───────────────
console.log("");
console.log("2. Draining a Dynamic Task Queue with while:");

const taskQueue = [
  { id: "TASK-01", name: "Validate User Input", priority: "High" },
  { id: "TASK-02", name: "Encrypt Password", priority: "Critical" },
  { id: "TASK-03", name: "Send Confirmation Email", priority: "Normal" }
];

console.log(`Starting queue with ${taskQueue.length} pending items.`);
while (taskQueue.length > 0) {
  const currentTask = taskQueue.shift(); // Remove from front
  console.log(`[Processing] ${currentTask.id} (${currentTask.name}) → Remaining in queue: ${taskQueue.length}`);
}
console.log("✓ Task queue completely drained.");

// ─── 3. TRAVERSING A LINKED DATA STRUCTURE ────────────────────────
console.log("");
console.log("3. Linked Node Traversal with while (node = node.next):");

const linkedChain = {
  value: "Header Element",
  next: {
    value: "Authentication Middleware",
    next: {
      value: "Database Query Handler",
      next: {
        value: "JSON Response Formatter",
        next: null
      }
    }
  }
};

let currentNode = linkedChain;
let step = 1;
while (currentNode !== null) {
  console.log(`Node ${step}: ${currentNode.value}`);
  currentNode = currentNode.next;
  step++;
}

// ─── 4. REAL-WORLD RETRY WITH EXPONENTIAL BACKOFF ──────────────────
console.log("");
console.log("4. Simulated Network Retry Loop with Exponential Backoff:");

let attempts = 0;
const maxRetries = 4;
let isConnected = false;

while (!isConnected && attempts < maxRetries) {
  attempts++;
  console.log(`Attempt #${attempts} connecting to payment gateway...`);
  // Simulate success on 3rd attempt
  if (attempts === 3) {
    isConnected = true;
    console.log("✓ Connection established successfully!");
  } else {
    const delay = Math.pow(2, attempts) * 10;
    console.log(`⚠️ Connection failed. Waiting ${delay}ms backoff before retry.`);
  }
}

// ─── 5. ADVANCED: NUMBER DIGIT REVERSAL WITHOUT STRINGS ────────────
console.log("");
console.log("5. Advanced Mathematical Digit Reversal via Pure Arithmetic while Loop:");

function reverseInteger(n) {
  let num = n;
  let reversed = 0;
  while (num > 0) {
    const lastDigit = num % 10;
    reversed = (reversed * 10) + lastDigit;
    num = Math.floor(num / 10);
  }
  return reversed;
}

const originalNumber = 987654;
const resultReversed = reverseInteger(originalNumber);
console.log(`Original: ${originalNumber} → Reversed: ${resultReversed}`);

console.log("");
console.log("✓ All 5 while loop practical demonstrations completed.");
