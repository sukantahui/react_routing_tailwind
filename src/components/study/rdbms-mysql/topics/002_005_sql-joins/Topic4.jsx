import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Simulating FULL OUTER JOIN in MySQL using LEFT JOIN + RIGHT JOIN + UNION
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive FULL OUTER JOIN Emulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive FULL JOIN State
  const [selectedFullMode, setSelectedFullMode] = useState("mode_standard_union"); // "mode_standard_union" | "mode_optimized_union_all" | "mode_discrepancy_diff" | "mode_mysql_limitation"

  const fullJoinScenarios = {
    mode_standard_union: {
      title: "1. Standard Emulation (LEFT JOIN UNION RIGHT JOIN)",
      sqlQuery: `SELECT 
    COALESCE(s.student_id, 'N/A') AS student_id,
    COALESCE(s.student_name, 'No Enrolled Student') AS student_name,
    COALESCE(c.course_title, 'Unassigned / Self-Study') AS course_title,
    COALESCE(c.course_fee, '₹0.00') AS course_fee,
    CASE 
        WHEN s.student_id IS NOT NULL AND c.course_id IS NOT NULL THEN '✓ Full Match'
        WHEN c.course_id IS NULL THEN 'Left Only (Unassigned)'
        ELSE 'Right Only (Empty Course)'
    END AS match_type
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id

UNION

SELECT 
    COALESCE(s.student_id, 'N/A') AS student_id,
    COALESCE(s.student_name, 'No Enrolled Student') AS student_name,
    COALESCE(c.course_title, 'Unassigned / Self-Study') AS course_title,
    COALESCE(c.course_fee, '₹0.00') AS course_fee,
    CASE 
        WHEN s.student_id IS NOT NULL AND c.course_id IS NOT NULL THEN '✓ Full Match'
        WHEN c.course_id IS NULL THEN 'Left Only (Unassigned)'
        ELSE 'Right Only (Empty Course)'
    END AS match_type
FROM students s
RIGHT JOIN courses c ON s.course_id = c.course_id;`,
      resultRows: [
        { id: "101", name: "Mamata Hui", course: "MySQL Master", fee: "₹4,500", type: "✓ Full Match", badgeColor: "emerald" },
        { id: "102", name: "Debangshu Roy", course: "React Architect", fee: "₹5,500", type: "✓ Full Match", badgeColor: "emerald" },
        { id: "103", name: "Susmita Sen", course: "Unassigned / Self-Study", fee: "₹0.00", type: "Left Only (Unassigned)", badgeColor: "amber" },
        { id: "104", name: "Mahima Shaw", course: "Unassigned / Self-Study", fee: "₹0.00", type: "Left Only (Invalid CId)", badgeColor: "amber" },
        { id: "N/A", name: "No Enrolled Student", course: "Python AI", fee: "₹6,000", type: "Right Only (Empty Course)", badgeColor: "cyan" },
      ],
      verdictText: "✓ COMPLETE 5-ROW FULL OUTER JOIN",
      badgeColor: "emerald",
      explanation: "UNION eliminates duplicate matched rows (Mamata and Debangshu) and outputs all 5 unique relational combinations!",
    },
    mode_optimized_union_all: {
      title: "2. High-Performance Emulation (UNION ALL + Anti-Join)",
      sqlQuery: `-- High Performance: Zero in-memory deduplication sort!
SELECT 
    COALESCE(s.student_id, 'N/A') AS student_id,
    s.student_name,
    c.course_title,
    c.course_fee
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id

UNION ALL

SELECT 
    'N/A' AS student_id,
    'No Enrolled Student' AS student_name,
    c.course_title,
    c.course_fee
FROM courses c
LEFT JOIN students s ON c.course_id = s.course_id
WHERE s.student_id IS NULL; -- Anti-join guarantees zero overlap!`,
      resultRows: [
        { id: "101", name: "Mamata Hui", course: "MySQL Master", fee: "₹4,500", type: "Left + Match", badgeColor: "emerald" },
        { id: "102", name: "Debangshu Roy", course: "React Architect", fee: "₹5,500", type: "Left + Match", badgeColor: "emerald" },
        { id: "103", name: "Susmita Sen", course: "NULL", fee: "NULL", type: "Left Only", badgeColor: "amber" },
        { id: "104", name: "Mahima Shaw", course: "NULL", fee: "NULL", type: "Left Only", badgeColor: "amber" },
        { id: "N/A", name: "No Enrolled Student", course: "Python AI", fee: "₹6,000", type: "Right Anti-Join", badgeColor: "cyan" },
      ],
      verdictText: "⚡ FAST O(1) DEDUPLICATION FREE",
      badgeColor: "cyan",
      explanation: "UNION ALL runs at maximum speed because the anti-join query (WHERE s.student_id IS NULL) guarantees zero duplicate rows without temporary disk tables!",
    },
    mode_discrepancy_diff: {
      title: "3. Discrepancies Only (Symmetric Difference Audit)",
      sqlQuery: `-- Auditing Discrepancies (Unmatched Records on BOTH sides):
SELECT * FROM (
    SELECT s.student_name, c.course_title, 'Student Missing Course' AS issue
    FROM students s LEFT JOIN courses c ON s.course_id = c.course_id WHERE c.course_id IS NULL
    UNION ALL
    SELECT s.student_name, c.course_title, 'Course Missing Students' AS issue
    FROM courses c LEFT JOIN students s ON c.course_id = s.course_id WHERE s.student_id IS NULL
) discrepancies;`,
      resultRows: [
        { id: "103", name: "Susmita Sen", course: "NULL", fee: "N/A", type: "Student Missing Course", badgeColor: "rose" },
        { id: "104", name: "Mahima Shaw", course: "NULL", fee: "N/A", type: "Student Missing Course", badgeColor: "rose" },
        { id: "N/A", name: "NULL", course: "Python AI", fee: "₹6,000", type: "Course Missing Students", badgeColor: "rose" },
      ],
      verdictText: "3 RELATIONAL DISCREPANCIES",
      badgeColor: "rose",
      explanation: "Returns the Symmetric Difference (Disjunctive Union: (A - B) ∪ (B - A)), isolating all orphaned students and empty course catalogs.",
    },
    mode_mysql_limitation: {
      title: "4. Why Native FULL OUTER JOIN Fails in MySQL",
      sqlQuery: `-- ❌ FAILS IN MYSQL (Throws Error 1064):
SELECT * 
FROM students s 
FULL OUTER JOIN courses c ON s.course_id = c.course_id;

-- MySQL Error Output:
-- ERROR 1064 (42000): You have an error in your SQL syntax; 
-- check the manual that corresponds to your MySQL server version 
-- for the right syntax to use near 'FULL OUTER JOIN courses c ...'`,
      resultRows: [
        { id: "ERROR", name: "Syntax Not Supported", course: "Requires UNION Emulation", fee: "N/A", type: "MySQL Limitation", badgeColor: "rose" },
      ],
      verdictText: "❌ SYNTAX ERROR 1064",
      badgeColor: "rose",
      explanation: "MySQL query parser does not recognize 'FULL OUTER JOIN'. The LEFT JOIN + UNION + RIGHT JOIN pattern is the universal standard in the MySQL ecosystem.",
    },
  };

  const currentFull = fullJoinScenarios[selectedFullMode];

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
            Module 002_005 · SQL Joins · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Simulating FULL OUTER JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              LEFT JOIN + RIGHT JOIN + UNION
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master FULL OUTER JOIN emulation in MySQL: understanding why MySQL lacks native FULL JOIN syntax,
            combining LEFT and RIGHT joins with UNION, and applying the high-performance UNION ALL + Anti-Join pattern for audit reconciliations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Full Set Union (A ⟗ B)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ MySQL Native Limitation &amp; Workaround
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ High-Performance UNION ALL + Anti-Join
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Symmetric Difference Audit Reports
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: FULL JOIN Theory & Mechanics ───────────── */}
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
                The Mechanics of FULL OUTER JOIN &amp; MySQL Emulation
              </h2>
              <p className="text-xs text-slate-400">
                How combining LEFT JOIN and RIGHT JOIN via UNION recreates the full relational union
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Full Relational Union</span>
              <strong className="text-white text-xs block font-mono">{"R1 ⟗ R2 = (R1 ⟕ R2) ∪ (R1 ⟖ R2)"}</strong>
              <p className="text-xs text-slate-300">
                Preserves all matched rows, all unmatched left rows (with NULL right attributes), and all unmatched right rows (with NULL left attributes).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. UNION vs UNION ALL Rule</span>
              <strong className="text-white text-xs block font-mono">UNION eliminates duplicate matches automatically</strong>
              <p className="text-xs text-slate-300">
                Because both LEFT and RIGHT queries return matching rows, standard UNION discards duplicate matches. Never use naive UNION ALL without an anti-join filter!
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: FULL JOIN Venn & Emulation Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: FULL OUTER JOIN Complete Double Circle Union Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="FULL OUTER JOIN Venn Diagram"
            >
              {/* Left Circle */}
              <circle cx="160" cy="70" r="55" fill="#10b981" fillOpacity="0.7" stroke="#10b981" strokeWidth="2" />
              <text x="125" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="9">LEFT ONLY</text>
              <text x="125" y="80" fill="#ffffff" textAnchor="middle" fontSize="7">(Unenrolled)</text>

              {/* Right Circle */}
              <circle cx="230" cy="70" r="55" fill="#818cf8" fillOpacity="0.7" stroke="#818cf8" strokeWidth="2" />
              <text x="265" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="9">RIGHT ONLY</text>
              <text x="265" y="80" fill="#ffffff" textAnchor="middle" fontSize="7">(Empty Course)</text>

              {/* Intersection */}
              <text x="195" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="9">MATCH</text>
              <text x="195" y="80" fill="#ffffff" textAnchor="middle" fontSize="7">(Both)</text>

              {/* Details Box on Right */}
              <g transform="translate(360, 20)">
                <rect width="390" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="195" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">FULL JOIN Output Composition</text>
                <text x="15" y="44" fill="#a7f3d0" fontSize="10">✓ 2 Full Matches: Mamata (C101) &amp; Debangshu (C102)</text>
                <text x="15" y="62" fill="#fde68a" fontSize="10">✓ 2 Left Orphans: Susmita (NULL) &amp; Mahima (C105)</text>
                <text x="15" y="80" fill="#38bdf8" fontSize="10">✓ 1 Right Orphan: Python AI (Zero enrolled students)</text>
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
                Interactive FULL OUTER JOIN Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore standard UNION emulation, high-performance UNION ALL + Anti-Join, discrepancy audits, and syntax error logs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFullMode("mode_standard_union")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFullMode === "mode_standard_union"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Standard UNION ✓
              </button>

              <button
                onClick={() => setSelectedFullMode("mode_optimized_union_all")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFullMode === "mode_optimized_union_all"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Fast UNION ALL ⚡
              </button>

              <button
                onClick={() => setSelectedFullMode("mode_discrepancy_diff")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFullMode === "mode_discrepancy_diff"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Discrepancy Audit
              </button>

              <button
                onClick={() => setSelectedFullMode("mode_mysql_limitation")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFullMode === "mode_mysql_limitation"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Native Syntax Error
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentFull.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFull.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentFull.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentFull.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentFull.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentFull.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Emulated FULL OUTER JOIN Result Set
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">ID / Name</th>
                        <th className="p-1.5">Course / Info</th>
                        <th className="p-1.5">Fee</th>
                        <th className="p-1.5">Match Classification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentFull.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.id} - {r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.course}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.fee}</td>
                          <td className="p-1.5">
                            <span
                              className={clsx(
                                "text-[10px] font-mono px-2 py-0.5 rounded border",
                                r.badgeColor === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                  : r.badgeColor === "amber"
                                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                  : r.badgeColor === "cyan"
                                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                  : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                              )}
                            >
                              {r.type}
                            </span>
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
                How Barrackpore and Kolkata training institutes use emulated FULL JOINs for reconciliation audits
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Attendance vs Exam Registration Reconciliation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Comparing attendance logs with final exam registrations to catch unregistered attendees and absent examinees:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Full Reconciliation between Attendance and Exam Registrations:
SELECT 
    COALESCE(att.student_id, exam.student_id) AS student_id,
    att.attendance_count,
    exam.registration_num,
    CASE 
        WHEN att.student_id IS NOT NULL AND exam.student_id IS NOT NULL THEN 'Eligible & Registered'
        WHEN exam.student_id IS NULL THEN 'Attended But NOT Registered for Exam'
        ELSE 'Registered for Exam with Zero Attendance'
    END AS audit_status
FROM student_attendance att
LEFT JOIN exam_registrations exam ON att.student_id = exam.student_id

UNION

SELECT 
    COALESCE(att.student_id, exam.student_id) AS student_id,
    att.attendance_count,
    exam.registration_num,
    CASE 
        WHEN att.student_id IS NOT NULL AND exam.student_id IS NOT NULL THEN 'Eligible & Registered'
        WHEN exam.student_id IS NULL THEN 'Attended But NOT Registered for Exam'
        ELSE 'Registered for Exam with Zero Attendance'
    END AS audit_status
FROM student_attendance att
RIGHT JOIN exam_registrations exam ON att.student_id = exam.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Bank Payment Gateway vs Internal Ledger Audit
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Reconciling payment gateway settlement batches with internal orders in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Financial Settlement Reconciliation:
SELECT 
    COALESCE(o.order_id, pg.order_ref) AS transaction_ref,
    o.total_amount AS internal_order_amount,
    pg.settled_amount AS gateway_settled_amount,
    (COALESCE(o.total_amount, 0) - COALESCE(pg.settled_amount, 0)) AS discrepancy
FROM orders o
LEFT JOIN payment_gateway_logs pg ON o.order_id = pg.order_ref

UNION ALL

SELECT 
    pg.order_ref AS transaction_ref,
    NULL AS internal_order_amount,
    pg.settled_amount AS gateway_settled_amount,
    (0 - pg.settled_amount) AS discrepancy
FROM payment_gateway_logs pg
LEFT JOIN orders o ON pg.order_ref = o.order_id
WHERE o.order_id IS NULL;`}
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
                Guidelines for writing error-free, high-performance emulated FULL OUTER JOIN queries
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
                  <strong className="text-white">1. Using UNION ALL with Full LEFT and RIGHT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>LEFT JOIN UNION ALL RIGHT JOIN</code> causes matching rows to appear twice in the result.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Mismatched Column Lists in UNION Branches:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Selecting different column counts or types across UNION branches throws MySQL Error 1222.
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
                  <strong className="text-white">1. Use UNION ALL + Anti-Join for Big Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Avoid expensive duplicate sorting by using <code>LEFT JOIN UNION ALL (RIGHT ANTI-JOIN)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Wrap Join Keys with COALESCE():</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>COALESCE(a.id, b.id) AS unified_id</code> to ensure every output row has an identifiable key.
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
              <span>FULL OUTER JOIN returns all matches + all unmatched left + all unmatched right rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MySQL lacks native FULL JOIN; emulate using LEFT JOIN UNION RIGHT JOIN</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>UNION automatically eliminates duplicate matched tuples</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never use UNION ALL with full LEFT and RIGHT joins (causes duplicated rows)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use the high-performance LEFT JOIN UNION ALL (RIGHT ANTI-JOIN) pattern for large tables</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ideal for financial reconciliation, staging data audits, and discrepancy checks</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Simulating FULL OUTER JOIN in MySQL – FAQs"
            questions={questions}
            subtitle="Master FULL OUTER JOIN emulation in MySQL, combining LEFT and RIGHT joins with UNION, UNION ALL anti-join optimizations, and financial reconciliation audits with 30 comprehensive Q&As"
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
            title="Simulating FULL OUTER JOIN in MySQL using LEFT JOIN + RIGHT JOIN + UNION"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_full_outer_join_simulation_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Mastering FULL OUTER JOIN emulation in MySQL separates novice SQL coders from seasoned database engineers! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I explain to students: " +
              "'When you migrate from PostgreSQL or SQL Server to MySQL, you will be shocked to find that `FULL OUTER JOIN` throws Error 1064.' " +
              "Understanding how to construct a FULL JOIN using Set Union (`LEFT JOIN UNION RIGHT JOIN`) proves that you understand relational mathematics. " +
              "And when you use the high-performance `UNION ALL + ANTI-JOIN` pattern on a 10-million row database, your query finishes in 200 milliseconds instead of 30 seconds!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · FULL OUTER JOIN Emulation · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
