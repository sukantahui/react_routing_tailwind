import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Verifying Permissions with SHOW GRANTS and Inspecting mysql.user System Table
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive privilege audit workbench: mastering SHOW GRANTS variations, inspecting the 6 data dictionary grant tables, querying dynamic privileges in mysql.global_grants, and executing automated security compliance audits in MySQL 8.0.
 */
const Topic7 = () => {
  // Interactive Audit State
  const [selectedAuditPhase, setSelectedAuditPhase] = useState("phase1_show_grants");

  const auditPhases = {
    phase1_show_grants: {
      phaseNumber: "Phase 1: SHOW GRANTS Command",
      title: "1. The SHOW GRANTS Inspection Suite",
      badge: "Effective Privilege Output",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔍 SHOW GRANTS VARIATIONS & INSPECTION:

-- 1. Inspect current session's effective permissions:
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER();

-- 2. Inspect a specific target user account:
SHOW GRANTS FOR 'support_rep'@'10.0.%.%';

-- 3. Simulate effective privileges with an active role enabled:
SHOW GRANTS FOR 'susmita_analyst'@'%' USING 'finance_reporting_role';`,
      explanation:
        "SHOW GRANTS displays the canonical SQL statements required to recreate the active permissions of a user or role. Using the USING clause allows administrators to simulate how role inheritance expands effective permissions.",
      keyTakeaways: [
        "Any user can inspect their own grants via SHOW GRANTS FOR CURRENT_USER.",
        "Inspecting other users requires SELECT on mysql.* or SYSTEM_USER privilege.",
        "USING 'role' displays effective permissions when a role is activated."
      ]
    },
    phase2_system_tables: {
      phaseNumber: "Phase 2: Data Dictionary Inspection",
      title: "2. Inspecting the 5 Core System Grant Tables",
      badge: "Data Dictionary Audit",
      badgeColor: "cyan",
      sqlSnippet: `-- 🗄️ DIRECT SYSTEM TABLE AUDITING:

-- 1. Global privileges & account status (mysql.user):
SELECT User, Host, plugin, account_locked, password_expired, password_last_changed 
FROM mysql.user 
ORDER BY User;

-- 2. Database-level grants (mysql.db):
SELECT Host, Db, User, Select_priv, Insert_priv, Update_priv FROM mysql.db;

-- 3. Table and Column-level grants (mysql.tables_priv & mysql.columns_priv):
SELECT Host, Db, User, Table_name, Table_priv, Grantor FROM mysql.tables_priv;
SELECT Host, Db, User, Table_name, Column_name, Column_priv FROM mysql.columns_priv;`,
      explanation:
        "MySQL records authorization metadata across specialized tables in the mysql schema. Inspecting these tables provides comprehensive insight into global flags, database perimeters, table permissions, and column-level PII restrictions.",
      keyTakeaways: [
        "mysql.user stores account metadata, locking status, and global flags.",
        "mysql.tables_priv and mysql.columns_priv store SET-based grant data.",
        "The Grantor column provides forensic trails of who provisioned permissions."
      ]
    },
    phase3_dynamic_and_roles: {
      phaseNumber: "Phase 3: Dynamic Grants & Roles",
      title: "3. Auditing Dynamic Privileges & RBAC Role Graphs",
      badge: "MySQL 8.0 RBAC",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ AUDITING DYNAMIC PRIVILEGES & ROLE EDGES:

-- 1. Inspect Dynamic Privileges (mysql.global_grants):
SELECT USER, HOST, PRIVILEGE, WITH_GRANT_OPTION 
FROM mysql.global_grants 
ORDER BY PRIVILEGE, USER;

-- 2. Inspect Role Assignment Graph (mysql.role_edges):
SELECT FROM_USER AS Role_Name, TO_USER AS Granted_User, TO_HOST 
FROM mysql.role_edges;

-- 3. Inspect Default Activated Roles (mysql.default_roles):
SELECT USER, HOST, DEFAULT_ROLE_USER, DEFAULT_ROLE_HOST 
FROM mysql.default_roles;`,
      explanation:
        "MySQL 8.0 stores dynamic privileges in mysql.global_grants and RBAC role inheritance in mysql.role_edges. Auditing these tables allows security teams to map out role hierarchies and ensure least-privilege compliance across microservices.",
      keyTakeaways: [
        "mysql.global_grants records dynamic privileges like SYSTEM_VARIABLES_ADMIN.",
        "mysql.role_edges models the directed graph of role assignments.",
        "mysql.default_roles tracks which roles automatically activate upon login."
      ]
    },
    phase4_security_audit_queries: {
      phaseNumber: "Phase 4: Automated Security Audits",
      title: "4. Automated Compliance & Security Vulnerability Scans",
      badge: "Compliance Scanning",
      badgeColor: "rose",
      sqlSnippet: `-- 🚨 AUTOMATED COMPLIANCE & VULNERABILITY AUDIT QUERIES:

-- 1. Detect accounts with dangerous Global Admin privileges:
SELECT User, Host, plugin, account_locked 
FROM mysql.user 
WHERE Super_priv = 'Y' OR Reload_priv = 'Y' OR Shutdown_priv = 'Y';

-- 2. Detect stale passwords not rotated in over 180 days:
SELECT User, Host, password_last_changed, 
       DATEDIFF(NOW(), password_last_changed) AS days_since_rotation 
FROM mysql.user 
WHERE password_last_changed < NOW() - INTERVAL 180 DAY
  AND account_locked = 'N';

-- 3. Detect non-localhost accounts without mandatory SSL:
SELECT User, Host, ssl_type FROM mysql.user WHERE ssl_type = '' AND Host != 'localhost';`,
      explanation:
        "Production database auditing requires proactive, automated SQL scripts to detect over-privileged accounts, obsolete passwords, unencrypted connection permissions, and orphaned grant records before auditors or attackers discover them.",
      keyTakeaways: [
        "Audit Super_priv = 'Y' to prevent unauthorized administrative escalation.",
        "Audit password_last_changed to enforce corporate password rotation policies.",
        "Audit ssl_type = '' to eliminate unencrypted remote TCP database connections."
      ]
    }
  };

  const currentPhase = auditPhases[selectedAuditPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 7 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Verifying Permissions with <span className="text-emerald-400">SHOW GRANTS</span> &amp; Inspecting <span className="text-cyan-400">mysql.user</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive guide to database privilege auditing in MySQL 8.0: mastering the <code>SHOW GRANTS</code> suite, querying the 6 core data dictionary tables (<code>mysql.user</code>, <code>mysql.db</code>, <code>mysql.tables_priv</code>, <code>mysql.columns_priv</code>, <code>mysql.procs_priv</code>, <code>mysql.global_grants</code>), and automating enterprise security compliance scans.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: System Tables Reference Matrix ──────────────── */}
        <section id="system-tables-matrix" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Data Dictionary Grant Tables Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The internal data dictionary architecture storing MySQL authorization metadata.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-200 uppercase font-mono text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">System Table</th>
                  <th className="py-3.5 px-4 text-emerald-400">Scope Level</th>
                  <th className="py-3.5 px-4 text-cyan-400">Key Columns</th>
                  <th className="py-3.5 px-4 text-amber-400">Audit Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.user</td>
                  <td className="py-3 px-4 text-emerald-300">Global (*.*)</td>
                  <td className="py-3 px-4 text-cyan-300">User, Host, plugin, account_locked, Super_priv</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Account credentials, locks, and global static flags</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.db</td>
                  <td className="py-3 px-4 text-emerald-300">Database (db.*)</td>
                  <td className="py-3 px-4 text-cyan-300">Host, Db, User, Select_priv, Insert_priv</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Schema-wide DDL and DML permissions</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.tables_priv</td>
                  <td className="py-3 px-4 text-emerald-300">Table (db.tbl)</td>
                  <td className="py-3 px-4 text-cyan-300">Table_name, Table_priv, Grantor, Timestamp</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Individual table permissions and grantor audit trails</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.columns_priv</td>
                  <td className="py-3 px-4 text-emerald-300">Column (tbl(col))</td>
                  <td className="py-3 px-4 text-cyan-300">Table_name, Column_name, Column_priv</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Attribute-level read/write permissions for PII masking</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.procs_priv</td>
                  <td className="py-3 px-4 text-emerald-300">Routine</td>
                  <td className="py-3 px-4 text-cyan-300">Routine_name, Routine_type, Proc_priv</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Stored procedure and function execution rights</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-sans font-semibold text-white">mysql.global_grants</td>
                  <td className="py-3 px-4 text-emerald-300">Dynamic Privs</td>
                  <td className="py-3 px-4 text-cyan-300">USER, HOST, PRIVILEGE, WITH_GRANT_OPTION</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">MySQL 8.0 Dynamic Privileges (BACKUP_ADMIN, etc.)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Privilege Audit Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and explore SHOW GRANTS commands, data dictionary queries, and automated compliance scans.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(auditPhases).map((phaseKey) => {
              const phase = auditPhases[phaseKey];
              const isSelected = selectedAuditPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedAuditPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Query Implementation:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
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
              Auditing case studies in Barrackpore and Kolkata illustrating automated compliance reporting and stale credential detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Automated ISO 27001 Audits in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  100% Pass Rate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a retail database cluster managing ₹30 Lakhs in daily sales required quarterly ISO 27001 access control certification. Mamata wrote an automated Python script executing <code>SHOW GRANTS</code> across all 45 microservice accounts, comparing output statements against approved architectural baselines. The script flagged 2 unapproved table grants left behind during a weekend hotfix, allowing immediate remediation.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Identifying Stale Credentials in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  14 Accounts Locked
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a banking cluster handling ₹50 Crores in transaction ledgers needed to enforce a 90-day password rotation mandate. Debangshu queried <code>SELECT User, Host, password_last_changed FROM mysql.user WHERE password_last_changed &lt; NOW() - INTERVAL 90 DAY;</code>. The audit identified 14 inactive developer accounts, which were immediately locked with <code>ACCOUNT LOCK</code> to prevent credential stuffing attacks.
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
              Avoid dangerous auditing blindspots and permission leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Granting SELECT on mysql.* to Application Users
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Granting <code>SELECT ON mysql.*</code> to allow an application to run <code>SHOW GRANTS</code> exposes password hashes and account metadata across the entire database server.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Grant SELECT on information_schema views rather than raw mysql tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Inactive Roles in SHOW GRANTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>SHOW GRANTS FOR 'user'@'host'</code> only shows direct grants and assigned role names, hiding permissions until the role is simulated with the <code>USING</code> clause.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use SHOW GRANTS ... USING 'role_name' when auditing RBAC users.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Automate Stale Password Scans
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule nightly cron jobs querying <code>mysql.user</code> for accounts whose passwords exceed maximum organizational age.
              </p>
              <div className="text-xs text-slate-400">
                Automatically alerts the security operations center (SOC) to rotate credentials.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Verify CURRENT_USER() in Multi-Host Setups
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When debugging authorization failures, execute <code>SELECT CURRENT_USER();</code> to verify which host matching rule was applied to the connection.
              </p>
              <div className="text-xs text-slate-400">
                Distinguishes between IP-specific accounts and wildcard fallback rules.
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
            title="Topic 7: Verifying Permissions with SHOW GRANTS and Inspecting mysql.user System Table"
            content={noteText}
          />

          <Teacher
            note="Regular privilege auditing is what separates junior administrators from senior database architects. Make SHOW GRANTS and data dictionary inspection (mysql.user, mysql.tables_priv, mysql.global_grants) part of your automated CI/CD pipeline. Always check for stale passwords, verify that zero application accounts hold Super_priv = 'Y', and use the USING clause when auditing users assigned to MySQL 8.0 roles!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of SHOW GRANTS, system grant tables, and compliance auditing.
            </p>
          </div>

          <FAQTemplate
            title="SHOW GRANTS &amp; Data Dictionary Inspection FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
