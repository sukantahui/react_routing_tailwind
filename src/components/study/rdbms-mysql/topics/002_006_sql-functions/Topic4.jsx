import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Date & Time Retrieval: NOW(), CURDATE(), CURTIME(), UTC_TIMESTAMP()
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Date/Time Retrieval Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const sectionRefs = useRef([]);

  // Interactive Temporal State
  const [selectedTimeMode, setSelectedTimeMode] = useState("mode_local_vs_utc"); // "mode_local_vs_utc" | "mode_now_vs_sysdate" | "mode_fractional_precision" | "mode_audit_ddl"

  const temporalScenarios = {
    mode_local_vs_utc: {
      title: "1. Local Indian Time (IST) vs Universal UTC Clocks",
      sqlQuery: `SELECT 
    CURDATE() AS local_date_ist,
    CURTIME() AS local_time_ist,
    NOW() AS full_timestamp_ist,
    UTC_TIMESTAMP() AS global_timestamp_utc,
    CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '+05:30') AS converted_back_to_ist;`,
      resultRows: [
        { label: "Local Server (IST +05:30)", val1: "2026-08-24", val2: "14:30:00 (PM)", val3: "2026-08-24 14:30:00", badgeColor: "emerald" },
        { label: "Global UTC Clock (GMT+0)", val1: "2026-08-24", val2: "09:00:00 (AM)", val3: "2026-08-24 09:00:00", badgeColor: "cyan" },
      ],
      verdictText: "✓ DUAL TIME ZONE TRACKING",
      badgeColor: "emerald",
      explanation: "IST is 5 hours and 30 minutes ahead of UTC. Multi-region cloud applications store UTC in databases and convert to local time on UI dashboards.",
    },
    mode_now_vs_sysdate: {
      title: "2. Determinism: NOW() vs SYSDATE()",
      sqlQuery: `-- NOW() evaluates ONCE at statement start (Deterministic):
-- SYSDATE() evaluates per row dynamically (Non-Deterministic):
SELECT 
    student_name,
    NOW() AS statement_start_time,
    SYSDATE() AS row_eval_time,
    SLEEP(0.01) -- Simulating row processing delay
FROM students
LIMIT 3;`,
      resultRows: [
        { label: "Mamata Hui (Row 1)", val1: "NOW: 14:30:00.000", val2: "SYSDATE: 14:30:00.000", val3: "Delta: 0.00s", badgeColor: "emerald" },
        { label: "Debangshu Roy (Row 2)", val1: "NOW: 14:30:00.000", val2: "SYSDATE: 14:30:00.010", val3: "Delta: +10ms", badgeColor: "amber" },
        { label: "Susmita Sen (Row 3)", val1: "NOW: 14:30:00.000", val2: "SYSDATE: 14:30:00.020", val3: "Delta: +20ms", badgeColor: "rose" },
      ],
      verdictText: "✓ NOW() GUARANTEES REPLICATION INTEGRITY",
      badgeColor: "emerald",
      explanation: "NOW() guarantees that all rows in a query receive the identical timestamp, preventing replica server drift in MySQL binary logs.",
    },
    mode_fractional_precision: {
      title: "3. Fractional Second Precision (NOW(3) vs NOW(6))",
      sqlQuery: `-- High-frequency trading and precision audit logs:
SELECT 
    NOW() AS standard_seconds,
    NOW(3) AS millisecond_precision,
    NOW(6) AS microsecond_precision;`,
      resultRows: [
        { label: "Standard (0 digits)", val1: "2026-08-24 14:30:00", val2: "1 Second Precision", val3: "Standard Web Apps", badgeColor: "cyan" },
        { label: "Milliseconds (NOW(3))", val1: "2026-08-24 14:30:00.125", val2: "0.001s Precision", val3: "Payment Gateways", badgeColor: "indigo" },
        { label: "Microseconds (NOW(6))", val1: "2026-08-24 14:30:00.125482", val2: "0.000001s Precision", val3: "High-Freq Audits", badgeColor: "emerald" },
      ],
      verdictText: "✓ MICROSECOND TEMPORAL GRANULARITY",
      badgeColor: "indigo",
      explanation: "Passing precision arguments 0 to 6 captures sub-second timing, critical for recording payment gateway webhooks and financial ledger entries.",
    },
    mode_audit_ddl: {
      title: "4. Automated Timestamp Audit DDL Pattern",
      sqlQuery: `CREATE TABLE student_admissions (
    admission_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,
      resultRows: [
        { label: "INSERT Event", val1: "created_at: 2026-08-24 14:30:00", val2: "updated_at: 2026-08-24 14:30:00", val3: "Initial Record Commit", badgeColor: "emerald" },
        { label: "UPDATE Event (Later)", val1: "created_at: 2026-08-24 14:30:00", val2: "updated_at: 2026-08-24 16:45:10", val3: "Auto-Updated by Engine ✓", badgeColor: "cyan" },
      ],
      verdictText: "✓ ZERO-CODE AUTOMATED AUDIT TRAIL",
      badgeColor: "emerald",
      explanation: "MySQL automatically stamps new rows on INSERT and updates `updated_at` on every UPDATE with zero application code required!",
    },
  };

  const currentTime = temporalScenarios[selectedTimeMode];

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
            Module 002_006 · SQL Functions · Topic 4
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Date &amp; Time Retrieval:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              NOW, CURDATE, CURTIME &amp; UTC
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master temporal retrieval functions: server session clocks vs universal UTC timestamps, deterministic execution with NOW() vs SYSDATE(),
            fractional sub-second precision, and automated audit timestamp DDL patterns.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⏰ NOW() &amp; CURRENT_TIMESTAMP
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 CURDATE() &amp; CURTIME()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 UTC_TIMESTAMP() Global Clocks
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ NOW(3) &amp; NOW(6) Microseconds
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Temporal Retrieval Mechanics ───────────── */}
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
                The Mechanics of SQL Time Retrieval &amp; Determinism
              </h2>
              <p className="text-xs text-slate-400">
                Understanding statement-level determinism, local time zones vs UTC, and sub-second precision
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. NOW() Determinism</span>
              <strong className="text-white text-xs block font-mono">NOW() = Fixed Query Start Time</strong>
              <p className="text-xs text-slate-300">
                Evaluates exactly once when query execution begins. All rows processed in the query receive the exact same timestamp.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. UTC Storage Best Practice</span>
              <strong className="text-white text-xs block font-mono">UTC_TIMESTAMP() = GMT+0 Time</strong>
              <p className="text-xs text-slate-300">
                Stores timezone-neutral timestamps in databases, eliminating daylight saving drift and multi-region branch confusion.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Determinism & Time Zone Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Statement Determinism (NOW) vs Per-Row Clock (SYSDATE)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Temporal Determinism Diagram"
            >
              {/* NOW() Deterministic Model */}
              <g transform="translate(20, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="175" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">NOW() Statement Determinism</text>
                <text x="12" y="45" fill="#a7f3d0" fontSize="9">Query Start: 14:30:00.000 ➔ Locked</text>
                <text x="12" y="65" fill="#cbd5e1" fontSize="9">Row 1: 14:30:00 | Row 2: 14:30:00 | Row 3: 14:30:00</text>
                <text x="12" y="82" fill="#10b981" fontSize="8">✓ 100% Replication Safe across MySQL Replicas</text>
              </g>

              {/* SYSDATE() Non-Deterministic Model */}
              <g transform="translate(410, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#f43f5e" />
                <text x="175" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="10">SYSDATE() Dynamic Evaluation</text>
                <text x="12" y="45" fill="#fca5a5" fontSize="9">Row 1: 14:30:00.000 | Row 2: 14:30:00.010</text>
                <text x="12" y="65" fill="#fca5a5" fontSize="9">Row 3: 14:30:00.020 (Times change per row!)</text>
                <text x="12" y="82" fill="#fca5a5" fontSize="8">⚠️ Causes replication drift in binary logs</text>
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
                Interactive Date/Time Retrieval Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore local vs UTC times, NOW vs SYSDATE determinism, microsecond precision, and automated audit DDL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedTimeMode("mode_local_vs_utc")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTimeMode === "mode_local_vs_utc"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Local IST vs UTC
              </button>

              <button
                onClick={() => setSelectedTimeMode("mode_now_vs_sysdate")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTimeMode === "mode_now_vs_sysdate"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. NOW vs SYSDATE
              </button>

              <button
                onClick={() => setSelectedTimeMode("mode_fractional_precision")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTimeMode === "mode_fractional_precision"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Sub-Second Precision
              </button>

              <button
                onClick={() => setSelectedTimeMode("mode_audit_ddl")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTimeMode === "mode_audit_ddl"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Automated Audit DDL
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentTime.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentTime.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentTime.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentTime.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentTime.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentTime.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentTime.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Temporal Evaluation Metrics
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Context / Clock</th>
                        <th className="p-1.5">Date / Time Metric</th>
                        <th className="p-1.5">Audit Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentTime.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.label}</td>
                          <td className="p-1.5 text-cyan-300">{r.val1} ({r.val2})</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.val3}</td>
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
                How Barrackpore and Kolkata training institutes structure timestamping in live systems
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Exam Submission Deadline Enforcer
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Comparing submission timestamps against exam end times to evaluate late penalties:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Real-Time Exam Submission Audit:
SELECT 
    student_id,
    student_name,
    submitted_at,
    exam_cutoff_time,
    CASE 
        WHEN submitted_at <= exam_cutoff_time THEN 'ON TIME (Accepted)'
        ELSE CONCAT('LATE BY ', TIMESTAMPDIFF(MINUTE, exam_cutoff_time, submitted_at), ' MINS')
    END AS submission_status
FROM exam_submissions
WHERE exam_id = 'EXAM-2026-01';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-Region Payment Gateway Settlement
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Recording UTC timestamps on payments and converting to IST (+05:30) for Kolkata merchants:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Multi-Region Merchant Settlement Query:
SELECT 
    transaction_id,
    amount_inr,
    captured_at_utc,
    CONVERT_TZ(captured_at_utc, '+00:00', '+05:30') AS captured_at_ist,
    DATE(CONVERT_TZ(captured_at_utc, '+00:00', '+05:30')) AS merchant_settlement_date
FROM payment_gateway_transactions
WHERE captured_at_utc >= UTC_TIMESTAMP() - INTERVAL 24 HOUR;`}
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
                Guidelines for designing reliable timestamp architectures across databases
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
                  <strong className="text-white">1. Using SYSDATE in Replication:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>SYSDATE()</code> evaluates dynamically per row, causing primary and replica servers to record diverging timestamps.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Year 2038 TIMESTAMP Limitation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    32-bit <code>TIMESTAMP</code> overflows in January 2038; use <code>DATETIME</code> for dates extending beyond 2038.
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
                  <strong className="text-white">1. Always Store UTC Timestamps:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store timestamps in UTC (<code>UTC_TIMESTAMP()</code>) and convert to local time zones at the user interface.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Automated Audit DDL Columns:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Add <code>created_at</code> and <code>updated_at</code> with <code>CURRENT_TIMESTAMP</code> to every production table.
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
              <span>NOW() returns local date and time in YYYY-MM-DD HH:MM:SS format</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CURDATE() returns only date; CURTIME() returns only time</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>NOW() is deterministic (evaluates once at statement start)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>UTC_TIMESTAMP() provides timezone-neutral timestamps for global systems</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Specify fractional seconds with NOW(3) ms or NOW(6) microseconds</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP in DDL</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Date &amp; Time Retrieval Functions – FAQs"
            questions={questions}
            subtitle="Master temporal retrieval functions, NOW vs SYSDATE determinism, UTC global clocks, sub-second fractional precision, and automated audit timestamp DDL patterns with 30 comprehensive Q&As"
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
            title="Date &amp; Time Retrieval: NOW(), CURDATE(), CURTIME(), UTC_TIMESTAMP()"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_datetime_retrieval_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Time is the universal coordinate of relational databases! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I emphasize to my students: " +
              "'Never build a database table without `created_at` and `updated_at` audit columns.' " +
              "By adding `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` to your DDL, " +
              "MySQL handles your change history automatically. " +
              "And if you are building an application with users across India or worldwide, " +
              "always store your timestamps in UTC using `UTC_TIMESTAMP()` so you never suffer from time zone conversion nightmares!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 4 · Date &amp; Time Retrieval · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;
