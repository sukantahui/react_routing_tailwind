import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import pdbFundamentals from "./topic11_files/pdb_debugger_fundamentals.py?raw";
import postMortem from "./topic11_files/post_mortem_debugging_pm.py?raw";
import loggingSuite from "./topic11_files/logging_vs_print_debugging.py?raw";
import debuggerSuite from "./topic11_files/institutional_admission_debugger_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic11_files/topic11_note.txt?raw";

// FAQ Questions
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11: Debugging techniques & pdb breakpoints
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic11() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pdbflow");

  // Interactive PDB Shell Simulator State
  const [currentLine, setCurrentLine] = useState(1);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: "SYSTEM", text: "Python 3.13.0 (main) [GCC / CPython]" },
    { type: "SYSTEM", text: "-> breakpoint() reached at line 1: initiate_fee_calculation()" },
    { type: "PROMPT", text: "(Pdb) _" },
  ]);

  const scriptCodeLines = [
    { line: 1, text: "def calculate_net_tuition(raw_fee, discount_rate):", fn: "calculate_net_tuition" },
    { line: 2, text: "    breakpoint()  # <-- Pauses in debugger", fn: "calculate_net_tuition" },
    { line: 3, text: "    discount = raw_fee * discount_rate", fn: "calculate_net_tuition" },
    { line: 4, text: "    net_payable = raw_fee - discount", fn: "calculate_net_tuition" },
    { line: 5, text: "    return net_payable", fn: "calculate_net_tuition" },
    { line: 6, text: "fee_res = calculate_net_tuition(20000.0, 0.15)", fn: "main" },
    { line: 7, text: "print(f'Final Fee: {fee_res}')", fn: "main" },
  ];

  const handlePdbCommand = (cmd) => {
    let newHistory = [...consoleHistory];
    newHistory.push({ type: "INPUT", text: `(Pdb) ${cmd}` });

    if (cmd === "n") {
      if (currentLine < 7) {
        const next = currentLine + 1;
        setCurrentLine(next);
        newHistory.push({
          type: "OUTPUT",
          text: `> script.py(${next})${scriptCodeLines[next - 1].fn}()\n-> ${scriptCodeLines[next - 1].text}`,
        });
      } else {
        newHistory.push({ type: "SYSTEM", text: "--Return from script execution (Code 0)--" });
      }
    } else if (cmd === "s") {
      if (currentLine === 6) {
        setCurrentLine(1);
        newHistory.push({
          type: "OUTPUT",
          text: `> script.py(1)calculate_net_tuition()\n-> ${scriptCodeLines[0].text}`,
        });
      } else if (currentLine < 7) {
        const next = currentLine + 1;
        setCurrentLine(next);
        newHistory.push({
          type: "OUTPUT",
          text: `> script.py(${next})${scriptCodeLines[next - 1].fn}()\n-> ${scriptCodeLines[next - 1].text}`,
        });
      }
    } else if (cmd === "p raw_fee") {
      newHistory.push({ type: "OUTPUT", text: "20000.0" });
    } else if (cmd === "p discount_rate") {
      newHistory.push({ type: "OUTPUT", text: "0.15" });
    } else if (cmd === "p discount") {
      newHistory.push({
        type: "OUTPUT",
        text: currentLine >= 4 ? "3000.0" : "*** NameError: name 'discount' is not defined (not yet executed)",
      });
    } else if (cmd === "w") {
      newHistory.push({
        type: "OUTPUT",
        text: `  script.py(6)<module>()\n    fee_res = calculate_net_tuition(20000.0, 0.15)\n> script.py(${currentLine})${scriptCodeLines[currentLine - 1].fn}()\n-> ${scriptCodeLines[currentLine - 1].text}`,
      });
    } else if (cmd === "c") {
      setCurrentLine(7);
      newHistory.push({
        type: "OUTPUT",
        text: "Final Fee: INR 17,000.00\nThe program finished and exited with code 0.",
      });
    }

    setConsoleHistory(newHistory);
  };

  const handleResetPdb = () => {
    setCurrentLine(2);
    setConsoleHistory([
      { type: "SYSTEM", text: "Python 3.13.0 (main) [GCC / CPython]" },
      { type: "SYSTEM", text: "-> breakpoint() reached at line 2: calculate_net_tuition()" },
      { type: "PROMPT", text: "(Pdb) _" },
    ]);
  };

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
            Segment 3 • Module 003_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 11
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Debugging Techniques &amp; <code className="text-teal-400 font-mono">pdb</code> Breakpoints
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python interactive runtime diagnosis: <code className="text-teal-300 font-mono">breakpoint()</code>, essential PDB navigation (<code className="text-cyan-300 font-mono">n</code>, <code className="text-cyan-300 font-mono">s</code>, <code className="text-cyan-300 font-mono">p</code>, <code className="text-cyan-300 font-mono">w</code>, <code className="text-cyan-300 font-mono">u</code>, <code className="text-cyan-300 font-mono">d</code>), post-mortem debugging with <code className="text-purple-300 font-mono">pdb.post_mortem()</code>, and structured logging vs fragile <code className="text-amber-300 font-mono">print()</code> debugging.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🐞 Built-in breakpoint() Engine
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⌨️ Essential PDB Commands (n, s, c, p, w)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💀 Post-Mortem Frame Autopsy (pdb.pm())
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Structured logging vs print()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PDB ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔍</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Python Debugger (PDB) &amp; `breakpoint()`
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python 3.7+, you can insert an interactive breakpoint anywhere by typing <code className="text-teal-300 font-mono">breakpoint()</code>. This automatically pauses execution and launches the interactive <strong>PDB shell</strong> without requiring IDE extensions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Step-by-Step Control</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">n (next) / s (step into)</code>
                <p className="text-[11px] text-slate-300">
                  Step line-by-line or dive directly inside helper function implementations.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Stack Traversal</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">w (where) / u (up) / d (down)</code>
                <p className="text-[11px] text-slate-300">
                  Inspect variable scopes in caller functions higher up the call stack tree.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Post-Mortem Autopsy</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">python -m pdb script.py</code>
                <p className="text-[11px] text-slate-300">
                  Drops directly into the exact line and scope where an unhandled crash occurred.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Disabling All Breakpoints in Production
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You can globally disable all <code className="text-teal-300 font-mono">breakpoint()</code> statements across an entire production server by setting the environment variable <code className="text-teal-300 font-mono">export PYTHONBREAKPOINT=0</code>. This guarantees production services will never freeze waiting for terminal input!
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
                2. Visualizing Debugger Control Flow &amp; Stack Frames
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pdbflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pdbflow"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                PDB Execution Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("stack")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "stack"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Call Stack Traversal (w, u, d)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("logging")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "logging"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Logging vs print() Levels
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining breakpoint triggers, stack frame inspection, and structured telemetry:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pdbflow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE `breakpoint()` INTERACTIVE EXECUTION FLOW</text>

                {/* 3 Blocks */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold">1. Code Execution</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">def calculate(x):</text>
                  <text x="30" y="85" fill="#34d399" fontSize="9 font-mono font-bold">breakpoint()  # PAUSE</text>
                  <text x="30" y="105" fill="#ecfdf5" fontSize="9 font-mono">return x * 2</text>
                  
                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Execution Paused:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Interpreter halts bytecode</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">and transfers to (Pdb) prompt.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="310" y="30" fill="#c4b5fd" fontSize="11" fontWeight="bold">2. Interactive (Pdb) Prompt</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">(Pdb) p x</text>
                  <text x="310" y="80" fill="#34d399" fontSize="9 font-mono">42</text>
                  <text x="310" y="105" fill="#ecfdf5" fontSize="9 font-mono">(Pdb) n</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="320" y="155" fill="#c4b5fd" fontSize="9 font-bold">Full Live Introspection:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Inspect/mutate variables,</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">step line-by-line, print frames.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="605" y="30" fill="#a5f3fc" fontSize="11" fontWeight="bold">3. Resume Execution (`c`)</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="9 font-mono">(Pdb) c</text>
                  <text x="605" y="85" fill="#38bdf8" fontSize="9 font-mono">Resumes full speed!</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="615" y="155" fill="#38bdf8" fontSize="9 font-bold">Zero IDE Lock-in:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Works identically on servers,</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">SSH terminals, and Docker.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "stack" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CALL STACK TRAVERSAL: `w` (WHERE), `u` (UP), `d` (DOWN)</text>

                {/* 3 Call Stack Levels */}
                <g transform="translate(30, 50)">
                  {/* Top: main() */}
                  <rect x="0" y="0" width="380" height="65" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="25" fill="#c4b5fd" fontSize="11" fontWeight="bold">Frame 1: `main()` entry (File 'app.py', Line 50)</text>
                  <text x="20" y="48" fill="#ecfdf5" fontSize="9 font-mono">fee = calculate_semester_fee(student_id="STU-101")</text>

                  {/* Intermediate: calc() */}
                  <rect x="0" y="85" width="380" height="65" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="110" fill="#a5f3fc" fontSize="11" fontWeight="bold">Frame 2: `calculate_semester_fee()` (Line 25)</text>
                  <text x="20" y="133" fill="#ecfdf5" fontSize="9 font-mono">discount = apply_scholarship(marks=94.5)</text>

                  {/* Leaf: apply() */}
                  <rect x="0" y="170" width="380" height="65" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="195" fill="#99f6e4" fontSize="11" fontWeight="bold">&gt; Frame 3: `apply_scholarship()` (Line 10) [ACTIVE FRAME]</text>
                  <text x="20" y="218" fill="#34d399" fontSize="9 font-mono">breakpoint()  # Active debugger pause point</text>
                </g>

                {/* Navigation Guide */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="400" height="235" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Stack Traversal Command Mechanics</text>

                  <rect x="20" y="55" width="360" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="75" fill="#34d399" fontSize="10 font-bold">`u` (Up Command):</text>
                  <text x="30" y="93" fill="#ecfdf5" fontSize="8 font-mono">Moves active scope to Frame 2 or 1 to inspect caller variables.</text>

                  <rect x="20" y="115" width="360" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="10 font-bold">`d` (Down Command):</text>
                  <text x="30" y="153" fill="#ecfdf5" fontSize="8 font-mono">Moves active scope down toward Frame 3.</text>

                  <text x="20" y="195" fill="#cbd5e1" fontSize="9">• `w` prints complete stack trace with current pointer</text>
                  <text x="20" y="215" fill="#cbd5e1" fontSize="9">• Zero loss of local variables across all execution frames</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">STRUCTURED LOGGING LEVELS: DEBUG TO CRITICAL</text>

                {/* 5 Log Levels */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="150" height="240" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11" fontWeight="bold">1. DEBUG (10)</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="9">Diagnostic details,</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="9">variable states,</text>
                  <text x="15" y="100" fill="#cbd5e1" fontSize="9">payload dumps.</text>

                  <rect x="170" y="0" width="150" height="240" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="185" y="30" fill="#a5f3fc" fontSize="11" fontWeight="bold">2. INFO (20)</text>
                  <text x="185" y="60" fill="#cbd5e1" fontSize="9">Normal milestones,</text>
                  <text x="185" y="80" fill="#cbd5e1" fontSize="9">user logins,</text>
                  <text x="185" y="100" fill="#cbd5e1" fontSize="9">successful fees.</text>

                  <rect x="340" y="0" width="150" height="240" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="355" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold">3. WARNING (30)</text>
                  <text x="355" y="60" fill="#cbd5e1" fontSize="9">Unexpected events,</text>
                  <text x="355" y="80" fill="#cbd5e1" fontSize="9">retries, quota</text>
                  <text x="355" y="100" fill="#cbd5e1" fontSize="9">approaching max.</text>

                  <rect x="510" y="0" width="150" height="240" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="525" y="30" fill="#fda4af" fontSize="11" fontWeight="bold">4. ERROR (40)</text>
                  <text x="525" y="60" fill="#cbd5e1" fontSize="9">Operation failed,</text>
                  <text x="525" y="80" fill="#cbd5e1" fontSize="9">payment declined,</text>
                  <text x="525" y="100" fill="#cbd5e1" fontSize="9">caught exceptions.</text>

                  <rect x="680" y="0" width="150" height="240" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="695" y="30" fill="#ffe4e6" fontSize="11" fontWeight="bold">5. CRITICAL (50)</text>
                  <text x="695" y="60" fill="#cbd5e1" fontSize="9">System down,</text>
                  <text x="695" y="80" fill="#cbd5e1" fontSize="9">database dead,</text>
                  <text x="695" y="100" fill="#cbd5e1" fontSize="9">immediate pager.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PDB SHELL SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive PDB Debugger Shell Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute virtual PDB commands to step through the tuition calculation script and inspect runtime variables:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Source Code Window with Active Pointer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Source Script (`script.py`)
                </span>
                <button
                  onClick={handleResetPdb}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Restart Session
                </button>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                {scriptCodeLines.map((item) => (
                  <div
                    key={item.line}
                    className={clsx(
                      "flex items-center gap-3 py-1 px-2 rounded transition-all",
                      currentLine === item.line ? "bg-teal-950/80 border border-teal-600 text-teal-200" : "text-slate-400"
                    )}
                  >
                    <span className="text-slate-600 text-[10px] w-4">{item.line}</span>
                    <span className="w-4 text-teal-400 font-bold">{currentLine === item.line ? "→" : " "}</span>
                    <span className={clsx(currentLine === item.line && "font-bold text-white")}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Debugger Control Pad Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block font-bold">
                  Click Debugger Command to Send:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    onClick={() => handlePdbCommand("n")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500 rounded text-teal-300 font-bold"
                  >
                    `n` (Next Line)
                  </button>
                  <button
                    onClick={() => handlePdbCommand("s")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 rounded text-cyan-300 font-bold"
                  >
                    `s` (Step Into)
                  </button>
                  <button
                    onClick={() => handlePdbCommand("c")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 rounded text-emerald-300 font-bold"
                  >
                    `c` (Continue)
                  </button>
                  <button
                    onClick={() => handlePdbCommand("p raw_fee")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500 rounded text-purple-300"
                  >
                    `p raw_fee`
                  </button>
                  <button
                    onClick={() => handlePdbCommand("p discount")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500 rounded text-purple-300"
                  >
                    `p discount`
                  </button>
                  <button
                    onClick={() => handlePdbCommand("w")}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 rounded text-amber-300"
                  >
                    `w` (Where/Stack)
                  </button>
                </div>
              </div>
            </div>

            {/* PDB Terminal Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Interactive (Pdb) Console Output
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex-1 font-mono text-xs space-y-1.5 overflow-y-auto max-h-[360px]">
                {consoleHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      "leading-relaxed",
                      item.type === "SYSTEM" && "text-slate-500 text-[11px]",
                      item.type === "PROMPT" && "text-teal-400 font-bold",
                      item.type === "INPUT" && "text-teal-300 font-bold",
                      item.type === "OUTPUT" && "text-slate-200 whitespace-pre-wrap pl-2 border-l border-slate-700"
                    )}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PDB COMMAND MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master PDB Debugger Navigation Commands Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Command</th>
                  <th className="py-3.5 px-4 font-bold">Full Name</th>
                  <th className="py-3.5 px-4 font-bold">Execution Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Common Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">n</td>
                  <td className="py-3 px-4 font-mono">next</td>
                  <td className="py-3 px-4">Executes current line, stops at next line in same function</td>
                  <td className="py-3 px-4">Stepping over library calls</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s</td>
                  <td className="py-3 px-4 font-mono">step</td>
                  <td className="py-3 px-4">Steps inside the function call on current line</td>
                  <td className="py-3 px-4">Entering helper functions to diagnose logic</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">w</td>
                  <td className="py-3 px-4 font-mono">where</td>
                  <td className="py-3 px-4">Prints entire call stack trace with frame arrow</td>
                  <td className="py-3 px-4">Finding how execution reached current line</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">u / d</td>
                  <td className="py-3 px-4 font-mono">up / down</td>
                  <td className="py-3 px-4">Moves frame pointer up to caller or down to callee</td>
                  <td className="py-3 px-4">Inspecting caller variable values</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">c</td>
                  <td className="py-3 px-4 font-mono">continue</td>
                  <td className="py-3 px-4">Resumes execution until next breakpoint or termination</td>
                  <td className="py-3 px-4">Resuming normal program speed</td>
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
            Explore 4 production-grade Python scripts demonstrating PDB commands, post-mortem debugging, structured logging, and score reconciliation diagnostics:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "pdb_debugger_fundamentals.py",
                code: pdbFundamentals,
                description: "PDB fundamentals, breakpoint() function, and command cheat sheet reference.",
              },
              {
                filename: "post_mortem_debugging_pm.py",
                code: postMortem,
                description: "Post-mortem debugging concepts, dead frame inspection, and sys.exc_info() stack extraction.",
              },
              {
                filename: "logging_vs_print_debugging.py",
                code: loggingSuite,
                description: "Structured logging vs print debugging, log levels, and automatic exception trace capturing.",
              },
              {
                filename: "institutional_admission_debugger_suite.py",
                code: debuggerSuite,
                description: "Enterprise Exam Score Reconciliation Service with diagnostic telemetry and frame snapshotting.",
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
                <span>❌</span> Trap 1: Leaving `breakpoint()` in Production
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Leaving active <code className="text-rose-300 font-mono">breakpoint()</code> calls in background services (like Celery or Gunicorn) causes worker processes to freeze permanently waiting for terminal input.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Set <code className="text-emerald-300">export PYTHONBREAKPOINT=0</code> in production environments.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Shadowing PDB Commands with Variables
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If your code has a variable named <code className="text-amber-300 font-mono">c</code> or <code className="text-amber-300 font-mono">n</code>, typing it into PDB executes the continue/next command instead of printing!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always prefix variable evaluation with <code className="text-emerald-300">p c</code> or <code className="text-emerald-300">p n</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Stepping Over Bugs (`n` vs `s`)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-purple-300 font-mono">n</code> (next) on a line with a buggy custom function steps completely over the function call, making it impossible to see where the internal crash occurred.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">s</code> (step) to enter suspect function bodies.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Cluttering Code with Print Statements
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-cyan-300 font-mono">print()</code> for debugging pollutes standard output, cannot be silenced dynamically, and lacks timestamps and file locations.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">logging.getLogger()</code> with structured levels.
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
            Comprehensive question-and-answer repository covering the Python Debugger (PDB), breakpoint(), stack frames, and structured logging:
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
            Download or print the complete reference sheet with PDB commands cheat sheet, post-mortem recipes, and logging templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic11_pdb_debugging_notes.txt"
              title="Print Topic 11 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
