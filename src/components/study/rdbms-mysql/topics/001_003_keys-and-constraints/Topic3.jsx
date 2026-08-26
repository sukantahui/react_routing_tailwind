import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Referential Integrity Rules & Foreign Key Checks
 * Module: 001_003_keys-and-constraints
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive FK Checks Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Sandbox State
  const [fkChecksEnabled, setFkChecksEnabled] = useState(true);
  const [testStudentId, setTestStudentId] = useState(999); // Non-existent student
  const [paymentAmount, setPaymentAmount] = useState(15000);
  const [engineResponse, setEngineResponse] = useState(
    "Configure parameters and click 'Execute Payment INSERT' to observe engine validation."
  );

  const [paymentsList, setPaymentsList] = useState([
    { id: 1, studentId: 101, amount: 15000, isOrphan: false },
    { id: 2, studentId: 102, amount: 18500, isOrphan: false },
  ]);

  const validStudentIds = [101, 102, 103, 104];

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

  const handleExecuteInsert = () => {
    const isTargetValid = validStudentIds.includes(Number(testStudentId));

    if (fkChecksEnabled) {
      if (!isTargetValid) {
        setEngineResponse(
          `❌ ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (\`college_db\`.\`student_payments\`, CONSTRAINT \`fk_payments_student\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\` (\`student_id\`)). Parent student_id=${testStudentId} does not exist!`
        );
        return;
      }
    }

    // Insert proceeds if checks disabled or student is valid
    const newRecord = {
      id: paymentsList.length + 1,
      studentId: Number(testStudentId),
      amount: Number(paymentAmount),
      isOrphan: !isTargetValid,
    };

    setPaymentsList([...paymentsList, newRecord]);

    if (!isTargetValid && !fkChecksEnabled) {
      setEngineResponse(
        `⚠️ Query OK, 1 row affected (0.01 sec) [foreign_key_checks=0]. WARNING: Orphaned record inserted referencing non-existent parent student_id=${testStudentId}!`
      );
    } else {
      setEngineResponse(
        `✓ Query OK, 1 row affected (0.01 sec). Successfully inserted payment for verified parent student_id=${testStudentId}.`
      );
    }
  };

  const handleReset = () => {
    setPaymentsList([
      { id: 1, studentId: 101, amount: 15000, isOrphan: false },
      { id: 2, studentId: 102, amount: 18500, isOrphan: false },
    ]);
    setEngineResponse("Simulator reset to initial verified state.");
  };

  const generatedSQL = `-- Step 1: Set Foreign Key Checks Mode\nSET foreign_key_checks = ${
    fkChecksEnabled ? 1 : 0
  };\n\n-- Step 2: Attempt Insert\nINSERT INTO student_payments (payment_id, student_id, amount_paid)\nVALUES (${
    paymentsList.length + 1
  }, ${testStudentId}, ${paymentAmount}.00);`;

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
            Module 001_003 · Keys & Constraints · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Referential Integrity Rules &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Foreign Key Checks
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the mechanics of <code>foreign_key_checks</code>, safe ETL data migrations,
            detecting corrupted orphaned child records with anti-joins, and diagnosing engine errors.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚙️ SET foreign_key_checks
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔍 Orphan Record Auditing
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Bulk ETL Dump Loading
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 SHOW ENGINE INNODB STATUS
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Foreign Key Checks & Migration Rules ────── */}
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
                The foreign_key_checks Toggle in MySQL
              </h2>
              <p className="text-xs text-slate-400">
                Safe administrative workflows for bulk ETL, table truncation, and dump restoration
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Enabled */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                SET foreign_key_checks = 1 (Production Default)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                InnoDB verifies parent presence and blocks invalid inserts or unsafe parent deletions.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                -- Rejects non-existent parent references (Error 1452)
                SET foreign_key_checks = 1;
              </pre>
            </div>

            {/* Card 2: Disabled */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                SET foreign_key_checks = 0 (Migrations Only)
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Bypasses constraint validation for high-speed batch imports and parent table truncations.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-amber-300 border border-slate-800">
                -- Must be re-enabled immediately after ETL!
                SET foreign_key_checks = 0;
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Anti-Join Orphan Detection Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Detecting Corrupted Orphan Records via Anti-Join (LEFT JOIN WHERE parent.id IS NULL)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Orphan Detection Anti-Join Diagram"
            >
              {/* Child Table */}
              <g transform="translate(30, 20)">
                <rect width="230" height="100" rx="8" fill="#1e293b" stroke="#14b8a6" />
                <text x="115" y="24" fill="#14b8a6" textAnchor="middle" fontWeight="bold">
                  payments (Child)
                </text>
                <line x1="10" y1="34" x2="220" y2="34" stroke="#334155" />
                <text x="15" y="54" fill="#cbd5e1" fontSize="10">Payment #1 → Student 101</text>
                <text x="15" y="72" fill="#cbd5e1" fontSize="10">Payment #2 → Student 102</text>
                <text x="15" y="90" fill="#f43f5e" fontWeight="bold" fontSize="10">Payment #3 → Student 999 ⚠️</text>
              </g>

              {/* Arrow */}
              <g transform="translate(270, 65)">
                <path d="M 0 0 L 110 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                <polygon points="110,-4 120,0 110,4" fill="#38bdf8" />
                <text x="55" y="-8" fill="#38bdf8" textAnchor="middle" fontSize="9">
                  LEFT JOIN
                </text>
              </g>

              {/* Parent Table */}
              <g transform="translate(400, 20)">
                <rect width="210" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="105" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  students (Parent)
                </text>
                <line x1="10" y1="34" x2="200" y2="34" stroke="#334155" />
                <text x="15" y="54" fill="#10b981" fontSize="10">Student 101 (Mamata)</text>
                <text x="15" y="72" fill="#10b981" fontSize="10">Student 102 (Abhronila)</text>
                <text x="15" y="90" fill="#64748b" fontStyle="italic" fontSize="10">Student 999 (NULL)</text>
              </g>

              {/* Result Flag */}
              <g transform="translate(630, 45)">
                <rect width="125" height="50" rx="6" fill="#881337" stroke="#f43f5e" />
                <text x="62" y="22" fill="#fecdd3" textAnchor="middle" fontWeight="bold" fontSize="10">
                  Orphan Detected!
                </text>
                <text x="62" y="38" fill="#cbd5e1" textAnchor="middle" fontSize="8">
                  Payment #3 (No Parent)
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive FK Checks Simulator ─────────── */}
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
                Interactive foreign_key_checks Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle foreign_key_checks and test inserting valid vs non-existent student IDs
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  foreign_key_checks Status:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFkChecksEnabled(true)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      fkChecksEnabled
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    1 (Checks Enabled)
                  </button>
                  <button
                    onClick={() => setFkChecksEnabled(false)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      !fkChecksEnabled
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    )}
                  &gt;
                    0 (Checks Disabled)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Student ID to Reference:
                  </label>
                  <select
                    value={testStudentId}
                    onChange={(e) => setTestStudentId(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  &gt;
                    <option value={101}>101 (Mamata - Valid)</option>
                    <option value={102}>102 (Abhronila - Valid)</option>
                    <option value={999}>999 (Non-Existent!)</option>
                    <option value={888}>888 (Non-Existent!)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Tuition Fee Amount (₹):
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  /&gt;
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleExecuteInsert}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold hover:bg-teal-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Execute Payment INSERT
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-900 transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Log Window */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                  Engine Execution Feedback:
                </span>
                {engineResponse}
              </div>
            </div>

            {/* Generated SQL & Live Payments Table */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Commands:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Active Payments Table (Showing {paymentsList.length} Records):
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Payment ID</th>
                        <th className="p-2">Student ID</th>
                        <th className="p-2">Amount (₹)</th>
                        <th className="p-2">Integrity Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {paymentsList.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-cyan-400">#{p.id}</td>
                          <td className="p-2 text-white">{p.studentId}</td>
                          <td className="p-2 text-emerald-400">₹{p.amount.toLocaleString("en-IN")}.00</td>
                          <td className="p-2">
                            {p.isOrphan ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                ⚠️ Corrupted Orphan
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                                ✓ Verified Parent
                              </span>
                            )}
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
                Migration and orphan auditing scripts from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore College Bulk Data Migration Script
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Migration</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Disabling checks to allow parent table truncation and bulk dump loading in high speed.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Step 1: Temporarily disable FK checks for session
SET foreign_key_checks = 0;

-- Step 2: Truncate tables in arbitrary order
TRUNCATE TABLE student_payments;
TRUNCATE TABLE course_enrollments;
TRUNCATE TABLE students;

-- Step 3: Load bulk CSV datasets
-- (Data load statements executed here)

-- Step 4: Re-enable foreign key validation immediately
SET foreign_key_checks = 1;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Orphan Record Audit Query
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Audit</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Anti-join query to identify any orphaned payments whose students were deleted during ETL.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    p.payment_id,
    p.student_id AS "Orphaned Reference",
    p.amount_paid AS "Amount (₹)",
    p.payment_date
FROM student_payments p
LEFT JOIN students s ON p.student_id = s.student_id
WHERE s.student_id IS NULL; -- Filters only orphaned child records`}
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
                Prevent permanent data corruption and un-diagnosed foreign key errors
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
                  <strong className="text-white">1. Leaving Checks Disabled:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Forgetting to re-enable <code>foreign_key_checks=1</code> allows silent orphan corruption.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Re-enabling Validates Old Rows:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>SET foreign_key_checks=1</code> does NOT retroactively validate existing corrupt data.
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
                  <strong className="text-white">1. Run Anti-Join Audits Post-ETL:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Execute <code>LEFT JOIN ... WHERE parent.id IS NULL</code> to catch corrupt records.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Inspect Engine Status on Error:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Run <code>SHOW ENGINE INNODB STATUS</code> to read full foreign key diagnostics.
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
              <span><code>foreign_key_checks = 1</code> must remain active in all production applications</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Disabling checks is strictly reserved for administrative ETL and migration scripts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always re-enable <code>foreign_key_checks = 1</code> immediately in the same script</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Re-enabling checks only affects future queries, not existing corrupted rows</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use Anti-Joins to audit and clean up orphaned records after large data imports</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Check <code>SHOW ENGINE INNODB STATUS</code> to diagnose complex foreign key errors</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Referential Integrity & FK Checks – FAQs"
            questions={questions}
            subtitle="Master foreign key checks, safe migration scripts, and orphan auditing with 30 comprehensive Q&As"
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
            title="Referential Integrity Rules & Foreign Key Checks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_referential_integrity_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Setting `foreign_key_checks = 0` is a double-edged sword. It is essential when importing massive 50GB backup dumps " +
              "where tables are restored alphabetically rather than by relational hierarchy. However, in my classes in Barrackpore, " +
              "I remind students: MySQL does NOT retroactively validate existing rows when you turn checks back on! If you accidentally " +
              "load bad data while checks are off, those orphaned records will sit in your database causing subtle join errors and " +
              "reporting bugs until someone discovers them months later. Always run an anti-join audit script immediately after your migrations."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · Referential Integrity · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
