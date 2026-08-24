import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import runCode from "./topic5_files/subprocess_run_synchronous_execution.py?raw";
import popenCode from "./topic5_files/subprocess_popen_asynchronous_streams.py?raw";
import pipesCode from "./topic5_files/subprocess_unix_pipes_and_chaining.py?raw";
import healthRunnerCode from "./topic5_files/institutional_automated_service_health_and_cli_runner.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Running external shell commands using subprocess module (run, Popen, pipes)
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("runVsPopen");

  // Interactive Laboratory State
  const [selectedTask, setSelectedTask] = useState("PYTHON_VERSION"); // PYTHON_VERSION | GIT_HASH | STREAM_WORKER | PIPE_CHAIN
  const [execMode, setExecMode] = useState("RUN"); // RUN (Sync) | POPEN (Streaming)
  const [enableCheck, setEnableCheck] = useState(true);
  const [hasTimeout, setHasTimeout] = useState(true);
  const [isTextMode, setIsTextMode] = useState(true);

  let generatedPythonCode = "";
  let simulatedOutput = "";

  if (selectedTask === "PYTHON_VERSION") {
    generatedPythonCode = `# Safe synchronous command invocation:
result = subprocess.run(
    [sys.executable, "-V"],
    capture_output=True,
    text=${isTextMode ? "True" : "False"},
    check=${enableCheck ? "True" : "False"}${hasTimeout ? ",\n    timeout=3.0" : ""}
)
print("Returncode:", result.returncode)
print("Stdout    :", result.stdout.strip())`;

    simulatedOutput = `[SUBPROCESS_EXEC] Executing: [sys.executable, "-V"]
* Process ID (PID)  : 52184
* Return Code       : 0 (SUCCESS)
* Output Captured   : ${isTextMode ? '"Python 3.13.2"' : "b'Python 3.13.2\\r\\n'"}
[STATUS] Command completed in 18ms.`;
  } else if (selectedTask === "GIT_HASH") {
    generatedPythonCode = `# Query repository commit hash:
result = subprocess.run(
    ["git", "rev-parse", "--short", "HEAD"],
    capture_output=True,
    text=${isTextMode ? "True" : "False"},
    check=${enableCheck ? "True" : "False"}${hasTimeout ? ",\n    timeout=3.0" : ""}
)
print("Commit Hash:", result.stdout.strip())`;

    simulatedOutput = `[SUBPROCESS_EXEC] Executing: ["git", "rev-parse", "--short", "HEAD"]
* Process ID (PID)  : 52210
* Return Code       : 0 (SUCCESS)
* Git Commit Output : ${isTextMode ? '"8f4c2e1"' : "b'8f4c2e1\\n'"}
[STATUS] Head revision resolved.`;
  } else if (selectedTask === "STREAM_WORKER") {
    generatedPythonCode = `# Asynchronous stdout line-by-line streaming:
proc = subprocess.Popen(
    [sys.executable, "stream_worker.py"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)
for line in iter(proc.stdout.readline, ""):
    print("Streamed Log:", line.strip())
proc.wait()`;

    simulatedOutput = `[SUBPROCESS_POPEN] Spawning Background Process (PID = 52248):
-> STREAMED LOG: [WORKER_EVENT] Ingesting Barrackpore Student Roster (Batch #1)...
-> STREAMED LOG: [WORKER_EVENT] Validating KYC Documents & Fee Records...
-> STREAMED LOG: [WORKER_EVENT] Ingestion Complete. All 150 Records Verified.
* Process Terminated with Exit Code: 0`;
  } else {
    // PIPE_CHAIN
    generatedPythonCode = `# Multi-process pipeline chaining (p1 | p2):
p1 = subprocess.Popen([sys.executable, "gen_data.py"], stdout=subprocess.PIPE)
p2 = subprocess.Popen([sys.executable, "filter_paid.py"], stdin=p1.stdout, stdout=subprocess.PIPE, text=True)
p1.stdout.close() # Critical pipe closing invariant!

output, _ = p2.communicate()
print("Pipeline Output:", output)`;

    simulatedOutput = `[SUBPROCESS_PIPELINE] Running Process Chain (p1 | p2):
* p1 [Generator Process] -> stdout -> p2.stdin [Filter Process]
* Closed parent p1.stdout descriptor to allow proper EOF.
----------------------------------------------------------
[CLEARED RECORD] ID: STU-101 | Name: Sourav Mukherjee | Status: PAID
[CLEARED RECORD] ID: STU-103 | Name: Amitava Ghosh     | Status: PAID
* Pipeline Terminated Cleanly. Exit Code: 0`;
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Subprocess Execution: <span className="text-teal-400">run, Popen &amp; Pipes</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master external operating system process management in Python: synchronous execution with <code className="text-teal-300 font-mono">subprocess.run()</code>, exit code enforcement (<code className="text-cyan-300 font-mono">check=True</code>), timeout safeguards, command injection defense (passing token lists instead of <code className="text-rose-400 font-mono">shell=True</code>), real-time streaming with <code className="text-purple-300 font-mono">subprocess.Popen()</code>, and multi-process pipeline chaining with OS pipes.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 `subprocess.run()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📡 Real-Time `Popen` Streams
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Zero-Injection Token Lists
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 OS Pipe Chaining
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: SUBPROCESS FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The External Process Execution Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python's <code className="text-teal-300 font-mono">subprocess</code> module provides a secure interface to invoke OS binaries, capture outputs, and manage process lifecycles:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Synchronous `run()`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">subprocess.run(args, check=True)</code>
                <p className="text-[11px] text-slate-300">
                  Blocks calling thread until command completes. Returns <code className="text-teal-300 font-mono">CompletedProcess</code> with output and returncode.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Asynchronous `Popen()`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">proc = subprocess.Popen(...)</code>
                <p className="text-[11px] text-slate-300">
                  Starts child process non-blockingly in the background. Enables real-time line-by-line stdout streaming.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Pipeline Chaining</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">p2(stdin=p1.stdout)</code>
                <p className="text-[11px] text-slate-300">
                  Connects multiple processes via OS pipes without storing massive intermediate datasets in RAM.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Security Invariant: Eliminating `shell=True`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Passing user input to <code className="text-rose-400 font-mono">subprocess.run(f"cmd {'{input}'}", shell=True)</code> enables catastrophic Command Injection vulnerabilities. Always pass arguments as a list of discrete tokens: <code className="text-teal-300 font-mono">subprocess.run(["cmd", input])</code>!
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
                2. Visualizing Process Execution, Injection Defense &amp; Pipe Chaining
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("runVsPopen")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "runVsPopen"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `run()` vs `Popen()`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("injectionDefense")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "injectionDefense"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Zero-Injection Defense
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pipeChain")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pipeChain"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Process Pipe Chaining
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining synchronous blocking vs streaming, shell command injection defenses, and OS pipe descriptor lifecycle:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "runVsPopen" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">SYNCHRONOUS `subprocess.run()` VS ASYNCHRONOUS `Popen()`</text>

                {/* Left: run() */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">`subprocess.run()` [BLOCKING]</text>
                  
                  <text x="20" y="65" fill="#38bdf8" fontSize="8 font-mono">1. Spawns Child OS Process</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">2. Parent thread WAITS until completion</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. Returns `CompletedProcess` struct</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Best Use Case:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Quick utility commands (git status, version queries)</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">where you need the full output captured at once.</text>
                </g>

                {/* Right: Popen() */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">`subprocess.Popen()` [STREAMING &amp; ASYNC]</text>

                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">1. Spawns Child Process asynchronously</text>
                  <text x="20" y="85" fill="#c084fc" fontSize="8 font-mono">2. Parent continues execution immediately</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. Real-time line-by-line `proc.stdout` stream</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Best Use Case:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Long-running tasks, live log monitoring, web dashboards,</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">and complex two-way interactive CLI communication.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "injectionDefense" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">COMMAND INJECTION VULNERABILITY VS PARAMETERIZED LISTS</text>

                {/* Left: shell=True Vulnerable */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`shell=True` with Formatting [VULNERABLE]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`subprocess.run(f"ping {input}", shell=True)`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Attacker passes: "8.8.8.8 &amp;&amp; rm -rf /"</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Shell executes BOTH commands with full privileges!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Catastrophic Security Risk:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Arbitrary remote code execution via shell metacharacters.</text>
                </g>

                {/* Right: Safe List */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Safe Token List [IMMUNE TO INJECTION]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`subprocess.run(["ping", input])`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Attacker passes: "8.8.8.8 &amp;&amp; rm -rf /"</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Kernel treats whole string as literal hostname!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">100% Injection Safe:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Bypasses shell parser entirely; tokens passed directly to OS.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">OS PROCESS PIPELINE CHAINING (`p1.stdout -&gt; p2.stdin`)</text>

                {/* Pipeline Flow */}
                <g transform="translate(30, 50)">
                  {/* Process 1 */}
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">Process 1: Generator</text>
                  <text x="15" y="60" fill="#38bdf8" fontSize="8 font-mono">`Popen(['cat', 'data.csv'])`</text>
                  <text x="15" y="85" fill="#34d399" fontSize="8 font-mono">stdout = subprocess.PIPE</text>

                  <rect x="15" y="125" width="210" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="150" fill="#34d399" fontSize="9 font-bold">Pipe Producer:</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">Writes record stream to pipe.</text>
                  <text x="25" y="185" fill="#cbd5e1" fontSize="8">Parent calls `p1.stdout.close()`.</text>

                  {/* Arrow 1 */}
                  <text x="250" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Process 2 */}
                  <rect x="280" y="0" width="240" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">Process 2: Filter</text>
                  <text x="295" y="60" fill="#38bdf8" fontSize="8 font-mono">`Popen(['grep', 'PAID'])`</text>
                  <text x="295" y="85" fill="#34d399" fontSize="8 font-mono">stdin = p1.stdout</text>

                  <rect x="295" y="125" width="210" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="150" fill="#38bdf8" fontSize="9 font-bold">Pipe Consumer:</text>
                  <text x="305" y="170" fill="#cbd5e1" fontSize="8">Consumes stream line-by-line.</text>
                  <text x="305" y="185" fill="#cbd5e1" fontSize="8">Filters only matching rows.</text>

                  {/* Arrow 2 */}
                  <text x="530" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Process 3 */}
                  <rect x="560" y="0" width="260" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="575" y="30" fill="#c4b5fd" fontSize="11 font-bold">Process 3: Formatter</text>
                  <text x="575" y="60" fill="#c084fc" fontSize="8 font-mono">`Popen(['format_json'])`</text>
                  <text x="575" y="85" fill="#34d399" fontSize="8 font-mono">`output = p3.communicate()`</text>

                  <rect x="575" y="125" width="230" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="585" y="150" fill="#c4b5fd" fontSize="9 font-bold">Final Aggregator:</text>
                  <text x="585" y="170" fill="#cbd5e1" fontSize="8">Collects final processed data.</text>
                  <text x="585" y="185" fill="#cbd5e1" fontSize="8">Zero RAM buffering bottlenecks!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SUBPROCESS RUNNER LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Subprocess Command Runner Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select system tasks, toggle execution modes, configure timeout and encoding options, and inspect live subprocess execution telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Task Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Target System Task:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "PYTHON_VERSION", label: "1. python -V" },
                    { id: "GIT_HASH", label: "2. git commit hash" },
                    { id: "STREAM_WORKER", label: "3. Popen live stream" },
                    { id: "PIPE_CHAIN", label: "4. p1 | p2 pipe chain" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTask(t.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        selectedTask === t.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={enableCheck}
                    onChange={(e) => setEnableCheck(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enforce `check=True`</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={hasTimeout}
                    onChange={(e) => setHasTimeout(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Timeout `timeout=3.0`</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={isTextMode}
                    onChange={(e) => setIsTextMode(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Decode `text=True`</span>
                </label>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center">
                  ✅ Zero-Injection Token List
                </div>
              </div>

              {/* Safety Badge */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Execution Invariant:</div>
                <div className="text-teal-300 text-[11px]">
                  Direct OS Execution via <code className="text-cyan-300">CreateProcess / execve</code>. Shell interpreter bypassed.
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python subprocess Execution Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Process Telemetry Stream:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {simulatedOutput}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER SUBPROCESS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `subprocess` Function &amp; Parameter Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function / Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Return / Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`subprocess.run()`</td>
                  <td className="py-3 px-4 text-slate-200">Execution</td>
                  <td className="py-3 px-4 text-emerald-400">`CompletedProcess`</td>
                  <td className="py-3 px-4">Synchronous blocking command execution</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`subprocess.Popen()`</td>
                  <td className="py-3 px-4 text-slate-200">Execution</td>
                  <td className="py-3 px-4 text-cyan-300">`Popen` instance</td>
                  <td className="py-3 px-4">Asynchronous background process &amp; live streaming</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`check=True`</td>
                  <td className="py-3 px-4 text-slate-200">Validation</td>
                  <td className="py-3 px-4 text-rose-400">Raises `CalledProcessError`</td>
                  <td className="py-3 px-4">Enforcing exit code 0 success</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`timeout=seconds`</td>
                  <td className="py-3 px-4 text-slate-200">Safety Guard</td>
                  <td className="py-3 px-4 text-rose-400">Raises `TimeoutExpired`</td>
                  <td className="py-3 px-4">Killing hung or frozen external processes</td>
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
            Explore 4 production-grade Python scripts demonstrating subprocess.run execution, Popen streams, pipe chaining, and institutional microservice health runners:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "subprocess_run_synchronous_execution.py",
                code: runCode,
                description: "subprocess.run, CompletedProcess, check=True, timeouts, and shell injection prevention.",
              },
              {
                filename: "subprocess_popen_asynchronous_streams.py",
                code: popenCode,
                description: "Popen, real-time streaming, communicate, and process lifecycle polling.",
              },
              {
                filename: "subprocess_unix_pipes_and_chaining.py",
                code: pipesCode,
                description: "Process chaining, piping stdout to stdin, and pipe descriptor lifecycle.",
              },
              {
                filename: "institutional_automated_service_health_and_cli_runner.py",
                code: healthRunnerCode,
                description: "Subprocess command runner, timeout protection, and health reporting.",
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
                <span>❌</span> Trap 1: Shell Injection Vulnerability
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-rose-300 font-mono">shell=True</code> with formatted strings allows attackers to chain arbitrary commands with <code className="text-slate-300 font-mono">;</code> or <code className="text-slate-300 font-mono">&amp;&amp;</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always pass token lists (<code className="text-emerald-300">['cmd', arg]</code>).
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Forgetting `text=True`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Omitting <code className="text-amber-300 font-mono">text=True</code> leaves <code className="text-slate-300 font-mono">stdout</code> as raw bytes (<code className="text-slate-300 font-mono">b'...'</code>), breaking string operations like <code className="text-slate-300 font-mono">.split()</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always specify <code className="text-emerald-300">text=True</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Pipe Buffer Exhaustion Deadlock
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">proc.wait()</code> on a process with large output without draining <code className="text-purple-300 font-mono">stdout.PIPE</code> causes permanent deadlock!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">proc.communicate()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Hardcoding "python" vs `sys.executable`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Invoking <code className="text-cyan-300 font-mono">["python", "script.py"]</code> might execute the host system Python instead of your active virtualenv.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">[sys.executable, "script.py"]</code>.
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
            Comprehensive question-and-answer repository covering subprocess.run, Popen streams, check=True, timeouts, pipes, and injection defense:
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
            Download or print the complete reference sheet with subprocess execution recipes, Popen patterns, and pipeline templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_subprocess_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
