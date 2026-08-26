import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Iterating Cursors with LOOP and NOT FOUND Handler Termination
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on cursor loop iteration constructs (LOOP, WHILE, REPEAT), NOT FOUND handler termination mechanics, the critical immediate exit guard placement rule, and preventing the phantom last row reprocessing bug.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedIterationScenario, setSelectedIterationScenario] = useState("correct_immediate_guard_loop");

  const iterationScenarios = {
    correct_immediate_guard_loop: {
      title: "1. The Correct Pattern: Immediate Guard Check After FETCH",
      badge: "Correct Pattern",
      badgeColor: "emerald",
      sqlQuery: `-- ✅ THE AUTHORITATIVE INDUSTRY STANDARD CURSOR LOOP:
DELIMITER //

CREATE PROCEDURE sp_process_students_correct()
BEGIN
    DECLARE v_id INT;
    DECLARE v_name VARCHAR(100);
    DECLARE v_fee DECIMAL(10,2);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_students CURSOR FOR
        SELECT student_id, name, tuition_fee 
        FROM students 
        WHERE department_id = 1;

    -- CONTINUE Handler for NOT FOUND:
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_students;

    student_loop: LOOP
        FETCH cur_students INTO v_id, v_name, v_fee;

        -- 🛡️ CRITICAL GUARD: Check IMMEDIATELY after FETCH:
        IF v_done THEN
            LEAVE student_loop;
        END IF;

        -- Safe Row Processing (Executes ONLY for valid fetched rows):
        INSERT INTO fee_audit_log (student_id, charged_fee, processed_at)
        VALUES (v_id, v_fee, NOW());
    END LOOP student_loop;

    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { rowNumber: "Row 1 (Mamata)", fetchStatus: "Success (v_done = FALSE)", guardCheck: "Guard Evaluates FALSE", processingAction: "Processed Mamata (₹25,000) ✅", loopAction: "Continues Loop", status: "Processed" },
        { rowNumber: "Row 2 (Susmita)", fetchStatus: "Success (v_done = FALSE)", guardCheck: "Guard Evaluates FALSE", processingAction: "Processed Susmita (₹25,000) ✅", loopAction: "Continues Loop", status: "Processed" },
        { rowNumber: "Row 3 (EOF)", fetchStatus: "NOT FOUND (v_done = TRUE)", guardCheck: "Guard Evaluates TRUE 🛡️", processingAction: "SKIPPED (No Phantom Charge) 🛑", loopAction: "LEAVE student_loop", status: "Clean Exit ✅" },
      ],
      explanation:
        "When `FETCH` attempts to read past Row 2, the `NOT FOUND` handler sets `v_done = TRUE`. Checking `IF v_done THEN LEAVE student_loop;` immediately after `FETCH` prevents the loop from re-processing Susmita a second time.",
    },
    phantom_last_row_reprocessing_bug: {
      title: "2. The Dangerous Trap: The Phantom Last Row Reprocessing Bug",
      badge: "Dangerous Bug",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN ARCHITECTURE: Checking Guard at the BOTTOM of the loop:
DELIMITER //

CREATE PROCEDURE sp_process_students_buggy()
BEGIN
    DECLARE v_id INT;
    DECLARE v_name VARCHAR(100);
    DECLARE v_fee DECIMAL(10,2);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_students CURSOR FOR
        SELECT student_id, name, tuition_fee 
        FROM students 
        WHERE department_id = 1;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_students;

    student_loop: LOOP
        FETCH cur_students INTO v_id, v_name, v_fee;

        -- 💥 BUG: Processing happens BEFORE the guard check!
        INSERT INTO fee_audit_log (student_id, charged_fee, processed_at)
        VALUES (v_id, v_fee, NOW()); -- 🚨 CHARGES SUSMITA TWICE ON EOF!

        -- ❌ Guard check placed at bottom:
        IF v_done THEN
            LEAVE student_loop;
        END IF;
    END LOOP student_loop;

    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { rowNumber: "Row 1 (Mamata)", fetchStatus: "Success", guardCheck: "Evaluated at bottom", processingAction: "Charged Mamata (₹25,000)", loopAction: "Continues", status: "Charged" },
        { rowNumber: "Row 2 (Susmita)", fetchStatus: "Success", guardCheck: "Evaluated at bottom", processingAction: "Charged Susmita (₹25,000)", loopAction: "Continues", status: "Charged" },
        { rowNumber: "Row 3 (EOF / 1329)", fetchStatus: "NOT FOUND (v_done=TRUE)", guardCheck: "Checked AFTER Processing 💥", processingAction: "CHARGED SUSMITA A 2ND TIME! 🚨", loopAction: "Exits after duplicate charge", status: "💥 Phantom Duplicate" },
      ],
      explanation:
        "Because variables retain the previous row's values when `FETCH` hits EOF, placing the guard after the `INSERT` causes the last student (Susmita) to be processed twice, corrupting ledger balances!",
    },
    while_loop_double_fetch_pattern: {
      title: "3. Alternative Pattern: WHILE Loop with Prime-the-Pump Double Fetch",
      badge: "WHILE Pattern",
      badgeColor: "cyan",
      sqlQuery: `-- Alternative WHILE NOT v_done Double Fetch Pattern:
DELIMITER //

CREATE PROCEDURE sp_while_cursor_demo()
BEGIN
    DECLARE v_id INT;
    DECLARE v_name VARCHAR(100);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_students CURSOR FOR
        SELECT student_id, name FROM students WHERE department_id = 1;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_students;

    -- Prime the pump: Fetch 1st row BEFORE entering while loop:
    FETCH cur_students INTO v_id, v_name;

    WHILE NOT v_done DO
        -- Process current row:
        INSERT INTO processed_names (student_name) VALUES (v_name);

        -- Fetch NEXT row at bottom of loop:
        FETCH cur_students INTO v_id, v_name;
    END WHILE;

    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { rowNumber: "Prime Fetch", fetchStatus: "Fetched Row 1 (Mamata)", guardCheck: "WHILE NOT v_done (TRUE)", processingAction: "Processed Mamata", loopAction: "Fetches Row 2 (Susmita)", status: "Looping" },
        { rowNumber: "Bottom Fetch 2", fetchStatus: "Fetched Row 2 (Susmita)", guardCheck: "WHILE NOT v_done (TRUE)", processingAction: "Processed Susmita", loopAction: "Fetches EOF (v_done=TRUE)", status: "Looping" },
        { rowNumber: "Bottom Fetch EOF", fetchStatus: "NOT FOUND (v_done=TRUE)", guardCheck: "WHILE NOT v_done (FALSE)", processingAction: "Loop Exits (No duplicate)", loopAction: "Terminates cleanly", status: "Completed ✅" },
      ],
      explanation:
        "In a `WHILE` loop, you must fetch once before the loop and once at the bottom of the loop body. The labeled `LOOP ... LEAVE` pattern is preferred as it avoids duplicate `FETCH` code.",
    },
    running_balance_accumulator_loop: {
      title: "4. Accumulator Pattern: Computing Incremental Ledger Running Balances",
      badge: "Accumulator Loop",
      badgeColor: "amber",
      sqlQuery: `-- Calculating Running Totals & Cumulative Fees via Cursor Loop:
DELIMITER //

CREATE PROCEDURE sp_compute_running_ledger_total(
    OUT p_total_collected DECIMAL(12,2)
)
BEGIN
    DECLARE v_fee DECIMAL(10,2);
    DECLARE v_running_total DECIMAL(12,2) DEFAULT 0.00;
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_fees CURSOR FOR
        SELECT fee_amount FROM student_ledger ORDER BY payment_date ASC;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_fees;

    calc_loop: LOOP
        FETCH cur_fees INTO v_fee;
        IF v_done THEN
            LEAVE calc_loop;
        END IF;

        -- Accumulate running total:
        SET v_running_total = v_running_total + v_fee;
    END LOOP calc_loop;

    CLOSE cur_fees;
    SET p_total_collected = v_running_total;
END //

DELIMITER ;`,
      resultRows: [
        { rowNumber: "Payment 1", fetchStatus: "Fee: ₹25,000.00", guardCheck: "Active", processingAction: "Running Total = ₹25,000.00", loopAction: "Continues", status: "Accumulated" },
        { rowNumber: "Payment 2", fetchStatus: "Fee: ₹15,000.00", guardCheck: "Active", processingAction: "Running Total = ₹40,000.00", loopAction: "Continues", status: "Accumulated" },
        { rowNumber: "Payment 3", fetchStatus: "Fee: ₹10,000.00", guardCheck: "Active", processingAction: "Running Total = ₹50,000.00", loopAction: "Continues", status: "Accumulated" },
      ],
      explanation:
        "Cursor loops easily accumulate running financial balances, compute interest tiers, and emit cumulative state across sequential records.",
    },
  };

  const navItems = [
    { id: "canonical-loop", label: "1. Canonical LOOP Pattern" },
    { id: "phantom-bug", label: "2. The Phantom Last Row Bug" },
    { id: "svg-diagrams", label: "3. Flow & Guard SVGs" },
    { id: "interactive-sandbox", label: "4. Live Iteration Workbench" },
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
            <span>Module 003_004</span>
            <span>•</span>
            <span>Topic 9 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Loop Iteration &amp; Control
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Iterating Cursors: LOOP &amp; NOT FOUND Termination
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the canonical loop patterns for traversing database cursors. Learn labeled <code className="text-cyan-300 font-mono">LOOP ... LEAVE</code> constructs, <code className="text-cyan-300 font-mono">NOT FOUND</code> handler termination, and the critical immediate exit guard rule to eliminate the phantom last row reprocessing bug.
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
        {/* SECTION 1: Canonical LOOP Pattern */}
        <section id="canonical-loop" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Canonical LOOP ... LEAVE Pattern
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The industry-standard loop construct for traversing MySQL database cursors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`DECLARE v_done BOOLEAN DEFAULT FALSE;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

OPEN cur_students;

read_loop: LOOP
    FETCH cur_students INTO v_id, v_name;

    -- 🛡️ MANDATORY GUARD: Check IMMEDIATELY after FETCH:
    IF v_done THEN
        LEAVE read_loop;
    END IF;

    -- Process row...
END LOOP read_loop;

CLOSE cur_students;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: Phantom Last Row Bug */}
        <section id="phantom-bug" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Infamous "Phantom Last Row" Reprocessing Bug
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why placing the `IF v_done` guard at the bottom of the loop corrupts financial ledgers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>💥</span> The Flawed Bottom Guard Trap
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When `FETCH` attempts to read past the final row, it fails and sets <code className="text-rose-300 font-mono">v_done = TRUE</code>. However, local variables <strong>retain the values of the last valid row</strong>. If processing occurs before the guard check, the last row is processed twice!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Immediate Guard Fix
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Placing <code className="text-emerald-300 font-mono">IF v_done THEN LEAVE loop_label; END IF;</code> immediately after <code className="text-emerald-300 font-mono">FETCH</code> ensures that when EOF is reached, the loop exits before any processing code can execute.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Flow of Control &amp; Guard Comparison
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing correct immediate exit execution with the phantom row defect.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Flow Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Immediate Guard vs Bottom Guard Execution Flow
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Correct Loop */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ CORRECT (Immediate Guard)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">FETCH → IF v_done THEN LEAVE → Process Row</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">🛡️ Exits on EOF before phantom execution</text>
                  </g>

                  {/* Buggy Loop */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ BUGGY (Bottom Guard Trap)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">FETCH (EOF) → Process Last Row AGAIN 💥 → Check Guard</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🚨 Last student is charged / billed twice!</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Loop Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Anatomy of a Robust Labeled Cursor Loop
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: FETCH */}
                  <g>
                    <rect x="30" y="30" width="170" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="115" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. FETCH cur INTO v</text>
                    <rect x="40" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="115" y="92" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Advance Pointer</text>
                  </g>

                  {/* Step 2: Guard Check */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="320" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">2. IF v_done THEN LEAVE</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="320" y="92" fill="#fbbf24" fontSize="8 font-mono font-bold" textAnchor="middle">Immediate Exit Guard</text>
                  </g>

                  {/* Step 3: Process Row */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3. Process Row</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="530" y="92" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DML / Workflow</text>
                  </g>

                  {/* Step 4: END LOOP */}
                  <g>
                    <rect x="650" y="30" width="170" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="735" y="55" fill="#67e8f9" fontSize="9" fontWeight="bold" textAnchor="middle">4. CLOSE cur;</text>
                    <rect x="660" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="735" y="92" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Deallocate Memory</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 80 L 440 80" stroke="#f59e0b" strokeWidth="2" />
                  <path d="M 620 80 L 650 80" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Cursor Iteration Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test correct immediate guard loops, phantom last row defects, WHILE double-fetch patterns, and running balance accumulators live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(iterationScenarios).map(([key, item]) => {
              const isActive = selectedIterationScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedIterationScenario(key)}
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
                    {isActive ? "● Active Pattern" : "○ Run Loop Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{iterationScenarios[selectedIterationScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{iterationScenarios[selectedIterationScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Loop Control Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Cursor Loop Routine Script</span>
                <span className="text-emerald-400">Loop &amp; NOT FOUND Termination</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {iterationScenarios[selectedIterationScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Iteration / Row</th>
                    <th className="py-3 px-4 text-white">FETCH Status</th>
                    <th className="py-3 px-4 text-emerald-400">Guard Check Result</th>
                    <th className="py-3 px-4 text-cyan-400">Processing Action</th>
                    <th className="py-3 px-4 text-indigo-400">Loop Flow Action</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {iterationScenarios[selectedIterationScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.rowNumber}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.fetchStatus}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.guardCheck}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.processingAction}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.loopAction}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
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
              Real-world elimination of phantom double billing in Barrackpore student accounts.
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
                  Eliminating Phantom Double Charges in Barrackpore Tuition Deductions
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Accounts Department</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui debugged an accounting discrepancy: Every month, the last student in alphabetical order was charged tuition twice! The root cause was a bottom-guard cursor loop where <code className="text-rose-300 font-mono">INSERT INTO billing</code> ran before <code className="text-rose-300 font-mono">IF v_done THEN LEAVE;</code>. Moving the guard immediately after <code className="text-emerald-300 font-mono">FETCH</code> resolved the double-charge defect permanently!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- The Correct Guard Placement:
FETCH cur_billing INTO v_student_id, v_amount;
IF v_done THEN
    LEAVE billing_loop; -- Exits IMMEDIATELY before charge!
END IF;
INSERT INTO student_charges VALUES (v_student_id, v_amount);`}
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
              Avoid inner SELECT INTO collisions and remember to reset loop termination flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Inner SELECT INTO Premature Termination
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an inner query inside the cursor loop returns 0 rows, it triggers the procedure's <code className="text-rose-300 font-mono">NOT FOUND</code> handler, setting <code className="text-rose-300 font-mono">v_done = TRUE</code> and prematurely killing the outer cursor loop!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Isolate inner queries in nested blocks with their own handlers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Reset v_done = FALSE for Sequential Loops
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When iterating a second cursor in the same procedure, always explicitly reset <code className="text-emerald-400 font-mono">SET v_done = FALSE;</code> before calling <code className="text-emerald-400 font-mono">OPEN cur2;</code>.
              </p>
              <div className="text-xs text-slate-400">
                Prevents the second loop from exiting immediately.
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
              Key takeaways for Cursor LOOP Iteration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Loop Iteration Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use labeled <code className="text-cyan-300 font-mono">LOOP ... END LOOP</code> as the standard construct.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Place <code className="text-cyan-300 font-mono">IF v_done THEN LEAVE loop; END IF;</code> immediately after <code className="text-cyan-300 font-mono">FETCH</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Trap EOF with <code className="text-cyan-300 font-mono">DECLARE CONTINUE HANDLER FOR NOT FOUND</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always explicitly <code className="text-cyan-300 font-mono">CLOSE</code> the cursor after leaving the loop.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the ITERATE statement...”</span>
                  Use `ITERATE loop_label;` to skip the rest of the current loop body and advance to the next student row without breaking out of the loop!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about chunked commits...”</span>
                  In large loops (10,000+ rows), commit every 500 rows (`IF v_count % 500 = 0 THEN COMMIT; START TRANSACTION; END IF;`) to prevent lock escalation!
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
              Comprehensive reference questions covering cursor loop iteration constructs (LOOP, WHILE, REPEAT), NOT FOUND handler termination mechanics, the critical immediate exit guard placement rule, and preventing the phantom last row reprocessing bug.
            </p>
          </div>

          <FAQTemplate
            title="Cursor LOOP Iteration FAQs"
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
            title="Iterating Cursors with LOOP and NOT FOUND Handler Termination"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="The labeled LOOP ... END LOOP construct paired with DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE; is the canonical industry standard for cursor traversal in MySQL. Never violate the Immediate Guard Rule: always place IF v_done THEN LEAVE loop_label; END IF; immediately after FETCH. Placing it at the bottom will cause the phantom last row bug, leading to duplicate billing and corrupted data!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
