import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Understanding Database Transactions and Real-World Motivation (Banking Example)
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and simulation workbench on database transactions, logical units of work (LUW), the classic inter-account banking transfer motivation, START TRANSACTION, COMMIT, ROLLBACK, autocommit behavior, and preventing state corruption.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedTxScenario, setSelectedTxScenario] = useState("successful_transfer_commit");

  const txScenarios = {
    successful_transfer_commit: {
      title: "1. Successful Transfer: Atomic All-or-Nothing COMMIT",
      badge: "Atomic COMMIT",
      badgeColor: "emerald",
      sqlQuery: `-- 🏦 THE CANONICAL FINANCIAL TRANSFER TRANSACTION:
START TRANSACTION;

-- Step 1: Deduct ₹5,000 from Mamata's Account:
UPDATE student_bank_accounts 
SET balance = balance - 5000.00 
WHERE student_id = 101 AND balance >= 5000.00;

-- Step 2: Add ₹5,000 to Susmita's Account:
UPDATE student_bank_accounts 
SET balance = balance + 5000.00 
WHERE student_id = 102;

-- Step 3: Record Audit Entry in Ledger:
INSERT INTO transaction_audit_ledger (from_id, to_id, amount, transfer_time)
VALUES (101, 102, 5000.00, NOW());

-- Step 4: Persist all modifications permanently to disk:
COMMIT;`,
      resultRows: [
        { account: "Mamata (ID 101)", initialBalance: "₹25,000.00", debitCredit: "-₹5,000.00", finalBalance: "₹20,000.00", txState: "Committed ✅", status: "Balanced" },
        { account: "Susmita (ID 102)", initialBalance: "₹15,000.00", debitCredit: "+₹5,000.00", finalBalance: "₹20,000.00", txState: "Committed ✅", status: "Balanced" },
        { account: "Total System Sum", initialBalance: "₹40,000.00", debitCredit: "₹0.00 Net", finalBalance: "₹40,000.00", txState: "Invariants Preserved", status: "Perfect Equilibrium 🛡️" },
      ],
      explanation:
        "Because all 3 SQL statements executed inside a single transaction, the `COMMIT` statement permanently updates both balances and the audit log in a single atomic operation.",
    },
    crash_without_transactions_nightmare: {
      title: "2. The Disaster: Mid-Operation Crash Without Transactions (Autocommit ON)",
      badge: "Money Disappears!",
      badgeColor: "rose",
      sqlQuery: `-- ❌ THE DISASTER: Autocommit ON without an explicit transaction:
-- Step 1: Mamata's account is debited (Autocommits immediately!):
UPDATE student_bank_accounts SET balance = balance - 5000.00 WHERE student_id = 101;
-- 💥 POWER FAILURE / NETWORK CRASH OCCURS HERE! 💥

-- Step 2: Susmita's account is NEVER updated!
-- UPDATE student_bank_accounts SET balance = balance + 5000.00 WHERE student_id = 102; -- NEVER RAN!

-- 🚨 Result: Mamata lost ₹5,000, Susmita received ₹0. Total system money dropped from ₹40,000 to ₹35,000!`,
      resultRows: [
        { account: "Mamata (ID 101)", initialBalance: "₹25,000.00", debitCredit: "-₹5,000.00", finalBalance: "₹20,000.00", txState: "Auto-Committed ❌", status: "Money Deducted" },
        { account: "Susmita (ID 102)", initialBalance: "₹15,000.00", debitCredit: "₹0.00 (Never Ran)", finalBalance: "₹15,000.00", txState: "Never Received ❌", status: "Unchanged" },
        { account: "Total System Sum", initialBalance: "₹40,000.00", debitCredit: "-₹5,000.00 Lost", finalBalance: "₹35,000.00", txState: "Corrupted State 💥", status: "₹5,000 Vanished into Void!" },
      ],
      explanation:
        "Without transactions, Step 1 autocommitted immediately. When the system crashed before Step 2, Mamata's ₹5,000 was permanently lost, violating database consistency!",
    },
    crash_with_transactions_rollback: {
      title: "3. The Protection: Mid-Operation Crash With Transaction (Auto ROLLBACK)",
      badge: "Safe ROLLBACK",
      badgeColor: "cyan",
      sqlQuery: `-- 🛡️ TRANSACTION PROTECTION: Automatic Rollback on Server Crash:
START TRANSACTION;

-- Step 1: Deduct ₹5,000 from Mamata:
UPDATE student_bank_accounts SET balance = balance - 5000.00 WHERE student_id = 101;
-- (Deduction is staged in Undo Logs, NOT yet permanent)

-- 💥 POWER FAILURE / DISCONNECT OCCURS HERE! 💥
-- InnoDB detects broken session / crash recovery upon reboot:
-- InnoDB executes automatic: ROLLBACK;

-- 🛡️ Result: Mamata's ₹5,000 deduction is completely undone! Balance remains ₹25,000!`,
      resultRows: [
        { account: "Mamata (ID 101)", initialBalance: "₹25,000.00", debitCredit: "-₹5,000 (Staged)", finalBalance: "₹25,000.00", txState: "Rolled Back 🛡️", status: "Restored Safely ✅" },
        { account: "Susmita (ID 102)", initialBalance: "₹15,000.00", debitCredit: "₹0.00 (Unchanged)", finalBalance: "₹15,000.00", txState: "Clean State", status: "Restored Safely ✅" },
        { account: "Total System Sum", initialBalance: "₹40,000.00", debitCredit: "₹0.00 Net", finalBalance: "₹40,000.00", txState: "Invariants Preserved", status: "Zero Loss Guaranteed 🛡️" },
      ],
      explanation:
        "Because Step 1 occurred inside an open transaction, the uncommitted modification was held in the undo log. Upon crash or disconnect, InnoDB executed an automatic `ROLLBACK`, leaving zero corrupted records.",
    },
    multi_step_course_registration_settlement: {
      title: "4. Multi-Step Workflow: Tuition Deduction + Seat Decrement + Enrollment",
      badge: "Multi-Step Workflow",
      badgeColor: "amber",
      sqlQuery: `-- 🎓 MULTI-STEP COURSE REGISTRATION SETTLEMENT:
DELIMITER //

CREATE PROCEDURE sp_register_and_pay_course(
    IN p_student_id INT,
    IN p_course_id INT,
    IN p_fee DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK; -- Undo everything on any failure!
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Registration failed: Transaction rolled back safely.';
    END;

    START TRANSACTION;
    -- 1. Deduct tuition fee from student ledger:
    UPDATE student_ledgers SET balance = balance - p_fee WHERE student_id = p_student_id AND balance >= p_fee;
    
    -- 2. Decrement available course seats:
    UPDATE courses SET available_seats = available_seats - 1 WHERE course_id = p_course_id AND available_seats > 0;
    
    -- 3. Insert official enrollment record:
    INSERT INTO course_enrollments (student_id, course_id, enrolled_at) VALUES (p_student_id, p_course_id, NOW());
    
    COMMIT; -- All 3 operations succeed together!
END //

DELIMITER ;`,
      resultRows: [
        { account: "Student Ledger (Debangshu)", initialBalance: "₹30,000.00", debitCredit: "-₹10,000.00", finalBalance: "₹20,000.00", txState: "Step 1 OK", status: "Deducted" },
        { account: "Course Seats (Full Stack Web)", initialBalance: "15 Seats", debitCredit: "-1 Seat", finalBalance: "14 Seats", txState: "Step 2 OK", status: "Reserved" },
        { account: "Enrollment Record", initialBalance: "None", debitCredit: "+1 Record", finalBalance: "Active", txState: "Step 3 OK", status: "Enrolled ✅" },
      ],
      explanation:
        "In complex multi-table workflows, wrapping fee deductions, seat allocations, and enrollment inserts inside a transaction guarantees that students are never charged without receiving a guaranteed course seat.",
    },
  };

  const navItems = [
    { id: "transaction-concept", label: "1. What is a Transaction?" },
    { id: "banking-motivation", label: "2. Banking Example Motivation" },
    { id: "svg-diagrams", label: "3. All-or-Nothing & Crash SVGs" },
    { id: "interactive-sandbox", label: "4. Live Transaction Workbench" },
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
            <span>Topic 0 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Transaction Fundamentals
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Understanding Database Transactions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Discover the foundational concept of a Logical Unit of Work (LUW) in relational databases. Learn why multi-step financial transfers require indivisible execution, how <code className="text-cyan-300 font-mono">START TRANSACTION</code>, <code className="text-cyan-300 font-mono">COMMIT</code>, and <code className="text-cyan-300 font-mono">ROLLBACK</code> eliminate data loss, and how InnoDB guarantees zero state corruption during crashes.
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
        {/* SECTION 1: What is a Transaction? */}
        <section id="transaction-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Database Transaction?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental principle of atomic, indivisible execution in relational systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">1. Logical Unit of Work</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A transaction bundles multiple independent SQL statements into a single, cohesive business operation that must succeed or fail as a single unit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">2. All-or-Nothing Rule</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Either every single modification in the transaction is committed permanently (<code className="text-emerald-300 font-mono">COMMIT</code>), or all changes are completely discarded (<code className="text-rose-300 font-mono">ROLLBACK</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-400 font-mono">3. Crash Invariant Guard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If the server loses power, disconnects, or crashes mid-transaction, InnoDB's crash recovery protocol restores the pre-transaction state automatically.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Banking Motivation */}
        <section id="banking-motivation" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Classic Banking Transfer Motivation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why multi-statement operations without transactions cause money to vanish into the void.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>💥</span> Without Transactions (Autocommit Mode)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If Mamata sends ₹5,000 to Susmita, Step 1 deducts Mamata's balance and autocommits. If a network crash happens before Step 2, Susmita never receives the money. Mamata lost ₹5,000 and total system money shrank by ₹5,000!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> With Explicit Transactions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enclosing the operations inside <code className="text-emerald-300 font-mono">START TRANSACTION ... COMMIT</code> ensures that if a crash occurs mid-transfer, InnoDB detects the incomplete state and executes an automatic <code className="text-emerald-300 font-mono">ROLLBACK</code>, restoring Mamata's balance to ₹25,000!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: All-or-Nothing Lifecycle &amp; Crash Disaster
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the transaction lifecycle state machine and the money disappearance trap.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The All-or-Nothing Transaction Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: START */}
                  <g>
                    <rect x="20" y="30" width="170" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="105" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. START TRANSACTION</text>
                    <rect x="30" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="105" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Opens Boundary</text>
                    <text x="105" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Autocommit Suspended</text>
                  </g>

                  {/* Step 2: DML Operations */}
                  <g>
                    <rect x="230" y="30" width="190" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="325" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">2. Staged DML Operations</text>
                    <rect x="240" y="70" width="170" height="40" rx="4" fill="#0f172a" />
                    <text x="325" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Debit A &amp; Credit B</text>
                    <text x="325" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Staged in Undo/Redo Logs</text>
                  </g>

                  {/* Step 3: Fork → COMMIT / ROLLBACK */}
                  <g>
                    {/* COMMIT Path */}
                    <rect x="460" y="15" width="170" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="545" y="38" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3A. COMMIT;</text>
                    <text x="545" y="55" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Permanent Storage ✅</text>

                    {/* ROLLBACK Path */}
                    <rect x="460" y="85" width="170" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="545" y="108" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">3B. ROLLBACK;</text>
                    <text x="545" y="125" fill="#f87171" fontSize="7 font-mono" textAnchor="middle">State Restored 🛡️</text>
                  </g>

                  {/* Step 4: Final State */}
                  <g>
                    <rect x="670" y="30" width="160" height="100" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="750" y="55" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">4. Invariant State</text>
                    <rect x="680" y="70" width="140" height="40" rx="4" fill="#0f172a" />
                    <text x="750" y="88" fill="#34d399" fontSize="8 font-bold" textAnchor="middle">Zero Data Loss</text>
                    <text x="750" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Consistently Sound</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 190 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 420 80 L 460 45" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 420 80 L 460 115" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 630 45 L 670 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 630 115 L 670 80" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Money Disappearance */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Money Disappearance Disaster (Without Transactions)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Debit */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Step 1 Auto-Commits</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">UPDATE Mamata SET bal - 5K</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Committed Immediately! ❌</text>
                  </g>

                  {/* Step 2: Crash */}
                  <g>
                    <rect x="290" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="410" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">2. CRASH / POWER OUTAGE</text>
                    <rect x="300" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="410" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">💥 Network Dropped / Server Down</text>
                    <text x="410" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Step 2 (Credit Susmita) NEVER RAN!</text>
                  </g>

                  {/* Step 3: Result */}
                  <g>
                    <rect x="570" y="30" width="250" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="695" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. CORRUPTED SYSTEM STATE</text>
                    <rect x="580" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="695" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Mamata: ₹20K · Susmita: ₹15K</text>
                    <text x="695" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🚨 ₹5,000 Vanished into Void!</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 530 80 L 570 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Database Transactions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test atomic COMMITs, crash disasters without transactions, automatic ROLLBACK recovery, and multi-step course registration workflows live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(txScenarios).map(([key, item]) => {
              const isActive = selectedTxScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTxScenario(key)}
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
                    {isActive ? "● Active Simulation" : "○ Run Transaction Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{txScenarios[selectedTxScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{txScenarios[selectedTxScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Transaction Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Transaction Execution Script</span>
                <span className="text-emerald-400">Indivisible Unit of Work</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {txScenarios[selectedTxScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Account / Entity</th>
                    <th className="py-3 px-4 text-white">Initial Balance</th>
                    <th className="py-3 px-4 text-emerald-400">Debit / Credit Action</th>
                    <th className="py-3 px-4 text-cyan-400">Final Balance</th>
                    <th className="py-3 px-4 text-amber-400">Transaction State</th>
                    <th className="py-3 px-4 text-emerald-400">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {txScenarios[selectedTxScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.account}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.initialBalance}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.debitCredit}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.finalBalance}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.txState}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Balanced") || row.status.includes("Equilibrium") || row.status.includes("Restored") || row.status.includes("Guaranteed") || row.status.includes("Enrolled")
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
              Real-world protection of tuition fee payments and ATM dispense workflows.
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
                  Protecting Barrackpore Tuition Fee Deductions During Power Outages
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Cashier Counter</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a fee collection system: During a sudden summer power blackout in Barrackpore, 12 students had their bank accounts debited for semester fees, but receipt generation failed. Because the operations were wrapped in an explicit <code className="text-emerald-300 font-mono">START TRANSACTION ... COMMIT</code> block with an <code className="text-emerald-300 font-mono">EXIT HANDLER FOR SQLEXCEPTION</code>, MySQL executed an automatic <code className="text-emerald-300 font-mono">ROLLBACK</code> upon server reboot, ensuring zero student suffered from phantom financial losses!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Enterprise Transactional Settlement Guard:
START TRANSACTION;
UPDATE student_wallet SET balance = balance - 15000 WHERE student_id = 101;
INSERT INTO fee_receipts (student_id, amount, paid_at) VALUES (101, 15000, NOW());
COMMIT; -- Both succeed together or both roll back on power failure!`}
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
              Avoid implicit commit DDL traps and never perform network I/O inside open transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> DDL Inside Transactions (Implicit Commit Trap)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing DDL statements (like <code className="text-rose-300 font-mono">CREATE TABLE</code> or <code className="text-rose-300 font-mono">ALTER TABLE</code>) forces an immediate <code className="text-rose-300 font-mono">COMMIT</code> of all preceding statements, making subsequent rollback impossible!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Never execute DDL statements inside business transactions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Zero External Network I/O Inside Transactions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never perform HTTP requests, payment gateway API calls, or email dispatches while holding an open database transaction.
              </p>
              <div className="text-xs text-slate-400">
                Prevents remote timeouts from holding database locks and exhausting connection pools.
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
              Key takeaways for Understanding Database Transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Transactions Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>A transaction is a single Logical Unit of Work executed as "All-or-Nothing".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">START TRANSACTION</code> suspends autocommit mode temporarily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">COMMIT</code> writes modifications permanently to InnoDB redo logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">ROLLBACK</code> discards uncommitted changes, restoring pre-transaction state.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the banking transfer rule...”</span>
                  Never execute a multi-step financial deduction and credit without an explicit transaction boundary; otherwise, money will disappear if a network glitch occurs between statements!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about transaction duration...”</span>
                  Keep your transactions as short as possible (under 10 milliseconds) to minimize row lock hold times and prevent deadlocks!
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
              Comprehensive reference questions covering database transactions, logical units of work (LUW), the classic inter-account banking transfer motivation, START TRANSACTION, COMMIT, ROLLBACK, autocommit behavior, and preventing state corruption.
            </p>
          </div>

          <FAQTemplate
            title="Database Transactions Motivation FAQs"
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
            title="Understanding Database Transactions and Real-World Motivation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Database transactions are the bedrock of reliable enterprise software. Always remember the Golden Rule of Transaction Management: Whenever a business operation involves more than one DML statement (such as debiting one student's ledger and crediting another, or deducting course fees and decrementing available seats), you MUST wrap the entire sequence inside an explicit START TRANSACTION ... COMMIT block paired with an automatic ROLLBACK handler. This guarantees that your database invariants remain perfectly balanced even during catastrophic power failures!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
