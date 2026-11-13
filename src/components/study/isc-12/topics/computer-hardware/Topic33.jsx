import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, GitCompare } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic33_faqs";

const Topic33 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Encoder Interactive State
  const [encInput, setEncInput] = useState(1); // 0, 1, 2, 3
  const encY1 = encInput === 2 || encInput === 3 ? 1 : 0;
  const encY0 = encInput === 1 || encInput === 3 ? 1 : 0;

  // Multiplexer Interactive State
  const [muxInputs, setMuxInputs] = useState([1, 0, 1, 0]);
  const [muxS1, setMuxS1] = useState(false);
  const [muxS0, setMuxS0] = useState(false);
  const muxSel = (muxS1 ? 2 : 0) + (muxS0 ? 1 : 0);
  const muxOut = muxInputs[muxSel];

  const toggleMuxInput = (idx) => {
    const next = [...muxInputs];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setMuxInputs(next);
  };

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 33
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comparative Analysis: Encoder vs Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Key Differences in Architecture, Input/Output Ratios, Select Line Dependencies, and Practical Applications
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Architectural Comparison" },
              { id: "truthTable", label: "3. Comparison Table & Diagrams" },
              { id: "interactive", label: "4. Side-by-Side Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Why Students Confuse Encoders &amp; Multiplexers</h2>
              <p className="text-xs text-slate-400">Clarifying the fundamental functional distinction</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              Both <strong className="text-cyan-400">Encoders</strong> and <strong className="text-emerald-400">Multiplexers</strong> take multiple input lines and produce fewer output lines. However, their internal logic and purpose are entirely different:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Encoder Purpose</span>
                <p className="text-xs text-slate-300">
                  An Encoder performs <strong className="text-white">Code Translation</strong>. It identifies which of its 2^n inputs is active and converts that index into an <strong className="text-cyan-300">n-bit binary number</strong>. It has <strong className="text-rose-400">NO select lines</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Multiplexer Purpose</span>
                <p className="text-xs text-slate-300">
                  A Multiplexer performs <strong className="text-white">Data Routing</strong>. It accepts 2^n data streams and uses <strong className="text-amber-400">n select lines</strong> to route <strong className="text-emerald-300">ONE selected data stream</strong> to a single output line.
                </p>
              </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical &amp; Logical Equation Differences</h2>
              <p className="text-xs text-slate-400">Comparing output expressions</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-cyan-400 font-sans font-bold">4-to-2 Line Encoder Equations:</div>
                <div className="text-slate-300">Y1 = I2 + I3</div>
                <div className="text-slate-300">Y0 = I1 + I3</div>
                <p className="text-slate-400 font-sans text-[11px] mt-2">
                  Built purely using OR gates. Inputs represent mutually exclusive active states.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-emerald-400 font-sans font-bold">4-to-1 Multiplexer Equation:</div>
                <div className="text-slate-300">Y = S1&apos;S0&apos;I0 + S1&apos;S0 I1 + S1 S0&apos;I2 + S1 S0 I3</div>
                <p className="text-slate-400 font-sans text-[11px] mt-2">
                  Built using NOT, AND, and OR gates. Controlled by select variables S1, S0.
                </p>
              </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Master Comparison Matrix &amp; Block Diagrams</h2>
              <p className="text-xs text-slate-400">Council-standard comparison table and vector schematics</p>
            </div>
          </div>

          {/* MASTER COMPARISON TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. Detailed Parameter Comparison
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">Parameter</th>
                    <th className="p-3 text-cyan-400 font-bold">Encoder (e.g. 4-to-2)</th>
                    <th className="p-3 text-emerald-400 font-bold">Multiplexer (e.g. 4-to-1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Input Lines</td>
                    <td className="p-3 text-cyan-300">2^n input lines (4 lines)</td>
                    <td className="p-3 text-emerald-300">2^n data lines (4 lines)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Output Lines</td>
                    <td className="p-3 text-cyan-300">n output lines (2 lines)</td>
                    <td className="p-3 text-emerald-300">Exactly 1 single output line</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Select Lines</td>
                    <td className="p-3 text-rose-400 font-bold">NONE</td>
                    <td className="p-3 text-emerald-400 font-bold">n select lines (2 lines)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Internal Gates</td>
                    <td className="p-3 text-cyan-300">Built mainly using OR gates</td>
                    <td className="p-3 text-emerald-300">Built using AND, NOT, and OR gates</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Core Function</td>
                    <td className="p-3 text-cyan-300">Converts active line to binary code</td>
                    <td className="p-3 text-emerald-300">Selects 1 data line based on address</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Practical Use</td>
                    <td className="p-3 text-slate-400 font-sans">Keyboard input, priority interrupts</td>
                    <td className="p-3 text-slate-400 font-sans">Data routing, serial transmission</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Side-by-Side Architectural Block Comparison
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* ENCODER ON LEFT */}
                <rect x="70" y="45" width="160" height="150" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                <text x="150" y="110" fill="#cffafe" textAnchor="middle" fontWeight="bold" fontSize="14">ENCODER</text>
                <text x="150" y="130" fill="#67e8f9" textAnchor="middle" fontSize="11">4-to-2 Line</text>
                <text x="150" y="150" fill="#fda4af" textAnchor="middle" fontSize="9">No Select Lines</text>

                {/* 4 Inputs */}
                <line x1="20" y1="65" x2="70" y2="65" stroke="#38bdf8" strokeWidth="1.5" /><text x="5" y="69" fill="#7dd3fc">I0</text>
                <line x1="20" y1="100" x2="70" y2="100" stroke="#38bdf8" strokeWidth="1.5" /><text x="5" y="104" fill="#7dd3fc">I1</text>
                <line x1="20" y1="135" x2="70" y2="135" stroke="#38bdf8" strokeWidth="1.5" /><text x="5" y="139" fill="#7dd3fc">I2</text>
                <line x1="20" y1="170" x2="70" y2="170" stroke="#38bdf8" strokeWidth="1.5" /><text x="5" y="174" fill="#7dd3fc">I3</text>

                {/* 2 Outputs */}
                <line x1="230" y1="90" x2="280" y2="90" stroke="#06b6d4" strokeWidth="2" /><text x="290" y="94" fill="#67e8f9" fontWeight="bold">Y1 (MSB)</text>
                <line x1="230" y1="150" x2="280" y2="150" stroke="#06b6d4" strokeWidth="2" /><text x="290" y="154" fill="#67e8f9" fontWeight="bold">Y0 (LSB)</text>

                {/* VS DIVIDER */}
                <line x1="380" y1="30" x2="380" y2="230" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="380" cy="130" r="16" fill="#1e293b" stroke="#475569" />
                <text x="380" y="134" fill="#94a3b8" textAnchor="middle" fontWeight="bold">VS</text>

                {/* MULTIPLEXER ON RIGHT */}
                <polygon points="480,45 630,75 630,165 480,195" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="550" y="115" fill="#d1fae5" textAnchor="middle" fontWeight="bold" fontSize="14">MUX</text>
                <text x="550" y="135" fill="#6ee7b7" textAnchor="middle" fontSize="11">4-to-1 Line</text>

                {/* 4 Data Inputs */}
                <line x1="430" y1="65" x2="480" y2="65" stroke="#34d399" strokeWidth="1.5" /><text x="410" y="69" fill="#a7f3d0">I0</text>
                <line x1="430" y1="95" x2="480" y2="95" stroke="#34d399" strokeWidth="1.5" /><text x="410" y="99" fill="#a7f3d0">I1</text>
                <line x1="430" y1="145" x2="480" y2="145" stroke="#34d399" strokeWidth="1.5" /><text x="410" y="149" fill="#a7f3d0">I2</text>
                <line x1="430" y1="175" x2="480" y2="175" stroke="#34d399" strokeWidth="1.5" /><text x="410" y="179" fill="#a7f3d0">I3</text>

                {/* Select Lines on bottom */}
                <line x1="530" y1="180" x2="530" y2="225" stroke="#f59e0b" strokeWidth="2" /><text x="530" y="240" fill="#fcd34d" textAnchor="middle" fontSize="9" fontWeight="bold">S1</text>
                <line x1="570" y1="175" x2="570" y2="225" stroke="#f59e0b" strokeWidth="2" /><text x="570" y="240" fill="#fcd34d" textAnchor="middle" fontSize="9" fontWeight="bold">S0</text>

                {/* 1 Output */}
                <line x1="630" y1="120" x2="690" y2="120" stroke="#10b981" strokeWidth="2.5" />
                <text x="700" y="124" fill="#6ee7b7" fontWeight="bold" fontSize="13">Y (1 Line)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Side-by-Side Dynamic Simulator</h2>
              <p className="text-xs text-slate-400">Operate the Encoder and Multiplexer side-by-side to witness their distinct functions</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ENCODER PANEL */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Encoder Operation</span>
                <span className="text-[10px] text-slate-500">2^n → n</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-400">Click to activate one input line:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setEncInput(idx)}
                      className={clsx(
                        "py-2 rounded font-mono font-bold text-xs border transition-all",
                        encInput === idx
                          ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      )}
                    >
                      I{idx}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Generated Binary Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-xl text-cyan-400">{encY1}{encY0}₂</span>
                  <span className="text-xs text-slate-400">(= {encInput})</span>
                </div>
              </div>
            </div>

            {/* MULTIPLEXER PANEL */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/40 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Multiplexer Operation</span>
                <span className="text-[10px] text-slate-500">2^n + n → 1</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-400">Select Lines (S1, S0):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMuxS1(!muxS1)}
                    className={clsx(
                      "flex-1 py-1.5 rounded font-mono font-bold text-xs border",
                      muxS1 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-900 text-slate-400 border-slate-800"
                    )}
                  >
                    S1 = {muxS1 ? "1" : "0"}
                  </button>
                  <button
                    onClick={() => setMuxS0(!muxS0)}
                    className={clsx(
                      "flex-1 py-1.5 rounded font-mono font-bold text-xs border",
                      muxS0 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-900 text-slate-400 border-slate-800"
                    )}
                  >
                    S0 = {muxS0 ? "1" : "0"}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Active Channel</div>
                  <div className="text-xs font-mono font-bold text-white">Channel I{muxSel}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Output Y:</span>
                  <span className="font-mono font-black text-xl text-emerald-400">{muxOut}</span>
                </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Encoder vs MUX</h2>
              <p className="text-xs text-slate-400">Standard 3-mark comparison questions</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">Top 3 Points to Write in Exam (3 Marks)</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Select Lines:</strong> An encoder has NO select lines; a multiplexer requires n select lines for 2^n inputs.</li>
                <li><strong className="text-white">Outputs:</strong> An encoder has n outputs (representing a binary code); a multiplexer has exactly 1 output line.</li>
                <li><strong className="text-white">Purpose:</strong> An encoder converts an active line into a coded pattern; a multiplexer routes one selected data channel out of many.</li>
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
        topicId="topic-33-comparison"
        headline="Sukanta Hui's Quick Tip on Encoder vs MUX"
        note="If an exam question asks: 'Which device selects one data line from several data inputs using select lines?' the answer is MULTIPLEXER! If it asks: 'Which device converts 2^n input lines to n binary output lines without select lines?' the answer is ENCODER! Memorize this distinction and you won't lose a single mark!"
      />
    </div>
  );
};

export default Topic33;
