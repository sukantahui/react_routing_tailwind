import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Granular Privilege Levels: Global, Database, Table, Column, and Routine Privileges
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive privilege hierarchy workbench: mastering the 5 authorization tiers (Global, Database, Table, Column, Routine), inspecting data dictionary grant tables, configuring Dynamic Privileges to replace SUPER, and designing least-privilege service accounts.
 */
const Topic5 = () => {
  // Interactive Privilege Level State
  const [selectedPrivilegeLevel, setSelectedPrivilegeLevel] = useState("level1_global_database");

  const privilegeLevels = {
    level1_global_database: {
      levelNumber: "Tier 1 & 2: Global & Database Scope",
      title: "1. Global (*.*) and Database (db.*) Privilege Scopes",
      badge: "Broad Authority",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌐 GLOBAL & DATABASE PRIVILEGE PROVISIONING:

-- 1. Global Scope: Applies server-wide to all schemas (stored in mysql.user):
GRANT SELECT, PROCESS, RELOAD ON *.* TO 'global_monitor'@'localhost';

-- 2. Database Scope: Confined strictly within a single schema (stored in mysql.db):
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP 
ON kolkata_retail.* 
TO 'store_admin'@'10.10.%.%';

-- 3. Verify in system tables:
SELECT User, Host, Db, Select_priv, Insert_priv FROM mysql.db WHERE User = 'store_admin';`,
      explanation:
        "Global privileges (*.*) represent broad administrative authority and should never be granted to application microservice accounts. Database privileges (db.*) confine DDL and DML authority strictly within the perimeter of a single schema, making it the primary baseline for development teams.",
      keyTakeaways: [
        "Global grants reside in mysql.user; Database grants reside in mysql.db.",
        "Database grants encompass all tables, views, and stored routines inside that database.",
        "Privileges are purely additive; higher tiers automatically satisfy lower object checks."
      ]
    },
    level2_table_column: {
      levelNumber: "Tier 3 & 4: Table & Column Scope",
      title: "2. Table (db.tbl) and Column (col1, col2) Granular Grants",
      badge: "Granular PII Masking",
      badgeColor: "cyan",
      sqlSnippet: `-- 📊 TABLE & COLUMN LEVEL ACCESS CONTROL:

-- 1. Table Scope: Confined to an individual table (stored in mysql.tables_priv):
GRANT SELECT, INSERT ON kolkata_retail.orders TO 'order_clerk'@'10.0.%.%';

-- 2. Column Scope: Grants access to specific columns only (stored in mysql.columns_priv):
-- Allows viewing order_id and customer_name, and editing order_status only:
GRANT SELECT (order_id, customer_name, order_status),
      UPDATE (order_status)
ON kolkata_retail.orders 
TO 'support_rep'@'10.0.%.%';

-- Attempting to SELECT credit_card_num throws ERROR 1142!`,
      explanation:
        "Table grants protect sensitive sibling tables in the same schema. Column privileges enable fine-grained access control by exposing non-sensitive attributes while hiding sensitive PII (like credit card hashes or salary figures). Note: DELETE and TRIGGER cannot be granted at column level because they act on whole rows.",
      keyTakeaways: [
        "Table grants reside in mysql.tables_priv; Column grants in mysql.columns_priv.",
        "Column grants apply to SELECT, INSERT, UPDATE, and REFERENCES only.",
        "Prevents SQL injections or compromised accounts from reading restricted columns."
      ]
    },
    level3_routine_definer: {
      levelNumber: "Tier 5: Stored Routines & Definer",
      title: "3. Routine Privileges & SQL SECURITY Encapsulation",
      badge: "Procedural Abstraction",
      badgeColor: "purple",
      sqlSnippet: `-- ⚙️ ROUTINE PRIVILEGES & SECURITY CONTEXT ENCAPSULATION:

-- 1. Grant execution rights on a specific procedure (stored in mysql.procs_priv):
GRANT EXECUTE ON PROCEDURE kolkata_bank.sp_transfer_funds 
TO 'api_service'@'10.10.%.%';

-- 2. Encapsulate high-privilege ledger updates inside DEFINER procedure:
CREATE PROCEDURE kolkata_bank.sp_transfer_funds(
  IN p_from INT, IN p_to INT, IN p_amt DECIMAL(10,2)
)
SQL SECURITY DEFINER
BEGIN
  -- Executes with creator's authority, allowing updates even if caller has 0 table rights!
  UPDATE accounts SET balance = balance - p_amt WHERE account_id = p_from;
  UPDATE accounts SET balance = balance + p_amt WHERE account_id = p_to;
END;`,
      explanation:
        "Routine privileges allow calling stored procedures without granting direct access to underlying database tables. Using SQL SECURITY DEFINER, procedures execute with the creator's authority, enabling restricted users to execute validated business logic while having zero direct table privileges.",
      keyTakeaways: [
        "Stored procedure privileges reside in mysql.procs_priv.",
        "SQL SECURITY DEFINER executes with procedure creator's authority.",
        "SQL SECURITY INVOKER requires the calling user to hold direct table privileges."
      ]
    },
    level4_dynamic_privileges: {
      levelNumber: "Modern Architecture: Dynamic Privileges",
      title: "4. Replacing SUPER with MySQL 8.0 Dynamic Privileges",
      badge: "Least Privilege",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ DECOMPOSING 'SUPER' INTO GRANULAR DYNAMIC PRIVILEGES:

-- Legacy Anti-Pattern (Dangerous Root Access):
-- GRANT SUPER ON *.* TO 'ops_engineer'@'localhost';

-- Modern MySQL 8.0 Best Practice:
-- 1. For Backup operators:
GRANT BACKUP_ADMIN, BINLOG_ADMIN ON *.* TO 'backup_bot'@'localhost';

-- 2. For Monitoring tools (Prometheus / Datadog):
GRANT PROCESS, SHOW DATABASES ON *.* TO 'monitoring_agent'@'localhost';

-- 3. For Configuration management:
GRANT SYSTEM_VARIABLES_ADMIN, PERSIST_RO_VARIABLES_ADMIN ON *.* TO 'ansible_admin'@'localhost';`,
      explanation:
        "In MySQL 5.7, the SUPER privilege was an all-or-nothing root-level master key. MySQL 8.0 deprecated SUPER in favor of over 30 Dynamic Privileges. This allows assigning targeted administrative rights (like taking backups or persisting variables) without giving full server control.",
      keyTakeaways: [
        "SUPER is deprecated in MySQL 8.0 and partitioned into Dynamic Privileges.",
        "Dynamic Privileges are registered dynamically by components and plugins.",
        "Crucial for enforcing the Principle of Least Privilege across DevOps fleets."
      ]
    }
  };

  const currentLevel = privilegeLevels[selectedPrivilegeLevel];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 5 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Granular Privilege Levels: <span className="text-emerald-400">Global</span>, <span className="text-cyan-400">Database</span>, <span className="text-amber-400">Table</span>, <span className="text-purple-400">Column</span> &amp; Routine
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Deep architectural mastery of the 5-tier authorization hierarchy in MySQL 8.0: understanding permission evaluation cascades, column-level PII masking, stored routine security contexts (DEFINER vs INVOKER), and replacing the deprecated <code>SUPER</code> privilege with Dynamic Privileges.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: The 5-Tier Privilege Hierarchy ──────────────── */}
        <section id="hierarchy-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 5-Tier Authorization Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL organizes and evaluates access rights from server-wide to individual column cells.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Level 1: Global</span>
              <h3 className="text-sm font-bold text-white">*.*</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies server-wide to all databases and tables. Stored in <code>mysql.user</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Level 2: Database</span>
              <h3 className="text-sm font-bold text-white">db_name.*</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies to all objects in a specific schema. Stored in <code>mysql.db</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Level 3: Table</span>
              <h3 className="text-sm font-bold text-white">db.table</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies to all rows/columns of a table. Stored in <code>mysql.tables_priv</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Level 4: Column</span>
              <h3 className="text-sm font-bold text-purple-300">db.table(cols)</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Exposes specific attributes only. Stored in <code>mysql.columns_priv</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Level 5: Routine</span>
              <h3 className="text-sm font-bold text-rose-300">PROC / FUNC</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Executes stored programs with DEFINER rights. Stored in <code>mysql.procs_priv</code>.
              </p>
            </div>
          </div>

          {/* System Tables Mapping */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-200 uppercase font-mono text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Privilege Scope</th>
                  <th className="py-3.5 px-4 text-emerald-400">Target Object</th>
                  <th className="py-3.5 px-4 text-cyan-400">System Table</th>
                  <th className="py-3.5 px-4 text-amber-400">Permitted Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">Global Scope</td>
                  <td className="py-3 px-4 text-emerald-300">*.*</td>
                  <td className="py-3 px-4 text-cyan-300">mysql.user</td>
                  <td className="py-3 px-4 text-slate-300">All DDL/DML + Admin (SHUTDOWN, PROCESS, RELOAD)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">Database Scope</td>
                  <td className="py-3 px-4 text-emerald-300">schema_name.*</td>
                  <td className="py-3 px-4 text-cyan-300">mysql.db</td>
                  <td className="py-3 px-4 text-slate-300">CREATE, DROP, ALTER, SELECT, INSERT, UPDATE, DELETE</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">Table Scope</td>
                  <td className="py-3 px-4 text-emerald-300">schema_name.table_name</td>
                  <td className="py-3 px-4 text-cyan-300">mysql.tables_priv</td>
                  <td className="py-3 px-4 text-slate-300">SELECT, INSERT, UPDATE, DELETE, INDEX, ALTER, TRIGGER</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">Column Scope</td>
                  <td className="py-3 px-4 text-emerald-300">table_name(col1, col2)</td>
                  <td className="py-3 px-4 text-cyan-300">mysql.columns_priv</td>
                  <td className="py-3 px-4 text-purple-300">SELECT, INSERT, UPDATE, REFERENCES only</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">Routine Scope</td>
                  <td className="py-3 px-4 text-emerald-300">PROCEDURE / FUNCTION</td>
                  <td className="py-3 px-4 text-cyan-300">mysql.procs_priv</td>
                  <td className="py-3 px-4 text-rose-300">EXECUTE, ALTER ROUTINE, GRANT OPTION</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Authorization Workbench ─────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Privilege Level Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore DDL syntax, grant mechanics, and security implications across each tier.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(privilegeLevels).map((levelKey) => {
              const level = privilegeLevels[levelKey];
              const isSelected = selectedPrivilegeLevel === levelKey;
              return (
                <button
                  key={levelKey}
                  onClick={() => setSelectedPrivilegeLevel(levelKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {level.levelNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentLevel.levelNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentLevel.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentLevel.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentLevel.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentLevel.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentLevel.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentLevel.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentLevel.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL DDL &amp; Data Dictionary Inspection:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentLevel.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentLevel.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Case studies in Barrackpore and Kolkata illustrating Column-level PII protection and Procedure-level ledger encapsulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Masking Credit Card Hashes in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  PII Protected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail customer service agents needed to view order items and update shipping statuses from 'PENDING' to 'DISPATCHED'. Rather than granting table-level <code>SELECT</code> on <code>orders</code> (which contained sensitive credit card hashes), Mamata granted Column Privileges: <code>GRANT SELECT (order_id, customer_name, order_status), UPDATE (order_status) ON orders TO 'support_rep';</code>. Any attempt to read financial columns threw Error 1142.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Encapsulating ₹10 Crore Ledgers in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Direct Access
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a banking microservice needed to process automated GST tax deductions across accounts holding over ₹10 Crores. Debangshu encapsulated the deduction logic inside a stored procedure defined with <code>SQL SECURITY DEFINER</code> and granted only <code>EXECUTE</code> to the service account. The service account possessed 0 direct table privileges, preventing unauthorized ad-hoc table queries or SQL injection mutations.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous over-granting and authorization anti-patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Assuming Privileges are Subtractive
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Granting <code>SELECT ON db.*</code> and then attempting to <code>REVOKE SELECT ON db.salaries</code> fails with Error 1147. MySQL permissions are purely additive.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Never grant db.* if one or more tables must remain restricted.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Granting SUPER to DevOps or Backup Scripts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assigning the legacy <code>SUPER</code> privilege gives complete root-equivalent power to modify system variables, terminate connections, and bypass read-only mode.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Grant specific Dynamic Privileges (e.g. BACKUP_ADMIN, SYSTEM_VARIABLES_ADMIN).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Views for Complex Masking &amp; Filtering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                While Column Privileges restrict attributes, SQL Views combine column masking with row-level filtering (WHERE clauses) and ensure seamless ORM model mapping.
              </p>
              <div className="text-xs text-slate-400">
                Grant SELECT on the View while giving 0 permissions on the base tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Regular Privilege Audits via SHOW GRANTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Periodically inspect <code>mysql.tables_priv</code> and <code>mysql.columns_priv</code> to identify orphaned grants left behind after employee reassignments.
              </p>
              <div className="text-xs text-slate-400">
                Maintains clean security posture and compliance with ISO 27001 / SOC 2.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 5: Granular Privilege Levels – Global, Database, Table, Column, and Routine Privileges"
            content={noteText}
          />

          <Teacher
            note="Granular privilege design is the cornerstone of database security. Remember that MySQL permissions are strictly additive—if you grant SELECT at the database level, you cannot revoke it on a single table. Structure your application access starting from Table and Column levels, encapsulate complex multi-table mutations inside DEFINER stored procedures, and always replace legacy SUPER with MySQL 8.0 Dynamic Privileges!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL privilege hierarchy, column-level security, and routine definer contexts.
            </p>
          </div>

          <FAQTemplate
            title="Granular Privilege Levels FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
