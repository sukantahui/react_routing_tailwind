import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Registers: Data Storage, Parallel Load Registers & Data Transfer
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Exhaustive student-friendly masterclass with 4-bit parallel load interactive simulator,
 *                        serial vs. parallel live race arena, gate-level MUX schematic, 6 case studies, and 30 questions.
 */
const Topic15 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("parallel-register");
  
  // 4-Bit Parallel Register States
  const [inputBus, setInputBus] = useState([1, 0, 1, 1]); // I3, I2, I1, I0
  const [loadEnable, setLoadEnable] = useState(1); // 1 = Load, 0 = Hold
  const [registerQ, setRegisterQ] = useState([0, 0, 0, 0]); // Q3, Q2, Q1, Q0
  const [clkPulseActive, setClkPulseActive] = useState(false);

  // Serial vs Parallel Transfer Simulation States
  const [raceRunning, setRaceRunning] = useState(false);
  const [raceCycle, setRaceCycle] = useState(0);
  const [parallelTransferred, setParallelTransferred] = useState(false);
  const [serialBitsSent, setSerialBitsSent] = useState(0);

  // Timeline Step
  const [timelineStep, setTimelineStep] = useState(1);

  // Quiz State
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState(null);

  const sectionRefs = useRef([]);
  const raceTimerRef = useRef(null);

  // Toggle Input Bus Bit
  const toggleInputBit = (index) => {
    const newBus = [...inputBus];
    newBus[index] = newBus[index] === 0 ? 1 : 0;
    setInputBus(newBus);
  };

  // Clock Pulse Trigger for Parallel Register
  const triggerClockPulse = () => {
    setClkPulseActive(true);
    if (loadEnable === 1) {
      setRegisterQ([...inputBus]);
    }
    // If loadEnable === 0, registerQ remains unchanged (Hold mode)
    setTimeout(() => setClkPulseActive(false), 350);
  };

  // Reset Register (Async Clear)
  const resetRegister = () => {
    setRegisterQ([0, 0, 0, 0]);
  };

  // Start Serial vs Parallel Race
  const startTransferRace = () => {
    setRaceRunning(true);
    setRaceCycle(0);
    setParallelTransferred(false);
    setSerialBitsSent(0);

    let cycle = 0;
    if (raceTimerRef.current) clearInterval(raceTimerRef.current);

    raceTimerRef.current = setInterval(() => {
      cycle++;
      setRaceCycle(cycle);

      if (cycle === 1) {
        setParallelTransferred(true);
        setSerialBitsSent(1);
      } else if (cycle === 2) {
        setSerialBitsSent(2);
      } else if (cycle === 3) {
        setSerialBitsSent(3);
      } else if (cycle === 4) {
        setSerialBitsSent(4);
        setRaceRunning(false);
        clearInterval(raceTimerRef.current);
      }
    }, 700);
  };

  // Quick Preset Scenarios
  const loadScenario = (type) => {
    if (type === "parallel-load") {
      setInputBus([1, 1, 0, 1]);
      setLoadEnable(1);
      setRegisterQ([0, 0, 0, 0]);
    } else if (type === "hold-mode") {
      setInputBus([1, 0, 0, 1]);
      setLoadEnable(0);
      setRegisterQ([1, 1, 1, 1]);
    } else if (type === "clear-all") {
      setInputBus([0, 0, 0, 0]);
      setLoadEnable(1);
      setRegisterQ([0, 0, 0, 0]);
    }
  };

  // Quiz Verification
  const verifyQuiz = () => {
    if (quizAnswer.trim() === "3200") {
      setQuizFeedback({
        correct: true,
        msg: "🎉 Correct! Bandwidth = (64 bits / 8 bits/Byte) * 400 MHz = 8 Bytes * 400 MHz = 3,200 MB/s (3.2 GB/s)!"
      });
    } else {
      setQuizFeedback({
        correct: false,
        msg: "❌ Incorrect. Remember: 64 bits = 8 Bytes. Throughput = 8 Bytes * 400,000,000 cycles/sec = 3,200 MB/s."
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
        @keyframes pulse-clock {
          0% { border-color: rgba(56, 189, 248, 0.4); box-shadow: 0 0 10px rgba(56, 189, 248, 0.2); }
          50% { border-color: rgba(56, 189, 248, 1); box-shadow: 0 0 25px rgba(56, 189, 248, 0.6); }
          100% { border-color: rgba(56, 189, 248, 0.4); box-shadow: 0 0 10px rgba(56, 189, 248, 0.2); }
        }
        .clock-pulse-active {
          animation: pulse-clock 0.35s ease-in-out;
        }
        @keyframes flow-dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-flow-dash {
          stroke-dasharray: 6, 4;
          animation: flow-dash 0.6s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 15</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Registers: Parallel Load Architecture &amp; Data Transfer Physics
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how individual 1-bit flip-flops scale into multi-bit digital registers. Explore multiplexer-steered parallel load control,
            clock gating, and the high-speed trade-offs between serial and parallel bus architectures.
          </p>

          {/* Quick Scenario Presets */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase mr-1">Register Presets:</span>
            <button
              onClick={() => loadScenario("parallel-load")}
              className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-800/60 text-teal-300 hover:bg-teal-900/80 transition"
            &gt;
              📥 Parallel Load Mode (LD = 1)
            </button>
            <button
              onClick={() => loadScenario("hold-mode")}
              className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-900/80 transition"
            &gt;
              🔒 Hold / Retain State (LD = 0)
            </button>
            <button
              onClick={() => loadScenario("clear-all")}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900/80 transition"
            &gt;
              🔄 Clear All Bits (Async Reset)
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
                Teacher's Executive Summary: The 4 Fundamental Laws of Register Architecture
              </h2>
              <p className="text-xs text-slate-400">
                How multiple flip-flops combine under common control logic to form high-speed CPU memory
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-teal-800/40 space-y-2">
              <span className="text-teal-400 font-bold block uppercase">1. Word Scaling</span>
              <div className="text-base text-white font-bold">N Flip-Flops = N-bit Word</div>
              <p className="text-slate-400 leading-relaxed">
                Flip-flops store 1 bit. Registers group N flip-flops with a shared clock to store full data words.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/40 space-y-2">
              <span className="text-amber-400 font-bold block uppercase">2. MUX Steering</span>
              <div className="text-base text-white font-bold">D_i = LD&middot;I_i + LD̄&middot;Q_i</div>
              <p className="text-slate-400 leading-relaxed">
                Multiplexer feedback allows the register to hold state indefinitely without cutting off the clock tree.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-2">
              <span className="text-cyan-400 font-bold block uppercase">3. Parallel Transfer</span>
              <div className="text-base text-white font-bold">t_load = 1 Clock Cycle</div>
              <p className="text-slate-400 leading-relaxed">
                All N bits are loaded simultaneously across N parallel lines on a single active clock edge.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2">
              <span className="text-purple-400 font-bold block uppercase">4. Serial Transfer</span>
              <div className="text-base text-white font-bold">t_serial = N Clock Cycles</div>
              <p className="text-slate-400 leading-relaxed">
                Saves pins and cabling by streaming data bit-by-bit over 1 single physical wire.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEPARATE IN-DEPTH EXPLANATION SECTIONS ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-12">
          
          {/* Explanation 3A: From 1-Bit Flip-Flops to Multi-Bit Registers */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">📚</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 1: What is a Register? Scaling from 1-Bit Flip-Flops to N-Bit Words
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-teal-300 font-mono text-sm block">
                  A. The Single Flip-Flop Limitation
                </strong>
                <p>
                  A single D flip-flop is the elementary atomic unit of digital sequential memory. It can store exactly <strong>one binary digit (1 bit: 0 or 1)</strong>.
                </p>
                <p>
                  However, modern computer architectures operate on entire multi-bit numbers called <strong>words</strong> (e.g. 8-bit bytes, 16-bit halfwords, 32-bit words, 64-bit doublewords).
                </p>
                <div className="p-2.5 rounded bg-teal-950/30 border border-teal-800/40 text-teal-300 text-xs">
                  💡 <strong>Definition:</strong> An <em>N-bit Register</em> is a cascade of <em>N</em> flip-flops operating in lockstep under a common clock signal and common control lines.
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <strong className="text-cyan-300 font-mono text-sm block">
                  B. Synchronous Common Clocking
                </strong>
                <p>
                  In an N-bit register, all N flip-flops are connected to the exact same clock net.
                </p>
                <p>
                  When the clock transitions (e.g. rising edge ↑), all N bits are sampled simultaneously, ensuring that the stored binary word updates atomically in a single clock cycle with zero bit-skew.
                </p>
                <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs">
                  ⚡ <strong>Common Word Sizes:</strong> 8-bit (Byte), 16-bit (x86 Real Mode), 32-bit (ARM Cortex, RISC-V RV32), 64-bit (x86-64, RV64).
                </div>
              </div>
            </div>
          </div>

          {/* Explanation 3B: The Parallel Load Mechanism */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">🔄</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 2: The Parallel Load Mechanism (Why MUX Feedback is Essential)
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                In a CPU, the clock line oscillates continuously at billions of cycles per second (GHz). If a register were built simply by connecting input wires directly to D flip-flops, the register would overwrite its contents on <strong>every single clock tick</strong>!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/50 space-y-2">
                  <span className="text-rose-400 font-mono font-bold block">❌ Flawed Approach: Clock Gating with AND Gates</span>
                  <p className="text-slate-300">
                    Placing a simple AND gate on the clock line (<code className="text-rose-300 font-mono">Gated_CLK = CLK &amp; Load</code>) introduces gate delay, skewing the clock edge and creating dangerous glitch spikes during asynchronous load transitions.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/50 space-y-2">
                  <span className="text-emerald-400 font-mono font-bold block">✓ Industry Standard: 2-to-1 MUX Steering Logic</span>
                  <p className="text-slate-300">
                    The clock runs continuously without interruption. Each flip-flop is preceded by a 2-to-1 multiplexer that chooses between capturing new data or recirculating old data.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-amber-300 font-bold text-sm">
                  The Multiplexer Boolean Excitation Equation:
                </div>
                <div className="text-white text-base">
                  D_i = ( Load &middot; I_i ) + ( Load̄ &middot; Q_i )
                </div>
                <div className="text-slate-400">
                  • <strong>When Load = 1 (Parallel Load):</strong> D_i = I_i. The external input bus is captured on the clock edge.
                  <br />• <strong>When Load = 0 (Hold / Retain):</strong> D_i = Q_i. The flip-flop re-samples its own output, holding state indefinitely!
                </div>
              </div>
            </div>
          </div>

          {/* Explanation 3C: Serial vs Parallel Data Transfer */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">⚡</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 3: Deep Comparison: Serial vs. Parallel Data Transfer
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="p-3.5">Architectural Metric</th>
                    <th className="p-3.5 text-teal-300">Parallel Data Transfer</th>
                    <th className="p-3.5 text-purple-300">Serial Data Transfer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3.5 font-bold">Physical Wires</td>
                    <td className="p-3.5 text-teal-300">N data wires + 1 clock wire</td>
                    <td className="p-3.5 text-purple-300">1 single data wire + 1 clock wire</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Transfer Latency</td>
                    <td className="p-3.5 text-emerald-400 font-bold">Exactly 1 Clock Cycle</td>
                    <td className="p-3.5 text-amber-400 font-bold">N Clock Cycles (Bit-by-Bit)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Data Throughput</td>
                    <td className="p-3.5 text-teal-300">Maximum: N bits per cycle</td>
                    <td className="p-3.5 text-purple-300">Lower: 1 bit per cycle</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Transmission Distance</td>
                    <td className="p-3.5 text-slate-400">Short distance (&lt; 1 meter, on-chip)</td>
                    <td className="p-3.5 text-slate-400">Long distance (meters to kilometers)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Physical Limitations</td>
                    <td className="p-3.5 text-rose-400">Clock skew across wires &amp; crosstalk</td>
                    <td className="p-3.5 text-emerald-400">Immune to inter-wire skew</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Industrial Standard Usage</td>
                    <td className="p-3.5 text-teal-300">CPU Internal Registers, ALUs, DDR buses</td>
                    <td className="p-3.5 text-purple-300">PCIe, SATA, USB, Ethernet, UART, SPI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Explanation 3D: Core CPU Architectural Registers */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="text-xl">🖥️</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Section 4: Essential Registers in CPU Microarchitecture
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-teal-400 font-bold block text-sm">1. Program Counter (PC)</span>
                <p className="text-slate-300 leading-relaxed">
                  Holds the memory address of the next machine instruction to fetch. Increments automatically after each fetch cycle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-bold block text-sm">2. Instruction Register (IR)</span>
                <p className="text-slate-300 leading-relaxed">
                  Holds the binary opcode of the currently executing instruction. Driven directly into the Control Unit decoder.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold block text-sm">3. Accumulator (AC)</span>
                <p className="text-slate-300 leading-relaxed">
                  The primary working register of the ALU. Stores operands and catches mathematical/logical calculation outputs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-purple-400 font-bold block text-sm">4. Memory Address Reg (MAR)</span>
                <p className="text-slate-300 leading-relaxed">
                  Holds the memory address sent across the address bus to select a specific byte or word in main RAM.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold block text-sm">5. Memory Data Reg (MDR)</span>
                <p className="text-slate-300 leading-relaxed">
                  Bi-directional staging register that holds data words being read from or written to system RAM.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-rose-400 font-bold block text-sm">6. Status / Flags Register</span>
                <p className="text-slate-300 leading-relaxed">
                  Stores 1-bit flags (Zero, Carry, Sign, Overflow, Parity) evaluated by the ALU to govern conditional branching.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Multi-Tabbed Interactive Workbench ──────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Interactive Register Workbench &amp; Race Arena
            </h2>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("parallel-register")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "parallel-register"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                1. 4-Bit Parallel Load Register Simulator
              </button>
              <button
                onClick={() => setActiveDiagramTab("transfer-race")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "transfer-race"
                    ? "bg-purple-900/80 border border-purple-500 text-purple-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                2. Serial vs. Parallel Transfer Race
              </button>
              <button
                onClick={() => setActiveDiagramTab("gate-schematic")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "gate-schematic"
                    ? "bg-amber-900/80 border border-amber-500 text-amber-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                3. Gate-Level MUX-DFF Schematic
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: 4-Bit Parallel Load Register Simulator ─ */}
            {activeDiagramTab === "parallel-register" && (
              <div className="space-y-6">
                
                {/* Control Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={triggerClockPulse}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition shadow-lg flex items-center gap-2",
                        clkPulseActive
                          ? "bg-cyan-500 border-white text-slate-950 scale-95"
                          : "bg-cyan-700 hover:bg-cyan-600 border-cyan-500 text-white"
                      )}
                    >
                      <span>⏱️</span> Trigger Clock Pulse (↑)
                    </button>
                    <button
                      onClick={resetRegister}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 text-rose-300 transition"
                    >
                      🔄 Reset Register
                    </button>
                  </div>

                  {/* Load Enable Toggle */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-slate-400">Load Enable (LD):</span>
                    <button
                      onClick={() => setLoadEnable(loadEnable === 1 ? 0 : 1)}
                      className={clsx(
                        "px-3.5 py-1.5 rounded-xl font-bold border transition shadow",
                        loadEnable === 1
                          ? "bg-teal-950 border-teal-400 text-teal-300 shadow-teal-950"
                          : "bg-amber-950 border-amber-400 text-amber-300 shadow-amber-950"
                      )}
                    &gt;
                      LD = {loadEnable} {loadEnable === 1 ? "📥 [LOAD BUS ON ↑]" : "🔒 [HOLD VALUE ON ↑]"}
                    </button>
                  </div>
                </div>

                {/* Input Bus Interactive Switches */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">External Parallel Input Bus (I3, I2, I1, I0):</span>
                    <span className="text-teal-300 font-bold">
                      Bus Word: [{inputBus[0]}, {inputBus[1]}, {inputBus[2]}, {inputBus[3]}] = 0x{((inputBus[0] << 3) | (inputBus[1] << 2) | (inputBus[2] << 1) | inputBus[3]).toString(16).toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleInputBit(idx)}
                        className={clsx(
                          "p-3 rounded-xl border text-center transition font-bold text-sm",
                          inputBus[idx] === 1
                            ? "bg-teal-950 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/40"
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                        )}
                      &gt;
                        I{3 - idx} = {inputBus[idx]} (Click to Toggle)
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4-Bit Parallel Register Vector Schematic */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 840 280" className="w-full h-auto text-xs font-mono select-none">
                    {/* Common Clock Line */}
                    <text x="20" y="250" fill="#38bdf8" fontWeight="bold">CLK Bus</text>
                    <line x1="90" y1="245" x2="800" y2="245" stroke="#38bdf8" strokeWidth="2.5" />

                    {/* Common Load Enable Line */}
                    <text x="20" y="35" fill={loadEnable === 1 ? "#14b8a6" : "#f59e0b"} fontWeight="bold">
                      Load Line (LD={loadEnable})
                    </text>
                    <line x1="160" y1="30" x2="800" y2="30" stroke={loadEnable === 1 ? "#14b8a6" : "#f59e0b"} strokeWidth="2" />

                    {/* 4 Stages: Stage 3 (I3), Stage 2 (I2), Stage 1 (I1), Stage 0 (I0) */}
                    {[0, 1, 2, 3].map((idx) => {
                      const xBase = 100 + idx * 180;
                      const bitName = `Bit ${3 - idx}`;
                      const inputBit = inputBus[idx];
                      const qBit = registerQ[idx];

                      return (
                        <g key={idx} transform={`translate(${xBase}, 50)`}>
                          {/* Stage Container Box */}
                          <rect
                            x="0"
                            y="0"
                            width="160"
                            height="180"
                            rx="8"
                            fill="#0f172a"
                            stroke={clkPulseActive ? "#38bdf8" : "#334155"}
                            strokeWidth="1.5"
                          />
                          <text x="80" y="18" fill="#94a3b8" textAnchor="middle" fontSize="9" fontWeight="bold">
                            STAGE {3 - idx} (FF_{3 - idx})
                          </text>

                          {/* 2-to-1 MUX */}
                          <g transform="translate(15, 35)">
                            <path d="M 0,0 L 25,10 L 25,50 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                            <text x="12" y="34" fill="#14b8a6" fontSize="8" textAnchor="middle" fontWeight="bold">MUX</text>
                            
                            {/* Input 1 (External I_i) */}
                            <line x1="-15" y1="15" x2="0" y2="15" stroke={inputBit ? "#14b8a6" : "#64748b"} strokeWidth="2" />
                            <text x="-25" y="18" fill="#14b8a6" fontSize="8" fontWeight="bold">I{3 - idx}={inputBit}</text>

                            {/* Input 0 (Feedback Q_i) */}
                            <line x1="-15" y1="45" x2="0" y2="45" stroke={qBit ? "#22c55e" : "#64748b"} strokeWidth="2" />
                            <text x="-25" y="48" fill="#22c55e" fontSize="7">Q{3 - idx}</text>

                            {/* MUX Output to D */}
                            <line x1="25" y1="30" x2="50" y2="30" stroke="#38bdf8" strokeWidth="2" />
                            <text x="37" y="24" fill="#38bdf8" fontSize="8">D</text>
                          </g>

                          {/* D Flip-Flop */}
                          <g transform="translate(65, 30)">
                            <rect width="65" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="32" y="20" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">D-FF</text>
                            
                            {/* Clock Triangle */}
                            <polygon points="0,50 8,55 0,60" fill="#38bdf8" />
                            
                            {/* Output Q Pin */}
                            <line x1="65" y1="35" x2="85" y2="35" stroke={qBit ? "#22c55e" : "#64748b"} strokeWidth="2.5" />
                            <circle cx="75" cy="35" r="3" fill="#22c55e" />
                            <text x="75" y="28" fill="#22c55e" fontSize="8" fontWeight="bold">Q={qBit}</text>
                          </g>

                          {/* Feedback loop from Q to MUX input 0 */}
                          <polyline
                            points="140,65 140,120 0,120 0,80"
                            fill="none"
                            stroke={qBit ? "#22c55e" : "#334155"}
                            strokeWidth="1.2"
                            strokeDasharray={loadEnable === 0 ? "4 2" : "none"}
                            className={loadEnable === 0 ? "animate-flow-dash" : ""}
                          />

                          {/* Clock drop line */}
                          <line x1="65" y1="85" x2="65" y2="195" stroke="#38bdf8" strokeWidth="1.5" />
                          <circle cx="65" cy="195" r="3" fill="#38bdf8" />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Stored Register Readout */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/50 flex flex-wrap items-center justify-between gap-4 font-mono">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">CURRENT REGISTER CONTENTS (Q3, Q2, Q1, Q0):</span>
                    <div className="text-3xl font-extrabold text-emerald-400 tracking-wider">
                      Q = [{registerQ[0]}, {registerQ[1]}, {registerQ[2]}, {registerQ[3]}]
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs text-slate-400 block">HEX &amp; DECIMAL VALUE:</span>
                    <div className="text-2xl font-bold text-teal-300">
                      0x{((registerQ[0] << 3) | (registerQ[1] << 2) | (registerQ[2] << 1) | registerQ[3]).toString(16).toUpperCase()} ({((registerQ[0] << 3) | (registerQ[1] << 2) | (registerQ[2] << 1) | registerQ[3])})
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: Serial vs. Parallel Transfer Race ─────── */}
            {activeDiagramTab === "transfer-race" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block">Word to Transmit:</span>
                    <span className="text-cyan-300 font-bold text-base">[1, 0, 1, 1] (4 Bits)</span>
                  </div>

                  <button
                    onClick={startTransferRace}
                    disabled={raceRunning}
                    className={clsx(
                      "px-5 py-2.5 rounded-xl font-bold border transition shadow-lg flex items-center gap-2",
                      raceRunning
                        ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                        : "bg-purple-700 hover:bg-purple-600 text-white border-purple-500"
                    )}
                  >
                    <span>🚀</span> Start Data Transfer Race!
                  </button>

                  <div>
                    <span className="text-slate-400 block">Current Clock Cycle:</span>
                    <span className="text-amber-300 font-bold text-base">Cycle #{raceCycle} / 4</span>
                  </div>
                </div>

                {/* Side-by-Side Visual Race Arena */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  
                  {/* Left: Parallel Transfer Track */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="font-bold text-teal-300 flex items-center gap-2">
                        <span>⚡</span> PARALLEL BUS (4 Wires)
                      </span>
                      <span className={clsx("px-2 py-0.5 rounded text-[10px]", parallelTransferred ? "bg-emerald-950 text-emerald-300 font-bold" : "bg-slate-900 text-slate-500")}>
                        {parallelTransferred ? "✓ COMPLETE (1 Cycle)" : "WAITING"}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Wire 3 (MSB):</span>
                        <span className={clsx("font-bold", parallelTransferred ? "text-emerald-400" : "text-slate-600")}>Bit 1 &rarr; Received</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Wire 2:</span>
                        <span className={clsx("font-bold", parallelTransferred ? "text-emerald-400" : "text-slate-600")}>Bit 0 &rarr; Received</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Wire 1:</span>
                        <span className={clsx("font-bold", parallelTransferred ? "text-emerald-400" : "text-slate-600")}>Bit 1 &rarr; Received</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Wire 0 (LSB):</span>
                        <span className={clsx("font-bold", parallelTransferred ? "text-emerald-400" : "text-slate-600")}>Bit 1 &rarr; Received</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      Transfers all 4 bits in parallel on <strong>Clock Cycle #1</strong>. Speed = 4 bits / cycle.
                    </p>
                  </div>

                  {/* Right: Serial Transfer Track */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="font-bold text-purple-300 flex items-center gap-2">
                        <span>🧵</span> SERIAL LINE (1 Wire)
                      </span>
                      <span className={clsx("px-2 py-0.5 rounded text-[10px]", serialBitsSent === 4 ? "bg-emerald-950 text-emerald-300 font-bold" : "bg-purple-950 text-purple-300")}>
                        {serialBitsSent === 4 ? "✓ COMPLETE (4 Cycles)" : `${serialBitsSent}/4 Bits Shifted`}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Shift Register Buffer:</span>
                      </div>
                      <div className="flex gap-2 justify-center">
                        {[1, 0, 1, 1].map((bit, idx) => (
                          <div
                            key={idx}
                            className={clsx(
                              "w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm transition",
                              idx < serialBitsSent
                                ? "bg-purple-950 border-purple-400 text-purple-200 shadow-lg shadow-purple-950/50"
                                : "bg-slate-950 border-slate-800 text-slate-600"
                            )}
                          >
                            {idx < serialBitsSent ? bit : "—"}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      Transfers 1 bit per cycle sequentially over 1 wire. Takes <strong>4 clock cycles</strong> to complete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 3: Gate-Level MUX-DFF Schematic ─────────── */}
            {activeDiagramTab === "gate-schematic" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Detailed Silicon Gate-Level Implementation of 1-Bit Parallel Load Cell
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto">
                  <svg viewBox="0 0 740 240" className="w-full h-auto text-xs font-mono select-none">
                    {/* Inputs */}
                    <text x="20" y="45" fill="#14b8a6" fontWeight="bold">Input (I_i)</text>
                    <line x1="100" y1="40" x2="160" y2="40" stroke="#14b8a6" strokeWidth="2" />

                    <text x="20" y="95" fill="#f59e0b" fontWeight="bold">Load (LD)</text>
                    <line x1="100" y1="90" x2="130" y2="90" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="130" cy="90" r="3" fill="#f59e0b" />
                    
                    {/* Load to Top AND */}
                    <line x1="130" y1="90" x2="130" y2="55" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="130" y1="55" x2="160" y2="55" stroke="#f59e0b" strokeWidth="2" />

                    {/* Inverter for Load */}
                    <line x1="130" y1="90" x2="130" y2="135" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="130" y1="135" x2="145" y2="135" stroke="#f59e0b" strokeWidth="2" />
                    <polygon points="145,130 155,135 145,140" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="158" cy="135" r="2.5" fill="#0f172a" stroke="#f59e0b" />
                    <line x1="161" y1="135" x2="180" y2="135" stroke="#f59e0b" strokeWidth="2" />

                    {/* Feedback Q_i */}
                    <text x="20" y="175" fill="#22c55e" fontWeight="bold">Output (Q_i)</text>
                    <line x1="100" y1="170" x2="180" y2="170" stroke="#22c55e" strokeWidth="2" />

                    {/* AND 1 (Top) */}
                    <g transform="translate(160, 30)">
                      <path d="M 0,0 L 25,0 A 15,15 0 0,1 25,30 L 0,30 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                      <text x="14" y="18" fill="#14b8a6" fontSize="7" fontWeight="bold">AND1</text>
                    </g>

                    {/* AND 2 (Bottom) */}
                    <g transform="translate(180, 120)">
                      <path d="M 0,0 L 25,0 A 15,15 0 0,1 25,30 L 0,30 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="14" y="18" fill="#f59e0b" fontSize="7" fontWeight="bold">AND2</text>
                    </g>

                    {/* OR Gate */}
                    <line x1="200" y1="45" x2="260" y2="75" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="220" y1="135" x2="260" y2="95" stroke="#38bdf8" strokeWidth="2" />

                    <g transform="translate(260, 70)">
                      <path d="M 0,0 Q 15,15 0,30 Q 30,30 40,15 Q 30,0 0,0 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="16" y="18" fill="#38bdf8" fontSize="7" fontWeight="bold">OR</text>
                    </g>

                    {/* D Input to Flip-Flop */}
                    <line x1="300" y1="85" x2="360" y2="85" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="330" y="78" fill="#38bdf8" fontSize="9" fontWeight="bold">D = I&middot;LD + Q&middot;LD̄</text>

                    {/* D Flip-Flop */}
                    <rect x="360" y="50" width="90" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="405" y="80" fill="#38bdf8" textAnchor="middle" fontWeight="bold">D-FF</text>
                    
                    {/* Clock Pin */}
                    <polygon points="360,110 370,115 360,120" fill="#38bdf8" />
                    <line x1="320" y1="115" x2="360" y2="115" stroke="#38bdf8" strokeWidth="2" />
                    <text x="290" y="120" fill="#38bdf8" fontWeight="bold">CLK</text>

                    {/* Q Output */}
                    <line x1="450" y1="85" x2="540" y2="85" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="500" cy="85" r="3.5" fill="#22c55e" />
                    <text x="550" y="90" fill="#22c55e" fontWeight="bold" fontSize="14">Q_i</text>

                    {/* Global Feedback Loop back to Q_i Input */}
                    <polyline points="500,85 500,210 100,210 100,170" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Step-by-Step Cycle Walkthrough Timeline ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⏱️</span> Step-by-Step Parallel Load Cycle Walkthrough
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6">
            <div className="flex gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
              {[
                { step: 1, title: "1. Data Bus Setup" },
                { step: 2, title: "2. Assert Load Enable (LD=1)" },
                { step: 3, title: "3. Active Clock Edge (↑)" },
                { step: 4, title: "4. Synchronous Data Retention (LD=0)" }
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
                  <strong className="text-teal-300 text-sm block mb-1">Step 1: Parallel Data Bus Setup</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The external device or memory bus places an N-bit word onto input pins I_3..I_0. The input signals settle to steady CMOS voltage levels before the setup time window.
                  </p>
                </div>
              )}
              {timelineStep === 2 && (
                <div>
                  <strong className="text-cyan-300 text-sm block mb-1">Step 2: Control Unit Asserts Load Enable (LD = 1)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The CPU control unit pulls Load HIGH (<code className="text-teal-300">LD = 1</code>). The multiplexers switch from internal feedback (Q) to the external input bus (I).
                  </p>
                </div>
              )}
              {timelineStep === 3 && (
                <div>
                  <strong className="text-amber-300 text-sm block mb-1">Step 3: Active Clock Trigger (posedge CLK)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    On the rising clock edge, all N flip-flops sample their D inputs simultaneously. The entire N-bit word is loaded into the register in exactly <strong>1 clock cycle</strong>.
                  </p>
                </div>
              )}
              {timelineStep === 4 && (
                <div>
                  <strong className="text-emerald-300 text-sm block mb-1">Step 4: Synchronous Data Retention (LD = 0)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    The control unit deasserts Load (<code className="text-amber-300">LD = 0</code>). The MUX switches back to feedback mode (D = Q), holding the stored data word across thousands of subsequent clock cycles.
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
              <span>🧮</span> Interactive Hardware Math Challenge: Calculate Parallel Bus Bandwidth
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose a 64-bit wide parallel CPU memory bus operates at a clock frequency of <code className="text-teal-300 font-mono">400 MHz</code>. What is the maximum data throughput in <strong>Megabytes per second (MB/s)</strong>?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Enter throughput in MB/s..."
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              /&gt;
              <button
                onClick={verifyQuiz}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold transition"
              >
                Verify Bandwidth
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
                Why is putting an AND gate directly on the clock line considered dangerous in industrial ASIC design?
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Observe carefully…</strong>
                Notice how the multiplexer selects D_i = Q_i when Load = 0, recirculating the stored bit during every clock pulse.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-200 block mb-1">Try changing this…</strong>
                Set Load = 0 and change the input switches in the simulator. Notice that triggering clock ticks does not alter the register output!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Professional Tips & Tricks ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">🛠️</span> Professional Tips &amp; Tricks for Register Transfer Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">1. Non-Blocking Assignments in RTL</strong>
              <p className="leading-relaxed">
                Always use non-blocking assignments (<code className="text-cyan-300 font-mono"><=</code>) when describing registers in Verilog/SystemVerilog to model simultaneous parallel clock edge updates accurately.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">2. Integrated Clock Gating (ICG) Cells</strong>
              <p className="leading-relaxed">
                In low-power ASIC synthesis, enable automatic ICG insertion (<code className="text-cyan-300 font-mono">set_clock_gating_style</code>) to shut off clock distribution to idle register banks, saving up to 70% dynamic power.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 block text-sm">3. Parameterized Register Widths</strong>
              <p className="leading-relaxed">
                Parameterize register modules (<code className="text-cyan-300 font-mono">parameter WIDTH = 32</code>) to allow seamless reuse across 8-bit microcontrollers, 32-bit RISC-V, and 64-bit server pipelines.
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
                <h3 className="text-base font-bold text-slate-100 mb-2">32-Bit Track Status Register</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata implemented 32-bit parallel load registers in track interlocking controllers. All 32 track circuit occupancy sensors are captured in 1 clock cycle (20ns), ensuring deterministic real-time collision prevention.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Single-Cycle 32-Bit Sensor Snapshot
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
                <h3 className="text-base font-bold text-slate-100 mb-2">RISC-V 32-Bit Register File Design</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu synthesized a 32-word dual-read single-write register file (x0-x31) on 28nm CMOS. Using MUX-steered parallel load registers achieved 1.2 GHz clock signoff with zero clock skew penalty.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                1.2 GHz 32-Word Register File Architecture
              </div>
            </div>

            {/* Example 3: Ichapur Factory */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    ICHAPUR ORDNANCE FACTORY
                  </span>
                  <span className="text-xs text-slate-400">Precision Tooling</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">CNC Multi-Axis Coordinate Buffer</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Abhronila deployed 64-bit parallel load registers to buffer 3D CNC spindle coordinates. Parallel loading from the interpolation processor prevented feed-rate jitter during high-speed titanium milling.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                Zero Feed-Rate Jitter in Precision Milling
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
                <h3 className="text-base font-bold text-slate-100 mb-2">UART Serial-to-Parallel Conversion</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita and Mahima designed SIPO shift registers in substation RTUs. Incoming serial telemetry bitstreams from 100 remote transformers are assembled into 16-bit parallel words for CPU logging.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                High-Reliability SIPO Telemetry Conversion
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
                <h3 className="text-base font-bold text-slate-100 mb-2">DDR5 64-Bit Parallel Load Command Bus</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Engineers designing DDR5 memory controllers used 64-bit parallel load registers with integrated clock gating, achieving 38.4 GB/s burst throughput while cutting standby power by 62%.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300">
                38.4 GB/s Peak Memory Datapath Throughput
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
                <h3 className="text-base font-bold text-slate-100 mb-2">Space-Grade PISO Downlink Serializer</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Satellite payload processors load 128-bit scientific telemetry words in parallel and serialize them across a high-speed S-band radio downlink with triple modular redundancy (TMR).
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                TMR Radiation-Hardened PISO Serializer
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
                A Register is a group of N flip-flops storing an N-bit binary word.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Parallel Load takes 1 clock cycle; Serial transfer takes N clock cycles.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                MUX steering equation: D_i = Load &middot; I_i + Load̄ &middot; Q_i.
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                Program Counter (PC) stores instruction address; Accumulator (AC) stores ALU results.
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
                <strong className="text-rose-200 block mb-1">• Gating Clock Lines with Logic Gates:</strong>
                Never connect logic gates directly to the clock pin to enable/disable loading. This creates clock skew and hazard glitches. Always use MUX steering or dedicated ICG cells!
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Assuming Parallel Buses are Always Faster:</strong>
                Over long cables (&gt; 1 meter), parallel buses suffer from clock skew and crosstalk. Modern computers use ultra-fast serial links (PCIe, SATA) for long distances!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Tri-State Isolation on Shared Internal Buses:</strong>
                Ensure all registers driving a common bus are isolated with tri-state buffers (Hi-Z) so only one register drives the bus at a time, preventing bus contention.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Reset Initial Conditions:</strong>
                Always initialize register files with an asynchronous active-low reset (<code className="text-emerald-300 font-mono">!rst_n</code>) to guarantee deterministic state on power-up.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. FAQ & Practice Questions ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Registers &amp; Parallel Load FAQs"
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
            title="Registers &amp; Parallel Load Architecture"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic15_note.txt"
          />
        </section>

        {/* ─── 14. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "When I teach computer organization in Barrackpore, I emphasize: A flip-flop is just a solitary bit of memory, but a Register is the foundational working unit of a CPU datapath! " +
              "The multiplexer-steered parallel load register is the indispensable building block that makes Program Counters, Instruction Registers, and ALU Accumulators possible."
            }
          />
        </section>

        {/* ─── 15. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 15 · Registers &amp; Parallel Load · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic15;
