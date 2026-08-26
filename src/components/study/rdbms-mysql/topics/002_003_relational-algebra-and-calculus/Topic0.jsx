import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Introduction to Formal Relational Query Languages & Relational Completeness
 * Module: 002_003_relational-algebra-and-calculus
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Relational Operator Explorer,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Operator State
  const [selectedOp, setSelectedOp] = useState("sigma"); // "sigma" | "pi" | "cross" | "union" | "diff"

  const operators = {
    sigma: {
      symbol: "σ (Selection)",
      type: "Unary Operator (Horizontal Slicing)",
      math: "σ_{city = 'Barrackpore'}(Students)",
      sql: "SELECT * FROM students WHERE city = 'Barrackpore';",
      desc: "Filters tuples (rows) that satisfy a boolean predicate. Leaves attribute schema unchanged.",
      inputData: [
        { id: 101, name: "Mamata Hui", city: "Barrackpore", course: "MySQL Masterclass" },
        { id: 102, name: "Abhronila Das", city: "Barrackpore", course: "React Architect" },
        { id: 103, name: "Debangshu Roy", city: "Kolkata", course: "MySQL Masterclass" },
      ],
      outputData: [
        { id: 101, name: "Mamata Hui", city: "Barrackpore", course: "MySQL Masterclass" },
        { id: 102, name: "Abhronila Das", city: "Barrackpore", course: "React Architect" },
      ],
    },
    pi: {
      symbol: "π (Projection)",
      type: "Unary Operator (Vertical Slicing & Duplicate Elimination)",
      math: "π_{course}(Students)",
      sql: "SELECT DISTINCT course FROM students;",
      desc: "Extracts specified attributes (columns) and eliminates duplicate tuples from the output set.",
      inputData: [
        { id: 101, name: "Mamata Hui", city: "Barrackpore", course: "MySQL Masterclass" },
        { id: 102, name: "Abhronila Das", city: "Barrackpore", course: "React Architect" },
        { id: 103, name: "Debangshu Roy", city: "Kolkata", course: "MySQL Masterclass" },
      ],
      outputData: [
        { course: "MySQL Masterclass" },
        { course: "React Architect" },
      ],
    },
    cross: {
      symbol: "× (Cartesian Product)",
      type: "Binary Operator (Relational Multiplication)",
      math: "Students × Batches",
      sql: "SELECT * FROM students CROSS JOIN batches;",
      desc: "Pairs every tuple of relation R with every tuple of relation S. Output degree = Deg(R)+Deg(S); Cardinality = |R| * |S|.",
      inputData: [
        { id: 101, name: "Mamata" },
        { id: 102, name: "Abhronila" },
      ],
      outputData: [
        { student: "Mamata", batch: "Morning 07:00 AM" },
        { student: "Mamata", batch: "Evening 06:00 PM" },
        { student: "Abhronila", batch: "Morning 07:00 AM" },
        { student: "Abhronila", batch: "Evening 06:00 PM" },
      ],
    },
    union: {
      symbol: "∪ (Set Union)",
      type: "Binary Operator (Combining Compatible Sets)",
      math: "Online_Students ∪ Offline_Students",
      sql: "SELECT student_name FROM online_students UNION SELECT student_name FROM offline_students;",
      desc: "Combines tuples from two union-compatible relations, removing duplicate entries.",
      inputData: [
        { source: "Online", name: "Mamata Hui" },
        { source: "Offline", name: "Debangshu Roy" },
      ],
      outputData: [
        { name: "Mamata Hui" },
        { name: "Abhronila Das" },
        { name: "Debangshu Roy" },
      ],
    },
    diff: {
      symbol: "− (Set Difference)",
      type: "Binary Operator (Relative Complement)",
      math: "All_Students − Fee_Paid_Students",
      sql: "SELECT student_name FROM all_students EXCEPT SELECT student_name FROM fee_paid_students;",
      desc: "Returns tuples that appear in the first relation but NOT in the second relation.",
      inputData: [
        { list: "Enrolled", name: "Mamata, Abhronila, Debangshu" },
        { list: "Paid Fee", name: "Mamata, Abhronila" },
      ],
      outputData: [
        { name: "Debangshu Roy (Pending Payment)" },
      ],
    },
  };

  const active = operators[selectedOp];

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
            Module 002_003 · Relational Algebra &amp; Calculus · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Formal Relational Query Languages &amp;{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Relational Completeness
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Discover the mathematical foundations of database query engines: Procedural Relational Algebra vs Declarative Relational Calculus,
            Codd's Reduction Theorem, the 5 primitive algebraic operators, and relational completeness.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📐 Procedural Relational Algebra (How)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📜 Declarative Relational Calculus (What)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏆 Codd's Reduction Theorem
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ 5 Primitive Operators (σ, π, ×, ∪, −)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Formal Query Languages Taxonomy ─────────── */}
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
                Formal Relational Query Languages Taxonomy
              </h2>
              <p className="text-xs text-slate-400">
                Comparing procedural and declarative paradigms, and the benchmark of relational completeness
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Procedural */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Procedural: Relational Algebra
              </span>
              <p className="text-xs text-slate-300">
                Specifies <strong>WHAT</strong> data to retrieve and <strong>HOW</strong> (the exact step-by-step sequence of operations) to retrieve it.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>Directly maps to physical query execution trees</li>
                <li>Uses mathematical operators: $\sigma, \pi, \times, \cup, -$</li>
                <li>Closure property: Output is always a valid relation</li>
              </ul>
            </div>

            {/* Declarative */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                2. Declarative: Relational Calculus
              </span>
              <p className="text-xs text-slate-300">
                Specifies <strong>WHAT</strong> data is desired without specifying the procedural algorithms or access paths to obtain it.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>Based on First-Order Predicate Logic</li>
                <li>Two variants: Tuple Relational Calculus (TRC) &amp; Domain Relational Calculus (DRC)</li>
                <li>Commercial SQL (<code>SELECT ... FROM ... WHERE</code>) is declarative</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Codd's Theorem & Query Engine Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Codd's Reduction Theorem &amp; Modern SQL Optimization Pipeline
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Codd's Theorem Diagram"
            >
              {/* Declarative SQL */}
              <g transform="translate(20, 20)">
                <rect width="180" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                <rect width="180" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="90" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Declarative SQL Query</text>
                <text x="10" y="42" fill="#cbd5e1">SELECT s.name, c.title</text>
                <text x="10" y="60" fill="#cbd5e1">FROM students s JOIN...</text>
                <text x="10" y="78" fill="#94a3b8" fontSize="9">Specifies "WHAT" (Calculus)</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(210, 60)">
                <path d="M 0,5 L 50,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="50,1 60,5 50,9" fill="#64748b" />
                <text x="25" y="-5" fill="#f59e0b" fontSize="9" textAnchor="middle">Query Parser</text>
              </g>

              {/* Relational Algebra Tree */}
              <g transform="translate(280, 20)">
                <rect width="210" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="210" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="105" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold">Relational Algebra Tree</text>
                <text x="10" y="42" fill="#38bdf8">π_(name, title)</text>
                <text x="10" y="60" fill="#f59e0b">  ⨝_(s.id = e.id)</text>
                <text x="10" y="78" fill="#10b981">    σ_(city = 'Barrackpore')</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(500, 60)">
                <path d="M 0,5 L 50,5" stroke="#64748b" strokeWidth="2" />
                <polygon points="50,1 60,5 50,9" fill="#64748b" />
                <text x="25" y="-5" fill="#818cf8" fontSize="9" textAnchor="middle">Codd's Theorem</text>
              </g>

              {/* Physical Execution */}
              <g transform="translate(560, 20)">
                <rect width="190" height="90" rx="6" fill="#1e293b" stroke="#818cf8" />
                <rect width="190" height="22" rx="6" fill="#0f172a" stroke="#818cf8" />
                <text x="95" y="15" fill="#818cf8" textAnchor="middle" fontWeight="bold">Physical Execution Plan</text>
                <text x="10" y="42" fill="#cbd5e1">1. Index Range Scan (City)</text>
                <text x="10" y="60" fill="#cbd5e1">2. Nested Loop Inner Join</text>
                <text x="10" y="78" fill="#94a3b8" fontSize="9">Evaluates "HOW" (Engine)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Relational Operator Explorer ─ */}
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
                Interactive Relational Operator Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Inspect the 5 primitive relational algebra operators, their mathematical syntax, and equivalent SQL queries
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Operator Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setSelectedOp("sigma")}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOp === "sigma"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                σ Selection
              </button>
              <button
                onClick={() => setSelectedOp("pi")}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOp === "pi"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                π Projection
              </button>
              <button
                onClick={() => setSelectedOp("cross")}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOp === "cross"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                × Cross Product
              </button>
              <button
                onClick={() => setSelectedOp("union")}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOp === "union"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                ∪ Set Union
              </button>
              <button
                onClick={() => setSelectedOp("diff")}
                className={clsx(
                  "py-2 px-2.5 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOp === "diff"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                − Set Difference
              </button>
            </div>

            {/* Active Details Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-base font-bold text-white block">{active.symbol}</span>
                  <span className="text-xs text-slate-400">{active.type}</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  {active.math}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{active.desc}</p>

              {/* SQL Equivalent */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  SQL Translation:
                </span>
                <pre className="rounded-lg bg-slate-900 p-2.5 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                  {active.sql}
                </pre>
              </div>

              {/* Transformation Demonstration */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Set Transformation Result:
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {active.outputData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-1.5 text-cyan-300 font-bold">Row #{idx + 1}</td>
                          <td className="p-1.5 text-white">{JSON.stringify(row)}</td>
                        </tr>
                      ))}
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
                Barrackpore Academy student queries and course enrollment projections
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Academy Student Selection by City
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\sigma_{\city = 'Barrackpore'}(\Students)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Relational Selection in MySQL
SELECT student_id, full_name, email, city
FROM students
WHERE city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Course Enrollment Projection &amp; Natural Join
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {"Relational Algebra: $\\pi_{\full\\_name, course\\_title}(\Students \\bowtie \Enrollments \\bowtie \Courses)$"}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Relational Projection over Multi-Table Join in MySQL
SELECT s.full_name, c.course_title
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;`}
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
                Avoid confusing procedural vs declarative models and forgetting set duplicate elimination
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
                  <strong className="text-white">1. Assuming SQL Tables are Sets:</strong>
                  <p className="text-slate-400 mt-0.5">
                    SQL operates on Multisets (Bags) and preserves duplicates unless <code>DISTINCT</code> is explicitly used.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unsafe Calculus Queries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing formulas with negative scopes (e.g. <code>NOT Student(t)</code>) generates infinite result sets.
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
                  <strong className="text-white">1. Master the 5 Primitive Operators:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Every relational query in existence can be decomposed into combinations of $\sigma, \pi, \times, \cup, -$.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Query Trees for EXPLAIN Analysis:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Visualize MySQL <code>EXPLAIN</code> plans as algebraic trees to understand optimizer join orders.
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
              <span>Relational Algebra is Procedural (How); Relational Calculus is Declarative (What)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Codd's Reduction Theorem proves: Relational Algebra ≡ Safe TRC ≡ Safe DRC</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>5 Primitive Operators: Selection (σ), Projection (π), Cross Product (×), Union (∪), Difference (−)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Theta Join (⨝_θ) is derived as Selection over Cartesian Product: σ_θ(R × S)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Pure Relational Algebra operates on mathematical Sets (automatic duplicate elimination)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>RDBMS query optimizers translate declarative SQL into relational algebra execution plans</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Introduction to Relational Languages & Completeness – FAQs"
            questions={questions}
            subtitle="Master the mathematical foundations of formal relational query languages, procedural vs declarative paradigms, Codd's theorem, and the 5 primitive operators with 30 comprehensive Q&As"
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
            title="Introduction to Formal Relational Query Languages & Relational Completeness"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_formal_relational_languages_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Welcome to Module 002_003: Relational Algebra & Calculus! " +
              "In my classes in Barrackpore, I always tell students that learning SQL without Relational Algebra " +
              "is like learning arithmetic without understanding numbers. " +
              "Dr. E. F. Codd created the Relational Model on pure set theory and predicate logic. " +
              "When you write `SELECT name FROM students WHERE city = 'Barrackpore'`, your MySQL engine parses that declarative statement " +
              "into a relational algebra expression: $\\pi_{\name}(\\sigma_{\city = 'Barrackpore'}(\Students))$. " +
              "Understanding these mathematical operators empowers you to master query optimization, understand EXPLAIN plans, and write blazing-fast queries."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Formal Relational Languages · Module 002_003 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
