import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const a = inputA ? 1 : 0;
  const b = inputB ? 1 : 0;

  const diff = a ^ b;
  const borrow = (!a && b) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 5
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Half Subtractor: Truth Table, Derivations &amp; Logic Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Binary 2-Bit Subtraction: Difference (A ⊕ B) and Borrow (A' · B) Derivations
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Circuit Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Half Subtractor Principles</h2>
              <p className="text-xs text-slate-400">Single-bit binary subtraction without borrow-in capability</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Half Subtractor</strong> is a combinational arithmetic circuit that subtracts one single-bit binary input <strong className="text-indigo-300">B</strong> (Subtrahend) from another <strong className="text-indigo-300">A</strong> (Minuend).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              It produces two outputs: a <strong className="text-purple-300">Difference (D)</strong> bit and a <strong className="text-rose-300">Borrow (Bout)</strong> bit. Notice that when $0 - 1$ is performed, a borrow of 1 is required from the higher significant bit, making the operation $2 - 1 = 1$, giving Difference = 1 and Borrow = 1.
            </p>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations &amp; Expressions</h2>
              <p className="text-xs text-slate-400">Formal algebraic formulations for Difference and Borrow</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase font-mono">Difference (D) Equation</div>
              <p className="text-xs text-slate-400">Identical to Half Adder Sum output:</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-purple-300 font-bold">
                {"Difference = A'B + AB' = A ⊕ B"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase font-mono">Borrow (Bout) Equation</div>
              <p className="text-xs text-slate-400">Requires inversion of A:</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-rose-300 font-bold">
                {"Borrow = A' · B"}
              </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Gate-Level Circuit Diagrams</h2>
              <p className="text-xs text-slate-400">Excitation table and vector schematics for Half Subtractor</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Half Subtractor Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-3 text-cyan-400 border-r border-slate-800">Minuend (A)</th>
                    <th className="p-3 text-cyan-400 border-r border-slate-800">Subtrahend (B)</th>
                    <th className="p-3 text-purple-400 border-r border-slate-800">Difference (A ⊕ B)</th>
                    <th className="p-3 text-rose-400 border-r border-slate-800">Borrow (A' · B)</th>
                    <th className="p-3 text-slate-400 text-left pl-4 font-sans">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">0 - 0 = 0 (No borrow)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">1</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-rose-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-rose-300 text-left pl-4 font-sans font-bold">0 - 1 = 1 with Borrow 1</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">1 - 0 = 1 (No borrow)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">1 - 1 = 0 (No borrow)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; Gate-Level Logic Schematic
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM */}
                <g transform="translate(30, 30)">
                  <rect x="0" y="0" width="220" height="180" rx="12" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                  <text x="110" y="30" fill="#fda4af" fontWeight="bold" fontSize="13" textAnchor="middle">HALF SUBTRACTOR</text>

                  <line x1="-30" y1="65" x2="0" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="69" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">A</text>

                  <line x1="-30" y1="115" x2="0" y2="115" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="119" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">B</text>

                  <line x1="220" y1="65" x2="260" y2="65" stroke="#c084fc" strokeWidth="2.5" />
                  <polygon points="260,61 272,65 260,69" fill="#c084fc" />
                  <text x="280" y="69" fill="#c084fc" fontWeight="bold" fontSize="13">Diff (D)</text>

                  <line x1="220" y1="115" x2="260" y2="115" stroke="#f43f5e" strokeWidth="2.5" />
                  <polygon points="260,111 272,115 260,119" fill="#f43f5e" />
                  <text x="280" y="119" fill="#f43f5e" fontWeight="bold" fontSize="13">Borrow</text>
                </g>

                {/* GATE LEVEL SCHEMATIC */}
                <g transform="translate(360, 20)">
                  <line x1="50" y1="40" x2="50" y2="200" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="50" cy="40" r="4.5" fill="#06b6d4" />
                  <text x="50" y="28" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="middle">A</text>

                  <line x1="110" y1="40" x2="110" y2="200" stroke="#818cf8" strokeWidth="2.5" />
                  <circle cx="110" cy="40" r="4.5" fill="#818cf8" />
                  <text x="110" y="28" fill="#818cf8" fontWeight="bold" fontSize="13" textAnchor="middle">B</text>

                  {/* XOR for Difference */}
                  <circle cx="50" cy="70" r="4.5" fill="#06b6d4" />
                  <line x1="50" y1="70" x2="200" y2="70" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="110" cy="95" r="4.5" fill="#818cf8" />
                  <line x1="110" y1="95" x2="200" y2="95" stroke="#818cf8" strokeWidth="2" />

                  <g transform="translate(200, 55)">
                    <path d="M -8,10 Q 17,25 -8,55" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
                    <text x="18" y="36" fill="#f5d0fe" fontSize="10" fontWeight="bold">XOR</text>
                    <line x1="55" y1="32.5" x2="120" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                    <polygon points="120,28.5 132,32.5 120,36.5" fill="#a855f7" />
                    <text x="145" y="37" fill="#c084fc" fontWeight="bold" fontSize="14">D = A ⊕ B</text>
                  </g>

                  {/* NOT Gate on A */}
                  <circle cx="50" cy="155" r="4.5" fill="#06b6d4" />
                  <line x1="50" y1="155" x2="130" y2="155" stroke="#06b6d4" strokeWidth="2" />
                  
                  <g transform="translate(130, 140)">
                    <polygon points="0,7.5 25,17.5 0,27.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <circle cx="28" cy="17.5" r="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="31" y1="17.5" x2="70" y2="17.5" stroke="#f43f5e" strokeWidth="2" />
                  </g>

                  {/* AND for Borrow */}
                  <circle cx="110" cy="185" r="4.5" fill="#818cf8" />
                  <line x1="110" y1="185" x2="200" y2="185" stroke="#818cf8" strokeWidth="2" />

                  <g transform="translate(200, 145)">
                    <path d="M 0,10 L 25,10 A 22.5,22.5 0 0,1 25,55 L 0,55 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="14" y="36" fill="#fda4af" fontSize="10" fontWeight="bold">AND</text>
                    <line x1="47.5" y1="32.5" x2="120" y2="32.5" stroke="#f43f5e" strokeWidth="2.5" />
                    <polygon points="120,28.5 132,32.5 120,36.5" fill="#f43f5e" />
                    <text x="145" y="37" fill="#fb7185" fontWeight="bold" fontSize="14">{"Borrow = A'B"}</text>
                  </g>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Half Subtractor Simulator</h2>
              <p className="text-xs text-slate-400">Toggle Minuend A and Subtrahend B to inspect subtraction behavior</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setInputA(!inputA)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputA ? "bg-cyan-500 text-slate-950 border-cyan-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Minuend A: {inputA ? "1" : "0"}
              </button>
              <button
                onClick={() => setInputB(!inputB)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputB ? "bg-purple-500 text-white border-purple-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Subtrahend B: {inputB ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-purple-400 uppercase font-bold">Difference (A ⊕ B)</div>
                <div className={clsx("text-4xl font-extrabold font-mono", diff === 1 ? "text-purple-400" : "text-slate-600")}>
                  Diff = {diff}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-rose-400 uppercase font-bold">{"Borrow (A' · B)"}</div>
                <div className={clsx("text-4xl font-extrabold font-mono", borrow === 1 ? "text-rose-400" : "text-slate-600")}>
                  Borrow = {borrow}
                </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Half Subtractor</h2>
              <p className="text-xs text-slate-400">Scoring rules and frequent student slip-ups</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Common Inversion Error</div>
            <p className="text-slate-300 leading-relaxed">
              Always check which input is complemented in the Borrow expression! It is ALWAYS the minuend A that is complemented: Borrow = A'B. Complementing B instead (AB') computes B - A, which is completely wrong and loses full marks.
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="Notice how Difference has the exact same XOR equation as Half Adder Sum (A ⊕ B). The only structural difference between a Half Adder and a Half Subtractor is the NOT gate placed on input A before entering the AND gate!" />
      </section>
    </div>
  );
};

export default Topic5;
