import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic24_faqs";

const Topic24 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s3, setS3] = useState(false);
  const [s2, setS2] = useState(false);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);
  const [activeChannel, setActiveChannel] = useState(0);

  const selectedIndex = (s3 ? 8 : 0) + (s2 ? 4 : 0) + (s1 ? 2 : 0) + (s0 ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 24
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            16-to-1 Line Multiplexer: Architecture &amp; Selection Logic
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            16 Data Inputs I0–I15, 4 Select Lines S3–S0, Function Table, Commercial IC 74150, and Block Diagram
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Selection" },
              { id: "truthTable", label: "3. Function Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive 16-Channel Sandbox" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">16-to-1 Multiplexer Principle</h2>
              <p className="text-xs text-slate-400">Managing 16 distinct data channels through 4 select bits</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              A <strong className="text-cyan-400">16-to-1 Multiplexer</strong> compresses 16 parallel data lines (<span className="text-white font-mono">I0 through I15</span>) onto a single output line <span className="text-emerald-400 font-mono">Y</span> using 4 selection lines (<span className="text-indigo-400 font-mono">S3, S2, S1, S0</span>).
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Channel Capacity</span>
                <div className="text-lg font-mono font-bold text-white">16 Channels</div>
                <p className="text-xs text-slate-400">Inputs labeled I0 to I15</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Select Bit Formula</span>
                <div className="text-lg font-mono font-bold text-white">4 Select Lines</div>
                <p className="text-xs text-slate-400">2^4 = 16 (S3=MSB, S0=LSB)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Standard IC</span>
                <div className="text-lg font-mono font-bold text-white">IC 74150</div>
                <p className="text-xs text-slate-400">24-pin DIP TTL integrated circuit</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <span className="font-bold text-indigo-300">Why are 16:1 MUXes rarely drawn gate-by-gate in ISC Board Exams?</span>
              <p>
                A gate-level implementation would require 16 five-input AND gates and a 16-input OR gate! For this reason, CISCE strictly asks for the <strong className="text-white">Block Diagram</strong> or for <strong className="text-white">Cascaded Implementations using two 8:1 MUXes</strong>.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Selection Equation</h2>
              <p className="text-xs text-slate-400">Sum of 16 minterm product terms</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              The generalized Boolean output equation for a 16-to-1 Multiplexer is:
            </p>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-400 space-y-1">
              <div>Y = ∑ (k=0 to 15) [ mk · Ik ]</div>
              <div className="text-slate-500 text-xs mt-2">
                where mk is the k-th minterm of 4 variables S3, S2, S1, S0 (e.g., m0 = S3&apos;S2&apos;S1&apos;S0&apos;, m15 = S3·S2·S1·S0).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="font-bold text-cyan-400">Example Minterm Pairings:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>When S3S2S1S0 = 0000 → Y = I0</li>
                <li>When S3S2S1S0 = 0101 → Y = I5</li>
                <li>When S3S2S1S0 = 1010 → Y = I10</li>
                <li>When S3S2S1S0 = 1111 → Y = I15</li>
              </ul>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Block Diagram</h2>
              <p className="text-xs text-slate-400">16-state truth table and architectural diagram</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 16-to-1 Multiplexer Function Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner max-h-72">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 sticky top-0">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">S3 (MSB)</th>
                    <th className="p-3 text-amber-400 font-bold">S2</th>
                    <th className="p-3 text-amber-400 font-bold">S1</th>
                    <th className="p-3 text-amber-400 font-bold">S0 (LSB)</th>
                    <th className="p-3 text-emerald-400 font-bold">Output (Y)</th>
                    <th className="p-3 text-cyan-400 font-bold">Decimal Channel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const b3 = (i >> 3) & 1;
                    const b2 = (i >> 2) & 1;
                    const b1 = (i >> 1) & 1;
                    const b0 = i & 1;
                    return (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-indigo-300 font-bold">{b3}</td>
                        <td className="p-2.5 text-indigo-300 font-bold">{b2}</td>
                        <td className="p-2.5 text-indigo-300 font-bold">{b1}</td>
                        <td className="p-2.5 text-indigo-300 font-bold">{b0}</td>
                        <td className="p-2.5 text-emerald-400 font-extrabold">I{i}</td>
                        <td className="p-2.5 text-slate-400">Channel {i}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG 1: BLOCK DIAGRAM */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. 16-to-1 Multiplexer Block Diagram
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 640 360" className="w-full max-w-xl h-auto select-none font-mono text-xs">
                {/* 16 Inputs on left */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const y = 35 + i * 18;
                  return (
                    <g key={i}>
                      <line x1="60" y1={y} x2="190" y2={y} stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="60" cy={y} r="2.5" fill="#38bdf8" />
                      <text x="35" y={y + 3} fill="#7dd3fc" fontSize="9">I{i}</text>
                    </g>
                  );
                })}

                {/* Trapezoid MUX */}
                <polygon
                  points="190,20 380,75 380,250 190,305"
                  fill="#0f172a"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
                <text x="285" y="150" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">16-to-1</text>
                <text x="285" y="172" fill="#a5b4fc" textAnchor="middle" fontSize="12">MULTIPLEXER</text>
                <text x="285" y="190" fill="#94a3b8" textAnchor="middle" fontSize="10">(IC 74150)</text>

                {/* 4 Select Lines on bottom */}
                {[
                  { x: 235, label: "S3 (MSB)" },
                  { x: 265, label: "S2" },
                  { x: 295, label: "S1" },
                  { x: 325, label: "S0 (LSB)" }
                ].map((s, idx) => (
                  <g key={idx}>
                    <line x1={s.x} y1="270" x2={s.x} y2="330" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx={s.x} cy="330" r="3.5" fill="#f59e0b" />
                    <text x={s.x} y="348" fill="#fcd34d" textAnchor="middle" fontSize="9" fontWeight="bold">{s.label}</text>
                  </g>
                ))}

                {/* Output on right */}
                <line x1="380" y1="162" x2="520" y2="162" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="520" cy="162" r="4" fill="#10b981" />
                <text x="535" y="166" fill="#6ee7b7" fontWeight="bold" fontSize="14">Output (Y)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 16-Channel Selection Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle the 4 select lines and observe the selected input line</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* 4 SELECT BITS */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Binary Select Switches (S3 S2 S1 S0):
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: "S3 (MSB)", val: s3, set: setS3 },
                  { name: "S2", val: s2, set: setS2 },
                  { name: "S1", val: s1, set: setS1 },
                  { name: "S0 (LSB)", val: s0, set: setS0 }
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => s.set(!s.val)}
                    className={clsx(
                      "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                      s.val ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                    )}
                  >
                    {s.name} = {s.val ? "1" : "0"}
                  </button>
                ))}

                <div className="ml-auto px-3.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 font-mono text-xs flex items-center gap-2">
                  <span>Selected Binary Code:</span>
                  <span className="font-bold text-white text-sm">
                    {s3 ? "1" : "0"}{s2 ? "1" : "0"}{s1 ? "1" : "0"}{s0 ? "1" : "0"}₂
                  </span>
                  <span className="text-indigo-400 font-bold">(= I{selectedIndex})</span>
                </div>
              </div>
            </div>

            {/* 16 INPUT CHANNELS GRID */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {Array.from({ length: 16 }).map((_, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "p-2.5 rounded-lg border text-center transition-all",
                      isSelected
                        ? "bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-md shadow-emerald-500/20"
                        : "bg-slate-900/50 border-slate-800 text-slate-500"
                    )}
                  >
                    <div className="text-[10px] font-mono text-slate-400">I{idx}</div>
                    <div className="text-xs font-mono font-bold mt-0.5">
                      {isSelected ? (
                        <span className="text-emerald-400">ACTIVE</span>
                      ) : (
                        <span className="text-slate-600">OFF</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Multiplexer State: </span>
                <span className="font-mono font-bold text-emerald-400">Input channel I{selectedIndex} is connected to Output Y</span>
              </div>
              <div className="font-mono font-bold text-white text-sm bg-slate-950 px-3 py-1 rounded border border-slate-700">
                Y = I{selectedIndex}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 16-to-1 Multiplexer</h2>
              <p className="text-xs text-slate-400">Standard questions and marking scheme</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">Exam Questions Usually Asked:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>&quot;How many select lines are required for a 16-to-1 Multiplexer? State the relation.&quot; (Answer: 2^m = N → 2^4 = 16, hence 4 select lines).</li>
                <li>&quot;Draw the block diagram of a 16-to-1 Multiplexer.&quot; (Draw the trapezoid with 16 inputs, 4 select lines, and 1 output).</li>
                <li>&quot;Show how two 8-to-1 multiplexers can be used to construct a 16-to-1 multiplexer.&quot; (See Topic 26 for full cascade solution).</li>
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
        topicId="topic-24-mux"
        headline="Sukanta Hui's Board Tip on 16:1 MUX"
        note="Do NOT attempt to draw the gate-level circuit with 16 AND gates in an examination unless explicitly demanded! CISCE tests your conceptual understanding of the selection formula (2^4 = 16) and cascading trees. Focus on clean block diagrams and function tables!"
      />
    </div>
  );
};

export default Topic24;
