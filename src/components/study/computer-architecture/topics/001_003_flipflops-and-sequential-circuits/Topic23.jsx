import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic23_files/topic23_questions";
import noteText from "./topic23_files/topic23_note.txt?raw";

/**
 * Topic23 – Modulus (MOD) Concept: Designing mod-n counters, truncation techniques
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with multi-tabbed vector schematic suite,
 *                        live simulation workbench, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic23 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [simStep, setSimStep] = useState(1);
  const sectionRefs = useRef([]);

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
            <span>Computer Architecture Masterclass · Module 003 · Topic 23</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Modulus (MOD) Concept: Designing mod-n counters, truncation techniques
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the sequential building blocks of digital memory, timing control, and state machine control units.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 Hardware Circuit Schematic
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⏱️ Timing &amp; Invariants
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🔄 State Transitions &amp; Buses
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Production Silicon Synthesis
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
                Teacher's Concept Breakdown: Modulus (MOD) Concept: Designing mod-n counters, truncation techniques
              </h2>
              <p className="text-xs text-slate-400">
                Understanding computer architecture fundamentals and silicon-level mechanics from first principles
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> Hardware Implementation Reality
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In modern digital computer architectures, <strong className="text-teal-300">Modulus (MOD) Concept: Designing mod-n counters, truncation techniques</strong> coordinates data flow and signal synchronization across silicon buses and registers with deterministic propagation delays.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  Zero Glitch Architecture · Deterministic State Transitions
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By adhering to strict setup/hold times and bus arbitration protocols, hardware guarantees exact execution semantics across millions of concurrent cycles.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Hardware performance is the product of clean datapath layout, minimal critical path delay, and cache locality!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Engineering Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine an automated railway freight terminal in Barrackpore:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Synchronized Routing:</strong> Trains are switched between parallel tracks strictly according to master clock signals.
                  </li>
                  <li>
                    <strong className="text-slate-200">Interlock Protection:</strong> Hardware lockouts prevent concurrent write conflicts and hazardous race conditions.
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon Advantage:</strong> High instruction throughput with 100% data integrity!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematic & Architectural Suite ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Timing Diagrams
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("tab1")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab1"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. NAND Gate Flip-Flop Circuit Schematic
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab2")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab2"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Standard IEEE Symbol & Pinout
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab3")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab3"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Clock Timing & Setup/Hold Waveforms
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  1. NAND Gate Flip-Flop Circuit Schematic
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
          {/* Inputs */}
          <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">Input (J / D / S)</text>
          <circle cx="110" cy="60" r="4" fill="#14b8a6" />
          <line x1="110" y1="60" x2="280" y2="60" stroke="#14b8a6" strokeWidth="2.5" />

          <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock)</text>
          <circle cx="110" cy="155" r="4" fill="#38bdf8" />
          <line x1="110" y1="155" x2="140" y2="155" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="140" cy="155" r="3.5" fill="#38bdf8" />
          <line x1="140" y1="155" x2="140" y2="85" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="140" y1="85" x2="280" y2="85" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="140" y1="155" x2="140" y2="225" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="140" y1="225" x2="280" y2="225" stroke="#38bdf8" strokeWidth="2.5" />

          <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">Input (K / D̄ / R)</text>
          <circle cx="110" cy="255" r="4" fill="#f43f5e" />
          <line x1="110" y1="255" x2="280" y2="255" stroke="#f43f5e" strokeWidth="2.5" />

          {/* Steering NAND 1 */}
          <g transform="translate(280, 45)">
            <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
            <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
            <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
          </g>

          {/* Steering NAND 2 */}
          <g transform="translate(280, 215)">
            <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
          </g>

          {/* Interconnect Wires */}
          <line x1="355" y1="75" x2="560" y2="75" stroke="#10b981" strokeWidth="2.5" />
          <text x="450" y="62" fill="#10b981" fontWeight="bold" textAnchor="middle">S' = ~(Input · CLK)</text>

          <line x1="355" y1="245" x2="560" y2="245" stroke="#10b981" strokeWidth="2.5" />
          <text x="450" y="270" fill="#10b981" fontWeight="bold" textAnchor="middle">R' = ~(Input · CLK)</text>

          {/* Storage NAND 3 */}
          <g transform="translate(560, 45)">
            <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 3</text>
          </g>

          {/* Storage NAND 4 */}
          <g transform="translate(560, 215)">
            <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 4</text>
          </g>

          {/* Output Q Wire */}
          <line x1="635" y1="75" x2="840" y2="75" stroke="#22c55e" strokeWidth="3" />
          <circle cx="720" cy="75" r="4" fill="#22c55e" />
          <text x="855" y="80" fill="#22c55e" fontSize="17" fontWeight="bold">Q (Output)</text>

          {/* Output Q̄ Wire */}
          <line x1="635" y1="245" x2="840" y2="245" stroke="#a855f7" strokeWidth="3" />
          <circle cx="700" cy="245" r="4" fill="#a855f7" />
          <text x="855" y="250" fill="#a855f7" fontSize="17" fontWeight="bold">Q̄ (Complement)</text>

          {/* Cross-Coupled Feedback Loops */}
          <polyline points="720,75 720,130 490,175 490,225 560,225" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />
          <polyline points="700,245 700,190 510,145 510,95 560,95" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  2. Standard IEEE Symbol & Pinout
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 240" className="w-full h-auto text-xs font-mono select-none">
          <rect x="180" y="30" width="580" height="180" rx="12" fill="#0f172a" stroke="#14b8a6" strokeWidth="2.5" />
          <text x="470" y="60" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="16">SYNCHRONOUS NAND FLIP-FLOP / REGISTER IC</text>
          
          <g transform="translate(220, 80)">
            <rect width="180" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
            <text x="90" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Data Inputs</text>
            <text x="90" y="60" fill="#cbd5e1" textAnchor="middle">D / JK / T Pins</text>
            <text x="90" y="85" fill="#94a3b8" textAnchor="middle" fontSize="10">Active-High Gating</text>
          </g>

          <g transform="translate(540, 80)">
            <rect width="180" height="110" rx="8" fill="#1e293b" stroke="#22c55e" />
            <text x="90" y="30" fill="#22c55e" textAnchor="middle" fontWeight="bold">Storage Outputs</text>
            <text x="90" y="60" fill="#86efac" textAnchor="middle">Q &amp; Q̄ (Complement)</text>
            <text x="90" y="85" fill="#bbf7d0" textAnchor="middle" fontSize="10">Glitch-Free Latching</text>
          </g>

          <text x="470" y="140" fill="#cbd5e1" textAnchor="middle" fontSize="12">&gt;CLK Dynamic Edge Triggering</text>
        </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  3. Clock Timing & Setup/Hold Waveforms
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 200" className="w-full h-auto text-xs font-mono select-none">
          <text x="40" y="45" fill="#38bdf8" fontWeight="bold">CLK Signal</text>
          <polyline points="150,50 250,50 250,20 400,20 400,50 550,50 550,20 700,20 700,50 850,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          <text x="40" y="105" fill="#14b8a6" fontWeight="bold">Data Input</text>
          <polyline points="150,110 230,110 230,80 500,80 500,110 850,110" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

          <text x="40" y="165" fill="#22c55e" fontWeight="bold">Output Q</text>
          <polyline points="150,170 260,170 260,140 560,140 560,170 850,170" fill="none" stroke="#22c55e" strokeWidth="3" />

          {/* Setup / Hold markers */}
          <line x1="230" y1="15" x2="230" y2="185" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="250" y1="15" x2="250" y2="185" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          <text x="240" y="12" fill="#f59e0b" textAnchor="middle" fontSize="9">t_su</text>
        </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive Architecture Simulator: Modulus (MOD) Concept: Designing mod-n counters, truncation techniques
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Execution Phase / Clock Cycle:
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSimStep(step)}
                    className={clsx(
                      "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                      simStep === step
                        ? "bg-teal-900/80 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    Phase {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 font-mono text-xs font-bold border border-teal-800">
                  EXECUTION PHASE {simStep} OF 4
                </span>
                <span className="text-xs text-slate-500 font-mono">Hardware State T+{simStep}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {simStep === 1 && "Phase 1: Signal Conditioning & Input Ingestion"}
                {simStep === 2 && "Phase 2: Datapath Decoding & Logic Evaluation"}
                {simStep === 3 && "Phase 3: State Storage & Memory Interface Strobe"}
                {simStep === 4 && "Phase 4: Output Stabilization & Verification"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {simStep === 1 && "Signals are ingested from input pins and stabilized against ground bounce and setup timing constraints."}
                {simStep === 2 && "Combinational logic gates and internal buses evaluate control lines to compute intermediate signals."}
                {simStep === 3 && "Bistable registers latch stable binary states on the active clock edge."}
                {simStep === 4 && "Outputs drive downstream data buses and status flags are committed cleanly."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Real-World Engineering Scenarios ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE AUTOMATION
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Industrial Real-Time Process Automation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata deployed high-reliability industrial controllers in Barrackpore. Implementing hardware synchronization eliminated race conditions across ₹45 Lakh automated assembly lines.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Deterministic SIL-4 Reliability
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR EMBEDDED LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Speed Microprocessor Signal Routing</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu analyzed clock skew across 32-bit register buses on custom FPGA prototypes, ensuring setup and hold times were met at 200 MHz clock frequencies.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-Nanosecond Clock Skew Precision
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Senior Pitfalls & Best Practices ────────────── */}
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
                <strong className="text-rose-200 block mb-1">• Violating Setup and Hold Time Windows:</strong>
                Changing data inputs too close to the active clock edge traps the storage element in metastability, resulting in unpredictable output oscillations.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Uncontrolled Bus Contention:</strong>
                Enabling multiple tri-state drivers simultaneously causes high short-circuit currents and severe thermal stress on silicon chips.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Synchronous Reset Architectures:</strong>
                Always prefer synchronous reset lines over asynchronous resets to prevent spurious resets triggered by EMI noise spikes.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Decoupling Capacitors &amp; Power Planes:</strong>
                Place 0.1 µF bypass capacitors adjacent to every IC power pin to suppress switching transients during high-frequency clock edges.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Modulus (MOD) Concept: Designing mod-n counters, truncation techniques FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 8. Printable Plain Text Note ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Modulus (MOD) Concept: Designing mod-n counters, truncation techniques"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic23_note.txt"
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In computer architecture and digital systems engineering, hardware diagrams are the blueprints of truth. " +
              "Always trace signal paths from input pins through combinational logic and registers to output buses. When you can visualize the timing diagram in your mind, digital architecture becomes second nature!"
            }
          />
        </section>

        {/* ─── 10. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 23 · Modulus (MOD) Concept: Designing mod-n counters, truncation techniques · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic23;
