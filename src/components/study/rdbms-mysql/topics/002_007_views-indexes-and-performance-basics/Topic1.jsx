import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – CREATE VIEW, ALTER VIEW, and DROP VIEW Syntax
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on SQL View DDL syntax, lifecycle management, and metadata inspection.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedDdlAction, setSelectedDdlAction] = useState("create_or_replace");

  const ddlScenarios = {
    create_or_replace: {
      title: "1. CREATE OR REPLACE VIEW (Idempotent Deployment)",
      badge: "CREATE / REPLACE DDL",
      badgeColor: "emerald",
      sqlQuery: `-- 1. Establish initial view with explicit column alias header:
CREATE OR REPLACE VIEW view_academy_student_directory (
    student_code,
    full_name,
    course_name,
    campus_location,
    tuition_fee_inr
)
AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name),
    c.course_title,
    s.centre_city,
    en.fee_amount_inr
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
WHERE en.status = 'ACTIVE';

-- Query the newly created virtual table:
SELECT * FROM view_academy_student_directory;`,
      resultRows: [
        { code: "STU-101", name: "Mamata Hui", course: "React & Redux Pro", location: "Barrackpore", metric: "₹25,000.00", status: "Deployed" },
        { code: "STU-102", name: "Susmita Sen", course: "Java Microservices", location: "Barrackpore", metric: "₹25,000.00", status: "Deployed" },
        { code: "STU-103", name: "Abhronila Saha", course: "Python Data Science", location: "Kolkata Central", metric: "₹25,000.00", status: "Deployed" },
        { code: "STU-104", name: "Debangshu Roy", course: "React & Redux Pro", location: "Ichapur Tech Hub", metric: "₹25,000.00", status: "Deployed" },
      ],
      explanation:
        "CREATE OR REPLACE VIEW creates the view if it does not exist, or updates its definition seamlessly without revoking existing user permissions.",
    },
    alter_view: {
      title: "2. ALTER VIEW (Expanding Schema with Computed Columns)",
      badge: "ALTER DDL",
      badgeColor: "cyan",
      sqlQuery: `-- 2. Evolve existing view schema to include Academic Grade percentage:
ALTER VIEW view_academy_student_directory (
    student_code,
    full_name,
    course_name,
    campus_location,
    tuition_fee_inr,
    academic_score_pct
)
AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name),
    c.course_title,
    s.centre_city,
    en.fee_amount_inr,
    COALESCE(en.marks_pct, 0.00)
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
WHERE en.status = 'ACTIVE';

-- Query the updated 6-column view:
SELECT student_code, full_name, academic_score_pct FROM view_academy_student_directory;`,
      resultRows: [
        { code: "STU-101", name: "Mamata Hui", course: "React & Redux Pro", location: "Barrackpore", metric: "92.50% (Distinction)", status: "Altered" },
        { code: "STU-102", name: "Susmita Sen", course: "Java Microservices", location: "Barrackpore", metric: "88.40% (Distinction)", status: "Altered" },
        { code: "STU-103", name: "Abhronila Saha", course: "Python Data Science", location: "Kolkata Central", metric: "86.00% (Distinction)", status: "Altered" },
        { code: "STU-104", name: "Debangshu Roy", course: "React & Redux Pro", location: "Ichapur Tech Hub", metric: "79.50% (First Div)", status: "Altered" },
      ],
      explanation:
        "ALTER VIEW modifies the underlying query definition while strictly preserving existing grant permissions on the database object.",
    },
    drop_view: {
      title: "3. DROP VIEW IF EXISTS (Safe Teardown & Deletion)",
      badge: "DROP DDL",
      badgeColor: "rose",
      sqlQuery: `-- 3. Safely drop obsolete views without failing on missing objects:
DROP VIEW IF EXISTS 
    view_academy_student_directory,
    view_temporary_exam_rankings,
    view_legacy_billing_v1;

-- Verification of catalog cleanup:
SHOW FULL TABLES WHERE Table_type = 'VIEW';`,
      resultRows: [
        { code: "STATUS", name: "3 Views Dropped Cleanly", course: "information_schema Updated", location: "Zero Disk Leak", metric: "Query Succeeded", status: "Cleaned" },
      ],
      explanation:
        "DROP VIEW IF EXISTS removes multiple views in a single atomic statement and suppresses Error 1051 if a view was already deleted.",
    },
    inspect_metadata: {
      title: "4. Inspecting View Definitions in information_schema.VIEWS",
      badge: "Catalog Inspection",
      badgeColor: "indigo",
      sqlQuery: `-- 4. Query MySQL Data Dictionary to inspect compiled view properties:
SELECT 
    TABLE_NAME AS view_name,
    IS_UPDATABLE,
    CHECK_OPTION,
    SECURITY_TYPE,
    DEFINER
FROM information_schema.VIEWS
WHERE TABLE_SCHEMA = 'academy_database';`,
      resultRows: [
        { code: "view_student_directory", name: "Updatable: NO (Joined)", course: "CHECK: NONE", location: "DEFINER: admin@localhost", metric: "SECURITY: DEFINER", status: "Catalog Verified" },
        { code: "view_active_batches", name: "Updatable: YES (1-to-1)", course: "CHECK: CASCADED", location: "DEFINER: admin@localhost", metric: "SECURITY: INVOKER", status: "Catalog Verified" },
      ],
      explanation:
        "information_schema.VIEWS provides complete programmatic auditing of security modes, updatability flags, and check options.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. View DDL Syntax Matrix" },
    { id: "create-alter-drop", label: "2. CREATE, ALTER & DROP Mechanics" },
    { id: "svg-diagrams", label: "3. DDL Lifecycle & Column Mapping SVGs" },
    { id: "interactive-sandbox", label: "4. Live DDL Simulator" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Error 1353" },
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
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 1 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              View DDL Statements
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            CREATE VIEW, ALTER VIEW & DROP VIEW Syntax
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete DDL lifecycle of database views. Learn how to write idempotent{" "}
            <code className="text-emerald-300 font-mono font-bold">CREATE OR REPLACE VIEW</code> statements, modify schemas with{" "}
            <code className="text-cyan-300 font-mono font-bold">ALTER VIEW</code>, safely teardown with{" "}
            <code className="text-rose-400 font-mono font-bold">DROP VIEW IF EXISTS</code>, and inspect catalog metadata.
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
        {/* SECTION 1: View DDL Syntax Matrix */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The View DDL Command Suite
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The foundational Data Definition Language statements used to create, evolve, and delete virtual relations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  CREATE
                </span>
                <h3 className="text-base font-bold text-white">CREATE [OR REPLACE]</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Establishes a new virtual table or replaces an existing one without revoking permissions.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800">
{`CREATE OR REPLACE VIEW v_students AS
SELECT id, full_name, city
FROM student_master;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-xs font-bold border border-cyan-800">
                  ALTER
                </span>
                <h3 className="text-base font-bold text-white">ALTER VIEW</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Modifies the underlying query of an existing view. Fails if the view does not exist.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
{`ALTER VIEW v_students AS
SELECT id, full_name, city, marks
FROM student_master;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-rose-950/80 text-rose-400 font-mono text-xs font-bold border border-rose-800">
                  DROP
                </span>
                <h3 className="text-base font-bold text-white">DROP VIEW [IF EXISTS]</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Permanently removes one or more view definitions from the database metadata catalog.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-rose-300 overflow-x-auto border border-slate-800">
{`DROP VIEW IF EXISTS 
    v_students, v_reports;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: Mechanics of Explicit Column Naming */}
        <section id="create-alter-drop" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Explicit Header Aliasing vs Inline SELECT Aliases
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Two distinct ways to define clean, standardized column names in view schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Method A:</span> Header Parenthesized Column List
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Specify all output column names in parentheses immediately following the view name:
              </p>
              <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE VIEW view_candidate_card (
    student_id,
    student_name,
    enrolled_stream,
    branch_city
)
AS SELECT s_id, CONCAT(f_name, ' ', l_name), stream, city
FROM student_registry;`}
              </pre>
              <div className="mt-3 text-[11px] text-amber-300">
                Rule: Header column count MUST exactly match the SELECT column count (Error 1353 otherwise).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Method B:</span> Inline SELECT Column AS Aliases
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Specify column names directly inside the SELECT clause using the <code className="text-emerald-300 font-mono">AS</code> keyword:
              </p>
              <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE VIEW view_candidate_card AS
SELECT 
    s_id AS student_id,
    CONCAT(f_name, ' ', l_name) AS student_name,
    stream AS enrolled_stream,
    city AS branch_city
FROM student_registry;`}
              </pre>
              <div className="mt-3 text-[11px] text-slate-400">
                Common in production when individual column transformations are deeply nested.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: DDL Lifecycle & Column Mapping Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect the lifecycle state transitions and column projection mechanics of database views.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: View DDL Lifecycle State Machine */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Database View DDL Lifecycle State Machine
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                From initial creation through iterative schema evolution (ALTER / REPLACE) to safe catalog teardown.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 240" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* State 1: Non-Existent */}
                  <g>
                    <rect x="30" y="30" width="180" height="70" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                    <text x="120" y="60" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Object Uncreated</text>
                    <text x="120" y="80" fill="#64748b" fontSize="9" textAnchor="middle">Not in information_schema</text>
                  </g>

                  {/* State 2: Active Virtual View */}
                  <g>
                    <rect x="330" y="30" width="220" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="440" y="60" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">2. Active Virtual View</text>
                    <text x="440" y="80" fill="#a7f3d0" fontSize="9" textAnchor="middle">Metadata stored in catalog</text>
                  </g>

                  {/* State 3: Dropped */}
                  <g>
                    <rect x="670" y="30" width="150" height="70" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="745" y="60" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">3. Object Dropped</text>
                    <text x="745" y="80" fill="#f87171" fontSize="9" textAnchor="middle">Metadata removed</text>
                  </g>

                  {/* Flow Arrow 1 → 2 (CREATE) */}
                  <path d="M 210 65 L 330 65" stroke="#10b981" strokeWidth="2" />
                  <text x="270" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">CREATE VIEW</text>

                  {/* Loopback Arrow on State 2 (ALTER / REPLACE) */}
                  <path d="M 400 100 C 400 160, 480 160, 480 100" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="440" y="180" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">ALTER VIEW / CREATE OR REPLACE</text>
                  <text x="440" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">(Preserves database user permissions)</text>

                  {/* Flow Arrow 2 → 3 (DROP) */}
                  <path d="M 550 65 L 670 65" stroke="#ef4444" strokeWidth="2" />
                  <text x="610" y="55" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">DROP VIEW</text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Column Header Mapping Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Column Header Projection & Expression Mapping Pipeline
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                How base table columns and scalar expressions map into clean public view column headers.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 220" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Base Table Columns */}
                  <g>
                    <rect x="30" y="20" width="240" height="180" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="150" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Base Table: student_registry</text>
                    <rect x="45" y="60" width="210" height="24" rx="4" fill="#1e293b" />
                    <text x="55" y="76" fill="#e2e8f0" fontSize="9" font-mono>s.student_id (INT)</text>
                    <rect x="45" y="90" width="210" height="24" rx="4" fill="#1e293b" />
                    <text x="55" y="106" fill="#e2e8f0" fontSize="9" font-mono>s.first_name, s.last_name</text>
                    <rect x="45" y="120" width="210" height="24" rx="4" fill="#1e293b" />
                    <text x="55" y="136" fill="#e2e8f0" fontSize="9" font-mono>s.fee_amount_inr * 0.18</text>
                    <rect x="45" y="150" width="210" height="24" rx="4" fill="#1e293b" />
                    <text x="55" y="166" fill="#e2e8f0" fontSize="9" font-mono>s.centre_city (VARCHAR)</text>
                  </g>

                  {/* Middle: Transform Expression Mapping */}
                  <g>
                    <path d="M 270 72 L 530 72" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 270 102 L 530 102" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 270 132 L 530 132" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 270 162 L 530 162" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="400" y="120" fill="#818cf8" fontSize="10" font-bold textAnchor="middle">DDL Field Mapping</text>
                  </g>

                  {/* Right: View Header Column Aliases */}
                  <g>
                    <rect x="530" y="20" width="290" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="675" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">View Schema (view_candidate_card)</text>
                    <rect x="545" y="60" width="260" height="24" rx="4" fill="#022c22" />
                    <text x="555" y="76" fill="#34d399" fontSize="9" font-mono>student_code</text>
                    <rect x="545" y="90" width="260" height="24" rx="4" fill="#022c22" />
                    <text x="555" y="106" fill="#34d399" fontSize="9" font-mono>full_name (CONCAT)</text>
                    <rect x="545" y="120" width="260" height="24" rx="4" fill="#022c22" />
                    <text x="555" y="136" fill="#34d399" fontSize="9" font-mono>tax_amount_inr (Calculated)</text>
                    <rect x="545" y="150" width="260" height="24" rx="4" fill="#022c22" />
                    <text x="555" y="166" fill="#34d399" fontSize="9" font-mono>campus_location</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive DDL Simulator */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive View DDL Execution Simulator
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test CREATE OR REPLACE, ALTER VIEW, DROP VIEW, and metadata inspection statements live.
            </p>
          </div>

          {/* Action Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(ddlScenarios).map(([key, item]) => {
              const isActive = selectedDdlAction === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDdlAction(key)}
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
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active DDL State" : "○ Run DDL Statement"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{ddlScenarios[selectedDdlAction].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ddlScenarios[selectedDdlAction].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                MySQL 8.0 DDL Engine
              </span>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL DDL Command Script</span>
                <span className="text-emerald-400">Schema Catalog Execution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {ddlScenarios[selectedDdlAction].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_code</th>
                    <th className="py-3 px-4 font-mono text-white">full_name</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">course_name</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">campus_location</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">tuition_fee / metric</th>
                    <th className="py-3 px-4 font-mono text-amber-400">DDL State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {ddlScenarios[selectedDdlAction].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.code}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.course}</td>
                      <td className="py-3 px-4 text-slate-300">{row.location}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.metric}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
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
              Real-world DDL deployment scripts from training academies and financial databases.
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
                  Automated CI/CD Migration Script with CREATE OR REPLACE VIEW
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui deploys an automated database migration script that establishes public reporting views for students (Mamata, Susmita, Abhronila, Debangshu) without incurring downtime or revoking faculty permissions.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- CI/CD Migration Step: Deploying faculty analytics view idempotently:
CREATE OR REPLACE VIEW view_faculty_batch_kpis (
    batch_identifier,
    faculty_mentor,
    enrolled_candidate_count,
    gross_tuition_collected_inr,
    batch_mean_score_pct
)
AS
SELECT 
    b.batch_code,
    b.instructor_name,
    COUNT(en.student_id),
    COALESCE(SUM(en.fee_amount_inr), 0.00),
    ROUND(AVG(COALESCE(en.marks_pct, 0.00)), 2)
FROM batches b
LEFT JOIN enrollments en ON b.batch_id = en.batch_id
WHERE b.is_active = 1
GROUP BY b.batch_code, b.instructor_name;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Auditing Enterprise View Catalog Security
                </h3>
                <span className="text-xs text-slate-400 font-mono">Security Compliance: Database Audit</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Database administrators run automated security audits across all views in the schema to ensure that no views inadvertently run with dangerous elevated DEFINER permissions.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    TABLE_SCHEMA AS db_name,
    TABLE_NAME AS view_name,
    DEFINER AS object_owner,
    SECURITY_TYPE AS execution_security_mode,
    IS_UPDATABLE AS is_dml_supported
FROM information_schema.VIEWS
WHERE TABLE_SCHEMA NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys')
ORDER BY TABLE_NAME ASC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Error 1353 */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls, Error 1353 & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid DDL syntax errors and schema drift pitfalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Error 1353: Column Count Mismatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If the explicit header column list has 3 names but the SELECT query returns 4 columns, MySQL throws <code className="text-rose-400 font-mono">Error 1353 (HY000)</code>.
              </p>
              <pre className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs font-mono text-rose-300 overflow-x-auto">
{`-- ❌ Fails: 3 header names vs 4 SELECT columns
CREATE VIEW v (c1, c2, c3) AS 
SELECT id, name, city, fee FROM students;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Idempotent DDL Best Practice
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always use <code className="text-emerald-400 font-mono">CREATE OR REPLACE VIEW</code> in automated deployment pipelines to ensure zero-downtime schema updates.
              </p>
              <pre className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
{`-- ✓ Safe & idempotent deployment:
CREATE OR REPLACE VIEW view_clean_catalog AS
SELECT id, name, city FROM students;`}
              </pre>
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
                  <span><code className="text-cyan-300 font-mono">CREATE OR REPLACE VIEW</code> creates or alters without revoking permissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">ALTER VIEW</code> requires the view to already exist (Error 1146 otherwise).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DROP VIEW IF EXISTS</code> to safely delete multiple views simultaneously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Inspect view metadata via <code className="text-cyan-300 font-mono">information_schema.VIEWS</code> or <code className="text-cyan-300 font-mono">SHOW CREATE VIEW</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe view renaming...”</span>
                  To rename a view without dropping it, use <code className="text-cyan-300 font-mono">RENAME TABLE old_view TO new_view</code>. It works seamlessly for both tables and views.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about column count alignment...”</span>
                  If using header aliases <code className="text-cyan-300 font-mono">CREATE VIEW v (a, b)</code>, double-check that your SELECT statement has exactly 2 expressions to prevent Error 1353.
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
              Comprehensive reference questions covering DDL statements, algorithms, permissions, and catalog inspection.
            </p>
          </div>

          <FAQTemplate
            title="CREATE, ALTER & DROP VIEW Syntax FAQs"
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
            title="CREATE VIEW, ALTER VIEW, and DROP VIEW Syntax"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="In production deployments, never write raw 'DROP VIEW ... followed by CREATE VIEW' because any client request hitting the database in that millisecond window will fail with 'Table does not exist'. Instead, always use CREATE OR REPLACE VIEW or ALTER VIEW. They atomically swap the query definition in the data dictionary while keeping all security grants intact."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
