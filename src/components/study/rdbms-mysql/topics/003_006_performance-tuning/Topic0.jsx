import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – MySQL Query Execution Lifecycle: Parser, Preprocessor, Optimizer, Storage Engine
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL's internal query execution lifecycle: Client Connection, Lexical Parser, Semantic Preprocessor, Cost-Based Optimizer (CBO), and Storage Engine Handler API.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedLifecycleScenario, setSelectedLifecycleScenario] = useState("mamata_attendance_lifecycle");

  const lifecycleScenarios = {
    mamata_attendance_lifecycle: {
      title: "1. End-to-End Query Lifecycle: Mamata's Attendance Query",
      badge: "6-Stage Lifecycle Trace",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ THE 6-STAGE JOURNEY OF A QUERY:
SELECT student_id, student_name, attendance_status 
FROM student_attendance 
WHERE student_id = 101 AND date = '2026-08-25';

-- 🔍 Execution Lifecycle Trace:
-- 1. Client Connection: Authenticated via TCP/IP; Thread 42 assigned.
-- 2. Lexical Parser: Tokenized [SELECT, student_id, FROM, ...]; Valid grammar tree built.
-- 3. Preprocessor: Verified table 'student_attendance' exists; resolved columns; privileges OK.
-- 4. Optimizer: Evaluated plans → Selected 'idx_student_date' (Cost: 1.2 vs Table Scan: 1450.0).
-- 5. Execution Engine: Sent command to Storage Engine via Handler API.
-- 6. Storage Engine (InnoDB): ha_innodb::index_read() → Fetched 1 row from Buffer Pool → Streamed to Client!`,
      resultRows: [
        { stage: "1. Connection Pool", subsystem: "Network Layer", action: "TCP Handshake & Auth", outputState: "Thread Allocated (ID 42)", latency: "0.05ms", status: "Connected ✅" },
        { stage: "2. Lexical Parser", subsystem: "SQL Parser", action: "Tokenization & Grammar Tree", outputState: "Abstract Syntax Tree (AST)", latency: "0.02ms", status: "Parsed Validly ✅" },
        { stage: "3. Preprocessor", subsystem: "Semantic Analyzer", action: "Metadata & Privilege Checks", outputState: "Resolved Table/Column Objects", latency: "0.03ms", status: "Semantic OK ✅" },
        { stage: "4. Cost Optimizer", subsystem: "Cost-Based Optimizer", action: "Calculates Plan Costs", outputState: "Execution Plan: idx_student_date (Cost: 1.2)", latency: "0.15ms", status: "Plan Chosen ⚡" },
        { stage: "5. Engine Executor", subsystem: "Execution Engine", action: "Orchestrates Plan Steps", outputState: "Calls ha_innodb::index_read()", latency: "0.01ms", status: "Executing" },
        { stage: "6. Storage Engine", subsystem: "InnoDB Handler API", action: "Buffer Pool Page Read", outputState: "1 Row Fetched → Transmitted", latency: "0.08ms", status: "Completed ✅" },
      ],
      explanation:
        "Every SQL statement traverses 6 distinct architectural stages before returning results. The Cost-Based Optimizer chooses the lowest cost execution path, and the Storage Engine Handler API retrieves data pages from the in-memory Buffer Pool.",
    },
    cbo_cost_comparison: {
      title: "2. Cost-Based Optimizer (CBO): Index Lookup vs Table Scan Evaluation",
      badge: "Cost Calculation Model",
      badgeColor: "cyan",
      sqlQuery: `-- 🧮 CBO PLAN EVALUATION FOR:
SELECT * FROM student_records WHERE enrollment_year = 2026;

-- Total Rows in Table: 100,000 rows (2,000 data pages)
-- Filter Matches: 150 rows (Selective!)

-- 🔍 Optimizer Plan Evaluation:
-- Candidate Plan A (Full Table Scan):
-- I/O Cost: 2,000 pages * 1.0 = 2,000.0
-- CPU Cost: 100,000 rows * 0.1 = 10,000.0
-- Total Plan A Cost: 12,000.0 ❌

-- Candidate Plan B (Index Range Scan on idx_year):
-- I/O Cost: 3 index pages + 150 clustered lookups = 153.0
-- CPU Cost: 150 rows * 0.1 = 15.0
-- Total Plan B Cost: 168.0 ✅

-- ⚡ Optimizer chooses Plan B! 71x Cheaper execution!`,
      resultRows: [
        { stage: "Plan A (Table Scan)", subsystem: "Sequential Scan", action: "Scan 2,000 Data Pages", outputState: "Cost = 12,000.0", latency: "Heavy Disk I/O", status: "Rejected ❌" },
        { stage: "Plan B (Index Scan)", subsystem: "B+Tree Lookup", action: "Traverse idx_year + PK Fetch", outputState: "Cost = 168.0", latency: "3 Page Reads", status: "Selected ✅" },
      ],
      explanation:
        "The Cost-Based Optimizer (CBO) models both Disk I/O cost (page reads) and CPU cost (row comparisons). It compares all candidate execution paths and selects the plan with the minimum mathematical cost.",
    },
    parser_vs_preprocessor_errors: {
      title: "3. Error Segregation: Parser (Syntax) vs Preprocessor (Semantic)",
      badge: "Error Diagnosis",
      badgeColor: "rose",
      sqlQuery: `-- 💥 PARSER SYNTAX ERROR (Stage 2 Failure):
SELECT * FORM student_records; -- Typo in 'FROM' keyword!
-- 🚨 Fails in Parser! Parse tree cannot be built!
-- ERROR 1064 (42000): You have an error in your SQL syntax near 'FORM student_records'

-- 💥 PREPROCESSOR SEMANTIC ERROR (Stage 3 Failure):
SELECT * FROM non_existent_students; -- Valid SQL syntax, but table does not exist!
-- 🚨 Passes Parser → Fails in Preprocessor!
-- ERROR 1146 (42S02): Table 'school_db.non_existent_students' doesn't exist`,
      resultRows: [
        { stage: "Lexical Parser", subsystem: "Grammar Engine", action: "Checks SQL Keywords", outputState: "Syntax Typo ('FORM')", latency: "0.01ms", status: "💥 ERROR 1064 (Syntax)" },
        { stage: "Preprocessor", subsystem: "Data Dictionary", action: "Verifies Table Existence", outputState: "Table Missing", latency: "0.02ms", status: "💥 ERROR 1146 (Semantic)" },
      ],
      explanation:
        "The Parser catches misspelled keywords and invalid grammar (Error 1064). The Preprocessor catches semantic errors like non-existent tables (Error 1146) or missing column privileges (Error 1142).",
    },
    prepared_statement_bypass: {
      title: "4. Prepared Statements: Bypassing Parser & Preprocessor Overhead",
      badge: "Prepared Statements",
      badgeColor: "amber",
      sqlQuery: `-- ⚡ PREPARED STATEMENT LIFECYCLE OPTIMIZATION:
-- Step 1: PREPARE (Executes Parser + Preprocessor ONCE):
PREPARE stmt_student FROM 
  'SELECT balance FROM student_ledgers WHERE student_id = ?';
-- 🔒 AST & Metadata validated and cached in session!

-- Step 2: EXECUTE 1 (Skips Parser & Preprocessor completely!):
SET @id1 = 101;
EXECUTE stmt_student USING @id1; -- ⚡ 300% Faster execution!

-- Step 3: EXECUTE 2 (Zero parsing overhead!):
SET @id2 = 102;
EXECUTE stmt_student USING @id2; -- ⚡ Instant Optimizer/Executor dispatch!

DEALLOCATE PREPARE stmt_student;`,
      resultRows: [
        { stage: "PREPARE Step", subsystem: "Parser + Preprocessor", action: "Parse & Semantic Check", outputState: "Cached Statement Structure", latency: "0.08ms (One-time)", status: "Prepared & Stored ✅" },
        { stage: "EXECUTE 1 (ID 101)", subsystem: "Optimizer + Handler", action: "Bypasses Stages 2 & 3", outputState: "Direct Handler Lookup", latency: "0.03ms ⚡", status: "Instant Exec ✅" },
        { stage: "EXECUTE 2 (ID 102)", subsystem: "Optimizer + Handler", action: "Bypasses Stages 2 & 3", outputState: "Direct Handler Lookup", latency: "0.03ms ⚡", status: "Instant Exec ✅" },
      ],
      explanation:
        "Prepared Statements execute the Parser and Preprocessor stages only once during `PREPARE`. Subsequent `EXECUTE` commands skip directly to execution, drastically increasing throughput in high-frequency applications.",
    },
  };

  const navItems = [
    { id: "lifecycle-overview", label: "1. The 6-Stage Lifecycle" },
    { id: "cbo-cost-model", label: "2. Cost-Based Optimizer (CBO)" },
    { id: "svg-diagrams", label: "3. Architecture & CBO SVGs" },
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
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 0 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Query Lifecycle
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            MySQL Query Execution Lifecycle
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand the complete internal journey of a SQL query through MySQL Server: Client Connection, Lexical Parser, Semantic Preprocessor, Cost-Based Optimizer (CBO), and the Storage Engine Handler API.
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
        {/* SECTION 1: The 6-Stage Lifecycle */}
        <section id="lifecycle-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 6-Stage Query Execution Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The internal pipeline transforming raw SQL text into returned result sets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Stages 1 &amp; 2</span>
              <h3 className="font-bold text-white">Connection &amp; Parser</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Client authentication against <code className="text-cyan-300 font-mono">mysql.user</code>, assigned cached thread. Lexical parser tokenizes SQL text and constructs Abstract Syntax Tree (AST).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-indigo-400 font-bold text-xs uppercase">Stages 3 &amp; 4</span>
              <h3 className="font-bold text-white">Preprocessor &amp; Optimizer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preprocessor resolves tables/columns against data dictionary and verifies permissions. Cost-Based Optimizer (CBO) calculates I/O and CPU costs to choose the cheapest plan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Stages 5 &amp; 6</span>
              <h3 className="font-bold text-white">Executor &amp; Storage Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Execution engine invokes Storage Engine Handler API (<code className="text-emerald-300 font-mono">ha_innodb</code>), reads pages from the Buffer Pool or disk, applies filters, and streams rows.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cost-Based Optimizer (CBO) */}
        <section id="cbo-cost-model" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Cost-Based Optimizer (CBO) Mathematical Model
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL calculates mathematical execution costs to choose between indexes and table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">Cost Model Formula</h3>
              <div className="p-3 bg-slate-950 rounded-lg text-cyan-300 font-mono text-xs border border-slate-800">
                Total Cost = Disk I/O Cost + CPU Evaluation Cost
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Disk I/O Cost models reading 16KB pages from disk / buffer pool (configured in <code className="text-cyan-300 font-mono">mysql.engine_cost</code>). CPU Cost models row comparisons, evaluations, and sorting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Why Query Cache was Removed</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                The MySQL Query Cache was completely removed in MySQL 8.0 because single table modifications acquired global mutex locks, invalidating all cached queries for that table and crippling multi-core scalability.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Query Execution Pipeline &amp; CBO Decision Tree
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the server layer vs storage engine layer and optimizer cost evaluations.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 6-Stage MySQL Server Execution Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Client */}
                  <g>
                    <rect x="20" y="30" width="115" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="77" y="55" fill="#67e8f9" fontSize="9" fontWeight="bold" textAnchor="middle">1. Client / TCP</text>
                    <rect x="28" y="70" width="99" height="40" rx="4" fill="#0f172a" />
                    <text x="77" y="88" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">Auth &amp; Thread</text>
                    <text x="77" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Thread Cache</text>
                  </g>

                  {/* Step 2: Parser */}
                  <g>
                    <rect x="150" y="30" width="115" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="207" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">2. Parser</text>
                    <rect x="158" y="70" width="99" height="40" rx="4" fill="#0f172a" />
                    <text x="207" y="88" fill="#818cf8" fontSize="7 font-mono" textAnchor="middle">Lex &amp; Syntax</text>
                    <text x="207" y="102" fill="#c7d2fe" fontSize="7 font-mono" textAnchor="middle">AST Tree</text>
                  </g>

                  {/* Step 3: Preprocessor */}
                  <g>
                    <rect x="280" y="30" width="125" height="100" rx="8" fill="#312e81" stroke="#a5b4fc" strokeWidth="1.5" />
                    <text x="342" y="55" fill="#e0e7ff" fontSize="9" fontWeight="bold" textAnchor="middle">3. Preprocessor</text>
                    <rect x="288" y="70" width="109" height="40" rx="4" fill="#0f172a" />
                    <text x="342" y="88" fill="#a5b4fc" fontSize="7 font-mono" textAnchor="middle">Semantic Check</text>
                    <text x="342" y="102" fill="#e0e7ff" fontSize="7 font-mono" textAnchor="middle">Privileges &amp; Dict</text>
                  </g>

                  {/* Step 4: CBO Optimizer */}
                  <g>
                    <rect x="420" y="30" width="130" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="485" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. Cost Optimizer</text>
                    <rect x="428" y="70" width="114" height="40" rx="4" fill="#022c22" />
                    <text x="485" y="88" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Evaluates Plans</text>
                    <text x="485" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Lowest Cost Plan</text>
                  </g>

                  {/* Step 5: Execution Engine */}
                  <g>
                    <rect x="565" y="30" width="120" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="625" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">5. Execution Engine</text>
                    <rect x="573" y="70" width="104" height="40" rx="4" fill="#1e293b" />
                    <text x="625" y="88" fill="#fbbf24" fontSize="7 font-mono" textAnchor="middle">Handler API Call</text>
                    <text x="625" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">ha_innodb</text>
                  </g>

                  {/* Step 6: InnoDB Storage */}
                  <g>
                    <rect x="700" y="30" width="130" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="765" y="55" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">6. InnoDB Engine</text>
                    <rect x="708" y="70" width="114" height="40" rx="4" fill="#0f172a" />
                    <text x="765" y="88" fill="#7dd3fc" fontSize="7 font-mono" textAnchor="middle">Buffer Pool / Disk</text>
                    <text x="765" y="102" fill="#38bdf8" fontSize="7 font-bold" textAnchor="middle">Returns Rows ⚡</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 135 80 L 150 80" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 265 80 L 280 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 405 80 L 420 80" stroke="#a5b4fc" strokeWidth="1.5" />
                  <path d="M 550 80 L 565 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 685 80 L 700 80" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: CBO Tree */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Cost-Based Optimizer (CBO) Plan Selection
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Query */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Query: WHERE year = 2026</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="140" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">100,000 Total Table Rows</text>
                    <text x="140" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">150 Matching Rows</text>
                  </g>

                  {/* Plan A */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Plan A: Full Table Scan</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="405" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">2,000 Pages + 100,000 Row Eval</text>
                    <text x="405" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Cost = 12,000.0 (Rejected ❌)</text>
                  </g>

                  {/* Plan B */}
                  <g>
                    <rect x="560" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="685" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Plan B: Index Range Scan</text>
                    <rect x="570" y="70" width="230" height="40" rx="4" fill="#022c22" />
                    <text x="685" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">3 Index Pages + 150 PK Fetches</text>
                    <text x="685" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Cost = 168.0 (Selected ✅)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Query Execution Lifecycle Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through Mamata's attendance query, CBO cost evaluations, parser vs preprocessor error diagnosis, and prepared statement optimizations live.
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
                    {isActive ? "● Active Lifecycle" : "○ Run Lifecycle Test"}
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
                MySQL Engine Lifecycle
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Execution Pipeline Trace</span>
                <span className="text-emerald-400">Stages 1 to 6</span>
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
                    <th className="py-3 px-4 text-cyan-400">Lifecycle Stage</th>
                    <th className="py-3 px-4 text-white">Subsystem</th>
                    <th className="py-3 px-4 text-emerald-400">Action Performed</th>
                    <th className="py-3 px-4 text-amber-400">Output State</th>
                    <th className="py-3 px-4 text-cyan-400">Latency</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lifecycleScenarios[selectedLifecycleScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.stage}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.subsystem}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.action}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.outputState}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.latency}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Connected") || row.status.includes("Validly") || row.status.includes("OK") || row.status.includes("Chosen") || row.status.includes("Completed") || row.status.includes("Selected") || row.status.includes("Prepared") || row.status.includes("Instant")
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
              Real-world resolution of stale statistics causing optimizer table scan regressions in Barrackpore.
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
                  Fixing Stale Index Statistics in Barrackpore Biometric Attendance System
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Biometric Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a sudden morning performance drop where student attendance queries took 4.2 seconds instead of 3 milliseconds: After bulk importing 50,000 new admission records over the weekend, InnoDB's cached index cardinality in <code className="text-cyan-300 font-mono">mysql.innodb_index_stats</code> was stale. The Cost-Based Optimizer miscalculated that the index was non-selective and chose a Full Table Scan! Running <code className="text-emerald-300 font-mono">ANALYZE TABLE student_attendance;</code> refreshed the statistical metadata, immediately restoring index lookups and cutting latency back to <strong>0.002 seconds</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- The Performance Tuning Fix:
ANALYZE TABLE student_attendance;

