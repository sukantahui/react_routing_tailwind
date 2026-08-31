import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Server, Database, Table, and Column-Level Character Set Hierarchies
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive character set hierarchy workbench: exploring the 4-tier inheritance resolution engine (Server, Database, Table, Column), client-connection bridge negotiation (SET NAMES), column-level ASCII micro-optimizations, and schema inheritance drift auditing in MySQL.
 */
const Topic3 = () => {
  // Interactive Hierarchy State
  const [selectedHierarchyPhase, setSelectedHierarchyPhase] = useState("phase1_inheritance_tree");

  const hierarchyPhases = {
    phase1_inheritance_tree: {
      phaseNumber: "Phase 1: 4-Tier Hierarchy",
      title: "1. The 4-Tier Inheritance Resolution Tree",
      badge: "Inheritance Engine",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌳 4-TIER INHERITANCE RESOLUTION WORKFLOW:
-- LEVEL 1: Server Global Default (in my.cnf):
--   character_set_server = utf8mb4 | collation_server = utf8mb4_0900_ai_ci

-- LEVEL 2: Database Creation (Inherits from Server if omitted):
CREATE DATABASE college_admissions 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_0900_ai_ci;

-- LEVEL 3: Table Creation (Inherits from Database if omitted):
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100), -- Inherits utf8mb4_0900_ai_ci!
    email VARCHAR(100)         -- Inherits utf8mb4_0900_ai_ci!
) ENGINE=InnoDB;

-- LEVEL 4: Column Override (Most specific, overrides table!):
ALTER TABLE students ADD COLUMN api_token CHAR(32) CHARACTER SET ascii COLLATE ascii_bin;`,
      metricsTable: [
        { level: "1. Server Level", scope: "Global my.cnf", role: "Fallback default for unconfigured databases" },
        { level: "2. Database Level", scope: "CREATE DATABASE", role: "Default for all tables created in that schema" },
        { level: "3. Table Level", scope: "CREATE TABLE", role: "Default for all text columns in that table" },
        { level: "4. Column Level", scope: "Column Definition", role: "Granular override for a single specific column" }
      ],
      explanation:
        "MySQL resolves character sets and collations top-down. Each lower level inherits from its immediate parent unless explicitly specified. Specifying a charset at the column level overrides table, database, and server defaults."
    },
    phase2_client_bridge: {
      phaseNumber: "Phase 2: Client Bridge",
      title: "2. The Client-Connection Communication Bridge",
      badge: "Connection Bridge",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌉 CLIENT-CONNECTION COMMUNICATION BRIDGE:
-- 1. Check active session encoding variables:
SHOW VARIABLES LIKE 'character_set_%';

-- Three key variables govern client communication:
-- - character_set_client     : Encoding of SQL queries sent by application
-- - character_set_connection : Encoding used by MySQL parser for string literals
-- - character_set_results    : Encoding of result rows sent back to application

-- 2. Harmonize all 3 with a single command:
SET NAMES 'utf8mb4';

-- Equivalent to:
-- SET character_set_client = 'utf8mb4';
-- SET character_set_connection = 'utf8mb4';
-- SET character_set_results = 'utf8mb4';`,
      metricsTable: [
        { variable: "character_set_client", role: "Incoming Query Text", defaultVal: "utf8mb4 (Application encoding)" },
        { variable: "character_set_connection", role: "Parser & Literals", defaultVal: "utf8mb4 (Internal query processing)" },
        { variable: "character_set_results", role: "Returned Result Rows", defaultVal: "utf8mb4 (Client display encoding)" },
        { variable: "character_set_system", role: "Data Dictionary / Metadata", defaultVal: "utf8mb3 / utf8 (Fixed, immutable)" }
      ],
      explanation:
        "The Client-Connection bridge ensures incoming queries, internal string literals, and outgoing result sets are properly translated. Executing `SET NAMES 'utf8mb4'` harmonizes all three variables to prevent Mojibake encoding bugs."
    },
    phase3_column_optimization: {
      phaseNumber: "Phase 3: Column Optimization",
      title: "3. Column-Level Micro-Optimization: Mixed Charsets",
      badge: "Schema Optimization",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ MIXED CHARACTER SETS IN A SINGLE TABLE:
CREATE TABLE user_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Full Unicode for international names & emojis:
    display_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    
    -- Case-Insensitive email address:
    email_address VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    
    -- Pure ASCII for 32-byte hexadecimal session token (Saves RAM & Index space!):
    session_token CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    
    -- Password bcrypt hash (Exact 60 bytes, strict binary):
    password_hash CHAR(60) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    
    UNIQUE INDEX uq_email (email_address),
    INDEX idx_token (session_token) -- 4x smaller memory footprint than utf8mb4!
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      metricsTable: [
        { column: "display_name", charset: "utf8mb4 (1-4 Bytes)", benefit: "Supports Bengali, Hindi, and Emojis" },
        { column: "email_address", charset: "utf8mb4_0900_ai_ci", benefit: "Case-insensitive unique constraint" },
        { column: "session_token", charset: "ascii_bin (1 Byte)", benefit: "4x smaller index memory in RAM ⚡" },
        { column: "password_hash", charset: "ascii_bin (1 Byte)", benefit: "Exact binary matching; zero overhead" }
      ],
      explanation:
        "You can define different character sets on different columns within the same table. Storing pure ASCII tokens or password hashes in `ascii` saves memory during sorting and reduces index cache footprints by up to 4x."
    },
    phase4_drift_audit: {
      phaseNumber: "Phase 4: Inheritance Drift",
      title: "4. Auditing Schema Inheritance Drift via Catalog",
      badge: "DBA Audit Runbook",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 AUDITING CHARACTER SET DRIFT ACROSS DATABASE TABLES:
-- 1. Find all tables that deviate from the database default:
SELECT 
    t.table_schema,
    t.table_name,
    t.table_collation,
    s.default_collation_name AS db_collation,
    CASE 
        WHEN t.table_collation != s.default_collation_name THEN '⚠️ DRIFT DETECTED'
        ELSE '✅ ALIGNED'
    END AS drift_status
FROM information_schema.tables t
JOIN information_schema.schemata s ON t.table_schema = s.schema_name
WHERE t.table_schema = 'college_admissions';

-- 2. Find all columns with mismatched collations that could cause Error 1267:
SELECT 
    table_name, column_name, character_set_name, collation_name
FROM information_schema.columns
WHERE table_schema = 'college_admissions'
  AND collation_name NOT LIKE 'utf8mb4%';`,
      metricsTable: [
        { queryTarget: "information_schema.schemata", inspection: "Database Defaults", role: "Verifies schema-level encoding" },
        { queryTarget: "information_schema.tables", inspection: "Table Collations", role: "Detects unmigrated legacy tables" },
        { queryTarget: "information_schema.columns", inspection: "Column Charsets", role: "Identifies mismatched join keys" },
        { queryTarget: "Remediation Script", inspection: "ALTER TABLE CONVERT TO", role: "Re-encodes drifted tables to standard" }
      ],
      explanation:
        "Inheritance drift occurs when database defaults are changed but existing tables retain legacy charsets. Querying Information Schema catalogs allows DBAs to identify drifted tables and convert them before join errors occur."
    }
  };

  const navItems = [
    { id: "hierarchy-overview", label: "1. Hierarchy Overview" },
    { id: "tree-diagram", label: "2. Inheritance Diagram" },
    { id: "interactive-workbench", label: "3. Hierarchy Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Hierarchy Audit Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 3 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Inheritance Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Server, Database, Table, and Column-Level Character Set Hierarchies
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master MySQL's 4-tier encoding inheritance model: explore resolution rules from Server down to Column levels, configure the Client-Connection bridge with <code className="text-cyan-400 font-mono">SET NAMES</code>, apply column-level micro-optimizations, and audit schema inheritance drift.
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
        {/* SECTION 1: Hierarchy Overview */}
        <section id="hierarchy-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4-Tier Inheritance Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL resolves character sets and collations from top-level defaults to individual columns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Level 1</span>
              <h3 className="font-bold text-white">Server Level</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Global default in `my.cnf` (`character_set_server`). Top-level fallback.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Level 2</span>
              <h3 className="font-bold text-white">Database Level</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Defined in `CREATE DATABASE`. Default for all tables in that schema.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Level 3</span>
              <h3 className="font-bold text-white">Table Level</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Defined in `CREATE TABLE`. Default for all string columns in that table.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Level 4</span>
              <h3 className="font-bold text-white">Column Level</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Most specific override on a single `VARCHAR` / `CHAR` column.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Tree Diagram */}
        <section id="tree-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: 4-Tier Inheritance Tree &amp; Client Bridge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Top-down inheritance propagation and application-to-database communication translation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 3.1: Character Set Inheritance &amp; Connection Bridge Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Hierarchy Map</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrTreeCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left: 4-Tier Storage Hierarchy */}
                <rect x="20" y="30" width="440" height="300" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="240" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ON-DISK STORAGE INHERITANCE HIERARCHY
                </text>
                <line x1="20" y1="65" x2="460" y2="65" stroke="#334155" />

                <rect x="40" y="80" width="400" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="100" fill="#a7f3d0" fontSize="10" fontWeight="bold">Level 1: SERVER DEFAULT (my.cnf)</text>
                <text x="50" y="113" fill="#94a3b8" fontSize="8">character_set_server = utf8mb4 | collation = utf8mb4_0900_ai_ci</text>

                <rect x="70" y="135" width="370" height="40" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="80" y="155" fill="#bae6fd" fontSize="10" fontWeight="bold">Level 2: DATABASE DEFAULT (CREATE DATABASE)</text>
                <text x="80" y="168" fill="#94a3b8" fontSize="8">Inherits Server default unless specified</text>

                <rect x="100" y="190" width="340" height="40" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="110" y="210" fill="#fde68a" fontSize="10" fontWeight="bold">Level 3: TABLE DEFAULT (CREATE TABLE)</text>
                <text x="110" y="223" fill="#94a3b8" fontSize="8">Inherits Database default unless specified</text>

                <rect x="130" y="245" width="310" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="140" y="265" fill="#fca5a5" fontSize="10" fontWeight="bold">Level 4: COLUMN (col VARCHAR(...))</text>
                <text x="140" y="278" fill="#a7f3d0" fontSize="8">Specific Override (e.g. CHARACTER SET ascii)</text>

                {/* Right: Client-Connection Bridge */}
                <rect x="490" y="30" width="440" height="300" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="710" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  CLIENT-CONNECTION COMMUNICATION BRIDGE
                </text>
                <line x1="490" y1="65" x2="930" y2="65" stroke="#334155" />

                <rect x="510" y="80" width="400" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="520" y="102" fill="#bae6fd" fontSize="10" fontWeight="bold">1. character_set_client</text>
                <text x="520" y="118" fill="#94a3b8" fontSize="9">Encoding of incoming SQL strings from app (e.g. Node.js)</text>

                <rect x="510" y="145" width="400" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="520" y="167" fill="#a7f3d0" fontSize="10" fontWeight="bold">2. character_set_connection</text>
                <text x="520" y="183" fill="#94a3b8" fontSize="9">Encoding used by SQL parser to evaluate literals</text>

                <rect x="510" y="210" width="400" height="50" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="520" y="232" fill="#fde68a" fontSize="10" fontWeight="bold">3. character_set_results</text>
                <text x="520" y="248" fill="#94a3b8" fontSize="9">Encoding of result set rows returned back to client</text>

                <rect x="510" y="275" width="400" height="35" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="710" y="297" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  SET NAMES 'utf8mb4' → Harmonizes all 3 in one shot! ⚡
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Hierarchy Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Hierarchy Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a hierarchy phase to inspect top-down inheritance, client bridge variables, and drift audit queries.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(hierarchyPhases).map((key) => {
              const ph = hierarchyPhases[key];
              const isSelected = selectedHierarchyPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedHierarchyPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {hierarchyPhases[selectedHierarchyPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  hierarchyPhases[selectedHierarchyPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  hierarchyPhases[selectedHierarchyPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  hierarchyPhases[selectedHierarchyPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  hierarchyPhases[selectedHierarchyPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {hierarchyPhases[selectedHierarchyPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Hierarchy Inspection &amp; Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {hierarchyPhases[selectedHierarchyPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Hierarchy Characteristics &amp; Rules:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Level / Variable</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Inheritance / Processing Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {hierarchyPhases[selectedHierarchyPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.level || row.variable || row.column || row.queryTarget}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.scope || row.defaultVal || row.charset || row.inspection}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.role || row.benefit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {hierarchyPhases[selectedHierarchyPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Hierarchy Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing connection charset mismatches and optimizing high-speed token tables in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Connection Pool Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Node.js Client Bridge Mojibake in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Mojibake Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a Node.js backend connecting to a `utf8mb4` database inserted student names with garbled question marks because the connection pool defaulted `character_set_client` to `latin1`. Adding `charset: 'utf8mb4'` to the connection pool configuration harmonized the client-connection bridge, restoring clean Bengali script text immediately.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Column-Level Micro-Optimization */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 4x Index Memory Savings on Session Tokens in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  75% Index RAM Saved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an authentication table with 10 million active sessions used `VARCHAR(64) utf8mb4` for session tokens, consuming 2.5 GB of Buffer Pool index cache. Overriding the column to `CHAR(32) CHARACTER SET ascii COLLATE ascii_bin` reduced the index size to 640 MB, speeding up authentication lookups by 280%.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid inheritance drift and connection translation mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Assuming ALTER DATABASE Migrates Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `ALTER DATABASE` only updates the default for *future* tables; existing tables retain their older encodings, creating inheritance drift.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Run ALTER TABLE tbl CONVERT TO CHARACTER SET on existing tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Client Bridge Alignment
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A table configured in `utf8mb4` will still suffer from character corruption if the connecting application client uses `latin1`.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute SET NAMES 'utf8mb4' in database connection pools.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Set Server-Level Defaults
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure `character-set-server = utf8mb4` and `collation-server = utf8mb4_0900_ai_ci` in `my.cnf` to ensure top-level inheritance consistency.
              </p>
              <div className="text-xs text-slate-400">
                Automatically propagates to all newly created databases.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Micro-Optimize Hash Columns with ASCII
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `CHARACTER SET ascii COLLATE ascii_bin` for UUIDs, MD5 hashes, and tokens to save RAM sort buffer space and index footprint.
              </p>
              <div className="text-xs text-slate-400">
                Maintains 1 byte per character strictly on disk and in memory.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Hierarchy Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Hierarchy Audit Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify complete encoding alignment across all four tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Inheritance Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Server Defaults</strong> = Verify `character-set-server = utf8mb4` in `my.cnf`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Database Schemata</strong> = Audit `information_schema.schemata` for legacy charsets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Client Bridge</strong> = Confirm backend connection pools negotiate `utf8mb4`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Column Overrides</strong> = Check `information_schema.columns` for drift.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe SET NAMES in Query Logs...”</span>
                  When inspecting application connection initialization, look for `SET NAMES 'utf8mb4'`. That single command proves the client has synchronized its encoding with the server!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Column Overrides...”</span>
                  Using `utf8mb4` everywhere is a safe default, but defining `CHARACTER SET ascii` on high-traffic token and hash columns is the secret to cutting index memory consumption by 75%!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Character Set Hierarchies and Client-Connection Bridge.
            </p>
          </div>

          <FAQTemplate
            title="Character Set Hierarchies & Client Bridge FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Server, Database, Table, and Column-Level Character Set Hierarchies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Understanding MySQL's 4-tier character set hierarchy gives you complete control over your database's encoding architecture. It prevents inheritance drift where older tables lag behind schema upgrades, ensures your backend connection pools communicate via SET NAMES 'utf8mb4', and allows smart column-level micro-optimizations like using ascii_bin for high-throughput session tokens. Always design with the full hierarchy in mind!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
