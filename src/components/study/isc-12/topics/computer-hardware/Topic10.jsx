import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic10 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [activeLine, setActiveLine] = useState(5); // 0 to 7

  const x = [4, 5, 6, 7].includes(activeLine) ? 1 : 0;
  const y = [2, 3, 6, 7].includes(activeLine) ? 1 : 0;
  const z = [1, 3, 5, 7].includes(activeLine) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 10
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            8-to-3 Line Octal-to-Binary Encoder
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Octal Line Compression: 8 Inputs (D0-D7) Converted to 3-Bit Binary Outputs (X, Y, Z) using 4-Input OR Gates
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Octal Keypad" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Octal-to-Binary Conversion</h2>
              <p className="text-xs text-slate-400">8 input lines (D0-D7) mapped to 3-bit binary code (X, Y, Z)</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              An <strong className="text-cyan-300">8-to-3 Line Octal-to-Binary Encoder</strong> accepts 8 active-HIGH inputs ($D_0$ through $D_7$), representing octal digits $0$ to $7$. It generates a 3-bit binary code $(X, Y, Z)$ on its outputs, where $X$ is MSB and $Z$ is LSB.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              It requires <strong className="text-indigo-300">three 4-input OR gates</strong>. Input $D_0$ is not connected to any OR gate because octal 0 corresponds to binary $000$.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations for Outputs X, Y, Z</h2>
              <p className="text-xs text-slate-400">Sum of active input signals for each output bit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block">Output X (MSB)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active for digits 4, 5, 6, 7:</p>
              <div className="text-indigo-300 font-bold text-sm">X = D4 + D5 + D6 + D7</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block">Output Y (Middle Bit)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active for digits 2, 3, 6, 7:</p>
              <div className="text-cyan-300 font-bold text-sm">Y = D2 + D3 + D6 + D7</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">Output Z (LSB)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active for digits 1, 3, 5, 7:</p>
              <div className="text-emerald-300 font-bold text-sm">Z = D1 + D3 + D5 + D7</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Logic Circuit Diagrams</h2>
              <p className="text-xs text-slate-400">Complete 8-to-3 truth table and 4-input OR gate circuit schematic</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Octal-to-Binary Truth Table (8 States)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D7</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D6</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D5</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D4</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D3</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D2</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D1</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D0</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">X</th>
                    <th className="p-2 text-cyan-300 border-r border-slate-800">Y</th>
                    <th className="p-2 text-emerald-300 border-r border-slate-800">Z</th>
                    <th className="p-2 text-slate-400 font-sans text-left pl-3">Octal Digit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, "0"],
                    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, "1"],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, "2"],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, "3"],
                    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "4"],
                    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, "5"],
                    [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, "6"],
                    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, "7"]
                  ].map(([d7, d6, d5, d4, d3, d2, d1, d0, rx, ry, rz, oct], idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800">{d7}</td>
                      <td className="p-2 border-r border-slate-800">{d6}</td>
                      <td className="p-2 border-r border-slate-800">{d5}</td>
                      <td className="p-2 border-r border-slate-800">{d4}</td>
                      <td className="p-2 border-r border-slate-800">{d3}</td>
                      <td className="p-2 border-r border-slate-800">{d2}</td>
                      <td className="p-2 border-r border-slate-800">{d1}</td>
                      <td className="p-2 border-r border-slate-800">{d0}</td>
                      <td className={clsx("p-2 border-r border-slate-800 font-bold", rx === 1 ? "text-indigo-400 bg-indigo-500/10" : "text-slate-500")}>{rx}</td>
                      <td className={clsx("p-2 border-r border-slate-800 font-bold", ry === 1 ? "text-cyan-400 bg-cyan-500/10" : "text-slate-500")}>{ry}</td>
                      <td className={clsx("p-2 border-r border-slate-800 font-bold", rz === 1 ? "text-emerald-400 bg-emerald-500/10" : "text-slate-500")}>{rz}</td>
                      <td className="p-2 text-slate-300 font-sans text-left pl-3">Octal {oct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; Gate-Level Circuit Schematic
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 280" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM (LEFT) */}
                <g transform="translate(30, 30)">
                  <rect x="0" y="0" width="220" height="200" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <text x="110" y="32" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">8-to-3 ENCODER</text>
                  <text x="110" y="50" fill="#64748b" fontSize="10" textAnchor="middle">Octal to Binary</text>

                  {/* 8 Inputs */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <g key={i}>
                      <line x1="-30" y1={70 + i * 16} x2="0" y2={70 + i * 16} stroke="#06b6d4" strokeWidth="1.5" />
                      <text x="-36" y={74 + i * 16} fill="#06b6d4" fontSize="10" textAnchor="end">D{i}</text>
                    </g>
                  ))}

                  {/* 3 Outputs */}
                  <line x1="220" y1="90" x2="260" y2="90" stroke="#818cf8" strokeWidth="2.5" />
                  <text x="275" y="94" fill="#818cf8" fontWeight="bold">X (MSB)</text>

                  <line x1="220" y1="130" x2="260" y2="130" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="275" y="134" fill="#38bdf8" fontWeight="bold">Y</text>

                  <line x1="220" y1="170" x2="260" y2="170" stroke="#34d399" strokeWidth="2.5" />
                  <text x="275" y="174" fill="#34d399" fontWeight="bold">Z (LSB)</text>
                </g>

                {/* SCHEMATIC (RIGHT) */}
                <g transform="translate(380, 20)">
                  {/* Gate X */}
                  <g transform="translate(100, 30)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="22" y="36" fill="#a5b4fc" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#818cf8" strokeWidth="2" />
                    <text x="145" y="37" fill="#818cf8" fontWeight="bold">X = D4+D5+D6+D7</text>
                  </g>

                  {/* Gate Y */}
                  <g transform="translate(100, 100)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="22" y="36" fill="#7dd3fc" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#38bdf8" strokeWidth="2" />
                    <text x="145" y="37" fill="#38bdf8" fontWeight="bold">Y = D2+D3+D6+D7</text>
                  </g>

                  {/* Gate Z */}
                  <g transform="translate(100, 170)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#34d399" strokeWidth="2" />
                    <text x="22" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#34d399" strokeWidth="2" />
                    <text x="145" y="37" fill="#34d399" fontWeight="bold">Z = D1+D3+D5+D7</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Octal Keypad Simulator</h2>
              <p className="text-xs text-slate-400">Click any octal digit (0 to 7) to generate the corresponding 3-bit binary code</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((dig) => (
                <button
                  key={dig}
                  onClick={() => setActiveLine(dig)}
                  className={clsx(
                    "p-3 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1",
                    activeLine === dig
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span className="text-sm font-extrabold">{dig}</span>
                  <span className="text-[10px]">D{dig}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">3-Bit Binary Output (X Y Z)</div>
              <div className="text-4xl font-extrabold font-mono text-emerald-300 py-2">
                {x} {y} {z}
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Octal Digit: {activeLine} = Binary ({x}{y}{z})2
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 8:3 Encoder</h2>
              <p className="text-xs text-slate-400">Recurring 3-mark circuit drawing guidelines</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Board Question Strategy</div>
            <p className="text-slate-300 leading-relaxed">
              When asked for an 8-to-3 encoder, remember the mnemonic for inputs: X takes the upper 4 digits (4, 5, 6, 7); Y takes alternate pairs (2, 3, 6, 7); Z takes every odd digit (1, 3, 5, 7). Each OR gate must have 4 inputs.
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="In octal-to-binary encoding, 8 lines are compressed into 3 lines because 2^3 = 8. Pay attention to D0—never connect it to any OR gate! Doing so will produce erroneous 1s when 0 is pressed." />
      </section>
    </div>
  );
};

export default Topic10;
