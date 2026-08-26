import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Nested Cursors and Managing Multiple Active Result Sets
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on nested cursor architectures, Master-Detail parent-child processing, resolving the shared NOT FOUND handler collision defect using nested BEGIN...END blocks, memory management, and refactoring to set-based JOIN alternatives.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedNestedScenario, setSelectedNestedScenario] = useState("nested_block_master_detail");

  const nestedScenarios = {
    nested_block_master_detail: {
      title: "1. The Correct Pattern: Nested Block Scoping (Department -> Student)",
      badge: "Nested Block Scope",
      badgeColor: "emerald",
      sqlQuery: `-- ✅ THE AUTHORITATIVE NESTED CURSOR ARCHITECTURE:
DELIMITER //

CREATE PROCEDURE sp_process_dept_students_nested()
BEGIN
    DECLARE v_dept_id INT;
    DECLARE v_dept_name VARCHAR(100);
    DECLARE v_outer_done BOOLEAN DEFAULT FALSE;

    -- Outer Cursor: Departments
    DECLARE cur_dept CURSOR FOR
        SELECT department_id, department_name FROM departments;

    -- Outer Handler:
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_outer_done = TRUE;

    OPEN cur_dept;

    dept_loop: LOOP
        FETCH cur_dept INTO v_dept_id, v_dept_name;
        IF v_outer_done THEN
            LEAVE dept_loop;
        END IF;

        -- 🛡️ INNER NESTED BLOCK: Isolates inner cursor & handler scope:
        BEGIN
            DECLARE v_student_id INT;
            DECLARE v_student_name VARCHAR(100);
            DECLARE v_fee DECIMAL(10,2);
            DECLARE v_inner_done BOOLEAN DEFAULT FALSE;

            -- Inner Cursor: Students of current Department:
            DECLARE cur_student CURSOR FOR
                SELECT student_id, name, tuition_fee 
                FROM students 
                WHERE department_id = v_dept_id;

            -- Inner Scoped Handler (Fires ONLY inside this inner block):
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_inner_done = TRUE;

            OPEN cur_student;

            student_loop: LOOP
                FETCH cur_student INTO v_student_id, v_student_name, v_fee;
                IF v_inner_done THEN
                    LEAVE student_loop;
                END IF;

                -- Process individual student:
                INSERT INTO department_invoices (dept_name, student_name, fee_billed)
                VALUES (v_dept_name, v_student_name, v_fee);
            END LOOP student_loop;

            CLOSE cur_student; -- Must close inside inner block!
        END; -- End of Inner Block (Resets inner scope)

    END LOOP dept_loop;

    CLOSE cur_dept;
END //

DELIMITER ;`,
      resultRows: [
        { outerRecord: "Dept 1: Computer Science", innerRecord: "Student 101: Mamata (₹25K)", handlerState: "Inner Loop Active", scopingStatus: "Inner Block Isolated", clientResult: "Billed Mamata to CS ✅", status: "Processed" },
        { outerRecord: "Dept 1: Computer Science", innerRecord: "Student 102: Susmita (₹25K)", handlerState: "Inner Loop Active", scopingStatus: "Inner Block Isolated", clientResult: "Billed Susmita to CS ✅", status: "Processed" },
        { outerRecord: "Dept 1: Computer Science", innerRecord: "EOF (Inner NOT FOUND)", handlerState: "v_inner_done = TRUE", scopingStatus: "v_outer_done UNTOUCHED", clientResult: "Exits Inner Loop cleanly", status: "Inner Complete ✅" },
        { outerRecord: "Dept 2: Business Studies", innerRecord: "Student 103: Abhronila (₹20K)", handlerState: "Inner Loop Active (Reset)", scopingStatus: "Fresh Inner Stack", clientResult: "Billed Abhronila to Business ✅", status: "Processed" },
        { outerRecord: "Dept 2: Business Studies", innerRecord: "Student 104: Debangshu (₹20K)", handlerState: "Inner Loop Active", scopingStatus: "Fresh Inner Stack", clientResult: "Billed Debangshu to Business ✅", status: "Processed" },
      ],
      explanation:
        "Enclosing the inner cursor in an inner `BEGIN ... END` block ensures that when the inner cursor reaches EOF, its `NOT FOUND` handler sets `v_inner_done = TRUE` without affecting the outer `v_outer_done` flag.",
    },
    shared_flag_collision_defect: {
      title: "2. The Dangerous Defect: Shared NOT FOUND Flag Collision",
      badge: "Collision Defect",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN ARCHITECTURE: Declaring both cursors in a single flat block:
DELIMITER //

CREATE PROCEDURE sp_nested_cursors_broken_collision()
BEGIN
    DECLARE v_dept_id INT;
    DECLARE v_stu_id INT;
    DECLARE v_done BOOLEAN DEFAULT FALSE; -- 💥 SHARED FLAG!

    DECLARE cur_dept CURSOR FOR SELECT department_id FROM departments;
    DECLARE cur_stu CURSOR FOR SELECT student_id FROM students WHERE department_id = v_dept_id;

    -- ❌ Single handler for BOTH cursors:
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_dept;

    dept_loop: LOOP
        FETCH cur_dept INTO v_dept_id;
        IF v_done THEN LEAVE dept_loop; END IF;

        OPEN cur_stu;
        stu_loop: LOOP
            FETCH cur_stu INTO v_stu_id;
            IF v_done THEN 
                -- 🚨 Inner cursor hits EOF and sets v_done = TRUE!
                LEAVE stu_loop; 
            END IF;
            -- Process student...
        END LOOP stu_loop;
        CLOSE cur_stu;

        -- 💥 OUTER LOOP NOW SEES v_done = TRUE AND TERMINATES PREMATURELY!
        -- 🛑 Result: Only Department 1 was processed! Departments 2, 3, 4 are SKIPPED!
    END LOOP dept_loop;

    CLOSE cur_dept;
END //

DELIMITER ;`,
      resultRows: [
        { outerRecord: "Dept 1: CS", innerRecord: "Mamata, Susmita", handlerState: "Shared Handler", scopingStatus: "Single Flat Block", clientResult: "Processes Dept 1 Students", status: "Processed" },
        { outerRecord: "Dept 1: CS EOF", innerRecord: "Inner Cursor hits EOF", handlerState: "Sets v_done = TRUE 💥", scopingStatus: "Shared Flag Poisoned", clientResult: "Leaves inner loop", status: "Collision Fired" },
        { outerRecord: "Dept 2: Business", innerRecord: "SKIPPED ❌", handlerState: "v_done IS STILL TRUE!", scopingStatus: "Outer Loop KILLED 🛑", clientResult: "Outer Loop Aborts Early!", status: "💥 System Data Loss" },
      ],
      explanation:
        "In a flat block, when the inner cursor reaches EOF for Dept 1, the shared `NOT FOUND` handler sets `v_done = TRUE`. When the outer loop checks `v_done`, it exits immediately, skipping all remaining departments!",
    },
    three_tier_deep_nesting: {
      title: "3. Deep Nesting: 3-Tier Hierarchy (Faculty -> Department -> Student)",
      badge: "3-Tier Hierarchy",
      badgeColor: "cyan",
      sqlQuery: `-- 3-Tier Nested Block Cursor Hierarchy:
DELIMITER //

CREATE PROCEDURE sp_three_tier_hierarchy_cursor()
BEGIN
    DECLARE v_fac_id INT;
    DECLARE v_fac_done BOOLEAN DEFAULT FALSE;
    DECLARE cur_fac CURSOR FOR SELECT faculty_id FROM faculties;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_fac_done = TRUE;

    OPEN cur_fac;
    fac_loop: LOOP
        FETCH cur_fac INTO v_fac_id;
        IF v_fac_done THEN LEAVE fac_loop; END IF;

        -- Level 2 Block: Departments
        BEGIN
            DECLARE v_dept_id INT;
            DECLARE v_dept_done BOOLEAN DEFAULT FALSE;
            DECLARE cur_dept CURSOR FOR SELECT department_id FROM departments WHERE faculty_id = v_fac_id;
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_dept_done = TRUE;

            OPEN cur_dept;
            dept_loop: LOOP
                FETCH cur_dept INTO v_dept_id;
                IF v_dept_done THEN LEAVE dept_loop; END IF;

                -- Level 3 Block: Students
                BEGIN
                    DECLARE v_stu_id INT;
                    DECLARE v_stu_done BOOLEAN DEFAULT FALSE;
                    DECLARE cur_stu CURSOR FOR SELECT student_id FROM students WHERE department_id = v_dept_id;
                    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_stu_done = TRUE;

                    OPEN cur_stu;
                    stu_loop: LOOP
                        FETCH cur_stu INTO v_stu_id;
                        IF v_stu_done THEN LEAVE stu_loop; END IF;
                        -- Process individual student...
                    END LOOP stu_loop;
                    CLOSE cur_stu;
                END; -- End Level 3

            END LOOP dept_loop;
            CLOSE cur_dept;
        END; -- End Level 2

    END LOOP fac_loop;
    CLOSE cur_fac;
END //

DELIMITER ;`,
      resultRows: [
        { outerRecord: "Tier 1: Engineering Faculty", innerRecord: "Tier 2: CS -> Tier 3: Mamata", handlerState: "3 Scoped Handlers", scopingStatus: "3 Nested Blocks", clientResult: "Granular 3-Tier Traversal", status: "Full Hierarchy ✅" },
      ],
      explanation:
        "Nesting three `BEGIN ... END` blocks allows arbitrary depth hierarchical traversal while maintaining complete handler isolation across all three tiers.",
    },
    set_based_join_refactoring: {
      title: "4. Refactoring to Set-Based SQL: Replacing O(N*M) with Single JOIN",
      badge: "Set-Based JOIN",
      badgeColor: "amber",
      sqlQuery: `-- ❌ SLOW NESTED CURSOR (O(N * M) Quadratic Time):
-- 100 Departments * 500 Students = 50,000 interpreter loops & open/close operations!
-- Execution time: 18.5 seconds

-- ✅ FAST SET-BASED JOIN REFACTORING (O(N + M) Linear Time):
-- Single relational query executed directly by the optimizer in 0.05 seconds (370x faster!):
INSERT INTO department_invoices (dept_name, student_name, fee_billed)
SELECT d.department_name, s.name, s.tuition_fee
FROM departments d
JOIN students s ON d.department_id = s.department_id;`,
      resultRows: [
        { outerRecord: "Set-Based JOIN", innerRecord: "All 50,000 Records", handlerState: "Zero Handlers Needed", scopingStatus: "Single Relational Statement", clientResult: "⚡ 0.05s (370x Faster)", status: "Optimal Architecture ⚡" },
        { outerRecord: "Nested Cursor Loop", innerRecord: "100 Outer * 500 Inner", handlerState: "50,000 Context Switches", scopingStatus: "Nested Virtual Machine Loops", clientResult: "🐢 18.50s (Slow Anti-Pattern)", status: "RBAR Anti-Pattern" },
      ],
      explanation:
        "Whenever possible, refactor nested cursors into a single `INSERT ... SELECT ... JOIN` query. Relational joins eliminate procedural interpreter overhead and run hundreds of times faster.",
    },
  };

  const navItems = [
    { id: "nested-concept", label: "1. The Need for Nested Cursors" },
    { id: "collision-defect", label: "2. The Handler Collision Defect" },
    { id: "svg-diagrams", label: "3. Scoping & Collision SVGs" },
    { id: "interactive-sandbox", label: "4. Live Nested Workbench" },
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
            <span>Topic 10 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Nested Cursors
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nested Cursors &amp; Multiple Active Result Sets
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master Master-Detail hierarchical traversal in MySQL stored procedures. Learn how to eliminate the shared <code className="text-cyan-300 font-mono">NOT FOUND</code> handler collision defect using isolated nested <code className="text-cyan-300 font-mono">BEGIN ... END</code> blocks, memory management, and refactoring to set-based JOINs.
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
        {/* SECTION 1: The Need for Nested Cursors */}
        <section id="nested-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Master-Detail Hierarchical Processing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Iterating parent entities and traversing related child records row-by-row.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>📂</span> Outer Cursor (Master / Parent)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Iterates through master records (e.g. Departments, Faculties, Invoices). For each master record fetched, it passes the master key into the inner cursor's query.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>📄</span> Inner Cursor (Detail / Child)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opens a parameterized result set for the current master record, iterates all child rows (e.g. Students in that Department), executes row-level mutations, and closes cleanly before the next master record.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Collision Defect */}
        <section id="collision-defect" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Shared NOT FOUND Handler Collision Defect
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why flat multi-cursor procedures fail and how nested blocks isolate scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>💥</span> The Flat Block Collision Bug
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If both cursors share the same `BEGIN ... END` block, when the inner cursor reaches EOF on Department 1, it triggers the shared <code className="text-rose-300 font-mono">NOT FOUND</code> handler, setting <code className="text-rose-300 font-mono">v_done = TRUE</code> and prematurely killing the outer department loop after just one department!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Nested Block Solution
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Declaring the inner cursor and its own scoped <code className="text-emerald-300 font-mono">DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_inner_done = TRUE;</code> inside an <strong>inner nested <code className="text-emerald-300 font-mono">BEGIN ... END</code> block</strong> isolates the inner EOF condition, leaving the outer loop flag completely untouched!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Scoping Isolation &amp; Collision Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing isolated nested block stacks with shared flat block collisions.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Scoping Isolation */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Nested Block Scoping Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Block */}
                  <g>
                    <rect x="20" y="20" width="810" height="125" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="45" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold">OUTER SCOPE: cur_dept (DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_outer_done = TRUE)</text>

                    {/* Inner Block */}
                    <rect x="180" y="55" width="480" height="75" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="420" y="75" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">INNER PROTECTED BLOCK: cur_student (v_inner_done = TRUE)</text>
                    <text x="420" y="95" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Inner EOF triggers ONLY inner handler → Leaves outer v_outer_done UNTOUCHED ✅</text>
                    <text x="420" y="112" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Outer department loop continues running cleanly!</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Collision Defect */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Shared NOT FOUND Flag Collision Trap
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Flat Block */}
                  <g>
                    <rect x="20" y="20" width="810" height="125" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="45" y="42" fill="#fca5a5" fontSize="10" fontWeight="bold">❌ FLAT UN-SCOPED BLOCK: Shared v_done Flag Collision</text>

                    <rect x="180" y="55" width="480" height="75" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
                    <text x="420" y="75" fill="#f87171" fontSize="9 font-bold" textAnchor="middle">Dept 1 Students Finish → Inner FETCH hits EOF (Error 1329)</text>
                    <text x="420" y="95" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">Shared Handler sets v_done = TRUE 💥 → Outer Loop reads v_done = TRUE</text>
                    <text x="420" y="112" fill="#f87171" fontSize="7 font-bold" textAnchor="middle">🛑 Outer loop ABORTS prematurely after Dept 1! Depts 2, 3, 4 are SKIPPED!</text>
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
              4. Interactive Nested Cursors Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test isolated nested block scoping, shared flag collision defects, 3-tier hierarchies, and set-based JOIN refactoring live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(nestedScenarios).map(([key, item]) => {
              const isActive = selectedNestedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedNestedScenario(key)}
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
                    {isActive ? "● Active Architecture" : "○ Run Nested Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{nestedScenarios[selectedNestedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{nestedScenarios[selectedNestedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Nested Execution Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Nested Cursor Routine Script</span>
                <span className="text-emerald-400">Master-Detail Scoping</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {nestedScenarios[selectedNestedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Outer Master Record</th>
                    <th className="py-3 px-4 text-white">Inner Detail Record</th>
                    <th className="py-3 px-4 text-emerald-400">Handler State</th>
                    <th className="py-3 px-4 text-cyan-400">Scoping Status</th>
                    <th className="py-3 px-4 text-indigo-400">Execution Result</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {nestedScenarios[selectedNestedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.outerRecord}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.innerRecord}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.handlerState}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.scopingStatus}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.clientResult}</td>
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
              Real-world multi-department invoicing and set-based query refactoring.
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
                  Eliminating Early Outer Termination in Barrackpore Department Invoicing
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Billing Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a multi-department tuition invoicing procedure: It generated invoices for Department 1, but silently stopped and skipped Departments 2 through 10. The bug was a shared <code className="text-rose-300 font-mono">v_done</code> flag in a flat block. Wrapping the inner student cursor in an inner <code className="text-emerald-300 font-mono">BEGIN ... END</code> block with its own scoped handler fixed the defect across all 10 departments!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Scoped Inner Block Fix:
dept_loop: LOOP
    FETCH cur_dept INTO v_dept_id;
    IF v_outer_done THEN LEAVE dept_loop; END IF;
    
    BEGIN -- Isolated Inner Block Scope
        DECLARE v_inner_done BOOLEAN DEFAULT FALSE;
        DECLARE cur_student CURSOR FOR SELECT id FROM students WHERE dept_id = v_dept_id;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_inner_done = TRUE;
        OPEN cur_student;
        -- student iteration...
        CLOSE cur_student;
    END;
END LOOP dept_loop;`}
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
              Avoid shared handler collisions and unindexed inner cursor full table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Unindexed Inner WHERE Clause (1000 Table Scans)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If the inner cursor executes <code className="text-rose-300 font-mono">SELECT * FROM students WHERE dept_id = v_dept</code> and <code className="text-rose-300 font-mono">dept_id</code> is not indexed, MySQL performs a full table scan for EVERY outer department row!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always index foreign key filter columns used in inner cursors!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always CLOSE Inner Cursors in the Inner Block
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always execute <code className="text-emerald-400 font-mono">CLOSE cur_inner;</code> before leaving the inner block. Forgetting to close it causes Error <code className="text-emerald-400 font-mono">1325</code> (Cursor already open) on the second outer cycle!
              </p>
              <div className="text-xs text-slate-400">
                Guarantees clean cursor re-opening across all outer rows.
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
              Key takeaways for Nested Cursors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Nested Cursors Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Always declare inner cursors inside their own nested <code className="text-cyan-300 font-mono">BEGIN ... END</code> block.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Declare a dedicated <code className="text-cyan-300 font-mono">NOT FOUND</code> handler inside the inner block.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always explicitly <code className="text-cyan-300 font-mono">CLOSE</code> the inner cursor at the end of the inner block.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Consider refactoring to a single <code className="text-cyan-300 font-mono">JOIN</code> query for 300x faster execution.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe outer loop exits from inner blocks...”</span>
                  Executing `LEAVE outer_dept_loop;` from inside the inner student loop breaks out of both loops simultaneously!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about per-department commits...”</span>
                  Commit transactions at the end of each outer loop cycle to release child row locks and keep undo logs small!
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
              Comprehensive reference questions covering nested cursor architectures, Master-Detail parent-child processing, resolving the shared NOT FOUND handler collision defect using nested BEGIN...END blocks, memory management, and refactoring to set-based JOIN alternatives.
            </p>
          </div>

          <FAQTemplate
            title="Nested Cursors FAQs"
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
            title="Nested Cursors and Managing Multiple Active Result Sets"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Nested cursors require rigorous architectural discipline. Never attempt to nest two cursors in a flat block: the inner cursor's NOT FOUND event will poison the shared loop flag and prematurely kill your outer loop! Always enclose inner cursors in dedicated nested BEGIN...END blocks with their own variables, handlers, and explicit CLOSE calls. Whenever feasible, refactor nested loops into a single SQL JOIN for massive speedups!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
