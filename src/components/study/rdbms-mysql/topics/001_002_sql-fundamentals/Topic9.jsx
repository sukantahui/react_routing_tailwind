import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Filtering Records using WHERE Clause
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive WHERE filter simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive Filter Sandbox State
  const [selectedCity, setSelectedCity] = useState("all");
  const [minFee, setMinFee] = useState(15000);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "inactive"

  const dataset = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000, active: 1 },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500, active: 1 },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 15000, active: 1 },
    { id: 104, name: "Debangshu Roy", city: "Kolkata", fee: 20000, active: 0 },
    { id: 105, name: "Mahima Sengupta", city: "Jadavpur", fee: 18500, active: 1 },
    { id: 106, name: "Rahul Mukherjee", city: "Ichapur", fee: 12000, active: 1 },
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

  // Compute conditions for dynamic SQL string and filtering
  const whereClauses = [];
  if (selectedCity !== "all") whereClauses.push(`city = '${selectedCity}'`);
  if (minFee > 0) whereClauses.push(`admission_fee >= ${minFee}.00`);
  if (statusFilter !== "all") whereClauses.push(`is_active = ${statusFilter === "active" ? 1 : 0}`);

  const generatedSQL = `SELECT student_id, first_name, city, admission_fee\nFROM students\n${
    whereClauses.length > 0 ? `WHERE ${whereClauses.join("\n  AND ")};` : ";"
  }`;

  // Filter dataset
  const filteredData = dataset.filter((row) => {
    if (selectedCity !== "all" && row.city !== selectedCity) return false;
    if (row.fee < minFee) return false;
    if (statusFilter === "active" && row.active !== 1) return false;
    if (statusFilter === "inactive" && row.active !== 0) return false;
    return true;
  });

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
            Module 001_002 · SQL Fundamentals · Topic 9
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Filtering Records with the{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              WHERE Clause
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master relational record filtering, Three-Valued Logic (3VL), Sargable B-Tree index scans,
            compound boolean conditions, and safe updates.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 WHERE Predicate Mechanics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Sargable Index Scans
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Three-Valued Logic (3VL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Safe Updates Mode
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: How WHERE Works & Sargability ──────────── */}
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
                How the WHERE Clause Evaluates Rows
              </h2>
              <p className="text-xs text-slate-400">
                Boolean filtering, Three-Valued Logic (TRUE / FALSE / UNKNOWN), and index acceleration
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              The <code>WHERE</code> clause acts as the gatekeeper of SQL queries. Every candidate row is evaluated against the boolean predicate:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">TRUE</span>
                <p className="text-xs text-slate-400">Condition is satisfied; row is retained in the result set.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">FALSE</span>
                <p className="text-xs text-slate-400">Condition fails; row is immediately rejected.</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">UNKNOWN (NULL)</span>
                <p className="text-xs text-slate-400">Incomplete data; treated like FALSE and rejected by WHERE.</p>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Full Table Scan vs B-Tree Range Lookup ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Non-Sargable (Full Scan) vs Sargable (B-Tree Index Seek)
            </h3>
            <svg
              viewBox="0 0 780 180"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Sargability Diagram"
            >
              {/* Left: Non-Sargable */}
              <g transform="translate(30, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ Non-Sargable: WHERE YEAR(dob) = 2005
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" fontSize="10">• Function YEAR() wraps the indexed column</text>
                <text x="20" y="78" fill="#cbd5e1" fontSize="10">• MySQL must compute YEAR() on all 1M rows</text>
                <text x="20" y="98" fill="#cbd5e1" fontSize="10">• Index CANNOT be used (Full Table Scan: ALL)</text>
                <text x="20" y="122" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ 100% CPU spike & disk thrashing</text>
              </g>

              {/* Right: Sargable */}
              <g transform="translate(410, 20)">
                <rect width="340" height="140" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ Sargable: WHERE dob &gt;= '2005-01-01'
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="58" fill="#cbd5e1" fontSize="10">• Plain indexed column compared to literal string</text>
                <text x="20" y="78" fill="#cbd5e1" fontSize="10">• B-Tree navigates directly to root -&gt; leaf</text>
                <text x="20" y="98" fill="#cbd5e1" fontSize="10">• Executes in O(log N) micro-seconds (type: range)</text>
                <text x="20" y="122" fill="#10b981" fontWeight="bold" fontSize="10">✓ Lightning-fast index range seek</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive WHERE Filter Simulator ─────── */}
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
                Interactive WHERE Filtering Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Adjust criteria and observe live SQL query generation alongside instant record filtering
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  City Filter:
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                >
                  <option value="all">All Cities</option>
                  <option value="Barrackpore">Barrackpore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Jadavpur">Jadavpur</option>
                  <option value="Ichapur">Ichapur</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Minimum Fee (₹):
                  </label>
                  <span className="text-xs font-mono text-teal-400 font-bold">
                    ₹{minFee.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="20000"
                  step="1000"
                  value={minFee}
                  onChange={(e) => setMinFee(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Enrollment Status:
                </label>
                <div className="flex gap-2">
                  {["all", "active", "inactive"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={clsx(
                        "flex-1 py-1.5 text-xs font-bold uppercase rounded-lg border transition-all",
                        statusFilter === st
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated SQL & Filtered Grid */}
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
                    Filtered Result Set:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {filteredData.length} row(s) matched
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">{row.id}</td>
                          <td className="p-2 font-sans font-medium text-white">{row.name}</td>
                          <td className="p-2 text-indigo-400">{row.city}</td>
                          <td className="p-2 text-emerald-400">₹{row.fee.toLocaleString("en-IN")}.00</td>
                          <td className="p-2">
                            {row.active ? (
                              <span className="text-teal-400 font-bold">Active</span>
                            ) : (
                              <span className="text-rose-400 font-bold">Inactive</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-slate-500 italic">
                            No records match the active WHERE filter.
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
                Real-World Production WHERE Filtering (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Production-ready queries from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Admissions Filter
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all enrolled computer science students in Barrackpore with tuition fees exceeding ₹15,000.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    admission_fee AS "Tuition (₹)",
    city
FROM students
WHERE city = 'Barrackpore'
  AND is_active = 1
  AND admission_fee >= 15000.00;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata High-Value E-Commerce Orders
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracting pending high-value orders placed during August 2026 using sargable range boundaries.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    order_number,
    customer_id,
    total_amount AS "Order Value (₹)",
    order_status
FROM customer_orders
WHERE order_status = 'pending'
  AND total_amount >= 25000.00
  AND order_date >= '2026-08-01 00:00:00'
  AND order_date < '2026-09-01 00:00:00';`}
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
                Critical rules to keep queries lightning-fast and avoid catastrophic data loss
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
                  <strong className="text-white">1. Comparing with NULL using =:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>WHERE phone_no = NULL</code> always returns 0 rows. Use <code>IS NULL</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unfiltered UPDATE / DELETE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting <code>WHERE</code> modifies or deletes every single row in the table!
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
                  <strong className="text-white">1. Index Filtered Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure foreign keys, status flags, and search columns have supporting B-Tree indexes.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Enable Safe Updates Mode:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Set <code>sql_safe_updates = 1</code> in development tools to block accidental table-wide writes.
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
              <span><code>WHERE</code> retains only rows that evaluate strictly to <code>TRUE</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use <code>IS NULL</code> / <code>IS NOT NULL</code> for missing values</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>AND</code> has higher operator precedence than <code>OR</code> (use parentheses)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Keep conditions sargable (never wrap indexed columns in functions)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Verify index usage with <code>EXPLAIN SELECT ...</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never run <code>UPDATE</code> or <code>DELETE</code> without a verified <code>WHERE</code> clause</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="WHERE Clause Filtering – FAQs"
            questions={questions}
            subtitle="Master query filtering, sargability, Three-Valued Logic, and index optimization with 30 comprehensive Q&As"
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
            title="Filtering Records using WHERE Clause"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_where_clause_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The `WHERE` clause is where query performance is won or lost. In my classes in Barrackpore, " +
              "I teach students that writing `WHERE YEAR(admission_date) = 2026` might seem harmless on a small lab dataset of 10 rows, " +
              "but on an enterprise database with 50 million records, it will lock the CPU and crash your server by forcing a full table scan. " +
              "Always write sargable conditions (`WHERE admission_date >= '2026-01-01' AND admission_date < '2027-01-01'`) so MySQL can traverse " +
              "the B-Tree index in microseconds. Write clean, index-friendly filters from day one!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 9 · WHERE Clause Filtering · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;
