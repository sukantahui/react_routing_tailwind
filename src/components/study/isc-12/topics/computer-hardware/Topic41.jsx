import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, ArrowRight, Play, Pause, RotateCcw, Share2, Cable } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic41_faqs";

const Topic41 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // State for Bus Word Routing Simulator (Fig 2.27)
  const [regA, setRegA] = useState([1, 0, 1, 0]); // 4-bit Register A
  const [regB, setRegB] = useState([0, 1, 1, 1]); // 4-bit Register B
  const [regC, setRegC] = useState([1, 1, 0, 0]); // 4-bit Register C
  const [selBusS1, setSelBusS1] = useState(false);
  const [selBusS0, setSelBusS0] = useState(false);

  // Compute routed bus word to Register D
  const getSelectedRegisterData = () => {
    const code = (selBusS1 ? 2 : 0) + (selBusS0 ? 1 : 0);
    switch (code) {
      case 0: return { name: "Register A", data: regA, source: "Reg A (00)" };
      case 1: return { name: "Register B", data: regB, source: "Reg B (01)" };
      case 2: return { name: "Register C", data: regC, source: "Reg C (10)" };
      case 3: default: return { name: "All Zeros (Cleared)", data: [0, 0, 0, 0], source: "GND / 0000 (11)" };
    }
  };

  const currentBus = getSelectedRegisterData();

  // State for Parallel-to-Serial Data Serializer Simulator (Fig 2.28)
  const [serializerInputs, setSerializerInputs] = useState([1, 0, 1, 1, 0, 0, 1, 0]); // D0 to D7
  const [counterStep, setCounterStep] = useState(0); // 0 to 7
  const [isPlaying, setIsPlaying] = useState(false);
  const [serialHistory, setSerialHistory] = useState([serializerInputs[0]]);

  // Clock tick timer for serializer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCounterStep((prev) => {
          const next = (prev + 1) % 8;
          setSerialHistory((h) => [...h.slice(-15), serializerInputs[next]]);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, serializerInputs]);

  const stepManualCounter = () => {
    setCounterStep((prev) => {
      const next = (prev + 1) % 8;
      setSerialHistory((h) => [...h.slice(-15), serializerInputs[next]]);
      return next;
    });
  };

  const resetCounter = () => {
    setIsPlaying(false);
    setCounterStep(0);
    setSerialHistory([serializerInputs[0]]);
  };

  const toggleSerialBit = (idx) => {
    const updated = [...serializerInputs];
    updated[idx] = updated[idx] === 1 ? 0 : 1;
    setSerializerInputs(updated);
  };

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 41
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Section 2.3.4C
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Practical System Applications
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Practical Applications of Multiplexers: Bus Routing &amp; Data Serialization
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Section 2.3.4C (Page 110): Mastering Fig 2.27 (Inter-Register Bus Routing using Multiplexers) and Fig 2.28 (Parallel-to-Serial Data Conversion via Clocked Binary Counter).
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "truthTable", label: "1. Schematics & Control Tables" },
              { id: "theory", label: "2. Architectural Core Theory" },
              { id: "busRouting", label: "3. Interactive Bus Router (Fig 2.27)" },
              { id: "serializer", label: "4. Interactive Serializer (Fig 2.28)" },
              { id: "examTips", label: "5. ISC Board Exam Focus" },
              { id: "faqs", label: "6. 15 Essential FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* TAB 1: SCHEMATICS & CONTROL TABLES */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">System Architecture Schematics (Figs 2.27 &amp; 2.28)</h2>
              <p className="text-xs text-slate-400">Textbook blueprints for Inter-Register Bus Routing and Parallel-to-Serial Data Conversion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FIG 2.27: BUS ROUTING */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-sm text-indigo-400">Textbook Fig 2.27: Register Bus Routing</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Quad 4:1 MUX Array</span>
              </div>
              <p className="text-xs text-slate-400">Routes 4-bit data words from Register A, B, C, or All 0s into Destination Register D.</p>

              {/* SVG FIG 2.27 */}
              <div className="w-full bg-slate-900/90 rounded-lg p-3 flex justify-center items-center border border-slate-800">
                <svg viewBox="0 0 440 280" className="w-full max-w-sm h-auto font-mono text-[11px]">
                  {/* Registers Left */}
                  <rect x="20" y="30" width="90" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <text x="65" y="55" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" fontSize="11">Register A</text>

                  <rect x="20" y="85" width="90" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <text x="65" y="110" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" fontSize="11">Register B</text>

                  <rect x="20" y="140" width="90" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <text x="65" y="165" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" fontSize="11">Register C</text>

                  <rect x="20" y="195" width="90" height="40" rx="6" fill="#0f172a" stroke="#475569" strokeDasharray="3 3" />
                  <text x="65" y="220" fill="#94a3b8" textAnchor="middle" fontSize="11">All 0s (Clear)</text>

                  {/* Multiplexer Array Box */}
                  <rect x="170" y="30" width="100" height="205" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="220" y="115" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="12">MUX</text>
                  <text x="220" y="132" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="10">ARRAY</text>
                  <text x="220" y="148" fill="#818cf8" textAnchor="middle" fontSize="9">(4 × 4:1)</text>

                  {/* Wires from Regs to MUX */}
                  <line x1="110" y1="50" x2="170" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="135" y="44" fill="#38bdf8" fontSize="9">/4</text>

                  <line x1="110" y1="105" x2="170" y2="105" stroke="#34d399" strokeWidth="2.5" />
                  <text x="135" y="99" fill="#34d399" fontSize="9">/4</text>

                  <line x1="110" y1="160" x2="170" y2="160" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="135" y="154" fill="#f59e0b" fontSize="9">/4</text>

                  <line x1="110" y1="215" x2="170" y2="215" stroke="#94a3b8" strokeWidth="2.5" />
                  <text x="135" y="209" fill="#94a3b8" fontSize="9">/4</text>

                  {/* Select Lines */}
                  <line x1="205" y1="270" x2="205" y2="235" stroke="#ec4899" strokeWidth="2" />
                  <line x1="235" y1="270" x2="235" y2="235" stroke="#ec4899" strokeWidth="2" />
                  <text x="220" y="278" fill="#f472b6" textAnchor="middle" fontSize="10" fontWeight="bold">S₁ S₀ Bus</text>

                  {/* Bus to Register D */}
                  <line x1="270" y1="130" x2="330" y2="130" stroke="#a855f7" strokeWidth="3" />
                  <text x="295" y="122" fill="#c084fc" fontSize="10" fontWeight="bold">Bus /4</text>

                  {/* Destination Register D */}
                  <rect x="330" y="105" width="90" height="50" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                  <text x="375" y="130" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="11">Register D</text>
                  <text x="375" y="145" fill="#d8b4fe" textAnchor="middle" fontSize="9">(Destination)</text>
                </svg>
              </div>

              {/* Table Fig 2.27 */}
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="p-2 text-center text-pink-400">S₁</th>
                      <th className="p-2 text-center text-pink-400">S₀</th>
                      <th className="p-2 text-left">Selected Source</th>
                      <th className="p-2 text-left text-purple-300">Register D Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-1.5 text-center">0</td>
                      <td className="p-1.5 text-center">0</td>
                      <td className="p-1.5 text-sky-300 font-bold">Register A</td>
                      <td className="p-1.5 text-slate-400">Loads Register A word</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-center">0</td>
                      <td className="p-1.5 text-center">1</td>
                      <td className="p-1.5 text-emerald-300 font-bold">Register B</td>
                      <td className="p-1.5 text-slate-400">Loads Register B word</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-center">1</td>
                      <td className="p-1.5 text-center">0</td>
                      <td className="p-1.5 text-amber-300 font-bold">Register C</td>
                      <td className="p-1.5 text-slate-400">Loads Register C word</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-center">1</td>
                      <td className="p-1.5 text-center">1</td>
                      <td className="p-1.5 text-rose-300 font-bold">All Zeros (GND)</td>
                      <td className="p-1.5 text-slate-400">Clears Register D to 0000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FIG 2.28: DATA SERIALIZER */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-sm text-cyan-400">Textbook Fig 2.28: Parallel-to-Serial Serializer</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">8:1 MUX + 3-Bit Counter</span>
              </div>
              <p className="text-xs text-slate-400">Converts an 8-bit parallel byte ($D_0..D_7$) into a single serial bit stream on wire $Z$.</p>

              {/* SVG FIG 2.28 */}
              <div className="w-full bg-slate-900/90 rounded-lg p-3 flex justify-center items-center border border-slate-800">
                <svg viewBox="0 0 440 280" className="w-full max-w-sm h-auto font-mono text-[11px]">
                  {/* 8 Parallel Data Inputs */}
                  <text x="25" y="35" fill="#94a3b8" fontSize="10">D₀</text>
                  <text x="25" y="60" fill="#94a3b8" fontSize="10">D₁</text>
                  <text x="25" y="85" fill="#94a3b8" fontSize="10">D₂</text>
                  <text x="25" y="110" fill="#94a3b8" fontSize="10">D₃</text>
                  <text x="25" y="135" fill="#94a3b8" fontSize="10">D₄</text>
                  <text x="25" y="160" fill="#94a3b8" fontSize="10">D₅</text>
                  <text x="25" y="185" fill="#94a3b8" fontSize="10">D₆</text>
                  <text x="25" y="210" fill="#94a3b8" fontSize="10">D₇</text>

                  {/* Lines to MUX */}
                  {[32, 57, 82, 107, 132, 157, 182, 207].map((y, i) => (
                    <line key={i} x1="45" y1={y} x2="160" y2={y} stroke="#64748b" strokeWidth="1.5" />
                  ))}

                  {/* 8:1 MUX Box */}
                  <polygon
                    points="160,20 270,45 270,225 160,250"
                    fill="#082f49"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                  <text x="215" y="130" fill="#e0f2fe" fontWeight="bold" textAnchor="middle" fontSize="13">8 × 1</text>
                  <text x="215" y="148" fill="#7dd3fc" fontWeight="bold" textAnchor="middle" fontSize="11">MUX</text>

                  {/* Serial Output Wire */}
                  <line x1="270" y1="135" x2="380" y2="135" stroke="#10b981" strokeWidth="3" />
                  <circle cx="380" cy="135" r="4" fill="#10b981" />
                  <text x="390" y="140" fill="#34d399" fontWeight="bold" fontSize="13">Z (Serial)</text>

                  {/* 3-Bit Counter Box Below */}
                  <rect x="50" y="235" width="90" height="38" rx="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="95" y="252" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">3-BIT</text>
                  <text x="95" y="265" fill="#fde68a" textAnchor="middle" fontSize="9">COUNTER</text>

                  {/* CLK input into counter */}
                  <line x1="15" y1="254" x2="50" y2="254" stroke="#f59e0b" strokeWidth="2" />
                  <text x="5" y="258" fill="#f59e0b" fontSize="9" fontWeight="bold">CLK</text>

                  {/* Counter output wires to MUX select lines */}
                  <path d="M 140 254 L 215 254 L 215 237" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="225" y="250" fill="#fbbf24" fontSize="9">S₂ S₁ S₀</text>
                </svg>
              </div>

              {/* Table Fig 2.28 */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 space-y-1.5">
                <span className="font-bold text-cyan-400">Sequential Transmission Cycle:</span>
                <p className="text-slate-400">
                  With each clock pulse, the counter increments: $000 \to 001 \to 010 \to \dots \to 111$.
                  The MUX routes $D_0 \to D_1 \to D_2 \to \dots \to D_7$ sequentially onto the single wire $Z$.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">System Architecture &amp; Hardware Roles of Multiplexers</h2>
              <p className="text-xs text-slate-400">Section 2.3.4C concepts: Buses, data serialization, and Look-Up Tables</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* ROLE 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2.5">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Cable size={14} className="text-indigo-400" />
                1. Central Computer Bus Switching
              </span>
              <p className="text-slate-300">
                A <strong>bus</strong> is a collection of signal lines that accept inputs from several hardware devices and distribute data to one or more destinations.
              </p>
              <p className="text-slate-400">
                If every register had dedicated physical wires to every other register, an $n$-register CPU would require $O(n^2)$ connections. Multiplexers eliminate this chaos: registers feed into a MUX array, and the CPU control unit uses select lines to grant bus access to one register at a time.
              </p>
            </div>

            {/* ROLE 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2.5">
              <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Share2 size={14} className="text-cyan-400" />
                2. Parallel-to-Serial Data Conversion
              </span>
              <p className="text-slate-300">
                Processors process data in parallel (8, 16, 32, or 64 bits simultaneously). However, transmitting 64 parallel wires over long cables is expensive, bulky, and suffers from signal skew.
              </p>
              <p className="text-slate-400">
                A multiplexer paired with a binary counter acts as a <strong>data serializer</strong> (Parallel-in Serial-out / PISO), converting wide words into a high-speed bitstream for Ethernet, USB, UART, and fiber optics.
              </p>
            </div>

            {/* ROLE 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2.5">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Cpu size={14} className="text-emerald-400" />
                3. Arbitrary Combinational Logic Generation (LUT)
              </span>
              <p className="text-slate-300">
                Any $n$-variable Boolean function can be implemented directly on a $2^n \times 1$ MUX by placing the truth table values directly onto data inputs $I_0..I_{"{"}2^n-1{"}"}$, or on a $2^{"{"}n-1{"}"} \times 1$ MUX using singling-out rules.
              </p>
              <p className="text-slate-400">
                This exact multiplexer structure forms the fundamental building block of modern <strong>Field Programmable Gate Arrays (FPGAs)</strong>, known as configurable Look-Up Tables (LUTs).
              </p>
            </div>

            {/* ROLE 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-2.5">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Activity size={14} className="text-amber-400" />
                4. Time-Division Multiplexing (TDM)
              </span>
              <p className="text-slate-300">
                In telecommunications, multiple independent audio/data channels share a single communication channel by allocating distinct time slices to each channel.
              </p>
              <p className="text-slate-400">
                A transmission multiplexer rotates through all input channels sequentially, while a receiver demultiplexer reverses the process synchronously.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: INTERACTIVE BUS ROUTING SIMULATOR */}
      {activeTab === "busRouting" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Register Bus Router (Textbook Fig 2.27)</h2>
              <p className="text-xs text-slate-400">Configure 4-bit register words and manipulate select lines $S_1, S_0$ to route data into Register D</p>
            </div>
          </div>

          {/* SELECT LINE CONTROLS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelBusS1(!selBusS1)}
              className={clsx(
                "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                selBusS1
                  ? "bg-pink-950/40 border-pink-500/50 shadow-lg shadow-pink-500/10"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              )}
            >
              <div>
                <span className="text-xs text-slate-400 font-mono">Control Line</span>
                <div className="text-sm font-bold text-white">Select Line S₁ (MSB)</div>
              </div>
              <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm", selBusS1 ? "bg-pink-500 text-white" : "bg-slate-800 text-slate-400")}>
                {selBusS1 ? "1" : "0"}
              </div>
            </div>

            <div
              onClick={() => setSelBusS0(!selBusS0)}
              className={clsx(
                "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                selBusS0
                  ? "bg-pink-950/40 border-pink-500/50 shadow-lg shadow-pink-500/10"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              )}
            >
              <div>
                <span className="text-xs text-slate-400 font-mono">Control Line</span>
                <div className="text-sm font-bold text-white">Select Line S₀ (LSB)</div>
              </div>
              <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm", selBusS0 ? "bg-pink-500 text-white" : "bg-slate-800 text-slate-400")}>
                {selBusS0 ? "1" : "0"}
              </div>
            </div>
          </div>

          {/* SOURCE REGISTERS CONFIGURATION */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Source Registers (Click bits to customize 4-bit words)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* REG A */}
              <div className={clsx("p-4 rounded-xl border transition-all", !selBusS1 && !selBusS0 ? "bg-sky-950/40 border-sky-500 shadow-md shadow-sky-500/20" : "bg-slate-950 border-slate-800 opacity-70")}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-sky-400">Register A (00)</span>
                  {!selBusS1 && !selBusS0 && <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold">BUS ACTIVE</span>}
                </div>
                <div className="flex gap-2 justify-center">
                  {regA.map((bit, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const copy = [...regA];
                        copy[i] = copy[i] === 1 ? 0 : 1;
                        setRegA(copy);
                      }}
                      className={clsx("w-10 h-10 rounded font-mono font-bold text-sm border", bit === 1 ? "bg-sky-500 text-white border-sky-400" : "bg-slate-900 text-slate-400 border-slate-700")}
                    >
                      {bit}
                    </button>
                  ))}
                </div>
              </div>

              {/* REG B */}
              <div className={clsx("p-4 rounded-xl border transition-all", !selBusS1 && selBusS0 ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/20" : "bg-slate-950 border-slate-800 opacity-70")}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-emerald-400">Register B (01)</span>
                  {!selBusS1 && selBusS0 && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">BUS ACTIVE</span>}
                </div>
                <div className="flex gap-2 justify-center">
                  {regB.map((bit, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const copy = [...regB];
                        copy[i] = copy[i] === 1 ? 0 : 1;
                        setRegB(copy);
                      }}
                      className={clsx("w-10 h-10 rounded font-mono font-bold text-sm border", bit === 1 ? "bg-emerald-500 text-white border-emerald-400" : "bg-slate-900 text-slate-400 border-slate-700")}
                    >
                      {bit}
                    </button>
                  ))}
                </div>
              </div>

              {/* REG C */}
              <div className={clsx("p-4 rounded-xl border transition-all", selBusS1 && !selBusS0 ? "bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/20" : "bg-slate-950 border-slate-800 opacity-70")}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-amber-400">Register C (10)</span>
                  {selBusS1 && !selBusS0 && <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">BUS ACTIVE</span>}
                </div>
                <div className="flex gap-2 justify-center">
                  {regC.map((bit, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const copy = [...regC];
                        copy[i] = copy[i] === 1 ? 0 : 1;
                        setRegC(copy);
                      }}
                      className={clsx("w-10 h-10 rounded font-mono font-bold text-sm border", bit === 1 ? "bg-amber-500 text-white border-amber-400" : "bg-slate-900 text-slate-400 border-slate-700")}
                    >
                      {bit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DESTINATION REGISTER D RESULT */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Destination Register</span>
                <span className="text-base font-bold text-white">Register D (4-Bit Word Received via Shared Bus)</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
                Routed from: {currentBus.source}
              </div>
            </div>

            <div className="flex gap-3 justify-center py-2">
              {currentBus.data.map((bit, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-900 border border-indigo-400 flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-600/30"
                >
                  <span className="text-[9px] uppercase tracking-wider text-indigo-200">Bit {3 - i}</span>
                  <span className="font-extrabold text-xl font-mono">{bit}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400">
              Control code <span className="font-mono text-pink-400 font-bold">{selBusS1 ? 1 : 0}{selBusS0 ? 1 : 0}</span> steers 4 parallel multiplexers to copy <span className="text-white font-bold">{currentBus.name}</span> into Register D simultaneously on the next clock edge.
            </p>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SERIALIZER SIMULATOR */}
      {activeTab === "serializer" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Parallel-to-Serial Data Serializer (Textbook Fig 2.28)</h2>
              <p className="text-xs text-slate-400">Configure 8-bit parallel byte ($D_0..D_7$) and step the 3-bit binary counter to stream serial bits on line $Z$</p>
            </div>
          </div>

          {/* PARALLEL INPUTS (D0 - D7) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                8-Bit Parallel Data Byte (Click to toggle logic levels)
              </span>
              <span className="text-xs text-cyan-400 font-mono">D₇ D₆ D₅ D₄ D₃ D₂ D₁ D₀</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {serializerInputs.map((bit, idx) => {
                const isActive = counterStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleSerialBit(idx)}
                    className={clsx(
                      "p-3 rounded-lg border flex flex-col items-center justify-center transition-all",
                      isActive
                        ? "bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">D{idx}</span>
                    <span className={clsx("text-lg font-bold font-mono my-1", bit === 1 ? "text-emerald-400" : "text-slate-400")}>
                      {bit}
                    </span>
                    <span className="text-[9px] text-amber-400 font-mono">{isActive ? "ACTIVE" : "idle"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COUNTER CONTROLS & TIMING */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* COUNTER STATE */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">3-Bit Binary Counter State</span>
              <div className="text-3xl font-mono font-extrabold text-amber-400">
                {((counterStep >> 2) & 1)}{((counterStep >> 1) & 1)}{(counterStep & 1)}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                S₂={(counterStep >> 2) & 1}, S₁={(counterStep >> 1) & 1}, S₀={(counterStep & 1)} (Dec: {counterStep})
              </div>
            </div>

            {/* CONTROLS */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider text-center block">Clock Controls</span>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                    isPlaying ? "bg-amber-600 text-white" : "bg-emerald-600 text-white hover:bg-emerald-500"
                  )}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {isPlaying ? "Pause CLK" : "Run CLK"}
                </button>
                <button
                  onClick={stepManualCounter}
                  disabled={isPlaying}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 disabled:opacity-40"
                >
                  Step CLK
                </button>
                <button
                  onClick={resetCounter}
                  className="p-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* SERIAL OUTPUT BIT */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Current Serial Output Z</span>
              <div className="text-4xl font-mono font-extrabold text-emerald-400">
                {serializerInputs[counterStep]}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Transmitting Bit D{counterStep}
              </div>
            </div>
          </div>

          {/* SERIAL BITSTREAM WAVEFORM HISTORY */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Serial Bit Stream Waveform (Latest on Right &rarr;)</span>
              <span className="font-mono text-emerald-400">PISO Stream</span>
            </div>

            <div className="h-16 bg-slate-900 rounded-lg border border-slate-800 p-2 flex items-end gap-1 overflow-hidden">
              {serialHistory.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={clsx(
                      "w-full rounded-t transition-all",
                      val === 1 ? "h-10 bg-emerald-500 shadow-sm shadow-emerald-500/50" : "h-2 bg-slate-700"
                    )}
                  />
                  <span className="text-[9px] font-mono text-slate-400 mt-1">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: ISC BOARD EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus &amp; Evaluator Rubric</h2>
              <p className="text-xs text-slate-400">Expected questions on Section 2.3.4C in CISCE theory exams</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Definition of a Bus:</strong> Memorize the standard textbook definition verbatim: <em>&ldquo;A bus is a wire or group of wires that accepts inputs from several sources and distributes the resultant logic level to a destination.&rdquo;</em></li>
                <li><strong className="text-white">Draw Fig 2.27 Clearly:</strong> Practice drawing the 3 source registers ($A, B, C$), the all-zeros clear line, the multiplexer block, the select bus ($S_1, S_0$), and destination Register $D$.</li>
                <li><strong className="text-white">Serializer Architecture (Fig 2.28):</strong> Remember to state that an 8-to-1 MUX requires a <strong>3-bit binary counter</strong> driven by a clock pulse to generate the sequential selection states $000$ through $111$.</li>
                <li><strong className="text-white">Parallel vs Serial Contrast:</strong> In viva or 2-mark questions, explain that parallel buses are faster inside the CPU chip, but serial transmission requires far fewer physical wires over long distances.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
      {activeTab === "faqs" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* SECTION: 15 ESSENTIAL FAQS (ACCORDION AT BOTTOM OF LESSON) */}
      {activeTab !== "faqs" && (
        <section className="pt-6 border-t border-slate-800">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-41-mux-applications"
        headline="Sukanta Hui's Practical Blueprint for Multiplexer Applications"
        note="Section 2.3.4C showcases the true superpower of multiplexers in computer architecture! In modern CPUs, buses aren't just bare wires—they are switched by multiplexer arrays (Fig 2.27) to transfer 32-bit or 64-bit words between registers. And every time you send data over USB, HDMI, or Wi-Fi, parallel data inside the CPU is serialized using a MUX and counter (Fig 2.28). In your ISC exam, memorize the Fig 2.27 register routing table and the Fig 2.28 serializer block diagram!"
      />
    </div>
  );
};

export default Topic41;
