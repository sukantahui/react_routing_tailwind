import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – D Flip-Flop (Most Important): Circuit Design from SR FF, NAND Schematic, Characteristic Equation, Timing & Applications
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with internal NAND-based circuit schematic,
 *                        block diagram, timing waveforms, live simulator, case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const [dInput, setDInput] = useState(true);
  const [clkInput, setClkInput] = useState(true);
  const [qState, setQState] = useState(true); // Stored state Q
  const [qBarState, setQBarState] = useState(false); // Stored state Q_bar
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-schematic");
  const sectionRefs = useRef([]);

  // Compute D Flip-Flop response when D or CLK changes
  useEffect(() => {
    if (!clkInput) {
      // Clock is LOW (0) -> Memory Hold (No change to Q or Q_bar)
      return;
    }

    // Clock is HIGH (1) -> Latch captures input D directly
    if (dInput) {
      setQState(true);
      setQBarState(false);
    } else {
      setQState(false);
      setQBarState(true);
    }
  }, [dInput, clkInput]);

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

  // Intermediate node signals in 4-NAND + Inverter D Flip-Flop
  const dBar = !dInput; // Inverter output
  const sPrime = !(dInput && clkInput); // Top steering NAND output (active-low trigger)
  const rPrime = !(dBar && clkInput); // Bottom steering NAND output (active-low trigger)

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
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 8</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            D Flip-Flop (Data / Delay): Internal NAND Schematic, Characteristic Equation &amp; Register Storage
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the most critical memory storage element in modern CPU design. Explore how inserting an inverter into an SR Flip-Flop
            permanently eliminates invalid states, inspect the gate-level NAND schematic, and study synchronous register pipelining.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 4-NAND + Inverter Logic Architecture
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              📐 Characteristic Eq: Q(t+1) = D
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🚫 Zero Forbidden States (S·R = 0 Guaranteed)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Foundation of CPU Registers &amp; SRAM
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
                Teacher's Concept Breakdown: Why the D Flip-Flop Is the Queen of Memory
              </h2>
              <p className="text-xs text-slate-400">
                How an inverter between S and R created the most reliable storage unit in computer engineering
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> The SR Flip-Flop Solution
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In a Clocked SR Flip-Flop, if software or a hardware glitch ever caused <code className="text-rose-300 font-mono">S = 1</code> and <code className="text-rose-300 font-mono">R = 1</code> simultaneously, the chip crashed into metastability.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  S = D &amp; R = D̄ &rarr; S · R = D · D̄ = 0 (ALWAYS SAFE!)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By tying input <code className="text-teal-300 font-mono">D</code> directly to Set and its inverted signal <code className="text-teal-300 font-mono">D̄</code> to Reset, the invalid state becomes mathematically impossible!
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Whatever is on the D input when the clock strikes is exactly what is stored inside the register. Pure, simple, and fail-safe!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Computer Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine a high-speed camera shutter in a Salt Lake semiconductor fabrication plant:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Data Input (D):</strong> The live scene passing in front of the lens.
                  </li>
                  <li>
                    <strong className="text-slate-200">Clock Pulse (CLK):</strong> The camera shutter click. At the exact instant the shutter snaps, the picture is captured into memory (<strong className="text-teal-300">Q = D</strong>) and remains frozen until the next click!
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Architectural Role:</strong> Every register in x86, ARM, and RISC-V processors uses D Flip-Flops to hold binary data!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Comprehensive Diagrams Section (NAND Schematic + Block Symbol + Waveform) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Timing Diagrams
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("nand-schematic")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "nand-schematic"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. NAND Gate Schematic
              </button>
              <button
                onClick={() => setActiveDiagramTab("block-diagram")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "block-diagram"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Block Diagram Symbol
              </button>
              <button
                onClick={() => setActiveDiagramTab("timing-waveform")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "timing-waveform"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Timing Waveforms
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: Internal NAND Gate Schematic ─────────── */}
            {activeDiagramTab === "nand-schematic" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Gate-Level Internal Schematic (4 NAND Gates + Inverter)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Interactive Reactive Signal Tracing</span>
                </div>
                <p className="text-xs text-slate-300">
                  Data input <code className="text-teal-300 font-mono">D</code> directly feeds top steering NAND 1, while its inverted signal <code className="text-rose-300 font-mono">D̄</code> feeds bottom steering NAND 2. Both are gated by <code className="text-cyan-300 font-mono">CLK</code> into cross-coupled storage NANDs 3 &amp; 4:
                </p>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                    {/* ─── Input D (Data) ─────────────────────────── */}
                    <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">D (Data)</text>
                    <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                    {/* D Main Line to Gate 1 */}
                    <line x1="100" y1="60" x2="280" y2="60" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                    
                    {/* D Branch Drop to Inverter */}
                    <circle cx="170" cy="60" r="3.5" fill="#14b8a6" />
                    <line x1="170" y1="60" x2="170" y2="255" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                    <line x1="170" y1="255" x2="195" y2="255" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                    {/* Inverter (NOT Gate) */}
                    <polygon points="195,242 225,255 195,268" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                    <circle cx="230" cy="255" r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                    <text x="207" y="259" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">NOT</text>
                    <text x="210" y="285" fill={dBar ? "#f43f5e" : "#64748b"} fontSize="11" fontWeight="bold" textAnchor="middle">
                      D̄ = {dBar ? "1" : "0"}
                    </text>
                    {/* Inverter Output to Gate 2 */}
                    <line x1="235" y1="255" x2="280" y2="255" stroke={dBar ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                    {/* ─── Input CLK (Clock) ──────────────────────── */}
                    <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock)</text>
                    <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                    <line x1="100" y1="155" x2="130" y2="155" stroke={clkInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <circle cx="130" cy="155" r="3.5" fill="#38bdf8" />
                    {/* CLK Branch UP to Gate 1 */}
                    <line x1="130" y1="155" x2="130" y2="85" stroke={clkInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="85" x2="280" y2="85" stroke={clkInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    {/* CLK Branch DOWN to Gate 2 */}
                    <line x1="130" y1="155" x2="130" y2="225" stroke={clkInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="225" x2="280" y2="225" stroke={clkInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                    {/* ─── Steering Stage (NAND 1 & NAND 2) ───────── */}
                    {/* Gate 1 (Top Steering NAND) */}
                    <g transform="translate(280, 45)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
                    </g>

                    {/* Gate 2 (Bottom Steering NAND) */}
                    <g transform="translate(280, 215)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
                    </g>

                    {/* S' Wire (Gate 1 Output to Gate 3 Input) */}
                    <line x1="355" y1="75" x2="560" y2="75" stroke={sPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                    <text x="450" y="62" fill={sPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                      S' = ~(D·CLK) [{sPrime ? "1" : "0"}]
                    </text>

                    {/* R' Wire (Gate 2 Output to Gate 4 Input) */}
                    <line x1="355" y1="245" x2="560" y2="245" stroke={rPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                    <text x="450" y="270" fill={rPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                      R' = ~(D̄·CLK) [{rPrime ? "1" : "0"}]
                    </text>

                    {/* ─── Latch Storage Stage (NAND 3 & NAND 4) ───── */}
                    {/* Gate 3 (Top Cross-Coupled NAND) */}
                    <g transform="translate(560, 45)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 3</text>
                    </g>

                    {/* Gate 4 (Bottom Cross-Coupled NAND) */}
                    <g transform="translate(560, 215)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 4</text>
                    </g>

                    {/* Output Q Wire */}
                    <line x1="635" y1="75" x2="840" y2="75" stroke={qState ? "#22c55e" : "#64748b"} strokeWidth="3" />
                    <circle cx="720" cy="75" r="4" fill="#22c55e" />
                    <text x="855" y="80" fill={qState ? "#22c55e" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {qState ? "1" : "0"}
                    </text>

                    {/* Output Q̄ Wire */}
                    <line x1="635" y1="245" x2="840" y2="245" stroke={qBarState ? "#a855f7" : "#64748b"} strokeWidth="3" />
                    <circle cx="700" cy="245" r="4" fill="#a855f7" />
                    <text x="855" y="250" fill={qBarState ? "#a855f7" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q̄ = {qBarState ? "1" : "0"}
                    </text>

                    {/* ─── Cross-Coupled Feedback Loops ──────────── */}
                    {/* Feedback from Q to Gate 4 Input 1 (y=225) */}
                    <polyline
                      points="720,75 720,130 490,175 490,225 560,225"
                      fill="none"
                      stroke={qState ? "#22c55e" : "#475569"}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Feedback from Q̄ to Gate 3 Input 2 (y=95) */}
                    <polyline
                      points="700,245 700,190 510,145 510,95 560,95"
                      fill="none"
                      stroke={qBarState ? "#a855f7" : "#475569"}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 2: Standard Block Diagram Symbol ─────────── */}
            {activeDiagramTab === "block-diagram" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  IEEE Standard Logic Symbol (Edge-Triggered D Flip-Flop)
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 800 250" className="w-full h-auto text-xs font-mono select-none">
                    {/* Asynchronous Preset at Top */}
                    <text x="400" y="25" fill="#f59e0b" textAnchor="middle" fontWeight="bold">PRESET̄ (Active-Low Async Set)</text>
                    <line x1="400" y1="32" x2="400" y2="60" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="400" cy="56" r="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

                    {/* Data Input D */}
                    <text x="140" y="105" fill="#14b8a6" fontWeight="bold" fontSize="14">D (Data Input)</text>
                    <line x1="260" y1="100" x2="330" y2="100" stroke="#14b8a6" strokeWidth="3" />

                    {/* Clock Input with Dynamic Triangle */}
                    <text x="140" y="165" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock Edge)</text>
                    <line x1="260" y1="160" x2="330" y2="160" stroke="#38bdf8" strokeWidth="3" />

                    {/* IC Body */}
                    <rect x="330" y="60" width="160" height="150" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    {/* Clock Triangle */}
                    <polygon points="330,150 345,160 330,170" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <text x="410" y="125" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="16">D FLIP-FLOP</text>
                    <text x="410" y="145" fill="#94a3b8" textAnchor="middle" fontSize="10">Edge-Triggered</text>

                    {/* Output Q */}
                    <line x1="490" y1="100" x2="570" y2="100" stroke="#22c55e" strokeWidth="3" />
                    <polygon points="570,95 585,100 570,105" fill="#22c55e" />
                    <text x="600" y="105" fill="#22c55e" fontSize="15" fontWeight="bold">Q (Stored State)</text>

                    {/* Output Q_bar */}
                    <circle cx="494" cy="160" r="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                    <line x1="498" y1="160" x2="570" y2="160" stroke="#a855f7" strokeWidth="3" />
                    <polygon points="570,155 585,160 570,165" fill="#a855f7" />
                    <text x="600" y="165" fill="#a855f7" fontSize="15" fontWeight="bold">Q̄ (Complement)</text>

                    {/* Asynchronous Clear at Bottom */}
                    <circle cx="400" cy="214" r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                    <line x1="400" y1="218" x2="400" y2="240" stroke="#f43f5e" strokeWidth="2" />
                    <text x="400" y="248" fill="#f43f5e" textAnchor="middle" fontWeight="bold">CLEAR̄ (Active-Low Async Reset)</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Timing Waveform Diagram ───────────────── */}
            {activeDiagramTab === "timing-waveform" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Timing Parameters: Setup Time (t_su), Hold Time (t_h) &amp; Propagation Delay (t_pd)
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 800 240" className="w-full h-auto text-xs font-mono select-none">
                    {/* Clock Signal */}
                    <text x="30" y="45" fill="#38bdf8" fontWeight="bold">CLK</text>
                    <polyline points="100,50 180,50 180,20 260,20 260,50 340,50 340,20 420,20 420,50 500,50 500,20 580,20 580,50 660,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    {/* Rising Edge Dashed Lines */}
                    <line x1="180" y1="10" x2="180" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="340" y1="10" x2="340" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="500" y1="10" x2="500" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Data Input D Signal */}
                    <text x="30" y="115" fill="#14b8a6" fontWeight="bold">Data (D)</text>
                    <polyline points="100,120 140,120 150,90 300,90 310,120 460,120 470,90 660,90" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                    {/* Setup / Hold Window Markers on Edge 1 */}
                    <rect x="150" y="10" width="30" height="210" fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="165" y="75" fill="#5eead4" fontSize="10" textAnchor="middle">t_su</text>
                    <rect x="180" y="10" width="25" height="210" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="192" y="75" fill="#f59e0b" fontSize="10" textAnchor="middle">t_h</text>

                    {/* Output Q Signal with Propagation Delay */}
                    <text x="30" y="185" fill="#22c55e" fontWeight="bold">Output (Q)</text>
                    <polyline points="100,190 195,190 205,160 355,160 365,190 515,190 525,160 660,160" fill="none" stroke="#22c55e" strokeWidth="3" />

                    {/* t_pd marker */}
                    <line x1="180" y1="175" x2="205" y2="175" stroke="#22c55e" strokeWidth="2" />
                    <text x="192" y="150" fill="#86efac" fontSize="10" textAnchor="middle">t_pd</text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive D Flip-Flop Simulator ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live D Flip-Flop Simulator Workbench
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Input Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Toggle Circuit Inputs:
              </span>
              <div className="flex flex-wrap gap-3">
                {/* CLK Button */}
                <button
                  onClick={() => setClkInput(!clkInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    clkInput
                      ? "bg-cyan-900/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  )}
                >
                  CLK: {clkInput ? "1 (CLOCK HIGH / ACTIVE)" : "0 (CLOCK LOW / FROZEN)"}
                </button>

                {/* D Button */}
                <button
                  onClick={() => setDInput(!dInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    dInput
                      ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50"
                      : "bg-rose-950/80 border-rose-800 text-rose-300"
                  )}
                >
                  D (Data Bit): {dInput ? "1 (HIGH / SET)" : "0 (LOW / RESET)"}
                </button>
              </div>
            </div>

            {/* Circuit State Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Inverter Output (D̄)</span>
                <div className="text-lg font-mono font-bold text-rose-300">
                  D̄ = {dBar ? "1" : "0"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Steering Gating Lines (S' / R')</span>
                <div className="text-sm font-mono font-bold text-slate-300">
                  S'={sPrime ? "1" : "0"} | R'={rPrime ? "1" : "0"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                <span className="text-xs text-emerald-400 block mb-1">Stored Output Q</span>
                <div className="text-2xl font-mono font-extrabold text-white">
                  Q = {qState ? "1" : "0"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40">
                <span className="text-xs text-purple-400 block mb-1">Complementary Output Q̄</span>
                <div className="text-2xl font-mono font-extrabold text-purple-300">
                  Q̄ = {qBarState ? "1" : "0"}
                </div>
              </div>
            </div>

            {/* Operating State Banner */}
            <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800 text-teal-200 text-xs flex items-center justify-between">
              <span>
                🟢 <strong>Current Operational State:</strong>{" "}
                {!clkInput
                  ? "MEMORY HOLD (Clock Low: Stored output Q is locked and immune to D transitions)"
                  : dInput
                  ? "SET STATE (Clock High: Storing Data Bit Q = 1, Q̄ = 0)"
                  : "RESET STATE (Clock High: Storing Data Bit Q = 0, Q̄ = 1)"}
              </span>
              <span className="font-mono text-[11px] text-teal-400">100% Deterministic</span>
            </div>
          </div>
        </section>

        {/* ─── 5. Truth Table & Excitation Formulation ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Truth Table, Characteristic Equation &amp; Excitation Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Truth Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
                D Flip-Flop Truth Table
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">CLK</th>
                      <th className="p-2.5">D</th>
                      <th className="p-2.5">Q(t+1)</th>
                      <th className="p-2.5">Q̄(t+1)</th>
                      <th className="p-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className={clsx(!clkInput && "bg-cyan-950/40 text-cyan-200 font-bold")}>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">X</td>
                      <td className="p-2.5">Q(t)</td>
                      <td className="p-2.5">Q̄(t)</td>
                      <td className="p-2.5 text-slate-400">Memory Hold (No Change)</td>
                    </tr>
                    <tr className={clsx(clkInput && !dInput && "bg-rose-950/40 text-rose-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5 text-rose-400 font-bold">0</td>
                      <td className="p-2.5 text-purple-400">1</td>
                      <td className="p-2.5 text-rose-300">Reset State (Stores 0)</td>
                    </tr>
                    <tr className={clsx(clkInput && dInput && "bg-emerald-950/40 text-emerald-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-emerald-400 font-bold">1</td>
                      <td className="p-2.5 text-purple-400">0</td>
                      <td className="p-2.5 text-emerald-300">Set State (Stores 1)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Characteristic & Excitation Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-2">
                  Characteristic Equation &amp; Synthesis
                </h3>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center mb-3">
                  <span className="text-xs text-slate-500 block mb-1">Characteristic Equation:</span>
                  <strong className="text-base text-amber-300">
                    Q(t+1) = D
                  </strong>
                  <span className="text-[11px] text-slate-400 block mt-1">Direct Data Transfer</span>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Excitation Table (Sequential Synthesis):
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-2">Q(t) &rarr; Q(t+1)</th>
                        <th className="p-2">Required D Input</th>
                        <th className="p-2">Synthesis Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="p-2 font-bold text-teal-400">0 &rarr; 0</td>
                        <td className="p-2 text-rose-400 font-bold">0</td>
                        <td className="p-2 text-slate-500">Hold 0 (Apply D=0)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">0 &rarr; 1</td>
                        <td className="p-2 text-emerald-400 font-bold">1</td>
                        <td className="p-2 text-slate-500">Set to 1 (Apply D=1)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">1 &rarr; 0</td>
                        <td className="p-2 text-rose-400 font-bold">0</td>
                        <td className="p-2 text-slate-500">Reset to 0 (Apply D=0)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">1 &rarr; 1</td>
                        <td className="p-2 text-emerald-400 font-bold">1</td>
                        <td className="p-2 text-slate-500">Hold 1 (Apply D=1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Real-World Engineering Scenarios (West Bengal) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    SALT LAKE VLSI CORE
                  </span>
                  <span className="text-xs text-slate-400">Sector V Tech Park</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">64-Bit RISC-V Pipeline Stage Register</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata engineered 64-bit wide execution registers in Salt Lake Sector V using edge-triggered D flip-flops with clock-gating cells, buffering ALU results between the EX and MEM pipeline stages at 1.2 GHz clock rates.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                1.2 GHz Pipelined Data Ingestion
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Divide-by-2 Clock Prescaler for UART Sampling</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu created a frequency divider by connecting Q̄ back to D on a single D flip-flop, converting a 100 MHz oscillator input down to an exact 50 MHz square wave with a 50% duty cycle for serial telemetry transceivers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Exact 50% Duty Cycle Frequency Halver
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
                <strong className="text-rose-200 block mb-1">• Confusing D Latches with D Flip-Flops:</strong>
                A D Latch is transparent the entire time CLK is HIGH (passing noise directly to Q). A true D Flip-Flop updates only during the rising clock edge!
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Violating Setup Time (t_su):</strong>
                Changing input D within the setup window before the clock rising edge traps the feedback loop in voltage oscillation and causes metastability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Add Dual-Flop Synchronizers for Asynchronous Inputs:</strong>
                When capturing external signals from buttons or serial buses, pass data through two cascaded D flip-flops to guarantee MTBF (Mean Time Between Failures) exceeding 100 years.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Synchronous Reset Integration:</strong>
                Gating data input with active-low reset (D_actual = D · Reset_n) avoids asynchronous race conditions during power cycling.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="D Flip-Flop FAQs"
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
            title="D Flip-Flop (Data / Delay)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In my computer architecture classes at Barrackpore, I tell my students: If you open up an Intel Core i9 or Apple M3 silicon die, you will find billions of D Flip-Flops. " +
              "By connecting the inverter between S and R, the D Flip-Flop solved the invalid state problem and gave humanity reliable digital memory. " +
              "Always remember its golden equation: Q(next) = D!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 8 · D Flip-Flop · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic8;
