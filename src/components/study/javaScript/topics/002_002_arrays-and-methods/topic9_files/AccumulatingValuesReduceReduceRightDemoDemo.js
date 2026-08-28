/**
 * Topic 9 Demo: Accumulating Values with reduce() & reduceRight() (From Sums to Complex State Engines)
 * Module: 002_002_arrays-and-methods
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 9: ACCUMULATING VALUES WITH REDUCE() & REDUCERIGHT() (FROM SUMS TO COMPLEX STATE ENGINES)");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental behavior for: Accumulating Values with reduce() & reduceRight() (From Sums to Complex State Engines)");
  const sampleArray = [10, 20, 30, 40, 50];
  console.log("Sample Array:", sampleArray);
}

// ─── 2. DATA PROCESSING & TRANSFORMATION PIPELINE ────────────────
console.log("");
console.log("2. Data Processing & Transformation:");
{
  const studentScores = [
    { name: "Swadeep", test1: 85, test2: 90 },
    { name: "Tuhina", test1: 92, test2: 95 },
    { name: "Abhronila", test1: 88, test2: 91 },
    { name: "Debangshu", test1: 79, test2: 84 }
  ];
  
  const summaries = studentScores.map(s => ({
    student: s.name,
    total: s.test1 + s.test2,
    average: (s.test1 + s.test2) / 2
  }));
  
  console.table(summaries);
}

// ─── 3. CORNER CASES, QUIRKS & DEFENSIVE GUARDS ──────────────────
console.log("");
console.log("3. Corner Cases & Defensive Handling:");
{
  function safeArrayProcessor(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return { ok: false, message: "Empty or invalid array" };
    }
    return { ok: true, count: arr.length };
  }

  console.log("Null Input Guard:", safeArrayProcessor(null));
  console.log("Valid Array Guard:", safeArrayProcessor([1, 2, 3]));
}

// ─── 4. REAL-WORLD DOMAIN APPLICATION (ENTERPRISE LAB) ───────────
console.log("");
console.log("4. Real-World Domain Application:");
{
  const inventory = [
    { sku: "SKU-001", item: "RAM 16GB", price: 4500, stock: 12 },
    { sku: "SKU-002", item: "SSD 1TB", price: 6500, stock: 8 },
    { sku: "SKU-003", item: "Mechanical Keyboard", price: 3200, stock: 15 }
  ];
  
  console.log("Enterprise Inventory Registry:");
  console.table(inventory);
}

// ─── 5. ADVANCED SENIOR PATTERN / HIDDEN GEM DEMO ────────────────
console.log("");
console.log("5. Advanced Senior Pattern & Optimization:");
{
  const actions = [
  { type: "DEPOSIT", amount: 500 },
  { type: "WITHDRAW", amount: 200 },
  { type: "DEPOSIT", amount: 1000 }
];
const balanceReducer = (balance, action) => {
  switch (action.type) {
    case "DEPOSIT": return balance + action.amount;
    case "WITHDRAW": return balance - action.amount;
    default: return balance;
  }
};
const finalBalance = actions.reduce(balanceReducer, 0);
console.log("Calculated Balance:", finalBalance); // 1300
}

console.log("");
console.log("✓ All 5 Topic 9 practical examples executed successfully.");
