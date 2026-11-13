import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic8_faqs";

const Topic8 = () => {
  const [activeTab, setActiveTab] = useState("truthTable"); // Default to truthTable tab as requested
  const [activeInput, setActiveInput] = useState(2); // Active input: 0, 1, 2, or 3 (Default: I2)

  // Derived output values based on standard 4-to-2 encoder logic:
  // Y1 = I2 + I3
  // Y0 = I1 + I3
  const isI0 = activeInput === 0;
  const isI1 = activeInput === 1;
  const isI2 = activeInput === 2;
  const isI3 = activeInput === 3;

  const y1 = isI2 || isI3 ? 1 : 0;
  const y0 = isI1 || isI3 ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 8
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Encoders: Definition, Operating Principle &amp; Line Compression
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Translating $2^n$ Active Input Signals into $n$-Bit Compact Binary Codes ($2^n \to n$ Architecture)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Circuit Simulator" },
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

      {/* TAB 1: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
              01
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Conceptual Overview &amp; Operating Principles
              </h2>
              <p className="text-xs text-slate-400">
                Fundamental digital logic definitions according to CISCE ISC Class 12 specifications
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              An <strong className="text-cyan-300">Encoder</strong> is a combinational digital logic circuit that performs the reverse operation of a decoder. It accepts <strong className="text-indigo-300">$2^n$ (or fewer) input lines</strong> and compresses them into an <strong className="text-emerald-300">$n$-bit binary output code</strong> representing the active input line.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              In standard binary encoders, the operation relies on the strict condition that <strong className="text-amber-300">only one input line is active (HIGH or 1) at any given instant</strong>. If input line $I_k$ is activated, the circuit produces the $n$-bit binary representation of $k$ on its output terminals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                <Cpu size={16} /> Line Compression ($2^n \to n$)
              </div>
              <p className="text-slate-400 leading-relaxed">
                Encoders compress a large number of discrete signals into a smaller bus width. For 4 inputs, we get 2 outputs; for 8 inputs, 3 outputs; for 16 inputs, 4 outputs.
              </p>
              <div className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 p-2 rounded border border-indigo-900/60">
                Formula: $n = \log_2(2^n)$
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                <Zap size={16} /> Gate Implementation
              </div>
              <p className="text-slate-400 leading-relaxed">
                Standard binary encoders are synthesized internally using <strong className="text-cyan-300">multi-input OR gates</strong>. Unlike decoders (which use AND gates), encoders perform Boolean addition to collect active input terms.
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 p-2 rounded border border-cyan-900/60">
                Gates Used: OR Gates Only
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <Activity size={16} /> Real-World Applications
              </div>
              <p className="text-slate-400 leading-relaxed">
                Computer keyboard microcontrollers (converting physical keypresses to ASCII/scan codes), numeric keypads, interrupt controllers, and ADC flash converters.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 p-2 rounded border border-emerald-900/60">
                Example: Decimal-to-BCD Keypad
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
              02
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Formal Boolean Equations &amp; Derivations
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical expressions for 4-to-2 Binary Encoder and generalized $2^n$-to-$n$ architecture
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-purple-400 uppercase font-bold tracking-wider">
              1. Derivation of 4-to-2 Binary Encoder Equations
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Let the 4 inputs be $I_0, I_1, I_2, I_3$ and the 2 binary outputs be $Y_1, Y_0$ ($Y_1$ is MSB, $Y_0$ is LSB). Under the one-hot assumption, exactly one input is HIGH at a time:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase font-mono">Output Y1 (MSB) Derivation</div>
                <p className="text-xs text-slate-400">
                  Looking at the truth table, output $Y_1 = 1$ when input line $I_2 = 1$ (binary 10) OR when input line $I_3 = 1$ (binary 11).
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-cyan-500/30 font-mono text-sm text-cyan-300 font-bold">
                  Y1 = I2 + I3
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400 uppercase font-mono">Output Y0 (LSB) Derivation</div>
                <p className="text-xs text-slate-400">
                  Output $Y_0 = 1$ when input line $I_1 = 1$ (binary 01) OR when input line $I_3 = 1$ (binary 11).
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-purple-500/30 font-mono text-sm text-purple-300 font-bold">
                  Y0 = I1 + I3
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <HelpCircle size={15} /> Crucial ISC Board Note: Why is I0 not in the equations?
              </div>
              <p className="leading-relaxed">
                When input $I_0$ is active ($I_0 = 1$), the required binary output is <strong>00</strong> ($Y_1 = 0$ and $Y_0 = 0$). Since neither $Y_1$ nor $Y_0$ should be HIGH, input line $I_0$ does not connect to any OR gate! It is left unconnected in the circuit, which naturally gives $Y_1 = 0$ and $Y_0 = 0$.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
              2. Generalized $2^n$-to-$n$ Rule (e.g., 8-to-3 Octal Encoder)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              For an 8-to-3 encoder with inputs $D_0$ through $D_7$ and outputs $X, Y, Z$:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300">
                X = D4 + D5 + D6 + D7
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300">
                Y = D2 + D3 + D6 + D7
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                Z = D1 + D3 + D5 + D7
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT DIAGRAMS */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
              03
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Comprehensive Truth Table &amp; Logic Circuit Diagrams
              </h2>
              <p className="text-xs text-slate-400">
                Complete input-output mapping and gate-level circuit schematics for 4-to-2 Binary Encoder
              </p>
            </div>
          </div>

          {/* 1. TRUTH TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} /> 1. Truth Table of 4-to-2 Binary Encoder
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                One-Hot Encoded
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th colSpan={4} className="p-2.5 font-bold text-cyan-400 border-r border-slate-800">
                      Input Lines (Only One HIGH)
                    </th>
                    <th colSpan={2} className="p-2.5 font-bold text-purple-400 border-r border-slate-800">
                      Binary Outputs
                    </th>
                    <th rowSpan={2} className="p-2.5 font-bold text-slate-300 border-r border-slate-800">
                      Decimal Equivalent
                    </th>
                    <th rowSpan={2} className="p-2.5 font-bold text-slate-300 text-left pl-4">
                      Hardware Connection Explanation
                    </th>
                  </tr>
                  <tr className="bg-slate-900/50 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                    <th className="p-2 border-r border-slate-800/60">I3</th>
                    <th className="p-2 border-r border-slate-800/60">I2</th>
                    <th className="p-2 border-r border-slate-800/60">I1</th>
                    <th className="p-2 border-r border-slate-800">I0</th>
                    <th className="p-2 text-purple-300 border-r border-slate-800/60">Y1 (MSB)</th>
                    <th className="p-2 text-purple-300 border-r border-slate-800">Y0 (LSB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 font-mono">
                  <tr className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-500/10 border-r border-slate-800">1</td>
                    <td className="p-3 text-slate-400 font-bold border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-400 font-bold border-r border-slate-800">0</td>
                    <td className="p-3 text-cyan-300 font-bold border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans text-xs">
                      Both outputs are 0; $I_0$ does not connect to any OR gate
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-500/10 border-r border-slate-800/60">1</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 font-bold border-r border-slate-800/60">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-cyan-300 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans text-xs">
                      $I_1$ is connected directly to OR gate for $Y_0$ ($Y_0 = 1$)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-500/10 border-r border-slate-800/60">1</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800/60">1</td>
                    <td className="p-3 text-slate-400 font-bold border-r border-slate-800">0</td>
                    <td className="p-3 text-cyan-300 font-bold border-r border-slate-800">2</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans text-xs">
                      $I_2$ is connected directly to OR gate for $Y_1$ ($Y_1 = 1$)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-500/10 border-r border-slate-800/60">1</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800/60">0</td>
                    <td className="p-3 text-slate-500 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800/60">1</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-cyan-300 font-bold border-r border-slate-800">3</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans text-xs">
                      $I_3$ is routed to both OR gates, driving both $Y_1 = 1$ and $Y_0 = 1$
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. BLOCK DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. Block Diagram: Generalized $2^n$-to-$n$ &amp; 4-to-2 Encoder
            </h3>

            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 220" className="w-full max-w-2xl h-auto select-none font-sans text-xs">
                {/* Background Grid Accent */}
                <defs>
                  <linearGradient id="encBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Input Lines */}
                {/* I0 */}
                <line x1="80" y1="50" x2="260" y2="50" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="80" cy="50" r="4" fill="#06b6d4" />
                <text x="50" y="54" fill="#06b6d4" fontWeight="bold" fontSize="13">I0</text>

                {/* I1 */}
                <line x1="80" y1="90" x2="260" y2="90" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="80" cy="90" r="4" fill="#06b6d4" />
                <text x="50" y="94" fill="#06b6d4" fontWeight="bold" fontSize="13">I1</text>

                {/* I2 */}
                <line x1="80" y1="130" x2="260" y2="130" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="80" cy="130" r="4" fill="#06b6d4" />
                <text x="50" y="134" fill="#06b6d4" fontWeight="bold" fontSize="13">I2</text>

                {/* I3 */}
                <line x1="80" y1="170" x2="260" y2="170" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="80" cy="170" r="4" fill="#06b6d4" />
                <text x="50" y="174" fill="#06b6d4" fontWeight="bold" fontSize="13">I3</text>

                {/* Inputs bracket label */}
                <text x="140" y="25" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  4 Active Inputs (2^n)
                </text>

                {/* Central Encoder Block */}
                <rect
                  x="260"
                  y="25"
                  width="240"
                  height="170"
                  rx="14"
                  fill="url(#encBoxGrad)"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <text x="380" y="85" fill="#ffffff" fontWeight="extrabold" fontSize="18" textAnchor="middle">
                  4-to-2 ENCODER
                </text>
                <text x="380" y="112" fill="#a5b4fc" fontSize="12" textAnchor="middle">
                  (Binary Encoder)
                </text>
                <text x="380" y="145" fill="#64748b" fontSize="11" textAnchor="middle" fontStyle="italic">
                  2^n Inputs → n Outputs
                </text>

                {/* Output Lines */}
                {/* Y1 (MSB) */}
                <line x1="500" y1="80" x2="660" y2="80" stroke="#a855f7" strokeWidth="2.5" />
                <polygon points="660,76 672,80 660,84" fill="#a855f7" />
                <text x="685" y="85" fill="#c084fc" fontWeight="bold" fontSize="14">Y1 (MSB)</text>

                {/* Y0 (LSB) */}
                <line x1="500" y1="140" x2="660" y2="140" stroke="#a855f7" strokeWidth="2.5" />
                <polygon points="660,136 672,140 660,144" fill="#a855f7" />
                <text x="685" y="145" fill="#c084fc" fontWeight="bold" fontSize="14">Y0 (LSB)</text>

                {/* Outputs label */}
                <text x="580" y="55" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  2 Binary Outputs (n)
                </text>
              </svg>
            </div>
          </div>

          {/* 3. GATE-LEVEL LOGIC CIRCUIT DIAGRAM */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Zap size={16} /> 3. Gate-Level Logic Circuit Diagram (Using OR Gates)
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                ISC Board Required Circuit
              </span>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 340" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Vertical Input Buses */}
                {/* Line I0 */}
                <line x1="120" y1="50" x2="120" y2="300" stroke="#64748b" strokeWidth="2.5" />
                <circle cx="120" cy="50" r="4.5" fill="#64748b" />
                <text x="120" y="38" fill="#94a3b8" fontWeight="bold" fontSize="14" textAnchor="middle">I0</text>

                {/* Line I1 */}
                <line x1="200" y1="50" x2="200" y2="300" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="200" cy="50" r="4.5" fill="#38bdf8" />
                <text x="200" y="38" fill="#38bdf8" fontWeight="bold" fontSize="14" textAnchor="middle">I1</text>

                {/* Line I2 */}
                <line x1="280" y1="50" x2="280" y2="300" stroke="#818cf8" strokeWidth="2.5" />
                <circle cx="280" cy="50" r="4.5" fill="#818cf8" />
                <text x="280" y="38" fill="#818cf8" fontWeight="bold" fontSize="14" textAnchor="middle">I2</text>

                {/* Line I3 */}
                <line x1="360" y1="50" x2="360" y2="300" stroke="#c084fc" strokeWidth="2.5" />
                <circle cx="360" cy="50" r="4.5" fill="#c084fc" />
                <text x="360" y="38" fill="#c084fc" fontWeight="bold" fontSize="14" textAnchor="middle">I3</text>

                {/* OR GATE 1: Y1 = I2 + I3 */}
                {/* Tap point on I2 */}
                <circle cx="280" cy="110" r="5" fill="#818cf8" />
                <line x1="280" y1="110" x2="480" y2="110" stroke="#818cf8" strokeWidth="2" />

                {/* Tap point on I3 */}
                <circle cx="360" cy="140" r="5" fill="#c084fc" />
                <line x1="360" y1="140" x2="480" y2="140" stroke="#c084fc" strokeWidth="2" />

                {/* OR Gate 1 Body */}
                <g transform="translate(480, 85)">
                  {/* Standard curved OR gate symbol */}
                  <path
                    d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z"
                    fill="#1e1b4b"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                  />
                  <text x="22" y="36" fill="#a5b4fc" fontSize="11" fontWeight="bold">OR</text>
                  {/* Output line */}
                  <line x1="55" y1="32.5" x2="140" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                  <polygon points="140,28.5 152,32.5 140,36.5" fill="#a855f7" />
                  <text x="165" y="37" fill="#c084fc" fontWeight="bold" fontSize="15">
                    Y1 = I2 + I3
                  </text>
                  <text x="165" y="55" fill="#64748b" fontSize="11" fontStyle="italic">
                    (MSB Output)
                  </text>
                </g>

                {/* OR GATE 2: Y0 = I1 + I3 */}
                {/* Tap point on I1 */}
                <circle cx="200" cy="210" r="5" fill="#38bdf8" />
                <line x1="200" y1="210" x2="480" y2="210" stroke="#38bdf8" strokeWidth="2" />

                {/* Tap point on I3 */}
                <circle cx="360" cy="240" r="5" fill="#c084fc" />
                <line x1="360" y1="240" x2="480" y2="240" stroke="#c084fc" strokeWidth="2" />

                {/* OR Gate 2 Body */}
                <g transform="translate(480, 185)">
                  {/* Standard curved OR gate symbol */}
                  <path
                    d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z"
                    fill="#1e1b4b"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <text x="22" y="36" fill="#7dd3fc" fontSize="11" fontWeight="bold">OR</text>
                  {/* Output line */}
                  <line x1="55" y1="32.5" x2="140" y2="32.5" stroke="#38bdf8" strokeWidth="2.5" />
                  <polygon points="140,28.5 152,32.5 140,36.5" fill="#38bdf8" />
                  <text x="165" y="37" fill="#38bdf8" fontWeight="bold" fontSize="15">
                    Y0 = I1 + I3
                  </text>
                  <text x="165" y="55" fill="#64748b" fontSize="11" fontStyle="italic">
                    (LSB Output)
                  </text>
                </g>

                {/* Special Highlight Annotation for I0 */}
                <rect x="50" y="270" width="220" height="42" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="160" y="288" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ⚠ Note on Line I0:
                </text>
                <text x="160" y="302" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                  Not connected to any OR gate!
                </text>
                <line x1="120" y1="290" x2="120" y2="270" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
              04
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive 4-to-2 Binary Encoder Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Select an active input line to observe real-time one-hot wire activation and OR gate evaluation
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* Input Selection Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Select Active Input Line (One-Hot Logic):
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  Active: Line I{activeInput} (Decimal {activeInput})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((inputIdx) => {
                  const isSelected = activeInput === inputIdx;
                  return (
                    <button
                      key={inputIdx}
                      onClick={() => setActiveInput(inputIdx)}
                      className={clsx(
                        "p-3.5 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1.5",
                        isSelected
                          ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30 scale-102"
                          : "bg-slate-900/90 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <span className="text-sm">Input I{inputIdx}</span>
                      <span className={clsx("text-[10px] px-2 py-0.5 rounded font-bold uppercase", isSelected ? "bg-black/20 text-slate-950" : "text-slate-500")}>
                        {isSelected ? "1 (HIGH)" : "0 (LOW)"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIVE DYNAMIC SVG SCHEMATIC */}
            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
                <span>Real-Time Signal Propagation &amp; Gate Response:</span>
                <span className="text-emerald-400 font-bold">
                  Binary Output: Y1 Y0 = {y1} {y0}
                </span>
              </div>

              <svg viewBox="0 0 760 300" className="w-full h-auto select-none font-mono text-xs">
                {/* Vertical Bus Lines with dynamic lighting */}
                {/* I0 */}
                <line
                  x1="100"
                  y1="40"
                  x2="100"
                  y2="260"
                  stroke={isI0 ? "#10b981" : "#334155"}
                  strokeWidth={isI0 ? "3.5" : "2"}
                />
                <circle cx="100" cy="40" r="5" fill={isI0 ? "#10b981" : "#334155"} />
                <text x="100" y="28" fill={isI0 ? "#34d399" : "#64748b"} fontWeight="bold" fontSize="13" textAnchor="middle">
                  I0 = {isI0 ? "1" : "0"}
                </text>

                {/* I1 */}
                <line
                  x1="180"
                  y1="40"
                  x2="180"
                  y2="260"
                  stroke={isI1 ? "#06b6d4" : "#334155"}
                  strokeWidth={isI1 ? "3.5" : "2"}
                />
                <circle cx="180" cy="40" r="5" fill={isI1 ? "#06b6d4" : "#334155"} />
                <text x="180" y="28" fill={isI1 ? "#22d3ee" : "#64748b"} fontWeight="bold" fontSize="13" textAnchor="middle">
                  I1 = {isI1 ? "1" : "0"}
                </text>

                {/* I2 */}
                <line
                  x1="260"
                  y1="40"
                  x2="260"
                  y2="260"
                  stroke={isI2 ? "#818cf8" : "#334155"}
                  strokeWidth={isI2 ? "3.5" : "2"}
                />
                <circle cx="260" cy="40" r="5" fill={isI2 ? "#818cf8" : "#334155"} />
                <text x="260" y="28" fill={isI2 ? "#a5b4fc" : "#64748b"} fontWeight="bold" fontSize="13" textAnchor="middle">
                  I2 = {isI2 ? "1" : "0"}
                </text>

                {/* I3 */}
                <line
                  x1="340"
                  y1="40"
                  x2="340"
                  y2="260"
                  stroke={isI3 ? "#c084fc" : "#334155"}
                  strokeWidth={isI3 ? "3.5" : "2"}
                />
                <circle cx="340" cy="40" r="5" fill={isI3 ? "#c084fc" : "#334155"} />
                <text x="340" y="28" fill={isI3 ? "#e9d5ff" : "#64748b"} fontWeight="bold" fontSize="13" textAnchor="middle">
                  I3 = {isI3 ? "1" : "0"}
                </text>

                {/* OR GATE 1: Y1 = I2 + I3 */}
                {/* Tap on I2 */}
                <circle cx="260" cy="90" r="5" fill={isI2 ? "#818cf8" : "#334155"} />
                <line
                  x1="260"
                  y1="90"
                  x2="460"
                  y2="90"
                  stroke={isI2 ? "#818cf8" : "#334155"}
                  strokeWidth={isI2 ? "3" : "1.5"}
                />

                {/* Tap on I3 */}
                <circle cx="340" cy="120" r="5" fill={isI3 ? "#c084fc" : "#334155"} />
                <line
                  x1="340"
                  y1="120"
                  x2="460"
                  y2="120"
                  stroke={isI3 ? "#c084fc" : "#334155"}
                  strokeWidth={isI3 ? "3" : "1.5"}
                />

                {/* OR Gate 1 Body */}
                <g transform="translate(460, 65)">
                  <path
                    d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z"
                    fill={y1 === 1 ? "#312e81" : "#1e1b4b"}
                    stroke={y1 === 1 ? "#a855f7" : "#475569"}
                    strokeWidth="2.5"
                  />
                  <text x="22" y="36" fill={y1 === 1 ? "#e9d5ff" : "#94a3b8"} fontSize="11" fontWeight="bold">OR</text>
                  {/* Output line */}
                  <line
                    x1="55"
                    y1="32.5"
                    x2="150"
                    y2="32.5"
                    stroke={y1 === 1 ? "#c084fc" : "#475569"}
                    strokeWidth={y1 === 1 ? "3.5" : "2"}
                  />
                  <circle cx="150" cy="32.5" r="5" fill={y1 === 1 ? "#c084fc" : "#475569"} />
                  <text x="165" y="37" fill={y1 === 1 ? "#c084fc" : "#64748b"} fontWeight="bold" fontSize="15">
                    Y1 = {y1}
                  </text>
                </g>

                {/* OR GATE 2: Y0 = I1 + I3 */}
                {/* Tap on I1 */}
                <circle cx="180" cy="180" r="5" fill={isI1 ? "#06b6d4" : "#334155"} />
                <line
                  x1="180"
                  y1="180"
                  x2="460"
                  y2="180"
                  stroke={isI1 ? "#06b6d4" : "#334155"}
                  strokeWidth={isI1 ? "3" : "1.5"}
                />

                {/* Tap on I3 */}
                <circle cx="340" cy="210" r="5" fill={isI3 ? "#c084fc" : "#334155"} />
                <line
                  x1="340"
                  y1="210"
                  x2="460"
                  y2="210"
                  stroke={isI3 ? "#c084fc" : "#334155"}
                  strokeWidth={isI3 ? "3" : "1.5"}
                />

                {/* OR Gate 2 Body */}
                <g transform="translate(460, 155)">
                  <path
                    d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z"
                    fill={y0 === 1 ? "#083344" : "#0f172a"}
                    stroke={y0 === 1 ? "#22d3ee" : "#475569"}
                    strokeWidth="2.5"
                  />
                  <text x="22" y="36" fill={y0 === 1 ? "#a5f3fc" : "#94a3b8"} fontSize="11" fontWeight="bold">OR</text>
                  {/* Output line */}
                  <line
                    x1="55"
                    y1="32.5"
                    x2="150"
                    y2="32.5"
                    stroke={y0 === 1 ? "#22d3ee" : "#475569"}
                    strokeWidth={y0 === 1 ? "3.5" : "2"}
                  />
                  <circle cx="150" cy="32.5" r="5" fill={y0 === 1 ? "#22d3ee" : "#475569"} />
                  <text x="165" y="37" fill={y0 === 1 ? "#22d3ee" : "#64748b"} fontWeight="bold" fontSize="15">
                    Y0 = {y0}
                  </text>
                </g>
              </svg>
            </div>

            {/* Readout Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Active Input Line</div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  I{activeInput}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Decimal {activeInput}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Binary Code Generated</div>
                <div className="text-2xl font-bold font-mono text-purple-300">
                  {y1} {y0}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Y1 (MSB) Y0 (LSB)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-mono">OR Gate Equations Status</div>
                <div className="text-xs font-mono text-emerald-300 py-1">
                  Y1 = {isI2 ? "1" : "0"} + {isI3 ? "1" : "0"} = {y1}
                  <br />
                  Y0 = {isI1 ? "1" : "0"} + {isI3 ? "1" : "0"} = {y0}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Boolean Addition</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM TIPS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
              05
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                ISC Board Examination Strategy &amp; Scoring Pitfalls
              </h2>
              <p className="text-xs text-slate-400">
                Key insights from CISCE Council evaluation guidelines and past question trends
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
              <div className="font-bold text-rose-400 uppercase tracking-wider text-xs">
                Common Mistake #1: Connecting Input I0 to an OR Gate
              </div>
              <p className="text-slate-300 leading-relaxed">
                Many students incorrectly draw an OR gate for $I_0$ or connect $I_0$ to $Y_1$ or $Y_0$. Remember: the binary code for decimal 0 is <strong>00</strong>. If $I_0$ were connected to any OR gate, activating $I_0$ would force that output to 1, corrupting the code! Always leave $I_0$ unconnected in standard encoders.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider text-xs">
                Common Mistake #2: Confusing Encoders with Decoders
              </div>
              <p className="text-slate-300 leading-relaxed">
                Decoders expand $n$ inputs into $2^n$ outputs using <strong>AND gates</strong>. Encoders compress $2^n$ inputs into $n$ outputs using <strong>OR gates</strong>. In the board exam, drawing AND gates for an encoder results in a 0 mark deduction for that sub-question!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 uppercase tracking-wider text-xs">
                Exam Checklist for Full Marks (3-Mark Circuit Question)
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Draw the Block Diagram first, clearly labeling $2^n$ inputs on the left and $n$ outputs on the right.</li>
                <li>Write down the complete Truth Table showing all $2^n$ input columns with one-hot 1s and output columns ($Y_1, Y_0$).</li>
                <li>Write the explicit Boolean expressions: $Y_1 = I_2 + I_3$ and $Y_0 = I_1 + I_3$.</li>
                <li>Draw the gate-level circuit with standard curved OR gate symbols, distinct junction dots on tapped wires, and clearly labeled outputs.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

            {/* TAB CONTENT: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
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

{/* TEACHER SUKANTA HUI MENTOR NOTE */}
      <section>
        <Teacher
          note="Whenever you tackle an Encoder question in your ISC examination, remember the 'Compression Principle'. An encoder is an information squeezer: it takes 4 or 8 individual wires and squeezes them into a compact binary address using OR gates. The most common pitfall I see in Barrackpore board prep papers is students forgetting that only ONE wire can be active at a time! If two wires are pressed at once, standard encoders get confused—which is exactly why Priority Encoders were invented. Practice drawing the 4-to-2 circuit until you can sketch it with proper OR gates and junction dots in under 90 seconds!"
        />
      </section>
    </div>
  );
};

export default Topic8;
