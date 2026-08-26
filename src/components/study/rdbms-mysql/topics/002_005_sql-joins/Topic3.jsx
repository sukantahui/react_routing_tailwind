import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – RIGHT (OUTER) JOIN: Preserving Right-Table Records
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive RIGHT JOIN Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive RIGHT JOIN State
  const [selectedRightScenario, setSelectedRightScenario] = useState("scen_right_standard"); // "scen_right_standard" | "scen_right_empty_course" | "scen_right_to_left" | "scen_right_grouped"

  const rightScenarios = {
    scen_right_standard: {
      title: "1. Standard RIGHT JOIN with COALESCE()",
      sqlQuery: `SELECT 
    c.course_id,
    c.course_title,
    c.course_fee,
    COALESCE(s.student_name, 'No Enrolled Students') AS student_name,
    COALESCE(s.city, 'N/A') AS city
FROM students s
RIGHT JOIN courses c ON s.course_id = c.course_id;`,
      resultRows: [
        { cId: "C101", title: "MySQL Master", fee: "₹4,500", name: "Mamata Hui", city: "Barrackpore", isNull: false },
        { cId: "C102", title: "React Architect", fee: "₹5,500", name: "Debangshu Roy", city: "Kolkata", isNull: false },
        { cId: "C103", title: "Python AI", fee: "₹6,000", name: "No Enrolled Students", city: "N/A", isNull: true },
      ],
      verdictText: "✓ ALL 3 COURSES PRESERVED",
      badgeColor: "emerald",
      explanation: "Every single course in the Right table is returned! The unassigned course (Python AI) appears with NULL for student attributes, safely formatted with COALESCE().",
    },
    scen_right_empty_course: {
      title: "2. Finding Courses with ZERO Enrollments (Anti-Join)",
      sqlQuery: `SELECT 
    c.course_id,
    c.course_title,
    c.course_fee,
    '0 Active Students' AS enrollment_status
FROM students s
RIGHT JOIN courses c ON s.course_id = c.course_id
WHERE s.student_id IS NULL;`,
      resultRows: [
        { cId: "C103", title: "Python AI", fee: "₹6,000", name: "0 Active Students", city: "Requires Marketing Campaign", isNull: true },
      ],
      verdictText: "1 EMPTY COURSE DETECTED",
      badgeColor: "cyan",
      explanation: "Filtering WHERE s.student_id IS NULL identifies exactly which courses have zero enrolled students, mathematically matching Set Difference (Courses - Students).",
    },
    scen_right_to_left: {
      title: "3. The Equivalence Transformer (RIGHT ➔ LEFT JOIN)",
      sqlQuery: `-- Recommended Production Style (Swapping Table Order):
SELECT 
    c.course_id,
    c.course_title,
    c.course_fee,
    COALESCE(s.student_name, 'No Enrolled Students') AS student_name
FROM courses c
LEFT JOIN students s ON c.course_id = s.course_id;`,
      resultRows: [
        { cId: "C101", title: "MySQL Master", fee: "₹4,500", name: "Mamata Hui", city: "Barrackpore", isNull: false },
        { cId: "C102", title: "React Architect", fee: "₹5,500", name: "Debangshu Roy", city: "Kolkata", isNull: false },
        { cId: "C103", title: "Python AI", fee: "₹6,000", name: "No Enrolled Students", city: "N/A", isNull: true },
      ],
      verdictText: "✓ 100% IDENTICAL TO LEFT JOIN",
      badgeColor: "indigo",
      explanation: "Swapping table order in FROM turns RIGHT JOIN into LEFT JOIN with identical output, following natural left-to-right reading conventions.",
    },
    scen_right_grouped: {
      title: "4. RIGHT JOIN with COUNT(col) Aggregation",
      sqlQuery: `SELECT 
    c.course_id,
    c.course_title,
    c.course_fee,
    COUNT(s.student_id) AS total_enrolled_students
FROM students s
RIGHT JOIN courses c ON s.course_id = c.course_id
GROUP BY c.course_id, c.course_title, c.course_fee;`,
      resultRows: [
        { cId: "C101", title: "MySQL Master", fee: "₹4,500", name: "1 Student Enrolled", city: "Active", isNull: false },
        { cId: "C102", title: "React Architect", fee: "₹5,500", name: "1 Student Enrolled", city: "Active", isNull: false },
        { cId: "C103", title: "Python AI", fee: "₹6,000", name: "0 Students Enrolled", city: "Empty", isNull: true },
      ],
      verdictText: "✓ ACCURATE 0 COUNT REPORTED",
      badgeColor: "emerald",
      explanation: "Using COUNT(s.student_id) correctly reports 0 for Python AI because COUNT(column) ignores NULLs, whereas COUNT(*) would incorrectly report 1!",
    },
  };

  const currentRight = rightScenarios[selectedRightScenario];

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
            Module 002_005 · SQL Joins · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            RIGHT (OUTER) JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Preserving Right-Table Records
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mirror reflection of LEFT JOIN: preserving all records from the right table, handling NULL left columns,
            rewriting RIGHT JOINs into cleaner LEFT JOINs, and counting zero-child entities accurately.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ 100% Right-Table Record Preservation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Equivalence: A RIGHT JOIN B ≡ B LEFT JOIN A
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Finding Unreferenced Parents (WHERE IS NULL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Accurate Zero Counts with COUNT(col)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: RIGHT JOIN Theory & Mechanics ──────────── */}
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
                The Mechanics of RIGHT OUTER JOIN &amp; Table Reflection
              </h2>
              <p className="text-xs text-slate-400">
                Guaranteed retention of all right tuples with automatic NULL padding for unmatched left attributes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">1. Right Preservation Rule</span>
              <strong className="text-white text-xs block font-mono">{"R1 ⟖ R2 = (R1 ⋈ R2) ∪ ({NULL} × Unmatched R2)"}</strong>
              <p className="text-xs text-slate-300">
                Every single row from the Right table appears in the output. If a course has no enrolled students, the student columns are filled with NULLs.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">2. The Reflection Principle</span>
              <strong className="text-white text-xs block font-mono">TableA RIGHT JOIN TableB ≡ TableB LEFT JOIN TableA</strong>
              <p className="text-xs text-slate-300">
                Any RIGHT JOIN can be rewritten as a LEFT JOIN by simply reversing the table order in the FROM clause, improving readability.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: RIGHT JOIN Venn & Preservation Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: RIGHT JOIN Full Right Circle Preservation vs LEFT JOIN Reflection
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="RIGHT JOIN Venn Diagram"
            >
              {/* Left Circle Outlined */}
              <circle cx="160" cy="70" r="55" fill="#1e293b" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="70" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">Left Table</text>
              <text x="130" y="85" fill="#94a3b8" textAnchor="middle" fontSize="7">(Matches Only)</text>

              {/* Entire Right Circle Highlighted */}
              <circle cx="230" cy="70" r="55" fill="#818cf8" fillOpacity="0.8" stroke="#818cf8" strokeWidth="2" />
              <text x="260" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">RIGHT TABLE</text>
              <text x="260" y="80" fill="#ffffff" textAnchor="middle" fontSize="8">(100% Retained)</text>

              {/* Intersection Label */}
              <text x="195" y="70" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="8">MATCHES</text>

              {/* Details Box */}
              <g transform="translate(360, 20)">
                <rect width="390" height="100" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                <text x="195" y="20" fill="#818cf8" textAnchor="middle" fontWeight="bold">RIGHT JOIN Output Breakdown</text>
                <text x="15" y="44" fill="#a7f3d0" fontSize="10">✓ Matched Courses (2): Return real enrolled student names</text>
                <text x="15" y="62" fill="#fde68a" fontSize="10">✓ Unmatched Course (Python AI): Returns NULL student info</text>
                <text x="15" y="80" fill="#38bdf8" fontSize="9" fontWeight="bold">✓ Total: 3 Courses (Zero Courses Erased from Catalog)</text>
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
                Interactive RIGHT JOIN Scenario Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test standard RIGHT JOINs with COALESCE(), anti-join empty course detection, and rewriting to clean LEFT JOINs
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedRightScenario("scen_right_standard")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRightScenario === "scen_right_standard"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Standard RIGHT JOIN
              </button>

              <button
                onClick={() => setSelectedRightScenario("scen_right_empty_course")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRightScenario === "scen_right_empty_course"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Empty Course Audit
              </button>

              <button
                onClick={() => setSelectedRightScenario("scen_right_to_left")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRightScenario === "scen_right_to_left"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Rewrite to LEFT JOIN
              </button>

              <button
                onClick={() => setSelectedRightScenario("scen_right_grouped")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedRightScenario === "scen_right_grouped"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. COUNT(col) Aggregation
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentRight.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentRight.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentRight.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                      )}
                    >
                      {currentRight.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentRight.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentRight.explanation}</p>
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
                        <th className="p-1.5">Course ID</th>
                        <th className="p-1.5">Title</th>
                        <th className="p-1.5">Fee</th>
                        <th className="p-1.5">Student / Info</th>
                        <th className="p-1.5">City / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentRight.resultRows.map((r, i) => (
                        <tr key={i} className={clsx(r.isNull ? "bg-amber-500/10" : "bg-emerald-500/5")}>
                          <td className="p-1.5 text-white font-bold">{r.cId}</td>
                          <td className="p-1.5 text-cyan-300 font-bold">{r.title}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.fee}</td>
                          <td className="p-1.5 text-slate-200">{r.name}</td>
                          <td className="p-1.5 text-slate-400">{r.city}</td>
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
                How Barrackpore and Kolkata training institutes structure right-preserving catalog queries
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Course Catalog Enrollment Audit
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ensuring every single course in the academy catalog appears on the administrative dashboard:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Preserving all courses on the admin dashboard:
SELECT 
    c.course_id,
    c.course_title,
    c.course_fee,
    COUNT(s.student_id) AS total_enrolled,
    CASE 
        WHEN COUNT(s.student_id) = 0 THEN 'Pending Launch' 
        ELSE 'Active' 
    END AS catalog_status
FROM students s
RIGHT JOIN courses c ON s.course_id = c.course_id
GROUP BY c.course_id, c.course_title, c.course_fee;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Product Category Stock Report
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Displaying all product categories including those with zero stocked items:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Auditing product categories with zero inventory:
SELECT 
    cat.category_name,
    COUNT(p.product_id) AS total_products,
    COALESCE(SUM(p.stock_quantity), 0) AS total_units_in_stock
FROM products p
RIGHT JOIN categories cat ON p.category_id = cat.category_id
GROUP BY cat.category_id, cat.category_name;`}
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
                Guidelines for using RIGHT JOINs and maintaining clean SQL coding standards
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
                  <strong className="text-white">1. Inconsistent Mixing of LEFT and RIGHT:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>FROM A LEFT JOIN B RIGHT JOIN C</code> creates confusing join precedence that is difficult to debug.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using COUNT(*) Instead of COUNT(col):</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>COUNT(*)</code> counts unmatched rows as 1; use <code>COUNT(left_table.id)</code> to correctly return 0.
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
                  <strong className="text-white">1. Rewrite to LEFT JOIN for Codebases:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Swap table order in the FROM clause to standardize all queries on natural left-to-right reading order.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use COALESCE() for UI Default Values:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wrap nullable columns with <code>COALESCE()</code> to render clean, professional UI labels.
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
              <span>RIGHT JOIN guarantees all rows from the Right table appear in the result</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Unmatched left-table columns are automatically populated with NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TableA RIGHT JOIN TableB is 100% equivalent to TableB LEFT JOIN TableA</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use WHERE left_table.id IS NULL to find right entities with zero children</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Standardize on LEFT JOIN in professional engineering codebases</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use COUNT(left_table.id) rather than COUNT(*) when grouping right joins</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="RIGHT (OUTER) JOIN &amp; Table Preservation – FAQs"
            questions={questions}
            subtitle="Master RIGHT JOIN, RIGHT OUTER JOIN, preserving right-table records, converting RIGHT JOIN to LEFT JOIN, finding right entities with 0 children, and codebase style consistency with 30 comprehensive Q&As"
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
            title="RIGHT (OUTER) JOIN: Preserving Right-Table Records"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_right_outer_join_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "RIGHT JOIN is the mirror image of LEFT JOIN! " +
              "In my classes at Coder & AccoTax in Barrackpore, I teach students: " +
              "'While RIGHT JOIN is mathematically sound, in 99% of production codebases, senior architects will ask you to rewrite it as a LEFT JOIN.' " +
              "Why? Because humans read from left to right. " +
              "`FROM courses c LEFT JOIN students s` is much easier to read and maintain than `FROM students s RIGHT JOIN courses c`. " +
              "Understand both, but write clean, left-to-right SQL code!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · RIGHT JOIN Mechanics · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
