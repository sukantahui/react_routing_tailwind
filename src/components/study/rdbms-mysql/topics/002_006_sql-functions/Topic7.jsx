import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Flow Control & Conditional Functions: IF(), IFNULL(), NULLIF(), COALESCE()
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Flow Control Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Flow Control State
  const [selectedFlowMode, setSelectedFlowMode] = useState("mode_ifnull_coalesce"); // "mode_ifnull_coalesce" | "mode_if_ternary" | "mode_nullif_defense" | "mode_waterfall_cascade"

  const flowScenarios = {
    mode_ifnull_coalesce: {
      title: "1. Handling Missing Data (IFNULL vs COALESCE)",
      sqlQuery: `SELECT 
    student_name,
    monthly_fee,
    scholarship_discount,
    IFNULL(scholarship_discount, 0) AS safe_discount,
    (monthly_fee - IFNULL(scholarship_discount, 0)) AS net_payable_inr,
    COALESCE(scholarship_discount, 0) AS ansi_safe_discount
FROM student_fees;`,
      resultRows: [
        { name: "Mamata Hui", fee: "₹5,000", rawDiscount: "NULL", safeDiscount: "₹0", netPay: "₹5,000", badgeColor: "emerald" },
        { name: "Susmita Sen", fee: "₹5,000", rawDiscount: "₹1,500", safeDiscount: "₹1,500", netPay: "₹3,500", badgeColor: "emerald" },
        { name: "Debangshu Roy", fee: "₹5,000", rawDiscount: "NULL", safeDiscount: "₹0", netPay: "₹5,000", badgeColor: "emerald" },
      ],
      verdictText: "✓ NULL POISONING PREVENTED",
      badgeColor: "emerald",
      explanation: "Without IFNULL/COALESCE, 5000 - NULL evaluates to NULL. Wrapping nullable columns in IFNULL(col, 0) ensures calculations yield valid monetary sums.",
    },
    mode_if_ternary: {
      title: "2. Binary Decision Logic (IF() Ternary Operator)",
      sqlQuery: `SELECT 
    student_name,
    marks_obtained,
    IF(marks_obtained >= 40, 'PASSED', 'FAILED') AS exam_result,
    IF(marks_obtained >= 75, 'Distinction', IF(marks_obtained >= 40, 'First Class', 'Need Improvement')) AS grade_tier
FROM semester_evaluations;`,
      resultRows: [
        { name: "Mahima Das", score: "88 / 100", result: "PASSED", gradeTier: "Distinction", badgeColor: "cyan" },
        { name: "Abhronila Saha", score: "54 / 100", result: "PASSED", gradeTier: "First Class", badgeColor: "cyan" },
        { name: "Arjun Banerjee", score: "32 / 100", result: "FAILED", gradeTier: "Need Improvement", badgeColor: "rose" },
      ],
      verdictText: "✓ DYNAMIC INLINE BRANCHING",
      badgeColor: "cyan",
      explanation: "IF(condition, true_value, false_value) operates like the JavaScript ternary operator (a ? b : c), evaluating boolean logic inline per row.",
    },
    mode_nullif_defense: {
      title: "3. Division by Zero Defense (NULLIF())",
      sqlQuery: `-- Preventing division-by-zero fatal crashes & warnings:
SELECT 
    batch_name,
    attended_sessions,
    total_sessions,
    ROUND((attended_sessions / NULLIF(total_sessions, 0)) * 100, 2) AS attendance_rate_pct
FROM batch_attendance_summary;`,
      resultRows: [
        { name: "React Barrackpore Batch", attended: "24", total: "25", rate: "96.00%", badgeColor: "emerald" },
        { name: "Java Ichapur Batch", attended: "18", total: "20", rate: "90.00%", badgeColor: "emerald" },
        { name: "New DevOps Batch (0 Sessions)", attended: "0", total: "0", rate: "NULL (Safe)", badgeColor: "amber" },
      ],
      verdictText: "✓ ZERO DIVISION CRASH AVERTED",
      badgeColor: "amber",
      explanation: "NULLIF(total_sessions, 0) transforms 0 into NULL. In SQL, any number divided by NULL safely produces NULL instead of throwing an exception.",
    },
    mode_waterfall_cascade: {
      title: "4. Multi-Tier Fallback Cascade (COALESCE())",
      sqlQuery: `-- Searching contact details across preferred hierarchy:
SELECT 
    student_name,
    whatsapp_no,
    mobile_no,
    parent_phone,
    email_address,
    COALESCE(whatsapp_no, mobile_no, parent_phone, email_address, '[NO CONTACT]') AS primary_contact_channel
FROM student_admissions;`,
      resultRows: [
        { name: "Mamata Hui", wApp: "NULL", mob: "+91-98301-11111", parent: "+91-98301-22222", email: "mamata@kolkata.in", picked: "+91-98301-11111 (Mobile)", badgeColor: "indigo" },
        { name: "Susmita Sen", wApp: "+91-98302-33333", mob: "NULL", parent: "NULL", email: "susmita@barrackpore.in", picked: "+91-98302-33333 (WhatsApp)", badgeColor: "indigo" },
        { name: "Guest Inquirer", wApp: "NULL", mob: "NULL", parent: "NULL", email: "NULL", picked: "[NO CONTACT]", badgeColor: "rose" },
      ],
      verdictText: "✓ WATERFALL RESOLUTION SUCCESS",
      badgeColor: "indigo",
      explanation: "COALESCE scans arguments from left to right and returns the first NON-NULL value. If all arguments are NULL, it falls back to the final default string.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Core Flow Control Theory" },
    { id: "comparison-matrix", label: "2. Functions Comparison Matrix" },
    { id: "svg-diagram", label: "3. Flow Control Execution Architecture" },
    { id: "interactive-sandbox", label: "4. Interactive Flow Control Sandbox" },
    { id: "case-studies", label: "5. Real-World Industry Scenarios" },
    { id: "pitfalls-checklist", label: "6. Pitfalls & Best Practice Checklist" },
    { id: "faq-section", label: "7. Q&A / FAQs (30 Topics)" },
    { id: "teacher-notes", label: "8. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 7 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Flow Control & NULL Safety
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Flow Control & Conditional Functions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master runtime decision trees and robust NULL defense in MySQL using{" "}
            <code className="text-cyan-300 font-mono font-bold">IF()</code>,{" "}
            <code className="text-emerald-300 font-mono font-bold">IFNULL()</code>,{" "}
            <code className="text-amber-300 font-mono font-bold">NULLIF()</code>, and the ANSI-standard{" "}
            <code className="text-indigo-300 font-mono font-bold">COALESCE()</code>.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Core Theory */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Core Flow Control Theory & The Three-Valued Logic Challenge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Relational databases operate on Three-Valued Logic (TRUE, FALSE, UNKNOWN/NULL). Flow control functions prevent missing data from poisoning business computations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  IF(cond, v1, v2)
                </span>
                <h3 className="text-lg font-semibold text-white">The Inline Ternary Branch</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Operates as an inline decision branch returning <code className="text-cyan-300">v1</code> if <code className="text-cyan-300">cond</code> evaluates to TRUE (or non-zero numeric), and <code className="text-cyan-300">v2</code> if FALSE or NULL.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Binary branch:</span></div>
                <div><span className="text-cyan-400">SELECT IF</span>(fee_balance &lt;= 0, <span className="text-emerald-400">'CLEARED'</span>, <span className="text-rose-400">'PENDING'</span>);</div>
                <div><span className="text-slate-500">-- Output: 'CLEARED' or 'PENDING'</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  IFNULL(expr1, expr2)
                </span>
                <h3 className="text-lg font-semibold text-white">The Direct 2-Argument Fallback</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                MySQL-specific shorthand that returns <code className="text-emerald-300">expr1</code> if it is NOT NULL; otherwise returns the substitute value <code className="text-emerald-300">expr2</code>.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Zero-filling missing numeric bonus:</span></div>
                <div><span className="text-emerald-400">SELECT IFNULL</span>(scholarship_amount, 0.00);</div>
                <div><span className="text-slate-500">-- Output: 1500.00 or 0.00 (never NULL)</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-amber-950/80 text-amber-400 font-mono text-sm font-bold border border-amber-800">
                  NULLIF(expr1, expr2)
                </span>
                <h3 className="text-lg font-semibold text-white">The Zero-Division Shield</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Returns <code className="text-amber-300">NULL</code> if both arguments are equal (<code className="text-amber-300">expr1 = expr2</code>); otherwise returns <code className="text-amber-300">expr1</code>. Indispensable for preventing divide-by-zero crashes.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Safe division without crashes:</span></div>
                <div><span className="text-amber-400">SELECT</span> 100 / <span className="text-amber-400">NULLIF</span>(total_students, 0);</div>
                <div><span className="text-slate-500">-- If total_students=0 =&gt; 100 / NULL =&gt; NULL (Safe)</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-sm font-bold border border-indigo-800">
                  COALESCE(v1, v2, ... vn)
                </span>
                <h3 className="text-lg font-semibold text-white">The Multi-Tier ANSI Standard</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                The ANSI SQL standard function accepting arbitrary arguments. Evaluates arguments sequentially and returns the first non-null expression. Highly portable across PostgreSQL, Oracle, and SQL Server.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Multi-tier waterfall contact lookup:</span></div>
                <div><span className="text-indigo-400">SELECT COALESCE</span>(wapp, mob, parent_tel, <span className="text-emerald-400">'N/A'</span>);</div>
                <div><span className="text-slate-500">-- Scans left-to-right until first non-null</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Detailed Flow Control Comparison Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing syntax rules, argument counts, ANSI compliance, and ideal engineering use cases.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Function</th>
                  <th className="py-3.5 px-4">Arguments</th>
                  <th className="py-3.5 px-4">ANSI Standard?</th>
                  <th className="py-3.5 px-4">Primary Purpose</th>
                  <th className="py-3.5 px-4">Example Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">IF(c, t, f)</td>
                  <td className="py-3 px-4">Exactly 3</td>
                  <td className="py-3 px-4 text-rose-400">No (MySQL/MariaDB)</td>
                  <td className="py-3 px-4 text-slate-300">Inline ternary condition branching</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">IF(10 &gt; 5, 'Pass', 'Fail') &rarr; 'Pass'</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">IFNULL(a, b)</td>
                  <td className="py-3 px-4">Exactly 2</td>
                  <td className="py-3 px-4 text-rose-400">No (MySQL shorthand)</td>
                  <td className="py-3 px-4 text-slate-300">Substitute default value if column is NULL</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">IFNULL(NULL, 0) &rarr; 0</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">NULLIF(a, b)</td>
                  <td className="py-3 px-4">Exactly 2</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (ANSI SQL)</td>
                  <td className="py-3 px-4 text-slate-300">Convert equal values to NULL (division safety)</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">NULLIF(50, 50) &rarr; NULL</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-bold">COALESCE(a, b, ...)</td>
                  <td className="py-3 px-4">Arbitrary (2 to N)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (ANSI SQL)</td>
                  <td className="py-3 px-4 text-slate-300">Multi-tier cascade fallback chain</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400">COALESCE(NULL, NULL, 'Kolkata') &rarr; 'Kolkata'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Flow Control Execution Architecture */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Flow Control Execution & Evaluation Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how MySQL evaluates conditional branches, resolves NULL cascades, and neutralizes zero divisions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowBox" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Title */}
              <text x="450" y="36" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MySQL FLOW CONTROL & CONDITIONAL RESOLUTION PIPELINE
              </text>

              {/* Branch 1: IF() Ternary Logic */}
              <g transform="translate(40, 70)">
                <rect width="250" height="270" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" filter="url(#shadowBox)" />
                <rect x="0" y="0" width="250" height="36" rx="12" fill="url(#gradCyan)" />
                <text x="125" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  IF(condition, v1, v2)
                </text>

                {/* Flow steps */}
                <rect x="25" y="60" width="200" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="125" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Evaluate (score &gt;= 40)
                </text>

                {/* Diamond/decision simulation */}
                <path d="M 80 120 L 50 160 L 50 200" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 170 120 L 200 160 L 200 200" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

                <rect x="20" y="200" width="90" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="65" y="224" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                  TRUE: 'PASS'
                </text>

                <rect x="140" y="200" width="90" height="40" rx="6" fill="#881337" stroke="#f43f5e" />
                <text x="185" y="224" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">
                  FALSE: 'FAIL'
                </text>

                <text x="125" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Binary Ternary Decision
                </text>
              </g>

              {/* Branch 2: COALESCE Waterfall Cascade */}
              <g transform="translate(325, 70)">
                <rect width="250" height="270" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" filter="url(#shadowBox)" />
                <rect x="0" y="0" width="250" height="36" rx="12" fill="url(#gradIndigo)" />
                <text x="125" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COALESCE(arg1, arg2, ... def)
                </text>

                {/* Steps */}
                <rect x="20" y="55" width="210" height="30" rx="6" fill="#1e1b4b" stroke="#4338ca" />
                <text x="125" y="75" fill="#c7d2fe" fontSize="10" textAnchor="middle">Arg 1: whatsapp_no (NULL &rarr; Skip)</text>

                <rect x="20" y="95" width="210" height="30" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                <text x="125" y="115" fill="#a5b4fc" fontSize="10" textAnchor="middle">Arg 2: mobile_no ('98301...') &rarr; MATCH!</text>

                <rect x="20" y="135" width="210" height="30" rx="6" fill="#0f172a" stroke="#334155" opacity="0.5" />
                <text x="125" y="155" fill="#64748b" fontSize="10" textAnchor="middle">Arg 3: email (Skipped)</text>

                <path d="M 125 170 L 125 195" fill="none" stroke="#6366f1" strokeWidth="2" />
                <polygon points="125,200 120,192 130,192" fill="#6366f1" />

                <rect x="20" y="205" width="210" height="40" rx="8" fill="#312e81" stroke="#818cf8" />
                <text x="125" y="225" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Output: '98301...'
                </text>
                <text x="125" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  First Non-NULL Scanned
                </text>
              </g>

              {/* Branch 3: NULLIF Division Defense */}
              <g transform="translate(610, 70)">
                <rect width="250" height="270" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" filter="url(#shadowBox)" />
                <rect x="0" y="0" width="250" height="36" rx="12" fill="url(#gradAmber)" />
                <text x="125" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  NULLIF(divisor, 0)
                </text>

                {/* Steps */}
                <rect x="20" y="55" width="210" height="35" rx="6" fill="#1e293b" stroke="#475569" />
                <text x="125" y="77" fill="#fde68a" fontSize="10.5" textAnchor="middle">Total Classes = 0</text>

                <path d="M 125 95 L 125 115" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="125,120 120,112 130,112" fill="#f59e0b" />

                <rect x="20" y="125" width="210" height="35" rx="6" fill="#451a03" stroke="#f59e0b" />
                <text x="125" y="147" fill="#fef3c7" fontSize="10.5" fontWeight="bold" textAnchor="middle">NULLIF(0, 0) &rarr; returns NULL</text>

                <path d="M 125 165 L 125 185" fill="none" stroke="#10b981" strokeWidth="2" />
                <polygon points="125,190 120,182 130,182" fill="#10b981" />

                <rect x="20" y="195" width="210" height="45" rx="8" fill="#064e3b" stroke="#10b981" />
                <text x="125" y="215" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                  att / NULL = NULL
                </text>
                <text x="125" y="230" fill="#6ee7b7" fontSize="9.5" textAnchor="middle">
                  (Clean NULL, No Fatal Error!)
                </text>

                <text x="125" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Zero Division Protected
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 4: Interactive Flow Control Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Flow Control Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test different conditional evaluation scenarios in real-time. Switch tabs below to observe dynamic SQL transformations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(flowScenarios).map((key) => {
                const item = flowScenarios[key];
                const isActive = selectedFlowMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFlowMode(key)}
                    className={clsx(
                      "p-3 rounded-xl text-left transition-all border text-xs sm:text-sm font-medium",
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="font-semibold">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Simulation Display */}
            {(() => {
              const active = flowScenarios[selectedFlowMode];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{active.title}</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border",
                        active.badgeColor === "emerald" && "bg-emerald-950 text-emerald-300 border-emerald-700",
                        active.badgeColor === "cyan" && "bg-cyan-950 text-cyan-300 border-cyan-700",
                        active.badgeColor === "amber" && "bg-amber-950 text-amber-300 border-amber-700",
                        active.badgeColor === "indigo" && "bg-indigo-950 text-indigo-300 border-indigo-700"
                      )}
                    >
                      {active.verdictText}
                    </span>
                  </div>

                  {/* SQL Code Preview */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                    <pre>{active.sqlQuery}</pre>
                  </div>

                  {/* Dynamic Simulation Result Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Entity / Student</th>
                          {selectedFlowMode === "mode_ifnull_coalesce" && (
                            <>
                              <th className="py-2.5 px-4">Gross Fee</th>
                              <th className="py-2.5 px-4">Raw Discount</th>
                              <th className="py-2.5 px-4">IFNULL(disc, 0)</th>
                              <th className="py-2.5 px-4 font-bold text-emerald-400">Net Payable (₹)</th>
                            </>
                          )}
                          {selectedFlowMode === "mode_if_ternary" && (
                            <>
                              <th className="py-2.5 px-4">Score</th>
                              <th className="py-2.5 px-4 font-bold text-cyan-300">Exam Result</th>
                              <th className="py-2.5 px-4">Grade Tier</th>
                            </>
                          )}
                          {selectedFlowMode === "mode_nullif_defense" && (
                            <>
                              <th className="py-2.5 px-4">Attended</th>
                              <th className="py-2.5 px-4">Total Sessions</th>
                              <th className="py-2.5 px-4 font-bold text-amber-300">Attendance Rate</th>
                            </>
                          )}
                          {selectedFlowMode === "mode_waterfall_cascade" && (
                            <>
                              <th className="py-2.5 px-4">WhatsApp</th>
                              <th className="py-2.5 px-4">Mobile</th>
                              <th className="py-2.5 px-4">Email</th>
                              <th className="py-2.5 px-4 font-bold text-indigo-300">Resolved Primary Contact</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.name}</td>
                            {selectedFlowMode === "mode_ifnull_coalesce" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300">{row.fee}</td>
                                <td className="py-2.5 px-4 text-slate-400">{row.rawDiscount}</td>
                                <td className="py-2.5 px-4 text-emerald-400">{row.safeDiscount}</td>
                                <td className="py-2.5 px-4 font-bold text-emerald-300">{row.netPay}</td>
                              </>
                            )}
                            {selectedFlowMode === "mode_if_ternary" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300">{row.score}</td>
                                <td className="py-2.5 px-4 font-bold text-cyan-300">{row.result}</td>
                                <td className="py-2.5 px-4 text-slate-300">{row.gradeTier}</td>
                              </>
                            )}
                            {selectedFlowMode === "mode_nullif_defense" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-300">{row.attended}</td>
                                <td className="py-2.5 px-4 text-slate-400">{row.total}</td>
                                <td className="py-2.5 px-4 font-bold text-amber-300">{row.rate}</td>
                              </>
                            )}
                            {selectedFlowMode === "mode_waterfall_cascade" && (
                              <>
                                <td className="py-2.5 px-4 text-slate-400">{row.wApp}</td>
                                <td className="py-2.5 px-4 text-slate-300">{row.mob}</td>
                                <td className="py-2.5 px-4 text-slate-400">{row.email}</td>
                                <td className="py-2.5 px-4 font-bold text-indigo-300">{row.picked}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Explanatory Note */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-cyan-400">Architectural Note: </span>
                    {active.explanation}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations using flow control functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">Student Scholarship & Fee Clearance Engine</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Calculates net fees payable in Indian Rupee (₹) by subtracting nullable discounts, classifying dues, and applying prompt payment bonuses.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    student_name,
    total_tuition_fee,
    IFNULL(scholarship_amount, 0) AS safe_scholarship,
    (total_tuition_fee - IFNULL(scholarship_amount, 0)) AS net_payable_inr,
    IF((total_tuition_fee - IFNULL(scholarship_amount, 0) - paid_amount) <= 0, 
       'FEE_CLEARED', 'PAYMENT_PENDING') AS clearance_status
FROM student_ledger;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">Dynamic Pricing & Inventory Stock Alert</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Evaluates product promotional pricing and generates automated warehouse reorder alerts when stock falls below minimum safety thresholds.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    product_name,
    base_price,
    ROUND(base_price * (1 - IFNULL(promo_discount_pct, 0) / 100), 2) AS selling_price_inr,
    stock_quantity,
    IF(stock_quantity = 0, 'OUT_OF_STOCK', 
       IF(stock_quantity < 10, 'CRITICAL_REORDER', 'HEALTHY')) AS warehouse_stock_flag
FROM retail_inventory;`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Ichapur Attendance Portal</span>
              </div>
              <h3 className="text-lg font-bold text-white">Zero-Division Crash Defense in Batch Metrics</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Safely computes completion and attendance percentages for newly inaugurated batches where class counts or total assignments are zero.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    batch_code,
    conducted_hours,
    total_planned_hours,
    ROUND((conducted_hours / NULLIF(total_planned_hours, 0)) * 100, 2) AS curriculum_progress_pct,
    IFNULL(ROUND((conducted_hours / NULLIF(total_planned_hours, 0)) * 100, 2), 0.00) AS safe_display_pct
FROM batch_schedules;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Jadavpur Alumni Network</span>
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Tier Contact Waterfall Cascade</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Implements an automated communication cascade that selects the primary notification channel from a fallback hierarchy of student contacts.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    student_id,
    student_name,
    COALESCE(
      whatsapp_mobile, 
      primary_mobile, 
      guardian_contact, 
      emergency_contact, 
      email_id, 
      '[NO CONTACT REGISTERED]'
    ) AS dispatch_recipient
FROM student_directory;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pitfalls & Best Practice Checklist */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid silent bugs, performance slowdowns, and non-SARGable queries when writing conditional SQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Wrapping WHERE indexed columns in IF():</strong>{" "}
                    Writing <code className="text-rose-300">WHERE IF(status = 'ACTIVE', 1, 0) = 1</code> prevents B-Tree index usage (full table scan). Always write <code className="text-emerald-300">WHERE status = 'ACTIVE'</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Assuming NULL = NULL evaluates to TRUE:</strong>{" "}
                    <code className="text-rose-300">NULLIF(NULL, NULL)</code> evaluates to NULL because NULL equality is UNKNOWN. Use <code className="text-emerald-300">IS NULL</code> for explicit NULL testing.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Evaluating COALESCE inside SUM():</strong>{" "}
                    <code className="text-rose-300">SUM(COALESCE(bonus, 0))</code> evaluates the function for every single row. Prefer <code className="text-emerald-300">COALESCE(SUM(bonus), 0)</code> to evaluate once on the final scalar sum.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Using IFNULL() in cross-database code:</strong>{" "}
                    <code className="text-rose-300">IFNULL()</code> is MySQL/SQLite specific. If your application might migrate to PostgreSQL or Oracle, use ANSI-compliant <code className="text-emerald-300">COALESCE()</code>.
                  </div>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>✓ Production Best Practices Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Always protect divisions:</strong> Wrap any dynamic divisor with <code className="text-emerald-300">NULLIF(divisor, 0)</code> to guarantee complete safety against runtime crashes.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Wrap aggregate sums for reports:</strong> When computing totals on filtered subsets, use <code className="text-emerald-300">COALESCE(SUM(col), 0)</code> so empty sets render numeric <code className="text-emerald-300">0.00</code> instead of <code className="text-amber-300">NULL</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Keep IF() simple:</strong> For binary conditions, <code className="text-cyan-300">IF()</code> is crisp and clean. For 3+ conditions, switch to <code className="text-cyan-300">CASE WHEN ... THEN</code> for better readability and maintainability.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Ensure type compatibility:</strong> Make sure fallback values in <code className="text-indigo-300">COALESCE()</code> match the expected destination column data type to avoid unintended string coercion.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your mastery of MySQL flow control, ternary operators, NULL safeguards, and ANSI portability.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 7: Flow Control Functions" />
          </div>
        </section>

        {/* SECTION 8: Teacher Note & Printable Text */}
        <section id="teacher-notes" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Teacher's Note & Raw Printable Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instructor summary by Sukanta Hui with printable raw text reference for classroom handouts and offline study.
            </p>
          </div>

          {/* Teacher Sukanta Hui Component */}
          <Teacher
            note={`Dear Students (Mamata, Susmita, Mahima, Abhronila, Debangshu),

In production database architecture, NULL is never 'zero' or 'empty string'—it represents UNKNOWN or MISSING information. If you perform arithmetic on a NULL column without safety guards, the entire calculation silently collapses into NULL (Null Poisoning).

Remember these three golden rules:
1. Use IFNULL() or COALESCE() to substitute defaults before performing arithmetic (e.g. fee - IFNULL(discount, 0)).
2. Always shield divisors with NULLIF(divisor, 0) to avoid runtime zero-division crashes.
3. Use COALESCE() for multi-tier fallback lookups and for clean report totals (COALESCE(SUM(amount), 0)).

Practice the interactive sandbox scenarios above and solve all 30 questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 7 – Flow Control & Conditional Functions (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic7;
