import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Relational Algebra Core Operations: Selection Operator (σ) with Complex Predicates
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Selection Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Selection Simulator State
  const [cityFilter, setCityFilter] = useState("All");
  const [minFee, setMinFee] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All");

  const [studentData] = useState([
    { id: 101, name: "Mamata Hui", city: "Barrackpore", course: "MySQL Masterclass", fee: 5500, status: "Active" },
    { id: 102, name: "Mahima Sharma", city: "Kolkata", course: "React Architect", fee: 4800, status: "Active" },
    { id: 103, name: "Abhronila Das", city: "Barrackpore", course: "Data Modeling", fee: 3800, status: "Completed" },
    { id: 104, name: "Susmita Ghosh", city: "Ichapur", course: "MySQL Masterclass", fee: 5500, status: "Active" },
    { id: 105, name: "Debangshu Roy", city: "Kolkata", course: "Backend Node.js", fee: 3200, status: "Completed" },
  ]);

  const [engineLog, setEngineLog] = useState(
    "Selection Operator Engine Active. Adjust predicate filters to observe mathematical σ expressions and SQL WHERE transformations."
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

  // Compute filtered tuples
  const filteredStudents = studentData.filter((s) => {
    const cityMatch = cityFilter === "All" || s.city === cityFilter;
    const feeMatch = s.fee &ge; minFee;
    const statusMatch = statusFilter === "All" || s.status === statusFilter;
    return cityMatch && feeMatch && statusMatch;
  });

  // Construct mathematical expression
  const predicates = [];
  if (cityFilter !== "All") predicates.push(`city = '${cityFilter}'`);
  if (minFee > 0) predicates.push(`admission_fee >= ${minFee}`);
  if (statusFilter !== "All") predicates.push(`status = '${statusFilter}'`);

  const mathPredicate = predicates.length > 0 ? predicates.join(" ∧ ") : "TRUE";
  const sqlWhere = predicates.length > 0 ? `WHERE ${predicates.join(" AND ")}` : "";

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Selection Operator (σ) with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Complex Predicates
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mathematical mechanics of horizontal relation filtering: unary Selection (σ), boolean predicate construction
            (∧, ∨, ¬), degree preservation, cardinality estimation, and the heuristic "Push Selections Down" query optimization rule.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✂️ Horizontal Slicing (Degree Preserved)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Mathematical Syntax: σ_p(R)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ SQL Equivalent: WHERE Clause
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚀 Query Optimization: Push Selections Down
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Mathematical Theory & Properties ─────────── */}
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
                Selection Operator (σ) Mathematical Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Definition, degree preservation, algebraic laws, and complex predicate syntax
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Unary Operator</span>
              <strong className="text-white text-xs block">1 Input Relation</strong>
              <p className="text-[11px] text-slate-400">Takes relation $R$ and outputs a filtered relation with the same attributes.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Degree Preserved</span>
              <strong className="text-white text-xs block">Degree(σ_p(R)) = Degree(R)</strong>
              <p className="text-[11px] text-slate-400">Never adds, removes, or modifies columns.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Cardinality</span>
              <strong className="text-white text-xs block">0 ≤ |σ_p(R)| ≤ |R|</strong>
              <p className="text-[11px] text-slate-400">Selectivity factor $s \in [0, 1]$ determines output size.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Commutative</span>
              <strong className="text-white text-xs block">σ_p1(σ_p2(R)) ≡ σ_p2(σ_p1(R))</strong>
              <p className="text-[11px] text-slate-400">Cascaded selections evaluate identically in any order.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Selection & Push-Down Optimization ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Selection Filtering &amp; Query Tree Push-Down Heuristic
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Selection Operation Diagram"
            >
              {/* Unoptimized Tree */}
              <g transform="translate(30, 15)">
                <rect width="320" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="160" y="20" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Unoptimized: Filter AFTER Join</text>
                <text x="160" y="45" fill="#cbd5e1" textAnchor="middle">σ_(city='Barrackpore') [Expensive!]</text>
                <line x1="160" y1="52" x2="160" y2="65" stroke="#64748b" />
                <text x="160" y="80" fill="#f59e0b" textAnchor="middle">⨝ (Join 1,000 × 500 = 500k rows)</text>
                <text x="70" y="100" fill="#38bdf8" textAnchor="middle">Students (1k)</text>
                <text x="250" y="100" fill="#10b981" textAnchor="middle">Courses (500)</text>
              </g>

              {/* Arrow */}
              <g transform="translate(360, 65)">
                <path d="M 0,5 L 50,5" stroke="#10b981" strokeWidth="2" />
                <polygon points="50,1 60,5 50,9" fill="#10b981" />
                <text x="25" y="-5" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">Push Down</text>
              </g>

              {/* Optimized Tree */}
              <g transform="translate(430, 15)">
                <rect width="320" height="110" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">Optimized: Push Selection Down</text>
                <text x="160" y="45" fill="#f59e0b" textAnchor="middle">⨝ (Join only 20 × 500 = 10k rows!)</text>
                <line x1="100" y1="52" x2="80" y2="68" stroke="#64748b" />
                <line x1="220" y1="52" x2="240" y2="68" stroke="#64748b" />
                <text x="80" y="82" fill="#10b981" textAnchor="middle">σ_(city='Barrackpore')</text>
                <text x="80" y="100" fill="#38bdf8" textAnchor="middle">Students (1k ➔ 20)</text>
                <text x="240" y="100" fill="#10b981" textAnchor="middle">Courses (500)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Selection Simulator ─────────── */}
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
                Interactive Selection Predicate Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Adjust filter predicates and observe dynamic mathematical σ notation and generated SQL WHERE clauses
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter Controls */}
            <div className="space-y-4">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                <span className="text-xs font-bold text-teal-400 block">
                  Configure Selection Predicate Predicate $p$:
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">City Filter:</label>
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                    &gt;
                      <option value="All">All Cities</option>
                      <option value="Barrackpore">Barrackpore</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Ichapur">Ichapur</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Min Fee (₹):</label>
                    <select
                      value={minFee}
                      onChange={(e) => setMinFee(Number(e.target.value))}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    &gt;
                      <option value={0}>₹0+ (All)</option>
                      <option value={3500}>≥ ₹3,500</option>
                      <option value={4500}>≥ ₹4,500</option>
                      <option value={5000}>≥ ₹5,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Status:</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    &gt;
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                  <strong className="text-amber-300 block font-mono">
                    Mathematical Notation: σ_{`{${mathPredicate}}`}(Students)
                  </strong>
                  <strong className="text-emerald-400 block font-mono">
                    SQL: SELECT * FROM students {sqlWhere};
                  </strong>
                </div>
              </div>

              {/* Log Window */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Log:
                </span>
                <pre className="whitespace-pre-wrap">
                  {`✓ Applied σ Predicate: [${mathPredicate}]\n✓ Input Cardinality: ${studentData.length} tuples\n✓ Filtered Output: ${filteredStudents.length} tuples (Selectivity: ${(filteredStudents.length / studentData.length).toFixed(2)})`}
                </pre>
              </div>
            </div>

            {/* Live Filtered Table */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Filtered Result Set: σ_p(Students) [{filteredStudents.length} matches]</span>
                  <span className="text-teal-400 font-mono text-[11px]">Degree: 6 Columns (Preserved)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Name</th>
                        <th className="p-1.5">City</th>
                        <th className="p-1.5">Fee</th>
                        <th className="p-1.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {filteredStudents.length &gt; 0 ? (
                        filteredStudents.map((s) => (
                          <tr key={s.id}>
                            <td className="p-1.5 text-cyan-300 font-bold">#{s.id}</td>
                            <td className="p-1.5 text-white">{s.name}</td>
                            <td className="p-1.5 text-emerald-300">{s.city}</td>
                            <td className="p-1.5 text-amber-300">₹{s.fee}</td>
                            <td className="p-1.5 text-slate-400">{s.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-rose-400 italic">
                            Empty Relation ∅ (No tuples satisfy predicate)
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                Academy fee tier filtering and multi-city student queries from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Premium Batch Selection
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\sigma_{\city = 'Barrackpore' \\land \fee \\ge 5000}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT * FROM students
WHERE city = 'Barrackpore' AND admission_fee &ge; 5000;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-City Active Student Selection
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\sigma_{(\city = 'Kolkata' \\lor \city = 'Ichapur') \\land \status = 'Active'}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT * FROM students
WHERE (city = 'Kolkata' OR city = 'Ichapur') AND status = 'Active';`}
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
                Avoid operator precedence bugs and non-SARGable function wrappers on indexed columns
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
                  <strong className="text-white">1. Missing Parentheses in AND/OR:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>city = 'A' OR city = 'B' AND fee &gt; 5000</code> evaluates AND first, breaking expected business logic.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Non-SARGable Function Wrappers:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE YEAR(admission_date) = 2026</code> disables B-Tree index range scans.
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
                  <strong className="text-white">1. Push Selections Down:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Filter rows at the base table level before executing expensive multi-table joins.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Explicit Parentheses Grouping:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use parentheses around disjunctive clauses: <code>(city = 'A' OR city = 'B') AND ...</code>
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
              <span>Selection (σ) is a unary horizontal filtering operator: `σ_p(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Degree is preserved: `Degree(σ_p(R)) = Degree(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Cardinality is bounded: `0 ≤ |σ_p(R)| ≤ |R|`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Commutative Property: `σ_p1(σ_p2(R)) ≡ σ_p2(σ_p1(R)) ≡ σ_(p1 ∧ p2)(R)`</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Push selections down in query trees to reduce intermediate join sizes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Maps directly to the SQL `WHERE` clause</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Selection Operator (σ) – FAQs"
            questions={questions}
            subtitle="Master horizontal relation filtering, complex boolean predicates, algebraic commutativity, SARGable SQL WHERE clauses, and selection push-down optimization with 30 comprehensive Q&As"
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
            title="Relational Algebra Core Operations: Selection Operator (σ) with Complex Predicates"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_selection_operator_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Selection operator ($\\sigma$) is the scalpel of relational algebra! " +
              "In my classes in Barrackpore, I teach students that Selection is purely horizontal—it slices tuples while keeping every single column intact. " +
              "The single most important algebraic law every DBA must know is Selection Push-Down: " +
              "$\\sigma_p(R \\bowtie S) \\equiv \\sigma_p(R) \\bowtie S$. " +
              "When your MySQL query optimizer pushes a WHERE clause down to filter 100,000 rows into 100 rows BEFORE performing a hash join, " +
              "your query execution time drops from 5 seconds to 2 milliseconds. " +
              "Mastering boolean precedence and SARGable predicates is where theory meets raw database performance!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · Selection Operator (σ) · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
