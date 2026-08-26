import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Creating Stored Procedures: Syntax, Parameters (IN, OUT, INOUT)
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on creating stored procedures, IN/OUT/INOUT parameter modes, parameter shadowing prevention, session variable binding, and procedure characteristics.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedParamScenario, setSelectedParamScenario] = useState("in_parameter_filter");

  const paramScenarios = {
    in_parameter_filter: {
      title: "1. IN Parameter: Department Filter Query (Pass-by-Value)",
      badge: "IN (Input Only)",
      badgeColor: "emerald",
      sqlQuery: `-- 1. IN Parameter: Passes data into the procedure (Read-Only inside):
DELIMITER //

CREATE PROCEDURE sp_get_students_by_dept(
    IN p_dept_id INT,
    IN p_min_score DECIMAL(5,2)
)
BEGIN
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
    WHERE s.dept_id = p_dept_id 
      AND s.exam_score_pct &ge; p_min_score
    ORDER BY s.exam_score_pct DESC;
END //

DELIMITER ;

-- Invocation passing literal constants into IN parameters:
CALL sp_get_students_by_dept(1, 85.00);`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science (Dept 1)", mode: "IN (1, 85.00)", score: "94.50%", outputVal: "Result Stream", status: "Filtered & Returned" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science (Dept 1)", mode: "IN (1, 85.00)", score: "88.00%", outputVal: "Result Stream", status: "Filtered & Returned" },
      ],
      explanation:
        "`IN` parameters pass values into the procedure. Modifications inside the procedure do not affect caller variables, making them ideal for search filters and report parameters.",
    },
    out_parameter_return_id: {
      title: "2. OUT Parameter: Registering Student & Returning Auto-ID",
      badge: "OUT (Output Write-Only)",
      badgeColor: "cyan",
      sqlQuery: `-- 2. OUT Parameter: Passes generated data back to the caller's session variable:
DELIMITER //

CREATE PROCEDURE sp_register_new_student(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_dept_id INT,
    OUT p_generated_student_id INT,
    OUT p_registration_code VARCHAR(30)
)
BEGIN
    -- Insert new student:
    INSERT INTO students (first_name, last_name, dept_id)
    VALUES (p_first_name, p_last_name, p_dept_id);
    
    -- Capture generated auto-increment primary key:
    SET p_generated_student_id = LAST_INSERT_ID();
    
    -- Format official admission registration code:
    SET p_registration_code = CONCAT('BKP-2026-', LPAD(p_generated_student_id, 4, '0'));
END //

DELIMITER ;

-- Invocation capturing returned values in session variables:
CALL sp_register_new_student('Abhronila', 'Saha', 2, @new_id, @reg_code);
SELECT @new_id AS new_student_id, @reg_code AS official_reg_code;`,
      resultRows: [
        { id: "OUT Binding", name: "Abhronila Saha", dept: "Information Tech (Dept 2)", mode: "OUT @new_id, @reg_code", score: "Auto-Increment", outputVal: "ID: 103 | Code: 'BKP-2026-0103'", status: "Generated & Bound" },
      ],
      explanation:
        "`OUT` parameters start as `NULL` upon entry. The procedure assigns values using `SET` or `SELECT INTO`, passing them back to the caller's `@new_id` and `@reg_code` session variables.",
    },
    inout_parameter_inplace_discount: {
      title: "3. INOUT Parameter: Applying Scholarship Discount In-Place",
      badge: "INOUT (Bidirectional)",
      badgeColor: "amber",
      sqlQuery: `-- 3. INOUT Parameter: Reads initial value, modifies in-place, and returns updated value:
DELIMITER //

CREATE PROCEDURE sp_apply_scholarship_discount(
    IN p_student_id INT,
    INOUT p_tuition_fee DECIMAL(10,2),
    OUT p_discount_applied_pct DECIMAL(5,2)
)
BEGIN
    DECLARE v_is_topper BOOLEAN DEFAULT FALSE;
    
    -- Check if student scored >= 90% (Eligible for 20% discount):
    SELECT (exam_score_pct >= 90.00) INTO v_is_topper 
    FROM students WHERE student_id = p_student_id;
    
    IF v_is_topper = TRUE THEN
        SET p_discount_applied_pct = 20.00;
        SET p_tuition_fee = p_tuition_fee * 0.80; -- 20% Reduction In-Place!
    ELSE
        SET p_discount_applied_pct = 0.00;
    END IF;
END //

DELIMITER ;

-- Initialize session variable, invoke procedure, and inspect updated value:
SET @student_fee = 25000.00; -- Initial Fee
CALL sp_apply_scholarship_discount(101, @student_fee, @disc_pct);
SELECT @student_fee AS final_payable_fee, @disc_pct AS discount_percentage;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", mode: "INOUT @student_fee (₹25k → ₹20k)", score: "94.50% Score", outputVal: "Payable: ₹20,000.00 (-20%)", status: "Discount Applied In-Place" },
      ],
      explanation:
        "`INOUT` parameters receive an initial value from the caller (₹25,000), read and modify it inside the procedure body (reducing by 20%), and write the final updated balance (₹20,000) back to the session variable.",
    },
    multi_output_status_codes: {
      title: "4. Multi-Output Status Codes & Transaction Auditing",
      badge: "Status & Return Codes",
      badgeColor: "rose",
      sqlQuery: `-- Enterprise procedure returning multiple status codes and audit messages:
DELIMITER //

CREATE PROCEDURE sp_process_course_enrollment(
    IN p_student_id INT,
    IN p_course_id INT,
    OUT p_enrollment_id INT,
    OUT p_status_code VARCHAR(20),
    OUT p_status_message VARCHAR(100)
)
BEGIN
    DECLARE v_already_enrolled INT DEFAULT 0;
    
    SELECT COUNT(*) INTO v_already_enrolled 
    FROM enrollments 
    WHERE student_id = p_student_id AND course_id = p_course_id;
    
    IF v_already_enrolled > 0 THEN
        SET p_enrollment_id = NULL;
        SET p_status_code = 'ERR_DUPLICATE';
        SET p_status_message = 'Student is already enrolled in this course.';
    ELSE
        INSERT INTO enrollments (student_id, course_id, enrolled_at)
        VALUES (p_student_id, p_course_id, NOW());
        
        SET p_enrollment_id = LAST_INSERT_ID();
        SET p_status_code = 'SUCCESS_200';
        SET p_status_message = 'Enrollment successfully confirmed.';
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "New Enrollment", name: "Debangshu Roy", dept: "Web Dev Course", mode: "IN / OUT Status", score: "Valid Request", outputVal: "Status: 'SUCCESS_200' | ID: #501", status: "Enrolled" },
        { id: "Duplicate Attempt", name: "Debangshu Roy", dept: "Web Dev Course", mode: "IN / OUT Status", score: "Duplicate Request", outputVal: "Status: 'ERR_DUPLICATE' | Message", status: "Graceful Rejection" },
      ],
      explanation:
        "Using multiple `OUT` parameters allows procedures to return clear status codes (`SUCCESS_200`, `ERR_DUPLICATE`) and descriptive diagnostic messages directly to frontend APIs.",
    },
  };

  const navItems = [
    { id: "param-syntax", label: "1. Procedure DDL Syntax" },
    { id: "param-modes", label: "2. The 3 Parameter Modes" },
    { id: "svg-diagrams", label: "3. Parameter Modes & Shadowing SVGs" },
    { id: "interactive-sandbox", label: "4. Live Procedure Workbench" },
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
            <span>Topic 2 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Procedure Signatures
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creating Stored Procedures: Syntax &amp; Parameters
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the DDL anatomy of MySQL stored procedures. Understand parameter modes (<code className="text-cyan-300 font-mono">IN</code>, <code className="text-cyan-300 font-mono">OUT</code>, <code className="text-cyan-300 font-mono">INOUT</code>), session variable binding, and parameter shadowing prevention.
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
        <section id="param-syntax" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Stored Procedure DDL Syntax Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The anatomy of creating, parameterizing, and documenting stored routines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`DELIMITER //

CREATE PROCEDURE procedure_name (
    [IN | OUT | INOUT] param_name data_type,
    ...
)
[COMMENT 'Documentation description']
[DETERMINISTIC | NOT DETERMINISTIC]
[CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA]
[SQL SECURITY { DEFINER | INVOKER }]
BEGIN
    -- Procedural code body
END //

DELIMITER ;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: Parameter Modes */}
        <section id="param-modes" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 3 Parameter Passing Modes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing input, output, and bidirectional parameter channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📥</span> 1. IN (Input Parameter)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Passes data into the procedure from caller (default mode). Read-only; modifications inside procedure do not alter the caller's variable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📤</span> 2. OUT (Output Parameter)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Passes data back to caller. Initialized to `NULL` upon entry; procedure assigns values using `SET` or `SELECT INTO` to write to session variables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🔄</span> 3. INOUT (Bidirectional)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initialized with a value by caller, read and modified inside procedure, and updated value passed back to caller's session variable.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Parameter Modes &amp; Shadowing Prevention
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing parameter channels and parameter identifier naming conventions.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Parameter Channels */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Parameter Modes: IN (One-Way In), OUT (One-Way Out), INOUT (Round-Trip)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* IN Mode */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">IN Parameter Mode</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Caller → [Pass by Value] → Proc</text>
                    <text x="145" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Read-Only Inside Routine</text>
                  </g>

                  {/* OUT Mode */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">OUT Parameter Mode</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Proc → [SET param = val] → Caller</text>
                    <text x="425" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Starts as NULL, Writes to @var</text>
                  </g>

                  {/* INOUT Mode */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">INOUT Parameter Mode</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1c1917" />
                    <text x="705" y="88" fill="#fde68a" fontSize="8 font-mono" textAnchor="middle">Caller ↔ [In-Place Math] ↔ Proc</text>
                    <text x="705" y="102" fill="#f59e0b" fontSize="7 font-bold" textAnchor="middle">Bidirectional Round-Trip</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Shadowing Bug */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Parameter Shadowing Bug Prevention (Prefix `p_` Rule)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Shadowing Bug */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Parameter Shadowing Tautology Bug</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">WHERE student_id = student_id (Both treated as column!)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Evaluates to TRUE for ALL rows → Updates entire table!</text>
                  </g>

                  {/* Prefix Fix */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Parameter Prefix Fix (`p_student_id`)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">WHERE s.student_id = p_student_id</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Clean Disambiguation → Matches target row only!</text>
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
              4. Interactive Stored Procedure Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test IN parameter filters, OUT auto-ID generation, INOUT in-place discounts, and multi-output status codes live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(paramScenarios).map(([key, item]) => {
              const isActive = selectedParamScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedParamScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Procedure" : "○ Run Procedure CALL"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{paramScenarios[selectedParamScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{paramScenarios[selectedParamScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Procedure Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Stored Procedure DDL &amp; CALL Statement</span>
                <span className="text-emerald-400">Parameter Passing Protocol</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {paramScenarios[selectedParamScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID / Mode</th>
                    <th className="py-3 px-4 text-white">Student / Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Scope / Department</th>
                    <th className="py-3 px-4 text-cyan-400">Parameter Passed</th>
                    <th className="py-3 px-4 text-indigo-400">Score / Request Type</th>
                    <th className="py-3 px-4 text-amber-400">Output Result / Session Value</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {paramScenarios[selectedParamScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.mode}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.score}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans font-bold">{row.outputVal}</td>
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
              Real-world student admission automation and parameter shadowing bug fixes.
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
                  Automating Student Admission &amp; Registration Code Generation in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Admissions</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated the academy's walk-in admission workflow: Using a stored procedure with 3 <code className="text-cyan-300 font-mono">IN</code> parameters and 2 <code className="text-emerald-300 font-mono">OUT</code> parameters (<code className="text-emerald-300 font-mono">OUT p_id, OUT p_reg_code</code>), the procedure creates the student record, generates the formatted receipt registration number, and initializes the financial ledger balance in a single atomic call!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Calling Admission Procedure:
CALL sp_admit_student(
    'Mamata', 'Hui', 1, 
    @new_student_id, 
    @official_admission_code
);

SELECT @new_student_id AS student_id, @official_admission_code AS reg_code;`}
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
              Avoid parameter shadowing bugs and constant literal bindings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Passing Constants to OUT / INOUT (Error 1414)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">CALL sp_get_id(101, 0)</code> throws Error 1414 because `OUT` parameters require a session variable (`@var`) to capture the write-back value.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always pass user session variables (<code className="text-emerald-400 font-mono">CALL sp_get_id(101, @out_val)</code>)!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Prefix Parameters with `p_`
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Prefixing parameter names (e.g. <code className="text-emerald-400 font-mono">p_student_id</code>) prevents parameter shadowing bugs where <code className="text-rose-300 font-mono">WHERE student_id = student_id</code> accidentally matches all rows in the table.
              </p>
              <div className="text-xs text-slate-400">
                Standard enterprise naming convention.
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
              Key takeaways for Creating Stored Procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Stored Procedure Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">IN</code> for read-only input filters and arguments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">OUT</code> to return generated primary keys and status codes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">INOUT</code> for in-place value modifications (e.g. discounts).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always prefix parameter names with <code className="text-cyan-300 font-mono">p_</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe default parameter values...”</span>
                  MySQL 8.0 does NOT support default parameter values in stored procedure signatures. Every parameter declared must be passed in the `CALL` statement!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about JSON payloads...”</span>
                  If you need to pass an arbitrary list of items into a procedure, define an `IN p_payload JSON` parameter and unpack it using `JSON_TABLE()`!
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
              Comprehensive reference questions covering stored procedure syntax, IN/OUT/INOUT parameter modes, parameter shadowing bugs, and session variable binding.
            </p>
          </div>

          <FAQTemplate
            title="Creating Stored Procedures FAQs"
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
            title="Creating Stored Procedures: Syntax, Parameters (IN, OUT, INOUT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Understanding parameter modes is fundamental to writing reusable, encapsulated stored procedures. Remember the three channels: IN brings data in from the caller (pass-by-value), OUT writes generated results back to caller session variables (starts as NULL), and INOUT allows bidirectional in-place modifications. Always prefix parameters with p_ to eliminate dangerous column shadowing bugs where WHERE col = col matches every row in your table!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
