import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputCin, setInputCin] = useState(false);

  const a = inputA ? 1 : 0;
  const b = inputB ? 1 : 0;
  const cin = inputCin ? 1 : 0;

  const sum = a ^ b ^ cin;
  const cout = (a && b) || (b && cin) || (a && cin) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Full Adder: 3-Bit Addition, Truth Table &amp; Logic Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Binary 3-Bit Addition with Carry-in: Sum (A ⊕ B ⊕ Cin) and Carry-out (AB + BCin + ACin)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & K-Map" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Adder Architecture</h2>
              <p className="text-xs text-slate-400">Complete 3-bit binary adder with carry-in capability</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Full Adder</strong> is a combinational arithmetic circuit that performs the arithmetic sum of <strong className="text-indigo-300">three 1-bit binary numbers</strong>: two significant operand bits <strong className="text-indigo-300">A</strong> and <strong className="text-indigo-300">B</strong>, and an incoming carry bit <strong className="text-cyan-300">Cin</strong> from the previous lower-order bit position.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              It produces two outputs: a <strong className="text-purple-300">Sum (S)</strong> bit and a <strong className="text-emerald-300">Carry-out (Cout)</strong> bit. By chaining $N$ Full Adders together, an $N$-bit parallel adder (Ripple Carry Adder) can add numbers of arbitrary word width.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations &amp; K-Map Derivations</h2>
              <p className="text-xs text-slate-400">Canonical SOP and minimized majority functions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase font-mono">Sum (S) Equation</div>
              <p className="text-xs text-slate-400">Sum = Σm(1, 2, 4, 7). Evaluates odd parity across all three inputs:</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-purple-300 font-bold">
                Sum = A ⊕ B ⊕ Cin
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase font-mono">Carry-out (Cout) Equation</div>
              <p className="text-xs text-slate-400">Cout = Σm(3, 5, 6, 7). Minimized via 3-variable Karnaugh Map:</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-sm text-emerald-300 font-bold">
                Cout = AB + BCin + ACin
              </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Adder Truth Table &amp; Circuit Schematics</h2>
              <p className="text-xs text-slate-400">Complete 8-row truth table, block diagram, and gate-level circuit</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Full Adder Complete Truth Table (8 States)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">Cin</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Sum (A⊕B⊕Cin)</th>
                    <th className="p-2.5 text-emerald-400 border-r border-slate-800">Cout (Carry-out)</th>
                    <th className="p-2.5 text-slate-400 text-left pl-4 font-sans">Decimal Arithmetic Sum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, 0, "0 + 0 + 0 = 00"],
                    [0, 0, 1, 1, 0, "0 + 0 + 1 = 01"],
                    [0, 1, 0, 1, 0, "0 + 1 + 0 = 01"],
                    [0, 1, 1, 0, 1, "0 + 1 + 1 = 10 (2)"],
                    [1, 0, 0, 1, 0, "1 + 0 + 0 = 01"],
                    [1, 0, 1, 0, 1, "1 + 0 + 1 = 10 (2)"],
                    [1, 1, 0, 0, 1, "1 + 1 + 0 = 10 (2)"],
                    [1, 1, 1, 1, 1, "1 + 1 + 1 = 11 (3)"]
                  ].map(([ra, rb, rcin, rs, rc, note], idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800">{ra}</td>
                      <td className="p-2.5 border-r border-slate-800">{rb}</td>
                      <td className="p-2.5 border-r border-slate-800">{rcin}</td>
                      <td className={clsx("p-2.5 border-r border-slate-800 font-bold", rs === 1 ? "text-purple-400 bg-purple-500/10" : "text-slate-500")}>{rs}</td>
                      <td className={clsx("p-2.5 border-r border-slate-800 font-bold", rc === 1 ? "text-emerald-400 bg-emerald-500/10" : "text-slate-500")}>{rc}</td>
                      <td className="p-2.5 text-slate-400 text-left pl-4 font-sans">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; Gate-Level Logic Circuit
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 280" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM (LEFT) */}
                <g transform="translate(30, 40)">
                  <rect x="0" y="0" width="220" height="200" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <text x="110" y="32" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">FULL ADDER (FA)</text>

                  {/* Inputs */}
                  <line x1="-30" y1="60" x2="0" y2="60" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="64" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">A</text>

                  <line x1="-30" y1="110" x2="0" y2="110" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="114" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">B</text>

                  <line x1="-30" y1="160" x2="0" y2="160" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-38" y="164" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">Cin</text>

                  {/* Outputs */}
                  <line x1="220" y1="80" x2="260" y2="80" stroke="#c084fc" strokeWidth="2.5" />
                  <polygon points="260,76 272,80 260,84" fill="#c084fc" />
                  <text x="280" y="84" fill="#c084fc" fontWeight="bold" fontSize="13">Sum</text>

                  <line x1="220" y1="140" x2="260" y2="140" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="260,136 272,140 260,144" fill="#10b981" />
                  <text x="280" y="144" fill="#10b981" fontWeight="bold" fontSize="13">Cout</text>
                </g>

                {/* GATE LEVEL CIRCUIT (RIGHT) */}
                <g transform="translate(370, 20)">
                  {/* Rails */}
                  <line x1="30" y1="30" x2="30" y2="240" stroke="#06b6d4" strokeWidth="2" />
                  <text x="30" y="20" fill="#06b6d4" fontWeight="bold" fontSize="12" textAnchor="middle">A</text>

                  <line x1="70" y1="30" x2="70" y2="240" stroke="#818cf8" strokeWidth="2" />
                  <text x="70" y="20" fill="#818cf8" fontWeight="bold" fontSize="12" textAnchor="middle">B</text>

                  <line x1="110" y1="30" x2="110" y2="240" stroke="#38bdf8" strokeWidth="2" />
                  <text x="110" y="20" fill="#38bdf8" fontWeight="bold" fontSize="12" textAnchor="middle">Cin</text>

                  {/* 3-Input XOR Gate for Sum */}
                  <circle cx="30" cy="50" r="4" fill="#06b6d4" />
                  <line x1="30" y1="50" x2="180" y2="50" stroke="#06b6d4" strokeWidth="1.5" />
                  <circle cx="70" cy="65" r="4" fill="#818cf8" />
                  <line x1="70" y1="65" x2="180" y2="65" stroke="#818cf8" strokeWidth="1.5" />
                  <circle cx="110" cy="80" r="4" fill="#38bdf8" />
                  <line x1="110" y1="80" x2="180" y2="80" stroke="#38bdf8" strokeWidth="1.5" />

                  <g transform="translate(180, 40)">
                    <path d="M -8,10 Q 17,25 -8,55" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
                    <text x="18" y="36" fill="#f5d0fe" fontSize="9" fontWeight="bold">3-XOR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#a855f7" strokeWidth="2.5" />
                    <polygon points="130,28.5 142,32.5 130,36.5" fill="#a855f7" />
                    <text x="150" y="37" fill="#c084fc" fontWeight="bold" fontSize="13">Sum = A⊕B⊕Cin</text>
                  </g>

                  {/* Carry Network: AND-OR */}
                  <g transform="translate(180, 115)">
                    {/* AND 1 (AB) */}
                    <rect x="0" y="0" width="35" height="28" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                    <text x="17" y="18" fill="#10b981" fontSize="9" textAnchor="middle">AB</text>

                    {/* AND 2 (BCin) */}
                    <rect x="0" y="35" width="35" height="28" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                    <text x="17" y="53" fill="#10b981" fontSize="9" textAnchor="middle">BCin</text>

                    {/* AND 3 (ACin) */}
                    <rect x="0" y="70" width="35" height="28" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                    <text x="17" y="88" fill="#10b981" fontSize="9" textAnchor="middle">ACin</text>

                    {/* Final OR */}
                    <path d="M 70,25 Q 90,45 70,85 Q 105,85 125,55 Q 105,25 70,25 Z" fill="#1e1b4b" stroke="#10b981" strokeWidth="2" />
                    <line x1="35" y1="14" x2="75" y2="35" stroke="#10b981" strokeWidth="1.5" />
                    <line x1="35" y1="49" x2="80" y2="55" stroke="#10b981" strokeWidth="1.5" />
                    <line x1="35" y1="84" x2="75" y2="75" stroke="#10b981" strokeWidth="1.5" />

                    <line x1="125" y1="55" x2="170" y2="55" stroke="#10b981" strokeWidth="2.5" />
                    <polygon points="170,51 182,55 170,59" fill="#10b981" />
                    <text x="190" y="60" fill="#34d399" fontWeight="bold" fontSize="13">Cout</text>
                  </g>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Full Adder Signal Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle inputs A, B, and Cin to observe 3-bit addition evaluation</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setInputA(!inputA)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputA ? "bg-cyan-500 text-slate-950 border-cyan-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input A: {inputA ? "1 (HIGH)" : "0 (LOW)"}
              </button>
              <button
                onClick={() => setInputB(!inputB)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputB ? "bg-purple-500 text-white border-purple-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input B: {inputB ? "1 (HIGH)" : "0 (LOW)"}
              </button>
              <button
                onClick={() => setInputCin(!inputCin)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputCin ? "bg-emerald-500 text-slate-950 border-emerald-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Input Cin: {inputCin ? "1 (HIGH)" : "0 (LOW)"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-purple-400 uppercase font-bold">Sum Output (3-XOR)</div>
                <div className={clsx("text-4xl font-extrabold font-mono", sum === 1 ? "text-purple-400" : "text-slate-600")}>
                  Sum = {sum}
                </div>
                <div className="text-[11px] font-mono text-slate-400">{a} ⊕ {b} ⊕ {cin} = {sum}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Carry-out Output</div>
                <div className={clsx("text-4xl font-extrabold font-mono", cout === 1 ? "text-emerald-400" : "text-slate-600")}>
                  Cout = {cout}
                </div>
                <div className="text-[11px] font-mono text-slate-400">Majority: {a}&#183;{b} + {b}&#183;{cin} + {a}&#183;{cin} = {cout}</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Full Adder</h2>
              <p className="text-xs text-slate-400">Critical scoring guidelines for CISCE examination papers</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">High Frequency 4-Mark Question</div>
            <p className="text-slate-300 leading-relaxed">
              Questions frequently ask to "Derive the logic circuit and truth table of a Full Adder". Always write down the minterm expansion Sum = Σ(1, 2, 4, 7) and Cout = Σ(3, 5, 6, 7). Show the K-map for Cout to prove Cout = AB + BCin + ACin.
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="A Full Adder is essentially two Half Adders joined by an OR gate. Remember that the Carry output is known as the 'Majority Function'—whenever at least two of the three inputs are 1, Cout is guaranteed to be 1!" />
      </section>
    </div>
  );
};

export default Topic3;
