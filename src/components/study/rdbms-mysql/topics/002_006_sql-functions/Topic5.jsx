import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Date Calculations: DATE_ADD, DATE_SUB, DATEDIFF, TIMEDIFF, TIMESTAMPDIFF
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Date Calculation Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic5 = () => {
  const sectionRefs = useRef([]);

  // Interactive Temporal Math State
  const [selectedCalcMode, setSelectedCalcMode] = useState("mode_age_calculation"); // "mode_age_calculation" | "mode_course_expiry" | "mode_overdue_fines" | "mode_dispatch_duration"

  const calcScenarios = {
    mode_age_calculation: {
      title: "1. Exact Student Age Calculation (TIMESTAMPDIFF)",
      sqlQuery: `-- Calculating exact completed years of age:
SELECT 
    student_name,
    dob,
    TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS exact_completed_age_years,
    TIMESTAMPDIFF(MONTH, dob, CURDATE()) AS total_months_alive
FROM students;`,
      resultRows: [
        { student: "Mamata Hui", col1: "DOB: 2004-03-15", col2: "Exact Age: 22 Years", col3: "269 Months", badgeColor: "emerald" },
        { student: "Debangshu Roy", col1: "DOB: 2002-11-20", col2: "Exact Age: 23 Years", col3: "285 Months", badgeColor: "emerald" },
        { student: "Susmita Sen", col1: "DOB: 2005-09-08", col2: "Exact Age: 20 Years", col3: "251 Months", badgeColor: "emerald" },
      ],
      verdictText: "✓ EXACT BIRTHDAY EVALUATION",
      badgeColor: "emerald",
      explanation: "TIMESTAMPDIFF(YEAR, dob, CURDATE()) accurately evaluates whether the student's birthday has passed in the current calendar year, avoiding 1-year offset bugs.",
    },
    mode_course_expiry: {
      title: "2. Course Expiration & Fee Milestones (DATE_ADD)",
      sqlQuery: `-- Adding 6-month validity and 30-day installment due dates:
SELECT 
    student_name,
    admission_date,
    DATE_ADD(admission_date, INTERVAL 6 MONTH) AS course_expiration_date,
    DATE_ADD(admission_date, INTERVAL 30 DAY) AS installment_2_due_date
FROM student_enrollments;`,
      resultRows: [
        { student: "Mamata Hui", col1: "Joined: 2026-01-10", col2: "Expires: 2026-07-10 (6 Mo)", col3: "Due Date: 2026-02-09 (30 Days)", badgeColor: "cyan" },
        { student: "Debangshu Roy", col1: "Joined: 2026-02-01", col2: "Expires: 2026-08-01 (6 Mo)", col3: "Due Date: 2026-03-03 (30 Days)", badgeColor: "cyan" },
      ],
      verdictText: "✓ AUTOMATED EXPIRATION DATES",
      badgeColor: "cyan",
      explanation: "DATE_ADD with INTERVAL units automatically calculates future milestones while adjusting for varying month lengths (28, 30, or 31 days).",
    },
    mode_overdue_fines: {
      title: "3. Library Overdue Fine Auditing (DATEDIFF & ₹2/Day)",
      sqlQuery: `-- Computing overdue late fees in Indian Rupee (₹):
SELECT 
    student_name,
    due_date,
    CURDATE() AS return_date,
    DATEDIFF(CURDATE(), due_date) AS days_late,
    GREATEST(0, DATEDIFF(CURDATE(), due_date)) * 2.00 AS overdue_fine_inr
FROM library_loans;`,
      resultRows: [
        { student: "Debangshu Roy", col1: "Due: 2026-08-10", col2: "Late: 14 Days", col3: "Fine: ₹28.00 (₹2/day)", badgeColor: "rose" },
        { student: "Mamata Hui", col1: "Due: 2026-08-28", col2: "Late: 0 Days (Early)", col3: "Fine: ₹0.00 (Clear)", badgeColor: "emerald" },
      ],
      verdictText: "✓ AUDIT LATE PENALTIES",
      badgeColor: "indigo",
      explanation: "DATEDIFF(d1, d2) computes day differences directly, while GREATEST(0, days) prevents charging negative fines for on-time or early returns.",
    },
    mode_dispatch_duration: {
      title: "4. E-Commerce Order Fulfillment Transit Time (TIMESTAMPDIFF)",
      sqlQuery: `-- Calculating exact delivery transit duration in minutes and hours:
SELECT 
    order_id,
    dispatched_at,
    delivered_at,
    TIMESTAMPDIFF(HOUR, dispatched_at, delivered_at) AS transit_hours,
    TIMESTAMPDIFF(MINUTE, dispatched_at, delivered_at) AS transit_minutes
FROM shipment_logs;`,
      resultRows: [
        { student: "ORD-9021 (Kolkata)", col1: "Dispatched: 09:00", col2: "Delivered: 13:45", col3: "Transit: 4 Hours (285 Mins)", badgeColor: "cyan" },
        { student: "ORD-9022 (Barrackpore)", col1: "Dispatched: 10:15", col2: "Delivered: 12:30", col3: "Transit: 2 Hours (135 Mins)", badgeColor: "emerald" },
      ],
      verdictText: "✓ LOGISTICS TRANSIT DURATION",
      badgeColor: "cyan",
      explanation: "TIMESTAMPDIFF supports flexible duration units (MINUTE, HOUR, DAY), providing granular metrics for logistics SLA tracking.",
    },
  };

  const currentCalc = calcScenarios[selectedCalcMode];

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
            Module 002_006 · SQL Functions · Topic 5
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Date Calculations:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              DATE_ADD, DATEDIFF &amp; TIMESTAMPDIFF
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master temporal arithmetic in MySQL: interval additions with DATE_ADD and DATE_SUB, integer day differences with DATEDIFF,
            exact age and multi-unit duration metrics with TIMESTAMPDIFF, and SARGable range queries.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ➕ DATE_ADD(d, INTERVAL 6 MONTH)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📅 DATEDIFF(d1, d2) [Days]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎂 TIMESTAMPDIFF(YEAR, dob, today)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⏱️ TIMEDIFF(t1, t2) [HH:MM:SS]
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Temporal Arithmetic Mechanics ──────────── */}
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
                The Mechanics of SQL Temporal Arithmetic
              </h2>
              <p className="text-xs text-slate-400">
                Understanding operand order differences: DATEDIFF (d1 - d2) vs TIMESTAMPDIFF (d2 - d1)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Exact Age Computation</span>
              <strong className="text-white text-xs block font-mono">TIMESTAMPDIFF(YEAR, dob, CURDATE())</strong>
              <p className="text-xs text-slate-300">
                Evaluates birthday milestones accurately, returning full completed years without year subtraction errors.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Interval Milestones</span>
              <strong className="text-white text-xs block font-mono">admission_date + INTERVAL 6 MONTH</strong>
              <p className="text-xs text-slate-300">
                Automatically handles leap years and variable month lengths to compute course expiration dates and payment deadlines.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Temporal Arithmetic Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: DATEDIFF (d1 - d2) vs TIMESTAMPDIFF (d2 - d1) Operand Order
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Date Calculations Diagram"
            >
              {/* DATEDIFF Box */}
              <g transform="translate(20, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="175" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">DATEDIFF(date1, date2) = date1 - date2</text>
                <text x="12" y="45" fill="#a7f3d0" fontSize="9">DATEDIFF('2026-08-30', '2026-08-20') ➔ +10 Days</text>
                <text x="12" y="65" fill="#cbd5e1" fontSize="9">Returns: Integer Days only (Ignores Time)</text>
                <text x="12" y="82" fill="#38bdf8" fontSize="8">Use for Library Fines &amp; Overdue Invoices</text>
              </g>

              {/* TIMESTAMPDIFF Box */}
              <g transform="translate(410, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="175" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">TIMESTAMPDIFF(unit, d1, d2) = d2 - d1</text>
                <text x="12" y="45" fill="#10b981" fontSize="9" fontWeight="bold">TIMESTAMPDIFF(YEAR, dob, today) ➔ Exact Age</text>
                <text x="12" y="65" fill="#cbd5e1" fontSize="9">Supports: YEAR, MONTH, DAY, HOUR, MINUTE</text>
                <text x="12" y="82" fill="#fde68a" fontSize="8">Operands reversed: 2nd argument minus 1st!</text>
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
                Interactive Date Calculation Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore student age calculation, course expiration milestones, overdue fines, and e-commerce transit durations
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedCalcMode("mode_age_calculation")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedCalcMode === "mode_age_calculation"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Exact Age (Years)
              </button>

              <button
                onClick={() => setSelectedCalcMode("mode_course_expiry")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedCalcMode === "mode_course_expiry"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Expiration (DATE_ADD)
              </button>

              <button
                onClick={() => setSelectedCalcMode("mode_overdue_fines")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedCalcMode === "mode_overdue_fines"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Overdue Fines (₹)
              </button>

              <button
                onClick={() => setSelectedCalcMode("mode_dispatch_duration")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedCalcMode === "mode_dispatch_duration"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Transit Duration
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentCalc.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentCalc.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentCalc.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentCalc.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentCalc.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentCalc.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentCalc.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Calculated Temporal Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Student / Entity</th>
                        <th className="p-1.5">Metric 1</th>
                        <th className="p-1.5">Calculated Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentCalc.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.student}</td>
                          <td className="p-1.5 text-cyan-300">{r.col1}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.col2} {r.col3 ? `(${r.col3})` : ""}</td>
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
                How Barrackpore and Kolkata training institutes use temporal calculations in daily operations
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Automated Course Expiry Notification Engine
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding students whose 6-month course validity will expire in the next 15 days:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Expiry Alert Query (Expiring within 15 Days):
SELECT 
    student_id,
    student_name,
    admission_date,
    DATE_ADD(admission_date, INTERVAL 6 MONTH) AS expiry_date,
    DATEDIFF(DATE_ADD(admission_date, INTERVAL 6 MONTH), CURDATE()) AS days_remaining
FROM students
WHERE DATE_ADD(admission_date, INTERVAL 6 MONTH) BETWEEN CURDATE() AND CURDATE() + INTERVAL 15 DAY;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Food Delivery Carrier SLA Breach Detector
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Food Tech</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Auditing 30-minute express food deliveries and calculating delivery penalties:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- SLA Delivery Breach Tracker:
SELECT 
    order_id,
    rider_name,
    order_placed_time,
    delivered_time,
    TIMESTAMPDIFF(MINUTE, order_placed_time, delivered_time) AS total_minutes,
    CASE 
        WHEN TIMESTAMPDIFF(MINUTE, order_placed_time, delivered_time) > 30 
        THEN CONCAT('BREACH (Delayed by ', TIMESTAMPDIFF(MINUTE, order_placed_time, delivered_time) - 30, ' mins)')
        ELSE 'ON TIME'
    END AS sla_status
FROM delivery_fleet_logs;`}
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
                Guidelines for writing accurate and index-friendly date calculation queries
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
                  <strong className="text-white">1. Year Subtraction for Age:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>YEAR(today) - YEAR(dob)</code> miscalculates age by 1 year before the student's birthday.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. TIMESTAMPDIFF Operand Confusion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting that <code>TIMESTAMPDIFF(unit, d1, d2)</code> computes <code>d2 - d1</code>, returning negative numbers.
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
                  <strong className="text-white">1. Use TIMESTAMPDIFF for Age:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always use <code>TIMESTAMPDIFF(YEAR, dob, CURDATE())</code> for accurate completed age calculation.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. SARGable Date Ranges in WHERE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>WHERE created_at &gt;= CURDATE() - INTERVAL 30 DAY</code> to preserve B-Tree index lookups.
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
              <span>DATE_ADD() and DATE_SUB() perform interval arithmetic</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DATEDIFF(d1, d2) computes d1 - d2 in integer days</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TIMESTAMPDIFF(unit, d1, d2) computes d2 - d1 in requested units</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always compute human age using TIMESTAMPDIFF(YEAR, dob, CURDATE())</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TIMEDIFF is capped at 838 hours; use TIMESTAMPDIFF(HOUR) for large spans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Write SARGable date ranges in WHERE clauses to maintain index seek performance</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Date Calculations &amp; Temporal Arithmetic – FAQs"
            questions={questions}
            subtitle="Master date interval math, DATE_ADD, DATEDIFF operand order, exact age computation with TIMESTAMPDIFF, and SARGable query design with 30 comprehensive Q&As"
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
            title="Date Calculations: DATE_ADD, DATE_SUB, DATEDIFF, TIMEDIFF, TIMESTAMPDIFF"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic5_date_calculations_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Date arithmetic is essential for any business system! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I share this memorable rule: " +
              "'If a student was born on December 31, 2004, and today is January 1, 2026, `2026 - 2004 = 22`. " +
              "But they are NOT 22 yet—they just turned 21 yesterday!' " +
              "That is why you must NEVER use year subtraction for age. Always use `TIMESTAMPDIFF(YEAR, dob, CURDATE())`. " +
              "And when adding intervals for fees and expirations, `admission_date + INTERVAL 6 MONTH` handles all calendar nuances automatically!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 5 · Date Calculations · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;
