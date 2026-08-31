import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Managing Procedures, Functions, and Triggers (SHOW, ALTER, DROP)
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on routine metadata inspection, ALTER constraints, DROP IF EXISTS idempotent scripts, DEFINER/INVOKER security models, and Error 1449 troubleshooting.
 */
const Topic14 = () => {
  // Interactive Simulator State
  const [selectedManagementScenario, setSelectedManagementScenario] = useState("metadata_discovery_inspection");

  const managementScenarios = {
    metadata_discovery_inspection: {
      title: "1. Discovery & Inspection: SHOW & information_schema Queries",
      badge: "Inspection & Auditing",
      badgeColor: "emerald",
      sqlQuery: `-- 1. List all procedures and functions in the current database:
SHOW PROCEDURE STATUS WHERE Db = DATABASE();
SHOW FUNCTION STATUS WHERE Db = DATABASE();
SHOW TRIGGERS;

-- 2. Inspect full DDL creation source code:
SHOW CREATE PROCEDURE sp_calculate_student_fees;
SHOW CREATE FUNCTION fn_compute_pure_gst;
SHOW CREATE TRIGGER trg_audit_fee_payments;

-- 3. Query system data dictionary for security & modification dates:
SELECT 
    ROUTINE_NAME, 
    ROUTINE_TYPE, 
    DEFINER, 
    SECURITY_TYPE, 
    IS_DETERMINISTIC, 
    LAST_ALTERED 
FROM information_schema.ROUTINES 
WHERE ROUTINE_SCHEMA = DATABASE();`,
      resultRows: [
        { id: "sp_calculate_fees", type: "PROCEDURE", definer: "admin@localhost", secType: "DEFINER", deterministic: "NO", status: "Active in Production" },
        { id: "fn_compute_gst", type: "FUNCTION", definer: "admin@localhost", secType: "DEFINER", deterministic: "YES", status: "Active in Production" },
        { id: "trg_audit_payments", type: "TRIGGER", definer: "admin@localhost", secType: "DEFINER", deterministic: "N/A", status: "Attached to fee_payments" },
      ],
      explanation:
        "Inspection commands allow developers and auditors to explore all routines, verify determinism flags, check security models, and retrieve original DDL source scripts.",
    },
    alter_routine_metadata: {
      title: "2. Routine Alteration Limits: ALTER PROCEDURE / FUNCTION",
      badge: "ALTER Constraints",
      badgeColor: "cyan",
      sqlQuery: `-- ⚠️ WHAT ALTER CAN DO: Alter metadata ONLY (Comment & SQL SECURITY):
ALTER PROCEDURE sp_calculate_student_fees 
COMMENT 'Calculates semester tuition and applies scholarship discounts'
SQL SECURITY INVOKER;

ALTER FUNCTION fn_compute_pure_gst 
COMMENT 'Calculates 18% GST tax rate';

-- 🚨 WHAT ALTER CANNOT DO:
-- You CANNOT alter parameters, variable types, or the procedural BEGIN...END body!
-- There is NO 'ALTER TRIGGER' statement in MySQL!
-- To change procedural logic: Must DROP and re-CREATE!`,
      resultRows: [
        { id: "ALTER PROCEDURE", scope: "COMMENT & SQL SECURITY", canChangeBody: "NO ❌", canChangeParams: "NO ❌", triggerSupport: "NO (No ALTER TRIGGER) ❌", status: "Metadata Altered" },
      ],
      explanation:
        "`ALTER PROCEDURE` and `ALTER FUNCTION` can only modify comments and security types. To change code logic, parameters, or triggers, you must drop and recreate them.",
    },
    idempotent_cicd_deployment: {
      title: "3. Idempotent CI/CD Migration: DROP IF EXISTS + CREATE Pattern",
      badge: "Idempotent CI/CD",
      badgeColor: "indigo",
      sqlQuery: `-- Production-Grade Idempotent Deployment Script for CI/CD Pipelines:
-- Step 1: Idempotently remove existing routine:
DROP PROCEDURE IF EXISTS sp_enroll_student_batch;

-- Step 2: Buffer semicolons with custom delimiter:
DELIMITER //

-- Step 3: Create routine with explicit DEFINER and COMMENT:
CREATE DEFINER = 'admin_user'@'%' PROCEDURE sp_enroll_student_batch(
    IN p_dept_id INT,
    OUT p_total_enrolled INT
)
SQL SECURITY DEFINER
COMMENT 'Batch enrollment processor v2.4'
BEGIN
    SELECT COUNT(*) INTO p_total_enrolled 
    FROM students WHERE dept_id = p_dept_id;
END //

-- Step 4: Restore default semicolon delimiter:
DELIMITER ;`,
      resultRows: [
        { id: "Migration Step 1", action: "DROP PROCEDURE IF EXISTS", impact: "Eliminates duplicate object errors", status: "Idempotent" },
        { id: "Migration Step 2", action: "DELIMITER //", impact: "Buffers internal semicolons", status: "Syntax Safe" },
        { id: "Migration Step 3", action: "CREATE DEFINER = ...", impact: "Deploys verified version", status: "Deployed" },
        { id: "Migration Step 4", action: "DELIMITER ;", impact: "Restores standard terminal state", status: "Cleaned" },
      ],
      explanation:
        "Structuring migrations with `DROP ... IF EXISTS` followed by `DELIMITER //` and `CREATE` guarantees repeatable, zero-failure CI/CD database deployments.",
    },
    error1449_orphaned_definer: {
      title: "4. Orphaned Definer Diagnosis & Resolution (Error 1449)",
      badge: "Error 1449 Fix",
      badgeColor: "rose",
      sqlQuery: `-- 🚨 ORPHANED DEFINER SCENARIO:
-- A developer created a procedure as 'john_dev'@'%'.
-- When 'john_dev' leaves the company and their MySQL user account is deleted:
-- 💥 CALL sp_calculate_fees();
-- ERROR 1449 (HY000): The user specified as a definer ('john_dev'@'%') does not exist!

-- ✅ SENIOR FIX: Drop and re-create under an active service account definer:
DROP PROCEDURE IF EXISTS sp_calculate_fees;

DELIMITER //
CREATE DEFINER = 'app_service'@'%' PROCEDURE sp_calculate_fees()
SQL SECURITY DEFINER
BEGIN
    SELECT 'Fixed Definership!' AS status;
END //
DELIMITER ;`,
      resultRows: [
        { id: "Deleted User Account", cause: "Creator 'john_dev' dropped", errorOutput: "Error 1449: Definer does not exist", resolution: "Re-create with active service account", status: "Repaired Cleanly" },
      ],
      explanation:
        "When routine definer accounts are deleted from MySQL, execution fails with Error 1449. Recreating routines with a dedicated `app_service` definer prevents orphaned routine outages.",
    },
  };

  const navItems = [
    { id: "management-commands", label: "1. Inspection & SHOW" },
    { id: "alter-constraints", label: "2. ALTER vs DROP/CREATE" },
    { id: "svg-diagrams", label: "3. Lifecycle & Security SVGs" },
    { id: "interactive-sandbox", label: "4. Live Management Workbench" },
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
            <span>Topic 14 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Lifecycle &amp; Security
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Managing Procedures, Functions, and Triggers
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Administer server-side database routines and triggers. Master metadata inspection (<code className="text-cyan-300 font-mono">SHOW</code> &amp; <code className="text-cyan-300 font-mono">information_schema</code>), <code className="text-cyan-300 font-mono">ALTER</code> limitations, idempotent CI/CD migration scripts, and <code className="text-rose-400 font-mono">Error 1449</code> orphaned definer resolutions.
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
        {/* SECTION 1: Commands */}
        <section id="management-commands" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Metadata Inspection &amp; Discovery Commands
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Listing, filtering, and auditing routines and triggers in MySQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 font-mono">1. List Status</div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SHOW PROCEDURE STATUS;
SHOW FUNCTION STATUS;
SHOW TRIGGERS;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono">2. View DDL Source</div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SHOW CREATE PROCEDURE p;
SHOW CREATE FUNCTION f;
SHOW CREATE TRIGGER t;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-400 font-mono">3. System Data Dictionary</div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT * FROM 
information_schema.ROUTINES;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: Alteration Limits */}
        <section id="alter-constraints" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. ALTER Constraints vs DROP &amp; CREATE
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding what ALTER can and cannot modify in MySQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>✓</span> What ALTER CAN Modify
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Routine description comment (<code className="text-emerald-300 font-mono">COMMENT '...'</code>).</li>
                <li>• Security execution model (<code className="text-emerald-300 font-mono">SQL SECURITY INVOKER</code>).</li>
                <li>• Data access characteristic declarations.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> What ALTER CANNOT Modify
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Cannot modify routine body (<code className="text-rose-300 font-mono">BEGIN...END</code>).</li>
                <li>• Cannot modify parameter types or counts.</li>
                <li>• There is NO <code className="text-rose-300 font-mono">ALTER TRIGGER</code> statement in MySQL!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Routine Lifecycle &amp; Security Models
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing routine lifecycle management and DEFINER vs INVOKER security.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Routine Management Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. Discovery / Audit</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="110" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SHOW CREATE / STATUS</text>
                    <text x="110" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">information_schema</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">2. Metadata Update</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="320" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">ALTER PROCEDURE</text>
                    <text x="320" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">COMMENT &amp; SECURITY</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="440" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="535" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3. Logic Re-Creation</text>
                    <rect x="450" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="535" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DROP IF EXISTS → CREATE</text>
                    <text x="535" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Idempotent CI/CD Script</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">4. Safe Deletion</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">DROP {`{PROC|FUNC|TRG}`}</text>
                    <text x="740" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Clean Purge</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 80 L 440 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 630 80 L 650 80" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: DEFINER vs INVOKER */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Security Execution Models (DEFINER vs INVOKER)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* DEFINER */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">SQL SECURITY DEFINER (Default)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Runs with Creator's Elevated Privileges</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Encapsulates sensitive tables via API access</text>
                  </g>

                  {/* INVOKER */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">SQL SECURITY INVOKER</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Runs with Caller's Actual Privileges</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Rejects query if caller lacks table access</text>
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
              4. Interactive Routine Management Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test metadata discovery, ALTER constraints, idempotent CI/CD migration scripts, and Error 1449 orphaned definer fixes live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(managementScenarios).map(([key, item]) => {
              const isActive = selectedManagementScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedManagementScenario(key)}
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
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Architecture" : "○ Run Management Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{managementScenarios[selectedManagementScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{managementScenarios[selectedManagementScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Routine Admin Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Routine Management Script</span>
                <span className="text-emerald-400">DDL Administrative Command</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {managementScenarios[selectedManagementScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Routine ID / Action</th>
                    <th className="py-3 px-4 text-white">Routine Type / Scope</th>
                    <th className="py-3 px-4 text-emerald-400">Definer / Modification Target</th>
                    <th className="py-3 px-4 text-cyan-400">Security / Output</th>
                    <th className="py-3 px-4 text-indigo-400">Determinism / Impact</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {managementScenarios[selectedManagementScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.type || row.action || row.scope}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.definer || row.canChangeBody || row.cause}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.secType || row.canChangeParams || row.errorOutput}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.deterministic || row.impact || row.resolution}</td>
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
              Real-world orphaned definer fixes and idempotent CI/CD deployments.
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
                  Eliminating Orphaned Definer Error 1449 Outages at Barrackpore Academy
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Cloud Cluster</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a critical production failure: An offshore contractor who built the fee calculation procedure was deleted from MySQL, causing every fee invoice to crash with <code className="text-rose-400 font-mono">Error 1449: Definer does not exist</code>. Refactoring the DDL to use a dedicated permanent <code className="text-emerald-300 font-mono">DEFINER = 'app_service'@'%'</code> completely resolved the vulnerability!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Service Definer Standardization:
CREATE DEFINER = 'app_service'@'%' PROCEDURE sp_calc_fees()
SQL SECURITY DEFINER
BEGIN
    -- Unbreakable routine execution independent of developer user accounts
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
              Avoid non-existent ALTER TRIGGER statements and orphaned definers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Expecting ALTER to Modify Code or Triggers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `ALTER PROCEDURE` cannot change procedural bodies or parameters, and there is no `ALTER TRIGGER` in MySQL.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always use the idempotent <code className="text-emerald-400 font-mono">DROP IF EXISTS</code> + <code className="text-emerald-400 font-mono">CREATE</code> pattern!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Use Dedicated Service DEFINER Accounts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never deploy routines under personal developer usernames. Use permanent service accounts to prevent Error 1449 when employees depart.
              </p>
              <div className="text-xs text-slate-400">
                Ensures zero-downtime routine definership.
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
              Key takeaways for Managing Procedures, Functions &amp; Triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Routine Management Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SHOW CREATE</code> to inspect complete routine and trigger DDL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">ALTER</code> only modifies metadata (COMMENT/SECURITY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Structure CI/CD scripts with <code className="text-cyan-300 font-mono">DROP IF EXISTS</code> + <code className="text-cyan-300 font-mono">CREATE</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use service definer accounts to prevent Error 1449 orphaned routines.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe data dictionary audits...”</span>
                  Query `information_schema.ROUTINES` to find routines modified recently or identify procedures with missing determinism flags!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about least-privilege security...”</span>
                  Grant `EXECUTE ON PROCEDURE` to application users without giving them direct `SELECT`/`UPDATE` permissions on sensitive tables!
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
              Comprehensive reference questions covering routine metadata inspection, ALTER constraints, DROP IF EXISTS idempotent scripts, DEFINER/INVOKER security models, and Error 1449 troubleshooting.
            </p>
          </div>

          <FAQTemplate
            title="Managing Procedures, Functions &amp; Triggers FAQs"
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
            title="Managing Procedures, Functions, and Triggers (SHOW, ALTER, DROP)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic14_note.txt"
          />

          <Teacher
            note="Managing database routines across production lifecycles requires strict discipline. Remember that ALTER PROCEDURE only changes metadata like COMMENT and SQL SECURITY, never the procedural code itself. Always structure your CI/CD migrations with DROP IF EXISTS followed by DELIMITER // and CREATE, and always bind routines to dedicated service definer accounts to prevent Error 1449 orphaned definer outages!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic14;
