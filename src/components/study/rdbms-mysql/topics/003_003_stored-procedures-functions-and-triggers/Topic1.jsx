import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – The DELIMITER Keyword: Why and How to Change Command Terminators
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the DELIMITER command, the semicolon collision problem, Error 1064 diagnosis, client-side vs driver-level parsing, and custom terminator lifecycles.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedDelimiterScenario, setSelectedDelimiterScenario] = useState("semicolon_collision_error1064");

  const delimiterScenarios = {
    semicolon_collision_error1064: {
      title: "1. The Semicolon Collision Problem & Error 1064",
      badge: "Semicolon Collision (Error 1064)",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN: Attempting to create a procedure without changing DELIMITER:
CREATE PROCEDURE sp_register_student(IN p_name VARCHAR(100))
BEGIN
    DECLARE v_id INT; -- 💥 MySQL CLI cuts the statement HERE on the first semicolon!
    SET v_id = 101;
    INSERT INTO students (first_name) VALUES (p_name);
END;

-- 🚨 RESULT FROM MYSQL SERVER:
-- ERROR 1064 (42000): You have an error in your SQL syntax; 
-- check the manual that corresponds to your MySQL server version for the right syntax near '' at line 3`,
      resultRows: [
        { id: "Statement Cut", stage: "Line 3 (`DECLARE v_id INT;`)", parsedText: "Client treats `;` as command end", serverReceived: "Incomplete header fragment", outcome: "💥 Error 1064 (Syntax Error)", status: "Failed Execution" },
        { id: "Dangling Fragment", stage: "Lines 4-6", parsedText: "`SET v_id = 101;` sent as raw query", serverReceived: "Unknown variable error", outcome: "💥 Error 1193 (Unknown System Variable)", status: "Dangling Crash" },
      ],
      explanation:
        "Because the MySQL CLI client interprets the standard semicolon (`;`) as the end of a command, it prematurely cuts the `CREATE PROCEDURE` statement at line 3, sending an incomplete header fragment that triggers Error 1064.",
    },
    custom_delimiter_double_slash: {
      title: "2. The 3-Step Lifecycle with DELIMITER //",
      badge: "DELIMITER // Pattern",
      badgeColor: "emerald",
      sqlQuery: `-- ✅ CORRECT: Using DELIMITER // to encapsulate the full routine:

-- Step 1: Change statement terminator to //
DELIMITER //

-- Step 2: Write complete multi-statement stored procedure:
CREATE PROCEDURE sp_register_student(
    IN p_name VARCHAR(100),
    IN p_dept_id INT,
    OUT p_student_id INT
)
BEGIN
    DECLARE v_new_id INT;
    
    -- Insert student record:
    INSERT INTO students (first_name, dept_id) VALUES (p_name, p_dept_id);
    
    -- Retrieve auto-increment primary key:
    SET v_new_id = LAST_INSERT_ID();
    SET p_student_id = v_new_id;
END // -- 🚀 Client sends the ENTIRE block on //

-- Step 3: Immediately reset delimiter back to standard semicolon:
DELIMITER ;

-- Subsequent standard query runs normally:
CALL sp_register_student('Mamata Hui', 1, @new_id);
SELECT @new_id AS generated_student_id;`,
      resultRows: [
        { id: "Step 1", stage: "DELIMITER //", parsedText: "Terminator changed to `//`", serverReceived: "Client local instruction (Not sent to DB)", outcome: "🟢 Buffer Armed", status: "Armed" },
        { id: "Step 2", stage: "Procedure Body", parsedText: "All internal `;` preserved in buffer", serverReceived: "Entire procedure submitted on `END //`", outcome: "✅ Query OK, 0 rows affected", status: "Procedure Created" },
        { id: "Step 3", stage: "DELIMITER ;", parsedText: "Terminator reset back to `;`", serverReceived: "Client local instruction", outcome: "🟢 Default Restored", status: "Normal SQL Ready" },
      ],
      explanation:
        "Switching to `DELIMITER //` allows the client to buffer all internal variable declarations and INSERT statements, submitting the entire block atomically on `END //` before resetting back to `DELIMITER ;`.",
    },
    database_trigger_double_dollar: {
      title: "3. Creating Audit Triggers with DELIMITER $$",
      badge: "DELIMITER $$ (Triggers)",
      badgeColor: "cyan",
      sqlQuery: `-- Defining an automated student fee audit trigger using DELIMITER $$:
DELIMITER $$

CREATE TRIGGER trg_audit_student_fee_payment
AFTER INSERT ON fee_payments
FOR EACH ROW
BEGIN
    -- Log payment event to audit trail table:
    INSERT INTO fee_payment_audit_log (
        payment_id,
        student_id,
        amount_paid,
        logged_timestamp,
        operator_user
    ) 
    VALUES (
        NEW.payment_id,
        NEW.student_id,
        NEW.amount_paid_inr,
        NOW(),
        USER()
    );
END $$

DELIMITER ;`,
      resultRows: [
        { id: "Trigger DDL", stage: "CREATE TRIGGER trg_audit", parsedText: "Custom terminator `$$`", serverReceived: "Entire Trigger Definition Buffer", outcome: "✅ Query OK, 0 rows affected", status: "Trigger Compiled" },
      ],
      explanation:
        "`DELIMITER $$` is equally popular for creating database triggers that contain internal DML logging statements, ensuring clean compilation without client command collisions.",
    },
    programmatic_drivers_vs_cli: {
      title: "4. Programmatic Drivers (JDBC, PyMySQL, Node) vs CLI Parser",
      badge: "Driver vs CLI Parser",
      badgeColor: "amber",
      sqlQuery: `-- 💡 Programmatic Connectors (Node.js / Python / Java):
-- Programmatic drivers send the SQL string directly over the network protocol.
-- They do NOT need or support the DELIMITER command!

-- In Node.js (mysql2):
-- const sql = \`
--   CREATE PROCEDURE sp_demo()
--   BEGIN
--     DECLARE x INT;
--     SET x = 1;
--   END
-- \`;
-- await connection.query(sql); // ✅ Works directly without DELIMITER!

-- ⚠️ In MySQL CLI or phpMyAdmin:
-- DELIMITER // is mandatory because the CLI parser scans for command terminators.`,
      resultRows: [
        { id: "MySQL CLI / Workbench", stage: "Text Parser Active", parsedText: "Scans text for terminator symbol", serverReceived: "Splits commands on active delimiter", outcome: "Requires `DELIMITER //`", status: "CLI Requirement" },
        { id: "Node.js / PyMySQL / JDBC", stage: "Raw Network Packet", parsedText: "Sends full string as single packet", serverReceived: "Executes directly on server API", outcome: "NO `DELIMITER` Needed", status: "Driver Native" },
      ],
      explanation:
        "`DELIMITER` is purely a client-side text-parsing command for interactive CLI tools. Programmatic drivers like JDBC or PyMySQL send the entire string directly via the network protocol without delimiter switching.",
    },
  };

  const navItems = [
    { id: "delimiter-concept", label: "1. The Semicolon Collision" },
    { id: "delimiter-lifecycle", label: "2. The 3-Step Lifecycle" },
    { id: "svg-diagrams", label: "3. Collision & Lifecycle SVGs" },
    { id: "interactive-sandbox", label: "4. Live Delimiter Workbench" },
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
            <span>Topic 1 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Client-Side Command
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The DELIMITER Keyword: Why &amp; How to Change Terminators
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate Error 1064 syntax errors when creating multi-statement stored procedures, functions, and triggers. Master the client-side delimiter lifecycle (<code className="text-cyan-300 font-mono">DELIMITER //</code> $\to$ <code className="text-cyan-300 font-mono">END //</code> $\to$ <code className="text-cyan-300 font-mono">DELIMITER ;</code>).
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
        <section id="delimiter-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Semicolon Collision Problem
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why the default semicolon breaks multi-statement stored routine definitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>💥</span> Error 1064 Collision
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The client treats the first internal `;` as the command end, cutting the statement in half and throwing a syntax error.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🔄</span> DELIMITER // Solution
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Changes the statement terminator to `//`, allowing the client to buffer all internal statements and submit on `END //`.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🖥️</span> Client-Side Nature
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                `DELIMITER` is a local client instruction for CLI tools; programmatic drivers (JDBC, Node.js) pass SQL directly without it.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Lifecycle */}
        <section id="delimiter-lifecycle" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 3-Step DELIMITER Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The canonical workflow for defining stored routines in MySQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-400">Step 1: Arm Custom Terminator</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                DELIMITER //
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instructs the client to ignore all semicolons until `//` is encountered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400">Step 2: Define Routine &amp; Submit</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
                CREATE PROCEDURE ... END //
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Submits the complete multi-statement routine block to the server atomically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Step 3: Reset Default Terminator</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-amber-300 border border-slate-800">
                DELIMITER ;
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Restores standard semicolon command termination for subsequent queries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Semicolon Collision &amp; Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing client command splitting with the 3-step delimiter lifecycle.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Semicolon Collision */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Semicolon Collision (Premature Cut) vs DELIMITER // Full Buffer
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Default Semicolon Collision */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Default Semicolon Collision (Error 1064)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">CREATE PROC ... DECLARE v INT; [CUT HERE 💥]</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Sent Incomplete Fragment → Server Syntax Crash</text>
                  </g>

                  {/* With DELIMITER // */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ With DELIMITER // (Full Buffer Submitted)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DELIMITER // ... DECLARE v INT; ... END //</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Complete Routine Sent Atomically → Query OK</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: 3-Step Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The 3-Step DELIMITER Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Step 1: DELIMITER // </text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Arm Custom Terminator</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Client ignores internal ;</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Step 2: Routine Body + END // </text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">CREATE PROC ... END // </text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Atomic Packet Sent to Server</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Step 3: DELIMITER ; </text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Reset to Semicolon</text>
                    <text x="705" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">Normal Query Execution</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive DELIMITER Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test semicolon collisions, DELIMITER // workflows, trigger definitions with $$, and driver vs CLI parser distinctions live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(delimiterScenarios).map(([key, item]) => {
              const isActive = selectedDelimiterScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDelimiterScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Delimiter Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{delimiterScenarios[selectedDelimiterScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{delimiterScenarios[selectedDelimiterScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Delimiter Parser Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Delimiter Script</span>
                <span className="text-emerald-400">Client Command Protocol</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {delimiterScenarios[selectedDelimiterScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Step / Stage ID</th>
                    <th className="py-3 px-4 text-white">Parser Stage</th>
                    <th className="py-3 px-4 text-emerald-400">Client Parsing Action</th>
                    <th className="py-3 px-4 text-indigo-400">Server Packet Transmission</th>
                    <th className="py-3 px-4 text-amber-400">Outcome / Return</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {delimiterScenarios[selectedDelimiterScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.stage}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.parsedText}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.serverReceived}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.outcome}</td>
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
              Real-world CI/CD pipeline migration fixes and Flyway delimiter configurations.
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
                  Fixing Broken CI/CD Flyway Stored Procedure Migrations in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy DevOps</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a recurring CI/CD build failure: Stored procedure migration scripts were crashing with Error 1064 during automated deployment because the raw SQL runner was splitting statements on semicolons. Enclosing the script with <code className="text-cyan-300 font-mono">DELIMITER //</code> and resetting with <code className="text-emerald-300 font-mono">DELIMITER ;</code> allowed Flyway to compile the routine seamlessly on staging and production databases!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- V1_4__create_student_enrollment_procedure.sql
DELIMITER //

CREATE PROCEDURE sp_enroll_student_with_ledger(
    IN p_student_name VARCHAR(100),
    IN p_course_id INT
)
BEGIN
    DECLARE v_fee DECIMAL(10,2);
    SELECT fee INTO v_fee FROM courses WHERE id = p_course_id;
    INSERT INTO enrollments (name, course_id, fee) VALUES (p_student_name, p_course_id, v_fee);
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
              Avoid unreset custom delimiters and invalid procedure body usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting to Reset back to DELIMITER ;
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If you create a procedure with `DELIMITER //` and forget to reset to `DELIMITER ;`, subsequent queries like `SELECT * FROM students;` will hang indefinitely waiting for `//` to terminate.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always terminate every procedure script with <code className="text-emerald-400 font-mono">DELIMITER ;</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Avoid Trailing Semicolon on DELIMITER
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">DELIMITER //;</code> accidentally sets the new delimiter symbol to `//;` (including the semicolon). Always write <code className="text-emerald-400 font-mono">DELIMITER //</code> with no trailing semicolon.
              </p>
              <div className="text-xs text-slate-400">
                Prevents accidental multi-character delimiter mistakes.
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
              Key takeaways for the DELIMITER keyword.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> DELIMITER Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Start stored routine files with <code className="text-cyan-300 font-mono">DELIMITER //</code> or <code className="text-cyan-300 font-mono">DELIMITER $$</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>End routine definitions with <code className="text-cyan-300 font-mono">END //</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Immediately reset back to <code className="text-cyan-300 font-mono">DELIMITER ;</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that programmatic drivers (JDBC/Node/Python) do not use DELIMITER.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the distinction between // and $$...”</span>
                  Both `//` and `$$` are equally standard in the MySQL community. Pick one style consistently across your team's migration repository!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about client tool compatibility...”</span>
                  Tools like MySQL Workbench, DBeaver, and phpMyAdmin all support standard DELIMITER directives for multi-statement DDL scripts!
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
              Comprehensive reference questions covering the DELIMITER command, semicolon collisions, Error 1064 diagnosis, and client vs driver parsing.
            </p>
          </div>

          <FAQTemplate
            title="The DELIMITER Keyword FAQs"
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
            title="The DELIMITER Keyword: Why and How to Change Command Terminators"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="The DELIMITER keyword is the very first technical hurdle every developer faces when learning stored procedures. Remember that DELIMITER is not a server-side SQL keyword—it is a client-side instruction that tells the CLI parser not to cut your routine prematurely on internal semicolons. Always follow the 3-step lifecycle: DELIMITER // at the top, END // at the bottom of the routine, and DELIMITER ; to restore normal execution."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
