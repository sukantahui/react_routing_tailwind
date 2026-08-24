import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import envProcessCode from "./topic0_files/os_environment_and_process_management.py?raw";
import cwdQueriesCode from "./topic0_files/os_working_directory_and_path_queries.py?raw";
import crudPermsCode from "./topic0_files/os_filesystem_crud_and_permissions.py?raw";
import systemAuditorCode from "./topic0_files/institutional_system_environment_and_audit_inspector.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: os module: environment variables, cwd, file system queries
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("kernelBoundary");

  // Interactive Laboratory State
  const [envMode, setEnvMode] = useState("production");
  const [vaultPath, setVaultPath] = useState("accotax_storage_vault/system_logs");
  const [actionType, setActionType] = useState("INVENTORY_ENV"); // INVENTORY_ENV | QUERY_STAT | TEST_MAKEDIRS | TEST_PERMS

  const serverPid = 48120;
  const cpuCores = 8;
  const osKernel = "Windows NT (os.name='nt')";
  const cwd = "E:\\react_routing_tailwind";

  let terminalOutput = "";
  let generatedPythonCode = "";

  if (actionType === "INVENTORY_ENV") {
    generatedPythonCode = `# Inspect environment variables safely:
env_mode = os.getenv("ACCOTAX_ENV", "development")
db_url = os.getenv("ACCOTAX_DATABASE_URL", "postgresql://localhost:5432")
api_key = os.getenv("ACCOTAX_API_KEY", "DEMO_KEY")
masked_key = api_key[:4] + "****"`;

    terminalOutput = `[OS_AUDIT] INVENTORYING ENVIRONMENT VARIABLES:
* ACCOTAX_ENV          = "${envMode}"
* ACCOTAX_DATABASE_URL = "postgresql://db.accotax.internal:5432/main"
* ACCOTAX_API_KEY      = "DEMO****" (Masked for Security)
* ACCOTAX_PORT         = "8080"
[STATUS] 100% Mandatory Environment Variables Verified.`;
  } else if (actionType === "QUERY_STAT") {
    generatedPythonCode = `# Low-level filesystem query with os.stat():
file_path = "${vaultPath}/heartbeat.log"
if os.path.exists(file_path) and os.path.isfile(file_path):
    stat_info = os.stat(file_path)
    file_size = stat_info.st_size
    mod_time = datetime.fromtimestamp(stat_info.st_mtime)`;

    terminalOutput = `[OS_AUDIT] QUERYING FILESYSTEM METADATA:
* Target Path  : ${vaultPath}/heartbeat.log
* os.path.exists() : True
* os.path.isfile() : True
* os.stat().st_size: 1,420 bytes
* os.stat().st_mode: 0o100666 (Regular File rw-rw-rw-)
* Modified Time: 2026-08-24 23:45:00`;
  } else if (actionType === "TEST_MAKEDIRS") {
    generatedPythonCode = `# Safe idempotent recursive directory creation:
vault_dir = "${vaultPath}"
os.makedirs(vault_dir, exist_ok=True)
print("Created hierarchy:", os.path.isdir(vault_dir))`;

    terminalOutput = `[OS_AUDIT] RECURSIVE DIRECTORY CREATION:
* Executing: os.makedirs("${vaultPath}", exist_ok=True)
* Created nested path: '${vaultPath}'
* Is Directory: True
* Idempotency Check: Succeeded without FileExistsError.`;
  } else {
    // TEST_PERMS
    generatedPythonCode = `# Verify OS file permissions:
is_readable = os.access("${vaultPath}", os.R_OK)
is_writable = os.access("${vaultPath}", os.W_OK)
is_executable = os.access("${vaultPath}", os.X_OK)`;

    terminalOutput = `[OS_AUDIT] TESTING OS PERMISSION BITS:
* Target: '${vaultPath}'
* Read Permission (os.R_OK)    : True [GRANTED]
* Write Permission (os.W_OK)   : True [GRANTED]
* Execute Permission (os.X_OK) : False [DENIED]
[STATUS] Node storage directory is fully writable.`;
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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          OS Module: <span className="text-teal-400">Environment, CWD &amp; Filesystem Queries</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's core operating system interface: defensive environment variable access with <code className="text-teal-300 font-mono">os.getenv()</code>, process runtime metadata, working directory management, recursive directory creation (<code className="text-cyan-300 font-mono">os.makedirs(exist_ok=True)</code>), atomic file replacement (<code className="text-purple-300 font-mono">os.replace</code>), and kernel permission bits (<code className="text-amber-300 font-mono">os.access</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔐 `os.getenv` Fallbacks
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📂 `os.makedirs(exist_ok=True)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Atomic `os.replace`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ `os.access` Permission Bits
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: OS MODULE FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Operating System Interface Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The <code className="text-teal-300 font-mono">os</code> module serves as the primary bridge between the Python runtime and the host operating system kernel:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Environment &amp; Process</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">os.getenv(), os.getpid()</code>
                <p className="text-[11px] text-slate-300">
                  Reads configuration secrets, detects process IDs, CPU count, and kernel platform.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ CWD &amp; Metadata</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">os.getcwd(), os.stat()</code>
                <p className="text-[11px] text-slate-300">
                  Inspects working directories, file size, timestamps, and inode metadata.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Tree CRUD &amp; Permissions</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">os.makedirs(), os.replace()</code>
                <p className="text-[11px] text-slate-300">
                  Atomic file renaming, recursive directory trees, and OS access permission testing.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The KeyError Danger of Direct `os.environ` Indexing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Calling <code className="text-rose-400 font-mono">os.environ["SECRET_TOKEN"]</code> raises an unhandled <code className="text-rose-400 font-mono">KeyError</code> if the variable is not set. In production services, always use <code className="text-teal-300 font-mono">os.getenv("SECRET_TOKEN", fallback)</code> to provide safe, reliable fallbacks!
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
                2. Visualizing OS Process Boundaries, Stat Structs &amp; Directories
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("kernelBoundary")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "kernelBoundary"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Kernel &amp; Process Boundary
              </button>
              <button
                onClick={() => setActiveInteractiveTab("statStruct")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "statStruct"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `os.stat()` Metadata
              </button>
              <button
                onClick={() => setActiveInteractiveTab("treeCreation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "treeCreation"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `os.makedirs` Safety
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining kernel process boundaries, low-level filesystem inode structs, and recursive directory creation trees:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "kernelBoundary" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">OS KERNEL &amp; PROCESS ENVIRONMENT BOUNDARY</text>

                {/* Left: Parent Shell */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Parent Operating System Shell</text>
                  
                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">System Env: PATH, HOME, USERNAME</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">Spawns Python Subprocess (fork / CreateProcess)</text>

                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="150" fill="#c4b5fd" fontSize="9 font-bold">Process Isolation Invariant:</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">Parent shell environment is immutable to child modifications.</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">`os.environ['X'] = 1` does NOT change parent terminal!</text>
                </g>

                {/* Right: Python Process */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Python Process (`PID = 48120`)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. `os.environ` inherits snapshot copy</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. `os.getcwd()` references launch folder</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. `os.cpu_count()` queries hardware cores</text>

                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="150" fill="#34d399" fontSize="9 font-bold">Safe Ingestion:</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">`os.getenv('DATABASE_URL', fallback)` protects process</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">from crashing on missing cloud environment variables.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "statStruct" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">LOW-LEVEL `os.stat(path)` INODE &amp; METADATA STRUCT</text>

                {/* Stat Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">`os.stat("accotax_ledger.csv")` -&gt; os.stat_result</text>

                  <g transform="translate(20, 50)">
                    {/* Stat Item 1 */}
                    <rect x="0" y="0" width="245" height="155" rx="6" fill="#090d16" stroke="#0284c7" />
                    <text x="15" y="30" fill="#38bdf8" fontSize="10 font-bold">1. File Size &amp; Inode</text>
                    <text x="15" y="60" fill="#cbd5e1" fontSize="8 font-mono">st_size  : 1,420 bytes</text>
                    <text x="15" y="80" fill="#cbd5e1" fontSize="8 font-mono">st_ino   : 9283719482</text>
                    <text x="15" y="100" fill="#34d399" fontSize="8 font-mono">`os.path.getsize(path)`</text>

                    {/* Stat Item 2 */}
                    <rect x="265" y="0" width="245" height="155" rx="6" fill="#090d16" stroke="#0284c7" />
                    <text x="280" y="30" fill="#38bdf8" fontSize="10 font-bold">2. Timestamps</text>
                    <text x="280" y="60" fill="#cbd5e1" fontSize="8 font-mono">st_mtime : 1771891200</text>
                    <text x="280" y="80" fill="#cbd5e1" fontSize="8 font-mono">st_ctime : 1771890000</text>
                    <text x="280" y="100" fill="#34d399" fontSize="8 font-mono">`datetime.fromtimestamp()`</text>

                    {/* Stat Item 3 */}
                    <rect x="530" y="0" width="245" height="155" rx="6" fill="#090d16" stroke="#0284c7" />
                    <text x="545" y="30" fill="#38bdf8" fontSize="10 font-bold">3. Permissions &amp; Mode</text>
                    <text x="545" y="60" fill="#cbd5e1" fontSize="8 font-mono">st_mode  : 0o100644</text>
                    <text x="545" y="80" fill="#cbd5e1" fontSize="8 font-mono">os.R_OK  : True</text>
                    <text x="545" y="100" fill="#34d399" fontSize="8 font-mono">`os.access(path, W_OK)`</text>
                  </g>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">RECURSIVE DIRECTORY CREATION: `os.mkdir()` VS `os.makedirs(exist_ok=True)`</text>

                {/* Left: mkdir */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`os.mkdir("logs/2026/q1")` [BRITTLE]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. If 'logs' folder does NOT exist -&gt; FileNotFoundError!</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. If 'q1' folder ALREADY exists -&gt; FileExistsError!</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Requires manual try-except boilerplate</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Fragile &amp; Non-Idempotent:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Fails on multi-level paths or pre-existing folders.</text>
                </g>

                {/* Right: makedirs */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`os.makedirs("logs/2026/q1", exist_ok=True)` [IDEMPOTENT]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Recursively creates 'logs', '2026', and 'q1'</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. `exist_ok=True` suppresses FileExistsError</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">3. 100% Thread-Safe &amp; Idempotent</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Production Standard:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Guarantees directory tree exists with a single call.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE OS LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive OS Environment &amp; Filesystem Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure server environment modes, select OS query actions, inspect process metadata, and observe live terminal execution telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Action Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Select OS Action Trigger:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "INVENTORY_ENV", label: "1. Inventory Env Vars" },
                    { id: "QUERY_STAT", label: "2. Query os.stat()" },
                    { id: "TEST_MAKEDIRS", label: "3. os.makedirs Tree" },
                    { id: "TEST_PERMS", label: "4. Test os.access()" },
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

              {/* Environment Mode Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. ACCOTAX_ENV Variable:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["production", "staging", "development"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setEnvMode(mode)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all capitalize",
                        envMode === mode
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Process Runtime Metadata Badge */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Host Process Metadata:</div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>PID: <strong className="text-teal-300">{serverPid}</strong></span>
                  <span>Kernel: <strong className="text-cyan-300">{osKernel}</strong></span>
                  <span>CPUs: <strong className="text-purple-300">{cpuCores} Cores</strong></span>
                </div>
                <div className="text-[10px] text-slate-400 truncate pt-0.5">
                  CWD: {cwd}
                </div>
              </div>
            </div>

            {/* Code Generator & Terminal Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python os Execution Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Live Terminal Output Inspector */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>OS Terminal Telemetry Stream:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {terminalOutput}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER OS MODULE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `os` Module Function Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function Signature</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Error Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`os.getenv(k, def)`</td>
                  <td className="py-3 px-4 text-slate-200">Environment</td>
                  <td className="py-3 px-4 text-emerald-400">Safe (Returns `def`)</td>
                  <td className="py-3 px-4">Production secret &amp; DB URL ingestion</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`os.makedirs(p, exist_ok=True)`</td>
                  <td className="py-3 px-4 text-slate-200">Directory CRUD</td>
                  <td className="py-3 px-4 text-emerald-400">Safe (Idempotent)</td>
                  <td className="py-3 px-4">Creating nested log/storage trees</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`os.replace(src, dst)`</td>
                  <td className="py-3 px-4 text-slate-200">File Operation</td>
                  <td className="py-3 px-4 text-purple-300">Atomic Overwrite</td>
                  <td className="py-3 px-4">Cross-platform atomic file swapping</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`os.access(p, mode)`</td>
                  <td className="py-3 px-4 text-slate-200">Permissions</td>
                  <td className="py-3 px-4 text-emerald-400">Returns `bool`</td>
                  <td className="py-3 px-4">Testing read/write OS permissions</td>
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
            Explore 4 production-grade Python scripts demonstrating environment variable management, path queries, directory CRUD, and institutional server auditors:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "os_environment_and_process_management.py",
                code: envProcessCode,
                description: "Environment variables, getenv fallbacks, and process introspection.",
              },
              {
                filename: "os_working_directory_and_path_queries.py",
                code: cwdQueriesCode,
                description: "getcwd, path queries, and stat metadata.",
              },
              {
                filename: "os_filesystem_crud_and_permissions.py",
                code: crudPermsCode,
                description: "os.makedirs(exist_ok=True), os.replace, and os.access.",
              },
              {
                filename: "institutional_system_environment_and_audit_inspector.py",
                code: systemAuditorCode,
                description: "Server environment audit, process metadata, and filesystem permission inspection.",
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
                <span>❌</span> Trap 1: Direct Indexing `os.environ['KEY']`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct indexing raises a fatal <code className="text-rose-300 font-mono">KeyError</code> if the variable is missing from the host environment.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">os.getenv('KEY', fallback)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Mutating CWD with `os.chdir()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                CWD is process-global; modifying it via <code className="text-amber-300 font-mono">os.chdir()</code> changes the directory for all concurrent threads!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use absolute paths (<code className="text-emerald-300">os.path.abspath</code> or <code className="text-emerald-300">pathlib.Path</code>).
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Omission of `exist_ok=True`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">os.makedirs(path)</code> without <code className="text-purple-300 font-mono">exist_ok=True</code> crashes with <code className="text-slate-300">FileExistsError</code> when run multiple times.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always specify <code className="text-emerald-300">exist_ok=True</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Hardcoding OS Path Separators
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">path = "folder\\sub\\file.txt"</code> breaks portability on Linux/macOS.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">os.path.join()</code> or <code className="text-emerald-300">pathlib.Path</code>.
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
            Comprehensive question-and-answer repository covering os module, environment variables, working directory, stat structs, and filesystem permissions:
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
            Download or print the complete reference sheet with os module recipes, environment variable patterns, and filesystem query templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_os_module_and_environment_notes.txt"
              title="Print Topic 0 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
