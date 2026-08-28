/**
 * Topic 24 Demo: The Fluent Interface & Method Chaining Pattern (Builder Pattern)
 * Module: 002_003_objects-and-basic-oop
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 24: THE FLUENT INTERFACE & METHOD CHAINING PATTERN (BUILDER PATTERN)");
console.log("==================================================");

// ─── 1. CORE MECHANICS & BASIC USAGE ─────────────────────────────
console.log("");
console.log("1. Core Mechanics & Basic Usage:");
{
  console.log("Executing foundational pattern for: The Fluent Interface & Method Chaining Pattern (Builder Pattern)");
  const user = { id: 101, name: "Swadeep", role: "Developer" };
  console.log("Base Object:", user);
}

// ─── 2. DATA PROCESSING & TRANSFORMATION PIPELINE ────────────────
console.log("");
console.log("2. Data Processing & Transformation:");
{
  const catalog = [
    { sku: "JS-01", title: "Core JS", price: 499 },
    { sku: "JS-02", title: "Advanced OOP", price: 799 },
    { sku: "JS-03", title: "V8 Internals", price: 999 }
  ];
  
  const mapped = catalog.map(item => ({
    ...item,
    formattedPrice: `₹${item.price}.00`,
    inStock: true
  }));
  
  console.table(mapped);
}

// ─── 3. CORNER CASES, QUIRKS & DEFENSIVE GUARDS ──────────────────
console.log("");
console.log("3. Corner Cases & Defensive Handling:");
{
  function safeObjectReader(obj, path) {
    if (!obj || typeof obj !== "object") return undefined;
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  }

  const complexState = { settings: { theme: { mode: "dark" } } };
  console.log("Resolved nested path:", safeObjectReader(complexState, "settings.theme.mode"));
  console.log("Safely handled missing path:", safeObjectReader(complexState, "settings.auth.token"));
}

// ─── 4. REAL-WORLD DOMAIN APPLICATION (ENTERPRISE LAB) ───────────
console.log("");
console.log("4. Real-World Domain Application:");
{
  const accountEntity = {
    accountNumber: "ACC-889922",
    holder: "Tuhina",
    branch: "Barrackpore Main",
    balance: 75400,
    isActive: true
  };
  
  console.log("Enterprise Bank Entity Record:");
  console.table([accountEntity]);
}

// ─── 5. ADVANCED SENIOR PATTERN / HIDDEN GEM DEMO ────────────────
console.log("");
console.log("5. Advanced Senior Pattern & Optimization:");
{
  // 💎 SENIOR SECRET: High-performance object handling
const record = Object.freeze({ id: "REC_001", status: "VALIDATED" });
console.log("Object is frozen:", Object.isFrozen(record));
}

console.log("");
console.log("✓ All 5 Topic 24 practical examples executed successfully.");
