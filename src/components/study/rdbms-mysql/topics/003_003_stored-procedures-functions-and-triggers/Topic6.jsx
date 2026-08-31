import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Looping Constructs: WHILE ... DO, REPEAT ... UNTIL, and LOOP with LEAVE / ITERATE
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on procedural loops (WHILE, REPEAT, LOOP), loop control with LEAVE and ITERATE, labeled blocks, infinite loop prevention, and batch transaction processing.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedLoopScenario, setSelectedLoopScenario] = useState("while_attendance_seeding");

  const loopScenarios = {
    while_attendance_seeding: {
      title: "1. WHILE Loop: Automated 30-Day Attendance Seeding (Pre-Test)",
      badge: "WHILE ... DO",
      badgeColor: "emerald",
      sqlQuery: `-- Pre-Test WHILE Loop: Generates 30 days of daily student attendance:
DELIMITER //

CREATE PROCEDURE sp_seed_monthly_attendance(
    IN p_student_id INT,
    IN p_start_date DATE,
    OUT p_total_inserted INT
)
BEGIN
    DECLARE v_day_offset INT DEFAULT 0;
    DECLARE v_current_date DATE;
    
    SET p_total_inserted = 0;
    
    -- Pre-Test WHILE condition evaluated before every cycle:
    WHILE v_day_offset < 30 DO
        SET v_current_date = DATE_ADD(p_start_date, INTERVAL v_day_offset DAY);
        
        -- Insert mock attendance status (Exclude Sundays):
        IF DAYOFWEEK(v_current_date) != 1 THEN
            INSERT INTO student_attendance (student_id, attendance_date, is_present)
            VALUES (p_student_id, v_current_date, TRUE);
            
            SET p_total_inserted = p_total_inserted + 1;
        END IF;
        
        -- CRITICAL: Increment counter to prevent infinite loop!
        SET v_day_offset = v_day_offset + 1;
    END WHILE;
END //

DELIMITER ;

CALL sp_seed_monthly_attendance(101, '2026-01-01', @inserted);
SELECT @inserted AS days_recorded;`,
      resultRows: [
        { id: "Day 0–29", target: "Mamata Hui (ID 101)", loopType: "WHILE (v_day_offset < 30)", cycles: "30 Evaluations", inserted: "26 Active Days (Sundays Skipped)", status: "Batch Seeded" },
      ],
      explanation:
        "The `WHILE` loop tests its condition *before* entry. It iterates through 30 offsets, skipping Sundays (`DAYOFWEEK != 1`), and commits 26 active attendance records while incrementing `v_day_offset` safely.",
    },
    repeat_until_interest_compounding: {
      title: "2. REPEAT Loop: Compounding Arrears Interest (Post-Test)",
      badge: "REPEAT ... UNTIL",
      badgeColor: "cyan",
      sqlQuery: `-- Post-Test REPEAT Loop: Evaluates interest compounding (Runs at least 1 time):
DELIMITER //

CREATE PROCEDURE sp_simulate_overdue_interest(
    IN p_initial_arrears DECIMAL(10,2),
    IN p_monthly_interest_rate DECIMAL(5,4),
    IN p_max_months INT,
    OUT p_final_compounded_balance DECIMAL(10,2),
    OUT p_months_elapsed INT
)
BEGIN
    DECLARE v_balance DECIMAL(10,2);
    DECLARE v_month_counter INT DEFAULT 0;
    
    SET v_balance = p_initial_arrears;
    
    -- REPEAT executes body first, then checks UNTIL condition:
    REPEAT
        SET v_month_counter = v_month_counter + 1;
        SET v_balance = v_balance * (1.00 + p_monthly_interest_rate);
    UNTIL (v_month_counter >= p_max_months OR v_balance >= (p_initial_arrears * 2.0))
    END REPEAT; -- ⚠️ Notice NO semicolon after UNTIL condition!
    
    SET p_final_compounded_balance = ROUND(v_balance, 2);
    SET p_months_elapsed = v_month_counter;
END //

DELIMITER ;

CALL sp_simulate_overdue_interest(10000.00, 0.02, 6, @compounded, @months);
SELECT @compounded AS compounded_arrears, @months AS total_months;`,
      resultRows: [
        { id: "Arrears Sim", target: "Initial: ₹10,000.00 @ 2% Monthly", loopType: "REPEAT ... UNTIL (6 Months)", cycles: "6 Post-Test Runs", inserted: "Final Balance: ₹11,261.62", status: "Compounded" },
      ],
      explanation:
        "`REPEAT` executes its statements *before* checking the `UNTIL` condition. The loop terminates when the condition evaluates to TRUE (or after reaching the month limit).",
    },
    loop_with_leave_iterate: {
      title: "3. LOOP with LEAVE (Break) & ITERATE (Continue)",
      badge: "LOOP (LEAVE/ITERATE)",
      badgeColor: "amber",
      sqlQuery: `-- Infinite LOOP with explicit LEAVE and ITERATE flow control:
DELIMITER //

CREATE PROCEDURE sp_process_filtered_fee_reconciliation()
BEGIN
    DECLARE v_cursor_id INT DEFAULT 0;
    DECLARE v_total_processed INT DEFAULT 0;
    
    reconciliation_loop: LOOP
        SET v_cursor_id = v_cursor_id + 1;
        
        -- Early Exit condition (LEAVE = break):
        IF v_cursor_id > 10 THEN
            LEAVE reconciliation_loop;
        END IF;
        
        -- Skip condition (ITERATE = continue on odd IDs):
        IF MOD(v_cursor_id, 2) != 0 THEN
            ITERATE reconciliation_loop; -- Skips to next cycle
        END IF;
        
        -- Process even numbered accounts only:
        SET v_total_processed = v_total_processed + 1;
    END LOOP reconciliation_loop;
    
    SELECT v_total_processed AS total_even_accounts_reconciled;
END //

DELIMITER ;

CALL sp_process_filtered_fee_reconciliation();`,
      resultRows: [
        { id: "Cursor Loop", target: "IDs 1 to 10", loopType: "LOOP with LEAVE & ITERATE", cycles: "10 Iterations", inserted: "5 Even Accounts Processed", status: "Reconciled with Skips" },
      ],
      explanation:
        "`LOOP` runs indefinitely until `LEAVE label;` breaks execution. `ITERATE label;` skips odd IDs, jumping directly to the next loop iteration like a `continue` statement.",
    },
    infinite_loop_safety_ceiling: {
      title: "4. Infinite Loop Defense: Safety Hard-Limit Ceilings",
      badge: "Safety Ceilings",
      badgeColor: "rose",
      sqlQuery: `-- Production Safety Pattern: Hard iteration ceiling prevents CPU exhaustion:
DELIMITER //

CREATE PROCEDURE sp_safe_iterative_processor()
BEGIN
    DECLARE v_safety_counter INT DEFAULT 0;
    DECLARE v_done BOOLEAN DEFAULT FALSE;
    
    safe_loop: LOOP
        SET v_safety_counter = v_safety_counter + 1;
        
        -- DEFENSIVE HARD CEILING: Never allow runaway loops to peg database CPU:
        IF v_safety_counter > 50000 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FATAL: Loop safety ceiling of 50,000 iterations exceeded!';
        END IF;
        
        -- Simulation termination:
        IF v_safety_counter >= 100 THEN
            LEAVE safe_loop;
        END IF;
    END LOOP safe_loop;
    
    SELECT v_safety_counter AS safe_completed_cycles;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Safe Ceiling", target: "Max 50,000 Limit", loopType: "Safety Bounded LOOP", cycles: "100 Cycles Completed", inserted: "CPU Protected from Runaway Loops", status: "Protected & Safe" },
      ],
      explanation:
        "Senior architects implement safety ceiling counters (`v_safety_counter > 50000`) to guarantee that accidental infinite loops raise an exception instead of locking the database server.",
    },
  };

  const navItems = [
    { id: "loop-types", label: "1. Three Looping Constructs" },
    { id: "leave-iterate", label: "2. LEAVE vs ITERATE" },
    { id: "svg-diagrams", label: "3. Loop Flowcharts & Control SVGs" },
    { id: "interactive-sandbox", label: "4. Live Looping Workbench" },
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
            <span>Module 003_003</span>
            <span>•</span>
            <span>Topic 6 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Procedural Iteration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Looping Constructs: WHILE, REPEAT &amp; LOOP
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master repetitive procedural processing in MySQL. Understand pre-test <code className="text-cyan-300 font-mono">WHILE</code> loops, post-test <code className="text-cyan-300 font-mono">REPEAT</code> loops, infinite <code className="text-cyan-300 font-mono">LOOP</code> blocks, and loop control with <code className="text-cyan-300 font-mono">LEAVE</code> and <code className="text-cyan-300 font-mono">ITERATE</code>.
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
        {/* SECTION 1: Loop Types */}
        <section id="loop-types" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Looping Constructs in MySQL
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pre-test evaluation, post-test evaluation, and labeled loop blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🔄</span> 1. WHILE ... DO (Pre-Test)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Condition evaluated *before* loop entry. Runs 0 or more times. Terminates with <code className="text-emerald-300 font-mono">END WHILE;</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔁</span> 2. REPEAT ... UNTIL (Post-Test)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Condition evaluated *after* execution. Runs at least 1 time. Terminates when UNTIL condition becomes TRUE.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>♾️</span> 3. LOOP (Infinite + LEAVE)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Runs indefinitely until broken out with <code className="text-amber-300 font-mono">LEAVE label;</code>. Supports <code className="text-amber-300 font-mono">ITERATE label;</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: LEAVE vs ITERATE */}
        <section id="leave-iterate" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Loop Flow Control: LEAVE vs ITERATE
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Equivalent to `break` and `continue` in modern programming languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">1. LEAVE label (Break Out)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                IF v_counter &gt; 10 THEN LEAVE my_loop; END IF;
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Immediately breaks out of the labeled loop, transferring execution directly to the statement after <code className="text-emerald-300 font-mono">END LOOP</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. ITERATE label (Continue Cycle)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                IF MOD(v_counter, 2) = 1 THEN ITERATE my_loop; END IF;
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Skips the rest of the current iteration and immediately restarts at the beginning of the next loop cycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Loop Flowcharts &amp; LEAVE/ITERATE Control
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pre-test vs post-test execution and loop control directives.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: The 3 Loops */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Flowcharts: WHILE (Pre-Test) vs REPEAT (Post-Test) vs LOOP
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* WHILE */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. WHILE (Pre-Test)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Check Condition → Run Body</text>
                    <text x="145" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Executes 0 or more times</text>
                  </g>

                  {/* REPEAT */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. REPEAT (Post-Test)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Run Body → UNTIL Condition</text>
                    <text x="425" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Executes AT LEAST 1 time</text>
                  </g>

                  {/* LOOP */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. LOOP (Infinite Block)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1c1917" />
                    <text x="705" y="88" fill="#fde68a" fontSize="8 font-mono" textAnchor="middle">Body → LEAVE / ITERATE</text>
                    <text x="705" y="102" fill="#f59e0b" fontSize="7 font-bold" textAnchor="middle">Explicit exit required</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: LEAVE vs ITERATE */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> LEAVE (Break Out) vs ITERATE (Restart Cycle) Directives
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* LEAVE */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">LEAVE label (Exit / Break)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">IF count &gt; 10 THEN LEAVE my_loop; END IF;</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Terminates loop completely → Jumps past END LOOP</text>
                  </g>

                  {/* ITERATE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">ITERATE label (Continue Cycle)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">IF MOD(id, 2) = 1 THEN ITERATE my_loop; END IF;</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Skips rest of body → Restarts at top of loop</text>
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
              4. Interactive Looping Constructs Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test WHILE attendance generators, REPEAT compounding calculators, LOOP with LEAVE/ITERATE, and safety ceilings live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(loopScenarios).map(([key, item]) => {
              const isActive = selectedLoopScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLoopScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Loop" : "○ Run Loop Model"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{loopScenarios[selectedLoopScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{loopScenarios[selectedLoopScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Procedural Iteration Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Looping Script</span>
                <span className="text-emerald-400">Bytecode Loop Stack</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {loopScenarios[selectedLoopScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Loop Range / ID</th>
                    <th className="py-3 px-4 text-white">Target Entity / Parameters</th>
                    <th className="py-3 px-4 text-emerald-400">Looping Construct</th>
                    <th className="py-3 px-4 text-cyan-400">Executed Cycles</th>
                    <th className="py-3 px-4 text-amber-400">Committed Records / Balance</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {loopScenarios[selectedLoopScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.target}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.loopType}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.cycles}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans font-bold">{row.inserted}</td>
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
              Real-world attendance log generation and batch transaction chunking.
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
                  Seeding 30-Day Attendance Logs for Barrackpore Academy Cohort
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated monthly attendance staging: A stored procedure uses a <code className="text-emerald-300 font-mono">WHILE</code> loop with date arithmetic (<code className="text-cyan-300 font-mono">DATE_ADD(start_date, INTERVAL day_offset DAY)</code>) to generate exactly 30 calendar records per student in a single execution call, automatically skipping weekend holidays!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Automated Monthly Attendance Generator:
WHILE v_day < 30 DO
    SET v_cur_date = DATE_ADD(p_start, INTERVAL v_day DAY);
    IF DAYOFWEEK(v_cur_date) NOT IN (1, 7) THEN
        INSERT INTO attendance (student_id, att_date, is_present) VALUES (p_id, v_cur_date, TRUE);
    END IF;
    SET v_day = v_day + 1;
END WHILE;`}
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
              Avoid infinite loop disasters and syntax gotchas in UNTIL clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Semicolon after UNTIL Line in REPEAT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">UNTIL count &gt;= 10; END REPEAT;</code> throws a syntax error. The `UNTIL` condition MUST NOT have a semicolon immediately after it!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Write <code className="text-emerald-400 font-mono">UNTIL count &gt;= 10 END REPEAT;</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Add Hard Iteration Safety Ceilings
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Implement a safety counter (<code className="text-emerald-400 font-mono">IF safety_count &gt; 50000 THEN LEAVE; END IF;</code>) to protect the MySQL database server from runaway CPU lockups.
              </p>
              <div className="text-xs text-slate-400">
                Essential defensive production safety measure.
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
              Key takeaways for Looping Constructs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Looping Constructs Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">WHILE ... DO</code> for standard pre-test iteration (0+ runs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">REPEAT ... UNTIL</code> when at least 1 run is guaranteed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">LEAVE label;</code> to break out and <code className="text-cyan-300 font-mono">ITERATE label;</code> to continue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always increment loop counters before calling <code className="text-cyan-300 font-mono">ITERATE</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe set-based alternatives...”</span>
                  For populating millions of calendar dates or sequence numbers, a Recursive CTE (`WITH RECURSIVE`) runs 50x faster than row-by-row procedural loops!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about batch commits...”</span>
                  When processing thousands of rows in a loop, commit every 1,000 records to prevent bloating MySQL undo logs and holding excessive row locks!
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
              Comprehensive reference questions covering WHILE, REPEAT, LOOP, LEAVE, ITERATE, infinite loop prevention, and batch commit strategies.
            </p>
          </div>

          <FAQTemplate
            title="Looping Constructs FAQs"
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
            title="Looping Constructs: WHILE ... DO, REPEAT ... UNTIL, and LOOP with LEAVE / ITERATE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Looping constructs allow database stored procedures to execute iterative algorithms, simulate financial schedules, and perform batch data seeding. Remember the pre-test vs post-test distinction: WHILE checks condition before entering (0+ times), while REPEAT runs the body first before checking UNTIL (1+ times). Always ensure your counters increment on every path, especially before ITERATE statements, to prevent infinite loops from locking your server CPU!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
