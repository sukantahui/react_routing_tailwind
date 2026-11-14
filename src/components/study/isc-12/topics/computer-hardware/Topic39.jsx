import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, ArrowRight, ToggleLeft, Layers } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic39_faqs";

const Topic39 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Interactive Simulator inputs
  const [inA, setInA] = useState(false);
  const [inB, setInB] = useState(false);
  const [inC, setInC] = useState(false);
  const [activeMethod, setActiveMethod] = useState("leftmost"); // "leftmost" or "rightmost"

  // Evaluation for F(A, B, C) = Σ(0, 2, 4, 6, 7)
  const isMintermHigh = (a, b, c) => {
    const m = (a ? 4 : 0) + (b ? 2 : 0) + (c ? 1 : 0);
    return [0, 2, 4, 6, 7].includes(m);
  };

  const outputF = isMintermHigh(inA, inB, inC);

  // Method A (Leftmost: A singled out, S1=B, S0=C)
  // I0 = 1, I1 = 0, I2 = 1, I3 = A
  const selIndexA = (inB ? 2 : 0) + (inC ? 1 : 0);
  const inputLinesMethodA = [1, 0, 1, inA ? 1 : 0];

  // Method B (Rightmost: C singled out, S1=A, S0=B)
  // I0 = C', I1 = C', I2 = C', I3 = 1
  const selIndexB = (inA ? 2 : 0) + (inB ? 1 : 0);
  const inputLinesMethodB = [inC ? 0 : 1, inC ? 0 : 1, inC ? 0 : 1, 1];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 39
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Logic
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Synthesis Optimization Strategy
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MUX Variable Selection Strategy: Leftmost Singled-Out ($A$) vs Rightmost Singled-Out ($C$)
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Comparative analysis of implementation conventions for $F(A, B, C) = \Sigma(0, 2, 4, 6, 7)$ on a $4 \times 1$ MUX: Contrasting CISCE syllabus standards ($A$ data) against classical engineering literature ($C$ data), gate counts, and inverter overhead.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "truthTable", label: "1. Circuit Diagrams & Truth Tables" },
              { id: "theory", label: "2. Core Theory & Convention Comparison" },
              { id: "methodA", label: "3. Method A: Leftmost (A)" },
              { id: "methodB", label: "4. Method B: Rightmost (C)" },
              { id: "interactive", label: "5. Dual-Method MUX Simulator" },
              { id: "examTips", label: "6. ISC Board Exam Focus" },
              { id: "faqs", label: "7. 15 Essential FAQs" }
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

      {/* TAB 1: CIRCUIT & TRUTH TABLE */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Side-by-Side Architectural Schematics</h2>
              <p className="text-xs text-slate-400">Comparing hardware realization circuits for $F(A, B, C) = \Sigma(0, 2, 4, 6, 7)$</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SCHEMATIC 1: METHOD A */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-sm text-indigo-400">Method A: Leftmost Singled Out ($A$)</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">0 Inverters (Optimal)</span>
              </div>
              <p className="text-xs text-slate-400">CISCE Preferred: $S_1 = B$, $S_0 = C$, Data: $I_0=1, I_1=0, I_2=1, I_3=A$</p>

              {/* SVG METHOD A */}
              <div className="w-full bg-slate-900/90 rounded-lg p-3 flex justify-center items-center border border-slate-800">
                <svg viewBox="0 0 420 280" className="w-full max-w-sm h-auto font-mono text-[11px]">
                  {/* MUX Box */}
                  <rect x="150" y="30" width="120" height="200" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="210" y="55" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="13">4 × 1 MUX</text>
                  <text x="210" y="72" fill="#818cf8" textAnchor="middle" fontSize="9">(Leftmost A)</text>

                  {/* Input Ports */}
                  <text x="165" y="100" fill="#94a3b8" fontSize="10">I₀</text>
                  <text x="165" y="130" fill="#94a3b8" fontSize="10">I₁</text>
                  <text x="165" y="160" fill="#94a3b8" fontSize="10">I₂</text>
                  <text x="165" y="190" fill="#94a3b8" fontSize="10">I₃</text>

                  {/* Input Wires */}
                  {/* I0 = 1 (VCC) */}
                  <line x1="40" y1="96" x2="150" y2="96" stroke="#10b981" strokeWidth="2" />
                  <circle cx="40" cy="96" r="3" fill="#10b981" />
                  <text x="20" y="100" fill="#34d399" fontWeight="bold">1 (Vcc)</text>

                  {/* I1 = 0 (GND) */}
                  <line x1="40" y1="126" x2="150" y2="126" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="40" cy="126" r="3" fill="#ef4444" />
                  <text x="20" y="130" fill="#f87171" fontWeight="bold">0 (Gnd)</text>

                  {/* I2 = 1 (VCC) */}
                  <path d="M 60 96 L 60 156 L 150 156" fill="none" stroke="#10b981" strokeWidth="2" />
                  <circle cx="60" cy="96" r="3" fill="#10b981" />

                  {/* I3 = A */}
                  <line x1="40" y1="186" x2="150" y2="186" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="40" cy="186" r="3" fill="#38bdf8" />
                  <text x="20" y="190" fill="#38bdf8" fontWeight="bold">A</text>

                  {/* Select Lines */}
                  <line x1="180" y1="260" x2="180" y2="230" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="230" y1="260" x2="230" y2="230" stroke="#f59e0b" strokeWidth="2" />
                  <text x="180" y="275" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₁ (B)</text>
                  <text x="230" y="275" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₀ (C)</text>

                  {/* Output Line */}
                  <line x1="270" y1="130" x2="360" y2="130" stroke="#a855f7" strokeWidth="2" />
                  <circle cx="360" cy="130" r="3" fill="#a855f7" />
                  <text x="370" y="134" fill="#c084fc" fontWeight="bold" fontSize="13">F</text>
                </svg>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-slate-300">
                <span className="font-bold text-emerald-400">Zero Inverter Advantage:</span> Notice how $I_3$ is tied directly to variable $A$. No external logic gates or inverters are required whatsoever!
              </div>
            </div>

            {/* SCHEMATIC 2: METHOD B */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-sm text-cyan-400">Method B: Rightmost Singled Out ($C$)</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">1 Inverter Required</span>
              </div>
              <p className="text-xs text-slate-400">Engineering Textbook: $S_1 = A$, $S_0 = B$, Data: $I_0=C&apos;, I_1=C&apos;, I_2=C&apos;, I_3=1$</p>

              {/* SVG METHOD B */}
              <div className="w-full bg-slate-900/90 rounded-lg p-3 flex justify-center items-center border border-slate-800">
                <svg viewBox="0 0 420 280" className="w-full max-w-sm h-auto font-mono text-[11px]">
                  {/* MUX Box */}
                  <rect x="170" y="30" width="120" height="200" rx="8" fill="#082f49" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="230" y="55" fill="#7dd3fc" fontWeight="bold" textAnchor="middle" fontSize="13">4 × 1 MUX</text>
                  <text x="230" y="72" fill="#38bdf8" textAnchor="middle" fontSize="9">(Rightmost C)</text>

                  {/* Input Ports */}
                  <text x="185" y="100" fill="#94a3b8" fontSize="10">I₀</text>
                  <text x="185" y="130" fill="#94a3b8" fontSize="10">I₁</text>
                  <text x="185" y="160" fill="#94a3b8" fontSize="10">I₂</text>
                  <text x="185" y="190" fill="#94a3b8" fontSize="10">I₃</text>

                  {/* NOT Gate on C */}
                  <line x1="20" y1="126" x2="60" y2="126" stroke="#f43f5e" strokeWidth="2" />
                  <text x="10" y="130" fill="#f43f5e" fontWeight="bold">C</text>
                  <polygon points="60,116 85,126 60,136" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <circle cx="88" cy="126" r="3" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="96" y="122" fill="#fb7185" fontSize="9">C&apos;</text>

                  {/* C' fan-out to I0, I1, I2 */}
                  <line x1="91" y1="126" x2="120" y2="126" stroke="#fb7185" strokeWidth="2" />
                  <line x1="120" y1="96" x2="120" y2="156" stroke="#fb7185" strokeWidth="2" />
                  <line x1="120" y1="96" x2="170" y2="96" stroke="#fb7185" strokeWidth="2" />
                  <line x1="120" y1="126" x2="170" y2="126" stroke="#fb7185" strokeWidth="2" />
                  <line x1="120" y1="156" x2="170" y2="156" stroke="#fb7185" strokeWidth="2" />
                  <circle cx="120" cy="126" r="3" fill="#fb7185" />

                  {/* I3 = 1 */}
                  <line x1="40" y1="186" x2="170" y2="186" stroke="#10b981" strokeWidth="2" />
                  <circle cx="40" cy="186" r="3" fill="#10b981" />
                  <text x="20" y="190" fill="#34d399" fontWeight="bold">1</text>

                  {/* Select Lines */}
                  <line x1="200" y1="260" x2="200" y2="230" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="250" y1="260" x2="250" y2="230" stroke="#f59e0b" strokeWidth="2" />
                  <text x="200" y="275" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₁ (A)</text>
                  <text x="250" y="275" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₀ (B)</text>

                  {/* Output Line */}
                  <line x1="290" y1="130" x2="380" y2="130" stroke="#a855f7" strokeWidth="2" />
                  <circle cx="380" cy="130" r="3" fill="#a855f7" />
                  <text x="390" y="134" fill="#c084fc" fontWeight="bold" fontSize="13">F</text>
                </svg>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-slate-300">
                <span className="font-bold text-amber-400">Extra Inverter Overhead:</span> Method B requires 1 external NOT gate to generate $C&apos;$, which then fans out to three input pins ($I_0, I_1, I_2$).
              </div>
            </div>
          </div>

          {/* COMBINED TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Table size={16} className="text-cyan-400" />
              Comprehensive 3-Variable Truth Table with Dual Multiplexer Line Activations
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Minterm</th>
                    <th className="py-2.5 px-2 text-center text-indigo-300 font-bold">A</th>
                    <th className="py-2.5 px-2 text-center text-cyan-300 font-bold">B</th>
                    <th className="py-2.5 px-2 text-center text-emerald-300 font-bold">C</th>
                    <th className="py-2.5 px-3 text-center bg-slate-900 font-bold text-amber-300">F (Output)</th>
                    <th className="py-2.5 px-3 text-center text-indigo-400">Method A Active Line (BC)</th>
                    <th className="py-2.5 px-3 text-center text-cyan-400">Method B Active Line (AB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {[
                    { m: "m₀ (000)", a: 0, b: 0, c: 0, f: 1, selA: "I₀ (BC=00) = 1", selB: "I₀ (AB=00) = C' = 1" },
                    { m: "m₁ (001)", a: 0, b: 0, c: 1, f: 0, selA: "I₁ (BC=01) = 0", selB: "I₀ (AB=00) = C' = 0" },
                    { m: "m₂ (010)", a: 0, b: 1, c: 0, f: 1, selA: "I₂ (BC=10) = 1", selB: "I₁ (AB=01) = C' = 1" },
                    { m: "m₃ (011)", a: 0, b: 1, c: 1, f: 0, selA: "I₃ (BC=11) = A = 0", selB: "I₁ (AB=01) = C' = 0" },
                    { m: "m₄ (100)", a: 1, b: 0, c: 0, f: 1, selA: "I₀ (BC=00) = 1", selB: "I₂ (AB=10) = C' = 1" },
                    { m: "m₅ (101)", a: 1, b: 0, c: 1, f: 0, selA: "I₁ (BC=01) = 0", selB: "I₂ (AB=10) = C' = 0" },
                    { m: "m₆ (110)", a: 1, b: 1, c: 0, f: 1, selA: "I₂ (BC=10) = 1", selB: "I₃ (AB=11) = 1 = 1" },
                    { m: "m₇ (111)", a: 1, b: 1, c: 1, f: 1, selA: "I₃ (BC=11) = A = 1", selB: "I₃ (AB=11) = 1 = 1" }
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        "hover:bg-slate-800/50 transition-colors",
                        row.f === 1 ? "bg-indigo-950/20" : "bg-slate-900/20"
                      )}
                    >
                      <td className="py-2 px-3 font-semibold text-slate-300">{row.m}</td>
                      <td className="py-2 px-2 text-center text-indigo-300">{row.a}</td>
                      <td className="py-2 px-2 text-center text-cyan-300">{row.b}</td>
                      <td className="py-2 px-2 text-center text-emerald-300">{row.c}</td>
                      <td className="py-2 px-3 text-center bg-slate-900/60 font-bold">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px]",
                            row.f === 1
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          )}
                        >
                          {row.f}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center text-indigo-300 text-[11px]">{row.selA}</td>
                      <td className="py-2 px-3 text-center text-cyan-300 text-[11px]">{row.selB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: THEORY & CONVENTION COMPARISON */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Leftmost vs Rightmost Variable Conventions</h2>
              <p className="text-xs text-slate-400">De-mystifying textbook differences between CISCE syllabus and general engineering literature</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-3 text-xs">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-indigo-400" />
                Convention 1: Leftmost Variable Singled Out ($A$)
              </span>
              <p className="text-slate-300">
                In Indian and CISCE board textbooks (e.g., Sumita Arora, D.K. Sen, Ghosh), the <strong>leftmost variable</strong> (Most Significant Bit, $A$) is selected as the data literal.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">Select Lines:</strong> Remaining lower variables $B$ and $C$ ($S_1=B, S_0=C$).</li>
                <li><strong className="text-slate-200">Table Rows:</strong> Row 1 is $A&apos;$ (minterms $0, 1, 2, 3$), Row 2 is $A$ (minterms $4, 5, 6, 7$).</li>
                <li><strong className="text-slate-200">Pairing Logic:</strong> Pairs are separated by $2^{"{n-1}"} = 4$ units: $(0, 4), (1, 5), (2, 6), (3, 7)$.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-3 text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-cyan-400" />
                Convention 2: Rightmost Variable Singled Out ($C$)
              </span>
              <p className="text-slate-300">
                In classical US/international engineering textbooks (e.g., Morris Mano, Roth, Tocci), the <strong>rightmost variable</strong> (Least Significant Bit, $C$) is singled out.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">Select Lines:</strong> Higher variables $A$ and $B$ ($S_1=A, S_0=B$).</li>
                <li><strong className="text-slate-200">Table Rows:</strong> Row 1 is $C&apos;$ (even minterms $0, 2, 4, 6$), Row 2 is $C$ (odd minterms $1, 3, 5, 7$).</li>
                <li><strong className="text-slate-200">Pairing Logic:</strong> Adjacent minterm pairs: $(0, 1), (2, 3), (4, 5), (6, 7)$.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-amber-400 text-sm">Gate Optimization &amp; Silicon Efficiency Comparison</h3>
            <p className="text-slate-300">
              Both methods are logically equivalent and generate identical truth table outputs. However, the choice of singled-out variable dramatically affects the <strong>external gate count</strong>:
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-800 mt-2">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="p-2.5">Metric</th>
                    <th className="p-2.5 text-indigo-300">Method A (Leftmost $A$)</th>
                    <th className="p-2.5 text-cyan-300">Method B (Rightmost $C$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2 font-sans font-bold">Select Lines</td>
                    <td className="p-2 text-indigo-300">$S_1=B, S_0=C$</td>
                    <td className="p-2 text-cyan-300">$S_1=A, S_0=B$</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-bold">Data Inputs ($I_0, I_1, I_2, I_3$)</td>
                    <td className="p-2 text-emerald-400 font-bold">$1, 0, 1, A$</td>
                    <td className="p-2 text-amber-400 font-bold">$C&apos;, C&apos;, C&apos;, 1$</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-bold">Inverters Required</td>
                    <td className="p-2 text-emerald-400 font-bold">0 Inverters (Tied to Vcc/Gnd/A)</td>
                    <td className="p-2 text-amber-400 font-bold">1 Inverter (for $C&apos;$)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-bold">Hardware IC Count</td>
                    <td className="p-2 text-emerald-400 font-bold">1 Chip (Only $4 \times 1$ MUX)</td>
                    <td className="p-2 text-amber-400 font-bold">2 Chips ($4 \times 1$ MUX + 7404 NOT Gate)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: METHOD A DETAILS */}
      {activeTab === "methodA" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Method A: Leftmost Singled-Out ($A$) Step-by-Step</h2>
              <p className="text-xs text-slate-400">CISCE Curriculum Standard Implementation Method</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300">Implementation Table for $F(A, B, C) = \Sigma(0, 2, 4, 6, 7)$</h3>
            
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-center font-mono">
                <thead className="bg-indigo-950/60 text-slate-300">
                  <tr>
                    <th className="py-2.5 px-4 text-left">Variable Row</th>
                    <th className="py-2.5 px-4">I₀ (BC = 00)</th>
                    <th className="py-2.5 px-4">I₁ (BC = 01)</th>
                    <th className="py-2.5 px-4">I₂ (BC = 10)</th>
                    <th className="py-2.5 px-4">I₃ (BC = 11)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2.5 px-4 text-left font-bold text-indigo-300 font-sans">Row A&apos; (A = 0)</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">⓿</td>
                    <td className="py-2.5 px-4 text-slate-500">1</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❷</td>
                    <td className="py-2.5 px-4 text-slate-500">3</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-left font-bold text-indigo-300 font-sans">Row A (A = 1)</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❹</td>
                    <td className="py-2.5 px-4 text-slate-500">5</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❻</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❼</td>
                  </tr>
                  <tr className="bg-slate-900 font-bold font-sans text-amber-300 text-[13px]">
                    <td className="py-3 px-4 text-left text-white">MUX Input Assigned</td>
                    <td className="py-3 px-4 text-emerald-400">1 (Rule 2)</td>
                    <td className="py-3 px-4 text-rose-400">0 (Rule 1)</td>
                    <td className="py-3 px-4 text-emerald-400">1 (Rule 2)</td>
                    <td className="py-3 px-4 text-cyan-400">A (Rule 3)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Column $I_0$ &amp; $I_2$: Rule 2 (Both Circled)</span>
                <p className="text-slate-400">Minterms $(0, 4)$ and $(2, 6)$ are both circled in their columns $\implies$ Tied permanently to High ($V_{CC} = 1$).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Column $I_1$: Rule 1 (None Circled)</span>
                <p className="text-slate-400">Neither minterm 1 nor 5 is present in function $F \implies$ Tied permanently to Low ($\text{Ground} = 0$).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 sm:col-span-2">
                <span className="font-bold text-slate-200">Column $I_3$: Rule 3 (Bottom Row Circled)</span>
                <p className="text-slate-400">Only minterm 7 is circled (in Row $A$), while minterm 3 is absent $\implies$ Tied directly to non-inverted literal $A$.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: METHOD B DETAILS */}
      {activeTab === "methodB" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Method B: Rightmost Singled-Out ($C$) Step-by-Step</h2>
              <p className="text-xs text-slate-400">Classical Digital Engineering Literature Implementation Method</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-4">
            <h3 className="text-sm font-bold text-cyan-300">Implementation Table for $F(A, B, C) = \Sigma(0, 2, 4, 6, 7)$</h3>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-center font-mono">
                <thead className="bg-cyan-950/60 text-slate-300">
                  <tr>
                    <th className="py-2.5 px-4 text-left">Variable Row</th>
                    <th className="py-2.5 px-4">I₀ (AB = 00)</th>
                    <th className="py-2.5 px-4">I₁ (AB = 01)</th>
                    <th className="py-2.5 px-4">I₂ (AB = 10)</th>
                    <th className="py-2.5 px-4">I₃ (AB = 11)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2.5 px-4 text-left font-bold text-cyan-300 font-sans">Row C&apos; (C = 0)</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">⓿</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❷</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❹</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❻</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-left font-bold text-cyan-300 font-sans">Row C (C = 1)</td>
                    <td className="py-2.5 px-4 text-slate-500">1</td>
                    <td className="py-2.5 px-4 text-slate-500">3</td>
                    <td className="py-2.5 px-4 text-slate-500">5</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400 bg-emerald-950/30">❼</td>
                  </tr>
                  <tr className="bg-slate-900 font-bold font-sans text-amber-300 text-[13px]">
                    <td className="py-3 px-4 text-left text-white">MUX Input Assigned</td>
                    <td className="py-3 px-4 text-amber-400">C&apos; (Rule 4)</td>
                    <td className="py-3 px-4 text-amber-400">C&apos; (Rule 4)</td>
                    <td className="py-3 px-4 text-amber-400">C&apos; (Rule 4)</td>
                    <td className="py-3 px-4 text-emerald-400">1 (Rule 2)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Columns $I_0, I_1, I_2$: Rule 4 (Top Row Circled)</span>
                <p className="text-slate-400">Minterms 0, 2, and 4 are circled in Row $C&apos;$, while 1, 3, 5 are absent $\implies$ All three inputs require inverted literal $C&apos;$.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Column $I_3$: Rule 2 (Both Circled)</span>
                <p className="text-slate-400">Both minterms 6 and 7 are circled $\implies$ Tied permanently to High ($V_{CC} = 1$).</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Dual-Method Interactive MUX Prober</h2>
              <p className="text-xs text-slate-400">Toggle inputs and switch live between Method A and Method B to verify functional equivalence</p>
            </div>
          </div>

          {/* METHOD SELECTOR */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Active Realization Method</span>
              <span className="text-sm font-bold text-white">
                {activeMethod === "leftmost" ? "Method A: Leftmost Singled-Out (A)" : "Method B: Rightmost Singled-Out (C)"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMethod("leftmost")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  activeMethod === "leftmost"
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                Method A (A Singled-Out)
              </button>
              <button
                onClick={() => setActiveMethod("rightmost")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  activeMethod === "rightmost"
                    ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                Method B (C Singled-Out)
              </button>
            </div>
          </div>

          {/* INPUT SWITCHES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "A", val: inA, set: setInA, color: "indigo" },
              { id: "B", val: inB, set: setInB, color: "cyan" },
              { id: "C", val: inC, set: setInC, color: "emerald" }
            ].map((pin) => (
              <div
                key={pin.id}
                onClick={() => pin.set(!pin.val)}
                className={clsx(
                  "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                  pin.val
                    ? `bg-${pin.color}-950/40 border-${pin.color}-500/50 shadow-lg shadow-${pin.color}-500/10`
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                )}
              >
                <div>
                  <span className="text-xs text-slate-400 font-mono">Input Literal</span>
                  <div className="text-lg font-bold text-white">Variable {pin.id}</div>
                </div>
                <div
                  className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                    pin.val
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400"
                  )}
                >
                  {pin.val ? "1" : "0"}
                </div>
              </div>
            ))}
          </div>

          {/* SIMULATOR DIAGRAM & OUTPUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DETAILS */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">
                Internal Multiplexer State Analysis:{" "}
                <span className="text-indigo-400">
                  {activeMethod === "leftmost" ? "Method A" : "Method B"}
                </span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {(activeMethod === "leftmost" ? inputLinesMethodA : inputLinesMethodB).map((val, idx) => {
                  const isSelected = (activeMethod === "leftmost" ? selIndexA : selIndexB) === idx;
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        "p-3 rounded-lg border text-center transition-all",
                        isSelected
                          ? "bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/20"
                          : "bg-slate-900/60 border-slate-800 opacity-60"
                      )}
                    >
                      <div className="text-[11px] text-slate-400">Input I{idx}</div>
                      <div className="text-base font-bold text-white my-1">{val}</div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        {isSelected ? "★ ROUTED TO F" : "Idle"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>
                  <strong className="text-white">Active Selection Code: </strong>
                  {activeMethod === "leftmost" ? (
                    <span className="text-indigo-300 font-mono">
                      S₁=B ({inB ? 1 : 0}), S₀=C ({inC ? 1 : 0}) $\implies$ Index {selIndexA} selected
                    </span>
                  ) : (
                    <span className="text-cyan-300 font-mono">
                      S₁=A ({inA ? 1 : 0}), S₀=B ({inB ? 1 : 0}) $\implies$ Index {selIndexB} selected
                    </span>
                  )}
                </div>
                <div>
                  <strong className="text-white">Active Input Equation: </strong>
                  {activeMethod === "leftmost" ? (
                    <span className="text-slate-300">
                      {selIndexA === 0 && "I₀ = 1"}
                      {selIndexA === 1 && "I₁ = 0"}
                      {selIndexA === 2 && "I₂ = 1"}
                      {selIndexA === 3 && `I₃ = A = ${inA ? 1 : 0}`}
                    </span>
                  ) : (
                    <span className="text-slate-300">
                      {selIndexB === 0 && `I₀ = C' = ${inC ? 0 : 1}`}
                      {selIndexB === 1 && `I₁ = C' = ${inC ? 0 : 1}`}
                      {selIndexB === 2 && `I₂ = C' = ${inC ? 0 : 1}`}
                      {selIndexB === 3 && "I₃ = 1"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* LIVE OUTPUT DISPLAY */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Realized Function Output</span>
                <div className="text-sm font-bold text-slate-300 mt-1">F(A, B, C)</div>
              </div>

              <div
                className={clsx(
                  "w-24 h-24 rounded-2xl flex items-center justify-center font-extrabold text-4xl border transition-all",
                  outputF
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-xl shadow-emerald-500/20"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-xl shadow-rose-500/20"
                )}
              >
                {outputF ? "1" : "0"}
              </div>

              <div className="text-xs text-slate-400">
                Current Minterm:{" "}
                <span className="font-mono font-bold text-white">
                  m{(inA ? 4 : 0) + (inB ? 2 : 0) + (inC ? 1 : 0)}
                </span>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  {outputF ? "✓ Member of Σ(0, 2, 4, 6, 7)" : "✗ Absent from Σ(0, 2, 4, 6, 7)"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: ISC BOARD EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">06</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus &amp; Marking Rubric</h2>
              <p className="text-xs text-slate-400">Essential pointers for CISCE theory examinations and practical paper evaluations</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">State Chosen Select Lines:</strong> Always begin your answer by explicitly defining which variables drive $S_1$ and $S_0$. Example: <em>&ldquo;Singling out variable $A$, we connect $S_1 = B$ and $S_0 = C$.&rdquo;</em></li>
                <li><strong className="text-white">Draw the Implementation Table:</strong> Never write the input assignments directly without drawing the 2-row implementation table and circling the active minterms. Evaluators allot specific step marks for the table!</li>
                <li><strong className="text-white">Highlight Logic Simplification:</strong> If singling out $A$ yields 0 inverters while singling out $C$ needs 1 inverter, mention this design advantage in your concluding sentence.</li>
                <li><strong className="text-white">Label Vcc and Ground Clearly:</strong> Clearly indicate logic 1 as $V_{CC}$ and logic 0 as Ground ($GND$) on your MUX pin connections.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 7: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
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
        topicId="topic-39-mux-strategy"
        headline="Sukanta Hui's Guidance on MUX Variable Selection Strategies"
        note="Students often panic when different reference books single out different variables! Morris Mano singles out the rightmost variable C, while CISCE textbooks like Sumita Arora single out the leftmost variable A. In this lesson, we proved that for F(A, B, C) = Σ(0, 2, 4, 6, 7), Method A (A singled out) needs ZERO inverters ({1, 0, 1, A}), while Method B (C singled out) needs an inverter for C' ({C', C', C', 1}). Knowing both gives you 100% mastery in your ISC practicals and theory viva!"
      />
    </div>
  );
};

export default Topic39;
