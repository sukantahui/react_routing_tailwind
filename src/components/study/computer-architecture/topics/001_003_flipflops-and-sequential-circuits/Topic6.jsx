import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Level-Sensitive vs Edge-Triggered Devices: Positive edge, negative edge, timing diagram comparison, why edge triggering is important
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with multi-tabbed vector schematic suite,
 *                        live simulation workbench, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [clkState, setClkState] = useState(0); // 0: Low, 1: High, 2: PosEdge, 3: NegEdge
  const [dInput, setDInput] = useState(0);     // 0 or 1
  
  // Simulated device states
  const [posLatchQ, setPosLatchQ] = useState(0);
  const [negLatchQ, setNegLatchQ] = useState(0);
  const [posEdgeFFQ, setPosEdgeFFQ] = useState(0);
  const [negEdgeFFQ, setNegEdgeFFQ] = useState(0);
  const [eventLog, setEventLog] = useState([
    "System Initialized. All registers set to 0."
  ]);

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

  // Live simulation update logic
  const handleSimTrigger = (newClkState, newDInput) => {
    setClkState(newClkState);
    setDInput(newDInput);

    let nextPosLatch = posLatchQ;
    let nextNegLatch = negLatchQ;
    let nextPosEdgeFF = posEdgeFFQ;
    let nextNegEdgeFF = negEdgeFFQ;
    let logMsg = "";

    if (newClkState === 1) { // CLK = HIGH
      nextPosLatch = newDInput; // Transparent
      logMsg = `CLK is HIGH level (1). Pos-Level Latch is TRANSPARENT (Q -> ${newDInput}). Edge FF ignored.`;
    } else if (newClkState === 0) { // CLK = LOW
      nextNegLatch = newDInput; // Transparent
      logMsg = `CLK is LOW level (0). Neg-Level Latch is TRANSPARENT (Q -> ${newDInput}). Edge FF ignored.`;
    } else if (newClkState === 2) { // Rising Edge (0 -> 1)
      nextPosLatch = newDInput;
      nextPosEdgeFF = newDInput;
      logMsg = `⚡ RISING EDGE (0 -> 1) detected! Positive-Edge FF captures D = ${newDInput}. Pos-Latch transparent.`;
    } else if (newClkState === 3) { // Falling Edge (1 -> 0)
      nextNegLatch = newDInput;
      nextNegEdgeFF = newDInput;
      logMsg = `⚡ FALLING EDGE (1 -> 0) detected! Negative-Edge FF captures D = ${newDInput}. Neg-Latch transparent.`;
    }

    setPosLatchQ(nextPosLatch);
    setNegLatchQ(nextNegLatch);
    setPosEdgeFFQ(nextPosEdgeFF);
    setNegEdgeFFQ(nextNegEdgeFF);

    setEventLog((prev) => [logMsg, ...prev.slice(0, 7)]);
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
            <span>Computer Architecture Masterclass · Module 003 · Topic 6</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Level-Sensitive vs Edge-Triggered Devices: Positive Edge, Negative Edge &amp; Timing Diagrams
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand the critical distinction between duration-sensitive latches and transition-sensitive flip-flops. Discover why edge triggering powers modern microprocessors, pipelined CPUs, and high-frequency digital systems.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔓 Level-Sensitivity &amp; Transparency
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚡ Rising (↑) &amp; Falling (↓) Edge Triggers
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⏱️ Timing Aperture (t_su &amp; t_h)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🚀 Pipeline Lockstep &amp; STA Bounds
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
                Teacher's Masterclass: Level-Sensitive Latches vs. Edge-Triggered Flip-Flops
              </h2>
              <p className="text-xs text-slate-400">
                Silicon-level mechanics, transparency hazards, and edge synchronization from first principles
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
                  In sequential digital design, <strong className="text-teal-300">Level-Sensitive Latches</strong> act like an open door—data flows continuously from input <code className="text-teal-300 font-mono">D</code> to output <code className="text-teal-300 font-mono">Q</code> as long as the enable level is active (transparency phase).
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  Latch: Q = D while CLK = 1 &nbsp;|&nbsp; Flip-Flop: Q = D @ CLK Edge Only
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conversely, <strong className="text-cyan-300">Edge-Triggered Flip-Flops</strong> snapshot the input state exclusively during sub-nanosecond clock transitions (rising edge 0→1 or falling edge 1→0), keeping output Q completely immune to mid-pulse input fluctuations.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Rule:</strong> <em>"Use edge-triggered flip-flops whenever feedback exists (Q → ALU → D) or when building synchronous pipelines!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Physical Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine an automated railway ticketing gate at Barrackpore Station:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Level Latch (Open Door):</strong> As long as the gate stays open, multiple passengers walk through uncontrolled, creating overcrowding and counting errors (race condition).
                  </li>
                  <li>
                    <strong className="text-slate-200">Edge Flip-Flop (Turnstile Snapshot):</strong> A turnstile clicks once per token presented, allowing exactly one passenger to pass at a precise instant, regardless of how long they linger.
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon Advantage:</strong> Edge triggering enables deterministic gigahertz CPU clocking!
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
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex-wrap">
              <button
                onClick={() => setActiveDiagramTab("tab1")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab1"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Internal Topology Schematics
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab2")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab2"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. IEEE Standard Symbols
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab3")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab3"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Multi-Signal Waveform Comparison
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  1. Structural Circuit Schematics: Gated D Latch vs Master-Slave D Flip-Flop
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 320" className="w-full h-auto text-xs font-mono select-none">
                    {/* Background Panels */}
                    <rect x="20" y="20" width="430" height="280" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                    <text x="235" y="45" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">LEVEL-SENSITIVE D LATCH (Transparent when EN=1)</text>

                    <rect x="490" y="20" width="430" height="280" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                    <text x="705" y="45" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="14">MASTER-SLAVE EDGE-TRIGGERED D FLIP-FLOP</text>

                    {/* Left: D Latch */}
                    <g transform="translate(40, 70)">
                      <text x="10" y="35" fill="#38bdf8" fontWeight="bold">D</text>
                      <line x1="25" y1="30" x2="80" y2="30" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="25" y1="30" x2="25" y2="130" stroke="#38bdf8" strokeWidth="2" />
                      
                      {/* Inverter for D */}
                      <polygon points="25,130 45,120 45,140" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="50" cy="130" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="53" y1="130" x2="80" y2="130" stroke="#38bdf8" strokeWidth="2" />

                      <text x="10" y="85" fill="#f59e0b" fontWeight="bold">EN</text>
                      <line x1="35" y1="80" x2="80" y2="80" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="60" cy="80" r="3" fill="#f59e0b" />
                      <line x1="60" y1="80" x2="60" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                      <line x1="60" y1="50" x2="80" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                      <line x1="60" y1="80" x2="60" y2="110" stroke="#f59e0b" strokeWidth="1.5" />
                      <line x1="60" y1="110" x2="80" y2="110" stroke="#f59e0b" strokeWidth="1.5" />

                      {/* AND Gates */}
                      <rect x="80" y="25" width="40" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="100" y="46" fill="#cbd5e1" textAnchor="middle" fontSize="10">AND1</text>
                      <rect x="80" y="105" width="40" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="100" y="126" fill="#cbd5e1" textAnchor="middle" fontSize="10">AND2</text>

                      {/* SR Latch Cross Coupled NOR */}
                      <rect x="180" y="30" width="60" height="40" rx="4" fill="#1e293b" stroke="#22c55e" />
                      <text x="210" y="55" fill="#22c55e" textAnchor="middle" fontWeight="bold">NOR 1</text>
                      <rect x="180" y="100" width="60" height="40" rx="4" fill="#1e293b" stroke="#a855f7" />
                      <text x="210" y="125" fill="#a855f7" textAnchor="middle" fontWeight="bold">NOR 2</text>

                      <line x1="120" y1="42" x2="180" y2="42" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="120" y1="122" x2="180" y2="122" stroke="#38bdf8" strokeWidth="2" />

                      <line x1="240" y1="50" x2="350" y2="50" stroke="#22c55e" strokeWidth="2.5" />
                      <text x="365" y="55" fill="#22c55e" fontWeight="bold" fontSize="14">Q</text>
                      <line x1="240" y1="120" x2="350" y2="120" stroke="#a855f7" strokeWidth="2.5" />
                      <text x="365" y="125" fill="#a855f7" fontWeight="bold" fontSize="14">Q̄</text>

                      <text x="190" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">
                        Continuous Feedthrough while EN = 1
                      </text>
                    </g>

                    {/* Right: Master-Slave D Flip-Flop */}
                    <g transform="translate(510, 70)">
                      <rect x="30" y="25" width="130" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="95" y="50" fill="#38bdf8" textAnchor="middle" fontWeight="bold">MASTER LATCH</text>
                      <text x="95" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="10">Active when CLK=0</text>
                      <text x="95" y="90" fill="#94a3b8" textAnchor="middle" fontSize="10">Tracks D input</text>

                      <line x1="160" y1="90" x2="240" y2="90" stroke="#f59e0b" strokeWidth="2.5" />
                      <text x="200" y="80" fill="#f59e0b" textAnchor="middle" fontSize="11" fontWeight="bold">Qm</text>

                      <rect x="240" y="25" width="130" height="130" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <text x="305" y="50" fill="#14b8a6" textAnchor="middle" fontWeight="bold">SLAVE LATCH</text>
                      <text x="305" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="10">Active when CLK=1</text>
                      <text x="305" y="90" fill="#94a3b8" textAnchor="middle" fontSize="10">Latches Qm to Q</text>

                      <line x1="370" y1="90" x2="400" y2="90" stroke="#22c55e" strokeWidth="2.5" />
                      <text x="410" y="95" fill="#22c55e" fontWeight="bold" fontSize="14">Q</text>

                      <text x="200" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">
                        Complementary clocks isolate input from output (No Race-Around)
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  2. IEEE 60617 Standard Logic Symbols &amp; Pinout Notation
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 260" className="w-full h-auto text-xs font-mono select-none">
                    {/* Device 1: D Latch */}
                    <g transform="translate(60, 30)">
                      <rect width="180" height="180" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="90" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">D LATCH</text>
                      <text x="90" y="48" fill="#94a3b8" textAnchor="middle" fontSize="10">(Level-Sensitive)</text>

                      <text x="25" y="85" fill="#cbd5e1" fontSize="12" fontWeight="bold">D</text>
                      <line x1="0" y1="80" x2="20" y2="80" stroke="#38bdf8" strokeWidth="2" />

                      <text x="25" y="135" fill="#f59e0b" fontSize="12" fontWeight="bold">EN</text>
                      <line x1="0" y1="130" x2="20" y2="130" stroke="#f59e0b" strokeWidth="2" />

                      <text x="155" y="85" fill="#22c55e" fontSize="12" fontWeight="bold">Q</text>
                      <line x1="160" y1="80" x2="180" y2="80" stroke="#22c55e" strokeWidth="2" />

                      <text x="155" y="135" fill="#a855f7" fontSize="12" fontWeight="bold">Q̄</text>
                      <line x1="160" y1="130" x2="180" y2="130" stroke="#a855f7" strokeWidth="2" />

                      <text x="90" y="165" fill="#94a3b8" textAnchor="middle" fontSize="9">No &apos;&gt;&apos; symbol at EN pin</text>
                    </g>

                    {/* Device 2: Positive Edge D-FF */}
                    <g transform="translate(380, 30)">
                      <rect width="180" height="180" rx="8" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                      <text x="90" y="30" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="13">+EDGE D FLIP-FLOP</text>
                      <text x="90" y="48" fill="#94a3b8" textAnchor="middle" fontSize="10">(Rising Edge ↑)</text>

                      <text x="25" y="85" fill="#cbd5e1" fontSize="12" fontWeight="bold">D</text>
                      <line x1="0" y1="80" x2="20" y2="80" stroke="#14b8a6" strokeWidth="2" />

                      {/* Dynamic Indicator Triangle > */}
                      <polygon points="20,120 35,130 20,140" fill="none" stroke="#14b8a6" strokeWidth="2" />
                      <text x="42" y="134" fill="#14b8a6" fontSize="11" fontWeight="bold">CLK</text>
                      <line x1="0" y1="130" x2="20" y2="130" stroke="#14b8a6" strokeWidth="2" />

                      <text x="155" y="85" fill="#22c55e" fontSize="12" fontWeight="bold">Q</text>
                      <line x1="160" y1="80" x2="180" y2="80" stroke="#22c55e" strokeWidth="2" />

                      <text x="155" y="135" fill="#a855f7" fontSize="12" fontWeight="bold">Q̄</text>
                      <line x1="160" y1="130" x2="180" y2="130" stroke="#a855f7" strokeWidth="2" />

                      <text x="90" y="165" fill="#14b8a6" textAnchor="middle" fontSize="9">Triangle &apos;&gt;&apos; = Edge Trigger</text>
                    </g>

                    {/* Device 3: Negative Edge D-FF */}
                    <g transform="translate(700, 30)">
                      <rect width="180" height="180" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                      <text x="90" y="30" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="13">-EDGE D FLIP-FLOP</text>
                      <text x="90" y="48" fill="#94a3b8" textAnchor="middle" fontSize="10">(Falling Edge ↓)</text>

                      <text x="25" y="85" fill="#cbd5e1" fontSize="12" fontWeight="bold">D</text>
                      <line x1="0" y1="80" x2="20" y2="80" stroke="#f43f5e" strokeWidth="2" />

                      {/* Bubble o + Triangle > */}
                      <circle cx="12" cy="130" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                      <polygon points="20,120 35,130 20,140" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      <text x="42" y="134" fill="#f43f5e" fontSize="11" fontWeight="bold">CLK</text>
                      <line x1="0" y1="130" x2="7" y2="130" stroke="#f43f5e" strokeWidth="2" />

                      <text x="155" y="85" fill="#22c55e" fontSize="12" fontWeight="bold">Q</text>
                      <line x1="160" y1="80" x2="180" y2="80" stroke="#22c55e" strokeWidth="2" />

                      <text x="155" y="135" fill="#a855f7" fontSize="12" fontWeight="bold">Q̄</text>
                      <line x1="160" y1="130" x2="180" y2="130" stroke="#a855f7" strokeWidth="2" />

                      <text x="90" y="165" fill="#f43f5e" textAnchor="middle" fontSize="9">Bubble &apos;o&apos; + &apos;&gt;&apos; = Neg Edge</text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  3. Multi-Signal Timing Diagram Comparison across Clock Cycles
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 320" className="w-full h-auto text-xs font-mono select-none">
                    {/* Time Grid Guidelines */}
                    <line x1="200" y1="20" x2="200" y2="290" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="360" y1="20" x2="360" y2="290" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="520" y1="20" x2="520" y2="290" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="680" y1="20" x2="680" y2="290" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="840" y1="20" x2="840" y2="290" stroke="#334155" strokeDasharray="3 3" />

                    <text x="200" y="15" fill="#38bdf8" textAnchor="middle" fontSize="10">↑ Edge 1</text>
                    <text x="360" y="15" fill="#f43f5e" textAnchor="middle" fontSize="10">↓ Edge 1</text>
                    <text x="520" y="15" fill="#38bdf8" textAnchor="middle" fontSize="10">↑ Edge 2</text>
                    <text x="680" y="15" fill="#f43f5e" textAnchor="middle" fontSize="10">↓ Edge 2</text>
                    <text x="840" y="15" fill="#38bdf8" textAnchor="middle" fontSize="10">↑ Edge 3</text>

                    {/* Trace 1: CLK */}
                    <text x="20" y="45" fill="#38bdf8" fontWeight="bold">CLK Signal</text>
                    <polyline points="120,50 200,50 200,25 360,25 360,50 520,50 520,25 680,25 680,50 840,50 840,25 900,25" fill="none" stroke="#38bdf8" strokeWidth="2" />

                    {/* Trace 2: Data D Input */}
                    <text x="20" y="95" fill="#cbd5e1" fontWeight="bold">Data Input D</text>
                    <polyline points="120,105 260,105 260,75 600,75 600,105 760,105 760,75 900,75" fill="none" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Trace 3: Pos-Level Latch Q (Transparent when CLK=1) */}
                    <text x="20" y="145" fill="#f59e0b" fontWeight="bold">Q (Pos Latch)</text>
                    <polyline points="120,155 260,155 260,125 360,125 360,155 520,155 520,125 680,125 680,155 760,155 760,155 840,155 840,125 900,125" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x="910" y="130" fill="#f59e0b" fontSize="9">Transparent while CLK=1</text>

                    {/* Trace 4: Pos-Edge FF Q (Updates ONLY on rising edge ↑) */}
                    <text x="20" y="195" fill="#14b8a6" fontWeight="bold">Q (+Edge FF)</text>
                    <polyline points="120,205 520,205 520,175 900,175" fill="none" stroke="#14b8a6" strokeWidth="2.5" />
                    <text x="910" y="180" fill="#14b8a6" fontSize="9">Updates @ ↑ Edge 2 (D=1)</text>

                    {/* Trace 5: Neg-Edge FF Q (Updates ONLY on falling edge ↓) */}
                    <text x="20" y="245" fill="#f43f5e" fontWeight="bold">Q (-Edge FF)</text>
                    <polyline points="120,255 360,255 360,225 680,225 680,255 900,255" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="910" y="230" fill="#f43f5e" fontSize="9">Updates @ ↓ Edge 1 &amp; 2</text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive Workbench: Latch vs. Flip-Flop Simulator
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  1. Set Input Data D:
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSimTrigger(clkState, 0)}
                    className={clsx(
                      "flex-1 py-2 rounded-xl font-mono text-sm font-bold border transition",
                      dInput === 0
                        ? "bg-rose-950 border-rose-600 text-rose-200 shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    D = 0 (LOW)
                  </button>
                  <button
                    onClick={() => handleSimTrigger(clkState, 1)}
                    className={clsx(
                      "flex-1 py-2 rounded-xl font-mono text-sm font-bold border transition",
                      dInput === 1
                        ? "bg-emerald-950 border-emerald-600 text-emerald-200 shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    D = 1 (HIGH)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  2. Apply Clock Level / Edge Transition:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSimTrigger(0, dInput)}
                    className={clsx(
                      "py-2 px-3 rounded-lg font-mono text-xs font-bold border transition",
                      clkState === 0
                        ? "bg-slate-800 border-slate-600 text-slate-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    CLK = 0 (Steady LOW)
                  </button>
                  <button
                    onClick={() => handleSimTrigger(1, dInput)}
                    className={clsx(
                      "py-2 px-3 rounded-lg font-mono text-xs font-bold border transition",
                      clkState === 1
                        ? "bg-amber-950 border-amber-600 text-amber-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    CLK = 1 (Steady HIGH)
                  </button>
                  <button
                    onClick={() => handleSimTrigger(2, dInput)}
                    className="py-2 px-3 rounded-lg font-mono text-xs font-bold bg-teal-950/80 border border-teal-500 text-teal-200 hover:bg-teal-900 transition"
                  >
                    ⚡ Pulse Rising Edge ↑
                  </button>
                  <button
                    onClick={() => handleSimTrigger(3, dInput)}
                    className="py-2 px-3 rounded-lg font-mono text-xs font-bold bg-rose-950/80 border border-rose-500 text-rose-200 hover:bg-rose-900 transition"
                  >
                    ⚡ Pulse Falling Edge ↓
                  </button>
                </div>
              </div>
            </div>

            {/* Live Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Device 1: Pos Level Latch */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block uppercase">
                  Positive Level Latch
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">State Q:</span>
                  <span className={clsx("px-3 py-1 rounded font-mono text-sm font-bold", posLatchQ === 1 ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-slate-900 text-slate-400 border border-slate-800")}>
                    Q = {posLatchQ}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {clkState === 1 ? "🔓 TRANSPARENT (Following D)" : "🔒 OPAQUE (Holding Q)"}
                </p>
              </div>

              {/* Device 2: Neg Level Latch */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block uppercase">
                  Negative Level Latch
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">State Q:</span>
                  <span className={clsx("px-3 py-1 rounded font-mono text-sm font-bold", negLatchQ === 1 ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-slate-900 text-slate-400 border border-slate-800")}>
                    Q = {negLatchQ}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {clkState === 0 ? "🔓 TRANSPARENT (Following D)" : "🔒 OPAQUE (Holding Q)"}
                </p>
              </div>

              {/* Device 3: Pos Edge FF */}
              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block uppercase">
                  Positive Edge D-FF
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">State Q:</span>
                  <span className={clsx("px-3 py-1 rounded font-mono text-sm font-bold", posEdgeFFQ === 1 ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-slate-900 text-slate-400 border border-slate-800")}>
                    Q = {posEdgeFFQ}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {clkState === 2 ? "⚡ CAPTURED on Rising Edge" : "🔒 Holding state constant"}
                </p>
              </div>

              {/* Device 4: Neg Edge FF */}
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 space-y-2">
                <span className="text-xs font-mono text-rose-400 font-bold block uppercase">
                  Negative Edge D-FF
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">State Q:</span>
                  <span className={clsx("px-3 py-1 rounded font-mono text-sm font-bold", negEdgeFFQ === 1 ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-slate-900 text-slate-400 border border-slate-800")}>
                    Q = {negEdgeFFQ}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {clkState === 3 ? "⚡ CAPTURED on Falling Edge" : "🔒 Holding state constant"}
                </p>
              </div>
            </div>

            {/* Event Log */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <span className="text-slate-400 font-bold block uppercase mb-1">Live Execution Trace Log:</span>
              {eventLog.map((log, idx) => (
                <div key={idx} className={idx === 0 ? "text-teal-300 font-bold" : "text-slate-400"}>
                  &gt; {log}
                </div>
              ))}
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
                    BARRACKPORE RAILWAY AUTOMATION
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Industrial Track Interlocking Relay Synchronization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata upgraded railway track controllers at Barrackpore junction. Replacing older level-sensitive transparent latches with positive-edge D flip-flops eliminated false sensor relay trips caused by contact bounce during train track switching.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Zero-Glitch Fail-Safe Operation
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR VLSI RESEARCH LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">250 MHz 5-Stage RISC-V Pipeline Registers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu synthesized a 32-bit RISC-V processor on a Xilinx Artix-7 FPGA. By enforcing positive-edge D flip-flop pipeline registers, instruction data advances cleanly in lockstep across 5 stages with zero setup/hold violations.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Determinstic STA Bounds &amp; Zero Race Hazards
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
                <span>⚠️</span> Common Senior Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Inadvertent Latch Synthesis in Verilog:</strong>
                Omitting an <code className="text-rose-300 font-mono">else</code> branch or incomplete <code className="text-rose-300 font-mono">case</code> statement in a combinational block forces synthesis tools to infer unwanted transparent latches.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Violating Setup (t_su) &amp; Hold (t_h) Windows:</strong>
                Changing data inputs within the forbidden aperture window around the active clock edge traps internal nodes in metastability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• 2-Stage D-FF Synchronizer for Asynchronous Signals:</strong>
                Always pass external inputs (buttons, serial RX) through a 2-stage edge-triggered flip-flop synchronizer chain to resolve metastability before feeding downstream logic.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Global Clock Tree Buffering (BUFG):</strong>
                Route global clock lines through dedicated low-skew clock buffers to keep clock skew <code className="text-emerald-300 font-mono">|t_skew| &lt; 50 ps</code> across large silicon chips.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Level-Sensitive vs Edge-Triggered Devices FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive exam questions & detailed explanations"
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
            title="Level-Sensitive vs Edge-Triggered Devices Master Class Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Remember: A level-sensitive latch is an open door, while an edge-triggered flip-flop is a camera flash! " +
              "When designing digital systems, CPU datapaths, or state machines, edge triggering gives you precision control and lockstep synchronization. Master the timing diagrams!"
            }
          />
        </section>

        {/* ─── 10. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 6 · Level-Sensitive vs Edge-Triggered Devices: Positive edge, negative edge, timing diagram comparison, why edge triggering is important · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic6;
