import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic38_faqs";

const Topic38 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Live input testing for Full Adder
  const [inA, setInA] = useState(false);
  const [inB, setInB] = useState(false);
  const [inCin, setInCin] = useState(false);

  // MUX derivations:
  // S1 = B, S0 = Cin
  // Sum MUX inputs: I0=A, I1=A', I2=A', I3=A
  // Carry MUX inputs: I0=0, I1=A, I2=A, I3=1
  const sumOut = (inA ? 1 : 0) ^ (inB ? 1 : 0) ^ (inCin ? 1 : 0);
  const carryOut = ((inA && inB) || (inB && inCin) || (inA && inCin)) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 38
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868 Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            1-Bit Full Adder Realization using Two $4 \times 1$ Multiplexers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Synthesizing Arithmetic Logic with Shared Selection Bus ($S_1 = B, S_0 = C_{"{"}in{"}"}$): Sum = $\Sigma(1, 2, 4, 7)$ and Carry = $\Sigma(3, 5, 6, 7)$ on Dual $4 \times 1$ MUX Architecture (74153 IC)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Dual Implementation Tables" },
              { id: "truthTable", label: "3. Circuit & Truth Table" },
              { id: "interactive", label: "4. Interactive Adder Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Adder Synthesis on Multiplexers</h2>
              <p className="text-xs text-slate-400">Why the dual 4:1 multiplexer is the industry standard building block for ALU adders</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Zap size={14} /> Shared Select Bus Principle
            </div>
            <p className="text-slate-200">
              A 1-Bit Full Adder has 3 input variables ($A, B, C_{"{"}in{"}"}$) and 2 output functions ($\text{Sum}$ and $\text{Carry}$). Instead of building separate gate networks with XOR and AND gates, we deploy <strong>two $4 \times 1$ multiplexers</strong>.
            </p>
            <p className="text-slate-400">
              By connecting variables $B$ and $C_{"{"}in{"}"}$ to the selection lines $S_1$ and $S_0$ of both multiplexers in parallel, both outputs are computed simultaneously. The singled-out variable $A$ (and its complement $A&apos;$) drives the data inputs, requiring only a single shared NOT gate for the entire circuit!
            </p>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS & DUAL IMPLEMENTATION TABLES */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Dual Function Implementation Tables</h2>
              <p className="text-xs text-slate-400">Step-by-step derivation for Sum and Carry-out multiplexer inputs</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* SUM TABLE */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-cyan-400 flex items-center justify-between font-sans">
                <span>Sum MUX Implementation Table</span>
                <span className="font-mono text-xs text-slate-400">Sum = &Sigma;(1, 2, 4, 7)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-center">
                  <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                    <tr><th className="p-2 text-left">Row</th><th>I0 (00)</th><th>I1 (01)</th><th>I2 (10)</th><th>I3 (11)</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2 text-left text-slate-400">A&apos; (A=0)</td>
                      <td className="text-slate-500">0</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">① (Circled)</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">② (Circled)</td>
                      <td className="text-slate-500">3</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left text-slate-400">A (A=1)</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">④ (Circled)</td>
                      <td className="text-slate-500">5</td>
                      <td className="text-slate-500">6</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">⑦ (Circled)</td>
                    </tr>
                    <tr className="bg-slate-900 font-bold text-amber-300">
                      <td className="p-2 text-left">Inputs:</td>
                      <td>A (Rule 3)</td><td>A&apos; (Rule 4)</td><td>A&apos; (Rule 4)</td><td>A (Rule 3)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARRY TABLE */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-emerald-400 flex items-center justify-between font-sans">
                <span>Carry MUX Implementation Table</span>
                <span className="font-mono text-xs text-slate-400">Cout = &Sigma;(3, 5, 6, 7)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-center">
                  <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                    <tr><th className="p-2 text-left">Row</th><th>I0 (00)</th><th>I1 (01)</th><th>I2 (10)</th><th>I3 (11)</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2 text-left text-slate-400">A&apos; (A=0)</td>
                      <td className="text-slate-500">0</td>
                      <td className="text-slate-500">1</td>
                      <td className="text-slate-500">2</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">③ (Circled)</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left text-slate-400">A (A=1)</td>
                      <td className="text-slate-500">4</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">⑤ (Circled)</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">⑥ (Circled)</td>
                      <td className="text-emerald-300 font-bold bg-emerald-950/40">⑦ (Circled)</td>
                    </tr>
                    <tr className="bg-slate-900 font-bold text-emerald-300">
                      <td className="p-2 text-left">Inputs:</td>
                      <td>0 (Rule 1)</td><td>A (Rule 3)</td><td>A (Rule 3)</td><td>1 (Rule 2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: CIRCUIT & TRUTH TABLE (DEFAULT) */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Full Adder Truth Table &amp; Dual MUX Circuit</h2>
              <p className="text-xs text-slate-400">Full Adder hardware implementation using two $4 \times 1$ MUXes sharing select bus $B, C_{"{"}in{"}"}$</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
            <table className="w-full text-center font-mono text-xs">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-2">Row</th>
                  <th className="p-2 text-indigo-400 font-bold">A (Data)</th>
                  <th className="p-2 text-cyan-400 font-bold">B (S1)</th>
                  <th className="p-2 text-cyan-400 font-bold">Cin (S0)</th>
                  <th className="p-2 text-amber-400 font-bold">Sum Out</th>
                  <th className="p-2 text-emerald-400 font-bold">Carry Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                <tr className="bg-amber-950/20"><td>1</td><td>0</td><td>0</td><td>1</td><td className="font-bold text-amber-400">1</td><td>0</td></tr>
                <tr className="bg-amber-950/20"><td>2</td><td>0</td><td>1</td><td>0</td><td className="font-bold text-amber-400">1</td><td>0</td></tr>
                <tr className="bg-emerald-950/20"><td>3</td><td>0</td><td>1</td><td>1</td><td>0</td><td className="font-bold text-emerald-400">1</td></tr>
                <tr className="bg-amber-950/20"><td>4</td><td>1</td><td>0</td><td>0</td><td className="font-bold text-amber-400">1</td><td>0</td></tr>
                <tr className="bg-emerald-950/20"><td>5</td><td>1</td><td>0</td><td>1</td><td>0</td><td className="font-bold text-emerald-400">1</td></tr>
                <tr className="bg-emerald-950/20"><td>6</td><td>1</td><td>1</td><td>0</td><td>0</td><td className="font-bold text-emerald-400">1</td></tr>
                <tr className="bg-purple-950/30"><td>7</td><td>1</td><td>1</td><td>1</td><td className="font-bold text-amber-400">1</td><td className="font-bold text-emerald-400">1</td></tr>
              </tbody>
            </table>
          </div>

          {/* DUAL MUX CIRCUIT DIAGRAM SVG */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Hardware Circuit Diagram: Dual $4 \times 1$ MUX Architecture
            </span>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 540 280" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                {/* Upper MUX: Sum */}
                <rect x="220" y="20" width="130" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="285" y="55" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">4 &times; 1 MUX</text>
                <text x="285" y="75" fill="#fcd34d" fontWeight="bold" fontSize="11" textAnchor="middle">(Sum MUX)</text>

                {/* Lower MUX: Carry */}
                <rect x="220" y="150" width="130" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="285" y="185" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">4 &times; 1 MUX</text>
                <text x="285" y="205" fill="#6ee7b7" fontWeight="bold" fontSize="11" textAnchor="middle">(Carry MUX)</text>

                {/* Shared Selection Bus */}
                <line x1="255" y1="270" x2="255" y2="130" stroke="#06b6d4" strokeWidth="2" />
                <text x="255" y="278" fill="#06b6d4" textAnchor="middle" fontWeight="bold">B (S1)</text>

                <line x1="315" y1="270" x2="315" y2="130" stroke="#06b6d4" strokeWidth="2" />
                <text x="315" y="278" fill="#06b6d4" textAnchor="middle" fontWeight="bold">Cin (S0)</text>

                {/* Outputs */}
                <line x1="350" y1="75" x2="430" y2="75" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="430,71 438,75 430,79" fill="#f59e0b" />
                <text x="445" y="79" fill="#f59e0b" fontWeight="bold" fontSize="13">Sum</text>

                <line x1="350" y1="205" x2="430" y2="205" stroke="#10b981" strokeWidth="2" />
                <polygon points="430,201 438,205 430,209" fill="#10b981" />
                <text x="445" y="209" fill="#10b981" fontWeight="bold" fontSize="13">Cout</text>

                {/* Left Inputs */}
                <text x="20" y="50" fill="#38bdf8" fontWeight="bold">A</text>
                <line x1="35" y1="46" x2="80" y2="46" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="60" cy="46" r="3" fill="#38bdf8" />
                {/* Inverter */}
                <polygon points="80,40 96,46 80,52" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
                <circle cx="98" cy="46" r="2.5" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
                <text x="105" y="44" fill="#818cf8" fontSize="10">A&apos;</text>

                {/* Wires into Sum MUX */}
                <line x1="60" y1="46" x2="60" y2="35" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="60" y1="35" x2="220" y2="35" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="205" y="38" fill="#94a3b8" fontSize="9">I0: A</text>

                <line x1="102" y1="46" x2="102" y2="60" stroke="#818cf8" strokeWidth="1.2" />
                <line x1="102" y1="60" x2="220" y2="60" stroke="#818cf8" strokeWidth="1.2" />
                <text x="205" y="63" fill="#94a3b8" fontSize="9">I1: A&apos;</text>

                <line x1="102" y1="60" x2="102" y2="85" stroke="#818cf8" strokeWidth="1.2" />
                <line x1="102" y1="85" x2="220" y2="85" stroke="#818cf8" strokeWidth="1.2" />
                <text x="205" y="88" fill="#94a3b8" fontSize="9">I2: A&apos;</text>

                <line x1="60" y1="46" x2="60" y2="110" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="60" y1="110" x2="220" y2="110" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="205" y="113" fill="#94a3b8" fontSize="9">I3: A</text>

                {/* Wires into Carry MUX */}
                <text x="175" y="168" fill="#ef4444" fontSize="9">I0: 0</text>
                <text x="175" y="193" fill="#38bdf8" fontSize="9">I1: A</text>
                <text x="175" y="218" fill="#38bdf8" fontSize="9">I2: A</text>
                <text x="175" y="243" fill="#10b981" fontSize="9">I3: 1</text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Full Adder MUX Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs A, B, Cin and verify both Sum and Carry multiplexer responses</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
              <button
                onClick={() => setInA(!inA)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  inA ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Input A:</span>
                <span>{inA ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setInB(!inB)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  inB ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S1 (B):</span>
                <span>{inB ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setInCin(!inCin)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  inCin ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S0 (Cin):</span>
                <span>{inCin ? "1" : "0"}</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Sum Output:</div>
                  <div className="text-xs font-bold text-slate-300">Sum MUX routes I{(inB ? 2 : 0) + (inCin ? 1 : 0)}</div>
                </div>
                <div className={clsx(
                  "px-4 py-2 rounded-xl text-xl font-extrabold font-mono border",
                  sumOut === 1 ? "bg-amber-950 text-amber-400 border-amber-500/60" : "bg-slate-950 text-slate-600 border-slate-800"
                )}>
                  Sum = {sumOut}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Carry Output:</div>
                  <div className="text-xs font-bold text-slate-300">Carry MUX routes I{(inB ? 2 : 0) + (inCin ? 1 : 0)}</div>
                </div>
                <div className={clsx(
                  "px-4 py-2 rounded-xl text-xl font-extrabold font-mono border",
                  carryOut === 1 ? "bg-emerald-950 text-emerald-400 border-emerald-500/60" : "bg-slate-950 text-slate-600 border-slate-800"
                )}>
                  Cout = {carryOut}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: ISC BOARD EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Full Adder using 4:1 MUX</h2>
              <p className="text-xs text-slate-400">Frequently tested 5-mark circuit problem in CISCE theory exams</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Shared Selection Lines:</strong> You must explicitly draw selection lines $B$ and $C_{"{"}in{"}"}$ wired in parallel to both multiplexers.</li>
                <li><strong className="text-white">Single Inverter:</strong> Point out that only one NOT gate is needed to invert $A$ to $A&apos;$.</li>
                <li><strong className="text-white">Commercial Relevance:</strong> Mentioning the 74153 dual 4:1 multiplexer IC demonstrates practical engineering depth that impresses evaluators.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
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
        topicId="topic-38-full-adder-mux"
        headline="Sukanta Hui's Blueprint for the Full Adder using 4:1 MUX"
        note="The Full Adder using two 4:1 multiplexers is one of the most elegant designs in digital hardware! Notice the symmetry: B and Cin form a 2-wire selection bus for both chips. The Sum MUX uses inputs {A, A', A', A}, while the Carry MUX uses {0, A, A, 1}. All you need is a single inverter chip. Always state that this can be built with one single 74153 IC package!"
      />
    </div>
  );
};

export default Topic38;