-- Verifying refreshed cardinality:
SHOW INDEX FROM student_attendance;`}
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
              Keep index statistics fresh and use Prepared Statements to eliminate redundant parsing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Stale Table Statistics Leading to Table Scans
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If InnoDB index statistics are outdated after large batch imports or deletes, the Optimizer may incorrectly calculate that a full table scan is cheaper than an index lookup!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Run <code className="text-emerald-400 font-mono">ANALYZE TABLE</code> after major batch data modifications!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Leverage Prepared Statements in High-Frequency APIs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use parameterized Prepared Statements to parse and validate SQL queries once, bypassing the Lexical Parser and Preprocessor stages on repeated executions.
              </p>
              <div className="text-xs text-slate-400">
                Delivers up to 300% throughput gains for high-frequency microservice queries.
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
              Key takeaways for the MySQL Query Execution Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Lifecycle Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Parser</strong> checks syntax (<code className="text-rose-300 font-mono">Error 1064</code>); <strong className="text-cyan-300">Preprocessor</strong> checks semantics (<code className="text-rose-300 font-mono">Error 1146</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">Query Cache</strong> is removed in MySQL 8.0 to eliminate mutex bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">CBO Optimizer</strong> calculates I/O + CPU costs to choose the cheapest plan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-cyan-300">Storage Engine</strong> fetches 16KB pages from the in-memory Buffer Pool.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the Optimizer Trace...”</span>
                  Enable `SET optimizer_trace = 'enabled=on';` to inspect the exact mathematical formulas and candidate plans evaluated by the CBO!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Buffer Pool hits...”</span>
                  The Execution Engine asks InnoDB for rows; if the 16KB page is already in the Buffer Pool, the read is completed in nanoseconds with zero disk I/O!
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
              Comprehensive reference questions covering MySQL's internal query execution lifecycle: Client Connection, Lexical Parser, Semantic Preprocessor, Cost-Based Optimizer (CBO), and Storage Engine Handler API.
            </p>
          </div>

          <FAQTemplate
            title="Query Lifecycle FAQs"
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
            title="MySQL Query Execution Lifecycle: Parser, Preprocessor, Optimizer, Storage Engine"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Understanding the Query Execution Lifecycle is the gateway to master-level performance tuning. Remember: the SQL Server layer and the Storage Engine layer are cleanly separated. The Cost-Based Optimizer (CBO) is mathematical—it relies entirely on statistical metadata to calculate plan costs. If your table statistics are stale, the optimizer will make wrong choices. Keep your statistics fresh with ANALYZE TABLE, use Prepared Statements, and let the InnoDB Buffer Pool do the heavy lifting!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
