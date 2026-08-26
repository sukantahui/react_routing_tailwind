import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Handling NULL Values with IS NULL and IS NOT NULL
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive NULL Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic15 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [nullFilter, setNullFilter] = useState("all"); // "all", "is_null", "is_not_null"
  const [useCoalesce, setUseCoalesce] = useState(false);
  const [fallbackPhone, setFallbackPhone] = useState("Not Provided");

  const dataset = [
    { id: 101, name: "Mamata Hui", email: "mamata@codernaccotax.in", phone: "9830012345", fee: 15000 },
    { id: 102, name: "Abhronila Das", email: "abhronila@gmail.com", phone: null, fee: 18500 },
    { id: 103, name: "Susmita Ghosh", email: null, phone: "9830067890", fee: 15000 },
    { id: 104, name: "Debangshu Roy", email: "debangshu@fintech.co.in", phone: null, fee: 20000 },
    { id: 105, name: "Mahima Sengupta", email: "mahima@jadavpur.edu", phone: "9830099999", fee: 18500 },
    { id: 106, name: "Rahul Mukherjee", email: null, phone: null, fee: 12000 },
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

  // Filter evaluation
  const filteredData = dataset.filter((s) => {
    if (nullFilter === "is_null") return s.phone === null;
    if (nullFilter === "is_not_null") return s.phone !== null;
    return true;
  });

  let generatedSQL = "";
  const phoneProjection = useCoalesce
    ? `COALESCE(phone_no, '${fallbackPhone}') AS contact_phone`
    : "phone_no";

  if (nullFilter === "all") {
    generatedSQL = `SELECT student_id, first_name, ${phoneProjection}\nFROM students;`;
  } else if (nullFilter === "is_null") {
    generatedSQL = `SELECT student_id, first_name, ${phoneProjection}\nFROM students\nWHERE phone_no IS NULL;`;
  } else {
    generatedSQL = `SELECT student_id, first_name, ${phoneProjection}\nFROM students\nWHERE phone_no IS NOT NULL;`;
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
            Module 001_002 · SQL Fundamentals · Topic 15
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Handling NULL Values with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              IS NULL & COALESCE
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational missing data, Three-Valued Logic (3VL), NULL-Safe comparisons,
            COALESCE fallback cascades, and division-by-zero protection with NULLIF.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 IS NULL & IS NOT NULL
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌊 COALESCE Fallback Cascades
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ NULLIF Safe Division
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Three-Valued Logic (3VL)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: What is NULL & 3VL Mechanics ───────────── */}
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
                Understanding NULL & Three-Valued Logic (3VL)
              </h2>
              <p className="text-xs text-slate-400">
                Why NULL is not zero or empty string, and why standard comparison operators fail
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In relational database theory, <code>NULL</code> is a marker indicating <strong>missing, unassigned, or inapplicable information</strong>.
              Because its value is unknown, comparing anything with NULL yields <code>UNKNOWN</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
                <span className="font-mono font-bold text-rose-400 block mb-1">❌ NULL = NULL</span>
                <p className="text-slate-400">Evaluates to UNKNOWN (rejected by WHERE). Standard equality fails.</p>
              </div>
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
                <span className="font-mono font-bold text-teal-400 block mb-1">✅ col IS NULL</span>
                <p className="text-slate-400">Evaluates to TRUE if value is missing. The official ANSI check.</p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
                <span className="font-mono font-bold text-cyan-400 block mb-1">🌊 COALESCE(col, 'N/A')</span>
                <p className="text-slate-400">Supplies a clean fallback replacement if column is NULL.</p>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: COALESCE Fallback Pipeline ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The COALESCE(mobile, landline, 'No Phone') Fallback Waterfall
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="COALESCE Fallback Diagram"
            >
              {/* Step 1 */}
              <g transform="translate(30, 20)">
                <rect width="210" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" />
                <text x="105" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">1. mobile_no</text>
                <text x="105" y="50" fill="#94a3b8" textAnchor="middle" fontSize="10">Value: NULL</text>
                <text x="105" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="10">➡️ Skip to Next</text>
              </g>

              {/* Step 2 */}
              <g transform="translate(285, 20)">
                <rect width="210" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" />
                <text x="105" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">2. landline_no</text>
                <text x="105" y="50" fill="#94a3b8" textAnchor="middle" fontSize="10">Value: NULL</text>
                <text x="105" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="10">➡️ Skip to Next</text>
              </g>

              {/* Step 3 */}
              <g transform="translate(540, 20)">
                <rect width="210" height="85" rx="6" fill="#1e293b" stroke="#10b981" />
                <text x="105" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">3. 'No Phone'</text>
                <text x="105" y="50" fill="#10b981" textAnchor="middle" fontSize="10">Non-Null Literal!</text>
                <text x="105" y="70" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">✓ Returned Value</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive NULL Sandbox ───────────────── */}
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
                Interactive NULL Filtering & COALESCE Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Filter by missing phone numbers and test dynamic COALESCE fallback substitution
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Filter By Nullability:
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "all", label: "All Rows" },
                    { id: "is_null", label: "IS NULL (Missing)" },
                    { id: "is_not_null", label: "IS NOT NULL" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setNullFilter(btn.id)}
                      className={clsx(
                        "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                        nullFilter === btn.id
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    &gt;
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCoalesce}
                    onChange={(e) => setUseCoalesce(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-teal-500"
                  /&gt;
                  <span><strong>Apply COALESCE():</strong> Replace NULL phone with custom fallback</span>
                </label>
              </div>

              {useCoalesce && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Fallback Replacement Text:
                  </label>
                  <input
                    type="text"
                    value={fallbackPhone}
                    onChange={(e) => setFallbackPhone(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
              )}
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
                    Matched Records:
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
                        <th className="p-2">Contact Phone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {filteredData.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2">
                            {s.phone !== null ? (
                              <span className="text-emerald-400">{s.phone}</span>
                            ) : useCoalesce ? (
                              <span className="text-amber-400 italic font-sans">{fallbackPhone}</span>
                            ) : (
                              <span className="text-rose-400 italic bg-rose-500/10 px-1.5 py-0.5 rounded text-[10px]">
                                NULL
                              </span>
                            )}
                          </td>
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
                Missing data handling applications from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Finding Incomplete Student Contact Profiles in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all enrolled students with missing emails or unassigned phone numbers for administrative follow-up.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    COALESCE(email, '⚠️ Missing Email') AS student_email,
    COALESCE(phone_no, '⚠️ Missing Phone') AS student_phone
FROM students
WHERE email IS NULL OR phone_no IS NULL;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Safe Financial Metric Division in Kolkata E-Commerce
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Analytics</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Computing average transaction value safely using NULLIF to eliminate division-by-zero crashes.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    category_id,
    SUM(total_revenue) AS "Total Revenue (₹)",
    COUNT(order_id) AS total_orders,
    ROUND(SUM(total_revenue) / NULLIF(COUNT(order_id), 0), 2) AS "Avg Order Value (₹)"
FROM order_summary
GROUP BY category_id;`}
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
                Avoid subtle three-valued logic failures and arithmetic errors
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
                  <strong className="text-white">1. Writing WHERE col = NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always yields UNKNOWN and returns 0 rows. Use <code>IS NULL</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Arithmetic with NULL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>100 + NULL</code> evaluates to NULL. Wrap in <code>COALESCE(col, 0)</code>.
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
                  <strong className="text-white">1. Use COALESCE for Fallbacks:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Guarantees non-null string outputs for frontend UI components.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Prevent Div/Zero with NULLIF:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>total / NULLIF(qty, 0)</code> returns NULL safely instead of erroring.
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
              <span><code>NULL</code> represents missing data, not zero or empty string</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use <code>IS NULL</code> and <code>IS NOT NULL</code> to test nullability</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>COALESCE(a, b, c)</code> returns the first non-null expression</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aggregate functions (<code>SUM</code>, <code>AVG</code>, <code>COUNT(col)</code>) ignore NULLs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>NULLIF(x, 0)</code> to gracefully prevent division-by-zero crashes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ORDER BY col ASC</code> places NULLs first in MySQL by default</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Handling NULL Values – FAQs"
            questions={questions}
            subtitle="Master relational nullability, COALESCE cascades, and Three-Valued Logic with 30 comprehensive Q&As"
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
            title="Handling NULL Values with IS NULL and IS NOT NULL"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic15_handling_null_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding `NULL` is the true rite of passage for every SQL developer. In my classes in Barrackpore, " +
              "I remind students: NULL is not a value; it is the state of a value being unknown. Because it is unknown, " +
              "the math `NULL = NULL` is not true—it is unknown. Always use `IS NULL` to check for missing records, and " +
              "always wrap your presentation layers in `COALESCE(col, 'Default')` so your frontend applications never " +
              "render blank empty boxes or crash on unexpected null pointer exceptions."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 15 · Handling NULL Values · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic15;
