/**
 * Topic 2 Demo: How HTML, CSS, and JavaScript Work Together
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 2: HTML, CSS & JS TRIAD & RENDER ENGINE");
console.log("==================================================");

// ─── 1. VIRTUAL DOM TREE CONSTRUCTION & STYLING ENGINE ───────────
console.log("");
console.log("1. Virtual DOM Tree Node Construction & CSS Mapping:");

function createVirtualElement(tag, attributes = {}, styles = {}, children = []) {
  return {
    tag,
    attributes,
    styles,
    children,
    renderToString() {
      const styleAttr = Object.entries(this.styles)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`)
        .join("; ");
      
      const attrStr = Object.entries(this.attributes)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");

      const renderedChildren = this.children
        .map(c => typeof c === "string" ? c : c.renderToString())
        .join("");

      return `<${this.tag} ${attrStr} style="${styleAttr}">${renderedChildren}</${this.tag}>`;
    }
  };
}

const uiCard = createVirtualElement(
  "div",
  { id: "student-card-1", class: "lab-card" },
  { backgroundColor: "#0f172a", color: "#f59e0b", padding: "16px", borderRadius: "12px" },
  [
    createVirtualElement("h2", {}, { fontSize: "20px", margin: "0" }, ["Student: Swadeep"]),
    createVirtualElement("p", {}, { color: "#94a3b8" }, ["Center: Barrackpore Lab · Status: Active"])
  ]
);

console.log("Constructed Virtual DOM Markup:");
console.log(uiCard.renderToString());

// ─── 2. SCRIPT EXECUTION TIMELINE: NORMAL VS ASYNC VS DEFER ──────
console.log("");
console.log("2. Script Loading & Execution Timeline Simulator:");

function simulateScriptLoadingStrategies() {
  const timeline = [
    {
      mode: "Classic <script>",
      htmlParsing: "Paused immediately while script downloads & executes",
      domReadyEffect: "Blocks DOM parsing (Render Blocking)",
      executionOrder: "Strict sequential document order",
      bestUse: "Legacy inline dependencies"
    },
    {
      mode: "<script defer>",
      htmlParsing: "Continues in parallel without interruption",
      domReadyEffect: "Executes right before DOMContentLoaded event",
      executionOrder: "Guaranteed document order across all deferred scripts",
      bestUse: "Standard production scripts that need full DOM access"
    },
    {
      mode: "<script async>",
      htmlParsing: "Continues in parallel during download, pauses briefly to execute",
      domReadyEffect: "Executes the instant downloaded (non-deterministic timing)",
      executionOrder: "First-come-first-served (no guaranteed order)",
      bestUse: "Independent analytics / tracking scripts (Google Analytics)"
    }
  ];

  console.table(timeline);
}

simulateScriptLoadingStrategies();

// ─── 3. DYNAMIC CLASSLIST & THEME TOGGLE ENGINE ──────────────────
console.log("");
console.log("3. Dynamic ClassList & Theme Mutation Controller:");

class ThemeController {
  constructor(initialTheme = "dark") {
    this.currentTheme = initialTheme;
    this.classes = new Set(["font-sans", "selection:bg-amber-500/30"]);
    this.applyTheme(initialTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    if (theme === "dark") {
      this.classes.delete("bg-white");
      this.classes.delete("text-slate-900");
      this.classes.add("bg-slate-950");
      this.classes.add("text-slate-100");
    } else {
      this.classes.delete("bg-slate-950");
      this.classes.delete("text-slate-100");
      this.classes.add("bg-white");
      this.classes.add("text-slate-900");
    }
    console.log(`Theme switched to '${theme}'. Active Root Classes:`, Array.from(this.classes).join(" "));
  }

  toggle() {
    this.applyTheme(this.currentTheme === "dark" ? "light" : "dark");
  }
}

const themeEngine = new ThemeController("dark");
themeEngine.toggle();
themeEngine.toggle();

// ─── 4. REFLOW & REPAINT BATCHER (AVOIDING LAYOUT THRASHING) ─────
console.log("");
console.log("4. Layout Thrashing Elimination (Batching DOM Reads/Writes):");

// Bad Pattern: Alternating read and write triggers multiple synchronous reflows
function simulateLayoutThrashing(elementCount) {
  let simulatedReflowCount = 0;
  for (let i = 0; i < elementCount; i++) {
    // Read (querying geometry)
    const read = i * 10;
    // Write (mutating style immediately)
    simulatedReflowCount++; // Browser forced to recalculate layout
  }
  return simulatedReflowCount;
}

// Good Pattern: Read all metrics first, then batch all DOM writes together
function simulateBatchedOperations(elementCount) {
  const reads = [];
  // Phase 1: Batch Reads
  for (let i = 0; i < elementCount; i++) {
    reads.push(i * 10);
  }
  // Phase 2: Batch Writes (Single reflow trigger)
  const singleReflowCount = 1;
  return { readsCompleted: reads.length, reflowsTriggered: singleReflowCount };
}

console.log("Layout Thrashing Reflows (5 iterations):", simulateLayoutThrashing(5));
console.log("Optimized Batched Result:", simulateBatchedOperations(5));

// ─── 5. DATA-DRIVEN COMPONENT RENDERER ───────────────────────────
console.log("");
console.log("5. Data-Driven Dynamic Student Grid Renderer:");

const studentDataset = [
  { id: 101, name: "Swadeep", city: "Barrackpore", grade: "A+" },
  { id: 102, name: "Tuhina", city: "Naihati", grade: "A+" },
  { id: 103, name: "Abhronila", city: "Ichapur", grade: "A" }
];

function renderStudentTable(students) {
  return students.map(s => {
    return {
      "Roll ID": s.id,
      "Candidate Name": s.name,
      "Training Center": s.city + " Lab",
      "Assessment Grade": s.grade,
      "Verification Status": "Certified (Coder & AccoTax)"
    };
  });
}

console.log("Rendered Component Table:");
console.table(renderStudentTable(studentDataset));

console.log("");
console.log("✓ All 5 Topic 2 practical examples executed successfully.");
