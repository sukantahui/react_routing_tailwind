import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic14_faqs";

const Topic14 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [enable, setEnable] = useState(true);
  const [a1, setA1] = useState(false);
  const [a0, setA0] = useState(false);

  const d0 = enable && !a1 && !a0 ? 1 : 0;
  const d1 = enable && !a1 && a0 ? 1 : 0;
  const d2 = enable && a1 && !a0 ? 1 : 0;
  const d3 = enable && a1 && a0 ? 1 : 0;

  const activeIndex = !enable ? -1 : (a1 ? 2 : 0) + (a0 ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 14
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            2-to-4 Line Binary Decoder: Active-HIGH AND Gate Realization
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Input Address A1, A0 with Enable Control E Generating Minterms D0 = E·A1&apos;·A0&apos;, D1 = E·A1&apos;·A0, D2 = E·A1·A0&apos;, D3 = E·A1·A0
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Minterms" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Decoder Simulator" },
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
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">2-to-4 Line Decoder Architecture</h2>
              <p className="text-xs text-slate-400">Detailed operation of 2-bit binary addressing with enable control</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              The <strong className="text-cyan-400">2-to-4 Line Binary Decoder</strong> accepts a 2-bit binary code (A1 as MSB, A0 as LSB) along with an Active-HIGH Enable input <span className="text-amber-400 font-mono font-bold">E</span>. It decodes the binary pattern into exactly one of four active outputs: <span className="font-mono text-emerald-400">D0, D1, D2, or D3</span>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Inputs</span>
                <div className="text-lg font-mono font-bold text-white">2 Address + 1 Enable</div>
                <p className="text-xs text-slate-400">A1 (MSB), A0 (LSB), and Enable (E)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Outputs</span>
                <div className="text-lg font-mono font-bold text-white">4 Data Lines</div>
                <p className="text-xs text-slate-400">D0 (00), D1 (01), D2 (10), D3 (11)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Gate Requirements</span>
                <div className="text-lg font-mono font-bold text-white">2 NOT + 4 AND</div>
                <p className="text-xs text-slate-400">Four 3-input AND gates plus 2 inverters</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <div className="font-bold text-indigo-300">Active-HIGH vs Active-LOW Operation:</div>
              <p>
                In an <strong className="text-white">Active-HIGH Decoder</strong>, the selected output line switches to logic <strong className="text-emerald-400">1</strong> while all unselected outputs remain at logic <strong className="text-slate-400">0</strong>. AND gates are used to realize this circuit. When using NAND gates, the output is inverted (Active-LOW, where selected line drops to 0), which is common in commercial ICs like 74LS139.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Output Minterm Equations</h2>
              <p className="text-xs text-slate-400">Algebraic logic equations for each output pin</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400">Pin D0 (Decimal 0)</div>
                <div className="text-lg font-mono font-bold text-emerald-400">D0 = E · A1&apos; · A0&apos;</div>
                <p className="text-xs text-slate-400">Selected when A1=0, A0=0 under Enable E=1.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400">Pin D1 (Decimal 1)</div>
                <div className="text-lg font-mono font-bold text-emerald-400">D1 = E · A1&apos; · A0</div>
                <p className="text-xs text-slate-400">Selected when A1=0, A0=1 under Enable E=1.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400">Pin D2 (Decimal 2)</div>
                <div className="text-lg font-mono font-bold text-emerald-400">D2 = E · A1 · A0&apos;</div>
                <p className="text-xs text-slate-400">Selected when A1=1, A0=0 under Enable E=1.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400">Pin D3 (Decimal 3)</div>
                <div className="text-lg font-mono font-bold text-emerald-400">D3 = E · A1 · A0</div>
                <p className="text-xs text-slate-400">Selected when A1=1, A0=1 under Enable E=1.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-cyan-400">Disable Condition: </span>
              When <span className="font-mono text-amber-300 font-bold">E = 0</span>, D0 = D1 = D2 = D3 = 0, irrespective of the values of A1 and A0.
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Vector Circuit Schematics</h2>
              <p className="text-xs text-slate-400">CISCE standard truth table and gate schematic</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 2-to-4 Line Decoder Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">E (Enable)</th>
                    <th className="p-3 text-indigo-400 font-bold">A1 (MSB)</th>
                    <th className="p-3 text-indigo-400 font-bold">A0 (LSB)</th>
                    <th className="p-3 text-emerald-400 font-bold">D0</th>
                    <th className="p-3 text-emerald-400 font-bold">D1</th>
                    <th className="p-3 text-emerald-400 font-bold">D2</th>
                    <th className="p-3 text-emerald-400 font-bold">D3</th>
                    <th className="p-3 text-cyan-400 font-bold">Decoded State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-rose-400 font-bold">0</td>
                    <td className="p-3 text-slate-500">X</td>
                    <td className="p-3 text-slate-500">X</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-rose-400 font-semibold">Disabled</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">D0 = 1 (m0)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">D1 = 1 (m1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">D2 = 1 (m2)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-emerald-400 font-semibold">D3 = 1 (m3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG 1: BLOCK DIAGRAM */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Logic Block Diagram
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto select-none font-mono text-xs">
                {/* Inputs */}
                <line x1="60" y1="70" x2="180" y2="70" stroke="#818cf8" strokeWidth="2" />
                <circle cx="60" cy="70" r="4" fill="#818cf8" />
                <text x="30" y="74" fill="#c7d2fe" fontWeight="bold">A1 (MSB)</text>

                <line x1="60" y1="120" x2="180" y2="120" stroke="#818cf8" strokeWidth="2" />
                <circle cx="60" cy="120" r="4" fill="#818cf8" />
                <text x="30" y="124" fill="#c7d2fe" fontWeight="bold">A0 (LSB)</text>

                {/* Enable */}
                <line x1="260" y1="190" x2="260" y2="160" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="260" cy="190" r="4" fill="#f59e0b" />
                <text x="260" y="210" fill="#fcd34d" textAnchor="middle" fontWeight="bold">E (Enable)</text>

                {/* Decoder Box */}
                <rect x="180" y="40" width="160" height="120" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="260" y="85" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="14">2-to-4</text>
                <text x="260" y="105" fill="#a5b4fc" textAnchor="middle" fontSize="11">DECODER</text>
                <text x="260" y="125" fill="#94a3b8" textAnchor="middle" fontSize="9">Active-HIGH</text>

                {/* Outputs */}
                <line x1="340" y1="55" x2="450" y2="55" stroke="#10b981" strokeWidth="2" />
                <circle cx="450" cy="55" r="4" fill="#10b981" />
                <text x="465" y="59" fill="#6ee7b7" fontWeight="bold">D0 (m0)</text>

                <line x1="340" y1="85" x2="450" y2="85" stroke="#10b981" strokeWidth="2" />
                <circle cx="450" cy="85" r="4" fill="#10b981" />
                <text x="465" y="89" fill="#6ee7b7" fontWeight="bold">D1 (m1)</text>

                <line x1="340" y1="115" x2="450" y2="115" stroke="#10b981" strokeWidth="2" />
                <circle cx="450" cy="115" r="4" fill="#10b981" />
                <text x="465" y="119" fill="#6ee7b7" fontWeight="bold">D2 (m2)</text>

                <line x1="340" y1="145" x2="450" y2="145" stroke="#10b981" strokeWidth="2" />
                <circle cx="450" cy="145" r="4" fill="#10b981" />
                <text x="465" y="149" fill="#6ee7b7" fontWeight="bold">D3 (m3)</text>
              </svg>
            </div>
          </div>

          {/* VECTOR SVG 2: GATE-LEVEL CIRCUIT */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              3. Logic Gate Schematic with Active-HIGH Enable
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 740 330" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Rails: A1, A1', A0, A0', E */}
                <text x="50" y="25" fill="#818cf8" fontWeight="bold">A1</text>
                <line x1="55" y1="35" x2="55" y2="300" stroke="#818cf8" strokeWidth="2" />

                <line x1="55" y1="60" x2="80" y2="60" stroke="#818cf8" strokeWidth="2" />
                <polygon points="80,50 105,60 80,70" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="110" cy="60" r="4" fill="#020617" stroke="#818cf8" strokeWidth="1.5" />
                <line x1="114" y1="60" x2="130" y2="60" stroke="#818cf8" strokeWidth="2" />
                <line x1="130" y1="60" x2="130" y2="300" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="122" y="25" fill="#a5b4fc">A1&apos;</text>

                <text x="180" y="25" fill="#38bdf8" fontWeight="bold">A0</text>
                <line x1="185" y1="35" x2="185" y2="300" stroke="#38bdf8" strokeWidth="2" />

                <line x1="185" y1="60" x2="210" y2="60" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="210,50 235,60 210,70" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="240" cy="60" r="4" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="244" y1="60" x2="260" y2="60" stroke="#38bdf8" strokeWidth="2" />
                <line x1="260" y1="60" x2="260" y2="300" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="252" y="25" fill="#7dd3fc">A0&apos;</text>

                {/* Enable E */}
                <text x="310" y="25" fill="#f59e0b" fontWeight="bold">E</text>
                <line x1="315" y1="35" x2="315" y2="300" stroke="#f59e0b" strokeWidth="2" />

                {/* AND0 (D0 = E·A1'·A0') */}
                <circle cx="130" cy="90" r="3.5" fill="#818cf8" />
                <line x1="130" y1="90" x2="450" y2="90" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="260" cy="98" r="3.5" fill="#38bdf8" />
                <line x1="260" y1="98" x2="450" y2="98" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="315" cy="106" r="3.5" fill="#f59e0b" />
                <line x1="315" y1="106" x2="450" y2="106" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,80 L 475,80 A 18,18 0 0,1 475,116 L 450,116 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="98" x2="600" y2="98" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="98" r="4" fill="#10b981" />
                <text x="615" y="102" fill="#6ee7b7" fontWeight="bold">D0 = E·A1&apos;·A0&apos;</text>

                {/* AND1 (D1 = E·A1'·A0) */}
                <circle cx="130" cy="148" r="3.5" fill="#818cf8" />
                <line x1="130" y1="148" x2="450" y2="148" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="156" r="3.5" fill="#38bdf8" />
                <line x1="185" y1="156" x2="450" y2="156" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="315" cy="164" r="3.5" fill="#f59e0b" />
                <line x1="315" y1="164" x2="450" y2="164" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,138 L 475,138 A 18,18 0 0,1 475,174 L 450,174 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="156" x2="600" y2="156" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="156" r="4" fill="#10b981" />
                <text x="615" y="160" fill="#6ee7b7" fontWeight="bold">D1 = E·A1&apos;·A0</text>

                {/* AND2 (D2 = E·A1·A0') */}
                <circle cx="55" cy="206" r="3.5" fill="#818cf8" />
                <line x1="55" y1="206" x2="450" y2="206" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="260" cy="214" r="3.5" fill="#38bdf8" />
                <line x1="260" y1="214" x2="450" y2="214" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="315" cy="222" r="3.5" fill="#f59e0b" />
                <line x1="315" y1="222" x2="450" y2="222" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,196 L 475,196 A 18,18 0 0,1 475,232 L 450,232 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="214" x2="600" y2="214" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="214" r="4" fill="#10b981" />
                <text x="615" y="218" fill="#6ee7b7" fontWeight="bold">D2 = E·A1·A0&apos;</text>

                {/* AND3 (D3 = E·A1·A0) */}
                <circle cx="55" cy="264" r="3.5" fill="#818cf8" />
                <line x1="55" y1="264" x2="450" y2="264" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="272" r="3.5" fill="#38bdf8" />
                <line x1="185" y1="272" x2="450" y2="272" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="315" cy="280" r="3.5" fill="#f59e0b" />
                <line x1="315" y1="280" x2="450" y2="280" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,254 L 475,254 A 18,18 0 0,1 475,290 L 450,290 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="272" x2="600" y2="272" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="272" r="4" fill="#10b981" />
                <text x="615" y="276" fill="#6ee7b7" fontWeight="bold">D3 = E·A1·A0</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 2-to-4 Line Decoder Simulator</h2>
              <p className="text-xs text-slate-400">Toggle input address lines and verify instantaneous decoding</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Master Enable:</span>
                <button
                  onClick={() => setEnable(!enable)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    enable
                      ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  E = {enable ? "1 (Active)" : "0 (Disabled)"}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Binary Inputs:</span>
                <button
                  onClick={() => setA1(!a1)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    a1
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  A1 (MSB) = {a1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setA0(!a0)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    a0
                      ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  A0 (LSB) = {a0 ? "1" : "0"}
                </button>
              </div>
            </div>

            {/* LIVE DISPLAY */}
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { name: "D0", val: d0, bin: "00", term: "E·A1'·A0'" },
                { name: "D1", val: d1, bin: "01", term: "E·A1'·A0" },
                { name: "D2", val: d2, bin: "10", term: "E·A1·A0'" },
                { name: "D3", val: d3, bin: "11", term: "E·A1·A0" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-4 rounded-xl border text-center transition-all",
                    item.val === 1
                      ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-900/40 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="text-xs font-mono text-slate-400 mb-1">{item.name} ({item.bin}₂)</div>
                  <div
                    className={clsx(
                      "text-3xl font-mono font-black mb-1",
                      item.val === 1 ? "text-emerald-400 animate-pulse" : "text-slate-600"
                    )}
                  >
                    {item.val}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">{item.term}</div>
                  <div className="mt-2 text-[10px]">
                    {item.val === 1 ? (
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">● ACTIVE HIGH</span>
                    ) : (
                      <span className="text-slate-600 font-semibold">INACTIVE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Binary Input: </span>
                <span className="font-mono font-bold text-indigo-400">{a1 ? "1" : "0"}{a0 ? "1" : "0"}₂</span>
                <span className="text-slate-400 ml-2">(= Decimal {activeIndex >= 0 ? activeIndex : "N/A"})</span>
              </div>
              <div>
                <span className="text-slate-400">Decoded Line: </span>
                <span className="font-mono font-bold text-emerald-400">
                  {activeIndex >= 0 ? ("Line D" + activeIndex + " is HIGH") : "All outputs 0 (Disabled)"}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Examination Focus: 2-to-4 Line Decoder</h2>
              <p className="text-xs text-slate-400">Marking pattern and common board errors</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE Marking Scheme (3 to 4 Marks)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Truth Table (1 Mark):</strong> Complete 5 rows (1 disable row with don&apos;t cares + 4 active rows).</li>
                <li><strong className="text-white">Boolean Equations (1 Mark):</strong> D0 = E·A1&apos;·A0&apos;, D1 = E·A1&apos;·A0, D2 = E·A1·A0&apos;, D3 = E·A1·A0.</li>
                <li><strong className="text-white">Logic Diagram (2 Marks):</strong> Correct 2 NOT gates + 4 AND gates with input connection dots clearly marked.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2 text-rose-200">
              <div className="font-bold text-rose-300 uppercase tracking-wider">Critical Student Traps</div>
              <ul className="list-disc list-inside space-y-1 text-rose-300/90">
                <li>Writing D1 as A1·A0&apos; instead of A1&apos;·A0 (swapping MSB and LSB causes 0 marks).</li>
                <li>Leaving the Enable pin unconnected on one or more AND gates.</li>
                <li>Confusing active-HIGH (AND gates) with active-LOW (NAND gates).</li>
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

{/* TEACHER NOTE */}
      <Teacher
        topicId="topic-14-decoder"
        headline="Sukanta Hui's Board Advice on 2-to-4 Decoders"
        note="Whenever you draw a 2-to-4 decoder in your ISC theory paper, draw the input rails vertically on the left! Rail 1 for A1, Rail 2 through a NOT gate for A1', Rail 3 for A0, Rail 4 through a NOT gate for A0', and Rail 5 for Enable E. Then branch off neatly to each of the four AND gates. This clean vertical bus structure guarantees you get full presentation marks from the council examiners!"
      />
    </div>
  );
};

export default Topic14;
