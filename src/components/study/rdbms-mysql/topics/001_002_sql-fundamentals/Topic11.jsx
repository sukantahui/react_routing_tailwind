import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Logical Operators (AND, OR, NOT)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Logical Playground,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [operatorChoice, setOperatorChoice] = useState("AND"); // "AND", "OR", "XOR"
  const [useParentheses, setUseParentheses] = useState(true);
  const [cityFilter, setCityFilter] = useState("Barrackpore");
  const [feeThreshold, setFeeThreshold] = useState(15000);
  const [requireActive, setRequireActive] = useState(true);

  const dataset = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000, active: true },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500, active: true },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 15000, active: true },
    { id: 104, name: "Debangshu Roy", city: "Kolkata", fee: 20000, active: false },
    { id: 105, name: "Mahima Sengupta", city: "Jadavpur", fee: 18500, active: true },
    { id: 106, name: "Rahul Mukherjee", city: "Ichapur", fee: 12000, active: true },
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

  // Compute live logic
  const isMatch = (row) => {
    const condCity = row.city === cityFilter;
    const condFee = row.fee >= feeThreshold;
    const condActive = requireActive ? row.active : true;

    if (operatorChoice === "AND") {
      return condCity && condFee && condActive;
    } else if (operatorChoice === "OR") {
      if (useParentheses) {
        return (condCity || condFee) && condActive;
      } else {
        // Without parentheses: condCity OR (condFee AND condActive)
        return condCity || (condFee && condActive);
      }
    } else if (operatorChoice === "XOR") {
      return (condCity ? 1 : 0) ^ (condFee ? 1 : 0) ? condActive : false;
    }
    return true;
  };

  const filteredData = dataset.filter((r) => isMatch(r));

  // Build generated SQL representation
  let generatedSQL = "";
  if (operatorChoice === "AND") {
    generatedSQL = `SELECT * FROM students\nWHERE city = '${cityFilter}'\n  AND admission_fee >= ${feeThreshold}.00\n  AND is_active = ${
      requireActive ? 1 : 0
    };`;
  } else if (operatorChoice === "OR") {
    if (useParentheses) {
      generatedSQL = `SELECT * FROM students\nWHERE (city = '${cityFilter}' OR admission_fee >= ${feeThreshold}.00)\n  AND is_active = ${
        requireActive ? 1 : 0
      };`;
    } else {
      generatedSQL = `SELECT * FROM students\nWHERE city = '${cityFilter}'\n   OR admission_fee >= ${feeThreshold}.00 AND is_active = ${
        requireActive ? 1 : 0
      }; -- ⚠️ AND executes first!`;
    }
  } else {
    generatedSQL = `SELECT * FROM students\nWHERE (city = '${cityFilter}' XOR admission_fee >= ${feeThreshold}.00)\n  AND is_active = ${
      requireActive ? 1 : 0
    };`;
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
            Module 001_002 · SQL Fundamentals · Topic 11
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Logical Operators{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              (AND, OR, NOT, XOR)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master compound boolean filtering, operator precedence hierarchies, Three-Valued Logic
            truth tables, and De Morgan's simplification laws.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 AND Intersection
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔀 OR Union & XOR Parity
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 NOT Inversion
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Parentheses Precedence
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Venn Diagrams & Boolean Mechanics ──────── */}
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
                Boolean Set Theory & Precedence
              </h2>
              <p className="text-xs text-slate-400">
                Understanding intersections, unions, and why AND executes before OR
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: AND */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                AND (Intersection)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Returns TRUE only if <strong>BOTH</strong> conditions are satisfied. Narrows result sets.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                WHERE city = 'Barrackpore' AND fee &gt;= 15000;
              </pre>
            </div>

            {/* Card 2: OR */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                OR (Union)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Returns TRUE if <strong>EITHER</strong> condition is satisfied. Widens result sets.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                WHERE city = 'Barrackpore' OR city = 'Kolkata';
              </pre>
            </div>

            {/* Card 3: NOT */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                NOT (Inversion)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Inverts the boolean outcome. Excludes matching records.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                WHERE NOT (city = 'Kolkata');
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Venn Diagram Set Theory ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Venn Diagram Set Theory (AND vs OR vs XOR)
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Venn Diagrams for Logical Operators"
            >
              {/* AND */}
              <g transform="translate(30, 15)">
                <rect width="220" height="130" rx="8" fill="#1e293b" stroke="#14b8a6" />
                <text x="110" y="22" fill="#14b8a6" textAnchor="middle" fontWeight="bold">A AND B (Intersection)</text>
                <circle cx="85" cy="75" r="35" fill="#0f172a" stroke="#64748b" opacity="0.6" />
                <circle cx="135" cy="75" r="35" fill="#0f172a" stroke="#64748b" opacity="0.6" />
                {/* Intersection slice */}
                <path d="M 110 49 A 35 35 0 0 1 110 101 A 35 35 0 0 1 110 49" fill="#14b8a6" />
                <text x="110" y="125" fill="#94a3b8" textAnchor="middle" fontSize="10">Both Must Be True</text>
              </g>

              {/* OR */}
              <g transform="translate(280, 15)">
                <rect width="220" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="110" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A OR B (Union)</text>
                <circle cx="85" cy="75" r="35" fill="#0284c7" stroke="#38bdf8" opacity="0.7" />
                <circle cx="135" cy="75" r="35" fill="#0284c7" stroke="#38bdf8" opacity="0.7" />
                <text x="110" y="125" fill="#94a3b8" textAnchor="middle" fontSize="10">Either Or Both True</text>
              </g>

              {/* XOR */}
              <g transform="translate(530, 15)">
                <rect width="220" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" />
                <text x="110" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold">A XOR B (Exclusive OR)</text>
                <circle cx="85" cy="75" r="35" fill="#b45309" stroke="#f59e0b" opacity="0.7" />
                <circle cx="135" cy="75" r="35" fill="#b45309" stroke="#f59e0b" opacity="0.7" />
                {/* Cut out center */}
                <path d="M 110 49 A 35 35 0 0 1 110 101 A 35 35 0 0 1 110 49" fill="#1e293b" />
                <text x="110" y="125" fill="#94a3b8" textAnchor="middle" fontSize="10">One True, But Not Both</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Logical Operator Sandbox ───── */}
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
                Interactive Logical Operator & Precedence Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test compound expressions, toggle grouping parentheses, and inspect live matching rows
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Logical Operator:
                </label>
                <div className="flex gap-2">
                  {["AND", "OR", "XOR"].map((op) => (
                    <button
                      key={op}
                      onClick={() => setOperatorChoice(op)}
                      className={clsx(
                        "flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all border",
                        operatorChoice === op
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {operatorChoice === "OR" && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <label className="flex items-center gap-2 text-xs text-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useParentheses}
                      onChange={(e) => setUseParentheses(e.target.checked)}
                      className="rounded border-amber-600 bg-slate-800 text-amber-500"
                    />
                    <span><strong>Group OR in Parentheses:</strong> <code>(city OR fee) AND active</code></span>
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    City Condition:
                  </label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Barrackpore">Barrackpore</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Jadavpur">Jadavpur</option>
                    <option value="Ichapur">Ichapur</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Fee &gt;= Threshold:
                  </label>
                  <select
                    value={feeThreshold}
                    onChange={(e) => setFeeThreshold(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value={12000}>₹12,000</option>
                    <option value={15000}>₹15,000</option>
                    <option value={18000}>₹18,000</option>
                    <option value={20000}>₹20,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireActive}
                    onChange={(e) => setRequireActive(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-teal-500"
                  />
                  <span>Enforce <code>AND is_active = 1</code> (Enrolled Students Only)</span>
                </label>
              </div>
            </div>

            {/* Generated SQL & Filter Output */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Matched Students:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {filteredData.length} row(s) returned
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {filteredData.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-indigo-400">{s.city}</td>
                          <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                          <td className="p-2">
                            {s.active ? (
                              <span className="text-teal-400">Active</span>
                            ) : (
                              <span className="text-rose-400">Inactive</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-slate-500 italic">
                            No students match the active compound condition.
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
                Compound boolean logic from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Scholarship Eligibility Query
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore & Ichapur</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding active enrolled students living in Barrackpore or Ichapur who pay standard tuition fees.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    city,
    admission_fee AS "Tuition (₹)"
FROM students
WHERE (city = 'Barrackpore' OR city = 'Ichapur')
  AND is_active = 1
  AND admission_fee <= 15000.00;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Fraud Prevention Rule
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Flagging high-value unfulfilled orders using compound NOT and OR operators.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    order_number,
    customer_id,
    total_amount AS "Order Total (₹)",
    order_status
FROM customer_orders
WHERE (order_status = 'pending' OR order_status = 'processing')
  AND total_amount >= 50000.00
  AND NOT (payment_method = 'COD');`}
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
                Prevent boolean logic bugs and ensure consistent query behavior
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
                  <strong className="text-white">1. Missing Parentheses in OR Groups:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>A OR B AND C</code> evaluates as <code>A OR (B AND C)</code>, inadvertently bypassing condition C for A.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Inverting Negations Improperly:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Violating De Morgan's laws when refactoring complex NOT clauses.
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
                  <strong className="text-white">1. Group Sub-Clauses Explicitly:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>( ... )</code> to make logical evaluation order explicit and unambiguous.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use IN Instead of Chained ORs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Write <code>WHERE city IN ('Barrackpore', 'Kolkata')</code> instead of multiple OR comparisons.
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
              <span><code>AND</code> requires ALL conditions to be TRUE</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>OR</code> requires AT LEAST ONE condition to be TRUE</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>NOT</code> inverts boolean truth values</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>AND</code> takes operator precedence over <code>OR</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always group compound <code>OR</code> conditions with parentheses <code>( ... )</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>IN (...)</code> to simplify multiple OR conditions cleanly</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Logical Operators (AND, OR, NOT) – FAQs"
            questions={questions}
            subtitle="Master compound boolean filtering, operator precedence, and truth tables with 30 comprehensive Q&As"
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
            title="Logical Operators (AND, OR, NOT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_logical_operators_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Compound boolean conditions are where subtle logic bugs hide in production software. In my classes " +
              "in Barrackpore, I have seen developers accidentally expose private user records simply because they forgot " +
              "a set of parentheses around an `OR` clause, causing `AND` to bind incorrectly. Make it an ironclad rule in your " +
              "engineering workflow: whenever you mix `AND` and `OR` in the same query, ALWAYS wrap your `OR` groups in parentheses `( ... )`. " +
              "It guarantees correct query logic and protects your application from catastrophic security and reporting errors."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · Logical Operators · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
