import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Stored Procedures vs Stored Functions: Differences, Rules, and Restrictions
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on comparing stored procedures and stored functions, transaction rules, Error 1422 diagnosis, invocation contexts, and architectural decision frameworks.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedComparisonScenario, setSelectedComparisonScenario] = useState("procedure_checkout_workflow");

  const comparisonScenarios = {
    procedure_checkout_workflow: {
      title: "1. Stored Procedure: Multi-Table Fee Checkout & Transaction Workflow",
      badge: "Procedure (Workflow)",
      badgeColor: "emerald",
      sqlQuery: `-- 1. STORED PROCEDURE: Multi-table DML, ACID transaction control, and OUT parameters:
DELIMITER //

CREATE PROCEDURE sp_checkout_student_enrollment(
    IN p_student_id INT,
    IN p_course_id INT,
    IN p_payment_amount DECIMAL(10,2),
    OUT p_receipt_no VARCHAR(30),
    OUT p_status_code VARCHAR(20)
)
BEGIN
    DECLARE v_course_fee DECIMAL(10,2);
    
    -- Explicit Transaction Boundary Management:
    START TRANSACTION;
    
    -- Step 1: Validate course fee:
    SELECT fee INTO v_course_fee FROM courses WHERE course_id = p_course_id;
    
    -- Step 2: Insert enrollment record:
    INSERT INTO enrollments (student_id, course_id, enrolled_at)
    VALUES (p_student_id, p_course_id, NOW());
    
    -- Step 3: Insert financial payment receipt:
    INSERT INTO fee_payments (student_id, amount_paid_inr, payment_date)
    VALUES (p_student_id, p_payment_amount, CURRENT_DATE());
    
    -- Step 4: Capture auto-increment receipt number:
    SET p_receipt_no = CONCAT('RCP-2026-', LAST_INSERT_ID());
    SET p_status_code = 'SUCCESS_200';
    
    -- Step 5: Commit multi-table atomic transaction:
    COMMIT;
END //

DELIMITER ;

CALL sp_checkout_student_enrollment(101, 5, 20000.00, @receipt, @status);
SELECT @receipt, @status;`,
      resultRows: [
        { id: "Procedure Call", invocation: "CALL sp_checkout_student_enrollment()", returnType: "OUT @receipt, @status", transactions: "START TRANSACTION + COMMIT ✅", expressions: "❌ Prohibited in SELECT", status: "Atomic Workflow Complete" },
      ],
      explanation:
        "Stored Procedures excel at multi-statement workflows, atomic ACID transactions (`START TRANSACTION`, `COMMIT`, `ROLLBACK`), multi-table DML, and returning generated identifiers via `OUT` parameters.",
    },
    function_inline_evaluation: {
      title: "2. Stored Function: Inline GST Tax & Grading in SQL Expressions",
      badge: "Function (Scalar Math)",
      badgeColor: "cyan",
      sqlQuery: `-- 2. STORED FUNCTION: Pure scalar mathematical calculation inside SELECT queries:
DELIMITER //

CREATE FUNCTION fn_compute_net_payable_fee(
    p_base_fee DECIMAL(10,2),
    p_score_pct DECIMAL(5,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
NO SQL
BEGIN
    DECLARE v_discount DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_gst DECIMAL(10,2);
    
    -- Apply merit discount if score >= 90%:
    IF p_score_pct >= 90.00 THEN
        SET v_discount = p_base_fee * 0.20; -- 20% Scholarship
    END IF;
    
    -- Calculate 18% GST on net fee:
    SET v_gst = (p_base_fee - v_discount) * 0.18;
    
    RETURN ROUND((p_base_fee - v_discount) + v_gst, 2);
END //

DELIMITER ;

-- Invoked directly in SELECT list and WHERE filter:
SELECT 
    student_id, 
    first_name, 
    exam_score_pct,
    fn_compute_net_payable_fee(20000.00, exam_score_pct) AS net_fee_with_gst
FROM students
WHERE fn_compute_net_payable_fee(20000.00, exam_score_pct) < 22000.00;`,
      resultRows: [
        { id: "STU-103", invocation: "SELECT fn_compute_net_payable_fee()", returnType: "RETURNS DECIMAL(10,2)", transactions: "❌ Prohibited (Error 1422)", expressions: "✅ Valid in SELECT / WHERE / ORDER BY", status: "Computed Inline: ₹18,880.00" },
        { id: "STU-101", invocation: "SELECT fn_compute_net_payable_fee()", returnType: "RETURNS DECIMAL(10,2)", transactions: "❌ Prohibited (Error 1422)", expressions: "✅ Valid in SELECT / WHERE / ORDER BY", status: "Computed Inline: ₹18,880.00" },
      ],
      explanation:
        "Stored Functions evaluate to a single scalar value. They can be placed directly inside `SELECT` projection lists, `WHERE` search filters, and `ORDER BY` expressions.",
    },
    transaction_violation_error1422: {
      title: "3. Transaction Violation: Error 1422 in Stored Functions",
      badge: "Error 1422 Violation",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN: Attempting to manage transactions inside a Stored Function:
DELIMITER //

CREATE FUNCTION fn_broken_transaction_test()
RETURNS INT
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    START TRANSACTION; -- 💥 FORBIDDEN IN FUNCTIONS!
    UPDATE student_ledger SET balance = 0 WHERE student_id = 101;
    COMMIT;            -- 💥 FORBIDDEN IN FUNCTIONS!
    RETURN 1;
END //

DELIMITER ;

-- 🚨 ATTEMPTING INVOCATION IN QUERY:
-- SELECT fn_broken_transaction_test();
-- ERROR 1422 (HY000): Explicit or implicit commit is not allowed in stored function or trigger!`,
      resultRows: [
        { id: "Transaction in Function", invocation: "SELECT fn_broken_transaction()", returnType: "Compile / Runtime Crash", transactions: "💥 Error 1422 (Commit Forbidden)", expressions: "Cannot Commit in Scalar Math", status: "Fatal Violation" },
      ],
      explanation:
        "MySQL forbids `START TRANSACTION`, `COMMIT`, and `ROLLBACK` statements inside Stored Functions. Functions must remain transactional side-effect-free relative to the outer query.",
    },
    architectural_decision_matrix: {
      title: "4. Side-by-Side Architectural Decision Matrix",
      badge: "Decision Matrix",
      badgeColor: "amber",
      sqlQuery: `-- Senior Architect's Decision Matrix:
-- -------------------------------------------------------------------------
-- REQUIREMENT                          | USE STORED PROCEDURE | USE STORED FUNCTION
-- -------------------------------------+----------------------+--------------------
-- Multi-Table Transaction (ACID)       | ✅ MUST USE PROCEDURE | ❌ FORBIDDEN (Error 1422)
-- Inline in SELECT / WHERE Clauses     | ❌ NOT SUPPORTED     | ✅ MUST USE FUNCTION
-- Return Multiple Result Sets (Grids)  | ✅ MUST USE PROCEDURE | ❌ FORBIDDEN (1 Scalar Only)
-- Input/Output Parameters (IN/OUT)     | ✅ MUST USE PROCEDURE | ❌ STRICTLY IN ONLY
-- Pure Mathematical Calculations       | ⚠️ Inefficient via OUT | ✅ OPTIMAL (DETERMINISTIC)
-- Functional Indexes in MySQL 8.0      | ❌ NOT SUPPORTED     | ✅ SUPPORTED WITH FUNCTION`,
      resultRows: [
        { id: "Business Workflow / ETL", invocation: "CALL proc_name()", returnType: "OUT Params / Tables", transactions: "Supported ✅", expressions: "No ❌", status: "Choose Procedure" },
        { id: "Formula / Formatting Math", invocation: "SELECT func_name()", returnType: "1 Scalar Value", transactions: "Forbidden ❌", expressions: "Yes ✅", status: "Choose Function" },
      ],
      explanation:
        "Follow this architectural rule of thumb: If you are mutating multiple tables and managing transactions, use a Stored Procedure; if you are computing formulas inside queries, use a Stored Function.",
    },
  };

  const navItems = [
    { id: "comparison-matrix", label: "1. Architectural Comparison" },
    { id: "decision-rules", label: "2. Decision Framework" },
    { id: "svg-diagrams", label: "3. Divergence & Decision Tree SVGs" },
    { id: "interactive-sandbox", label: "4. Live Comparison Workbench" },
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
            <span>Topic 8 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Architectural Analysis
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Stored Procedures vs Stored Functions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the deep architectural dichotomy between Stored Procedures and Stored Functions. Understand invocation differences (<code className="text-cyan-300 font-mono">CALL</code> vs <code className="text-cyan-300 font-mono">SELECT</code>), transaction constraints (<code className="text-rose-400 font-mono">Error 1422</code>), parameter capabilities, and production decision matrices.
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
        {/* SECTION 1: Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Architectural Comparison Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Detailed technical specification differences between procedures and functions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-white font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4 text-cyan-400">Architectural Dimension</th>
                  <th className="py-3 px-4 text-emerald-400">Stored Procedure</th>
                  <th className="py-3 px-4 text-indigo-400">Stored Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Invocation Syntax</td>
                  <td className="py-3 px-4 text-emerald-300">CALL procedure_name(args);</td>
                  <td className="py-3 px-4 text-indigo-300">SELECT function_name(args);</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Return Values</td>
                  <td className="py-3 px-4 text-emerald-300">OUT / INOUT params + Result Sets</td>
                  <td className="py-3 px-4 text-indigo-300">Exactly 1 Scalar Value (RETURNS)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Parameter Modes</td>
                  <td className="py-3 px-4 text-emerald-300">IN, OUT, INOUT</td>
                  <td className="py-3 px-4 text-indigo-300">Strictly IN only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">SQL Expression Context</td>
                  <td className="py-3 px-4 text-rose-400">CANNOT be used in expressions</td>
                  <td className="py-3 px-4 text-emerald-400">CAN be used in SELECT, WHERE, ORDER BY</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Transaction Management</td>
                  <td className="py-3 px-4 text-emerald-400">START TRANSACTION, COMMIT, ROLLBACK ✅</td>
                  <td className="py-3 px-4 text-rose-400">FORBIDDEN (Throws Error 1422) ❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Decision Rules */}
        <section id="decision-rules" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Architectural Decision Rules
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Selecting the right server-side routine for your engineering requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>⚙️</span> When to Use a Stored Procedure
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Multi-table atomic transactions (<code className="text-emerald-300 font-mono">COMMIT/ROLLBACK</code>).</li>
                <li>• Returning tabular result sets or multiple generated IDs.</li>
                <li>• Batch ETL data processing and administrative maintenance.</li>
                <li>• Least-privilege security encapsulation over financial tables.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>📐</span> When to Use a Stored Function
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Reusable mathematical calculations (e.g. GST tax, discounts).</li>
                <li>• String transformations and currency formatting in queries.</li>
                <li>• Dynamic evaluation inside <code className="text-cyan-300 font-mono">WHERE</code> filters and <code className="text-cyan-300 font-mono">ORDER BY</code> clauses.</li>
                <li>• Accelerating queries via MySQL 8.0 Functional Indexes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Divergence &amp; Decision Tree
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing routine divergence and the architectural selection tree.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Divergence Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Architectural Divergence: Procedures vs Functions
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Procedure Column */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">STORED PROCEDURE (CALL proc_name)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">IN, OUT, INOUT • Transactions • Multi-Result Sets</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Purpose: Multi-table business workflows &amp; transactions</text>
                  </g>

                  {/* Function Column */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">STORED FUNCTION (SELECT func_name)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Strictly IN • 1 Scalar Return • Callable in SELECT/WHERE</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Purpose: Reusable formulas &amp; query expressions</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Decision Tree */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Architectural Decision Tree
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Decision Diamond */}
                  <g>
                    <polygon points="180,30 290,80 180,130 70,80" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="180" y="78" fill="#c7d2fe" fontSize="8 font-mono" textAnchor="middle">Needs Transactions</text>
                    <text x="180" y="92" fill="#c7d2fe" fontSize="8 font-mono" textAnchor="middle">or Multi-Table DML?</text>
                  </g>

                  {/* Yes → Procedure */}
                  <g>
                    <rect x="360" y="30" width="200" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="460" y="52" fill="#34d399" fontSize="9 font-bold" textAnchor="middle">YES → USE PROCEDURE ✅</text>
                    <text x="460" y="65" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">CALL sp_name(IN, OUT)</text>
                  </g>

                  {/* No → Function */}
                  <g>
                    <rect x="360" y="95" width="200" height="45" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="460" y="117" fill="#c7d2fe" fontSize="9 font-bold" textAnchor="middle">NO → USE FUNCTION ✅</text>
                    <text x="460" y="130" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">SELECT fn_name(val)</text>
                  </g>

                  {/* Outcome Boxes */}
                  <g>
                    <rect x="620" y="30" width="200" height="45" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                    <text x="720" y="57" fill="#34d399" fontSize="8" textAnchor="middle">Workflow / ACID Safety</text>
                  </g>
                  <g>
                    <rect x="620" y="95" width="200" height="45" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1" />
                    <text x="720" y="122" fill="#38bdf8" fontSize="8" textAnchor="middle">Query Expression Math</text>
                  </g>

                  {/* Paths */}
                  <path d="M 290 80 L 360 52" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 290 80 L 360 117" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 52 L 620 52" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 560 117 L 620 117" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Comparison Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test procedure fee checkout workflows, inline function evaluations, Error 1422 transaction violations, and architectural matrices live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(comparisonScenarios).map(([key, item]) => {
              const isActive = selectedComparisonScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedComparisonScenario(key)}
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
                    {isActive ? "● Active Architecture" : "○ Run Architectural Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{comparisonScenarios[selectedComparisonScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{comparisonScenarios[selectedComparisonScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Architectural Evaluation
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Routine Comparison Script</span>
                <span className="text-emerald-400">Server-Side Protocol</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {comparisonScenarios[selectedComparisonScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Routine ID / Scenario</th>
                    <th className="py-3 px-4 text-white">Invocation Syntax</th>
                    <th className="py-3 px-4 text-emerald-400">Return Mechanism</th>
                    <th className="py-3 px-4 text-cyan-400">Transaction Support</th>
                    <th className="py-3 px-4 text-indigo-400">SQL Expression Context</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {comparisonScenarios[selectedComparisonScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.invocation}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.returnType}</td>
                      <td className="py-3 px-4 text-slate-300">{row.transactions}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.expressions}</td>
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
              Real-world transaction violation fixes and least-privilege security roles.
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
                  Refactoring Broken Fee Billing from Stored Function to Stored Procedure in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a broken student checkout system: A junior developer attempted to execute <code className="text-rose-400 font-mono">COMMIT;</code> inside a Stored Function, crashing every payment with Error 1422. Refactoring the workflow into a Stored Procedure <code className="text-emerald-300 font-mono">sp_checkout_student_enrollment</code> allowed multi-table atomic transactions and generated receipt returns!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Refactored Atomic Stored Procedure:
CALL sp_checkout_student_enrollment(101, 5, 20000.00, @receipt_id, @status);
SELECT @receipt_id, @status;`}
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
              Avoid transaction boundary violations and invocation syntax confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Transactions in Stored Functions (Error 1422)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">START TRANSACTION;</code> or <code className="text-rose-300 font-mono">COMMIT;</code> inside a Stored Function causes Error 1422 because functions must be transactional side-effect free.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Move all transactional logic into Stored Procedures!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Choose Based on Architectural Intent
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use Procedures for business workflows, multi-table transactions, and batch ETL jobs; use Functions strictly for pure scalar formulas in queries.
              </p>
              <div className="text-xs text-slate-400">
                Clean architectural separation of concerns.
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
              Key takeaways for Procedures vs Functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Procedures vs Functions Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Procedures (<code className="text-cyan-300 font-mono">CALL</code>) for multi-table transactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use Functions (<code className="text-cyan-300 font-mono">SELECT func()</code>) for inline query math.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Never put <code className="text-cyan-300 font-mono">COMMIT</code> or <code className="text-cyan-300 font-mono">ROLLBACK</code> in functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that functions support strictly `IN` parameters.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Error 1305...”</span>
                  If you accidentally invoke a procedure with `SELECT sp_my_proc()`, MySQL searches for a function and throws `Error 1305: Function does not exist`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about functional indexes...”</span>
                  Only deterministic stored functions can be used in MySQL 8.0 Functional Indexes. Procedures cannot be indexed!
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
              Comprehensive reference questions covering differences, rules, restrictions, Error 1422 diagnosis, parameter modes, and decision matrices for stored procedures vs stored functions.
            </p>
          </div>

          <FAQTemplate
            title="Stored Procedures vs Functions FAQs"
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
            title="Stored Procedures vs Stored Functions: Differences, Rules, and Restrictions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Choosing between a Stored Procedure and a Stored Function is a core architectural decision. Remember the rule: Stored Procedures are for multi-statement business workflows, ACID transactions, and table modifications invoked via CALL; Stored Functions are strictly for pure, side-effect-free scalar formulas evaluated directly inside SQL queries. Never attempt to commit transactions inside functions to avoid Error 1422!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
