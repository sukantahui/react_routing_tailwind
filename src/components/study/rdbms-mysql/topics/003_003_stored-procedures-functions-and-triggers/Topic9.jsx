import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Deterministic vs Non-Deterministic Functions and READS SQL DATA Characteristics
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on function determinism, data access characteristics (NO SQL, READS SQL DATA, MODIFIES SQL DATA), Error 1418 diagnosis, binary logging replication safety, and MySQL 8.0 functional indexing.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedDeterminismScenario, setSelectedDeterminismScenario] = useState("pure_deterministic_gst");

  const determinismScenarios = {
    pure_deterministic_gst: {
      title: "1. Pure Deterministic Function: GST Math (DETERMINISTIC NO SQL)",
      badge: "DETERMINISTIC (Pure Math)",
      badgeColor: "emerald",
      sqlQuery: `-- Pure Deterministic Function: Same input ALWAYS returns identical output:
DELIMITER //

CREATE FUNCTION fn_calculate_pure_gst(
    p_amount DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
NO SQL
COMMENT 'Pure math: 18% GST calculation'
BEGIN
    RETURN ROUND(p_amount * 0.18, 2);
END //

DELIMITER ;

-- ✅ Safe for Binary Log Replication & MySQL 8.0 Functional Indexes:
CREATE INDEX idx_student_fee_gst ON student_ledgers ((fn_calculate_pure_gst(base_fee_inr)));

SELECT student_name, base_fee_inr, fn_calculate_pure_gst(base_fee_inr) AS gst_amount FROM student_ledgers;`,
      resultRows: [
        { id: "Pure Deterministic", inputVal: "₹20,000.00 Base Fee", determinism: "DETERMINISTIC", dataAccess: "NO SQL", replication: "✅ Safe for SBR Replication", indexSupport: "✅ Functional Index Supported", status: "Optimal" },
        { id: "Pure Deterministic", inputVal: "₹10,000.00 Base Fee", determinism: "DETERMINISTIC", dataAccess: "NO SQL", replication: "✅ Safe for SBR Replication", indexSupport: "✅ Functional Index Supported", status: "Optimal" },
      ],
      explanation:
        "Because `fn_calculate_pure_gst` relies strictly on mathematical input arguments without reading system clocks or tables, it is declared `DETERMINISTIC NO SQL`. It is 100% safe for replication and can be indexed.",
    },
    non_deterministic_age: {
      title: "2. Non-Deterministic Function: Age from DOB (NOT DETERMINISTIC NO SQL)",
      badge: "NOT DETERMINISTIC (Temporal)",
      badgeColor: "amber",
      sqlQuery: `-- Non-Deterministic: Output changes over time as CURDATE() advances:
DELIMITER //

CREATE FUNCTION fn_calculate_student_age_temporal(
    p_dob DATE
)
RETURNS INT
NOT DETERMINISTIC
NO SQL
COMMENT 'Temporal calculation using CURDATE()'
BEGIN
    IF p_dob IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN TIMESTAMPDIFF(YEAR, p_dob, CURDATE());
END //

DELIMITER ;

-- ⚠️ NOT ALLOWED IN FUNCTIONAL INDEXES:
-- CREATE INDEX idx_age ON students ((fn_calculate_student_age_temporal(dob)));
-- 🚨 ERROR 3757 (HY000): Cannot use non-deterministic function in functional index!`,
      resultRows: [
        { id: "DOB: 2004-05-14", inputVal: "Depends on CURDATE()", determinism: "NOT DETERMINISTIC", dataAccess: "NO SQL", replication: "⚠️ Requires Row-Based Replication", indexSupport: "❌ Blocked (Error 3757)", status: "Temporal Dynamic" },
      ],
      explanation:
        "Functions that call `CURDATE()`, `NOW()`, `RAND()`, or `UUID()` are `NOT DETERMINISTIC`. MySQL forbids creating functional indexes on non-deterministic functions to prevent index corruption.",
    },
    reads_sql_data_lookup: {
      title: "3. Database Reading Function: Department Discount (READS SQL DATA)",
      badge: "READS SQL DATA",
      badgeColor: "cyan",
      sqlQuery: `-- Function that reads mutable database tables via SELECT ... INTO:
DELIMITER //

CREATE FUNCTION fn_get_department_scholarship_rate(
    p_dept_id INT
)
RETURNS DECIMAL(5,2)
NOT DETERMINISTIC
READS SQL DATA
COMMENT 'Reads scholarship percentage from departments table'
BEGIN
    DECLARE v_rate DECIMAL(5,2) DEFAULT 0.00;
    
    SELECT scholarship_discount_pct INTO v_rate 
    FROM departments WHERE dept_id = p_dept_id;
    
    RETURN v_rate;
END //

DELIMITER ;

SELECT s.student_name, fn_get_department_scholarship_rate(s.dept_id) AS dept_disc_pct FROM students s;`,
      resultRows: [
        { id: "Dept 1 (CS)", inputVal: "Dept ID = 1", determinism: "NOT DETERMINISTIC", dataAccess: "READS SQL DATA", replication: "✅ Declared Safely", indexSupport: "❌ Table Dependent", status: "Table Query Active" },
      ],
      explanation:
        "When a function reads database tables using `SELECT ... INTO`, it MUST declare `READS SQL DATA` and `NOT DETERMINISTIC` (because table rows may be updated at any time).",
    },
    error1418_replication_safety: {
      title: "4. Error 1418 Diagnosis & Binary Log Replication Safety Fix",
      badge: "Error 1418 Safety",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN FUNCTION CREATION (When log_bin is enabled):
-- CREATE FUNCTION fn_broken_test(x INT) RETURNS INT BEGIN RETURN x * 2; END;
-- 🚨 ERROR 1418 (HY000): This function has none of DETERMINISTIC, NO SQL, 
-- or READS SQL DATA in its declaration and binary logging is enabled!

-- ✅ DEFENSIVE REPLICATION FIX:
DELIMITER //
CREATE FUNCTION fn_fixed_test(x INT) 
RETURNS INT 
DETERMINISTIC 
NO SQL 
BEGIN 
    RETURN x * 2; 
END //
DELIMITER ;

-- Or set global administrative trust:
-- SET GLOBAL log_bin_trust_function_creators = 1;`,
      resultRows: [
        { id: "Omitted Characteristics", inputVal: "log_bin = ON", determinism: "Missing Declaration", dataAccess: "Default CONTAINS SQL", replication: "💥 Error 1418 (Blocked)", indexSupport: "Blocked", status: "Replication Alert" },
        { id: "Declared DETERMINISTIC", inputVal: "log_bin = ON", determinism: "DETERMINISTIC", dataAccess: "NO SQL", replication: "✅ Compiled & Replicated Cleanly", indexSupport: "Enabled", status: "Production Ready" },
      ],
      explanation:
        "MySQL enforces `Error 1418` to protect binary log replication from data corruption. Declaring `DETERMINISTIC NO SQL` satisfies the replication safety validator.",
    },
  };

  const navItems = [
    { id: "determinism-concept", label: "1. Determinism Contract" },
    { id: "data-access", label: "2. SQL Data Characteristics" },
    { id: "svg-diagrams", label: "3. Spectrum & Replication SVGs" },
    { id: "interactive-sandbox", label: "4. Live Determinism Workbench" },
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
            <span>Topic 9 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Replication &amp; Indexing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Deterministic vs Non-Deterministic Functions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master routine determinism and data access characteristics. Understand <code className="text-cyan-300 font-mono">DETERMINISTIC</code> vs <code className="text-cyan-300 font-mono">NOT DETERMINISTIC</code>, <code className="text-cyan-300 font-mono">NO SQL</code>, <code className="text-cyan-300 font-mono">READS SQL DATA</code>, <code className="text-rose-400 font-mono">Error 1418</code> binary log replication safety, and MySQL 8.0 functional indexing.
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
        {/* SECTION 1: Determinism Contract */}
        <section id="determinism-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Function Determinism Contract
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Predictability guarantees in relational server-side computation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. DETERMINISTIC</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Given the exact same input parameters, the function ALWAYS returns the exact same result. Required for MySQL 8.0 Functional Indexes and Statement-Based Replication safety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400">2. NOT DETERMINISTIC</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Output may vary across invocations even with identical arguments (e.g. calling <code className="text-amber-300 font-mono">NOW()</code>, <code className="text-amber-300 font-mono">RAND()</code>, <code className="text-amber-300 font-mono">UUID()</code>, or reading mutable tables).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Data Access Characteristics */}
        <section id="data-access" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. SQL Data Access Characteristics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Classifying database interaction behavior for query planning and replication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 font-mono">NO SQL</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contains zero SQL statements. Pure in-memory math, string parsing, or date formulas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 font-mono">READS SQL DATA</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reads database tables using <code className="text-cyan-300 font-mono">SELECT ... INTO</code> without executing any DML updates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 font-mono">MODIFIES SQL DATA</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes <code className="text-amber-300 font-mono">INSERT</code>, <code className="text-amber-300 font-mono">UPDATE</code>, or <code className="text-amber-300 font-mono">DELETE</code> statements altering table state.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 font-mono">CONTAINS SQL</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contains SQL statements (e.g. <code className="text-indigo-300 font-mono">SET @x = 1</code>) that neither read nor write tables (default).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Determinism Spectrum &amp; Replication Safety
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pure mathematical determinism with binary log replication safety.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Determinism Spectrum */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Determinism Spectrum in MySQL Functions
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Deterministic */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">DETERMINISTIC (Pure Formula)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">f(x) = y (100% Predictable • Constant Folding)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">✅ Allowed in Functional Indexes &amp; SBR Replication</text>
                  </g>

                  {/* Non-Deterministic */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">NOT DETERMINISTIC (Dynamic State)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1c1917" />
                    <text x="630" y="88" fill="#fde68a" fontSize="8 font-mono" textAnchor="middle">f(x, NOW(), RAND()) = Variable Output</text>
                    <text x="630" y="102" fill="#f59e0b" fontSize="7 font-bold" textAnchor="middle">❌ Blocked in Functional Indexes (Error 3757)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Replication Error 1418 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Binary Logging Safety (Error 1418 Guardrail)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Without Declaration */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Omitted Characteristic (Binary Log Enabled)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">log_bin = ON (No DETERMINISTIC / READS SQL DATA)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Throws Error 1418 (Prevents Replica Data Drift)</text>
                  </g>

                  {/* Declared Safe */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Declared DETERMINISTIC NO SQL (Safe)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Explicit Characteristic Declared</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Clean Binary Log Replay across all Replica Nodes</text>
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
              4. Interactive Determinism Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test pure deterministic math, temporal age calculators, READS SQL DATA table lookups, and Error 1418 replication safety live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(determinismScenarios).map(([key, item]) => {
              const isActive = selectedDeterminismScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDeterminismScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Determinism Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{determinismScenarios[selectedDeterminismScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{determinismScenarios[selectedDeterminismScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Function Contract Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Function Contract Script</span>
                <span className="text-emerald-400">Metadata DDL Verification</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {determinismScenarios[selectedDeterminismScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Function Category / ID</th>
                    <th className="py-3 px-4 text-white">Input Dependency Context</th>
                    <th className="py-3 px-4 text-emerald-400">Determinism Flag</th>
                    <th className="py-3 px-4 text-cyan-400">SQL Data Access</th>
                    <th className="py-3 px-4 text-indigo-400">Binary Log Replication</th>
                    <th className="py-3 px-4 text-amber-400">MySQL 8.0 Functional Index</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {determinismScenarios[selectedDeterminismScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.inputVal}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.determinism}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.dataAccess}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.replication}</td>
                      <td className="py-3 px-4 text-amber-300">{row.indexSupport}</td>
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
              Real-world replication fixes and functional index acceleration.
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
                  Eliminating Replication Drift in Barrackpore Academy Read Replicas
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Cloud Cluster</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a multi-region MySQL replica cluster: Student fee invoice numbers calculated on the Primary node were computing differently on read replica nodes because the currency conversion function was missing the <code className="text-cyan-300 font-mono">DETERMINISTIC NO SQL</code> characteristic. Adding the explicit characteristic eliminated replication drift completely!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Replication-Safe Production Function:
CREATE FUNCTION fn_convert_inr_to_usd(p_amt DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
NO SQL
BEGIN
    RETURN ROUND(p_amt / 86.50, 2);
END;`}
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
              Avoid false determinism declarations and functional index errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Falsely Declaring Functions as DETERMINISTIC
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Declaring a function that calls <code className="text-rose-300 font-mono">NOW()</code> or reads mutable tables as `DETERMINISTIC` can cause the optimizer to cache stale results or corrupt B-Tree functional indexes!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Accurately declare <code className="text-emerald-400 font-mono">NOT DETERMINISTIC READS SQL DATA</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Specify Characteristics for log_bin Safety
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify determinism and data access characteristics (<code className="text-emerald-400 font-mono">DETERMINISTIC NO SQL</code>) to prevent Error 1418 when binary logging is active.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees seamless CI/CD database deployments.
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
              Key takeaways for Function Determinism &amp; Characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Determinism Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DETERMINISTIC</code> for pure in-memory math and string formatting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">NOT DETERMINISTIC</code> when calling `NOW()`, `RAND()`, or reading tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Specify <code className="text-cyan-300 font-mono">NO SQL</code> or <code className="text-cyan-300 font-mono">READS SQL DATA</code> to satisfy Error 1418.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that only <code className="text-cyan-300 font-mono">DETERMINISTIC</code> functions can be indexed in MySQL 8.0.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe constant folding...”</span>
                  For deterministic functions called with constant literals, the MySQL Query Optimizer computes the output once during query planning rather than evaluating it for every single row!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about functional indexes...”</span>
                  Combine `DETERMINISTIC NO SQL` functions with `CREATE INDEX ... ((fn(col)))` in MySQL 8.0 to turn slow full-table scans into instant B-Tree index range lookups!
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
              Comprehensive reference questions covering determinism contracts, data access characteristics, Error 1418 diagnosis, binary logging replication safety, and MySQL 8.0 functional indexing.
            </p>
          </div>

          <FAQTemplate
            title="Deterministic Functions &amp; Characteristics FAQs"
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
            title="Deterministic vs Non-Deterministic Functions and READS SQL DATA Characteristics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Declaring the correct determinism and data access characteristics on stored functions is not just good documentation—it is an absolute requirement for database replication safety and query optimizer indexing in MySQL. Always declare DETERMINISTIC NO SQL for pure mathematical calculations to satisfy Error 1418 replication guardrails and enable high-speed Functional Indexes in MySQL 8.0!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
