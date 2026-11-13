import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic1 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [selectedGate, setSelectedGate] = useState("AND");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const evaluateGate = (gate, a, b) => {
    switch (gate) {
      case "AND": return a && b ? 1 : 0;
      case "OR": return a || b ? 1 : 0;
      case "NOT": return !a ? 1 : 0;
      case "NAND": return !(a && b) ? 1 : 0;
      case "NOR": return !(a || b) ? 1 : 0;
      case "XOR": return ((a ? 1 : 0) ^ (b ? 1 : 0));
      case "XNOR": return !((a ? 1 : 0) ^ (b ? 1 : 0)) ? 1 : 0;
      default: return 0;
    }
  };

  const gateOutput = evaluateGate(selectedGate, inputA, inputB);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 1
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Elementary &amp; Universal Logic Gates Revision
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Symbols, Truth Tables, and Universal Logic Synthesis (AND, OR, NOT, NAND, NOR, XOR, XNOR)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Identities & Universality" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Gate Playground" },
              { id: "examTips", label: "5. ISC Board Exam Focus" }
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
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Logic Gate Taxonomies</h2>
              <p className="text-xs text-slate-400">Basic, Universal, and Exclusive Digital Building Blocks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 text-sm">Elementary Gates</div>
              <p className="text-slate-400 leading-relaxed">
                <strong>AND, OR, and NOT</strong> form the fundamental functional complete set. All Boolean algebra expressions can theoretically be mapped directly onto these three operations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-400 text-sm">Universal Gates</div>
              <p className="text-slate-400 leading-relaxed">
                <strong>NAND and NOR</strong> can independently synthesize ANY arbitrary logic gate or circuit without needing any other gate type, significantly reducing integrated circuit (IC) fabrication costs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400 text-sm">Arithmetic (Exclusive) Gates</div>
              <p className="text-slate-400 leading-relaxed">
                <strong>XOR and XNOR</strong> compute odd and even parity. XOR acts as the modulo-2 addition core inside binary Half Adders and Full Adders.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations &amp; Universal Realization</h2>
              <p className="text-xs text-slate-400">Algebraic definitions and universality proofs for CISCE examinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">AND Gate</span>
              Y = A · B
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">OR Gate</span>
              Y = A + B
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">NOT Gate</span>
              {"Y = A' (Inversion)"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">NAND Gate</span>
              {"Y = (A · B)' = A' + B'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">NOR Gate</span>
              {"Y = (A + B)' = A' · B'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">XOR Gate</span>
              {"Y = A ⊕ B = A'B + AB'"}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT DIAGRAMS */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table Matrix &amp; ANSI Gate Schematics</h2>
              <p className="text-xs text-slate-400">Complete excitation tables and standard vector logic gate symbols</p>
            </div>
          </div>

          {/* MASTER TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Master Truth Table of All 7 Logic Gates
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800 font-mono">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 border-r border-slate-800">AND (A·B)</th>
                    <th className="p-2.5 border-r border-slate-800">OR (A+B)</th>
                    <th className="p-2.5 border-r border-slate-800">NAND ((AB)')</th>
                    <th className="p-2.5 border-r border-slate-800">NOR ((A+B)')</th>
                    <th className="p-2.5 border-r border-slate-800 text-purple-300">XOR (A⊕B)</th>
                    <th className="p-2.5 text-purple-300">XNOR (⊙)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 font-mono">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR CIRCUIT SYMBOLS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. ANSI / IEEE Vector Logic Gate Symbols
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 220" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* AND GATE */}
                <g transform="translate(40, 30)">
                  <line x1="0" y1="20" x2="30" y2="20" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="0" y1="45" x2="30" y2="45" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 30,10 L 55,10 A 22.5,22.5 0 0,1 55,55 L 30,55 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="77.5" y1="32.5" x2="110" y2="32.5" stroke="#06b6d4" strokeWidth="2" />
                  <text x="55" y="75" fill="#38bdf8" textAnchor="middle" fontWeight="bold">AND</text>
                </g>

                {/* OR GATE */}
                <g transform="translate(190, 30)">
                  <line x1="0" y1="20" x2="30" y2="20" stroke="#818cf8" strokeWidth="2" />
                  <line x1="0" y1="45" x2="30" y2="45" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 30,10 Q 55,25 30,55 Q 65,55 85,32.5 Q 65,10 30,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <line x1="85" y1="32.5" x2="115" y2="32.5" stroke="#818cf8" strokeWidth="2" />
                  <text x="57" y="75" fill="#a5b4fc" textAnchor="middle" fontWeight="bold">OR</text>
                </g>

                {/* NOT GATE */}
                <g transform="translate(340, 30)">
                  <line x1="0" y1="32.5" x2="30" y2="32.5" stroke="#f59e0b" strokeWidth="2" />
                  <polygon points="30,15 65,32.5 30,50" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="69" cy="32.5" r="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="73" y1="32.5" x2="105" y2="32.5" stroke="#f59e0b" strokeWidth="2" />
                  <text x="50" y="75" fill="#fbbf24" textAnchor="middle" fontWeight="bold">NOT</text>
                </g>

                {/* NAND GATE */}
                <g transform="translate(480, 30)">
                  <line x1="0" y1="20" x2="30" y2="20" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="0" y1="45" x2="30" y2="45" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 30,10 L 55,10 A 22.5,22.5 0 0,1 55,55 L 30,55 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="81.5" cy="32.5" r="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="85.5" y1="32.5" x2="115" y2="32.5" stroke="#06b6d4" strokeWidth="2" />
                  <text x="55" y="75" fill="#38bdf8" textAnchor="middle" fontWeight="bold">NAND</text>
                </g>

                {/* NOR GATE */}
                <g transform="translate(620, 30)">
                  <line x1="0" y1="20" x2="30" y2="20" stroke="#818cf8" strokeWidth="2" />
                  <line x1="0" y1="45" x2="30" y2="45" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 30,10 Q 55,25 30,55 Q 65,55 85,32.5 Q 65,10 30,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <circle cx="89" cy="32.5" r="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <line x1="93" y1="32.5" x2="120" y2="32.5" stroke="#818cf8" strokeWidth="2" />
                  <text x="57" y="75" fill="#a5b4fc" textAnchor="middle" fontWeight="bold">NOR</text>
                </g>

                {/* XOR GATE (BOTTOM) */}
                <g transform="translate(190, 120)">
                  <line x1="0" y1="20" x2="22" y2="20" stroke="#a855f7" strokeWidth="2" />
                  <line x1="0" y1="45" x2="22" y2="45" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 22,10 Q 47,25 22,55" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 30,10 Q 55,25 30,55 Q 65,55 85,32.5 Q 65,10 30,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
                  <line x1="85" y1="32.5" x2="115" y2="32.5" stroke="#a855f7" strokeWidth="2" />
                  <text x="57" y="75" fill="#c084fc" textAnchor="middle" fontWeight="bold">XOR</text>
                </g>

                {/* XNOR GATE (BOTTOM) */}
                <g transform="translate(480, 120)">
                  <line x1="0" y1="20" x2="22" y2="20" stroke="#a855f7" strokeWidth="2" />
                  <line x1="0" y1="45" x2="22" y2="45" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 22,10 Q 47,25 22,55" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 30,10 Q 55,25 30,55 Q 65,55 85,32.5 Q 65,10 30,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
                  <circle cx="89" cy="32.5" r="4" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
                  <line x1="93" y1="32.5" x2="120" y2="32.5" stroke="#a855f7" strokeWidth="2" />
                  <text x="57" y="75" fill="#c084fc" textAnchor="middle" fontWeight="bold">XNOR</text>
                </g>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Gate Testing Playground</h2>
              <p className="text-xs text-slate-400">Select any gate and toggle inputs to observe instantaneous boolean evaluation</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* Gate Selector */}
            <div className="flex flex-wrap gap-2">
              {["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGate(g)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all",
                    selectedGate === g
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {g} Gate
                </button>
              ))}
            </div>

            {/* Signal Toggles */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setInputA(!inputA)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputA ? "bg-cyan-500 text-slate-950 border-cyan-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input A: {inputA ? "1 (HIGH)" : "0 (LOW)"}
              </button>

              {selectedGate !== "NOT" && (
                <button
                  onClick={() => setInputB(!inputB)}
                  className={clsx(
                    "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                    inputB ? "bg-purple-500 text-white border-purple-300" : "bg-slate-900 text-slate-400 border-slate-700"
                  )}
                >
                  Input B: {inputB ? "1 (HIGH)" : "0 (LOW)"}
                </button>
              )}
            </div>

            {/* Live Gate Output Display */}
            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Computed Gate Output</div>
              <div className={clsx("text-4xl font-extrabold font-mono py-2", gateOutput === 1 ? "text-emerald-400" : "text-slate-600")}>
                Output Y = {gateOutput}
              </div>
              <div className="text-xs font-mono text-cyan-300">
                Gate: {selectedGate} | Inputs: A={inputA ? "1" : "0"}{selectedGate !== "NOT" ? `, B=${inputB ? "1" : "0"}` : ""}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM TIPS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Universality</h2>
              <p className="text-xs text-slate-400">Scoring tips for NAND and NOR universality proofs</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Universal Gate Proofs</div>
            <p className="text-slate-300 leading-relaxed">
              In ISC Class 12 Section A, a 2-mark question regularly asks to prove that NAND or NOR is a universal gate. Show how to make NOT (short both inputs), AND (NAND followed by NAND-inverter), and OR (invert inputs first with NAND, then NAND together using De Morgan's Law: (A' · B')' = A + B).
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="Always double check your gate curvatures! CISCE examiners penalize straight-backed OR gates that look like AND gates. An OR gate has a curved back; an AND gate has a flat vertical back. Pay special attention to XOR which requires the second curved line at the input." />
      </section>
    </div>
  );
};

export default Topic1;
