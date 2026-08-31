import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Managing View Security: SQL SECURITY DEFINER vs INVOKER
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on view security contexts, DEFINER vs INVOKER modes, and Error 1449 mitigation.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("definer_mode_success");

  const securityScenarios = {
    definer_mode_success: {
      title: "1. SQL SECURITY DEFINER (Data Masking & Privilege Elevation)",
      badge: "Security Firewall Active",
      badgeColor: "emerald",
      sqlQuery: `-- View created by DBA with DEFINER mode:
CREATE OR REPLACE 
DEFINER = 'dba_admin'@'localhost'
SQL SECURITY DEFINER
VIEW view_sanitized_student_directory AS
SELECT 
    student_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    course_stream,
    centre_city
FROM student_master_secure
WHERE is_active = 1;

-- Clerk user has NO PERMISSION on 'student_master_secure', 
-- but HAS SELECT permission on the view:
-- Execution succeeds using dba_admin's base table clearance!
SELECT * FROM view_sanitized_student_directory;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", clearance: "Caller: clerk_user", outcome: "✓ 200 OK (Executed via dba_admin Definer)" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "Barrackpore", clearance: "Caller: clerk_user", outcome: "✓ 200 OK (Executed via dba_admin Definer)" },
        { id: "STU-103", name: "Abhronila Saha", stream: "Python Data Science", city: "Kolkata Central", clearance: "Caller: clerk_user", outcome: "✓ 200 OK (Executed via dba_admin Definer)" },
      ],
      explanation:
        "In DEFINER mode, MySQL evaluates permissions on the underlying base tables using the view creator's credentials (dba_admin). The clerk_user safely reads sanitized data without gaining raw base table access.",
    },
    invoker_mode_denied: {
      title: "2. SQL SECURITY INVOKER (Base Table Permission Check Fails)",
      badge: "Error 1142 (Access Denied)",
      badgeColor: "rose",
      sqlQuery: `-- View created with INVOKER mode:
CREATE OR REPLACE 
SQL SECURITY INVOKER
VIEW view_internal_developer_shortcut AS
SELECT * FROM confidential_financial_ledger;

-- Clerk user (who lacks SELECT permission on confidential_financial_ledger) queries view:
SELECT * FROM view_internal_developer_shortcut;

-- Outcome: MySQL blocks the query immediately!`,
      resultRows: [
        { id: "ERROR 1142", name: "clerk_user@%", stream: "confidential_financial_ledger", city: "SELECT Denied", clearance: "Caller: clerk_user", outcome: "❌ Error 1142: SELECT command denied to user 'clerk_user' for table 'confidential_financial_ledger'" },
      ],
      explanation:
        "In INVOKER mode, MySQL evaluates base table permissions against the user currently calling the query. Because clerk_user lacks base table grants, the query fails with Error 1142.",
    },
    orphaned_definer_error: {
      title: "3. The 'Orphaned DEFINER' Failure (Error 1449 & Resolution)",
      badge: "Error 1449 Outage & Fix",
      badgeColor: "amber",
      sqlQuery: `-- ⚠️ Problem: View was created by 'dev_rahul'@'localhost', who left the company:
-- DROP USER 'dev_rahul'@'localhost';
-- Now when anyone queries the view:
SELECT * FROM view_student_roster;
-- ❌ Throws Error 1449: The user specified as a definer ('dev_rahul'@'localhost') does not exist!

-- ✓ Senior Developer Solution: Reassign DEFINER to a persistent service account:
ALTER DEFINER = 'service_view_definer'@'localhost'
VIEW view_student_roster AS
SELECT student_id, student_name, centre_city FROM students;`,
      resultRows: [
        { id: "REPAIR", name: "DEFINER Reassigned", stream: "service_view_definer@localhost", city: "Barrackpore & Kol", clearance: "Service Account", outcome: "✓ Error 1449 Resolved (View Fully Operational)" },
      ],
      explanation:
        "When an employee's personal database user is dropped, any DEFINER views they created break with Error 1449. Best practice: Always use permanent system service accounts as DEFINERs.",
    },
    audit_view_security: {
      title: "4. Auditing DEFINER & SECURITY_TYPE in information_schema.VIEWS",
      badge: "Compliance Catalog Audit",
      badgeColor: "indigo",
      sqlQuery: `-- Audit all view security modes across production schemas:
SELECT 
    TABLE_SCHEMA AS database_name,
    TABLE_NAME AS view_name,
    DEFINER AS object_owner,
    SECURITY_TYPE AS security_mode,
    IS_UPDATABLE
FROM information_schema.VIEWS
WHERE TABLE_SCHEMA NOT IN ('information_schema', 'mysql', 'sys', 'performance_schema')
ORDER BY SECURITY_TYPE DESC, TABLE_NAME ASC;`,
      resultRows: [
        { id: "academy_db", name: "view_sanitized_student_directory", stream: "dba_admin@localhost", city: "DEFINER", clearance: "Updatable: NO", outcome: "✓ Compliant (Masked)" },
        { id: "academy_db", name: "view_internal_shortcut", stream: "developer@localhost", city: "INVOKER", clearance: "Updatable: NO", outcome: "✓ Compliant (Invoker)" },
      ],
      explanation:
        "Querying information_schema.VIEWS allows security teams to verify that no views inadvertently run with elevated root privileges or deleted definer accounts.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Security Contexts Overview" },
    { id: "definer-vs-invoker", label: "2. DEFINER vs INVOKER Mechanics" },
    { id: "svg-diagrams", label: "3. Architecture & Permission SVGs" },
    { id: "interactive-sandbox", label: "4. Live Security Workbench" },
    { id: "orphaned-definer", label: "5. The Orphaned DEFINER (Error 1449)" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 5 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Access Control & Security
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Managing View Security: SQL SECURITY DEFINER vs INVOKER
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Configure robust database security boundaries. Understand how{" "}
            <code className="text-emerald-300 font-mono font-bold">SQL SECURITY DEFINER</code> enables column data masking while{" "}
            <code className="text-cyan-300 font-mono font-bold">SQL SECURITY INVOKER</code> enforces strict caller permissions, and prevent production{" "}
            <code className="text-rose-400 font-mono font-bold">Error 1449</code> outages.
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
        {/* SECTION 1: Overview */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Two Security Execution Contexts
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Controlling whose permissions are checked when a view accesses physical base tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  DEFAULT
                </span>
                <h3 className="text-lg font-bold text-white">SQL SECURITY DEFINER</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The view executes under the authority of the user who defined it (<code className="text-emerald-300 font-mono">DEFINER = user@host</code>).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Callers do NOT need permissions on the underlying base tables.</li>
                <li>Ideal for data masking, PII protection, and restricted portals.</li>
                <li>Acts as an unbreachable security firewall.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-xs font-bold border border-cyan-800">
                  EXPLICIT
                </span>
                <h3 className="text-lg font-bold text-white">SQL SECURITY INVOKER</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The view executes under the authority of the user currently querying it (<code className="text-cyan-300 font-mono">INVOKER</code>).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Callers MUST possess direct <code className="text-cyan-300 font-mono">SELECT</code> permissions on all base tables.</li>
                <li>Ideal for developer query shortcuts and ad-hoc team queries.</li>
                <li>Zero risk of unintended privilege escalation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: DEFINER vs INVOKER Comparison */}
        <section id="definer-vs-invoker" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Architectural Comparison Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing permission requirements, use cases, and vulnerability vectors.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Security Dimension</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">SQL SECURITY DEFINER</th>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">SQL SECURITY INVOKER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Base Table Access Needed by Caller?</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">NO (Checked against DEFINER)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">YES (Checked against Caller)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Data Masking Firewall Capability</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Excellent (True Isolation)</td>
                  <td className="py-3 px-4 text-slate-400">Unusable for Data Masking</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Vulnerability to Error 1449?</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">YES (If DEFINER user is dropped)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">NO (Immune to deleted creators)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Recommended Enterprise Use</td>
                  <td className="py-3 px-4 text-slate-300">Public portals, microservices, reporting</td>
                  <td className="py-3 px-4 text-slate-300">Developer shortcuts, internal analyst scripts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Permission Evaluation Flow
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing how the MySQL security engine evaluates grants in DEFINER vs INVOKER modes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Diagram A:</span> DEFINER (Privilege Tunnel) vs INVOKER (Direct Caller Check)
            </h3>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Mode 1: DEFINER Flow */}
                <g>
                  <rect x="20" y="20" width="380" height="220" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="210" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. SQL SECURITY DEFINER</text>
                  <rect x="35" y="60" width="160" height="40" rx="4" fill="#022c22" />
                  <text x="115" y="80" fill="#f8fafc" fontSize="9" textAnchor="middle">Caller: clerk_user</text>
                  <text x="115" y="93" fill="#38bdf8" fontSize="8" textAnchor="middle font-mono">GRANT SELECT ON view</text>

                  <rect x="220" y="60" width="165" height="40" rx="4" fill="#022c22" />
                  <text x="302" y="80" fill="#34d399" fontSize="9" textAnchor="middle">DEFINER: dba_admin</text>
                  <text x="302" y="93" fill="#a7f3d0" fontSize="8" textAnchor="middle font-mono">Has ALL on base tables</text>

                  <rect x="35" y="125" width="350" height="45" rx="4" fill="#0f172a" stroke="#10b981" />
                  <text x="210" y="145" fill="#6ee7b7" fontSize="9" textAnchor="middle font-bold">
                    ✓ Base Table Check uses dba_admin clearance
                  </text>
                  <text x="210" y="160" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                    Zero raw access needed by clerk_user!
                  </text>
                  <text x="210" y="210" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">RESULT: 200 OK (Data Masked Safe)</text>
                </g>

                {/* Mode 2: INVOKER Flow */}
                <g>
                  <rect x="440" y="20" width="380" height="220" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="630" y="45" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">2. SQL SECURITY INVOKER</text>
                  <rect x="455" y="60" width="160" height="40" rx="4" fill="#0f172a" />
                  <text x="535" y="80" fill="#f8fafc" fontSize="9" textAnchor="middle">Caller: clerk_user</text>
                  <text x="535" y="93" fill="#38bdf8" fontSize="8" textAnchor="middle font-mono">GRANT SELECT ON view</text>

                  <rect x="640" y="60" width="165" height="40" rx="4" fill="#450a0a" stroke="#ef4444" />
                  <text x="722" y="80" fill="#fca5a5" fontSize="9" textAnchor="middle">Base Table Grants?</text>
                  <text x="722" y="93" fill="#f87171" fontSize="8" textAnchor="middle font-mono">NO ACCESS</text>

                  <rect x="455" y="125" width="350" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                  <text x="630" y="145" fill="#fca5a5" fontSize="9" textAnchor="middle font-bold">
                    ❌ Base Table Check evaluates clerk_user
                  </text>
                  <text x="630" y="160" fill="#fca5a5" fontSize="8" textAnchor="middle font-mono">
                    Error 1142: SELECT command denied
                  </text>
                  <text x="630" y="210" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">RESULT: ACCESS DENIED</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive View Security Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test DEFINER privilege elevation, INVOKER permission checks, and Error 1449 recovery live.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(securityScenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Security State" : "○ Run Simulation"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{securityScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{securityScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                MySQL Access Control Engine
              </span>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Security Configuration Script</span>
                <span className="text-emerald-400">Security Context Inspection</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {securityScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id / target</th>
                    <th className="py-3 px-4 font-mono text-white">full_name / user</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">stream / definer</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">campus / security_mode</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">clearance</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Access Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {securityScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.clearance}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.outcome.includes("Denied") || row.outcome.includes("Error 1142")
                              ? "bg-rose-950 text-rose-400 border-rose-800"
                              : row.outcome.includes("Resolved")
                              ? "bg-amber-950 text-amber-400 border-amber-800"
                              : "bg-emerald-950 text-emerald-400 border-emerald-800"
                          )}
                        >
                          {row.outcome}
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
              Real-world implementations of SQL SECURITY DEFINER and INVOKER modes.
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
                  Academy Public Roster vs Sensitive Financial Ledger
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui creates a public admission verification view with <code className="text-emerald-300 font-mono">SQL SECURITY DEFINER</code> allowing prospective employers to verify student certifications (Mamata, Susmita, Abhronila, Debangshu) without exposing personal financial transaction ledgers.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE 
DEFINER = 'academy_sec_admin'@'localhost'
SQL SECURITY DEFINER
VIEW view_public_certificate_verification AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS graduate_name,
    c.course_title,
    s.centre_city,
    en.completion_date,
    en.certificate_serial_no
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
WHERE en.certificate_issued = 1;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Data Warehouse Internal Analyst Query Shortcut
                </h3>
                <span className="text-xs text-slate-400 font-mono">Enterprise Data Warehouse</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Using <code className="text-cyan-300 font-mono">SQL SECURITY INVOKER</code> to create a reusable reporting shortcut for certified data science team members, ensuring that unvetted junior staff cannot accidentally query restricted tables.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE 
SQL SECURITY INVOKER
VIEW view_data_science_feature_store AS
SELECT 
    customer_id,
    rfm_recency_days,
    rfm_frequency_orders,
    rfm_monetary_spend_inr,
    churn_probability_score
FROM analytics_customer_features;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls, Error 1449 & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid production database outages and deployment traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The mysqldump DEFINER Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When backing up a database with <code className="text-rose-300 font-mono">mysqldump</code>, it hardcodes <code className="text-rose-300 font-mono">DEFINER=user@host</code> into SQL files. Restoring this dump on a new server where that user does not exist causes immediate Error 1449 crashes!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Ensure identical service accounts exist on target servers or strip DEFINER headers during migration.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Use Non-Login Service Accounts as DEFINERs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never use developer accounts (<code className="text-rose-300 font-mono">john@localhost</code>) as DEFINERs. Create dedicated service accounts (<code className="text-emerald-400 font-mono">app_view_definer@localhost</code>) that are never deleted when staff change.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees 100% operational uptime and prevents orphaned view errors.
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
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">SQL SECURITY DEFINER</code> is the default security mode in MySQL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>In DEFINER mode, callers do NOT need permissions on underlying base tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>In INVOKER mode, callers MUST have direct base table <code className="text-cyan-300 font-mono">SELECT</code> permissions (Error 1142 otherwise).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Dropping a view's DEFINER account causes <code className="text-rose-400 font-mono">Error 1449</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe information_schema.VIEWS...”</span>
                  Query <code className="text-cyan-300 font-mono">SELECT TABLE_NAME, DEFINER, SECURITY_TYPE FROM information_schema.VIEWS</code> regularly to audit your system security boundaries.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about the Principle of Least Privilege...”</span>
                  DEFINER views allow granting microservices narrow, single-purpose access without giving them dangerous broad SELECT permissions on entire master tables.
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
              Comprehensive reference questions covering view security modes, DEFINER vs INVOKER, Error 1449, and privilege escalation prevention.
            </p>
          </div>

          <FAQTemplate
            title="SQL SECURITY DEFINER vs INVOKER FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Managing View Security: SQL SECURITY DEFINER vs INVOKER"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Understanding SQL SECURITY DEFINER vs INVOKER is what separates junior SQL writers from senior database architects. DEFINER mode is your tool for creating secure, sanitized data APIs where frontend users can see computed metrics without accessing raw base tables. But beware of Error 1449: always assign permanent system service accounts as DEFINERs to avoid outages when developers leave the team."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
