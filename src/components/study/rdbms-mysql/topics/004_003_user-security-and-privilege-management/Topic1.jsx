import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – User Account Management: CREATE USER, ALTER USER, DROP USER, RENAME USER
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive user account management workbench: mastering account provisioning DDL (CREATE, ALTER, RENAME, DROP), configuring password expiration and history policies, throttling connection pools with resource limits, and enforcing brute-force lockouts in MySQL 8.0.
 */
const Topic1 = () => {
  // Interactive Account State
  const [selectedAccountPhase, setSelectedAccountPhase] = useState("phase1_account_lifecycle");

  const accountPhases = {
    phase1_account_lifecycle: {
      phaseNumber: "Phase 1: Account Lifecycle",
      title: "1. The Account DDL Lifecycle: CREATE, ALTER, RENAME & DROP",
      badge: "Account Lifecycle",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛠️ USER ACCOUNT LIFECYCLE MANAGEMENT:

-- 1. CREATE USER: Provision account with secure password and SSL requirement:
CREATE USER IF NOT EXISTS 'mamata_dev'@'192.168.1.%'
  IDENTIFIED BY 'Barrackpore#2026!Secure'
  REQUIRE SSL;

-- 2. ALTER USER: Rotate password:
ALTER USER 'mamata_dev'@'192.168.1.%'
  IDENTIFIED BY 'NewSecurePass#2026!';

-- 3. RENAME USER: Migrate account name without losing privileges:
RENAME USER 'mamata_dev'@'192.168.1.%' 
  TO 'mamata_lead'@'192.168.1.%';

-- 4. DROP USER: Completely purge account and all associated ACL grants:
DROP USER IF EXISTS 'mamata_lead'@'192.168.1.%';

-- All operations update mysql.user and memory caches atomically! ⚡`,
      metricsTable: [
        { ddlCommand: "CREATE USER", purpose: "Provisions new account identity", atomicity: "Creates mysql.user entry + in-memory cache ✅" },
        { ddlCommand: "ALTER USER", purpose: "Updates credentials, locking, TLS", atomicity: "Instant atomic change without reconnecting" },
        { ddlCommand: "RENAME USER", purpose: "Renames account identity", atomicity: "Transfers all privileges across system tables" },
        { ddlCommand: "DROP USER", purpose: "Deletes account completely", atomicity: "Purges mysql.user, mysql.db, tables_priv" }
      ],
      explanation:
        "The four fundamental user account DDL commands provide complete lifecycle control. `RENAME USER` and `DROP USER` automatically update or purge all related privilege records in `mysql.db`, `mysql.tables_priv`, and `mysql.columns_priv` atomically."
    },
    phase2_password_policies: {
      phaseNumber: "Phase 2: Password Policies",
      title: "2. Password Expiration, History & Account Locking",
      badge: "Credential Policies",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔒 HARDENING PASSWORDS & SUSPENDING ACCOUNTS:

-- 1. Force password reset upon next login:
ALTER USER 'susmita'@'localhost' PASSWORD EXPIRE;

-- 2. Enforce 90-day periodic password expiration:
ALTER USER 'susmita'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;

-- 3. Exempt automated service account from expiration:
ALTER USER 'app_backend'@'10.0.0.%' PASSWORD EXPIRE NEVER;

-- 4. Prevent password reuse across last 5 passwords or within 365 days:
ALTER USER 'susmita'@'localhost' 
  PASSWORD HISTORY 5
  PASSWORD REUSE INTERVAL 365 DAY;

-- 5. Temporarily suspend account (Zero login allowed, keeps all grants intact!):
ALTER USER 'susmita'@'localhost' ACCOUNT LOCK;
-- Re-enable when developer returns:
ALTER USER 'susmita'@'localhost' ACCOUNT UNLOCK;`,
      metricsTable: [
        { policy: "PASSWORD EXPIRE", impact: "Forces reset on next connection", useCase: "Initial account provisioning" },
        { policy: "PASSWORD EXPIRE INTERVAL 90 DAY", impact: "Periodic rotation required", useCase: "Corporate compliance standards" },
        { policy: "PASSWORD HISTORY 5", impact: "Blocks last 5 passwords", useCase: "Prevents password ping-ponging" },
        { policy: "ACCOUNT LOCK / UNLOCK", impact: "Disables login without dropping user", useCase: "Temporary leave / suspension 🔒" }
      ],
      explanation:
        "`ACCOUNT LOCK` immediately blocks client connections without dropping granted permissions. `PASSWORD HISTORY` and `PASSWORD REUSE INTERVAL` prevent users from recycling previous passwords, enforcing strict security compliance."
    },
    phase3_resource_quotas: {
      phaseNumber: "Phase 3: Resource Quotas",
      title: "3. Resource Limits & Connection Pool Throttling",
      badge: "Resource Quotas",
      badgeColor: "amber",
      sqlSnippet: `-- ⏱️ PREVENTING RUNAWAY QUERIES & CONNECTION EXHAUSTION:
CREATE USER 'reporting_agent'@'192.168.1.%'
  IDENTIFIED BY 'AgentPass#2026'
  WITH 
    -- Limit total SELECT/DML queries per hour:
    MAX_QUERIES_PER_HOUR 5000
    
    -- Limit total UPDATE/INSERT/DELETE modifications per hour:
    MAX_UPDATES_PER_HOUR 500
    
    -- Limit new connection attempts per hour:
    MAX_CONNECTIONS_PER_HOUR 100
    
    -- Limit concurrent active sessions simultaneously (Connection Pool Ceiling):
    MAX_USER_CONNECTIONS 15;

-- Inspect current resource limits in system catalog:
SELECT user, host, max_questions, max_updates, max_connections, max_user_connections 
FROM mysql.user 
WHERE user = 'reporting_agent';`,
      metricsTable: [
        { limitOption: "MAX_QUERIES_PER_HOUR", scope: "Hourly statement ceiling", role: "Protects against runaway scraper loops ⏳" },
        { limitOption: "MAX_UPDATES_PER_HOUR", scope: "Hourly write ceiling", role: "Restricts batch modification bursts" },
        { limitOption: "MAX_CONNECTIONS_PER_HOUR", scope: "Hourly connection count", role: "Prevents connection flood storms" },
        { limitOption: "MAX_USER_CONNECTIONS", scope: "Concurrent active sessions", role: "Prevents pool exhaustion of server max_connections" }
      ],
      explanation:
        "Resource quotas prevent misconfigured microservices or third-party reporting scripts from overwhelming CPU, I/O, or connection pools. `MAX_USER_CONNECTIONS` ensures no single user can consume the server's entire `max_connections` budget."
    },
    phase4_bruteforce_defense: {
      phaseNumber: "Phase 4: Brute-Force & Attributes",
      title: "4. Brute-Force Lockout Defense & User JSON Metadata",
      badge: "Advanced Features",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ AUTOMATIC BRUTE-FORCE LOCKOUT & USER ATTRIBUTE METADATA:

-- 1. Automatic Account Lockout after 3 Failed Password Attempts:
-- (Account automatically locks for 2 days upon 3 consecutive failures):
ALTER USER 'portal_user'@'%' 
  FAILED_LOGIN_ATTEMPTS 3
  PASSWORD_LOCK_TIME 2; -- 2 Days Lockout! 🔒

-- 2. Attaching JSON Metadata Attributes to User Accounts (MySQL 8.0.21+):
ALTER USER 'portal_user'@'%' 
  ATTRIBUTE '{"department": "Fintech", "manager": "Susmita", "location": "Kolkata"}';

-- 3. Querying User Attributes for Enterprise Audits:
SELECT user, host, attribute 
FROM information_schema.user_attributes 
WHERE user = 'portal_user';
-- Returns JSON: {"department": "Fintech", "location": "Kolkata", ...} 📊`,
      metricsTable: [
        { feature: "FAILED_LOGIN_ATTEMPTS", parameter: "Integer (e.g. 3 attempts)", role: "Threshold before automatic account lockout 🔒" },
        { feature: "PASSWORD_LOCK_TIME", parameter: "Days or UNBOUNDED", role: "Lockout duration (e.g. 2 days or until DBA unlock)" },
        { feature: "ATTRIBUTE", parameter: "JSON Object string", role: "Attaches department, owner, or team metadata" },
        { feature: "user_attributes view", parameter: "information_schema", role: "Audits user inventory and organization owners" }
      ],
      explanation:
        "`FAILED_LOGIN_ATTEMPTS` provides automated brute-force protection by locking accounts that fail consecutive login attempts. `ATTRIBUTE` allows DBAs to attach structured JSON metadata (department, owner, contact) directly to user accounts for enterprise audits."
    }
  };

  const navItems = [
    { id: "account-overview", label: "1. Account DDL Overview" },
    { id: "lifecycle-diagram", label: "2. Lifecycle State Machine" },
    { id: "interactive-workbench", label: "3. Account Management Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. User Management Checklist" },
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
            <span>Topic 1 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              User Administration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            User Account Management: CREATE USER, ALTER USER, DROP USER, RENAME USER
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete user lifecycle in MySQL 8.0: provision accounts with <code className="text-emerald-400 font-mono">CREATE USER</code>, enforce password history with <code className="text-cyan-400 font-mono">ALTER USER</code>, suspend credentials using <code className="text-amber-400 font-mono">ACCOUNT LOCK</code>, throttle connection pools, and defend against brute-force attacks.
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
        {/* SECTION 1: Account Overview */}
        <section id="account-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Account Administration Landscape
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four fundamental operations governing database identity provisioning, modification, and revocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. CREATE USER</span>
              <h3 className="font-bold text-white">Identity Provisioning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creates 'user'@'host' with password, auth plugin, and SSL requirements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. ALTER USER</span>
              <h3 className="font-bold text-white">Credential &amp; Limits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Updates passwords, expires credentials, locks accounts, and sets quotas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. RENAME USER</span>
              <h3 className="font-bold text-white">Identity Migration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Renames accounts while transferring all granted privileges automatically.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. DROP USER</span>
              <h3 className="font-bold text-white">Atomic Deprovision</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Completely deletes accounts and revokes all table/column ACL entries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Lifecycle Diagram */}
        <section id="lifecycle-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: User Account Lifecycle State Machine
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              State transitions between Provisioned, Active, Suspended/Locked, and Purged states.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 1.1: User Account Lifecycle &amp; State Transitions
              </h3>
              <span className="text-xs text-slate-400 font-mono">State Machine</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrAccCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* State 1: CREATE USER */}
                <rect x="20" y="50" width="200" height="260" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="80" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. PROVISIONED
                </text>
                <line x1="20" y1="95" x2="220" y2="95" stroke="#334155" />
                <text x="35" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">CREATE USER</text>
                <text x="35" y="145" fill="#94a3b8" fontSize="9">'user'@'192.168.1.%'</text>
                <text x="35" y="165" fill="#34d399" fontSize="9">Password Assigned</text>
                <text x="35" y="185" fill="#bae6fd" fontSize="9">SSL / TLS Enforced</text>
                <text x="35" y="240" fill="#a7f3d0" fontSize="9" fontWeight="bold">Status: Ready for Grants</text>

                {/* State 2: ACTIVE */}
                <rect x="260" y="50" width="200" height="260" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="360" y="80" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. ACTIVE SESSION
                </text>
                <line x1="260" y1="95" x2="460" y2="95" stroke="#334155" />
                <text x="275" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">AUTHENTICATED ✅</text>
                <text x="275" y="145" fill="#94a3b8" fontSize="9">Queries Executing</text>
                <text x="275" y="165" fill="#34d399" fontSize="9">MAX_USER_CONN: 15</text>
                <text x="275" y="185" fill="#fde68a" fontSize="9">PASSWORD HISTORY: 5</text>
                <text x="275" y="240" fill="#38bdf8" fontSize="9" fontWeight="bold">Status: Normal Operation</text>

                {/* State 3: SUSPENDED / LOCKED */}
                <rect x="500" y="50" width="200" height="260" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="600" y="80" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. SUSPENDED / LOCKED
                </text>
                <line x1="500" y1="95" x2="700" y2="95" stroke="#334155" />
                <text x="515" y="125" fill="#fde68a" fontSize="10" fontWeight="bold">ACCOUNT LOCK 🔒</text>
                <text x="515" y="145" fill="#f87171" fontSize="9">Login Blocked (Err 3118)</text>
                <text x="515" y="165" fill="#a7f3d0" fontSize="9">Privileges Preserved!</text>
                <text x="515" y="185" fill="#bae6fd" fontSize="9">FAILED_LOGIN: 3</text>
                <text x="515" y="240" fill="#fde68a" fontSize="9" fontWeight="bold">Unlock with ALTER USER</text>

                {/* State 4: PURGED */}
                <rect x="740" y="50" width="190" height="260" rx="8" fill="#0f172a" stroke="#be123c" strokeWidth="1.5" />
                <text x="835" y="80" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">
                  4. PURGED / DROPPED
                </text>
                <line x1="740" y1="95" x2="930" y2="95" stroke="#334155" />
                <text x="755" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">DROP USER ❌</text>
                <text x="755" y="145" fill="#94a3b8" fontSize="9">mysql.user Removed</text>
                <text x="755" y="165" fill="#f87171" fontSize="9">mysql.db Cleaned</text>
                <text x="755" y="185" fill="#f87171" fontSize="9">tables_priv Cleaned</text>
                <text x="755" y="240" fill="#fb7185" fontSize="9" fontWeight="bold">Status: Permanently Deleted</text>

                {/* Connecting Arrows */}
                <path d="M 220 150 L 260 150" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrAccCyan)" />
                <path d="M 460 150 L 500 150" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrAccCyan)" />
                <path d="M 700 150 L 740 150" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrAccCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Account Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive User Account Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a phase to inspect DDL commands, password expiration policies, connection throttling, and brute-force defenses.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(accountPhases).map((key) => {
              const ph = accountPhases[key];
              const isSelected = selectedAccountPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAccountPhase(key)}
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
                {accountPhases[selectedAccountPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  accountPhases[selectedAccountPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  accountPhases[selectedAccountPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  accountPhases[selectedAccountPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  accountPhases[selectedAccountPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {accountPhases[selectedAccountPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                User Account Management SQL Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {accountPhases[selectedAccountPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Account Parameters &amp; Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Command / Policy / Limit</th>
                      <th className="py-2.5 px-4">Scope / Impact / Parameter</th>
                      <th className="py-2.5 px-4">Atomicity / Role / Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {accountPhases[selectedAccountPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.ddlCommand || row.policy || row.limitOption || row.feature}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.purpose || row.impact || row.scope || row.parameter}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.atomicity || row.useCase || row.role}
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
                {accountPhases[selectedAccountPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World User Management Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Protecting connection pools and managing developer leaves in West Bengal tech companies.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Temporary Account Lock */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Managing Temporary Contractor Leaves in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Orphan Grants
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an engineering consultancy previously deleted contractor accounts when contractors took 1-month leaves, requiring painful re-granting of 30 table permissions upon their return. Switching to `ALTER USER 'contractor'@'%' ACCOUNT LOCK;` blocked all database access instantly while preserving all complex table permissions, allowing seamless reinstatement with `ACCOUNT UNLOCK`.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Connection Throttling */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Preventing Connection Starvation in Kolkata Microservices
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Pool Starvation Solved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a poorly configured third-party analytics scraper spawned 450 concurrent connections, exhausting the MySQL server's `max_connections = 500` limit and crashing the primary e-commerce checkout service. Setting `WITH MAX_USER_CONNECTIONS 20` on the analytics account capped its connection footprint permanently, protecting the main checkout pool.
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
              Avoid deleting from mysql.user directly and forgetting password history compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using DELETE FROM mysql.user
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deleting from `mysql.user` with raw SQL leaves orphaned privilege records in `mysql.db` and `mysql.tables_priv`, creating critical security loopholes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use DROP USER to cleanly purge all privilege tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Service Account Expiration Exemption
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Applying global password expiration to automated backend service accounts causes sudden, unexpected 2 AM production outages when passwords expire.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Set PASSWORD EXPIRE NEVER on all automated service accounts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enforce Brute-Force Lockouts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure `FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 1` on public-facing accounts to automatically block automated dictionary attacks.
              </p>
              <div className="text-xs text-slate-400">
                Native brute-force mitigation in MySQL 8.0.19+.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Tag Accounts with ATTRIBUTE JSON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attach team ownership and contact details directly to accounts using <code>ALTER USER ... ATTRIBUTE '{'{"team": "Billing"}'}'</code>.
              </p>
              <div className="text-xs text-slate-400">
                Simplifies user inventory audits across large organizations.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: User Management Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA User Management Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify secure user provisioning and credential lifecycle maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Account Provisioning Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">SSL Enforced</strong> = Verify accounts declare `REQUIRE SSL` or `REQUIRE X509`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Connection Caps</strong> = Set `WITH MAX_USER_CONNECTIONS` on all microservices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Password Rotation</strong> = Enforce `PASSWORD HISTORY 5` on human accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Atomic Deprovision</strong> = Always use `DROP USER` to prevent orphaned grants.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe RENAME USER Atomicity...”</span>
                  If a company rebrands or an engineer changes teams, never drop and recreate the account! `RENAME USER 'old_user'@'host' TO 'new_user'@'host'` renames the account in `mysql.user` and updates all table/column grants across the entire instance in a single atomic transaction!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about MAX_USER_CONNECTIONS...”</span>
                  If your server allows 500 total connections, setting `MAX_USER_CONNECTIONS 25` on a reporting service guarantees that even if a bug causes the reporting script to spam connections, it can never crash the primary web application!
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
              Comprehensive reference questions covering User Account Management, Password Policies, Account Locking, and Resource Quotas.
            </p>
          </div>

          <FAQTemplate
            title="User Account Management (CREATE, ALTER, DROP, RENAME) FAQs"
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
            title="User Account Management: CREATE USER, ALTER USER, DROP USER, RENAME USER"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="User account administration is the cornerstone of database operational security. MySQL 8.0 gives administrators unparalleled control: from atomic account renaming and safe account suspension (ACCOUNT LOCK) to connection pool throttling (MAX_USER_CONNECTIONS) and native brute-force defense (FAILED_LOGIN_ATTEMPTS). Always use native DDL statements (never raw DML on mysql.user), enforce password rotation policies on human operators, and protect your automated service accounts with NEVER expiring passwords!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
