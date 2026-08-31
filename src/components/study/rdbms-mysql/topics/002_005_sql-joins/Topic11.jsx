import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Filtering Joined Data: WHERE vs ON Clause Placement Differences
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive WHERE vs ON Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive WHERE vs ON State
  const [selectedFilterMode, setSelectedFilterMode] = useState("mode_filter_in_on"); // "mode_filter_in_on" | "mode_filter_in_where" | "mode_left_table_where" | "mode_anti_join_where"

  const filterScenarios = {
    mode_filter_in_on: {
      title: "1. Right-Table Filter in ON Clause (Preserves All Students)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    e.status AS enrollment_status
FROM students s
LEFT JOIN enrollments e 
    ON s.student_id = e.student_id 
   AND e.status = 'ACTIVE' -- Evaluated DURING the join!
LEFT JOIN courses c ON e.course_id = c.course_id;`,
      resultRows: [
        { name: "Mamata Hui", course: "MySQL Master", status: "ACTIVE", effect: "Enrolled & Active", badgeColor: "emerald" },
        { name: "Debangshu Roy", course: "NULL", status: "NULL", effect: "Status was 'SUSPENDED' (Preserved with NULLs)", badgeColor: "amber" },
        { name: "Susmita Sen", course: "NULL", status: "NULL", effect: "Unenrolled (Preserved with NULLs)", badgeColor: "amber" },
      ],
      verdictText: "✓ 100% STUDENTS PRESERVED (3 OF 3)",
      badgeColor: "emerald",
      explanation: "Filtering in the ON clause filters the right table before outer joining. All 3 students are retained in the report!",
    },
    mode_filter_in_where: {
      title: "2. Right-Table Filter in WHERE Clause (Silent INNER JOIN Conversion)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    e.status AS enrollment_status
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id
WHERE e.status = 'ACTIVE'; -- Evaluated AFTER the join!
-- ⚠️ Discards all rows where e.status IS NULL (Debangshu & Susmita wiped out!)`,
      resultRows: [
        { name: "Mamata Hui", course: "MySQL Master", status: "ACTIVE", effect: "Only Active Student Retained", badgeColor: "emerald" },
      ],
      verdictText: "⚠️ SILENT ROW LOSS (CONVERTED TO INNER JOIN)",
      badgeColor: "rose",
      explanation: "Because e.status = 'ACTIVE' evaluates to UNKNOWN for NULL rows, the WHERE clause discards Debangshu and Susmita, destroying outer join preservation.",
    },
    mode_left_table_where: {
      title: "3. Left-Table Filter in WHERE Clause (Correct Driving Pruning)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.city,
    c.course_title
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id
WHERE s.city = 'Barrackpore'; -- Prunes driving table properly!`,
      resultRows: [
        { name: "Mamata Hui", course: "MySQL Master", status: "Barrackpore", effect: "Enrolled Student from Barrackpore", badgeColor: "emerald" },
        { name: "Debangshu Roy", course: "React Architect", status: "Barrackpore", effect: "Enrolled Student from Barrackpore", badgeColor: "emerald" },
      ],
      verdictText: "✓ DRIVING TABLE PRUNED TO BARRACKPORE",
      badgeColor: "cyan",
      explanation: "Filters on the left table should ALWAYS be placed in the WHERE clause to restrict the master population before joining.",
    },
    mode_anti_join_where: {
      title: "4. Anti-Join Filter (WHERE right_table.id IS NULL)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.city
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL; -- Isolates only orphans!`,
      resultRows: [
        { name: "Susmita Sen", course: "None", status: "Ichapur", effect: "Orphaned / Unenrolled Student", badgeColor: "indigo" },
        { name: "Mahima Shaw", course: "None", status: "Jadavpur", effect: "Orphaned / Unenrolled Student", badgeColor: "indigo" },
      ],
      verdictText: "✓ 2 UNENROLLED STUDENTS DETECTED",
      badgeColor: "indigo",
      explanation: "Using WHERE right_col IS NULL after a LEFT JOIN isolates only records in the left table that have zero corresponding rows in the right table.",
    },
  };

  const currentFilter = filterScenarios[selectedFilterMode];

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
            Module 002_005 · SQL Joins · Topic 11
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Filtering Joined Data:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              WHERE vs ON Clause Differences
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the critical distinction between WHERE and ON clause filtering: why INNER JOIN treats them identically,
            how placing right-table filters in WHERE silently converts a LEFT JOIN into an INNER JOIN, and proper anti-join placement.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ ON (During Join) vs WHERE (After Join)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Silent INNER JOIN Conversion Bug
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Outer Row Preservation with ON
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Anti-Join IS NULL Placement
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: WHERE vs ON Theory & Mechanics ─────────── */}
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
                The Mechanics of Filter Placement in SQL Joins
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the exact execution timeline difference between ON clause evaluation and WHERE clause filtering
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Filter in ON (Pre-Join)</span>
              <strong className="text-white text-xs block font-mono">ON s.id = e.id AND e.status = 'ACTIVE'</strong>
              <p className="text-xs text-slate-300">
                Filters matching rows in the right table before outer join synthesis. 100% of left-table rows are preserved, with NULLs for non-qualifiers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. Filter in WHERE (Post-Join)</span>
              <strong className="text-white text-xs block font-mono">WHERE e.status = 'ACTIVE' (Kills NULLs)</strong>
              <p className="text-xs text-slate-300">
                Filters rows after the outer join is created. Because <code>NULL = 'ACTIVE'</code> fails, all unmatched left rows are eliminated, converting the query into an INNER JOIN.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Execution Timeline Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Execution Timeline (ON Evaluation vs WHERE Evaluation in LEFT JOIN)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="WHERE vs ON Timeline Diagram"
            >
              {/* Step 1: ON Clause */}
              <g transform="translate(20, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="110" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Stage 1: ON Clause Evaluated</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="9">Condition: e.status = 'ACTIVE'</text>
                <text x="10" y="65" fill="#a7f3d0" fontSize="9">Filters right table before join</text>
                <text x="10" y="80" fill="#38bdf8" fontSize="8">Preserves ALL Left Rows</text>
              </g>

              {/* Arrow */}
              <g transform="translate(255, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#38bdf8" />
              </g>

              {/* Step 2: Outer Join Synthesis */}
              <g transform="translate(305, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="110" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Stage 2: Outer Row Synthesis</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="9">Unmatched left rows given NULLs</text>
                <text x="10" y="65" fill="#cbd5e1" fontSize="9">Intermediate result contains NULLs</text>
                <text x="10" y="80" fill="#a7f3d0" fontSize="8">Full Population Intact</text>
              </g>

              {/* Arrow */}
              <g transform="translate(540, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#f43f5e" />
              </g>

              {/* Step 3: WHERE Clause Filter */}
              <g transform="translate(585, 20)">
                <rect width="175" height="90" rx="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                <text x="87" y="22" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="10">Stage 3: WHERE Filter</text>
                <text x="10" y="45" fill="#fca5a5" fontSize="9">WHERE e.status = 'ACTIVE'</text>
                <text x="10" y="65" fill="#f43f5e" fontSize="9" fontWeight="bold">❌ Kills all NULL rows!</text>
                <text x="10" y="80" fill="#fda4af" fontSize="8">Becomes INNER JOIN</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive WHERE vs ON Placement Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Compare student preservation in ON vs row loss in WHERE, driving table pruning, and anti-join isolation
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFilterMode("mode_filter_in_on")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFilterMode === "mode_filter_in_on"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Filter in ON (Preserves All)
              </button>

              <button
                onClick={() => setSelectedFilterMode("mode_filter_in_where")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFilterMode === "mode_filter_in_where"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Filter in WHERE (Row Loss)
              </button>

              <button
                onClick={() => setSelectedFilterMode("mode_left_table_where")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFilterMode === "mode_left_table_where"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Left Table WHERE
              </button>

              <button
                onClick={() => setSelectedFilterMode("mode_anti_join_where")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFilterMode === "mode_anti_join_where"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Anti-Join (IS NULL)
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentFilter.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFilter.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentFilter.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentFilter.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentFilter.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentFilter.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentFilter.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Query Output Result Set
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Student Name</th>
                        <th className="p-1.5">Course / Info</th>
                        <th className="p-1.5">Status / City</th>
                        <th className="p-1.5">Effect / Classification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentFilter.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.course}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.status}</td>
                          <td className="p-1.5 text-slate-300">{r.effect}</td>
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
                How Barrackpore and Kolkata training institutes structure filtering conditions in reports
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's 2026 Batch Student Fee Collection Audit
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Listing ALL students and showing their 2026 payments while preserving students who made ₹0 payments in 2026:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Correct: Year filter placed in ON clause!
SELECT 
    s.student_name,
    s.city,
    COALESCE(SUM(p.amount_paid), 0) AS total_paid_2026
FROM students s
LEFT JOIN payments p 
    ON s.student_id = p.student_id 
   AND YEAR(p.payment_date) = 2026 -- Placed in ON to preserve students with 0 payments!
WHERE s.city = 'Barrackpore'
GROUP BY s.student_id, s.student_name, s.city;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Inactive Customer Reactivation Campaign
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding registered customers who placed ZERO orders in the last 90 days:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Anti-Join Pattern for Inactive Customer Reactivation:
SELECT 
    c.customer_id,
    c.customer_name,
    c.email
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id 
   AND o.order_date >= CURDATE() - INTERVAL 90 DAY
WHERE o.order_id IS NULL; -- Isolates customers with zero recent orders!`}
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
                Guidelines for placing predicates correctly in complex join pipelines
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
                  <strong className="text-white">1. Right-Table Filter in WHERE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE right_col = 'X'</code> discards all NULL outer rows, silently converting LEFT JOIN to INNER JOIN.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Left-Table Filter in ON:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Placing left-table filters in ON does not restrict the left table; it returns non-matching left rows with NULL right columns.
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
                  <strong className="text-white">1. Place Right-Table Filters in ON:</strong>
                  <p className="text-slate-400 mt-0.5">
                    To preserve 100% of the left table while filtering child attributes, place the child filter in the <code>ON</code> clause.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Place Left-Table Filters in WHERE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always place driving table restrictions (e.g. <code>WHERE city = 'Barrackpore'</code>) in the <code>WHERE</code> clause.
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
              <span>In INNER JOIN, filter placement in ON vs WHERE produces identical results</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>In LEFT JOIN, placing right-table filter in ON preserves all left rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Placing right-table filter in WHERE eliminates NULLs (converts to INNER JOIN)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always place left-table filters in the WHERE clause</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Anti-Join uses WHERE right_table.id IS NULL to isolate orphaned records</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use EXPLAIN to verify optimizer predicate pushdown behavior</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="WHERE vs ON Clause Filtering – FAQs"
            questions={questions}
            subtitle="Master WHERE vs ON clause filtering differences, INNER JOIN optimizer equivalence, outer join preservation, and avoiding silent INNER JOIN conversions with 30 comprehensive Q&As"
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
            title="Filtering Joined Data: WHERE vs ON Clause Placement Differences"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic11_where_vs_on_filtering_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding the difference between the `WHERE` clause and the `ON` clause is one of the most common senior SQL interview questions! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I emphasize to students: " +
              "'If you are doing an `INNER JOIN`, MySQL optimizer doesn't care whether you put the filter in `ON` or `WHERE`—the result is identical. " +
              "BUT the moment you use a `LEFT JOIN`, putting `WHERE right_table.status = 'ACTIVE'` will silently kill all your NULL rows " +
              "and convert your outer join into a plain inner join without warning!' " +
              "Always remember the rule of thumb: If you want to keep all rows from the left table, put the right table's filters in the `ON` clause. " +
              "If you want to filter the driving left table, put it in the `WHERE` clause!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 11 · WHERE vs ON Filtering · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;
