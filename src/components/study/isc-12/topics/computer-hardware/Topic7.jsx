import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputBin, setInputBin] = useState(false);

  const a = inputA ? 1 : 0;
  const b = inputB ? 1 : 0;
  const bin = inputBin ? 1 : 0;

  // HS 1
  const d1 = a ^ b;
  const b1 = (!a && b) ? 1 : 0;

  // HS 2
  const diff = d1 ^ bin;
  const b2 = (!d1 && bin) ? 1 : 0;

  // Final OR
  const bout = b1 || b2 ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Full Subtractor using Two Half Subtractors &amp; An OR Gate
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Cascaded Subtractor Synthesis, Intermediate Excitation Signals, and Gate-Level Schematics
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Algebraic Proof of Bout" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Cascaded Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Cascaded Subtractor Theory</h2>
              <p className="text-xs text-slate-400">Modular implementation using two HS stages and an OR gate</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              Just like a Full Adder can be formed from two Half Adders, a <strong className="text-cyan-300">Full Subtractor</strong> can be synthesized from <strong className="text-rose-300">two Half Subtractors (HS-1 and HS-2)</strong> and one <strong className="text-indigo-300">OR gate</strong>:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              <li><strong>HS-1</strong> subtracts $B$ from $A$, yielding partial difference $D_1 = A oplus B$ and partial borrow $B_1 = A'B$.</li>
              <li><strong>HS-2</strong> subtracts $Bin$ from $D_1$, yielding final difference $Diff = D_1 oplus Bin = A oplus B oplus Bin$ and second partial borrow $B_2 = D_1' cdot Bin$.</li>
              <li>The <strong>OR gate</strong> produces the overall borrow-out: $B_{out} = B_1 + B_2$.</li>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Algebraic Proof of Borrow Equivalence</h2>
              <p className="text-xs text-slate-400">Proof showing B1 + B2 = A'B + A'Bin + BBin</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="font-mono text-purple-400 font-bold">Proof Derivation:</div>
            <div className="space-y-1 font-mono text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p>{"1. Bout = B1 + B2"}</p>
              <p>{"2. Substitute B1 = A'B, and B2 = (A ⊕ B)'Bin"}</p>
              <p>{"3. Recall (A ⊕ B)' = AB + A'B' (XNOR function)"}</p>
              <p>{"4. Bout = A'B + (AB + A'B')Bin = A'B + AB·Bin + A'B'·Bin"}</p>
              <p>{"5. Expand A'B as A'B(1 + Bin) = A'B + A'BBin"}</p>
              <p>{"6. Bout = A'B + A'BBin + A'B'Bin + ABBin"}</p>
              <p>{"7. Group terms: A'B + A'Bin(B + B') + BBin(A + A')"}</p>
              <p className="text-emerald-400 font-bold">{"8. Bout = A'B + A'Bin + BBin (Q.E.D.)"}</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Cascaded Circuit Diagrams</h2>
              <p className="text-xs text-slate-400">Intermediate signal values and modular cascading schematics</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Truth Table Showing Intermediate Stages (D1, B1, B2)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">Bin</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">D1 (A⊕B)</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">B1 (A'B)</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">B2 (D1'·Bin)</th>
                    <th className="p-2 text-purple-400 border-r border-slate-800">Diff (D1⊕Bin)</th>
                    <th className="p-2 text-rose-400">Bout (B1+B2)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 1, 1, 1],
                    [0, 1, 0, 1, 1, 0, 1, 1],
                    [0, 1, 1, 1, 1, 0, 0, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0],
                    [1, 0, 1, 1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0, 1, 1, 1]
                  ].map(([ra, rb, rbin, rd1, rb1, rb2, rdiff, rbout], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800">{ra}</td>
                      <td className="p-2 border-r border-slate-800">{rb}</td>
                      <td className="p-2 border-r border-slate-800">{rbin}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rd1}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rb1}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rb2}</td>
                      <td className="p-2 border-r border-slate-800 font-bold text-purple-400">{rdiff}</td>
                      <td className="p-2 font-bold text-rose-400">{rbout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CASCADING SCHEMATICS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. Cascaded Block Diagram: Two Half Subtractors + OR Gate
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* HS-1 */}
                <g transform="translate(60, 40)">
                  <rect x="0" y="0" width="160" height="130" rx="10" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
                  <text x="80" y="30" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">HS - 1</text>
                  <text x="80" y="50" fill="#fda4af" fontSize="10" textAnchor="middle">Half Subtractor 1</text>

                  <line x1="-35" y1="65" x2="0" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-42" y="69" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">A</text>

                  <line x1="-35" y1="95" x2="0" y2="95" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-42" y="99" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">B</text>

                  <line x1="160" y1="65" x2="260" y2="65" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="210" y="58" fill="#c084fc" fontSize="10" textAnchor="middle">D1 = A⊕B</text>

                  <line x1="160" y1="105" x2="220" y2="105" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="220" y1="105" x2="220" y2="190" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="220" y1="190" x2="490" y2="190" stroke="#f43f5e" strokeWidth="2" />
                  <text x="270" y="184" fill="#fb7185" fontSize="10">{"B1 = A'B"}</text>
                </g>

                {/* HS-2 */}
                <g transform="translate(260, 40)">
                  <rect x="0" y="0" width="160" height="130" rx="10" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                  <text x="80" y="30" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">HS - 2</text>
                  <text x="80" y="50" fill="#f5d0fe" fontSize="10" textAnchor="middle">Half Subtractor 2</text>

                  <line x1="-35" y1="95" x2="0" y2="95" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="-42" y="99" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="end">Bin</text>

                  <line x1="160" y1="65" x2="300" y2="65" stroke="#a855f7" strokeWidth="3" />
                  <polygon points="300,61 312,65 300,69" fill="#a855f7" />
                  <text x="325" y="70" fill="#c084fc" fontWeight="bold" fontSize="14">DIFF</text>

                  <line x1="160" y1="105" x2="230" y2="105" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="230" y1="105" x2="230" y2="145" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="230" y1="145" x2="290" y2="145" stroke="#f43f5e" strokeWidth="2" />
                  <text x="250" y="138" fill="#fb7185" fontSize="10">{"B2 = D1'·Bin"}</text>
                </g>

                {/* OR GATE */}
                <g transform="translate(550, 140)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="18" y="36" fill="#fda4af" fontSize="10" fontWeight="bold">OR</text>

                  <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#f43f5e" strokeWidth="3" />
                  <polygon points="130,28.5 142,32.5 130,36.5" fill="#f43f5e" />
                  <text x="155" y="37" fill="#fb7185" fontWeight="bold" fontSize="14">Bout = B1 + B2</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 2-HS Cascaded Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs to watch stage-by-stage subtraction through HS-1, HS-2, and OR gate</p>
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
                Minuend A: {inputA ? "1" : "0"}
              </button>
              <button
                onClick={() => setInputB(!inputB)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputB ? "bg-purple-500 text-white border-purple-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Subtrahend B: {inputB ? "1" : "0"}
              </button>
              <button
                onClick={() => setInputBin(!inputBin)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                  inputBin ? "bg-rose-500 text-white border-rose-300" : "bg-slate-900 text-slate-400 border-slate-700"
                )}
              >
                Borrow-in: {inputBin ? "1" : "0"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-indigo-400 font-bold">HS-1 Intermediate</div>
                <div className="text-white text-lg py-1">D1 = {d1} | B1 = {b1}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-purple-400 font-bold">HS-2 Intermediate</div>
                <div className="text-white text-lg py-1">Diff = {diff} | B2 = {b2}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-rose-400 font-bold">Final OR Gate</div>
                <div className="text-rose-400 text-lg font-bold py-1">Bout = {bout}</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: HS to FS</h2>
              <p className="text-xs text-slate-400">Important board question nuances</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Exam Drawing Checklist</div>
            <p className="text-slate-300 leading-relaxed">
              When drawing Full Subtractor using two Half Subtractors and an OR gate, clearly indicate the inverters inside HS-1 and HS-2. In HS-1, input A is inverted to form A'B. In HS-2, input D1 is inverted to form D1'·Bin.
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="This concludes the arithmetic circuits section (Adders & Subtractors). Remember that adders and subtractors share identical sum/difference XOR structures. Master the algebraic proof of Cout = C1 + C2 and Bout = B1 + B2—they appear alternately every 2 years in ISC board papers!" />
      </section>
    </div>
  );
};

export default Topic7;
