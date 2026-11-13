import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic25_faqs";

const Topic25 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s2, setS2] = useState(false);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);

  const activeMux = !s2 ? "MUX 1 (Inputs I0–I3)" : "MUX 2 (Inputs I4–I7)";
  const localIndex = (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const globalIndex = (!s2 ? 0 : 4) + localIndex;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 25
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cascading Multiplexer Trees: 8-to-1 MUX using Two 4-to-1 MUXes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Higher-Order MUX Synthesis: S2 as Bank Select with Inverter, Common Select Lines S1, S0, and Output OR Gate
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Derivation & Logic" },
              { id: "truthTable", label: "3. Function Table & Cascading Circuit" },
              { id: "interactive", label: "4. Interactive Cascading Sandbox" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">How Cascading Works</h2>
              <p className="text-xs text-slate-400">Synthesizing higher capacity multiplexers using smaller building blocks</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              When a design requires an <strong className="text-cyan-400">8-to-1 Multiplexer</strong> but only <strong className="text-indigo-400">4-to-1 Multiplexers</strong> are available, we can cascade <strong className="text-white">two 4:1 MUXes</strong> together using an <strong className="text-amber-400">inverter (NOT gate)</strong> and a <strong className="text-emerald-400">2-input OR gate</strong> (or an additional 2:1 MUX).
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Upper Bank (MUX 1)</span>
                <div className="text-base font-mono font-bold text-white">Inputs I0, I1, I2, I3</div>
                <p className="text-xs text-slate-400">Enabled when S2 = 0 via NOT gate</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Lower Bank (MUX 2)</span>
                <div className="text-base font-mono font-bold text-white">Inputs I4, I5, I6, I7</div>
                <p className="text-xs text-slate-400">Enabled directly when S2 = 1</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Common Select</span>
                <div className="text-base font-mono font-bold text-white">Lines S1 and S0</div>
                <p className="text-xs text-slate-400">Connected in parallel to both 4:1 MUXes</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <span className="font-bold text-indigo-300">Bank Selection Principle:</span>
              <p>
                The MSB <span className="font-mono text-amber-300 font-bold">S2</span> serves as the master bank-select switch. When S2 = 0, MUX 1 is active and MUX 2 is disabled (outputting 0). When S2 = 1, MUX 1 is disabled and MUX 2 is active. The 2-input OR gate combines both outputs without interference!
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Algebraic Proof of Cascading</h2>
              <p className="text-xs text-slate-400">Deriving the 8-to-1 equation from two 4-to-1 sub-equations</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Let <span className="font-mono text-cyan-400">Y1</span> be the output of MUX 1 (with Enable E1 = S2&apos;) and <span className="font-mono text-cyan-400">Y2</span> be the output of MUX 2 (with Enable E2 = S2).
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-sans font-semibold">Intermediate Outputs:</div>
              <div>Y1 = S2&apos; · (S1&apos;S0&apos;I0 + S1&apos;S0 I1 + S1 S0&apos;I2 + S1 S0 I3)</div>
              <div>Y2 = S2  · (S1&apos;S0&apos;I4 + S1&apos;S0 I5 + S1 S0&apos;I6 + S1 S0 I7)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-emerald-400">
              <div className="text-slate-400 font-sans font-semibold">Final OR Gate Combination:</div>
              <div>Y = Y1 + Y2</div>
              <div>Y = S2&apos;S1&apos;S0&apos;I0 + S2&apos;S1&apos;S0 I1 + S2&apos;S1 S0&apos;I2 + S2&apos;S1 S0 I3 + S2 S1&apos;S0&apos;I4 + S2 S1&apos;S0 I5 + S2 S1 S0&apos;I6 + S2 S1 S0 I7</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Cascading Circuit Schematic</h2>
              <p className="text-xs text-slate-400">Detailed schematic of two 4:1 MUXes interconnected with OR gate</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. Cascading Selection Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">S2 (Bank Select)</th>
                    <th className="p-3 text-indigo-400 font-bold">S1</th>
                    <th className="p-3 text-indigo-400 font-bold">S0</th>
                    <th className="p-3 text-cyan-400 font-bold">Active MUX</th>
                    <th className="p-3 text-emerald-400 font-bold">Final Output (Y)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    [0, 0, 0, "MUX 1 (I0–I3)", "I0"],
                    [0, 0, 1, "MUX 1 (I0–I3)", "I1"],
                    [0, 1, 0, "MUX 1 (I0–I3)", "I2"],
                    [0, 1, 1, "MUX 1 (I0–I3)", "I3"],
                    [1, 0, 0, "MUX 2 (I4–I7)", "I4"],
                    [1, 0, 1, "MUX 2 (I4–I7)", "I5"],
                    [1, 1, 0, "MUX 2 (I4–I7)", "I6"],
                    [1, 1, 1, "MUX 2 (I4–I7)", "I7"]
                  ].map(([b2, b1, b0, mux, out], i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="p-3 text-amber-400 font-bold">{b2}</td>
                      <td className="p-3 text-indigo-300">{b1}</td>
                      <td className="p-3 text-indigo-300">{b0}</td>
                      <td className="p-3 text-cyan-300 font-semibold">{mux}</td>
                      <td className="p-3 text-emerald-400 font-extrabold">{out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG: CASCADING SCHEMATIC */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Vector Cascading Schematic (Two 4:1 MUXes + Inverter + OR Gate)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 760 360" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Upper 4:1 MUX */}
                <polygon points="180,30 320,60 320,150 180,180" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="250" y="105" fill="#e0e7ff" textAnchor="middle" fontWeight="bold">4:1 MUX (1)</text>
                <text x="250" y="125" fill="#a5b4fc" textAnchor="middle" fontSize="10">Inputs I0–I3</text>

                {/* Lower 4:1 MUX */}
                <polygon points="180,210 320,240 320,330 180,360" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="250" y="285" fill="#e0e7ff" textAnchor="middle" fontWeight="bold">4:1 MUX (2)</text>
                <text x="250" y="305" fill="#a5b4fc" textAnchor="middle" fontSize="10">Inputs I4–I7</text>

                {/* Inputs to Upper MUX */}
                <line x1="70" y1="60" x2="180" y2="60" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="64" fill="#7dd3fc">I0</text>
                <line x1="70" y1="90" x2="180" y2="90" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="94" fill="#7dd3fc">I1</text>
                <line x1="70" y1="120" x2="180" y2="120" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="124" fill="#7dd3fc">I2</text>
                <line x1="70" y1="150" x2="180" y2="150" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="154" fill="#7dd3fc">I3</text>

                {/* Inputs to Lower MUX */}
                <line x1="70" y1="240" x2="180" y2="240" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="244" fill="#7dd3fc">I4</text>
                <line x1="70" y1="270" x2="180" y2="270" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="274" fill="#7dd3fc">I5</text>
                <line x1="70" y1="300" x2="180" y2="300" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="304" fill="#7dd3fc">I6</text>
                <line x1="70" y1="330" x2="180" y2="330" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="334" fill="#7dd3fc">I7</text>

                {/* Bank Select S2 Rail with Inverter */}
                <line x1="120" y1="380" x2="120" y2="140" stroke="#f59e0b" strokeWidth="2" />
                <text x="120" y="398" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S2 (MSB)</text>

                {/* Inverter for Upper Enable */}
                <polygon points="110,140 130,140 120,115" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="120" cy="110" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="120" y1="107" x2="120" y2="40" stroke="#f59e0b" strokeWidth="2" />
                <line x1="120" y1="40" x2="220" y2="40" stroke="#f59e0b" strokeWidth="2" />
                <text x="220" y="33" fill="#fcd34d" textAnchor="middle" fontSize="10">E1 (S2&apos;)</text>

                {/* Connection to Lower Enable */}
                <circle cx="120" cy="220" r="3.5" fill="#f59e0b" />
                <line x1="120" y1="220" x2="220" y2="220" stroke="#f59e0b" strokeWidth="2" />
                <text x="220" y="213" fill="#fcd34d" textAnchor="middle" fontSize="10">E2 (S2)</text>

                {/* Common Select Lines S1 and S0 */}
                <line x1="280" y1="390" x2="280" y2="140" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 3" />
                <text x="280" y="405" fill="#c4b5fd" textAnchor="middle" fontWeight="bold">S1, S0</text>
                <circle cx="280" cy="320" r="3" fill="#a78bfa" />
                <circle cx="280" cy="140" r="3" fill="#a78bfa" />

                {/* Intermediate Outputs to OR gate */}
                <line x1="320" y1="105" x2="480" y2="105" stroke="#818cf8" strokeWidth="2" />
                <text x="400" y="98" fill="#a5b4fc">Y1</text>

                <line x1="320" y1="285" x2="480" y2="285" stroke="#818cf8" strokeWidth="2" />
                <text x="400" y="278" fill="#a5b4fc">Y2</text>

                {/* 2-Input OR Gate */}
                <line x1="480" y1="105" x2="520" y2="160" stroke="#818cf8" strokeWidth="2" />
                <line x1="480" y1="285" x2="520" y2="220" stroke="#818cf8" strokeWidth="2" />

                <path
                  d="M 520,150 Q 545,190 520,230 Q 570,190 600,190 Q 570,190 520,150 Z"
                  fill="#0f172a"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                <line x1="600" y1="190" x2="680" y2="190" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="680" cy="190" r="4" fill="#10b981" />
                <text x="695" y="194" fill="#6ee7b7" fontWeight="bold" fontSize="14">Output (Y)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live Cascaded MUX Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle S2 to see which 4:1 MUX chip activates, then pick channel via S1, S0</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Master Bank Select (S2):
                </span>
                <button
                  onClick={() => setS2(!s2)}
                  className={clsx(
                    "w-full py-2.5 rounded-lg font-mono font-bold text-sm border transition-all",
                    s2 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700"
                  )}
                >
                  S2 = {s2 ? "1 (Selects Lower MUX 2: I4–I7)" : "0 (Selects Upper MUX 1: I0–I3)"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Internal Channel Select (S1, S0):
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setS1(!s1)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                      s1 ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-800 text-slate-400 border-slate-700"
                    )}
                  >
                    S1 = {s1 ? "1" : "0"}
                  </button>
                  <button
                    onClick={() => setS0(!s0)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                      s0 ? "bg-cyan-600 text-white border-cyan-400" : "bg-slate-800 text-slate-400 border-slate-700"
                    )}
                  >
                    S0 = {s0 ? "1" : "0"}
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE CHIP STATUS */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className={clsx(
                  "p-4 rounded-xl border transition-all",
                  !s2
                    ? "bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30"
                    : "bg-slate-900/40 border-slate-800 opacity-60"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold font-mono text-indigo-300">MUX 1 (Upper Bank)</span>
                  <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded", !s2 ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-500")}>
                    {!s2 ? "ENABLED (E1=1)" : "DISABLED (E1=0)"}
                  </span>
                </div>
                <div className="text-xs text-slate-400">Inputs: I0, I1, I2, I3</div>
                <div className="text-sm font-mono font-bold text-white mt-2">
                  {!s2 ? ("Selected: I" + globalIndex) : "Output: 0"}
                </div>
              </div>

              <div
                className={clsx(
                  "p-4 rounded-xl border transition-all",
                  s2
                    ? "bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30"
                    : "bg-slate-900/40 border-slate-800 opacity-60"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold font-mono text-indigo-300">MUX 2 (Lower Bank)</span>
                  <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded", s2 ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-500")}>
                    {s2 ? "ENABLED (E2=1)" : "DISABLED (E2=0)"}
                  </span>
                </div>
                <div className="text-xs text-slate-400">Inputs: I4, I5, I6, I7</div>
                <div className="text-sm font-mono font-bold text-white mt-2">
                  {s2 ? ("Selected: I" + globalIndex) : "Output: 0"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Final Cascaded 8:1 Output (Y):</span>
              <span className="text-emerald-400 font-mono font-bold text-base">
                {"Y = I" + globalIndex}
              </span>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Cascading MUX Trees</h2>
              <p className="text-xs text-slate-400">Recurring 4-mark question blueprint</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE Model Question (4 Marks)</div>
              <p className="text-slate-200">
                &quot;Using two 4-to-1 multiplexers and an OR gate, construct an 8-to-1 multiplexer. Show the truth table and draw the complete circuit diagram.&quot;
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Truth Table (1 Mark):</strong> Clearly show S2 as bank selector and S1, S0 as line selectors.</li>
                <li><strong className="text-white">Inverter Logic (1 Mark):</strong> S2 connected directly to one chip enable and via NOT gate to the other.</li>
                <li><strong className="text-white">Connecting OR Gate (2 Marks):</strong> Both outputs fed into a 2-input OR gate producing output Y.</li>
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
        topicId="topic-25-cascading"
        headline="Sukanta Hui's Golden Rule on MUX Cascading"
        note="Whenever CISCE asks you to design a higher multiplexer using smaller multiplexers, calculate the required number of chips: 8 / 4 = 2 chips! Always assign the highest-order select line (S2) to the Enable pins (one inverted, one normal). Never connect S2 to the data inputs!"
      />
    </div>
  );
};

export default Topic25;
