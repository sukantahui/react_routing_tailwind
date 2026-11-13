import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, GitCompare } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic34 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Decoder State
  const [decA1, setDecA1] = useState(false);
  const [decA0, setDecA0] = useState(false);
  const decIndex = (decA1 ? 2 : 0) + (decA0 ? 1 : 0);

  // Demux State
  const [demuxDin, setDemuxDin] = useState(true);
  const [demuxS1, setDemuxS1] = useState(false);
  const [demuxS0, setDemuxS0] = useState(false);
  const demuxSel = (demuxS1 ? 2 : 0) + (demuxS0 ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 34
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comparative Analysis: Decoder vs Demultiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Critical Comparison of Data Distribution vs Code Expansion, Signal Routing, and Truth Table Representations
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Operational Contrast" },
              { id: "truthTable", label: "3. Comparison Table & Schematics" },
              { id: "interactive", label: "4. Side-by-Side Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Why Decoders &amp; Demultiplexers Look Similar</h2>
              <p className="text-xs text-slate-400">Comparing 1-to-many routing with n-to-2^n code expansion</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              Both <strong className="text-cyan-400">Decoders</strong> and <strong className="text-emerald-400">Demultiplexers</strong> have <strong className="text-white">2^n output lines</strong>. However:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Decoder Concept</span>
                <p className="text-xs text-slate-300">
                  Takes <strong className="text-white">n coded binary address lines</strong> and activates exactly one output line (which goes to logic 1). It does not transport external data bits; its outputs are fixed minterms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Demultiplexer Concept</span>
                <p className="text-xs text-slate-300">
                  Takes <strong className="text-white">1 single data input (Din)</strong> and uses n selection lines to transmit that exact data stream onto one chosen output line.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical Equation Contrast</h2>
              <p className="text-xs text-slate-400">Comparing minterm generation vs data-modulated output</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-sans font-bold text-indigo-400">2-to-4 Decoder Equations:</div>
              <div>D0 = A1&apos; · A0&apos;</div>
              <div>D1 = A1&apos; · A0</div>
              <div>D2 = A1  · A0&apos;</div>
              <div>D3 = A1  · A0</div>
              <p className="font-sans text-[11px] text-slate-400 mt-2">
                Each output is purely a Boolean minterm of the address lines.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-sans font-bold text-emerald-400">1-to-4 Demultiplexer Equations:</div>
              <div>Y0 = Din · S1&apos; · S0&apos;</div>
              <div>Y1 = Din · S1&apos; · S0</div>
              <div>Y2 = Din · S1  · S0&apos;</div>
              <div>Y3 = Din · S1  · S0</div>
              <p className="font-sans text-[11px] text-slate-400 mt-2">
                Outputs are modulated by the live incoming data signal Din.
              </p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Comparison Matrix &amp; Block Diagrams</h2>
              <p className="text-xs text-slate-400">Comprehensive feature comparison table</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. Parameter Comparison Matrix
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">Feature</th>
                    <th className="p-3 text-indigo-400 font-bold">Decoder (e.g. 2:4)</th>
                    <th className="p-3 text-emerald-400 font-bold">Demultiplexer (e.g. 1:4)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Inputs</td>
                    <td className="p-3 text-indigo-300">n address inputs</td>
                    <td className="p-3 text-emerald-300">1 data input + n select lines</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Outputs</td>
                    <td className="p-3 text-indigo-300">2^n outputs</td>
                    <td className="p-3 text-emerald-300">2^n outputs</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Selected Output Value</td>
                    <td className="p-3 text-indigo-300">Always switches to 1 (HIGH)</td>
                    <td className="p-3 text-emerald-300">Takes the value of Din (0 or 1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Unselected Outputs</td>
                    <td className="p-3 text-slate-400">0 (for Active-HIGH)</td>
                    <td className="p-3 text-slate-400">0 (no transmission)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-slate-300 font-sans font-semibold">Primary Application</td>
                    <td className="p-3 text-slate-400 font-sans">Memory addressing, 7-segment display</td>
                    <td className="p-3 text-slate-400 font-sans">Serial-to-parallel conversion, routing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Architectural Block Diagrams
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 760 250" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* DECODER LEFT */}
                <rect x="70" y="45" width="160" height="150" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="150" y="110" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="14">DECODER</text>
                <text x="150" y="130" fill="#a5b4fc" textAnchor="middle" fontSize="11">2-to-4 Line</text>

                <line x1="20" y1="90" x2="70" y2="90" stroke="#818cf8" strokeWidth="2" /><text x="5" y="94" fill="#c7d2fe">A1</text>
                <line x1="20" y1="150" x2="70" y2="150" stroke="#818cf8" strokeWidth="2" /><text x="5" y="154" fill="#c7d2fe">A0</text>

                {[
                  { y: 65, name: "D0" },
                  { y: 100, name: "D1" },
                  { y: 135, name: "D2" },
                  { y: 170, name: "D3" }
                ].map((pt, i) => (
                  <g key={i}>
                    <line x1="230" y1={pt.y} x2="280" y2={pt.y} stroke="#6366f1" strokeWidth="1.5" />
                    <text x="290" y={pt.y + 4} fill="#a5b4fc">{pt.name}</text>
                  </g>
                ))}

                {/* DIVIDER */}
                <line x1="380" y1="30" x2="380" y2="220" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="380" cy="120" r="16" fill="#1e293b" stroke="#475569" />
                <text x="380" y="124" fill="#94a3b8" textAnchor="middle" fontWeight="bold">VS</text>

                {/* DEMUX RIGHT */}
                <polygon points="480,75 630,40 630,195 480,165" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="555" y="110" fill="#d1fae5" textAnchor="middle" fontWeight="bold" fontSize="14">DEMUX</text>
                <text x="555" y="130" fill="#6ee7b7" textAnchor="middle" fontSize="11">1-to-4 Line</text>

                <line x1="430" y1="120" x2="480" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="400" y="124" fill="#7dd3fc" fontWeight="bold">Din</text>

                <line x1="535" y1="175" x2="535" y2="220" stroke="#f59e0b" strokeWidth="2" /><text x="535" y="235" fill="#fcd34d" textAnchor="middle" fontSize="9" fontWeight="bold">S1</text>
                <line x1="575" y1="185" x2="575" y2="220" stroke="#f59e0b" strokeWidth="2" /><text x="575" y="235" fill="#fcd34d" textAnchor="middle" fontSize="9" fontWeight="bold">S0</text>

                {[
                  { y: 60, name: "Y0" },
                  { y: 95, name: "Y1" },
                  { y: 135, name: "Y2" },
                  { y: 175, name: "Y3" }
                ].map((pt, i) => (
                  <g key={i}>
                    <line x1="630" y1={pt.y} x2="680" y2={pt.y} stroke="#10b981" strokeWidth="1.5" />
                    <text x="690" y={pt.y + 4} fill="#6ee7b7">{pt.name}</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Side-by-Side Dual Simulator</h2>
              <p className="text-xs text-slate-400">Notice how Decoder outputs fixed 1s while DEMUX outputs the actual Din value</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DECODER PANEL */}
            <div className="p-5 rounded-xl bg-slate-950 border border-indigo-800/40 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Decoder (Active-HIGH)</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDecA1(!decA1)}
                  className="flex-1 py-1.5 rounded font-mono text-xs bg-slate-900 border border-slate-700"
                >
                  A1 = {decA1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setDecA0(!decA0)}
                  className="flex-1 py-1.5 rounded font-mono text-xs bg-slate-900 border border-slate-700"
                >
                  A0 = {decA0 ? "1" : "0"}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={clsx("p-2 rounded border", decIndex === i ? "bg-indigo-950/60 border-indigo-500" : "bg-slate-900 border-slate-800")}>
                    <div className="text-[10px] text-slate-400">D{i}</div>
                    <div className={clsx("text-xl font-mono font-bold", decIndex === i ? "text-indigo-400" : "text-slate-600")}>
                      {decIndex === i ? 1 : 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DEMUX PANEL */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/40 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Demultiplexer</span>
                <button
                  onClick={() => setDemuxDin(!demuxDin)}
                  className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-xs"
                >
                  Din = {demuxDin ? "1" : "0"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDemuxS1(!demuxS1)}
                  className="flex-1 py-1.5 rounded font-mono text-xs bg-slate-900 border border-slate-700"
                >
                  S1 = {demuxS1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setDemuxS0(!demuxS0)}
                  className="flex-1 py-1.5 rounded font-mono text-xs bg-slate-900 border border-slate-700"
                >
                  S0 = {demuxS0 ? "1" : "0"}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[0, 1, 2, 3].map((i) => {
                  const val = demuxSel === i ? (demuxDin ? 1 : 0) : 0;
                  return (
                    <div key={i} className={clsx("p-2 rounded border", demuxSel === i ? "bg-emerald-950/60 border-emerald-500" : "bg-slate-900 border-slate-800")}>
                      <div className="text-[10px] text-slate-400">Y{i}</div>
                      <div className={clsx("text-xl font-mono font-bold", demuxSel === i ? "text-emerald-400" : "text-slate-600")}>
                        {val}
                      </div>
                    </div>
                  );
                })}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Decoder vs DEMUX</h2>
              <p className="text-xs text-slate-400">Scoring comparison points in CISCE papers</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE 3-Mark Difference Key</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Data Line:</strong> A demultiplexer has a distinct data input line (Din); a standard decoder has only binary address inputs.</li>
                <li><strong className="text-white">Output Behavior:</strong> Decoder activates an output to logic 1; demultiplexer transmits the actual value of Din to that output.</li>
                <li><strong className="text-white">Equivalence Condition:</strong> A decoder can function as a demultiplexer if its Enable input is used as the data line Din.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-34-comparison"
        headline="Sukanta Hui's Board Exam Tip on Decoder vs DEMUX"
        note="If CISCE asks you to differentiate between a Decoder and a Demultiplexer in a tabular format, always include the 'Output State' row! State clearly: 'Decoder output is always 1 when selected, whereas Demultiplexer output can be either 0 or 1 depending on the data input Din.' Examiners award full marks for this specific insight!"
      />
    </div>
  );
};

export default Topic34;
