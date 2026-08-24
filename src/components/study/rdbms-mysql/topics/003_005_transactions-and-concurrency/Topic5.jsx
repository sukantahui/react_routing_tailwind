import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Concurrency Anomalies: Dirty Read, Non-Repeatable Read, Phantom Read, Lost Updates
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the 4 classic database concurrency anomalies (Dirty Read, Non-Repeatable Read, Phantom Read, Lost Updates), ANSI SQL isolation matrix, interleaved timeline traces, and prevention mechanisms.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedAnomalyScenario, setSelectedAnomalyScenario] = useState("lost_update_disaster");

  const anomalyScenarios = {
    lost_update_disaster: {
      title: "1. Lost Update: Concurrent Overwrites Erasing Legitimate Changes",
      badge: "Lost Update (G-0)",
      badgeColor: "rose",
      sqlQuery: `-- ❌ THE LOST UPDATE DISASTER (Read-Modify-Write Race Condition):
-- Initial State: Mamata's balance is ₹20,000.00

-- Session 1 (ATM Deposit):
START TRANSACTION;
SELECT balance INTO @bal1 FROM student_ledgers WHERE student_id = 101; -- Reads ₹20,000
-- Session 1 calculates: ₹20,000 + ₹5,000 = ₹25,000

-- Session 2 CONCURRENTLY (Online Bank Transfer):
START TRANSACTION;
SELECT balance INTO @bal2 FROM student_ledgers WHERE student_id = 101; -- Reads ₹20,000 (Stale!)
-- Session 2 calculates: ₹20,000 + ₹3,000 = ₹23,000

-- Session 1 Writes & Commits:
UPDATE student_ledgers SET balance = 25000.00 WHERE student_id = 101;
COMMIT; -- Balance is now ₹25,000

-- Session 2 Writes & Commits (BLIND OVERWRITE!):
UPDATE student_ledgers SET balance = 23000.00 WHERE student_id = 101;
COMMIT; -- 🚨 OVERWROTE Session 1! Mamata's ₹5,000 deposit is LOST FOREVER!`,
      resultRows: [
        { transaction: "Session 1 (ATM ₹5K Deposit)", initialRead: "₹20,000.00", writeAttempt: "Writes ₹25,000.00", finalStateOnDisk: "Overwritten by Session 2 💥", anomalyType: "Lost Update", status: "₹5,000 Lost 🚨" },
        { transaction: "Session 2 (Online ₹3K Deposit)", initialRead: "₹20,000.00 (Stale)", writeAttempt: "Writes ₹23,000.00", finalStateOnDisk: "₹23,000.00 (Current)", anomalyType: "Blind Overwrite", status: "Corrupted Balance" },
      ],
      explanation:
        "A Lost Update occurs when two concurrent transactions read the same initial state, compute independent updates, and the second transaction overwrites the first without incorporating its changes.",
    },
    dirty_read_trap: {
      title: "2. Dirty Read: Reading Uncommitted Data That is Later Rolled Back",
      badge: "Dirty Read (G-1)",
      badgeColor: "amber",
      sqlQuery: `-- ❌ THE DIRTY READ TRAP (Allowed ONLY in READ UNCOMMITTED):
-- Initial State: Mamata's scholarship is ₹0.00

-- Session 1 (Administrator stages scholarship uncommitted):
START TRANSACTION;
UPDATE student_scholarships SET amount = 50000.00 WHERE student_id = 101;
-- (NOT YET COMMITTED!)

-- Session 2 (Accounts Officer with READ UNCOMMITTED):
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT amount FROM student_scholarships WHERE student_id = 101;
-- 🚨 Reads DIRTY value: ₹50,000.00! Officer issues an official fee waiver!

-- Session 1 encounters error and rolls back:
ROLLBACK; -- Scholarship returns to ₹0.00!

-- 💥 Result: Session 2 acted on temporary data that never officially existed!`,
      resultRows: [
        { transaction: "Session 1 (Admin Staging)", initialRead: "₹0.00", writeAttempt: "Uncommitted ₹50,000.00", finalStateOnDisk: "Rolled Back to ₹0.00", anomalyType: "Staged Mutation", status: "Rolled Back 🛡️" },
        { transaction: "Session 2 (Officer Read)", initialRead: "₹50,000.00 (Dirty Read)", writeAttempt: "Approved Grant on False Data", finalStateOnDisk: "Decision Corrupted", anomalyType: "Dirty Read 💥", status: "Phantom Approval 🚨" },
      ],
      explanation:
        "A Dirty Read occurs when a transaction reads uncommitted modifications from another transaction. If the modifying transaction rolls back, the reader has acted on false, non-existent data.",
    },
    non_repeatable_read_fuzzy: {
      title: "3. Non-Repeatable Read: Row Values Changing Mid-Transaction",
      badge: "Non-Repeatable Read",
      badgeColor: "cyan",
      sqlQuery: `-- ❌ NON-REPEATABLE READ (Fuzzy Read in READ COMMITTED):
-- Session 1 (Audit Officer generating report):
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;

-- Query 1: Reads Susmita's GPA:
SELECT gpa FROM student_records WHERE student_id = 102; -- Reads 3.85

-- Session 2 CONCURRENTLY (Exam Controller):
START TRANSACTION;
UPDATE student_records SET gpa = 3.95 WHERE student_id = 102;
COMMIT; -- Committed successfully!

-- Session 1 (Later in the same transaction):
-- Query 2: Re-reads Susmita's GPA:
SELECT gpa FROM student_records WHERE student_id = 102; 
-- 🚨 Returns 3.95! The exact same query returned two different values in one transaction!`,
      resultRows: [
        { transaction: "Session 1 (Audit Query 1)", initialRead: "GPA: 3.85", writeAttempt: "Read Only", finalStateOnDisk: "Initial Snapshot", anomalyType: "Baseline Read", status: "Read 1: 3.85" },
        { transaction: "Session 2 (Exam Update)", initialRead: "GPA: 3.85", writeAttempt: "UPDATE gpa = 3.95 + COMMIT", finalStateOnDisk: "Committed to Disk", anomalyType: "Concurrent Update", status: "Committed ✅" },
        { transaction: "Session 1 (Audit Query 2)", initialRead: "GPA: 3.95 (Changed!)", writeAttempt: "Read Only", finalStateOnDisk: "Modified Row", anomalyType: "Non-Repeatable Read", status: "💥 Value Shifted!" },
      ],
      explanation:
        "A Non-Repeatable Read occurs when a transaction reads a row, another transaction modifies that row and commits, and the first transaction re-reads the row, finding modified column values.",
    },
    phantom_read_anomaly: {
      title: "4. Phantom Read: New Matching Rows Appearing in Range Queries",
      badge: "Phantom Read",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ PHANTOM READ (New Rows Appearing in Range Queries):
-- Session 1 (Scholarship Board auditing eligible students):
START TRANSACTION;

-- Query 1: Find all students with GPA >= 3.8:
SELECT COUNT(*) FROM student_records WHERE gpa >= 3.8; -- Returns 2 (Mamata, Susmita)

-- Session 2 CONCURRENTLY (New Student Admission):
START TRANSACTION;
INSERT INTO student_records (student_id, name, gpa) VALUES (105, 'Rohan', 3.9);
COMMIT; -- Committed successfully!

-- Session 1: Re-executes the exact same range query:
SELECT COUNT(*) FROM student_records WHERE gpa >= 3.8; 
-- 🚨 Under basic ANSI isolation, returns 3! A 'Phantom' student appeared mid-transaction!
-- (Note: MySQL InnoDB REPEATABLE READ prevents this via MVCC Snapshots & Next-Key Locks!)`,
      resultRows: [
        { transaction: "Session 1 (Range Query 1)", initialRead: "COUNT(*) = 2", writeAttempt: "Read Only", finalStateOnDisk: "Mamata, Susmita", anomalyType: "Baseline Range", status: "Count: 2" },
        { transaction: "Session 2 (New Admission)", initialRead: "N/A", writeAttempt: "INSERT Rohan (GPA 3.9) + COMMIT", finalStateOnDisk: "Rohan Added", anomalyType: "Concurrent Insert", status: "Committed ✅" },
        { transaction: "Session 1 (Range Query 2)", initialRead: "COUNT(*) = 3 (Phantom!)", writeAttempt: "Read Only", finalStateOnDisk: "Rohan Included", anomalyType: "Phantom Read 💥", status: "Phantom Row Detected" },
      ],
      explanation:
        "A Phantom Read occurs when a transaction executes a range query, another transaction inserts a new row matching that range and commits, and the first transaction re-runs the query, seeing a new 'phantom' row.",
    },
  };

  const navItems = [
    { id: "anomaly-overview", label: "1. The 4 Anomalies" },
    { id: "ansi-matrix", label: "2. ANSI Isolation Matrix" },
    { id: "svg-diagrams", label: "3. Anomaly & Matrix SVGs" },
    { id: "interactive-sandbox", label: "4. Live Anomaly Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_005</span>
            <span>•</span>
            <span>Topic 5 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Concurrency Anomalies
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Database Concurrency Anomalies
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Deep dive into the 4 classic concurrency defects in multi-user databases: Dirty Reads, Non-Repeatable Reads, Phantom Reads, and Lost Updates. Learn their root causes, interleaved execution timelines, and how InnoDB's locking and MVCC prevent data corruption.
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
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: The 4 Anomalies */}
        <section id="anomaly-overview" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Classic Concurrency Anomalies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The read and write inconsistencies that occur when concurrent transactions are inadequately isolated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">1. Dirty Read</div>
              <h3 className="text-sm font-bold text-white">Uncommitted Data Read</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reading modifications made by an uncommitted transaction that is later rolled back.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Non-Repeatable Read</div>
              <h3 className="text-sm font-bold text-white">Fuzzy Row Changes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Re-reading the exact same row returns different values because another transaction modified it.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase">3. Phantom Read</div>
              <h3 className="text-sm font-bold text-white">New Matching Rows</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Re-executing a range query returns newly inserted rows committed by another transaction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase">4. Lost Update</div>
              <h3 className="text-sm font-bold text-white">Blind Overwrites</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Two transactions read stale data simultaneously and overwrite each other, erasing changes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ANSI Isolation Matrix */}
        <section id="ansi-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The ANSI SQL Isolation Level Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard ANSI anomaly prevention matrix across the 4 transaction isolation levels.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4 text-cyan-400">Isolation Level</th>
                  <th className="py-3 px-4 text-amber-400">Dirty Read</th>
                  <th className="py-3 px-4 text-cyan-400">Non-Repeatable Read</th>
                  <th className="py-3 px-4 text-indigo-400">Phantom Read</th>
                  <th className="py-3 px-4 text-rose-400">Lost Update Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">READ UNCOMMITTED</td>
                  <td className="py-3 px-4 text-rose-400">Allowed 💥</td>
                  <td className="py-3 px-4 text-rose-400">Allowed 💥</td>
                  <td className="py-3 px-4 text-rose-400">Allowed 💥</td>
                  <td className="py-3 px-4 text-rose-400">Manual Locking Req.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">READ COMMITTED</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-rose-400">Allowed 💥</td>
                  <td className="py-3 px-4 text-rose-400">Allowed 💥</td>
                  <td className="py-3 px-4 text-rose-400">Manual Locking Req.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300">REPEATABLE READ (MySQL Default)</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented in InnoDB 🛡️</td>
                  <td className="py-3 px-4 text-rose-400">Manual Locking Req.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-emerald-400">SERIALIZABLE</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented ✅</td>
                  <td className="py-3 px-4 text-emerald-400">Prevented (Auto Locks) ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Anomaly Mechanics &amp; Lost Update Overwrites
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 4 concurrency defects and the lost update race condition.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: The 4 Anomalies */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 4 Concurrency Anomalies
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Dirty Read */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">1. DIRTY READ</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="110" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Reads Uncommitted Data</text>
                    <text x="110" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Tx Rolls Back Later 💥</text>
                  </g>

                  {/* Non-Repeatable Read */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#67e8f9" fontSize="9" fontWeight="bold" textAnchor="middle">2. NON-REPEATABLE READ</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Same Row Value Changes</text>
                    <text x="320" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Modified Mid-Tx 💥</text>
                  </g>

                  {/* Phantom Read */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">3. PHANTOM READ</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Range Query Row Count</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">New Rows Inserted 💥</text>
                  </g>

                  {/* Lost Update */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">4. LOST UPDATE</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Concurrent Blind Overwrite</text>
                    <text x="740" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Deposit Erased Forever 🚨</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Lost Update Race */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Lost Update Race Condition Timeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tx 1 Timeline */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">SESSION 1 (Reads ₹20K → Calculates ₹25K)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Writes ₹25,000 &amp; Commits at T1</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Overwritten immediately at T2! 💥</text>
                  </g>

                  {/* Tx 2 Timeline */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">SESSION 2 (Reads Stale ₹20K → Calculates ₹23K)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Blind Overwrites ₹23,000 at T2!</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🚨 Session 1's ₹5,000 Deposit is Erased!</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Concurrency Anomalies Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Lost Updates, Dirty Reads, Non-Repeatable Reads, and Phantom Reads live with interleaved transaction execution traces.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(anomalyScenarios).map(([key, item]) => {
              const isActive = selectedAnomalyScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAnomalyScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Anomaly" : "○ Run Anomaly Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{anomalyScenarios[selectedAnomalyScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{anomalyScenarios[selectedAnomalyScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Concurrency Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Interleaved Concurrency Trace</span>
                <span className="text-emerald-400">Anomaly Reproduction Script</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {anomalyScenarios[selectedAnomalyScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Transaction / Actor</th>
                    <th className="py-3 px-4 text-white">Initial Read</th>
                    <th className="py-3 px-4 text-emerald-400">Write Action</th>
                    <th className="py-3 px-4 text-amber-400">Final Disk State</th>
                    <th className="py-3 px-4 text-rose-400">Anomaly Detected</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {anomalyScenarios[selectedAnomalyScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.transaction}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.initialRead}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.writeAttempt}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.finalStateOnDisk}</td>
                      <td className="py-3 px-4 text-rose-400 font-mono">{row.anomalyType}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Committed") || row.status.includes("Rolled Back") || row.status.includes("Read 1")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world prevention of lost updates in exam seat booking and scholarship grants.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Eliminating Lost Updates in Barrackpore Exam Seat Allocations
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Exam Booking System</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an exam booking portal where two students simultaneously booked the last remaining seat in Lab 1. Both saw 1 seat available, and both decremented the counter, leaving Lab 1 overbooked by 1 student! Refactoring the read to use <code className="text-emerald-300 font-mono">SELECT available_seats FROM exam_labs WHERE lab_id = 1 FOR UPDATE;</code> locked the row, serializing the booking and rejecting the second student cleanly.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Pessimistic Lock Prevention of Lost Updates:
START TRANSACTION;
SELECT available_seats INTO v_seats FROM exam_labs WHERE lab_id = 1 FOR UPDATE;
IF v_seats > 0 THEN
    UPDATE exam_labs SET available_seats = available_seats - 1 WHERE lab_id = 1;
    INSERT INTO lab_bookings (student_id, lab_id) VALUES (p_student_id, 1);
    COMMIT;
ELSE
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat full: Lab booking failed.';
END IF;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid read-modify-write race conditions and never use READ UNCOMMITTED in finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Read-Modify-Write Without Locking (Lost Update Trap)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Reading a value into application memory and writing back an updated value without <code className="text-rose-300 font-mono">FOR UPDATE</code> or optimistic version checks causes silent data loss under concurrency.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always use <code className="text-emerald-400 font-mono">SELECT ... FOR UPDATE</code> or atomic in-place <code className="text-emerald-400 font-mono">SET bal = bal + ?</code> arithmetic!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Leverage REPEATABLE READ for Consistent Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MySQL's default <code className="text-emerald-400 font-mono">REPEATABLE READ</code> uses MVCC snapshots and Next-Key locks to eliminate both Non-Repeatable Reads and Phantom Reads automatically.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees immutable point-in-time read consistency across reports.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for Concurrency Anomalies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Anomalies Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Dirty Read:</strong> Reading uncommitted data that rolls back.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">Non-Repeatable Read:</strong> Same row values change mid-transaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">Phantom Read:</strong> New rows appear in range queries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-cyan-300">Lost Update:</strong> Overwriting concurrent changes; fix with <code className="text-cyan-300 font-mono">FOR UPDATE</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe atomic arithmetic...”</span>
                  Writing `UPDATE accounts SET balance = balance + 500 WHERE id = 1;` executes atomically in InnoDB, preventing lost updates without needing an explicit `FOR UPDATE` read!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Next-Key locks...”</span>
                  InnoDB's default REPEATABLE READ prevents phantom reads using Next-Key locks that lock both the record and the gap preceding it!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the 4 classic database concurrency anomalies (Dirty Read, Non-Repeatable Read, Phantom Read, Lost Updates), ANSI SQL isolation matrix, interleaved timeline traces, and prevention mechanisms.
            </p>
          </div>

          <FAQTemplate
            title="Concurrency Anomalies FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Concurrency Anomalies: Dirty Read, Non-Repeatable Read, Phantom Read, Lost Updates"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Concurrency anomalies are the primary source of subtle, intermittent bugs in enterprise databases. Always remember the Anomaly Hierarchy: READ COMMITTED eliminates Dirty Reads; REPEATABLE READ (MySQL's default) eliminates both Non-Repeatable Reads and Phantom Reads using MVCC snapshots and Next-Key locking; and Lost Updates must be guarded with SELECT ... FOR UPDATE or atomic in-place arithmetic. Mastering these distinctions will make your financial systems rock-solid!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
