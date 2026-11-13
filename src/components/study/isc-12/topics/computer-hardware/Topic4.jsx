import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic4_faqs";

const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputCin, setInputCin] = useState(false);

  const a = inputA ? 1 : 0;
  const b = inputB ? 1 : 0;
  const cin = inputCin ? 1 : 0;

  // HA 1
  const s1 = a ^ b;
  const c1 = a && b ? 1 : 0;

  // HA 2
  const sum = s1 ^ cin;
  const c2 = s1 && cin ? 1 : 0;

  // Final OR
  const cout = c1 || c2 ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Full Adder using Two Half Adders &amp; An OR Gate
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Modular Synthesis, Algebraic Proof of Carry Equivalence, and Cascaded Circuit Architecture
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Algebraic Proof of Cout" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Cascaded Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Hierarchical Modular Synthesis</h2>
              <p className="text-xs text-slate-400">Constructing higher-order arithmetic units from elementary sub-blocks</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A standard Full Adder can be constructed using <strong className="text-cyan-300">two Half Adders (HA-1, HA-2)</strong> and a single <strong className="text-indigo-300">OR gate</strong>:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              <li><strong>HA-1</strong> adds inputs $A$ and $B$, generating partial sum $S_1 = A oplus B$ and partial carry $C_1 = A cdot B$.</li>
              <li><strong>HA-2</strong> adds $S_1$ and $Cin$, generating final sum $S = S_1 oplus Cin = A oplus B oplus Cin$ and second partial carry $C_2 = S_1 cdot Cin$.</li>
              <li>The <strong>OR Gate</strong> combines the two carry bits: $C_{out} = C_1 + C_2$. (Notice $C_1$ and $C_2$ can NEVER both be 1 simultaneously!).</li>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Algebraic Proof of Carry Equivalence</h2>
              <p className="text-xs text-slate-400">Step-by-step rigorous proof showing C1 + C2 = AB + BCin + ACin</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="font-mono text-purple-400 font-bold">Proof Derivation:</div>
            <div className="space-y-1 font-mono text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p>{"1. Cout = C1 + C2"}</p>
              <p>{"2. Substitute C1 = AB, and C2 = (A ⊕ B)Cin"}</p>
              <p>{"3. Cout = AB + (A'B + AB')Cin"}</p>
              <p>{"4. Cout = AB + A'BCin + AB'Cin"}</p>
              <p>{"5. Expand AB as AB(1 + Cin) = AB + ABCin"}</p>
              <p>{"6. Cout = AB + ABCin + A'BCin + AB'Cin"}</p>
              <p>{"7. Group terms: AB + BCin(A + A') + ACin(B + B')"}</p>
              <p className="text-emerald-400 font-bold">{"8. Cout = AB + BCin(1) + ACin(1) = AB + BCin + ACin (Q.E.D.)"}</p>
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

          {/* TRUTH TABLE WITH INTERMEDIATE SIGNALS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Truth Table Showing Intermediate Stages (S1, C1, C2)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2 text-cyan-400 border-r border-slate-800">A</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">Cin</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">S1 (A⊕B)</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">C1 (AB)</th>
                    <th className="p-2 text-indigo-300 border-r border-slate-800">C2 (S1·Cin)</th>
                    <th className="p-2 text-purple-400 border-r border-slate-800">Sum (S1⊕Cin)</th>
                    <th className="p-2 text-emerald-400">Cout (C1+C2)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0],
                    [0, 1, 0, 1, 0, 0, 1, 0],
                    [0, 1, 1, 1, 0, 1, 0, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0],
                    [1, 0, 1, 1, 0, 1, 0, 1],
                    [1, 1, 0, 0, 1, 0, 0, 1],
                    [1, 1, 1, 0, 1, 0, 1, 1]
                  ].map(([ra, rb, rcin, rs1, rc1, rc2, rsum, rcout], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800">{ra}</td>
                      <td className="p-2 border-r border-slate-800">{rb}</td>
                      <td className="p-2 border-r border-slate-800">{rcin}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rs1}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rc1}</td>
                      <td className="p-2 border-r border-slate-800 text-indigo-300">{rc2}</td>
                      <td className="p-2 border-r border-slate-800 font-bold text-purple-400">{rsum}</td>
                      <td className="p-2 font-bold text-emerald-400">{rcout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CASCADING SCHEMATICS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. Cascaded Block Diagram: Two Half Adders + OR Gate
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* HA-1 */}
                <g transform="translate(60, 40)">
                  <rect x="0" y="0" width="160" height="130" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="80" y="30" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">HA - 1</text>
                  <text x="80" y="50" fill="#a5b4fc" fontSize="10" textAnchor="middle">Half Adder 1</text>

                  {/* Inputs */}
                  <line x1="-35" y1="65" x2="0" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-42" y="69" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">A</text>

                  <line x1="-35" y1="95" x2="0" y2="95" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="-42" y="99" fill="#06b6d4" fontWeight="bold" fontSize="13" textAnchor="end">B</text>

                  {/* Outputs */}
                  <line x1="160" y1="65" x2="260" y2="65" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="210" y="58" fill="#c084fc" fontSize="10" textAnchor="middle">S1 = A⊕B</text>

                  <line x1="160" y1="105" x2="220" y2="105" stroke="#10b981" strokeWidth="2" />
                  <line x1="220" y1="105" x2="220" y2="190" stroke="#10b981" strokeWidth="2" />
                  <line x1="220" y1="190" x2="490" y2="190" stroke="#10b981" strokeWidth="2" />
                  <text x="270" y="184" fill="#34d399" fontSize="10">C1 = AB</text>
                </g>

                {/* HA-2 */}
                <g transform="translate(260, 40)">
                  <rect x="0" y="0" width="160" height="130" rx="10" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                  <text x="80" y="30" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">HA - 2</text>
                  <text x="80" y="50" fill="#f5d0fe" fontSize="10" textAnchor="middle">Half Adder 2</text>

                  {/* Input Cin */}
                  <line x1="-35" y1="95" x2="0" y2="95" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="-42" y="99" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="end">Cin</text>

                  {/* Outputs */}
                  <line x1="160" y1="65" x2="300" y2="65" stroke="#a855f7" strokeWidth="3" />
                  <polygon points="300,61 312,65 300,69" fill="#a855f7" />
                  <text x="325" y="70" fill="#c084fc" fontWeight="bold" fontSize="14">SUM</text>

                  <line x1="160" y1="105" x2="230" y2="105" stroke="#10b981" strokeWidth="2" />
                  <line x1="230" y1="105" x2="230" y2="145" stroke="#10b981" strokeWidth="2" />
                  <line x1="230" y1="145" x2="290" y2="145" stroke="#10b981" strokeWidth="2" />
                  <text x="250" y="138" fill="#34d399" fontSize="10">C2 = S1·Cin</text>
                </g>

                {/* OR GATE */}
                <g transform="translate(550, 140)">
                  <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                  <text x="18" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold">OR</text>

                  <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#10b981" strokeWidth="3" />
                  <polygon points="130,28.5 142,32.5 130,36.5" fill="#10b981" />
                  <text x="155" y="37" fill="#34d399" fontWeight="bold" fontSize="14">Cout = C1 + C2</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 2-HA Cascaded Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs to watch stage-by-stage computation through HA-1, HA-2, and final OR gate</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-indigo-400 font-bold">HA-1 Intermediate</div>
                <div className="text-white text-lg py-1">S1 = {s1} | C1 = {c1}</div>
                <div className="text-slate-500">S1 = A ⊕ B, C1 = AB</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-purple-400 font-bold">HA-2 Intermediate</div>
                <div className="text-white text-lg py-1">Sum = {sum} | C2 = {c2}</div>
                <div className="text-slate-500">Sum = S1 ⊕ Cin, C2 = S1·Cin</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="text-emerald-400 font-bold">Final OR Gate</div>
                <div className="text-emerald-400 text-lg font-bold py-1">Cout = {cout}</div>
                <div className="text-slate-500">Cout = C1 + C2</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: HA to FA</h2>
              <p className="text-xs text-slate-400">Recurring 5-mark question guidelines</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Crucial Examination Point</div>
            <p className="text-slate-300 leading-relaxed">
              Why can an OR gate be used instead of an XOR gate to combine C1 and C2? Because C1 = AB and C2 = (A ⊕ B)Cin. If C1 = 1 (A=1 and B=1), then A ⊕ B = 0, so C2 MUST be 0! Since C1 and C2 can never be 1 at the same time, C1 + C2 is identical to C1 ⊕ C2. Examiners love this conceptual question!
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

{/* TEACHER NOTE */}
      <section>
        <Teacher note="Always label both Half Adders clearly as HA-1 and HA-2 in your board paper. Don't forget that HA-1 takes A and B, while HA-2 takes S1 and Cin. The final carry Cout is the OR sum of the two individual carries." />
      </section>
    </div>
  );
};

export default Topic4;
