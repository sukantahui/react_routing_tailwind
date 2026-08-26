import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Master-Slave Flip-Flop: Two-Stage Operation & Live Animated Vector Logic Circuit Engine
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Masterclass with native SVG animateMotion photon particle streams,
 *                        IEEE curved NAND gates, live logic analyzer, 6 case studies, and 30 questions.
 */
const Topic13 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("split-simulation");
  const [isPlaying, setIsPlaying] = useState(false);
  const [pulseWidthNs, setPulseWidthNs] = useState(30); // 10ns to 60ns
  const [gateDelayNs, setGateDelayNs] = useState(5); // 2ns to 10ns
  
  // Real-time Engine States
  const [clockPhase, setClockPhase] = useState(0); // 0 (LOW), 1 (HIGH)
  const [singleJkState, setSingleJkState] = useState(0);
  const [singleJkOscCount, setSingleJkOscCount] = useState(0);
  
  // Master-Slave States
  const [masterY, setMasterY] = useState(0);
  const [slaveQ, setSlaveQ] = useState(0);
  const [msPhase, setMsPhase] = useState("idle");

  // 1s Catching Anomaly Interactive State
  const [noiseInjected, setNoiseInjected] = useState(false);
  const [onesCatchingMasterY, setOnesCatchingMasterY] = useState(0);

  // Interactive Calculation Challenge
  const [userAnswer, setUserAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Step-by-Step Progressive Timeline
  const [timelineStep, setTimelineStep] = useState(1);

  const sectionRefs = useRef([]);
  const clockTimerRef = useRef(null);
  const oscillationTimerRef = useRef(null);

  // Exact Mathematical Toggles during one pulse
  const calculatedToggles = Math.max(1, Math.floor(pulseWidthNs / gateDelayNs));

  // Step the simulation forward by 1 cycle
  const stepClockCycle = useCallback(() => {
    setClockPhase(1);
    setMsPhase("master_sampling");
    
    const nextMaster = slaveQ === 0 ? 1 : 0;
    setMasterY(nextMaster);

    let osc = 0;
    const maxOsc = Math.floor(pulseWidthNs / gateDelayNs);
    
    if (oscillationTimerRef.current) clearInterval(oscillationTimerRef.current);
    
    oscillationTimerRef.current = setInterval(() => {
      setSingleJkState((prev) => (prev === 0 ? 1 : 0));
      osc++;
      setSingleJkOscCount(osc);
      if (osc &ge; maxOsc) {
        clearInterval(oscillationTimerRef.current);
      }
    }, 60);

    setTimeout(() => {
      setClockPhase(0);
      setMsPhase("slave_updating");
      setSlaveQ(nextMaster);
      setTimeout(() => setMsPhase("idle"), 300);
    }, 550);
  }, [pulseWidthNs, gateDelayNs, slaveQ]);

  // Continuous Clock Execution
  useEffect(() => {
    if (!isPlaying) {
      if (clockTimerRef.current) clearInterval(clockTimerRef.current);
      if (oscillationTimerRef.current) clearInterval(oscillationTimerRef.current);
      return;
    }

    clockTimerRef.current = setInterval(() => {
      stepClockCycle();
    }, 1200);

    return () => {
      if (clockTimerRef.current) clearInterval(clockTimerRef.current);
      if (oscillationTimerRef.current) clearInterval(oscillationTimerRef.current);
    };
  }, [isPlaying, stepClockCycle]);

  // Preset Scenario Handlers
  const loadScenario = (type) => {
    setIsPlaying(false);
    if (type === "severe-race") {
      setPulseWidthNs(50);
      setGateDelayNs(5);
    } else if (type === "borderline-race") {
      setPulseWidthNs(15);
      setGateDelayNs(5);
    } else if (type === "ideal-ms") {
      setPulseWidthNs(25);
      setGateDelayNs(5);
    }
    setClockPhase(0);
    setSingleJkState(0);
    setSingleJkOscCount(0);
    setMasterY(0);
    setSlaveQ(0);
    setMsPhase("idle");
  };

  // 1s Catching Trigger
  const triggerNoiseGlitch = () => {
    setNoiseInjected(true);
    setOnesCatchingMasterY(1);
    setTimeout(() => {
      setNoiseInjected(false);
    }, 400);
  };

  // Quiz Verification
  const checkQuizAnswer = () => {
    if (userAnswer.trim() === "15") {
      setQuizFeedback({
        correct: true,
        msg: "🎉 Correct! N = floor(45ns / 3ns) = 15 uncontrolled toggles during a single pulse!"
      });
    } else {
      setQuizFeedback({
        correct: false,
        msg: "❌ Incorrect. Remember the formula: N = floor(t_pulse / t_pd) = floor(45 / 3)."
      });
    }
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
        @keyframes pulse-red-hazard {
          0% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 10px rgba(244, 63, 94, 0.2); }
          50% { border-color: rgba(244, 63, 94, 1); box-shadow: 0 0 25px rgba(244, 63, 94, 0.6); }
          100% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 10px rgba(244, 63, 94, 0.2); }
        }
        .hazard-active {
          animation: pulse-red-hazard 0.6s infinite ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 13</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Master-Slave Flip-Flop: Two-Stage Operation &amp; Race-Around Elimination
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive, rigorous deep dive into pulse-triggered sequential architecture with live animated particle-tracing schematics.
            Explore internal gate-level propagation delays, two-phase clock isolation, and the 1s-catching hazard.
          </p>

          {/* Quick Scenario Presets */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase mr-1">Quick Scenarios:</span>
            <button
              onClick={() => loadScenario("severe-race")}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900/80 transition"
            &gt;
              ⚠️ Severe Race (50ns / 5ns = 10 Toggles)
            </button>
            <button
              onClick={() => loadScenario("borderline-race")}
              className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-900/80 transition"
            &gt;
              ⚡ Borderline Race (15ns / 5ns = 3 Toggles)
            </button>
            <button
              onClick={() => loadScenario("ideal-ms")}
              className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-800/60 text-teal-300 hover:bg-teal-900/80 transition"
            &gt;
              🔒 Master-Slave (100% Deterministic)
            </button>
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
                Teacher's Deep Breakdown: The Exact Physics of the Race-Around Flaw
              </h2>
              <p className="text-xs text-slate-400">
                How gate propagation delay collisions create chaotic high-frequency ringing in single-stage feedback latches
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/40 space-y-2">
              <span className="text-rose-400 font-bold block uppercase">1. Race Hazard Invariant</span>
              <div className="text-base text-white font-bold">t_pd &lt; t_pulse &lt; T</div>
              <p className="text-slate-400 leading-relaxed">
                When clock pulse duration exceeds internal propagation delay, feedback triggers multiple runaway inversions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/40 space-y-2">
              <span className="text-amber-400 font-bold block uppercase">2. Toggle Multiplication</span>
              <div className="text-base text-white font-bold">N = floor( t_pulse / t_pd )</div>
              <p className="text-slate-400 leading-relaxed">
                A 30ns clock pulse with 5ns gate delay causes <strong className="text-amber-300">6 uncontrolled state flips</strong> during a single pulse!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-teal-800/40 space-y-2">
              <span className="text-teal-400 font-bold block uppercase">3. Two-Stage Isolation</span>
              <div className="text-base text-white font-bold">N_master_slave = 1 (Fixed)</div>
              <p className="text-slate-400 leading-relaxed">
                Complementary clocking breaks the feedback loop, guaranteeing exactly 1 deterministic toggle per clock pulse.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <strong className="text-teal-300 block font-mono text-sm">
              The 2-Phase Operational Sequence:
            </strong>
            <p>
              • <strong>Phase 1 (Clock Rise, CLK = 1):</strong> The Master stage is enabled and samples inputs J and K, storing the intermediate bit in internal node Y. Meanwhile, the clock inverter delivers <code className="text-purple-300 font-mono">CLK̄ = 0</code> to the Slave, locking its outputs Q and Q̄ completely. No feedback reaches the Master.
            </p>
            <p>
              • <strong>Phase 2 (Clock Fall, CLK = 0):</strong> The Master is disabled, locking out any input noise or glitches. Concurrently, <code className="text-purple-300 font-mono">CLK̄ = 1</code> enables the Slave stage, which copies the intermediate bit Y to the final output Q.
            </p>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematics & Live Animation ────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Live Animated Circuit Engine
            </h2>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("split-simulation")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "split-simulation"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                1. Animated Split-Screen Schematics
              </button>
              <button
                onClick={() => setActiveDiagramTab("logic-analyzer")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "logic-analyzer"
                    ? "bg-cyan-900/80 border border-cyan-500 text-cyan-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                2. Live 4-Channel Logic Analyzer
              </button>
              <button
                onClick={() => setActiveDiagramTab("8nand-schematic")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "8nand-schematic"
                    ? "bg-amber-900/80 border border-amber-500 text-amber-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                3. Complete 8-NAND Gate Schematic
              </button>
              <button
                onClick={() => setActiveDiagramTab("ones-catching")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "ones-catching"
                    ? "bg-purple-900/80 border border-purple-500 text-purple-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                4. 1s-Catching Hazard Simulator
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: Animated Split-Screen Schematics ─────── */}
            {activeDiagramTab === "split-simulation" && (
              <div className="space-y-6">
                {/* Control Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition shadow-lg flex items-center gap-1.5",
                        isPlaying ? "bg-rose-600 border-rose-400 text-white" : "bg-emerald-600 border-emerald-400 text-white"
                      )}
                    &gt;
                      {isPlaying ? "⏸️ Pause Clock" : "▶️ Continuous Clock Stream"}
                    </button>
                    <button
                      onClick={stepClockCycle}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-700 hover:bg-cyan-600 text-cyan-100 border border-cyan-500 transition flex items-center gap-1.5"
                    >
                      <span>⏱️</span> Single Clock Pulse (↑↓)
                    </button>
                  </div>

                  {/* Live Clock Indicator */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-slate-400">Clock Line:</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full font-bold border transition",
                        clockPhase === 1
                          ? "bg-cyan-950 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950"
                          : "bg-slate-900 border-slate-800 text-slate-500"
                      )}
                    >
                      CLK = {clockPhase} {clockPhase === 1 ? "(HIGH PULSE ACTIVE)" : "(LOW IDLE)"}
                    </span>
                  </div>
                </div>

                {/* Timing Sliders & Exact Math Readout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clock Pulse Width (t_pulse):</span>
                      <span className="text-cyan-300 font-bold">{pulseWidthNs} ns</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="5"
                      value={pulseWidthNs}
                      onChange={(e) => setPulseWidthNs(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    /&gt;
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Internal Gate Delay (t_pd):</span>
                      <span className="text-rose-300 font-bold">{gateDelayNs} ns</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="1"
                      value={gateDelayNs}
                      onChange={(e) => setGateDelayNs(Number(e.target.value))}
                      className="w-full accent-rose-400"
                    /&gt;
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-center text-center">
                    <span className="text-slate-500 text-[10px] uppercase">Calculated Ringing Toggles</span>
                    <strong className="text-base text-rose-400">
                      N = {calculatedToggles} Toggles / Pulse
                    </strong>
                  </div>
                </div>

                {/* Precision Broadcast-Quality Circuit Schematics (Side-by-Side) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Circuit: Single JK Flip-Flop with Native SVG Running Feedback Particles */}
                  <div
                    className={clsx(
                      "p-5 rounded-2xl bg-slate-950 border space-y-4 transition",
                      clockPhase === 1 ? "hazard-active" : "border-rose-900/50"
                    )}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                        <span>❌</span> Single JK: Runaway Feedback Loop
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold">
                        {clockPhase === 1 ? "⚡ RUNAWAY RINGING" : "IDLE"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 overflow-x-auto">
                      <svg viewBox="0 0 540 280" className="w-full h-auto text-xs font-mono select-none">
                        <defs>
                          {/* Top Feedback Path Definition */}
                          <path
                            id="single_jk_top_path"
                            d="M 435,210 L 470,210 L 470,25 L 70,25 L 70,68 L 115,68"
                          />
                          {/* Bottom Feedback Path Definition */}
                          <path
                            id="single_jk_bottom_path"
                            d="M 435,70 L 490,70 L 490,255 L 70,255 L 70,212 L 115,212"
                          />
                        </defs>

                        {/* ── Global Feedback Lines ── */}
                        {/* Top Feedback Line from Q_bar (bottom) to Gate 1 */}
                        <path
                          d="M 435,210 L 470,210 L 470,25 L 70,25 L 70,68 L 115,68"
                          fill="none"
                          stroke={clockPhase === 1 ? "#f43f5e" : "#334155"}
                          strokeWidth={clockPhase === 1 ? "2.5" : "1.5"}
                          strokeDasharray={clockPhase === 1 ? "6,4" : "none"}
                        >
                          {clockPhase === 1 && (
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="-20"
                              dur="0.4s"
                              repeatCount="indefinite"
                            />
                          )}
                        </path>
                        <circle cx="435" cy="210" r="3.5" fill="#a855f7" />

                        {/* Bottom Feedback Line from Q (top) to Gate 2 */}
                        <path
                          d="M 435,70 L 490,70 L 490,255 L 70,255 L 70,212 L 115,212"
                          fill="none"
                          stroke={clockPhase === 1 ? "#f43f5e" : "#334155"}
                          strokeWidth={clockPhase === 1 ? "2.5" : "1.5"}
                          strokeDasharray={clockPhase === 1 ? "6,4" : "none"}
                        >
                          {clockPhase === 1 && (
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="-20"
                              dur="0.4s"
                              repeatCount="indefinite"
                            />
                          )}
                        </path>
                        <circle cx="435" cy="70" r="3.5" fill="#22c55e" />

                        {/* ── Native SVG Animated Traveling Photons on Feedback Wires ── */}
                        {clockPhase === 1 && (
                          <>
                            <circle r="5" fill="#f43f5e">
                              <animateMotion
                                dur="0.8s"
                                repeatCount="indefinite"
                                path="M 435,210 L 470,210 L 470,25 L 70,25 L 70,68 L 115,68"
                              />
                            </circle>
                            <circle r="5" fill="#22c55e">
                              <animateMotion
                                dur="0.8s"
                                repeatCount="indefinite"
                                path="M 435,70 L 490,70 L 490,255 L 70,255 L 70,212 L 115,212"
                              />
                            </circle>
                          </>
                        )}

                        {/* ── Primary Inputs ── */}
                        {/* J Input */}
                        <text x="15" y="85" fill="#14b8a6" fontWeight="bold" fontSize="11">J = 1</text>
                        <line x1="55" y1="80" x2="115" y2="80" stroke="#14b8a6" strokeWidth="2" />

                        {/* CLK Input */}
                        <text x="10" y="145" fill="#38bdf8" fontWeight="bold" fontSize="11">CLK={clockPhase}</text>
                        <line x1="65" y1="140" x2="90" y2="140" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="2" />
                        <line x1="90" y1="140" x2="90" y2="92" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="2" />
                        <line x1="90" y1="92" x2="115" y2="92" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="2" />
                        <line x1="90" y1="140" x2="90" y2="188" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="2" />
                        <line x1="90" y1="188" x2="115" y2="188" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="2" />
                        <circle cx="90" cy="140" r="3" fill="#38bdf8" />

                        {/* K Input */}
                        <text x="15" y="205" fill="#f43f5e" fontWeight="bold" fontSize="11">K = 1</text>
                        <line x1="55" y1="200" x2="115" y2="200" stroke="#f43f5e" strokeWidth="2" />

                        {/* ── Gate 1: Top 3-Input Steering NAND ── */}
                        <g transform="translate(115, 60)">
                          <path d="M 0,0 L 28,0 A 20,20 0 0,1 28,40 L 0,40 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                          <circle cx="51" cy="20" r="3.5" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" />
                          <text x="16" y="24" fill="#14b8a6" fontSize="8" fontWeight="bold">NAND1</text>
                        </g>

                        {/* ── Gate 2: Bottom 3-Input Steering NAND ── */}
                        <g transform="translate(115, 180)">
                          <path d="M 0,0 L 28,0 A 20,20 0 0,1 28,40 L 0,40 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                          <circle cx="51" cy="20" r="3.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                          <text x="16" y="24" fill="#f43f5e" fontSize="8" fontWeight="bold">NAND2</text>
                        </g>

                        {/* Steering output lines to storage latch */}
                        <line x1="170" y1="80" x2="250" y2="70" stroke="#10b981" strokeWidth="2" />
                        <line x1="170" y1="200" x2="250" y2="210" stroke="#10b981" strokeWidth="2" />

                        {/* ── Gate 3: Top Storage NAND ── */}
                        <g transform="translate(250, 50)">
                          <path d="M 0,0 L 28,0 A 20,20 0 0,1 28,40 L 0,40 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                          <circle cx="51" cy="20" r="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="16" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold">NAND3</text>
                        </g>

                        {/* ── Gate 4: Bottom Storage NAND ── */}
                        <g transform="translate(250, 190)">
                          <path d="M 0,0 L 28,0 A 20,20 0 0,1 28,40 L 0,40 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                          <circle cx="51" cy="20" r="3.5" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                          <text x="16" y="24" fill="#a855f7" fontSize="8" fontWeight="bold">NAND4</text>
                        </g>

                        {/* ── Storage Cross-Coupling X-Lines ── */}
                        {/* From Top Storage Output Q down into Bottom Storage Gate 4 */}
                        <line x1="330" y1="70" x2="330" y2="110" stroke={singleJkState ? "#22c55e" : "#64748b"} strokeWidth="1.5" />
                        <line x1="330" y1="110" x2="225" y2="180" stroke={singleJkState ? "#22c55e" : "#64748b"} strokeWidth="1.5" />
                        <line x1="225" y1="180" x2="225" y2="195" stroke={singleJkState ? "#22c55e" : "#64748b"} strokeWidth="1.5" />
                        <line x1="225" y1="195" x2="250" y2="195" stroke={singleJkState ? "#22c55e" : "#64748b"} strokeWidth="1.5" />
                        <circle cx="330" cy="70" r="3" fill="#22c55e" />

                        {/* From Bottom Storage Output Q_bar up into Top Storage Gate 3 */}
                        <line x1="330" y1="210" x2="330" y2="170" stroke={!singleJkState ? "#a855f7" : "#64748b"} strokeWidth="1.5" />
                        <line x1="330" y1="170" x2="225" y2="100" stroke={!singleJkState ? "#a855f7" : "#64748b"} strokeWidth="1.5" />
                        <line x1="225" y1="100" x2="225" y2="85" stroke={!singleJkState ? "#a855f7" : "#64748b"} strokeWidth="1.5" />
                        <line x1="225" y1="85" x2="250" y2="85" stroke={!singleJkState ? "#a855f7" : "#64748b"} strokeWidth="1.5" />
                        <circle cx="330" cy="210" r="3" fill="#a855f7" />

                        {/* ── Main Outputs ── */}
                        <line x1="305" y1="70" x2="445" y2="70" stroke={singleJkState ? "#22c55e" : "#64748b"} strokeWidth="2.5" />
                        <text x="455" y="75" fill={singleJkState ? "#22c55e" : "#94a3b8"} fontWeight="bold" fontSize="12">Q = {singleJkState}</text>

                        <line x1="305" y1="210" x2="445" y2="210" stroke={!singleJkState ? "#a855f7" : "#64748b"} strokeWidth="2.5" />
                        <text x="455" y="215" fill={!singleJkState ? "#a855f7" : "#94a3b8"} fontWeight="bold" fontSize="12">Q̄ = {singleJkState === 0 ? 1 : 0}</text>
                      </svg>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs">
                      <span className="text-rose-400 font-bold block">
                        Flips in Active Pulse: {singleJkOscCount} Toggles (Unpredictable State)
                      </span>
                    </div>
                  </div>

                  {/* Right Circuit: Master-Slave 8-NAND Gate Schematic with Native Animated 2-Phase Signal Flow */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono font-bold text-teal-400 flex items-center gap-1.5">
                        <span>✓</span> Master-Slave 8-NAND Two-Phase Isolation
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 uppercase font-bold">
                        Phase: {msPhase}
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 overflow-x-auto">
                      <svg viewBox="0 0 540 280" className="w-full h-auto text-xs font-mono select-none">
                        {/* ── Sub-Chassis Boundaries ── */}
                        {/* Master Chassis */}
                        <rect
                          x="55"
                          y="35"
                          width="185"
                          height="210"
                          rx="8"
                          fill={clockPhase === 1 ? "#0f2027" : "#0f172a"}
                          stroke="#14b8a6"
                          strokeWidth="1.5"
                          strokeDasharray={clockPhase === 1 ? "none" : "3 2"}
                        />
                        <text x="147" y="52" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="9">
                          MASTER STAGE {clockPhase === 1 ? "🔓 [SAMPLES J,K]" : "🔒 [LOCKED]"}
                        </text>

                        {/* Slave Chassis */}
                        <rect
                          x="295"
                          y="35"
                          width="185"
                          height="210"
                          rx="8"
                          fill={clockPhase === 0 ? "#1e1035" : "#0f172a"}
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          strokeDasharray={clockPhase === 0 ? "none" : "3 2"}
                        />
                        <text x="387" y="52" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="9">
                          SLAVE STAGE {clockPhase === 0 ? "🔓 [COMMITS TO Q]" : "🔒 [LOCKED]"}
                        </text>

                        {/* ── Primary Inputs ── */}
                        <text x="10" y="85" fill="#14b8a6" fontWeight="bold" fontSize="10">J=1</text>
                        <line x1="35" y1="80" x2="65" y2="80" stroke="#14b8a6" strokeWidth="2" />

                        <text x="8" y="145" fill="#38bdf8" fontWeight="bold" fontSize="10">CLK</text>
                        <line x1="32" y1="140" x2="55" y2="140" stroke="#38bdf8" strokeWidth="2" />

                        <text x="10" y="205" fill="#f43f5e" fontWeight="bold" fontSize="10">K=1</text>
                        <line x1="35" y1="200" x2="65" y2="200" stroke="#f43f5e" strokeWidth="2" />

                        {/* ── Clock Distribution Line ── */}
                        {/* Line to Master */}
                        <line x1="55" y1="140" x2="60" y2="140" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="60" y1="92" x2="60" y2="188" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="1.5" />
                        <line x1="60" y1="92" x2="70" y2="92" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="1.5" />
                        <line x1="60" y1="188" x2="70" y2="188" stroke={clockPhase ? "#38bdf8" : "#475569"} strokeWidth="1.5" />

                        {/* Clock Inverter to Slave */}
                        <line x1="55" y1="140" x2="250" y2="140" stroke="#38bdf8" strokeWidth="1.5" />
                        <g transform="translate(250, 132)">
                          <polygon points="0,0 16,8 0,16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                          <circle cx="21" cy="8" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                        </g>

                        {/* Inverted Clock to Slave Steering Gates */}
                        <line x1="275" y1="140" x2="290" y2="140" stroke={!clockPhase ? "#a855f7" : "#475569"} strokeWidth="1.5" />
                        <line x1="290" y1="92" x2="290" y2="188" stroke={!clockPhase ? "#a855f7" : "#475569"} strokeWidth="1.5" />
                        <line x1="290" y1="92" x2="310" y2="92" stroke={!clockPhase ? "#a855f7" : "#475569"} strokeWidth="1.5" />
                        <line x1="290" y1="188" x2="310" y2="188" stroke={!clockPhase ? "#a855f7" : "#475569"} strokeWidth="1.5" />

                        {/* ── Master Gates (N1..N4) ── */}
                        <g transform="translate(70, 70)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#14b8a6" fontSize="7" textAnchor="middle" fontWeight="bold">N1</text>
                        </g>
                        <g transform="translate(70, 175)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#f43f5e" fontSize="7" textAnchor="middle" fontWeight="bold">N2</text>
                        </g>
                        <g transform="translate(150, 70)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#38bdf8" fontSize="7" textAnchor="middle" fontWeight="bold">N3</text>
                        </g>
                        <g transform="translate(150, 175)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#38bdf8" fontSize="7" textAnchor="middle" fontWeight="bold">N4</text>
                        </g>

                        {/* Master Internal Lines */}
                        <line x1="96" y1="82" x2="150" y2="76" stroke="#10b981" strokeWidth="1.5" />
                        <line x1="96" y1="187" x2="150" y2="193" stroke="#10b981" strokeWidth="1.5" />

                        {/* Master Storage Cross-Coupling */}
                        <line x1="190" y1="82" x2="190" y2="115" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="190" y1="115" x2="135" y2="175" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="135" y1="175" x2="150" y2="180" stroke="#38bdf8" strokeWidth="1" />

                        <line x1="190" y1="187" x2="190" y2="155" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="190" y1="155" x2="135" y2="95" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="135" y1="95" x2="150" y2="88" stroke="#38bdf8" strokeWidth="1" />

                        {/* ── Intermediate Transmission Lines (Y & Y_bar) ── */}
                        <line
                          x1="176"
                          y1="82"
                          x2="310"
                          y2="82"
                          stroke={masterY ? "#22c55e" : "#475569"}
                          strokeWidth="2"
                          strokeDasharray={clockPhase === 1 ? "5,3" : "none"}
                        >
                          {clockPhase === 1 && (
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="-16"
                              dur="0.4s"
                              repeatCount="indefinite"
                            />
                          )}
                        </line>
                        <text x="245" y="75" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Y={masterY}</text>

                        <line
                          x1="176"
                          y1="187"
                          x2="310"
                          y2="187"
                          stroke={masterY === 0 ? "#a855f7" : "#475569"}
                          strokeWidth="2"
                          strokeDasharray={clockPhase === 1 ? "5,3" : "none"}
                        >
                          {clockPhase === 1 && (
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="-16"
                              dur="0.4s"
                              repeatCount="indefinite"
                            />
                          )}
                        </line>
                        <text x="245" y="200" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Ȳ={masterY === 0 ? 1 : 0}</text>

                        {/* ── Native Animated Photons on Intermediate Lines ── */}
                        {clockPhase === 1 && (
                          <>
                            <circle r="4" fill="#22c55e">
                              <animate
                                attributeName="cx"
                                values="176; 310"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="cy"
                                values="82; 82"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                            </circle>
                            <circle r="4" fill="#a855f7">
                              <animate
                                attributeName="cx"
                                values="176; 310"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="cy"
                                values="187; 187"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          </>
                        )}

                        {/* ── Slave Gates (N5..N8) ── */}
                        <g transform="translate(310, 70)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#a855f7" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#a855f7" fontSize="7" textAnchor="middle" fontWeight="bold">N5</text>
                        </g>
                        <g transform="translate(310, 175)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#a855f7" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#a855f7" fontSize="7" textAnchor="middle" fontWeight="bold">N6</text>
                        </g>
                        <g transform="translate(390, 70)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#22c55e" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#22c55e" fontSize="7" textAnchor="middle" fontWeight="bold">N7</text>
                        </g>
                        <g transform="translate(390, 175)">
                          <rect width="26" height="24" rx="3" fill="#1e293b" stroke="#a855f7" strokeWidth="1.2" />
                          <text x="13" y="16" fill="#a855f7" fontSize="7" textAnchor="middle" fontWeight="bold">N8</text>
                        </g>

                        {/* Slave Internal Lines */}
                        <line x1="336" y1="82" x2="390" y2="76" stroke="#10b981" strokeWidth="1.5" />
                        <line x1="336" y1="187" x2="390" y2="193" stroke="#10b981" strokeWidth="1.5" />

                        {/* ── Final Outputs ── */}
                        <line x1="416" y1="82" x2="480" y2="82" stroke={slaveQ ? "#22c55e" : "#64748b"} strokeWidth="2.5" />
                        <text x="490" y="86" fill={slaveQ ? "#22c55e" : "#94a3b8"} fontSize="11" fontWeight="bold">Q={slaveQ}</text>

                        <line x1="416" y1="187" x2="480" y2="187" stroke={slaveQ === 0 ? "#a855f7" : "#64748b"} strokeWidth="2.5" />
                        <text x="490" y="191" fill={slaveQ === 0 ? "#a855f7" : "#94a3b8"} fontSize="11" fontWeight="bold">Q̄={slaveQ === 0 ? 1 : 0}</text>

                        {/* ── Global Long Feedback from Slave to Master ── */}
                        <polyline points="450,82 450,265 45,265 45,212 70,212" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2" />
                        <polyline points="450,187 450,15 45,15 45,68 70,68" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 2" />
                      </svg>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-teal-800/40 text-center font-mono text-xs">
                      <span className="text-teal-300 font-bold block">
                        Master-Slave State: EXACTLY 1 Deterministic Toggle (100% Stable)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: Live 4-Channel Logic Analyzer ────────── */}
            {activeDiagramTab === "logic-analyzer" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Live 4-Channel Oscilloscope &amp; Logic Analyzer Trace
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto">
                  <svg viewBox="0 0 920 280" className="w-full h-auto text-xs font-mono select-none">
                    {/* Grid Background Lines */}
                    <line x1="220" y1="20" x2="220" y2="260" stroke="#1e293b" strokeWidth="1" />
                    <line x1="380" y1="20" x2="380" y2="260" stroke="#1e293b" strokeWidth="1" />
                    <line x1="540" y1="20" x2="540" y2="260" stroke="#1e293b" strokeWidth="1" />
                    <line x1="700" y1="20" x2="700" y2="260" stroke="#1e293b" strokeWidth="1" />
                    <line x1="860" y1="20" x2="860" y2="260" stroke="#1e293b" strokeWidth="1" />

                    {/* Channel 1: Clock */}
                    <text x="25" y="45" fill="#38bdf8" fontWeight="bold">CH1: CLK Signal</text>
                    <polyline points="220,55 300,55 300,25 460,25 460,55 620,55 620,25 780,25 780,55 880,55" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    {/* Channel 2: Single JK (Runaway Oscillation) */}
                    <text x="25" y="110" fill="#f43f5e" fontWeight="bold">CH2: Single JK Q(t)</text>
                    <polyline
                      points="220,120 300,120 300,90 325,90 325,120 350,120 350,90 375,90 375,120 400,120 400,90 425,90 425,120 450,120 450,90 460,90 460,120 620,120 620,90 645,90 645,120 670,120 670,90 695,90 695,120 720,120 720,90 745,90 745,120 770,120 770,90 780,90 780,120 880,120"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />

                    {/* Channel 3: Master Intermediate Y */}
                    <text x="25" y="180" fill="#14b8a6" fontWeight="bold">CH3: Master State Y</text>
                    <polyline points="220,190 300,190 300,160 620,160 620,190 880,190" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                    {/* Channel 4: Slave Final Output Q */}
                    <text x="25" y="245" fill="#22c55e" fontWeight="bold">CH4: Slave Final Q</text>
                    <polyline points="220,255 460,255 460,225 780,225 780,255 880,255" fill="none" stroke="#22c55e" strokeWidth="3" />

                    {/* Vertical Event Lines */}
                    <line x1="300" y1="20" x2="300" y2="260" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="300" y="15" fill="#f59e0b" textAnchor="middle" fontSize="10">CLK ↑ Rise Edge (Master Samples)</text>

                    <line x1="460" y1="20" x2="460" y2="260" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="460" y="15" fill="#10b981" textAnchor="middle" fontSize="10">CLK ↓ Fall Edge (Slave Updates Q)</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Complete 8-NAND Gate Schematic ────────── */}
            {activeDiagramTab === "8nand-schematic" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Complete 8-NAND Gate Master-Slave Silicon Architecture with Clock Inverter
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto">
                  <svg viewBox="0 0 920 260" className="w-full h-auto text-xs font-mono select-none">
                    {/* Master Latch Boundary */}
                    <rect x="180" y="20" width="320" height="220" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="340" y="40" fill="#14b8a6" textAnchor="middle" fontWeight="bold">MASTER STAGE (CLK Active)</text>

                    {/* Slave Latch Boundary */}
                    <rect x="540" y="20" width="320" height="220" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="700" y="40" fill="#a855f7" textAnchor="middle" fontWeight="bold">SLAVE STAGE (CLK̄ Active)</text>

                    {/* Inputs */}
                    <text x="25" y="75" fill="#14b8a6" fontWeight="bold">J (Input)</text>
                    <line x1="85" y1="70" x2="200" y2="70" stroke="#14b8a6" strokeWidth="2.5" />

                    <text x="20" y="130" fill="#38bdf8" fontWeight="bold">CLK</text>
                    <line x1="60" y1="125" x2="140" y2="125" stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx="140" cy="125" r="3.5" fill="#38bdf8" />

                    <text x="25" y="195" fill="#f43f5e" fontWeight="bold">K (Input)</text>
                    <line x1="85" y1="190" x2="200" y2="190" stroke="#f43f5e" strokeWidth="2.5" />

                    {/* Clock Inverter to Slave */}
                    <line x1="140" y1="125" x2="510" y2="125" stroke="#38bdf8" strokeWidth="1.5" />
                    <polygon points="510,120 525,125 510,130" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="528" cy="125" r="3" fill="#0f172a" stroke="#38bdf8" />

                    {/* Intermediate Signals */}
                    <line x1="450" y1="75" x2="560" y2="75" stroke="#38bdf8" strokeWidth="2" />
                    <text x="505" y="65" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Y</text>

                    <line x1="450" y1="185" x2="560" y2="185" stroke="#38bdf8" strokeWidth="2" />
                    <text x="505" y="200" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Ȳ</text>

                    {/* Final Outputs */}
                    <line x1="810" y1="75" x2="880" y2="75" stroke="#22c55e" strokeWidth="3" />
                    <text x="890" y="80" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>

                    <line x1="810" y1="185" x2="880" y2="185" stroke="#a855f7" strokeWidth="3" />
                    <text x="890" y="190" fill="#a855f7" fontWeight="bold" fontSize="16">Q̄</text>

                    {/* Global Feedback from Slave to Master */}
                    <polyline points="840,75 840,250 160,250 160,195 200,195" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polyline points="840,185 840,10 160,10 160,65 200,65" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 4: 1s-Catching Hazard Simulator ─────────── */}
            {activeDiagramTab === "ones-catching" && (
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block">
                  The "1s Catching" Anomaly in Pulse-Triggered Master-Slave Flip-Flops
                </span>
                
                <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/40 space-y-4 text-xs font-mono">
                  <p className="text-slate-300 leading-relaxed">
                    Because the Master latch remains transparent throughout the entire time <code className="text-cyan-300 font-mono">CLK=1</code>, any transient noise glitch on input J or K that spikes HIGH even for 1 nanosecond permanently latches a 1 into internal node Y.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="space-y-1">
                      <span className="text-slate-400 block">Current Master Latched Value:</span>
                      <div className="text-2xl font-bold text-purple-300">
                        Master Y = {onesCatchingMasterY}
                      </div>
                    </div>

                    <button
                      onClick={triggerNoiseGlitch}
                      className={clsx(
                        "px-4 py-2 rounded-xl font-bold border transition shadow-lg flex items-center gap-2",
                        noiseInjected
                          ? "bg-rose-600 border-rose-400 text-white animate-ring"
                          : "bg-purple-800 hover:bg-purple-700 text-purple-100 border-purple-500"
                      )}
                    >
                      <span>⚡</span> Inject 1ns Noise Spike on J
                    </button>

                    <button
                      onClick={() => setOnesCatchingMasterY(0)}
                      className="px-3 py-2 rounded-xl font-bold bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 transition"
                    &gt;
                      Reset State
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200">
                    <strong>Why Modern ASICs use Edge-Triggering:</strong> True edge-triggered D flip-flops only sample inputs during a tiny sub-nanosecond window (t_su + t_h), completely ignoring noise spikes during the rest of the clock cycle!
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Step-by-Step Cycle Walkthrough Timeline ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⏱️</span> Step-by-Step Clock Cycle Walkthrough
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6">
            <div className="flex gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
              {[
                { step: 1, title: "1. Clock LOW (Idle State)" },
                { step: 2, title: "2. Clock Rising Edge (↑)" },
                { step: 3, title: "3. Clock HIGH (Master Samples)" },
                { step: 4, title: "4. Clock Falling Edge (↓ Slave Updates)" }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setTimelineStep(s.step)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold border whitespace-nowrap transition",
                    timelineStep === s.step
                      ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                &gt;
                  {s.title}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
              {timelineStep === 1 && (
                <div>
                  <strong className="text-teal-300 text-sm block mb-1">Step 1: Clock LOW (Idle State, CLK = 0)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Master latch is disabled (<code className="text-slate-400">CLK = 0</code>). Inverted clock line is HIGH (<code className="text-purple-300">CLK̄ = 1</code>), holding the Slave latch in transparent state. Outputs Q and Q̄ remain stable from the previous cycle.
                  </p>
                </div>
              )}
              {timelineStep === 2 && (
                <div>
                  <strong className="text-cyan-300 text-sm block mb-1">Step 2: Clock Rising Edge (CLK 0 &rarr; 1 Transition)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The inverter immediately pulls <code className="text-purple-300">CLK̄ &rarr; 0</code>, locking the Slave stage and freezing output Q. At the same instant, Master stage enable rises to 1, beginning input sampling.
                  </p>
                </div>
              )}
              {timelineStep === 3 && (
                <div>
                  <strong className="text-amber-300 text-sm block mb-1">Step 3: Clock Held HIGH (Master Sampling Window, CLK = 1)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Master NAND gates evaluate inputs J and K combined with global feedback from Slave. Intermediate node Y assumes its next state value. The Slave remains locked, isolating the circuit output from feedback.
                  </p>
                </div>
              )}
              {timelineStep === 4 && (
                <div>
                  <strong className="text-emerald-300 text-sm block mb-1">Step 4: Clock Falling Edge (CLK 1 &rarr; 0 Transition, Slave Commits)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Master is disabled and isolated from inputs. Concurrently, <code className="text-purple-300">CLK̄ &rarr; 1</code> enables the Slave, transferring intermediate bit Y to final output Q with exactly 1 clean toggle.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── 5. Synchronous State Table ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📊</span> Master-Slave Flip-Flop Synchronous State Table
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-3.5">Clock Event</th>
                  <th className="p-3.5">J Input</th>
                  <th className="p-3.5">K Input</th>
                  <th className="p-3.5 text-teal-300">Master State Y (on ↑)</th>
                  <th className="p-3.5 text-emerald-300">Slave Output Q(t+1) (on ↓)</th>
                  <th className="p-3.5">Operating Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5 text-teal-300">Q(t)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Q(t)</td>
                  <td className="p-3.5 text-slate-400">Hold State (No Change)</td>
                </tr>
                <tr>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5 text-rose-300">0</td>
                  <td className="p-3.5 text-rose-400 font-bold">0</td>
                  <td className="p-3.5 text-rose-300">Synchronous Reset</td>
                </tr>
                <tr>
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5">0</td>
                  <td className="p-3.5 text-emerald-300">1</td>
                  <td className="p-3.5 text-emerald-400 font-bold">1</td>
                  <td className="p-3.5 text-emerald-300">Synchronous Set</td>
                </tr>
                <tr className="bg-teal-950/20 font-bold text-teal-200">
                  <td className="p-3.5">Pulse (↑↓)</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5">1</td>
                  <td className="p-3.5 text-cyan-300">Q̄(t)</td>
                  <td className="p-3.5 text-cyan-400 font-bold">Q̄(t)</td>
                  <td className="p-3.5 text-cyan-300">Clean Toggle (f_out = f_clk / 2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 6. Interactive Calculation Challenge ───────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/40 space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🧮</span> Interactive Hardware Math Challenge: Calculate Oscillation Frequency
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose a single JK flip-flop has gate propagation delay <code className="text-rose-300 font-mono">t_pd = 3 ns</code> and the clock pulse width is <code className="text-cyan-300 font-mono">t_pulse = 45 ns</code>. How many times will output Q oscillate during a single clock pulse?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter number of toggles..."
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              /&gt;
              <button
                onClick={checkQuizAnswer}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold transition"
              >
                Verify Answer
              </button>
            </div>

            {quizFeedback && (
              <div
                className={clsx(
                  "p-3 rounded-xl text-xs font-mono font-bold",
                  quizFeedback.correct
                    ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                    : "bg-rose-950/60 border border-rose-800 text-rose-300"
                )}
              >
                {quizFeedback.msg}
              </div>
            )}
          </div>
        </section>

        {/* ─── 7. Hint Section ────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-800/40 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>💡</span> Conceptual Hints for Hardware Engineers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Think about…</strong>
                What happens to the global feedback path when the slave latch is disabled? Does changing the inputs affect the outputs immediately?
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Observe carefully…</strong>
                Notice that intermediate node Y updates during the rising edge (↑), but final output Q stays frozen until the falling edge (↓).
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Try changing this…</strong>
                Increase the clock pulse width in the simulator to 60ns and notice how the single JK oscillates 12 times while Master-Slave remains at 1!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Professional Tips & Tricks ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">🛠️</span> Professional Tips &amp; Tricks for Silicon Designers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">1. Slew Rate &amp; Inverter Delay</strong>
              <p className="leading-relaxed">
                Always ensure clock slew rates are &lt; 2ns. If the clock inverter has significant propagation delay, an overlap window can occur where both Master and Slave are briefly transparent.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">2. 1s Catching Mitigation</strong>
              <p className="leading-relaxed">
                In pulse-triggered designs, add input RC filtering or transition to 6-transistor true edge-triggered D flip-flops to prevent transient glitches from setting the master latch.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">3. Clock Gating Power Savings</strong>
              <p className="leading-relaxed">
                Master-Slave flip-flops consume static clock tree power because the internal inverter switches every cycle. Use integrated clock gating (ICG) cells when data is idle.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 9. Real-World Engineering Scenarios (6 Examples) ─ */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Case Studies (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1: Barrackpore Railway */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    BARRACKPORE RAILWAY TELECOM
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Noise Track Pulse Counter</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata investigated erratic track-circuit pulse counters near Barrackpore station. Single JK flip-flops had race-around triggered by wide clock pulses from inductive line drivers. Replacing them with Master-Slave 74LS76 ICs restored 100% deterministic divide-by-2 prescaling.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Deterministic Division under Inductive Line Spikes
              </div>
            </div>

            {/* Example 2: Jadavpur VLSI */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    JADAVPUR DIGITAL VLSI LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Eliminating 1s Catching in FPGA Emulation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu tested legacy master-slave designs on Xilinx FPGAs. By converting pulse-triggered master-slave cells to edge-triggered D flip-flops, the team eliminated transient noise catching while lowering silicon power consumption by 28%.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                28% Lower Silicon Power via Edge-Triggering
              </div>
            </div>

            {/* Example 3: Ichapur Rifle Factory */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    ICHAPUR ORDNANCE FACTORY
                  </span>
                  <span className="text-xs text-slate-400">Manufacturing Division</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Synchronous CNC Optical Encoder</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Abhronila designed quadrature decoding counters for precision CNC lathes at Ichapur. Using Master-Slave JK flip-flops in toggle mode guaranteed glitch-free pulse counting even when spindle motor vibrations caused wide optical pulse duty cycles.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                High-Precision Quadrature State Tracking
              </div>
            </div>

            {/* Example 4: Kolkata Smart Grid */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                    KOLKATA SMART GRID CONTROL
                  </span>
                  <span className="text-xs text-slate-400">CESC Power Grid</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Substation Telemetry Frequency Divider</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita and Mahima implemented 50 Hz power-line telemetry synchronizers. Cascading 4 Master-Slave JK flip-flops divided the 50 Hz sine wave into 3.125 Hz sample triggers with zero cumulative phase jitter or race hazards.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                Zero Cumulative Phase Jitter in Telemetry Bus
              </div>
            </div>

            {/* Example 5: Salt Lake Sector V DDR */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300">
                    SALT LAKE SECTOR V ASIC HUB
                  </span>
                  <span className="text-xs text-slate-400">Semiconductor R&amp;D</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">DDR Memory Command Pipeline</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Engineers designing DDR command registers utilized two-phase clock gating to stage burst commands across clock domain boundaries, eliminating metastability across 1.6 GHz bus speeds.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300">
                Metastability Elimination across GHz Memory Clocks
              </div>
            </div>

            {/* Example 6: ISRO Satellite Tracking */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    ISRO TELEMETRY STATION
                  </span>
                  <span className="text-xs text-slate-400">Ground Control Kolkata</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Deep Space Radiation-Hardened Counters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Space-grade sequential registers deployed Master-Slave radiation-hardened cells with dual-rail feedback to withstand single-event upsets (SEUs) from cosmic radiation in low-earth orbit.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                Radiation-Hardened SEU Fault Tolerance
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. Mini Checklist ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-teal-400">✅</span> Student's Mini Checklist for Exams &amp; Lab Vivas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Race-around condition ONLY happens when J=1, K=1, and CLK=1.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                The mathematical inequality is: t_pd &lt; t_pulse &lt; T.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Master samples on the RISING edge (CLK=1); Slave updates on FALLING edge (CLK=0).
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Total gates in Master-Slave JK = 8 NAND gates + 1 Inverter.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 11. Senior Pitfalls & Best Practices ───────────── */}
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
                <strong className="text-rose-200 block mb-1">• Expecting Immediate Output on Clock Rise:</strong>
                Remember that in a Master-Slave flip-flop, output Q does NOT change when CLK goes HIGH. Output Q updates strictly when CLK transitions from HIGH to LOW (falling edge)!
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• The 1s Catching Anomaly:</strong>
                Because the Master stage remains transparent while CLK=1, a 1-nanosecond noise spike on J can permanently latch a 1 into the Master for the rest of the cycle.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Keep Inverter Delay Smaller than Master-to-Slave Propagation:</strong>
                Ensure the clock inverter delay is well within timing guard bands to prevent overlap where both Master and Slave are simultaneously transparent.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Target Edge-Triggered Flip-Flops in ASIC Synthesis:</strong>
                Modern synthesis tools (Synopsys Design Compiler) default to 6-transistor true edge-triggered D flip-flops rather than 8-NAND master-slave latches.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. FAQ & Practice Questions ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Master-Slave Race-Around FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 13. Printable Plain Text Note ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Master-Slave Race-Around Elimination"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

        {/* ─── 14. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Whenever I teach sequential circuits in Barrackpore, I emphasize: Race-around is not a logic defect — it is a timing collision between gate propagation delay and clock pulse width! " +
              "The Master-Slave architecture was the historical breakthrough that proved two-phase clock isolation guarantees 100% deterministic digital memory."
            }
          />
        </section>

        {/* ─── 15. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 13 · Master-Slave Flip-Flop · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic13;
