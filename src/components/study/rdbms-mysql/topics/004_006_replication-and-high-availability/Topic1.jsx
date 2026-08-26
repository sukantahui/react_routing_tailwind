import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – How MySQL Replication Works: Binary Log on Source, I/O Thread, Relay Log, and SQL Thread on Replica
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive 3-thread replication pipeline workbench: inspecting Source Binlog Dump threads, Replica I/O Receiver threads, on-disk Relay Logs, and SQL Applier execution in MySQL 8.0.
 */
const Topic1 = () => {
  // Interactive Pipeline Component State
  const [selectedPipelineKey, setSelectedPipelineKey] = useState("thread1_dump_thread");

  const pipelineComponents = {
    thread1_dump_thread: {
      componentName: "1. Source: Binlog Dump",
      title: "1. Source: Binary Log & Binlog Dump Thread",
      badge: "Source Engine",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 1. SOURCE BINARY LOG WRITING:
-- Transactions are committed locally in InnoDB and written to the Binary Log:
-- binlog.000001 &rarr; binlog.000002

-- 🚀 2. DEDICATED BINLOG DUMP THREAD (SPAWNED PER CONNECTED REPLICA):
SHOW PROCESSLIST;
-- User: repl_user | Command: Binlog Dump GTID | State: Master has sent all binlog to replica`,
      explanation:
        "When write transactions commit on the Source, they are written to the Binary Log. The dedicated Binlog Dump Thread reads the binary log sequentially and streams events across the TCP network socket to the replica.",
      keyTakeaways: [
        "Transactions commit locally and write events to the Binary Log.",
        "The Source spawns an independent Binlog Dump thread for each connected replica.",
        "Streams events via TCP with periodic heartbeat packets."
      ]
    },
    thread2_io_thread: {
      componentName: "2. Replica: I/O Receiver",
      title: "2. Replica: Replication Receiver (I/O) Thread",
      badge: "Network Receiver",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌐 REPLICA I/O THREAD HANDSHAKE & STREAMING:
SHOW REPLICA STATUS\\G

-- Key Status Variables:
-- Replica_IO_Running: Yes  (Connected & actively downloading)
-- Master_Log_File: binlog.000004
-- Read_Master_Log_Pos: 189200 (Downloaded network position)

-- 💡 Action: Writes raw network stream into local Relay Logs!`,
      explanation:
        "The Replica I/O thread establishes a TCP connection to the Source, requests binary log streams, and immediately writes incoming events sequentially to local on-disk Relay Logs without waiting for SQL execution.",
      keyTakeaways: [
        "Connects to Source and requests binary log streams via COM_BINLOG_DUMP.",
        "Buffers incoming transactions into local Relay Logs independently of SQL execution.",
        "Monitored via Replica_IO_Running in SHOW REPLICA STATUS."
      ]
    },
    thread3_relay_logs: {
      componentName: "3. Replica: Relay Logs",
      title: "3. Replica: On-Disk Relay Logs & Auto-Purging",
      badge: "On-Disk Queue",
      badgeColor: "purple",
      sqlSnippet: `# 📂 ON-DISK RELAY LOG FILES (BUFFER QUEUE):
# - replica-relay-bin.000001
# - replica-relay-bin.000002
# - replica-relay-bin.index

-- 🧹 AUTOMATIC RELAY LOG CLEANUP:
SHOW VARIABLES LIKE 'relay_log_purge'; -- Value: ON (Purged after SQL execution)
SHOW VARIABLES LIKE 'max_relay_log_size'; -- Default: 1GB per file`,
      explanation:
        "Relay logs serve as a durable on-disk transaction queue between the fast network receiver (I/O thread) and the storage engine applier (SQL thread). Relay logs are automatically deleted once executed if relay_log_purge = ON.",
      keyTakeaways: [
        "Acts as a durable buffer queue between network and storage engine.",
        "relay_log_purge = 1 automatically deletes executed logs from disk.",
        "Prevents slow disk queries on the replica from blocking network downloads."
      ]
    },
    thread4_sql_thread: {
      componentName: "4. Replica: SQL Applier",
      title: "4. Replica: Replication Applier (SQL) Thread",
      badge: "Storage Applier",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ SQL THREAD EXECUTION & CRASH RECOVERY:
SHOW REPLICA STATUS\\G

-- Key Execution Variables:
-- Replica_SQL_Running: Yes (Actively applying transactions)
-- Relay_Master_Log_File: binlog.000004
-- Exec_Master_Log_Pos: 154829 (Committed position on replica)
-- Seconds_Behind_Source: 0    (Replication lag in seconds)

-- 🛡️ CRASH RECOVERY BEST PRACTICE:
-- my.cnf: relay_log_recovery = ON (Wipes relay logs and re-fetches from Source on crash)`,
      explanation:
        "The SQL thread reads events from local Relay Logs and executes them on the replica's local InnoDB storage engine. Setting relay_log_recovery = ON ensures crash-safe recovery if the replica unexpectedly restarts.",
      keyTakeaways: [
        "Reads relay logs and executes transactions in InnoDB tables.",
        "The gap between Read_Master_Log_Pos and Exec_Master_Log_Pos reflects unapplied queue.",
        "relay_log_recovery = ON guarantees automated crash-safe recovery."
      ]
    }
  };

  const currentComponent = pipelineComponents[selectedPipelineKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 1 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How MySQL Replication Works: <span className="text-emerald-400">Binary Log</span>, <span className="text-cyan-400">I/O Thread</span> &amp; Relay Logs
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the internal 3-thread asynchronous replication pipeline in MySQL 8.0: exploring Source Binlog Dump threads, Replica I/O Receiver threads, on-disk Relay Log queues, and SQL Applier execution with crash-safe recovery.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Pipeline Architecture Diagram ───────────────── */}
        <section id="pipeline-architecture" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Threads of MySQL Replication Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL decouples network transfer from storage engine execution across three distinct threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Thread 1 (Source)</span>
              <h3 className="font-bold text-white text-base">Binlog Dump Thread</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reads committed transactions from the Binary Log and streams them across the TCP socket to replicas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Thread 2 (Replica)</span>
              <h3 className="font-bold text-white text-base">I/O Receiver Thread</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receives the TCP stream from Source and writes events sequentially into local on-disk Relay Logs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Queue (Replica)</span>
              <h3 className="font-bold text-purple-300 text-base">Relay Logs Buffer</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Circular on-disk queue holding downloaded events, automatically purged once executed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Thread 3 (Replica)</span>
              <h3 className="font-bold text-rose-300 text-base">SQL Applier Thread</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Reads transactions from Relay Logs and executes them in local InnoDB tables to sync data.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive 3-Thread Pipeline Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the Binlog Dump thread, I/O Receiver thread, on-disk Relay Logs, and SQL Applier execution.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(pipelineComponents).map((compKey) => {
              const comp = pipelineComponents[compKey];
              const isSelected = selectedPipelineKey === compKey;
              return (
                <button
                  key={compKey}
                  onClick={() => setSelectedPipelineKey(compKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {comp.componentName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Pipeline Component
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentComponent.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentComponent.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentComponent.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentComponent.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentComponent.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentComponent.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentComponent.explanation}
            </p>

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Commands &amp; Architecture Logs:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentComponent.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentComponent.keyTakeaways.map((item, i) => (
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
              Replication internals case studies in Barrackpore and Kolkata demonstrating automated crash recovery and thread diagnostic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Automated Relay Log Crash Recovery in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Crash-Safe Recovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a retail store replica server lost power during a lightning storm. Upon reboot, because Susmita had configured <code>relay_log_recovery = ON</code> in <code>my.cnf</code>, the replica automatically discarded all corrupted relay log files and re-fetched the missing transactions from the Source using coordinates stored in <code>mysql.slave_relay_log_info</code>, restoring synchronization in under 1 minute across ₹1.2 Crores in inventory data.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Diagnosing I/O vs SQL Thread Stalls in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Thread Triage
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required investigating replica latency. Debangshu ran <code>SHOW REPLICA STATUS\\G</code>, seeing <code>Replica_IO_Running: Yes</code> with <code>Read_Master_Log_Pos: 950000</code>, but <code>Exec_Master_Log_Pos: 120000</code> with <code>Seconds_Behind_Source: 42s</code>. This proved the network I/O thread was fast, but the single-threaded SQL applier was choked by an unindexed batch UPDATE.
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
              Avoid dangerous local writes on replicas and disabled relay log recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving read_only = OFF on Replicas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If <code>read_only = OFF</code>, accidental application writes directly to the replica cause data divergence and trigger duplicate key errors (<code>ERROR 1062</code>) that crash replication.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure read_only = ON and super_read_only = ON on replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Disabling relay_log_recovery
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Without <code>relay_log_recovery = ON</code>, a replica that crashes during a power outage may attempt to read corrupted relay log headers upon reboot, halting replication.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enable relay_log_recovery = ON in production my.cnf.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use InnoDB TABLE Repositories
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Store replication positions in InnoDB tables (<code>master_info_repository = TABLE</code> and <code>relay_log_info_repository = TABLE</code>) rather than legacy flat files.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees atomic, crash-safe transaction metadata commits.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable log_replica_updates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enable <code>log_replica_updates = ON</code> so that the replica writes applied transactions into its own binary log, enabling cascading replication and seamless primary promotion.
              </p>
              <div className="text-xs text-slate-400">
                Essential for high availability failover candidate nodes.
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
            title="Topic 1: How MySQL Replication Works: Binary Log on Source, I/O Thread, Relay Log, and SQL Thread on Replica"
            content={noteText}
          />

          <Teacher
            note="Understanding the 3-thread replication architecture is essential for every database administrator! On the Source, the Binlog Dump thread streams events over TCP. On the Replica, the I/O thread downloads them into local Relay Logs, while the SQL thread applies them to InnoDB. Always enable relay_log_recovery = ON and super_read_only = ON on replicas, and use SHOW REPLICA STATUS to check both threads!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of the 3-thread replication pipeline, relay log buffering, crash recovery settings, and SHOW REPLICA STATUS telemetry.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Replication Internals FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
