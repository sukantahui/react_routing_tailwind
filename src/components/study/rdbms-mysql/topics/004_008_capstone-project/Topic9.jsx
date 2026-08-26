import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Phase 8: Security Role Design, Privilege Assignment & Backup/Disaster Recovery Runbook
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 8: Security Role Design, Privilege Assignment & Backup/Disaster Recovery Runbook.
 */
const Topic9 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. RBAC Matrix",
      title: "1. Enterprise Role-Based Access Control (RBAC) in MySQL 8.0",
      badge: "RBAC Roles",
      badgeColor: "emerald",
      sqlSnippet: `-- 👥 CREATING ROLES & GRANTING LEAST PRIVILEGE:
-- 1. Create Roles:
CREATE ROLE 'role_app_readonly', 'role_app_readwrite', 'role_dba_admin';

-- 2. Assign Granular Privileges:
GRANT SELECT ON ecommerce_db.* TO 'role_app_readonly';
GRANT SELECT, INSERT, UPDATE, DELETE ON ecommerce_db.* TO 'role_app_readwrite';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'role_dba_admin';

-- 3. Create Service Users and Assign Roles:
CREATE USER 'svc_web_app'@'10.0.1.%' IDENTIFIED BY 'StrongPass#2026' REQUIRE SSL;
GRANT 'role_app_readwrite' TO 'svc_web_app'@'10.0.1.%';
SET DEFAULT ROLE 'role_app_readwrite' TO 'svc_web_app'@'10.0.1.%';`,
      explanation: "MySQL 8.0 roles simplify permission management by grouping privileges and assigning roles to specific application and admin accounts.",
      keyTakeaways: ["Never connect web applications using the root superuser account.","Restrict user hostnames to specific IP subnets (e.g. 10.0.1.%) and enforce SSL.","Activate default roles with SET DEFAULT ROLE."]
    },
    concept2: {
      conceptName: "2. Injection Defense",
      title: "2. SQL Injection Defense via Prepared Statements",
      badge: "Security Defense",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛡️ PARAMETERIZED PREPARED STATEMENT DEFENSE:
PREPARE stmt_user_login FROM 
  'SELECT user_id, password_hash FROM users WHERE email = ? AND is_active = TRUE';

SET @email_input = 'mamata@example.in';
EXECUTE stmt_user_login USING @email_input;
DEALLOCATE PREPARE stmt_user_login;

-- 💡 Why this prevents SQLi:
-- Parameter values are treated strictly as data literals, never executable SQL code!`,
      explanation: "Prepared statements parameterize user input, neutralizing SQL injection attacks like ' OR '1'='1 at the database protocol level.",
      keyTakeaways: ["Prepared statements separate SQL syntax from untrusted user input parameters.","Enforce parameterized queries in backend frameworks (Node.js, Python, Java).","Reject concatenated dynamic raw SQL strings in application layers."]
    },
    concept3: {
      conceptName: "3. Hot Backups",
      title: "3. Hot Logical Backups with mysqldump & Single Transaction",
      badge: "mysqldump",
      badgeColor: "purple",
      sqlSnippet: `-- 💾 PRODUCTION HOT BACKUP COMMAND (NON-BLOCKING):
mysqldump -u dba_backup -p   --single-transaction   --quick   --routines   --triggers   --events   --set-gtid-purged=OFF   ecommerce_db &gt; /backups/ecommerce_db_$(date +%F_%H%M%S).sql`,
      explanation: "mysqldump with --single-transaction takes a consistent ACID snapshot of InnoDB tables without locking active read or write traffic.",
      keyTakeaways: ["--single-transaction uses MVCC to dump tables without table locking.","--routines, --triggers, and --events preserve server-side procedural logic.","--quick streams large dumps row-by-row, avoiding memory exhaustion."]
    },
    concept4: {
      conceptName: "4. PITR Runbook",
      title: "4. Point-in-Time Recovery (PITR) with Binary Logs",
      badge: "Disaster Recovery",
      badgeColor: "rose",
      sqlSnippet: `-- 🚑 POINT-IN-TIME RECOVERY RUNBOOK:
-- 1. Restore the last full backup:
mysql -u root -p ecommerce_db &lt; /backups/full_backup_midnight.sql

-- 2. Locate the timestamp/position immediately BEFORE disaster (e.g. accidental DROP):
-- Disaster occurred at '2026-08-25 14:35:10'

-- 3. Replay binary logs up to exact stop time:
mysqlbinlog --stop-datetime="2026-08-25 14:35:09"   /var/log/mysql/binlog.000045 /var/log/mysql/binlog.000046 | mysql -u root -p ecommerce_db;`,
      explanation: "Point-in-Time Recovery combines full baseline dumps with replayed binary logs to recover data up to the exact second prior to an outage.",
      keyTakeaways: ["Binary logs record all data-modifying statements with precise timestamps.","mysqlbinlog replays transactions safely up to the exact millisecond before corruption.","Test disaster recovery drills regularly to guarantee Recovery Time Objectives (RTO)."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.8: Capstone
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Phase 8: Security Role Design, Privilege Assignment & Backup/Disaster Recovery Runbook
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Implementing Role-Based Access Control (RBAC), least-privilege service accounts, SSL/TLS, hot logical backups, and Point-in-Time Recovery (PITR).
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core design foundations and production engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">RBAC Matrix</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Granular roles (readonly, readwrite, admin) enforcing least privilege.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Prepared Stmts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Parameterized prepared statements eliminating SQL injection vectors.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Hot Backup</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Non-blocking mysqldump --single-transaction hot snapshot exports.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Sub-Second PITR</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Point-in-Time Recovery replaying binary logs to the exact second of failure.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore live SQL implementation scripts, schema patterns, and architectural takeaways.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Phase Implementation
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Runbook &amp; Production Snippet:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
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
              Practical production database case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Susmita & Mamata – Disaster Recovery Drill in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Backup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Susmita simulated an accidental DROP TABLE orders event at 2:30 PM. Mamata restored the 12:00 AM full backup and replayed binary logs up to 2:29:59 PM using mysqlbinlog, recovering all ₹4.5 Lakhs in morning transactions with zero data loss.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Abhronila & Debangshu – RBAC Security Lockdown in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Banking Security
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Abhronila established strict RBAC roles separating teller staff from database administrators. Application microservices connected via restricted read-write accounts over TLS connections, preventing unauthorized table drop commands.
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
              Essential guardrails, common anti-patterns, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Storing Backups on the Same Disk
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Saving backup SQL dumps on the same physical server disk provides zero protection if the server hardware or SSD fails.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Replicate backups automatically to offsite encrypted cloud storage (e.g. AWS S3).
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Disabling Binary Logging
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running MySQL without log_bin enabled makes Point-in-Time Recovery impossible after an accidental deletion.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always keep binary logging enabled in production with 7+ days retention.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Schedule Automated Nightly Dumps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Automate mysqldump scripts via cron or cloud schedulers with log rotation and Slack/Email alerts.
              </p>
              <div className="text-xs text-slate-400">
                Ensures fresh daily recovery points with zero manual human effort.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Practice Restore Drills Monthly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Periodically restore production dumps into a staging database to verify backup integrity.
              </p>
              <div className="text-xs text-slate-400">
                Verifies backup files are uncorrupted and disaster runbooks remain accurate.
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
            title="Topic 9: Phase 8: Security Role Design, Privilege Assignment & Backup/Disaster Recovery Runbook"
            content={noteText}
          />

          <Teacher
            note="A database architecture is incomplete without robust security and disaster recovery! In your capstone report, define your RBAC permission matrix for developers, analysts, and application accounts. Include your mysqldump hot backup command and write a step-by-step Point-in-Time Recovery (PITR) guide showing how you recover from an accidental table drop!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances and viva voce examination questions for this milestone.
            </p>
          </div>

          <FAQTemplate
            title="Phase 8: Security Role Design, Privilege Assignment & Backup/Disaster Recovery Runbook FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
