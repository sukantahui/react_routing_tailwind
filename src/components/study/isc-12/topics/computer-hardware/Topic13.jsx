import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic13 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [enable, setEnable] = useState(true);
  const [inA, setInA] = useState(false);
  const [inB, setInB] = useState(false);

  const code = (inA ? 2 : 0) + (inB ? 1 : 0);
  const y0 = enable && !inA && !inB ? 1 : 0;
  const y1 = enable && !inA && inB ? 1 : 0;
  const y2 = enable && inA && !inB ? 1 : 0;
  const y3 = enable && inA && inB ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 13
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Decoders: Definition, Operating Principle &amp; Line Expansion
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Binary Line Expansion: n Inputs Converted to 2^n Unique Minterm Outputs using Logic Gates and Enable (E) Control
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Minterms" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Decoder Inspector" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">What is a Decoder?</h2>
              <p className="text-xs text-slate-400">Fundamental combinational device for binary line expansion</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4">
            <p>
              A <strong className="text-cyan-400">Decoder</strong> is a combinational logic circuit that converts an <span className="text-white font-mono font-semibold">n-bit</span> binary code at its input into a maximum of <span className="text-emerald-400 font-mono font-semibold">2^n</span> unique output lines. For each unique combination of inputs, exactly <strong className="text-white">one and only one output line is activated</strong>, while all other output lines remain inactive.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Architectural Formula</div>
                <div className="text-lg font-mono font-extrabold text-white">n Inputs → 2^n Outputs</div>
                <p className="text-xs text-slate-400">
                  For example, 2 inputs generate 4 outputs (2:4 decoder), 3 inputs produce 8 outputs (3:8 decoder), and 4 inputs yield 16 outputs (4:16 decoder).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Role of Enable Line (E)</div>
                <div className="text-lg font-mono font-extrabold text-white">Master Chip Select</div>
                <p className="text-xs text-slate-400">
                  When Enable E = 0 (for Active-HIGH), the decoder is completely disabled and all outputs remain inactive (0), regardless of the binary address applied.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-2 text-indigo-200">
              <span className="font-bold text-indigo-300">Why is a Decoder called a Universal Minterm Generator?</span>
              <p>
                Each output of an active-HIGH decoder corresponds precisely to one standard fundamental product term (minterm). Output Y0 = m0 = A&apos;B&apos;, Y1 = m1 = A&apos;B, Y2 = m2 = AB&apos;, Y3 = m3 = AB. Hence, ANY Boolean expression in SOP form can be synthesized simply by OR-ing the respective decoder outputs!
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Derivations &amp; Minterm Equations</h2>
              <p className="text-xs text-slate-400">Mathematical representation of 2-to-4 line decoding</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Let the input variables be <span className="text-cyan-300 font-mono">A</span> (MSB) and <span className="text-cyan-300 font-mono">B</span> (LSB), with <span className="text-amber-300 font-mono">E</span> as Active-HIGH Enable.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs text-slate-400 font-mono">Output Y0 (Minterm m0)</div>
                <div className="text-base font-mono font-bold text-emerald-400">Y0 = E · A&apos; · B&apos;</div>
                <p className="text-xs text-slate-400">Active when E=1, A=0, B=0</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs text-slate-400 font-mono">Output Y1 (Minterm m1)</div>
                <div className="text-base font-mono font-bold text-emerald-400">Y1 = E · A&apos; · B</div>
                <p className="text-xs text-slate-400">Active when E=1, A=0, B=1</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs text-slate-400 font-mono">Output Y2 (Minterm m2)</div>
                <div className="text-base font-mono font-bold text-emerald-400">Y2 = E · A · B&apos;</div>
                <p className="text-xs text-slate-400">Active when E=1, A=1, B=0</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs text-slate-400 font-mono">Output Y3 (Minterm m3)</div>
                <div className="text-base font-mono font-bold text-emerald-400">Y3 = E · A · B</div>
                <p className="text-xs text-slate-400">Active when E=1, A=1, B=1</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <div className="text-cyan-400 font-bold mb-1">General n-Input Decoder Formula:</div>
              <div>Yi = E · mi  (where mi is the i-th minterm for binary index i, 0 ≤ i ≤ 2^n - 1)</div>
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
              <p className="text-xs text-slate-400">Complete input-output mapping and gate-level realization</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 2-to-4 Line Decoder Truth Table (Active-HIGH Enable)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">Enable (E)</th>
                    <th className="p-3 text-indigo-400 font-bold">A (MSB)</th>
                    <th className="p-3 text-indigo-400 font-bold">B (LSB)</th>
                    <th className="p-3 text-emerald-400 font-bold">Y0 (m0)</th>
                    <th className="p-3 text-emerald-400 font-bold">Y1 (m1)</th>
                    <th className="p-3 text-emerald-400 font-bold">Y2 (m2)</th>
                    <th className="p-3 text-emerald-400 font-bold">Y3 (m3)</th>
                    <th className="p-3 text-cyan-400 font-bold">Active Output</th>
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
                    <td className="p-3 text-rose-400 font-semibold">None (Disabled)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">Y0 active (00)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">Y1 active (01)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-200">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-semibold">Y2 active (10)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-200">1</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-slate-400">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1</td>
                    <td className="p-3 text-emerald-400 font-semibold">Y3 active (11)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG 1: BLOCK DIAGRAM */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Standard Block Diagram (2-to-4 Decoder with Enable)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 520 220" className="w-full max-w-lg h-auto select-none font-mono text-xs">
                {/* Inputs */}
                <line x1="60" y1="70" x2="170" y2="70" stroke="#818cf8" strokeWidth="2" />
                <circle cx="60" cy="70" r="4" fill="#818cf8" />
                <text x="30" y="74" fill="#c7d2fe" fontWeight="bold">A</text>

                <line x1="60" y1="120" x2="170" y2="120" stroke="#818cf8" strokeWidth="2" />
                <circle cx="60" cy="120" r="4" fill="#818cf8" />
                <text x="30" y="124" fill="#c7d2fe" fontWeight="bold">B</text>

                {/* Enable */}
                <line x1="245" y1="190" x2="245" y2="160" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="245" cy="190" r="4" fill="#f59e0b" />
                <text x="240" y="210" fill="#fcd34d" textAnchor="middle" fontWeight="bold">E (Enable)</text>

                {/* Decoder Chip */}
                <rect x="170" y="40" width="150" height="120" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="245" y="85" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="14">2-to-4</text>
                <text x="245" y="105" fill="#a5b4fc" textAnchor="middle" fontSize="11">DECODER</text>
                <text x="245" y="125" fill="#94a3b8" textAnchor="middle" fontSize="9">(Active-HIGH)</text>

                {/* Outputs */}
                <line x1="320" y1="55" x2="430" y2="55" stroke="#10b981" strokeWidth="2" />
                <circle cx="430" cy="55" r="4" fill="#10b981" />
                <text x="445" y="59" fill="#6ee7b7" fontWeight="bold">Y0 (A&apos;B&apos;)</text>

                <line x1="320" y1="85" x2="430" y2="85" stroke="#10b981" strokeWidth="2" />
                <circle cx="430" cy="85" r="4" fill="#10b981" />
                <text x="445" y="89" fill="#6ee7b7" fontWeight="bold">Y1 (A&apos;B)</text>

                <line x1="320" y1="115" x2="430" y2="115" stroke="#10b981" strokeWidth="2" />
                <circle cx="430" cy="115" r="4" fill="#10b981" />
                <text x="445" y="119" fill="#6ee7b7" fontWeight="bold">Y2 (AB&apos;)</text>

                <line x1="320" y1="145" x2="430" y2="145" stroke="#10b981" strokeWidth="2" />
                <circle cx="430" cy="145" r="4" fill="#10b981" />
                <text x="445" y="149" fill="#6ee7b7" fontWeight="bold">Y3 (AB)</text>
              </svg>
            </div>
          </div>

          {/* VECTOR SVG 2: GATE-LEVEL CIRCUIT */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              3. Gate-Level Circuit Schematic (2 NOT Gates + 4 AND Gates)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 740 320" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Input A */}
                <text x="50" y="25" fill="#818cf8" fontWeight="bold">A</text>
                <line x1="55" y1="35" x2="55" y2="290" stroke="#818cf8" strokeWidth="2" />

                {/* NOT Gate A */}
                <line x1="55" y1="60" x2="80" y2="60" stroke="#818cf8" strokeWidth="2" />
                <polygon points="80,50 105,60 80,70" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="110" cy="60" r="4" fill="#020617" stroke="#818cf8" strokeWidth="1.5" />
                <line x1="114" y1="60" x2="130" y2="60" stroke="#818cf8" strokeWidth="2" />
                <line x1="130" y1="60" x2="130" y2="290" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="122" y="25" fill="#a5b4fc">A&apos;</text>

                {/* Input B */}
                <text x="180" y="25" fill="#38bdf8" fontWeight="bold">B</text>
                <line x1="185" y1="35" x2="185" y2="290" stroke="#38bdf8" strokeWidth="2" />

                {/* NOT Gate B */}
                <line x1="185" y1="60" x2="210" y2="60" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="210,50 235,60 210,70" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="240" cy="60" r="4" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="244" y1="60" x2="260" y2="60" stroke="#38bdf8" strokeWidth="2" />
                <line x1="260" y1="60" x2="260" y2="290" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="252" y="25" fill="#7dd3fc">B&apos;</text>

                {/* Enable Bus E */}
                <text x="300" y="25" fill="#f59e0b" fontWeight="bold">E</text>
                <line x1="305" y1="35" x2="305" y2="290" stroke="#f59e0b" strokeWidth="2" />

                {/* AND Gate 0 (Y0 = E * A' * B') */}
                <circle cx="130" cy="90" r="3.5" fill="#818cf8" />
                <line x1="130" y1="90" x2="450" y2="90" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="260" cy="98" r="3.5" fill="#38bdf8" />
                <line x1="260" y1="98" x2="450" y2="98" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="106" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="106" x2="450" y2="106" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,80 L 475,80 A 18,18 0 0,1 475,116 L 450,116 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="98" x2="600" y2="98" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="98" r="4" fill="#10b981" />
                <text x="615" y="102" fill="#6ee7b7" fontWeight="bold">Y0 = E·A&apos;·B&apos;</text>

                {/* AND Gate 1 (Y1 = E * A' * B) */}
                <circle cx="130" cy="145" r="3.5" fill="#818cf8" />
                <line x1="130" y1="145" x2="450" y2="145" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="153" r="3.5" fill="#38bdf8" />
                <line x1="185" y1="153" x2="450" y2="153" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="161" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="161" x2="450" y2="161" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,135 L 475,135 A 18,18 0 0,1 475,171 L 450,171 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="153" x2="600" y2="153" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="153" r="4" fill="#10b981" />
                <text x="615" y="157" fill="#6ee7b7" fontWeight="bold">Y1 = E·A&apos;·B</text>

                {/* AND Gate 2 (Y2 = E * A * B') */}
                <circle cx="55" cy="200" r="3.5" fill="#818cf8" />
                <line x1="55" y1="200" x2="450" y2="200" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="260" cy="208" r="3.5" fill="#38bdf8" />
                <line x1="260" y1="208" x2="450" y2="208" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="216" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="216" x2="450" y2="216" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,190 L 475,190 A 18,18 0 0,1 475,226 L 450,226 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="208" x2="600" y2="208" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="208" r="4" fill="#10b981" />
                <text x="615" y="212" fill="#6ee7b7" fontWeight="bold">Y2 = E·A·B&apos;</text>

                {/* AND Gate 3 (Y3 = E * A * B) */}
                <circle cx="55" cy="255" r="3.5" fill="#818cf8" />
                <line x1="55" y1="255" x2="450" y2="255" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="263" r="3.5" fill="#38bdf8" />
                <line x1="185" y1="263" x2="450" y2="263" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="271" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="271" x2="450" y2="271" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,245 L 475,245 A 18,18 0 0,1 475,281 L 450,281 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="263" x2="600" y2="263" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="263" r="4" fill="#10b981" />
                <text x="615" y="267" fill="#6ee7b7" fontWeight="bold">Y3 = E·A·B</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Decoder Signal Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle Enable and address lines to observe real-time line expansion</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Chip Control:</span>
                <button
                  onClick={() => setEnable(!enable)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    enable
                      ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  Enable (E) = {enable ? "1 (HIGH)" : "0 (LOW)"}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Address Inputs:</span>
                <button
                  onClick={() => setInA(!inA)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    inA
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  A (MSB) = {inA ? "1" : "0"}
                </button>
                <button
                  onClick={() => setInB(!inB)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                    inB
                      ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  B (LSB) = {inB ? "1" : "0"}
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { label: "Y0 (00)", val: y0, term: "A'B'" },
                { label: "Y1 (01)", val: y1, term: "A'B" },
                { label: "Y2 (10)", val: y2, term: "AB'" },
                { label: "Y3 (11)", val: y3, term: "AB" }
              ].map((out, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-4 rounded-xl border text-center transition-all",
                    out.val === 1
                      ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-900/40 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="text-xs font-mono mb-1 text-slate-400">Output {out.label}</div>
                  <div
                    className={clsx(
                      "text-2xl font-mono font-black mb-1",
                      out.val === 1 ? "text-emerald-400 animate-pulse" : "text-slate-600"
                    )}
                  >
                    {out.val}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">m{idx} = {out.term}</div>
                  <div className="text-[10px] mt-1">
                    {out.val === 1 ? (
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">● ACTIVE</span>
                    ) : (
                      <span className="text-slate-600 font-semibold">INACTIVE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Input Binary Code: </span>
                <span className="font-mono font-bold text-indigo-400">{inA ? "1" : "0"}{inB ? "1" : "0"}₂</span>
                <span className="text-slate-400 ml-2">(= Decimal {code})</span>
              </div>
              <div>
                <span className="text-slate-400">Active Minterm: </span>
                <span className="font-mono font-bold text-emerald-400">
                  {!enable ? "None (Chip Disabled)" : ("Y" + code + " (m" + code + ")")}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus &amp; Examiner Guidelines</h2>
              <p className="text-xs text-slate-400">Common CISCE question formats, marking keys, and pitfalls</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">1. Standard Board Question Format (2 to 4 Marks)</div>
              <p>
                <em className="text-slate-200">&quot;What is a decoder? Draw the truth table and logic circuit diagram for a 2-to-4 line binary decoder using basic AND gates.&quot;</em>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>1 Mark: Precise definition (mention <strong className="text-white">n inputs to maximum 2^n outputs</strong>).</li>
                <li>1 Mark: Correct truth table with all 4 binary states plus Enable row.</li>
                <li>2 Marks: Clean schematic showing 2 NOT gates producing complementary rails, feeding 4 AND gates.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2 text-rose-200">
              <div className="font-bold text-rose-300 uppercase tracking-wider">2. Common Pitfalls &amp; Mistakes to Avoid</div>
              <ul className="list-disc list-inside space-y-1 text-rose-300/90">
                <li><strong>Confusing MSB and LSB:</strong> Ensure A is MSB and B is LSB. A=1, B=0 corresponds to Y2 (10₂ = 2), not Y1!</li>
                <li><strong>Omitting the Enable line:</strong> If the question asks for an Enable pin, don&apos;t forget to connect E to all 4 AND gates.</li>
                <li><strong>Mixing up Decoder and Demultiplexer:</strong> A decoder converts an n-bit address into 2^n lines. A DEMUX takes a <em>single data input</em> and routes it to 2^n output lines using selection bits.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER'S NOTE */}
      <Teacher
        topicId="topic-13-decoders"
        headline="Sukanta Hui's Board Tip on Decoders"
        note="Decoders are one of the most reliable scoring questions in ISC Computer Science Section A! Always remember: a 2-to-4 decoder produces standard minterms (m0 to m3). In board exams, CISCE frequently asks you to synthesize Full Adder sum or carry using a 3:8 decoder plus OR gates. The moment you master how each output wire represents a minterm, those 5-mark design questions become effortless!"
      />
    </div>
  );
};

export default Topic13;
