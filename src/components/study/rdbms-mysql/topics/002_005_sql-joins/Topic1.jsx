import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – INNER JOIN: Syntax, ON Predicate, and INNER Keyword
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive INNER JOIN Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Join Mode State
  const [selectedJoinMode, setSelectedJoinMode] = useState("mode_standard_inner"); // "mode_standard_inner" | "mode_compound_on" | "mode_aggregate_join" | "mode_syntax_compare"

  const rawStudents = [
    { sId: "101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", batch: "MORN" },
    { sId: "102", sName: "Debangshu Roy", city: "Kolkata", cId: "C102", batch: "EVE" },
    { sId: "103", sName: "Susmita Sen", city: "Ichapur", cId: null, batch: "MORN" },
    { sId: "104", sName: "Mahima Shaw", city: "Jadavpur", cId: "C105", batch: "MORN" },
  ];

  const rawCourses = [
    { cId: "C101", title: "MySQL Master", fee: "₹4,500", batch: "MORN" },
    { cId: "C102", title: "React Architect", fee: "₹5,500", batch: "EVE" },
    { cId: "C103", title: "Python AI", fee: "₹6,000", batch: "MORN" },
  ];

  const joinScenarios = {
    mode_standard_inner: {
      title: "1. Standard ANSI Equi-INNER JOIN",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.city,
    c.course_title,
    c.course_fee
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id;`,
      matchedRows: [
        { sId: "101", sName: "Mamata Hui", city: "Barrackpore", course: "MySQL Master", fee: "₹4,500" },
        { sId: "102", sName: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500" },
      ],
      excludedNote: "Susmita Sen (cId=NULL), Mahima Shaw (cId=C105 non-existent), and Python AI (0 students) are excluded.",
      badgeColor: "emerald",
      badgeText: "2 MATCHED ROWS",
    },
    mode_compound_on: {
      title: "2. Compound Multi-Column ON Predicate",
      sqlQuery: `SELECT 
    s.student_name,
    c.course_title,
    s.batch
FROM students s
INNER JOIN courses c 
    ON s.course_id = c.course_id 
   AND s.batch = c.batch;`,
      matchedRows: [
        { sId: "101", sName: "Mamata Hui", city: "Barrackpore", course: "MySQL Master", fee: "₹4,500 (Batch: MORN)" },
        { sId: "102", sName: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500 (Batch: EVE)" },
      ],
      excludedNote: "Both course_id AND batch must match simultaneously for a row to be retained.",
      badgeColor: "cyan",
      badgeText: "COMPOUND ON (AND)",
    },
    mode_aggregate_join: {
      title: "3. INNER JOIN with Aggregation (GROUP BY)",
      sqlQuery: `SELECT 
    c.course_title,
    c.course_fee,
    COUNT(s.student_id) AS total_enrolled
FROM courses c
INNER JOIN students s ON c.course_id = s.course_id
GROUP BY c.course_id, c.course_title, c.course_fee;`,
      matchedRows: [
        { sId: "C101", sName: "MySQL Master", city: "Enrolled: 1 Student", course: "Fee: ₹4,500", fee: "Total: ₹4,500" },
        { sId: "C102", sName: "React Architect", city: "Enrolled: 1 Student", course: "Fee: ₹5,500", fee: "Total: ₹5,500" },
      ],
      excludedNote: "Courses with 0 students are omitted because INNER JOIN excludes unreferenced parents.",
      badgeColor: "indigo",
      badgeText: "GROUP BY + COUNT",
    },
    mode_syntax_compare: {
      title: "4. ANSI SQL-92 vs Legacy Comma Syntax Comparison",
      sqlQuery: `-- ANSI SQL-92 (Recommended):
SELECT s.student_name, c.course_title
FROM students s
JOIN courses c ON s.course_id = c.course_id;

-- Legacy ANSI-89 Comma Syntax (Discouraged):
SELECT s.student_name, c.course_title
FROM students s, courses c
WHERE s.course_id = c.course_id;`,
      matchedRows: [
        { sId: "101", sName: "Mamata Hui", city: "Barrackpore", course: "MySQL Master", fee: "₹4,500" },
        { sId: "102", sName: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500" },
      ],
      excludedNote: "Both return identical rows, but ANSI syntax prevents catastrophic Cartesian explosions.",
      badgeColor: "amber",
      badgeText: "SYNTAX COMPARISON",
    },
  };

  const currentScenario = joinScenarios[selectedJoinMode];

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
            Module 002_005 · SQL Joins · Topic 1
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            INNER JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Syntax, ON Predicate &amp; INNER Keyword
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the workhorse of SQL relational querying: understanding the equi-join condition, the optional INNER keyword,
            compound ON clauses, table aliasing, and how unmatched rows and NULL values are filtered out.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Strict Intersection Matching (A ∩ B)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💡 Optional "INNER" Keyword (JOIN = INNER JOIN)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Compound ON Clauses (AND / OR)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Indexed Equi-Join Execution
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: INNER JOIN Mechanics & Theory ──────────── */}
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
                The Mechanics of INNER JOIN &amp; The ON Predicate
              </h2>
              <p className="text-xs text-slate-400">
                How the database engine matches keys and automatically filters out non-matching tuples
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Intersection Principle</span>
              <strong className="text-white text-xs block font-mono">{"R1 ⋈ R2 = { t1 ∘ t2 | t1.id = t2.id }"}</strong>
              <p className="text-xs text-slate-300">
                Returns ONLY tuples that have a corresponding, matching key in BOTH tables. Discards any student without a course, and any course without students.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. The ON vs WHERE Distinction</span>
              <strong className="text-white text-xs block font-mono">ON defines matching; WHERE filters rows</strong>
              <p className="text-xs text-slate-300">
                In an INNER JOIN, placing filters in ON or WHERE gives identical rows, but separating relationship logic (ON) from business filters (WHERE) ensures clean code.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Venn Diagram & Tuple Matching ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: INNER JOIN Set Intersection &amp; Tuple Key Matching Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="INNER JOIN Venn Diagram"
            >
              {/* Left Circle: Table A (Students) */}
              <circle cx="160" cy="70" r="55" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" fillOpacity="0.4" />
              <text x="120" y="70" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Students</text>
              <text x="120" y="85" fill="#94a3b8" textAnchor="middle" fontSize="8">(4 Rows)</text>

              {/* Right Circle: Table B (Courses) */}
              <circle cx="230" cy="70" r="55" fill="#1e293b" stroke="#818cf8" strokeWidth="2" fillOpacity="0.4" />
              <text x="270" y="70" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Courses</text>
              <text x="270" y="85" fill="#94a3b8" textAnchor="middle" fontSize="8">(3 Rows)</text>

              {/* Intersection Highlight */}
              <path
                d="M 195,28 A 55,55 0 0,1 195,112 A 55,55 0 0,1 195,28"
                fill="#10b981"
                fillOpacity="0.7"
              />
              <text x="195" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="9">INNER</text>
              <text x="195" y="78" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="9">JOIN</text>
              <text x="195" y="90" fill="#ffffff" textAnchor="middle" fontSize="7">(2 Matches)</text>

              {/* Explanation Box on Right */}
              <g transform="translate(360, 20)">
                <rect width="390" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="195" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">INNER JOIN Matching Verdict</text>
                <text x="15" y="44" fill="#cbd5e1" fontSize="10">✓ Mamata Hui (C101) ➔ MySQL Master (C101) [MATCH]</text>
                <text x="15" y="62" fill="#cbd5e1" fontSize="10">✓ Debangshu Roy (C102) ➔ React Architect (C102) [MATCH]</text>
                <text x="15" y="80" fill="#fca5a5" fontSize="9">❌ Susmita (NULL), Mahima (C105), Python AI (0 Enrolled) DISCARDED</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Join Sandbox ───────────────── */}
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
                Interactive INNER JOIN Query Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between standard equi-joins, compound ON predicates, aggregations, and syntax comparisons
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedJoinMode("mode_standard_inner")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedJoinMode === "mode_standard_inner"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Standard Equi-Join
              </button>

              <button
                onClick={() => setSelectedJoinMode("mode_compound_on")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedJoinMode === "mode_compound_on"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Compound ON (AND)
              </button>

              <button
                onClick={() => setSelectedJoinMode("mode_aggregate_join")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedJoinMode === "mode_aggregate_join"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. JOIN + GROUP BY
              </button>

              <button
                onClick={() => setSelectedJoinMode("mode_syntax_compare")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedJoinMode === "mode_syntax_compare"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. ANSI vs Comma Syntax
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Discard Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentScenario.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {currentScenario.badgeText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentScenario.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-amber-300/90 font-mono bg-amber-500/10 p-2 rounded border border-amber-500/20">
                    ℹ️ {currentScenario.excludedNote}
                  </p>
                </div>
              </div>

              {/* Right: Result Table */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Query Output Result Set
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">ID / Name</th>
                        <th className="p-1.5">Details</th>
                        <th className="p-1.5">Course / Info</th>
                        <th className="p-1.5">Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentScenario.matchedRows.map((r, i) => (
                        <tr key={i} className="bg-emerald-500/5">
                          <td className="p-1.5 text-white font-bold">{r.sId}</td>
                          <td className="p-1.5 text-cyan-300">{r.sName}</td>
                          <td className="p-1.5 text-slate-300">{r.course}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.fee}</td>
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
                How Barrackpore and Kolkata training institutes write high-performance INNER JOIN queries
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Attendance &amp; Batch Join
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Querying student attendance logs joining on both student ID and batch date:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Multi-Table INNER JOIN with Batch Filtering:
SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    att.session_date,
    att.status
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id
INNER JOIN attendance att ON s.student_id = att.student_id
WHERE att.session_date = CURDATE()
  AND s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Item Revenue Summary
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Joining products with order items to compute sales revenue in ₹:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Revenue Calculation with INNER JOIN & Aggregation:
SELECT 
    p.product_id,
    p.product_name,
    SUM(oi.quantity) AS total_units_sold,
    CONCAT('₹', FORMAT(SUM(oi.quantity * oi.unit_price), 2)) AS total_revenue
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
HAVING total_revenue > 10000;`}
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
                Guidelines for writing error-free, high-performance INNER JOIN queries
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
                  <strong className="text-white">1. Expecting Unmatched Records:</strong>
                  <p className="text-slate-400 mt-0.5">
                    INNER JOIN silently discards records without matches; use LEFT JOIN if you need to keep unmatched parents.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Joining Incompatible Data Types:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Joining INT to VARCHAR forces full table scans and disables B-Tree index lookups.
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
                  <strong className="text-white">1. Always Use Explicit ANSI Syntax:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>INNER JOIN ... ON</code> rather than legacy comma joins to clearly isolate relationship conditions.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Add B-Tree Indexes on Foreign Keys:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Index foreign keys to enable sub-millisecond Nested-Loop index probes in MySQL.
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
              <span>INNER JOIN returns ONLY rows with matching values in BOTH tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>The "INNER" keyword is optional (JOIN is completely identical to INNER JOIN)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always qualify columns with table aliases (s.id, c.id) to prevent ambiguity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Discards rows where join key is NULL or has no corresponding match</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Compound ON conditions use AND to match multi-column keys</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ensure join columns have matching data types and B-Tree indexes</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="INNER JOIN Mechanics &amp; Syntax – FAQs"
            questions={questions}
            subtitle="Master INNER JOIN, the ON predicate, the optional INNER keyword, equi-joins, handling unmatched rows and NULLs, table aliases, and index optimizations with 30 comprehensive Q&As"
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
            title="INNER JOIN: Syntax, ON Predicate, and INNER Keyword"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_inner_join_syntax_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "INNER JOIN is the undisputed king of relational querying! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I emphasize to students that INNER JOIN represents a strict, mutual handshake: " +
              "'If a student doesn't have a course, they don't appear; if a course has zero enrolled students, it doesn't appear.' " +
              "Both sides must shake hands on the `ON` condition. " +
              "Always remember to index your foreign key columns so MySQL can perform instant $O(1)$ index lookups instead of scanning every row in the table!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · INNER JOIN Mechanics · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
