import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic22 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(true);
  const [inputs, setInputs] = useState([true, false, true, false]);

  const sel = (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const out = inputs[sel] ? 1 : 0;

  const toggleDataInput = (idx) => {
    setInputs((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 22
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            4-to-1 Multiplexer: Function Table &amp; Logic Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Gate-Level Circuit with 2 NOT Gates, 4 AND Gates, and 4-Input OR Gate: Y = S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3
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
              <h2 className="text-lg sm:text-xl font-bold text-white">4-to-1 MUX Principles</h2>
              <p className="text-xs text-slate-400">Selecting 1 of 4 data channels with 2 selection lines</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">4-to-1 Multiplexer</strong> has 4 data input lines ($I_0, I_1, I_2, I_3$), 2 selection lines ($S_1, S_0$), and 1 output ($Y$).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              The 2-bit binary number on ($S_1 S_0$) selects which data input is routed through to output $Y$. It is implemented using <strong className="text-indigo-300">2 NOT gates</strong>, <strong className="text-indigo-300">four 3-input AND gates</strong>, and <strong className="text-indigo-300">one 4-input OR gate</strong>.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">4:1 MUX Boolean Equation</h2>
              <p className="text-xs text-slate-400">Sum of products selection equation</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-purple-400 font-bold block">Output Equation:</span>
            <div className="p-3 bg-slate-900 rounded-lg text-sm text-cyan-300 font-bold">
              {"Y = S1'·S0'·I0 + S1'·S0·I1 + S1·S0'·I2 + S1·S0·I3"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Logic Circuit Diagram</h2>
              <p className="text-xs text-slate-400">4-to-1 function table and full gate-level schematic</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 4-to-1 MUX Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">S1 (MSB)</th>
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">S0 (LSB)</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Output (Y)</th>
                    <th className="p-2.5 text-slate-400 font-sans text-left pl-3">Selected Channel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">Y = I0</td>
                    <td className="p-2.5 text-slate-300 font-sans text-left pl-3">Channel 0 Selected</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">Y = I1</td>
                    <td className="p-2.5 text-slate-300 font-sans text-left pl-3">Channel 1 Selected</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">Y = I2</td>
                    <td className="p-2.5 text-slate-300 font-sans text-left pl-3">Channel 2 Selected</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">Y = I3</td>
                    <td className="p-2.5 text-slate-300 font-sans text-left pl-3">Channel 3 Selected</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* GATE LEVEL CIRCUIT DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Gate-Level Circuit Schematic (4 AND Gates + 1 OR Gate)
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 320" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* 4 AND Gates */}
                {[
                  { y: 40, label: "S1'·S0'·I0" },
                  { y: 100, label: "S1'·S0·I1" },
                  { y: 160, label: "S1·S0'·I2" },
                  { y: 220, label: "S1·S0·I3" }
                ].map((g, idx) => (
                  <g key={idx} transform={`translate(340, ${g.y})`}>
                    <path d="M 0,0 L 35,0 A 25,25 0 0,1 35,50 L 0,50 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                    <text x="18" y="29" fill="#38bdf8" fontSize="8" fontWeight="bold">AND</text>
                    <line x1="60" y1="25" x2="160" y2="25" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="70" y="18" fill="#38bdf8" fontSize="10">{g.label}</text>
                  </g>
                ))}

                {/* Final 4-Input OR Gate */}
                <g transform="translate(500, 105)">
                  <path d="M 0,10 Q 30,35 0,70 Q 45,70 70,40 Q 45,10 0,10 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="28" y="44" fill="#f5d0fe" fontSize="11" fontWeight="bold">OR</text>
                  <line x1="70" y1="40" x2="160" y2="40" stroke="#c084fc" strokeWidth="3" />
                  <polygon points="160,36 172,40 160,44" fill="#c084fc" />
                  <text x="185" y="45" fill="#c084fc" fontWeight="bold" fontSize="14">Output Y</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 4:1 Multiplexer Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle select lines and individual data lines to observe routing</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setS1(!s1)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", s1 ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Select S1 (MSB): {s1 ? "1" : "0"}
              </button>
              <button
                onClick={() => setS0(!s0)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", s0 ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Select S0 (LSB): {s0 ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => toggleDataInput(idx)}
                  className={clsx(
                    "p-3 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1",
                    sel === idx
                      ? "border-emerald-500 bg-emerald-950/40 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-400"
                  )}
                >
                  <span>Channel I{idx} {sel === idx ? "(SELECTED)" : ""}</span>
                  <span className={clsx("text-lg font-bold", inputs[idx] ? "text-cyan-300" : "text-slate-600")}>
                    {inputs[idx] ? "1 (HIGH)" : "0 (LOW)"}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Selected Channel Output</div>
              <div className={clsx("text-4xl font-extrabold font-mono py-1", out ? "text-emerald-400" : "text-slate-600")}>
                Output Y = {out}
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Selected: Channel I{sel} (Value = {inputs[sel] ? 1 : 0})
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 4:1 MUX</h2>
              <p className="text-xs text-slate-400">High-frequency 3-mark circuit drawing guidelines</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Drawing Rule</div>
            <p className="text-slate-300 leading-relaxed">
              Always write the equation Y = S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3 before drawing the circuit. Each AND gate must clearly show 3 inputs: 2 selection inputs (true or complement) and 1 data input!
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="The 4-to-1 MUX is the most tested multiplexer in the ISC syllabus. Make sure you can draw the gate-level schematic and block diagram with ease." />
      </section>
    </div>
  );
};

export default Topic22;
