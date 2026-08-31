import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – MySQL Group Replication: Paxos-Based Synchronous Consensus and Multi-Primary Modes
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive Group Replication workbench: analyzing Paxos quorum consensus math (N = 2F + 1), simulating write set certification and first-committer-wins conflict resolution, evaluating Single-Primary vs Multi-Primary operating modes, and inspecting member state transitions in MySQL 8.0.
 */
const Topic11 = () => {
  // Interactive MGR Phase State
  const [selectedMgrPhase, setSelectedMgrPhase] = useState("phase1_paxos_quorum");

  const mgrPhases = {
    phase1_paxos_quorum: {
      phaseNumber: "Phase 1: Paxos Consensus & Quorum",
      title: "1. Paxos Consensus Protocol & Quorum Math (N = 2F + 1)",
      badge: "Consensus Quorum",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧮 QUORUM & FAULT TOLERANCE FORMULA: N = 2F + 1
-- 3 Nodes → Tolerate F = 1 Failure (Majority Quorum = 2)
-- 5 Nodes → Tolerate F = 2 Failures (Majority Quorum = 3)
-- 7 Nodes → Tolerate F = 3 Failures (Majority Quorum = 4)

-- ⚙️ PORT 33061 (Paxos Group Communication System / GCS):
[mysqld]
group_replication_local_address = "192.168.1.10:33061"
group_replication_group_seeds = "192.168.1.10:33061,192.168.1.20:33061,192.168.1.30:33061"`,
      explanation:
        "Group Replication uses a Paxos-variant protocol to achieve synchronous transaction agreement. A majority quorum (>50%) must acknowledge a transaction's write set before it can commit, guaranteeing zero data loss (RPO = 0) and split-brain immunity.",
      keyTakeaways: [
        "Paxos distributed consensus provides guaranteed RPO = 0 durability.",
        "Cluster sizing mandates odd nodes (minimum 3 nodes for quorum).",
        "Dedicated Port 33061 handles internal Paxos total order broadcast."
      ]
    },
    phase2_certification: {
      phaseNumber: "Phase 2: Write Set Certification",
      title: "2. Total Order Broadcast & Write Set Certification",
      badge: "Zero-Loss Engine",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ THE 4-STEP CERTIFICATION LIFECYCLE:
-- 1. Client executes transaction on Node A in memory.
-- 2. At COMMIT, Node A extracts row hashes (XXHASH64 write sets).
-- 3. Paxos Total Order Broadcast delivers write sets to all nodes in identical sequence.
-- 4. Certification Check: Every node checks for conflicting in-flight rows:
--    → No Conflict: Certified! Commits locally on all nodes.
--    → Conflict: First-Committer-Wins! Later transaction aborts & rolls back.`,
      explanation:
        "All nodes receive transaction write sets in the exact same deterministic sequence. Because every node executes the identical certification algorithm, all members reach independent but 100% unanimous commit/rollback decisions.",
      keyTakeaways: [
        "transaction_write_set_extraction = XXHASH64 extracts 64-bit row hashes.",
        "Total order broadcast ensures all nodes certify transactions in identical order.",
        "First-Committer-Wins: conflicting concurrent writes abort cleanly."
      ]
    },
    phase3_mode_switcher: {
      phaseNumber: "Phase 3: Single vs Multi-Primary",
      title: "3. Single-Primary vs Multi-Primary Operating Modes",
      badge: "Topology Modes",
      badgeColor: "purple",
      sqlSnippet: `-- 👑 1. SINGLE-PRIMARY MODE (Recommended Standard):
[mysqld]
group_replication_single_primary_mode = ON
-- 💡 1 Primary handles writes; Secondaries are super_read_only.
-- Zero certification aborts! Auto-elects new Primary on failure in <5s.

-- 🌐 2. MULTI-PRIMARY MODE (Concurrent Multi-Node Writes):
[mysqld]
group_replication_single_primary_mode = OFF
group_replication_enforce_update_everywhere_checks = ON
-- 💡 All nodes accept writes; requires application conflict handling.`,
      explanation:
        "Single-Primary mode is the enterprise standard because it provides zero-rollback write safety and automatic sub-5-second primary failover. Multi-Primary mode allows concurrent writes on all nodes but requires conflict-aware application partitioning.",
      keyTakeaways: [
        "Single-Primary mode: Zero certification aborts, automatic election.",
        "Multi-Primary mode: All nodes accept writes with distributed conflict checks.",
        "Dynamic UDFs allow online mode switching without server restarts."
      ]
    },
    phase4_health_telemetry: {
      phaseNumber: "Phase 4: Member Telemetry",
      title: "4. Cluster Membership States & Health Monitoring",
      badge: "Real-Time Telemetry",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 QUERYING CLUSTER STATE & MEMBER ROLES:
SELECT MEMBER_ID, MEMBER_HOST, MEMBER_PORT, MEMBER_STATE, MEMBER_ROLE 
FROM performance_schema.replication_group_members;

-- 📊 OUTPUT TELEMETRY:
-- Node 1 | 192.168.1.10 | 3306 | ONLINE     | PRIMARY
-- Node 2 | 192.168.1.20 | 3306 | ONLINE     | SECONDARY
-- Node 3 | 192.168.1.30 | 3306 | ONLINE     | SECONDARY

-- 📦 MEMBER TRANSACTION QUEUE METRICS:
SELECT MEMBER_ID, COUNT_TRANSACTIONS_IN_QUEUE, COUNT_CONFLICTS_DETECTED 
FROM performance_schema.replication_group_member_stats;`,
      explanation:
        "Real-time cluster health is monitored via Performance Schema tables. Member states transition smoothly from OFFLINE to RECOVERING (via the Clone Plugin) and ONLINE as distributed consensus synchronizes state machines.",
      keyTakeaways: [
        "replication_group_members displays member states (ONLINE, RECOVERING, UNREACHABLE).",
        "replication_group_member_stats tracks queue depths and conflict abort counts.",
        "Automated state transfer via MySQL Clone Plugin when new nodes join."
      ]
    }
  };

  const currentPhase = mgrPhases[selectedMgrPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 11 of 14
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          MySQL <span className="text-emerald-400">Group Replication</span>: Paxos Consensus &amp; <span className="text-cyan-400">High Availability</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering Paxos-based synchronous database clustering in MySQL 8.0: calculating quorum fault tolerance ($N = 2F + 1$), understanding write set certification and Total Order Broadcast, deploying Single-Primary vs Multi-Primary modes, and monitoring member state transitions.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: MGR Pillars ─────────────────────────────────── */}
        <section id="mgr-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of MySQL Group Replication
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Distributed state machine principles powering zero-data-loss database clustering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Paxos Consensus</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Majority quorum ($N = 2F + 1$) guarantees total order broadcast and zero data loss (RPO = 0).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Write Certification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates XXHASH64 row write sets using First-Committer-Wins conflict resolution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Single-Primary Mode</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                1 Writable Primary with automatic sub-5-second failover and zero certification aborts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Clone Recovery</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                New nodes provision automatically at NVMe line speed via native MySQL Clone distributed recovery.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Group Replication Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Paxos quorum calculations, write set certification mechanics, Single vs Multi-Primary parameters, and member health status.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(mgrPhases).map((phaseKey) => {
              const phase = mgrPhases[phaseKey];
              const isSelected = selectedMgrPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedMgrPhase(phaseKey)}
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
                  MGR Consensus Mechanism
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
                Configuration &amp; Consensus Telemetry:
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
              Group Replication case studies in Barrackpore and Kolkata demonstrating automated Paxos failover and zero-rollback banking ledgers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Automated Paxos Failover in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RPO = 0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashiers processed ₹1.2 Crores in sales transactions across a 3-node Group Replication cluster. When Node 1 suffered a sudden hardware power supply crash, Node 2 and Node 3 formed a 2/3 Paxos quorum, automatically elected Node 2 as the new Primary within 4.2 seconds, and continued processing cashier invoices with zero lost transactions (RPO = 0).
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero-Rollback Banking in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Single-Primary
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required absolute transaction determinism. Debangshu deployed a 5-node Group Replication cluster in Single-Primary mode with member weights (90 for primary candidate, 50 for secondaries), ensuring that atomic account transfers were certified synchronously without optimistic conflict aborts.
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
              Avoid deploying even numbers of nodes and running tables lacking primary keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Deploying 2-Node Clusters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A 2-node cluster cannot survive a network partition because neither partition can form a strict majority quorum (&gt;50%), freezing writes entirely.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always deploy an odd number of nodes (minimum 3 nodes for quorum).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Tables Without Primary Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Tables lacking primary keys cannot generate XXHASH64 write sets, causing Group Replication to reject write operations with <code>ERROR 3098</code>.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Every table must have an explicit Primary Key (or non-null Unique Key).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enforce Single-Primary Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Standardize on Single-Primary mode for business-critical applications to eliminate concurrent certification rollbacks and foreign key cascade issues.
              </p>
              <div className="text-xs text-slate-400">
                Delivers predictable, deterministic write serialization.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Configure Member Weights
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assign <code>group_replication_member_weight</code> (e.g. 90 vs 50) to ensure high-capacity hardware nodes are prioritized during automated primary elections.
              </p>
              <div className="text-xs text-slate-400">
                Controls failover hierarchy deterministically.
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
            title="Topic 11: MySQL Group Replication: Paxos-Based Synchronous Consensus and Multi-Primary Modes"
            content={noteText}
          />

          <Teacher
            note="MySQL Group Replication is the gold standard for enterprise high availability! It replaces brittle asynchronous replication with Paxos distributed consensus, guaranteeing zero data loss (RPO = 0). Always deploy an odd number of nodes (minimum 3 nodes so N = 2F + 1 holds), standardize on Single-Primary mode for zero-rollback write safety, ensure all tables have primary keys, and monitor cluster states via performance_schema.replication_group_members!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Paxos quorum math, write set certification, Single-Primary failover hierarchy, and member state transitions.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Group Replication &amp; Paxos Consensus FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
