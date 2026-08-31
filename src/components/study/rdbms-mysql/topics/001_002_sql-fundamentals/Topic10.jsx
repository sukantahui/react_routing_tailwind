import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Comparison Operators (=, !=, &lt;&gt;, <, >, <=, >=)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Comparison Playground,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic10 = () => {
  const sectionRefs = useRef([]);

  // Interactive Comparison Sandbox State
  const [operator, setOperator] = useState(">=");
  const [targetFee, setTargetFee] = useState(15000);

  const sampleStudents = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000 },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500 },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 15000 },
    { id: 104, name: "Debangshu Roy", city: "Kolkata", fee: 20000 },
    { id: 105, name: "Mahima Sengupta", city: "Jadavpur", fee: 18500 },
    { id: 106, name: "Rahul Mukherjee", city: "Ichapur", fee: 12000 },
  ];

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

  // Evaluate comparison dynamically
  const evaluateRow = (fee) => {
    switch (operator) {
      case "=":
        return fee === targetFee;
      case "!=":
      case "&lt;&gt;":
        return fee !== targetFee;
      case "<":
        return fee < targetFee;
      case ">":
        return fee > targetFee;
      case "<=":
        return fee <= targetFee;
      case ">=":
        return fee >= targetFee;
      default:
        return true;
    }
  };

  const matchedStudents = sampleStudents.filter((s) => evaluateRow(s.fee));
  const generatedSQL = `SELECT student_id, first_name, city, admission_fee\nFROM students\nWHERE admission_fee ${operator} ${targetFee}.00;`;

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
            Module 001_002 · SQL Fundamentals · Topic 10
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Comparison Operators{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              (=, !=, &lt;&gt;, &lt;, &gt;, &lt;=, &gt;=, &lt;=&gt;)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational comparisons across numbers, currency amounts (₹), text collations,
            chronological dates, and MySQL's NULL-Safe Equal operator.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Equality & Inequality (=, &lt;&gt;, !=)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📈 Magnitude Ranges (&lt;, &gt;, &lt;=, &gt;=)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ NULL-Safe Equal (&lt;=&gt;)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ B-Tree Range Scans
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Comparison Operators Matrix ─────────── */}
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
                The Relational Comparison Operators
              </h2>
              <p className="text-xs text-slate-400">
                Evaluating equality, magnitude, and null-safety in SQL expressions
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs md:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800 font-sans">
                <tr>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Meaning</th>
                  <th className="p-3">Example Expression</th>
                  <th className="p-3">Evaluation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono text-xs">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">=</td>
                  <td className="p-3 font-sans text-slate-300">Equal to</td>
                  <td className="p-3 text-cyan-300">city = 'Barrackpore'</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if operands match; UNKNOWN if either is NULL.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">&lt;&gt; or !=</td>
                  <td className="p-3 font-sans text-slate-300">Not equal to</td>
                  <td className="p-3 text-cyan-300">admission_fee &lt;&gt; 15000.00</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if values differ; excludes NULL rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Strictly greater than</td>
                  <td className="p-3 text-cyan-300">admission_fee &gt; 15000.00</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if left value is strictly larger.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">&gt;=</td>
                  <td className="p-3 font-sans text-slate-300">Greater than or equal to</td>
                  <td className="p-3 text-cyan-300">admission_fee &gt;= 15000.00</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if left value is larger or equal.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">&lt;</td>
                  <td className="p-3 font-sans text-slate-300">Strictly less than</td>
                  <td className="p-3 text-cyan-300">stock_qty &lt; 20</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if left value is strictly smaller.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-teal-400">&lt;=</td>
                  <td className="p-3 font-sans text-slate-300">Less than or equal to</td>
                  <td className="p-3 text-cyan-300">stock_qty &lt;= 20</td>
                  <td className="p-3 font-sans text-slate-400">TRUE if left value is smaller or equal.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-amber-400">&lt;=&gt;</td>
                  <td className="p-3 font-sans text-slate-300">NULL-Safe Equal</td>
                  <td className="p-3 text-amber-300">a &lt;=&gt; b</td>
                  <td className="p-3 font-sans text-amber-200">TRUE if both are NULL! Never returns UNKNOWN.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── Semantic SVG 1: Comparison Logic Flow ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Standard Equality (=) vs NULL-Safe Equality (&lt;=&gt;)
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Comparison Operator Truth Table"
            >
              {/* Box 1: Standard Equal */}
              <g transform="translate(30, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="170" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Standard Equal (=) Operator
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace">100 = 100   -&gt; 1 (TRUE)</text>
                <text x="20" y="74" fill="#cbd5e1" font-family="monospace">100 = 200   -&gt; 0 (FALSE)</text>
                <text x="20" y="94" fill="#f43f5e" font-family="monospace">NULL = NULL -&gt; NULL (UNKNOWN, Rejected!)</text>
              </g>

              {/* Box 2: NULL-Safe Equal */}
              <g transform="translate(410, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" />
                <text x="170" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                  NULL-Safe Equal (&lt;=&gt;) Operator
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace">100 &lt;=&gt; 100   -&gt; 1 (TRUE)</text>
                <text x="20" y="74" fill="#cbd5e1" font-family="monospace">100 &lt;=&gt; NULL  -&gt; 0 (FALSE)</text>
                <text x="20" y="94" fill="#10b981" font-family="monospace">NULL &lt;=&gt; NULL -&gt; 1 (TRUE, Retained!)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Comparison Playground ──────── */}
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
                Interactive Comparison Operator Playground
              </h2>
              <p className="text-xs text-slate-400">
                Select an operator and threshold to inspect live SQL generation and record matching
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Select Comparison Operator:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["=", "&lt;&gt;", ">", ">=", "<", "<="].map((op) => (
                    <button
                      key={op}
                      onClick={() => setOperator(op)}
                      className={clsx(
                        "py-2 rounded-lg text-xs font-mono font-bold transition-all border",
                        operator === op
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Threshold Fee:
                  </label>
                  <span className="text-xs font-mono text-teal-400 font-bold">
                    ₹{targetFee.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="20000"
                  step="1000"
                  value={targetFee}
                  onChange={(e) => setTargetFee(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Live SQL & Matches */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Query:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Matched Records:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {matchedStudents.length} of {sampleStudents.length} students match
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">Evaluation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {sampleStudents.map((s) => {
                        const isMatch = evaluateRow(s.fee);
                        return (
                          <tr key={s.id} className={clsx(isMatch ? "bg-teal-500/5" : "opacity-40")}>
                            <td className="p-2 text-cyan-400">{s.id}</td>
                            <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                            <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                            <td className="p-2 font-bold">
                              {isMatch ? (
                                <span className="text-teal-400">✓ TRUE</span>
                              ) : (
                                <span className="text-rose-400">✗ FALSE</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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
                Practical comparison expressions from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Finding Non-Standard Fee Enrollments in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Identifying students whose admission fee differs from the standard ₹15,000 baseline.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    admission_fee AS "Tuition (₹)"
FROM students
WHERE admission_fee &lt;&gt; 15000.00;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Finding Inventory Alert Threshold in Kolkata E-Commerce
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all warehouse products with stock quantity less than or equal to 20 units.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    sku_code,
    title,
    stock_quantity,
    selling_price AS "Price (₹)"
FROM products
WHERE stock_quantity <= 20;`}
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
                Critical rules when comparing relational values in database queries
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
                  <strong className="text-white">1. Comparing Numbers Stored as Strings:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If stored in VARCHAR, <code>'100' &lt; '20'</code> evaluates to TRUE! Always use INT or DECIMAL.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting Quotes around Dates:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>WHERE date &gt; 2026-08-24</code> performs mathematical subtraction <code>2026-8-24 = 1994</code>.
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
                  <strong className="text-white">1. Use &lt;&gt; for ANSI Standard Portability:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Standardizes inequality across MySQL, PostgreSQL, Oracle, and SQL Server.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use &lt;=&gt; for Nullable Key Comparisons:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Safely compares columns that may contain NULL without writing complex OR logic.
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
              <span><code>=</code> evaluates equality; <code>&lt;&gt;</code> or <code>!=</code> evaluates inequality</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>&lt;=&gt;</code> is MySQL's NULL-safe equal operator (returns 1 for NULL &lt;=&gt; NULL)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Inequality operators (<code>&lt;&gt;</code>) automatically exclude NULL records</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always enclose string and date literals in single quotes: <code>'2026-08-24'</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Range operators (<code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>) perform B-Tree range scans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never compare currency with FLOAT; always use DECIMAL(10, 2)</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Comparison Operators – FAQs"
            questions={questions}
            subtitle="Master relational comparison operators, null-safety, and range scanning with 30 comprehensive Q&As"
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
            title="Comparison Operators (=, !=, &lt;&gt;, <, >, <=, >=)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic10_comparison_operators_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Comparison operators form the logical bedrock of every decision your database makes. In my classes in Barrackpore, " +
              "the number one mistake students make is writing `WHERE city &lt;&gt; 'Kolkata'` and expecting it to include students with " +
              "unassigned (NULL) cities. In relational Three-Valued Logic, comparing any value to NULL yields UNKNOWN, silently dropping " +
              "those rows from the result. Always be mindful of NULL handling and leverage MySQL's NULL-safe `<=>` operator when appropriate."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 10 · Comparison Operators · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;
