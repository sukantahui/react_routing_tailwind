import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Logic Gates Definitions & Characteristics Database
 */
const GATES_DATA = {
  AND: {
    name: "AND Gate",
    symbol: "A · B",
    booleanExpr: "Y = A · B",
    description: "Outputs HIGH (1) if and only if ALL inputs are HIGH (1). Performs logical multiplication.",
    icPackage: "7408 (Quad 2-Input AND)",
    transistorCount: "6 Transistors (CMOS: NAND + NOT)",
    tpd: "7 ns",
    universal: false,
    category: "Basic Gate",
    truthTable: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
    evaluate: (a, b) => a & b,
    switchAnalogy: "Series Switches: Current flows only when Switch A AND Switch B are closed.",
    cmosDetail: "Constructed as a 4-transistor CMOS NAND gate followed by a 2-transistor CMOS inverter."
  },
  OR: {
    name: "OR Gate",
    symbol: "A + B",
    booleanExpr: "Y = A + B",
    description: "Outputs HIGH (1) if AT LEAST ONE input is HIGH (1). Performs logical addition.",
    icPackage: "7432 (Quad 2-Input OR)",
    transistorCount: "6 Transistors (CMOS: NOR + NOT)",
    tpd: "8 ns",
    universal: false,
    category: "Basic Gate",
    truthTable: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 1 },
    ],
    evaluate: (a, b) => a | b,
    switchAnalogy: "Parallel Switches: Current flows if Switch A OR Switch B (or both) are closed.",
    cmosDetail: "Constructed as a 4-transistor CMOS NOR gate followed by a 2-transistor CMOS inverter."
  },
  NOT: {
    name: "NOT Gate (Inverter)",
    symbol: "A'",
    booleanExpr: "Y = Ā",
    description: "Outputs the inverted logic level of its single input. Flips 0 to 1 and 1 to 0.",
    icPackage: "7404 (Hex Inverter)",
    transistorCount: "2 Transistors (1 PMOS, 1 NMOS)",
    tpd: "4 ns",
    universal: false,
    category: "Basic Gate",
    truthTable: [
      { a: 0, b: "-", y: 1 },
      { a: 1, b: "-", y: 0 },
    ],
    evaluate: (a) => (a === 0 ? 1 : 0),
    switchAnalogy: "Normally Closed Bypass Relay: Opening Switch A redirects current to the load.",
    cmosDetail: "Simplest CMOS gate: Top PMOS pulls up to VDD when A=0; Bottom NMOS pulls down to GND when A=1."
  },
  NAND: {
    name: "NAND Gate",
    symbol: "(A·B)'",
    booleanExpr: "Y = (A·B)' = Ā + B̄",
    description: "Outputs LOW (0) ONLY when ALL inputs are HIGH (1). It is the inverse of an AND gate.",
    icPackage: "7400 (Quad 2-Input NAND)",
    transistorCount: "4 Transistors (2 PMOS parallel, 2 NMOS series)",
    tpd: "5 ns",
    universal: true,
    category: "Universal Gate",
    truthTable: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
    evaluate: (a, b) => ((a & b) === 1 ? 0 : 1),
    switchAnalogy: "Parallel Switches in Shunt: Short-circuits the output only when both switches are closed.",
    cmosDetail: "Fundamental building block of silicon microprocessors! Faster and smaller than AND gates."
  },
  NOR: {
    name: "NOR Gate",
    symbol: "(A+B)'",
    booleanExpr: "Y = (A+B)' = Ā · B̄",
    description: "Outputs HIGH (1) ONLY when ALL inputs are LOW (0). Inverse of an OR gate.",
    icPackage: "7402 (Quad 2-Input NOR)",
    transistorCount: "4 Transistors (2 PMOS series, 2 NMOS parallel)",
    tpd: "6 ns",
    universal: true,
    category: "Universal Gate",
    truthTable: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 0 },
    ],
    evaluate: (a, b) => ((a | b) === 0 ? 1 : 0),
    switchAnalogy: "Series Switches in Shunt: Short-circuits the output if either switch is closed.",
    cmosDetail: "Universal building block used extensively in Apollo Guidance Computer and early NOR flash."
  },
  XOR: {
    name: "XOR Gate (Exclusive-OR)",
    symbol: "A ⊕ B",
    booleanExpr: "Y = A ⊕ B = A B̄ + Ā B",
    description: "Outputs HIGH (1) when inputs are DIFFERENT. Acts as a 1-bit binary inequality detector.",
    icPackage: "7486 (Quad 2-Input XOR)",
    transistorCount: "8 Transistors (Transmission Gate implementation)",
    tpd: "9 ns",
    universal: false,
    category: "Specialized Gate",
    truthTable: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
    evaluate: (a, b) => a ^ b,
    switchAnalogy: "Staircase Dual Switches: Flipping either switch toggles the lamp state.",
    cmosDetail: "Essential core of Arithmetic Logic Units (ALU), Half Adders, Full Adders, and Parity Generators."
  },
  XNOR: {
    name: "XNOR Gate (Exclusive-NOR)",
    symbol: "A ⊙ B",
    booleanExpr: "Y = A ⊙ B = A B + Ā B̄",
    description: "Outputs HIGH (1) when inputs are IDENTICAL. Acts as a 1-bit binary equality comparator.",
    icPackage: "74266 (Quad 2-Input XNOR)",
    transistorCount: "8 to 10 Transistors",
    tpd: "10 ns",
    universal: false,
    category: "Specialized Gate",
    truthTable: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
    evaluate: (a, b) => (a === b ? 1 : 0),
    switchAnalogy: "Dual-Line Coincidence Detector: Lamp turns ON when both switches match.",
    cmosDetail: "Used in multi-bit digital comparators to verify identity across data buses."
  }
};

