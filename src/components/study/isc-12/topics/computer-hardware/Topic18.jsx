import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic18 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [a, setA] = useState(false); // MSB / chip selector
  const [address, setAddress] = useState(9); // 0 to 15

  const activeChannel = address;
  const dec1Active = activeChannel < 8;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 18
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Designing 4-to-16 Line Decoder using Two 3-to-8 Decoders
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            16-Channel Address Decoding: MSB (A) Steering Chip Enables via Inverter, Parallel Bus Distribution (B, C, D)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Address Range Partitioning" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive 16-Channel Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">4-to-16 Line Memory Address Decoder</h2>
              <p className="text-xs text-slate-400">Expansion from two 3-to-8 decoders to decode 16 discrete memory banks</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A 4-to-16 line decoder has 4 input bits (A, B, C, D) and 16 output lines ($Y_0$ to $Y_{15}$).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              To construct it from two 3-to-8 decoders with Enable:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              <li>Inputs $B, C, D$ are connected in parallel to the 3 data inputs of both 3:8 decoders.</li>
              <li>Input $A$ (MSB) connects through a NOT gate to the Enable of Decoder 1 ($Y_0$ to $Y_7$, memory address 0000 to 0111).</li>
              <li>Input $A$ connects directly to the Enable of Decoder 2 ($Y_8$ to $Y_{15}$, memory address 1000 to 1111).</li>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Address Range Mapping</h2>
              <p className="text-xs text-slate-400">Partitioning 16 minterms across two 8-minterm chips</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">{"Chip 1 (A = 0): Minterms m0 to m7"}</span >
              <p className="text-slate-400 font-sans text-[11px]">Active when MSB A = 0 (E1 = A' = 1):</p>
              <div className="text-slate-300">{"Y0 = A'B'C'D' ... Y7 = A'BCD"}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Chip 2 (A = 1): Minterms m8 to m15</span>
              <p className="text-slate-400 font-sans text-[11px]">Active when MSB A = 1 (E2 = A = 1):</p>
              <div className="text-slate-300">{"Y8 = AB'C'D' ... Y15 = ABCD"}</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Cascaded Block Diagrams</h2>
              <p className="text-xs text-slate-400">16-row function table and dual 3:8 decoder schematic</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 16-Row Addressing Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2 text-amber-400 border-r border-slate-800">A (MSB)</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">B</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">C</th>
                    <th className="p-2 text-cyan-400 border-r border-slate-800">D</th>
                    <th className="p-2 text-purple-300 border-r border-slate-800">Active Chip</th>
                    <th className="p-2 text-emerald-400">Active Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    [0, 0, 0, 0, "Decoder 1", "Y0 (m0)"],
                    [0, 0, 0, 1, "Decoder 1", "Y1 (m1)"],
                    [0, 0, 1, 0, "Decoder 1", "Y2 (m2)"],
                    [0, 0, 1, 1, "Decoder 1", "Y3 (m3)"],
                    [0, 1, 0, 0, "Decoder 1", "Y4 (m4)"],
                    [0, 1, 0, 1, "Decoder 1", "Y5 (m5)"],
                    [0, 1, 1, 0, "Decoder 1", "Y6 (m6)"],
                    [0, 1, 1, 1, "Decoder 1", "Y7 (m7)"],
                    [1, 0, 0, 0, "Decoder 2", "Y8 (m8)"],
                    [1, 0, 0, 1, "Decoder 2", "Y9 (m9)"],
                    [1, 0, 1, 0, "Decoder 2", "Y10 (m10)"],
                    [1, 0, 1, 1, "Decoder 2", "Y11 (m11)"],
                    [1, 1, 0, 0, "Decoder 2", "Y12 (m12)"],
                    [1, 1, 0, 1, "Decoder 2", "Y13 (m13)"],
                    [1, 1, 1, 0, "Decoder 2", "Y14 (m14)"],
                    [1, 1, 1, 1, "Decoder 2", "Y15 (m15)"]
                  ].map(([ra, rb, rc, rd, chip, out], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800 text-amber-400 font-bold">{ra}</td>
                      <td className="p-2 border-r border-slate-800">{rb}</td>
                      <td className="p-2 border-r border-slate-800">{rc}</td>
                      <td className="p-2 border-r border-slate-800">{rd}</td>
                      <td className="p-2 border-r border-slate-800 text-cyan-300 font-sans">{chip}</td>
                      <td className="p-2 font-bold text-emerald-400">{out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BLOCK DIAGRAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> 2. 4-to-16 Cascaded Block Diagram
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 280" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Inputs B, C, D */}
                <line x1="80" y1="40" x2="80" y2="240" stroke="#06b6d4" strokeWidth="2" />
                <text x="80" y="28" fill="#06b6d4" fontWeight="bold">B</text>

                <line x1="120" y1="40" x2="120" y2="240" stroke="#06b6d4" strokeWidth="2" />
                <text x="120" y="28" fill="#06b6d4" fontWeight="bold">C</text>

                <line x1="160" y1="40" x2="160" y2="240" stroke="#06b6d4" strokeWidth="2" />
                <text x="160" y="28" fill="#06b6d4" fontWeight="bold">D</text>

                {/* MSB A */}
                <line x1="200" y1="40" x2="200" y2="240" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="200" y="28" fill="#fbbf24" fontWeight="bold">A</text>

                {/* Inverter on A to Dec 1 */}
                <circle cx="200" cy="70" r="4" fill="#f59e0b" />
                <line x1="200" y1="70" x2="250" y2="70" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="250,65 265,70 250,75" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="268" cy="70" r="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="271" y1="70" x2="330" y2="70" stroke="#f59e0b" strokeWidth="2" />

                {/* Direct A to Dec 2 */}
                <circle cx="200" cy="180" r="4" fill="#f59e0b" />
                <line x1="200" y1="180" x2="330" y2="180" stroke="#f59e0b" strokeWidth="2" />

                {/* Decoder 1 */}
                <g transform="translate(330, 30)">
                  <rect x="0" y="0" width="180" height="90" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="90" y="30" fill="#ffffff" fontWeight="bold" textAnchor="middle">3:8 DECODER 1</text>
                  <text x="90" y="50" fill="#a5b4fc" fontSize="10" textAnchor="middle">Outputs Y0 to Y7</text>
                  <line x1="180" y1="45" x2="260" y2="45" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="275" y="49" fill="#c084fc" fontWeight="bold">Y0 - Y7</text>
                </g>

                {/* Decoder 2 */}
                <g transform="translate(330, 140)">
                  <rect x="0" y="0" width="180" height="90" rx="8" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                  <text x="90" y="30" fill="#ffffff" fontWeight="bold" textAnchor="middle">3:8 DECODER 2</text>
                  <text x="90" y="50" fill="#f5d0fe" fontSize="10" textAnchor="middle">Outputs Y8 to Y15</text>
                  <line x1="180" y1="45" x2="260" y2="45" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="275" y="49" fill="#c084fc" fontWeight="bold">Y8 - Y15</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 16-Channel Memory Decoder</h2>
              <p className="text-xs text-slate-400">Click any address (0 to 15) to see which 3:8 decoder chip handles the address</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setAddress(idx)}
                  className={clsx(
                    "p-2.5 rounded-lg font-mono text-xs font-bold transition-all border flex flex-col items-center",
                    address === idx
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span>{idx}</span>
                  <span className="text-[9px]">Y{idx}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Selected Address Channel</div>
              <div className="text-4xl font-extrabold font-mono text-emerald-300 py-1">
                Output Line Y{address} Active
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Routed to: {dec1Active ? "Decoder 1 (Lower 8 lines, MSB A=0)" : "Decoder 2 (Upper 8 lines, MSB A=1)"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 4:16 Decoder</h2>
              <p className="text-xs text-slate-400">Memory addressing concepts in CISCE questions</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Board Question Formula</div>
            <p className="text-slate-300 leading-relaxed">
              How many 3-to-8 decoders are required to construct a 4-to-16 decoder? Answer: 2 decoders (since 16 / 8 = 2). How many 2-to-4 decoders are required? Answer: 4 decoders for the outputs + 1 decoder for the enable inputs = 5 decoders total!
            </p>
          </div>
        </section>
      )}

      <section>
        <Teacher note="Address decoding is how the CPU picks which RAM chip to talk to. A 4-to-16 line decoder handles a 4-bit address bus to select 16 distinct RAM locations." />
      </section>
    </div>
  );
};

export default Topic18;
