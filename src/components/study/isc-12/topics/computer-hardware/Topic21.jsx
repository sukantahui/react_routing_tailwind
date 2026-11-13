import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic21 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s, setS] = useState(false);
  const [i0, setI0] = useState(true);
  const [i1, setI1] = useState(false);

  const out = !s ? (i0 ? 1 : 0) : (i1 ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 21
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            2-to-1 Multiplexer: Logic Circuit &amp; Equation
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Gate-Level Realization with 1 NOT Gate, 2 AND Gates, and 1 OR Gate: Y = S'I0 + SI1
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equation & Proof" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">2-to-1 MUX Principles</h2>
              <p className="text-xs text-slate-400">Basic 2-channel binary data selector</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">2-to-1 Multiplexer</strong> has two data inputs ($I_0$ and $I_1$), one select input ($S$), and one output ($Y$).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              When $S = 0$, the first AND gate is enabled, steering input $I_0$ to the output. When $S = 1$, the second AND gate is enabled, steering input $I_1$ to the output.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Output Expression</h2>
              <p className="text-xs text-slate-400">Sum of products equation for 2:1 multiplexer</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-purple-400 font-bold block">Output Equation:</span>
            <div className="p-3 bg-slate-900 rounded-lg text-sm text-cyan-300 font-bold">
              {"Y = S'·I0 + S·I1"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Logic Circuit Schematic</h2>
              <p className="text-xs text-slate-400">Excitation table and gate-level circuit diagram</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 2-to-1 Multiplexer Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-3 text-amber-400 border-r border-slate-800">Select Line (S)</th>
                    <th className="p-3 text-cyan-400 border-r border-slate-800">Output Equation (Y)</th>
                    <th className="p-3 text-emerald-400 text-left pl-4 font-sans">Routed Input Channel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800 text-amber-400 font-bold">0</td>
                    <td className="p-3 border-r border-slate-800 text-cyan-300 font-bold">Y = I0</td>
                    <td className="p-3 text-slate-300 text-left pl-4 font-sans">Channel 0 Selected (I0 steered to output)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-3 border-r border-slate-800 text-amber-400 font-bold">1</td>
                    <td className="p-3 border-r border-slate-800 text-purple-300 font-bold">Y = I1</td>
                    <td className="p-3 text-slate-300 text-left pl-4 font-sans">Channel 1 Selected (I1 steered to output)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Gate-Level Circuit Diagram
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Rails: I0, I1, S */}
                <line x1="80" y1="40" x2="80" y2="220" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="80" y="28" fill="#06b6d4" fontWeight="bold">I0</text>

                <line x1="140" y1="40" x2="140" y2="220" stroke="#818cf8" strokeWidth="2.5" />
                <text x="140" y="28" fill="#818cf8" fontWeight="bold">I1</text>

                <line x1="200" y1="40" x2="200" y2="220" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="200" y="28" fill="#fbbf24" fontWeight="bold">S</text>

                {/* Inverter on S */}
                <circle cx="200" cy="70" r="4" fill="#f59e0b" />
                <line x1="200" y1="70" x2="250" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="250,65 265,70 250,75" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="268" cy="70" r="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="271" y1="70" x2="330" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="285" y="64" fill="#fbbf24" fontSize="10">{"S'"}</text>

                {/* AND Gate 1 (S'·I0) */}
                <circle cx="80" cy="95" r="4" fill="#06b6d4" />
                <line x1="80" y1="95" x2="330" y2="95" stroke="#06b6d4" strokeWidth="1.5" />

                <g transform="translate(330, 60)">
                  <path d="M 0,0 L 35,0 A 25,25 0 0,1 35,50 L 0,50 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <text x="18" y="29" fill="#38bdf8" fontSize="9" fontWeight="bold">AND</text>
                  <line x1="60" y1="25" x2="150" y2="25" stroke="#06b6d4" strokeWidth="2" />
                  <text x="75" y="18" fill="#38bdf8" fontSize="10">{"S'·I0"}</text>
                </g>

                {/* AND Gate 2 (S·I1) */}
                <circle cx="140" cy="175" r="4" fill="#818cf8" />
                <line x1="140" y1="175" x2="330" y2="175" stroke="#818cf8" strokeWidth="1.5" />

                <circle cx="200" cy="150" r="4" fill="#f59e0b" />
                <line x1="200" y1="150" x2="330" y2="150" stroke="#f59e0b" strokeWidth="1.5" />

                <g transform="translate(330, 140)">
                  <path d="M 0,0 L 35,0 A 25,25 0 0,1 35,50 L 0,50 Z" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
                  <text x="18" y="29" fill="#a5b4fc" fontSize="9" fontWeight="bold">AND</text>
                  <line x1="60" y1="25" x2="150" y2="25" stroke="#818cf8" strokeWidth="2" />
                  <text x="75" y="18" fill="#a5b4fc" fontSize="10">S·I1</text>
                </g>

                {/* Final OR Gate */}
                <g transform="translate(480, 95)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="22" y="36" fill="#f5d0fe" fontSize="10" fontWeight="bold">OR</text>
                  <line x1="55" y1="32.5" x2="140" y2="32.5" stroke="#c084fc" strokeWidth="3" />
                  <polygon points="140,28.5 152,32.5 140,36.5" fill="#c084fc" />
                  <text x="165" y="37" fill="#c084fc" fontWeight="bold" fontSize="14">{"Y = S'I0 + SI1"}</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 2:1 MUX Simulator</h2>
              <p className="text-xs text-slate-400">Toggle select line S and data inputs to observe live gate routing</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setS(!s)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  s ? "bg-amber-500 text-slate-950 border-amber-300" : "bg-cyan-500 text-slate-950 border-cyan-300"
                )}
              >
                Select Line (S): {s ? "1 (Select I1)" : "0 (Select I0)"}
              </button>
              <button
                onClick={() => setI0(!i0)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", i0 ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Data Line I0: {i0 ? "1" : "0"}
              </button>
              <button
                onClick={() => setI1(!i1)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", i1 ? "bg-purple-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Data Line I1: {i1 ? "1" : "0"}
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Computed Output Signal</div>
              <div className={clsx("text-4xl font-extrabold font-mono py-1", out ? "text-emerald-400" : "text-slate-600")}>
                Output Y = {out}
              </div>
              <div className="text-xs font-mono text-cyan-300">
                Active Channel: I{s ? 1 : 0} = {out}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 2:1 MUX</h2>
              <p className="text-xs text-slate-400">Basic 2-mark question guidelines</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Gate Count Rule</div>
            <p className="text-slate-300 leading-relaxed">
              A 2:1 multiplexer requires 1 NOT gate, 2 AND gates, and 1 OR gate. Alternatively, it can be realized using 4 NAND gates.
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="The 2:1 MUX is the atomic unit of data selection. Master this circuit and you can build any higher-order multiplexer (4:1, 8:1, 16:1) by simple recursive expansion!" />
      </section>
    </div>
  );
};

export default Topic21;
