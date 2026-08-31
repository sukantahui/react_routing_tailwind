import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Transaction Control Commands: START TRANSACTION, COMMIT, and ROLLBACK
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on Transaction Control Language (TCL) statements in MySQL: START TRANSACTION, COMMIT, ROLLBACK, COMMIT AND CHAIN, WITH CONSISTENT SNAPSHOT, READ ONLY modifiers, transaction state lifecycles, and avoiding implicit commit traps.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedTclScenario, setSelectedTclScenario] = useState("standard_start_commit");

  const tclScenarios = {
    standard_start_commit: {
      title: "1. Standard Workflow: START TRANSACTION ... COMMIT",
      badge: "Standard COMMIT",
      badgeColor: "emerald",
      sqlQuery: `-- Standard Explicit Transaction Boundary:
START TRANSACTION;

-- 1. Deduct ₹15,000 from Mamata's account:
UPDATE student_ledgers 
SET balance = balance - 15000.00 
WHERE student_id = 101;

-- 2. Credit Academy Revenue Account:
UPDATE academy_accounts 
SET total_revenue = total_revenue + 15000.00 
WHERE account_id = 1;

-- 3. Permanent disk persistence:
COMMIT; -- Changes written to Redo Log & disk!`,
      resultRows: [
        { operation: "START TRANSACTION", engineAction: "Suspends Autocommit", activeLocks: "None (Boundary Open)", undoRedoState: "Staging Active", status: "Active State" },
        { operation: "UPDATE student_ledgers", engineAction: "Modifies Row & writes Undo Log", activeLocks: "X-Lock on Mamata's Row", undoRedoState: "Undo Entry Recorded", status: "Staged" },
        { operation: "UPDATE academy_accounts", engineAction: "Modifies Row & writes Undo Log", activeLocks: "X-Lock on Revenue Row", undoRedoState: "Undo Entry Recorded", status: "Staged" },
        { operation: "COMMIT", engineAction: "Fsyncs Redo Log to Disk", activeLocks: "All Row Locks Released ✅", undoRedoState: "Committed Permanently", status: "Committed ✅" },
      ],
      explanation:
        "`START TRANSACTION` begins the logical unit of work. Statements stage changes in the undo log. `COMMIT` fsyncs the redo log to disk, releasing all row locks simultaneously.",
    },
    conditional_rollback_guard: {
      title: "2. Conditional Error Recovery: ROLLBACK on Business Validation Failure",
      badge: "Conditional ROLLBACK",
      badgeColor: "rose",
      sqlQuery: `-- Conditional Procedural ROLLBACK on Insufficient Balance:
DELIMITER //

CREATE PROCEDURE sp_transfer_tuition_with_guard(
    IN p_student_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_current_bal DECIMAL(10,2);

    START TRANSACTION;

    -- Check current balance:
    SELECT balance INTO v_current_bal 
    FROM student_ledgers 
    WHERE student_id = p_student_id FOR UPDATE;

    -- Business Rule Validation:
    IF v_current_bal < p_amount THEN
        -- 🛑 Cancel all changes and release locks:
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction Aborted: Insufficient student balance!';
    ELSE
        -- Perform deduction & credit:
        UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_student_id;
        UPDATE academy_accounts SET total_revenue = total_revenue + p_amount WHERE account_id = 1;
        COMMIT;
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { operation: "Check Balance (Mamata = ₹5,000)", engineAction: "Evaluates v_current_bal < ₹15,000", activeLocks: "Held during IF check", undoRedoState: "Clean State", status: "Validation Failed" },
        { operation: "ROLLBACK Executed", engineAction: "Discards transaction & restores state", activeLocks: "Locks Released 🛡️", undoRedoState: "Undo Log Cleared", status: "Rolled Back 🛡️" },
        { operation: "SIGNAL SQLSTATE '45000'", engineAction: "Returns clean error to client", activeLocks: "Zero Locks Held", undoRedoState: "Zero Data Drift", status: "Aborted Cleanly ✅" },
      ],
      explanation:
        "When business rules fail (e.g. attempting to pay ₹15,000 with a ₹5,000 balance), executing `ROLLBACK;` cancels all pending modifications and immediately frees held row locks.",
    },
    commit_and_chain_batching: {
      title: "3. High-Throughput Batching: COMMIT AND CHAIN for Continuous Workflows",
      badge: "COMMIT AND CHAIN",
      badgeColor: "cyan",
      sqlQuery: `-- High-Throughput Batch Invoicing with COMMIT AND CHAIN:
DELIMITER //

CREATE PROCEDURE sp_batch_invoicing_chained()
BEGIN
    START TRANSACTION;

    -- Chunk 1: Process First 500 Students:
    UPDATE student_ledgers SET is_invoiced = TRUE WHERE batch_id = 1;
    -- Commit Chunk 1 and IMMEDIATELY open fresh transaction for Chunk 2:
    COMMIT AND CHAIN;

    -- Chunk 2: Process Next 500 Students:
    UPDATE student_ledgers SET is_invoiced = TRUE WHERE batch_id = 2;
    COMMIT AND CHAIN;

    -- Chunk 3: Final Commit:
    UPDATE student_ledgers SET is_invoiced = TRUE WHERE batch_id = 3;
    COMMIT; -- Final closing commit
END //

DELIMITER ;`,
      resultRows: [
        { operation: "Chunk 1: UPDATE + COMMIT AND CHAIN", engineAction: "Fsyncs Chunk 1 & Opens Tx 2", activeLocks: "Chunk 1 Locks Released", undoRedoState: "Chunk 1 Durable ✅", status: "Tx 2 Active" },
        { operation: "Chunk 2: UPDATE + COMMIT AND CHAIN", engineAction: "Fsyncs Chunk 2 & Opens Tx 3", activeLocks: "Chunk 2 Locks Released", undoRedoState: "Chunk 2 Durable ✅", status: "Tx 3 Active" },
        { operation: "Chunk 3: UPDATE + COMMIT", engineAction: "Fsyncs Chunk 3 & Closes Tx", activeLocks: "All Locks Released ✅", undoRedoState: "All Chunks Durable", status: "Batch Finished ✅" },
      ],
      explanation:
        "`COMMIT AND CHAIN` commits the current transaction and instantly initiates a new one with identical characteristics, eliminating repeated `START TRANSACTION` roundtrips.",
    },
    consistent_snapshot_auditing: {
      title: "4. Read-Only Auditing: START TRANSACTION WITH CONSISTENT SNAPSHOT",
      badge: "Consistent Snapshot",
      badgeColor: "amber",
      sqlQuery: `-- Long-Running Financial Audit Report with Consistent Snapshot:
-- 1. Start transaction and lock in point-in-time MVCC snapshot IMMEDIATELY:
START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY;

-- 2. Audit Query 1: Total Student Balances (Evaluates at Snapshot Timestamp T0):
SELECT SUM(balance) AS total_student_deposits FROM student_ledgers;

-- Concurrent transactions commit updates in background... (Ignored by MVCC!)

-- 3. Audit Query 2: Total Receipts (Guaranteed consistent with Query 1 at Timestamp T0):
SELECT SUM(amount) AS total_fee_receipts FROM fee_receipts;

-- 4. Finish read-only audit:
COMMIT;`,
      resultRows: [
        { operation: "START TX WITH CONSISTENT SNAPSHOT", engineAction: "Creates Instant MVCC Read View (T0)", activeLocks: "Zero Locks (Lock-Free)", undoRedoState: "Read-Only Mode Active", status: "Snapshot Locked" },
        { operation: "Query 1: Student Balances", engineAction: "Reads Snapshot at T0", activeLocks: "Zero Locks (Non-blocking)", undoRedoState: "Consistent View", status: "Audited ✅" },
        { operation: "Query 2: Fee Receipts", engineAction: "Reads SAME Snapshot at T0", activeLocks: "Zero Locks (Non-blocking)", undoRedoState: "Consistent View", status: "Audited ✅" },
        { operation: "COMMIT", engineAction: "Deallocates MVCC Read View", activeLocks: "Zero Locks Held", undoRedoState: "Completed", status: "Audit Finished ✅" },
      ],
      explanation:
        "`START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY` establishes an immutable MVCC point-in-time read view at transaction start, enabling non-blocking financial audits.",
    },
  };

  const navItems = [
    { id: "tcl-overview", label: "1. The TCL Commands" },
    { id: "state-lifecycle", label: "2. Transaction Lifecycle" },
    { id: "svg-diagrams", label: "3. State Machine & Chaining SVGs" },
    { id: "interactive-sandbox", label: "4. Live TCL Workbench" },
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
            <span>Topic 2 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Transaction Control Language
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Transaction Control Commands: START, COMMIT &amp; ROLLBACK
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the core statements of Transaction Control Language (TCL) in MySQL. Learn how <code className="text-cyan-300 font-mono">START TRANSACTION</code>, <code className="text-cyan-300 font-mono">COMMIT</code>, <code className="text-cyan-300 font-mono">ROLLBACK</code>, <code className="text-cyan-300 font-mono">COMMIT AND CHAIN</code>, and <code className="text-cyan-300 font-mono">WITH CONSISTENT SNAPSHOT</code> govern transaction lifecycles and protect database state.
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
        {/* SECTION 1: The TCL Commands */}
        <section id="tcl-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Transaction Control Language (TCL) Commands
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The syntax and modifiers available in MySQL 8.0 for managing transactional boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">1. START TRANSACTION</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opens an explicit transaction and suspends autocommit. Modifiers include <code className="text-cyan-300 font-mono">READ ONLY</code>, <code className="text-cyan-300 font-mono">READ WRITE</code>, and <code className="text-cyan-300 font-mono">WITH CONSISTENT SNAPSHOT</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">2. COMMIT</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Permanently writes all modifications to disk and releases all row locks. Modifiers include <code className="text-emerald-300 font-mono">AND CHAIN</code> and <code className="text-emerald-300 font-mono">RELEASE</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">3. ROLLBACK</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Discards all uncommitted changes, restoring rows from the Undo Log and releasing all row locks. Supports <code className="text-rose-300 font-mono">AND CHAIN</code> and <code className="text-rose-300 font-mono">RELEASE</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Transaction Lifecycle */}
        <section id="state-lifecycle" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Database Transaction State Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The internal states a transaction transitions through from initiation to termination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">State 1</span>
              <h3 className="font-bold text-white">Active</h3>
              <p className="text-slate-300 text-xs">Initial state while DML operations are executing.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">State 2</span>
              <h3 className="font-bold text-white">Partially Committed</h3>
              <p className="text-slate-300 text-xs">Final statement executed, before disk fsync completes.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">State 3</span>
              <h3 className="font-bold text-white">Committed (Terminal)</h3>
              <p className="text-slate-300 text-xs">Redo log flushed to disk; modifications are durable.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">State 4</span>
              <h3 className="font-bold text-white">Aborted (Terminal)</h3>
              <p className="text-slate-300 text-xs">Transaction rolled back; pre-state restored.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: State Machine &amp; COMMIT AND CHAIN Loops
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the transaction state transitions and high-throughput chaining loops.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: State Machine */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Transaction State Machine Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Active */}
                  <g>
                    <rect x="20" y="30" width="160" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">1. ACTIVE</text>
                    <rect x="30" y="70" width="140" height="40" rx="4" fill="#0f172a" />
                    <text x="100" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Executing DMLs</text>
                    <text x="100" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Holding Row Locks</text>
                  </g>

                  {/* Partially Committed */}
                  <g>
                    <rect x="220" y="15" width="200" height="60" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="38" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">2A. Partially Committed</text>
                    <text x="320" y="55" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">Last Statement Completed</text>
                  </g>

                  {/* Failed */}
                  <g>
                    <rect x="220" y="85" width="200" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="320" y="108" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">2B. Failed</text>
                    <text x="320" y="125" fill="#f87171" fontSize="7 font-mono" textAnchor="middle">Error Detected / Aborted</text>
                  </g>

                  {/* Committed (Terminal) */}
                  <g>
                    <rect x="460" y="15" width="180" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="550" y="38" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3A. COMMITTED ✅</text>
                    <text x="550" y="55" fill="#a7f3d0" fontSize="7 font-bold" textAnchor="middle">Terminal Durable State</text>
                  </g>

                  {/* Aborted (Terminal) */}
                  <g>
                    <rect x="460" y="85" width="180" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="550" y="108" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3B. ABORTED 🛡️</text>
                    <text x="550" y="125" fill="#f87171" fontSize="7 font-bold" textAnchor="middle">Terminal Rolled Back State</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 180 60 L 220 45" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 180 100 L 220 115" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 420 45 L 460 45" stroke="#10b981" strokeWidth="2" />
                  <path d="M 420 115 L 460 115" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: COMMIT AND CHAIN */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Continuous Batching with COMMIT AND CHAIN
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Chunk 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Process Chunk 1</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">UPDATE Rows 1-500</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">COMMIT AND CHAIN;</text>
                  </g>

                  {/* Chunk 2 */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">2. Process Chunk 2</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="405" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">UPDATE Rows 501-1000</text>
                    <text x="405" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">COMMIT AND CHAIN;</text>
                  </g>

                  {/* Chunk 3 */}
                  <g>
                    <rect x="560" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="670" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Final Chunk</text>
                    <rect x="570" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="670" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">UPDATE Remaining Rows</text>
                    <text x="670" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">COMMIT; (Terminates)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 520 80 L 560 80" stroke="#06b6d4" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive TCL Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test standard COMMITs, conditional ROLLBACK guards, continuous COMMIT AND CHAIN batching, and consistent snapshot reads live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(tclScenarios).map(([key, item]) => {
              const isActive = selectedTclScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTclScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run TCL Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{tclScenarios[selectedTclScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{tclScenarios[selectedTclScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                TCL Runtime Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Transaction Control Script</span>
                <span className="text-emerald-400">TCL State Transition</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {tclScenarios[selectedTclScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">TCL Operation</th>
                    <th className="py-3 px-4 text-white">InnoDB Engine Action</th>
                    <th className="py-3 px-4 text-emerald-400">Active Row Locks</th>
                    <th className="py-3 px-4 text-amber-400">Undo / Redo Log State</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {tclScenarios[selectedTclScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.operation}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.engineAction}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.activeLocks}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.undoRedoState}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Committed") || row.status.includes("Active") || row.status.includes("Audited") || row.status.includes("Finished") || row.status.includes("Cleanly")
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
              Real-world high-throughput batch invoicing and nested transaction bug prevention.
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
                  Eliminating Implicit Commit Collisions in Barrackpore Student Registration
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Academy Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui fixed an architectural defect where Procedure A opened a transaction and called Procedure B, which executed an inner <code className="text-rose-300 font-mono">START TRANSACTION;</code>. The inner start caused an unintended implicit commit of Procedure A's staged fee deduction, corrupting state when subsequent steps failed! Refactoring to manage transactions centrally at the top-level procedure eliminated all unintended implicit commits.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Top-Level Centralized Transaction Pattern:
CREATE PROCEDURE sp_register_top_level(IN p_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;
    START TRANSACTION;
    CALL sp_sub_validate(p_id); -- Child does NOT call START TRANSACTION
    CALL sp_sub_allocate_seat(p_id);
    COMMIT;
END;`}
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
              Avoid nested START TRANSACTION calls and always pair transactions with automatic handlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Calling START TRANSACTION When Already Active
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MySQL does not support true nested transactions. Issuing a second <code className="text-rose-300 font-mono">START TRANSACTION</code> will implicitly commit the active transaction immediately!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use <code className="text-emerald-400 font-mono">SAVEPOINT</code> for partial rollbacks instead of nested transactions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Pair with EXIT HANDLER FOR SQLEXCEPTION
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Every stored procedure with <code className="text-emerald-400 font-mono">START TRANSACTION</code> must declare an <code className="text-emerald-400 font-mono">EXIT HANDLER FOR SQLEXCEPTION</code> that executes <code className="text-emerald-400 font-mono">ROLLBACK;</code>.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero dangling uncommitted locks on runtime exceptions.
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
              Key takeaways for Transaction Control Commands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> TCL Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">START TRANSACTION</code> opens boundary &amp; suspends autocommit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">COMMIT</code> fsyncs redo log to disk and releases all row locks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">ROLLBACK</code> discards uncommitted modifications using undo logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">COMMIT AND CHAIN</code> for continuous chunked batch processing.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe COMMIT AND CHAIN...”</span>
                  In large batch updates, `COMMIT AND CHAIN` flushes logs and releases locks after every 500 rows while immediately opening the next transaction with zero network latency!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about consistent snapshot...”</span>
                  For financial reports across multiple tables, use `START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY;` to guarantee cross-table time-consistent views without locking tables!
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
              Comprehensive reference questions covering Transaction Control Language (TCL) statements in MySQL: START TRANSACTION, COMMIT, ROLLBACK, COMMIT AND CHAIN, WITH CONSISTENT SNAPSHOT, READ ONLY modifiers, transaction state lifecycles, and avoiding implicit commit traps.
            </p>
          </div>

          <FAQTemplate
            title="Transaction Control Commands FAQs"
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
            title="Transaction Control Commands: START TRANSACTION, COMMIT, and ROLLBACK"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Mastering TCL statements—START TRANSACTION, COMMIT, and ROLLBACK—is crucial for senior database engineering. Never fall into the trap of issuing START TRANSACTION inside child stored routines (which causes an implicit commit of the parent transaction!). Always handle transaction boundaries at the top level, pair them with automated ROLLBACK handlers, and leverage COMMIT AND CHAIN for high-throughput batch processing!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
