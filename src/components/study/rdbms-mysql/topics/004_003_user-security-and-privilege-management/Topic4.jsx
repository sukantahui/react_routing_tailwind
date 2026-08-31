import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Password Validation Policies, Expiration, Dual Passwords, and Account Locking
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive password security workbench: exploring validate_password component policies (LOW, MEDIUM, STRONG), configuring password expiration and reuse history, mastering Dual Password zero-downtime microservice rotations, and enforcing brute-force lockouts in MySQL 8.0.
 */
const Topic4 = () => {
  // Interactive Password Policy State
  const [selectedPolicyPhase, setSelectedPolicyPhase] = useState("phase1_validation_component");

  const policyPhases = {
    phase1_validation_component: {
      phaseNumber: "Phase 1: Validation Component",
      title: "1. Password Validation Component & Complexity Policies",
      badge: "Complexity Enforcement",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ PASSWORD VALIDATION COMPONENT CONFIGURATION:

-- 1. Install component dynamically without server restart:
INSTALL COMPONENT 'file://component_validate_password';

-- 2. Configure MEDIUM policy (length, mixed case, numbers, special characters):
SET GLOBAL validate_password.policy = 'MEDIUM';
SET GLOBAL validate_password.length = 12;
SET GLOBAL validate_password.check_user_name = ON;

-- 3. Test password strength before provisioning (0 to 100):
SELECT VALIDATE_PASSWORD_STRENGTH('Weak123') AS weak_score,
       VALIDATE_PASSWORD_STRENGTH('Str0ng#K0lkata!2026') AS strong_score;`,
      explanation:
        "The validate_password component enforces strict complexity rules at the MySQL engine layer, rejecting weak, short, or dictionary-based passwords with Error 1819. Testing candidates with VALIDATE_PASSWORD_STRENGTH() returns an entropy score from 0 to 100.",
      keyTakeaways: [
        "MEDIUM policy requires at least 1 digit, 1 uppercase, 1 lowercase, and 1 symbol.",
        "check_user_name rejects passwords matching the account name.",
        "Installed dynamically via MySQL 8.0 Component Architecture."
      ]
    },
    phase2_expiration_history: {
      phaseNumber: "Phase 2: Expiration & History",
      title: "2. Password Lifetime, History & Mandatory Current Password",
      badge: "Lifecycle & Reuse",
      badgeColor: "cyan",
      sqlSnippet: `-- ⏳ PASSWORD EXPIRATION & REUSE GOVERNANCE:

-- 1. Global default lifetime (90 days):
SET PERSIST default_password_lifetime = 90;

-- 2. Account-specific expiration & reuse history limits:
ALTER USER 'susmita_ops'@'10.0.%.%'
  PASSWORD EXPIRE INTERVAL 90 DAY
  PASSWORD HISTORY 6
  PASSWORD REUSE INTERVAL 365 DAY;

-- 3. Enforce current password verification on updates:
ALTER USER 'susmita_ops'@'10.0.%.%' PASSWORD REQUIRE CURRENT;`,
      explanation:
        "Password expiration forces periodic credential rotation. When expired, accounts enter a restricted sandbox mode where only password reset queries are allowed. Combining PASSWORD HISTORY with REUSE INTERVAL stops cycling attacks where users rotate passwords 6 times just to reuse an old one.",
      keyTakeaways: [
        "Unattended service accounts should use PASSWORD EXPIRE NEVER.",
        "PASSWORD HISTORY and REUSE INTERVAL enforce dual-factor reuse limits.",
        "PASSWORD REQUIRE CURRENT stops hijacked sessions from changing passwords."
      ]
    },
    phase3_dual_passwords: {
      phaseNumber: "Phase 3: Dual Passwords",
      title: "3. Zero-Downtime Microservice Credential Rotation",
      badge: "Zero-Downtime Rotation",
      badgeColor: "purple",
      sqlSnippet: `-- 🚀 ZERO-DOWNTIME MICROSERVICE ROTATION (3-STEP WORKFLOW):

-- STEP 1: Assign new Primary password while keeping old as Secondary:
ALTER USER 'kolkata_api'@'10.10.%.%'
  IDENTIFIED BY 'NewSecurePass#2026'
  RETAIN CURRENT PASSWORD;

-- STEP 2: Rolling update of Kubernetes pods / Spring Boot microservices
-- * Old pods connect via Secondary password
-- * New pods connect via Primary password

-- STEP 3: Once all microservices are live, discard Secondary password:
ALTER USER 'kolkata_api'@'10.10.%.%' DISCARD OLD PASSWORD;`,
      explanation:
        "Dual Passwords allow an account to maintain two valid passwords simultaneously (1 Primary and 1 Secondary). This eliminates microservice downtime during enterprise password rotation across distributed server clusters.",
      keyTakeaways: [
        "Enables seamless rolling restarts across Kubernetes / Docker fleets.",
        "Maximum of 2 concurrent passwords per account.",
        "DISCARD OLD PASSWORD secures the account after rollout finishes."
      ]
    },
    phase4_account_locking: {
      phaseNumber: "Phase 4: Account Locking",
      title: "4. Account Locking & Automated Brute-Force Rate Limiting",
      badge: "Brute-Force Defense",
      badgeColor: "rose",
      sqlSnippet: `-- 🚫 ACCOUNT LOCKING & BRUTE-FORCE COUNTERMEASURES:

-- 1. Manual administrative locking:
ALTER USER 'former_employee'@'%' ACCOUNT LOCK;
ALTER USER 'former_employee'@'%' ACCOUNT UNLOCK;

-- 2. Automated lockout on 3 consecutive bad passwords (24h lock):
ALTER USER 'portal_user'@'%'
  FAILED_LOGIN_ATTEMPTS 3
  PASSWORD_LOCK_TIME 1 DAY;

-- 3. Permanent lockout requiring DBA unlock (UNBOUNDED):
ALTER USER 'treasury_admin'@'%'
  FAILED_LOGIN_ATTEMPTS 5
  PASSWORD_LOCK_TIME UNBOUNDED;`,
      explanation:
        "Account locking allows immediate administrative suspension of compromised or deactivated accounts without dropping permissions. Automated FAILED_LOGIN_ATTEMPTS tracking stops brute-force dictionary attacks by locking accounts automatically.",
      keyTakeaways: [
        "ACCOUNT LOCK rejects all new connections with Error 3118.",
        "FAILED_LOGIN_ATTEMPTS automatically locks accounts upon bad attempts.",
        "PASSWORD_LOCK_TIME UNBOUNDED enforces manual DBA inspection."
      ]
    }
  };

  const currentPhase = policyPhases[selectedPolicyPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 4 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Password Validation Policies, Expiration, <span className="text-purple-400">Dual Passwords</span> &amp; Account Locking
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive guide to enterprise credential governance in MySQL 8.0: configuring the <code>validate_password</code> component, managing password expiration countdowns, executing zero-downtime rolling rotations via Dual Passwords, and stopping brute-force attacks with automated account lockouts.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="security-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of MySQL Credential Governance
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A multi-layered framework protecting database credentials throughout their entire lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Complexity Validation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforces minimum character length, mixed case, numeric characters, and dictionary word blocking via the <code>validate_password</code> component.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Expiration &amp; History</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Controls mandatory password rotation intervals (e.g. 90 days) and prevents cycling through historical passwords with dual-factor reuse limits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Dual Passwords</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Enables simultaneous Primary and Secondary passwords for seamless, zero-downtime rolling rotations across Kubernetes pod fleets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Account Locking</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Provides instant manual administrative locks and automated rate-limiting locks on consecutive failed authentication attempts.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Credential Governance Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore DDL commands and system variable configurations across all four policy tiers.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(policyPhases).map((phaseKey) => {
              const phase = policyPhases[phaseKey];
              const isSelected = selectedPolicyPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedPolicyPhase(phaseKey)}
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
                SQL Policy Implementation:
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
              Case studies in Barrackpore and Kolkata illustrating automated brute-force defense and zero-downtime rolling rotations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Neutralizing Brute-Force Attacks in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Attack Terminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an automated botnet attempted over 500 credential guesses against a retail store's order management database. Because Mamata had provisioned the account with <code>FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 1 DAY</code>, the account locked on the 3rd bad attempt. The remaining 497 attempts were rejected instantly with zero database CPU overhead and zero compromised records.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero-Downtime Rotation across 120 Pods in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  0 Dropped Requests
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, rotating database credentials for a core banking API processing ₹80 Lakhs per hour across 120 Kubernetes pods previously required maintenance windows. Using MySQL 8.0 Dual Passwords (<code>RETAIN CURRENT PASSWORD</code>), Debangshu performed a rolling update where old and new pods authenticated concurrently without dropping a single financial transaction.
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
              Avoid production outages and credential vulnerabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Forgetting to DISCARD OLD PASSWORD
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving the Secondary password active indefinitely leaves an obsolete credential vulnerable to brute-force attacks long after the migration completes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute DISCARD OLD PASSWORD once all microservice pods are updated.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Setting Default Expiration on Service Accounts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Allowing global <code>default_password_lifetime</code> to expire background daemons or payment gateways creates sudden production outages in unattended microservices.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Explicitly set PASSWORD EXPIRE NEVER on service and batch accounts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Combine Password History &amp; Reuse Interval
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure both <code>PASSWORD HISTORY 6</code> and <code>PASSWORD REUSE INTERVAL 365 DAY</code> to prevent rapid cycling attacks.
              </p>
              <div className="text-xs text-slate-400">
                Stops employees from rotating passwords 6 times just to reuse an old one.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable PASSWORD REQUIRE CURRENT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enforce current password verification on updates to prevent session hijackers or SQL injection scripts from silently overriding account credentials.
              </p>
              <div className="text-xs text-slate-400">
                Mandates the REPLACE clause during user-initiated password changes.
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
            title="Topic 4: Password Validation Policies, Expiration, Dual Passwords, and Account Locking"
            content={noteText}
          />

          <Teacher
            note="Password management in MySQL 8.0 is not just about making passwords longer—it is about orchestrating an entire credential lifecycle. Master the Dual Password feature (RETAIN CURRENT PASSWORD and DISCARD OLD PASSWORD) to perform zero-downtime rolling deployments across microservice fleets, and always configure automated account locking on public-facing application users to defeat brute-force attacks at the front door!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of password validation components, expiration countdowns, and dual passwords.
            </p>
          </div>

          <FAQTemplate
            title="Password Policies &amp; Account Locking FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
