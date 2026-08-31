import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – List Membership with IN and NOT IN
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive IN/NOT IN Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [selectedCities, setSelectedCities] = useState({
    Barrackpore: true,
    Kolkata: true,
    Ichapur: false,
    Jadavpur: false,
  });
  const [isNotIn, setIsNotIn] = useState(false);

  const dataset = [
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

  const handleToggleCity = (c) => {
    setSelectedCities({ ...selectedCities, [c]: !selectedCities[c] });
  };

  const activeCitiesList = Object.keys(selectedCities).filter((c) => selectedCities[c]);

  // Compute live match
  const isMatch = (city) => {
    if (activeCitiesList.length === 0) return false;
    const inList = activeCitiesList.includes(city);
    return isNotIn ? !inList : inList;
  };

  const filteredData = dataset.filter((s) => isMatch(s.city));

  const listFormatted = activeCitiesList.map((c) => `'${c}'`).join(", ");
  const generatedSQL =
    activeCitiesList.length > 0
      ? `SELECT student_id, first_name, city, admission_fee\nFROM students\nWHERE city ${
          isNotIn ? "NOT IN" : "IN"
        } (${listFormatted});`
      : `-- Please select at least one city in the filter controls`;

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
            Module 001_002 · SQL Fundamentals · Topic 13
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            List Membership with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              IN and NOT IN
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master discrete set membership, internal binary search optimizations, composite tuple matching,
            subquery semi-joins, and the catastrophic NOT IN with NULL trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📋 IN Set Membership
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 NOT IN Exclusion
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ The NULL Failure Trap
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Row Constructor Tuples
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Set Membership & The NULL Trap ─────────── */}
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
                How IN Evaluates Sets (And Why NOT IN Breaks with NULLs)
              </h2>
              <p className="text-xs text-slate-400">
                Binary search on sorted lists, tuple matching, and the critical Three-Valued Logic NULL gotcha
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              The <code>IN</code> operator replaces long, cumbersome chains of <code>OR</code> conditions.
              Internally, MySQL sorts constant lists and performs an <strong>O(log N) binary search</strong> in memory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Standard Set Match: IN (...)
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  Retains rows matching any item in the discrete list.
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                  WHERE city IN ('Barrackpore', 'Kolkata');
                </pre>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  The NOT IN with NULL Trap
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  If the list contains <code>NULL</code>, NOT IN always returns 0 rows!
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                  -- DANGEROUS: If subquery has NULL, returns 0 rows!
                  WHERE id NOT IN (SELECT id FROM t);
                </pre>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: NOT IN Trap vs NOT EXISTS ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The NOT IN NULL Collapse vs Safe NOT EXISTS Anti-Join
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="NOT IN with NULL Trap Diagram"
            >
              {/* Trap */}
              <g transform="translate(30, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ NOT IN (101, 102, NULL)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace" fontSize="10">
                  id &lt;&gt; 101 AND id &lt;&gt; 102 AND id &lt;&gt; NULL
                </text>
                <text x="20" y="74" fill="#f43f5e" fontSize="10">
                  • id &lt;&gt; NULL evaluates to UNKNOWN
                </text>
                <text x="20" y="94" fill="#f43f5e" fontWeight="bold" fontSize="10">
                  ⚠️ Entire query silently returns 0 rows!
                </text>
              </g>

              {/* Fix */}
              <g transform="translate(410, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ Safe NOT EXISTS Pattern
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace" fontSize="10">
                  WHERE NOT EXISTS (SELECT 1 FROM ...)
                </text>
                <text x="20" y="74" fill="#10b981" fontSize="10">
                  • Evaluates row existence directly (immune to NULLs)
                </text>
                <text x="20" y="94" fill="#10b981" fontWeight="bold" fontSize="10">
                  ✓ Enterprise anti-join best practice
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive IN Sandbox ─────────────────── */}
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
                Interactive IN / NOT IN Query Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select target cities, toggle negation, and observe live query building and row filtering
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Cities for Set Membership:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(selectedCities).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleToggleCity(c)}
                      className={clsx(
                        "py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all flex items-center justify-between",
                        selectedCities[c]
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      <span>{c}</span>
                      <span>{selectedCities[c] ? "✓" : "+"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotIn}
                    onChange={(e) => setIsNotIn(e.target.checked)}
                    className="rounded border-rose-600 bg-slate-800 text-rose-500"
                  />
                  <span><strong>Toggle NOT IN:</strong> Exclude students residing in selected cities</span>
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
                    {filteredData.length} of {dataset.length} student(s) match
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
                          <td className="p-2 text-teal-400 font-bold">✓ Matched</td>
                        </tr>
                      ))}
                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-slate-500 italic">
                            No students match the current IN/NOT IN criteria.
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
                Discrete set filtering applications from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Metropolitan Region Student Batch Query
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore, Kolkata, Ichapur</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracting students residing across major transit zones in North 24 Parganas and Kolkata.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    city,
    admission_fee AS "Tuition (₹)"
FROM students
WHERE city IN ('Barrackpore', 'Kolkata', 'Ichapur')
ORDER BY city, first_name;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Finding Unsold Warehouse Products (Safe Anti-Join)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Warehouse</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all catalog products that have zero orders using NULL-safe NOT EXISTS.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    product_id,
    product_name,
    stock_quantity,
    unit_price AS "Price (₹)"
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id
);`}
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
                Critical rules when working with set membership operators
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
                  <strong className="text-white">1. NOT IN with Nullable Subqueries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Returns 0 rows if any child record contains NULL. Always use <code>NOT EXISTS</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Giant IN Lists (&gt; 1,000 items):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Exhausts query buffers. Use a temporary table with an indexed JOIN instead.
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
                  <strong className="text-white">1. Use IN Instead of Chained ORs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Cleaner syntax and faster binary search execution on sorted constant lists.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Leverage Composite Tuples:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Match composite keys: <code>WHERE (student_id, course_id) IN ((1, 10), (2, 20))</code>.
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
              <span><code>IN</code> evaluates discrete set membership with in-memory binary search</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>NOT IN</code> with a NULL value evaluates to UNKNOWN, returning 0 rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always prefer <code>NOT EXISTS</code> for subquery anti-joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Supports composite row constructor tuples: <code>(col1, col2) IN ((v1, v2), ...)</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Optimized via Semi-Join and Hash Materialization in MySQL 8.0</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Avoid passing massive arrays (over 1,000 items) directly in SQL text</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="List Membership with IN & NOT IN – FAQs"
            questions={questions}
            subtitle="Master discrete set filtering, subquery semi-joins, and NULL gotchas with 30 comprehensive Q&As"
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
            title="List Membership with IN and NOT IN"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_in_and_not_in_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The `IN` operator is a staple of everyday database development. In my classes in Barrackpore, " +
              "I frequently warn students about the infamous `NOT IN` subquery trap. If a subquery returns even a single " +
              "`NULL` row (such as a customer with an unassigned manager), `NOT IN` will completely fail and return zero records. " +
              "Make it a habit from day one: use `IN` for positive membership, but whenever you write an anti-join against a subquery, " +
              "reach for `NOT EXISTS`. It is robust, fast, and immune to Three-Valued Logic failures."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · IN and NOT IN · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
