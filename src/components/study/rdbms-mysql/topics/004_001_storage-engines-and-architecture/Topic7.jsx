import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – InnoDB Doublewrite Buffer: Preventing Torn Pages on Disk Failure
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive Doublewrite Buffer workbench: analyzing the 16KB vs 4KB partial write torn page dilemma, two-step page flushing mechanics, CRC32 checksum detection, dedicated .dblwr multi-file architecture in MySQL 8.0, and crash self-healing algorithms.
 */
const Topic7 = () => {
  // Interactive Doublewrite Phase State
  const [selectedDblwrPhase, setSelectedDblwrPhase] = useState("phase1_torn_page");

  const dblwrPhases = {
    phase1_torn_page: {
      phaseNumber: "Phase 1: Torn Page Dilemma",
      title: "1. The Torn Page Dilemma: 16KB InnoDB Pages vs 4KB OS Blocks",
      badge: "Torn Page Risk",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ THE TORN PAGE PROBLEM (PARTIAL WRITE CORRUPTION):
-- 1. InnoDB uses 16KB (16,384 bytes) page frames.
-- 2. Operating System filesystems (ext4, XFS, NTFS) write in 4KB blocks.
-- 3. Writing ONE 16KB page requires 4 consecutive 4KB OS block writes:
--      [Block 1: 4KB] → [Block 2: 4KB] → [Block 3: 4KB] → [Block 4: 4KB]

-- 💥 POWER CUT DISASTER:
-- If power cuts after Block 2 is written, the page on disk is HALF OLD / HALF NEW!
-- This is a 'TORN PAGE'. CRC32 checksum fails!
-- 
-- Why Redo Log alone cannot fix it:
-- Redo log stores physiological byte deltas that REQUIRE a valid base page!`,
      metricsTable: [
        { metric: "InnoDB Page Size", value: "16 KB (16,384 Bytes)", role: "Unit of Buffer Pool caching and tablespace storage" },
        { metric: "OS Sector Size", value: "4 KB (4,096 Bytes)", role: "Hardware disk block allocation size" },
        { metric: "Failure Mode", value: "Torn Page / Partial Write", role: "Corrupts B+ tree structures during power outages" },
        { metric: "Redo Log Limitation", value: "Physiological Delta Requirement", role: "Cannot apply deltas to physically corrupt base pages" }
      ],
      explanation:
        "Standard operating systems write data in 4KB chunks. If a power outage occurs while writing a 16KB InnoDB page, the page is left partially written (a Torn Page). Because physiological Redo Logs require an intact base page, the Redo Log alone cannot recover from this failure without the Doublewrite Buffer."
    },
    phase2_two_step_flush: {
      phaseNumber: "Phase 2: Two-Step Flush",
      title: "2. The Two-Step Flush Sequence: Contiguous DBLWR & Random Tablespace",
      badge: "Two-Step Sequence",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 TWO-STEP DOUBLEWRITE FLUSHING SEQUENCE:
-- STEP 1: CONTIGUOUS SEQUENTIAL WRITE
--   Page Cleaners gather dirty 16KB pages from Buffer Pool.
--   Writes the batch sequentially to contiguous blocks in the Doublewrite Buffer (#ib_16384_*.dblwr).
--   Calls fsync() on the doublewrite file (Sequential I/O is ultra-fast, ~3-5% overhead!).

-- STEP 2: RANDOM TABLESPACE WRITE
--   Writes the 16KB pages to their actual random positions in .ibd tablespaces.

-- If a power cut hits during Step 2, the pristine copy is safe in the Doublewrite Buffer!`,
      metricsTable: [
        { metric: "Step 1: Doublewrite Write", value: "Contiguous Sequential I/O", role: "Writes full 16KB pages to dedicated .dblwr files" },
        { metric: "Step 2: Tablespace Write", value: "Random File I/O", role: "Flushes pages to individual .ibd tablespace files" },
        { metric: "Performance Cost", value: "Negligible (~3% to 5%)", role: "Sequential batching avoids disk head seek overhead" },
        { metric: "Safety Guarantee", value: "Zero Torn Pages on Disk", role: "Pristine copy always exists on disk before tablespace flush" }
      ],
      explanation:
        "InnoDB writes pages twice: first sequentially in contiguous blocks to the Doublewrite Buffer (`.dblwr`), then to their actual random locations in `.ibd` tablespaces. Because the first write is contiguous and sequential, the performance cost is negligible (~3-5%)."
    },
    phase3_crash_healing: {
      phaseNumber: "Phase 3: Self-Healing",
      title: "3. CRC32 Checksum Validation & Automatic Self-Healing Recovery",
      badge: "Crash Self-Healing",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ AUTOMATIC TORN PAGE RECOVERY DURING STARTUP:
-- Upon server reboot after an unexpected crash:
-- 1. InnoDB reads pages from disk and validates CRC32 Checksums (Hardware-accelerated).
-- 2. If a page has a Checksum mismatch (Torn Page detected!):
--    - Prints to Error Log: "[Note] Restoring page from doublewrite buffer..."
--    - Reads the intact 16KB copy from the Doublewrite Buffer.
--    - Overwrites the damaged page in the .ibd tablespace!
-- 3. InnoDB proceeds to Redo Log roll-forward on the restored, valid base page!

-- Result: 100% self-healing with zero data loss! ✅`,
      metricsTable: [
        { metric: "Detection Algorithm", value: "Hardware-accelerated CRC32", role: "Compares header checksum against page trailer" },
        { metric: "Restoration Action", value: "Overwrites damaged page", role: "Copies pristine 16KB page from .dblwr into .ibd file" },
        { metric: "Post-Restoration Action", value: "Redo Log Roll-Forward", role: "Replays committed WAL records to bring page up to date" },
        { metric: "Log Indicator", value: "Restoring page from doublewrite", role: "Documents automatic self-healing event in Error Log" }
      ],
      explanation:
        "During startup, InnoDB computes CRC32 checksums on all pages. If a torn page is detected, it automatically copies the pristine 16KB page from the Doublewrite Buffer over the damaged tablespace page, allowing the Redo Log to roll forward normally."
    },
    phase4_config_tuning: {
      phaseNumber: "Phase 4: Configuration",
      title: "4. Dedicated Doublewrite Files & Configuration in MySQL 8.0",
      badge: "MySQL 8.0 Architecture",
      badgeColor: "amber",
      sqlSnippet: `-- ⚙️ DOUBLEWRITE CONFIGURATION & STATUS INSPECTION:
-- 1. Check Doublewrite Buffer Status & Metrics:
SHOW GLOBAL STATUS LIKE 'Innodb_dblwr_%';
-- Innodb_dblwr_pages_written (Total pages written through DBLWR)
-- Innodb_dblwr_writes        (Total doublewrite write operations)
-- Batch Ratio = pages_written / writes (Target: > 30 for high efficiency)

-- 2. Doublewrite Configuration Variables:
SHOW VARIABLES LIKE 'innodb_doublewrite%';
-- innodb_doublewrite = ON (Default / Mandatory on standard filesystems)
-- innodb_doublewrite_pages = 4 (Pages per thread batch)
-- innodb_doublewrite_files = 2 (Proportional to page cleaners)

-- 3. Dedicated Files in Data Directory (MySQL 8.0.20+):
-- #ib_16384_0.dblwr, #ib_16384_1.dblwr`,
      metricsTable: [
        { metric: "innodb_doublewrite", value: "ON (Default)", role: "Enables full torn page detection and recovery" },
        { metric: "innodb_doublewrite_dir", value: "Custom storage path", role: "Allows placing .dblwr files on dedicated fast NVMe drives" },
        { metric: "Safe to Disable?", value: "ONLY on ZFS / Btrfs", role: "Copy-on-write filesystems with atomic 16KB write guarantees" },
        { metric: "Files Architecture", value: "#ib_16384_*.dblwr", role: "Multi-file structure eliminates mutex serialization bottlenecks" }
      ],
      explanation:
        "In MySQL 8.0.20+, the Doublewrite Buffer uses dedicated `#ib_16384_*.dblwr` files rather than `ibdata1`, eliminating I/O bottlenecks. It can only be safely disabled on filesystems that guarantee 16KB write atomicity (like ZFS with Copy-on-Write)."
    }
  };

  const navItems = [
    { id: "torn-page-overview", label: "1. Torn Page Dilemma" },
    { id: "dblwr-diagram", label: "2. Two-Step Flush Diagram" },
    { id: "interactive-workbench", label: "3. Doublewrite Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Doublewrite Audit Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_001</span>
            <span>•</span>
            <span>Topic 7 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Torn Page Protection
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            InnoDB Doublewrite Buffer: Preventing Torn Pages on Disk Failure
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand MySQL's insurance policy against partial page writes: explore the 16KB vs 4KB torn page dilemma, two-step page flushing mechanics, hardware-accelerated CRC32 checksum detection, and dedicated <code className="text-cyan-400 font-mono">.dblwr</code> multi-file architecture in MySQL 8.0.
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
        {/* SECTION 1: Torn Page Overview */}
        <section id="torn-page-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Partial Write Dilemma &amp; Torn Pages
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why 16KB database pages on 4KB operating system filesystems require dedicated crash insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                The Hazard
              </span>
              <h3 className="font-bold text-white text-base">4x 4KB OS Blocks</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Writing one 16KB InnoDB page requires 4 separate 4KB OS block writes. Power failure mid-sequence leaves the page physically broken (Torn Page).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                The Insurance
              </span>
              <h3 className="font-bold text-white text-base">Doublewrite Buffer</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                InnoDB writes batches of 16KB pages to contiguous sequential disk blocks first, ensuring a pristine backup exists before writing to tablespaces.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                The Self-Healing
              </span>
              <h3 className="font-bold text-white text-base">Checksum Restoration</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                On reboot, any page failing CRC32 checksum is automatically overwritten with the intact copy from the Doublewrite Buffer, enabling Redo Log replay.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Two-Step Flush Diagram */}
        <section id="dblwr-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Two-Step Page Flushing Sequence
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How contiguous sequential doublewrite buffering shields random tablespace writes from corruption.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 7.1: Doublewrite Buffer Two-Step Write Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Crash Resilience Sequence</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrDblwrCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Stage 1: Buffer Pool RAM */}
                <rect x="20" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="145" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. BUFFER POOL (RAM)
                </text>
                <line x1="20" y1="85" x2="270" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="220" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">Dirty Page A (16KB)</text>
                <text x="45" y="142" fill="#94a3b8" fontSize="9">Modified customer balance in memory</text>

                <rect x="35" y="165" width="220" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="187" fill="#a7f3d0" fontSize="10" fontWeight="bold">Dirty Page B (16KB)</text>
                <text x="45" y="202" fill="#94a3b8" fontSize="9">Modified order status in memory</text>

                <rect x="35" y="225" width="220" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="245" fill="#e2e8f0" fontSize="10" fontWeight="bold">Page Cleaner Thread Batch</text>
                <text x="45" y="258" fill="#94a3b8" fontSize="9">Gathers batch of 16KB dirty pages</text>

                {/* Stage 2: Doublewrite Buffer */}
                <rect x="330" y="40" width="290" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. DOUBLEWRITE BUFFER (#ib_*.dblwr)
                </text>
                <line x1="330" y1="85" x2="620" y2="85" stroke="#334155" />

                <rect x="345" y="105" width="260" height="70" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="355" y="127" fill="#bae6fd" fontSize="10" fontWeight="bold">STEP 1: Contiguous Sequential Write</text>
                <text x="355" y="145" fill="#94a3b8" fontSize="9">Pages written to contiguous disk extents</text>
                <text x="355" y="162" fill="#34d399" fontSize="9">fsync() called immediately (~3-5% cost)</text>

                <rect x="345" y="195" width="260" height="70" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="355" y="217" fill="#a7f3d0" fontSize="10" fontWeight="bold">🛡️ Crash Insurance Copy Secured!</text>
                <text x="355" y="235" fill="#94a3b8" fontSize="9">Pristine 16KB pages safe on disk</text>
                <text x="355" y="252" fill="#bae6fd" fontSize="9">Ready for tablespace distribution</text>

                {/* Stage 3: Random Tablespace Files */}
                <rect x="680" y="40" width="250" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="805" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. TABLESPACES (.ibd)
                </text>
                <line x1="680" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="695" y="105" width="220" height="50" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="705" y="127" fill="#fde68a" fontSize="10" fontWeight="bold">STEP 2: Random .ibd Write</text>
                <text x="705" y="142" fill="#94a3b8" fontSize="9">Flushed to accounts.ibd</text>

                <rect x="695" y="165" width="220" height="50" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="705" y="187" fill="#fde68a" fontSize="10" fontWeight="bold">Flushed to orders.ibd</text>

                <rect x="695" y="225" width="220" height="55" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="705" y="245" fill="#34d399" fontSize="9" fontWeight="bold">If power cuts here → Torn Page!</text>
                <text x="705" y="262" fill="#bae6fd" fontSize="9">Restored from Doublewrite on boot! ✅</text>

                {/* Connecting Arrows */}
                <path d="M 270 140 L 330 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrDblwrCyan)" />
                <path d="M 620 140 L 680 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrDblwrCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Doublewrite Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Doublewrite Buffer Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a doublewrite phase to inspect operational commands, checksum diagnostics, and self-healing algorithms.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(dblwrPhases).map((key) => {
              const ph = dblwrPhases[key];
              const isSelected = selectedDblwrPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDblwrPhase(key)}
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
                {dblwrPhases[selectedDblwrPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  dblwrPhases[selectedDblwrPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  dblwrPhases[selectedDblwrPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  dblwrPhases[selectedDblwrPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  dblwrPhases[selectedDblwrPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {dblwrPhases[selectedDblwrPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Doublewrite Diagnostic &amp; Tuning Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {dblwrPhases[selectedDblwrPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Storage Architecture Characteristics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Architecture Property</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Crash Protection Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {dblwrPhases[selectedDblwrPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.value}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.role}</td>
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
                {dblwrPhases[selectedDblwrPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Doublewrite Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Automatic torn page healing after power cuts in West Bengal database infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Torn Page Healing */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Automatic Healing of 8 Torn Pages After Power Loss in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  8 Torn Pages Restored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a sudden thunderstorm in Barrackpore, a database host suffered a hard power loss while flushing 8 dirty admission ledger pages. Upon reboot, CRC32 checksum validation flagged 8 torn pages in `admissions.ibd`. InnoDB automatically restored all 8 intact 16KB pages from `#ib_16384_0.dblwr` in 0.4 seconds, completing full Redo Log recovery with zero data loss.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Doublewrite Batching */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – High-Efficiency Doublewrite Batching in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  48 Pages Per Write
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, monitoring `Innodb_dblwr_pages_written / Innodb_dblwr_writes` showed an average batching ratio of 48.2 pages per write on a high-throughput NVMe SSD array. This high sequential batching ensured that the doublewrite buffer added less than 2.8% total I/O latency while providing 100% crash durability.
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
              Avoid dangerous doublewrite configuration mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Disabling Doublewrite on Standard Disks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting `innodb_doublewrite = OFF` on standard ext4, XFS, or NTFS filesystems to gain minor write speed leaves the database vulnerable to permanent page corruption on power cuts.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep innodb_doublewrite = ON enabled at all times.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Disabling Checksums (innodb_checksum_algorithm = NONE)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Disabling page checksums blinds InnoDB to silent hardware bit-rot and torn pages, allowing corrupted garbage data to spread silently across B+ tree nodes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use hardware-accelerated CRC32 checksums (crc32).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor Doublewrite Batching
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calculate `Innodb_dblwr_pages_written / Innodb_dblwr_writes`. Ratios &gt; 30 indicate excellent batching and minimal I/O overhead.
              </p>
              <div className="text-xs text-slate-400">
                Verifies efficient sequential page grouping.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Isolate Doublewrite on Dedicated Drives
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                On ultra-high write OLTP servers, use `innodb_doublewrite_dir = '/mnt/nvme_dblwr'` to isolate sequential doublewrite traffic from tablespaces.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates I/O interference on tablespace SSD arrays.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Doublewrite Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Doublewrite Audit Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key crash protection parameters to verify across production database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Crash Protection Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Doublewrite Active</strong> = Ensure `innodb_doublewrite = ON` is enabled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">CRC32 Checksum</strong> = Confirm `innodb_checksum_algorithm = crc32`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Batching Efficiency</strong> = Monitor `Innodb_dblwr_pages_written` ratio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Dedicated Files</strong> = Verify `#ib_16384_*.dblwr` files exist in data directory.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the Doublewrite Buffer in Error Logs...”</span>
                  If a power cut occurs, look for the line `Restoring page from doublewrite buffer` in the MySQL error log. That single message proves the doublewrite buffer just saved your company from hours of downtime and database recovery!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ZFS and Atomic Writes...”</span>
                  The only scenario where disabling doublewrite is safe is on ZFS or specialized enterprise storage with battery-backed atomic 16KB writes. Everywhere else, doublewrite is mandatory!
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
              Comprehensive reference questions covering the InnoDB Doublewrite Buffer.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Doublewrite Buffer FAQs"
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
            title="InnoDB Doublewrite Buffer: Preventing Torn Pages on Disk Failure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Many database practitioners know about Write-Ahead Redo Logging, but few understand why the Redo Log alone cannot save a database from sudden power loss. Because InnoDB redo logs record physiological byte deltas, they assume the underlying 16KB base page on disk is physically intact. If an operating system crashes midway through writing a 16KB page, only the Doublewrite Buffer can restore the intact page copy so the Redo Log can do its job. It is the silent guardian of enterprise MySQL reliability—never disable it!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
