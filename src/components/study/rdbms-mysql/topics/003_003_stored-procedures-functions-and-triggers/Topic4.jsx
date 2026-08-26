import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Control Flow Statements: IF ... THEN ... ELSEIF ... ELSE ... END IF
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on procedural conditional branching, IF/ELSEIF/ELSE/END IF syntax, short-circuit logic, descending threshold ordering, and transaction validation.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedIfScenario, setSelectedIfScenario] = useState("academic_honors_grading");

  const ifScenarios = {
    academic_honors_grading: {
      title: "1. Academic Honors Tier Classification (IF ... ELSEIF ... ELSE)",
      badge: "Honors Classification",
      badgeColor: "emerald",
      sqlQuery: `-- Determining student academic honors using multi-branch IF ... ELSEIF:
DELIMITER //

CREATE PROCEDURE sp_classify_student_honors(
    IN p_student_id INT,
    OUT p_honor_tier VARCHAR(50),
    OUT p_award_badge VARCHAR(50)
)
BEGIN
    DECLARE v_score DECIMAL(5,2);
    
    -- Fetch student exam score:
    SELECT exam_score_pct INTO v_score 
    FROM students WHERE student_id = p_student_id;
    
    -- Multi-Branch IF statement (Descending Thresholds):
    IF v_score &ge; 95.00 THEN
        SET p_honor_tier = 'Distinction with Highest Honors 🏆';
        SET p_award_badge = '🌟 Gold Valedictorian Medallion';
    ELSEIF v_score >= 90.00 THEN
        SET p_honor_tier = 'Distinction with Honors 🥇';
        SET p_award_badge = '🥇 Gold Academic Star';
    ELSEIF v_score >= 75.00 THEN
        SET p_honor_tier = 'First Class Division 🥈';
        SET p_award_badge = '🥈 Silver Achievement Ribbon';
    ELSEIF v_score >= 60.00 THEN
        SET p_honor_tier = 'Second Class Division 🥉';
        SET p_award_badge = '🥉 Bronze Certificate';
    ELSEIF v_score >= 40.00 THEN
        SET p_honor_tier = 'Pass Division 📜';
        SET p_award_badge = '📜 Completion Certificate';
    ELSE
        SET p_honor_tier = 'Needs Remediation ⚠️';
        SET p_award_badge = '⚠️ Academic Support Program';
    END IF;
END //

DELIMITER ;

CALL sp_classify_student_honors(103, @tier, @badge);
SELECT @tier AS honor_tier, @badge AS award;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", score: "96.20%", branch: "v_score >= 95.00", outputTier: "Distinction with Highest Honors 🏆", badge: "🌟 Gold Valedictorian Medallion", status: "Top Tier" },
        { id: "STU-101", name: "Mamata Hui", score: "94.50%", branch: "v_score >= 90.00", outputTier: "Distinction with Honors 🥇", badge: "🥇 Gold Academic Star", status: "Gold Star" },
        { id: "STU-102", name: "Susmita Sen", score: "88.00%", branch: "v_score >= 75.00", outputTier: "First Class Division 🥈", badge: "🥈 Silver Ribbon", status: "Silver Tier" },
        { id: "STU-104", name: "Debangshu Roy", score: "82.40%", branch: "v_score >= 75.00", outputTier: "First Class Division 🥈", badge: "🥈 Silver Ribbon", status: "Silver Tier" },
      ],
      explanation:
        "The multi-branch `IF` statement evaluates student scores in descending order (`>= 95`, `>= 90`, `>= 75`), short-circuiting on the first matching condition to assign the appropriate honor tier and award badge.",
    },
    tiered_scholarship_discounts: {
      title: "2. Tiered Tuition Fee Discount Calculator (Compound Conditions)",
      badge: "Tiered Discounts",
      badgeColor: "cyan",
      sqlQuery: `-- Calculating compound tiered discounts based on merit score and attendance:
DELIMITER //

CREATE PROCEDURE sp_calculate_scholarship_discount(
    IN p_student_id INT,
    INOUT p_tuition_fee DECIMAL(10,2),
    OUT p_discount_pct DECIMAL(5,2)
)
BEGIN
    DECLARE v_score DECIMAL(5,2);
    DECLARE v_att_pct DECIMAL(5,2);
    
    SELECT exam_score_pct, 95.0 INTO v_score, v_att_pct 
    FROM students WHERE student_id = p_student_id;
    
    -- Compound logical condition branching:
    IF (v_score >= 95.00 AND v_att_pct >= 90.0) THEN
        SET p_discount_pct = 30.00; -- 30% Presidential Scholarship
    ELSEIF (v_score >= 90.00 OR v_att_pct >= 95.0) THEN
        SET p_discount_pct = 20.00; -- 20% Dean's Honor Scholarship
    ELSEIF (v_score >= 80.00) THEN
        SET p_discount_pct = 10.00; -- 10% Merit Concession
    ELSE
        SET p_discount_pct = 0.00;  -- Standard Tuition
    END IF;
    
    -- Apply discount in-place:
    SET p_tuition_fee = p_tuition_fee * (1.00 - (p_discount_pct / 100.0));
END //

DELIMITER ;

SET @fee = 20000.00;
CALL sp_calculate_scholarship_discount(101, @fee, @disc);
SELECT @fee AS discounted_fee, @disc AS discount_pct;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", score: "Score: 94.5% | Att: 95.0%", branch: "(score>=90 OR att>=95)", outputTier: "20% Dean's Scholarship", badge: "Fee: ₹20,000 → ₹16,000", status: "20% Concession" },
      ],
      explanation:
        "Using compound boolean operators (`AND`, `OR`) allows procedures to implement sophisticated multi-criteria business rules such as academic and attendance co-requisites.",
    },
    defensive_payment_validation: {
      title: "3. Defensive Payment Validation & Transaction Control",
      badge: "Defensive Validation",
      badgeColor: "amber",
      sqlQuery: `-- Validating incoming payments defensively to prevent corrupt negative balances:
DELIMITER //

CREATE PROCEDURE sp_record_fee_payment_safe(
    IN p_student_id INT,
    IN p_payment_amount DECIMAL(10,2),
    OUT p_status_code VARCHAR(20),
    OUT p_message VARCHAR(100)
)
BEGIN
    DECLARE v_student_exists INT DEFAULT 0;
    
    -- Validation 1: Amount must be positive:
    IF p_payment_amount &le; 0.00 THEN
        SET p_status_code = 'ERR_INVALID_AMOUNT';
        SET p_message = 'Payment amount must be strictly greater than zero.';
    ELSE
        -- Validation 2: Student must exist in database:
        SELECT COUNT(*) INTO v_student_exists 
        FROM students WHERE student_id = p_student_id;
        
        IF v_student_exists = 0 THEN
            SET p_status_code = 'ERR_STUDENT_NOT_FOUND';
            SET p_message = 'Student ID does not exist in academy registry.';
        ELSE
            -- All validations passed -> Execute payment insert:
            INSERT INTO fee_payments (student_id, amount_paid_inr, payment_date)
            VALUES (p_student_id, p_payment_amount, CURRENT_DATE());
            
            SET p_status_code = 'SUCCESS_200';
            SET p_message = 'Fee payment successfully recorded.';
        END IF;
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Negative Amount", name: "Invalid Payment (₹-500)", score: "Amount <= 0", branch: "Validation 1 Failed", outputTier: "ERR_INVALID_AMOUNT", badge: "Strictly Rejected", status: "Input Blocked" },
        { id: "Valid Payment", name: "Mamata Hui (₹15,000)", score: "Valid Amount & Student", branch: "All Passed", outputTier: "SUCCESS_200", badge: "Payment Recorded", status: "Transaction Confirmed" },
      ],
      explanation:
        "Nested `IF` validations guard database integrity, rejecting invalid amounts or non-existent student IDs before executing any DML operations.",
    },
    procedural_if_vs_ternary_func: {
      title: "4. Procedural IF Statement vs Declarative IF() Ternary Function",
      badge: "Statement vs Function",
      badgeColor: "rose",
      sqlQuery: `-- 1. Declarative IF() Function (Inline in SELECT Queries):
SELECT 
    student_id,
    first_name,
    exam_score_pct,
    IF(exam_score_pct >= 40.0, 'PASS', 'FAIL') AS result_status
FROM students;

-- 2. Procedural IF ... THEN ... END IF Statement (Inside Routines):
-- IF v_score &ge; 40.0 THEN
--     SET p_result = 'PASS';
--     INSERT INTO passed_students VALUES (p_student_id);
-- ELSE
--     SET p_result = 'FAIL';
--     INSERT INTO remediation_queue VALUES (p_student_id);
-- END IF;`,
      resultRows: [
        { id: "Declarative IF() Function", name: "SELECT IF(score>=40, 'P', 'F')", score: "Scalar Expression", branch: "Returns value in column", outputTier: "Used in DQL Queries", badge: "Inline Expression", status: "Query Context" },
        { id: "Procedural IF Statement", name: "IF ... THEN ... END IF", score: "Control Flow Block", branch: "Executes multiple statements", outputTier: "Used inside Routines", badge: "Control Flow", status: "Procedural Context" },
      ],
      explanation:
        "The declarative `IF(cond, t, f)` function evaluates a single scalar expression inside `SELECT` queries; the procedural `IF ... THEN ... END IF;` statement controls multi-statement execution flow inside stored routines.",
    },
  };

  const navItems = [
    { id: "if-concept", label: "1. Procedural IF Syntax" },
    { id: "short-circuit", label: "2. Short-Circuit & Precedence" },
    { id: "svg-diagrams", label: "3. Flowchart & Threshold SVGs" },
    { id: "interactive-sandbox", label: "4. Live Control Flow Workbench" },
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
            <span>Topic 4 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Conditional Control Flow
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Control Flow Statements: IF ... THEN ... ELSEIF ... ELSE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Implement multi-branch business logic in MySQL stored routines. Master <code className="text-cyan-300 font-mono">IF ... THEN ... ELSEIF ... ELSE ... END IF</code> branching, short-circuit evaluation, descending threshold ordering, and defensive transaction validation.
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
        <section id="if-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Procedural IF Statement Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Executing conditional branches and multi-statement blocks in stored routines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`IF condition_1 THEN
    -- Statements executed when condition_1 is TRUE
ELSEIF condition_2 THEN
    -- Statements executed when condition_2 is TRUE
ELSE
    -- Statements executed when all conditions are FALSE or NULL
END IF;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: Short-Circuit & Precedence */}
        <section id="short-circuit" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Short-Circuit Evaluation &amp; Descending Thresholds
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why branch condition ordering dictates mathematical correctness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Short-Circuit Early Termination</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                MySQL evaluates conditions in strict top-to-bottom order. As soon as the first condition evaluates to TRUE, its statements execute and control exits the <code className="text-emerald-300 font-mono">END IF</code> immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Descending Threshold Precedence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When checking numeric ranges with <code className="text-cyan-300 font-mono">>=</code>, always order from highest to lowest (<code className="text-cyan-300 font-mono">>= 90</code>, <code className="text-cyan-300 font-mono">>= 75</code>, <code className="text-cyan-300 font-mono">>= 60</code>) to prevent premature lower-tier matching.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Flowchart &amp; Threshold Precedence
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the conditional branching flowchart and threshold ordering.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Flowchart */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Procedural IF ... ELSEIF ... ELSE Execution Flowchart
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Decision 1 */}
                  <g>
                    <polygon points="120,30 200,80 120,130 40,80" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="120" y="84" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">Score >= 90%?</text>
                  </g>

                  {/* Action 1 (True) */}
                  <g>
                    <rect x="240" y="30" width="160" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Distinction 🥇 (Exit)</text>
                  </g>

                  {/* Decision 2 (False) */}
                  <g>
                    <polygon points="480,30 560,80 480,130 400,80" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="480" y="84" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">Score >= 75%?</text>
                  </g>

                  {/* Action 2 (True) */}
                  <g>
                    <rect x="600" y="30" width="160" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="680" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">First Class 🥈 (Exit)</text>
                  </g>

                  {/* Fallback ELSE (False) */}
                  <g>
                    <rect x="600" y="90" width="160" height="40" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="680" y="115" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">Standard Division</text>
                  </g>

                  {/* Connecting Lines */}
                  <path d="M 200 80 L 240 50" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 120 130 L 400 80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 560 80 L 600 50" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 480 130 L 600 110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Precedence Warning */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Descending Threshold Ordering Mandate
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Correct Descending */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Correct Descending Order (>= 90, >= 75, >= 60)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score 96% matches >= 90% Distinction branch perfectly!</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Mathematically Correct Classification</text>
                  </g>

                  {/* Incorrect Ascending Bug */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Broken Ascending Order (>= 60, >= 75, >= 90)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Score 96% matches >= 60% Second Class and exits! 💥</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">90% Distinction Branch is NEVER Reached!</text>
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
              4. Interactive Control Flow Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test academic honors branching, compound scholarship conditions, defensive payment validation, and IF statement vs function comparisons live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(ifScenarios).map(([key, item]) => {
              const isActive = selectedIfScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedIfScenario(key)}
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
                    {isActive ? "● Active Branch" : "○ Run IF Control Flow"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{ifScenarios[selectedIfScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ifScenarios[selectedIfScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Control Flow Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Control Flow Script</span>
                <span className="text-emerald-400">Short-Circuit Condition Logic</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {ifScenarios[selectedIfScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID / Condition</th>
                    <th className="py-3 px-4 text-white">Student / Request Context</th>
                    <th className="py-3 px-4 text-emerald-400">Score / Evaluated Inputs</th>
                    <th className="py-3 px-4 text-cyan-400">Matched IF Branch</th>
                    <th className="py-3 px-4 text-indigo-400">Assigned Honor / Status</th>
                    <th className="py-3 px-4 text-amber-400">Award Badge / Message</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {ifScenarios[selectedIfScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.score}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.branch}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.outputTier}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.badge}</td>
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
              Real-world academic tier classification and compound scholarship discount rules.
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
                  Automated Academic Honors &amp; Medal Classification in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated semester medal distributions: A stored procedure evaluates student GPA with descending <code className="text-emerald-300 font-mono">IF ... ELSEIF</code> thresholds, automatically inserting students scoring $\ge 95\%$ into the Gold Medallion convocation register while assigning standard honor tiers to all other cohorts in a single transaction!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Automated Honors Trigger:
IF v_score &ge; 95.00 THEN
    INSERT INTO convocation_medals (student_id, medal_type) VALUES (p_id, 'GOLD_MEDALLION');
ELSEIF v_score >= 90.00 THEN
    INSERT INTO convocation_medals (student_id, medal_type) VALUES (p_id, 'SILVER_STAR');
END IF;`}
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
              Avoid threshold inversion bugs and syntax token mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Threshold Inversion Precedence Bug
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Checking <code className="text-rose-300 font-mono">IF v_score >= 60 THEN ...</code> before checking <code className="text-rose-300 font-mono">>= 90</code> causes a 95% topper to match the 60% branch and exit immediately!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always check highest thresholds first (<code className="text-emerald-400 font-mono">>= 95</code>, <code className="text-emerald-400 font-mono">>= 90</code>, <code className="text-emerald-400 font-mono">>= 75</code>)!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Include an ELSE Fallback
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always supply an <code className="text-emerald-400 font-mono">ELSE</code> branch to handle edge conditions or <code className="text-emerald-400 font-mono">NULL</code> evaluations cleanly without leaving output variables unassigned.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees complete condition coverage.
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
              Key takeaways for Control Flow IF Statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> IF Statement Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">IF cond THEN ... ELSEIF ... ELSE ... END IF;</code> syntax.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Order range thresholds in descending order (<code className="text-cyan-300 font-mono">>= 90</code>, <code className="text-cyan-300 font-mono">>= 75</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">NULL</code> conditions evaluate as FALSE and fall through.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always terminate with two words: <code className="text-cyan-300 font-mono">END IF;</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe spelling differences...”</span>
                  MySQL uses `ELSEIF` (one word with an E). Do not confuse it with Oracle's `ELSIF` or VB's `ELSE IF`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about transaction safety...”</span>
                  You can perform defensive validations inside `IF` blocks and trigger `ROLLBACK;` to abort incomplete multi-table transactions!
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
              Comprehensive reference questions covering procedural IF statements, ELSEIF branching, short-circuit logic, descending threshold ordering, and transaction validation.
            </p>
          </div>

          <FAQTemplate
            title="Control Flow IF Statements FAQs"
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
            title="Control Flow Statements: IF ... THEN ... ELSEIF ... ELSE ... END IF"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="Procedural IF statements bring true algorithmic power to SQL routines. Remember the rule of short-circuit evaluation: MySQL executes the first branch that evaluates to TRUE and ignores the rest. Therefore, when checking numeric score or salary ranges, always check the highest thresholds first (>= 90, &ge; 75, >= 60). Always terminate your block with END IF; and include an ELSE fallback for complete safety!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
