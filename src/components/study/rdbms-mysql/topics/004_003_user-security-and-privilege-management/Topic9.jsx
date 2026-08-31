import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – The Principle of Least Privilege: Designing Secure Application Service Accounts
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive service account design workbench: exploring the 6 Golden Rules of Least Privilege, separating runtime DML from CI/CD schema migration runners (Flyway/Liquibase), configuring connection throttling, and containing SQL injection blast radius in MySQL 8.0.
 */
const Topic9 = () => {
  // Interactive Service Account State
  const [selectedServicePhase, setSelectedServicePhase] = useState("phase1_six_rules");

  const servicePhases = {
    phase1_six_rules: {
      phaseNumber: "Phase 1: The 6 Golden Rules",
      title: "1. The 6 Golden Rules of Service Account Architecture",
      badge: "Core Architecture",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ GOLDEN SERVICE ACCOUNT PROVISIONING ARCHETYPE:

CREATE USER 'order_microservice'@'10.244.15.%'
  IDENTIFIED WITH caching_sha2_password BY 'StrongVaultGeneratedPass#2026'
  REQUIRE SSL
  PASSWORD EXPIRE NEVER
  WITH MAX_USER_CONNECTIONS 50;

-- Grant minimal required DML privileges only (ZERO DDL rights!):
GRANT SELECT, INSERT, UPDATE ON kolkata_ecommerce.orders TO 'order_microservice'@'10.244.15.%';
GRANT SELECT ON kolkata_ecommerce.inventory TO 'order_microservice'@'10.244.15.%';`,
      explanation:
        "Production service accounts must be provisioned with dedicated per-service identities, bound strictly to private VPC CIDR blocks, protected with NIST-grade authentication, granted explicit DML only, protected with connection quotas, and exempted from automatic password expiration.",
      keyTakeaways: [
        "Rule 1 & 2: Dedicated per-microservice identity bound to private CIDRs.",
        "Rule 3 & 4: caching_sha2_password with SSL and strict DML (no DDL).",
        "Rule 5 & 6: MAX_USER_CONNECTIONS quota and PASSWORD EXPIRE NEVER."
      ]
    },
    phase2_dml_vs_ddl_split: {
      phaseNumber: "Phase 2: DML vs DDL Separation",
      title: "2. Isolating Runtime DML from CI/CD Migration Runners",
      badge: "CI/CD Separation",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 SEPARATING APPLICATION RUNTIME FROM DEPLOYMENT MIGRATIONS:

-- 1. Dedicated CI/CD Schema Migration Runner (Used during deployments only):
CREATE USER 'flyway_migrator'@'10.10.99.10'
  IDENTIFIED WITH caching_sha2_password BY 'EphemeralDeployPass#2026'
  REQUIRE SSL
  PASSWORD EXPIRE NEVER
  WITH MAX_USER_CONNECTIONS 5;

GRANT CREATE, ALTER, DROP, INDEX, REFERENCES ON kolkata_ecommerce.* TO 'flyway_migrator'@'10.10.99.10';

-- 2. Runtime Application Account (Executes 24/7 in production):
-- Has ZERO rights to CREATE, DROP, ALTER, or TRUNCATE!`,
      explanation:
        "Runtime application microservices never need DDL rights. Schema changes must be isolated to dedicated CI/CD migration runner accounts (e.g. Flyway or Liquibase) that execute strictly during deployment windows, ensuring runtime code cannot accidentally or maliciously modify schema structures.",
      keyTakeaways: [
        "Separates deployment identity from runtime operational identity.",
        "Prevents SQL injections from executing DROP TABLE or TRUNCATE.",
        "Protects production database schemas 24/7."
      ]
    },
    phase3_blast_radius: {
      phaseNumber: "Phase 3: Threat Modeling & Containment",
      title: "3. Blast Radius Containment & SQLi Mitigation",
      badge: "Threat Containment",
      badgeColor: "purple",
      sqlSnippet: `-- 🚫 THREAT MODELING: ATTACKER COMPROMISES A MICROSERVICE POD

-- Attacker executes SQL Injection payload:
-- Payload: "'; DROP TABLE orders; SELECT * FROM hr_salaries; --"

-- 1. Attacker attempts DROP TABLE:
-- MySQL Response: ERROR 1142 (42000): DROP command denied to user 'order_microservice'@'10.244.15.22'

-- 2. Attacker attempts to read HR salaries:
-- MySQL Response: ERROR 1142 (42000): SELECT command denied to user 'order_microservice'@'10.244.15.22'

-- Result: Attack is completely contained! Core business integrity remains 100% intact.`,
      explanation:
        "When an application microservice is compromised via an unpatched dependency or SQL injection, least-privilege permissions ensure that the database engine rejects unauthorized DDL, cross-schema queries, and server file access.",
      keyTakeaways: [
        "Stops SQL injection exploits at the database engine gate.",
        "Prevents lateral movement across schemas and tables.",
        "Guarantees that database integrity survives application-tier compromises."
      ]
    },
    phase4_compliance_audit: {
      phaseNumber: "Phase 4: Automated Least Privilege Audits",
      title: "4. Automated DDL & Least-Privilege Compliance Scans",
      badge: "Compliance Auditing",
      badgeColor: "rose",
      sqlSnippet: `-- 🚨 DETECTING OVER-PRIVILEGED APPLICATION ACCOUNTS:

-- Audit: Identify runtime accounts with unauthorized DDL privileges:
SELECT User, Host, Db, Create_priv, Drop_priv, Alter_priv 
FROM mysql.db 
WHERE (Create_priv = 'Y' OR Drop_priv = 'Y' OR Alter_priv = 'Y')
  AND User NOT LIKE '%dba%' AND User NOT LIKE '%migrator%' AND User NOT LIKE '%flyway%';

-- Audit: Identify accounts with wildcard host bindings:
SELECT User, Host FROM mysql.user WHERE Host = '%' AND User != 'root';`,
      explanation:
        "Continuous compliance requires automated SQL audit scripts that inspect mysql.db and mysql.user to flag any application service accounts that have been inadvertently granted DDL or wildcard host access.",
      keyTakeaways: [
        "Detects temporary DDL grants left behind after hotfixes.",
        "Flags dangerous '%' wildcard host bindings.",
        "Maintains compliance with SOC 2, PCI-DSS, and ISO 27001 mandates."
      ]
    }
  };

  const currentPhase = servicePhases[selectedServicePhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          The Principle of Least Privilege: <span className="text-emerald-400">Secure Service Accounts</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering production database defense: implementing the 6 Golden Rules of Service Account Design, isolating runtime DML from CI/CD schema migration runners (Flyway/Liquibase), throttling connection pools with <code>MAX_USER_CONNECTIONS</code>, and neutralizing SQL injection blast radius in MySQL 8.0.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: The 6 Golden Rules ──────────────────────────── */}
        <section id="six-rules-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 6 Golden Rules of Service Account Design
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The industry-standard architectural checklist for enterprise microservice database accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Rule 1</span>
              <h3 className="font-bold text-white text-base">Dedicated Per-Service Accounts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Never share a single database user across multiple microservices. Provision dedicated accounts per service.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Rule 2</span>
              <h3 className="font-bold text-white text-base">Private Subnet Binding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Never use wildcard <code>'%'</code>. Bind accounts strictly to private Kubernetes pod CIDRs or VPC subnets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Rule 3</span>
              <h3 className="font-bold text-white text-base">NIST Auth &amp; SSL Enforced</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <code>caching_sha2_password</code> with strong Vault-generated secrets and mandate <code>REQUIRE SSL</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Rule 4</span>
              <h3 className="font-bold text-purple-300 text-base">DML Only (Zero DDL)</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Runtime applications require <code>SELECT, INSERT, UPDATE, DELETE</code>. Zero <code>DROP, ALTER, CREATE</code> rights!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Rule 5</span>
              <h3 className="font-bold text-rose-300 text-base">Connection Throttling Quotas</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Configure <code>WITH MAX_USER_CONNECTIONS N</code> to prevent runaway microservices from starving connection pools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Rule 6</span>
              <h3 className="font-bold text-white text-base">Expiration Exemption</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Set <code>PASSWORD EXPIRE NEVER</code> to eliminate unexpected production outages on headless daemons.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Service Account Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore provisioning archetypes, CI/CD separation, threat mitigation, and automated compliance auditing.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(servicePhases).map((phaseKey) => {
              const phase = servicePhases[phaseKey];
              const isSelected = selectedServicePhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedServicePhase(phaseKey)}
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
                SQL DDL Implementation &amp; Telemetry:
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
              Security case studies in Barrackpore and Kolkata demonstrating SQL injection containment and high-throughput fintech isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Containing Node.js Package Compromise in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Breach Contained
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an open-source supply-chain exploit compromised a retail store's checkout microservice. The attacker attempted to execute <code>DROP TABLE orders;</code> and query employee payroll. Because Mamata had provisioned the account with DML privileges (<code>SELECT, INSERT, UPDATE</code>) on <code>orders</code> and 0 DDL rights, MySQL rejected both queries with Error 1142. The breach was 100% contained to the web pod.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero Direct Table Access in Kolkata Fintech
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  ₹100 Crore Protection
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a high-volume payment gateway processing ₹100 Crores per month required ironclad security. Debangshu provisioned the gateway account with 0 direct table privileges, granting only <code>EXECUTE</code> on a stored procedure (<code>sp_process_payment</code>) defined with <code>SQL SECURITY DEFINER</code>. The microservice physically could not issue raw SQL queries, completely eliminating SQL injection vectors.
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
              Avoid catastrophic service account configuration anti-patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using 'root' in Application Configs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configuring <code>DB_USER=root</code> in application properties destroys defense-in-depth, turning any SQL injection into full database server takeover.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always create dedicated least-privilege service accounts per application.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Granting DDL to Runtime Accounts for ORMs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Allowing Hibernate/JPA <code>ddl-auto: update</code> in production by giving DDL permissions enables accidental schema drops and unindexed column additions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Disable ddl-auto in production; manage migrations via dedicated CI/CD runners.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Coordinate Connection Pool Sizes with Quotas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure <code>MAX_USER_CONNECTIONS</code> accounts for horizontal microservice pod scaling (Pool Size &times; Replica Count).
              </p>
              <div className="text-xs text-slate-400">
                Prevents sudden pod startup failures during Kubernetes auto-scaling events.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Continuous Least Privilege Auditing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule automated daily audits querying <code>mysql.db</code> for unauthorized DDL flags on application accounts.
              </p>
              <div className="text-xs text-slate-400">
                Maintains compliance with SOC 2, PCI-DSS, and ISO 27001 mandates.
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
            title="Topic 9: The Principle of Least Privilege: Designing Secure Application Service Accounts"
            content={noteText}
          />

          <Teacher
            note="Designing application accounts around the Principle of Least Privilege is the single most powerful defense against database disasters. Never use 'root' in web application configs, never grant DDL to runtime microservices, and always separate schema migrations into dedicated CI/CD accounts like Flyway or Liquibase. If a web service is hacked, least privilege ensures the database survives!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of service account design, least privilege enforcement, and blast radius containment.
            </p>
          </div>

          <FAQTemplate
            title="Least Privilege Service Account FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
