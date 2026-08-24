import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import venvInternals from "./topic8_files/venv_internals_and_pyvenv_cfg.py?raw";
import activationScripts from "./topic8_files/activation_scripts_and_environment_variables.py?raw";
import isolationAudit from "./topic8_files/virtualenv_detection_and_isolation_audit.py?raw";
import bootstrapSuite from "./topic8_files/automated_project_environment_bootstrap.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Creating and managing Virtual Environments (venv)
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("folderlayout");

  // Interactive OS Wizard State
  const [selectedOS, setSelectedOS] = useState("windows_ps"); // windows_ps, windows_cmd, posix_bash

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

  const getWorkflowSteps = () => {
    if (selectedOS === "windows_ps") {
      return [
        { step: "1. Create Virtual Environment", cmd: "python -m venv .venv", desc: "Creates isolated directory tree with pyvenv.cfg" },
        { step: "2. Bypass Script Policy (Run Once)", cmd: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process", desc: "Fixes 'running scripts is disabled' error in PowerShell" },
        { step: "3. Activate Environment", cmd: ".\\.venv\\Scripts\\Activate.ps1", desc: "Prepends .venv\\Scripts to OS $PATH and sets ($env:VIRTUAL_ENV)" },
        { step: "4. Install Dependencies", cmd: "python -m pip install -r requirements.txt", desc: "Installs project packages into .venv\\Lib\\site-packages" },
        { step: "5. Deactivate", cmd: "deactivate", desc: "Restores original system $PATH and terminal prompt" },
      ];
    } else if (selectedOS === "windows_cmd") {
      return [
        { step: "1. Create Virtual Environment", cmd: "python -m venv .venv", desc: "Creates isolated directory tree with pyvenv.cfg" },
        { step: "2. Activate Environment", cmd: ".venv\\Scripts\\activate.bat", desc: "Activates environment in Command Prompt" },
        { step: "3. Install Dependencies", cmd: "python -m pip install -r requirements.txt", desc: "Installs project packages into .venv\\Lib\\site-packages" },
        { step: "4. Deactivate", cmd: "deactivate", desc: "Restores original system environment" },
      ];
    } else {
      return [
        { step: "1. Create Virtual Environment", cmd: "python3 -m venv .venv", desc: "Creates isolated directory tree with bin/ and lib/" },
        { step: "2. Activate Environment", cmd: "source .venv/bin/activate", desc: "Sources activation script into current Bash/Zsh shell" },
        { step: "3. Install Dependencies", cmd: "python3 -m pip install -r requirements.txt", desc: "Installs packages into .venv/lib/python3.x/site-packages" },
        { step: "4. Deactivate", cmd: "deactivate", desc: "Restores original system $PATH" },
      ];
    }
  };

  const steps = getWorkflowSteps();

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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Creating &amp; Managing Virtual Environments (<code className="text-teal-400 font-mono">venv</code>)
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master complete dependency isolation: understanding <code className="text-teal-300 font-mono">pyvenv.cfg</code>, <code className="text-cyan-300 font-mono">sys.prefix</code> redirection, the PATH prepending activation mechanics, cross-platform activation scripts, resolving PowerShell security policies, and programmatic environment auditing.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Dependency Isolation &amp; Conflict Prevention
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ pyvenv.cfg &amp; sys.prefix Redirection
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💻 Cross-Platform Activation (PowerShell, CMD, Bash)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔑 PowerShell ExecutionPolicy Bypass
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHY VIRTUAL ENVIRONMENTS ARE ESSENTIAL */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Isolation Imperative: Why Virtual Environments are Mandatory
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In production Python development, every application has unique dependency requirements. Installing all packages globally into the base operating system Python creates catastrophic version conflicts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
              {/* Conflict Problem */}
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg shadow-rose-950/30">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-2">
                  <span>❌</span> Global Python Pollution (Dependency Hell)
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Project A (Legacy Client):</strong> Requires <code className="text-rose-300">Django 3.2</code></div>
                  <div>• <strong>Project B (New App):</strong> Requires <code className="text-rose-300">Django 5.0</code></div>
                  <div className="text-rose-400 pt-1">
                    Overwriting Django breaks Project A! Operating system utilities can also crash.
                  </div>
                </div>
              </div>

              {/* venv Solution */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>✓</span> Virtual Environment Sandbox Isolation
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Project A (.venv_legacy):</strong> Has its own isolated <code className="text-emerald-300">Django 3.2</code></div>
                  <div>• <strong>Project B (.venv_modern):</strong> Has its own isolated <code className="text-emerald-300">Django 5.0</code></div>
                  <div className="text-emerald-400 pt-1">
                    Both projects coexist cleanly on the same computer without conflict!
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Rule: Never Commit `.venv/` to Git
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Virtual environments contain machine-specific absolute file paths and platform-specific binaries. <strong>ALWAYS</strong> add <code className="text-teal-300 font-mono">.venv/</code> to your <code className="text-teal-300 font-mono">.gitignore</code> file! Commit <code className="text-teal-300 font-mono">requirements.txt</code> instead.
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
                2. Visualizing Virtual Environment Architecture
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("folderlayout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "folderlayout"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Folder Anatomy &amp; pyvenv.cfg
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pathprepending")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pathprepending"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                PATH Prepending Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("isolation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "isolation"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Sandboxed site-packages
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining directory plumbing, system variable mutations, and interpreter prefix redirects:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "folderlayout" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">VIRTUAL ENVIRONMENT DIRECTORY PLUMBING &amp; pyvenv.cfg</text>

                {/* Left: Windows Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#0f172a" stroke="#38bdf8" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">Windows Structure: .venv/</text>
                  <text x="20" y="60" fill="#2dd4bf" fontSize="11 font-mono">├── 📄 pyvenv.cfg (Pointer to CPython)</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="11 font-mono">├── 📁 Scripts/</text>
                  <text x="40" y="110" fill="#ecfdf5" fontSize="11 font-mono">│   ├── python.exe &amp; pip.exe</text>
                  <text x="40" y="135" fill="#ecfdf5" fontSize="11 font-mono">│   ├── Activate.ps1 (PowerShell)</text>
                  <text x="40" y="160" fill="#ecfdf5" fontSize="11 font-mono">│   └── activate.bat (CMD)</text>
                  <text x="20" y="185" fill="#cbd5e1" fontSize="11 font-mono">└── 📁 Lib/</text>
                  <text x="40" y="210" fill="#a7f3d0" fontSize="11 font-mono">    └── site-packages/ (Isolated 3rd-party libs)</text>
                </g>

                {/* Right: pyvenv.cfg breakdown */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Inside pyvenv.cfg (The Redirection Engine)</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="11 font-mono">home = C:\Python313</text>
                  <text x="20" y="90" fill="#ecfdf5" fontSize="11 font-mono">include-system-site-packages = false</text>
                  <text x="20" y="115" fill="#ecfdf5" fontSize="11 font-mono">version = 3.13.2</text>

                  <rect x="20" y="145" width="350" height="75" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="170" fill="#34d399" fontSize="11 font-bold">CPython Boot Process:</text>
                  <text x="35" y="190" fill="#ecfdf5" fontSize="10">• Reads pyvenv.cfg → sets sys.prefix to .venv/</text>
                  <text x="35" y="208" fill="#ecfdf5" fontSize="10">• Loads standard library from home directory</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "pathprepending" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">HOW ACTIVATION WORKS: OS PATH PREPENDING</text>

                {/* Before Activation */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="100" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="25" fill="#c4b5fd" fontSize="12" fontWeight="bold">BEFORE ACTIVATION (System Default PATH):</text>
                  <text x="20" y="55" fill="#cbd5e1" fontSize="11 font-mono">PATH = C:\Windows\system32; C:\Program Files\Git; C:\Python313</text>
                  <text x="20" y="80" fill="#fca5a5" fontSize="11">Typing 'python' invokes the global system interpreter (C:\Python313\python.exe)</text>
                </g>

                {/* After Activation */}
                <g transform="translate(30, 170)">
                  <rect x="0" y="0" width="810" height="130" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="25" fill="#a7f3d0" fontSize="12" fontWeight="bold">AFTER ACTIVATION ($ .\.venv\Scripts\Activate.ps1):</text>
                  <text x="20" y="55" fill="#34d399" fontSize="11 font-mono font-bold">PATH = E:\my_app\.venv\Scripts; C:\Windows\system32; C:\Python313</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="11">✓ Virtualenv's Scripts folder is prepended to the VERY FRONT of PATH!</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="11">✓ Typing 'python' or 'pip' instantly targets the isolated .venv binaries.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SYS.PREFIX VS SYS.BASE_PREFIX RUNTIME STATE</text>

                {/* Left: Global Python */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Global Python Environment</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">sys.base_prefix = 'C:\Python313'</text>
                  <text x="20" y="90" fill="#cbd5e1" fontSize="11 font-mono">sys.prefix      = 'C:\Python313'</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="11">sys.prefix == sys.base_prefix → <tspan fill="#f43f5e" fontWeight="bold">TRUE</tspan></text>
                  <text x="20" y="150" fill="#cbd5e1" fontSize="11">VIRTUAL_ENV variable = <tspan fill="#f43f5e" fontWeight="bold">None</tspan></text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="200" fill="#f43f5e" fontSize="11">All pip installs pollute global system folder</text>
                </g>

                {/* Right: Virtualenv */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Virtual Environment (.venv)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">sys.base_prefix = 'C:\Python313'</text>
                  <text x="20" y="90" fill="#34d399" fontSize="11 font-mono">sys.prefix      = 'E:\app\.venv'</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="11">sys.prefix != sys.base_prefix → <tspan fill="#34d399" fontWeight="bold">TRUE</tspan></text>
                  <text x="20" y="150" fill="#cbd5e1" fontSize="11">VIRTUAL_ENV variable = <tspan fill="#34d399" fontWeight="bold">'E:\app\.venv'</tspan></text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="200" fill="#34d399" fontSize="11 font-bold">100% Isolated Sandbox: Zero Conflicts</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE OS COMMAND WIZARD */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Virtual Environment OS Command Wizard
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select your operating system and terminal shell to view the step-by-step commands for creating, activating, and managing virtual environments:
          </p>

          {/* OS Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "windows_ps", label: "Windows (PowerShell - VS Code Default)" },
              { id: "windows_cmd", label: "Windows (Command Prompt cmd.exe)" },
              { id: "posix_bash", label: "macOS / Linux (Bash / Zsh)" },
            ].map((os) => (
              <button
                key={os.id}
                onClick={() => setSelectedOS(os.id)}
                className={clsx(
                  "py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                  selectedOS === os.id
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {os.label}
              </button>
            ))}
          </div>

          {/* Wizard Step List */}
          <div className="space-y-3 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {steps.map((s, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 font-mono">{s.step}</span>
                  <span className="text-[11px] text-slate-400">{s.desc}</span>
                </div>
                <code className="text-xs font-mono text-emerald-300 block bg-slate-950 p-2 rounded border border-slate-800/80">
                  $ {s.cmd}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER VIRTUAL ENVIRONMENT COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Virtual Environment Tools Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Tool</th>
                  <th className="py-3.5 px-4 font-bold">Inclusion Status</th>
                  <th className="py-3.5 px-4 font-bold">Lockfile Support</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">venv</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Standard Library (Built-in)</td>
                  <td className="py-3 px-4 text-slate-400">Manual (requirements.txt)</td>
                  <td className="py-3 px-4">Standard Python projects, Docker containers, CI/CD</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Poetry</td>
                  <td className="py-3 px-4 text-slate-300">Third-Party (pip install poetry)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Automatic (poetry.lock)</td>
                  <td className="py-3 px-4">Modern application packaging &amp; deterministic builds</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Conda</td>
                  <td className="py-3 px-4 text-slate-300">Standalone Distribution (Anaconda)</td>
                  <td className="py-3 px-4 text-slate-400">environment.yml</td>
                  <td className="py-3 px-4">Data science, machine learning, non-Python C/CUDA libs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Pipenv</td>
                  <td className="py-3 px-4 text-slate-300">Third-Party (pip install pipenv)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Automatic (Pipfile.lock)</td>
                  <td className="py-3 px-4">Application development with Pipfile workflows</td>
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
            Explore 4 production-grade Python scripts demonstrating venv directory anatomy, pyvenv.cfg mechanics, activation scripts, and automated runtime bootstrap diagnostics:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "venv_internals_and_pyvenv_cfg.py",
                code: venvInternals,
                description: "Virtual environment directory layout, pyvenv.cfg parameters, and CPython sys.prefix vs sys.base_prefix mechanics.",
              },
              {
                filename: "activation_scripts_and_environment_variables.py",
                code: activationScripts,
                description: "What activation does under the hood (PATH prepending), cross-platform commands, and PowerShell ExecutionPolicy bypass.",
              },
              {
                filename: "virtualenv_detection_and_isolation_audit.py",
                code: isolationAudit,
                description: "Programmatically detecting active virtual environments and inspecting registered site-packages on sys.path.",
              },
              {
                filename: "automated_project_environment_bootstrap.py",
                code: bootstrapSuite,
                description: "Automated environment initialization diagnostic verifying Python version compatibility and isolation status.",
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
                <span>❌</span> Trap 1: Committing `.venv/` to Git Repository
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pushing <code className="text-rose-300 font-mono">.venv/</code> to GitHub uploads machine-specific absolute file paths and 500MB+ of binary files that will fail on any other developer's machine.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Add <code className="text-emerald-300">.venv/</code> to your project's <code className="text-emerald-300">.gitignore</code> file!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Moving / Renaming the Project Folder
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you rename or move your project directory, the virtual environment breaks because <code className="text-amber-300 font-mono">pyvenv.cfg</code> and scripts contain hardcoded absolute paths.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Delete <code className="text-emerald-300">.venv</code> and recreate it with <code className="text-emerald-300">python -m venv .venv</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: PowerShell Script Execution Block
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                PowerShell on Windows blocks scripts by default: <code className="text-purple-300 font-mono">Activate.ps1 cannot be loaded because running scripts is disabled</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Run <code className="text-emerald-300">Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting to Activate Before Installing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-cyan-300 font-mono">pip install requests</code> without activating installs the package into your global base Python instead of your project venv!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Ensure your prompt shows <code className="text-emerald-300">(.venv)</code> before running pip.
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
            Comprehensive question-and-answer repository covering virtual environment creation, pyvenv.cfg internals, activation mechanics, PowerShell security fixes, and lifecycle best practices:
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
            Download or print the complete reference sheet with cross-platform activation commands, PowerShell fix recipes, and venv lifecycle guides:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_virtual_environments_venv_notes.txt"
              title="Print Topic 8 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
