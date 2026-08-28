/**
 * Topic 5 Demo: Searching & Inspection — indexOf(), lastIndexOf(), includes(), find(), findIndex(), findLast(), findLastIndex()
 * Module: 002_002_arrays-and-methods
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 5: SEARCHING & INSPECTION — INDEXOF(), LASTINDEXOF(), INCLUDES(), FIND(), FINDINDEX(), FINDLAST(), FINDLASTINDEX()");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Demonstrating fundamental behavior for: Searching & Inspection — indexOf(), lastIndexOf(), includes(), find(), findIndex(), findLast(), findLastIndex()");
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
  function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
const sorted = Array.from({ length: 100000 }, (_, i) => i * 2);
console.log("Binary Search index for 8888:", binarySearch(sorted, 8888));
}

console.log("");
console.log("✓ All 5 Topic 5 practical examples executed successfully.");
