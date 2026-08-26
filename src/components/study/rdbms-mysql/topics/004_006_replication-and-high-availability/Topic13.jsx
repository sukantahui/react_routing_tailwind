import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Automated Failover Strategies, Split-Brain Prevention, and Disaster Recovery Runbooks
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive failover and disaster recovery workbench: analyzing the 6-step enterprise DR runbook, preventing split-brain data divergence via majority quorum and STONITH fencing, comparing GitHub Orchestrator vs InnoDB Cluster failover, and testing Virtual IP / ProxySQL traffic shifting in MySQL 8.0.
 */
const Topic13 = () => {
  // Interactive Failover Step State
  const [selectedDrStep, setSelectedDrStep] = useState("step1_outage_quorum");

  const drRunbookSteps = {
    step1_outage_quorum: {
      stepNumber: "Step 1: Outage & Quorum Assessment",
      title: "1. Outage Confirmation & Split-Brain Quorum Check",
      badge: "Incident Assessment",
      badgeColor: "rose",
      sqlSnippet: `# 💥 OUTAGE DETECTION & QUORUM ASSESSMENT:
# 1. Primary server is down / unresponsive (TCP Port 3306 timeout).
# 2. Check remaining cluster nodes for Paxos Majority Quorum (>50%):
#    - 3-Node Cluster: 2 surviving nodes form 2/3 majority (Quorum = VALID!)
#    - Minority partition (<50%) automatically locks in super_read_only = ON!

# 🛡️ Split-Brain Prevented: Minority node CANNOT accept writes!`,
      explanation:
        "When an outage occurs, the orchestrator confirms that the primary is unresponsive. An odd-numbered cluster ensures that only the surviving majority partition (>50%) can proceed with failover, while isolated nodes lock in read-only mode to prevent split-brain data divergence.",
      keyTakeaways: [
        "Paxos majority quorum (>50%) prevents split-brain data corruption.",
        "Isolated minority partitions automatically enforce super_read_only = ON.",
        "Guarantees that only one partition can elect a replacement primary."
      ]
    },
    step2_elect_candidate: {
      stepNumber: "Step 2: Elect Most Advanced Standby",
      title: "2. Electing the Most Advanced Replica via GTID",
      badge: "GTID Comparison",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 COMPARING EXECUTED GTID SETS ACROSS STANDBY REPLICAS:
-- On Standby Node 2:
SELECT @@GLOBAL.gtid_executed;
-- Output: 3E11FA47-...:1-500  (Contains all 500 committed transactions)

-- On Standby Node 3:
SELECT @@GLOBAL.gtid_executed;
-- Output: 3E11FA47-...:1-498  (Lagging by 2 transactions)

-- 💡 Decision: Node 2 has the largest GTID set -> Elect Node 2 for promotion!`,
      explanation:
        "The orchestrator or DBA queries @@GLOBAL.gtid_executed on all surviving standby nodes. The node with the most complete transaction range is elected for promotion to guarantee zero data loss (RPO = 0).",
      keyTakeaways: [
        "SELECT @@GLOBAL.gtid_executed identifies the candidate with highest transaction count.",
        "Promoting the most advanced replica achieves RPO = 0 with zero lost writes.",
        "Eliminates guesswork in multi-replica cluster topologies."
      ]
    },
    step3_promote_repoint: {
      stepNumber: "Step 3: Promotion & GTID Repointing",
      title: "3. Standby Promotion & Replica Auto-Repointing",
      badge: "Auto-Positioning",
      badgeColor: "emerald",
      sqlSnippet: `-- 👑 1. PROMOTE STANDBY NODE 2 TO PRIMARY:
STOP REPLICA;
SET GLOBAL super_read_only = OFF;
SET GLOBAL read_only = OFF;

-- 🔄 2. REPOINT STANDBY NODE 3 TO NEW PRIMARY VIA GTID AUTO-POSITIONING:
STOP REPLICA;
CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.20', 
  SOURCE_USER = 'repl_user', 
  SOURCE_PASSWORD = 'ReplPass#2026', 
  SOURCE_AUTO_POSITION = 1;
START REPLICA;`,
      explanation:
        "Node 2 is promoted to Primary by disabling super_read_only. Remaining replicas are repointed to the new primary using GTID Auto-Positioning without needing binary log file coordinates.",
      keyTakeaways: [
        "Disabling super_read_only unlocks write transactions on the promoted node.",
        "SOURCE_AUTO_POSITION = 1 negotiates missing transactions automatically.",
        "Replication topology refactors in under 5 seconds with zero coordinate math."
      ]
    },
    step4_traffic_recovery: {
      stepNumber: "Step 4: Traffic Shift & Master Recovery",
      title: "4. Virtual IP / Proxy Shift & Dead Master Clone Recovery",
      badge: "Traffic Redirection",
      badgeColor: "purple",
      sqlSnippet: `# 🌐 1. SHIFT VIRTUAL IP (VIP) TO NEW PRIMARY (Node 2):
# Keepalived binds floating IP 192.168.1.100 to Node 2 via Gratuitous ARP!

# 🔄 2. UPDATE PROXYSQL WRITER HOSTGROUP:
UPDATE mysql_servers SET hostgroup_id = 10 WHERE hostname = '192.168.1.20';
LOAD MYSQL SERVERS TO RUNTIME;

# 🧹 3. RECOVER FORMER MASTER (Node 1) VIA CLONE PLUGIN WHEN IT BOOTS:
# Re-image cleanly from new primary and join as read-only standby:
CLONE INSTANCE FROM 'clone_user'@'192.168.1.20':3306 IDENTIFIED BY 'Pass#2026';`,
      explanation:
        "Application write traffic is redirected to the new primary via Virtual IP (VIP) or ProxySQL hostgroup swapping. When the old crashed primary comes back online, it is cleanly re-imaged via the MySQL Clone Plugin to rejoin as a read-only secondary.",
      keyTakeaways: [
        "Keepalived Virtual IP shifts client connections in under 1 second.",
        "ProxySQL automatically routes write traffic to the newly promoted primary.",
        "MySQL Clone Plugin re-images former crashed masters to eliminate errant transactions."
      ]
    }
  };

  const currentStep = drRunbookSteps[selectedDrStep];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 13 of 14 (Capstone)
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Automated Failover</span> &amp; <span className="text-cyan-400">Disaster Recovery</span> Runbooks
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering enterprise disaster recovery in MySQL 8.0: understanding RTO/RPO objectives, preventing split-brain via Paxos majority quorums, executing the 6-step disaster recovery runbook, repointing replicas via GTID auto-positioning, and shifting traffic with Virtual IPs and ProxySQL.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: DR Pillars ──────────────────────────────────── */}
        <section id="dr-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Disaster Recovery
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core architectural principles ensuring business continuity and split-brain immunity during datacenter outages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Quorum Fencing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Majority quorum (&gt;50%) locks minority partitions into <code>super_read_only</code> to prevent split-brain.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">GTID Election</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Promotes the standby replica with the highest <code>gtid_executed</code> set to guarantee RPO = 0.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Auto-Repointing</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>SOURCE_AUTO_POSITION = 1</code> re-aligns remaining replicas to the new primary with zero coordinate math.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Traffic Shifting</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Keepalived Virtual IPs (VIP) and ProxySQL hostgroups redirect client writes in under 1 second.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Disaster Recovery &amp; Failover Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the 6-step enterprise DR runbook: quorum verification, GTID election, standby promotion, and Virtual IP traffic shifting.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(drRunbookSteps).map((stepKey) => {
              const step = drRunbookSteps[stepKey];
              const isSelected = selectedDrStep === stepKey;
              return (
                <button
                  key={stepKey}
                  onClick={() => setSelectedDrStep(stepKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {step.stepNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Disaster Recovery Runbook Phase
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentStep.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentStep.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentStep.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentStep.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentStep.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentStep.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStep.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Execution Runbook &amp; Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentStep.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentStep.keyTakeaways.map((item, i) => (
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
              Disaster recovery case studies in Barrackpore and Kolkata demonstrating 90-second manual DR execution and automated Orchestrator failover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 90-Second Recovery in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RTO &lt; 90s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashiers billed ₹1.2 Crores in daily sales across a semi-sync replication cluster. When the primary server motherboard failed, Susmita identified Node 2 as having the highest <code>gtid_executed</code> set, disabled <code>super_read_only</code>, repointed Node 3 via GTID auto-positioning, and swapped the ProxySQL writer hostgroup in under 90 seconds with zero lost invoices (RPO = 0).
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Automated Orchestrator Failover in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Automated VIP Shift
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume, a sudden network switch failure severed the primary database host. GitHub Orchestrator detected the dead master in 3.5 seconds, elected the most advanced standby replica, re-aligned downstream secondaries, executed a post-failover hook to shift the Keepalived Virtual IP (VIP), and restored core banking in 6.8 seconds with zero data loss.
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
              Avoid promoting replicas with errant transactions and leaving old masters without re-imaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Promoting Replicas with Errant GTIDs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Promoting a replica with rogue direct transactions causes downstream replicas to fail with Error 1236 when attempting to sync.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Check GTID_SUBTRACT before failover and enforce super_read_only on all standbys.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Trusting Client DNS Caching
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Relying strictly on DNS updates causes applications to continue writing to the old dead IP due to JVM and OS DNS caching.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use Keepalived Virtual IPs (VIP) or ProxySQL for sub-second traffic redirection.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Re-Image Old Masters via Clone
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When a crashed master reboots, re-image it cleanly using the MySQL Clone Plugin from the new primary before rejoining as a standby.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates un-replicated ghost transactions and aligns GTID history.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Conduct Regular GameDay Drills
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Execute quarterly disaster recovery chaos drills to validate automated failover orchestrators, PagerDuty alerting, and DR runbooks.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees operational readiness before real production emergencies.
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
            title="Topic 13: Automated Failover Strategies, Split-Brain Prevention, and Disaster Recovery Runbooks"
            content={noteText}
          />

          <Teacher
            note="Disaster recovery and failover planning is the ultimate test of database engineering excellence! Understand the difference between local HA (RPO=0, RTO<5s) and cross-region DR (RPO<5s, RTO<15m). Prevent split-brain by requiring strict majority quorums (>50%) and enforcing super_read_only = ON on all standbys. Always use GTID auto-positioning for seamless replica repointing, shift client traffic via Virtual IPs or ProxySQL, and validate your disaster runbooks through quarterly GameDay drills!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of RTO/RPO SLAs, split-brain quorum fencing, GTID candidate election, Virtual IP shifting, and disaster recovery drill procedures.
            </p>
          </div>

          <FAQTemplate
            title="Automated Failover &amp; Disaster Recovery FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
