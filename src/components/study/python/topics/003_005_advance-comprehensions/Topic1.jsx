import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import flatteningCode from "./topic1_files/nested_comprehension_order_and_flattening.py?raw";
import cartesianCode from "./topic1_files/cartesian_products_and_multi_variable_filtering.py?raw";
import lookupCode from "./topic1_files/nested_dict_and_lookup_table_comprehensions.py?raw";
import schedulerCode from "./topic1_files/institutional_multicampus_scheduler_comprehension_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Nested and Multi-variable Comprehensions with filtering
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("loopOrder");

  // Interactive Laboratory State
  const [operationMode, setOperationMode] = useState("flatten"); // flatten | transpose | cartesian | clash
  const [filterBpOnly, setFilterBpOnly] = useState(false);
  const [excludeSelfPairs, setExcludeSelfPairs] = useState(true);

  // Sample Multi-Campus Data
  const sampleBatches = [
    ["Sourav (BP)", "Debolina (BP)"],
    ["Priyanka (KL)", "Sneha (KL)"],
    ["Rahul (WB)", "Amit (WB)"],
  ];

  const sampleMatrix = [
    [10, 20],
    [30, 40],
    [50, 60],
  ];

  const instructors = ["Sukanta Hui", "Prabhat Sen"];
  const courses = ["Python AI", "Data Science"];
  const campuses = ["Barrackpore", "Kolkata"];

  const courseEnrollments = [
    { code: "PY-AI", students: ["STU-101", "STU-103", "STU-105"] },
    { code: "DS-ML", students: ["STU-102", "STU-105"] },
    { code: "WEB-DEV", students: ["STU-104"] },
  ];

  // Compute live expression & output
  let pythonCodeExpr = "";
  let evaluatedResult = null;

  if (operationMode === "flatten") {
    pythonCodeExpr = `[student for batch in campus_batches for student in batch${filterBpOnly ? ' if "(BP)" in student' : ""}]`;
    const flat = sampleBatches.flat();
    evaluatedResult = filterBpOnly ? flat.filter((s) => s.includes("(BP)")) : flat;
  } else if (operationMode === "transpose") {
    pythonCodeExpr = `[[matrix[row][col] for row in range(${sampleMatrix.length})] for col in range(${sampleMatrix[0].length})]`;
    const nRows = sampleMatrix.length;
    const nCols = sampleMatrix[0].length;
    evaluatedResult = Array.from({ length: nCols }, (_, c) =>
      Array.from({ length: nRows }, (_, r) => sampleMatrix[r][c])
    );
  } else if (operationMode === "cartesian") {
    pythonCodeExpr = `[f"{inst} -> {crs} @ {camp}" for inst in instructors for crs in courses for camp in campuses${filterBpOnly ? ' if camp == "Barrackpore"' : ""}]`;
    const res = [];
    for (const inst of instructors) {
      for (const crs of courses) {
        for (const camp of campuses) {
          if (!filterBpOnly || camp === "Barrackpore") {
            res.push(`${inst} -> ${crs} @ ${camp}`);
          }
        }
      }
    }
    evaluatedResult = res;
  } else {
    // clash matrix
    pythonCodeExpr = `[{"c1": c1['code'], "c2": c2['code'], "overlap": list(set(c1['s']) & set(c2['s']))} for i, c1 in enumerate(courses) for j, c2 in enumerate(courses) if ${excludeSelfPairs ? "i < j" : "True"} and (set(c1['s']) & set(c2['s']))]`;
    const clashes = [];
    for (let i = 0; i < courseEnrollments.length; i++) {
      for (let j = 0; j < courseEnrollments.length; j++) {
        if (!excludeSelfPairs || i < j) {
          const overlap = courseEnrollments[i].students.filter((s) =>
            courseEnrollments[j].students.includes(s)
          );
          if (overlap.length > 0 && (i !== j || !excludeSelfPairs)) {
            clashes.push({
              course_a: courseEnrollments[i].code,
              course_b: courseEnrollments[j].code,
              shared_students: overlap,
            });
          }
        }
      }
    }
    evaluatedResult = clashes;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 3 • Module 003_005
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Nested &amp; Multi-Variable <span className="text-teal-400">Comprehensions</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master multi-clause loop ordering in Python: Left-to-Right loop semantics, flattening 2D/3D hierarchies (<code className="text-teal-300 font-mono">[x for r in m for x in r]</code>), constructing 2D matrices (<code className="text-cyan-300 font-mono">[[... for c] for r]</code>), Cartesian cross-products, matrix transposition, and cross-dataset clash matrices.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔀 Left-to-Right Loop Order
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📄 2D Matrix Flattening
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✖️ Cartesian Products
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Matrix Transposition
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: NESTED CLAUSE ORDER PRINCIPLES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔀</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Left-to-Right Nested Loop Rule
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In multi-clause comprehensions, loop clauses are read from left to right in the exact same order as standard nested <code className="text-teal-300 font-mono">for</code> statements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Flattening 2D Lists</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">[x for row in M for x in row]</code>
                <p className="text-[11px] text-slate-300">
                  Outer loop iterates rows; inner loop iterates items. Yields a single flat 1D list.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ 2D Matrix Construction</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">[[expr for col] for row]</code>
                <p className="text-[11px] text-slate-300">
                  Nests two sets of brackets to produce a 2D matrix of sub-lists.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Cartesian Product</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">[(a, b) for a in A for b in B]</code>
                <p className="text-[11px] text-slate-300">
                  Generates all cross combinations between independent collections.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Inverted Clause NameError Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing <code className="text-rose-400 font-mono">[x for x in row for row in matrix]</code> causes <code className="text-rose-400 font-mono">NameError: name 'row' is not defined</code>. The outer container variable must always be bound first on the left!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Clause Ordering, Transposition &amp; Clashes
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("loopOrder")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "loopOrder"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Loop Ordering
              </button>
              <button
                onClick={() => setActiveInteractiveTab("transposition")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "transposition"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Matrix Transposition
              </button>
              <button
                onClick={() => setActiveInteractiveTab("clashMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "clashMatrix"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Clash Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining multi-clause loop execution order, 2D matrix transposition, and cross-course clash detection:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "loopOrder" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">LEFT-TO-RIGHT NESTED LOOP ORDERING RULE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Standard Nested Loop</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">for row in matrix:</text>
                  <text x="25" y="72" fill="#38bdf8" fontSize="8 font-mono">for item in row:</text>
                  <text x="35" y="89" fill="#34d399" fontSize="8 font-mono">flat_list.append(item)</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="140" fill="#34d399" fontSize="9 font-bold">Standard Procedural Order:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Outer loop `row` defined first;</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Inner loop `item` iterates `row`.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. List Comprehension</text>
                  <text x="310" y="55" fill="#34d399" fontSize="9 font-mono font-bold">[item</text>
                  <text x="325" y="72" fill="#38bdf8" fontSize="8 font-mono">for row in matrix</text>
                  <text x="325" y="89" fill="#38bdf8" fontSize="8 font-mono">for item in row]</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Exact Syntax Mirror:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Left-to-right order matches</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">the nested procedural loop 100%.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Flattened 1D Result</text>
                  <text x="605" y="55" fill="#34d399" fontSize="9 font-mono font-bold">[1, 2, 3, 4, 5, 6]</text>
                  <text x="605" y="75" fill="#ecfdf5" fontSize="8 font-mono">Zero Method Overhead</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="140" fill="#34d399" fontSize="9 font-bold">High Speed Output:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Single flat list produced</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">in optimal C-level loop.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "transposition" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">2D MATRIX TRANSPOSITION (SWAPPING ROWS &amp; COLUMNS)</text>

                {/* Left: Original 3x2 */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Original 3x2 Matrix (3 Rows, 2 Columns)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">[ [10, 20],</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="9 font-mono">  [30, 40],</text>
                  <text x="20" y="100" fill="#ecfdf5" fontSize="9 font-mono">  [50, 60] ]</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Row-Major Orientation:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Row 0: [10, 20] | Row 1: [30, 40] | Row 2: [50, 60]</text>
                </g>

                {/* Right: Transposed 2x3 */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Transposed 2x3 Matrix (`[[M[r][c] for r] for c]`)</text>

                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono font-bold">[ [10, 30, 50],</text>
                  <text x="20" y="80" fill="#34d399" fontSize="9 font-mono font-bold">  [20, 40, 60] ]</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Column-Major Transposition:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Columns become rows; ideal for feature matrix swaps.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">CROSS-COURSE CLASH DETECTION MATRIX GENERATION</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Enrolled Student Sets</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">PY-AI: &#123;101, 103, 105&#125;</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">DS-ML: &#123;102, 105&#125;</text>
                  <text x="15" y="95" fill="#38bdf8" fontSize="8 font-mono">WEB  : &#123;104&#125;</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="140" fill="#c4b5fd" fontSize="9 font-bold">Student Enrolment:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Student STU-105 is double</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">enrolled in PY-AI &amp; DS-ML.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="310" y="30" fill="#fda4af" fontSize="11 font-bold">2. Cartesian Pairing &amp; Intersection</text>
                  <text x="310" y="55" fill="#fca5a5" fontSize="8 font-mono">for c1 in courses</text>
                  <text x="310" y="72" fill="#fca5a5" fontSize="8 font-mono">for c2 in courses</text>
                  <text x="310" y="89" fill="#fda4af" fontSize="8 font-mono">if set(c1) &amp; set(c2)</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="320" y="140" fill="#fda4af" fontSize="9 font-bold">Overlap Detector:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Finds intersecting student</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">IDs between course pairs.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Timetable Constraint</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono font-bold">PY-AI &lt;-&gt; DS-ML [CLASH]</text>
                  <text x="605" y="75" fill="#ecfdf5" fontSize="8 font-mono">Shared: STU-105</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="140" fill="#34d399" fontSize="9 font-bold">Scheduler Action:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Guarantees PY-AI &amp; DS-ML</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">run in separate time slots.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MULTI-VARIABLE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Variable Matrix &amp; Clash Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test flattening 2D matrices, transposing rectangular tables, generating Cartesian cross-products, and detecting timetable collisions in real time:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Multi-Variable Transformation Mode
                </span>
              </div>

              {/* Mode Selector */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setOperationMode("flatten")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    operationMode === "flatten"
                      ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  1. 2D List Flattening
                </button>
                <button
                  onClick={() => setOperationMode("transpose")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    operationMode === "transpose"
                      ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  2. Matrix Transpose
                </button>
                <button
                  onClick={() => setOperationMode("cartesian")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    operationMode === "cartesian"
                      ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  3. Cartesian Product
                </button>
                <button
                  onClick={() => setOperationMode("clash")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    operationMode === "clash"
                      ? "bg-rose-900/60 text-rose-300 font-bold border border-rose-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  4. Clash Detector
                </button>
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono pt-1">
                {(operationMode === "flatten" || operationMode === "cartesian") && (
                  <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterBpOnly}
                      onChange={(e) => setFilterBpOnly(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Filter Only Barrackpore (BP) Elements</span>
                  </label>
                )}

                {operationMode === "clash" && (
                  <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeSelfPairs}
                      onChange={(e) => setExcludeSelfPairs(e.target.checked)}
                      className="accent-rose-500 rounded"
                    />
                    <span>Exclude Self-Course Comparison Pairs (`i &lt; j`)</span>
                  </label>
                )}
              </div>
            </div>

            {/* Expression & Output Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Multi-Clause Comprehension Expression:
                </div>
                <div className="text-teal-300 text-[11px] leading-relaxed break-all font-mono">
                  {pythonCodeExpr}
                </div>
              </div>

              {/* Evaluated Output Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Evaluated Result ({Array.isArray(evaluatedResult) ? evaluatedResult.length : Object.keys(evaluatedResult || {}).length} Elements):</span>
                  <span className="text-emerald-400">Optimized Loop Stream</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {JSON.stringify(evaluatedResult, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER NESTED MATRIX TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Multi-Clause Pattern Reference Table
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Operation</th>
                  <th className="py-3.5 px-4 font-bold">Comprehension Recipe</th>
                  <th className="py-3.5 px-4 font-bold">Loop Order Invariant</th>
                  <th className="py-3.5 px-4 font-bold">Output Dimension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">2D Flattening</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[x for row in M for x in row]`</td>
                  <td className="py-3 px-4 text-emerald-400">Outer loop left, inner loop right</td>
                  <td className="py-3 px-4">1D List (`List[T]`)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">2D Construction</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[[col for col in r] for r in rows]`</td>
                  <td className="py-3 px-4 text-cyan-300">Inner list nested in outer list</td>
                  <td className="py-3 px-4">2D Matrix (`List[List[T]]`)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Cartesian Product</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[(a, b) for a in A for b in B]`</td>
                  <td className="py-3 px-4 text-purple-300">Generates |A| * |B| tuples</td>
                  <td className="py-3 px-4">1D List of Tuples</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Matrix Transpose</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[[M[r][c] for r in R] for c in C]`</td>
                  <td className="py-3 px-4 text-amber-300">Iterates cols outer, rows inner</td>
                  <td className="py-3 px-4">Transposed 2D Matrix</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating nested loop ordering, Cartesian cross-products, nested lookup tables, and multi-campus exam schedulers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "nested_comprehension_order_and_flattening.py",
                code: flatteningCode,
                description: "Loop ordering, 2D matrix flattening, and nested matrix generation.",
              },
              {
                filename: "cartesian_products_and_multi_variable_filtering.py",
                code: cartesianCode,
                description: "Cartesian products, tuple unpacking, and matrix transposition in comprehensions.",
              },
              {
                filename: "nested_dict_and_lookup_table_comprehensions.py",
                code: lookupCode,
                description: "Nested dictionary comprehensions and composite tuple key lookup indexes.",
              },
              {
                filename: "institutional_multicampus_scheduler_comprehension_suite.py",
                code: schedulerCode,
                description: "Multi-clause nested comprehensions, timetable generation, clash matrices, and matrix inversion.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Inverted Clause Loop Ordering
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">[x for x in row for row in matrix]</code> causes an unrecoverable <code className="text-rose-300 font-mono">NameError: name 'row' is not defined</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always write <code className="text-emerald-300">[x for row in matrix for x in row]</code> (Outer first, inner second).
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Combinatorial Explosion on Cartesian Products
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nesting 4 large collections (<code className="text-amber-300 font-mono">1000 * 1000 * 1000 * 1000</code>) creates a 1-trillion element list, causing catastrophic out-of-memory crashes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">itertools.product()</code> generator expressions for streaming evaluation.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Confusing 1D Flattening with 2D Construction
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Flattening produces a single 1D list <code className="text-purple-300 font-mono">[x for r in m for x in r]</code>; 2D matrix construction requires nested brackets <code className="text-purple-300 font-mono">[[x for x in r] for r in m]</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Check your brackets: 1 pair = 1D, 2 pairs = 2D.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Deep Cognitive Complexity (> 2 Clauses)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing 3 or 4 nested loops in a single comprehension expression creates unreadable, unmaintainable code that violates the Zen of Python.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> If it exceeds 2 `for` clauses, refactor to standard loops or functions.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering nested loop ordering, 2D matrix flattening, Cartesian products, and matrix transposition:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with nested comprehension recipes, flattening templates, and matrix transposition patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_nested_comprehensions_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
