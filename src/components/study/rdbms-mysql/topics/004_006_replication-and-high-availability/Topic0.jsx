import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – High Availability (HA) and Horizontal Scalability Concepts in Database Engineering
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive High Availability & Scalability workbench: exploring the Nines of Availability, evaluating RPO and RTO disaster recovery objectives, contrasting Scale-Up vs Scale-Out topologies, and understanding quorum-based split-brain prevention in MySQL 8.0.
 */
const Topic0 = () => {
  // Interactive HA & Scalability Phase State
  const [selectedHaPhase, setSelectedHaPhase] = useState("phase1_nines_availability");

  const haPhases = {
    phase1_nines_availability: {
      phaseNumber: "Phase 1: The Nines of Availability",
      title: "1. Uptime Metrics & The Nines of Availability",
      badge: "Uptime SLAs",
      badgeColor: "emerald",
      sqlSnippet: `# 📊 ANNUAL DOWNTIME BY AVAILABILITY LEVEL:
# 99.0%   (2 Nines) : 3.65 Days / Year    (Basic internal tools)
# 99.9%   (3 Nines) : 8.76 Hours / Year   (Standard SaaS)
# 99.99%  (4 Nines) : 52.56 Minutes / Year (Enterprise E-Commerce)
# 99.999% (5 Nines) : 5.26 Minutes / Year (Mission-Critical Tier-1 Banking)

-- 🎯 SLA Calculation Formula:
-- Uptime % = (1 - (Downtime_Seconds / Total_Period_Seconds)) * 100%`,
      explanation:
        "High Availability measures the percentage of time a database remains accessible. Moving from 3 Nines (8.76h downtime) to 5 Nines (5.26m downtime) requires transitioning from manual intervention to fully automated sub-minute clustering.",
      keyTakeaways: [
        "99.999% (5 Nines) allows only 5.26 minutes of downtime per year.",
        "Requires automated health checking, fencing, and traffic proxying.",
        "Manual failover cannot achieve 4 Nines or 5 Nines SLAs."
      ]
    },
    phase2_rpo_and_rto: {
      phaseNumber: "Phase 2: RPO & RTO Objectives",
      title: "2. Disaster Recovery Objectives: RPO & RTO",
      badge: "Disaster Recovery",
      badgeColor: "cyan",
      sqlSnippet: `# 🎯 1. RPO (RECOVERY POINT OBJECTIVE) → MAX TOLERABLE DATA LOSS:
# - RPO = 0 : ZERO Data Loss (Requires Lossless Semi-Sync or Group Replication)
# - RPO > 0 : Eventual Consistency (Async Replication with potential lag loss)

# ⏱️ 2. RTO (RECOVERY TIME OBJECTIVE) → MAX TOLERABLE DOWNTIME:
# - RTO < 30s : Automated Proxy + Orchestrator Failover (InnoDB Cluster)
# - RTO > 1h  : Manual backup restoration from cold storage dumps`,
      explanation:
        "RPO dictates replication synchronicity (how much data you can afford to lose), while RTO dictates the failover automation architecture (how quickly you must restore service availability).",
      keyTakeaways: [
        "RPO = 0 requires synchronous acknowledgment before commit returns.",
        "RTO < 30s requires automated health probes and proxy routing.",
        "Disaster Recovery runbooks must be tested regularly with Chaos experiments."
      ]
    },
    phase3_scaleup_vs_scaleout: {
      phaseNumber: "Phase 3: Scale-Up vs Scale-Out",
      title: "3. Scale-Up (Vertical) vs Scale-Out (Horizontal)",
      badge: "Scaling Architecture",
      badgeColor: "purple",
      sqlSnippet: `# ⬆️ 1. SCALE-UP (VERTICAL SCALING):
# - Upgrade single node: 16 Core / 64GB RAM → 128 Core / 1TB RAM + NVMe.
# - Limitation: Hardware ceiling and remains a Single Point of Failure (SPOF)!

# ➡️ 2. SCALE-OUT (HORIZONTAL SCALING):
# - Read Scaling: 1 Primary (Writes) → ProxySQL → 5 Read Replicas (Reads).
# - Write Scaling: Horizontal Database Sharding by Shard Key (e.g. Vitess).`,
      explanation:
        "Vertical scaling upgrades a single server's hardware but remains a SPOF. Horizontal scaling distributes read queries across multiple read replicas via intelligent proxies and partitions write traffic across shards.",
      keyTakeaways: [
        "Scale-up hits physical cost and hardware limits and leaves a SPOF.",
        "Read replicas handle 80-95% of application read traffic effortlessly.",
        "Write scaling requires horizontal sharding or partitioned clusters."
      ]
    },
    phase4_quorum_and_splitbrain: {
      phaseNumber: "Phase 4: Quorum & Split-Brain",
      title: "4. Split-Brain Prevention & Majority Quorum",
      badge: "Consensus & Fencing",
      badgeColor: "rose",
      sqlSnippet: `# 🛡️ MAJORITY QUORUM FORMULA:
# Quorum Required = floor(N / 2) + 1  (Where N = Total Cluster Nodes)

# 🌐 3-NODE CLUSTER PARTITION BEHAVIOR:
# Partition A (2 Nodes) : Holds Majority (2/3) → Continues processing WRITES!
# Partition B (1 Node)  : Isolated Minority (1/3) → Automatically Read-Only / Fenced!

# 🚫 Split-Brain Avoidance:
# Fencing (STONITH) ensures old primaries are isolated before standby promotion!`,
      explanation:
        "A split-brain occurs when a network partition creates two competing primaries that both accept conflicting writes. Majority quorum algorithms (Paxos) and STONITH fencing guarantee that only one partition can accept writes.",
      keyTakeaways: [
        "Quorum requires (N/2 + 1) majority votes to maintain a primary.",
        "A 3-node cluster tolerates 1 node failure without downtime.",
        "Node fencing forcefully isolates unresponsive primaries to prevent data corruption."
      ]
    }
  };

  const currentPhase = haPhases[selectedHaPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 14
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          High Availability &amp; <span className="text-emerald-400">Horizontal Scalability</span> in <span className="text-cyan-400">Database Engineering</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the architectural principles of enterprise database reliability: evaluating the Nines of Availability, defining strict RPO and RTO disaster recovery objectives, contrasting Scale-Up with Scale-Out read/write topologies, and preventing split-brain data corruption with majority quorum consensus.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: HA Pillars ──────────────────────────────────── */}
        <section id="ha-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Database High Availability
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core theoretical and architectural foundations governing reliable distributed database systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">5 Nines (99.999%)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Limits annual downtime to 5.26 minutes through automated health checking and sub-minute failover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">RPO &amp; RTO SLAs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                RPO = 0 guarantees zero data loss; RTO &lt; 30s guarantees rapid service restoration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Scale-Out Topologies</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Eliminates hardware ceilings and SPOFs by scaling reads across replica farms with intelligent proxies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Majority Quorum</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Guarantees $(N/2 + 1)$ consensus to eliminate split-brain data corruption during network partitions.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive High Availability &amp; Scalability Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe availability calculations, RPO/RTO parameters, scaling topologies, and majority quorum consensus.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(haPhases).map((phaseKey) => {
              const phase = haPhases[phaseKey];
              const isSelected = selectedHaPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedHaPhase(phaseKey)}
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

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architecture Formulas &amp; Configurations:
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
              High Availability case studies in Barrackpore and Kolkata demonstrating 12-second automated failover and RPO = 0 banking compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 12-Second Auto-Failover in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RTO: 12 Seconds
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a power supply failure took down the primary database during Diwali billing. Because Susmita had configured a hot standby replica with ProxySQL health checks, traffic automatically failed over in 12 seconds with RPO = 0. Cashier POS terminals reconnected seamlessly without losing a single transaction across ₹1.2 Crores in festival sales.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Strict RPO = 0 in Kolkata Fintech Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  RPO = 0 Enforced
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required zero data loss under RBI regulations. Debangshu architected a 3-node MySQL Group Replication cluster with Lossless Semi-Sync. When a primary kernel panic occurred, the cluster elected a new primary via Paxos majority quorum in 8 seconds with zero uncommitted data loss.
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
              Avoid catastrophic split-brain scenarios and manual failover during production incidents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: 2-Node Clusters Without Quorum
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A 2-node cluster cannot establish a majority quorum during network splits, leading to split-brain data corruption or total cluster halt.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always deploy an odd number of nodes (minimum 3 nodes) for consensus clusters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Manual Failover in Outages
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Manual failover introduces human error and increases RTO from seconds to 30+ minutes during high-stress production outages.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use automated orchestrators (Orchestrator, MySQL InnoDB Cluster) for failover.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Eliminate All Single Points of Failure
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure redundancy at every infrastructure tier: dual network interfaces, redundant top-of-rack switches, and hot standby database nodes.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees resilience against isolated hardware failures.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Regular Chaos Engineering Drills
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Simulate sudden primary node power cuts in staging to verify that automated proxy routing and replica promotion execute within RTO SLAs.
              </p>
              <div className="text-xs text-slate-400">
                Validates disaster recovery runbooks before real outages occur.
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
            title="Topic 0: High Availability (HA) and Horizontal Scalability Concepts in Database Engineering"
            content={noteText}
          />

          <Teacher
            note="Welcome to Module 004.6: Replication, High Availability & Failover Topologies! Remember that backups are not High Availability — backups are for disaster recovery after the building burns down, whereas HA keeps your database running through hardware crashes with RTO < 30 seconds and RPO = 0. Always design out Single Points of Failure, use odd-numbered 3-node clusters for majority quorum, and scale reads horizontally with proxies!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of the Nines of Availability, RPO/RTO disaster objectives, scale-up vs scale-out, quorum consensus, and split-brain prevention.
            </p>
          </div>

          <FAQTemplate
            title="High Availability &amp; Scalability FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
