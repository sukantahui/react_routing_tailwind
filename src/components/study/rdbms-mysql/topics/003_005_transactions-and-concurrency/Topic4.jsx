import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – SAVEPOINT and ROLLBACK TO SAVEPOINT: Partial Rollbacks
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on SAVEPOINT, ROLLBACK TO SAVEPOINT, RELEASE SAVEPOINT, partial rollback mechanics, savepoint stack lifecycles, and emulating nested transactions in enterprise MySQL architectures.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedSavepointScenario, setSelectedSavepointScenario] = useState("batch_enrollment_savepoint");

  const savepointScenarios = {
    batch_enrollment_savepoint: {
      title: "1. Batch Enrollment: Partial Rollback on Single Student Failure",
      badge: "Partial Rollback",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ PARTIAL ROLLBACK IN BATCH ENROLLMENTS:
START TRANSACTION;

-- Step 1: Enroll Mamata (Succeeds):
INSERT INTO course_enrollments (student_id, course_id) VALUES (101, 1);

-- Step 2: Enroll Susmita (Succeeds):
INSERT INTO course_enrollments (student_id, course_id) VALUES (102, 1);

-- 📍 Set Savepoint Bookmark after successful registrations:
SAVEPOINT sp_after_susmita;

-- Step 3: Attempt to Enroll Debangshu (Fails due to duplicate key or full capacity):
-- INSERT INTO course_enrollments (student_id, course_id) VALUES (103, 1); 💥 FAILS!

-- 🔄 Rollback ONLY Step 3 to savepoint:
ROLLBACK TO SAVEPOINT sp_after_susmita;

-- 💾 Commit Steps 1 & 2 permanently:
COMMIT; -- Mamata & Susmita enrolled successfully!`,
      resultRows: [
        { operation: "Enroll Mamata (ID 101)", executionState: "Inserted Successfully", savepointState: "No Savepoint Yet", dataPersistence: "Staged in Tx", status: "Active" },
        { operation: "Enroll Susmita (ID 102)", executionState: "Inserted Successfully", savepointState: "No Savepoint Yet", dataPersistence: "Staged in Tx", status: "Active" },
        { operation: "SAVEPOINT sp_after_susmita", executionState: "Bookmark Established", savepointState: "sp_after_susmita Active", dataPersistence: "LSN Marker Staged", status: "Bookmark Set 📍" },
        { operation: "Enroll Debangshu (ID 103)", executionState: "💥 Duplicate Key Failure", savepointState: "sp_after_susmita Active", dataPersistence: "Failed Mutation", status: "Failed" },
        { operation: "ROLLBACK TO sp_after_susmita", executionState: "Undoes Debangshu ONLY", savepointState: "Marker Retained", dataPersistence: "Mamata & Susmita Untouched", status: "Partial Rollback 🛡️" },
        { operation: "COMMIT", executionState: "Persists Mamata & Susmita", savepointState: "All Savepoints Cleared", dataPersistence: "Durable on Disk ✅", status: "Committed ✅" },
      ],
      explanation:
        "`SAVEPOINT sp_after_susmita` establishes a bookmark. When Debangshu's enrollment fails, `ROLLBACK TO SAVEPOINT` undoes Debangshu while keeping Mamata and Susmita intact for the final `COMMIT`.",
    },
    ecommerce_optional_addon: {
      title: "2. Optional Add-ons: Core Purchase OK + Failed Add-on Rollback",
      badge: "Optional Add-on",
      badgeColor: "cyan",
      sqlQuery: `-- E-Commerce Core Order OK + Optional Add-on Failure:
START TRANSACTION;

-- Step 1: Deduct ₹25,000 for Main Course Tuition (Mamata):
UPDATE student_ledgers SET balance = balance - 25000.00 WHERE student_id = 101;
INSERT INTO course_enrollments (student_id, course_id) VALUES (101, 1);

-- 📍 Bookmark Core Purchase:
SAVEPOINT sp_core_order_ok;

-- Step 2: Attempt optional Hostel Accommodation Booking (Capacity Full!):
-- UPDATE hostel_rooms SET available = available - 1 WHERE room_id = 5; 💥 FAILS!

-- 🔄 Rollback optional hostel booking failure without aborting tuition:
ROLLBACK TO SAVEPOINT sp_core_order_ok;

-- Final Commit: Core course enrollment is saved!
COMMIT;`,
      resultRows: [
        { operation: "Core Course Tuition (₹25K)", executionState: "Balance Deducted & Enrolled", savepointState: "Pre-Savepoint", dataPersistence: "Staged in Tx", status: "Core OK ✅" },
        { operation: "SAVEPOINT sp_core_order_ok", executionState: "Bookmark Established", savepointState: "sp_core_order_ok Active", dataPersistence: "LSN Marker Staged", status: "Bookmark Set 📍" },
        { operation: "Optional Hostel Booking", executionState: "💥 Room Capacity Full (0 Available)", savepointState: "sp_core_order_ok Active", dataPersistence: "Failed Update", status: "Add-on Failed" },
        { operation: "ROLLBACK TO sp_core_order_ok", executionState: "Reverses Hostel Attempt", savepointState: "Marker Retained", dataPersistence: "Core Tuition Preserved", status: "Partial Rollback 🛡️" },
        { operation: "COMMIT", executionState: "Persists Core Enrollment", savepointState: "Cleared", dataPersistence: "Durable on Disk ✅", status: "Committed ✅" },
      ],
      explanation:
        "Using savepoints for optional cart items allows systems to gracefully discard failed add-on items without aborting the customer's primary checkout.",
    },
    savepoint_stack_destruction: {
      title: "3. Stack Destruction: Rolling Back to sp1 Destroys sp2 & sp3",
      badge: "Stack Destruction",
      badgeColor: "rose",
      sqlQuery: `-- Savepoint Stack Dynamics & Destruction Rules:
START TRANSACTION;
INSERT INTO audit_trace VALUES ('Step 1');
SAVEPOINT sp1; -- Sets Bookmark 1

INSERT INTO audit_trace VALUES ('Step 2');
SAVEPOINT sp2; -- Sets Bookmark 2

INSERT INTO audit_trace VALUES ('Step 3');
SAVEPOINT sp3; -- Sets Bookmark 3

-- 🔄 Rollback to sp1 (The earliest savepoint):
ROLLBACK TO SAVEPOINT sp1;

-- 💥 CONSEQUENCE: sp2 and sp3 are AUTOMATICALLY DESTROYED!
-- Attempting: ROLLBACK TO SAVEPOINT sp2;
-- 💥 ERROR 1305 (42000): SAVEPOINT sp2 does not exist!

COMMIT;`,
      resultRows: [
        { operation: "SAVEPOINT sp1", executionState: "Stack: [sp1]", savepointState: "sp1 Active", dataPersistence: "Step 1 Staged", status: "Stack Layer 1" },
        { operation: "SAVEPOINT sp2", executionState: "Stack: [sp1, sp2]", savepointState: "sp2 Active", dataPersistence: "Step 2 Staged", status: "Stack Layer 2" },
        { operation: "SAVEPOINT sp3", executionState: "Stack: [sp1, sp2, sp3]", savepointState: "sp3 Active", dataPersistence: "Step 3 Staged", status: "Stack Layer 3" },
        { operation: "ROLLBACK TO sp1", executionState: "Stack: [sp1] (sp2 & sp3 Destroyed!)", savepointState: "sp1 Retained", dataPersistence: "Steps 2 & 3 Undone", status: "Stack Truncated 💥" },
      ],
      explanation:
        "Rolling back to an earlier savepoint (`sp1`) automatically deallocates all subsequent savepoints (`sp2`, `sp3`) declared after it in the transaction stack.",
    },
    nested_procedural_savepoint_guard: {
      title: "4. Procedural Pattern: Nested Sub-Routine Isolation with Savepoints",
      badge: "Nested Sub-Routine",
      badgeColor: "amber",
      sqlQuery: `-- Emulating Nested Transactions in Stored Procedures:
DELIMITER //

CREATE PROCEDURE sp_parent_workflow()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;

    START TRANSACTION;
    INSERT INTO batch_headers (title) VALUES ('Semester Batch 2024');

    -- Sub-task 1 with Savepoint Isolation:
    SAVEPOINT sp_child_task;
    BEGIN
        DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK TO SAVEPOINT sp_child_task; END;
        -- Risky child operation:
        INSERT INTO risky_table (val) VALUES ('test');
    END;

    -- Sub-task 2: Continues regardless of child failure:
    INSERT INTO batch_logs (log_msg) VALUES ('Workflow reached final phase');

    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { operation: "Insert Batch Header", executionState: "Parent Tx Started", savepointState: "Pre-Savepoint", dataPersistence: "Staged in Tx", status: "Active" },
        { operation: "SAVEPOINT sp_child_task", executionState: "Child Isolation Marker", savepointState: "sp_child_task Active", dataPersistence: "LSN Marker Staged", status: "Bookmark Set 📍" },
        { operation: "Risky Child Operation", executionState: "Catches SQLEXCEPTION & Rolls Back to sp", savepointState: "sp_child_task Triggered", dataPersistence: "Child Undone Safely", status: "Child Isolated 🛡️" },
        { operation: "Final Log & COMMIT", executionState: "Header & Log Saved", savepointState: "Cleared", dataPersistence: "Durable on Disk ✅", status: "Workflow Finished ✅" },
      ],
      explanation:
        "Wrapping risky procedural sub-tasks in savepoints allows stored procedures to isolate component failures without crashing or rolling back the outer workflow.",
    },
  };

  const navItems = [
    { id: "savepoint-concept", label: "1. What is a Savepoint?" },
    { id: "stack-mechanics", label: "2. Savepoint Stack Rules" },
    { id: "svg-diagrams", label: "3. Timeline & Stack SVGs" },
    { id: "interactive-sandbox", label: "4. Live Savepoint Workbench" },
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
            <span>Topic 4 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Partial Rollbacks
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            SAVEPOINT &amp; Partial Rollbacks in MySQL
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the mechanics of partial transaction rollbacks using <code className="text-cyan-300 font-mono">SAVEPOINT</code>, <code className="text-cyan-300 font-mono">ROLLBACK TO SAVEPOINT</code>, and <code className="text-cyan-300 font-mono">RELEASE SAVEPOINT</code>. Learn how to isolate sub-operation failures, manage savepoint stack lifecycles, and emulate nested transactions in enterprise architectures.
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
        {/* SECTION 1: What is a Savepoint? */}
        <section id="savepoint-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Database Savepoint?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A named bookmark that enables partial rollback without terminating the active transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">1. SAVEPOINT sp_name;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Establishes a named bookmark at the current Log Sequence Number (LSN) in the transaction's undo log.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">2. ROLLBACK TO sp_name;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Undoes all modifications made *after* the savepoint, while retaining all modifications made *before* it. The transaction remains <strong>ACTIVE</strong>!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 font-mono">3. RELEASE SAVEPOINT;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deletes the named marker from the current transaction's savepoint stack without rolling back or committing any data.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Stack Mechanics */}
        <section id="stack-mechanics" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Savepoint Stack &amp; Destruction Rules
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL manages multiple active savepoints in a single transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Rule 1</span>
              <h3 className="font-bold text-white">Overwriting Names</h3>
              <p className="text-slate-300 text-xs">
                Declaring a savepoint with an existing name replaces the old marker, moving the bookmark forward to the current position.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Rule 2</span>
              <h3 className="font-bold text-white">Cascade Destruction</h3>
              <p className="text-slate-300 text-xs">
                Rolling back to `sp1` automatically deletes and destroys all subsequent savepoints (`sp2`, `sp3`) created after `sp1`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Rule 3</span>
              <h3 className="font-bold text-white">Row Lock Release</h3>
              <p className="text-slate-300 text-xs">
                Row locks acquired by statements executed after the savepoint are released when rolling back to that savepoint.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Partial Rollback Timeline &amp; Stack Destruction
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the partial rollback execution timeline and savepoint stack deallocation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Timeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Partial Rollback Execution Timeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Stmt 1 */}
                  <g>
                    <rect x="20" y="30" width="160" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">1. Step 1 (Mamata)</text>
                    <rect x="30" y="70" width="140" height="40" rx="4" fill="#022c22" />
                    <text x="100" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">INSERT Mamata</text>
                    <text x="100" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Succeeds ✅</text>
                  </g>

                  {/* Step 2: SAVEPOINT */}
                  <g>
                    <rect x="200" y="30" width="170" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="285" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">2. SAVEPOINT sp1</text>
                    <rect x="210" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="285" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">📍 Bookmark Set</text>
                    <text x="285" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">LSN Offset Recorded</text>
                  </g>

                  {/* Step 3: Stmt 2 Fails */}
                  <g>
                    <rect x="390" y="30" width="170" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="475" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">3. Step 2 (Debangshu)</text>
                    <rect x="400" y="70" width="150" height="40" rx="4" fill="#1e293b" />
                    <text x="475" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">💥 Duplicate Key Fail</text>
                    <text x="475" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">ROLLBACK TO sp1;</text>
                  </g>

                  {/* Step 4: COMMIT */}
                  <g>
                    <rect x="580" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="705" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. COMMIT; (Persists Mamata)</text>
                    <rect x="590" y="70" width="230" height="40" rx="4" fill="#022c22" />
                    <text x="705" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Mamata Enrolled Permanently ✅</text>
                    <text x="705" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Debangshu Undone Cleanly 🛡️</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 180 80 L 200 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 370 80 L 390 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 580 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Stack Destruction */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Cascade Destruction of Subsequent Savepoints
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* sp1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">SAVEPOINT sp1 (Target)</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">ROLLBACK TO SAVEPOINT sp1;</text>
                    <text x="145" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">RETAINED IN STACK ✅</text>
                  </g>

                  {/* sp2 */}
                  <g>
                    <rect x="290" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="410" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">SAVEPOINT sp2</text>
                    <rect x="300" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="410" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Created after sp1</text>
                    <text x="410" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">DESTROYED AUTOMATICALLY 💥</text>
                  </g>

                  {/* sp3 */}
                  <g>
                    <rect x="560" y="30" width="250" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="685" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">SAVEPOINT sp3</text>
                    <rect x="570" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="685" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Created after sp1</text>
                    <text x="685" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">DESTROYED AUTOMATICALLY 💥</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 530 80 L 560 80" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Savepoint Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test batch enrollment partial rollbacks, optional e-commerce add-on isolation, savepoint stack destruction, and procedural nested error handling live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(savepointScenarios).map(([key, item]) => {
              const isActive = selectedSavepointScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSavepointScenario(key)}
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
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run Savepoint Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{savepointScenarios[selectedSavepointScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{savepointScenarios[selectedSavepointScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Savepoint Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Partial Rollback Script</span>
                <span className="text-emerald-400">Savepoint Stack Management</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {savepointScenarios[selectedSavepointScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Step / Operation</th>
                    <th className="py-3 px-4 text-white">Execution State</th>
                    <th className="py-3 px-4 text-emerald-400">Savepoint Stack</th>
                    <th className="py-3 px-4 text-cyan-400">Data Persistence</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {savepointScenarios[selectedSavepointScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.operation}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.executionState}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.savepointState}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.dataPersistence}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Committed") || row.status.includes("Active") || row.status.includes("Bookmark") || row.status.includes("Finished") || row.status.includes("OK") || row.status.includes("Partial")
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
              Real-world protection of student batch admissions in Barrackpore.
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
                  Isolating Corrupted Rows in a 10,000-Student Batch Migration in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Data Administration Center</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a legacy migration procedure importing 10,000 student records: Previously, if the 9,999th student record had invalid data, the entire batch failed and rolled back, wasting 45 minutes of processing! Introducing a <code className="text-emerald-300 font-mono">SAVEPOINT sp_row;</code> before each student insertion allowed the script to roll back ONLY the single corrupted student row, log the error to an audit table, and commit the remaining 9,999 valid students cleanly!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Granular Row-Level Savepoint Recovery Pattern:
read_loop: LOOP
    FETCH cur_students INTO v_id, v_data;
    IF v_done THEN LEAVE read_loop; END IF;

    SAVEPOINT sp_student_row;
    BEGIN
        DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        BEGIN
            -- Roll back only this failed row and log:
            ROLLBACK TO SAVEPOINT sp_student_row;
            INSERT INTO migration_errors VALUES (v_id, 'Corrupted row skipped');
        END;
        INSERT INTO production_students VALUES (v_id, v_data);
    END;
END LOOP read_loop;
COMMIT;`}
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
              Always issue COMMIT after partial rollbacks and remember stack destruction rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting COMMIT After ROLLBACK TO SAVEPOINT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `ROLLBACK TO SAVEPOINT` leaves the transaction active! If you do not explicitly execute <code className="text-emerald-400 font-mono">COMMIT;</code>, session disconnect will roll back the entire transaction, losing prior valid work!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always issue <code className="text-emerald-400 font-mono">COMMIT;</code> to finalize the transaction!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Emulate Nested Transactions with Savepoints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Because MySQL does not support true nested transactions, use <code className="text-emerald-400 font-mono">SAVEPOINT</code> before calling risky child routines to isolate inner sub-operation failures cleanly.
              </p>
              <div className="text-xs text-slate-400">
                Standard pattern utilized by Spring's `Propagation.NESTED`.
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
              Key takeaways for SAVEPOINT and Partial Rollbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Savepoint Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">SAVEPOINT</code> sets a named marker in the transaction undo log.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">ROLLBACK TO SAVEPOINT</code> keeps the transaction active.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Rolling back to <code className="text-cyan-300 font-mono">sp1</code> destroys all subsequent savepoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always issue a final <code className="text-cyan-300 font-mono">COMMIT;</code> to persist preserved work.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe lock releases on savepoints...”</span>
                  InnoDB releases row locks acquired after the savepoint when rolling back to that savepoint, preventing lock contention on abandoned attempts!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about batch retry loops...”</span>
                  Setting a savepoint per row in large batch inserts allows individual row retries without restarting the whole batch!
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
              Comprehensive reference questions covering SAVEPOINT, ROLLBACK TO SAVEPOINT, RELEASE SAVEPOINT, partial rollback mechanics, savepoint stack lifecycles, and emulating nested transactions in enterprise MySQL architectures.
            </p>
          </div>

          <FAQTemplate
            title="SAVEPOINT & Partial Rollback FAQs"
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
            title="SAVEPOINT and ROLLBACK TO SAVEPOINT: Partial Rollbacks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="SAVEPOINTs provide the granular control needed for enterprise multi-step transactions. Remember the Fundamental Rule of Savepoints: ROLLBACK TO SAVEPOINT does NOT end the transaction! It only reverses operations made after the bookmark, keeping the transaction active. You must always issue an explicit COMMIT; to permanently save all preserved work preceding the savepoint!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
