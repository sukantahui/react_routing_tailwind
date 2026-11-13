import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic20_faqs";

const Topic20 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [selectLine, setSelectLine] = useState(0); // 0 or 1
  const [input0, setInput0] = useState(true);
  const [input1, setInput1] = useState(false);

  const output = selectLine === 0 ? (input0 ? 1 : 0) : (input1 ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 20
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Multiplexers (MUX): Data Selectors (2^n to 1)
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Operating Principle, Rotary Switch Analogy, 2^n Data Inputs, n Select Lines, and Single Output Architecture
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Formulas" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive MUX Switch" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Multiplexer Concept &amp; Architecture</h2>
              <p className="text-xs text-slate-400">The digital equivalent of a multi-position rotary switch</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Multiplexer (MUX)</strong>, commonly referred to as a <strong className="text-indigo-300">Data Selector</strong>, is a combinational circuit that selects binary information from one of <strong className="text-emerald-300">$2^n$ input data lines</strong> and directs it to a <strong className="text-purple-300">single output line</strong>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              The selection of a particular input line is controlled by a set of <strong className="text-amber-300">$n$ selection lines</strong>. If there are 4 inputs, 2 select lines are needed ($2^2 = 4$); if 8 inputs, 3 select lines are needed ($2^3 = 8$).
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical Formula &amp; Selection Rule</h2>
              <p className="text-xs text-slate-400">General transfer function for 2^n to 1 multiplexers</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-purple-400 font-bold">General MUX Transfer Equation:</div>
            <div className="p-3 bg-slate-900 rounded-lg text-cyan-300">
              {"Y = Σ (m_k · I_k) for k = 0 to 2^n - 1"}
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Where m_k is the minterm formed by the selection lines corresponding to binary code k, and I_k is the data input at line k.
            </p>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT DIAGRAMS */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Rotary Switch Analogy</h2>
              <p className="text-xs text-slate-400">Mechanical rotary switch model and digital MUX block diagram</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Multiplexer Function Table Summary
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">MUX Type</th>
                    <th className="p-2.5 text-indigo-300 border-r border-slate-800">Data Inputs (2^n)</th>
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">Select Lines (n)</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Outputs</th>
                    <th className="p-2.5 text-slate-400 text-left pl-3 font-sans">Common Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">2:1 MUX</td>
                    <td className="p-2.5 border-r border-slate-800">2 (I0, I1)</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400 font-bold">1 (S)</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 text-slate-400 text-left pl-3 font-sans">2-channel bus multiplexing</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">4:1 MUX</td>
                    <td className="p-2.5 border-r border-slate-800">4 (I0 to I3)</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400 font-bold">2 (S1, S0)</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 text-slate-400 text-left pl-3 font-sans">Boolean function generation</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">8:1 MUX</td>
                    <td className="p-2.5 border-r border-slate-800">8 (I0 to I7)</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400 font-bold">3 (S2, S1, S0)</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 text-slate-400 text-left pl-3 font-sans">Parallel-to-serial conversion</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">16:1 MUX</td>
                    <td className="p-2.5 border-r border-slate-800">16 (I0 to I15)</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400 font-bold">4 (S3 to S0)</td>
                    <td className="p-2.5 border-r border-slate-800">1</td>
                    <td className="p-2.5 text-slate-400 text-left pl-3 font-sans">Large data bus routing (IC 74150)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. Block Diagram &amp; Rotary Switch Analogy
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 760 220" className="w-full max-w-2xl h-auto select-none font-mono text-xs">
                {/* Inputs */}
                {[0, 1, 2, 3].map((i) => (
                  <g key={i}>
                    <line x1="80" y1={50 + i * 35} x2="260" y2={50 + i * 35} stroke="#06b6d4" strokeWidth="2.5" />
                    <text x="50" y={54 + i * 35} fill="#06b6d4" fontWeight="bold">I{i}</text>
                  </g>
                ))}

                {/* Select Lines on bottom */}
                <line x1="340" y1="210" x2="340" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
                <polygon points="336,180 340,170 344,180" fill="#f59e0b" />
                <text x="340" y="222" fill="#fbbf24" fontWeight="bold" textAnchor="middle">S1</text>

                <line x1="420" y1="210" x2="420" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
                <polygon points="416,180 420,170 424,180" fill="#f59e0b" />
                <text x="420" y="222" fill="#fbbf24" fontWeight="bold" textAnchor="middle">S0</text>

                {/* Trapezoid MUX shape */}
                <polygon points="260,30 500,60 500,150 260,180" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="360" y="100" fill="#ffffff" fontWeight="bold" fontSize="16">4:1 MUX</text>
                <text x="360" y="120" fill="#a5b4fc" fontSize="11">Data Selector</text>

                {/* Single Output */}
                <line x1="500" y1="105" x2="650" y2="105" stroke="#c084fc" strokeWidth="3" />
                <polygon points="650,101 662,105 650,109" fill="#c084fc" />
                <text x="680" y="110" fill="#c084fc" fontWeight="bold" fontSize="14">Output Y</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Digital Selector Switch</h2>
              <p className="text-xs text-slate-400">Toggle select line to connect channel 0 or channel 1 to output</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectLine(selectLine === 0 ? 1 : 0)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  selectLine === 1 ? "bg-amber-500 text-slate-950 border-amber-300" : "bg-cyan-500 text-slate-950 border-cyan-300"
                )}
              >
                Select Line (S): {selectLine} (Connecting Channel I{selectLine})
              </button>
              <button
                onClick={() => setInput0(!input0)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", input0 ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Data Line I0: {input0 ? "1 (HIGH)" : "0 (LOW)"}
              </button>
              <button
                onClick={() => setInput1(!input1)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", input1 ? "bg-purple-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Data Line I1: {input1 ? "1 (HIGH)" : "0 (LOW)"}
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Selected Output Signal</div>
              <div className={clsx("text-4xl font-extrabold font-mono py-1", output ? "text-emerald-400" : "text-slate-600")}>
                Output Y = {output}
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Routed from Channel: I{selectLine} (Value = {selectLine === 0 ? (input0 ? 1 : 0) : (input1 ? 1 : 0)})
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: MUX Fundamentals</h2>
              <p className="text-xs text-slate-400">Important definitions and formula rules</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Formula for Selection Lines</div>
            <p className="text-slate-300 leading-relaxed">
              If a multiplexer has N data inputs, the number of select lines m required is given by: 2^m = N, or m = log2(N). Always quote this formula in definition questions!
            </p>
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

<section>
        <Teacher note="Think of a Multiplexer like railway tracks merging into a single line. The select lines act as the track switch operator, determining which train gets to proceed onto the single track!" />
      </section>
    </div>
  );
};

export default Topic20;
