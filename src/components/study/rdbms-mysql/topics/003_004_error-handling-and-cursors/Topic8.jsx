import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Cursor Lifecycle: DECLARE CURSOR, OPEN, FETCH INTO, and CLOSE
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the 4 cursor lifecycle phases: DECLARE CURSOR, OPEN, FETCH INTO, and CLOSE, pointer positioning, parameter binding at OPEN time, type compatibility, and error handling (1325, 1326, 1328, 1329).
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedLifecycleScenario, setSelectedLifecycleScenario] = useState("four_phase_lifecycle_stepper");

  const lifecycleScenarios = {
    four_phase_lifecycle_stepper: {
      title: "1. The 4-Phase Progression: Complete Cursor Lifecycle Walkthrough",
      badge: "4-Phase Lifecycle",
      badgeColor: "cyan",
      sqlQuery: `-- The Complete 4-Phase Cursor Lifecycle:
DELIMITER //

CREATE PROCEDURE sp_cursor_lifecycle_demo()
BEGIN
    -- 1. Declare Local Variables:
    DECLARE v_id INT;
    DECLARE v_name VARCHAR(100);
    DECLARE v_fee DECIMAL(10,2);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    -- PHASE 1: DECLARE CURSOR (Define query structure)
    DECLARE cur_students CURSOR FOR
        SELECT student_id, name, tuition_fee 
        FROM students 
        WHERE department_id = 1;

    -- Declare NOT FOUND Handler (Traps end of data):
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    -- PHASE 2: OPEN (Materializes result set & sets pointer before row 1)
    OPEN cur_students;

    -- PHASE 3: FETCH (Advances pointer & copies data into variables)
    student_loop: LOOP
        FETCH cur_students INTO v_id, v_name, v_fee;
        IF v_done THEN
            LEAVE student_loop;
        END IF;

        -- Process each row:
        INSERT INTO processed_audit (student_id, fee) VALUES (v_id, v_fee);
    END LOOP student_loop;

    -- PHASE 4: CLOSE (Releases cursor memory and temporary buffers)
    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { phase: "PHASE 1: DECLARE", state: "Definition Only", pointerPos: "N/A (Query defined)", memoryState: "Zero allocation", actionExecuted: "Associated query with cur_students", status: "Ready" },
        { phase: "PHASE 2: OPEN", state: "Materialized", pointerPos: "Before Row 1 (Index 0)", memoryState: "Result set materialized", actionExecuted: "Query executed & pointer set", status: "Active ✅" },
        { phase: "PHASE 3: FETCH (Row 1)", state: "Reading Row 1", pointerPos: "Row 1 (Mamata)", memoryState: "Variables assigned", actionExecuted: "v_name = 'Mamata', v_fee = 25000", status: "In Progress" },
        { phase: "PHASE 3: FETCH (Row 2)", state: "Reading Row 2", pointerPos: "Row 2 (Susmita)", memoryState: "Variables assigned", actionExecuted: "v_name = 'Susmita', v_fee = 25000", status: "In Progress" },
        { phase: "PHASE 3: FETCH (EOF)", state: "NOT FOUND", pointerPos: "Past Last Row (Index 3)", memoryState: "Handler sets v_done=TRUE", actionExecuted: "LEAVE student_loop triggered", status: "Loop Exited" },
        { phase: "PHASE 4: CLOSE", state: "Deallocated", pointerPos: "N/A (Closed)", memoryState: "Buffers released", actionExecuted: "Deallocates cursor resources", status: "Deallocated ✅" },
      ],
      explanation:
        "The cursor lifecycle moves through 4 strict phases: `DECLARE` defines the query, `OPEN` materializes rows, `FETCH` iterates row-by-row until `NOT FOUND`, and `CLOSE` frees memory buffers.",
    },
    parameter_binding_at_open_time: {
      title: "2. Parameter Binding: Variables Evaluated at OPEN Time",
      badge: "Parameter Binding",
      badgeColor: "emerald",
      sqlQuery: `-- Result Set Parameter Binding Snapshot:
DELIMITER //

CREATE PROCEDURE sp_cursor_parameter_binding_demo()
BEGIN
    DECLARE v_dept_filter INT DEFAULT 1;
    DECLARE v_name VARCHAR(100);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    -- Cursor references local variable v_dept_filter:
    DECLARE cur_dept CURSOR FOR
        SELECT name FROM students WHERE department_id = v_dept_filter;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    -- OPEN evaluates v_dept_filter = 1 (Result set FROZEN here):
    OPEN cur_dept;

    -- Modifying variable AFTER OPEN has ZERO effect on active cursor!
    SET v_dept_filter = 999; 

    FETCH cur_dept INTO v_name; -- Still fetches students from department 1!
    SELECT v_name AS fetched_student;

    CLOSE cur_dept;
END //

DELIMITER ;`,
      resultRows: [
        { phase: "SET v_dept = 1", state: "Variable Setup", pointerPos: "N/A", memoryState: "Local variable = 1", actionExecuted: "Pre-condition set", status: "Initialized" },
        { phase: "OPEN cur_dept", state: "Query Bound", pointerPos: "Before Row 1", memoryState: "Result set for Dept 1 frozen", actionExecuted: "Binds Dept 1 result set", status: "Bound ✅" },
        { phase: "SET v_dept = 999", state: "Variable Mutated", pointerPos: "Before Row 1", memoryState: "Cursor remains Dept 1", actionExecuted: "No effect on open cursor", status: "Frozen State" },
        { phase: "FETCH INTO v_name", state: "Fetched Row 1", pointerPos: "Row 1 (Dept 1)", memoryState: "Returns Dept 1 Student", actionExecuted: "Fetched 'Mamata' (Dept 1)", status: "Verified" },
      ],
      explanation:
        "When `OPEN cur` executes, MySQL evaluates all variables in the `WHERE` clause and freezes the result set. Changing variable values after `OPEN` does NOT modify the open cursor.",
    },
    column_count_mismatch_error: {
      title: "3. Count & Type Matching: Preventing Error 1328 Mismatches",
      badge: "Type Compatibility",
      badgeColor: "rose",
      sqlQuery: `-- ❌ ERROR 1328: Column Count Mismatch Trap:
-- SELECT query returns 3 columns:
-- DECLARE cur CURSOR FOR SELECT student_id, name, tuition_fee FROM students;
--
-- ❌ BAD FETCH (Only 2 variables provided):
-- FETCH cur INTO v_id, v_name; 
-- 💥 ERROR 1328 (HY000): Incorrect number of FETCH variables (Expected 3, Got 2)!

-- ✅ CORRECT FETCH (Matches 3 variables):
-- FETCH cur INTO v_id, v_name, v_fee; -- Passes cleanly!`,
      resultRows: [
        { phase: "Mismatch Test", state: "SELECT 3 Columns", pointerPos: "Row 1", memoryState: "FETCH INTO 2 Variables", actionExecuted: "Throws Error 1328", status: "💥 Syntax Error" },
        { phase: "Matching Test", state: "SELECT 3 Columns", pointerPos: "Row 1", memoryState: "FETCH INTO 3 Variables", actionExecuted: "Variables assigned cleanly", status: "Valid Execution ✅" },
      ],
      explanation:
        "`FETCH cur INTO ...` requires an exact 1-to-1 match between the number of columns in the `SELECT` query and the number of target local variables; otherwise, Error 1328 is thrown.",
    },
    multi_cycle_cursor_reopening: {
      title: "4. Multi-Cycle Re-Opening: Closing & Re-Opening with Fresh Parameters",
      badge: "Re-Opening Cycles",
      badgeColor: "amber",
      sqlQuery: `-- Re-using a Cursor across Multiple Parameter Cycles:
DELIMITER //

CREATE PROCEDURE sp_multicycle_cursor_demo()
BEGIN
    DECLARE v_dept INT;
    DECLARE v_name VARCHAR(100);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_students CURSOR FOR
        SELECT name FROM students WHERE department_id = v_dept;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    -- Cycle 1: Department 1
    SET v_dept = 1;
    OPEN cur_students;
    FETCH cur_students INTO v_name;
    CLOSE cur_students; -- Deallocates Dept 1 result set

    -- Reset NOT FOUND Flag:
    SET v_done = FALSE;

    -- Cycle 2: Department 2 (Re-opens with fresh parameters!)
    SET v_dept = 2;
    OPEN cur_students; -- Evaluates fresh query for Dept 2!
    FETCH cur_students INTO v_name;
    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { phase: "Cycle 1 (Dept 1)", state: "OPEN -> FETCH -> CLOSE", pointerPos: "Dept 1 Rows", memoryState: "Deallocated on CLOSE", actionExecuted: "Processed Dept 1 Students", status: "Cycle 1 Complete ✅" },
        { phase: "Cycle 2 (Dept 2)", state: "OPEN -> FETCH -> CLOSE", pointerPos: "Dept 2 Rows", memoryState: "Fresh Result Set", actionExecuted: "Processed Dept 2 Students", status: "Cycle 2 Complete ✅" },
      ],
      explanation:
        "You can `OPEN`, `FETCH`, and `CLOSE` the same cursor multiple times. Each `OPEN` executes a fresh query evaluation against current variable values.",
    },
  };

  const navItems = [
    { id: "lifecycle-overview", label: "1. The 4 Lifecycle Phases" },
    { id: "error-codes", label: "2. Cursor Error Codes" },
    { id: "svg-diagrams", label: "3. Lifecycle & Pointer SVGs" },
    { id: "interactive-sandbox", label: "4. Live Lifecycle Workbench" },
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
            <span>Topic 8 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Cursor Lifecycle
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cursor Lifecycle: DECLARE, OPEN, FETCH &amp; CLOSE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete execution lifecycle of MySQL database cursors. Learn declaration ordering rules, <code className="text-cyan-300 font-mono">OPEN</code> result set materialization, pointer mechanics during <code className="text-cyan-300 font-mono">FETCH INTO</code>, column count matching, and memory deallocation with <code className="text-cyan-300 font-mono">CLOSE</code>.
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
        {/* SECTION 1: The 4 Lifecycle Phases */}
        <section id="lifecycle-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Phases of the Cursor Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The sequential stages every cursor must transition through.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Phase 1</div>
              <h3 className="text-sm font-bold text-white font-mono">DECLARE CURSOR</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Associates a named cursor identifier with a `SELECT` statement. No query execution occurs yet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Phase 2</div>
              <h3 className="text-sm font-bold text-white font-mono">OPEN</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes the query, evaluates variables, materializes rows, and places the pointer before row 1.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">Phase 3</div>
              <h3 className="text-sm font-bold text-white font-mono">FETCH INTO</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Advances the row pointer by 1 and copies column values into target local variables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase">Phase 4</div>
              <h3 className="text-sm font-bold text-white font-mono">CLOSE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Releases result set memory, temporary buffers, and deallocates the cursor resource.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cursor Error Codes */}
        <section id="error-codes" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Common Cursor Runtime Error Codes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard MySQL error numbers associated with improper cursor lifecycle transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 font-mono">Error 1325</div>
              <div className="text-slate-200 font-semibold">Cursor Already Open</div>
              <div className="text-slate-400">Attempted `OPEN` on an already open cursor.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 font-mono">Error 1326</div>
              <div className="text-slate-200 font-semibold">Cursor Not Open</div>
              <div className="text-slate-400">Attempted `FETCH` or `CLOSE` on an unopened cursor.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 font-mono">Error 1328</div>
              <div className="text-slate-200 font-semibold">Wrong Variable Count</div>
              <div className="text-slate-400">FETCH variable count != SELECT column count.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 font-mono">Error 1329 ('02000')</div>
              <div className="text-slate-200 font-semibold">No Data to FETCH</div>
              <div className="text-slate-400">Reached end of cursor (trapped by NOT FOUND).</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: State Machine &amp; Pointer Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 4 lifecycle transitions and row pointer movements.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Lifecycle State Machine */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Cursor Lifecycle State Machine
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* DECLARE */}
                  <g>
                    <rect x="20" y="30" width="170" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="105" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. DECLARE</text>
                    <rect x="30" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="105" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">DECLARE cur CURSOR</text>
                    <text x="105" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">FOR SELECT ...</text>
                  </g>

                  {/* OPEN */}
                  <g>
                    <rect x="230" y="30" width="170" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="315" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. OPEN</text>
                    <rect x="240" y="70" width="150" height="40" rx="4" fill="#022c22" />
                    <text x="315" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">OPEN cur;</text>
                    <text x="315" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Materializes Rows</text>
                  </g>

                  {/* FETCH */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="530" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. FETCH (Loop)</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="530" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">FETCH cur INTO v1, v2</text>
                    <text x="530" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Advances Pointer</text>
                  </g>

                  {/* CLOSE */}
                  <g>
                    <rect x="660" y="30" width="170" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="745" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">4. CLOSE</text>
                    <rect x="670" y="70" width="150" height="40" rx="4" fill="#1e293b" />
                    <text x="745" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">CLOSE cur;</text>
                    <text x="745" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Frees Memory</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 190 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 400 80 L 440 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 620 80 L 660 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Pointer Movement */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Pointer Mechanics &amp; Sequential Row Traversal
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Index 0: After OPEN */}
                  <g>
                    <rect x="30" y="30" width="180" height="100" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">After OPEN (Index 0)</text>
                    <rect x="40" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="120" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Pointer BEFORE Row 1</text>
                    <text x="120" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Variables: UNASSIGNED</text>
                  </g>

                  {/* Index 1: FETCH 1 */}
                  <g>
                    <rect x="240" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="330" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">FETCH 1 (Row 1)</text>
                    <rect x="250" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="330" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Pointer ON Row 1</text>
                    <text x="330" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">v_name = 'Mamata'</text>
                  </g>

                  {/* Index 2: FETCH 2 */}
                  <g>
                    <rect x="450" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="540" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">FETCH 2 (Row 2)</text>
                    <rect x="460" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="540" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Pointer ON Row 2</text>
                    <text x="540" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">v_name = 'Susmita'</text>
                  </g>

                  {/* Index 3: NOT FOUND */}
                  <g>
                    <rect x="660" y="30" width="160" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">EOF (NOT FOUND)</text>
                    <rect x="670" y="70" width="140" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Error 1329 Raised</text>
                    <text x="740" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">SET v_done = TRUE</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 210 80 L 240 80" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 420 80 L 450 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 630 80 L 660 80" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Cursor Lifecycle Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test complete 4-phase lifecycle stepping, parameter binding snapshots, column count matching rules, and multi-cycle cursor re-opening live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(lifecycleScenarios).map(([key, item]) => {
              const isActive = selectedLifecycleScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLifecycleScenario(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Step" : "○ Run Lifecycle Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{lifecycleScenarios[selectedLifecycleScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{lifecycleScenarios[selectedLifecycleScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Lifecycle Stepper Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Cursor Lifecycle Routine Script</span>
                <span className="text-emerald-400">4-Phase State Progression</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {lifecycleScenarios[selectedLifecycleScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Lifecycle Phase</th>
                    <th className="py-3 px-4 text-white">Execution State</th>
                    <th className="py-3 px-4 text-emerald-400">Pointer Position</th>
                    <th className="py-3 px-4 text-cyan-400">Memory &amp; Buffers</th>
                    <th className="py-3 px-4 text-indigo-400">Action Executed</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lifecycleScenarios[selectedLifecycleScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.phase}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.state}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.pointerPos}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.memoryState}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.actionExecuted}</td>
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
              Real-world memory deallocation and parameter snapshotting.
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
                  Eliminating Server Memory Leaks with Explicit CLOSE in Barrackpore Accounts
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Billing Gateway</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui diagnosed high RAM consumption in an invoicing daemon: A loop called a stored procedure 10,000 times that left cursors open, expecting automatic garbage collection. Adding an explicit <code className="text-emerald-300 font-mono">CLOSE cur;</code> at the end of each procedure execution freed temporary memory buffers immediately, reducing server RAM footprint by 85%!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Explicit Deallocation Best Practice:
OPEN cur_invoices;
FETCH cur_invoices INTO v_id, v_amt;
-- Processing...
CLOSE cur_invoices; -- Frees temporary buffers immediately!`}
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
              Avoid column count mismatches and remember that OPEN binds parameter snapshots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Variable Count Mismatch (Error 1328)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If your `SELECT` returns 3 columns and your `FETCH INTO` only lists 2 variables, MySQL throws Error <code className="text-rose-300 font-mono">1328</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always match variable count exactly with cursor query column count.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always CLOSE Cursors Explicitly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never rely solely on automatic cleanup at procedure exit; always explicitly execute <code className="text-emerald-400 font-mono">CLOSE cur;</code> as soon as iteration finishes.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees immediate temporary table memory deallocation.
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
              Key takeaways for the Cursor Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Lifecycle Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">DECLARE CURSOR</code> defines query; placed after variables &amp; before handlers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">OPEN</code> materializes result set &amp; positions pointer at index 0.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">FETCH INTO</code> advances pointer &amp; populates compatible local variables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">CLOSE</code> releases result set buffers and frees server RAM.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe parameter snapshots...”</span>
                  Remember that query parameters in the cursor's `WHERE` clause are evaluated at `OPEN` time! Modifying variables after `OPEN` has zero effect on the active result set!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-cycle loops...”</span>
                  To re-query with new parameters, execute `CLOSE cur;`, change your variables, reset `v_done = FALSE;`, and execute `OPEN cur;` again!
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
              Comprehensive reference questions covering the 4 cursor lifecycle phases: DECLARE CURSOR, OPEN, FETCH INTO, and CLOSE, pointer positioning, parameter binding at OPEN time, type compatibility, and error handling (1325, 1326, 1328, 1329).
            </p>
          </div>

          <FAQTemplate
            title="Cursor Lifecycle FAQs"
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
            title="Cursor Lifecycle: DECLARE CURSOR, OPEN, FETCH INTO, and CLOSE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Understanding the 4 lifecycle phases of a cursor—DECLARE, OPEN, FETCH, and CLOSE—is essential for avoiding subtle bugs. Always remember that OPEN materializes the result set and binds variables at that exact moment. When iterating with FETCH INTO, ensure variable counts and data types match your query columns precisely, and never forget to CLOSE your cursors to free server memory immediately!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
