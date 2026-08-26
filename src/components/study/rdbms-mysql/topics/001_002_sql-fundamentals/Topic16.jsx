import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic16_files/topic16_questions";
import noteText from "./topic16_files/topic16_note.txt?raw";

/**
 * Topic16 – Sorting Query Results with ORDER BY (ASC / DESC)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive ORDER BY Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic16 = () => {
  const sectionRefs = useRef([]);

  // Interactive ORDER BY Sandbox State
  const [primaryCol, setPrimaryCol] = useState("fee"); // "fee", "name", "city", "gpa"
  const [primaryDir, setPrimaryDir] = useState("DESC"); // "ASC", "DESC"
  const [secondaryCol, setSecondaryCol] = useState("name");
  const [secondaryDir, setSecondaryDir] = useState("ASC");

  const dataset = [
    { id: 101, name: "Mamata Hui", city: "Barrackpore", fee: 15000, gpa: 3.9 },
    { id: 102, name: "Abhronila Das", city: "Barrackpore", fee: 18500, gpa: 3.8 },
    { id: 103, name: "Susmita Ghosh", city: "Kolkata", fee: 15000, gpa: 3.7 },
    { id: 104, name: "Debangshu Roy", city: "Kolkata", fee: 20000, gpa: 3.95 },
    { id: 105, name: "Mahima Sengupta", city: "Jadavpur", fee: 18500, gpa: 3.85 },
    { id: 106, name: "Rahul Mukherjee", city: "Ichapur", fee: 12000, gpa: 3.6 },
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

  // Sort logic
  const sortedData = [...dataset].sort((a, b) => {
    // Primary Comparison
    let valA = a[primaryCol];
    let valB = b[primaryCol];

    if (valA < valB) return primaryDir === "ASC" ? -1 : 1;
    if (valA > valB) return primaryDir === "ASC" ? 1 : -1;

    // Secondary Comparison on Tie
    if (secondaryCol && secondaryCol !== primaryCol) {
      let secA = a[secondaryCol];
      let secB = b[secondaryCol];
      if (secA < secB) return secondaryDir === "ASC" ? -1 : 1;
      if (secA > secB) return secondaryDir === "ASC" ? 1 : -1;
    }

    return 0;
  });

  const generatedSQL = `SELECT student_id, first_name, city, admission_fee, gpa\nFROM students\nORDER BY ${primaryCol} ${primaryDir}${
    secondaryCol !== primaryCol ? `, ${secondaryCol} ${secondaryDir}` : ""
  };`;

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
            Module 001_002 · SQL Fundamentals · Topic 16
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Sorting Query Results with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              ORDER BY (ASC / DESC)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master multi-column hierarchical sorting, B-Tree index traversal vs memory filesorts,
            sorting on computed expressions & aliases, and custom business ordering with FIELD().
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔼 ASC (Ascending)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔽 DESC (Descending)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Indexed Sorts vs Filesort
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Custom FIELD() Priorities
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Core Mechanics & Filesort Mechanics ─────── */}
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
                How ORDER BY Works Under the Hood
              </h2>
              <p className="text-xs text-slate-400">
                Hierarchical tie-breaking, index-backed sequential scans, and memory filesort buffers
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-slate-300 text-sm md:text-base">
            <p>
              In relational databases, rows have <strong>no intrinsic natural order</strong>. An explicit <code>ORDER BY</code> is mandatory
              whenever row sequence matters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Indexed Sort (Zero CPU Cost)
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  InnoDB reads index leaf pages in physical pre-sorted sequence.
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                  -- Supported by INDEX(city, admission_fee)
                  ORDER BY city ASC, admission_fee DESC;
                </pre>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Using Filesort (RAM Buffer Overhead)
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  MySQL reads candidate rows into <code>sort_buffer_size</code> and executes an in-memory quicksort.
                </p>
                <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                  -- Occurs when unindexed expressions are sorted
                  ORDER BY LENGTH(first_name) DESC;
                </pre>
              </div>
            </div>
          </div>

          {/* ── Semantic SVG 1: Indexed Sort vs Filesort ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Indexed Pre-Sorted Traversal vs In-Memory Filesort Buffer
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Indexed Sort vs Filesort Diagram"
            >
              {/* Indexed */}
              <g transform="translate(30, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ Indexed B-Tree Traversal
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Index leaf nodes physically ordered on disk</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Streams rows instantly with zero CPU sorting</text>
                <text x="20" y="94" fill="#10b981" fontWeight="bold" fontSize="10">✓ No filesort in EXPLAIN (Instantaneous)</text>
              </g>

              {/* Filesort */}
              <g transform="translate(410, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" />
                <text x="170" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                  ⚠️ Using filesort (Buffer Overhead)
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Reads rows into sort_buffer_size RAM</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Executes quicksort algorithm in memory</text>
                <text x="20" y="94" fill="#f59e0b" fontWeight="bold" fontSize="10">⚠️ Extra: Using filesort in EXPLAIN</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive ORDER BY Sandbox ───────────── */}
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
                Interactive Multi-Column ORDER BY Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Configure primary and secondary sorting keys and observe instantaneous table re-ordering
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Primary */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Primary Sort Key:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={primaryCol}
                    onChange={(e) => setPrimaryCol(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    <option value="fee">Tuition Fee (₹)</option>
                    <option value="name">Student Name</option>
                    <option value="city">City</option>
                    <option value="gpa">Academic GPA</option>
                  </select>

                  <div className="flex gap-1">
                    <button
                      onClick={() => setPrimaryDir("ASC")}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        primaryDir === "ASC"
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      )}
                    &gt;
                      ASC 🔼
                    </button>
                    <button
                      onClick={() => setPrimaryDir("DESC")}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        primaryDir === "DESC"
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      )}
                    &gt;
                      DESC 🔽
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Secondary Tie-Breaker Key:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={secondaryCol}
                    onChange={(e) => setSecondaryCol(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    <option value="name">Student Name</option>
                    <option value="fee">Tuition Fee (₹)</option>
                    <option value="city">City</option>
                    <option value="gpa">Academic GPA</option>
                  </select>

                  <div className="flex gap-1">
                    <button
                      onClick={() => setSecondaryDir("ASC")}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        secondaryDir === "ASC"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      )}
                    &gt;
                      ASC 🔼
                    </button>
                    <button
                      onClick={() => setSecondaryDir("DESC")}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border",
                        secondaryDir === "DESC"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      )}
                    &gt;
                      DESC 🔽
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated SQL & Sorted Output Grid */}
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
                    Live Sorted Result Set:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {sortedData.length} records sorted
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Fee (₹)</th>
                        <th className="p-2">GPA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {sortedData.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-indigo-400">{s.city}</td>
                          <td className="p-2 text-emerald-400">₹{s.fee.toLocaleString("en-IN")}.00</td>
                          <td className="p-2 text-amber-400 font-bold">{s.gpa}</td>
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
                Hierarchical sorting and ranking applications from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Generating Academic Merit Roster in Barrackpore College
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ranks students by highest GPA first, using lowest tuition fee as an equitable tie-breaker.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    admission_fee AS "Tuition (₹)",
    gpa AS "Academic Score"
FROM students
ORDER BY gpa DESC, admission_fee ASC;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu E-Commerce Catalog Promotion Ranking in Kolkata
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pins featured promotional products to the top, then sorts by newest arrivals and lowest price.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    product_name,
    unit_price AS "Price (₹)",
    is_featured,
    created_at
FROM products
ORDER BY is_featured DESC, created_at DESC, unit_price ASC;`}
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
                Prevent sorting bugs, unexpected sort sequences, and filesort bottlenecks
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
                  <strong className="text-white">1. Positional Sorting (ORDER BY 1, 2):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Fragile anti-pattern; modifying the <code>SELECT</code> column list breaks output order silently.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming DESC Applies to All Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>ORDER BY a, b DESC</code> sorts <code>a</code> ASC and <code>b</code> DESC. Must write <code>a DESC, b DESC</code>.
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
                  <strong className="text-white">1. Match Composite Indexes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Create indexes matching <code>ORDER BY</code> column sequences to eliminate filesorts.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Custom Ordering with FIELD():</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>ORDER BY FIELD(status, 'urgent', 'normal')</code> defines clear business priorities.
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
              <span><code>ORDER BY</code> is mandatory to guarantee deterministic result row ordering</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>ASC</code> sorts lowest to highest; <code>DESC</code> sorts highest to lowest</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Supports sorting by column aliases and computed mathematical expressions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use composite indexes to eliminate expensive <code>Using filesort</code> operations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>In multi-column sorting, specify <code>DESC</code> explicitly on each column</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>ORDER BY (col IS NULL) ASC, col ASC</code> to force NULLs to the end</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Sorting with ORDER BY – FAQs"
            questions={questions}
            subtitle="Master result set ordering, multi-column hierarchical sorting, and filesort optimization with 30 comprehensive Q&As"
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
            title="Sorting Query Results with ORDER BY (ASC / DESC)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic16_order_by_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Sorting seems straightforward on the surface, but in enterprise database administration, unindexed " +
              "`ORDER BY` clauses are one of the most common causes of high server load. In my classes in Barrackpore, " +
              "I teach students to always check `EXPLAIN`. If you see `Using filesort` on a query that runs hundreds of times per second, " +
              "your database is thrashing memory to sort rows after every request. Create a composite B-Tree index matching your exact " +
              "`WHERE` and `ORDER BY` column sequence, and MySQL will read the pre-sorted index pages in microseconds with zero CPU effort."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 16 · ORDER BY Sorting · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic16;
