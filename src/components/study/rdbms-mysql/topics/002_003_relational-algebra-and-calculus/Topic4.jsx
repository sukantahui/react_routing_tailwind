import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Set Theory Operations: Set Union (∪), Set Intersection (∩), and Set Difference (−)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Set Operations Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Set Operations State
  const [selectedSetOp, setSelectedSetOp] = useState("union"); // "union" | "intersect" | "diffA" | "diffB"

  // Base Set A: Online Students
  const [setA] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore" },
    { id: 102, name: "Mahima Sharma", city: "Kolkata" },
    { id: 103, name: "Abhronila Das", city: "Barrackpore" },
  ]);

  // Base Set B: Offline Students (Abhronila is dual-enrolled)
  const [setB] = useState([
    { id: 103, name: "Abhronila Das", city: "Barrackpore" },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur" },
    { id: 105, name: "Debangshu Roy", city: "Kolkata" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Set Operations Engine Active. Select between Union, Intersection, and Difference to inspect Venn diagrams and SQL translations."
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Compute Set Results
  let outputList = [];
  let mathNotation = "";
  let sqlSnippet = "";
  let opTitle = "";
  let opDesc = "";

  if (selectedSetOp === "union") {
    opTitle = "Set Union: Online_Students ∪ Offline_Students";
    opDesc = "Combines all tuples from both relations, automatically eliminating duplicate entries (Abhronila). Commutative: A ∪ B ≡ B ∪ A.";
    mathNotation = "Online_Students ∪ Offline_Students";
    sqlSnippet = `SELECT student_id, full_name, city FROM online_students\nUNION\nSELECT student_id, full_name, city FROM offline_students;`;
    const combined = [...setA, ...setB];
    outputList = combined.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
  } else if (selectedSetOp === "intersect") {
    opTitle = "Set Intersection: Online_Students ∩ Offline_Students";
    opDesc = "Returns only tuples that exist in BOTH relations simultaneously. Commutative: A ∩ B ≡ B ∩ A. Derived as: A − (A − B).";
    mathNotation = "Online_Students ∩ Offline_Students";
    sqlSnippet = `SELECT student_id, full_name, city FROM online_students\nINTERSECT\nSELECT student_id, full_name, city FROM offline_students;`;
    outputList = setA.filter((a) => setB.some((b) => b.id === a.id));
  } else if (selectedSetOp === "diffA") {
    opTitle = "Set Difference: Online_Students − Offline_Students";
    opDesc = "Returns tuples present in Online_Students but ABSENT in Offline_Students. Non-Commutative: A − B ≠ B − A!";
    mathNotation = "Online_Students − Offline_Students";
    sqlSnippet = `SELECT student_id, full_name, city FROM online_students\nEXCEPT\nSELECT student_id, full_name, city FROM offline_students;`;
    outputList = setA.filter((a) => !setB.some((b) => b.id === a.id));
  } else if (selectedSetOp === "diffB") {
    opTitle = "Set Difference: Offline_Students − Online_Students";
    opDesc = "Returns tuples present in Offline_Students but ABSENT in Online_Students. Demonstrates that B − A produces a different set from A − B.";
    mathNotation = "Offline_Students − Online_Students";
    sqlSnippet = `SELECT student_id, full_name, city FROM offline_students\nEXCEPT\nSELECT student_id, full_name, city FROM online_students;`;
    outputList = setB.filter((b) => !setA.some((a) => a.id === b.id));
  }

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Set Theory Operations:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Union (∪), Intersection (∩) &amp; Difference (−)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational set theory: binary operators for Union (∪), Intersection (∩), and Set Difference (−),
            union compatibility prerequisites, algebraic commutativity laws, and modern MySQL 8.0.31+ `UNION`, `INTERSECT`, and `EXCEPT` implementations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔵 Union (∪): A ∪ B (Commutative)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🟢 Intersection (∩): A ∩ B (Commutative)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔴 Difference (−): A − B ≠ B − A (Non-Commutative)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ MySQL: UNION / INTERSECT / EXCEPT
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Set Operations Mathematical Foundation ───── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Relational Set Theory Operations Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical definitions, union compatibility prerequisites, and algebraic properties
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Set Union (∪)</span>
              <strong className="text-white text-xs block font-mono">{`{ t | t ∈ R ∨ t ∈ S }`}</strong>
              <p className="text-[11px] text-slate-400">Commutative: $R \cup S \equiv S \cup R$. Max size: $|R| + |S|$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Set Intersection (∩)</span>
              <strong className="text-white text-xs block font-mono">{`{ t | t ∈ R ∧ t ∈ S }`}</strong>
              <p className="text-[11px] text-slate-400">Commutative: $R \cap S \equiv S \cap R$. Max size: $\min(|R|, |S|)$.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Set Difference (−)</span>
              <strong className="text-white text-xs block font-mono">{`{ t | t ∈ R ∧ t ∉ S }`}</strong>
              <p className="text-[11px] text-rose-400 font-bold">NON-COMMUTATIVE: $R - S \not\equiv S - R$!</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Venn Diagram Visualizer ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Venn Diagram of Relational Set Operations
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Venn Diagram for Set Operations"
            >
              {/* Venn Left Circle (Set A: Online) */}
              <g transform="translate(180, 15)">
                <circle cx="90" cy="55" r="50" fill={selectedSetOp === "union" || selectedSetOp === "diffA" ? "rgba(56, 189, 248, 0.3)" : "rgba(30, 41, 59, 0.4)"} stroke="#38bdf8" strokeWidth="2" />
                <text x="50" y="55" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Set A (Online)</text>
                <text x="50" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Mamata, Mahima</text>
              </g>

              {/* Venn Right Circle (Set B: Offline) */}
              <g transform="translate(320, 15)">
                <circle cx="90" cy="55" r="50" fill={selectedSetOp === "union" || selectedSetOp === "diffB" ? "rgba(16, 185, 129, 0.3)" : "rgba(30, 41, 59, 0.4)"} stroke="#10b981" strokeWidth="2" />
                <text x="130" y="55" fill="#10b981" textAnchor="middle" fontWeight="bold">Set B (Offline)</text>
                <text x="130" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Susmita, Debangshu</text>
              </g>

              {/* Intersection Overlap (Abhronila) */}
              <g transform="translate(265, 30)">
                <ellipse cx="45" cy="40" rx="22" ry="35" fill={selectedSetOp === "union" || selectedSetOp === "intersect" ? "rgba(245, 158, 11, 0.4)" : "rgba(15, 23, 42, 0.6)"} stroke="#f59e0b" strokeWidth="2" />
                <text x="45" y="38" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">A ∩ B</text>
                <text x="45" y="52" fill="#cbd5e1" fontSize="8" textAnchor="middle">Abhronila</text>
              </g>

              {/* Legend Box */}
              <g transform="translate(600, 25)">
                <rect width="150" height="90" rx="4" fill="#0f172a" stroke="#64748b" />
                <text x="75" y="20" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Active Operation</text>
                <text x="15" y="45" fill="#38bdf8" fontSize="10">A: {setA.length} Students</text>
                <text x="15" y="62" fill="#10b981" fontSize="10">B: {setB.length} Students</text>
                <text x="15" y="80" fill="#f59e0b" fontSize="10">Result: {outputList.length} Tuples</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Set Operations Sandbox ──────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Relational Set Operations Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Select between Union, Intersection, and Difference to test Venn diagram results and observe non-commutativity
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Operator Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setSelectedSetOp("union");
                  setEngineLog("✓ Evaluated Union (A ∪ B): Combined both rosters and removed duplicate student 'Abhronila Das'. Result: 5 unique students.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedSetOp === "union"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Set Union (A ∪ B)
              </button>

              <button
                onClick={() => {
                  setSelectedSetOp("intersect");
                  setEngineLog("✓ Evaluated Intersection (A ∩ B): Found dual-enrolled student 'Abhronila Das' present in both sets. Result: 1 student.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedSetOp === "intersect"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Intersection (A ∩ B)
              </button>

              <button
                onClick={() => {
                  setSelectedSetOp("diffA");
                  setEngineLog("✓ Evaluated Difference (A − B): Students ONLY in Online class (Mamata, Mahima). Result: 2 students.");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedSetOp === "diffA"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Difference (A − B)
              </button>

              <button
                onClick={() => {
                  setSelectedSetOp("diffB");
                  setEngineLog("✓ Evaluated Reverse Difference (B − A): Students ONLY in Offline class (Susmita, Debangshu). Result: 2 students. Demonstrates A − B ≠ B − A!");
                }}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedSetOp === "diffB"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Reverse (B − A)
              </button>
            </div>

            {/* Sandbox Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical & SQL */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white block">{opTitle}</span>
                    <p className="text-[11px] text-slate-400 mt-1">{opDesc}</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Notation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {mathNotation}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">MySQL 8.0.31+ SQL Implementation:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {sqlSnippet}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Engine Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Right: Live Result Table */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Evaluated Output Relation ({outputList.length} tuples)</span>
                    <span className="text-teal-400 font-mono text-[11px]">Degree: 3 Columns</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">ID (PK)</th>
                          <th className="p-1.5">Student Name</th>
                          <th className="p-1.5">City</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {outputList.map((row) => (
                          <tr key={row.id}>
                            <td className="p-1.5 text-cyan-300 font-bold">#{row.id}</td>
                            <td className="p-1.5 text-white font-bold">{row.name}</td>
                            <td className="p-1.5 text-emerald-300">{row.city}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Combined rosters, dual-enrollment intersections, and unpaid student defaults from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Combined Student Roster (Set Union)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\text&#123;Online_Students&#125; \cup \text&#123;Offline_Students&#125;$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id, full_name, city FROM online_students
UNION
SELECT student_id, full_name, city FROM offline_students;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Fee Defaulter List (Set Difference)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Relational Algebra: $\pi_&#123;\text&#123;student_id&#125;&#125;(\text&#123;Students&#125;) - \pi_&#123;\text&#123;student_id&#125;&#125;(\text&#123;Fee_Receipts&#125;)$
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT student_id FROM students
EXCEPT
SELECT student_id FROM fee_receipts;`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Avoid assuming Set Difference is commutative and using UNION when UNION ALL is faster
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Assuming Difference is Commutative:</strong>
                  <p className="text-slate-400 mt-0.5">
                    $A - B$ returns online-only students; $B - A$ returns offline-only students. They are never equal!
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using UNION when Duplicates are Desired:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>UNION</code> performs expensive sort-deduplication. Use <code>UNION ALL</code> if deduplication is not needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Verify Union Compatibility:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure both queries have the exact same number of columns with matching data types in identical order.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Anti-Join Emulation for EXCEPT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    In older MySQL versions, use <code>LEFT JOIN ... WHERE right.id IS NULL</code> for high-speed indexed set difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Set operations require Union Compatibility (same degree and domain order)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Set Union (∪) is commutative: `A ∪ B ≡ B ∪ A` (SQL `UNION`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Set Intersection (∩) is commutative: `A ∩ B ≡ B ∩ A` (SQL `INTERSECT`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Set Difference (−) is NON-COMMUTATIVE: `A − B ≠ B − A` (SQL `EXCEPT`)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Intersection derived from difference: `A ∩ B ≡ A − (A − B)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>`UNION ALL` skips expensive deduplication and is much faster for raw concatenation</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Set Theory Operations (∪, ∩, −) – FAQs"
            questions={questions}
            subtitle="Master relational set theory, union compatibility, Venn diagram mechanics, algebraic laws, and SQL UNION, INTERSECT, EXCEPT with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Set Theory Operations: Set Union (∪), Set Intersection (∩), and Set Difference (−)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_set_operations_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Relational database theory is built on the bedrock of Set Theory! " +
              "In my classes in Barrackpore, I constantly test students on the non-commutativity of Set Difference: " +
              "If relation A has online students and relation B has offline students, $A - B$ gives you online-only students (Mamata, Mahima), " +
              "while $B - A$ gives you offline-only students (Susmita, Debangshu). They are completely different sets! " +
              "In production SQL, always ask yourself: 'Do I actually need duplicate removal?' " +
              "If you are simply appending two audit logs or daily transactional batches, use `UNION ALL` to bypass the costly sorting pass. " +
              "Mastering $\\cup, \\cap, -$ gives you full command over multi-table set algebra in MySQL!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · Set Operations (∪, ∩, −) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
