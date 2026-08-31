import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Flip-Flop Timing Parameters & Metastability Elimination Masterclass
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Exhaustive educational masterclass with separate in-depth explanation sections,
 *                        live interactive setup/hold timing simulator, metastability ball-on-hill analog,
 *                        real-time STA slack calculator, 6 real-world case studies, and 30 questions.
 */
const Topic14 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("timing-analyzer");
  
  // Interactive Timing Parameters (in nanoseconds)
  const [clockPeriodNs, setClockPeriodNs] = useState(10); // 10ns = 100MHz
  const [dataArrivalTimeNs, setDataArrivalTimeNs] = useState(2.0); // relative to clock edge
  const [setupTimeNs, setSetupTimeNs] = useState(1.5);
  const [holdTimeNs, setHoldTimeNs] = useState(1.0);
  const [clkToQNs, setClkToQNs] = useState(1.8);
  const [clockSkewNs, setClockSkewNs] = useState(0.0);
  const [combDelayNs, setCombDelayNs] = useState(4.0);

  // Timeline Step
  const [timelineStep, setTimelineStep] = useState(1);

  // STA Calculator Inputs
  const [staTclk, setStaTclk] = useState("8.0");
  const [staTcq, setStaTcq] = useState("1.5");
  const [staTcomb, setStaTcomb] = useState("4.2");
  const [staTsu, setStaTsu] = useState("1.2");
  const [staTh, setStaTh] = useState("0.8");
  const [staTskew, setStaTskew] = useState("0.3");

  // Quiz State
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState(null);

  const sectionRefs = useRef([]);

  // Timing Status Evaluation
  // Clock edge occurs at T_edge = 5.0ns in local window
  const clockEdgeTime = 5.0;
  const isSetupViolated = dataArrivalTimeNs > (clockEdgeTime - setupTimeNs) && dataArrivalTimeNs <= clockEdgeTime;
  const isHoldViolated = dataArrivalTimeNs >= clockEdgeTime && dataArrivalTimeNs < (clockEdgeTime + holdTimeNs);
  const isMetastable = isSetupViolated || isHoldViolated;

  // STA Slack Computations
  const numTclk = parseFloat(staTclk) || 0;
  const numTcq = parseFloat(staTcq) || 0;
  const numTcomb = parseFloat(staTcomb) || 0;
  const numTsu = parseFloat(staTsu) || 0;
  const numTh = parseFloat(staTh) || 0;
  const numTskew = parseFloat(staTskew) || 0;

  const setupSlack = ((numTclk + numTskew) - (numTcq + numTcomb + numTsu)).toFixed(2);
  const holdSlack = ((numTcq + numTcomb) - (numTskew + numTh)).toFixed(2);
  const fmaxMhz = numTcq + numTcomb + numTsu - numTskew > 0 
    ? ((1 / (numTcq + numTcomb + numTsu - numTskew)) * 1000).toFixed(1) 
    : "0";

  // Quick Preset Scenarios
  const loadScenario = (type) => {
    if (type === "safe") {
      setDataArrivalTimeNs(2.0); // 3ns before edge
      setSetupTimeNs(1.5);
      setHoldTimeNs(1.0);
    } else if (type === "setup-violation") {
      setDataArrivalTimeNs(4.2); // Only 0.8ns before edge (violates 1.5ns)
      setSetupTimeNs(1.5);
      setHoldTimeNs(1.0);
    } else if (type === "hold-violation") {
      setDataArrivalTimeNs(5.4); // 0.4ns after edge (violates 1.0ns hold)
      setSetupTimeNs(1.5);
      setHoldTimeNs(1.0);
    } else if (type === "high-frequency") {
      setClockPeriodNs(5.0); // 200MHz
      setDataArrivalTimeNs(2.5);
      setSetupTimeNs(1.2);
      setHoldTimeNs(0.8);
    }
  };

  // Quiz Verification
  const verifyQuiz = () => {
    if (quizAnswer.trim() === "200") {
      setQuizFeedback({
        correct: true,
        msg: "🎉 Correct! T_min = t_cq + t_comb + t_su = 1.2ns + 2.6ns + 1.2ns = 5.0ns → f_max = 1 / 5ns = 200 MHz!"
      });
    } else {
      setQuizFeedback({
        correct: false,
        msg: "❌ Incorrect. Remember: T_min = 1.2 + 2.6 + 1.2 = 5.0ns. f_max = 1000 / 5.0 = 200 MHz."
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
        @keyframes pulse-hazard-glow {
          0% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 10px rgba(244, 63, 94, 0.2); }
          50% { border-color: rgba(244, 63, 94, 1); box-shadow: 0 0 25px rgba(244, 63, 94, 0.6); }
          100% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 10px rgba(244, 63, 94, 0.2); }
        }
        .timing-hazard-active {
          animation: pulse-hazard-glow 0.6s infinite ease-in-out;
        }
        @keyframes analog-ringing {
          0% { transform: translateY(0px); }
          25% { transform: translateY(-4px); }
          50% { transform: translateY(4px); }
          75% { transform: translateY(-2px); }
          100% { transform: translateY(0px); }
        }
        .animate-metastable-ringing {
          animation: analog-ringing 0.2s infinite ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 14</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Flip-Flop Timing Parameters, Clock Skew &amp; Metastability Elimination
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The definitive silicon engineering guide to sequential timing constraints: Setup Time (t_su), Hold Time (t_h),
            Propagation Delay (t_cq), Clock Skew (t_skew), Metastability physics, and MTBF resolution.
          </p>

          {/* Quick Scenario Presets */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase mr-1">Timing Presets:</span>
            <button
              onClick={() => loadScenario("safe")}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/80 transition"
            >
              🟢 Safe Timing (Positive Slack)
            </button>
            <button
              onClick={() => loadScenario("setup-violation")}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900/80 transition"
            >
              🔴 Setup Violation (Metastable Trap)
            </button>
            <button
              onClick={() => loadScenario("hold-violation")}
              className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-900/80 transition"
            >
              🟠 Hold Violation (Data Overwrite Race)
            </button>
            <button
              onClick={() => loadScenario("high-frequency")}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/80 transition"
            >
              ⚡ 200 MHz Clock Budget
            </button>
          </div>
        </header>

        {/* ─── 2. Teacher's Masterclass Mathematical Foundations ─ */}
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
                Teacher's Executive Summary: The 4 Fundamental Laws of Sequential Timing
              </h2>
              <p className="text-xs text-slate-400">
                The exact mathematical relationships governing synchronous digital hardware reliability
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-teal-800/40 space-y-2">
              <span className="text-teal-400 font-bold block uppercase">1. Setup Condition</span>
              <div className="text-base text-white font-bold">t_data &le; t_clk - t_su</div>
              <p className="text-slate-400 leading-relaxed">
                Data must settle before the setup window opens. Determines maximum clock frequency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/40 space-y-2">
              <span className="text-amber-400 font-bold block uppercase">2. Hold Condition</span>
              <div className="text-base text-white font-bold">t_hold &ge; t_clk + t_h</div>
              <p className="text-slate-400 leading-relaxed">
                Data must stay stable after clock edge. Independent of clock frequency!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-2">
              <span className="text-cyan-400 font-bold block uppercase">3. Maximum Frequency</span>
              <div className="text-base text-white font-bold">f_max = 1 / T_min</div>
              <p className="text-slate-400 leading-relaxed">
                T_min = t_cq + t_comb_max + t_su - t_skew. Sets maximum CPU clock limit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2">
              <span className="text-purple-400 font-bold block uppercase">4. MTBF Formula</span>
              <div className="text-base text-white font-bold">MTBF &prop; exp(t_r / &tau;)</div>
              <p className="text-slate-400 leading-relaxed">
                Mean Time Between Failures scales exponentially with resolution time t_r in 2-FF synchronizers.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEPARATE IN-DEPTH EXPLANATION SECTIONS ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-12">
          
          {/* Explanation 3A: Setup & Hold Time Physics */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">🔬</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 1: Detailed Physical Explanation of Setup Time (t_su) &amp; Hold Time (t_h)
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-teal-300 font-mono text-sm block">
                  A. What Happens Inside Silicon During Setup Time (t_su)?
                </strong>
                <p>
                  A D flip-flop contains an internal master sampling stage (transmission gate switch followed by an inverter pair). For the input bit to be properly recognized, the input voltage must charge or discharge the internal gate oxide capacitance (C_gate) to a solid CMOS logic HIGH (&gt; 0.7 V_DD) or LOW (&lt; 0.3 V_DD).
                </p>
                <p>
                  <strong>Setup Time (t_su)</strong> is the physical charging window required for internal node voltages to reach steady-state before the clock edge disables the input transmission gate.
                </p>
                <div className="p-2.5 rounded bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
                  ⚠️ <strong>If violated:</strong> The transmission gate cuts off while internal node voltage is halfway between 0 and V_DD (e.g. 0.9V in a 1.8V system), trapping the circuit in metastability.
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-amber-300 font-mono text-sm block">
                  B. What Happens Inside Silicon During Hold Time (t_h)?
                </strong>
                <p>
                  When the external clock line transitions from 0 to 1, this edge must propagate through internal clock inverters inside the flip-flop cell to shut off the master transmission gate.
                </p>
                <p>
                  This internal inverter delay creates a sub-nanosecond window where the input gate is still partially open even after the clock has risen.
                </p>
                <p>
                  <strong>Hold Time (t_h)</strong> is the mandatory time the data input must remain stable after the clock edge to prevent new racing data from leaking into the master latch before the internal switch is fully turned OFF.
                </p>
                <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs">
                  ⚠️ <strong>If violated:</strong> The new data value corrupts the current cycle's sampled value before the gate closes.
                </div>
              </div>
            </div>
          </div>

          {/* Explanation 3B: Propagation Delay & Maximum Operating Frequency */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">⏱️</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 2: Clock-to-Q Propagation Delay (t_cq) &amp; The Maximum Frequency Bound
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                In any synchronous pipeline, data launched by Register 1 (FF1) on a clock edge must propagate through the flip-flop output, traverse the combinational logic cloud (ALUs, multiplexers, adders), and arrive at Register 2 (FF2) before FF2's setup window closes on the next clock edge.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-cyan-300 font-bold text-sm">
                  The Universal Setup Timing Invariant:
                </div>
                <div className="text-white text-base">
                  T_clk &ge; t_cq + t_comb(max) + t_su - t_skew
                </div>
                <div className="text-slate-400">
                  Where:
                  <br />• <strong>T_clk</strong> = Clock period (1 / f_clk)
                  <br />• <strong>t_cq</strong> = Clock-to-Q delay of Launch Flip-Flop
                  <br />• <strong>t_comb(max)</strong> = Longest path delay through combinational logic
                  <br />• <strong>t_su</strong> = Setup time requirement of Capture Flip-Flop
                  <br />• <strong>t_skew</strong> = Clock arrival difference (t_clk_capture - t_clk_launch)
                </div>
              </div>

              <p>
                <strong>Maximum Operating Frequency:</strong> The absolute upper limit on CPU clock speed is given by the reciprocal of the longest critical path:
                <br />
                <code className="text-emerald-300 font-mono font-bold text-sm">
                  f_max = 1 / [ t_cq + t_comb(max) + t_su - t_skew ]
                </code>
              </p>
            </div>
          </div>

          {/* Explanation 3C: Clock Skew & The Asymmetry of Setup vs Hold Violations */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">⚖️</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 3: Clock Skew Dynamics &amp; Why Hold Violations Cannot Be Fixed by Slowing Down the Clock
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-cyan-300 font-mono text-sm block">
                  A. Setup Violations (Max-Delay / Frequency Dependent)
                </strong>
                <p>
                  Setup checks compare data launched on Clock Edge N against capture on Clock Edge N+1.
                </p>
                <p>
                  If data takes too long to calculate, you can <strong>lower the clock frequency</strong> (increasing T_clk). This provides extra nanoseconds for the logic to finish calculating, easily restoring positive setup slack.
                </p>
                <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs">
                  ✓ Fix in Silicon: Slow down the clock, optimize critical logic paths, or pipeline the stage into two cycles.
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-rose-300 font-mono text-sm block">
                  B. Hold Violations (Min-Delay / Fatal Silicon Defect)
                </strong>
                <p>
                  Hold checks evaluate whether data launched on Clock Edge N races so fast that it corrupts the capture register on the <strong>EXACT SAME Clock Edge N</strong>.
                </p>
                <p>
                  Notice that the Hold Slack equation <code className="text-rose-300 font-mono">Slack_hold = t_cq + t_comb(min) - t_skew - t_h</code> has <strong>NO T_clk term!</strong>
                </p>
                <div className="p-2.5 rounded bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
                  ❌ <strong>Fatal Trap:</strong> Lowering clock frequency does NOT fix hold violations! Even at 1 Hz, data racing across zero combinational gates will overwrite the hold window. Hold violations MUST be fixed by physically adding delay buffers into the data net!
                </div>
              </div>
            </div>
          </div>

          {/* Explanation 3D: Metastability & MTBF */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">🎲</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 4: Metastability Physics, The Ball-on-a-Hill Analog &amp; MTBF
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                A bistable flip-flop has two stable equilibrium states: <strong>Logic 0 (0V)</strong> and <strong>Logic 1 (V_DD)</strong>. Between these two states lies an unstable potential ridge at approximately <code className="text-purple-300 font-mono">V_DD / 2</code>.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 font-mono text-xs space-y-2">
                <div className="text-purple-300 font-bold text-sm">
                  The Mean Time Between Failures (MTBF) Formula:
                </div>
                <div className="text-white text-base">
                  MTBF = e^( t_r / &tau; ) / [ T_0 &middot; f_clk &middot; f_data ]
                </div>
                <div className="text-slate-400">
                  • <strong>t_r</strong> = Resolution time allowed for the latch to settle (T_clk - t_su)
                  <br />• <strong>&tau; (tau)</strong> = Internal regeneration time constant of cross-coupled inverters
                  <br />• <strong>T_0</strong> = Device technology parameter related to setup window width
                  <br />• <strong>f_clk, f_data</strong> = Clock frequency and asynchronous data toggle rate
                </div>
              </div>

              <p>
                Because MTBF scales <strong>exponentially</strong> with resolution time <code className="text-teal-300 font-mono">t_r</code>, cascading two flip-flops (a <strong>2-Stage Synchronizer</strong>) provides an entire extra clock cycle for metastable voltages to decay to legal 0 or 1 levels, increasing MTBF from seconds to thousands of years!
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4. Multi-Tabbed Interactive Workbench ──────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Interactive Timing Workbench &amp; STA Calculator
            </h2>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("timing-analyzer")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "timing-analyzer"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Timing Window &amp; Violation Simulator
              </button>
              <button
                onClick={() => setActiveDiagramTab("metastability-analog")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "metastability-analog"
                    ? "bg-purple-900/80 border border-purple-500 text-purple-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Metastability Potential Well &amp; 2-FF CDC
              </button>
              <button
                onClick={() => setActiveDiagramTab("sta-calculator")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "sta-calculator"
                    ? "bg-cyan-900/80 border border-cyan-500 text-cyan-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Real-Time STA Slack Calculator
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: Timing Window & Violation Simulator ──── */}
            {activeDiagramTab === "timing-analyzer" && (
              <div className="space-y-6">
                
                {/* Sliders Ribbon */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data Arrival Time:</span>
                      <span className="text-cyan-300 font-bold">{dataArrivalTimeNs.toFixed(1)} ns</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="7.0"
                      step="0.1"
                      value={dataArrivalTimeNs}
                      onChange={(e) => setDataArrivalTimeNs(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                    <span className="text-[10px] text-slate-500">Clock edge is at 5.0 ns</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Setup Time (t_su):</span>
                      <span className="text-teal-300 font-bold">{setupTimeNs.toFixed(1)} ns</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={setupTimeNs}
                      onChange={(e) => setSetupTimeNs(parseFloat(e.target.value))}
                      className="w-full accent-teal-400"
                    />
                    <span className="text-[10px] text-slate-500">Window: [{(5.0 - setupTimeNs).toFixed(1)}ns, 5.0ns]</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hold Time (t_h):</span>
                      <span className="text-amber-300 font-bold">{holdTimeNs.toFixed(1)} ns</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={holdTimeNs}
                      onChange={(e) => setHoldTimeNs(parseFloat(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                    <span className="text-[10px] text-slate-500">Window: [5.0ns, {(5.0 + holdTimeNs).toFixed(1)}ns]</span>
                  </div>
                </div>

                {/* Real-time Status Badge */}
                <div
                  className={clsx(
                    "p-4 rounded-xl border font-mono text-xs font-bold transition flex items-center justify-between",
                    !isMetastable && "bg-emerald-950/40 border-emerald-800 text-emerald-300",
                    isSetupViolated && "bg-rose-950/60 border-rose-600 text-rose-300 timing-hazard-active",
                    isHoldViolated && "bg-amber-950/60 border-amber-600 text-amber-300 timing-hazard-active"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{!isMetastable ? "🟢" : isSetupViolated ? "🔴" : "🟠"}</span>
                    <span>
                      {!isMetastable && "TIMING VALID: Data is stable across Setup & Hold aperture window. Output Q updates cleanly after t_cq."}
                      {isSetupViolated && "SETUP TIME VIOLATION: Data arrived too late inside setup window! Flip-flop enters METASTABLE state."}
                      {isHoldViolated && "HOLD TIME VIOLATION: Data changed too early after clock edge! Output state corrupted by racing data."}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-950 text-[10px]">
                    {!isMetastable ? "SLACK > 0" : "NEGATIVE SLACK"}
                  </span>
                </div>

                {/* Precision Oscilloscope Waveform */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 820 240" className="w-full h-auto text-xs font-mono select-none">
                    {/* Background Grid */}
                    <line x1="120" y1="20" x2="120" y2="220" stroke="#1e293b" strokeWidth="1" />
                    <line x1="280" y1="20" x2="280" y2="220" stroke="#1e293b" strokeWidth="1" />
                    <line x1="440" y1="20" x2="440" y2="220" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="600" y1="20" x2="600" y2="220" stroke="#1e293b" strokeWidth="1" />
                    <line x1="760" y1="20" x2="760" y2="220" stroke="#1e293b" strokeWidth="1" />

                    {/* Clock Trigger Event Line at x=440 (5.0ns) */}
                    <text x="440" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">
                      ACTIVE CLOCK TRIGGER (posedge CLK at 5.0ns)
                    </text>

                    {/* Shaded Setup/Hold Window */}
                    {/* Setup window: x = 440 - (setupTimeNs * 40) */}
                    <rect
                      x={440 - setupTimeNs * 40}
                      y="20"
                      width={setupTimeNs * 40}
                      height="200"
                      fill="#042f2e"
                      fillOpacity="0.5"
                      stroke="#14b8a6"
                      strokeDasharray="2 2"
                    />
                    <text x={440 - (setupTimeNs * 40) / 2} y="32" fill="#14b8a6" textAnchor="middle" fontSize="9" fontWeight="bold">
                      t_su ({setupTimeNs}ns)
                    </text>

                    {/* Hold window: x = 440 to 440 + (holdTimeNs * 40) */}
                    <rect
                      x="440"
                      y="20"
                      width={holdTimeNs * 40}
                      height="200"
                      fill="#451a03"
                      fillOpacity="0.5"
                      stroke="#f59e0b"
                      strokeDasharray="2 2"
                    />
                    <text x={440 + (holdTimeNs * 40) / 2} y="32" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold">
                      t_h ({holdTimeNs}ns)
                    </text>

                    {/* Channel 1: Clock */}
                    <text x="15" y="65" fill="#38bdf8" fontWeight="bold">CLK Signal</text>
                    <polyline points="120,80 440,80 440,45 760,45" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    {/* Channel 2: Data Line (D) */}
                    <text x="15" y="125" fill="#10b981" fontWeight="bold">Data In (D)</text>
                    {/* Transition happens at x = 120 + (dataArrivalTimeNs * 64) */}
                    {(() => {
                      const xTrans = 120 + (dataArrivalTimeNs / 10) * 640;
                      return (
                        <>
                          <polyline
                            points={`120,140 ${xTrans},140 ${xTrans + 15},110 760,110`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                          />
                          <circle cx={xTrans + 7.5} cy="125" r="4" fill="#10b981" />
                          <text x={xTrans + 7.5} y="100" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">
                            Data 0→1 at {dataArrivalTimeNs.toFixed(1)}ns
                          </text>
                        </>
                      );
                    })()}

                    {/* Channel 3: Output Q */}
                    <text x="15" y="195" fill="#a855f7" fontWeight="bold">Output (Q)</text>
                    {!isMetastable ? (
                      // Clean Clock-to-Q step after 5.0ns + clkToQ
                      <polyline
                        points={`120,210 ${440 + clkToQNs * 40},210 ${440 + clkToQNs * 40 + 15},180 760,180`}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                      />
                    ) : (
                      // Metastable analog ringing wave
                      <path
                        d={`M 120,210 L 440,210 Q 460,190 480,210 T 520,200 T 560,205 T 600,195 L 760,${isSetupViolated ? "210" : "180"}`}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        className="animate-metastable-ringing"
                      />
                    )}

                    {isMetastable && (
                      <text x="520" y="175" fill="#f43f5e" fontWeight="bold" fontSize="10">
                        ⚡ METASTABLE VOLTAGE OSCILLATION (V_DD/2)
                      </text>
                    )}
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 2: Metastability Ball-on-a-Hill & 2-FF CDC ── */}
            {activeDiagramTab === "metastability-analog" && (
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block">
                  The Physical Bistable Potential Well &amp; 2-Stage CDC Synchronizer
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Ball on Hill Physical Analogy */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/40 space-y-3">
                    <span className="text-xs font-mono font-bold text-purple-300 block">
                      Physical Energy Landscape (Bistable Latch)
                    </span>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <svg viewBox="0 0 360 180" className="w-full h-auto text-xs font-mono select-none">
                        {/* Double-well potential curve */}
                        <path
                          d="M 30,50 Q 80,160 130,130 Q 180,20 230,130 Q 280,160 330,50"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="3"
                        />
                        {/* Left Well: Logic 0 */}
                        <text x="80" y="170" fill="#22c55e" textAnchor="middle" fontWeight="bold">Stable '0' (0V)</text>

                        {/* Right Well: Logic 1 */}
                        <text x="280" y="170" fill="#22c55e" textAnchor="middle" fontWeight="bold">Stable '1' (VDD)</text>

                        {/* Unstable Ridge: Metastable Point */}
                        <text x="180" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold">Metastable Ridge (VDD/2)</text>

                        {/* Ball balanced precariously on ridge */}
                        <circle cx="180" cy="38" r="8" fill="#f43f5e" className="animate-metastable-ringing" />
                        <text x="180" y="60" fill="#f43f5e" textAnchor="middle" fontSize="9">Unresolved State</text>
                      </svg>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Violating setup/hold times deposits energy onto the metastable ridge. Thermal noise eventually knocks the ball into well 0 or 1, but the time required is nondeterministic.
                    </p>
                  </div>

                  {/* Right: 2-Stage CDC Synchronizer Schematic */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-teal-800/40 space-y-3">
                    <span className="text-xs font-mono font-bold text-teal-300 block">
                      2-Stage Flip-Flop Synchronizer Architecture
                    </span>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <svg viewBox="0 0 380 180" className="w-full h-auto text-xs font-mono select-none">
                        {/* Async Input */}
                        <text x="10" y="75" fill="#f59e0b" fontWeight="bold" fontSize="10">Async In</text>
                        <line x1="60" y1="70" x2="90" y2="70" stroke="#f59e0b" strokeWidth="2" />

                        {/* FF1 (Metastability Absorber) */}
                        <rect x="90" y="40" width="70" height="75" rx="5" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                        <text x="125" y="60" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="9">SYNC_FF1</text>
                        <text x="125" y="75" fill="#94a3b8" textAnchor="middle" fontSize="8">(Absorber)</text>

                        {/* Wire FF1 → FF2 */}
                        <line x1="160" y1="70" x2="210" y2="70" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 2" />
                        <text x="185" y="62" fill="#a855f7" textAnchor="middle" fontSize="8">Resolves</text>

                        {/* FF2 (Clean Synchronized Output) */}
                        <rect x="210" y="40" width="70" height="75" rx="5" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="245" y="60" fill="#22c55e" textAnchor="middle" fontWeight="bold" fontSize="9">SYNC_FF2</text>
                        <text x="245" y="75" fill="#94a3b8" textAnchor="middle" fontSize="8">(Clean Reg)</text>

                        {/* Sync Out */}
                        <line x1="280" y1="70" x2="330" y2="70" stroke="#22c55e" strokeWidth="2.5" />
                        <text x="340" y="75" fill="#22c55e" fontWeight="bold" fontSize="10">Sync Out</text>

                        {/* Common Destination Clock */}
                        <text x="30" y="150" fill="#38bdf8" fontWeight="bold" fontSize="10">CLK_DST</text>
                        <line x1="85" y1="145" x2="125" y2="145" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="125" y1="145" x2="125" y2="115" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="125" y1="145" x2="245" y2="145" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="245" y1="145" x2="245" y2="115" stroke="#38bdf8" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <p className="text-xs text-teal-300 leading-relaxed">
                      FF1 absorbs any metastable oscillation during clock cycle 1. By the time the next clock edge arrives at FF2, the signal has fully settled, guaranteeing 100% clean digital data.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Real-Time STA Slack Calculator ───────── */}
            {activeDiagramTab === "sta-calculator" && (
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Static Timing Analysis (STA) Slack Engine
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">T_clk (Period):</span>
                    <input
                      type="number"
                      value={staTclk}
                      onChange={(e) => setStaTclk(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">t_cq (Launch):</span>
                    <input
                      type="number"
                      value={staTcq}
                      onChange={(e) => setStaTcq(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">t_comb (Logic):</span>
                    <input
                      type="number"
                      value={staTcomb}
                      onChange={(e) => setStaTcomb(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">t_su (Setup):</span>
                    <input
                      type="number"
                      value={staTsu}
                      onChange={(e) => setStaTsu(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">t_h (Hold):</span>
                    <input
                      type="number"
                      value={staTh}
                      onChange={(e) => setStaTh(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">t_skew (Skew):</span>
                    <input
                      type="number"
                      value={staTskew}
                      onChange={(e) => setStaTskew(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                    />
                  </div>
                </div>

                {/* Calculated KPI Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div
                    className={clsx(
                      "p-4 rounded-xl border text-center space-y-1",
                      parseFloat(setupSlack) >= 0
                        ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                        : "bg-rose-950/40 border-rose-800 text-rose-300"
                    )}
                  >
                    <span className="text-[10px] text-slate-400 block uppercase">Setup Slack Margin</span>
                    <div className="text-2xl font-bold">{setupSlack} ns</div>
                    <span className="text-[10px] font-bold">
                      {parseFloat(setupSlack) >= 0 ? "✓ TIMING PASS" : "❌ SETUP VIOLATION"}
                    </span>
                  </div>

                  <div
                    className={clsx(
                      "p-4 rounded-xl border text-center space-y-1",
                      parseFloat(holdSlack) >= 0
                        ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                        : "bg-rose-950/40 border-rose-800 text-rose-300"
                    )}
                  >
                    <span className="text-[10px] text-slate-400 block uppercase">Hold Slack Margin</span>
                    <div className="text-2xl font-bold">{holdSlack} ns</div>
                    <span className="text-[10px] font-bold">
                      {parseFloat(holdSlack) >= 0 ? "✓ TIMING PASS" : "❌ HOLD VIOLATION"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Max Achievable Frequency</span>
                    <div className="text-2xl font-bold text-cyan-300">{fmaxMhz} MHz</div>
                    <span className="text-[10px] text-cyan-400">1 / T_critical_path</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Step-by-Step Cycle Walkthrough Timeline ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⏱️</span> Step-by-Step Clock Edge Timeline
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6">
            <div className="flex gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
              {[
                { step: 1, title: "1. Pre-Edge Setup Window (t_su)" },
                { step: 2, title: "2. Rising Clock Edge (posedge CLK)" },
                { step: 3, title: "3. Post-Edge Hold Window (t_h)" },
                { step: 4, title: "4. Output Q Update (t_cq)" }
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
                >
                  {s.title}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
              {timelineStep === 1 && (
                <div>
                  <strong className="text-teal-300 text-sm block mb-1">Phase 1: Pre-Edge Setup Window (t &lt; posedge CLK)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Data at input D must settle to a steady logic level at least <code className="text-teal-300 font-mono">t_su</code> before the clock trigger. Internal gate capacitances charge to full V_DD or GND levels.
                  </p>
                </div>
              )}
              {timelineStep === 2 && (
                <div>
                  <strong className="text-cyan-300 text-sm block mb-1">Phase 2: The Active Clock Trigger (posedge CLK)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Clock signal transitions from 0 to 1. Internal transmission gates begin isolating the input from the storage latch.
                  </p>
                </div>
              )}
              {timelineStep === 3 && (
                <div>
                  <strong className="text-amber-300 text-sm block mb-1">Phase 3: Post-Edge Hold Window (posedge CLK &lt; t &lt; posedge + t_h)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Data at input D must remain completely unchanged for <code className="text-amber-300 font-mono">t_h</code> nanoseconds until the internal pass-gate fully shuts off.
                  </p>
                </div>
              )}
              {timelineStep === 4 && (
                <div>
                  <strong className="text-emerald-300 text-sm block mb-1">Phase 4: Output Q Update (t = posedge + t_cq)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    After internal propagation delay <code className="text-emerald-300 font-mono">t_cq</code>, the output pin Q transitions to the sampled bit value and drives the downstream combinational cloud.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── 6. Interactive Calculation Challenge ───────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/40 space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🧮</span> Interactive Hardware Math Challenge: Calculate Maximum Frequency
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose a sequential pipeline has <code className="text-teal-300 font-mono">t_cq = 1.2 ns</code>, <code className="text-purple-300 font-mono">t_comb = 2.6 ns</code>, <code className="text-amber-300 font-mono">t_su = 1.2 ns</code>, and zero clock skew. What is the maximum operating frequency in MHz?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Enter frequency in MHz..."
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={verifyQuiz}
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
                Why does hold time depend only on the launch and capture edges of the SAME clock cycle, making it immune to clock speed reductions?
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Observe carefully…</strong>
                Notice that positive clock skew gives the data path more time to settle for setup checks, but creates dangerous hold race conditions!
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Try changing this…</strong>
                Move the Data Arrival Time slider inside the shaded setup window to watch the output voltage ring in high-frequency metastability!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Professional Tips & Tricks ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">🛠️</span> Professional Tips &amp; Tricks for Silicon Timing Closure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">1. Sign Off Hold at Fast-Fast (FF) Corners</strong>
              <p className="leading-relaxed">
                Always sign off hold time checks at the Best-Case Fast PVT corner (high VDD, -40°C) where transistors switch fastest and signals race through combinational logic with minimal delay.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">2. Synchronize Asynchronous Resets</strong>
              <p className="leading-relaxed">
                Never deassert an asynchronous reset asynchronously! Use an Asynchronous Assert / Synchronous Deassert (AASD) reset synchronizer to eliminate reset recovery/removal timing violations.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">3. Gray-Code Multi-Bit CDC Pointers</strong>
              <p className="leading-relaxed">
                When passing multi-bit counters (such as asynchronous FIFO read/write pointers) across clock domains, always convert to Gray code so only 1 bit transitions per increment.
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
            {/* Example 1: Barrackpore Metro */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    BARRACKPORE METRO SIGNALLING
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Interlocking Signal CDC Synchronization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata debugged intermittent train tracking faults where asynchronous track sensor relays crossed into the 50 MHz interlocking FPGA. Adding 2-stage synchronizers with MTBF &gt; 10,000 years eliminated false red-signal trips.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                10,000+ Year MTBF via 2-FF CDC Synchronizers
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Tapeout Hold-Time Buffer Insertion</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu analyzed post-layout STA on a 28nm RISC-V core. 42 hold violations occurred on short shift register nets. The team executed automated ECO buffer insertion to add 120ps delay per net without impacting f_max.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                Zero Hold Violations via Automated ECO Buffer Sizing
              </div>
            </div>

            {/* Example 3: Ichapur Factory */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    ICHAPUR ORDNANCE FACTORY
                  </span>
                  <span className="text-xs text-slate-400">Precision Automation</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Speed Optical Encoder Metastability</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Abhronila implemented quadrature decoding counters for precision CNC lathes at Ichapur. Using Gray-coded registers eliminated multi-bit sampling glitches caused by asynchronous encoder pulses.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                Glitch-Free Quadrature Decoding via Gray Coding
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Substation Reset Recovery Timing</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita and Mahima resolved micro-controller hangs during power brownouts by replacing raw RC reset circuits with an AASD reset bridge, preventing reset removal violations across 40 telemetry nodes.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                Brownout Immunity via AASD Reset Bridges
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
                <h3 className="text-base font-bold text-slate-100 mb-2">DDR5 High-Frequency Clock Tree Balancing</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Engineers designing DDR5 memory PHYs balanced H-Tree clock distribution networks down to &lt; 15ps skew across 4.8 GHz clock trees, maximizing data eye setup/hold sampling windows.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300">
                &lt; 15ps Clock Skew via Balanced H-Tree Networks
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Deep Space Radiation-Hardened Triple Redundancy</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Space-grade satellite controllers deployed Triple Modular Redundancy (TMR) with voting flip-flops characterized across -55°C to +125°C military PVT corners to prevent single-event upsets.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                Military PVT Timing Closure (-55°C to +125°C)
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
                Setup Time (t_su) is before the clock edge; Hold Time (t_h) is after the clock edge.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Setup violations depend on T_clk and can be fixed by lowering clock frequency.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Hold violations are independent of T_clk and MUST be fixed with delay buffers.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                2-Stage Flip-Flop Synchronizers absorb metastability in asynchronous clock domain crossings.
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
                <strong className="text-rose-200 block mb-1">• Believing Lower Clock Speeds Fix Hold Violations:</strong>
                Never try to fix hold violations by reducing clock frequency. Hold checks evaluate the same edge; lowering frequency does not add delay to fast combinational paths.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Direct Asynchronous Signal Sampling:</strong>
                Connecting external button inputs or asynchronous clock domain signals directly into sequential state machines causes unpredictable branch state corruption.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Enforce Positive Slack Margin across all PVT Corners:</strong>
                Sign off timing closure across Slow-Slow (SS) high-temp corners for setup and Fast-Fast (FF) low-temp corners for hold.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use Dual-Port Gray-Coded Async FIFOs for Multi-Bit Data:</strong>
                When passing multi-bit words between asynchronous clock domains, use a dual-clock FIFO with Gray-coded pointers to prevent word corruption.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. FAQ & Practice Questions ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Flip-Flop Timing &amp; Metastability FAQs"
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
            title="Flip-Flop Timing Parameters &amp; Metastability"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic14_note.txt"
          />
        </section>

        {/* ─── 14. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In industrial VLSI interviews across Salt Lake and Bangalore, the #1 question is always: 'Why can setup violations be fixed by slowing down the clock, while hold violations cannot?' " +
              "Remember: Hold time checks occur on the SAME clock edge. Only physical delay buffers can save a hold violation!"
            }
          />
        </section>

        {/* ─── 15. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 14 · Flip-Flop Timing Parameters · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic14;
