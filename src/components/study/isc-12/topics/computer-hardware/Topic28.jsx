import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic28 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Selected minterms for 4-variable function F(A, B, C, D)
  // Default: F(A, B, C, D) = Σ(0, 1, 3, 4, 8, 9, 15)
  const [minterms, setMinterms] = useState([0, 1, 3, 4, 8, 9, 15]);

  const [valA, setValA] = useState(false);
  const [valB, setValB] = useState(false);
  const [valC, setValC] = useState(false);
  const [valD, setValD] = useState(false);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // 8-to-1 MUX Implementation Table:
  // Select lines: S2=A, S1=B, S0=C
  // Residual: D (Row 1: D'=0, Row 2: D=1)
  // Col k: m(2k) and m(2k+1)
  const getCol = (colIdx) => {
    const m0 = colIdx * 2;
    const m1 = colIdx * 2 + 1;
    const has0 = minterms.includes(m0);
    const has1 = minterms.includes(m1);
    if (!has0 && !has1) return { val: "0", desc: "Ground (0)" };
    if (has0 && has1) return { val: "1", desc: "Vcc (1)" };
    if (has0 && !has1) return { val: "D'", desc: "Inverted D" };
    return { val: "D", desc: "Direct D" };
  };

  const currentMinterm = (valA ? 8 : 0) + (valB ? 4 : 0) + (valC ? 2 : 0) + (valD ? 1 : 0);
  const currentOutput = minterms.includes(currentMinterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 28
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Realization of Boolean Functions using 8-to-1 Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Implementation Table Method for 4-Variable Functions F(A, B, C, D) using Select Lines S2=A, S1=B, S0=C and Residual D
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Implementation Table Method" },
              { id: "truthTable", label: "3. Implementation Table & Circuit" },
              { id: "interactive", label: "4. Dynamic Minterm Synthesizer" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">4-Variable Realization via 8:1 MUX</h2>
              <p className="text-xs text-slate-400">Implementing functions of 4 variables (16 minterms) with an 8-input selector</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              To implement any 4-variable function <span className="font-mono text-cyan-400 font-bold">F(A, B, C, D)</span> using an 8-to-1 Multiplexer:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Select Lines (3)</span>
                <div className="text-base font-mono font-bold text-white">S2=A, S1=B, S0=C</div>
                <p className="text-xs text-slate-400">Connected to the three most significant variables.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Residual Variable (1)</span>
                <div className="text-base font-mono font-bold text-white">Variable D</div>
                <p className="text-xs text-slate-400">Used to feed 0, 1, D, or D&apos; into inputs I0 to I7.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Output</span>
                <div className="text-base font-mono font-bold text-white">1 Pin Realization</div>
                <p className="text-xs text-slate-400">The MUX output Y produces the exact function F(A, B, C, D).</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">16-Minterm Implementation Table Mechanics</h2>
              <p className="text-xs text-slate-400">Dividing 16 minterms across 8 data channels</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              In an 8:1 MUX implementation table, row 1 holds even minterms (where D=0, hence <span className="font-mono text-cyan-400">D&apos;</span>) and row 2 holds odd minterms (where D=1, hence <span className="font-mono text-cyan-400">D</span>):
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-amber-400">Column Pairing Table:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-slate-300">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I0: m0 (D&apos;), m1 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I1: m2 (D&apos;), m3 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I2: m4 (D&apos;), m5 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I3: m6 (D&apos;), m7 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I4: m8 (D&apos;), m9 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I5: m10 (D&apos;), m11 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I6: m12 (D&apos;), m13 (D)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">I7: m14 (D&apos;), m15 (D)</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Implementation Table &amp; Realization Circuit</h2>
              <p className="text-xs text-slate-400">Solution for F(A, B, C, D) = Σ(0, 1, 3, 4, 8, 9, 15)</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 8-to-1 MUX Implementation Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5 text-left text-amber-400">Term</th>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <th key={i} className="p-2.5 text-indigo-400 font-bold">I{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-2.5 text-left font-bold text-slate-400">D&apos;</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m0</td>
                    <td className="p-2.5 text-slate-500">m2</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m4</td>
                    <td className="p-2.5 text-slate-500">m6</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m8</td>
                    <td className="p-2.5 text-slate-500">m10</td>
                    <td className="p-2.5 text-slate-500">m12</td>
                    <td className="p-2.5 text-slate-500">m14</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-left font-bold text-slate-400">D</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m1</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m3</td>
                    <td className="p-2.5 text-slate-500">m5</td>
                    <td className="p-2.5 text-slate-500">m7</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m9</td>
                    <td className="p-2.5 text-slate-500">m11</td>
                    <td className="p-2.5 text-slate-500">m13</td>
                    <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/30">m15</td>
                  </tr>
                  <tr className="bg-slate-900/90 font-bold text-emerald-300">
                    <td className="p-2.5 text-left text-white">Input:</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-emerald-400 font-bold">D</td>
                    <td className="p-2.5 text-emerald-400 font-bold">D&apos;</td>
                    <td className="p-2.5 text-slate-400 font-bold">0</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-slate-400 font-bold">0</td>
                    <td className="p-2.5 text-slate-400 font-bold">0</td>
                    <td className="p-2.5 text-emerald-400 font-bold">D</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. 8-to-1 MUX Realization Circuit Diagram
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 700 350" className="w-full max-w-2xl h-auto select-none font-mono text-xs">
                {/* 8:1 MUX Trapezoid */}
                <polygon points="260,30 460,70 460,250 260,290" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="360" y="150" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">8-to-1</text>
                <text x="360" y="172" fill="#a5b4fc" textAnchor="middle" fontSize="12">MULTIPLEXER</text>

                {/* Select Lines S2=A, S1=B, S0=C */}
                <line x1="310" y1="280" x2="310" y2="330" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="310" cy="330" r="3.5" fill="#f59e0b" />
                <text x="310" y="345" fill="#fcd34d" textAnchor="middle" fontSize="10" fontWeight="bold">S2 = A</text>

                <line x1="360" y1="270" x2="360" y2="330" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="360" cy="330" r="3.5" fill="#f59e0b" />
                <text x="360" y="345" fill="#fcd34d" textAnchor="middle" fontSize="10" fontWeight="bold">S1 = B</text>

                <line x1="410" y1="260" x2="410" y2="330" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="410" cy="330" r="3.5" fill="#f59e0b" />
                <text x="410" y="345" fill="#fcd34d" textAnchor="middle" fontSize="10" fontWeight="bold">S0 = C</text>

                {/* Left Rails: 1(Vcc), 0(GND), D, D' */}
                <text x="40" y="25" fill="#10b981" fontSize="10" fontWeight="bold">1 (Vcc)</text>
                <line x1="55" y1="35" x2="55" y2="280" stroke="#10b981" strokeWidth="1.5" />

                <text x="90" y="25" fill="#64748b" fontSize="10" fontWeight="bold">0 (GND)</text>
                <line x1="105" y1="35" x2="105" y2="280" stroke="#64748b" strokeWidth="1.5" />

                <text x="140" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">D</text>
                <line x1="150" y1="35" x2="150" y2="280" stroke="#38bdf8" strokeWidth="1.5" />

                <text x="180" y="25" fill="#a78bfa" fontSize="10" fontWeight="bold">D&apos;</text>
                <line x1="190" y1="35" x2="190" y2="280" stroke="#a78bfa" strokeWidth="1.5" />

                {/* Inverter connecting D to D' */}
                <line x1="150" y1="50" x2="165" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
                <polygon points="165,45 178,50 165,55" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="182" cy="50" r="2.5" fill="#020617" stroke="#a78bfa" strokeWidth="1" />
                <line x1="184" y1="50" x2="190" y2="50" stroke="#a78bfa" strokeWidth="1.5" />

                {/* 8 Inputs */}
                {[
                  { name: "I0", y: 60, srcX: 55, color: "#10b981" },
                  { name: "I1", y: 85, srcX: 150, color: "#38bdf8" },
                  { name: "I2", y: 110, srcX: 190, color: "#a78bfa" },
                  { name: "I3", y: 135, srcX: 105, color: "#64748b" },
                  { name: "I4", y: 160, srcX: 55, color: "#10b981" },
                  { name: "I5", y: 185, srcX: 105, color: "#64748b" },
                  { name: "I6", y: 210, srcX: 105, color: "#64748b" },
                  { name: "I7", y: 235, srcX: 150, color: "#38bdf8" }
                ].map((inp, idx) => (
                  <g key={idx}>
                    <circle cx={inp.srcX} cy={inp.y} r="3" fill={inp.color} />
                    <line x1={inp.srcX} y1={inp.y} x2="260" y2={inp.y} stroke={inp.color} strokeWidth="1.5" />
                    <text x="240" y={inp.y - 3} fill="#cbd5e1" fontSize="9">{inp.name}</text>
                  </g>
                ))}

                {/* Output */}
                <line x1="460" y1="160" x2="600" y2="160" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="600" cy="160" r="4" fill="#10b981" />
                <text x="615" y="164" fill="#6ee7b7" fontWeight="bold" fontSize="13">F(A,B,C,D)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Dynamic 8:1 MUX Function Synthesizer</h2>
              <p className="text-xs text-slate-400">Select any minterms from m0 to m15 to see real-time table synthesis</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Toggle Minterms (0 to 15):
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {Array.from({ length: 16 }).map((_, m) => {
                  const active = minterms.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => toggleMinterm(m)}
                      className={clsx(
                        "py-2 rounded font-mono font-bold text-xs border transition-all",
                        active ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-900 text-slate-500 border-slate-800"
                      )}
                    >
                      m{m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DEDUCED INPUT VALUES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {Array.from({ length: 8 }).map((_, idx) => {
                const col = getCol(idx);
                return (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400">I{idx}</div>
                    <div className="text-lg font-mono font-bold text-emerald-400 my-0.5">{col.val}</div>
                    <div className="text-[9px] text-slate-500">{col.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* LIVE VERIFICATION */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Inputs:</span>
                <button onClick={() => setValA(!valA)} className="px-2 py-1 rounded bg-slate-800 font-mono text-indigo-300">A={valA ? "1" : "0"}</button>
                <button onClick={() => setValB(!valB)} className="px-2 py-1 rounded bg-slate-800 font-mono text-indigo-300">B={valB ? "1" : "0"}</button>
                <button onClick={() => setValC(!valC)} className="px-2 py-1 rounded bg-slate-800 font-mono text-indigo-300">C={valC ? "1" : "0"}</button>
                <button onClick={() => setValD(!valD)} className="px-2 py-1 rounded bg-slate-800 font-mono text-indigo-300">D={valD ? "1" : "0"}</button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">State: <strong className="text-white font-mono">m{currentMinterm}</strong></span>
                <span className="text-slate-400">Output F: <strong className={clsx("font-mono font-bold text-sm", currentOutput === 1 ? "text-emerald-400" : "text-rose-400")}>{currentOutput}</strong></span>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 4-Variable 8:1 MUX</h2>
              <p className="text-xs text-slate-400">Exam preparation tips and common mistakes</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE 5-Mark Marking Scheme</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Implementation Table (2 Marks):</strong> Showing 8 columns with circled minterms.</li>
                <li><strong className="text-white">Values of I0–I7 (1 Mark):</strong> Correctly identifying constants (0, 1) and literals (D, D&apos;).</li>
                <li><strong className="text-white">Logic Circuit Diagram (2 Marks):</strong> Correctly connected 8:1 MUX block diagram with select lines S2=A, S1=B, S0=C and inputs.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-28-realization"
        headline="Sukanta Hui's Advice for 4-Variable Realization"
        note="Remember the order: S2 gets A, S1 gets B, S0 gets C! The leftover variable D is distributed among the inputs. When drawing the circuit, draw four vertical lines on the left for 1, 0, D, and D' (via an inverter). Then connect each of the eight inputs I0 through I7 to the appropriate vertical wire. It looks super professional and CISCE examiners love it!"
      />
    </div>
  );
};

export default Topic28;
