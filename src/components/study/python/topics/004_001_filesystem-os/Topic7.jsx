import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import sorterCode from "./topic7_files/file_sorter_and_extension_classifier.py?raw";
import dedupCode from "./topic7_files/duplicate_file_detector_and_hasher.py?raw";
import backupCode from "./topic7_files/incremental_snapshot_backup_engine.py?raw";
import capstoneCode from "./topic7_files/institutional_multicampus_digital_organizer_and_backup_system.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Automated directory backup and file organizer scripts
 * Module: 004_001_filesystem-os (FINAL CAPSTONE TOPIC)
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("sorterPipeline");

  // Interactive Laboratory State
  const [campus, setCampus] = useState("barrackpore");
  const [pipelineStage, setPipelineStage] = useState("END_TO_END"); // CLASSIFY | DEDUP | BACKUP | END_TO_END
  const [enableDeduplication, setEnableDeduplication] = useState(true);

  let generatedPythonCode = "";
  let terminalTelemetry = "";

  if (pipelineStage === "CLASSIFY") {
    generatedPythonCode = `# Extension-based categorization and atomic relocation:
CATEGORY_MAP = {
    "Documents": {".pdf", ".docx", ".txt"},
    "Spreadsheets": {".csv", ".xlsx", ".json"},
    "Media": {".png", ".jpg", ".jpeg"},
    "Archives": {".zip", ".gz"}
}
for file in incoming_dir.iterdir():
    if file.is_file():
        category = match_category(file.suffix.lower())
        dest_dir = vault_root / category
        dest_dir.mkdir(exist_ok=True)
        shutil.move(str(file), str(dest_dir / resolve_collision(file.name)))`;

    terminalTelemetry = `[ORGANIZER_PIPELINE] CATEGORIZING INCOMING REPOSITORY:
* Target Campus  : ${campus.toUpperCase()} Ingestion Node
* Total Ingested : 5 loose files
* Categorization Manifest:
  -> Documents/     : sourav_admission.pdf, sourav_admission_copy.pdf
  -> Spreadsheets/  : admissions_2026.csv
  -> Media/         : photo_101.png
  -> Archives/      : campus_archive.zip
[STATUS] All loose files sorted and organized.`;
  } else if (pipelineStage === "DEDUP") {
    generatedPythonCode = `# Two-stage duplicate detection (Size grouping -> SHA-256):
size_map = defaultdict(list)
for f in vault_root.rglob("*"):
    if f.is_file():
        size_map[f.stat().st_size].append(f)

for size, paths in size_map.items():
    if len(paths) > 1 and size > 0:
        hash_map = defaultdict(list)
        for p in paths:
            h = compute_sha256_chunked(p) # 64KB chunks
            hash_map[h].append(p)
        # Identify duplicates where len(hash_map[h]) > 1`;

    terminalTelemetry = `[DEDUPLICATION_ENGINE] TWO-STAGE SHA-256 SCAN:
* Stage 1 (Fast Size Filter) : Grouped 5 files by byte size.
* Stage 2 (SHA-256 Hashing)  : Found 1 collision cluster (3,850 B).
* Duplicate Files Detected:
  -> Primary Original : Documents/sourav_admission.pdf (Kept)
  -> Redundant Copy   : Documents/sourav_admission_copy.pdf (Duplicate)
* Redundant Storage Wasted: 3,850 Bytes
[STATUS] Deduplication report generated.`;
  } else if (pipelineStage === "BACKUP") {
    generatedPythonCode = `# Incremental delta backup synchronization:
for src_f in vault_root.rglob("*"):
    if src_f.is_file():
        rel = src_f.relative_to(vault_root)
        dst_f = backup_vault / rel
        if not dst_f.exists() or src_f.stat().st_mtime > dst_f.stat().st_mtime:
            dst_f.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(str(src_f), str(dst_f)) # Preserves st_mtime!`;

    terminalTelemetry = `[INCREMENTAL_BACKUP] DELTA SYNCHRONIZATION:
* Target Backup Vault: cloud_backup_${campus}/
* Delta Evaluation   : Comparing mtime and byte sizes...
* Added Files (New)  : 4 files synced
* Updated (Modified) : 0 files
* Unchanged (Skip)   : 0 files
* Bandwidth Saved    : 0% on initial pass (100% on subsequent passes)
[STATUS] Cloud backup synchronized successfully.`;
  } else {
    // END_TO_END
    generatedPythonCode = `# Complete Institutional Digital Vault Capstone Pipeline:
engine = InstitutionalDigitalVaultEngine(workspace_root)
# 1. Categorize
org_report = engine.organize_incoming_files()
# 2. Deduplicate
dedup_report = engine.scan_for_duplicates()
# 3. Incremental Backup
backup_report = engine.sync_to_backup_vault()
print("Pipeline Finished Successfully.")`;

    terminalTelemetry = `[CAPSTONE_PIPELINE] EXECUTING FULL AUTONOMOUS SUITE:
* Campus Location     : ${campus.toUpperCase()} Central Hub
* Step 1: Categorize  : 5 files categorized into Documents, Media, Data
* Step 2: Deduplicate : 1 SHA-256 duplicate identified and quarantined
* Step 3: Incremental : 4 verified unique files mirrored to Cloud Vault
* Integrity Check     : All SHA-256 digests verified in destination vault.
[PASSED] Autonomous digital organizer & backup cycle complete.`;
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
            Topic 7 (Capstone)
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          File Organizer &amp; <span className="text-teal-400">Incremental Backup Engine</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          The ultimate capstone module project in Python filesystem engineering: automated directory sorting with extension classification, deterministic collision resolution, high-performance two-stage duplicate detection (<code className="text-teal-300 font-mono">hashlib.sha256</code> streaming), and incremental delta backup synchronization with <code className="text-cyan-300 font-mono">shutil.copy2()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📁 Automated Sorter
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔐 SHA-256 Deduplication
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Delta Incremental Sync
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏆 Capstone Architecture
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CAPSTONE SYSTEM ARCHITECTURE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Complete Institutional Digital Asset Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Combining all filesystem, OS, cryptographic, and automation concepts into an integrated production asset vault pipeline:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Extension Classification</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">pathlib.Path.suffix, shutil.move</code>
                <p className="text-[11px] text-slate-300">
                  Maps messy loose files into categorized folders (<code className="text-teal-300 font-mono">Documents</code>, <code className="text-teal-300 font-mono">Data</code>, <code className="text-teal-300 font-mono">Media</code>) with collision handling.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Two-Stage SHA-256</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">size grouping -&gt; 64KB chunk hash</code>
                <p className="text-[11px] text-slate-300">
                  Groups by byte size first, hashing only files with size collisions. Avoids RAM bloat and skips 90% unnecessary hashes.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Delta Sync Backup</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">shutil.copy2(), mtime comparison</code>
                <p className="text-[11px] text-slate-300">
                  Copies only new and modified files, preserving timestamps and saving 95% bandwidth on subsequent sync cycles.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Timestamp Invariant: Why `shutil.copy2()` is Mandatory
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Using <code className="text-rose-400 font-mono">shutil.copy()</code> sets the destination file's modification timestamp (<code className="text-rose-400 font-mono">st_mtime</code>) to the current time, destroying modification history and causing subsequent incremental backup runs to erroneously re-copy all unchanged files! Always use <code className="text-teal-300 font-mono">shutil.copy2()</code> to preserve original metadata.
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
                2. Visualizing Classification, Two-Stage Hashing &amp; Delta Sync
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("sorterPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sorterPipeline"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Extension Sorter
              </button>
              <button
                onClick={() => setActiveInteractiveTab("twoStageHashing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "twoStageHashing"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Two-Stage SHA-256
              </button>
              <button
                onClick={() => setActiveInteractiveTab("deltaSync")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "deltaSync"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Delta Sync Backup
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining category mapping algorithms, size-filtered hash optimization, and timestamp delta synchronization:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "sorterPipeline" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">AUTOMATED INGESTION DIRECTORY CLASSIFICATION &amp; SORTING</text>

                {/* Left: Loose Incoming Files */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">Incoming Loose Box</text>
                  
                  <text x="15" y="60" fill="#38bdf8" fontSize="8 font-mono">1. stu_101.pdf</text>
                  <text x="15" y="80" fill="#34d399" fontSize="8 font-mono">2. roster.csv</text>
                  <text x="15" y="100" fill="#c084fc" fontSize="8 font-mono">3. campus.jpg</text>
                  <text x="15" y="120" fill="#fbbf24" fontSize="8 font-mono">4. backup.zip</text>

                  <rect x="15" y="145" width="210" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="170" fill="#34d399" fontSize="9 font-bold">Collision Safety:</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">Resolves 'doc (1).pdf' conflicts.</text>

                  {/* Arrow 1 */}
                  <text x="250" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Classification Engine */}
                  <rect x="280" y="0" width="260" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">Extension Classifier Engine</text>

                  <text x="295" y="60" fill="#38bdf8" fontSize="8 font-mono">CATEGORY_MAP = {'{'}</text>
                  <text x="310" y="80" fill="#cbd5e1" fontSize="8 font-mono">"Documents": {`{'.pdf', '.docx'}`},</text>
                  <text x="310" y="100" fill="#cbd5e1" fontSize="8 font-mono">"Data": {`{'.csv', '.json'}`},</text>
                  <text x="310" y="120" fill="#cbd5e1" fontSize="8 font-mono">"Media": {`{'.png', '.jpg'}`}</text>
                  <text x="295" y="140" fill="#38bdf8" fontSize="8 font-mono">{'}'}</text>

                  <rect x="295" y="155" width="230" height="60" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="175" fill="#38bdf8" fontSize="8 font-bold font-mono">shutil.move(src, target_cat)</text>
                  <text x="305" y="195" fill="#cbd5e1" fontSize="8">Atomic cross-directory move</text>

                  {/* Arrow 2 */}
                  <text x="550" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Right: Categorized Structure */}
                  <rect x="580" y="0" width="240" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="595" y="30" fill="#c4b5fd" fontSize="11 font-bold">Organized Vault Folders</text>

                  <text x="595" y="60" fill="#38bdf8" fontSize="8 font-mono">/Documents/stu_101.pdf</text>
                  <text x="595" y="80" fill="#34d399" fontSize="8 font-mono">/Data/roster.csv</text>
                  <text x="595" y="100" fill="#c084fc" fontSize="8 font-mono">/Media/campus.jpg</text>
                  <text x="595" y="120" fill="#fbbf24" fontSize="8 font-mono">/Archives/backup.zip</text>

                  <rect x="595" y="145" width="210" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="605" y="170" fill="#c4b5fd" fontSize="9 font-bold">Clean Vault:</text>
                  <text x="605" y="190" fill="#cbd5e1" fontSize="8">100% structured directories.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "twoStageHashing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">TWO-STAGE SHA-256 DUPLICATE DETECTION ARCHITECTURE</text>

                {/* Stage 1 vs Stage 2 */}
                <g transform="translate(30, 50)">
                  {/* Stage 1 */}
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">Stage 1: Fast Size Grouping [O(N) Stats]</text>
                  
                  <text x="20" y="65" fill="#38bdf8" fontSize="8 font-mono">1. Query `os.path.getsize(p)` for all files</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">2. Map into `size_map[size] -&gt; [paths]`</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">3. Unique size files (len == 1) SKIPPED!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="155" fill="#38bdf8" fontSize="9 font-bold">Massive Performance Gain:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Eliminates 90% of costly disk read I/O operations upfront.</text>
                </g>

                {/* Stage 2 */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Stage 2: 64KB Chunk SHA-256 Hashing</text>

                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">1. Stream 64KB chunks: `hasher.update(chunk)`</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">2. Map matching digests: `hash_map[sha256]`</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">3. Exact byte collisions confirmed with 100% accuracy!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Constant Memory Footprint:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Operates in &lt;10 MB RAM even for multi-gigabyte ISO files.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DELTA INCREMENTAL SNAPSHOT SYNCHRONIZATION</text>

                {/* Delta Evaluation Flow */}
                <g transform="translate(30, 50)">
                  {/* Source */}
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">Source Working Vault</text>
                  <text x="15" y="60" fill="#38bdf8" fontSize="8 font-mono">file1.csv (Modified: 10:30)</text>
                  <text x="15" y="80" fill="#34d399" fontSize="8 font-mono">file2.pdf (Unchanged: 08:00)</text>
                  <text x="15" y="100" fill="#fbbf24" fontSize="8 font-mono">file3.json (NEW FILE)</text>

                  <rect x="15" y="130" width="210" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Active Working Tree:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Contains current institutional data.</text>

                  {/* Arrow 1 */}
                  <text x="250" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Sync Logic */}
                  <rect x="280" y="0" width="260" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">Delta Sync Evaluator</text>

                  <text x="295" y="60" fill="#38bdf8" fontSize="8 font-mono">if not dst.exists():</text>
                  <text x="310" y="75" fill="#34d399" fontSize="8 font-mono">COPY (NEW FILE)</text>
                  <text x="295" y="95" fill="#38bdf8" fontSize="8 font-mono">elif src.mtime &gt; dst.mtime:</text>
                  <text x="310" y="110" fill="#fbbf24" fontSize="8 font-mono">COPY (UPDATED DELTA)</text>
                  <text x="295" y="130" fill="#38bdf8" fontSize="8 font-mono">else: SKIP (UNCHANGED)</text>

                  <rect x="295" y="150" width="230" height="65" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="175" fill="#38bdf8" fontSize="8 font-mono font-bold">shutil.copy2(src, dst)</text>
                  <text x="305" y="195" fill="#cbd5e1" fontSize="8">Preserves timestamps!</text>

                  {/* Arrow 2 */}
                  <text x="550" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Destination */}
                  <rect x="580" y="0" width="240" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="595" y="30" fill="#c4b5fd" fontSize="11 font-bold">Cloud Backup Vault</text>

                  <text x="595" y="60" fill="#38bdf8" fontSize="8 font-mono">file1.csv (UPDATED)</text>
                  <text x="595" y="80" fill="#34d399" fontSize="8 font-mono">file2.pdf (SKIPPED)</text>
                  <text x="595" y="100" fill="#fbbf24" fontSize="8 font-mono">file3.json (COPIED)</text>

                  <rect x="595" y="130" width="210" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="605" y="155" fill="#c4b5fd" fontSize="9 font-bold">Disaster Recovery:</text>
                  <text x="605" y="175" fill="#cbd5e1" fontSize="8">Exact mirror at 5% bandwidth cost.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CAPSTONE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Digital Vault Organizer &amp; Backup Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select campus ingestion nodes, trigger individual pipeline stages or execute the full autonomous capstone suite, and inspect live vault telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Pipeline Stage Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Execution Pipeline Stage:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "END_TO_END", label: "1. Full Capstone Suite" },
                    { id: "CLASSIFY", label: "2. Extension Sorter" },
                    { id: "DEDUP", label: "3. SHA-256 Deduplicate" },
                    { id: "BACKUP", label: "4. Incremental Sync" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPipelineStage(s.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        pipelineStage === s.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Node */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Campus Digital Vault Node:
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
                      {c} Vault
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={enableDeduplication}
                    onChange={(e) => setEnableDeduplication(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable Two-Stage Cryptographic Deduplication (`SHA-256`)</span>
                </label>
              </div>

              {/* Module Completion Badge */}
              <div className="p-3 bg-teal-950/40 rounded-lg border border-teal-800/80 text-xs font-mono space-y-1">
                <div className="text-teal-400 text-[10px] uppercase font-bold">Module 004_001 Capstone Integration:</div>
                <div className="text-slate-300 text-[11px]">
                  Unifies <code className="text-teal-300">os</code>, <code className="text-cyan-300">pathlib</code>, <code className="text-purple-300">shutil</code>, <code className="text-amber-300">argparse</code>, and <code className="text-emerald-400">hashlib</code> into a single enterprise CLI tool.
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Capstone Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Digital Vault Telemetry:</span>
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
        {/* SECTION 4: MASTER CAPSTONE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Capstone Engineering Pattern Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Engineering Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Standard Library Modules</th>
                  <th className="py-3.5 px-4 font-bold">Algorithmic Complexity</th>
                  <th className="py-3.5 px-4 font-bold">Production Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Extension Mapping Organizer</td>
                  <td className="py-3 px-4 text-slate-200">`pathlib.Path`, `shutil`</td>
                  <td className="py-3 px-4 text-emerald-400">`O(N)` linear file scan</td>
                  <td className="py-3 px-4">Automated incoming digital asset sorting</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Two-Stage SHA-256 Deduplication</td>
                  <td className="py-3 px-4 text-slate-200">`hashlib`, `collections`</td>
                  <td className="py-3 px-4 text-cyan-300">`O(N)` stats + `O(M)` hash</td>
                  <td className="py-3 px-4">Cryptographic duplicate discovery without RAM bloat</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Incremental Delta Snapshot</td>
                  <td className="py-3 px-4 text-slate-200">`shutil.copy2()`, `os.stat`</td>
                  <td className="py-3 px-4 text-purple-300">`O(D)` delta sync only</td>
                  <td className="py-3 px-4">Disaster recovery mirroring with timestamp preservation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Multi-Command CLI Subparsers</td>
                  <td className="py-3 px-4 text-slate-200">`argparse`</td>
                  <td className="py-3 px-4 text-emerald-400">Deterministic routing</td>
                  <td className="py-3 px-4">Modular CLI interface for devops and cron workers</td>
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
            Explore 4 production-grade Python scripts demonstrating automated directory sorting, two-stage SHA-256 deduplication, incremental snapshot synchronization, and institutional capstone vault suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "file_sorter_and_extension_classifier.py",
                code: sorterCode,
                description: "Automated directory sorting, extension categorization, and collision resolution.",
              },
              {
                filename: "duplicate_file_detector_and_hasher.py",
                code: dedupCode,
                description: "Two-stage size and SHA-256 hashing duplicate detection.",
              },
              {
                filename: "incremental_snapshot_backup_engine.py",
                code: backupCode,
                description: "Delta synchronization, timestamp comparison, and shutil.copy2 snapshotting.",
              },
              {
                filename: "institutional_multicampus_digital_organizer_and_backup_system.py",
                code: capstoneCode,
                description: "Full capstone organizer, SHA-256 deduplication, and incremental backup.",
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
                <span>❌</span> Trap 1: Filename Collision Overwrites
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Blindly moving <code className="text-rose-300 font-mono">shutil.move('invoice.pdf', dest)</code> overwrites existing files if a file with the same name already exists in the destination category folder.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Resolve collisions with <code className="text-emerald-300">name (1).ext</code> suffixing.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Hashing All Files Indiscriminately
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Computing SHA-256 on 10,000 unique files reads hundreds of gigabytes from disk unnecessarily.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use Stage 1 file size grouping first!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Memory Exhaustion in File Hashing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">hashlib.sha256(open(p, 'rb').read())</code> crashes on multi-GB video or ISO files with <code className="text-slate-300">MemoryError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Stream in 64KB chunks (<code className="text-emerald-300">iter(lambda: f.read(65536), b'')</code>).
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Using `shutil.copy` in Incremental Sync
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Regular <code className="text-cyan-300 font-mono">copy()</code> resets <code className="text-slate-300 font-mono">st_mtime</code> to current time, breaking timestamp comparisons on all subsequent sync passes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">shutil.copy2()</code>.
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
            Comprehensive question-and-answer repository covering file organizers, collision resolution, two-stage SHA-256 deduplication, delta syncs, and capstone architecture:
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
            Download or print the complete reference sheet with file organizer recipes, duplicate detection patterns, and delta backup templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_file_organizer_backup_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
