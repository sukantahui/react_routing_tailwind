import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Control Flow Statements: CASE ... WHEN ... THEN ... ELSE ... END CASE
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on procedural CASE statements, Simple CASE, Searched CASE, Error 1339 diagnosis, and statement vs expression differences.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedCaseScenario, setSelectedCaseScenario] = useState("simple_case_campus_routing");

  const caseScenarios = {
    simple_case_campus_routing: {
      title: "1. Simple CASE: Multi-Campus Admission Routing (Exact Match)",
      badge: "Simple CASE (Equality)",
      badgeColor: "emerald",
      sqlQuery: `-- Simple CASE: Matches single variable against discrete campus codes:
DELIMITER //

CREATE PROCEDURE sp_route_campus_admission(
    IN p_campus_code VARCHAR(10),
    OUT p_regional_hub VARCHAR(100),
    OUT p_admin_officer VARCHAR(50),
    OUT p_contact_phone VARCHAR(20)
)
BEGIN
    CASE p_campus_code
        WHEN 'BKP' THEN
            SET p_regional_hub = 'Barrackpore Central Academy Campus';
            SET p_admin_officer = 'Sukanta Hui';
            SET p_contact_phone = '+91 98300 11223';
        WHEN 'KOL' THEN
            SET p_regional_hub = 'Kolkata Salt Lake Sector V Tech Hub';
            SET p_admin_officer = 'Susmita Sen';
            SET p_contact_phone = '+91 98300 44556';
        WHEN 'ICH' THEN
            SET p_regional_hub = 'Ichapur Skill Development Center';
            SET p_admin_officer = 'Abhronila Saha';
            SET p_contact_phone = '+91 98300 77889';
        ELSE
            -- Mandatory fallback prevents fatal Error 1339:
            SET p_regional_hub = 'Online Global Learning Portal';
            SET p_admin_officer = 'Debangshu Roy';
            SET p_contact_phone = '+91 1800 123 456';
    END CASE;
END //

DELIMITER ;

CALL sp_route_campus_admission('BKP', @hub, @officer, @phone);
SELECT @hub AS campus_hub, @officer AS officer_in_charge, @phone AS contact;`,
      resultRows: [
        { id: "BKP", code: "'BKP'", mode: "Simple CASE Match", hub: "Barrackpore Central Academy Campus", officer: "Sukanta Hui", phone: "+91 98300 11223", status: "Routed to Hub" },
        { id: "KOL", code: "'KOL'", mode: "Simple CASE Match", hub: "Kolkata Salt Lake Sector V Tech Hub", officer: "Susmita Sen", phone: "+91 98300 44556", status: "Routed to Hub" },
        { id: "ICH", code: "'ICH'", mode: "Simple CASE Match", hub: "Ichapur Skill Development Center", officer: "Abhronila Saha", phone: "+91 98300 77889", status: "Routed to Hub" },
        { id: "XYZ", code: "'XYZ' (Unknown)", mode: "Fallback ELSE Branch", hub: "Online Global Learning Portal", officer: "Debangshu Roy", phone: "+91 1800 123 456", status: "Fallback Safe" },
      ],
      explanation:
        "Simple `CASE p_campus_code` matches discrete strings. The mandatory `ELSE` branch guarantees that unknown codes route safely to the Online Portal without crashing.",
    },
    searched_case_installment_fees: {
      title: "2. Searched CASE: Installment Fee & Surcharge Calculator",
      badge: "Searched CASE (Ranges)",
      badgeColor: "cyan",
      sqlQuery: `-- Searched CASE: Evaluates complex boolean ranges and payment policies:
DELIMITER //

CREATE PROCEDURE sp_calculate_installment_plan(
    IN p_base_tuition DECIMAL(10,2),
    IN p_installments INT,
    IN p_is_scholarship BOOLEAN,
    OUT p_total_payable DECIMAL(10,2),
    OUT p_surcharge_amount DECIMAL(10,2),
    OUT p_plan_description VARCHAR(100)
)
BEGIN
    CASE
        WHEN p_is_scholarship = TRUE AND p_installments &le; 2 THEN
            SET p_surcharge_amount = 0.00;
            SET p_plan_description = 'Scholarship Flexi-Plan (0% Surcharge)';
        WHEN p_installments = 1 THEN
            SET p_surcharge_amount = 0.00;
            SET p_plan_description = 'Full One-Time Payment (0% Surcharge)';
        WHEN p_installments BETWEEN 2 AND 3 THEN
            SET p_surcharge_amount = 500.00;
            SET p_plan_description = 'Quarterly 3-Split Plan (₹500 Processing Fee)';
        WHEN p_installments BETWEEN 4 AND 6 THEN
            SET p_surcharge_amount = 1200.00;
            SET p_plan_description = 'Monthly 6-Split Plan (₹1,200 Processing Fee)';
        ELSE
            SET p_surcharge_amount = 2500.00;
            SET p_plan_description = 'Extended 12-Month Plan (₹2,500 Processing Fee)';
    END CASE;
    
    SET p_total_payable = p_base_tuition + p_surcharge_amount;
END //

DELIMITER ;

CALL sp_calculate_installment_plan(20000.00, 3, FALSE, @total, @surcharge, @plan);
SELECT @total AS total_fee, @surcharge AS fee_surcharge, @plan AS chosen_plan;`,
      resultRows: [
        { id: "PLAN-1", code: "1 Installment", mode: "Searched CASE", hub: "Full One-Time Payment", officer: "₹0.00 Surcharge", phone: "Total: ₹20,000.00", status: "Zero Fee" },
        { id: "PLAN-3", code: "3 Installments", mode: "Searched CASE", hub: "Quarterly 3-Split Plan", officer: "₹500.00 Surcharge", phone: "Total: ₹20,500.00", status: "Standard Split" },
        { id: "PLAN-6", code: "6 Installments", mode: "Searched CASE", hub: "Monthly 6-Split Plan", officer: "₹1,200.00 Surcharge", phone: "Total: ₹21,200.00", status: "Extended Split" },
      ],
      explanation:
        "Searched `CASE WHEN cond THEN` evaluates multi-criteria range conditions, calculating customized installment processing fees and payment plan descriptions.",
    },
    error1339_diagnosis_fix: {
      title: "3. Error 1339: The Fatal 'Case Not Found' Exception & Fix",
      badge: "Error 1339 Exception",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN PROCEDURAL CASE (Omitting ELSE clause):
-- CASE p_code
--     WHEN 'A' THEN SET v_val = 1;
--     WHEN 'B' THEN SET v_val = 2;
-- END CASE;
-- 🚨 If p_code = 'C' -&gt; ERROR 1339 (20000): Case not found for CASE statement!

-- ✅ DEFENSIVE ARCHITECTURE FIX:
DELIMITER //
CREATE PROCEDURE sp_safe_case_evaluation(IN p_code VARCHAR(10), OUT p_result VARCHAR(50))
BEGIN
    CASE p_code
        WHEN 'ACTIVE' THEN SET p_result = 'Account Enabled';
        WHEN 'SUSPENDED' THEN SET p_result = 'Account Locked';
        ELSE 
            -- Safe fallback prevents Error 1339:
            SET p_result = 'Status Unknown / Unhandled';
    END CASE;
END //
DELIMITER ;`,
      resultRows: [
        { id: "Omitted ELSE (Missing Code)", code: "p_code = 'PENDING'", mode: "No Branch Matches", hub: "Unmatched Fallthrough", officer: "Crash at Runtime", phone: "💥 Error 1339 (Case Not Found)", status: "Fatal Exception" },
        { id: "With ELSE Fallback", code: "p_code = 'PENDING'", mode: "ELSE Branch Catches", hub: "Status Unknown / Unhandled", officer: "Graceful Recovery", phone: "✅ Success (Safe String)", status: "Handled Cleanly" },
      ],
      explanation:
        "In procedural SQL, omitting the `ELSE` branch when no `WHEN` condition matches causes MySQL to throw `Error 1339`. Always provide an `ELSE` clause for defensive exception prevention.",
    },
    procedural_case_vs_declarative_case: {
      title: "4. Procedural CASE Statement vs Declarative CASE Expression",
      badge: "Statement vs Expression",
      badgeColor: "amber",
      sqlQuery: `-- 1. Declarative CASE Expression (Used inside SELECT queries):
-- Terminates with END (no CASE). Returns a single scalar value.
SELECT 
    student_id,
    first_name,
    CASE 
        WHEN exam_score_pct &ge; 90 THEN 'Distinction'
        WHEN exam_score_pct >= 75 THEN 'First Class'
        ELSE 'Standard'
    END AS academic_division -- ✅ Ends with END
FROM students;

-- 2. Procedural CASE Statement (Used inside Stored Routines):
-- Terminates with END CASE; (with CASE). Executes procedural statement blocks.
-- CASE p_status
--     WHEN 'PAID' THEN UPDATE ledger SET status = 'CLOSED';
--     ELSE UPDATE ledger SET status = 'OVERDUE';
-- END CASE; -- ✅ Ends with END CASE;`,
      resultRows: [
        { id: "Declarative CASE Expression", code: "SELECT ... END", mode: "Scalar Return", hub: "Inside SELECT / WHERE / ORDER BY", officer: "Evaluates single value", phone: "Terminates with END", status: "Query Context" },
        { id: "Procedural CASE Statement", code: "CASE ... END CASE;", mode: "Control Flow Block", hub: "Inside Stored Routines", officer: "Executes SQL statements", phone: "Terminates with END CASE;", status: "Routine Context" },
      ],
      explanation:
        "Declarative `CASE` evaluates a scalar expression in `SELECT` and terminates with `END`; procedural `CASE` controls multi-statement execution in stored routines and terminates with `END CASE;`.",
    },
  };

  const navItems = [
    { id: "case-concept", label: "1. Simple vs Searched CASE" },
    { id: "error-1339", label: "2. Error 1339 Diagnosis" },
    { id: "svg-diagrams", label: "3. Syntax & Architecture SVGs" },
    { id: "interactive-sandbox", label: "4. Live CASE Workbench" },
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
            <span>Topic 5 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Multi-Branch Dispatching
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Control Flow Statements: CASE ... WHEN ... THEN ... ELSE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master procedural branching with Simple and Searched <code className="text-cyan-300 font-mono">CASE ... END CASE;</code> statements. Prevent fatal <code className="text-rose-400 font-mono">Error 1339</code> crashes and understand statement vs expression differences.
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
        {/* SECTION 1: Concept */}
        <section id="case-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Simple CASE vs Searched CASE
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing discrete variable matching with complex boolean predicate evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Simple CASE (Exact Match)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
{`CASE var_name
    WHEN 'BKP' THEN SET hub = 'Barrackpore';
    WHEN 'KOL' THEN SET hub = 'Kolkata';
    ELSE SET hub = 'Online Portal';
END CASE;`}
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates a single variable for exact equality against discrete constant values.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Searched CASE (Boolean Ranges)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
{`CASE 
    WHEN score &ge; 90 AND is_topper = 1 THEN SET disc = 30;
    WHEN score >= 75 THEN SET disc = 15;
    ELSE SET disc = 0;
END CASE;`}
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates independent boolean expressions, numeric inequality ranges, and logical operators.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Error 1339 */}
        <section id="error-1339" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Fatal "Case Not Found" Error 1339
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why procedural CASE statements require a mandatory ELSE fallback.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>🚨</span> Procedural CASE Strict Cardinality Exception
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike declarative <code className="text-cyan-300 font-mono">CASE</code> expressions in queries (which silently evaluate to <code className="text-cyan-300 font-mono">NULL</code> when no branch matches), a procedural <code className="text-rose-300 font-mono">CASE ... END CASE;</code> statement throws <code className="text-rose-400 font-bold font-mono">Error 1339 (20000): Case not found for CASE statement</code> if no condition matches and <code className="text-rose-300 font-mono">ELSE</code> is omitted!
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
              ✓ Defensive Rule: ALWAYS include an ELSE branch in procedural CASE statements!
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: CASE Modes &amp; Error 1339 Prevention
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing Simple vs Searched CASE and Error 1339 exception avoidance.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: CASE Architectures */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Simple CASE (Jump Table) vs Searched CASE (Predicate Chain)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Simple CASE */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Simple CASE (Exact Variable Match)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">CASE campus_code WHEN 'BKP' ... WHEN 'KOL' ...</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Evaluates target once → Direct constant matching</text>
                  </g>

                  {/* Searched CASE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Searched CASE (Independent Boolean Predicates)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">CASE WHEN score >= 90 ... WHEN installments <= 3 ...</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Evaluates expressions sequentially until first TRUE match</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Error 1339 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Error 1339: Omitted ELSE Crash vs Safe Fallback Execution
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Without ELSE */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Procedural CASE Without ELSE (Crash)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Input = 'UNKNOWN' (No WHEN branch matches!)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Throws Error 1339 (Case not found for CASE statement)</text>
                  </g>

                  {/* With ELSE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Procedural CASE With ELSE Fallback (Safe)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">ELSE SET p_hub = 'Online Portal'; END CASE;</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Safe Default Handled → Complete Fault Tolerance</text>
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
              4. Interactive CASE Statement Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Simple CASE campus routing, Searched CASE installment calculators, Error 1339 diagnosis, and statement vs expression comparisons live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(caseScenarios).map(([key, item]) => {
              const isActive = selectedCaseScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCaseScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run CASE Scenario"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{caseScenarios[selectedCaseScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{caseScenarios[selectedCaseScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                CASE Branching Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL CASE Procedural Script</span>
                <span className="text-emerald-400">END CASE; Statement Terminator</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {caseScenarios[selectedCaseScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Input Code / ID</th>
                    <th className="py-3 px-4 text-white">Target Match Value</th>
                    <th className="py-3 px-4 text-emerald-400">CASE Branch Mode</th>
                    <th className="py-3 px-4 text-cyan-400">Assigned Regional Hub / Description</th>
                    <th className="py-3 px-4 text-indigo-400">Officer / Surcharge</th>
                    <th className="py-3 px-4 text-amber-400">Contact / Output Total</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {caseScenarios[selectedCaseScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.code}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.mode}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.hub}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.officer}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans font-bold">{row.phone}</td>
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
              Real-world multi-campus admission routing and Error 1339 outage prevention.
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
                  Multi-Campus Admission Dispatching in Barrackpore, Kolkata &amp; Ichapur
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Admissions</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored a 40-line nested IF tree into a clean 10-line <code className="text-cyan-300 font-mono">Simple CASE</code> statement: When students register from different West Bengal centers, the procedure instantly dispatches the record to the appropriate regional academy hub officer (<code className="text-emerald-300 font-mono">BKP → Barrackpore</code>, <code className="text-emerald-300 font-mono">KOL → Kolkata</code>, <code className="text-emerald-300 font-mono">ICH → Ichapur</code>) with complete fault-tolerant fallback!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Clean Simple CASE Dispatch:
CASE p_campus
    WHEN 'BKP' THEN SET p_officer = 'Sukanta Hui';
    WHEN 'KOL' THEN SET p_officer = 'Susmita Sen';
    WHEN 'ICH' THEN SET p_officer = 'Abhronila Saha';
    ELSE SET p_officer = 'Debangshu Roy';
END CASE;`}
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
              Avoid omitted ELSE crashes and statement vs expression termination errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Omitted ELSE Branch (Error 1339)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting the `ELSE` branch in a procedural `CASE` statement causes the database to throw a fatal Error 1339 whenever an unexpected input value is passed.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always provide an <code className="text-emerald-400 font-mono">ELSE</code> fallback branch!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Terminate with `END CASE;` in Procedures
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Remember that procedural CASE statements end with <code className="text-emerald-400 font-mono">END CASE;</code>, whereas declarative CASE expressions inside <code className="text-cyan-300 font-mono">SELECT</code> end with <code className="text-cyan-300 font-mono">END</code> alone.
              </p>
              <div className="text-xs text-slate-400">
                Prevents block termination syntax errors.
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
              Key takeaways for Control Flow CASE Statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> CASE Statement Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Simple <code className="text-cyan-300 font-mono">CASE var WHEN val</code> for discrete constant matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use Searched <code className="text-cyan-300 font-mono">CASE WHEN condition</code> for complex ranges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always include an <code className="text-cyan-300 font-mono">ELSE</code> fallback to prevent Error 1339.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Terminate procedural statements with <code className="text-cyan-300 font-mono">END CASE;</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe NULL in Simple CASE...”</span>
                  Simple CASE uses exact equality (`var = val`), so `WHEN NULL` will never match. To check for NULL values, use Searched CASE with `WHEN var IS NULL THEN ...`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about code readability...”</span>
                  Use CASE statements instead of multiple nested IF-ELSE blocks to keep your procedural stored routines clean, flat, and easy to maintain!
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
              Comprehensive reference questions covering Simple CASE, Searched CASE, Error 1339 diagnosis, and statement vs expression differences.
            </p>
          </div>

          <FAQTemplate
            title="Control Flow CASE Statements FAQs"
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
            title="Control Flow Statements: CASE ... WHEN ... THEN ... ELSE ... END CASE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="The CASE statement is essential for writing clean, readable multi-branch logic in MySQL. Remember the two key differences: Simple CASE is for matching a single variable against constants, while Searched CASE is for evaluating complex boolean ranges. And never forget the cardinal rule of procedural CASE: omitting the ELSE branch will cause fatal Error 1339 exceptions whenever an unexpected value enters your database routine!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
