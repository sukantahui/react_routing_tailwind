import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – MySQL Security Architecture and Privilege System Overview
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive security architecture workbench: exploring the two-stage access control pipeline (Authentication vs Authorization), inspecting the 5-tier privilege hierarchy (mysql.user to mysql.columns_priv), breaking down dynamic vs static privileges, and demystifying in-memory grant table caching.
 */
const Topic0 = () => {
  // Interactive Security Phase State
  const [selectedSecurityPhase, setSelectedSecurityPhase] = useState("phase1_twostage_pipeline");

  const securityPhases = {
    phase1_twostage_pipeline: {
      phaseNumber: "Phase 1: 2-Stage Verification",
      title: "1. The Two-Stage Access Control Pipeline",
      badge: "Access Control Pipeline",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ THE TWO-STAGE ACCESS CONTROL EVALUATION:

-- STAGE 1: CONNECTION VERIFICATION (Authentication Handshake):
-- MySQL verifies: Username + Client Host + Password/Plugin.
-- Querying account credentials from mysql.user:
SELECT user, host, plugin, account_locked, password_expired 
FROM mysql.user 
WHERE user = 'app_user';
-- If password matches and host is allowed: CONNECTION GRANTED ✅
-- If mismatch: Error 1045: Access denied for user 'app_user'@'192.168.1.50' ❌

-- STAGE 2: REQUEST VERIFICATION (Query Authorization):
-- User attempts: SELECT * FROM billing_db.invoices;
-- MySQL inspects cached ACLs:
-- 1. Does user have Global SELECT in mysql.user?
-- 2. Does user have DB SELECT in mysql.db for 'billing_db'?
-- 3. Does user have Table SELECT in mysql.tables_priv for 'invoices'?
-- If YES → Query Executes! ⚡
-- If NO  → Error 1142: SELECT command denied to user 'app_user'@'...' ❌`,
      metricsTable: [
        { stage: "Stage 1: Connection", checks: "User, Client Host, Password, Account Lock", outcome: "TCP Session Established or Error 1045 🔒" },
        { stage: "Stage 2: Request", checks: "SQL Command, Target DB, Table, Column", outcome: "Statement Executed or Error 1142 🚫" },
        { stage: "Identity Model", checks: "'username'@'host' (e.g. 'root'@'localhost')", outcome: "Granular network perimeter control" },
        { stage: "Memory Cache", checks: "RAM Hash Tables and Arrays", outcome: "Sub-microsecond authorization checks" }
      ],
      explanation:
        "MySQL enforces a strict separation between Authentication (Stage 1: 'Can you connect to the server?') and Authorization (Stage 2: 'Can you execute this SQL statement on this object?'). Both stages must succeed for a query to run."
    },
    phase2_privilege_hierarchy: {
      phaseNumber: "Phase 2: 5-Tier Hierarchy",
      title: "2. The 5-Tier Privilege Hierarchy & System Tables",
      badge: "Privilege Scopes",
      badgeColor: "cyan",
      sqlSnippet: `-- 🏛️ 5 PRIVILEGE SCOPE TIERS & THEIR UNDERLYING SYSTEM TABLES:

-- Tier 1: Global Scope (*.*) → Stored in mysql.user:
GRANT SELECT, INSERT ON *.* TO 'super_auditor'@'localhost';

-- Tier 2: Database Scope (db_name.*) → Stored in mysql.db:
GRANT SELECT, INSERT, UPDATE ON student_portal.* TO 'portal_app'@'192.168.1.%';

-- Tier 3: Table Scope (db_name.tbl_name) → Stored in mysql.tables_priv:
GRANT SELECT ON student_portal.exam_results TO 'teacher_staff'@'%';

-- Tier 4: Column Scope (db_name.tbl_name(col)) → Stored in mysql.columns_priv:
GRANT SELECT (student_id, student_name, grade) 
ON student_portal.students TO 'report_viewer'@'%';

-- Tier 5: Routine Scope (PROCEDURE / FUNCTION) → Stored in mysql.procs_priv:
GRANT EXECUTE ON PROCEDURE student_portal.CalculateSemesterGPA 
TO 'academic_dean'@'localhost';`,
      metricsTable: [
        { tier: "Tier 1: Global", scope: "*.* (All DBs & Objects)", table: "mysql.user", role: "Server-wide administrative access" },
        { tier: "Tier 2: Database", scope: "db_name.* (All tables in DB)", table: "mysql.db", role: "Application service accounts" },
        { tier: "Tier 3: Table", scope: "db.table (Specific table)", table: "mysql.tables_priv", role: "Granular table access control" },
        { tier: "Tier 4: Column", scope: "db.table(col1, col2)", table: "mysql.columns_priv", role: "Hiding sensitive columns (e.g. salary)" },
        { tier: "Tier 5: Routine", scope: "PROCEDURE / FUNCTION", table: "mysql.procs_priv", role: "Encapsulated logic execution" }
      ],
      explanation:
        "Privileges cascade downwards: a user with Global `SELECT` can read all tables across all databases. Fine-grained security applies Table and Column-level grants to restrict users to specific data views without exposing entire schemas."
    },
    phase3_dynamic_privileges: {
      phaseNumber: "Phase 3: Dynamic Privileges",
      title: "3. Dynamic Privileges in MySQL 8.0: Deconstructing SUPER",
      badge: "MySQL 8.0 Security",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ DECONSTRUCTING THE MONOLITHIC 'SUPER' PRIVILEGE:
-- In MySQL 5.7, 'SUPER' gave total, unchecked administrative power.
-- In MySQL 8.0, Dynamic Privileges provide granular admin permissions:

-- 1. Backup Operator Account (Can run backups without viewing confidential data!):
GRANT BACKUP_ADMIN ON *.* TO 'backup_agent'@'10.0.0.5';

-- 2. Replication Monitoring Account (Can manage replication slaves):
GRANT REPLICATION_SLAVE_ADMIN, REPLICATION_APPLIER_ADMIN ON *.* TO 'repl_mgr'@'localhost';

-- 3. System Variable Manager (Can tune global parameters without DROP permissions):
GRANT SYSTEM_VARIABLES_ADMIN, PERSIST_RO_VARIABLES_ADMIN ON *.* TO 'dba_tuner'@'localhost';

-- 4. Connection Limiter Bypass (Allows DBAs to connect when max_connections is full):
GRANT CONNECTION_ADMIN ON *.* TO 'emergency_admin'@'localhost';`,
      metricsTable: [
        { dynamicPriv: "BACKUP_ADMIN", replaces: "SUPER for backup tools", benefit: "Prevents backup scripts from executing arbitrary DDL 🔒" },
        { dynamicPriv: "SYSTEM_VARIABLES_ADMIN", replaces: "SUPER for SET GLOBAL", benefit: "Enables configuration tuning without full root power" },
        { dynamicPriv: "REPLICATION_SLAVE_ADMIN", replaces: "SUPER for replication", benefit: "Isolates replication topology control" },
        { dynamicPriv: "CONNECTION_ADMIN", replaces: "SUPER for emergency login", benefit: "Bypasses max_connections during outages" }
      ],
      explanation:
        "MySQL 8.0 introduces Dynamic Privileges, breaking down the monolithic and dangerous `SUPER` privilege into isolated, purpose-built permissions (like `BACKUP_ADMIN` and `SYSTEM_VARIABLES_ADMIN`) that enforce the Principle of Least Privilege."
    },
    phase4_flush_privileges_myth: {
      phaseNumber: "Phase 4: Caching & FLUSH Myth",
      title: "4. In-Memory Grant Table Caching & The FLUSH PRIVILEGES Myth",
      badge: "Memory Architecture",
      badgeColor: "rose",
      sqlSnippet: `-- 🧠 HOW MYSQL CACHES PRIVILEGES IN RAM:
-- At startup, mysqld reads mysql.user, mysql.db, etc. into RAM hash tables.

-- WHEN YOU RUN STANDARD DDL STATEMENTS:
CREATE USER 'mamata'@'localhost' IDENTIFIED BY 'SecretPass#2026';
GRANT SELECT, INSERT ON college_db.* TO 'mamata'@'localhost';
REVOKE INSERT ON college_db.* FROM 'mamata'@'localhost';

-- ✅ MYSQL UPDATES BOTH THE ON-DISK TABLES AND IN-MEMORY CACHE ATOMICALLY!
-- NO 'FLUSH PRIVILEGES' IS NEEDED! IT TAKES EFFECT INSTANTLY! ⚡

-- ⚠️ THE ONLY TIME 'FLUSH PRIVILEGES' IS REQUIRED:
-- If an old script directly executes raw SQL INSERT/UPDATE on system tables:
-- UPDATE mysql.user SET authentication_string = '...' WHERE user = 'test';
-- FLUSH PRIVILEGES; -- (Required because direct DML bypasses the internal cache!)
-- (Note: Direct DML on system tables is strongly deprecated in MySQL 8.0!)`,
      metricsTable: [
        { operation: "GRANT / REVOKE / CREATE USER", updatesDisk: "YES ✅", updatesMemoryRAM: "YES (Instant Atomic) ✅", flushNeeded: "NO (Never needed!) 🚀" },
        { operation: "ALTER USER / DROP USER", updatesDisk: "YES ✅", updatesMemoryRAM: "YES (Instant Atomic) ✅", flushNeeded: "NO (Never needed!) 🚀" },
        { operation: "Direct DML: UPDATE mysql.user", updatesDisk: "YES", updatesMemoryRAM: "NO (Bypasses engine cache) ❌", flushNeeded: "YES (Mandatory!)" },
        { operation: "Modern Best Practice", updatesDisk: "Use DDL Commands", updatesMemoryRAM: "Automatic In-Memory Sync", flushNeeded: "Zero FLUSH calls" }
      ],
      explanation:
        "MySQL maintains an in-memory RAM cache of all privilege tables for zero-overhead query authorization. All standard privilege commands (`GRANT`, `REVOKE`, `CREATE USER`) automatically update both disk tables and in-memory caches simultaneously; `FLUSH PRIVILEGES` is a legacy relic that is never needed in modern workflows."
    }
  };

  const navItems = [
    { id: "security-overview", label: "1. Security System Overview" },
    { id: "pipeline-diagram", label: "2. 2-Stage Pipeline Diagram" },
    { id: "interactive-workbench", label: "3. Security Architecture Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Security Audit Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_003</span>
            <span>•</span>
            <span>Topic 0 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Security Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            MySQL Security Architecture and Privilege System Overview
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the core security architecture of MySQL: explore the <code className="text-emerald-400 font-mono">Two-Stage Verification</code> pipeline (Authentication vs Authorization), navigate the <code className="text-cyan-400 font-mono">5-Tier Privilege Hierarchy</code>, leverage MySQL 8.0 <code className="text-amber-400 font-mono">Dynamic Privileges</code>, and demystify in-memory grant table caching.
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
        {/* SECTION 1: Security Overview */}
        <section id="security-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Fundamental Security Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL coordinates authentication handshakes, authorization checks, and privilege caching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Stage 1 Check</span>
              <h3 className="font-bold text-white">Connection Auth</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verifies username, client host, and password against `mysql.user`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. Stage 2 Check</span>
              <h3 className="font-bold text-white">Request ACL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verifies if SQL command is authorized on the target database/table/column.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. 5 Scopes</span>
              <h3 className="font-bold text-white">Privilege Tiers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Global → Database → Table → Column → Stored Routine privileges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Dynamic Privs</span>
              <h3 className="font-bold text-white">Deconstructed SUPER</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Granular admin capabilities (BACKUP_ADMIN, SYSTEM_VARIABLES_ADMIN).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pipeline Diagram */}
        <section id="pipeline-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: The Two-Stage Verification Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Tracing an incoming client connection through Stage 1 authentication and Stage 2 request authorization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 0.1: MySQL Two-Stage Access Control Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Access Control Flow</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrSecCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Client Connection Request */}
                <rect x="20" y="40" width="240" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="140" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  CLIENT CONNECTION
                </text>
                <line x1="20" y1="85" x2="260" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="210" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="127" fill="#bae6fd" fontSize="10" fontWeight="bold">User: 'mamata'</text>
                <text x="45" y="143" fill="#94a3b8" fontSize="9">Client IP: 192.168.1.50</text>

                <rect x="35" y="165" width="210" height="60" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="187" fill="#bae6fd" fontSize="10" fontWeight="bold">Incoming SQL Request:</text>
                <text x="45" y="205" fill="#34d399" fontSize="9 font-mono">SELECT * FROM college_db.students;</text>

                <rect x="35" y="235" width="210" height="60" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="45" y="255" fill="#a7f3d0" fontSize="9" fontWeight="bold">TLS / SSL Encrypted</text>
                <text x="45" y="275" fill="#94a3b8" fontSize="8">TCP Handshake on Port 3306</text>

                {/* Box 2: Stage 1 Authentication */}
                <rect x="295" y="40" width="290" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="440" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  STAGE 1: AUTHENTICATION
                </text>
                <line x1="295" y1="85" x2="585" y2="85" stroke="#334155" />

                <rect x="310" y="105" width="260" height="60" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="320" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">Identity Match in mysql.user:</text>
                <text x="320" y="145" fill="#34d399" fontSize="9">'mamata'@'192.168.1.%' matches IP! ✅</text>

                <rect x="310" y="175" width="260" height="60" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="320" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">Password &amp; Plugin Check:</text>
                <text x="320" y="215" fill="#34d399" fontSize="9">caching_sha2_password Verified ✅</text>

                <rect x="310" y="245" width="260" height="50" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="320" y="267" fill="#34d399" fontSize="10" fontWeight="bold">Session Handshake Established</text>
                <text x="320" y="283" fill="#94a3b8" fontSize="8">Fails here → Error 1045 Access Denied</text>

                {/* Box 3: Stage 2 Authorization */}
                <rect x="620" y="40" width="310" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="775" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  STAGE 2: AUTHORIZATION (ACL)
                </text>
                <line x1="620" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="635" y="105" width="280" height="60" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="645" y="127" fill="#fde68a" fontSize="10" fontWeight="bold">Cached In-Memory ACL Lookup:</text>
                <text x="645" y="145" fill="#bae6fd" fontSize="9">Checking mysql.db for 'college_db'...</text>

                <rect x="635" y="175" width="280" height="60" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="645" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">Privilege Resolved:</text>
                <text x="645" y="215" fill="#34d399" fontSize="9">SELECT_PRIV = 'Y' → AUTHORIZED! ⚡</text>

                <rect x="635" y="245" width="280" height="50" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="645" y="267" fill="#34d399" fontSize="10" fontWeight="bold">Query Execution in InnoDB Engine</text>
                <text x="645" y="283" fill="#94a3b8" fontSize="8">Fails here → Error 1142 Command Denied</text>

                {/* Connecting Arrows */}
                <path d="M 260 140 L 310 140" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrSecCyan)" />
                <path d="M 585 140 L 635 140" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrSecCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Security Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Security Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a security phase to inspect authentication workflows, 5-tier privilege scopes, dynamic admin privileges, and in-memory caches.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(securityPhases).map((key) => {
              const ph = securityPhases[key];
              const isSelected = selectedSecurityPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSecurityPhase(key)}
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
                {securityPhases[selectedSecurityPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  securityPhases[selectedSecurityPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  securityPhases[selectedSecurityPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  securityPhases[selectedSecurityPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  securityPhases[selectedSecurityPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {securityPhases[selectedSecurityPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Security Architecture &amp; Privilege SQL Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {securityPhases[selectedSecurityPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Access Control &amp; System Table Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Stage / Tier / Priv</th>
                      <th className="py-2.5 px-4">Scope / Table / Updates</th>
                      <th className="py-2.5 px-4">Role / Outcome / Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {securityPhases[selectedSecurityPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.stage || row.tier || row.dynamicPriv || row.operation}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.checks || row.scope || row.replaces || row.updatesDisk}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.outcome || row.role || row.benefit || row.flushNeeded}
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
                {securityPhases[selectedSecurityPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Security Architecture Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Isolating application service accounts and implementing least privilege in West Bengal organizations.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Service Account Isolation */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 'root' Application Connections in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Least Privilege Enforced
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an examination portal previously connected to MySQL using `'root'@'%'` with unrestricted global privileges. Following a security audit, they created a dedicated application account `'exam_app'@'192.168.1.%'` restricted strictly to `SELECT, INSERT, UPDATE` on `college_db.*` with no `DROP` or administrative permissions, preventing any risk of accidental schema destruction.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Dynamic Backup Privilege */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Deploying BACKUP_ADMIN in Kolkata Banking Cluster
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero SUPER Privilege
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, automated nightly backup cron jobs previously ran with the full `SUPER` administrative privilege. Upgrading to MySQL 8.0 allowed granting `BACKUP_ADMIN` and `RELOAD` specifically to `'backup_agent'@'10.0.0.5'`, enabling consistent backups without granting the backup script permissions to read customer account balances or alter system variables.
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
              Avoid wildcard host vulnerabilities and unnecessary FLUSH PRIVILEGES commands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Granting Global Wildcard Host ('%')
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating accounts with `'user'@'%'` opens authentication to the entire internet, exposing the instance to brute-force network attacks.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Restrict host to specific IP subnets (e.g. '192.168.1.%' or 'localhost').
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Running FLUSH PRIVILEGES Blindly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running `FLUSH PRIVILEGES` after every `GRANT` creates unnecessary locks on grant tables and indicates a misunderstanding of MySQL's atomic DDL updates.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Never use FLUSH PRIVILEGES when using GRANT / REVOKE DDL.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Column Privileges for PII
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Grant column-level permissions (`GRANT SELECT (id, name) ON tbl`) to analytics accounts to automatically conceal salary or PAN card numbers.
              </p>
              <div className="text-xs text-slate-400">
                Database-level PII protection without application views.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Adopt Dynamic Privileges
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Replace `SUPER` grants with fine-grained dynamic privileges like `BACKUP_ADMIN` and `SYSTEM_VARIABLES_ADMIN` in MySQL 8.0+.
              </p>
              <div className="text-xs text-slate-400">
                Strict enforcement of the Principle of Least Privilege.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Security Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Security Architecture Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify security configuration and privilege assignments in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Security Architecture Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">No App Root</strong> = Verify web applications never connect using `'root'`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Host Scoped</strong> = Ensure all service accounts are bound to specific CIDR subnets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Least Privilege</strong> = Grant only required DML permissions (`SELECT`, `INSERT`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">SUPER Deprecated</strong> = Audit and replace `SUPER` grants with Dynamic Privileges.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the 2-Stage Separation...”</span>
                  If a developer complains 'I cannot connect to the database', that is Stage 1 (Error 1045). If they say 'I connected, but my query fails', that is Stage 2 (Error 1142). Distinguishing between Authentication and Authorization saves hours of troubleshooting!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about In-Memory ACL Speed...”</span>
                  MySQL's authorization checks do not touch the disk! The entire privilege matrix is pre-loaded into high-speed RAM hash tables during startup, allowing authorization validation to complete in sub-microsecond time!
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
              Comprehensive reference questions covering MySQL Security Architecture, 2-Stage Verification, Dynamic Privileges, and Grant Tables.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Security Architecture & Privilege System FAQs"
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
            title="MySQL Security Architecture and Privilege System Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Database security is the ultimate shield protecting your organization's most valuable asset: its data. In this opening topic of Module 004_003, we uncover the true mechanics of MySQL's security engine: the two-stage access control pipeline, the 5-tier privilege hierarchy stored across system tables, and MySQL 8.0's dynamic privileges that finally replace the monolithic SUPER privilege. Build your systems on the Principle of Least Privilege, scope your user hosts properly, and never connect your web apps with root!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
