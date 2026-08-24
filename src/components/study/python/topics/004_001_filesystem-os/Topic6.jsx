import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import logRotationCode from "./topic6_files/log_rotation_and_cleanup_maintenance.py?raw";
import sweeperCode from "./topic6_files/temp_file_sweeper_and_cache_purger.py?raw";
import monitorCode from "./topic6_files/system_resource_and_health_monitor.py?raw";
import daemonCode from "./topic6_files/institutional_automated_server_maintenance_daemon.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Building automated system maintenance scripts
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("logRotation");

  // Interactive Laboratory State
  const [campus, setCampus] = useState("barrackpore");
  const [retentionDays, setRetentionDays] = useState(7);
  const [isDryRun, setIsDryRun] = useState(false);
  const [actionType, setActionType] = useState("FULL_PASS"); // FULL_PASS | ROTATE_LOGS | PURGE_TEMP | HEALTH_CHECK

  let generatedPythonCode = "";
  let terminalTelemetry = "";

  if (actionType === "ROTATE_LOGS") {
    generatedPythonCode = `# Size-based log rotation and gzip compression:
for log_file in os.listdir("logs/${campus}"):
    if log_file.endswith(".log") and os.path.getsize(f"logs/{campus}/{log_file}") > 500*1024:
        gz_name = f"{log_file}.{datetime.now().strftime('%Y%m%d')}.gz"
        ${
          isDryRun
            ? "print(f'[DRY-RUN] Would compress {log_file} -> {gz_name}')"
            : `with open(log_path, "rb") as f_in, gzip.open(gz_path, "wb") as f_out:\n            shutil.copyfileobj(f_in, f_out)\n        with open(log_path, "w") as f_res:\n            f_res.write("[CYCLE_RESET]\\n")`
        }`;

    terminalTelemetry = `[MAINTENANCE_DAEMON] LOG ROTATION PASS:
* Target Campus  : ${campus.toUpperCase()}
* Mode           : ${isDryRun ? "[DRY-RUN SIMULATION]" : "[LIVE EXECUTION]"}
* Logs Rotated   : 3 files (access.log, transactions.log, errors.log)
* Gzip Ratio     : ~87.4% compression savings
* Inode Reset    : Preserved active server file handles.
[STATUS] Log rotation cycle completed.`;
  } else if (actionType === "PURGE_TEMP") {
    generatedPythonCode = `# Bottom-up stale temporary file & cache sweeper:
for root, dirs, files in os.walk("storage/${campus}", topdown=False):
    for f in files:
        if f.endswith((".tmp", ".bak", ".pyc")):
            ${isDryRun ? "print('[DRY-RUN] Would delete:', f)" : "os.remove(os.path.join(root, f))"}
    for d in dirs:
        if d == "__pycache__":
            ${isDryRun ? "print('[DRY-RUN] Would remove cache folder:', d)" : "shutil.rmtree(os.path.join(root, d))"}`;

    terminalTelemetry = `[MAINTENANCE_DAEMON] TEMP & CACHE SWEEPER PASS:
* Target Campus     : ${campus.toUpperCase()}
* Mode              : ${isDryRun ? "[DRY-RUN SIMULATION]" : "[LIVE EXECUTION]"}
* Stale Files Wiped : 14 files (.tmp, .bak, .pyc)
* Caches Reclaimed  : 4 __pycache__ directories
* Storage Reclaimed : 4.82 MB
[STATUS] Temp sweep completed cleanly.`;
  } else if (actionType === "HEALTH_CHECK") {
    generatedPythonCode = `# Storage capacity and threshold inspection:
usage = shutil.disk_usage("/")
used_pct = (usage.used / usage.total) * 100
if used_pct >= 90.0:
    status = "CRITICAL_STORAGE_EXHAUSTION"
elif used_pct >= 80.0:
    status = "WARNING_HIGH_USAGE"
else:
    status = "HEALTHY_NORMAL"
print(f"Health Status: {status} ({used_pct:.1f}% used)")`;

    terminalTelemetry = `[MAINTENANCE_DAEMON] HOST HEALTH EVALUATION:
* Target Mount   : storage/${campus}
* Total Drive    : 512.00 GB
* Used Space     : 218.40 GB (42.7%)
* Free Available : 293.60 GB
* Health Status  : [HEALTHY_NORMAL]
[STATUS] All resource quotas optimal.`;
  } else {
    // FULL_PASS
    generatedPythonCode = `# Automated Full Maintenance Pass Orchestration:
engine = InstitutionalServerMaintenanceEngine("storage/${campus}", dry_run=${isDryRun ? "True" : "False"})
summary = engine.execute_maintenance_cycle()
print("Maintenance Summary:", json.dumps(summary, indent=2))`;

    terminalTelemetry = `[MAINTENANCE_DAEMON] EXECUTING FULL MAINTENANCE PASS:
* Campus Node        : ${campus.toUpperCase()} Production Server
* Execution Mode     : ${isDryRun ? "[DRY-RUN SIMULATION]" : "[LIVE EXECUTION]"}
* Logs Rotated & Gz  : 3 active log streams
* Junk Files Purged  : 14 temp artifacts
* Storage Reclaimed  : 4.82 MB
* Storage Assessment : [OPTIMAL HEALTH] (293.6 GB Free)
* Audit Log Recorded : maintenance_audits/audit_20260825.log
[PASSED] Maintenance pass finished in 32.4 ms.`;
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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          System Maintenance: <span className="text-teal-400">Log Rotation &amp; Health Monitoring</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master autonomous server maintenance engineering in Python: size and age-based log rotation with standard <code className="text-teal-300 font-mono">gzip</code> compression, open file descriptor truncation invariants, bottom-up temporary file and bytecode cache sweeping, safe simulation with <code className="text-cyan-300 font-mono">--dry-run</code> modes, and storage health threshold alerting using <code className="text-purple-300 font-mono">shutil.disk_usage()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗜️ Gzip Log Compression
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧹 Temp File Sweeping
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Safe `--dry-run` Mode
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚨 Storage Quota Alerts
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: MAINTENANCE PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧹</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Autonomous Server Maintenance Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Production server health depends on autonomous maintenance scripts that prevent disk saturation and clean temporary artifacts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Log Rotation &amp; Gzip</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">gzip.open(), truncate("w")</code>
                <p className="text-[11px] text-slate-300">
                  Rotates oversized logs into compressed <code className="text-teal-300 font-mono">.gz</code> files while preserving active daemon file handles.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Temp &amp; Cache Sweeper</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">os.walk(topdown=False)</code>
                <p className="text-[11px] text-slate-300">
                  Purges stale <code className="text-cyan-300 font-mono">.tmp</code>, <code className="text-cyan-300 font-mono">.bak</code>, and <code className="text-cyan-300 font-mono">__pycache__</code> folders bottom-up.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Quota &amp; Thresholds</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">disk_usage(), JSON telemetry</code>
                <p className="text-[11px] text-slate-300">
                  Evaluates warning (&gt;80%) and critical (&gt;90%) thresholds to trigger proactive automated recoveries.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Log Truncation Invariant: Never Delete Active Logs
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Calling <code className="text-rose-400 font-mono">os.remove('server.log')</code> on a running daemon unlinks the filename but leaves the open inode allocated in kernel RAM, failing to reclaim disk space! Always truncate the active log with <code className="text-teal-300 font-mono">open('server.log', 'w')</code> after gzip compression.
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
                2. Visualizing Log Rotation, Cache Sweeping &amp; Health Thresholds
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("logRotation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "logRotation"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Log Rotation &amp; Gzip
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sweeperFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sweeperFlow"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bottom-Up Sweeper
              </button>
              <button
                onClick={() => setActiveInteractiveTab("quotaAlerts")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "quotaAlerts"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Disk Quota Thresholds
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining log compression pipelines, bottom-up cache purging, and multi-tiered disk capacity alerts:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "logRotation" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">STREAMING GZIP LOG ROTATION &amp; INODE TRUNCATION</text>

                {/* 3 Step Flow */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Oversized Active Log</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">`app.log` (&gt; 500 KB)</text>
                  
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">Active server daemon</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">holds open write handle.</text>
                  <text x="15" y="110" fill="#34d399" fontSize="8 font-mono font-bold">Never unlink directly!</text>

                  <rect x="15" y="130" width="220" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Read Stream:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Open `app.log` in `'rb'` mode.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Streaming Gzip</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">`app.log.20260825.gz`</text>

                  <text x="310" y="80" fill="#cbd5e1" fontSize="8">Stream bytes using</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">`shutil.copyfileobj()`</text>
                  <text x="310" y="110" fill="#cbd5e1" fontSize="8">into `gzip.open('wb')`.</text>

                  <rect x="310" y="130" width="220" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="155" fill="#38bdf8" fontSize="9 font-bold">Compression Efficiency:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">85% to 90% disk space savings.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Truncate Active Log</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">`open('app.log', 'w')`</text>

                  <text x="605" y="80" fill="#cbd5e1" fontSize="8">Resets file size to 0</text>
                  <text x="605" y="95" fill="#34d399" fontSize="8 font-bold">Preserves file descriptor!</text>
                  <text x="605" y="110" fill="#cbd5e1" fontSize="8">Server logs seamlessly.</text>

                  <rect x="605" y="130" width="200" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="155" fill="#c4b5fd" fontSize="9 font-bold">Zero Daemon Restarts:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">100% Zero-downtime maintenance.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "sweeperFlow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">BOTTOM-UP JUNK FILE &amp; BYTECODE SWEEPER (`topdown=False`)</text>

                {/* Left: Top-Down Failure */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Top-Down Sweeping [CRASHES ON DIRECTORIES]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. Visits parent `__pycache__` before child `.pyc`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. Attempts `os.rmdir('__pycache__')`</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Raises OSError: Directory not empty!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Traversal Order Hazard:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Cannot remove directories while children still exist.</text>
                </g>

                {/* Right: Bottom-Up Success */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Bottom-Up Sweeping (`topdown=False`) [CLEAN]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Deletes child `.pyc`, `.tmp`, and `.bak` files first</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. Parent `__pycache__` becomes empty</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">3. Safely removes parent cache folder</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Deterministic Cleanup:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Leaves zero empty junk directories on the filesystem.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DISK STORAGE CAPACITY THRESHOLD MONITORING</text>

                {/* 3 Threshold Tiers */}
                <g transform="translate(30, 50)">
                  {/* Tier 1: Normal */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="15" y="30" fill="#a7f3d0" fontSize="11 font-bold">&lt; 80% Usage [HEALTHY]</text>
                  <text x="15" y="55" fill="#34d399" fontSize="8 font-mono">Status: NORMAL</text>
                  
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">Storage capacity is</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">plentiful (&gt; 100 GB Free).</text>
                  <text x="15" y="110" fill="#34d399" fontSize="8">Standard scheduled passes.</text>

                  <rect x="15" y="135" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="160" fill="#34d399" fontSize="9 font-bold">Action Taken:</text>
                  <text x="25" y="180" fill="#cbd5e1" fontSize="8">Normal nightly maintenance.</text>

                  {/* Tier 2: Warning */}
                  <rect x="280" y="0" width="250" height="240" rx="8" fill="#78350f" stroke="#f59e0b" />
                  <text x="295" y="30" fill="#fde68a" fontSize="11 font-bold">80% - 90% [WARNING]</text>
                  <text x="295" y="55" fill="#fbbf24" fontSize="8 font-mono">Status: HIGH_USAGE</text>

                  <text x="295" y="80" fill="#cbd5e1" fontSize="8">Storage threshold exceeded.</text>
                  <text x="295" y="95" fill="#fde68a" fontSize="8">Proactive purge triggered.</text>
                  <text x="295" y="110" fill="#cbd5e1" fontSize="8">Deletes logs older than 7 days.</text>

                  <rect x="295" y="135" width="220" height="85" rx="4" fill="#451a03" stroke="#d97706" />
                  <text x="305" y="160" fill="#fde68a" fontSize="9 font-bold">Action Taken:</text>
                  <text x="305" y="180" fill="#cbd5e1" fontSize="8">Executes aggressive cache purge.</text>

                  {/* Tier 3: Critical */}
                  <rect x="560" y="0" width="260" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="575" y="30" fill="#fda4af" fontSize="11 font-bold">&gt; 90% [CRITICAL ALERT]</text>
                  <text x="575" y="55" fill="#f43f5e" fontSize="8 font-mono">Status: EXHAUSTION</text>

                  <text x="575" y="80" fill="#cbd5e1" fontSize="8">Immediate outage risk!</text>
                  <text x="575" y="95" fill="#fda4af" fontSize="8">Database write locks imminent.</text>
                  <text x="575" y="110" fill="#f43f5e" fontSize="8 font-bold">Pages on-call DevOps.</text>

                  <rect x="575" y="135" width="230" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="585" y="160" fill="#fda4af" fontSize="9 font-bold">Action Taken:</text>
                  <text x="585" y="180" fill="#cbd5e1" fontSize="8">Emergency purge + Ops Webhook.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MAINTENANCE ENGINE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Maintenance Daemon &amp; Sweeper Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure campus server nodes, toggle retention periods, switch between dry-run simulation and live execution, and inspect real-time maintenance telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Action Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Maintenance Cycle Action:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "FULL_PASS", label: "1. Full Maintenance Pass" },
                    { id: "ROTATE_LOGS", label: "2. Rotate & Gzip Logs" },
                    { id: "PURGE_TEMP", label: "3. Sweep Temp / Cache" },
                    { id: "HEALTH_CHECK", label: "4. Storage Quota Check" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setActionType(a.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        actionType === a.id
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
                  2. Campus Production Node:
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
                      {c} Node
                    </button>
                  ))}
                </div>
              </div>

              {/* Retention Policy */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  3. Log Retention Threshold:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[7, 14, 30].map((days) => (
                    <button
                      key={days}
                      onClick={() => setRetentionDays(days)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        retentionDays === days
                          ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Dry-run Toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={isDryRun}
                    onChange={(e) => setIsDryRun(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Simulation Mode (`--dry-run` - Preview without Deletion)</span>
                </label>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Maintenance Automation Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Maintenance Telemetry Stream:</span>
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
        {/* SECTION 4: MASTER MAINTENANCE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Maintenance Module &amp; Technique Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Technique / Recipe</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Memory &amp; Inode Impact</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`gzip.open() + copyfileobj`</td>
                  <td className="py-3 px-4 text-slate-200">Log Compression</td>
                  <td className="py-3 px-4 text-emerald-400">Constant RAM (64KB chunks)</td>
                  <td className="py-3 px-4">Compressing multi-GB access logs without RAM bloat</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`open(log, 'w')` Truncation</td>
                  <td className="py-3 px-4 text-slate-200">Log Reset</td>
                  <td className="py-3 px-4 text-cyan-300">Preserves open file handle</td>
                  <td className="py-3 px-4">Zero-downtime log rotation on running daemon services</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`os.walk(topdown=False)`</td>
                  <td className="py-3 px-4 text-slate-200">Cache Sweeper</td>
                  <td className="py-3 px-4 text-purple-300">Bottom-up leaf removal</td>
                  <td className="py-3 px-4">Safely wiping `.pyc` and `__pycache__` directories</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`shutil.disk_usage()`</td>
                  <td className="py-3 px-4 text-slate-200">Health Monitoring</td>
                  <td className="py-3 px-4 text-emerald-400">Zero disk I/O cost</td>
                  <td className="py-3 px-4">Evaluating &gt;80% and &gt;90% storage alert thresholds</td>
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
            Explore 4 production-grade Python scripts demonstrating log rotation, temp file sweeping, health monitoring, and institutional server maintenance daemons:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "log_rotation_and_cleanup_maintenance.py",
                code: logRotationCode,
                description: "Automated log rotation, gzip compression, and age-based purging.",
              },
              {
                filename: "temp_file_sweeper_and_cache_purger.py",
                code: sweeperCode,
                description: "Temp file sweeping, dry-run simulation, and bytecode cache purging.",
              },
              {
                filename: "system_resource_and_health_monitor.py",
                code: monitorCode,
                description: "Storage inspection, threshold alerting, and JSON telemetry generation.",
              },
              {
                filename: "institutional_automated_server_maintenance_daemon.py",
                code: daemonCode,
                description: "Full server maintenance orchestration, log rotation, and audit logs.",
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
                <span>❌</span> Trap 1: Unlinking Active Log Files
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">os.remove('server.log')</code> on a running daemon unlinks the filename but leaves the open inode allocated in kernel RAM, failing to reclaim disk space!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Truncate active log with <code className="text-emerald-300">open('server.log', 'w')</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Running Without `--dry-run` Validation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Executing automated delete passes without dry-run testing risks wiping legitimate production data if wildcard patterns match unintended files.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always default to or provide <code className="text-emerald-300">--dry-run</code> previews.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Memory Exhaustion in Gzip Reads
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">f_in.read()</code> on a 5GB log loads all 5GB into RAM, crashing the maintenance worker with <code className="text-slate-300">MemoryError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">shutil.copyfileobj(f_in, f_out)</code> in 64KB chunks.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Top-Down Cache Deletion
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Sweeping directories with <code className="text-cyan-300 font-mono">topdown=True</code> crashes when attempting to delete parent folders that still contain child files.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always traverse bottom-up using <code className="text-emerald-300">topdown=False</code>.
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
            Comprehensive question-and-answer repository covering automated maintenance, log rotation, gzip streams, temp sweepers, dry-run, and disk quotas:
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
            Download or print the complete reference sheet with maintenance daemon recipes, log rotation patterns, and sweeper templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_automated_maintenance_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