/**
 * Topic0 – Basic gates AND, OR, NOT, NAND, NOR, XOR
 * Module: 001_002_logic-gates-and-circuits
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic0 = () => {
  const [selectedGate, setSelectedGate] = useState("AND");
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);
  const [activeTab, setActiveTab] = useState("workbench");
  const [universalTarget, setUniversalTarget] = useState("AND");
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

  const gateInfo = GATES_DATA[selectedGate];
  const outputY = selectedGate === "NOT" ? gateInfo.evaluate(inputA) : gateInfo.evaluate(inputA, inputB);

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
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 002 · Topic 0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Basic Gates &amp; Logic Circuits: AND, OR, NOT, NAND, NOR, XOR, XNOR
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deconstruct the fundamental building blocks of digital logic. From individual CMOS transistor pairs to 74xx TTL integrated circuits and universal NAND synthesis.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 IEEE / ANSI Gate Standards
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚡ Real-Time Signal Tracing
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🌐 Universal Gate Synthesis
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 74xx TTL IC Pinouts
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-12 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Digital Logic Foundations
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
                  Every CPU, GPU, and RAM chip is composed of billions of <strong className="text-teal-300">microscopic logic gates</strong>. Gates process continuous voltage levels (0V = LOW / 0, +5V or +1.2V = HIGH / 1) to execute binary arithmetic and decision making.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  Voltage Abstraction · 0V to 0.8V = 0 | 2.0V to 5.0V = 1
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By connecting basic gates into combinational circuits (adders, multiplexers, decoders), hardware achieves deterministic execution without ambiguity.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher Sukanta's Law:</strong> <em>"Do not treat gates as abstract symbols! Every gate is a real PMOS/NMOS transistor circuit with a finite propagation delay (2ns to 10ns)."</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Engineering Analogy (Barrackpore Railway Terminal)
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Think of logic gates as automated railway track interlocks at Barrackpore Station:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">AND Interlock:</strong> Train signal turns GREEN only when Track Clear (1) AND Platform Free (1).
                  </li>
                  <li>
                    <strong className="text-slate-200">OR Emergency:</strong> Emergency Alarm triggers if Sensor A detects obstruction OR Sensor B detects track flaw.
                  </li>
                  <li>
                    <strong className="text-slate-200">XOR Parity Check:</strong> Detects single-bit transmission errors across long signal cables to Kolkata Metro control center.
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon Advantage:</strong> High-speed automated switching with 100% deterministic reliability!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Navigation Tabs for Interactive Suite ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <button
              onClick={() => setActiveTab("workbench")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2",
                activeTab === "workbench"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <span>🔬</span> 1. Interactive Gate Workbench
            </button>
            <button
              onClick={() => setActiveTab("universal")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2",
                activeTab === "universal"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <span>🌐</span> 2. Universal NAND Synthesizer
            </button>
            <button
              onClick={() => setActiveTab("pinouts")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2",
                activeTab === "pinouts"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <span>💾</span> 3. TTL 74xx IC Pinout Suite
            </button>
            <button
              onClick={() => setActiveTab("cmos")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2",
                activeTab === "cmos"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-950/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <span>⚙️</span> 4. CMOS Transistor Circuits
            </button>
          </div>
        </section>

        {/* ─── 4. TAB 1: INTERACTIVE GATE WORKBENCH ───────────── */}
        {activeTab === "workbench" && (
          <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
            {/* Gate Selector Chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.keys(GATES_DATA).map((gateKey) => (
                <button
                  key={gateKey}
                  onClick={() => setSelectedGate(gateKey)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-bold font-mono transition border cursor-pointer",
                    selectedGate === gateKey
                      ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20 scale-105"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  )}
                >
                  {gateKey} ({GATES_DATA[gateKey].symbol})
                </button>
              ))}
            </div>

            {/* Interactive Gate Workbench Box */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
              
              {/* Header Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                      {gateInfo.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
                      IC {gateInfo.icPackage}
                    </span>
                    {gateInfo.universal && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        UNIVERSAL GATE
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {gateInfo.name} — <span className="text-teal-400 font-mono">{gateInfo.booleanExpr}</span>
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono">Propagation Delay (t_pd):</span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">{gateInfo.tpd}</span>
                </div>
              </div>

              {/* Interactive SVG Diagram + Controls Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Inputs & Schematic View (7 Cols) */}
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase">Live Signal Ingestion &amp; Wire Voltage</span>
                    <span className="text-xs font-mono text-teal-400 font-bold">Output Y = {outputY}</span>
                  </div>

                  {/* Toggle Controls */}
                  <div className="flex gap-4">
                    <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Input A:</span>
                      <button
                        onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                        className={clsx(
                          "px-4 py-1.5 rounded-lg text-xs font-mono font-extrabold transition cursor-pointer",
                          inputA === 1
                            ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30"
                            : "bg-slate-800 text-slate-400"
                        )}
                      >
                        {inputA === 1 ? "HIGH (1)" : "LOW (0)"}
                      </button>
                    </div>

                    {selectedGate !== "NOT" && (
                      <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Input B:</span>
                        <button
                          onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                          className={clsx(
                            "px-4 py-1.5 rounded-lg text-xs font-mono font-extrabold transition cursor-pointer",
                            inputB === 1
                              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                              : "bg-slate-800 text-slate-400"
                          )}
                        >
                          {inputB === 1 ? "HIGH (1)" : "LOW (0)"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Live Dynamic Gate SVG */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 540 220" className="w-full max-w-md h-auto select-none">
                      {/* Input Wires */}
                      {selectedGate === "NOT" ? (
                        <>
                          <line x1="40" y1="110" x2="160" y2="110" stroke={inputA === 1 ? "#14b8a6" : "#475569"} strokeWidth="4" />
                          <circle cx="40" cy="110" r="7" fill={inputA === 1 ? "#14b8a6" : "#475569"} />
                          <text x="40" y="90" fill={inputA === 1 ? "#14b8a6" : "#94a3b8"} fontSize="12" fontWeight="bold" textAnchor="middle">A = {inputA}</text>
                        </>
                      ) : (
                        <>
                          <line x1="40" y1="70" x2="160" y2="70" stroke={inputA === 1 ? "#14b8a6" : "#475569"} strokeWidth="4" />
                          <circle cx="40" cy="70" r="7" fill={inputA === 1 ? "#14b8a6" : "#475569"} />
                          <text x="40" y="50" fill={inputA === 1 ? "#14b8a6" : "#94a3b8"} fontSize="12" fontWeight="bold" textAnchor="middle">A = {inputA}</text>

                          <line x1="40" y1="150" x2="160" y2="150" stroke={inputB === 1 ? "#38bdf8" : "#475569"} strokeWidth="4" />
                          <circle cx="40" cy="150" r="7" fill={inputB === 1 ? "#38bdf8" : "#475569"} />
                          <text x="40" y="180" fill={inputB === 1 ? "#38bdf8" : "#94a3b8"} fontSize="12" fontWeight="bold" textAnchor="middle">B = {inputB}</text>
                        </>
                      )}

                      {/* Gate Vector Drawings */}
                      {selectedGate === "NOT" && (
                        <g transform="translate(160, 40)">
                          <polygon points="0,10 0,130 110,70" fill="#0f172a" stroke="#14b8a6" strokeWidth="3" />
                          <circle cx="122" cy="70" r="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="3" />
                          <text x="45" y="75" fill="#14b8a6" fontSize="16" fontWeight="bold">NOT</text>
                        </g>
                      )}

                      {(selectedGate === "AND" || selectedGate === "NAND") && (
                        <g transform="translate(160, 40)">
                          <path d="M 0,10 L 60,10 A 60,60 0 0,1 60,130 L 0,130 Z" fill="#0f172a" stroke="#14b8a6" strokeWidth="3" />
                          {selectedGate === "NAND" && <circle cx="132" cy="70" r="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="3" />}
                          <text x="40" y="75" fill="#14b8a6" fontSize="16" fontWeight="bold">{selectedGate}</text>
                        </g>
                      )}

                      {(selectedGate === "OR" || selectedGate === "NOR") && (
                        <g transform="translate(160, 40)">
                          <path d="M 0,10 Q 30,70 0,130 Q 70,130 120,70 Q 70,10 0,10 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                          {selectedGate === "NOR" && <circle cx="132" cy="70" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />}
                          <text x="45" y="75" fill="#38bdf8" fontSize="16" fontWeight="bold">{selectedGate}</text>
                        </g>
                      )}

                      {(selectedGate === "XOR" || selectedGate === "XNOR") && (
                        <g transform="translate(140, 40)">
                          <path d="M 0,10 Q 30,70 0,130" fill="none" stroke="#a855f7" strokeWidth="3" />
                          <path d="M 15,10 Q 45,70 15,130 Q 85,130 135,70 Q 85,10 15,10 Z" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
                          {selectedGate === "XNOR" && <circle cx="147" cy="70" r="10" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />}
                          <text x="55" y="75" fill="#a855f7" fontSize="16" fontWeight="bold">{selectedGate}</text>
                        </g>
                      )}

                      {/* Output Wire */}
                      {selectedGate === "NOT" ? (
                        <line x1="292" y1="110" x2="440" y2="110" stroke={outputY === 1 ? "#22c55e" : "#475569"} strokeWidth="4" />
                      ) : (selectedGate === "NAND" || selectedGate === "NOR" || selectedGate === "XNOR") ? (
                        <line x1="302" y1="110" x2="440" y2="110" stroke={outputY === 1 ? "#22c55e" : "#475569"} strokeWidth="4" />
                      ) : (selectedGate === "XOR") ? (
                        <line x1="275" y1="110" x2="440" y2="110" stroke={outputY === 1 ? "#22c55e" : "#475569"} strokeWidth="4" />
                      ) : (
                        <line x1="280" y1="110" x2="440" y2="110" stroke={outputY === 1 ? "#22c55e" : "#475569"} strokeWidth="4" />
                      )}
                      <circle cx="440" cy="110" r="8" fill={outputY === 1 ? "#22c55e" : "#475569"} />
                      <text x="440" y="85" fill={outputY === 1 ? "#22c55e" : "#94a3b8"} fontSize="14" fontWeight="bold" textAnchor="middle">Output Y = {outputY}</text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-teal-300">Switch &amp; Physical Analogy:</strong> {gateInfo.switchAnalogy}
                  </div>
                </div>

                {/* Excitation Truth Table (5 Cols) */}
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>📋</span> Logic Gate Functional Truth Table
                    </h4>
                    <span className="text-xs font-mono text-slate-400">Total Rows: {gateInfo.truthTable.length}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="p-2.5">Input A</th>
                          {selectedGate !== "NOT" && <th className="p-2.5">Input B</th>}
                          <th className="p-2.5 text-teal-400">Output Y</th>
                          <th className="p-2.5">State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gateInfo.truthTable.map((row, idx) => {
                          const isActive =
                            selectedGate === "NOT"
                              ? row.a === inputA
                              : row.a === inputA && row.b === inputB;
                          return (
                            <tr
                              key={idx}
                              className={clsx(
                                "border-b border-slate-900 transition-colors",
                                isActive
                                  ? "bg-teal-950/80 text-teal-200 font-bold border-teal-500/50"
                                  : "text-slate-400 hover:bg-slate-900/40"
                              )}
                            >
                              <td className="p-2.5">{row.a}</td>
                              {selectedGate !== "NOT" && <td className="p-2.5">{row.b}</td>}
                              <td className="p-2.5">
                                <span
                                  className={clsx(
                                    "px-2 py-0.5 rounded font-bold",
                                    row.y === 1
                                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                      : "bg-rose-950 text-rose-300 border border-rose-800"
                                  )}
                                >
                                  {row.y}
                                </span>
                              </td>
                              <td className="p-2.5 text-[10px]">
                                {isActive ? "👈 Active State" : "Inactive"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-slate-200">CMOS Transistor Architecture:</strong> {gateInfo.cmosDetail}</p>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ─── 5. TAB 2: UNIVERSAL NAND SYNTHESIZER ───────────── */}
        {activeTab === "universal" && (
          <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Universal Functional Completeness Theorem
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Why NAND &amp; NOR are Universal Logic Gates
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Any Boolean function or entire microprocessor CPU can be built exclusively using NAND gates (or exclusively NOR gates)!
                  </p>
                </div>

                <div className="flex gap-2">
                  {["NOT", "AND", "OR", "XOR"].map((target) => (
                    <button
                      key={target}
                      onClick={() => setUniversalTarget(target)}
                      className={clsx(
                        "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition border cursor-pointer",
                        universalTarget === target
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      )}
                    >
                      Build {target}
                    </button>
                  ))}
                </div>
              </div>

              {/* Synthesizer Display */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-amber-300">
                  Constructing {universalTarget} Gate using ONLY 2-Input NAND Gates
                </h4>

                {universalTarget === "NOT" && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Method:</strong> Tie both inputs of a single NAND gate together. Since A · A = A, the NAND output (A · A)' = Ā.
                    </p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-sm text-teal-300">
                      Required Gates: <strong className="text-amber-400 font-bold">1 NAND Gate</strong> | Equation: Y = (A · A)' = Ā
                    </div>
                  </div>
                )}

                {universalTarget === "AND" && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Method:</strong> Take a standard NAND gate and invert its output using a second NAND gate wired as a NOT inverter: ((A · B)')' = A · B.
                    </p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-sm text-teal-300">
                      Required Gates: <strong className="text-amber-400 font-bold">2 NAND Gates</strong> | Equation: Y = ((A · B)')' = A · B
                    </div>
                  </div>
                )}

                {universalTarget === "OR" && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Method (De Morgan's Theorem):</strong> Invert Input A with NAND 1 (Ā), invert Input B with NAND 2 (B̄), then feed both into NAND 3 ((Ā · B̄)' = A + B).
                    </p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-sm text-teal-300">
                      Required Gates: <strong className="text-amber-400 font-bold">3 NAND Gates</strong> | Equation: Y = (Ā · B̄)' = A + B
                    </div>
                  </div>
                )}

                {universalTarget === "XOR" && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Method:</strong> Connect 4 NAND gates in a multi-stage network. Gate 1 computes (A · B)', feeding into Gate 2 &amp; Gate 3 alongside original inputs A &amp; B, whose outputs feed Gate 4.
                    </p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-sm text-teal-300">
                      Required Gates: <strong className="text-amber-400 font-bold">4 NAND Gates</strong> | Equation: Y = A · B̄ + Ā · B
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── 6. TAB 3: TTL 74XX IC PINOUT SUITE ─────────────── */}
        {activeTab === "pinouts" && (
          <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Standard TTL 74-Series Dual In-Line Package (DIP-14)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  7400 Quad 2-Input NAND Gate Pin Configuration
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto">
                <svg viewBox="0 0 800 320" className="w-full h-auto text-xs font-mono select-none">
                  <rect x="200" y="30" width="400" height="260" rx="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                  <text x="400" y="65" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="16">SN74LS00N (DIP-14 TOP VIEW)</text>
                  <path d="M 380,30 A 20,20 0 0,0 420,30 Z" fill="#0284c7" />

                  {/* Pin 14 VCC */}
                  <text x="610" y="90" fill="#ef4444" fontWeight="bold">Pin 14 (VCC +5V)</text>
                  <line x1="600" y1="85" x2="540" y2="85" stroke="#ef4444" strokeWidth="3" />

                  {/* Pin 7 GND */}
                  <text x="190" y="270" fill="#64748b" textAnchor="end" fontWeight="bold">Pin 7 (GND 0V)</text>
                  <line x1="200" y1="265" x2="260" y2="265" stroke="#64748b" strokeWidth="3" />

                  {/* Internal Gate 1 */}
                  <rect x="220" y="80" width="100" height="40" rx="6" fill="#1e293b" stroke="#14b8a6" />
                  <text x="270" y="105" fill="#14b8a6" textAnchor="middle" fontSize="11">Gate 1 (NAND)</text>

                  {/* Internal Gate 2 */}
                  <rect x="220" y="170" width="100" height="40" rx="6" fill="#1e293b" stroke="#14b8a6" />
                  <text x="270" y="195" fill="#14b8a6" textAnchor="middle" fontSize="11">Gate 2 (NAND)</text>

                  {/* Internal Gate 3 */}
                  <rect x="480" y="170" width="100" height="40" rx="6" fill="#1e293b" stroke="#14b8a6" />
                  <text x="530" y="195" fill="#14b8a6" textAnchor="middle" fontSize="11">Gate 3 (NAND)</text>

                  {/* Internal Gate 4 */}
                  <rect x="480" y="80" width="100" height="40" rx="6" fill="#1e293b" stroke="#14b8a6" />
                  <text x="530" y="105" fill="#14b8a6" textAnchor="middle" fontSize="11">Gate 4 (NAND)</text>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1">SN7408 (AND)</h4>
                  <p className="text-xs text-slate-400">Quad 2-Input AND Gate (Pins 1,2=In, 3=Out)</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1">SN7432 (OR)</h4>
                  <p className="text-xs text-slate-400">Quad 2-Input OR Gate (Pins 1,2=In, 3=Out)</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1">SN7486 (XOR)</h4>
                  <p className="text-xs text-slate-400">Quad 2-Input XOR Gate (Parity &amp; Adder core)</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 7. TAB 4: CMOS TRANSISTOR HARDWARE ─────────────── */}
        {activeTab === "cmos" && (
          <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  Silicon Physical Realization
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  CMOS Transistor Architecture: Complementary PMOS &amp; NMOS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-teal-300 text-sm">CMOS Inverter (NOT Gate)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Consists of 1 Pull-Up PMOS transistor connected to VDD and 1 Pull-Down NMOS transistor connected to GND.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li>Input A = 0: PMOS ON (Pulls Y to VDD 1), NMOS OFF.</li>
                    <li>Input A = 1: PMOS OFF, NMOS ON (Pulls Y to GND 0).</li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-cyan-300 text-sm">CMOS 2-Input NAND Gate</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Uses 2 PMOS transistors in PARALLEL in the Pull-Up network and 2 NMOS transistors in SERIES in the Pull-Down network.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li>Only when A=1 AND B=1 are both series NMOS transistors ON, pulling output Y to GND (0).</li>
                    <li>Requires only 4 transistors! (Compared to 6 for an AND gate).</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 8. Real-World Engineering Scenarios ────────────── */}
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
                  Mamata deployed high-reliability industrial controllers in Barrackpore. Implementing hardware NAND/NOR interlock circuits eliminated race conditions across ₹45 Lakh automated assembly lines.
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
                  Debangshu analyzed propagation delays (t_pd = 5ns) across 32-bit XOR parity checking buses on custom Xilinx FPGA prototypes, ensuring setup times were met at 250 MHz clock frequencies.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-Nanosecond Propagation Precision
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. Senior Pitfalls & Best Practices ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Hardware Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Floating Unused Inputs:</strong>
                Leaving unused gate input pins floating (unconnected) causes them to pick up high-frequency EMI noise, leading to unpredictable gate switching and excessive CMOS power dissipation.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Exceeding Maximum Fan-Out:</strong>
                Connecting too many gate inputs to a single output driver degrades voltage levels (V_OH drops below V_IH_min), causing logic evaluation errors.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Terminating Unused Gate Inputs:</strong>
                Always tie unused AND/NAND inputs to VCC (HIGH) via a 1 kΩ pull-up resistor, and unused OR/NOR inputs to GND (LOW).
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Decoupling Capacitors &amp; Power Planes:</strong>
                Place a 0.1 µF ceramic bypass capacitor right next to every IC's VCC pin to suppress high-speed switching noise.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. FAQ & Practice Questions ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Basic Gates & Logic Circuits FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 11. Printable Plain Text Note ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Basic gates AND, OR, NOT, NAND, NOR, XOR"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ─── 12. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In digital electronics and computer architecture, logic gates are the foundation of all computation. " +
              "Always remember: NAND and NOR are universal, XOR is the backbone of arithmetic adders, and CMOS transistors are the physical reality under the hood. Master these fundamentals and computer architecture becomes intuitive!"
            }
          />
        </section>

        {/* ─── 13. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 0 · Basic gates AND, OR, NOT, NAND, NOR, XOR · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic0;
