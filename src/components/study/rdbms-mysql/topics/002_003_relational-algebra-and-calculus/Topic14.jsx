import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Constructing and Evaluating Relational Algebra Expression Trees (Query Trees)
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Query Tree Optimizer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic14 = () => {
  const sectionRefs = useRef([]);

  // Interactive Query Tree State
  const [treeMode, setTreeMode] = useState("canonical"); // "canonical" | "optimized"

  const [engineLog, setEngineLog] = useState(
    "Query Tree Engine Active. Toggle between Canonical (Unoptimized) and Heuristically Optimized Query Trees to inspect intermediate row count reductions."
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

  const canonicalMath = "π_{full_name, course_title}(σ_{city='Barrackpore' ∧ fee>4000 ∧ S.id=E.sid ∧ E.cid=C.id}(Students × Enrollments × Courses))";
  const optimizedMath = "π_{full_name, course_title}((σ_{city='Barrackpore'}(Students) ⨝_{id=sid} Enrollments) ⨝_{cid=id} σ_{fee>4000}(Courses))";

  const canonicalExplain = `-> Project: full_name, course_title  (cost=5250000.00 rows=2)
   -> Filter: (Students.city = 'Barrackpore' AND Courses.fee > 4000 AND Students.id = Enrollments.sid AND Enrollments.cid = Courses.id)
      -> Cartesian product (cost=5000000.00 rows=50,000,000)  <-- MEMORY DISASTER!
         -> Table scan on Courses (rows=100)
         -> Cartesian product (rows=500,000)
            -> Table scan on Enrollments (rows=5,000)
            -> Table scan on Students (rows=100)`;

  const optimizedExplain = `-> Project: full_name, course_title  (cost=12.40 rows=2)
   -> Nested loop inner join  (cost=10.20 rows=2)
      -> Nested loop inner join  (cost=6.10 rows=4)
         -> Filter: (Students.city = 'Barrackpore')  (cost=2.00 rows=5)  <-- PUSHED DOWN!
            -> Index range scan on Students using idx_city (rows=5)
         -> Index lookup on Enrollments using idx_sid (sid=Students.id) (rows=4)
      -> Index lookup on Courses using PRIMARY (id=Enrollments.cid), filter: (Courses.fee > 4000) (rows=1)  <-- PUSHED DOWN!`;

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 14
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Constructing &amp; Evaluating{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relational Query Trees
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the internal engine representation of database queries: Operator Expression Trees, Bottom-Up evaluation pipelines,
            Canonical vs Optimized query tree transformation, and selection/projection pushdown mechanics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌳 Tree Structure: Leaves ➔ Operators ➔ Root
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⬆️ Bottom-Up Execution Pipeline
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⬇️ Pushdown Heuristic Transformations
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ MySQL EXPLAIN FORMAT=TREE
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Tree Anatomy & Pipeline Theory ────────────── */}
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
                Query Tree Architecture &amp; Execution Pipeline
              </h2>
              <p className="text-xs text-slate-400">
                Leaf relations, unary/binary operator nodes, and the bottom-up dataflow pipeline
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Leaf Nodes (Base Tables)</span>
              <strong className="text-white text-xs block">Disk Scan Sources</strong>
              <p className="text-[11px] text-slate-400">Represent stored tables on disk (Students, Enrollments, Courses).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Internal Nodes</span>
              <strong className="text-white text-xs block">Relational Operators</strong>
              <p className="text-[11px] text-slate-400">Unary ($\sigma, \pi, \rho$) have 1 child; Binary ($\bowtie, \times$) have 2 children.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Root Node</span>
              <strong className="text-white text-xs block">Final Projected Output</strong>
              <p className="text-[11px] text-slate-400">Emits the final result tuples to the client application.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Canonical vs Optimized Tree Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Canonical Unoptimized Tree vs Heuristically Optimized Tree
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Query Tree Optimization Diagram"
            >
              {/* Left: Canonical Tree */}
              <g transform="translate(40, 10)">
                <rect width="320" height="140" rx="8" fill="#0f172a" stroke="#f43f5e" />
                <text x="160" y="20" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Canonical (Unoptimized) Tree</text>

                {/* Root: Projection */}
                <rect x="110" y="30" width="100" height="20" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="160" y="44" fill="#38bdf8" textAnchor="middle" fontSize="10">π (Projection)</text>

                {/* Level 1: High Selection */}
                <rect x="90" y="58" width="140" height="20" rx="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="160" y="72" fill="#f43f5e" textAnchor="middle" fontSize="9">σ (Massive Filter)</text>

                {/* Level 2: Cross Product */}
                <rect x="100" y="86" width="120" height="20" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="160" y="100" fill="#f59e0b" textAnchor="middle" fontSize="9">× (50 Million Rows!)</text>

                {/* Leaves */}
                <text x="60" y="128" fill="#cbd5e1" fontSize="9">Students</text>
                <text x="160" y="128" fill="#cbd5e1" fontSize="9">Enrollments</text>
                <text x="260" y="128" fill="#cbd5e1" fontSize="9">Courses</text>
              </g>

              {/* Transformation Arrow */}
              <g transform="translate(375, 75)">
                <path d="M 0,5 L 25,5" stroke="#10b981" strokeWidth="2" />
                <polygon points="25,1 35,5 25,9" fill="#10b981" />
                <text x="15" y="-5" fill="#10b981" fontSize="9" textAnchor="middle">Pushdown</text>
              </g>

              {/* Right: Optimized Tree */}
              <g transform="translate(420, 10)">
                <rect width="320" height="140" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="160" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">Heuristically Optimized Tree</text>

                {/* Root: Projection */}
                <rect x="110" y="30" width="100" height="20" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="160" y="44" fill="#38bdf8" textAnchor="middle" fontSize="10">π (Projection)</text>

                {/* Level 1: Indexed Equijoin */}
                <rect x="110" y="58" width="100" height="20" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="160" y="72" fill="#10b981" textAnchor="middle" fontSize="10">⨝ (Join: 2 rows)</text>

                {/* Pushed Down Selections */}
                <rect x="20" y="86" width="120" height="20" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="80" y="100" fill="#38bdf8" textAnchor="middle" fontSize="8">σ_{`{city='Barrackpore'}`}</text>

                <rect x="180" y="86" width="120" height="20" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="240" y="100" fill="#38bdf8" textAnchor="middle" fontSize="8">σ_{`{fee > 4000}`}</text>

                {/* Leaves */}
                <text x="80" y="128" fill="#10b981" fontSize="9">Students (5 rows)</text>
                <text x="240" y="128" fill="#10b981" fontSize="9">Courses (2 rows)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Query Tree Optimizer Simulator ── */}
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
                Interactive Query Tree Optimizer Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Compare the Canonical execution plan with the Heuristically Optimized plan to see real-world cost drops
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTreeMode("canonical");
                  setEngineLog("⚠️ Canonical Plan Active: Materializes 50,000,000 Cartesian product rows before filtering! Estimated query cost: 5,250,000.00 units.");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  treeMode === "canonical"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Canonical Query Tree (Unoptimized Cartesian Pipeline)
              </button>

              <button
                onClick={() => {
                  setTreeMode("optimized");
                  setEngineLog("✓ Optimized Plan Active: Pushed selections down to base tables. Intermediate row count dropped by 99.999%! Estimated query cost: 12.40 units.");
                }}
                className={clsx(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  treeMode === "optimized"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Heuristically Optimized Tree (Selection &amp; Join Pushdown)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Mathematical Notation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">
                      {treeMode === "canonical" ? "Canonical Plan Metrics:" : "Optimized Plan Metrics:"}
                    </span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded font-bold border",
                        treeMode === "canonical"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      )}
                    >
                      {treeMode === "canonical" ? "COST: 5,250,000.00" : "COST: 12.40 (-99.99%)"}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Relational Algebra Expression:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-amber-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {treeMode === "canonical" ? canonicalMath : optimizedMath}
                      </pre>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Intermediate Peak Memory Rows:</span>
                      <div className="p-2 rounded bg-slate-900 text-xs font-mono font-bold">
                        {treeMode === "canonical" ? (
                          <span className="text-rose-400">50,000,000 Rows (Massive Disk Temp Spilling!)</span>
                        ) : (
                          <span className="text-emerald-300">12 Rows (100% In-Memory Pipeline)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Log Window */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                    Optimizer Execution Log:
                  </span>
                  <pre className="whitespace-pre-wrap">{engineLog}</pre>
                </div>
              </div>

              {/* Right: MySQL EXPLAIN FORMAT=TREE Output */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>MySQL EXPLAIN FORMAT=TREE Output</span>
                    <span className="text-teal-400 font-mono text-[11px]">Execution Plan</span>
                  </div>
                  <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
                    {treeMode === "canonical" ? canonicalExplain : optimizedExplain}
                  </pre>
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
                Academy multi-table query tree pushdowns from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's High-Value Barrackpore Student Enrollment Query
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Optimized Tree: $\\pi_{\\text{name, title}}((\\sigma_{\\text{city='Barrackpore'}}(\\text{Students}) \\bowtie \\text{Enrollments}) \\bowtie \\sigma_{\\text{fee}>4000}(\\text{Courses}))$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT s.full_name, c.course_title
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.city = 'Barrackpore' AND c.fee > 4000;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's EXPLAIN FORMAT=TREE Performance Audit
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Verifying that MySQL pushes index range scans into leaf nodes before evaluating joins.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`EXPLAIN FORMAT=TREE
SELECT s.full_name, e.grade
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE s.city = 'Barrackpore';`}
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
                Avoid projecting away join keys prematurely and unindexed Cartesian explosions
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
                  <strong className="text-white">1. Premature Join Key Projection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Pushing <code>π_name</code> down before the join drops <code>student_id</code>, causing the join to fail.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Evaluating Cartesian Cross Products:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Executing $R \times S$ before applying selection creates massive temporary disk tables.
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
                  <strong className="text-white">1. Push Selections Down Immediately:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always apply $\sigma$ right above the leaf table scan to filter out 90%+ of rows before joins.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Retain Foreign Keys in Projection:</strong>
                  <p className="text-slate-400 mt-0.5">
                    When pushing projections down, always include all attributes needed by ancestor join conditions.
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
              <span>Query Trees represent relational queries with base tables at Leaves and operators as Internal nodes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Execution proceeds in strict Bottom-Up order from leaves to root</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Canonical trees feature unoptimized Cartesian products ($R \times S$)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Push selections ($\sigma$) down to the leaf nodes immediately after table scans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Push projections ($\pi$) down while preserving all required join key attributes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use `EXPLAIN FORMAT=TREE` in MySQL to inspect real-world physical operator trees</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Query Trees (Expression Trees) – FAQs"
            questions={questions}
            subtitle="Master relational query tree construction, Bottom-Up evaluation, Canonical vs Optimized plans, Selection/Projection pushdown heuristics, and MySQL EXPLAIN with 30 comprehensive Q&As"
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
            title="Constructing and Evaluating Relational Algebra Expression Trees (Query Trees)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic14_query_trees_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Query Trees are the internal blueprints of database engines! " +
              "In my classes in Barrackpore, I teach students that when you type a SQL query, MySQL does not execute it line-by-line: " +
              "It parses the query into a Canonical Query Tree, and then its query optimizer applies heuristic transformations to push selections " +
              "and projections down as close to the physical disk leaves as possible. " +
              "By pushing $\\sigma_{\\text{city='Barrackpore'}}$ down before joining with `Enrollments`, the engine avoids scanning 100,000 students " +
              "and only processes the 5 Barrackpore students, turning a 5-second query into a 0.2-millisecond instant lookup! " +
              "Understanding query trees makes you a true database performance architect."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 14 · Query Trees · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic14;
