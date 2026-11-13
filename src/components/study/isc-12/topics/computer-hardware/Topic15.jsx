import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic15_faqs";

const Topic15 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [enableLow, setEnableLow] = useState(false); // Active-LOW: 0 is ACTIVE
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);

  // Active-LOW outputs: active output is 0, inactive is 1. If E'=1 (disabled), all outputs are 1.
  const isChipActive = !enableLow; // E' = 0 means active
  const code = (a ? 2 : 0) + (b ? 1 : 0);
  const outputs = [0, 1, 2, 3].map((i) => (isChipActive && code === i ? 0 : 1));

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 15
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            2-to-4 Decoder: Active-LOW Enable &amp; NAND Realization
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Inverted Logic Architecture: Active-LOW Enable (E' = 0), NAND Gate Synthesis, and Inverted Minterm Outputs
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. NAND Boolean Equations" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Active-LOW Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Active-LOW Logic &amp; NAND Realization</h2>
              <p className="text-xs text-slate-400">Industry standard TTL/CMOS active-LOW decoders (e.g., 74LS138)</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              In commercial digital integrated circuits (such as TTL 74139), decoders are predominantly constructed using <strong className="text-cyan-300">NAND gates</strong> rather than AND gates.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              This introduces <strong className="text-amber-300">Active-LOW logic</strong>:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              <li>The chip is enabled when the active-LOW Enable pin is <strong className="text-emerald-400">0 (LOW)</strong>: $E' = 0$. If $E' = 1$, the chip is disabled and ALL outputs are forced to 1.</li>
              <li>The selected minterm output drops to <strong className="text-cyan-300">0 (LOW)</strong>, while all unselected outputs remain <strong className="text-slate-500">1 (HIGH)</strong>.</li>
            </ul>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">NAND Gate Output Expressions</h2>
              <p className="text-xs text-slate-400">Complemented minterms derived via De Morgan's Law</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">Output Y0'</span>
              {"Y0' = (A' · B')' = A + B"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">Output Y1'</span>
              {"Y1' = (A' · B)' = A + B'"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">Output Y2'</span>
              {"Y2' = (A · B')' = A' + B"}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">Output Y3'</span>
              {"Y3' = (A · B)' = A' + B'"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Active-LOW Truth Table &amp; NAND Schematic</h2>
              <p className="text-xs text-slate-400">Excitation matrix where 0 indicates active state and NAND gate layout</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Active-LOW Truth Table (Active Output = 0)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">Enable (E')</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 text-rose-400 border-r border-slate-800">Y0'</th>
                    <th className="p-2.5 text-rose-400 border-r border-slate-800">Y1'</th>
                    <th className="p-2.5 text-rose-400 border-r border-slate-800">Y2'</th>
                    <th className="p-2.5 text-rose-400 border-r border-slate-800">Y3'</th>
                    <th className="p-2.5 text-slate-400 font-sans text-left pl-3">Operating State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-rose-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-500">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-500">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-400">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-400">1</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">Disabled (All outputs 1)</td>
                  </tr>
                  {[
                    [0, 0, [0, 1, 1, 1], "Y0 Active (0)"],
                    [0, 1, [1, 0, 1, 1], "Y1 Active (0)"],
                    [1, 0, [1, 1, 0, 1], "Y2 Active (0)"],
                    [1, 1, [1, 1, 1, 0], "Y3 Active (0)"]
                  ].map(([ra, rb, outs, label], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">0</td>
                      <td className="p-2.5 border-r border-slate-800">{ra}</td>
                      <td className="p-2.5 border-r border-slate-800">{rb}</td>
                      {outs.map((o, idx) => (
                        <td key={idx} className={clsx("p-2.5 border-r border-slate-800 font-bold", o === 0 ? "text-cyan-300 bg-cyan-500/20" : "text-slate-500")}>
                          {o}
                        </td>
                      ))}
                      <td className="p-2.5 text-cyan-300 font-sans text-left pl-3">{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NAND GATE SCHEMATIC */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Circuit Diagram with NAND Gates &amp; Inversion Bubbles
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 320" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* 4 NAND Gates */}
                {[
                  { y: 50, label: "Y0' = (E'·A'·B')'" },
                  { y: 115, label: "Y1' = (E'·A'·B)'" },
                  { y: 180, label: "Y2' = (E'·A·B')'" },
                  { y: 245, label: "Y3' = (E'·A·B)'" }
                ].map((g, idx) => (
                  <g key={idx} transform={`translate(380, ${g.y})`}>
                    <path d="M 0,0 L 35,0 A 25,25 0 0,1 35,50 L 0,50 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                    <circle cx="64" cy="25" r="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                    <text x="18" y="29" fill="#38bdf8" fontSize="8" fontWeight="bold">NAND</text>
                    <line x1="68" y1="25" x2="140" y2="25" stroke="#c084fc" strokeWidth="2" />
                    <polygon points="140,21 152,25 140,29" fill="#c084fc" />
                    <text x="160" y="29" fill="#c084fc" fontWeight="bold" fontSize="13">{g.label}</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Active-LOW Decoder Simulator</h2>
              <p className="text-xs text-slate-400">Observe how the active minterm output drops to 0 (LOW)</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setEnableLow(!enableLow)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  !enableLow ? "bg-emerald-500 text-slate-950 border-emerald-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Enable E': {enableLow ? "1 (DISABLED)" : "0 (ACTIVE)"}
              </button>
              <button
                onClick={() => setA(!a)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  a ? "bg-cyan-500 text-slate-950 border-cyan-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input A: {a ? "1" : "0"}
              </button>
              <button
                onClick={() => setB(!b)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  b ? "bg-purple-500 text-white border-purple-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input B: {b ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[0, 1, 2, 3].map((idx) => {
                const isActive = outputs[idx] === 0;
                return (
                  <div key={idx} className={clsx("p-4 rounded-xl border space-y-1", isActive ? "bg-cyan-950/60 border-cyan-500 text-white" : "bg-slate-900/80 border-slate-800 text-slate-500")}>
                    <div className="text-xs font-mono">Output Y{idx}'</div>
                    <div className={clsx("text-3xl font-extrabold font-mono", isActive ? "text-cyan-300" : "text-slate-600")}>{outputs[idx]}</div>
                    <div className="text-[10px]">{isActive ? "ACTIVE (LOW 0)" : "INACTIVE (1)"}</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Active-LOW Decoders</h2>
              <p className="text-xs text-slate-400">Recognizing bubbles on inputs and outputs</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Bubble Notation</div>
            <p className="text-slate-300 leading-relaxed">
              When drawing active-LOW decoders, draw inversion bubbles on the outputs of the NAND gates (or at the output pins of the block diagram). A bubble on the Enable pin indicates E' = 0 enables the chip!
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
        <Teacher note="Active-LOW decoders are widely used because NAND gates are faster and consume less silicon area than AND gates. Remember: 0 means active here!" />
      </section>
    </div>
  );
};

export default Topic15;
