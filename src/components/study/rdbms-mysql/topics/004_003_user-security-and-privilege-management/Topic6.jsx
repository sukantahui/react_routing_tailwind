import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Assigning Privileges with GRANT and Removing Privileges with REVOKE
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive privilege management workbench: mastering GRANT and REVOKE syntax across all 5 scopes, configuring WITH GRANT OPTION delegation, understanding atomic in-memory cache updates, and enabling Partial Revokes in multi-tenant MySQL 8.0 environments.
 */
const Topic6 = () => {
  // Interactive Grant/Revoke State
  const [selectedGrantPhase, setSelectedGrantPhase] = useState("phase1_grant_scoping");

  const grantPhases = {
    phase1_grant_scoping: {
      phaseNumber: "Phase 1: GRANT Scoping",
      title: "1. Precision Grant Scoping (Global to Column)",
      badge: "Least Privilege Provisioning",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔑 EXPLICIT LEAST-PRIVILEGE GRANT SCOPING:

-- 1. Database-level DML Provisioning (No DDL rights):
GRANT SELECT, INSERT, UPDATE, DELETE 
ON kolkata_retail.* 
TO 'app_service'@'10.10.%.%';

-- 2. Column-level PII Protection:
GRANT SELECT (order_id, customer_name, order_status),
      UPDATE (order_status)
ON kolkata_retail.orders 
TO 'support_rep'@'10.0.%.%';

-- 3. Stored Routine Execution:
GRANT EXECUTE ON PROCEDURE kolkata_retail.sp_process_refund 
TO 'billing_service'@'10.10.%.%';`,
      explanation:
        "GRANT assigns explicit capabilities to user accounts at specific object boundaries. By avoiding broad ALL PRIVILEGES grants and enumerating only the required DML commands (SELECT, INSERT, UPDATE), database administrators enforce strict least-privilege security.",
      keyTakeaways: [
        "Enumerate required DML operations explicitly instead of granting ALL PRIVILEGES.",
        "Column-level grants restrict sensitive PII access at the database engine level.",
        "In MySQL 8.0, accounts must be created with CREATE USER before privileges can be granted."
      ]
    },
    phase2_revoke_mechanics: {
      phaseNumber: "Phase 2: REVOKE Mechanics",
      title: "2. Removing Privileges & Scope Matching Rules",
      badge: "Atomic Revocation",
      badgeColor: "cyan",
      sqlSnippet: `-- ✂️ REVOKING PRIVILEGES AT MATCHING SCOPES:

-- 1. Revoke specific permissions from a database:
REVOKE DELETE, DROP ON kolkata_retail.* FROM 'app_service'@'10.10.%.%';

-- 2. Revoke specific column-level write rights:
REVOKE UPDATE (order_status) ON kolkata_retail.orders FROM 'support_rep'@'10.0.%.%';

-- 3. Strip ALL permissions and grant options completely:
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'decommissioned_user'@'%';`,
      explanation:
        "REVOKE strips assigned capabilities from accounts. The object scope in the REVOKE statement must match the exact level where the privilege was originally granted. REVOKE ALL PRIVILEGES, GRANT OPTION cleanses all static and dynamic grants, reverting the user to baseline USAGE.",
      keyTakeaways: [
        "Scope matching rule: You cannot revoke at table level what was granted at database level.",
        "REVOKE ALL PRIVILEGES removes both static and dynamic privileges across all scopes.",
        "GRANT and REVOKE sync in-memory structures in real time (no FLUSH PRIVILEGES needed)."
      ]
    },
    phase3_grant_option: {
      phaseNumber: "Phase 3: Delegated Administration",
      title: "3. Delegating Authority with WITH GRANT OPTION",
      badge: "Administrative Delegation",
      badgeColor: "purple",
      sqlSnippet: `-- 👥 DELEGATED PRIVILEGE ADMINISTRATION:

-- 1. Grant permissions with delegated granting rights:
GRANT SELECT, INSERT, UPDATE, CREATE, DROP 
ON project_mars.* 
TO 'tech_lead'@'10.0.%.%' 
WITH GRANT OPTION;

-- 2. Tech Lead can now grant their own privileges to team members:
-- Executed by 'tech_lead':
-- GRANT SELECT, INSERT ON project_mars.* TO 'junior_dev'@'10.0.%.%';

-- 3. Revoke delegation rights while keeping data permissions intact:
REVOKE GRANT OPTION ON project_mars.* FROM 'tech_lead'@'10.0.%.%';`,
      explanation:
        "WITH GRANT OPTION enables delegated administration, allowing team leads to provision access for their subordinates without requiring DBA root access. REVOKE GRANT OPTION cleanly removes the delegation authority while leaving underlying data privileges untouched.",
      keyTakeaways: [
        "WITH GRANT OPTION allows users to grant their own privileges to other accounts.",
        "REVOKE GRANT OPTION removes delegation without affecting data access rights.",
        "Never grant WITH GRANT OPTION on *.* to non-DBA application users."
      ]
    },
    phase4_partial_revokes: {
      phaseNumber: "Phase 4: Partial Revokes",
      title: "4. Multi-Tenant Exclusions with Partial Revokes",
      badge: "MySQL 8.0.16+ Feature",
      badgeColor: "rose",
      sqlSnippet: `-- 🏢 MULTI-TENANT PARTIAL REVOKES (partial_revokes = ON):

-- 1. Enable partial revokes system variable:
SET PERSIST partial_revokes = ON;

-- 2. Grant global read-only access server-wide:
GRANT SELECT ON *.* TO 'global_auditor'@'%';

-- 3. Explicitly exclude sensitive financial and HR databases:
REVOKE SELECT ON hr_payroll.* FROM 'global_auditor'@'%';
REVOKE SELECT ON executive_compensation.* FROM 'global_auditor'@'%';

-- 4. Inspect effective restrictions:
SHOW GRANTS FOR 'global_auditor'@'%';
-- Displays: GRANT SELECT ON *.* TO 'global_auditor'@'%' AS RESTRICT ON \`hr_payroll\`.*, \`executive_compensation\`.*`,
      explanation:
        "In multi-tenant or enterprise auditing architectures, global auditors frequently require read-only access to 100+ customer databases while being strictly quarantined from sensitive payroll or compensation schemas. MySQL 8.0.16+ Partial Revokes make permissions subtractive via AS RESTRICT ON.",
      keyTakeaways: [
        "Requires SET PERSIST partial_revokes = ON.",
        "Enables global grants with specific database-level exclusion boundaries.",
        "Eliminates the need to execute 100+ separate individual database GRANT statements."
      ]
    }
  };

  const currentPhase = grantPhases[selectedGrantPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Assigning Privileges with <span className="text-emerald-400">GRANT</span> &amp; Removing with <span className="text-rose-400">REVOKE</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Complete guide to MySQL privilege provisioning and revocation: mastering precision DDL syntax across all 5 object tiers, delegating authority with <code>WITH GRANT OPTION</code>, understanding real-time in-memory grant synchronization, and configuring enterprise Partial Revokes in MySQL 8.0.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Core Operations Matrix ──────────────────────── */}
        <section id="operations-matrix" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The GRANT and REVOKE Operation Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing DDL syntax and behavior across standard, delegated, and subtractive privilege operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Operation 1</span>
              <h3 className="font-bold text-white text-base">Standard GRANT</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigns explicit DDL/DML capabilities to accounts at Global, Database, Table, Column, or Routine scopes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Operation 2</span>
              <h3 className="font-bold text-white text-base">Targeted REVOKE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Removes specific capabilities at the matching original scope without affecting other existing permissions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Operation 3</span>
              <h3 className="font-bold text-purple-300 text-base">GRANT OPTION</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Delegates administrative rights to grant held permissions to others; cleanly removable via <code>REVOKE GRANT OPTION</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-700/60 bg-cyan-950/20 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Operation 4</span>
              <h3 className="font-bold text-cyan-300 text-base">Partial Revokes</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Enables subtractive security rules, granting global access while explicitly restricting access to sensitive schemas.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Privilege Management Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe SQL statements for granting, revoking, delegating, and restricting privileges.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(grantPhases).map((phaseKey) => {
              const phase = grantPhases[phaseKey];
              const isSelected = selectedGrantPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedGrantPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
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
                SQL DDL Implementation:
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
              Production case studies demonstrating multi-tenant partial revokes and secure contractor decommissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Clean Contractor Offboarding in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Residual Artifacts
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an external accounting contractor completed a 3-month audit of retail transactions. To prevent orphaned grant records in <code>mysql.tables_priv</code> and <code>mysql.columns_priv</code>, Mamata executed <code>REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'auditor'@'192.168.1.%';</code> prior to running <code>DROP USER</code>. This ensured that if an account with the same username was created later, it inherited zero residual permissions.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Multi-Tenant Partial Revokes in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Subtractive Compliance
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an automated analytics dashboard required read-only access across 80 customer microservice databases handling ₹50 Crores in volume, but was strictly forbidden from viewing internal executive payroll. Using MySQL 8.0.16+ Partial Revokes, Debangshu granted <code>SELECT ON *.*</code> and executed <code>REVOKE SELECT ON executive_payroll.*</code>, maintaining automated schema discovery while guaranteeing total salary privacy.
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
              Avoid dangerous grant delegation and scope mismatch errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Granting WITH GRANT OPTION on Service Accounts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an application microservice with <code>WITH GRANT OPTION</code> is compromised via SQL injection, the attacker can create new administrative accounts or escalate privileges for existing accounts.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Never assign WITH GRANT OPTION to unattended application accounts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Attempting Implicit User Creation via GRANT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In MySQL 8.0, executing <code>GRANT</code> on a non-existent account throws Error 1410. Implicit account creation via GRANT is completely removed.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute CREATE USER with authentication plugin prior to GRANT.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use REVOKE ALL PRIVILEGES Before DROP USER
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always execute <code>REVOKE ALL PRIVILEGES, GRANT OPTION</code> prior to <code>DROP USER</code> to ensure all table, column, and routine grant rows are purged cleanly from the data dictionary.
              </p>
              <div className="text-xs text-slate-400">
                Prevents security ghosting and orphaned grant inheritance.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable partial_revokes for Multi-Tenant Auditing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>partial_revokes = ON</code> in multi-database environments to simplify global read-only auditing while maintaining strict exclusion barriers for confidential data.
              </p>
              <div className="text-xs text-slate-400">
                Drastically simplifies permission maintenance across large database fleets.
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
            title="Topic 6: Assigning Privileges with GRANT and Removing Privileges with REVOKE"
            content={noteText}
          />

          <Teacher
            note="GRANT and REVOKE are your primary tools for enforcing database authorization. Always scope privileges as tightly as possible, never grant WITH GRANT OPTION to service accounts, and remember that GRANT and REVOKE sync in-memory structures in real time without needing FLUSH PRIVILEGES. When offboarding users, execute REVOKE ALL PRIVILEGES, GRANT OPTION first to leave zero security artifacts behind!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of GRANT and REVOKE syntax, scope matching, and partial revokes.
            </p>
          </div>

          <FAQTemplate
            title="GRANT and REVOKE Privileges FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
