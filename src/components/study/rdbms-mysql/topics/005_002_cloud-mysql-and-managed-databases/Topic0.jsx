import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Self-Hosted MySQL vs Managed Cloud Database Services (DBaaS)
 * Module: 005_002_cloud-mysql-and-managed-databases
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Self-Hosted MySQL vs Managed Cloud Database Services (DBaaS).
 */
const Topic0 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. TCO & Operational Model",
      title: "1. Total Cost of Ownership (TCO) & Shared Responsibility",
      badge: "TCO Analysis",
      badgeColor: "emerald",
      sqlSnippet: `-- ☁️ SELF-HOSTED VS MANAGED DBAAS COMPARISON:
-- Dimension              Self-Hosted (EC2/Bare-Metal)  Managed (AWS RDS / GCP Cloud SQL)
-- ------------------------------------------------------------------------------------
-- OS & Kernel Patching   Manual DBA responsibility     Automated by Cloud Provider
-- Automated Backups      Custom scripts & cron jobs    Point-in-Time automated (1-35 days)
-- Multi-AZ Failover      Complex Heartbeat / Pacemaker Built-in synchronous sub-60s failover
-- Storage Autoscaling    Manual LVM disk expansion     Automatic storage expansion (storage autoscaling)
-- Control & Extensions   Full root OS access           Restricted root (No OS shell access)`,
      explanation: "Managed DBaaS shifts routine infrastructure maintenance, patching, backup automation, and failover management from DBAs to cloud providers.",
      keyTakeaways: ["DBaaS eliminates low-level OS administration and manual disk patching.","Self-hosted provides full root access for custom storage engines and plugins.","Calculate TCO taking engineering salaries and outage downtime into account."]
    },
    concept2: {
      conceptName: "2. Cloud Automation",
      title: "2. Built-in Cloud Automation Superpowers",
      badge: "DBaaS Features",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 MANAGED CLOUD DATABASE CAPABILITIES:
-- 1. Automated Snapshot Schedules (Daily EBS snapshots + 5-minute binlog streams).
-- 2. Minor Version Auto-Upgrade during configured maintenance windows.
-- 3. One-Click Read Replica Creation across multiple availability zones.
-- 4. Native CloudWatch / Stackdriver performance metrics & Slow query logging.`,
      explanation: "Cloud database services automate point-in-time recovery, replication provisioning, and performance metrics tracking with zero manual intervention.",
      keyTakeaways: ["Configure maintenance windows during off-peak traffic hours (e.g. 02:00 AM IST).","Automate snapshot backups with retention policies matching compliance rules.","Stream slow query logs directly into centralized logging tools (CloudWatch/Datadog)."]
    },
    concept3: {
      conceptName: "3. When to Self-Host",
      title: "3. When Self-Hosting Makes Architectural Sense",
      badge: "Self-Host Triggers",
      badgeColor: "purple",
      sqlSnippet: `-- 🏗️ CRITERIA FOR SELF-HOSTING MYSQL:
-- 1. Extreme I/O requirements (&gt;100,000 IOPS) on dedicated NVMe bare-metal servers.
-- 2. Strict compliance / On-premise air-gapped banking data sovereignty laws.
-- 3. Custom storage engine plugins or specialized MySQL source code patches.
-- 4. Massive multi-terabyte scale where cloud DBaaS markups become prohibitive.`,
      explanation: "Self-hosting remains relevant for massive high-IOPS bare-metal deployments, on-premise regulatory compliance, and customized MySQL kernels.",
      keyTakeaways: ["Bare-metal NVMe SSDs provide predictable sub-millisecond I/O latency.","Complies with air-gapped data residency laws for defense and public sector.","Requires dedicated 24/7 senior DBA teams for backup and disaster recovery."]
    },
    concept4: {
      conceptName: "4. Migration Paths",
      title: "4. Migrating from Self-Hosted to Cloud DBaaS",
      badge: "Cloud Migration",
      badgeColor: "rose",
      sqlSnippet: `-- 📦 ZERO-DOWNTIME MIGRATION STRATEGY:
-- 1. Take initial consistent hot backup with mysqldump --single-transaction.
-- 2. Restore dump to target AWS RDS / Cloud SQL instance.
-- 3. Configure target RDS as a Replication Replica of the on-premise source:
--    CALL mysql.rds_set_external_master('onprem-ip', 3306, 'repl_user', 'pass', 'binlog.002', 450);
--    CALL mysql.rds_start_replication;
-- 4. Wait for Seconds_Behind_Master to reach 0, then cut over application DNS!`,
      explanation: "Setting up the cloud database as a temporary replication replica of on-premise servers enables near-zero downtime cutover.",
      keyTakeaways: ["Use replication to catch up real-time changes before final traffic cutover.","Pre-warm buffer pools before directing production traffic to cloud instances.","Verify schema character sets and parameter groups match on-premise configs."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 005.2: Cloud MySQL
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 10
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Self-Hosted MySQL vs Managed Cloud Database Services (DBaaS)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comparing Total Cost of Ownership (TCO), operational burden, automated patching, scaling, high availability, and trade-offs between self-hosted EC2/VMs and managed DBaaS.
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
              Core foundations of managed cloud database architecture, resilience, and economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">TCO Balance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Evaluating operational staffing costs against managed cloud provider fees.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Automated Ops</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Point-in-time recovery, automated snapshots, and minor version upgrades.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Failover SLA</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Multi-AZ synchronous replication guaranteeing sub-60s automated recovery.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Zero Downtime</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Replication-driven migrations enabling cutover with under 5s DNS switchover.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Cloud Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore cloud infrastructure templates, multi-AZ deployment scripts, and scaling topologies.
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
                  Cloud Strategy
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

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Cloud Template &amp; Implementation Runbook:
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
              Practical cloud database deployments in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – Migrating Barrackpore Retail to AWS RDS
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Migration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Mamata managed an on-premise MySQL server that crashed during disk space exhaustion. Susmita migrated the database to AWS RDS MySQL with automated storage autoscaling. The store achieved 99.99% uptime during Diwali sales with automatic nightly snapshots and zero manual disk maintenance.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Hybrid Cloud Banking in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech Cloud
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu evaluated self-hosted bare metal versus GCP Cloud SQL for ₹50 Crores in banking records. They retained critical ledger data on dedicated on-premise servers for regulatory compliance while hosting read-heavy customer portals on Cloud SQL with multi-region read replicas.
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
              Essential cloud guardrails, security configurations, and FinOps guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Expecting Root OS Access on DBaaS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting to SSH into an AWS RDS or Cloud SQL host fails because cloud providers sandbox underlying virtual machines.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Manage server variables and parameters using Cloud Parameter Groups instead of my.cnf files.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Overlooking Egress & I/O Costs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Failing to account for multi-AZ data replication transfer and provisioned IOPS charges leads to unexpected cloud billing spikes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Locate application servers and cloud databases in the same cloud region and VPC.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enable Deletion Protection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always enable Deletion Protection on production RDS / Cloud SQL instances to prevent accidental database termination.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees production databases cannot be deleted by a single accidental click.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Configure Automated Snapshot Retention
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set automated backup retention to at least 14 to 30 days to support compliance and disaster recovery.
              </p>
              <div className="text-xs text-slate-400">
                Allows point-in-time restores to any second within the retention window.
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
            title="Topic 0: Self-Hosted MySQL vs Managed Cloud Database Services (DBaaS)"
            content={noteText}
          />

          <Teacher
            note="Choosing between self-hosted MySQL and managed DBaaS is an architectural milestone! In 90% of modern software companies, managed cloud services like AWS RDS or GCP Cloud SQL are the standard choice because they eliminate operational toil and automate backups. Understand the trade-offs, know how to manage parameter groups, and master cloud scaling!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of cloud database architectures, multi-AZ failovers, and cost optimization.
            </p>
          </div>

          <FAQTemplate
            title="Self-Hosted MySQL vs Managed Cloud Database Services (DBaaS) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
