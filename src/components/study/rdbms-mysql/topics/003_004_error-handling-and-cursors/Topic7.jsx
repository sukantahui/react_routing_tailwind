import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Introduction to Database Cursors: When and Why Row-by-Row Processing is Needed
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on database cursor concepts, Set-Based vs Row-by-Row processing, Read-Only / Non-Scrollable / Asensitive properties, legitimate use cases (dynamic DDL, chunked batching), and avoiding the RBAR anti-pattern.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedCursorScenario, setSelectedCursorScenario] = useState("dynamic_ddl_maintenance_cursor");

  const cursorScenarios = {
    dynamic_ddl_maintenance_cursor: {
      title: "1. Dynamic DDL Maintenance: Automated Multi-Table Optimization Cursor",
      badge: "Dynamic DDL",
      badgeColor: "cyan",
      sqlQuery: `-- Dynamic Metadata Maintenance across Tables using Cursor + Prepared Statements:
DELIMITER //

CREATE PROCEDURE sp_optimize_all_archive_tables()
BEGIN
    DECLARE v_table_name VARCHAR(100);
    DECLARE v_is_done BOOLEAN DEFAULT FALSE;

    -- 1. Declare Cursor on information_schema metadata:
    DECLARE cur_tables CURSOR FOR
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'barrackpore_academy' 
          AND table_name LIKE 'archive_%';

    -- 2. Handler for Cursor Termination:
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_is_done = TRUE;

    -- 3. Open and Traverse:
    OPEN cur_tables;

    optimize_loop: LOOP
        FETCH cur_tables INTO v_table_name;
        IF v_is_done THEN
            LEAVE optimize_loop;
        END IF;

        -- Construct and execute dynamic DDL per table:
        SET @sql = CONCAT('OPTIMIZE TABLE barrackpore_academy.', v_table_name);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP optimize_loop;

    CLOSE cur_tables;
END //

DELIMITER ;`,
      resultRows: [
        { id: "archive_students_2024", processingMode: "Cursor FETCH (Row 1)", operationType: "OPTIMIZE TABLE", executionMethod: "Dynamic PREPARE", memoryImpact: "Low (Table name only)", status: "Optimized ✅" },
        { id: "archive_payments_2024", processingMode: "Cursor FETCH (Row 2)", operationType: "OPTIMIZE TABLE", executionMethod: "Dynamic PREPARE", memoryImpact: "Low (Table name only)", status: "Optimized ✅" },
        { id: "archive_exams_2024", processingMode: "Cursor FETCH (Row 3)", operationType: "OPTIMIZE TABLE", executionMethod: "Dynamic PREPARE", memoryImpact: "Low (Table name only)", status: "Optimized ✅" },
      ],
      explanation:
        "Because SQL cannot execute dynamic DDL (`OPTIMIZE TABLE`) in a single set-based query, a cursor iterating over `information_schema` is the ideal architectural solution.",
    },
    progressive_scholarship_evaluation: {
      title: "2. Procedural Logic: Complex Multi-Tiered Student Scholarship Evaluation",
      badge: "Complex Logic",
      badgeColor: "emerald",
      sqlQuery: `-- Complex State-Dependent Evaluation Requiring Row-by-Row Procedural Steps:
DELIMITER //

CREATE PROCEDURE sp_evaluate_student_scholarships_cursor()
BEGIN
    DECLARE v_student_id INT;
    DECLARE v_score DECIMAL(5,2);
    DECLARE v_income DECIMAL(10,2);
    DECLARE v_scholarship DECIMAL(10,2);
    DECLARE v_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_students CURSOR FOR
        SELECT student_id, exam_score_pct, family_income_annual
        FROM student_scholarship_applications
        WHERE status = 'PENDING';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_students;

    eval_loop: LOOP
        FETCH cur_students INTO v_student_id, v_score, v_income;
        IF v_done THEN
            LEAVE eval_loop;
        END IF;

        -- Complex non-linear procedural business logic:
        IF v_score &ge; 90.0 AND v_income < 250000.00 THEN
            SET v_scholarship = 50000.00;
        ELSEIF v_score >= 80.0 AND v_income < 400000.00 THEN
            SET v_scholarship = 25000.00;
        ELSE
            SET v_scholarship = 0.00;
        END IF;

        -- Update record and call notification workflow:
        UPDATE student_scholarship_applications 
        SET scholarship_awarded = v_scholarship, status = 'APPROVED'
        WHERE student_id = v_student_id;
    END LOOP eval_loop;

    CLOSE cur_students;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Mamata (Score 94%, Inc ₹1.8L)", processingMode: "Row 1 FETCH", operationType: "Tier 1 Logic", executionMethod: "UPDATE + Award ₹50K", memoryImpact: "Single Record State", status: "Approved ₹50,000 ✅" },
        { id: "Susmita (Score 85%, Inc ₹3.2L)", processingMode: "Row 2 FETCH", operationType: "Tier 2 Logic", executionMethod: "UPDATE + Award ₹25K", memoryImpact: "Single Record State", status: "Approved ₹25,000 ✅" },
        { id: "Debangshu (Score 72%, Inc ₹5.0L)", processingMode: "Row 3 FETCH", operationType: "Tier 3 Logic", executionMethod: "UPDATE + Award ₹0", memoryImpact: "Single Record State", status: "No Award" },
      ],
      explanation:
        "When business rules require complex procedural branching, nested validation, or row-by-row workflow triggers, cursors provide granular step-by-step control.",
    },
    batch_chunking_lock_prevention: {
      title: "3. Batch Chunking: Processing 500 Rows per Commit to Prevent Lock Escalation",
      badge: "Lock Prevention",
      badgeColor: "amber",
      sqlQuery: `-- Periodic Batch Commit Cursor for Massive Datasets (e.g. 500,000 Rows):
DELIMITER //

CREATE PROCEDURE sp_chunked_batch_ledger_archive()
BEGIN
    DECLARE v_ledger_id INT;
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_is_done BOOLEAN DEFAULT FALSE;

    DECLARE cur_archive CURSOR FOR
        SELECT ledger_id FROM student_ledgers WHERE is_archived = FALSE;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_is_done = TRUE;

    OPEN cur_archive;
    START TRANSACTION;

    chunk_loop: LOOP
        FETCH cur_archive INTO v_ledger_id;
        IF v_is_done THEN
            LEAVE chunk_loop;
        END IF;

        UPDATE student_ledgers SET is_archived = TRUE WHERE ledger_id = v_ledger_id;
        SET v_count = v_count + 1;

        -- Periodic commit every 500 rows to release row locks and flush undo logs:
        IF v_count % 500 = 0 THEN
            COMMIT;
            START TRANSACTION; -- Start next fresh transaction chunk!
        END IF;
    END LOOP chunk_loop;

    COMMIT; -- Final commit for remaining rows
    CLOSE cur_archive;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Chunk 1 (Rows 1-500)", processingMode: "Cursor Loop Chunk 1", operationType: "500 Updates", executionMethod: "COMMIT + START TX", memoryImpact: "Minimal Lock Footprint", status: "Committed Chunk 1 ✅" },
        { id: "Chunk 2 (Rows 501-1000)", processingMode: "Cursor Loop Chunk 2", operationType: "500 Updates", executionMethod: "COMMIT + START TX", memoryImpact: "Minimal Lock Footprint", status: "Committed Chunk 2 ✅" },
      ],
      explanation:
        "Updating 500,000 rows in one monolithic transaction holds locks and bloats the InnoDB undo log. Periodic batch commits inside a cursor loop keep transactions small and fast.",
    },
    set_based_vs_cursor_comparison: {
      title: "4. Paradigm Comparison: Set-Based SQL vs Cursor Performance",
      badge: "Set-Based vs Cursor",
      badgeColor: "rose",
      sqlQuery: `-- ❌ SLOW RBAR ANTI-PATTERN (Cursor Loop for simple update):
-- Processes 10,000 rows in 8.5 seconds (10,000 interpreter loops & roundtrips)
-- OPEN cur; LOOP FETCH -> UPDATE students SET fee = fee * 1.05 WHERE id = v_id; END LOOP; CLOSE cur;

-- ✅ FAST SET-BASED SQL ALTERNATIVE (Single relational query):
-- Processes 10,000 rows in 0.02 seconds (400x faster! Direct storage engine execution):
UPDATE students 
SET tuition_fee = tuition_fee * 1.05 
WHERE department_id = 1;`,
      resultRows: [
        { id: "Set-Based UPDATE", processingMode: "Single SQL Statement", operationType: "Relational Set Operation", executionMethod: "Direct Engine Execution", memoryImpact: "Optimal (Zero VM overhead)", status: "⚡ 0.02s (400x Faster)" },
        { id: "Cursor Loop (RBAR)", processingMode: "10,000 Iterations", operationType: "Procedural Row-by-Row", executionMethod: "Virtual Machine Loop", memoryImpact: "High CPU Context Switches", status: "🐢 8.50s (Slow Anti-Pattern)" },
      ],
      explanation:
        "Never use cursors for simple data updates! A single set-based `UPDATE` query leverages indexes and the storage engine directly, running up to 400x faster than a procedural cursor loop.",
    },
  };

  const navItems = [
    { id: "cursor-concept", label: "1. What is a Database Cursor?" },
    { id: "three-properties", label: "2. Three Cursor Properties" },
    { id: "svg-diagrams", label: "3. Paradigm & Properties SVGs" },
    { id: "interactive-sandbox", label: "4. Live Cursor Workbench" },
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
            <span>Topic 7 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Procedural Cursors
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Introduction to Database Cursors
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand when and why row-by-row procedural processing is required in relational databases. Learn the core properties of MySQL cursors (Read-Only, Non-Scrollable, Asensitive), valid architectural use cases (dynamic DDL, chunked batching), and how to avoid the RBAR anti-pattern.
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
        {/* SECTION 1: What is a Cursor? */}
        <section id="cursor-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Database Cursor?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Bridging the gap between set-based declarative SQL and row-by-row procedural iteration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>⚡</span> Set-Based SQL (Default &amp; Fastest)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Relational databases are designed to manipulate entire collections of rows simultaneously using set theory and relational algebra. Set-based queries are optimized, parallelized, and index-accelerated.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Cursor-Based Iteration (Procedural Pointer)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A cursor provides a temporary pointer to traverse query results sequentially one row at a time. It is necessary when executing dynamic DDL, chunking massive batch transactions, or performing state-dependent evaluations.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Three Properties */}
        <section id="three-properties" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Three Core Properties of MySQL Cursors
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental architectural constraints governing MySQL cursors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase">1. Read-Only</div>
              <h3 className="text-sm font-bold text-white">No In-Place Updates</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You cannot update or delete table records directly through the cursor pointer (no `WHERE CURRENT OF cursor`).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">2. Non-Scrollable</div>
              <h3 className="text-sm font-bold text-white">Forward-Only Traversal</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rows can only be fetched sequentially from first to last; you cannot move backwards or jump to arbitrary row indices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">3. Asensitive</div>
              <h3 className="text-sm font-bold text-white">Temporary Snapshot</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The server may create an internal temporary table; concurrent table modifications during iteration may not be visible.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Set-Based vs Cursor Processing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing relational set transformation with row-by-row procedural pointer traversal.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Paradigm Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Set-Based Relational Processing vs Cursor Row Iteration
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Set-Based */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">SET-BASED PROCESSING (Single Op)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">UPDATE students SET fee = fee * 1.05; (All Rows at Once)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ 400x Faster · Direct Storage Engine Execution</text>
                  </g>

                  {/* Right: Cursor-Based */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">CURSOR-BASED ITERATION (Row-by-Row)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">FETCH Row 1 → Process → FETCH Row 2 → Process ...</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">🔄 Procedural Loop · Use Only for Dynamic DDL / Chunking</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Cursor Properties */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The 3 Immutable Properties of MySQL Cursors
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Property 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">1. READ-ONLY</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="150" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">No Direct Mutations</text>
                    <text x="150" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Must use independent UPDATE</text>
                  </g>

                  {/* Property 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. NON-SCROLLABLE</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="425" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Forward-Only Pointer</text>
                    <text x="425" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Cannot jump or reverse</text>
                  </g>

                  {/* Property 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="700" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">3. ASENSITIVE</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="700" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Temporary Materialization</text>
                    <text x="700" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Snapshot in internal temp table</text>
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
              4. Interactive Cursors Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic DDL maintenance cursors, procedural scholarship evaluations, batch chunked commits, and set-based vs cursor benchmarks live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(cursorScenarios).map(([key, item]) => {
              const isActive = selectedCursorScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCursorScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Architecture" : "○ Run Cursor Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{cursorScenarios[selectedCursorScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{cursorScenarios[selectedCursorScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Cursor Runtime Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Cursor Routine Script</span>
                <span className="text-emerald-400">Row-by-Row Procedural Control</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {cursorScenarios[selectedCursorScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record / Target ID</th>
                    <th className="py-3 px-4 text-white">Processing Mode</th>
                    <th className="py-3 px-4 text-emerald-400">Operation Type</th>
                    <th className="py-3 px-4 text-cyan-400">Execution Method</th>
                    <th className="py-3 px-4 text-amber-400">Memory &amp; Lock Impact</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {cursorScenarios[selectedCursorScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.processingMode}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.operationType}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.executionMethod}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.memoryImpact}</td>
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
              Real-world dynamic metadata maintenance and avoiding RBAR anti-patterns.
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
                  Refactoring a 45-Minute Batch Cursor to a 3-Second Set-Based UPDATE in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Exam Controller Office</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a legacy stored procedure: It used a cursor loop to recalculate GPA scores for 50,000 students, taking 45 minutes and locking tables. Refactoring the procedural cursor loop into a single set-based <code className="text-emerald-300 font-mono">UPDATE ... JOIN</code> query reduced execution time from 45 minutes to just 3.2 seconds!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Refactored 3.2-second Set-Based Solution:
UPDATE student_gpa g
JOIN (
    SELECT student_id, AVG(grade_point) AS calc_gpa 
    FROM exam_marks 
    GROUP BY student_id
) sub ON g.student_id = sub.student_id
SET g.cumulative_gpa = sub.calc_gpa;`}
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
              Avoid the RBAR anti-pattern and always handle cursor exhaustion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The RBAR Anti-Pattern
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using cursors to perform simple arithmetic or updates on table columns is a severe anti-pattern that forces the database interpreter into slow row-by-row context switches.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always write set-based <code className="text-emerald-400 font-mono">UPDATE</code> or <code className="text-emerald-400 font-mono">INSERT ... SELECT</code> statements!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Reserve Cursors for Procedural Tasks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use cursors only when executing dynamic DDL, dispatching external row-level notifications, or chunking massive multi-thousand row batch commits.
              </p>
              <div className="text-xs text-slate-400">
                Maintains optimal database engine throughput.
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
              Key takeaways for Introduction to Database Cursors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Cursors Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>MySQL cursors are <strong className="text-cyan-300">Read-Only</strong>, <strong className="text-cyan-300">Non-Scrollable</strong>, and <strong className="text-cyan-300">Asensitive</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always prefer set-based SQL queries for data updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use cursors for dynamic DDL, chunked batching, and procedural triggers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Declare cursors after variables/conditions, and before handlers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe memory materialization...”</span>
                  Opening a cursor on millions of rows can cause MySQL to materialize the entire result set onto disk in temporary tables! Keep cursor result sets compact!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about batch chunking...”</span>
                  For huge updates, committing every 500 rows inside a cursor loop prevents lock escalation and keeps InnoDB undo logs small!
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
              Comprehensive reference questions covering database cursor concepts, Set-Based vs Row-by-Row processing, Read-Only / Non-Scrollable / Asensitive properties, legitimate use cases (dynamic DDL, chunked batching), and avoiding the RBAR anti-pattern.
            </p>
          </div>

          <FAQTemplate
            title="Database Cursors Introduction FAQs"
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
            title="Introduction to Database Cursors: When and Why Row-by-Row Processing is Needed"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Database cursors are a specialized tool of last resort in relational database architecture. Always remember the Golden Rule of Database Performance: Write set-based SQL first! Only reach for cursors when you genuinely need procedural orchestration—such as iterating information_schema to execute dynamic DDL, chunking massive multi-thousand row batch commits, or coordinating complex external workflows."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
