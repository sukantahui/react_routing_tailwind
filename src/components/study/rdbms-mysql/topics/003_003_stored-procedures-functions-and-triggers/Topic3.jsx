import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Declaring Local Variables, Types, and Variable Assignment (SET, SELECT INTO)
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on local variables, DECLARE syntax, SET expressions, SELECT INTO queries, variable scoping, and cardinality error handling.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedVarScenario, setSelectedVarScenario] = useState("declare_and_set_math");

  const varScenarios = {
    declare_and_set_math: {
      title: "1. Local Variable Declaration & SET Arithmetic Math",
      badge: "DECLARE & SET Math",
      badgeColor: "emerald",
      sqlQuery: `-- Declaring strongly-typed local variables and computing fee breakdown:
DELIMITER //

CREATE PROCEDURE sp_calculate_student_invoice(
    IN p_student_id INT,
    OUT p_final_invoice_amount DECIMAL(10,2)
)
BEGIN
    -- 1. All DECLARE statements MUST be placed at the very top of BEGIN block:
    DECLARE v_base_tuition DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_gst_tax_amount DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_discount_amount DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_student_score DECIMAL(5,2);
    
    -- 2. Fetch student score with SELECT INTO:
    SELECT exam_score_pct, 20000.00 
    INTO v_student_score, v_base_tuition
    FROM students WHERE student_id = p_student_id;
    
    -- 3. Compute discount based on merit (SET math):
    IF v_student_score >= 90.00 THEN
        SET v_discount_amount = v_base_tuition * 0.20; -- 20% Scholarship
    ELSE
        SET v_discount_amount = 0.00;
    END IF;
    
    -- 4. Compute 18% GST and final invoice total:
    SET v_gst_tax_amount = (v_base_tuition - v_discount_amount) * 0.18;
    SET p_final_invoice_amount = (v_base_tuition - v_discount_amount) + v_gst_tax_amount;
END //

DELIMITER ;

CALL sp_calculate_student_invoice(101, @invoice_total);
SELECT @invoice_total AS calculated_student_invoice;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", base: "₹20,000.00", discount: "-₹4,000.00 (20% Merited)", gst: "+₹2,880.00 (18% GST)", total: "₹18,880.00 Final", status: "Invoice Calculated" },
      ],
      explanation:
        "All local variables are declared at the very top of `BEGIN`. `SET` evaluates mathematical expressions sequentially, calculating the base fee, 20% merit discount, 18% GST, and final net invoice amount.",
    },
    select_into_single_row: {
      title: "2. SELECT ... INTO: Populating Variables from Database Query",
      badge: "SELECT ... INTO",
      badgeColor: "cyan",
      sqlQuery: `-- Extracting multiple columns into local variables in a single query:
DELIMITER //

CREATE PROCEDURE sp_get_student_summary(
    IN p_student_id INT,
    OUT p_summary_text VARCHAR(200)
)
BEGIN
    DECLARE v_name VARCHAR(100);
    DECLARE v_dept_name VARCHAR(50);
    DECLARE v_gpa DECIMAL(5,2);
    
    -- SELECT INTO assigns query columns directly to variables:
    SELECT 
        CONCAT(s.first_name, ' ', s.last_name),
        d.dept_name,
        s.exam_score_pct
    INTO 
        v_name,
        v_dept_name,
        v_gpa
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
    WHERE s.student_id = p_student_id; -- Primary key guarantees exactly 1 row!
    
    SET p_summary_text = CONCAT(v_name, ' (', v_dept_name, ') - Final GPA: ', v_gpa, '%');
END //

DELIMITER ;

CALL sp_get_student_summary(103, @summary);
SELECT @summary;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", base: "IT Department", discount: "96.20% GPA", gst: "Single Row Query", total: "'Abhronila Saha (Information Tech) - Final GPA: 96.20%'", status: "Extracted" },
      ],
      explanation:
        "`SELECT col1, col2, col3 INTO var1, var2, var3` maps query columns to local variables in order. Filtering by a unique primary key guarantees that exactly one row is returned.",
    },
    cardinality_errors_1172_1329: {
      title: "3. SELECT ... INTO Cardinality Errors: Error 1172 vs Error 1329",
      badge: "Cardinality Exceptions",
      badgeColor: "rose",
      sqlQuery: `-- ⚠️ Error 1172: Multiple Rows Returned:
-- SELECT student_id INTO v_id FROM students WHERE dept_id = 1;
-- 🚨 ERROR 1172 (42000): Result consisted of more than one row!
-- FIX: Append LIMIT 1 or aggregate with MAX(student_id).

-- ⚠️ Error 1329: Zero Rows Returned:
-- SELECT student_id INTO v_id FROM students WHERE student_id = 99999;
-- 🚨 ERROR 1329 (02000): No data - zero rows fetched, selected, or processed!
-- FIX: Use DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_id = NULL;`,
      resultRows: [
        { id: "Multiple Rows (N > 1)", name: "SELECT without PK/LIMIT", base: "Returns 10 Rows", discount: "Scalar Variable Target", gst: "Cannot hold 10 values", total: "💥 Error 1172 (More than 1 row)", status: "Cardinality Violation" },
        { id: "Zero Rows (N = 0)", name: "SELECT with Missing ID", base: "Returns 0 Rows", discount: "Scalar Variable Target", gst: "No data to assign", total: "💥 Error 1329 (No data found)", status: "Zero-Row Exception" },
      ],
      explanation:
        "`SELECT ... INTO` strictly requires EXACTLY 1 row. If 0 rows return, MySQL throws Error 1329; if multiple rows return, MySQL throws Error 1172.",
    },
    block_scoping_nested_blocks: {
      title: "4. Block Scoping & Nested BEGIN ... END Variable Shadowing",
      badge: "Block Scoping",
      badgeColor: "amber",
      sqlQuery: `-- Demonstrating nested block variable scoping and shadowing:
DELIMITER //

CREATE PROCEDURE sp_demonstrate_variable_scope()
BEGIN
    DECLARE v_message VARCHAR(50) DEFAULT 'Outer Scope Value';
    
    -- Nested Inner Block:
    inner_block: BEGIN
        DECLARE v_message VARCHAR(50) DEFAULT 'Inner Shadowed Value';
        DECLARE v_inner_temp INT DEFAULT 42;
        
        -- Inside inner block, v_message evaluates to 'Inner Shadowed Value':
        SELECT v_message AS inner_scope_message, v_inner_temp AS inner_only_var;
    END inner_block;
    
    -- Back in outer block, v_message is restored to 'Outer Scope Value':
    -- (v_inner_temp is no longer accessible here!)
    SELECT v_message AS outer_scope_message;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Inner Block", name: "inner_block", base: "Shadows v_message", discount: "Inner: 'Inner Shadowed Value'", gst: "v_inner_temp = 42", total: "Accessible Inside Sub-Block Only", status: "Inner Scope" },
        { id: "Outer Block", name: "outer_block", base: "Restores v_message", discount: "Outer: 'Outer Scope Value'", gst: "v_inner_temp destroyed", total: "Accessible Globally in Routine", status: "Outer Scope" },
      ],
      explanation:
        "Local variables are strictly scoped to the enclosing `BEGIN ... END` block. Inner blocks can declare their own variables that shadow outer variables without affecting the outer scope.",
    },
  };

  const navItems = [
    { id: "var-scopes", label: "1. Three Variable Scopes" },
    { id: "assignment-rules", label: "2. SET vs SELECT INTO" },
    { id: "svg-diagrams", label: "3. Scopes & Cardinality SVGs" },
    { id: "interactive-sandbox", label: "4. Live Variables Workbench" },
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
            <span>Topic 3 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              State &amp; Storage
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Local Variables, Types &amp; Variable Assignment
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master state management inside stored procedures. Understand <code className="text-cyan-300 font-mono">DECLARE</code> syntax rules, <code className="text-cyan-300 font-mono">SET</code> expressions, database query assignment with <code className="text-cyan-300 font-mono">SELECT ... INTO</code>, and cardinality error handling.
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
        {/* SECTION 1: Scopes */}
        <section id="var-scopes" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Variable Scopes in MySQL
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing block-scoped local variables with session variables and system configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📦</span> 1. Local Variables (v_var)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Declared with `DECLARE` inside `BEGIN ... END`. Strongly typed, stack-allocated, destroyed on block exit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🌐</span> 2. User Session Variables (@var)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Loosely typed, connection-scoped. Persist across multiple queries throughout the active client session.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⚙️</span> 3. Global Variables (@@var)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engine-wide system settings (e.g. `@@autocommit`, `@@sql_mode`, `@@time_zone`).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SET vs SELECT INTO */}
        <section id="assignment-rules" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Variable Assignment: SET vs SELECT ... INTO
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing direct scalar math evaluation with table data binding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Direct Assignment (SET)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                SET v_final_fee = (v_base_fee * 1.18) - v_discount;
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates expressions, arithmetic calculations, and built-in functions to assign values to local variables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Table Data Binding (SELECT ... INTO)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                SELECT score, dept_id INTO v_score, v_dept FROM students WHERE id = 101;
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigns database query results directly to local variables. Query MUST return EXACTLY ONE row.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Scopes &amp; SELECT INTO Cardinality
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing variable scopes with the exact 1-row cardinality mandate.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Variable Scopes */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Variable Scopes in MySQL Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Local Scope */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Local Variables (v_var)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DECLARE v_fee INT DEFAULT 0</text>
                    <text x="145" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Scoped to BEGIN ... END Block</text>
                  </g>

                  {/* Session Scope */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">User Session Variables (@var)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SET @total_revenue = 50000</text>
                    <text x="425" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Persists Across Entire Connection</text>
                  </g>

                  {/* Global Scope */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">System Variables (@@var)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1c1917" />
                    <text x="705" y="88" fill="#fde68a" fontSize="8 font-mono" textAnchor="middle">SELECT @@autocommit</text>
                    <text x="705" y="102" fill="#f59e0b" fontSize="7 font-bold" textAnchor="middle">Database Server Engine Config</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Cardinality Rule */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> SELECT ... INTO Cardinality Rule (Exact 1 Row Required)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Exact 1 Row */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="150" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Exact 1 Row Returned ✅</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="150" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">WHERE student_id = 101</text>
                    <text x="150" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Assigned to Local Variables Cleanly</text>
                  </g>

                  {/* 0 Rows */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">0 Rows Returned (N = 0) ❌</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="425" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">WHERE id = 9999 (Missing!)</text>
                    <text x="425" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Throws Error 1329 (No Data)</text>
                  </g>

                  {/* Multiple Rows */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="700" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Multiple Rows (N &gt; 1) ❌</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="700" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">WHERE dept_id = 1 (10 Rows!)</text>
                    <text x="700" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Throws Error 1172 (Multiple Rows)</text>
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
              4. Interactive Local Variables Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test DECLARE &amp; SET math, SELECT INTO single-row queries, cardinality error diagnosis, and block scoping live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(varScenarios).map(([key, item]) => {
              const isActive = selectedVarScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedVarScenario(key)}
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
                    {isActive ? "● Active State" : "○ Run Variable Scenario"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{varScenarios[selectedVarScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{varScenarios[selectedVarScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Variable State Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Procedural State Script</span>
                <span className="text-emerald-400">Memory Stack Allocation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {varScenarios[selectedVarScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Variable / Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Scope Context</th>
                    <th className="py-3 px-4 text-emerald-400">Base / Query Condition</th>
                    <th className="py-3 px-4 text-cyan-400">Discount / GPA Target</th>
                    <th className="py-3 px-4 text-indigo-400">GST / Storage Note</th>
                    <th className="py-3 px-4 text-amber-400">Assigned Output Total</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {varScenarios[selectedVarScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.base}</td>
                      <td className="py-3 px-4 text-slate-300">{row.discount}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.gst}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.total}</td>
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
              Real-world invoice staging and Error 1172 bug prevention.
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
                  Refactoring Financial Ledger Staging in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a fee checkout procedure: The legacy procedure was writing temporary state directly to user session variables (`@temp_fee`), causing state pollution when multiple concurrent transactions executed. Declaring strongly-typed local variables (`DECLARE v_base_fee DECIMAL`) at the top of the block fully isolated intermediate calculations within each connection thread!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Thread-Safe Local Variable Staging:
DELIMITER //
CREATE PROCEDURE sp_stage_fee_ledger(IN p_student_id INT)
BEGIN
    DECLARE v_tuition DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_gst DECIMAL(10,2) DEFAULT 0.00;
    
    SELECT fee INTO v_tuition FROM courses WHERE student_id = p_student_id;
    SET v_gst = v_tuition * 0.18;
    INSERT INTO fee_ledger (student_id, base, gst) VALUES (p_student_id, v_tuition, v_gst);
END //
DELIMITER ;`}
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
              Avoid DECLARE placement syntax errors and multi-row SELECT INTO crashes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> DECLARE After Executable Code (Error 1064)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Placing a `DECLARE` statement after a `SET` or `IF` statement throws Error 1064 because MySQL requires all declarations at the top of the block.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always group all <code className="text-emerald-400 font-mono">DECLARE</code> statements at the very top of `BEGIN`!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Filter `SELECT ... INTO` with PK or LIMIT 1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                To prevent fatal Error 1172 crashes, always ensure `SELECT ... INTO` filters by unique primary key, uses aggregate functions, or appends `LIMIT 1`.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees exact scalar cardinality.
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
              Key takeaways for Local Variables &amp; Assignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Local Variables Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Place all <code className="text-cyan-300 font-mono">DECLARE</code> statements at the very top of `BEGIN`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Prefix local variables with <code className="text-cyan-300 font-mono">v_</code> (e.g. `v_fee`, `v_score`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SET</code> for scalar arithmetic expressions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Ensure <code className="text-cyan-300 font-mono">SELECT ... INTO</code> returns exactly 1 row to prevent Error 1172/1329.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe local variables in LIMIT...”</span>
                  In MySQL 8.0, local variables can be passed directly into `LIMIT v_offset, v_row_count` for dynamic server-side pagination!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about NOT FOUND handlers...”</span>
                  Add `DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_exists = FALSE;` to handle zero-row `SELECT ... INTO` gracefully without crashing!
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
              Comprehensive reference questions covering local variables, DECLARE syntax, SET expressions, SELECT INTO queries, and cardinality error diagnosis.
            </p>
          </div>

          <FAQTemplate
            title="Local Variables &amp; Assignment FAQs"
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
            title="Declaring Local Variables, Types, and Variable Assignment (SET, SELECT INTO)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Managing state inside stored procedures requires a solid understanding of variable scoping and assignment rules. Always remember the DECLARE Placement Mandate: all DECLARE statements must be placed at the very top of your BEGIN block before any SET or SELECT code. When using SELECT ... INTO, always ensure your query returns exactly one row by filtering on primary keys or using LIMIT 1 to prevent fatal Error 1172 and Error 1329 exceptions!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
