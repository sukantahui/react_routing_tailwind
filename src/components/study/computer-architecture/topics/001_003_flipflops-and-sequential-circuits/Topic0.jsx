import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Introduction to Sequential Circuits: Combinational vs Sequential Logic, Memory Concept & Feedback Mechanisms
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component illustrating the fundamental differences
 *                        between Combinational and Sequential circuits with memory feedback architectures.
 */
const Topic0 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("comb-vs-seq");
  const [circuitType, setCircuitType] = useState("combinational"); // "combinational" vs "sequential"
  
  // Interactive Simulator States
  const [combInputA, setCombInputA] = useState(false);
  const [combInputB, setCombInputB] = useState(false);

  // Sequential Mode States
  const [seqDataIn, setSeqDataIn] = useState(1);
  const [storedCount, setStoredCount] = useState(0);
  const [clkActive, setClkActive] = useState(false);

  const sectionRefs = useRef([]);

  // Pulse Clock for Sequential Mode
  const pulseClock = () => {
    setClkActive(true);
    setTimeout(() => {
      setStoredCount((prev) => (prev + seqDataIn) % 16);
      setClkActive(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        .reveal-section {
          transform: translateY(0);
          transition: transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 0</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Introduction to Sequential Circuits: Combinational vs Sequential Logic &amp; Memory Feedback
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand the architectural divide between memoryless combinational logic and state-driven sequential systems.
            Explore how positive feedback loops create digital memory in silicon.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ⚡ Memoryless Feedforward vs State-Driven Feedback
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              🔒 Bistable Memory Loop Mechanics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⏱️ Synchronous Master Clock Coordination
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Finite State Machine (FSM) Synthesis
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Combinational vs Sequential Logic
              </h2>
              <p className="text-xs text-slate-400">
                Why does computing require memory, and how do feedback loops allow circuits to remember?
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> Combinational Logic: The Memoryless Worker
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In a combinational circuit (such as an Adder or Multiplexer), the output at any microsecond depends <strong>solely on the inputs present right now</strong>.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  Output Y = f(Present Inputs X) · Zero Memory of Past Operations
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As soon as the inputs change or disconnect, the previous output disappears instantly. It cannot count, store variables, or execute multi-step algorithms.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Key Analogy:</strong> <em>"Combinational logic is like a mirror — it reflects what is in front of it right now, but forgets everything the moment you walk away!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                  <span>🧠</span> Sequential Logic: The Memory-Driven Brain
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  A sequential circuit combines logic gates with <strong>memory storage elements (Flip-Flops)</strong> and a circular feedback loop.
                </p>
                <div className="my-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 font-mono text-xs text-cyan-200 text-center font-bold">
                  Output Y = f(Inputs X, Present State Q) &nbsp;|&nbsp; Next State Q' = g(Inputs X, Present State Q)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Its output depends on both what you give it now AND what happened previously. This enables digital counting, CPU program counters, and Finite State Machines (FSMs).
                </p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                ✨ <strong>Silicon Reality:</strong> <em>"Feedback is what turns static logic into dynamic computational intelligence!"</em>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Architectural Diagrams Section ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Architecture Comparison
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("comb-vs-seq")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "comb-vs-seq"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Combinational vs Sequential Block Architecture
              </button>
              <button
                onClick={() => setActiveDiagramTab("feedback-loop")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "feedback-loop"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. The Feedback Memory Mechanism
              </button>
              <button
                onClick={() => setActiveDiagramTab("timing-comparison")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "timing-comparison"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Clock Synchronization Waveforms
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: Combinational vs Sequential Architecture ── */}
            {activeDiagramTab === "comb-vs-seq" && (
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  Block Diagram Comparison: Pure Combinational Logic vs Feedback Sequential Circuit
                </span>
                
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 380" className="w-full h-auto text-xs font-mono select-none">
                    {/* ═══ TOP HALF: COMBINATIONAL CIRCUIT ═══ */}
                    <g transform="translate(0, 20)">
                      <rect x="30" y="0" width="880" height="130" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="50" y="25" fill="#14b8a6" fontWeight="bold" fontSize="13">A. COMBINATIONAL CIRCUIT (Memoryless · No Clock · Feedforward Only)</text>
                      
                      {/* Inputs */}
                      <text x="60" y="70" fill="#cbd5e1" fontWeight="bold">Inputs X₁, X₂..Xₙ</text>
                      <line x1="180" y1="65" x2="320" y2="65" stroke="#14b8a6" strokeWidth="2.5" />
                      <polygon points="320,60 335,65 320,70" fill="#14b8a6" />

                      {/* Logic Block */}
                      <rect x="335" y="40" width="270" height="60" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <text x="470" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="14">COMBINATIONAL LOGIC</text>
                      <text x="470" y="85" fill="#5eead4" textAnchor="middle" fontSize="11">Logic Gates: AND, OR, NOT, XOR</text>

                      {/* Outputs */}
                      <line x1="605" y1="65" x2="740" y2="65" stroke="#22c55e" strokeWidth="2.5" />
                      <polygon points="740,60 755,65 740,70" fill="#22c55e" />
                      <text x="765" y="70" fill="#22c55e" fontWeight="bold">Outputs Y = f(X)</text>
                    </g>

                    {/* ═══ BOTTOM HALF: SEQUENTIAL CIRCUIT ═══ */}
                    <g transform="translate(0, 180)">
                      <rect x="30" y="0" width="880" height="180" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="50" y="25" fill="#38bdf8" fontWeight="bold" fontSize="13">B. SEQUENTIAL CIRCUIT (Memory Elements · Positive Feedback · Clock Synchronized)</text>

                      {/* External Inputs */}
                      <text x="60" y="65" fill="#cbd5e1" fontWeight="bold">Inputs X₁, X₂..Xₙ</text>
                      <line x1="180" y1="60" x2="300" y2="60" stroke="#38bdf8" strokeWidth="2.5" />
                      <polygon points="300,55 315,60 300,65" fill="#38bdf8" />

                      {/* Combinational Logic Block */}
                      <rect x="315" y="40" width="220" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="425" y="65" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="13">COMBINATIONAL LOGIC</text>
                      <text x="425" y="85" fill="#7dd3fc" textAnchor="middle" fontSize="10">Generates Next State &amp; Output</text>

                      {/* Primary Outputs */}
                      <line x1="535" y1="60" x2="740" y2="60" stroke="#22c55e" strokeWidth="2.5" />
                      <polygon points="740,55 755,60 740,65" fill="#22c55e" />
                      <text x="765" y="65" fill="#22c55e" fontWeight="bold">Outputs Y = f(X, Q)</text>

                      {/* Next State Line to Memory */}
                      <line x1="425" y1="110" x2="425" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
                      <line x1="425" y1="135" x2="600" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
                      <polygon points="600,130 615,135 600,140" fill="#f59e0b" />
                      <text x="510" y="130" fill="#f59e0b" textAnchor="middle" fontSize="10">Next State Q'</text>

                      {/* Memory Elements / Flip-Flops */}
                      <rect x="615" y="105" width="180" height="60" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <text x="705" y="130" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="12">MEMORY ELEMENTS</text>
                      <text x="705" y="150" fill="#c084fc" textAnchor="middle" fontSize="10">Flip-Flops (Gated by &gt;CLK)</text>

                      {/* Feedback Loop from Memory back to Combinational Inputs */}
                      <polyline points="795,135 830,135 830,165 240,165 240,80 315,80" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
                      <polygon points="310,75 325,80 310,85" fill="#a855f7" />
                      <text x="535" y="160" fill="#c084fc" textAnchor="middle" fontWeight="bold" fontSize="11">Feedback Path: Present State Q(t)</text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 2: The Feedback Memory Mechanism ────────── */}
            {activeDiagramTab === "feedback-loop" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  How Positive Feedback Creates 1-Bit Bistable Static Memory
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 260" className="w-full h-auto text-xs font-mono select-none">
                    {/* Top Inverter / NAND */}
                    <g transform="translate(340, 40)">
                      <rect width="100" height="50" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <text x="50" y="30" fill="#14b8a6" textAnchor="middle" fontWeight="bold">Inverter 1 (NAND)</text>
                    </g>

                    {/* Bottom Inverter / NAND */}
                    <g transform="translate(340, 160)">
                      <rect width="100" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="50" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Inverter 2 (NAND)</text>
                    </g>

                    {/* Forward Line Top to Output Q */}
                    <line x1="440" y1="65" x2="600" y2="65" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="520" cy="65" r="4" fill="#22c55e" />
                    <text x="615" y="70" fill="#22c55e" fontSize="16" fontWeight="bold">Q = 1</text>

                    {/* Forward Line Bottom to Output Q_bar */}
                    <line x1="440" y1="185" x2="600" y2="185" stroke="#a855f7" strokeWidth="3" />
                    <circle cx="520" cy="185" r="4" fill="#a855f7" />
                    <text x="615" y="190" fill="#a855f7" fontSize="16" fontWeight="bold">Q̄ = 0</text>

                    {/* Feedback Trace Q to Inverter 2 */}
                    <polyline points="520,65 520,110 260,110 260,185 340,185" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Feedback Trace Q_bar to Inverter 1 */}
                    <polyline points="520,185 520,140 280,140 280,65 340,65" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />

                    <text x="470" y="240" fill="#94a3b8" textAnchor="middle" fontSize="11">
                      Continuous Circular Reinforcement: Output Q=1 forces Q̄=0, which in turn reinforces Q=1 indefinitely!
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Clock Synchronization Waveforms ──────── */}
            {activeDiagramTab === "timing-comparison" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Timing Difference: Immediate Combinational Output vs Synchronous Clock-Edge Updates
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 200" className="w-full h-auto text-xs font-mono select-none">
                    <text x="40" y="45" fill="#38bdf8" fontWeight="bold">Master Clock (CLK)</text>
                    <polyline points="180,50 250,50 250,20 320,20 320,50 390,50 390,20 460,20 460,50 530,50 530,20 600,20 600,50 850,50" fill="none" stroke="#38bdf8" strokeWidth="2" />

                    <text x="40" y="95" fill="#f59e0b" fontWeight="bold">Input X(t) [Asynchronous]</text>
                    <polyline points="180,100 280,100 280,70 420,70 420,100 500,100 500,70 850,70" fill="none" stroke="#f59e0b" strokeWidth="2" />

                    <text x="40" y="145" fill="#14b8a6" fontWeight="bold">Combinational Out (Instant)</text>
                    <polyline points="180,150 285,150 285,120 425,120 425,150 505,150 505,120 850,120" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                    <text x="40" y="185" fill="#22c55e" fontWeight="bold">Sequential Out (On Clock ↑)</text>
                    <polyline points="180,190 320,190 320,165 460,165 460,190 600,190 600,165 850,165" fill="none" stroke="#22c55e" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Dual-Architecture Simulator ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Dual-Architecture Simulator Workbench
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Architecture Mode Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Circuit Architecture:</span>
                <button
                  onClick={() => setCircuitType("combinational")}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                    circuitType === "combinational"
                      ? "bg-teal-900/80 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  1. Combinational Mode (XOR Adder)
                </button>
                <button
                  onClick={() => setCircuitType("sequential")}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                    circuitType === "sequential"
                      ? "bg-cyan-900/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  2. Sequential Mode (Accumulator Register)
                </button>
              </div>

              {/* Dynamic Controls */}
              <div className="flex flex-wrap gap-3">
                {circuitType === "combinational" ? (
                  <>
                    <button
                      onClick={() => setCombInputA(!combInputA)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                        combInputA ? "bg-teal-900/80 border-teal-400 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      Input A: {combInputA ? "1" : "0"}
                    </button>
                    <button
                      onClick={() => setCombInputB(!combInputB)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                        combInputB ? "bg-teal-900/80 border-teal-400 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      Input B: {combInputB ? "1" : "0"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSeqDataIn(seqDataIn === 1 ? 2 : 1)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950 border border-slate-700 text-slate-300 hover:border-cyan-500 transition"
                    >
                      Increment Step: +{seqDataIn}
                    </button>
                    <button
                      onClick={pulseClock}
                      className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 transition-all flex items-center gap-2"
                    >
                      <span>⏱️</span> PULSE CLOCK (↑)
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Readout Displays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Architecture Type</span>
                <div className="text-sm font-mono font-bold text-teal-300">
                  {circuitType === "combinational" ? "Memoryless Feedforward" : "Clocked Sequential State"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Output Dependency</span>
                <div className="text-sm font-mono font-bold text-cyan-300">
                  {circuitType === "combinational" ? "Y = f(A, B) [Instant]" : "Count = Count + Step [On Clock]"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                <span className="text-xs text-emerald-400 block mb-1">Real-time Computed Output</span>
                <div className="text-2xl font-mono font-extrabold text-white">
                  {circuitType === "combinational"
                    ? `Sum = ${combInputA ^ combInputB ? "1" : "0"}`
                    : `State Q = ${storedCount}`}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40">
                <span className="text-xs text-purple-400 block mb-1">Memory Retained</span>
                <div className="text-2xl font-mono font-extrabold text-purple-300">
                  {circuitType === "combinational" ? "0 Bits (None)" : `Stored: ${storedCount.toString(2).padStart(4, '0')}b`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Comprehensive Comparison Matrix ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Feature Comparison: Combinational vs Sequential Logic
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-3.5">Feature Metric</th>
                  <th className="p-3.5 text-teal-300">Combinational Logic</th>
                  <th className="p-3.5 text-cyan-300">Sequential Logic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Output Dependency</td>
                  <td className="p-3.5">Present inputs only</td>
                  <td className="p-3.5 text-cyan-300 font-bold">Present inputs + Past stored state</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Memory Storage</td>
                  <td className="p-3.5">No storage elements (memoryless)</td>
                  <td className="p-3.5 text-emerald-300 font-bold">Flip-Flops &amp; Latches (SRAM)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Feedback Loops</td>
                  <td className="p-3.5">Strictly feedforward (no loops)</td>
                  <td className="p-3.5 text-purple-300 font-bold">Closed positive feedback paths</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Clock Signal Requirement</td>
                  <td className="p-3.5">Not required (asynchronous)</td>
                  <td className="p-3.5 text-amber-300 font-bold">Required for synchronous systems</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Design Representation</td>
                  <td className="p-3.5">Truth Tables, K-Maps, Boolean Algebra</td>
                  <td className="p-3.5 text-teal-300 font-bold">State Diagrams, State Tables, FSMs</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Standard Examples</td>
                  <td className="p-3.5">Adders, Decoders, Multiplexers, ALUs</td>
                  <td className="p-3.5 text-cyan-300 font-bold">Registers, Counters, CPU Sequencers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 6. Real-World Engineering Scenarios ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    BARRACKPORE TRAFFIC AUTOMATION
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Junction</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Sequential Traffic Light Controller</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata designed an intelligent 4-way traffic controller in Barrackpore. Because the green signal must follow a strict timed sequence (North &rarr; East &rarr; South &rarr; West), pure combinational logic is insufficient; sequential state registers advance on 30-second clock intervals.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                100% Deterministic Multi-Phase Traffic FSM
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    JADAVPUR PROCESSOR DESIGN
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">CPU Datapath Partitioning</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu partitioned an experimental RISC processor: combinational logic computes arithmetic instructions in the ALU, while sequential registers (PC, IR, Accumulator) hold state between clock cycles.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                Perfect Separation of Compute vs State
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Senior Pitfalls & Best Practices ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Unintended Combinational Feedback Loops:</strong>
                Accidentally routing a combinational gate output back into its input without a clock-gated register creates an uncontrolled ring oscillator that overheats silicon chips.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Assuming Combinational Logic Can Count:</strong>
                An adder cannot increment a variable in-place without a sequential register to capture and freeze the sum on clock edges.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Enforce Synchronous Clock Boundaries:</strong>
                Always place flip-flops at input and output boundaries of combinational blocks to establish clear setup/hold timing margins.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Separate Next-State Logic from State Storage:</strong>
                Structure HDL modules with separate combinational blocks for next-state logic and synchronous always-blocks for register updates.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Combinational vs Sequential Circuits FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 9. Printable Plain Text Note ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Sequential Circuits"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In all my digital systems and computer architecture lectures at Barrackpore, I always ask: Can a calculator remember your bank balance without sequential memory? " +
              "Combinational logic computes the arithmetic, but sequential logic stores the result. Mastering the feedback mechanism is your first step into understanding CPUs and microprocessors!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 0 · Combinational vs Sequential Logic · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic0;
