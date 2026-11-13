import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic16 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  const [enable, setEnable] = useState(true);

  const selectedIndex = (a ? 4 : 0) + (b ? 2 : 0) + (c ? 1 : 0);
  const outputs = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (enable && selectedIndex === i ? 1 : 0));

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 16
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            3-to-8 Line Binary Decoder: Truth Table &amp; Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Binary 3-Bit Expansion: Inputs (A, B, C) and Enable (E) Decoding into 8 Minterm Lines (Y0 through Y7)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Minterm Equations (m0-m7)" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive 3:8 Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">3-to-8 Binary Decoder Architecture</h2>
              <p className="text-xs text-slate-400">3 input bits decoded into 8 discrete minterms</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">3-to-8 line binary decoder</strong> has 3 binary inputs (A, B, C), an active-HIGH enable input (E), and 8 output lines ($Y_0$ to $Y_7$). It decodes the 3-bit binary input word into one of 8 mutually exclusive minterms.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              It requires <strong className="text-indigo-300">3 inverters</strong> and <strong className="text-indigo-300">eight 4-input AND gates</strong> (or 3-input AND gates when Enable is tied HIGH).
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
              <h2 className="text-lg sm:text-xl font-bold text-white">8 Minterm Output Equations</h2>
              <p className="text-xs text-slate-400">Canonical product terms generated by AND gates</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">m0</span>
              {"Y0 = E·A'·B'·C'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">m1</span>
              {"Y1 = E·A'·B'·C"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">m2</span>
              {"Y2 = E·A'·B·C'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">m3</span>
              {"Y3 = E·A'·B·C"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">m4</span>
              {"Y4 = E·A·B'·C'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">m5</span>
              {"Y5 = E·A·B'·C"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">m6</span>
              {"Y6 = E·A·B·C'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">m7</span>
              {"Y7 = E·A·B·C"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Schematic Diagrams</h2>
              <p className="text-xs text-slate-400">Complete 8-minterm truth table and 3:8 block diagram</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 3-to-8 Decoder Truth Table (8 States)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">C</th>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <th key={i} className="p-2 text-purple-300 border-r border-slate-800">Y{i}</th>
                    ))}
                    <th className="p-2 text-slate-400 font-sans text-left pl-3">Active Minterm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0],
                    [0, 0, 1, 1],
                    [0, 1, 0, 2],
                    [0, 1, 1, 3],
                    [1, 0, 0, 4],
                    [1, 0, 1, 5],
                    [1, 1, 0, 6],
                    [1, 1, 1, 7]
                  ].map(([ra, rb, rc, activeIdx], idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800">{ra}</td>
                      <td className="p-2 border-r border-slate-800">{rb}</td>
                      <td className="p-2 border-r border-slate-800">{rc}</td>
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <td key={i} className={clsx("p-2 border-r border-slate-800 font-bold", i === activeIdx ? "text-purple-400 bg-purple-500/10" : "text-slate-500")}>
                          {i === activeIdx ? 1 : 0}
                        </td>
                      ))}
                      <td className="p-2 text-slate-300 text-left pl-3 font-sans">Y{activeIdx} (m{activeIdx})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BLOCK DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. 3-to-8 Decoder Block Diagram
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-2xl h-auto select-none font-mono text-xs">
                {/* 3 Inputs */}
                <line x1="80" y1="75" x2="260" y2="75" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="50" y="79" fill="#06b6d4" fontWeight="bold">A (MSB)</text>

                <line x1="80" y1="125" x2="260" y2="125" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="50" y="129" fill="#06b6d4" fontWeight="bold">B</text>

                <line x1="80" y1="175" x2="260" y2="175" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="50" y="179" fill="#06b6d4" fontWeight="bold">C (LSB)</text>

                {/* Decoder Box */}
                <rect x="260" y="35" width="240" height="190" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="380" y="90" fill="#ffffff" fontWeight="bold" fontSize="16" textAnchor="middle">3-to-8 DECODER</text>
                <text x="380" y="115" fill="#a5b4fc" fontSize="11" textAnchor="middle">Binary to Octal Minterms</text>

                {/* 8 Outputs */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={i}>
                    <line x1="500" y1={50 + i * 22} x2="650" y2={50 + i * 22} stroke="#c084fc" strokeWidth="2" />
                    <text x="665" y={54 + i * 22} fill="#c084fc" fontWeight="bold">Y{i}</text>
                  </g>
                ))}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 3:8 Decoder Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs A, B, C to select 1 of 8 output minterms</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setA(!a)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", a ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input A (MSB): {a ? "1" : "0"}
              </button>
              <button
                onClick={() => setB(!b)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", b ? "bg-indigo-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input B: {b ? "1" : "0"}
              </button>
              <button
                onClick={() => setC(!c)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", c ? "bg-purple-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input C (LSB): {c ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const isActive = outputs[i] === 1;
                return (
                  <div key={i} className={clsx("p-3 rounded-xl border space-y-1", isActive ? "bg-purple-950/60 border-purple-500 text-white" : "bg-slate-900/80 border-slate-800 text-slate-500")}>
                    <div className="text-[10px] font-mono">Y{i}</div>
                    <div className={clsx("text-2xl font-extrabold font-mono", isActive ? "text-purple-300" : "text-slate-600")}>{outputs[i]}</div>
                  </div>
                );
              })}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 3:8 Decoder</h2>
              <p className="text-xs text-slate-400">Recurring 3-mark Section A questions</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Minterm Recognition</div>
            <p className="text-slate-300 leading-relaxed">
              In ISC Class 12, questions frequently ask: "How many AND gates and NOT gates are required to design a 3-to-8 decoder?" The answer is: 8 AND gates (each with 3 or 4 inputs) and 3 NOT gates (inverters).
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="Master the 3-to-8 decoder because it serves as the building block for memory address decoding in computer hardware, and for synthesizing arbitrary Boolean functions with OR gates." />
      </section>
    </div>
  );
};

export default Topic16;
