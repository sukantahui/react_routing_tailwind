import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Master-Slave JK Flip-Flop (8-NAND Gate Architecture, Two-Stage Clocking & Race Elimination)
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial showcasing the complete 8-NAND gate schematic,
 *                        cascaded master-slave block diagram, race-around elimination physics, and two-phase simulator.
 */
const Topic10 = () => {
  const [jInput, setJInput] = useState(true);
  const [kInput, setKInput] = useState(true);
  const [clkLevel, setClkLevel] = useState(0); // 0 (LOW), 1 (HIGH)
  const [masterY, setMasterY] = useState(false);
  const [masterYBar, setMasterYBar] = useState(true);
  const [slaveQ, setSlaveQ] = useState(false);
  const [slaveQBar, setSlaveQBar] = useState(true);
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-8gate");
  const [simPhase, setSimPhase] = useState("idle"); // "idle", "master_sampling", "slave_updating"

  const sectionRefs = useRef([]);

  // Phase 1: Clock goes HIGH (Master Samples Inputs)
  const stepClockHigh = () => {
    setClkLevel(1);
    setSimPhase("master_sampling");
    let nextY = masterY;
    if (jInput && kInput) {
      nextY = !slaveQ; // Toggle based on current slave state
    } else if (jInput && !kInput) {
      nextY = true;
    } else if (!jInput && kInput) {
      nextY = false;
    }
    setMasterY(nextY);
    setMasterYBar(!nextY);
  };

  // Phase 2: Clock goes LOW (Slave Copies Master to Output)
  const stepClockLow = () => {
    setClkLevel(0);
    setSimPhase("slave_updating");
    setSlaveQ(masterY);
    setSlaveQBar(!masterY);
  };

  // Full Pulse Automation (HIGH → LOW)
  const pulseFullClock = () => {
    stepClockHigh();
    setTimeout(() => {
      stepClockLow();
      setTimeout(() => setSimPhase("idle"), 500);
    }, 600);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
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
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 10</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Master-Slave JK Flip-Flop: 8-NAND Gate Circuit &amp; Race Elimination
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover the two-stage pulse-triggered Master-Slave architecture. Learn how complementary clocking of 8 NAND gates permanently decouples external inputs from feedback outputs, eliminating race-around oscillation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 8-NAND Gate Silicon Schematic
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⏱️ Two-Phase Clock Isolation (CLK &amp; <span className="overline">CLK</span>)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🛡️ Permanent Race-Around Solution (t_pd &lt; t_pulse)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-purple-300">
              🔄 100% Reliable Toggle Prescaling (f_out = f_in / 2)
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
                Teacher's Concept Breakdown: Why Master-Slave is Imperative in Silicon
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the physics behind race-around oscillation and how complementary two-stage clocking solves it
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Race Hazard Problem */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
                  <span>⚠️</span> The Fatal Flaw: Race-Around Condition in Single JK
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In a single level-triggered JK flip-flop, when <code className="text-teal-300 font-mono">J=1</code> and <code className="text-rose-300 font-mono">K=1</code> and Clock is held HIGH ($CLK=1$), the output $Q$ inverts.
                </p>
                <div className="my-2 p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 font-mono text-xs text-rose-200 text-center font-bold">
                  t_pulse &gt; t_propagation → Output Toggles Continuously (Uncontrolled Ringing)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Because the clock pulse duration ($t_p$) is longer than the gate propagation delay ($t__pd$), the new inverted output feeds right back to the steering inputs, causing $Q$ to toggle 0 → 1 → 0 → 1 repeatedly during a single clock pulse, leaving the final state unpredictable!
                </p>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200">
                ⚡ <strong>Hazard Definition:</strong> <em>"Race-around is the rapid uncontrollable oscillation of output Q when J=K=1 and CLK remains HIGH."</em>
              </div>
            </div>

            {/* The Master-Slave Solution */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> The Master-Slave Architecture Solution
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  We cascade <strong>two separate latches</strong> (Master and Slave) controlled by <strong>complementary clock phases</strong>:
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  CLK = 1: Master ENABLED &amp; Slave DISABLED | CLK = 0: Master DISABLED &amp; Slave ENABLED
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Phase 1 ($CLK=1$):</strong> Master latch accepts inputs $J, K$ and stores intermediate state $Y$. The Slave is locked ($CLK̄=0$), isolating the outputs $Q, Q̄$.</li>
                  <li><strong>Phase 2 ($CLK=0$):</strong> Master is locked, while the Slave enables and copies intermediate state $Y$ to final output $Q$.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Because Master and Slave are never enabled at the exact same instant, the feedback loop is permanently broken during signal updates. Race-around is impossible!"</em>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Hardware Schematics Section ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Dual-Phase Timing
            </h2>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("nand-8gate")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "nand-8gate"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. 8-NAND Gate Circuit Schematic
              </button>
              <button
                onClick={() => setActiveDiagramTab("block-cascade")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "block-cascade"
                    ? "bg-cyan-900/80 border border-cyan-500 text-cyan-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Cascaded Master-Slave Blocks
              </button>
              <button
                onClick={() => setActiveDiagramTab("race-comparison")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "race-comparison"
                    ? "bg-rose-900/80 border border-rose-500 text-rose-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Race-Around Elimination
              </button>
              <button
                onClick={() => setActiveDiagramTab("timing-diagram")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "timing-diagram"
                    ? "bg-amber-900/80 border border-amber-500 text-amber-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                4. Two-Phase Clock Timing
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: Complete 8-NAND Gate Schematic ────────── */}
            {activeDiagramTab === "nand-8gate" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Full 8-NAND Gate Master-Slave Architecture with Clock Inverter &amp; Global Feedback
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Master (NAND 1-4) + Clock NOT + Slave (NAND 5-8)</span>
                </div>
                <p className="text-xs text-slate-300">
                  The circuit consists of 8 NAND gates: Master stage (NAND 1-4) accepts inputs $J, K$ when $CLK=1$. The Inverter creates $CLK̄$, which enables the Slave stage (NAND 5-8) to update output $Q$ when $CLK=0$:
                </p>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 960 360" className="w-full h-auto text-xs font-mono select-none">
                    {/* Master Stage Boundary Box */}
                    <rect x="160" y="25" width="345" height="295" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="330" y="45" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="13">
                      STAGE 1: MASTER LATCH (Active when CLK = 1)
                    </text>

                    {/* Slave Stage Boundary Box */}
                    <rect x="535" y="25" width="345" height="295" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="705" y="45" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="13">
                      STAGE 2: SLAVE LATCH (Active when CLK = 0)
                    </text>

                    {/* Input J */}
                    <text x="20" y="75" fill="#14b8a6" fontWeight="bold" fontSize="14">J (Set)</text>
                    <circle cx="85" cy="70" r="4" fill="#14b8a6" />
                    <line x1="85" y1="70" x2="190" y2="70" stroke={jInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                    {/* Clock Signal CLK */}
                    <text x="15" y="180" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK</text>
                    <circle cx="85" cy="175" r="4" fill="#38bdf8" />
                    <line x1="85" y1="175" x2="120" y2="175" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <circle cx="120" cy="175" r="3.5" fill="#38bdf8" />

                    {/* CLK Distribution to Master (NAND 1 & 2) */}
                    <line x1="120" y1="175" x2="120" y2="90" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2" />
                    <line x1="120" y1="90" x2="190" y2="90" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2" />
                    <line x1="120" y1="175" x2="120" y2="250" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2" />
                    <line x1="120" y1="250" x2="190" y2="250" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2" />

                    {/* Clock Inverter to Slave */}
                    <line x1="120" y1="175" x2="510" y2="175" stroke={clkLevel ? "#38bdf8" : "#475569"} strokeWidth="2" />
                    {/* Inverter Triangle */}
                    <polygon points="510,165 530,175 510,185" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="534" cy="175" r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    
                    {/* Inverted Clock CLK_bar Distribution to Slave (NAND 5 & 6) */}
                    <line x1="538" y1="175" x2="555" y2="175" stroke={!clkLevel ? "#a855f7" : "#475569"} strokeWidth="2" />
                    <circle cx="555" cy="175" r="3.5" fill="#a855f7" />
                    <line x1="555" y1="175" x2="555" y2="90" stroke={!clkLevel ? "#a855f7" : "#475569"} strokeWidth="2" />
                    <line x1="555" y1="90" x2="575" y2="90" stroke={!clkLevel ? "#a855f7" : "#475569"} strokeWidth="2" />
                    <line x1="555" y1="175" x2="555" y2="250" stroke={!clkLevel ? "#a855f7" : "#475569"} strokeWidth="2" />
                    <line x1="555" y1="250" x2="575" y2="250" stroke={!clkLevel ? "#a855f7" : "#475569"} strokeWidth="2" />

                    {/* Input K */}
                    <text x="20" y="275" fill="#f43f5e" fontWeight="bold" fontSize="14">K (Reset)</text>
                    <circle cx="85" cy="270" r="4" fill="#f43f5e" />
                    <line x1="85" y1="270" x2="190" y2="270" stroke={kInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                    {/* ═══ MASTER STAGE ═══ */}
                    {/* NAND 1 (3-Input Steering) */}
                    <g transform="translate(190, 55)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 1</text>
                    </g>

                    {/* NAND 2 (3-Input Steering) */}
                    <g transform="translate(190, 225)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 2</text>
                    </g>

                    {/* Master Cross-Coupled NAND 3 */}
                    <g transform="translate(370, 55)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 3</text>
                    </g>

                    {/* Master Cross-Coupled NAND 4 */}
                    <g transform="translate(370, 225)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 4</text>
                    </g>

                    {/* Master Steering Wires */}
                    <line x1="265" y1="85" x2="370" y2="85" stroke="#10b981" strokeWidth="2" />
                    <line x1="265" y1="255" x2="370" y2="255" stroke="#10b981" strokeWidth="2" />

                    {/* Master Internal Cross-Coupled Feedback */}
                    <polyline points="475,85 475,130 330,175 330,235 370,235" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polyline points="465,255 465,205 345,160 345,105 370,105" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />

                    {/* Master to Slave Intermediate Traces Y & Y_bar */}
                    <line x1="445" y1="85" x2="575" y2="70" stroke={masterY ? "#22c55e" : "#475569"} strokeWidth="2.5" />
                    <circle cx="485" cy="85" r="3.5" fill="#38bdf8" />
                    <text x="480" y="70" fill="#38bdf8" fontWeight="bold" fontSize="12">Y = {masterY ? "1" : "0"}</text>

                    <line x1="445" y1="255" x2="575" y2="270" stroke={masterYBar ? "#a855f7" : "#475569"} strokeWidth="2.5" />
                    <circle cx="485" cy="255" r="3.5" fill="#38bdf8" />
                    <text x="480" y="275" fill="#38bdf8" fontWeight="bold" fontSize="12">Ȳ = {masterYBar ? "1" : "0"}</text>

                    {/* ═══ SLAVE STAGE ═══ */}
                    {/* NAND 5 (Steering) */}
                    <g transform="translate(575, 55)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 5</text>
                    </g>

                    {/* NAND 6 (Steering) */}
                    <g transform="translate(575, 225)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 6</text>
                    </g>

                    {/* NAND 7 (Slave Cross-Coupled) */}
                    <g transform="translate(740, 55)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 7</text>
                    </g>

                    {/* NAND 8 (Slave Cross-Coupled) */}
                    <g transform="translate(740, 225)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">NAND 8</text>
                    </g>

                    {/* Slave Steering Wires */}
                    <line x1="650" y1="85" x2="740" y2="85" stroke="#a855f7" strokeWidth="2" />
                    <line x1="650" y1="255" x2="740" y2="255" stroke="#a855f7" strokeWidth="2" />

                    {/* Slave Internal Cross-Coupled Feedback */}
                    <polyline points="825,85 825,130 705,175 705,235 740,235" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polyline points="815,255 815,205 720,160 720,105 740,105" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />

                    {/* Final Output Wires */}
                    <line x1="815" y1="85" x2="905" y2="85" stroke={slaveQ ? "#22c55e" : "#64748b"} strokeWidth="3" />
                    <circle cx="845" cy="85" r="4" fill="#22c55e" />
                    <text x="915" y="90" fill={slaveQ ? "#22c55e" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {slaveQ ? "1" : "0"}
                    </text>

                    <line x1="815" y1="255" x2="905" y2="255" stroke={slaveQBar ? "#a855f7" : "#64748b"} strokeWidth="3" />
                    <circle cx="845" cy="255" r="4" fill="#a855f7" />
                    <text x="915" y="260" fill={slaveQBar ? "#a855f7" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {slaveQBar ? "1" : "0"}
                    </text>
                    <line x1="915" y1="245" x2="928" y2="245" stroke={slaveQBar ? "#a855f7" : "#94a3b8"} strokeWidth="1.8" />

                    {/* ═══ GLOBAL FEEDBACK FROM SLAVE TO MASTER ═══ */}
                    {/* Q Feedback to NAND 2 (Bottom) */}
                    <polyline points="845,85 845,340 145,340 145,280 190,280" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="470" y="335" fill="#22c55e" textAnchor="middle" fontSize="10">
                      Global Feedback: Slave Output Q → Master NAND 2
                    </text>

                    {/* Q_bar Feedback to NAND 1 (Top) */}
                    <polyline points="845,255 845,15 145,15 145,60 190,60" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="470" y="12" fill="#a855f7" textAnchor="middle" fontSize="10">
                      Global Feedback: Slave Output Q̄ → Master NAND 1
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 2: Cascaded Master-Slave Block Diagram ──── */}
            {activeDiagramTab === "block-cascade" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Cascaded Two-Stage Block Diagram: Pulse-Triggered Data Isolation
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center overflow-x-auto">
                  <svg viewBox="0 0 880 260" className="w-full max-w-4xl h-auto font-mono select-none">
                    {/* Inputs */}
                    <text x="30" y="85" fill="#14b8a6" fontWeight="bold" fontSize="15">J (Set)</text>
                    <line x1="90" y1="80" x2="160" y2="80" stroke="#14b8a6" strokeWidth="2.5" />

                    <text x="30" y="195" fill="#f43f5e" fontWeight="bold" fontSize="15">K (Reset)</text>
                    <line x1="90" y1="190" x2="160" y2="190" stroke="#f43f5e" strokeWidth="2.5" />

                    <text x="25" y="140" fill="#38bdf8" fontWeight="bold" fontSize="15">CLK</text>
                    <line x1="70" y1="135" x2="160" y2="135" stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx="120" cy="135" r="4" fill="#38bdf8" />

                    {/* Master Gated Latch */}
                    <rect x="160" y="40" width="220" height="180" rx="12" fill="#0f172a" stroke="#14b8a6" strokeWidth="2.5" />
                    <text x="270" y="70" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="15">MASTER LATCH</text>
                    <text x="270" y="95" fill="#5eead4" textAnchor="middle" fontSize="11">Gated SR/JK Storage</text>
                    <text x="270" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="12">Enabled when CLK = 1</text>
                    <text x="270" y="175" fill="#94a3b8" textAnchor="middle" fontSize="10">Samples Inputs J &amp; K</text>

                    {/* Intermediate Signals Y & Y_bar */}
                    <line x1="380" y1="80" x2="520" y2="80" stroke="#38bdf8" strokeWidth="2.5" />
                    <polygon points="520,76 530,80 520,84" fill="#38bdf8" />
                    <text x="450" y="72" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Y (Master Data)</text>

                    <line x1="380" y1="190" x2="520" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
                    <polygon points="520,186 530,190 520,194" fill="#38bdf8" />
                    <text x="450" y="182" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Ȳ (Master Comp)</text>

                    {/* Clock Inverter Line */}
                    <line x1="120" y1="135" x2="120" y2="245" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="120" y1="245" x2="450" y2="245" stroke="#38bdf8" strokeWidth="2" />
                    {/* Inverter */}
                    <polygon points="450,238 465,245 450,252" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="469" cy="245" r="3.5" fill="#0f172a" stroke="#38bdf8" />
                    <line x1="473" y1="245" x2="530" y2="245" stroke="#a855f7" strokeWidth="2" />
                    <line x1="530" y1="245" x2="530" y2="135" stroke="#a855f7" strokeWidth="2" />
                    <text x="450" y="235" fill="#a855f7" textAnchor="middle" fontSize="10">CLK̄ (Inverted Clock)</text>

                    {/* Slave Gated Latch */}
                    <rect x="530" y="40" width="220" height="180" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
                    <text x="640" y="70" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="15">SLAVE LATCH</text>
                    <text x="640" y="95" fill="#d8b4fe" textAnchor="middle" fontSize="11">Gated SR Storage</text>
                    <text x="640" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="12">Enabled when CLK = 0</text>
                    <text x="640" y="175" fill="#94a3b8" textAnchor="middle" fontSize="10">Copies Master to Output Q</text>

                    {/* Outputs */}
                    <line x1="750" y1="80" x2="830" y2="80" stroke="#22c55e" strokeWidth="3" />
                    <text x="840" y="85" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>

                    <line x1="750" y1="190" x2="830" y2="190" stroke="#a855f7" strokeWidth="3" />
                    <text x="840" y="195" fill="#a855f7" fontWeight="bold" fontSize="16">Q</text>
                    <line x1="840" y1="180" x2="853" y2="180" stroke="#a855f7" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Race-Around Elimination Comparison ────── */}
            {activeDiagramTab === "race-comparison" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block">
                  Why Race-Around Occurs in Single JK vs How Master-Slave Eliminates It
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Single JK Failure */}
                  <div className="rounded-xl border border-rose-900/60 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>❌</span> Single Level-Triggered JK (Oscillation Flaw)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      When $J=1, K=1$ and Clock is held HIGH ($CLK=1$), the gate delay $t__pd$ is shorter than the clock pulse $t_p$.
                    </p>
                    <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                      <svg viewBox="0 0 400 110" className="w-full h-auto text-xs font-mono select-none">
                        <text x="10" y="25" fill="#38bdf8">CLK=1</text>
                        <line x1="60" y1="20" x2="380" y2="20" stroke="#38bdf8" strokeWidth="3" />
                        <text x="10" y="70" fill="#rose" className="fill-rose-400 font-bold">Q(t)</text>
                        {/* High frequency ringing waveform */}
                        <polyline points="60,80 90,80 90,50 120,50 120,80 150,80 150,50 180,50 180,80 210,80 210,50 240,50 240,80 270,80 270,50 300,50 300,80 330,80 330,50 360,50 360,80 380,80" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      </svg>
                    </div>
                    <p className="text-xs text-rose-300 font-semibold">
                      Outcome: Continuous high-frequency ringing; final output is random when CLK drops!
                    </p>
                  </div>

                  {/* Master-Slave Success */}
                  <div className="rounded-xl border border-emerald-900/60 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>✓</span> Master-Slave Architecture (Zero Race)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Master samples on $CLK=1$ while Slave holds output steady. When $CLK=0$, Slave updates once.
                    </p>
                    <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                      <svg viewBox="0 0 400 110" className="w-full h-auto text-xs font-mono select-none">
                        <text x="10" y="25" fill="#38bdf8">CLK</text>
                        <polyline points="60,30 110,30 110,15 220,15 220,30 330,30 330,15 380,15" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        <text x="10" y="75" fill="#emerald" className="fill-emerald-400 font-bold">Q(t)</text>
                        {/* Clean single toggle on clock falling edge */}
                        <polyline points="60,80 220,80 220,50 380,50" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                      </svg>
                    </div>
                    <p className="text-xs text-emerald-300 font-semibold">
                      Outcome: Exactly 1 clean toggle per clock pulse ($\Delta Q = 1$). Zero oscillation!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 4: Two-Phase Clock Timing ──────────────── */}
            {activeDiagramTab === "timing-diagram" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Two-Phase Synchronous Waveforms: Master Samples on ↑, Slave Commits on ↓
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <text x="40" y="40" fill="#38bdf8" fontWeight="bold">CLK Signal</text>
                    <polyline points="160,45 260,45 260,15 420,15 420,45 580,45 580,15 740,15 740,45 880,45" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    <text x="40" y="90" fill="#a855f7" fontWeight="bold">CLK̄ (Inverted)</text>
                    <polyline points="160,75 260,75 260,105 420,105 420,75 580,75 580,105 740,105 740,75 880,75" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 2" />

                    <text x="40" y="145" fill="#14b8a6" fontWeight="bold">Master State Y(t)</text>
                    <polyline points="160,150 260,150 260,120 580,120 580,150 880,150" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                    <text x="40" y="195" fill="#22c55e" fontWeight="bold">Slave Output Q(t)</text>
                    <polyline points="160,200 420,200 420,170 740,170 740,200 880,200" fill="none" stroke="#22c55e" strokeWidth="3" />

                    {/* Timing Annotations */}
                    <line x1="260" y1="10" x2="260" y2="210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="260" y="8" fill="#f59e0b" textAnchor="middle" fontSize="10">Phase 1: Master Samples (CLK=1)</text>

                    <line x1="420" y1="10" x2="420" y2="210" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="420" y="8" fill="#10b981" textAnchor="middle" fontSize="10">Phase 2: Slave Updates (CLK=0)</text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Two-Phase Simulator ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Two-Phase Master-Slave Workbench
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Input Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setJInput(!jInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    jInput ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                  )}
                >
                  J (Set): {jInput ? "1" : "0"}
                </button>
                <button
                  onClick={() => setKInput(!kInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    kInput ? "bg-rose-900/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                  )}
                >
                  K (Reset): {kInput ? "1" : "0"}
                </button>
              </div>

              {/* Two-Phase Execution Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={stepClockHigh}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-teal-800 hover:bg-teal-700 text-teal-100 border border-teal-600 transition flex items-center gap-1.5"
                >
                  <span>1️⃣</span> CLK HIGH (↑ Master Samples)
                </button>
                <button
                  onClick={stepClockLow}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-purple-800 hover:bg-purple-700 text-purple-100 border border-purple-600 transition flex items-center gap-1.5"
                >
                  <span>2️⃣</span> CLK LOW (↓ Slave Updates)
                </button>
                <button
                  onClick={pulseFullClock}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 transition flex items-center gap-1.5"
                >
                  <span>⏱️</span> Full Pulse (↑↓ Cycle)
                </button>
              </div>
            </div>

            {/* Signal & Stage Readout Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Clock Level</span>
                <div className="text-2xl font-mono font-extrabold text-cyan-400 flex items-center gap-2">
                  CLK = {clkLevel}
                  <span className="text-xs font-normal text-slate-400">
                    {clkLevel ? "(Master ON)" : "(Slave ON)"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Current Action</span>
                <div className="text-sm font-mono font-bold text-amber-300">
                  {jInput && kInput
                    ? "TOGGLE MODE (J=1, K=1)"
                    : jInput && !kInput
                    ? "SET MODE (J=1, K=0)"
                    : !jInput && kInput
                    ? "RESET MODE (J=0, K=1)"
                    : "HOLD MODE (J=0, K=0)"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40">
                <span className="text-xs text-teal-400 block mb-1">Stage 1: Master Stored Y</span>
                <div className="text-2xl font-mono font-extrabold text-white">
                  Y = {masterY ? "1" : "0"}
                  <span className="text-xs text-slate-400 font-normal ml-2">(Ȳ={masterYBar ? "1" : "0"})</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                <span className="text-xs text-emerald-400 block mb-1">Stage 2: Final Output Q</span>
                <div className="text-2xl font-mono font-extrabold text-white">
                  Q = {slaveQ ? "1" : "0"}
                  <span className="text-xs text-purple-400 font-normal ml-2">
                    (<span className="overline">Q</span>={slaveQBar ? "1" : "0"})
                  </span>
                </div>
              </div>
            </div>

            {/* Simulation Phase Status Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300">
              <span>Phase Status: <strong className="text-cyan-300 uppercase">{simPhase}</strong></span>
              <span className="text-slate-400">Master-Slave Dual-Phase Isolation Active · Glitch Free</span>
            </div>
          </div>
        </section>

        {/* ─── 5. Truth Table & Function Formulation ──────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Master-Slave JK Characteristic Truth Table
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-3.5">CLK Event</th>
                  <th className="p-3.5">J</th>
                  <th className="p-3.5">K</th>
                  <th className="p-3.5 text-teal-300">Master State Y (on ↑)</th>
                  <th className="p-3.5 text-emerald-300">Final Q(t+1) (on ↓)</th>
                  <th className="p-3.5">Operating Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className={clsx(!jInput && !kInput && "bg-teal-950/40 text-teal-200 font-bold")}>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5 text-teal-300">Q(t)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Q(t)</td>
                  <td className="p-3.5 text-slate-400">No Change (Hold State)</td>
                </tr>
                <tr className={clsx(!jInput && kInput && "bg-rose-950/40 text-rose-200 font-bold")}>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5 text-rose-300">0</td>
                  <td className="p-3.5 text-rose-400 font-bold">0</td>
                  <td className="p-3.5 text-rose-300">Synchronous Reset</td>
                </tr>
                <tr className={clsx(jInput && !kInput && "bg-emerald-950/40 text-emerald-200 font-bold")}>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5 text-emerald-300">1</td>
                  <td className="p-3.5 text-emerald-400 font-bold">1</td>
                  <td className="p-3.5 text-emerald-300">Synchronous Set</td>
                </tr>
                <tr className={clsx(jInput && kInput && "bg-cyan-950/40 text-cyan-200 font-bold")}>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5 text-cyan-300"><span className="overline">Q</span>(t)</td>
                  <td className="p-3.5 text-cyan-400 font-bold"><span className="overline">Q</span>(t)</td>
                  <td className="p-3.5 text-cyan-300">Clean Toggle (f_out = f_clk / 2)</td>
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
                    BARRACKPORE RAILWAY TELECOM
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Noise Frequency Prescaler</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata designed high-speed ripple frequency dividers for signal interlocking in Barrackpore. Single JK flip-flops oscillated due to high-voltage inductive spikes on long clock lines; upgrading to Master-Slave JK IC-7476 eliminated 100% of spurious glitch toggles.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                100% Noise-Immune Divide-by-2 Frequency Division
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    JADAVPUR ASYNCHRONOUS COUNTERS
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Asynchronous Mod-16 Ripple Counter</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu chained 4 Master-Slave JK flip-flops with J=K=1. Because the slave output updates strictly on the clock falling edge, each stage halves the frequency with zero race conditions across 50 MHz input frequencies.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                Deterministic Ripple Counting up to 2^N States
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
                <strong className="text-rose-200 block mb-1">• The "1s Catching" Hazard:</strong>
                In standard Master-Slave flip-flops, if a transient noise spike pulls $J=1$ for even 1 nanosecond while $CLK=1$, the master latch catches and latches the 1 permanently for the rest of the cycle.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Expecting Immediate Output on Clock Rise:</strong>
                Beginners often expect output $Q$ to change when $CLK$ goes HIGH. Remember: $Q$ ONLY updates when $CLK$ falls to 0 (Phase 2)!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use True Edge-Triggered D Flip-Flops in Modern ASICs:</strong>
                Modern 7nm/5nm silicon synthesis uses 6-NAND edge-triggered D flip-flops to avoid 1s catching and reduce transistor count from 36 down to 24 transistors.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Maintain Clean Clock Rise/Fall Times:</strong>
                Ensure clock rise and fall slew rates are &lt; 5 ns to prevent overlap between master disable and slave enable windows.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Master-Slave JK Flip-Flop FAQs"
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
            title="Master-Slave JK Flip-Flop Architecture"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In all my digital hardware classes at Barrackpore, I emphasize: The Master-Slave JK Flip-Flop is the historical masterpiece of sequential logic. " +
              "By isolating sampling (on CLK=1) from updating (on CLK=0), it proved to electrical engineers that clock isolation completely defeats race-around oscillation!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 10 · Master-Slave JK Flip-Flop · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic10;
