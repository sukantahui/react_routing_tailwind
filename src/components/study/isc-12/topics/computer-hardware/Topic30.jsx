import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic30 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [din, setDin] = useState(true);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);

  const sel = (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const dBit = din ? 1 : 0;
  const y0 = sel === 0 ? dBit : 0;
  const y1 = sel === 1 ? dBit : 0;
  const y2 = sel === 2 ? dBit : 0;
  const y3 = sel === 3 ? dBit : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 30
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            1-to-2 and 1-to-4 Line Demultiplexers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Function Table, Output Derivations, and Gate-Level Schematics with Inverters and AND Gates
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Logic Sandbox" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">1-to-2 &amp; 1-to-4 Demultiplexer Logic</h2>
              <p className="text-xs text-slate-400">Detailed gate construction and signal flow</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">1-to-2 Demultiplexer</span>
                <div className="text-base font-mono font-bold text-white">1 Select Line (S)</div>
                <p className="text-xs text-slate-400">
                  Routes Din to Y0 when S=0 (Y0=S&apos;·Din), and to Y1 when S=1 (Y1=S·Din). Requires 1 NOT gate + 2 AND gates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1-to-4 Demultiplexer</span>
                <div className="text-base font-mono font-bold text-white">2 Select Lines (S1, S0)</div>
                <p className="text-xs text-slate-400">
                  Routes Din to 1 of 4 outputs. Requires 2 NOT gates + 4 three-input AND gates, with Din connected to all 4 gates.
                </p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations for 1:4 Demultiplexer</h2>
              <p className="text-xs text-slate-400">Product of selection minterm and data input Din</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Channel 0:</div>
              <div className="text-emerald-400 text-sm font-bold">Y0 = S1&apos; · S0&apos; · Din</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Channel 1:</div>
              <div className="text-emerald-400 text-sm font-bold">Y1 = S1&apos; · S0 · Din</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Channel 2:</div>
              <div className="text-emerald-400 text-sm font-bold">Y2 = S1 · S0&apos; · Din</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Channel 3:</div>
              <div className="text-emerald-400 text-sm font-bold">Y3 = S1 · S0 · Din</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Logic Circuit Schematic</h2>
              <p className="text-xs text-slate-400">Gate realization of 1-to-4 Demultiplexer</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 1-to-4 Demultiplexer Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-cyan-400 font-bold">Din</th>
                    <th className="p-3 text-amber-400 font-bold">S1</th>
                    <th className="p-3 text-amber-400 font-bold">S0</th>
                    <th className="p-3 text-emerald-400 font-bold">Y0</th>
                    <th className="p-3 text-emerald-400 font-bold">Y1</th>
                    <th className="p-3 text-emerald-400 font-bold">Y2</th>
                    <th className="p-3 text-emerald-400 font-bold">Y3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-cyan-300 font-bold">Din</td>
                    <td className="p-3 text-amber-300 font-bold">0</td>
                    <td className="p-3 text-amber-300 font-bold">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Din</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-cyan-300 font-bold">Din</td>
                    <td className="p-3 text-amber-300 font-bold">0</td>
                    <td className="p-3 text-amber-300 font-bold">1</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Din</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-cyan-300 font-bold">Din</td>
                    <td className="p-3 text-amber-300 font-bold">1</td>
                    <td className="p-3 text-amber-300 font-bold">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Din</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-cyan-300 font-bold">Din</td>
                    <td className="p-3 text-amber-300 font-bold">1</td>
                    <td className="p-3 text-amber-300 font-bold">1</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Din</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              2. Logic Gate Schematic (2 NOT Gates + 4 AND Gates)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 740 330" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Rails: Din, S1, S1', S0, S0' */}
                {/* Din Rail */}
                <text x="45" y="25" fill="#38bdf8" fontWeight="bold">Din</text>
                <line x1="55" y1="35" x2="55" y2="300" stroke="#38bdf8" strokeWidth="2.5" />

                {/* S1 Rail */}
                <text x="120" y="25" fill="#f59e0b" fontWeight="bold">S1</text>
                <line x1="125" y1="35" x2="125" y2="300" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="125" y1="55" x2="145" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="145,48 165,55 145,62" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="169" cy="55" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1" />
                <line x1="172" y1="55" x2="185" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="185" y1="55" x2="185" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="180" y="25" fill="#fcd34d">S1&apos;</text>

                {/* S0 Rail */}
                <text x="240" y="25" fill="#f59e0b" fontWeight="bold">S0</text>
                <line x1="245" y1="35" x2="245" y2="300" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="245" y1="55" x2="265" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="265,48 285,55 265,62" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="289" cy="55" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1" />
                <line x1="292" y1="55" x2="305" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="305" y1="55" x2="305" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="300" y="25" fill="#fcd34d">S0&apos;</text>

                {/* AND0: Din * S1' * S0' */}
                <circle cx="55" cy="85" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="85" x2="450" y2="85" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="95" r="3.5" fill="#f59e0b" />
                <line x1="185" y1="95" x2="450" y2="95" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="105" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="105" x2="450" y2="105" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,75 L 475,75 A 18,18 0 0,1 475,115 L 450,115 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="95" x2="590" y2="95" stroke="#10b981" strokeWidth="2" />
                <circle cx="590" cy="95" r="3.5" fill="#10b981" />
                <text x="605" y="99" fill="#6ee7b7" fontWeight="bold">Y0 = S1&apos;·S0&apos;·Din</text>

                {/* AND1: Din * S1' * S0 */}
                <circle cx="55" cy="140" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="140" x2="450" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="185" cy="150" r="3.5" fill="#f59e0b" />
                <line x1="185" y1="150" x2="450" y2="150" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="245" cy="160" r="3.5" fill="#f59e0b" />
                <line x1="245" y1="160" x2="450" y2="160" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,130 L 475,130 A 18,18 0 0,1 475,170 L 450,170 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="150" x2="590" y2="150" stroke="#10b981" strokeWidth="2" />
                <circle cx="590" cy="150" r="3.5" fill="#10b981" />
                <text x="605" y="154" fill="#6ee7b7" fontWeight="bold">Y1 = S1&apos;·S0·Din</text>

                {/* AND2: Din * S1 * S0' */}
                <circle cx="55" cy="195" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="195" x2="450" y2="195" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="125" cy="205" r="3.5" fill="#f59e0b" />
                <line x1="125" y1="205" x2="450" y2="205" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="305" cy="215" r="3.5" fill="#f59e0b" />
                <line x1="305" y1="215" x2="450" y2="215" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,185 L 475,185 A 18,18 0 0,1 475,225 L 450,225 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="205" x2="590" y2="205" stroke="#10b981" strokeWidth="2" />
                <circle cx="590" cy="205" r="3.5" fill="#10b981" />
                <text x="605" y="209" fill="#6ee7b7" fontWeight="bold">Y2 = S1·S0&apos;·Din</text>

                {/* AND3: Din * S1 * S0 */}
                <circle cx="55" cy="250" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="250" x2="450" y2="250" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="125" cy="260" r="3.5" fill="#f59e0b" />
                <line x1="125" y1="260" x2="450" y2="260" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="245" cy="270" r="3.5" fill="#f59e0b" />
                <line x1="245" y1="270" x2="450" y2="270" stroke="#64748b" strokeWidth="1.5" />

                <path d="M 450,240 L 475,240 A 18,18 0 0,1 475,280 L 450,280 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="493" y1="260" x2="590" y2="260" stroke="#10b981" strokeWidth="2" />
                <circle cx="590" cy="260" r="3.5" fill="#10b981" />
                <text x="605" y="264" fill="#6ee7b7" fontWeight="bold">Y3 = S1·S0·Din</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 1-to-4 Demultiplexer Simulator</h2>
              <p className="text-xs text-slate-400">Toggle Din and select lines to see instantaneous signal propagation</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Data Input:</span>
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

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Select Lines:</span>
                <button
                  onClick={() => setS1(!s1)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    s1 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S1 = {s1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setS0(!s0)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    s0 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S0 = {s0 ? "1" : "0"}
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { name: "Y0", val: y0, active: sel === 0 },
                { name: "Y1", val: y1, active: sel === 1 },
                { name: "Y2", val: y2, active: sel === 2 },
                { name: "Y3", val: y3, active: sel === 3 }
              ].map((out, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-4 rounded-xl border text-center transition-all",
                    out.active
                      ? "bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20"
                      : "bg-slate-900/40 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="text-xs font-mono text-slate-400 mb-1">{out.name}</div>
                  <div
                    className={clsx(
                      "text-3xl font-mono font-black mb-1",
                      out.val === 1 ? "text-emerald-400 animate-pulse" : "text-slate-600"
                    )}
                  >
                    {out.val}
                  </div>
                  <div className="text-[10px]">
                    {out.active ? (
                      <span className="text-emerald-400 font-bold">● ACTIVE</span>
                    ) : (
                      <span className="text-slate-600">0</span>
                    )}
                  </div>
                </div>
              ))}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 1-to-4 DEMUX</h2>
              <p className="text-xs text-slate-400">Essential drawing tips and marking points</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE 3-Mark Question Pattern</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Truth Table (1 Mark):</strong> Showing Din being routed to Y0 through Y3 based on S1, S0.</li>
                <li><strong className="text-white">Circuit Diagram (2 Marks):</strong> 2 NOT gates and 4 AND gates, each having 3 inputs (Din + 2 select lines).</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-30-demux"
        headline="Sukanta Hui's Board Drawing Rule for 1:4 DEMUX"
        note="Don't forget that in a Demultiplexer, the data input Din must connect to EVERY SINGLE AND GATE! Many students forget the Din line and only connect S1 and S0, which accidentally turns the circuit into a 2:4 Decoder! Make sure each AND gate has 3 inputs: Din, S1 (or S1'), and S0 (or S0')!"
      />
    </div>
  );
};

export default Topic30;
