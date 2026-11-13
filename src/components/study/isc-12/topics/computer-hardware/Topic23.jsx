import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic23 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s2, setS2] = useState(false);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);
  const [inputs, setInputs] = useState([1, 0, 1, 1, 0, 1, 0, 0]);

  const selectIndex = (s2 ? 4 : 0) + (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const selectedOutput = inputs[selectIndex];

  const toggleInput = (idx) => {
    const next = [...inputs];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setInputs(next);
  };

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 23
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            8-to-1 Line Multiplexer (MUX)
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            8 Data Inputs I0–I7, 3 Select Lines S2, S1, S0, Function Table, Boolean Equation, and Gate-Level Logic Circuit
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Derivation" },
              { id: "truthTable", label: "3. Function Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive MUX Sandbox" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">8-to-1 Multiplexer Architecture</h2>
              <p className="text-xs text-slate-400">Selecting 1 of 8 data channels using a 3-bit binary address</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              An <strong className="text-cyan-400">8-to-1 Multiplexer</strong> is a combinational circuit with 8 data input lines (<span className="text-white font-mono font-semibold">I0 to I7</span>), 3 selection lines (<span className="text-indigo-400 font-mono font-semibold">S2, S1, S0</span>), and a single output line (<span className="text-emerald-400 font-mono font-semibold">Y</span>). The 3-bit binary combination applied to the selection lines establishes a dedicated path between one specific data input and the common output.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Data Inputs</span>
                <div className="text-xl font-mono font-bold text-white">8 Channels (I0 - I7)</div>
                <p className="text-xs text-slate-400">Carry individual digital data streams</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Select Lines</span>
                <div className="text-xl font-mono font-bold text-white">3 Lines (S2, S1, S0)</div>
                <p className="text-xs text-slate-400">Formula: 2^m = N → 2^3 = 8</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Output</span>
                <div className="text-xl font-mono font-bold text-white">1 Line (Y)</div>
                <p className="text-xs text-slate-400">Instantaneously mirrors selected input</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <div className="font-bold text-indigo-300">Commercial Standard IC: 74151</div>
              <p>
                In practical digital electronics and computer hardware, the 8-to-1 Multiplexer is implemented as TTL IC 74151. It features both true output (Y) and inverted output (W = Y&apos;), along with an active-LOW Strobe/Enable input.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Output Equation</h2>
              <p className="text-xs text-slate-400">Mathematical sum of products expansion for 8 data channels</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              The output <span className="font-mono text-emerald-400 font-bold">Y</span> is given by the logical OR of 8 product terms, where each term is the AND product of one data input and the corresponding selection minterm:
            </p>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 space-y-2 overflow-x-auto">
              <div className="text-slate-400 text-xs font-sans font-semibold mb-1">Master SOP Boolean Expression:</div>
              <div>Y = S2&apos;·S1&apos;·S0&apos;·I0 + S2&apos;·S1&apos;·S0·I1 + S2&apos;·S1·S0&apos;·I2 + S2&apos;·S1·S0·I3</div>
              <div className="pl-6">+ S2·S1&apos;·S0&apos;·I4 + S2·S1&apos;·S0·I5 + S2·S1·S0&apos;·I6 + S2·S1·S0·I7</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 font-mono">When S2 S1 S0 = 0 0 0:</span>
                <p className="text-slate-400 mt-1">First term becomes 1·1·1·I0 = I0; all other terms contain at least one 0 and drop out. Thus Y = I0.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 font-mono">When S2 S1 S0 = 1 1 1:</span>
                <p className="text-slate-400 mt-1">Last term becomes 1·1·1·I7 = I7; all other terms become 0. Thus Y = I7.</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Vector Circuit Schematics</h2>
              <p className="text-xs text-slate-400">Standard CISCE function table and vector graphics diagrams</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 8-to-1 Multiplexer Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">S2 (MSB)</th>
                    <th className="p-3 text-amber-400 font-bold">S1</th>
                    <th className="p-3 text-amber-400 font-bold">S0 (LSB)</th>
                    <th className="p-3 text-emerald-400 font-bold">Output (Y)</th>
                    <th className="p-3 text-cyan-400 font-bold">Channel Selected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    [0, 0, 0, "I0", "Data Input 0"],
                    [0, 0, 1, "I1", "Data Input 1"],
                    [0, 1, 0, "I2", "Data Input 2"],
                    [0, 1, 1, "I3", "Data Input 3"],
                    [1, 0, 0, "I4", "Data Input 4"],
                    [1, 0, 1, "I5", "Data Input 5"],
                    [1, 1, 0, "I6", "Data Input 6"],
                    [1, 1, 1, "I7", "Data Input 7"]
                  ].map(([b2, b1, b0, outName, desc], idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50">
                      <td className="p-3 text-indigo-300 font-bold">{b2}</td>
                      <td className="p-3 text-indigo-300 font-bold">{b1}</td>
                      <td className="p-3 text-indigo-300 font-bold">{b0}</td>
                      <td className="p-3 text-emerald-400 font-extrabold">{outName}</td>
                      <td className="p-3 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG 1: BLOCK DIAGRAM */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Multiplexer Block Diagram (Digital Trapezoid)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 600 320" className="w-full max-w-xl h-auto select-none font-mono text-xs">
                {/* 8 Data Inputs */}
                {[
                  { y: 50, label: "I0" },
                  { y: 75, label: "I1" },
                  { y: 100, label: "I2" },
                  { y: 125, label: "I3" },
                  { y: 150, label: "I4" },
                  { y: 175, label: "I5" },
                  { y: 200, label: "I6" },
                  { y: 225, label: "I7" }
                ].map((pt, i) => (
                  <g key={i}>
                    <line x1="60" y1={pt.y} x2="180" y2={pt.y} stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="60" cy={pt.y} r="3.5" fill="#38bdf8" />
                    <text x="35" y={pt.y + 4} fill="#7dd3fc" fontWeight="bold">{pt.label}</text>
                  </g>
                ))}

                {/* Trapezoid MUX Symbol */}
                <polygon
                  points="180,30 360,80 360,200 180,250"
                  fill="#0f172a"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
                <text x="270" y="130" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">8-to-1</text>
                <text x="270" y="152" fill="#a5b4fc" textAnchor="middle" fontSize="12">MULTIPLEXER</text>

                {/* Select Lines on Bottom */}
                <line x1="230" y1="235" x2="230" y2="290" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="230" cy="290" r="4" fill="#f59e0b" />
                <text x="230" y="308" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S2 (MSB)</text>

                <line x1="270" y1="225" x2="270" y2="290" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="270" cy="290" r="4" fill="#f59e0b" />
                <text x="270" y="308" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S1</text>

                <line x1="310" y1="215" x2="310" y2="290" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="310" cy="290" r="4" fill="#f59e0b" />
                <text x="310" y="308" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S0 (LSB)</text>

                {/* Output */}
                <line x1="360" y1="140" x2="480" y2="140" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="480" cy="140" r="4" fill="#10b981" />
                <text x="495" y="144" fill="#6ee7b7" fontWeight="bold" fontSize="14">Output (Y)</text>
              </svg>
            </div>
          </div>

          {/* VECTOR SVG 2: GATE SCHEMATIC */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              3. Logic Gate Schematic (3 NOT + 8 AND + 1 OR Gate)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 760 360" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* 3 Select Rails with inverters */}
                <text x="45" y="25" fill="#f59e0b" fontWeight="bold">S2</text>
                <line x1="50" y1="35" x2="50" y2="340" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="50" y1="50" x2="70" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="70,43 90,50 70,57" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="94" cy="50" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1" />
                <line x1="97" y1="50" x2="110" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="110" y1="50" x2="110" y2="340" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="105" y="25" fill="#fcd34d">S2&apos;</text>

                <text x="145" y="25" fill="#f59e0b" fontWeight="bold">S1</text>
                <line x1="150" y1="35" x2="150" y2="340" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="150" y1="50" x2="170" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="170,43 190,50 170,57" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="194" cy="50" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1" />
                <line x1="197" y1="50" x2="210" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="210" y1="50" x2="210" y2="340" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="205" y="25" fill="#fcd34d">S1&apos;</text>

                <text x="245" y="25" fill="#f59e0b" fontWeight="bold">S0</text>
                <line x1="250" y1="35" x2="250" y2="340" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="250" y1="50" x2="270" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="270,43 290,50 270,57" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="294" cy="50" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1" />
                <line x1="297" y1="50" x2="310" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="310" y1="50" x2="310" y2="340" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="305" y="25" fill="#fcd34d">S0&apos;</text>

                {/* 8 AND Gates and OR gate */}
                {[
                  { y: 80, label: "I0", term: "S2'S1'S0'I0" },
                  { y: 110, label: "I1", term: "S2'S1'S0 I1" },
                  { y: 140, label: "I2", term: "S2'S1 S0'I2" },
                  { y: 170, label: "I3", term: "S2'S1 S0 I3" },
                  { y: 200, label: "I4", term: "S2 S1'S0'I4" },
                  { y: 230, label: "I5", term: "S2 S1'S0 I5" },
                  { y: 260, label: "I6", term: "S2 S1 S0'I6" },
                  { y: 290, label: "I7", term: "S2 S1 S0 I7" }
                ].map((g, idx) => (
                  <g key={idx}>
                    {/* Data line */}
                    <text x="330" y={g.y + 3} fill="#38bdf8" fontSize="10">{g.label}</text>
                    <line x1="345" y1={g.y} x2="420" y2={g.y} stroke="#38bdf8" strokeWidth="1.5" />

                    {/* AND Gate */}
                    <path
                      d={"M 420," + (g.y - 12) + " L 435," + (g.y - 12) + " A 12,12 0 0,1 435," + (g.y + 12) + " L 420," + (g.y + 12) + " Z"}
                      fill="#0f172a"
                      stroke="#818cf8"
                      strokeWidth="1.5"
                    />

                    {/* Output line to OR */}
                    <line x1="447" y1={g.y} x2="570" y2={g.y} stroke="#818cf8" strokeWidth="1.5" />
                  </g>
                ))}

                {/* Massive 8-Input OR Gate */}
                <path
                  d="M 570,70 Q 590,185 570,300 Q 625,185 650,185 Q 625,185 570,70 Z"
                  fill="#0f172a"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                <line x1="650" y1="185" x2="710" y2="185" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="710" cy="185" r="4" fill="#10b981" />
                <text x="715" y="189" fill="#6ee7b7" fontWeight="bold">Y</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 8-to-1 Multiplexer Sandbox</h2>
              <p className="text-xs text-slate-400">Change select lines and toggle inputs to watch data propagate</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* SELECT SWITCHES */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                1. Selection Address Lines:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setS2(!s2)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                    s2 ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S2 (MSB) = {s2 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setS1(!s1)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                    s1 ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S1 = {s1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setS0(!s0)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                    s0 ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S0 (LSB) = {s0 ? "1" : "0"}
                </button>

                <div className="ml-auto px-4 py-2 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 font-mono text-xs flex items-center gap-2">
                  <span>Selected Binary Code:</span>
                  <span className="font-bold text-white text-sm">{s2 ? "1" : "0"}{s1 ? "1" : "0"}{s0 ? "1" : "0"}₂</span>
                  <span className="text-indigo-400">(Channel I{selectIndex})</span>
                </div>
              </div>
            </div>

            {/* 8 DATA CHANNELS */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                2. Data Input Channels (Click to Toggle 0 or 1):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
                {inputs.map((val, idx) => {
                  const isSelected = idx === selectIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleInput(idx)}
                      className={clsx(
                        "p-3 rounded-xl border text-center transition-all",
                        isSelected
                          ? "bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      )}
                    >
                      <div className="text-[11px] font-mono text-slate-400">I{idx}</div>
                      <div className={clsx("text-xl font-mono font-black my-0.5", val === 1 ? "text-cyan-400" : "text-slate-500")}>
                        {val}
                      </div>
                      <div className="text-[9px] font-bold">
                        {isSelected ? (
                          <span className="text-emerald-400">● ROUTED</span>
                        ) : (
                          <span className="text-slate-600">IDLE</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FINAL OUTPUT CARD */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-600/40 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Multiplexer Output</span>
                <div className="text-xs text-emerald-300 mt-0.5">
                  Path active: Channel <strong className="text-white font-mono">I{selectIndex}</strong> is routed directly to output <strong className="text-white font-mono">Y</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Output Level</div>
                  <div className="text-xs font-mono text-slate-300">{selectedOutput === 1 ? "LOGIC HIGH (1)" : "LOGIC LOW (0)"}</div>
                </div>
                <div
                  className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-2xl border transition-all",
                    selectedOutput === 1
                      ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/40 animate-pulse"
                      : "bg-slate-900 text-slate-600 border-slate-800"
                  )}
                >
                  {selectedOutput}
                </div>
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
              <p className="text-xs text-slate-400">High-scoring strategies and common errors</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE 4-Mark Question Blueprint</div>
              <p className="text-slate-200">
                &quot;Explain the working of an 8-to-1 Multiplexer. Draw its truth table, state its Boolean expression, and draw the logic circuit diagram using basic gates.&quot;
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Definition &amp; Formula (1 Mark):</strong> Mention 8 inputs, 3 select lines (2^3=8), 1 output.</li>
                <li><strong className="text-white">Function Table (1 Mark):</strong> 8 rows from 000 to 111 with corresponding I0 to I7.</li>
                <li><strong className="text-white">Boolean Expression (1 Mark):</strong> Complete 8-product SOP sum.</li>
                <li><strong className="text-white">Circuit Diagram (1 Mark):</strong> 3 NOT gates, 8 AND gates, and 1 large OR gate.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2 text-rose-200">
              <div className="font-bold text-rose-300 uppercase tracking-wider">Top Student Errors in Class 12 Boards</div>
              <ul className="list-disc list-inside space-y-1 text-rose-300/90">
                <li>Writing S0 as the MSB instead of S2. S2 must always be the MSB (weight 4)!</li>
                <li>Drawing 3-input AND gates instead of 4-input AND gates (forgetting the data input line Ik).</li>
                <li>Confusing Multiplexer with Encoder: Remember that an Encoder takes 2^n inputs and outputs n binary lines with NO select lines!</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-23-mux"
        headline="Sukanta Hui's Practical Tip on 8-to-1 MUX"
        note="When drawing the 8-to-1 MUX in your answer script, don't get overwhelmed by the wires! Draw the three select rails S2, S1, S0 cleanly on the left with their inverted counterparts. Then line up eight AND gates horizontally. Make each AND gate take 4 inputs: 3 from the select rails and 1 from its data input Ik. Finally, bundle all 8 outputs into one OR gate. A neat diagram gets full marks in under 4 minutes!"
      />
    </div>
  );
};

export default Topic23;
