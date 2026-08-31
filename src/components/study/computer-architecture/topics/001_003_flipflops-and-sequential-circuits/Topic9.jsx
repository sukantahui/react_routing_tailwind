import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – JK Flip-Flop (Improved SR FF): Toggle condition, elimination of invalid state, race-around condition and its solution
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive masterclass tutorial component with multi-tabbed vector schematic suite,
 *                        SR vs. JK comparative simulation workbench, race-around analysis, case studies, and printable notes.
 */
const Topic9 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-schematic");
  const [jInput, setJInput] = useState(1);
  const [kInput, setKInput] = useState(1);
  const [clkPulse, setClkPulse] = useState(false);
  const [qState, setQState] = useState(0);
  const [qBarState, setQBarState] = useState(1);
  const [eventLog, setEventLog] = useState([
    "JK Flip-Flop initialized in Quiescent state (Q=0, Q̄=1)."
  ]);

  const sectionRefs = useRef([]);

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

  // Clock Pulse Trigger handler
  const handleClockPulse = (jVal, kVal) => {
    setClkPulse(true);
    setJInput(jVal);
    setKInput(kVal);

    let nextQ = qState;
    let nextQBar = qBarState;
    let logMsg = "";

    if (jVal === 0 && kVal === 0) {
      logMsg = "CLK Pulse (↑): J=0, K=0 => HOLD MODE (Q retains state " + qState + ").";
    } else if (jVal === 0 && kVal === 1) {
      nextQ = 0;
      nextQBar = 1;
      logMsg = "CLK Pulse (↑): J=0, K=1 => RESET MODE (Q forced to 0).";
    } else if (jVal === 1 && kVal === 0) {
      nextQ = 1;
      nextQBar = 0;
      logMsg = "CLK Pulse (↑): J=1, K=0 => SET MODE (Q forced to 1).";
    } else if (jVal === 1 && kVal === 1) {
      nextQ = qState === 1 ? 0 : 1;
      nextQBar = nextQ === 1 ? 0 : 1;
      logMsg = "⚡ CLK Pulse (↑): J=1, K=1 => TOGGLE MODE! SR Invalid state resolved -> Q inverted to " + nextQ + ".";
    }

    setQState(nextQ);
    setQBarState(nextQBar);
    setEventLog((prev) => [logMsg, ...prev.slice(0, 6)]);

    setTimeout(() => setClkPulse(false), 300);
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
            <span>Computer Architecture Masterclass · Module 003 · Topic 9</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            JK Flip-Flop (Improved SR FF): Evolution, Toggle Mode &amp; Race Prevention
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover why digital logic design transitioned from the SR Flip-Flop to the universal JK Flip-Flop. Learn how feedback steering converts the invalid state hazard into deterministic toggle operation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-rose-300">
              ⚠️ Elimination of SR Invalid State
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔄 Toggle Mode (J=1, K=1)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⏱️ Race-Around Condition &amp; Master-Slave Solution
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🔢 Universal Building Block &amp; Counter Design
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
                Masterclass: Detailed Limitations of the SR Flip-Flop &amp; How the JK Flip-Flop Solves Them
              </h2>
              <p className="text-xs text-slate-400">
                A complete technical breakdown of why digital systems evolved from SR to JK logic
              </p>
            </div>
          </div>

          {/* Deep-Dive Grid */}
          <div className="mt-6 space-y-6">
            
            {/* Detailed SR Limitations */}
            <div className="p-6 rounded-xl bg-slate-950 border border-rose-900/60 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 text-sm">
                <span>⚠️</span> 1. The Three Fundamental Limitations of the SR Flip-Flop
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/40 space-y-2">
                  <strong className="text-rose-300 font-mono block">Limitation A: Invalid State Hazard</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Asserting <code className="text-rose-300 font-mono">S = 1, R = 1</code> simultaneously forces both NOR outputs to <code className="text-rose-300 font-mono">Q = 0, Q̄ = 0</code> (or both 1 in NAND). This breaks the fundamental law of bistable logic (Q ≠ Q̄).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/40 space-y-2">
                  <strong className="text-rose-300 font-mono block">Limitation B: Metastable Race Condition</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Releasing inputs from <code className="text-rose-300 font-mono">(1,1) → (0,0)</code> causes a nanosecond race between cross-coupled gates. Whichever gate reacts 50ps faster locks the output, leading to non-deterministic metastable behavior.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/40 space-y-2">
                  <strong className="text-rose-300 font-mono block">Limitation C: Lack of Toggle Mode</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The SR flip-flop can only Set, Reset, or Hold. It cannot invert its output on a clock pulse. Consequently, SR flip-flops <strong>cannot be used to build digital counters or frequency dividers</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed JK Solution */}
            <div className="p-6 rounded-xl bg-slate-950 border border-teal-900/60 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 text-sm">
                <span>💡</span> 2. How the JK Flip-Flop Structurally Solves Every SR Limitation
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-teal-950/30 border border-teal-900/40 space-y-2">
                  <strong className="text-teal-300 font-mono block">Solution A: 3-Input Steering Feedback</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Jack Kilby added feedback lines from Q and Q̄ to the input steering NAND gates:
                    <br />
                    <code className="text-teal-200 font-mono block mt-1">S&apos; = ~(J · CLK · Q̄)</code>
                    <code className="text-teal-200 font-mono block">R&apos; = ~(K · CLK · Q)</code>
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-teal-950/30 border border-teal-900/40 space-y-2">
                  <strong className="text-teal-300 font-mono block">Solution B: Automatic Gate Pre-Inspection</strong>
                  <p className="text-slate-300 leading-relaxed">
                    When J=1, K=1, the feedback automatically inspects the current state. If Q=0, only the Set gate activates; if Q=1, only the Reset gate activates. Simultaneous contradictory forcing is physically impossible!
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-teal-950/30 border border-teal-900/40 space-y-2">
                  <strong className="text-teal-300 font-mono block">Solution C: Deterministic Toggle Mode</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Asserting J=1, K=1 transforms the invalid state into the deterministic <strong>TOGGLE Mode (Q_next = Q̄)</strong>, enabling binary counters, prescalers (f/2), and universal flip-flop conversion!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Comparative Function Matrix Table ─── */}
          <div className="mt-8 p-6 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-sm uppercase tracking-wider">
              <span>📊</span> Comparative Logic Matrix: SR Flip-Flop vs. JK Flip-Flop
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                    <th className="p-3">Control Inputs</th>
                    <th className="p-3 text-rose-400">SR Flip-Flop Next State Q(t+1)</th>
                    <th className="p-3 text-teal-300">JK Flip-Flop Next State Q(t+1)</th>
                    <th className="p-3">Functional Mode &amp; Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-400">
                  <tr>
                    <td className="p-3 font-bold text-slate-200">0 , 0</td>
                    <td className="p-3">Q(t) (No Change)</td>
                    <td className="p-3">Q(t) (No Change)</td>
                    <td className="p-3 text-slate-400">Hold / Memory Retention Mode</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-200">0 , 1</td>
                    <td className="p-3">0</td>
                    <td className="p-3">0</td>
                    <td className="p-3 text-rose-300">Reset Mode (Forces Q = 0)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-200">1 , 0</td>
                    <td className="p-3">1</td>
                    <td className="p-3">1</td>
                    <td className="p-3 text-emerald-300">Set Mode (Forces Q = 1)</td>
                  </tr>
                  <tr className="bg-amber-950/30">
                    <td className="p-3 font-bold text-amber-300">1 , 1</td>
                    <td className="p-3 font-bold text-rose-400">INVALID / FORBIDDEN ⚠️</td>
                    <td className="p-3 font-bold text-teal-300">Q̄(t) (TOGGLE MODE) 🔄</td>
                    <td className="p-3 font-bold text-amber-300">SR Hazard Fixed ⇒ Toggle Enabled!</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ─── Student Guide: Why Learn JK Instead of SR? ─── */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-teal-950/60 to-slate-950 border border-teal-500/50 space-y-3">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                <span>🎓</span>
                <span>STUDENT GUIDE: 4 Core Reasons Why Every Engineer Must Learn JK Instead of SR</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-teal-300 block font-mono">1. Zero Invalid Inputs (Safety)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    SR crashes when <code className="text-teal-300 font-mono">S=1, R=1</code>. JK has <strong>NO forbidden input combinations</strong>—all 4 input states (00, 01, 10, 11) yield predictable binary outputs.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block font-mono">2. Unlocks Toggle Mode (Counters)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    SR can only set or reset. JK introduces <strong>Toggle Mode (<code className="text-amber-300 font-mono">J=1, K=1</code>)</strong>, which is the foundational core of digital counters and clock frequency dividers (f/2).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block font-mono">3. Universal Building Block</strong>
                  <p className="text-slate-400 leading-relaxed">
                    JK is universal. By tying inputs or adding an inverter, you can create SR (J=S, K=R), D (J=D, K=D̄), or T (J=K=T) flip-flops from a single JK cell!
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-indigo-300 block font-mono">4. Industry Silicon Standard</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Real-world ICs (like IC 7476 Dual JK Flip-Flop) and FPGA standard cell libraries use JK topologies to guarantee glitch-free sequential state machines.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Foundational Section: What is Propagation Delay (t_pd)? ─── */}
            <div className="mt-8 p-6 rounded-xl bg-slate-950 border border-sky-500/50 space-y-4">
              <div className="flex items-center gap-2 text-sky-300 font-mono font-bold text-sm uppercase tracking-wider">
                <span>⏱️</span> Foundations: What is Propagation Delay (t_pd)? Definitions &amp; Real-World Examples
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Propagation Delay (<code className="text-sky-300 font-mono">t_pd</code>)</strong> is the physical elapsed time required for a logic signal change at an input pin to travel through semiconductor transistors and produce a corresponding state change at an output pin.
              </p>

              {/* 3 Core Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-sky-300 font-mono block">1. t_pLH (Low-to-High Delay)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Time delay measured from the 50% voltage point of the rising input to the 50% voltage point of the rising output signal (0 → 1).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-rose-300 font-mono block">2. t_pHL (High-to-Low Delay)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Time delay measured from the 50% voltage point of the falling input to the 50% voltage point of the falling output signal (1 → 0).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-emerald-300 font-mono block">3. t_pd (Average Delay Formula)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    The overall average gate propagation delay:
                    <br />
                    <code className="text-emerald-300 font-mono block mt-1">t_pd = (t_pLH + t_pHL) / 2</code>
                  </p>
                </div>
              </div>

              {/* Intuitive Real-World & Silicon Examples */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-amber-300 font-mono font-bold text-xs uppercase block">
                  💡 Intuitive Real-World Analogies &amp; Silicon Hardware Examples
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block">🚿 Analogy 1: Water Hose Pipe Delay</strong>
                    <p className="text-slate-400 leading-relaxed">
                      When you turn open a water tap connected to a 50-meter garden hose, water does not instant-teleport out of the nozzle—it takes ~3 seconds for the pressure wave to reach the end. That 3-second delay is propagation delay!
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 block">📣 Analogy 2: Barrackpore Riverbank Echo</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Shouting across the Hooghly River in Barrackpore takes ~1.5 seconds for the sound wave to travel 500 meters and echo back (speed of sound = 343 m/s). Signal propagation in copper wires travels at ~0.2 meters per nanosecond!
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-teal-300 block">📟 Example 3: IC 74LS00 NAND Gate (9 ns)</strong>
                    <p className="text-slate-400 leading-relaxed">
                      A classic TTL 74LS00 NAND gate takes approximately <strong>9 nanoseconds (9 × 10⁻⁹ s)</strong> for an input change to toggle the output pin.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-indigo-300 block">⚡ Example 4: Modern 5 GHz CPU Transistor (20 ps)</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Modern 3nm CPU CMOS transistors have sub-nanosecond propagation delays of approximately <strong>20 picoseconds (20 × 10⁻¹² s)</strong>, allowing billions of clock cycles per second!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Sequential Timing Terms Reference Dictionary Section ─── */}
            <div className="mt-8 p-6 rounded-xl bg-slate-950 border border-indigo-500/50 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold text-sm uppercase tracking-wider">
                <span>📖</span> Sequential Timing Parameters Dictionary: t_pulse, t_pd, t_su, t_h &amp; f_max
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In sequential digital system design, exact timing definitions are vital to prevent metastabilities, setup/hold violations, and race hazards. Below is the complete parameter dictionary:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {/* 1. t_pulse */}
                <div className="p-4 rounded-lg bg-slate-900 border border-sky-900/60 space-y-2">
                  <strong className="text-sky-300 font-mono block">1. t_pulse (Clock Pulse Width)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The exact time duration for which the clock signal remains at logic HIGH (<code className="text-sky-300 font-mono">CLK = 1</code>).
                  </p>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                    If t_pulse &gt; t_pd ⇒ Level-Triggered Race-Around Occurs!
                  </div>
                </div>

                {/* 2. t_pd */}
                <div className="p-4 rounded-lg bg-slate-900 border border-rose-900/60 space-y-2">
                  <strong className="text-rose-300 font-mono block">2. t_pd (Propagation Delay)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The physical time taken for input changes (J, K, CLK) to propagate through internal silicon gates and update output Q.
                  </p>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                    Typical range: 20ps (CPU) to 10ns (TTL ICs)
                  </div>
                </div>

                {/* 3. t_su */}
                <div className="p-4 rounded-lg bg-slate-900 border border-teal-900/60 space-y-2">
                  <strong className="text-teal-300 font-mono block">3. t_su (Setup Time)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The minimum time interval BEFORE the active clock edge during which input signals (J, K) MUST remain stable and constant.
                  </p>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                    Violation ⇒ Metastable Input Capture
                  </div>
                </div>

                {/* 4. t_h */}
                <div className="p-4 rounded-lg bg-slate-900 border border-amber-900/60 space-y-2">
                  <strong className="text-amber-300 font-mono block">4. t_h (Hold Time)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The minimum time interval AFTER the active clock edge during which input signals (J, K) MUST be held stable without changing.
                  </p>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                    Violation ⇒ Corrupted Internal State
                  </div>
                </div>

                {/* 5. T_clk */}
                <div className="p-4 rounded-lg bg-slate-900 border border-cyan-900/60 space-y-2">
                  <strong className="text-cyan-300 font-mono block">5. T_clk / t_period (Clock Period)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The total duration of one full clock cycle:
                    <br />
                    <code className="text-cyan-200 font-mono">T_clk = t_pulse_HIGH + t_pulse_LOW = 1 / f_clk</code>
                  </p>
                </div>

                {/* 6. f_max */}
                <div className="p-4 rounded-lg bg-slate-900 border border-emerald-900/60 space-y-2">
                  <strong className="text-emerald-300 font-mono block">6. f_max (Max Operating Frequency)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The maximum clock frequency at which sequential logic operates deterministically:
                    <br />
                    <code className="text-emerald-200 font-mono">f_max = 1 / (t_pd + t_su)</code>
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Detailed Technical Section: Race-Around vs Propagation Delay (t_pulse vs t_pd) ─── */}
            <div className="mt-8 p-6 rounded-xl bg-slate-950 border border-amber-500/50 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-sm uppercase tracking-wider">
                <span>⏱️</span> Technical Breakdown: When Race-Around Occurs &amp; Its Relation with Propagation Delay
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The <strong>Race-Around Condition</strong> is a physical timing hazard unique to level-triggered JK flip-flops. It is governed entirely by the mathematical relationship between the <strong>Clock Pulse Width (<code className="text-sky-300 font-mono">t_pulse</code>)</strong> and the internal <strong>Gate Propagation Delay (<code className="text-rose-300 font-mono">t_pd</code>)</strong>.
              </p>

              {/* Formula Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 space-y-2">
                  <span className="text-xs font-mono font-bold text-rose-400 block uppercase">
                    🚨 1. Condition for Race-Around Hazard
                  </span>
                  <div className="p-2.5 rounded bg-slate-950 border border-rose-900 font-mono text-sm text-rose-300 text-center font-bold">
                    t_pulse &gt; t_pd &nbsp;&nbsp;(With J=1, K=1 and CLK=1)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If the clock signal stays HIGH longer than the flip-flop&apos;s internal delay, the output toggles, feeds back to the input, and toggles <strong>repeatedly in a continuous loop</strong> during the same clock pulse!
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                    ✓ 2. Condition to Prevent Race-Around
                  </span>
                  <div className="p-2.5 rounded bg-slate-950 border border-emerald-900 font-mono text-sm text-emerald-300 text-center font-bold">
                    t_pulse &lt; t_pd &nbsp;&nbsp;OR Edge-Triggering / Master-Slave
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If the clock pulse ends before the output signal can propagate back to the steering inputs, output Q toggles <strong>exactly once</strong> cleanly.
                  </p>
                </div>
              </div>

              {/* Step-by-Step Oscillation Chain Reaction Timeline */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-amber-300 font-bold block uppercase mb-1">
                  🔬 Step-by-Step Chain Reaction: Why Output Q Oscillates
                </span>
                <div className="space-y-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-sky-400 font-bold">t = 0:</span>
                    <span>Clock goes HIGH (CLK=1). Inputs J=1, K=1. Initial state Q=0 (Q̄=1). Top steering gate activates.</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">t = t_pd:</span>
                    <span>Signal propagates through 4 NAND gates. Output Q inverts from 0 → 1 (Q̄ → 0).</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">t = t_pd + Δ:</span>
                    <span>New output state Q=1, Q̄=0 feeds back along cross-coupling wires back into the J &amp; K input gates.</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">t = 2 · t_pd:</span>
                    <span>Because CLK is STILL HIGH (since t_pulse &gt; t_pd), the bottom steering gate activates with Q=1, forcing Q to toggle BACK to 0!</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">t = 3·t_pd, 4·t_pd...</span>
                    <span>Output Q continues ringing (0 → 1 → 0 → 1) at frequency <code className="text-amber-300">f_osc = 1 / (2 · t_pd)</code> until CLK drops to 0, leaving Q in an unpredictable random state!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematic & Architectural Suite ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Race Analysis
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex-wrap">
              <button
                onClick={() => setActiveDiagramTab("nand-schematic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "nand-schematic"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. 4-NAND Gate Feedback Topology
              </button>
              <button
                onClick={() => setActiveDiagramTab("block-diagram")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "block-diagram"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. IEEE Standard Symbol
              </button>
              <button
                onClick={() => setActiveDiagramTab("timing-diagram")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "timing-diagram"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Race-Around Condition &amp; Toggle Waveform
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "nand-schematic" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  1. Internal 4-NAND Gate Topology with Q &amp; Q̄ Feedback Steering Lines
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                    {/* Pin J */}
                    <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">J (Set Input)</text>
                    <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                    <line x1="100" y1="60" x2="280" y2="60" stroke={jInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                    {/* Pin CLK */}
                    <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock Pulse)</text>
                    <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                    <line x1="100" y1="155" x2="130" y2="155" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <circle cx="130" cy="155" r="3.5" fill="#38bdf8" />
                    <line x1="130" y1="155" x2="130" y2="80" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="80" x2="280" y2="80" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="155" x2="130" y2="230" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                    <line x1="130" y1="230" x2="280" y2="230" stroke={clkPulse ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                    {/* Pin K */}
                    <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">K (Reset Input)</text>
                    <circle cx="100" cy="255" r="4" fill="#f43f5e" />
                    <line x1="100" y1="255" x2="280" y2="255" stroke={kInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                    {/* 3-Input Steering NAND 1 */}
                    <g transform="translate(280, 45)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
                    </g>

                    {/* 3-Input Steering NAND 2 */}
                    <g transform="translate(280, 215)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                      <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
                    </g>

                    {/* Wires to storage stage */}
                    <line x1="355" y1="75" x2="560" y2="75" stroke="#10b981" strokeWidth="2.5" />
                    <text x="450" y="62" fill="#10b981" fontWeight="bold" textAnchor="middle">
                      S&apos; = ~(J · CLK · Q̄)
                    </text>

                    <line x1="355" y1="245" x2="560" y2="245" stroke="#10b981" strokeWidth="2.5" />
                    <text x="450" y="270" fill="#10b981" fontWeight="bold" textAnchor="middle">
                      R&apos; = ~(K · CLK · Q)
                    </text>

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

                    {/* Output Q */}
                    <line x1="635" y1="75" x2="840" y2="75" stroke={qState ? "#22c55e" : "#64748b"} strokeWidth="3" />
                    <circle cx="720" cy="75" r="4" fill="#22c55e" />
                    <text x="855" y="80" fill={qState ? "#22c55e" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q = {qState}
                    </text>

                    {/* Output Q_bar */}
                    <line x1="635" y1="245" x2="840" y2="245" stroke={qBarState ? "#a855f7" : "#64748b"} strokeWidth="3" />
                    <circle cx="700" cy="245" r="4" fill="#a855f7" />
                    <text x="855" y="250" fill={qBarState ? "#a855f7" : "#94a3b8"} fontSize="17" fontWeight="bold">
                      Q̄ = {qBarState}
                    </text>

                    {/* Feedback Q back to bottom steering gate NAND 2 */}
                    <polyline points="720,75 720,310 240,310 240,245 280,245" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Feedback Q_bar back to top steering gate NAND 1 */}
                    <polyline points="700,245 700,20 240,20 240,70 280,70" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Internal Latch Cross-Coupling */}
                    <polyline points="660,75 660,130 490,175 490,225 560,225" fill="none" stroke={qState ? "#22c55e" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                    <polyline points="640,245 640,190 510,145 510,95 560,95" fill="none" stroke={qBarState ? "#a855f7" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "block-diagram" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  2. IEEE Standard JK Flip-Flop Block Symbol &amp; Pinout
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center">
                  <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto font-mono select-none">
                    <rect x="150" y="30" width="200" height="180" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="250" y="65" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="16">JK FLIP-FLOP</text>
                    
                    <line x1="80" y1="70" x2="150" y2="70" stroke="#14b8a6" strokeWidth="2.5" />
                    <text x="60" y="75" fill="#14b8a6" fontWeight="bold">J</text>
                    
                    <line x1="80" y1="120" x2="150" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                    <polygon points="150,110 165,120 150,130" fill="#38bdf8" />
                    <text x="35" y="125" fill="#38bdf8" fontWeight="bold">&gt;CLK</text>
                    
                    <line x1="80" y1="170" x2="150" y2="170" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="60" y="175" fill="#f43f5e" fontWeight="bold">K</text>
                    
                    <line x1="350" y1="70" x2="420" y2="70" stroke="#22c55e" strokeWidth="3" />
                    <text x="435" y="75" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>
                    
                    <line x1="350" y1="170" x2="420" y2="170" stroke="#a855f7" strokeWidth="3" />
                    <text x="435" y="175" fill="#a855f7" fontWeight="bold" fontSize="16">Q̄</text>

                    {/* Asynchronous PRE_n and CLR_n */}
                    <line x1="250" y1="0" x2="250" y2="30" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="250" cy="5" r="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="-5" fill="#f59e0b" textAnchor="middle" fontSize="10" fontWeight="bold">PRE_n</text>

                    <line x1="250" y1="210" x2="250" y2="240" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="250" cy="235" r="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="252" fill="#f59e0b" textAnchor="middle" fontSize="10" fontWeight="bold">CLR_n</text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "timing-diagram" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  3. Race-Around Condition Hazard vs. Clean Edge-Triggered Toggle Waveform
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    {/* Trace 1: CLK */}
                    <text x="20" y="45" fill="#38bdf8" fontWeight="bold">CLK (Wide Pulse t_p)</text>
                    <polyline points="150,50 220,50 220,20 450,20 450,50 650,50 650,20 880,20" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="335" y="15" fill="#38bdf8" textAnchor="middle" fontSize="10">Pulse Width t_p &gt; t_pd</text>

                    {/* Trace 2: Race-Around Hazard in Level-Triggered (J=1, K=1) */}
                    <text x="20" y="105" fill="#f43f5e" fontWeight="bold">Level-Triggered Q (Race Hazard!)</text>
                    <polyline points="150,110 220,110 220,80 260,80 260,110 300,110 300,80 340,80 340,110 380,110 380,80 420,80 420,110 450,110 650,110 650,80 690,80 690,110 730,110 730,80 770,80 770,110 810,110 810,80 850,80 850,110" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="900" y="95" fill="#f43f5e" fontSize="10">Oscillates!</text>

                    {/* Trace 3: Edge-Triggered or Master-Slave Clean Q (f/2) */}
                    <text x="20" y="175" fill="#22c55e" fontWeight="bold">Master-Slave / Edge Q (Clean f/2)</text>
                    <polyline points="150,180 220,180 220,150 650,150 650,180 900,180" fill="none" stroke="#22c55e" strokeWidth="3" />
                    <text x="900" y="165" fill="#22c55e" fontSize="10">Single Toggle per Edge!</text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive SR vs. JK Flip-Flop Simulator
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Input Selection Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => handleClockPulse(0, 0)}
                className="p-3 rounded-xl font-mono text-xs font-bold border bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 transition"
              >
                1. Test J=0, K=0 (HOLD)
              </button>
              <button
                onClick={() => handleClockPulse(0, 1)}
                className="p-3 rounded-xl font-mono text-xs font-bold border bg-rose-950/60 border-rose-800 text-rose-200 hover:bg-rose-900 transition"
              >
                2. Test J=0, K=1 (RESET)
              </button>
              <button
                onClick={() => handleClockPulse(1, 0)}
                className="p-3 rounded-xl font-mono text-xs font-bold border bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:bg-emerald-900 transition"
              >
                3. Test J=1, K=0 (SET)
              </button>
              <button
                onClick={() => handleClockPulse(1, 1)}
                className="p-3 rounded-xl font-mono text-xs font-bold border bg-teal-950/90 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/80 hover:bg-teal-900 transition"
              >
                ⚡ 4. Test J=1, K=1 (TOGGLE)
              </button>
            </div>

            {/* Comparison Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Card: SR Behavior with same inputs */}
              <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-3">
                <span className="text-xs font-mono text-rose-400 font-bold uppercase block">
                  Original SR Flip-Flop (With S={jInput}, R={kInput})
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">SR State Response:</span>
                  <span className={clsx(
                    "px-3 py-1 rounded font-mono text-xs font-bold",
                    jInput === 1 && kInput === 1
                      ? "bg-rose-950 text-rose-300 border border-rose-700 animate-pulse"
                      : "bg-slate-900 text-slate-300 border border-slate-800"
                  )}>
                    {jInput === 1 && kInput === 1 ? "INVALID / FORBIDDEN (S=1,R=1) ⚠️" : jInput === 1 ? "Q = 1 (SET)" : kInput === 1 ? "Q = 0 (RESET)" : "Q(t) (HOLD)"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {jInput === 1 && kInput === 1
                    ? "FORBIDDEN STATE! In NOR SR flip-flops, S=1 & R=1 forces both Q=0 and Q̄=0, destroying complementary logic and causing race conditions on release."
                    : "Standard SR response."}
                </p>
              </div>

              {/* Right Card: JK Behavior */}
              <div className="p-5 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3">
                <span className="text-xs font-mono text-teal-400 font-bold uppercase block">
                  Improved JK Flip-Flop (With J={jInput}, K={kInput})
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Current Q State:</span>
                  <span className="px-3 py-1 rounded font-mono text-sm font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                    Q = {qState} | Q̄ = {qBarState}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {jInput === 1 && kInput === 1
                    ? "✨ TOGGLE MODE ACTIVE! The 3-input steering NAND feedback routed Q̄ to J and Q to K, safely inverting Q to " + qState + " without any invalid hazard!"
                    : "JK cleanly executes requested state modification."}
                </p>
              </div>
            </div>

            {/* Trace Log */}
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
                    BARRACKPORE INSTRUMENTATION
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">IC 7476 Frequency Division Subsystem</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata implemented divide-by-2 and divide-by-16 clock prescalers using dual IC 7476 JK flip-flops in Toggle mode (J=K=1), stepping down a 50 MHz crystal oscillator to drive low-frequency microcontroller timers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                50 MHz → 25 MHz → 12.5 MHz Clean Prescaling
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR FPGA VLSI LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Synchronous Modulo-10 BCD Counter Synthesis</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu synthesized a 4-bit synchronous BCD counter using 4 JK flip-flops on a Xilinx Artix-7 FPGA. Using excitation table K-Map minimization (J = Q1·Q2, K = Q3), the counter cycles through 0-9 with zero ripple delay.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                200 MHz Glitch-Free BCD Counter
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
                <span>⚠️</span> Senior Engineering Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Race-Around Condition in Level-Triggered JK:</strong>
                If clock pulse width t_p exceeds propagation delay t_pd while J=1 &amp; K=1, output Q oscillates continuously between 0 and 1 until the clock drops.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Ones-Catching Hazard in Master-Slave Latch:</strong>
                Transient noise glitches occurring on J or K while CLK=1 get trapped inside the Master stage permanently until the Slave updates.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Prefer Edge-Triggered JK Flip-Flops:</strong>
                Always select edge-triggered JK flip-flops (or Master-Slave with setup/hold windows) over plain level-triggered latches to prevent race conditions.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use Excitation Tables for Counter Synthesis:</strong>
                When designing synchronous state machines with JK flip-flops, map state transitions using J and K Excitation entries (0-&gt;0: J=0, K=X; 0-&gt;1: J=1, K=X; 1-&gt;0: J=X, K=1; 1-&gt;1: J=X, K=0) for maximum K-Map minimization.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="JK Flip-Flop FAQs & Exam Deep-Dive"
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
            title="JK Flip-Flop (Improved SR FF) Master Class Study Note"
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
              "Always remember why the JK Flip-Flop was created: The SR Flip-Flop had a fatal flaw (S=1, R=1 caused an invalid state). " +
              "Jack Kilby fixed this by feeding Q and Q̄ back into the steering NAND gates, turning that invalid hazard into the Toggle state (J=1, K=1). " +
              "Master the excitation table, and synchronous counter design becomes second nature!"
            }
          />
        </section>

        {/* ─── 10. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 9 · JK Flip-Flop (Improved SR FF): Toggle condition, elimination of invalid state, race-around condition and its solution · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic9;
