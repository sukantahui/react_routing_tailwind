import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – LEFT (OUTER) JOIN: Preserving Left-Table Records and Handling NULLs
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive LEFT JOIN Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive LEFT JOIN State
  const [selectedLeftScenario, setSelectedLeftScenario] = useState("scen_coalesce_left"); // "scen_coalesce_left" | "scen_orphan_anti" | "scen_where_trap" | "scen_safe_on"

  const leftScenarios = {
    scen_coalesce_left: {
      title: "1. Complete LEFT JOIN with COALESCE()",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.city,
    COALESCE(c.course_title, 'Self-Study / Unassigned') AS course_title,
    COALESCE(c.course_fee, '₹0.00') AS course_fee
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id;`,
      resultRows: [
        { id: "101", name: "Mamata Hui", city: "Barrackpore", course: "MySQL Master", fee: "₹4,500", isNull: false },
        { id: "102", name: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500", isNull: false },
        { id: "103", name: "Susmita Sen", city: "Ichapur", course: "Self-Study / Unassigned", fee: "₹0.00", isNull: true },
        { id: "104", name: "Mahima Shaw", city: "Jadavpur", course: "Self-Study / Unassigned", fee: "₹0.00", isNull: true },
      ],
      verdictText: "✓ ALL 4 STUDENTS PRESERVED",
      badgeColor: "emerald",
      explanation: "Every single student in the left table is returned! Unmatched students (Susmita and Mahima) have their NULL course columns formatted safely via COALESCE().",
    },
    scen_orphan_anti: {
      title: "2. Finding Orphan / Unenrolled Students (Anti-Join)",
      sqlQuery: `SELECT 
    s.student_id,
    s.student_name,
    s.city,
    'Unassigned' AS status
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id
WHERE c.course_id IS NULL;`,
      resultRows: [
        { id: "103", name: "Susmita Sen", city: "Ichapur", course: "Unassigned", fee: "N/A", isNull: true },
        { id: "104", name: "Mahima Shaw", city: "Jadavpur", course: "Unassigned", fee: "N/A", isNull: true },
      ],
      verdictText: "2 UNENROLLED STUDENTS FOUND",
      badgeColor: "cyan",
      explanation: "Filtering WHERE c.course_id IS NULL identifies exactly which students have zero matching enrollments. Mathematically equivalent to Set Difference (Students - Courses).",
    },
    scen_where_trap: {
      title: "3. The Fatal WHERE Clause Trap (Accidental INNER JOIN)",
      sqlQuery: `-- ❌ DANGEROUS: Filters out NULL rows in WHERE!
SELECT 
    s.student_name,
    c.course_title,
    c.course_fee
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id
WHERE c.course_fee > '₹4,000'; -- Silently drops Susmita and Mahima!`,
      resultRows: [
        { id: "101", name: "Mamata Hui", city: "Barrackpore", course: "MySQL Master", fee: "₹4,500", isNull: false },
        { id: "102", name: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500", isNull: false },
      ],
      verdictText: "❌ ACCIDENTAL INNER JOIN (LOST 2 STUDENTS)",
      badgeColor: "rose",
      explanation: "Placing a condition on the right table in WHERE discards all NULL rows! Susmita and Mahima are completely erased from the output, defeating the entire purpose of LEFT JOIN!",
    },
    scen_safe_on: {
      title: "4. Safe Right-Table Filtering in the ON Clause",
      sqlQuery: `-- ✅ SAFE: Filters right table in ON without dropping left rows!
SELECT 
    s.student_name,
    s.city,
    COALESCE(c.course_title, 'No Matching Premium Course') AS course_title
FROM students s
LEFT JOIN courses c 
    ON s.course_id = c.course_id 
   AND c.course_fee >= '₹5,000';`,
      resultRows: [
        { id: "101", name: "Mamata Hui", city: "Barrackpore", course: "No Matching Premium Course", fee: "₹0.00", isNull: true },
        { id: "102", name: "Debangshu Roy", city: "Kolkata", course: "React Architect", fee: "₹5,500", isNull: false },
        { id: "103", name: "Susmita Sen", city: "Ichapur", course: "No Matching Premium Course", fee: "₹0.00", isNull: true },
        { id: "104", name: "Mahima Shaw", city: "Jadavpur", course: "No Matching Premium Course", fee: "₹0.00", isNull: true },
      ],
      verdictText: "✓ ALL 4 STUDENTS PRESERVED SAFELY",
      badgeColor: "emerald",
      explanation: "Moving the right-table price filter into the ON clause ensures that non-matching courses become NULL while ALL 4 left students remain in the report.",
    },
  };

  const currentLeft = leftScenarios[selectedLeftScenario];

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
            Module 002_005 · SQL Joins · Topic 2
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            LEFT (OUTER) JOIN:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Preserving Left Records &amp; Handling NULLs
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the architecture of Outer Joins: preserving all primary entity records, sanitizing NULLs with COALESCE() and IFNULL(),
            mastering anti-join orphan detection, and avoiding the dangerous WHERE clause trap.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ 100% Left-Table Record Preservation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧱 NULL Padding for Unmatched Columns
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Anti-Join Orphan Detection (WHERE IS NULL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ The WHERE Clause Trap Solution
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: LEFT JOIN Theory & Mechanics ───────────── */}
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
                The Mechanics of LEFT OUTER JOIN &amp; NULL Handling
              </h2>
              <p className="text-xs text-slate-400">
                Guaranteed retention of all left tuples with automatic NULL padding for unmatched right attributes
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Left Preservation Rule</span>
              <strong className="text-white text-xs block font-mono">{"R1 ⟕ R2 = (R1 ⋈ R2) ∪ (Unmatched R1 × {NULL})"}</strong>
              <p className="text-xs text-slate-300">
                Every single row from the Left table appears in the output. If a student has no enrolled course, the course columns are filled with NULLs.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. The Fatal WHERE Trap</span>
              <strong className="text-white text-xs block font-mono">WHERE right_col &gt; 100 ➔ CONVERTS TO INNER JOIN</strong>
              <p className="text-xs text-slate-300">
                Because NULL comparisons evaluate to UNKNOWN, any WHERE filter on the right table discards NULL rows, silently erasing unmatched left records!
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: LEFT JOIN Venn & Preservation Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: LEFT JOIN Full Left Circle Preservation vs INNER JOIN Matching
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="LEFT JOIN Venn Diagram"
            >
              {/* Entire Left Circle Highlighted */}
              <circle cx="160" cy="70" r="55" fill="#10b981" fillOpacity="0.8" stroke="#10b981" strokeWidth="2" />
              <text x="130" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">LEFT TABLE</text>
              <text x="130" y="80" fill="#ffffff" textAnchor="middle" fontSize="8">(100% Retained)</text>

              {/* Right Circle Outlined */}
              <circle cx="230" cy="70" r="55" fill="#1e293b" fillOpacity="0.3" stroke="#818cf8" strokeWidth="2" />
              <text x="260" y="70" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="9">Right Table</text>
              <text x="260" y="85" fill="#94a3b8" textAnchor="middle" fontSize="7">(Matches Only)</text>

              {/* Intersection Label */}
              <text x="195" y="70" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="8">MATCHES</text>

              {/* Details Box */}
              <g transform="translate(360, 20)">
                <rect width="390" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="195" y="20" fill="#10b981" textAnchor="middle" fontWeight="bold">LEFT JOIN Output Breakdown</text>
                <text x="15" y="44" fill="#a7f3d0" fontSize="10">✓ Matched Students (2): Return real course titles &amp; fees</text>
                <text x="15" y="62" fill="#fde68a" fontSize="10">✓ Unmatched Students (2): Return NULL course columns (COALESCE friendly)</text>
                <text x="15" y="80" fill="#38bdf8" fontSize="9" fontWeight="bold">✓ Total: 4 Rows (Zero Students Erased from System)</text>
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
                Interactive LEFT JOIN Scenario Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Compare standard LEFT JOINs with COALESCE(), anti-join orphan detection, the dangerous WHERE trap, and safe ON filters
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedLeftScenario("scen_coalesce_left")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLeftScenario === "scen_coalesce_left"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. LEFT + COALESCE() ✓
              </button>

              <button
                onClick={() => setSelectedLeftScenario("scen_orphan_anti")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLeftScenario === "scen_orphan_anti"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Orphan Anti-Join
              </button>

              <button
                onClick={() => setSelectedLeftScenario("scen_where_trap")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLeftScenario === "scen_where_trap"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. The WHERE Trap ❌
              </button>

              <button
                onClick={() => setSelectedLeftScenario("scen_safe_on")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLeftScenario === "scen_safe_on"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Safe ON Filter ✓
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentLeft.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentLeft.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentLeft.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentLeft.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentLeft.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentLeft.explanation}</p>
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
                        <th className="p-1.5">ID</th>
                        <th className="p-1.5">Name</th>
                        <th className="p-1.5">City</th>
                        <th className="p-1.5">Course Title</th>
                        <th className="p-1.5">Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentLeft.resultRows.map((r, i) => (
                        <tr key={i} className={clsx(r.isNull ? "bg-amber-500/10" : "bg-emerald-500/5")}>
                          <td className="p-1.5 text-white font-bold">{r.id}</td>
                          <td className="p-1.5 text-cyan-300 font-bold">{r.name}</td>
                          <td className="p-1.5 text-slate-300">{r.city}</td>
                          <td className="p-1.5 text-slate-200">{r.course}</td>
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
                How Barrackpore and Kolkata training institutes use LEFT JOINs for auditing and dashboard metrics
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Fee Status &amp; Orphan Audit
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Preserving all students while reporting fee payment status in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Auditing Fee Payments with LEFT JOIN:
SELECT 
    s.student_id,
    s.student_name,
    COALESCE(c.course_title, 'Not Enrolled') AS course_title,
    COALESCE(p.amount_paid, 0.00) AS amount_paid,
    CASE 
        WHEN p.payment_id IS NULL THEN 'Fee Pending' 
        ELSE 'Paid' 
    END AS payment_status
FROM students s
LEFT JOIN courses c ON s.course_id = c.course_id
LEFT JOIN payments p ON s.student_id = p.student_id;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Customers with Zero Orders Report
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding inactive customers for re-engagement marketing campaigns:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Anti-Join for Customer Re-Engagement:
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    c.signup_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
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
                Guidelines for writing safe outer joins and handling NULL values correctly
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
                  <strong className="text-white">1. The WHERE Clause Filter Trap:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Filtering right-table columns in WHERE removes NULL rows, turning your LEFT JOIN into an INNER JOIN.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using COUNT(*) Instead of COUNT(col):</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>COUNT(*)</code> counts unmatched rows as 1; use <code>COUNT(right_col)</code> to correctly count 0.
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
                  <strong className="text-white">1. Use COALESCE() for UI Default Values:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wrap nullable columns with <code>COALESCE(c.name, 'Unassigned')</code> for clean, bug-free front-end displays.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Place Right-Table Filters in the ON Clause:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Put filters on the right table inside <code>ON ... AND right_col = val</code> to preserve all left records.
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
              <span>LEFT JOIN guarantees all rows from the Left table appear in the result</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Unmatched right-table columns are automatically populated with NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use WHERE right_table.id IS NULL to find orphan records (Anti-Join)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use COALESCE() or IFNULL() to replace NULLs with user-friendly defaults</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Beware the WHERE trap: move right-table filters into the ON clause</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use COUNT(right_table.id) rather than COUNT(*) when grouping outer joins</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="LEFT (OUTER) JOIN &amp; NULL Handling – FAQs"
            questions={questions}
            subtitle="Master LEFT JOIN, LEFT OUTER JOIN, preserving left-table records, handling NULLs with COALESCE and IFNULL, finding orphan records with anti-joins, and avoiding the WHERE clause filter trap with 30 comprehensive Q&As"
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
            title="LEFT (OUTER) JOIN: Preserving Left-Table Records and Handling NULLs"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_left_outer_join_nulls_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "LEFT JOIN is the ultimate safeguard against disappearing records! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I warn students about the classic 'Zero Sales Trap': " +
              "If the marketing team asks for a report of all products and you use an INNER JOIN, " +
              "every product with zero sales disappears completely from the report. " +
              "The CEO will think those products don't even exist! " +
              "Use `LEFT JOIN` to keep all products visible, and use `COALESCE(SUM(sales), 0)` to display ₹0.00. " +
              "And always watch out for the WHERE clause trap—if you filter the right table, put that condition in the `ON` clause!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · LEFT JOIN Mechanics · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
