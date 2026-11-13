import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic17 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [a, setA] = useState(false); // MSB / chip selector
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);

  // A=0 enables Decoder 1 (via NOT gate), A=1 enables Decoder 2
  const dec1Enabled = !a;
  const dec2Enabled = a;

  const codeBC = (b ? 2 : 0) + (c ? 1 : 0);
  const outputs = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    if (i < 4) return dec1Enabled && codeBC === i ? 1 : 0;
    return dec2Enabled && codeBC === i - 4 ? 1 : 0;
  });

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 17
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Designing 3-to-8 Decoder using Two 2-to-4 Decoders
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Higher-Order Decoder Construction: MSB Selection Logic, Enable Input Steering, and Cascading Architecture
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Cascading Logic & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Cascading Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Hierarchical Decoder Tree</h2>
              <p className="text-xs text-slate-400">Using the MSB as a chip-select line via an inverter</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              To construct a <strong className="text-cyan-300">3-to-8 decoder</strong> using <strong className="text-indigo-300">two 2-to-4 decoders with Enable</strong> and a single <strong className="text-amber-300">NOT gate</strong>:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              <li>The two lower bits ($B$ and $C$) are connected in parallel to the data inputs of both 2-to-4 decoders.</li>
              <li>The most significant bit ($A$) acts as the decoder bank selector:
                <ul className="pl-6 space-y-1 list-circle">
                  <li>When $A = 0$: The NOT gate produces 1, enabling <strong>Decoder 1</strong> (generating outputs $Y_0$ to $Y_3$), while <strong>Decoder 2</strong> is disabled ($E=0$).</li>
                  <li>When $A = 1$: $A$ directly enables <strong>Decoder 2</strong> (generating outputs $Y_4$ to $Y_7$), while <strong>Decoder 1</strong> is disabled ($E=0$).</li>
                </ul>
              </li>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Cascading Enable Equations</h2>
              <p className="text-xs text-slate-400">Mathematical partitioning of minterms across two decoder chips</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">{"Decoder 1 (E1 = A')"}</span >
              <p className="text-slate-400 font-sans text-[11px]">Generates minterms m0 through m3:</p>
              <div className="text-slate-300">{"Y0 = A'·B'·C' | Y1 = A'·B'·C"}</div>
              <div className="text-slate-300">{"Y2 = A'·B·C' | Y3 = A'·B·C"}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Decoder 2 (E2 = A)</span>
              <p className="text-slate-400 font-sans text-[11px]">Generates minterms m4 through m7:</p>
              <div className="text-slate-300">{"Y4 = A·B'·C' | Y5 = A·B'·C"}</div>
              <div className="text-slate-300">{"Y6 = A·B·C' | Y7 = A·B·C"}</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Cascaded Block Diagrams</h2>
              <p className="text-xs text-slate-400">Function table and dual 2:4 decoder schematic layout</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Function Table Showing Chip Selection
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A (MSB)</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">C</th>
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">Dec 1 Enable (A')</th>
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">Dec 2 Enable (A)</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Dec 1 Outputs (Y0-Y3)</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Dec 2 Outputs (Y4-Y7)</th>
                    <th className="p-2.5 text-slate-400 font-sans text-left pl-3">Active Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 1, 0, "Y0=1", "All 0", "Y0 (m0)"],
                    [0, 0, 1, 1, 0, "Y1=1", "All 0", "Y1 (m1)"],
                    [0, 1, 0, 1, 0, "Y2=1", "All 0", "Y2 (m2)"],
                    [0, 1, 1, 1, 0, "Y3=1", "All 0", "Y3 (m3)"],
                    [1, 0, 0, 0, 1, "All 0", "Y4=1", "Y4 (m4)"],
                    [1, 0, 1, 0, 1, "All 0", "Y5=1", "Y5 (m5)"],
                    [1, 1, 0, 0, 1, "All 0", "Y6=1", "Y6 (m6)"],
                    [1, 1, 1, 0, 1, "All 0", "Y7=1", "Y7 (m7)"]
                  ].map(([ra, rb, rc, e1, e2, d1Out, d2Out, act], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">{ra}</td>
                      <td className="p-2.5 border-r border-slate-800">{rb}</td>
                      <td className="p-2.5 border-r border-slate-800">{rc}</td>
                      <td className="p-2.5 border-r border-slate-800 text-amber-400">{e1}</td>
                      <td className="p-2.5 border-r border-slate-800 text-amber-400">{e2}</td>
                      <td className="p-2.5 border-r border-slate-800 text-indigo-300">{d1Out}</td>
                      <td className="p-2.5 border-r border-slate-800 text-purple-300">{d2Out}</td>
                      <td className="p-2.5 text-slate-300 font-sans text-left pl-3">{act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CASCADING SCHEMATICS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. Cascaded Schematic Diagram
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 320" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Input Rails B and C */}
                <line x1="80" y1="40" x2="80" y2="280" stroke="#06b6d4" strokeWidth="2" />
                <text x="80" y="28" fill="#06b6d4" fontWeight="bold" textAnchor="middle">B</text>

                <line x1="140" y1="40" x2="140" y2="280" stroke="#06b6d4" strokeWidth="2" />
                <text x="140" y="28" fill="#06b6d4" fontWeight="bold" textAnchor="middle">C</text>

                {/* Input Rail A with Inverter */}
                <line x1="200" y1="40" x2="200" y2="280" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="200" y="28" fill="#fbbf24" fontWeight="bold" textAnchor="middle">A</text>

                {/* Inverter on A for Dec 1 */}
                <circle cx="200" cy="80" r="4" fill="#f59e0b" />
                <line x1="200" y1="80" x2="240" y2="80" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="240,73 260,80 240,87" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="264" cy="80" r="3.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="268" y1="80" x2="320" y2="80" stroke="#f59e0b" strokeWidth="2" />
                <text x="285" y="74" fill="#fbbf24" fontSize="10">{"A'"}</text>

                {/* Direct line from A to Dec 2 */}
                <circle cx="200" cy="220" r="4" fill="#f59e0b" />
                <line x1="200" y1="220" x2="320" y2="220" stroke="#f59e0b" strokeWidth="2" />
                <text x="250" y="214" fill="#fbbf24" fontSize="10">A</text>

                {/* DECODER 1 (UPPER) */}
                <g transform="translate(320, 40)">
                  <rect x="0" y="0" width="180" height="110" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="90" y="25" fill="#ffffff" fontWeight="bold" textAnchor="middle">2:4 DECODER 1</text>
                  <text x="20" y="45" fill="#fbbf24" fontSize="10">E</text>
                  <text x="20" y="75" fill="#06b6d4" fontSize="10">B C</text>

                  {/* Outputs Y0-Y3 */}
                  {[0, 1, 2, 3].map((i) => (
                    <g key={i}>
                      <line x1="180" y1={30 + i * 20} x2="260" y2={30 + i * 20} stroke="#c084fc" strokeWidth="2" />
                      <text x="275" y={34 + i * 20} fill="#c084fc" fontWeight="bold">Y{i}</text>
                    </g>
                  ))}
                </g>

                {/* DECODER 2 (LOWER) */}
                <g transform="translate(320, 180)">
                  <rect x="0" y="0" width="180" height="110" rx="10" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                  <text x="90" y="25" fill="#ffffff" fontWeight="bold" textAnchor="middle">2:4 DECODER 2</text>
                  <text x="20" y="45" fill="#fbbf24" fontSize="10">E</text>
                  <text x="20" y="75" fill="#06b6d4" fontSize="10">B C</text>

                  {/* Outputs Y4-Y7 */}
                  {[4, 5, 6, 7].map((i, idx) => (
                    <g key={i}>
                      <line x1="180" y1={30 + idx * 20} x2="260" y2={30 + idx * 20} stroke="#c084fc" strokeWidth="2" />
                      <text x="275" y={34 + idx * 20} fill="#c084fc" fontWeight="bold">Y{i}</text>
                    </g>
                  ))}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Dual Decoder Cascading Simulator</h2>
              <p className="text-xs text-slate-400">Toggle MSB A to switch active chip between Decoder 1 and Decoder 2</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setA(!a)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  a ? "bg-amber-500 text-slate-950 border-amber-300" : "bg-cyan-500 text-slate-950 border-cyan-300"
                )}
              >
                MSB A (Selector): {a ? "1 (Decoder 2)" : "0 (Decoder 1)"}
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
                Input C: {c ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className={clsx("p-4 rounded-xl border", dec1Enabled ? "bg-cyan-950/40 border-cyan-500" : "bg-slate-950 border-slate-800 opacity-60")}>
                <div className="text-xs font-mono text-cyan-400 font-bold">Decoder 1 (Y0-Y3) {dec1Enabled ? "• ENABLED" : "• DISABLED"}</div>
                <div className="grid grid-cols-4 gap-2 pt-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 font-mono text-xs">
                      Y{i}: <span className={outputs[i] ? "text-cyan-300 font-bold" : "text-slate-600"}>{outputs[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={clsx("p-4 rounded-xl border", dec2Enabled ? "bg-purple-950/40 border-purple-500" : "bg-slate-950 border-slate-800 opacity-60")}>
                <div className="text-xs font-mono text-purple-400 font-bold">Decoder 2 (Y4-Y7) {dec2Enabled ? "• ENABLED" : "• DISABLED"}</div>
                <div className="grid grid-cols-4 gap-2 pt-3">
                  {[4, 5, 6, 7].map((i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 font-mono text-xs">
                      Y{i}: <span className={outputs[i] ? "text-purple-300 font-bold" : "text-slate-600"}>{outputs[i]}</span>
                    </div>
                  ))}
                </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Cascading Decoders</h2>
              <p className="text-xs text-slate-400">Guaranteed 4-mark design question in Section A</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Crucial Wiring Detail</div>
            <p className="text-slate-300 leading-relaxed">
              In your examination sketch, ensure that the inverter is placed on input A connected to the Enable of Decoder 1, while input A connects DIRECTLY to the Enable of Decoder 2. Inverting Decoder 2 instead will reverse the minterms and lose marks!
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="This cascading tree is a favorite question of CISCE paper setters. It tests whether you understand that higher-order addresses simply steer enable pins on lower-order memory decoders!" />
      </section>
    </div>
  );
};

export default Topic17;
