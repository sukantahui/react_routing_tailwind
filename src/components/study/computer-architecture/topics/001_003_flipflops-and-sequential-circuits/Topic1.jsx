import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – SR Latch to Clocked SR Flip-Flop: NAND Implementation, Clock Gating & Truth Tables
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component illustrating the natural evolution
 *                        from basic 2-NAND SR Latch to 4-NAND Clocked SR Flip-Flop.
 */
const Topic1 = () => {
  // Mode selection: "latch" (2-NAND Basic Latch) or "flipflop" (4-NAND Clocked Flip-Flop)
  const [deviceMode, setDeviceMode] = useState("latch");
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-latch");

  // Latch inputs (Active-LOW: 0 = active, 1 = inactive)
  const [sBar, setSBar] = useState(true); // default: 1 (Inactive)
  const [rBar, setRBar] = useState(true); // default: 1 (Inactive)

  // Flip-Flop inputs (Active-HIGH: 1 = active, 0 = inactive)
  const [sInput, setSInput] = useState(false);
  const [rInput, setRInput] = useState(false);
  const [clkPulse, setClkPulse] = useState(false);

  // Circuit Outputs
  const [qState, setQState] = useState(false);
  const [qBarState, setQBarState] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  const sectionRefs = useRef([]);

  // Latch Mode Real-time Evaluation
  useEffect(() => {
    if (deviceMode === "latch") {
      // Basic NAND Latch: Active-LOW
      if (!sBar && !rBar) {
        setIsInvalid(true);
        setQState(true);
        setQBarState(true); // In NAND latch, both outputs forced to 1
      } else if (!sBar && rBar) {
        setIsInvalid(false);
        setQState(true);
        setQBarState(false);
      } else if (sBar && !rBar) {
        setIsInvalid(false);
        setQState(false);
        setQBarState(true);
      } else {
        // S̄=1, R̄=1 -> Memory Hold
        setIsInvalid(false);
      }
    }
  }, [deviceMode, sBar, rBar]);

  // Flip-Flop Clock Pulse Trigger
  const triggerClockPulse = () => {
    setClkPulse(true);
    setTimeout(() => {
      if (sInput && rInput) {
        setIsInvalid(true);
        setQState(true);
        setQBarState(true);
      } else if (sInput && !rInput) {
        setIsInvalid(false);
        setQState(true);
        setQBarState(false);
      } else if (!sInput && rInput) {
        setIsInvalid(false);
        setQState(false);
        setQBarState(true);
      } else {
        // S=0, R=0 -> Hold
        setIsInvalid(false);
      }
      setClkPulse(false);
    }, 350);
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
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 1</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            SR Latch to Clocked SR Flip-Flop (NAND-Based Evolution)
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Trace the fundamental evolution of binary storage: first, build the cross-coupled 2-NAND Latch for basic asynchronous memory;
            then, add Clock gating steering NANDs to construct the synchronous 4-NAND Clocked SR Flip-Flop.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              1️⃣ Step 1: Basic 2-NAND SR Latch
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              2️⃣ Step 2: 4-NAND Clocked SR Flip-Flop
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⏱️ Clock Gating &amp; Timing Invariants
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-rose-300">
              ⚠️ Invalid State Forensics (S=1, R=1)
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
                Teacher's Concept Breakdown: From Latch to Clocked Flip-Flop
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the two-stage evolutionary journey of sequential binary storage
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1: The Latch */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>1️⃣</span> Stage 1: The Basic 2-NAND Latch (Asynchronous)
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Two NAND gates cross-coupled in positive feedback form the simplest 1-bit memory cell on earth.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  Q = ~(S̄ · Q̄) &nbsp;|&nbsp; Q̄ = ~(R̄ · Q)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inputs are <strong>Active-LOW</strong>: applying 0 to <code className="text-teal-300 font-mono">S̄</code> forces $Q=1$, and 0 to <code className="text-rose-300 font-mono">R̄</code> forces $Q=0$. However, it is unclocked and sensitive to input noise at all times.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                💡 <strong>Core Insight:</strong> <em>"A Latch is transparent and asynchronous — it responds instantly whenever its inputs change."</em>
              </div>
            </div>

            {/* Step 2: The Clocked Flip-Flop */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                  <span>2️⃣</span> Stage 2: The Clocked SR Flip-Flop (Synchronous)
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  To protect the latch from asynchronous noise, we prepend two steering NAND gates gated by a common <strong className="text-cyan-300">Clock (CLK)</strong> signal.
                </p>
                <div className="my-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 font-mono text-xs text-cyan-200 text-center font-bold">
                  S' = ~(S · CLK) &nbsp;|&nbsp; R' = ~(R · CLK)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inputs become <strong>Active-HIGH</strong>: $S=1$ and $R=1$ are only sampled when the Clock signal transitions, synchronizing memory updates across the entire CPU!
                </p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Flip-Flop = Latch + Clock Control Stage. Clocking turns wild asynchronous silicon into orderly, synchronized computation!"</em>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Hardware Schematics Section ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Timing Diagrams
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("nand-latch")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "nand-latch"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. 2-NAND SR Latch
              </button>
              <button
                onClick={() => setActiveDiagramTab("clocked-ff")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "clocked-ff"
                    ? "bg-cyan-900/80 border border-cyan-500 text-cyan-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. 4-NAND Clocked SR Flip-Flop
              </button>
              <button
                onClick={() => setActiveDiagramTab("symbol-timing")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "symbol-timing"
                    ? "bg-amber-900/80 border border-amber-500 text-amber-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. IEEE Symbol &amp; Timing
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: 2-NAND Basic SR Latch Schematic ──────── */}
            {activeDiagramTab === "nand-latch" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Step 1: Cross-Coupled 2-NAND SR Latch (Active-LOW Inputs S̄ &amp; R̄)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Q = ~(S̄ · Q̄) | Q̄ = ~(R̄ · Q)</span>
                </div>
                <p className="text-xs text-slate-300">
                  The basic building block consists of two cross-coupled NAND gates. Applying a 0 to either active-low input forces the corresponding output to 1:
                </p>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 320" className="w-full h-auto text-xs font-mono select-none">
                    {/* Top Input S Bar */}
                    <text x="30" y="75" fill="#14b8a6" fontWeight="bold" fontSize="14">S (Active-LOW Set)</text>
                    <line x1="30" y1="62" x2="39" y2="62" stroke="#14b8a6" strokeWidth="1.5" />
                    <circle cx="200" cy="70" r="4" fill="#14b8a6" />
                    <line x1="200" y1="70" x2="380" y2="70" stroke={!sBar ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                    {/* Bottom Input R Bar */}
                    <text x="30" y="245" fill="#f43f5e" fontWeight="bold" fontSize="14">R (Active-LOW Reset)</text>
                    <line x1="30" y1="232" x2="40" y2="232" stroke="#f43f5e" strokeWidth="1.5" />
                    <circle cx="200" cy="240" r="4" fill="#f43f5e" />
                    <line x1="200" y1="240" x2="380" y2="240" stroke={!rBar ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                    {/* NAND Gate 1 (Top) */}
                    <g transform="translate(380, 55)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
                    </g>

                    {/* NAND Gate 2 (Bottom) */}
                    <g transform="translate(380, 205)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
                    </g>

                    {/* Output Q Wire */}
                    <line x1="455" y1="85" x2="780" y2="85" stroke={qState ? "#22c55e" : "#64748b"} strokeWidth="3" />
                    <circle cx="600" cy="85" r="4" fill="#22c55e" />
                    <text x="800" y="90" fill={qState ? "#22c55e" : "#94a3b8"} fontSize="18" fontWeight="bold">
                      Q = {qState ? "1" : "0"}
                    </text>

                    {/* Output Q Bar Wire */}
                    <line x1="455" y1="235" x2="780" y2="235" stroke={qBarState ? "#a855f7" : "#64748b"} strokeWidth="3" />
                    <circle cx="580" cy="235" r="4" fill="#a855f7" />
                    <text x="800" y="240" fill={qBarState ? "#a855f7" : "#94a3b8"} fontSize="18" fontWeight="bold">
                      Q = {qBarState ? "1" : "0"}
                    </text>
                    <line x1="800" y1="225" x2="814" y2="225" stroke={qBarState ? "#a855f7" : "#94a3b8"} strokeWidth="1.8" />

                    {/* ─── Cross-Coupled Feedback Loops ──────────── */}
                    {/* Feedback from Q to NAND 2 (y=215) */}
                    <polyline
                      points="600,85 600,140 320,185 320,220 380,220"
                      fill="none"
                      stroke={qState ? "#22c55e" : "#475569"}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Feedback from Q̄ to NAND 1 (y=100) */}
                    <polyline
                      points="580,235 580,180 340,135 340,100 380,100"
                      fill="none"
                      stroke={qBarState ? "#a855f7" : "#475569"}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 2: 4-NAND Clocked SR Flip-Flop Schematic ── */}
            {activeDiagramTab === "clocked-ff" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Step 2: Full 4-NAND Clocked SR Flip-Flop (Active-HIGH Inputs)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Synchronous Clock-Gated Memory</span>
                </div>
                <p className="text-xs text-slate-300">
                  Two steering NAND gates (NAND 1 &amp; NAND 2) gate inputs <code className="text-teal-300 font-mono">S</code> and <code className="text-rose-300 font-mono">R</code> with the <code className="text-cyan-300 font-mono">CLK</code> signal before driving the cross-coupled storage latch (NAND 3 &amp; NAND 4):
                </p>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                    {/* Input S */}
                    <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">S (Set)</text>
                    <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                    <line x1="100" y1="60" x2="280" y2="60" stroke={sInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                    {/* Input CLK */}
                    <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock)</text>
                    <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                    <line x1="100" y1="155" x2="130" y2="155" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <circle cx="130" cy="155" r="3.5" fill="#38bdf8" />
                    {/* Up to Gate 1 */}
                    <line x1="130" y1="155" x2="130" y2="85" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="85" x2="280" y2="85" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    {/* Down to Gate 2 */}
                    <line x1="130" y1="155" x2="130" y2="225" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="225" x2="280" y2="225" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                    {/* Input R */}
                    <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">R (Reset)</text>
                    <circle cx="100" cy="255" r="4" fill="#f43f5e" />
                    <line x1="100" y1="255" x2="280" y2="255" stroke={rInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

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

                    {/* Interconnect S Bar Wire */}
                    <line x1="355" y1="75" x2="560" y2="75" stroke="#10b981" strokeWidth="2.5" />
                    <text x="450" y="62" fill="#10b981" fontWeight="bold" textAnchor="middle">
                      S = ~(S·CLK)
                    </text>
                    <line x1="408" y1="50" x2="417" y2="50" stroke="#10b981" strokeWidth="1.5" />

                    {/* Interconnect R Bar Wire */}
                    <line x1="355" y1="245" x2="560" y2="245" stroke="#10b981" strokeWidth="2.5" />
                    <text x="450" y="270" fill="#10b981" fontWeight="bold" textAnchor="middle">
                      R = ~(R·CLK)
                    </text>
                    <line x1="408" y1="258" x2="418" y2="258" stroke="#10b981" strokeWidth="1.5" />

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
                    <line x1="635" y1="75" x2="840" y2="75" stroke={qState ? "#22c55e" : "#64748b"} strokeWidth="3" />
                    <circle cx="720" cy="75" r="4" fill="#22c55e" />
                    <text x="855" y="80" fill={qState ? "#22c55e" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {qState ? "1" : "0"}
                    </text>

                    {/* Output Q Bar Wire */}
                    <line x1="635" y1="245" x2="840" y2="245" stroke={qBarState ? "#a855f7" : "#64748b"} strokeWidth="3" />
                    <circle cx="700" cy="245" r="4" fill="#a855f7" />
                    <text x="855" y="250" fill={qBarState ? "#a855f7" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {qBarState ? "1" : "0"}
                    </text>
                    <line x1="855" y1="235" x2="868" y2="235" stroke={qBarState ? "#a855f7" : "#94a3b8"} strokeWidth="1.8" />

                    {/* Feedback Loops */}
                    <polyline
                      points="720,75 720,130 490,175 490,225 560,225"
                      fill="none"
                      stroke={qState ? "#22c55e" : "#475569"}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
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

            {/* ─── TAB 3: Symbol & Timing Waveforms ─────────────── */}
            {activeDiagramTab === "symbol-timing" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  IEEE Standard Logic Symbol &amp; Synchronous Timing Waveforms
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Block Symbol */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center items-center">
                    <svg viewBox="0 0 380 240" className="w-full h-auto font-mono select-none">
                      <rect x="100" y="30" width="180" height="180" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="190" y="60" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="15">CLOCKED SR FF</text>
                      
                      <line x1="40" y1="80" x2="100" y2="80" stroke="#14b8a6" strokeWidth="2.5" />
                      <text x="25" y="85" fill="#14b8a6" fontWeight="bold">S</text>

                      <line x1="40" y1="120" x2="100" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                      <polygon points="100,112 112,120 100,128" fill="#38bdf8" />
                      <text x="10" y="125" fill="#38bdf8" fontWeight="bold">&gt;CLK</text>

                      <line x1="40" y1="160" x2="100" y2="160" stroke="#f43f5e" strokeWidth="2.5" />
                      <text x="25" y="165" fill="#f43f5e" fontWeight="bold">R</text>

                      <line x1="280" y1="80" x2="340" y2="80" stroke="#22c55e" strokeWidth="3" />
                      <text x="350" y="85" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>

                      <line x1="280" y1="160" x2="340" y2="160" stroke="#a855f7" strokeWidth="3" />
                      <text x="350" y="165" fill="#a855f7" fontWeight="bold" fontSize="16">Q</text>
                      <line x1="350" y1="150" x2="363" y2="150" stroke="#a855f7" strokeWidth="1.8" />
                    </svg>
                  </div>

                  {/* Timing Waveforms */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex justify-center items-center overflow-x-auto">
                    <svg viewBox="0 0 450 200" className="w-full h-auto text-xs font-mono select-none">
                      <text x="20" y="45" fill="#38bdf8" fontWeight="bold">CLK</text>
                      <polyline points="70,50 120,50 120,20 190,20 190,50 260,50 260,20 330,20 330,50 400,50" fill="none" stroke="#38bdf8" strokeWidth="2" />

                      <text x="20" y="95" fill="#14b8a6" fontWeight="bold">S (Set)</text>
                      <polyline points="70,100 100,100 100,70 210,70 210,100 400,100" fill="none" stroke="#14b8a6" strokeWidth="2" />

                      <text x="20" y="145" fill="#f43f5e" fontWeight="bold">R (Reset)</text>
                      <polyline points="70,150 240,150 240,120 350,120 350,150 400,150" fill="none" stroke="#f43f5e" strokeWidth="2" />

                      <text x="20" y="185" fill="#22c55e" fontWeight="bold">Q</text>
                      <polyline points="70,190 120,190 120,165 260,165 260,190 400,190" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive SR Circuit Simulator
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Device Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Architecture:</span>
                <button
                  onClick={() => setDeviceMode("latch")}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                    deviceMode === "latch"
                      ? "bg-teal-900/80 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  1. Basic 2-NAND Latch (Active-LOW)
                </button>
                <button
                  onClick={() => setDeviceMode("flipflop")}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                    deviceMode === "flipflop"
                      ? "bg-cyan-900/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  2. 4-NAND Clocked SR Flip-Flop
                </button>
              </div>

              {/* Dynamic Controls based on mode */}
              <div className="flex flex-wrap gap-3">
                {deviceMode === "latch" ? (
                  <>
                    <button
                      onClick={() => setSBar(!sBar)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                        !sBar
                          ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      <span className="overline">S</span> (Set_n): {!sBar ? "0 (ACTIVE LOW)" : "1 (INACTIVE)"}
                    </button>
                    <button
                      onClick={() => setRBar(!rBar)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                        !rBar
                          ? "bg-rose-900/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-950/50"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      <span className="overline">R</span> (Reset_n): {!rBar ? "0 (ACTIVE LOW)" : "1 (INACTIVE)"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSInput(!sInput)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                        sInput
                          ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      S (Set): {sInput ? "1" : "0"}
                    </button>
                    <button
                      onClick={() => setRInput(!rInput)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all",
                        rInput
                          ? "bg-rose-900/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-950/50"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      )}
                    >
                      R (Reset): {rInput ? "1" : "0"}
                    </button>
                    <button
                      onClick={triggerClockPulse}
                      className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 transition-all flex items-center gap-2"
                    >
                      <span>⏱️</span> PULSE CLOCK (↑)
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* State Displays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Architecture</span>
                <div className="text-sm font-mono font-bold text-cyan-300">
                  {deviceMode === "latch" ? "Asynchronous 2-NAND Latch" : "Synchronous 4-NAND Flip-Flop"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">Current State Description</span>
                <div className="text-sm font-mono font-bold text-teal-300">
                  {isInvalid ? "FORBIDDEN STATE" : qState ? "SET STATE (Q = 1)" : "RESET / HOLD STATE"}
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

            {/* Invalid State Alert */}
            {isInvalid && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600 text-rose-200 text-xs sm:text-sm flex items-center gap-3 animate-pulse">
                <span className="text-2xl">⚠️</span>
                <div>
                  <strong className="block text-rose-300 font-bold">FORBIDDEN STATE DETECTED!</strong>
                  Both outputs are forced to 1 simultaneously (violating Q ≠ Q̄). Transitioning back to Memory Hold causes output voltage ringing (metastability)!
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Truth Tables & Excitation Formulation ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Step-by-Step Truth Tables: Latch vs Clocked Flip-Flop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 2-NAND Latch Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
                1. Basic 2-NAND SR Latch (Active-LOW Inputs <span className="overline">S</span> &amp; <span className="overline">R</span>)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5"><span className="overline">S</span></th>
                      <th className="p-2.5"><span className="overline">R</span></th>
                      <th className="p-2.5">Q(t+1)</th>
                      <th className="p-2.5"><span className="overline">Q</span>(t+1)</th>
                      <th className="p-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className={clsx(deviceMode === "latch" && sBar && rBar && "bg-teal-950/40 text-teal-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">Q(t)</td>
                      <td className="p-2.5">Q̄(t)</td>
                      <td className="p-2.5 text-slate-400">Memory Hold</td>
                    </tr>
                    <tr className={clsx(deviceMode === "latch" && sBar && !rBar && "bg-rose-950/40 text-rose-200 font-bold")}>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5 text-rose-400 font-bold">0</td>
                      <td className="p-2.5 text-purple-400">1</td>
                      <td className="p-2.5 text-rose-300">Reset State</td>
                    </tr>
                    <tr className={clsx(deviceMode === "latch" && !sBar && rBar && "bg-emerald-950/40 text-emerald-200 font-bold")}>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-emerald-400 font-bold">1</td>
                      <td className="p-2.5 text-purple-400">0</td>
                      <td className="p-2.5 text-emerald-300">Set State</td>
                    </tr>
                    <tr className={clsx(deviceMode === "latch" && !sBar && !rBar && "bg-rose-900/50 text-rose-200 font-extrabold")}>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5 text-rose-400">1</td>
                      <td className="p-2.5 text-rose-400">1</td>
                      <td className="p-2.5 text-rose-300">⚠️ FORBIDDEN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4-NAND Flip-Flop Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                2. Clocked 4-NAND SR Flip-Flop (Active-HIGH)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">CLK</th>
                      <th className="p-2.5">S</th>
                      <th className="p-2.5">R</th>
                      <th className="p-2.5">Q(t+1)</th>
                      <th className="p-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className={clsx(deviceMode === "flipflop" && !sInput && !rInput && "bg-cyan-950/40 text-cyan-200 font-bold")}>
                      <td className="p-2.5">↑</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">Q(t)</td>
                      <td className="p-2.5 text-slate-400">Memory Hold</td>
                    </tr>
                    <tr className={clsx(deviceMode === "flipflop" && !sInput && rInput && "bg-rose-950/40 text-rose-200 font-bold")}>
                      <td className="p-2.5">↑</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-rose-400 font-bold">0</td>
                      <td className="p-2.5 text-rose-300">Reset State</td>
                    </tr>
                    <tr className={clsx(deviceMode === "flipflop" && sInput && !rInput && "bg-emerald-950/40 text-emerald-200 font-bold")}>
                      <td className="p-2.5">↑</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">0</td>
                      <td className="p-2.5 text-emerald-400 font-bold">1</td>
                      <td className="p-2.5 text-emerald-300">Set State</td>
                    </tr>
                    <tr className={clsx(deviceMode === "flipflop" && sInput && rInput && "bg-rose-900/50 text-rose-200 font-extrabold")}>
                      <td className="p-2.5">↑</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-rose-400">Invalid</td>
                      <td className="p-2.5 text-rose-300">⚠️ FORBIDDEN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE SIGNAL LAB
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Railway Track Occupancy Memory</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata implemented NAND-based SR storage latches for automated track vacancy indicators in Barrackpore. When axle sensors pulse S̄=0, the latch sets Q=1, maintaining the red signal until the train clears the block and triggers R̄=0.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Fail-Safe Train Position Memory
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Clock-Gated Bus Interface Register</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu synchronized asynchronous sensor inputs by converting basic 2-NAND latches to 4-NAND Clocked SR Flip-Flops, isolating data updates to microsecond clock strobes and eliminating bus race conditions.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-Nanosecond Clock Skew Synchronization
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
                <strong className="text-rose-200 block mb-1">• Confusing Active-LOW with Active-HIGH:</strong>
                Remember that a basic 2-NAND latch is Active-LOW (requires 0 to trigger), while a 4-NAND Clocked Flip-Flop is Active-HIGH (requires 1 to trigger).
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• The Invalid State Violation:</strong>
                Asserting S=1 and R=1 simultaneously violates the fundamental complementary property Q ≠ Q̄. Never allow both active inputs to assert at once!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use Pull-Up Resistors on Unused Inputs:</strong>
                Always pull unused active-low inputs to VCC (+5V) with 10kΩ resistors to prevent floating CMOS nodes from oscillating.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Migrate to D or JK Flip-Flops for Arithmetic:</strong>
                In CPU registers and counters, use D or JK flip-flops to permanently eliminate the invalid state hazard of the SR architecture.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="SR Latch &amp; Clocked SR Flip-Flop FAQs"
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
            title="SR Latch &amp; Clocked SR Flip-Flop"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In my computer architecture classes at Barrackpore, I always emphasize: Start with the 2-NAND Latch to understand memory feedback. " +
              "Then add the steering NAND gates and Clock pulse to build the Clocked SR Flip-Flop. " +
              "This two-step progression is the foundation upon which D, JK, and Master-Slave flip-flops are engineered!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 1 · SR Latch to Clocked SR Flip-Flop · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic1;
