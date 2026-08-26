import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Range Filtering with BETWEEN ... AND
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Range Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Range Sandbox State
  const [minBound, setMinBound] = useState(14000);
  const [maxBound, setMaxBound] = useState(19000);
  const [isNegated, setIsNegated] = useState(false);

  const dataset = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000 },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500 },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 14000 },
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

  // Evaluate Range
  const isMatch = (fee) => {
    const inRange = fee &ge; minBound && fee &le; maxBound;
    return isNegated ? !inRange : inRange;
  };

  const filteredData = dataset.filter((s) => isMatch(s.fee));
  const generatedSQL = `SELECT student_id, first_name, city, admission_fee\nFROM students\nWHERE admission_fee ${
    isNegated ? "NOT BETWEEN" : "BETWEEN"
  } ${minBound}.00 AND ${maxBound}.00;`;

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
            Module 001_002 · SQL Fundamentals · Topic 12
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Range Filtering with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              BETWEEN ... AND
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master inclusive range testing across numbers, Indian Rupee (₹) amounts, chronological dates,
            and understand the dangerous DATETIME boundary trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📏 Inclusive Range Testing
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 NOT BETWEEN Outliers
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🕒 DATETIME Boundary Trap
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ B-Tree Range Scans
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Mechanics & Number Line ───────────── */}
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
                How BETWEEN ... AND Evaluates Ranges
              </h2>
              <p className="text-xs text-slate-400">
                Inclusive interval semantics and internal query rewriting
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In MySQL, <code>val BETWEEN min AND max</code> is syntactic sugar for <code>val >= min AND val <= max</code>.
              Both boundary values are strictly included.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  BETWEEN min AND max (Inclusive)
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  Retains values from min through max (endpoints included).
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                  WHERE fee BETWEEN 15000 AND 20000;
                </pre>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  NOT BETWEEN min AND max (Exclusive)
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  Equivalent to <code>val &lt; min OR val &gt; max</code>. Outlier filtering.
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300 border border-slate-800">
                  WHERE fee NOT BETWEEN 15000 AND 20000;
                </pre>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: DATETIME Trap vs Open Interval ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The DATETIME Midnight Truncation Trap vs Sargable Open Interval
            </h3>
            <svg
              viewBox="0 0 780 160"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="DATETIME Trap Diagram"
            >
              {/* Box 1: The Trap */}
              <g transform="translate(30, 20)">
                <rect width="340" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ The DATETIME Trap
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace" fontSize="10">
                  WHERE date BETWEEN '2026-08-01' AND '2026-08-31'
                </text>
                <text x="20" y="74" fill="#f43f5e" fontSize="10">
                  • Implicitly converts to '2026-08-31 00:00:00'
                </text>
                <text x="20" y="94" fill="#f43f5e" fontSize="10">
                  • Drops all transactions placed on Aug 31 after midnight!
                </text>
              </g>

              {/* Box 2: The Solution */}
              <g transform="translate(410, 20)">
                <rect width="340" height="120" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ Sargable Open Interval Solution
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" font-family="monospace" fontSize="10">
                  WHERE date >= '2026-08-01' AND date &lt; '2026-09-01'
                </text>
                <text x="20" y="74" fill="#10b981" fontSize="10">
                  • Cleanly includes all 24 hours of August 31st (up to 23:59:59)
                </text>
                <text x="20" y="94" fill="#10b981" fontSize="10">
                  • Fully sargable B-Tree index range seek (type: range)
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Range Sandbox ──────────────── */}
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
                Interactive Range Filtering Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Adjust minimum and maximum boundaries, toggle NOT negation, and observe live matches
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Range Controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Lower Bound (Min Fee):
                  </label>
                  <span className="text-xs font-mono text-teal-400 font-bold">
                    ₹{minBound.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="16000"
                  step="1000"
                  value={minBound}
                  onChange={(e) => setMinBound(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                /&gt;
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Upper Bound (Max Fee):
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    ₹{maxBound.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <input
                  type="range"
                  min="16000"
                  max="22000"
                  step="1000"
                  value={maxBound}
                  onChange={(e) => setMaxBound(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                /&gt;
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNegated}
                    onChange={(e) => setIsNegated(e.target.checked)}
                    className="rounded border-rose-600 bg-slate-800 text-rose-500"
                  /&gt;
                  <span><strong>Use NOT BETWEEN:</strong> Select outlier records outside [₹{minBound.toLocaleString("en-IN")}, ₹{maxBound.toLocaleString("en-IN")}]</span>
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
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">In Range?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {dataset.map((s) => {
                        const matched = isMatch(s.fee);
                        return (
                          <tr key={s.id} className={clsx(matched ? "bg-teal-500/5" : "opacity-40")}>
                            <td className="p-2 text-cyan-400">{s.id}</td>
                            <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                            <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                            <td className="p-2 font-bold">
                              {matched ? (
                                <span className="text-teal-400">✓ In Range</span>
                              ) : (
                                <span className="text-rose-400">✗ Excluded</span>
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
                Range filtering applications from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Mid-Tier Tuition Band Query
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all enrolled students paying tuition fees between ₹14,000 and ₹19,000.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    admission_fee AS "Tuition (₹)"
FROM students
WHERE admission_fee BETWEEN 14000.00 AND 19000.00
ORDER BY admission_fee ASC;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata Q3 Revenue Range Extraction
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracting third-quarter e-commerce transactions using sargable open interval bounds.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    order_number,
    customer_id,
    total_amount AS "Order Total (₹)",
    order_date
FROM customer_orders
WHERE order_date &ge; '2026-07-01 00:00:00'
  AND order_date < '2026-10-01 00:00:00';`}
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
                Prevent range inversion errors and datetime truncation
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
                  <strong className="text-white">1. Inverting Boundaries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>BETWEEN 20000 AND 15000</code> yields 0 rows. Min MUST precede Max.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. DATETIME Midnight Exclusion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>BETWEEN '2026-08-01' AND '2026-08-31'</code> drops Aug 31 daytime events.
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
                  <strong className="text-white">1. Use Open Intervals for Timestamps:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Write <code>>= '2026-08-01' AND &lt; '2026-09-01'</code> for clean calendar month boundaries.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Index Range Scanned Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures MySQL accesses index pages directly in O(log N) range seeks.
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
              <span><code>BETWEEN</code> is strictly INCLUSIVE of both minimum and maximum endpoints</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always place the smaller value first (<code>BETWEEN min AND max</code>)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>NOT BETWEEN</code> filters values outside the inclusive interval</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Avoid <code>BETWEEN</code> on DATETIME with date strings (use open intervals)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Supports B-Tree index range scans (type: <code>range</code> in EXPLAIN)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Works cleanly inside <code>CASE WHEN</code> statements for category bucketing</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Range Filtering with BETWEEN – FAQs"
            questions={questions}
            subtitle="Master inclusive range testing, timestamp handling, and boundary semantics with 30 comprehensive Q&As"
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
            title="Range Filtering with BETWEEN ... AND"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_between_and_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The `BETWEEN` operator is one of the most readable tools in SQL, but it harbors a notorious bug for timestamps. " +
              "In my classroom in Barrackpore, I emphasize to all students: while `BETWEEN` is perfect for integer IDs and decimal " +
              "fees (`BETWEEN 15000 AND 20000`), never use it on `DATETIME` columns when passing date-only strings like `'2026-08-31'`. " +
              "The database truncates it to midnight `00:00:00`, dropping an entire day's worth of transactions. Always use the half-open " +
              "interval `>= '2026-08-01' AND < '2026-09-01'` for bulletproof financial and audit reporting."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · BETWEEN ... AND Ranges · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
