import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic6 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputBin, setInputBin] = useState(false);

  const a = inputA ? 1 : 0;
  const b = inputB ? 1 : 0;
  const bin = inputBin ? 1 : 0;

  const diff = a ^ b ^ bin;
  const bout = (!a && b) || (!a && bin) || (b && bin) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 6
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Full Subtractor: Truth Table, Derivations &amp; Logic Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Binary 3-Bit Subtraction with Borrow-in: Diff (A ⊕ B ⊕ Bin) and Borrow-out (A'B + A'Bin + BBin)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & K-Map" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Subtractor Architecture</h2>
              <p className="text-xs text-slate-400">Complete 3-bit subtraction handling borrow-in from previous bit position</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Full Subtractor</strong> computes the subtraction of two bits <strong className="text-indigo-300">A - B</strong> while accounting for an incoming borrow bit <strong className="text-rose-300">Bin</strong> borrowed by a lower-order stage: evaluates $A - B - Bin$.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations &amp; K-Map Minimization</h2>
              <p className="text-xs text-slate-400">Minterm equations for Difference and Borrow-out</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase font-mono">Difference (D) Equation</div>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-purple-300 font-bold">
                Diff = A ⊕ B ⊕ Bin
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase font-mono">Borrow-out (Bout) Equation</div>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-rose-300 font-bold">
                {"Bout = A'B + A'Bin + BBin"}
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
              <p className="text-xs text-slate-400">8-row function matrix and schematic diagrams for Full Subtractor</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Full Subtractor Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">Bin</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Diff (D)</th>
                    <th className="p-2.5 text-rose-400 border-r border-slate-800">Bout</th>
                    <th className="p-2.5 text-slate-400 text-left pl-4 font-sans">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, 0, "0 - 0 - 0 = 0"],
                    [0, 0, 1, 1, 1, "0 - 0 - 1 = 1 (Borrow 1)"],
                    [0, 1, 0, 1, 1, "0 - 1 - 0 = 1 (Borrow 1)"],
                    [0, 1, 1, 0, 1, "0 - 1 - 1 = 0 (Borrow 1)"],
                    [1, 0, 0, 1, 0, "1 - 0 - 0 = 1 (No borrow)"],
                    [1, 0, 1, 0, 0, "1 - 0 - 1 = 0 (No borrow)"],
                    [1, 1, 0, 0, 0, "1 - 1 - 0 = 0 (No borrow)"],
                    [1, 1, 1, 1, 1, "1 - 1 - 1 = 1 (Borrow 1)"]
                  ].map(([ra, rb, rbin, rd, rbout, note], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800">{ra}</td>
                      <td className="p-2.5 border-r border-slate-800">{rb}</td>
                      <td className="p-2.5 border-r border-slate-800">{rbin}</td>
                      <td className="p-2.5 border-r border-slate-800 font-bold text-purple-400">{rd}</td>
                      <td className="p-2.5 border-r border-slate-800 font-bold text-rose-400">{rbout}</td>
                      <td className="p-2.5 text-slate-400 text-left pl-4 font-sans">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; Logic Circuit Schematic
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM */}
                <g transform="translate(40, 30)">
                  <rect x="0" y="0" width="220" height="190" rx="12" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                  <text x="110" y="32" fill="#fda4af" fontWeight="bold" fontSize="13" textAnchor="middle">FULL SUBTRACTOR</text>

                  <line x1="-30" y1="60" x2="0" y2="60" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="64" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">A</text>

                  <line x1="-30" y1="110" x2="0" y2="110" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="114" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">B</text>

                  <line x1="-30" y1="160" x2="0" y2="160" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="164" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">Bin</text>

                  <line x1="220" y1="75" x2="260" y2="75" stroke="#c084fc" strokeWidth="2.5" />
                  <polygon points="260,71 272,75 260,79" fill="#c084fc" />
                  <text x="280" y="79" fill="#c084fc" fontWeight="bold" fontSize="13">Diff</text>

                  <line x1="220" y1="140" x2="260" y2="140" stroke="#f43f5e" strokeWidth="2.5" />
                  <polygon points="260,136 272,140 260,144" fill="#f43f5e" />
                  <text x="280" y="144" fill="#f43f5e" fontWeight="bold" fontSize="13">Bout</text>
                </g>

                {/* GATE LEVEL SCHEMATIC */}
                <g transform="translate(380, 20)">
                  <line x1="30" y1="30" x2="30" y2="230" stroke="#06b6d4" strokeWidth="2" />
                  <text x="30" y="20" fill="#06b6d4" fontWeight="bold" fontSize="12" textAnchor="middle">A</text>

                  <line x1="70" y1="30" x2="70" y2="230" stroke="#818cf8" strokeWidth="2" />
                  <text x="70" y="20" fill="#818cf8" fontWeight="bold" fontSize="12" textAnchor="middle">B</text>

                  <line x1="110" y1="30" x2="110" y2="230" stroke="#38bdf8" strokeWidth="2" />
                  <text x="110" y="20" fill="#38bdf8" fontWeight="bold" fontSize="12" textAnchor="middle">Bin</text>

                  {/* 3-XOR for Diff */}
                  <g transform="translate(170, 35)">
                    <path d="M -8,10 Q 17,25 -8,55" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
                    <text x="18" y="36" fill="#f5d0fe" fontSize="9" fontWeight="bold">3-XOR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                    <polygon points="130,28.5 142,32.5 130,36.5" fill="#a855f7" />
                    <text x="150" y="37" fill="#c084fc" fontWeight="bold" fontSize="13">Diff = A⊕B⊕Bin</text>
                  </g>

                  {/* Borrow Network: Inverter on A + AND-OR */}
                  <g transform="translate(170, 115)">
                    <rect x="0" y="0" width="40" height="26" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="20" y="17" fill="#f43f5e" fontSize="9" textAnchor="middle">{"A'B"}</text>

                    <rect x="0" y="33" width="40" height="26" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="20" y="50" fill="#f43f5e" fontSize="9" textAnchor="middle">{"A'Bin"}</text>

                    <rect x="0" y="66" width="40" height="26" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="20" y="83" fill="#f43f5e" fontSize="9" textAnchor="middle">BBin</text>

                    <path d="M 70,25 Q 90,45 70,85 Q 105,85 125,55 Q 105,25 70,25 Z" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
                    <line x1="40" y1="13" x2="75" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="40" y1="46" x2="80" y2="55" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="40" y1="79" x2="75" y2="75" stroke="#f43f5e" strokeWidth="1.5" />

                    <line x1="125" y1="55" x2="160" y2="55" stroke="#f43f5e" strokeWidth="2.5" />
                    <polygon points="160,51 172,55 160,59" fill="#f43f5e" />
                    <text x="180" y="60" fill="#fb7185" fontWeight="bold" fontSize="13">Bout</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Full Subtractor Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs to observe 3-bit binary subtraction</p>
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
              <button
                onClick={() => setInputBin(!inputBin)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputBin ? "bg-rose-500 text-white border-rose-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Borrow-in: {inputBin ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-purple-400 uppercase font-bold">Difference (A ⊕ B ⊕ Bin)</div>
                <div className={clsx("text-4xl font-extrabold font-mono", diff === 1 ? "text-purple-400" : "text-slate-600")}>
                  Diff = {diff}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-rose-400 uppercase font-bold">Borrow-out (Bout)</div>
                <div className={clsx("text-4xl font-extrabold font-mono", bout === 1 ? "text-rose-400" : "text-slate-600")}>
                  Bout = {bout}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Full Subtractor</h2>
              <p className="text-xs text-slate-400">Scoring tips for Full Subtractor K-map and circuits</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">K-Map Minimization for Bout</div>
            <p className="text-slate-300 leading-relaxed">
              When drawing the K-map for Bout, the minterms are 1, 2, 3, 7. The resulting 2-cell groupings produce three product terms: A'B, A'Bin, and BBin. Always state that Bout can be generated with three AND gates and one OR gate!
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="Comparing Full Adder and Full Subtractor side-by-side reveals that their Difference/Sum equations are IDENTICAL (3-input XOR). The only distinction lies in the carry/borrow: Carry-out has all positive terms (AB + BCin + ACin), while Borrow-out inverts A in its terms (A'B + A'Bin + BBin)." />
      </section>
    </div>
  );
};

export default Topic6;
