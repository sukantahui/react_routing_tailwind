import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Creating and Invoking User-Defined Stored Functions (UDF)
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on creating stored functions, RETURNS and RETURN syntax, deterministic characteristics, expression invocation, and functional indexing.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedFuncScenario, setSelectedFuncScenario] = useState("gst_tax_calculator");

  const funcScenarios = {
    gst_tax_calculator: {
      title: "1. GST Tax Calculator Function (fn_calculate_academic_gst)",
      badge: "GST Tax Function",
      badgeColor: "emerald",
      sqlQuery: `-- Defining a Deterministic Stored Function for GST Tax Calculation:
DELIMITER //

CREATE FUNCTION fn_calculate_academic_gst(
    p_base_fee DECIMAL(10,2),
    p_is_scholarship BOOLEAN
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
NO SQL
BEGIN
    DECLARE v_gst DECIMAL(10,2);
    
    IF p_is_scholarship = TRUE THEN
        SET v_gst = p_base_fee * 0.05; -- Concessional 5% GST
    ELSE
        SET v_gst = p_base_fee * 0.18; -- Standard 18% GST
    END IF;
    
    RETURN ROUND(v_gst, 2);
END //

DELIMITER ;

-- Invoking Function Directly in SELECT Query:
SELECT 
    s.student_id,
    s.first_name,
    s.base_fee_inr,
    s.is_scholarship,
    fn_calculate_academic_gst(s.base_fee_inr, s.is_scholarship) AS applicable_gst_inr
FROM students s;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", base: "₹20,000.00", schol: "No (Regular)", outputVal: "₹3,600.00 (18% GST)", total: "₹23,600.00", status: "Standard Tax" },
        { id: "STU-103", name: "Abhronila Saha", base: "₹25,000.00", schol: "Yes (Scholarship)", outputVal: "₹1,250.00 (5% Concession)", total: "₹26,250.00", status: "Concessional Tax" },
      ],
      explanation:
        "`fn_calculate_academic_gst` evaluates to a scalar value inline for every row in the query, applying 18% standard GST or 5% concessional GST based on student scholarship status.",
    },
    letter_grade_classifier: {
      title: "2. Academic Letter Grade Classifier (fn_get_letter_grade)",
      badge: "Letter Grade Function",
      badgeColor: "cyan",
      sqlQuery: `-- Function mapping exam percentage score to standard letter grade:
DELIMITER //

CREATE FUNCTION fn_get_letter_grade(
    p_score_pct DECIMAL(5,2)
)
RETURNS VARCHAR(5)
DETERMINISTIC
NO SQL
BEGIN
    CASE 
        WHEN p_score_pct >= 90.00 THEN RETURN 'A+';
        WHEN p_score_pct >= 80.00 THEN RETURN 'A';
        WHEN p_score_pct >= 70.00 THEN RETURN 'B';
        WHEN p_score_pct >= 60.00 THEN RETURN 'C';
        WHEN p_score_pct >= 40.00 THEN RETURN 'D';
        ELSE RETURN 'F';
    END CASE;
END //

DELIMITER ;

-- Filtering and Ordering by Function Output:
SELECT first_name, exam_score_pct, fn_get_letter_grade(exam_score_pct) AS letter_grade
FROM students
WHERE fn_get_letter_grade(exam_score_pct) IN ('A+', 'A')
ORDER BY exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", base: "Score: 96.20%", schol: "Topper", outputVal: "'A+' Grade 🏆", total: "Distinction", status: "Top Honor" },
        { id: "STU-101", name: "Mamata Hui", base: "Score: 94.50%", schol: "Topper", outputVal: "'A+' Grade 🏆", total: "Distinction", status: "Top Honor" },
        { id: "STU-102", name: "Susmita Sen", base: "Score: 88.00%", schol: "First Class", outputVal: "'A' Grade 🥈", total: "First Division", status: "First Class" },
      ],
      explanation:
        "The letter grade function returns `A+`, `A`, `B`, etc., and can be used directly inside `WHERE` clauses and `ORDER BY` expressions for effortless grading queries.",
    },
    dob_to_age_calculator: {
      title: "3. Age Calculator Function from Date of Birth (fn_calculate_age)",
      badge: "Age Calculator",
      badgeColor: "amber",
      sqlQuery: `-- Non-Deterministic function computing student age based on current date:
DELIMITER //

CREATE FUNCTION fn_calculate_student_age(
    p_date_of_birth DATE
)
RETURNS INT
NOT DETERMINISTIC
NO SQL
BEGIN
    IF p_date_of_birth IS NULL THEN
        RETURN NULL;
    END IF;
    
    RETURN TIMESTAMPDIFF(YEAR, p_date_of_birth, CURDATE());
END //

DELIMITER ;

SELECT first_name, dob, fn_calculate_student_age(dob) AS calculated_age_years FROM students;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", base: "DOB: 2004-05-14", schol: "CURDATE() Ref", outputVal: "21 Years Old", total: "Eligible for Placement", status: "Calculated" },
        { id: "STU-104", name: "Debangshu Roy", base: "DOB: 2005-09-22", schol: "CURDATE() Ref", outputVal: "20 Years Old", total: "Eligible for Placement", status: "Calculated" },
      ],
      explanation:
        "Because `fn_calculate_student_age` uses `CURDATE()`, it is declared `NOT DETERMINISTIC`. It computes the exact elapsed calendar years using `TIMESTAMPDIFF(YEAR, dob, CURDATE())`.",
    },
    inr_currency_formatter: {
      title: "4. Formatted Currency Converter (fn_format_inr_currency)",
      badge: "Currency Formatter",
      badgeColor: "rose",
      sqlQuery: `-- Formatting numbers into Indian Rupee strings (₹XX,XXX.XX):
DELIMITER //

CREATE FUNCTION fn_format_inr_currency(
    p_amount DECIMAL(12,2)
)
RETURNS VARCHAR(30)
DETERMINISTIC
NO SQL
BEGIN
    IF p_amount IS NULL THEN
        RETURN '₹0.00';
    END IF;
    
    RETURN CONCAT('₹', FORMAT(p_amount, 2, 'en_IN'));
END //

DELIMITER ;

SELECT 
    student_name, 
    fn_format_inr_currency(base_fee_inr) AS formatted_base_fee,
    fn_format_inr_currency(paid_amount_inr) AS formatted_paid_fee
FROM student_ledgers;`,
      resultRows: [
        { id: "Fee Display", name: "Susmita Sen", base: "Raw: 18500.00", schol: "en_IN Locale", outputVal: "'₹18,500.00'", total: "Formatted for Invoice", status: "Formatted String" },
        { id: "Fee Display", name: "Mamata Hui", base: "Raw: 23600.00", schol: "en_IN Locale", outputVal: "'₹23,600.00'", total: "Formatted for Invoice", status: "Formatted String" },
      ],
      explanation:
        "The currency formatter function standardizes monetary output into Indian Rupee (`₹`) representations across all query reports and frontend exports.",
    },
  };

  const navItems = [
    { id: "func-syntax", label: "1. Stored Function Syntax" },
    { id: "func-vs-proc", label: "2. Function vs Procedure" },
    { id: "svg-diagrams", label: "3. Execution Lifecycle SVGs" },
    { id: "interactive-sandbox", label: "4. Live Function Workbench" },
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
            <span>Topic 7 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Scalar Routine Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Creating &amp; Invoking User-Defined Functions (UDF)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build custom scalar database logic in MySQL. Understand <code className="text-cyan-300 font-mono">RETURNS</code> headers, mandatory <code className="text-cyan-300 font-mono">RETURN</code> statements, deterministic characteristics, expression invocation, and functional indexing.
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
        {/* SECTION 1: Syntax */}
        <section id="func-syntax" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Stored Function DDL Syntax Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The anatomy of creating, parameterizing, and executing scalar functions in MySQL.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`DELIMITER //

CREATE FUNCTION function_name (
    param1 data_type,
    param2 data_type
)
RETURNS return_data_type
[DETERMINISTIC | NOT DETERMINISTIC]
[READS SQL DATA | NO SQL | CONTAINS SQL | MODIFIES SQL DATA]
BEGIN
    DECLARE v_result return_data_type;
    -- Procedural calculation logic
    RETURN v_result; -- Mandatory scalar return!
END //

DELIMITER ;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: Function vs Procedure */}
        <section id="func-vs-proc" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Stored Functions vs Stored Procedures
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing scalar expression computation with multi-statement transactional workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Stored Functions (Scalar Math)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invoked inside expressions (<code className="text-emerald-300 font-mono">SELECT func(x)</code>). Returns exactly 1 scalar value. Parameters are strictly `IN`. No explicit transaction control.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Stored Procedures (Workflows)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invoked via <code className="text-cyan-300 font-mono">CALL proc(x, @out)</code>. Supports `IN`, `OUT`, `INOUT` parameters, multiple result sets, and full transactional boundaries (<code className="text-cyan-300 font-mono">COMMIT/ROLLBACK</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Function Lifecycle &amp; Comparison
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing scalar expression evaluation with procedure execution architecture.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Function Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Function Invocation Lifecycle in SQL Queries
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Query Stage */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. SQL Query Stream</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT fn_gst(fee) ...</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Passes row column values</text>
                  </g>

                  {/* Function Execution */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Stored Function Engine</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Evaluates IF/CASE Bytecode</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Executes RETURN scalar_val</text>
                  </g>

                  {/* Scalar Result */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Projected Result Column</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">GST: ₹3,600.00</text>
                    <text x="705" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">Rendered in output row</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Function vs Proc */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Stored Functions (Scalar) vs Stored Procedures (Multi-Table)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Function Box */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Stored Functions: SELECT fn_name()</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1 Scalar Value • IN Params • No Transactions</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Used for calculations and formatting in SQL queries</text>
                  </g>

                  {/* Procedure Box */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Stored Procedures: CALL proc_name()</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Multi-Result Sets • IN, OUT, INOUT • COMMIT/ROLLBACK</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Used for business workflows and data modifications</text>
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
              4. Interactive User-Defined Functions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test GST tax calculation functions, letter grade classifiers, age calculators, and currency formatters live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(funcScenarios).map(([key, item]) => {
              const isActive = selectedFuncScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFuncScenario(key)}
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
                    {isActive ? "● Active Function" : "○ Run Function Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{funcScenarios[selectedFuncScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{funcScenarios[selectedFuncScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Scalar Routine Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Function DDL &amp; Query Invocation</span>
                <span className="text-emerald-400">RETURNS Scalar Value</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {funcScenarios[selectedFuncScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID / Key</th>
                    <th className="py-3 px-4 text-white">Student / Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Base Value / Input</th>
                    <th className="py-3 px-4 text-cyan-400">Condition / Param</th>
                    <th className="py-3 px-4 text-amber-400">Computed Function Return</th>
                    <th className="py-3 px-4 text-indigo-400">Total / Classification</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {funcScenarios[selectedFuncScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.base}</td>
                      <td className="py-3 px-4 text-slate-300">{row.schol}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold font-mono">{row.outputVal}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.total}</td>
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
              Real-world GST tax centralization and functional indexing in MySQL 8.0.
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
                  Centralizing GST Calculation &amp; Creating Functional Indexes in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Billing</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui created <code className="text-cyan-300 font-mono">fn_calculate_academic_gst</code> to encapsulate Indian GST regulations. To ensure blazing query performance across 50,000 students, a MySQL 8.0 Functional Index was created directly on the deterministic function expression:
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- MySQL 8.0 Functional Index on Deterministic Function:
CREATE INDEX idx_student_grade 
ON students ((fn_get_letter_grade(exam_score_pct)));

-- Query uses B-Tree index scan instead of full table scan:
EXPLAIN SELECT student_id, first_name FROM students WHERE fn_get_letter_grade(exam_score_pct) = 'A+';`}
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
              Avoid missing RETURN paths and the N+1 query performance trap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The N+1 Query Trap inside Functions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Putting table joins inside a function called on every row in a <code className="text-rose-300 font-mono">SELECT</code> query causes $N+1$ table lookups on the database engine.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use relational <code className="text-emerald-400 font-mono">JOIN</code>s in the outer query instead of querying tables inside row functions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Declare Function Characteristics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify <code className="text-emerald-400 font-mono">DETERMINISTIC</code> and <code className="text-emerald-400 font-mono">NO SQL</code> / <code className="text-emerald-400 font-mono">READS SQL DATA</code> to ensure seamless binary log replication across replica nodes.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero replication drift.
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
              Key takeaways for User-Defined Stored Functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Stored Function Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Include <code className="text-cyan-300 font-mono">RETURNS data_type</code> in the signature header.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Ensure all execution paths encounter a <code className="text-cyan-300 font-mono">RETURN scalar_val;</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Remember that all parameters are strictly `IN` (no `OUT` allowed).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Never execute transaction control statements (<code className="text-cyan-300 font-mono">COMMIT/ROLLBACK</code>) in functions.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe JSON return types...”</span>
                  Stored functions can return structured `JSON` objects, allowing you to return multiple computed metrics packed inside a single scalar return value!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index acceleration...”</span>
                  In MySQL 8.0, you can index the result of a deterministic function using Functional Indexes (`CREATE INDEX ... ((fn(col)))`) for sub-millisecond filtering!
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
              Comprehensive reference questions covering stored functions, RETURNS and RETURN syntax, deterministic characteristics, expression invocation, and functional indexing.
            </p>
          </div>

          <FAQTemplate
            title="User-Defined Stored Functions FAQs"
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
            title="Creating and Invoking User-Defined Stored Functions (UDF)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="User-Defined Stored Functions are the mathematical workhorses of MySQL. Unlike stored procedures which execute workflows via CALL, stored functions evaluate directly inside SQL queries (in SELECT, WHERE, and ORDER BY lists). Always ensure every branch encounters a RETURN statement, declare DETERMINISTIC for replication safety, and avoid querying database tables inside row functions to protect against the N+1 query performance bottleneck!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
