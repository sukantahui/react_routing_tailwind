import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import copyFundamentalsCode from "./topic3_files/shutil_copying_and_moving_fundamentals.py?raw";
import deletionDiskCode from "./topic3_files/shutil_recursive_deletion_and_disk_usage.py?raw";
import archivingCode from "./topic3_files/shutil_archiving_and_unzipping.py?raw";
import backupEngineCode from "./topic3_files/institutional_automated_backup_and_archiving_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: shutil module: copying, moving, archiving, and recursive deletions
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("copyHierarchy");

  // Interactive Laboratory State
  const [campus, setCampus] = useState("barrackpore");
  const [archiveFormat, setArchiveFormat] = useState("zip"); // zip | gztar | bztar
  const [ignorePycache, setIgnorePycache] = useState(true);
  const [ignoreTemp, setIgnoreTemp] = useState(true);
  const [useCopy2, setUseCopy2] = useState(true);
  const [activeAction, setActiveAction] = useState("EXECUTE_BACKUP"); // EXECUTE_BACKUP | MAKE_ARCHIVE | DISK_USAGE | ROTATE

  let generatedPythonCode = "";
  let terminalTelemetry = "";

  const ignoredList = [];
  if (ignorePycache) ignoredList.push('"__pycache__"');
  if (ignoreTemp) ignoredList.push('"*.tmp"', '"*.log"');
  const ignoreArgs = ignoredList.length > 0 ? `shutil.ignore_patterns(${ignoredList.join(", ")})` : "None";

  if (activeAction === "EXECUTE_BACKUP") {
    generatedPythonCode = `# Nightly automated backup snapshot:
src_dir = "vault/${campus}_live"
dst_dir = "snapshots/${campus}_20260824_2355"

shutil.copytree(
    src_dir,
    dst_dir,
    dirs_exist_ok=True,
    copy_function=${useCopy2 ? "shutil.copy2" : "shutil.copy"},
    ignore=${ignoreArgs}
)`;

    terminalTelemetry = `[BACKUP_ENGINE] CLONING SNAPSHOT DIRECTORY:
* Campus Hub       : ${campus.toUpperCase()}
* Source Path      : vault/${campus}_live
* Snapshot Target  : snapshots/${campus}_20260824_2355
* Copy Function    : ${useCopy2 ? "shutil.copy2 (Preserving Mod/Access Timestamps)" : "shutil.copy (Standard)"}
* Ignored Patterns : [${ignoredList.join(", ")}]
[SUCCESS] Snapshot cloned without temp files.`;
  } else if (activeAction === "MAKE_ARCHIVE") {
    const ext = archiveFormat === "zip" ? ".zip" : archiveFormat === "gztar" ? ".tar.gz" : ".tar.bz2";
    generatedPythonCode = `# Compress snapshot into production distribution archive:
archive_path = shutil.make_archive(
    base_name="archives/backup_${campus}_2026",
    format="${archiveFormat}",
    root_dir="snapshots/${campus}_20260824_2355"
)`;

    terminalTelemetry = `[BACKUP_ENGINE] PACKAGING COMPRESSED ARCHIVE:
* Base Name    : archives/backup_${campus}_2026
* Compression  : ${archiveFormat.toUpperCase()}
* Output File  : archives/backup_${campus}_2026${ext}
* Archive Size : 48,290 bytes
[SUCCESS] Archive verified and ready for cloud upload.`;
  } else if (activeAction === "DISK_USAGE") {
    generatedPythonCode = `# Query host disk storage capacity:
total, used, free = shutil.disk_usage(".")
free_gb = free / (1024 ** 3)
print(f"Drive Available: {free_gb:.2f} GB")`;

    terminalTelemetry = `[BACKUP_ENGINE] DISK QUOTA INSPECTION:
* Drive Total : 512.00 GB
* Drive Used  : 238.40 GB (46.6%)
* Drive Free  : 273.60 GB [HEALTHY]
[STATUS] Sufficient quota available for nightly archival.`;
  } else {
    // ROTATE
    generatedPythonCode = `# Safe recursive purging of stale snapshots:
def unlock_readonly(func, path, _):
    os.chmod(path, stat.S_IWRITE)
    func(path)

shutil.rmtree("snapshots/${campus}_stale", onerror=unlock_readonly)`;

    terminalTelemetry = `[BACKUP_ENGINE] ROTATING OBSOLETE SNAPSHOTS:
* Purging Directory : snapshots/${campus}_stale
* Error Callback    : unlock_readonly (stat.S_IWRITE)
* Readonly Handling : Bypassed Windows Permission Locks
[SUCCESS] Stale snapshot reclaimed successfully.`;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 4 • Module 004_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          High-Level Shell Utilities: <span className="text-teal-400">shutil Module</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's enterprise filesystem automation toolkit: copy hierarchy (<code className="text-teal-300 font-mono">copyfile</code> vs <code className="text-teal-300 font-mono">copy</code> vs <code className="text-teal-300 font-mono">copy2</code>), timestamp preservation, recursive directory tree cloning (<code className="text-cyan-300 font-mono">copytree</code>), pattern-based exclusions (<code className="text-purple-300 font-mono">ignore_patterns</code>), resilient recursive deletions (<code className="text-rose-400 font-mono">rmtree</code> with read-only error callbacks), disk quota telemetry (<code className="text-amber-300 font-mono">disk_usage</code>), and archive packaging (<code className="text-emerald-400 font-mono">make_archive</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📋 `shutil.copy2` Timestamps
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌲 `copytree` &amp; `ignore_patterns`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💽 `shutil.disk_usage()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 `make_archive` (.zip/.tar.gz)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: SHUTIL FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧰</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The High-Level Shell Utilities Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              While the <code className="text-teal-300 font-mono">os</code> module handles low-level system calls, <code className="text-teal-300 font-mono">shutil</code> delivers production-grade compound operations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Copying &amp; Moving</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">copy2(), move(), copytree()</code>
                <p className="text-[11px] text-slate-300">
                  Preserves modification timestamps and moves files across drive boundaries automatically.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Tree Deletion &amp; Quota</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">rmtree(), disk_usage()</code>
                <p className="text-[11px] text-slate-300">
                  Recursive folder teardown with read-only unlock handlers and disk space checks.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Archival &amp; Compression</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">make_archive(), unpack()</code>
                <p className="text-[11px] text-slate-300">
                  Creates self-contained <code className="text-purple-300">.zip</code>, <code className="text-purple-300">.tar.gz</code>, and <code className="text-purple-300">.tar.bz2</code> packages in a single call.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Backup Invariant: Why `copy2()` is Mandatory
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Standard <code className="text-rose-400 font-mono">shutil.copy()</code> discards file modification timestamps, stamping the backup with the current time. In enterprise pipelines, ALWAYS use <code className="text-teal-300 font-mono">shutil.copy2()</code> to preserve original timestamps for auditing and incremental backup integrity!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Copying Flavors, Tree Cloning &amp; Archival Packaging
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("copyHierarchy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "copyHierarchy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Copying Hierarchy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("copytreeIgnore")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "copytreeIgnore"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `copytree` + `ignore`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("archivePipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "archivePipeline"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `make_archive` Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining metadata preservation tiers, recursive pattern filtering, and automated compressed packaging:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "copyHierarchy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">SHUTIL FILE COPYING FLAVORS &amp; METADATA TIERS</text>

                {/* 3 Copying Tiers */}
                <g transform="translate(30, 50)">
                  {/* Tier 1: copyfile */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. `shutil.copyfile(s, d)`</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Scope: Bytes Only</text>
                  
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">Copies raw contents.</text>
                  <text x="15" y="95" fill="#fca5a5" fontSize="8">❌ Discards permissions</text>
                  <text x="15" y="110" fill="#fca5a5" fontSize="8">❌ Discards timestamps</text>
                  <text x="15" y="125" fill="#fca5a5" fontSize="8">❌ Destination must be file</text>

                  <rect x="15" y="145" width="220" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="170" fill="#34d399" fontSize="9 font-bold">Lightweight Raw Copy:</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">Fastest raw data transfer.</text>

                  {/* Tier 2: copy */}
                  <rect x="280" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `shutil.copy(s, d)`</text>
                  <text x="295" y="55" fill="#38bdf8" fontSize="8 font-mono">Scope: Bytes + Permissions</text>

                  <text x="295" y="80" fill="#cbd5e1" fontSize="8">Copies contents + mode bits.</text>
                  <text x="295" y="95" fill="#34d399" fontSize="8">✅ Preserves executable bit</text>
                  <text x="295" y="110" fill="#fca5a5" fontSize="8">❌ Discards timestamps</text>
                  <text x="295" y="125" fill="#34d399" fontSize="8">✅ Destination can be folder</text>

                  <rect x="295" y="145" width="220" height="75" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="170" fill="#38bdf8" fontSize="9 font-bold">Shell cp Equivalent:</text>
                  <text x="305" y="190" fill="#cbd5e1" fontSize="8">Copies to target directory.</text>

                  {/* Tier 3: copy2 */}
                  <rect x="560" y="0" width="260" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="575" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. `shutil.copy2(s, d)` [PRO]</text>
                  <text x="575" y="55" fill="#c084fc" fontSize="8 font-mono">Scope: Complete Metadata</text>

                  <text x="575" y="80" fill="#cbd5e1" fontSize="8">Copies contents + full stat.</text>
                  <text x="575" y="95" fill="#34d399" fontSize="8">✅ Preserves permissions</text>
                  <text x="575" y="110" fill="#34d399" fontSize="8 font-bold">✅ PRESERVES TIMESTAMPS</text>
                  <text x="575" y="125" fill="#34d399" fontSize="8">✅ Destination can be folder</text>

                  <rect x="575" y="145" width="230" height="75" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="585" y="170" fill="#c4b5fd" fontSize="9 font-bold">Enterprise Standard:</text>
                  <text x="585" y="190" fill="#cbd5e1" fontSize="8">Mandatory for all backup pipelines.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "copytreeIgnore" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">RECURSIVE `copytree()` WITH PATTERN EXCLUSION FILTER</text>

                {/* Left: Source Vault */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">Source Vault Directory</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">students.csv (Keep)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">kyc_report.pdf (Keep)</text>
                  <text x="20" y="105" fill="#fca5a5" fontSize="8 font-mono">__pycache__/module.pyc (Skip)</text>
                  <text x="20" y="125" fill="#fca5a5" fontSize="8 font-mono">session.tmp (Skip)</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="175" fill="#38bdf8" fontSize="9 font-bold">`shutil.ignore_patterns("*.tmp", "__pycache__")`</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">Filters out cache files dynamically during recursion.</text>
                </g>

                {/* Right: Cloned Destination */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Clean Cloned Backup Tree</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">✅ students.csv (Preserved with copy2)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">✅ kyc_report.pdf (Preserved with copy2)</text>
                  <text x="20" y="105" fill="#a7f3d0" fontSize="8 font-mono font-bold">Zero Junk Bytecode or Cache Files!</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="175" fill="#34d399" fontSize="9 font-bold">`dirs_exist_ok=True`:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">Enables safe idempotent merging into existing snapshots.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">COMPRESSED ARCHIVING &amp; EXTRACTION WORKFLOW</text>

                {/* Left: make_archive */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">`shutil.make_archive()` Compression</text>
                  
                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">`make_archive('backup', 'zip', root_dir='vault')`</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8">1. Compresses files using Deflate algorithm</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="8">2. Supports zip, tar, gztar, bztar, and xztar</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Clean Root Structuring:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">`root_dir` prevents archiving deep parent folders.</text>
                </g>

                {/* Right: unpack_archive */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`shutil.unpack_archive()` Decompression</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`unpack_archive('backup.zip', 'restored')`</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8">1. Automatically infers format from extension</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="8">2. Extracts all files into target destination</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">One-Liner Restore:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Eliminates manual zipfile / tarfile boilerplate.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Backup, Archiving &amp; Deletion Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure campus nodes, select compression algorithms, toggle ignore patterns, and observe live shutil automation telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Action Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Select Shutil Action Trigger:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "EXECUTE_BACKUP", label: "1. Clone Snapshot" },
                    { id: "MAKE_ARCHIVE", label: "2. make_archive()" },
                    { id: "DISK_USAGE", label: "3. disk_usage()" },
                    { id: "ROTATE", label: "4. rmtree Purge" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setActiveAction(a.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        activeAction === a.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Node */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Source Campus Hub:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["barrackpore", "kolkata"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCampus(c)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all capitalize",
                        campus === c
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {c} Hub
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive Format */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  3. Archive Compression Format:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["zip", "gztar", "bztar"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setArchiveFormat(fmt)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        archiveFormat === fmt
                          ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      .{fmt === "zip" ? "zip" : fmt === "gztar" ? "tar.gz" : "tar.bz2"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={useCopy2}
                    onChange={(e) => setUseCopy2(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Preserve Timestamps (`copy2`)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={ignorePycache}
                    onChange={(e) => setIgnorePycache(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Ignore `__pycache__`</span>
                </label>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python shutil Automation Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Shutil Pipeline Telemetry:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {terminalTelemetry}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER SHUTIL MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `shutil` Function Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function Signature</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Metadata Scope</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`shutil.copy2(src, dst)`</td>
                  <td className="py-3 px-4 text-slate-200">File Copy</td>
                  <td className="py-3 px-4 text-emerald-400">Data + Perms + Timestamps</td>
                  <td className="py-3 px-4">Enterprise file backups preserving original timestamps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`shutil.copytree(s, d, dirs_exist_ok=True)`</td>
                  <td className="py-3 px-4 text-slate-200">Tree Clone</td>
                  <td className="py-3 px-4 text-cyan-300">Recursive Hierarchy</td>
                  <td className="py-3 px-4">Cloning entire folder trees with ignore patterns</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`shutil.make_archive(b, fmt, root_dir)`</td>
                  <td className="py-3 px-4 text-slate-200">Archiving</td>
                  <td className="py-3 px-4 text-purple-300">Compressed Archive</td>
                  <td className="py-3 px-4">Creating .zip / .tar.gz packages in one call</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`shutil.disk_usage(path)`</td>
                  <td className="py-3 px-4 text-slate-200">Storage Quota</td>
                  <td className="py-3 px-4 text-emerald-400">`(total, used, free)`</td>
                  <td className="py-3 px-4">Pre-flight disk space availability validation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating copying hierarchies, recursive tree cloning, archiving/unpacking, and institutional backup engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "shutil_copying_and_moving_fundamentals.py",
                code: copyFundamentalsCode,
                description: "copyfile, copy, copy2, move, and copytree with ignore_patterns.",
              },
              {
                filename: "shutil_recursive_deletion_and_disk_usage.py",
                code: deletionDiskCode,
                description: "rmtree with readonly handler and disk_usage.",
              },
              {
                filename: "shutil_archiving_and_unzipping.py",
                code: archivingCode,
                description: "get_archive_formats, make_archive, and unpack_archive.",
              },
              {
                filename: "institutional_automated_backup_and_archiving_engine.py",
                code: backupEngineCode,
                description: "Backup pipelines, copytree, make_archive, and snapshot rotation.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Using `copyfile` on Directory Target
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">shutil.copyfile('file.txt', 'target_folder/')</code> raises <code className="text-rose-300">IsADirectoryError</code> because <code className="text-slate-300">copyfile</code> requires a full filename.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">shutil.copy2()</code> when copying into a folder.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Read-Only Deletion Crash on Windows
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">shutil.rmtree()</code> on Windows crashes with <code className="text-slate-300">PermissionError: Access is denied</code> on read-only files.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Provide an <code className="text-emerald-300">onerror</code> callback to clear <code className="text-emerald-300">stat.S_IWRITE</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing `dirs_exist_ok=True` in `copytree`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">shutil.copytree()</code> without <code className="text-purple-300 font-mono">dirs_exist_ok=True</code> fails with <code className="text-slate-300">FileExistsError</code> if destination exists.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always pass <code className="text-emerald-300">dirs_exist_ok=True</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Deep Path Bloat in `make_archive`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Omitting <code className="text-cyan-300 font-mono">root_dir</code> archives the full nested directory hierarchy into the resulting zip file.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass <code className="text-emerald-300">root_dir=target_folder</code> to create clean relative archives.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering shutil module, copy2 timestamps, copytree, rmtree error handling, disk_usage, and make_archive:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with shutil copying hierarchy recipes, backup engine templates, and archiving patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_shutil_module_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
