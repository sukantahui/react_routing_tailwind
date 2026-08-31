import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Clocked SR Flip-Flop: Internal Structure, Clock Gating, Race Conditions & Invalid State
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with live 4-NAND gate simulator,
 *                        Semantic SVGs (Schematic & Timing Waveforms), K-Map equation derivation,
 *                        real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const [sInput, setSInput] = useState(false);
  const [rInput, setRInput] = useState(false);
  const [clkInput, setClkInput] = useState(true);
  const [qState, setQState] = useState(false); // stored state Q
  const [qBarState, setQBarState] = useState(true); // stored state Q_bar
  const [isInvalid, setIsInvalid] = useState(false);
  const sectionRefs = useRef([]);

  // Compute flip-flop response whenever S, R, or CLK changes
  useEffect(() => {
    if (!clkInput) {
      // Clock is LOW (0) → Inactive / Memory Hold
      setIsInvalid(false);
      return;
    }

    // Clock is HIGH (1) → Active evaluation
    if (sInput && rInput) {
      // FORBIDDEN / INVALID STATE
      setIsInvalid(true);
      setQState(true);
      setQBarState(true); // In NAND latch, S'=0, R'=0 forces both outputs to 1
    } else if (sInput && !rInput) {
      // SET State
      setIsInvalid(false);
      setQState(true);
      setQBarState(false);
    } else if (!sInput && rInput) {
      // RESET State
      setIsInvalid(false);
      setQState(false);
      setQBarState(true);
    } else {
      // S=0, R=0 → Memory Hold
      setIsInvalid(false);
    }
  }, [sInput, rInput, clkInput]);

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

  // Intermediate gate outputs
  const sPrime = !(sInput && clkInput); // NAND 1 output (active low trigger)
  const rPrime = !(rInput && clkInput); // NAND 2 output (active low trigger)

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
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 7</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Clocked SR Flip-Flop: Internal Structure, Clock Gating &amp; Invalid State Analysis
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand how clock pulses synchronize bistable memory latches, explore the 4-NAND gate internal schematic,
            and dissect why the <code className="text-rose-400 font-mono">S=1, R=1</code> condition triggers race conditions and metastability.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 4-NAND Gated Storage Architecture
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⏱️ Clock Pulse Synchronization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-rose-300">
              ⚠️ Forbidden State (S=1, R=1) Forensics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              📐 Characteristic Eq: Q(next) = S + R'Q
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
                Teacher's Concept Breakdown: Why Did We Add a Clock to the SR Latch?
              </h2>
              <p className="text-xs text-slate-400">
                Moving from asynchronous chaos to deterministic, clock-synchronized processor memory
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> The Clock Synchronization Problem
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  An unclocked SR latch is <strong className="text-rose-300">asynchronous</strong>: any electrical glitch or noise spike on the S or R wire immediately alters stored memory.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  CLK = 0 → Memory Isolated &amp; Frozen · CLK = 1 → Active Latch Update
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By gating inputs S and R through two input NAND gates controlled by <code className="text-teal-300 font-mono">CLK</code>, the CPU ensures memory changes occur <strong>only during precise clock intervals</strong>.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"The clock signal is the conductor of the digital orchestra. Without it, gates play out of tune and data gets corrupted!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
                  <span>⚠️</span> The Fatal Flaw: S=1, R=1 Invalid State
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Why is simultaneous <code className="text-rose-300 font-mono">S = 1</code> and <code className="text-rose-300 font-mono">R = 1</code> strictly forbidden?
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Logical Contradiction:</strong> Outputs Q and Q̄ are mathematically defined to be complements (Q ≠ Q̄). But when S=1, R=1, both Q and Q̄ are forced to <strong>1 simultaneously</strong>!
                  </li>
                  <li>
                    <strong className="text-slate-200">Metastable Race Condition:</strong> When CLK falls back from 1 → 0, both cross-coupled gates race to pull their outputs to 0. Due to microscopic silicon delays, the latch oscillates unpredictably and settles on a random bit!
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200">
                ✨ <strong>Historical Consequence:</strong> This exact flaw led engineers to invent the <strong>D Flip-Flop</strong> (forcing R = S̄) and the <strong>JK Flip-Flop</strong> (feedback toggle)!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Full Schematic Diagram (Semantic SVG) ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Internal Logic Circuit Schematic (4-NAND Gate Architecture)
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Below is the exact schematic of a Clocked SR Flip-Flop built from two input steering NAND gates (Gate 1 &amp; Gate 2) and two cross-coupled bistable latch NAND gates (Gate 3 &amp; Gate 4):
            </p>

            {/* Semantic SVG Schematic */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
              <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                {/* ─── Input S (Set) ─────────────────────────── */}
                <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">S (Set)</text>
                <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                <line x1="100" y1="60" x2="280" y2="60" stroke={sInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

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

                {/* ─── Input R (Reset) ────────────────────────── */}
                <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">R (Reset)</text>
                <circle cx="100" cy="255" r="4" fill="#f43f5e" />
                <line x1="100" y1="255" x2="280" y2="255" stroke={rInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

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
                  S' = ~(S·CLK) [{sPrime ? "1" : "0"}]
                </text>

                {/* R' Wire (Gate 2 Output to Gate 4 Input) */}
                <line x1="355" y1="245" x2="560" y2="245" stroke={rPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                <text x="450" y="270" fill={rPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                  R' = ~(R·CLK) [{rPrime ? "1" : "0"}]
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
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Clocked SR Flip-Flop Simulator
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
                  CLK: {clkInput ? "1 (ACTIVE HIGH)" : "0 (DISABLED / LOW)"}
                </button>

                {/* S Button */}
                <button
                  onClick={() => setSInput(!sInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    sInput
                      ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  )}
                >
                  S (Set): {sInput ? "1 (HIGH)" : "0 (LOW)"}
                </button>

                {/* R Button */}
                <button
                  onClick={() => setRInput(!rInput)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                    rInput
                      ? "bg-rose-900/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  )}
                >
                  R (Reset): {rInput ? "1 (HIGH)" : "0 (LOW)"}
                </button>
              </div>
            </div>

            {/* Circuit State Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Gating Gate 1 Output (S')</span>
                <div className="text-lg font-mono font-bold text-teal-300">
                  S' = {sPrime ? "1 (Inactive)" : "0 (Trigger Active)"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Gating Gate 2 Output (R')</span>
                <div className="text-lg font-mono font-bold text-rose-300">
                  R' = {rPrime ? "1 (Inactive)" : "0 (Trigger Active)"}
                </div>
              </div>

              <div className={clsx(
                "p-4 rounded-xl bg-slate-950 border transition",
                isInvalid ? "border-rose-500 bg-rose-950/20" : "border-emerald-500/40"
              )}>
                <span className="text-xs text-emerald-400 block mb-1">Stored Output Q</span>
                <div className="text-2xl font-mono font-extrabold text-white">
                  Q = {qState ? "1" : "0"}
                </div>
              </div>

              <div className={clsx(
                "p-4 rounded-xl bg-slate-950 border transition",
                isInvalid ? "border-rose-500 bg-rose-950/20" : "border-purple-500/40"
              )}>
                <span className="text-xs text-purple-400 block mb-1">Complementary Output Q̄</span>
                <div className="text-2xl font-mono font-extrabold text-purple-300">
                  Q̄ = {qBarState ? "1" : "0"}
                </div>
              </div>
            </div>

            {/* Active Status Warning */}
            {isInvalid ? (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600 text-rose-200 text-xs sm:text-sm flex items-center gap-3 animate-pulse">
                <span className="text-2xl">⚠️</span>
                <div>
                  <strong className="block text-rose-300 font-bold">FORBIDDEN STATE ACTIVE (S=1, R=1 with CLK=1)</strong>
                  Both outputs Q and Q̄ are forced to 1, violating the complementarity principle. If CLK falls to 0 now, a race condition and metastability will occur!
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800 text-teal-200 text-xs flex items-center justify-between">
                <span>
                  🟢 <strong>Current Operating State:</strong>{" "}
                  {!clkInput
                    ? "MEMORY HOLD (Clock Inactive — Inputs Blocked)"
                    : !sInput && !rInput
                    ? "MEMORY HOLD (No Change: Q_next = Q_current)"
                    : sInput && !rInput
                    ? "SET STATE (Q is forced to 1, Q̄ is 0)"
                    : "RESET STATE (Q is forced to 0, Q̄ is 1)"}
                </span>
                <span className="font-mono text-[11px] text-teal-400">Stable Condition</span>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Truth Table & Mathematical Formulation ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Truth Table, Characteristic Equation &amp; Excitation Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Truth Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
                Clocked SR Flip-Flop Truth Table
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">CLK</th>
                      <th className="p-2.5">S</th>
                      <th className="p-2.5">R</th>
                      <th className="p-2.5">Q(t+1)</th>
                      <th className="p-2.5">State Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className={clsx(!clkInput && "bg-cyan-950/40 text-cyan-200 font-bold")}>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">X</td>
                      <td className="p-2.5">X</td>
                      <td className="p-2.5">Q(t)</td>
                      <td className="p-2.5 text-slate-400">Hold (Clock Disabled)</td>
                    </tr>
                    <tr className={clsx(clkInput && !sInput && !rInput && "bg-teal-950/40 text-teal-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">Q(t)</td>
                      <td className="p-2.5 text-slate-400">Hold (Quiescent)</td>
                    </tr>
                    <tr className={clsx(clkInput && !sInput && rInput && "bg-rose-950/40 text-rose-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-rose-400">0</td>
                      <td className="p-2.5 text-rose-300">Reset (Clear to 0)</td>
                    </tr>
                    <tr className={clsx(clkInput && sInput && !rInput && "bg-emerald-950/40 text-emerald-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5 text-emerald-400">1</td>
                      <td className="p-2.5 text-emerald-300">Set (Store 1)</td>
                    </tr>
                    <tr className={clsx(clkInput && sInput && rInput && "bg-rose-900/50 text-rose-200 font-extrabold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-rose-400">Invalid</td>
                      <td className="p-2.5 text-rose-300">⚠️ FORBIDDEN / RACE</td>
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
                  <span className="text-xs text-slate-500 block mb-1">K-Map Derived Equation:</span>
                  <strong className="text-sm sm:text-base text-amber-300">
                    Q(t+1) = S + R̄·Q(t)
                  </strong>
                  <span className="text-[11px] text-slate-400 block mt-1">Constraint: S · R = 0</span>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Excitation Table (Circuit Synthesis):
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-2">Q(t) → Q(t+1)</th>
                        <th className="p-2">S</th>
                        <th className="p-2">R</th>
                        <th className="p-2">Synthesis Condition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="p-2 font-bold text-teal-400">0 → 0</td>
                        <td className="p-2">0</td>
                        <td className="p-2 text-amber-400">X (Don't Care)</td>
                        <td className="p-2 text-slate-500">Hold 0 or Reset</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">0 → 1</td>
                        <td className="p-2 text-emerald-400 font-bold">1</td>
                        <td className="p-2">0</td>
                        <td className="p-2 text-slate-500">Set required</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">1 → 0</td>
                        <td className="p-2">0</td>
                        <td className="p-2 text-rose-400 font-bold">1</td>
                        <td className="p-2 text-slate-500">Reset required</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-teal-400">1 → 1</td>
                        <td className="p-2 text-amber-400">X (Don't Care)</td>
                        <td className="p-2">0</td>
                        <td className="p-2 text-slate-500">Hold 1 or Set</td>
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
                    BARRACKPORE RAIL SIGNALING
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Track Occupancy Memory Interlock Relay</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata engineered track block occupancy memory latches in Barrackpore. When a train wheel triggers the entry sensor (S=1), the latch stores Q=1 (Red signal) and ignores vibration noise until the exit block pulse (R=1) arrives during the active clock strobe.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Fail-Safe SIL-4 Interlock
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Hardware Power-On Reset (POR) Initialization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu designed a clean microcontroller startup circuit. An RC timer network applies an active pulse to the R pin of clocked CPU registers, guaranteeing all registers initialize to Q=0 before the CPU instruction fetch cycle begins.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Deterministic Cold-Boot Guarantee
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
                <strong className="text-rose-200 block mb-1">• Simultaneous S=1 and R=1 Releases:</strong>
                Releasing both S and R to 0 while CLK is active creates an unpredictable race condition in silicon, resulting in voltage ringing and state corruption.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Assuming Clock Gating Completely Prevents Glitches:</strong>
                If S or R transitions while the clock pulse is HIGH (level transparency), the latch immediately responds to the glitch. Edge-triggered flip-flops are needed for immune synchronous storage!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Hardware Lockout Interlocks:</strong>
                In mission-critical control circuits, add an external cross-inverting gate (S_actual = S · R̄) to make the S=1, R=1 invalid state physically impossible.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Upgrade to D or Master-Slave JK Flip-Flops:</strong>
                Use D flip-flops for pipeline registers and JK flip-flops for counters to eliminate the invalid state and race-around condition by architectural design.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Clocked SR Flip-Flop FAQs"
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
            title="Clocked SR Flip-Flop"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In my digital electronics and computer architecture classes at Barrackpore, I emphasize that the Clocked SR Flip-Flop is where time meets logic. " +
              "Never forget why S=1, R=1 is forbidden: both Q and Q̄ are forced to 1 simultaneously, breaking boolean complementarity. " +
              "Understanding this limitation is the key to mastering D flip-flops, Master-Slave JK flip-flops, and CPU register files!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 7 · Clocked SR Flip-Flop · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic7;
