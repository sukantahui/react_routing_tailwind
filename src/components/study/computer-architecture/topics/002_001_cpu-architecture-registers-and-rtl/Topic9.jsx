import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Accumulator-based vs Stack-based vs General-Register Datapath Organizations
 * Module: 002_001_cpu-architecture-registers-and-rtl (CPU Architecture, Register Files & RTL)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with multi-tabbed vector schematic suite,
 *                        live simulation workbench, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
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
            <span>Computer Architecture Masterclass · Module 001 · Topic 9</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Accumulator-based vs Stack-based vs General-Register Datapath Organizations
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand internal processor bus structures, register file organizations, and register transfer micro-operations.
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
                Teacher's Concept Breakdown: Accumulator-based vs Stack-based vs General-Register Datapath Organizations
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
                  In modern digital computer architectures, <strong className="text-teal-300">Accumulator-based vs Stack-based vs General-Register Datapath Organizations</strong> coordinates data flow and signal synchronization across silicon buses and registers with deterministic propagation delays.
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
                1. CPU Common Bus Datapath Schematic
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
                2. Control Unit Sequencer & Decoder
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
                3. Micro-Operation Timing (T0..T4)
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  1. CPU Common Bus Datapath Schematic
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
          {/* Control Unit */}
          <rect x="30" y="30" width="200" height="270" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="2.5" />
          <text x="130" y="65" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="14">CONTROL UNIT</text>
          <rect x="50" y="85" width="160" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="130" y="107" fill="#cbd5e1" textAnchor="middle">Program Counter (PC)</text>
          <rect x="50" y="130" width="160" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="130" y="152" fill="#cbd5e1" textAnchor="middle">Instruction Reg (IR)</text>
          <rect x="50" y="175" width="160" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="130" y="197" fill="#5eead4" textAnchor="middle">Step Sequencer (T0..T5)</text>
          <text x="130" y="245" fill="#f59e0b" textAnchor="middle" fontSize="11">Control Word: [ Bus Select ]</text>
          <text x="130" y="270" fill="#38bdf8" textAnchor="middle" fontSize="11">[ ALU Function Code ]</text>

          {/* Central System Bus */}
          <line x1="230" y1="160" x2="310" y2="160" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="310,155 325,160 310,165" fill="#38bdf8" />
          <rect x="325" y="20" width="70" height="290" rx="8" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />
          <text x="360" y="160" fill="#38bdf8" textAnchor="middle" transform="rotate(-90 360 160)" fontWeight="bold" fontSize="13">INTERNAL 32-BIT SYSTEM BUS</text>

          {/* Register File */}
          <line x1="395" y1="90" x2="480" y2="90" stroke="#a855f7" strokeWidth="2.5" />
          <polygon points="480,86 490,90 480,94" fill="#a855f7" />
          <rect x="490" y="30" width="200" height="120" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
          <text x="590" y="60" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="13">GENERAL PURPOSE REGISTERS</text>
          <text x="590" y="85" fill="#cbd5e1" textAnchor="middle">R0, R1, R2, R3 (General)</text>
          <text x="590" y="110" fill="#cbd5e1" textAnchor="middle">Accumulator (AC) &amp; SP</text>
          <text x="590" y="135" fill="#e2e8f0" textAnchor="middle" fontSize="10">Tri-State Bus Transceivers</text>

          {/* ALU */}
          <line x1="395" y1="230" x2="480" y2="230" stroke="#22c55e" strokeWidth="2.5" />
          <polygon points="480,226 490,230 480,234" fill="#22c55e" />
          <path d="M 490,175 L 560,175 L 585,205 L 610,175 L 680,175 L 645,285 L 525,285 Z" fill="#1e293b" stroke="#22c55e" strokeWidth="2.5" />
          <text x="585" y="245" fill="#22c55e" textAnchor="middle" fontWeight="bold" fontSize="15">ARITHMETIC LOGIC UNIT</text>
          <text x="585" y="270" fill="#86efac" textAnchor="middle" fontSize="10">Add · Sub · AND · OR · Shift</text>

          {/* Memory Interface */}
          <line x1="680" y1="230" x2="760" y2="230" stroke="#f59e0b" strokeWidth="2.5" />
          <polygon points="760,226 770,230 760,234" fill="#f59e0b" />
          <rect x="770" y="80" width="140" height="170" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="840" y="115" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="13">MEMORY BUS</text>
          <text x="840" y="145" fill="#cbd5e1" textAnchor="middle">MAR (Address)</text>
          <text x="840" y="175" fill="#cbd5e1" textAnchor="middle">MDR (Data Buffer)</text>
          <text x="840" y="210" fill="#fde68a" textAnchor="middle" fontSize="10">L1 Cache / DRAM</text>
        </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  2. Control Unit Sequencer & Decoder
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 240" className="w-full h-auto text-xs font-mono select-none">
          <text x="470" y="35" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="15">Instruction Format Decoding (Opcode &amp; Effective Address)</text>
          <g transform="translate(120, 60)">
            <rect x="0" y="0" width="180" height="60" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
            <text x="90" y="25" fill="#14b8a6" textAnchor="middle" fontWeight="bold">Opcode [31:26]</text>
            <text x="90" y="48" fill="#94a3b8" textAnchor="middle">Operation (ADD, SUB, LW)</text>

            <rect x="180" y="0" width="140" height="60" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="250" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Reg Dest [25:21]</text>
            <text x="250" y="48" fill="#94a3b8" textAnchor="middle">Destination Reg</text>

            <rect x="320" y="0" width="140" height="60" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <text x="390" y="25" fill="#a855f7" textAnchor="middle" fontWeight="bold">Reg Src [20:16]</text>
            <text x="390" y="48" fill="#94a3b8" textAnchor="middle">Source Operand Reg</text>

            <rect x="460" y="0" width="240" height="60" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="580" y="25" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Offset / Immediate [15:0]</text>
            <text x="580" y="48" fill="#94a3b8" textAnchor="middle">16-Bit Sign-Extended Constant</text>
          </g>
          <text x="470" y="165" fill="#cbd5e1" textAnchor="middle" fontSize="12">Effective Address: EA = Base_Reg + (Sign_Ext_Imm &lt;&lt; 2)</text>
          <text x="470" y="195" fill="#22c55e" textAnchor="middle" fontWeight="bold">Single-Cycle Decode &amp; Operand Fetch Guarantee</text>
        </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  3. Micro-Operation Timing (T0..T4)
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
        <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
          <text x="470" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">RTL Execution Timing Cycles (T0..T4 Fetch-Decode-Execute)</text>
          {["T0: MAR <- PC", "T1: MDR <- M[MAR], PC++", "T2: IR <- MDR", "T3: Decode & EA", "T4: ALU Exec & WB"].map((cycle, i) => (
            <g key={i} transform={`translate(${60 + i * 165}, 60)`}>
              <rect width="150" height="110" rx="8" fill="#0f172a" stroke={i === 4 ? "#22c55e" : "#38bdf8"} strokeWidth="2" />
              <text x="75" y="30" fill={i === 4 ? "#22c55e" : "#38bdf8"} textAnchor="middle" fontWeight="bold" fontSize="13">Cycle {i}</text>
              <text x="75" y="60" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">{cycle.split(':')[0]}</text>
              <text x="75" y="85" fill="#cbd5e1" textAnchor="middle" fontSize="10">{cycle.split(':')[1]}</text>
            </g>
          ))}
          <text x="470" y="205" fill="#94a3b8" textAnchor="middle" fontSize="11">Clock-synchronized micro-operations with deterministic register writeback</text>
        </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive Architecture Simulator: Accumulator-based vs Stack-based vs General-Register Datapath Organizations
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
            title="Accumulator-based vs Stack-based vs General-Register Datapath Organizations FAQs"
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
            title="Accumulator-based vs Stack-based vs General-Register Datapath Organizations"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
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
            Topic 9 · Accumulator-based vs Stack-based vs General-Register Datapath Organizations · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic9;
