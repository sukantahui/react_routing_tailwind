import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – B-Tree Index Physical Structure and Lookup Mechanics
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on InnoDB B+Tree physical page layout, traversal mechanics, and page split dynamics.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedMechanism, setSelectedMechanism] = useState("point_lookup_hops");

  const lookupMechanisms = {
    point_lookup_hops: {
      title: "1. Point Seek: 3-Hop Logarithmic Traversal (Root → Branch → Leaf)",
      badge: "3 Disk Hops (O(log N))",
      badgeColor: "emerald",
      sqlQuery: `-- Equality Point Seek:
SELECT student_id, student_name, centre_city, tuition_fee_inr
FROM student_registry
WHERE student_id = 45012;

-- Traversal Execution:
-- Hop 1: Root Page (Page #3) -> Inspect boundaries -> Follow Pointer to Branch Page #48.
-- Hop 2: Branch Page (Page #48) -> Binary search -> Follow Pointer to Leaf Page #1209.
-- Hop 3: Leaf Page (Page #1209) -> Binary search within page directory -> Pinpoint row!
-- Latency: 0.5 ms`,
      resultRows: [
        { hop: "Hop 1 (Level 2)", page: "Root Page #3", keys: "Keys: 1 - 1,000,000", action: "Binary Search -> Points to Branch Page #48", outcome: "In-Memory RAM" },
        { hop: "Hop 2 (Level 1)", page: "Branch Page #48", keys: "Keys: 40,000 - 50,000", action: "Binary Search -> Points to Leaf Page #1209", outcome: "Buffer Pool Hit" },
        { hop: "Hop 3 (Level 0)", page: "Leaf Page #1209", keys: "Keys: 45,000 - 45,100", action: "Pinpoints Student #45012 (Mamata Hui)", outcome: "0.5 ms Point Seek" },
      ],
      explanation:
        "Point lookups perform binary search within each page directory slot, following branch pointers directly down to the target leaf page in exactly 3 hops.",
    },
    horizontal_range_scan: {
      title: "2. Horizontal Range Scan via Leaf Doubly-Linked List",
      badge: "Horizontal Sibling Pointers",
      badgeColor: "cyan",
      sqlQuery: `-- Range Query spanning multiple leaf pages:
SELECT student_id, student_name, tuition_fee_inr
FROM student_registry
WHERE tuition_fee_inr BETWEEN 20000.00 AND 30000.00
ORDER BY tuition_fee_inr ASC;

-- Traversal Execution:
-- 1. Tree Seek to lower bound (₹20,000) on Leaf Page #201.
-- 2. Traverse horizontally along Leaf Doubly-Linked List (Page #201 -> #202 -> #203).
-- 3. Halts automatically when key exceeds upper bound (₹30,000).
-- Zero Root/Branch re-traversal overhead!`,
      resultRows: [
        { hop: "Step 1: Seek Lower Bound", page: "Leaf Page #201", keys: "Keys: ₹18,000 - ₹22,000", action: "Seeks to ₹20,000 threshold", outcome: "Initial Seek" },
        { hop: "Step 2: Sibling Traversal", page: "Leaf Page #202", keys: "Keys: ₹22,001 - ₹26,000", action: "Traverses next pointer horizontally", outcome: "Sequential I/O" },
        { hop: "Step 3: Sibling Traversal", page: "Leaf Page #203", keys: "Keys: ₹26,001 - ₹30,000", action: "Traverses next pointer & halts at ₹30,000", outcome: "Range Complete" },
      ],
      explanation:
        "Once the lower bound is found, the query engine scans horizontally across adjacent leaf pages using doubly-linked pointers without ever re-traversing upper tree levels.",
    },
    page_splits_comparison: {
      title: "3. Page Splits: Sequential Inserts (93.75%) vs Random UUID (50%)",
      badge: "Fragmentation & Page Splits",
      badgeColor: "amber",
      sqlQuery: `-- Comparing insertion dynamics:
-- CASE A: Sequential AUTO_INCREMENT PK (93.75% Fill Factor):
-- -> Appends to the end of rightmost page #500.
-- -> When full, allocates page #501 with 0 page splits and 0 fragmentation.

-- CASE B: Random UUID Primary Keys (50/50 Page Split):
-- -> Inserts scattered key into full middle page #210.
-- -> Forces InnoDB to split page #210 into two 50% full pages (#210 & #940).
-- -> Wastes 50% disk storage and triggers write amplification!`,
      resultRows: [
        { hop: "Sequential AUTO_INCREMENT", page: "93.75% Page Density", keys: "Contiguous Leaf Append", action: "Zero Page Splits", outcome: "✓ Maximum Performance" },
        { hop: "Random UUID / Hash Keys", page: "50.00% Page Density", keys: "Scattered Middle Inserts", action: "Constant 50/50 Page Splits", outcome: "❌ Severe Fragmentation" },
      ],
      explanation:
        "Sequential inserts pack pages tightly at 15/16ths capacity with zero splits. Random keys trigger 50/50 page splits, wasting disk memory and spiking I/O.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. B+Tree Architecture" },
    { id: "fanout-depth", label: "2. Fan-Out & Shallow Tree Depth" },
    { id: "svg-diagrams", label: "3. B-Tree Anatomy & Split SVGs" },
    { id: "interactive-sandbox", label: "4. Live Traversal Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 8 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Physical Storage Mechanics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            B-Tree Index Physical Structure & Lookup Mechanics
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Deep-dive into InnoDB's physical B+Tree architecture. Master 3-hop logarithmic seeks, horizontal range scans via{" "}
            <code className="text-cyan-300 font-mono font-bold">Doubly-Linked Leaf Nodes</code>, and the physics of{" "}
            <code className="text-amber-300 font-mono font-bold">50/50 Page Splits</code>.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Architecture Overview */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Tri-Level B+Tree Structure
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL InnoDB partitions data into root, branch, and doubly-linked leaf pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-xs font-bold border border-cyan-800">
                  ROOT
                </span>
                <h3 className="text-base font-bold text-white">Root Page (Level 2)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The entry point of the index tree. Stores top-level key boundaries and pointers to intermediate branch pages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-xs font-bold border border-indigo-800">
                  BRANCH
                </span>
                <h3 className="text-base font-bold text-white">Intermediate Branches</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Internal steering pages holding <code className="text-indigo-300 font-mono">(Key, Child_Page_Pointer)</code> pairs directing lookups downwards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  LEAF
                </span>
                <h3 className="text-base font-bold text-white">Doubly-Linked Leaves</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stores all payload rows/PKs. Connected horizontally via previous/next pointers for ultra-fast sequential range scans.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Fan-Out & Shallow Tree Depth */}
        <section id="fanout-depth" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Fan-Out ($B \approx 1000$) & Massive Scale Capacity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why an InnoDB B+Tree indexes 1 billion rows in only 3 to 4 levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">High Fan-Out Formula</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Each 16KB index page holds approx. 1,000 key-pointer pairs. The total capacity of a tree of height $h$ is calculated as:
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                Capacity = Fan-Out<sup>Height</sup> = 1000<sup>3</sup> = 1,000,000,000 Rows!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">Why Tree Height Matters</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tree height equals the exact number of disk/memory page reads needed for any point lookup. Because height is capped at 3 or 4, query performance never degrades even as table size triples!
              </p>
              <div className="text-xs text-emerald-400 font-mono">
                ✓ Guaranteed O(log N) point seek latency under 1 millisecond.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: B+Tree Layout & Page Split Dynamics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect the physical layout of B+Tree pages and the mechanics of a 50/50 page split.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Tri-Level B+Tree Layout */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> InnoDB B+Tree Anatomy with Doubly-Linked Leaves
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 280" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Root (Level 2) */}
                  <g>
                    <rect x="330" y="15" width="190" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="35" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Root Page (Level 2)</text>
                    <text x="425" y="48" fill="#a7f3d0" fontSize="8" textAnchor="middle font-mono">Keys: [100 | 500 | 900]</text>
                  </g>

                  {/* Branches (Level 1) */}
                  <g>
                    <rect x="100" y="90" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="190" y="110" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Branch Page #10</text>
                    <text x="190" y="123" fill="#a5b4fc" fontSize="8" textAnchor="middle font-mono">Keys: 1 - 99</text>

                    <rect x="335" y="90" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="110" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Branch Page #20</text>
                    <text x="425" y="123" fill="#a5b4fc" fontSize="8" textAnchor="middle font-mono">Keys: 100 - 499</text>

                    <rect x="570" y="90" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="660" y="110" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Branch Page #30</text>
                    <text x="660" y="123" fill="#a5b4fc" fontSize="8" textAnchor="middle font-mono">Keys: 500 - 999</text>
                  </g>

                  {/* Leaves (Level 0) with Doubly-Linked Pointers */}
                  <g>
                    <rect x="30" y="180" width="160" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="110" y="200" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf Page #101</text>
                    <text x="110" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle font-mono">Rows: 1 - 30</text>

                    <rect x="230" y="180" width="160" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="310" y="200" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf Page #102</text>
                    <text x="310" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle font-mono">Rows: 31 - 60</text>

                    <rect x="440" y="180" width="160" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="520" y="200" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf Page #103</text>
                    <text x="520" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle font-mono">Rows: 61 - 99</text>

                    <rect x="650" y="180" width="160" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="730" y="200" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf Page #104</text>
                    <text x="730" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle font-mono">Rows: 100 - 150</text>
                  </g>

                  {/* Connecting Tree Lines */}
                  <path d="M 370 55 L 190 90" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 425 55 L 425 90" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 480 55 L 660 90" stroke="#10b981" strokeWidth="1.5" />

                  {/* Horizontal Doubly-Linked Leaf Arrows */}
                  <path d="M 190 205 L 230 205" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M 390 205 L 440 205" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 600 205 L 650 205" stroke="#38bdf8" strokeWidth="2" />
                  <text x="425" y="260" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ⟷ Horizontal Doubly-Linked List (Ultra-Fast Range Scans) ⟷
                  </text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Page Split Dynamics */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The 50/50 Page Split on Random Insert
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 180" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Before: Full Page */}
                  <g>
                    <rect x="30" y="30" width="260" height="120" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="160" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Full Page #210 (100% Full)</text>
                    <rect x="45" y="70" width="230" height="30" rx="4" fill="#0f172a" />
                    <text x="160" y="89" fill="#f87171" fontSize="9" textAnchor="middle">New Insert: Key 45 (No Space!)</text>
                    <text x="160" y="130" fill="#fca5a5" fontSize="9" textAnchor="middle font-bold">⚠️ Triggers Page Split</text>
                  </g>

                  {/* Split Action Arrow */}
                  <path d="M 300 90 L 370 90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="335" y="80" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">50/50 Split</text>

                  {/* After: Two 50% Full Pages */}
                  <g>
                    <rect x="380" y="30" width="210" height="120" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="485" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Page #210 (50% Density)</text>
                    <rect x="395" y="75" width="180" height="25" rx="3" fill="#020617" />
                    <text x="485" y="91" fill="#a5b4fc" fontSize="8 font-mono">Keeps Keys: 1 - 44</text>
                    <text x="485" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">50% Free Space Left</text>

                    <rect x="610" y="30" width="210" height="120" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="715" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">New Page #940 (50% Density)</text>
                    <rect x="625" y="75" width="180" height="25" rx="3" fill="#020617" />
                    <text x="715" y="91" fill="#34d399" fontSize="8 font-mono">Moves Keys: 45 - 90</text>
                    <text x="715" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">50% Free Space Left</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive B-Tree Traversal Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test point lookups, horizontal leaf range traversals, and page split behaviors live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(lookupMechanisms).map(([key, item]) => {
              const isActive = selectedMechanism === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMechanism(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Mechanics" : "○ Run Traversal"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{lookupMechanisms[selectedMechanism].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{lookupMechanisms[selectedMechanism].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                16KB Page Tree Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Traversal Logic & SQL Query</span>
                <span className="text-emerald-400">Memory Directory Pointer Search</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {lookupMechanisms[selectedMechanism].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">Hop / Step</th>
                    <th className="py-3 px-4 font-mono text-white">Target Page ID</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">Key Range</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">Directory Search Action</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Latency / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lookupMechanisms[selectedMechanism].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300 font-sans">{row.hop}</td>
                      <td className="py-3 px-4 text-white font-bold">{row.page}</td>
                      <td className="py-3 px-4 text-emerald-300">{row.keys}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.action}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {row.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world B-Tree range scans and primary key clustering designs.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Academy Quarterly Fee Collection Range Scan
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui executes a quarterly financial reconciliation query across 50,000 payment receipts for Mamata, Susmita, Abhronila, and Debangshu using a B-Tree index on <code className="text-emerald-300 font-mono">payment_date</code>, completing the range scan in 1.2 milliseconds!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE INDEX idx_payments_date ON fee_payments (payment_date);

-- Traverses leaf doubly-linked list from 2026-04-01 to 2026-06-30:
SELECT payment_id, student_id, amount_inr, payment_mode
FROM fee_payments
WHERE payment_date >= '2026-04-01' AND payment_date <= '2026-06-30'
ORDER BY payment_date ASC;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Extrema $O(1)$ Boundary Inspection
                </h3>
                <span className="text-xs text-slate-400 font-mono">Financial Ledger Extrema</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Auditors query the earliest and latest transaction timestamps in the ledger. MySQL reads the leftmost and rightmost leaf keys directly in $O(1)$ constant time with zero row scans!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`-- EXPLAIN shows 'Select tables optimized away' (Reads leftmost & rightmost index leaves):
SELECT 
    MIN(payment_date) AS earliest_receipt_timestamp,
    MAX(payment_date) AS latest_receipt_timestamp
FROM fee_payments;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid structural fragmentation and high tree height.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The Random UUID Page Split Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using random UUID strings as clustered primary keys causes out-of-order inserts into full middle pages, forcing constant 50/50 page splits, wasting 50% RAM/disk, and crippling write I/O.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use sequential AUTO_INCREMENT BIGINT or time-ordered UUIDs (UUIDv7).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Keep Index Key Data Types Narrow
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Smaller key types (<code className="text-emerald-300 font-mono">INT</code> vs <code className="text-rose-300 font-mono">VARCHAR(255)</code>) fit more keys per 16KB page, increasing page fan-out and keeping tree height compact.
              </p>
              <div className="text-xs text-slate-400">
                Higher fan-out guarantees fewer disk page hops per query.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>B+Trees store keys in non-leaf branches; data rows/PKs reside in leaf nodes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Leaf nodes are connected via a doubly-linked list for fast horizontal range scans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>High fan-out (1,000 keys/page) indexes 1 billion rows in just 3 to 4 levels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Sequential inserts achieve 93.75% density; random UUIDs cause 50% page splits.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe leaf doubly-linked lists...”</span>
                  When you run a range query (<code className="text-cyan-300 font-mono">WHERE date BETWEEN ...</code>), the engine seeks to the starting leaf and simply walks the doubly-linked pointers forward without re-reading the root!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about MIN/MAX optimization...”</span>
                  Indexed <code className="text-cyan-300 font-mono">MIN()</code> and <code className="text-cyan-300 font-mono">MAX()</code> queries execute in $O(1)$ constant time by reading the extreme edges of the B-Tree leaf structure!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering B+Tree layout, fan-out, leaf doubly-linked lists, page splits, and range scans.
            </p>
          </div>

          <FAQTemplate
            title="B-Tree Index Structure & Lookups FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="B-Tree Index Physical Structure and Lookup Mechanics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="When teaching B-Trees, help students visualize the physical 16KB pages. A single 16KB branch page holds over 1,000 child pointers. This exponential fan-out is why a 3-level tree easily indexes a billion rows! Emphasize the doubly-linked list on leaf nodes: this is the magic behind ultra-fast range queries and sorted ORDER BY scans."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
