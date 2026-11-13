import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic9 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [activeInput, setActiveInput] = useState(3); // 0, 1, 2, 3

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
              ISC Class 12 • Topic 9
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            4-to-2 Line Binary Encoder: Circuit &amp; Equations
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Detailed Gate-Level Implementation using OR Gates: Truth Table, Equations Y1 = I2 + I3 and Y0 = I1 + I3
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
              <h2 className="text-lg sm:text-xl font-bold text-white">4-to-2 Binary Encoder Principles</h2>
              <p className="text-xs text-slate-400">Detailed operation of 4-input 2-output binary line encoder</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">4-to-2 Binary Encoder</strong> compresses four active-HIGH input lines ($I_0, I_1, I_2, I_3$) into two binary output lines ($Y_1, Y_0$). It is designed assuming only ONE input is active at any time.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because the binary code for decimal 0 is $00$, line $I_0$ does not connect to any gate. When $I_0 = 1$ and all others are 0, both OR gates output 0 naturally.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Output Boolean Expressions</h2>
              <p className="text-xs text-slate-400">Derivation of OR gate equations from truth table inspection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase font-mono">Y1 (MSB) Output</div>
              <p className="text-xs text-slate-400">Y1 is 1 when I2=1 (code 10) OR when I3=1 (code 11):</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-cyan-300 font-bold">
                Y1 = I2 + I3
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase font-mono">Y0 (LSB) Output</div>
              <p className="text-xs text-slate-400">Y0 is 1 when I1=1 (code 01) OR when I3=1 (code 11):</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-purple-300 font-bold">
                Y0 = I1 + I3
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Gate-Level Logic Schematics</h2>
              <p className="text-xs text-slate-400">Complete 4-input truth table and OR gate layout</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 4-to-2 Binary Encoder Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-3 text-cyan-400 border-r border-slate-800">I3</th>
                    <th className="p-3 text-cyan-400 border-r border-slate-800">I2</th>
                    <th className="p-3 text-cyan-400 border-r border-slate-800">I1</th>
                    <th className="p-3 text-cyan-400 border-r border-slate-800">I0</th>
                    <th className="p-3 text-purple-400 border-r border-slate-800">Y1 (MSB)</th>
                    <th className="p-3 text-purple-400 border-r border-slate-800">Y0 (LSB)</th>
                    <th className="p-3 text-slate-400 text-left pl-4 font-sans">Active Decimal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-emerald-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">I0 active (Decimal 0)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-emerald-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">I1 active (Decimal 1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-emerald-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">I2 active (Decimal 2)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 text-emerald-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 border-r border-slate-800">0</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-purple-400 font-bold border-r border-slate-800">1</td>
                    <td className="p-3 text-slate-400 text-left pl-4 font-sans">I3 active (Decimal 3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Logic Circuit Diagram with OR Gates
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 320" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Vertical Bus lines */}
                <line x1="120" y1="40" x2="120" y2="280" stroke="#64748b" strokeWidth="2.5" />
                <circle cx="120" cy="40" r="4.5" fill="#64748b" />
                <text x="120" y="28" fill="#94a3b8" fontWeight="bold" fontSize="13" textAnchor="middle">I0</text>

                <line x1="200" y1="40" x2="200" y2="280" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="200" cy="40" r="4.5" fill="#38bdf8" />
                <text x="200" y="28" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="middle">I1</text>

                <line x1="280" y1="40" x2="280" y2="280" stroke="#818cf8" strokeWidth="2.5" />
                <circle cx="280" cy="40" r="4.5" fill="#818cf8" />
                <text x="280" y="28" fill="#818cf8" fontWeight="bold" fontSize="13" textAnchor="middle">I2</text>

                <line x1="360" y1="40" x2="360" y2="280" stroke="#c084fc" strokeWidth="2.5" />
                <circle cx="360" cy="40" r="4.5" fill="#c084fc" />
                <text x="360" y="28" fill="#c084fc" fontWeight="bold" fontSize="13" textAnchor="middle">I3</text>

                {/* OR Gate 1 (Y1 = I2 + I3) */}
                <circle cx="280" cy="95" r="5" fill="#818cf8" />
                <line x1="280" y1="95" x2="480" y2="95" stroke="#818cf8" strokeWidth="2" />

                <circle cx="360" cy="125" r="5" fill="#c084fc" />
                <line x1="360" y1="125" x2="480" y2="125" stroke="#c084fc" strokeWidth="2" />

                <g transform="translate(480, 70)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                  <text x="22" y="36" fill="#a5b4fc" fontSize="11" fontWeight="bold">OR</text>
                  <line x1="55" y1="32.5" x2="140" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                  <polygon points="140,28.5 152,32.5 140,36.5" fill="#a855f7" />
                  <text x="165" y="37" fill="#c084fc" fontWeight="bold" fontSize="14">Y1 = I2 + I3</text>
                </g>

                {/* OR Gate 2 (Y0 = I1 + I3) */}
                <circle cx="200" cy="195" r="5" fill="#38bdf8" />
                <line x1="200" y1="195" x2="480" y2="195" stroke="#38bdf8" strokeWidth="2" />

                <circle cx="360" cy="225" r="5" fill="#c084fc" />
                <line x1="360" y1="225" x2="480" y2="225" stroke="#c084fc" strokeWidth="2" />

                <g transform="translate(480, 170)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="22" y="36" fill="#7dd3fc" fontSize="11" fontWeight="bold">OR</text>
                  <line x1="55" y1="32.5" x2="140" y2="32.5" stroke="#38bdf8" strokeWidth="2.5" />
                  <polygon points="140,28.5 152,32.5 140,36.5" fill="#38bdf8" />
                  <text x="165" y="37" fill="#38bdf8" fontWeight="bold" fontSize="14">Y0 = I1 + I3</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 4-to-2 Binary Encoder Simulator</h2>
              <p className="text-xs text-slate-400">Click an active input line to observe live bus wire lighting and output evaluation</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveInput(idx)}
                  className={clsx(
                    "p-3 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1",
                    activeInput === idx
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span>Line I{idx}</span>
                  <span className="text-[10px]">{activeInput === idx ? "1 (HIGH)" : "0"}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Binary Output Code (Y1 Y0)</div>
              <div className="text-4xl font-extrabold font-mono text-purple-300 py-2">
                {y1} {y0}
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Active Line: I{activeInput} (Decimal {activeInput}) | Y1={y1}, Y0={y0}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 4:2 Encoder</h2>
              <p className="text-xs text-slate-400">Essential rules for Section A circuit questions</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Exam Trap on Line I0</div>
            <p className="text-slate-300 leading-relaxed">
              Never connect line I0 to any OR gate! Doing so will make Y0 or Y1 output 1 when I0 is activated, destroying the binary representation of 00.
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="Always remember that an encoder uses OR gates, whereas a decoder uses AND gates! In a 4-to-2 encoder, there are only 2 OR gates needed (one for Y1 and one for Y0)." />
      </section>
    </div>
  );
};

export default Topic9;
