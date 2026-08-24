import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import timeitFundCode from "./topic2_files/timeit_fundamentals_and_execution_modes.py?raw";
import idiomShootoutsCode from "./topic2_files/timeit_syntax_and_idiom_shootouts.py?raw";
import harnessCode from "./topic2_files/timeit_cli_and_parameterized_benchmarking.py?raw";
import admissionSuiteCode from "./topic2_files/institutional_admission_pipeline_microbenchmark_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Benchmarking code with timeit module
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("repeatArch");

  // Interactive Laboratory State
  const [shootoutType, setShootoutType] = useState("STRINGS"); // STRINGS | LISTS | DICTS | EMPTINESS
  const [iterations, setIterations] = useState(100000);

  let contestantA = { name: "f-string", timeMs: "4.82 ms", isWinner: true, speedup: "1.0x (Fastest)" };
  let contestantB = { name: "'+' Concatenation", timeMs: "9.64 ms", isWinner: false, speedup: "2.0x Slower" };
  let contestantC = { name: "'.format()'", timeMs: "18.35 ms", isWinner: false, speedup: "3.8x Slower" };

  if (shootoutType === "LISTS") {
    contestantA = { name: "List Comprehension", timeMs: "12.40 ms", isWinner: true, speedup: "1.0x (Fastest)" };
    contestantB = { name: "map() + Lambda", timeMs: "19.85 ms", isWinner: false, speedup: "1.6x Slower" };
    contestantC = { name: "for loop + append()", timeMs: "26.90 ms", isWinner: false, speedup: "2.2x Slower" };
  } else if (shootoutType === "DICTS") {
    contestantA = { name: "{} Literal", timeMs: "3.20 ms", isWinner: true, speedup: "1.0x (Fastest)" };
    contestantB = { name: "dict() Constructor", timeMs: "9.60 ms", isWinner: false, speedup: "3.0x Slower" };
    contestantC = { name: "dict.fromkeys()", timeMs: "11.20 ms", isWinner: false, speedup: "3.5x Slower" };
  } else if (shootoutType === "EMPTINESS") {
    contestantA = { name: "if not seq: (Truthy)", timeMs: "2.10 ms", isWinner: true, speedup: "1.0x (Fastest)" };
    contestantB = { name: "if len(seq) == 0:", timeMs: "7.35 ms", isWinner: false, speedup: "3.5x Slower" };
    contestantC = { name: "if seq == []:", timeMs: "14.80 ms", isWinner: false, speedup: "7.0x Slower" };
  }

  const generatedPythonSnippet = `# Python timeit Benchmark Shootout:
import timeit

loops = ${iterations.toLocaleString()}
repeats = 5

# Benchmark Contestants (Taking mathematical min to filter OS noise):
best_a = min(timeit.repeat("${
    shootoutType === "STRINGS"
      ? "f'{name}'"
      : shootoutType === "LISTS"
      ? "[x*x for x in range(100)]"
      : shootoutType === "DICTS"
      ? "{'a': 1, 'b': 2}"
      : "if not seq: pass"
  }", setup="${
    shootoutType === "STRINGS"
      ? "name = 'Sourav'"
      : shootoutType === "EMPTINESS"
      ? "seq = []"
      : "pass"
  }", number=loops, repeat=repeats))

best_b = min(timeit.repeat("${
    shootoutType === "STRINGS"
      ? "'Student: ' + name"
      : shootoutType === "LISTS"
      ? "list(map(lambda x: x*x, range(100)))"
      : shootoutType === "DICTS"
      ? "dict(a=1, b=2)"
      : "if len(seq) == 0: pass"
  }", setup="${
    shootoutType === "STRINGS"
      ? "name = 'Sourav'"
      : shootoutType === "EMPTINESS"
      ? "seq = []"
      : "pass"
  }", number=loops, repeat=repeats))

print(f"Winner: {best_a:.6f}s vs Slower: {best_b:.6f}s")`;

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
            Segment 4 • Module 004_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Micro-Benchmarking: <span className="text-teal-400">The timeit Module</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master high-precision statistical micro-benchmarking in Python: isolating execution overhead with <code className="text-teal-300 font-mono">timeit.timeit()</code> and <code className="text-cyan-300 font-mono">timeit.repeat()</code>, filtering OS context-switch noise with <code className="text-emerald-400 font-mono">min()</code>, disabling garbage collection during microsecond runs, and dissecting CPython bytecode with <code className="text-purple-300 font-mono">dis.dis()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏱️ `timeit.repeat()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ OS Noise Filtering (`min`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔬 Bytecode Disassembly (`dis`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Python Idiom Shootouts
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: TIMEIT FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⏱️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Principles of Micro-Benchmarking Accuracy
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Micro-benchmarking measures nanosecond and microsecond statement execution speeds. Standard wall-clock timers like <code className="text-rose-400 font-mono">time.time()</code> are completely flawed for microsecond code:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Setup Isolation</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">setup="import math"</code>
                <p className="text-[11px] text-slate-300">
                  Executes module imports and dataset creation once before the timer starts, measuring only target statement cost.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ GC Suspension</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">gc.disable()</code>
                <p className="text-[11px] text-slate-300">
                  Temporarily freezes cyclic garbage collection during timing loops to prevent random multi-millisecond timing spikes.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Statistical Minimum</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">min(repeat_results)</code>
                <p className="text-[11px] text-slate-300">
                  Filters out operating system background context switches. The fastest pass represents true baseline capability.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Why `min()` is Statistically Superior to `average()` in Benchmarks
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Code cannot execute faster than its optimal limit in hardware. Slower passes are corrupted by OS interrupts, CPU throttling, and cache misses. Taking <code className="text-teal-300 font-mono">min(timeit.repeat())</code> isolates pure execution capability without OS contamination.
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
                2. Visualizing timeit Repetitions, String Formatting &amp; Bytecode
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("repeatArch")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "repeatArch"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Noise Filtering
              </button>
              <button
                onClick={() => setActiveInteractiveTab("stringShootout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "stringShootout"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                String Shootout
              </button>
              <button
                onClick={() => setActiveInteractiveTab("bytecodeDiff")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "bytecodeDiff"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bytecode Disassembly
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining repeat pass filtering, string formatting execution paths, and virtual machine bytecode comparisons:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "repeatArch" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">TIMEIT REPEAT PIPELINE: FILTERING OS CONTEXT-SWITCH NOISE</text>

                {/* 5 Repeat Passes */}
                <g transform="translate(30, 50)">
                  {/* Pass 1 */}
                  <rect x="0" y="0" width="150" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">Pass 1: Baseline</text>
                  <text x="15" y="60" fill="#34d399" fontSize="9 font-mono">0.0482s</text>
                  <text x="15" y="90" fill="#34d399" fontSize="8 font-bold">★ TRUE MINIMUM</text>
                  <text x="15" y="115" fill="#cbd5e1" fontSize="8">Clean CPU pass.</text>
                  <text x="15" y="130" fill="#cbd5e1" fontSize="8">Zero OS interrupts.</text>

                  {/* Pass 2 */}
                  <rect x="165" y="0" width="150" height="240" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="180" y="30" fill="#94a3b8" fontSize="11 font-bold">Pass 2: Jitter</text>
                  <text x="180" y="60" fill="#cbd5e1" fontSize="9 font-mono">0.0514s</text>
                  <text x="180" y="90" fill="#f59e0b" fontSize="8">+6.6% OS Noise</text>
                  <text x="180" y="115" fill="#cbd5e1" fontSize="8">Minor L2 cache miss.</text>

                  {/* Pass 3 */}
                  <rect x="330" y="0" width="150" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="345" y="30" fill="#fda4af" fontSize="11 font-bold">Pass 3: Spike</text>
                  <text x="345" y="60" fill="#fca5a5" fontSize="9 font-mono">0.0682s</text>
                  <text x="345" y="90" fill="#f43f5e" fontSize="8 font-bold">+41.4% Corrupted</text>
                  <text x="345" y="115" fill="#cbd5e1" fontSize="8">OS Context switch</text>
                  <text x="345" y="130" fill="#cbd5e1" fontSize="8">to background task.</text>

                  {/* Pass 4 */}
                  <rect x="495" y="0" width="150" height="240" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="510" y="30" fill="#94a3b8" fontSize="11 font-bold">Pass 4: Normal</text>
                  <text x="510" y="60" fill="#cbd5e1" fontSize="9 font-mono">0.0489s</text>
                  <text x="510" y="90" fill="#38bdf8" fontSize="8">+1.4% Variance</text>
                  <text x="510" y="115" fill="#cbd5e1" fontSize="8">Clean execution.</text>

                  {/* Pass 5 */}
                  <rect x="660" y="0" width="160" height="240" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="675" y="30" fill="#94a3b8" fontSize="11 font-bold">Pass 5: Jitter</text>
                  <text x="675" y="60" fill="#cbd5e1" fontSize="9 font-mono">0.0498s</text>
                  <text x="675" y="90" fill="#f59e0b" fontSize="8">+3.3% Variance</text>
                  <text x="675" y="115" fill="#cbd5e1" fontSize="8">Normal jitter.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "stringShootout" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">STRING FORMATTING BENCHMARK SHOOTOUT (1,000,000 EXECUTIONS)</text>

                {/* 3 Contestant Bars */}
                <g transform="translate(30, 50)">
                  {/* f-string */}
                  <rect x="0" y="0" width="820" height="65" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="28" fill="#a7f3d0" fontSize="11 font-bold">1. f-string: `f'Student: {name}'` [WINNER - FASTEST]</text>
                  <text x="20" y="48" fill="#34d399" fontSize="9 font-mono">Latency: 4.82 ms | C opcodes: `FORMAT_VALUE` + `BUILD_STRING` (Zero function overhead)</text>

                  {/* '+' concat */}
                  <rect x="0" y="80" width="820" height="65" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="108" fill="#a5f3fc" fontSize="11 font-bold">2. `+` Concatenation: `'Student: ' + name` [2.0x SLOWER]</text>
                  <text x="20" y="128" fill="#38bdf8" fontSize="9 font-mono">Latency: 9.64 ms | C opcodes: `BINARY_OP_ADD_UNICODE`</text>

                  {/* .format() */}
                  <rect x="0" y="160" width="820" height="65" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="188" fill="#fda4af" fontSize="11 font-bold">3. `.format()`: `'Student: {}'.format(name)` [3.8x SLOWER]</text>
                  <text x="20" y="208" fill="#fca5a5" fontSize="9 font-mono">Latency: 18.35 ms | Method lookup + positional arg parsing in Python frame</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">BYTECODE DISASSEMBLY: `{}` LITERAL VS `dict()` CONSTRUCTOR</text>

                {/* Left: Literal */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`{'a': 1}` Literal [FAST OPCODES]</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. LOAD_CONST 1 ('a')</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. LOAD_CONST 2 (1)</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">3. BUILD_MAP 1 (Instant C instantiation)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Zero Global Lookups:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Constructs hash table directly in 1 virtual machine step.</text>
                </g>

                {/* Right: Constructor */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`dict(a=1)` Constructor [SLOW OVERHEAD]</text>

                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. LOAD_NAME 0 ('dict') (Search globals &amp; builtins)</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. LOAD_CONST 1 (1)</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">3. CALL_FUNCTION_KW 1 (Creates function frame)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Function Frame Cost:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Global dictionary search + keyword tuple packing.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TIMEIT LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Idiom Micro-Benchmark Shootout Lab
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select syntax idiom shootouts, adjust iteration loop counts, and inspect empirical execution timings and speedup multiples:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Shootout Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Python Idiom Shootout:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "STRINGS", label: "1. String Formatting" },
                    { id: "LISTS", label: "2. List Construction" },
                    { id: "DICTS", label: "3. Dict {} vs dict()" },
                    { id: "EMPTINESS", label: "4. Emptiness Checks" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShootoutType(s.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        shootoutType === s.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loop Count */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Benchmark Iterations (Loops):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[10000, 100000, 1000000].map((count) => (
                    <button
                      key={count}
                      onClick={() => setIterations(count)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        iterations === count
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {count.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shootout Scorecards */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center bg-emerald-950/40 p-2 rounded border border-emerald-800/60">
                  <span className="text-emerald-300 font-bold">🥇 {contestantA.name}:</span>
                  <span className="text-emerald-400 font-bold">{contestantA.timeMs} ({contestantA.speedup})</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">🥈 {contestantB.name}:</span>
                  <span className="text-amber-400">{contestantB.timeMs} ({contestantB.speedup})</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">🥉 {contestantC.name}:</span>
                  <span className="text-rose-400">{contestantC.timeMs} ({contestantC.speedup})</span>
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated timeit Benchmark Script:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonSnippet}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Micro-Benchmark Telemetry:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {`[TIMEIT_HARNESS] Running ${iterations.toLocaleString()} loops x 5 repeats:
* Winner   : ${contestantA.name} (${contestantA.timeMs})
* Runner-Up: ${contestantB.name} (${contestantB.timeMs})
* Protocol : Cyclic GC disabled; OS jitter filtered via min().`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER TIMEIT MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Python Syntax Speed Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Fast Idiom (Winner)</th>
                  <th className="py-3.5 px-4 font-bold">Slow Idiom (Avoid)</th>
                  <th className="py-3.5 px-4 font-bold">Typical Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">String Formatting</td>
                  <td className="py-3 px-4 text-emerald-400">`f"{a} {b}"` (f-string)</td>
                  <td className="py-3 px-4 text-rose-400">`"{}".format(a, b)`</td>
                  <td className="py-3 px-4 text-emerald-400">~3.5x faster</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Dictionary Creation</td>
                  <td className="py-3 px-4 text-emerald-400">`{}` Literal (`BUILD_MAP`)</td>
                  <td className="py-3 px-4 text-rose-400">`dict()` Constructor</td>
                  <td className="py-3 px-4 text-cyan-300">~3.0x faster</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">List Filtering</td>
                  <td className="py-3 px-4 text-emerald-400">`[x for x in seq if c]`</td>
                  <td className="py-3 px-4 text-rose-400">`for x in seq: res.append(x)`</td>
                  <td className="py-3 px-4 text-purple-300">~2.2x faster</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Emptiness Check</td>
                  <td className="py-3 px-4 text-emerald-400">`if not seq:` (C truthiness)</td>
                  <td className="py-3 px-4 text-rose-400">`if len(seq) == 0:`</td>
                  <td className="py-3 px-4 text-emerald-400">~3.5x faster</td>
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
            Explore 4 production-grade Python scripts demonstrating timeit fundamentals, syntax shootouts, auto-scaled CLI harnesses, and institutional transformation suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "timeit_fundamentals_and_execution_modes.py",
                code: timeitFundCode,
                description: "timeit.timeit, timeit.repeat, min filtering, and functools.partial wrappers.",
              },
              {
                filename: "timeit_syntax_and_idiom_shootouts.py",
                code: idiomShootoutsCode,
                description: "Idiom shootouts and bytecode disassembly comparisons.",
              },
              {
                filename: "timeit_cli_and_parameterized_benchmarking.py",
                code: harnessCode,
                description: "Timer.autorange, parameterized timeit statements, and microsecond normalization.",
              },
              {
                filename: "institutional_admission_pipeline_microbenchmark_suite.py",
                code: admissionSuiteCode,
                description: "Ingestion pipeline microbenchmarks with statistical variance reporting.",
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
                <span>❌</span> Trap 1: Using `time.time()` for Micro-Tests
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Measuring microsecond loops with <code className="text-rose-300 font-mono">time.time()</code> introduces clock jitter, background OS process noise, and imprecise system resolution.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">timeit.timeit()</code> or <code className="text-emerald-300">timeit.repeat()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Averaging Instead of Taking `min()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Computing the <code className="text-amber-300 font-mono">mean()</code> of repeated benchmark runs includes external OS context-switching spikes rather than true execution speed.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always report <code className="text-emerald-300">min(repeat_times)</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Including Setup in Timed Statement
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Importing modules or instantiating test lists inside the timed statement skews the measurement with repeated allocation overhead.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass imports and initializations to <code className="text-emerald-300">setup=</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Benchmarking Constant Folded Code
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Benchmarking literal math like <code className="text-cyan-300 font-mono">24 * 60 * 60</code> measures zero operations because CPython pre-computes constants at compile time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use variable lookups to force runtime arithmetic.
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
            Comprehensive question-and-answer repository covering timeit execution modes, statistical filtering, GC suspension, bytecode disassembly, and idiom shootouts:
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
            Download or print the complete reference sheet with timeit recipes, syntax speed comparisons, and bytecode disassembly rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_timeit_microbenchmarking_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
