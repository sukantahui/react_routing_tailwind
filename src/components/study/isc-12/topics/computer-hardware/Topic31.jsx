import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic31 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [din, setDin] = useState(true);
  const [s2, setS2] = useState(false);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);

  const sel = (s2 ? 4 : 0) + (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const dBit = din ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 31
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            1-to-8 Line Demultiplexer: Logic &amp; Routing
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            1 Data Input Din, 3 Select Lines S2, S1, S0, 8 Outputs Y0–Y7, Truth Table, and Gate Schematic
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Routing" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive 1:8 DEMUX Sandbox" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">1-to-8 Demultiplexer Architecture</h2>
              <p className="text-xs text-slate-400">Distributing a single input across 8 destination channels</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              A <strong className="text-cyan-400">1-to-8 Demultiplexer</strong> has <strong className="text-white">1 data input line (Din)</strong>, <strong className="text-amber-400">3 selection lines (S2, S1, S0)</strong>, and <strong className="text-emerald-400">8 output lines (Y0 through Y7)</strong>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Input</span>
                <div className="text-base font-mono font-bold text-white">1 Data Line Din</div>
                <p className="text-xs text-slate-400">Routed to one output at a time.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Selection</span>
                <div className="text-base font-mono font-bold text-white">3 Lines (S2, S1, S0)</div>
                <p className="text-xs text-slate-400">2^3 = 8 routing combinations.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Gate Count</span>
                <div className="text-base font-mono font-bold text-white">3 NOT + 8 AND</div>
                <p className="text-xs text-slate-400">Each AND gate requires 4 inputs.</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">8 Boolean Output Equations</h2>
              <p className="text-xs text-slate-400">General formula: Yk = mk · Din</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
            {[
              { name: "Y0", eq: "S2'·S1'·S0'·Din" },
              { name: "Y1", eq: "S2'·S1'·S0 ·Din" },
              { name: "Y2", eq: "S2'·S1 ·S0'·Din" },
              { name: "Y3", eq: "S2'·S1 ·S0 ·Din" },
              { name: "Y4", eq: "S2 ·S1'·S0'·Din" },
              { name: "Y5", eq: "S2 ·S1'·S0 ·Din" },
              { name: "Y6", eq: "S2 ·S1 ·S0'·Din" },
              { name: "Y7", eq: "S2 ·S1 ·S0 ·Din" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">{item.name} =</span>
                <span className="text-emerald-400 font-bold">{item.eq}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Schematic</h2>
              <p className="text-xs text-slate-400">Complete routing table and vector logic diagrams</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 1-to-8 Demultiplexer Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5 text-cyan-400">Din</th>
                    <th className="p-2.5 text-amber-400">S2</th>
                    <th className="p-2.5 text-amber-400">S1</th>
                    <th className="p-2.5 text-amber-400">S0</th>
                    <th className="p-2.5 text-emerald-400">Y0</th>
                    <th className="p-2.5 text-emerald-400">Y1</th>
                    <th className="p-2.5 text-emerald-400">Y2</th>
                    <th className="p-2.5 text-emerald-400">Y3</th>
                    <th className="p-2.5 text-emerald-400">Y4</th>
                    <th className="p-2.5 text-emerald-400">Y5</th>
                    <th className="p-2.5 text-emerald-400">Y6</th>
                    <th className="p-2.5 text-emerald-400">Y7</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const b2 = (i >> 2) & 1;
                    const b1 = (i >> 1) & 1;
                    const b0 = i & 1;
                    return (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-cyan-300 font-bold">Din</td>
                        <td className="p-2.5 text-amber-400">{b2}</td>
                        <td className="p-2.5 text-amber-400">{b1}</td>
                        <td className="p-2.5 text-amber-400">{b0}</td>
                        {Array.from({ length: 8 }).map((_, yIdx) => (
                          <td
                            key={yIdx}
                            className={clsx(
                              "p-2.5 font-bold",
                              yIdx === i ? "text-emerald-400 bg-emerald-950/20" : "text-slate-500"
                            )}
                          >
                            {yIdx === i ? "Din" : "0"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. 1-to-8 Demultiplexer Block Diagram
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 600 300" className="w-full max-w-xl h-auto select-none font-mono text-xs">
                {/* Input Din */}
                <line x1="60" y1="135" x2="190" y2="135" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="60" cy="135" r="4" fill="#38bdf8" />
                <text x="30" y="139" fill="#7dd3fc" fontWeight="bold">Din</text>

                {/* Trapezoid */}
                <polygon points="190,85 380,30 380,240 190,185" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="285" y="125" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">1-to-8</text>
                <text x="285" y="148" fill="#a5b4fc" textAnchor="middle" fontSize="12">DEMULTIPLEXER</text>

                {/* Select Lines */}
                <line x1="250" y1="200" x2="250" y2="265" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="250" cy="265" r="3.5" fill="#f59e0b" />
                <text x="250" y="282" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S2 (MSB)</text>

                <line x1="285" y1="210" x2="285" y2="265" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="285" cy="265" r="3.5" fill="#f59e0b" />
                <text x="285" y="282" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S1</text>

                <line x1="320" y1="220" x2="320" y2="265" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="320" cy="265" r="3.5" fill="#f59e0b" />
                <text x="320" y="282" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S0 (LSB)</text>

                {/* 8 Outputs */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const y = 50 + i * 25;
                  return (
                    <g key={i}>
                      <line x1="380" y1={y} x2="480" y2={y} stroke="#10b981" strokeWidth="1.5" />
                      <circle cx="480" cy={y} r="3" fill="#10b981" />
                      <text x="495" y={y + 3} fill="#6ee7b7" fontSize="10">Y{i}</text>
                    </g>
                  );
                })}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 1-to-8 DEMUX Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle Din and select bits S2, S1, S0 to watch the active line illuminate</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Input:</span>
                <button
                  onClick={() => setDin(!din)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                    din ? "bg-cyan-600 text-white border-cyan-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  Din = {din ? "1" : "0"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Select (S2 S1 S0):</span>
                {[
                  { name: "S2", val: s2, set: setS2 },
                  { name: "S1", val: s1, set: setS1 },
                  { name: "S0", val: s0, set: setS0 }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => s.set(!s.val)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                      s.val ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                    )}
                  >
                    {s.name}={s.val ? "1" : "0"}
                  </button>
                ))}
              </div>
            </div>

            {/* 8 OUTPUTS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const isActive = sel === i;
                const outVal = isActive ? dBit : 0;
                return (
                  <div
                    key={i}
                    className={clsx(
                      "p-3 rounded-xl border text-center transition-all",
                      isActive
                        ? "bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/30"
                        : "bg-slate-900/40 border-slate-800 opacity-60"
                    )}
                  >
                    <div className="text-[10px] font-mono text-slate-400">Y{i}</div>
                    <div className={clsx("text-2xl font-mono font-black my-1", outVal === 1 ? "text-emerald-400" : "text-slate-600")}>
                      {outVal}
                    </div>
                    <div className="text-[9px]">
                      {isActive ? <span className="text-emerald-400 font-bold">ACTIVE</span> : <span className="text-slate-600">0</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Selected Path:</span>
              <span className="text-emerald-400 font-mono font-bold">
                {"Channel Y" + sel + " receives Din (" + dBit + ")"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 1-to-8 Demultiplexer</h2>
              <p className="text-xs text-slate-400">Marking pattern for 4-mark questions</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">Exam Blueprint (4 Marks)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Truth Table (1 Mark):</strong> Complete 8-row routing table.</li>
                <li><strong className="text-white">Boolean Equations (1 Mark):</strong> All 8 equations Yk = mk · Din.</li>
                <li><strong className="text-white">Logic Circuit Diagram (2 Marks):</strong> 3 NOT gates + 8 four-input AND gates with Din connected to every gate.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-31-demux"
        headline="Sukanta Hui's Board Strategy for 1:8 DEMUX"
        note="If asked to draw the gate-level schematic of a 1-to-8 DEMUX, remember that each of the 8 AND gates must have exactly 4 inputs: 3 from the select rails and 1 from Din. Take a clean ruler, draw the 4 vertical rails on the left, and connect each gate methodically. You will finish in 3 minutes flat with zero errors!"
      />
    </div>
  );
};

export default Topic31;
