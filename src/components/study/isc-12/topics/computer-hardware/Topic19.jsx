import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic19 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [cin, setCin] = useState(false);

  // Full Adder realization using 3:8 Decoder:
  // Sum = Σ(1, 2, 4, 7)
  // Carry = Σ(3, 5, 6, 7)
  const minterm = (a ? 4 : 0) + (b ? 2 : 0) + (cin ? 1 : 0);
  const sum = [1, 2, 4, 7].includes(minterm) ? 1 : 0;
  const carry = [3, 5, 6, 7].includes(minterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 19
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Decoder as a Universal Minterm Generator
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Realizing Arbitrary Boolean Functions: Implementing Full Adder Sum Σ(1, 2, 4, 7) and Carry Σ(3, 5, 6, 7) using 3:8 Decoder &amp; OR Gates
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Minterm Function Synthesis" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Minterm Realizer" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Universal Function Realization</h2>
              <p className="text-xs text-slate-400">Why decoders can implement ANY combinational Boolean function</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              Every Boolean function can be expressed as a canonical Sum of Products (SOP)—which is simply the OR sum of its minterms.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Since an <strong className="text-cyan-300">$n$-to-$2^n$ decoder</strong> generates all $2^n$ possible minterms simultaneously, <strong className="text-emerald-300">any arbitrary Boolean function can be synthesized simply by feeding the required minterm outputs into an OR gate</strong>!
            </p>
            <p className="text-xs text-slate-400">
              For example, a complete Full Adder can be constructed using just <strong>one 3-to-8 decoder</strong> and <strong>two OR gates</strong>!
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Adder Minterm Equations</h2>
              <p className="text-xs text-slate-400">Mapping Full Adder onto 3:8 decoder outputs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Sum Output (S)</span>
              <div className="text-purple-300 font-bold text-sm">Sum = Σm(1, 2, 4, 7) = Y1 + Y2 + Y4 + Y7</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Carry Output (Cout)</span>
              <div className="text-emerald-300 font-bold text-sm">Cout = Σm(3, 5, 6, 7) = Y3 + Y5 + Y6 + Y7</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Decoder Realization Schematic</h2>
              <p className="text-xs text-slate-400">Full Adder truth table and 3:8 decoder with two OR gates</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Full Adder Truth Table &amp; Minterm Map
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">Cin</th>
                    <th className="p-2.5 text-amber-400 border-r border-slate-800">Minterm Line</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Sum (OR Gate 1)</th>
                    <th className="p-2.5 text-emerald-400">Carry (OR Gate 2)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, "m0 (Y0)", 0, 0],
                    [0, 0, 1, "m1 (Y1)", 1, 0],
                    [0, 1, 0, "m2 (Y2)", 1, 0],
                    [0, 1, 1, "m3 (Y3)", 0, 1],
                    [1, 0, 0, "m4 (Y4)", 1, 0],
                    [1, 0, 1, "m5 (Y5)", 0, 1],
                    [1, 1, 0, "m6 (Y6)", 0, 1],
                    [1, 1, 1, "m7 (Y7)", 1, 1]
                  ].map(([ra, rb, rcin, mline, rsum, rcarry], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800">{ra}</td>
                      <td className="p-2.5 border-r border-slate-800">{rb}</td>
                      <td className="p-2.5 border-r border-slate-800">{rcin}</td>
                      <td className="p-2.5 border-r border-slate-800 text-amber-400 font-bold">{mline}</td>
                      <td className={clsx("p-2.5 border-r border-slate-800 font-bold", rsum ? "text-purple-400 bg-purple-500/10" : "text-slate-600")}>{rsum}</td>
                      <td className={clsx("p-2.5 font-bold", rcarry ? "text-emerald-400 bg-emerald-500/10" : "text-slate-600")}>{rcarry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Full Adder Implementation using 3:8 Decoder &amp; Two OR Gates
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 280" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* 3 Inputs on left */}
                <line x1="40" y1="80" x2="160" y2="80" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="30" y="84" fill="#06b6d4" fontWeight="bold">A</text>

                <line x1="40" y1="130" x2="160" y2="130" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="30" y="134" fill="#06b6d4" fontWeight="bold">B</text>

                <line x1="40" y1="180" x2="160" y2="180" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="30" y="184" fill="#06b6d4" fontWeight="bold">Cin</text>

                {/* 3:8 Decoder Block */}
                <rect x="160" y="40" width="200" height="190" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="260" y="90" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">3:8 DECODER</text>
                <text x="260" y="115" fill="#a5b4fc" fontSize="10" textAnchor="middle">Minterm Generator</text>

                {/* Decoder Output Lines Y0-Y7 */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={i}>
                    <line x1="360" y1={55 + i * 22} x2="480" y2={55 + i * 22} stroke="#64748b" strokeWidth="1.5" />
                    <text x="375" y={52 + i * 22} fill="#94a3b8" fontSize="9">Y{i}</text>
                  </g>
                ))}

                {/* OR Gate 1 for Sum (Y1, Y2, Y4, Y7) */}
                <g transform="translate(560, 60)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="22" y="36" fill="#f5d0fe" fontSize="10" fontWeight="bold">OR</text>
                  <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                  <polygon points="130,28.5 142,32.5 130,36.5" fill="#a855f7" />
                  <text x="150" y="37" fill="#c084fc" fontWeight="bold" fontSize="14">Sum = Σ(1,2,4,7)</text>
                </g>

                {/* OR Gate 2 for Carry (Y3, Y5, Y6, Y7) */}
                <g transform="translate(560, 160)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#10b981" strokeWidth="2.5" />
                  <text x="22" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold">OR</text>
                  <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="130,28.5 142,32.5 130,36.5" fill="#10b981" />
                  <text x="150" y="37" fill="#34d399" fontWeight="bold" fontSize="14">Carry = Σ(3,5,6,7)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Full Adder Minterm Synthesizer</h2>
              <p className="text-xs text-slate-400">Toggle inputs to observe how the active minterm evaluates through the OR gates</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setA(!a)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", a ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input A: {a ? "1" : "0"}
              </button>
              <button
                onClick={() => setB(!b)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", b ? "bg-indigo-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input B: {b ? "1" : "0"}
              </button>
              <button
                onClick={() => setCin(!cin)}
                className={clsx("px-4 py-2 rounded-xl font-mono font-bold transition-all border", cin ? "bg-purple-500 text-white" : "bg-slate-900 text-slate-400 border-slate-700")}
              >
                Input Cin: {cin ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-amber-400 uppercase">Active Decoder Minterm</div>
                <div className="text-3xl font-extrabold font-mono text-amber-300 py-1">Y{minterm} (m{minterm})</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-purple-400 uppercase">Sum Output (OR Gate 1)</div>
                <div className={clsx("text-3xl font-extrabold font-mono py-1", sum ? "text-purple-400" : "text-slate-600")}>
                  Sum = {sum}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-emerald-400 uppercase">Carry Output (OR Gate 2)</div>
                <div className={clsx("text-3xl font-extrabold font-mono py-1", carry ? "text-emerald-400" : "text-slate-600")}>
                  Carry = {carry}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Universal Decoder</h2>
              <p className="text-xs text-slate-400">Scoring rules for synthesizing Boolean functions</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Exam Drawing Rule</div>
            <p className="text-slate-300 leading-relaxed">
              When asked: "Implement Full Adder using a 3-to-8 decoder and basic gates", draw the 3:8 decoder block, clearly label outputs Y0 to Y7, and draw two 4-input OR gates. Connect lines 1, 2, 4, 7 to the first OR gate for Sum, and lines 3, 5, 6, 7 to the second OR gate for Carry!
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="This completes the Decoders module (Topics 13 to 19). The ability to realize any Boolean function using a decoder and OR gates demonstrates the true power of combinational MSI building blocks." />
      </section>
    </div>
  );
};

export default Topic19;
