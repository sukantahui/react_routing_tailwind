import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic26_faqs";

const Topic26 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [s3, setS3] = useState(false);
  const [s2, setS2] = useState(false);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);

  const localIndex = (s2 ? 4 : 0) + (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const globalIndex = (!s3 ? 0 : 8) + localIndex;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 26
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cascading Multiplexer Trees: 16-to-1 MUX using Two 8-to-1 MUXes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Designing a 16-Channel Selector with Two 8:1 MUX Chips, Inverter on S3, Common Select Lines S2–S0, and Output OR Gate
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
              <h2 className="text-lg sm:text-xl font-bold text-white">16:1 MUX Synthesis from Two 8:1 MUXes</h2>
              <p className="text-xs text-slate-400">Expansion ratio and chip select architecture</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              To construct a <strong className="text-cyan-400">16-to-1 Multiplexer</strong> using <strong className="text-indigo-400">8-to-1 Multiplexers</strong>, we need <strong className="text-white">two 8:1 MUXes</strong>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Upper Chip 1</span>
                <div className="text-base font-mono font-bold text-white">Inputs I0 to I7</div>
                <p className="text-xs text-slate-400">Enabled when S3 = 0 (via NOT gate)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Lower Chip 2</span>
                <div className="text-base font-mono font-bold text-white">Inputs I8 to I15</div>
                <p className="text-xs text-slate-400">Enabled when S3 = 1 directly</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Select Lines</span>
                <div className="text-base font-mono font-bold text-white">S2, S1, S0</div>
                <p className="text-xs text-slate-400">Shared in parallel across both chips</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical Equivalence</h2>
              <p className="text-xs text-slate-400">Sum of outputs through final OR gate</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-sans font-semibold">Sub-circuit Outputs:</div>
              <div>Y1 = S3&apos; · [ ∑ (k=0 to 7) mk(S2,S1,S0) · Ik ]</div>
              <div>Y2 = S3  · [ ∑ (k=0 to 7) mk(S2,S1,S0) · I(k+8) ]</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
              <div className="text-slate-400 font-sans font-semibold">Combined Output:</div>
              <div>Y = Y1 + Y2</div>
              <div>Y = ∑ (k=0 to 15) [ mk(S3,S2,S1,S0) · Ik ]</div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Cascading Block Diagram</h2>
              <p className="text-xs text-slate-400">Interconnection of two 8:1 MUXes and an OR gate</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 16:1 Cascading Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner max-h-72">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 sticky top-0">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">S3 (Bank Select)</th>
                    <th className="p-3 text-indigo-400 font-bold">S2 S1 S0</th>
                    <th className="p-3 text-cyan-400 font-bold">Active Multiplexer</th>
                    <th className="p-3 text-emerald-400 font-bold">Output (Y)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const b3 = (i >> 3) & 1;
                    const rem = i % 8;
                    const b210 = ((rem >> 2) & 1) + "" + ((rem >> 1) & 1) + "" + (rem & 1);
                    return (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-amber-400 font-bold">{b3}</td>
                        <td className="p-2.5 text-indigo-300">{b210}</td>
                        <td className="p-2.5 text-cyan-300">{b3 === 0 ? "MUX 1 (I0–I7)" : "MUX 2 (I8–I15)"}</td>
                        <td className="p-2.5 text-emerald-400 font-extrabold">I{i}</td>
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
              2. Cascading Block Diagram (Two 8:1 MUX + Inverter + OR Gate)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 760 360" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* Upper 8:1 MUX */}
                <polygon points="180,30 330,60 330,160 180,190" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="255" y="110" fill="#e0e7ff" textAnchor="middle" fontWeight="bold">8:1 MUX (1)</text>
                <text x="255" y="130" fill="#a5b4fc" textAnchor="middle" fontSize="10">Inputs I0–I7</text>

                {/* Lower 8:1 MUX */}
                <polygon points="180,210 330,240 330,340 180,370" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="255" y="290" fill="#e0e7ff" textAnchor="middle" fontWeight="bold">8:1 MUX (2)</text>
                <text x="255" y="310" fill="#a5b4fc" textAnchor="middle" fontSize="10">Inputs I8–I15</text>

                {/* Inputs Left */}
                <line x1="80" y1="110" x2="180" y2="110" stroke="#38bdf8" strokeWidth="2" />
                <text x="30" y="114" fill="#7dd3fc" fontWeight="bold">I0–I7</text>

                <line x1="80" y1="290" x2="180" y2="290" stroke="#38bdf8" strokeWidth="2" />
                <text x="25" y="294" fill="#7dd3fc" fontWeight="bold">I8–I15</text>

                {/* S3 Select and NOT gate */}
                <line x1="120" y1="390" x2="120" y2="150" stroke="#f59e0b" strokeWidth="2" />
                <text x="120" y="405" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S3 (MSB)</text>

                <polygon points="110,150 130,150 120,125" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="120" cy="120" r="3" fill="#020617" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="120" y1="117" x2="120" y2="40" stroke="#f59e0b" strokeWidth="2" />
                <line x1="120" y1="40" x2="230" y2="40" stroke="#f59e0b" strokeWidth="2" />
                <text x="230" y="33" fill="#fcd34d" textAnchor="middle" fontSize="10">E1 (S3&apos;)</text>

                <circle cx="120" cy="225" r="3.5" fill="#f59e0b" />
                <line x1="120" y1="225" x2="230" y2="225" stroke="#f59e0b" strokeWidth="2" />
                <text x="230" y="218" fill="#fcd34d" textAnchor="middle" fontSize="10">E2 (S3)</text>

                {/* Common Select Lines S2, S1, S0 */}
                <line x1="290" y1="390" x2="290" y2="150" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 3" />
                <text x="290" y="405" fill="#c4b5fd" textAnchor="middle" fontWeight="bold">S2, S1, S0</text>
                <circle cx="290" cy="330" r="3" fill="#a78bfa" />
                <circle cx="290" cy="150" r="3" fill="#a78bfa" />

                {/* Outputs to OR Gate */}
                <line x1="330" y1="110" x2="500" y2="110" stroke="#818cf8" strokeWidth="2" />
                <text x="410" y="102" fill="#a5b4fc">Y1</text>

                <line x1="330" y1="290" x2="500" y2="290" stroke="#818cf8" strokeWidth="2" />
                <text x="410" y="282" fill="#a5b4fc">Y2</text>

                <line x1="500" y1="110" x2="540" y2="165" stroke="#818cf8" strokeWidth="2" />
                <line x1="500" y1="290" x2="540" y2="235" stroke="#818cf8" strokeWidth="2" />

                <path
                  d="M 540,155 Q 565,200 540,245 Q 590,200 620,200 Q 590,200 540,155 Z"
                  fill="#0f172a"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                <line x1="620" y1="200" x2="700" y2="200" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="700" cy="200" r="4" fill="#10b981" />
                <text x="715" y="204" fill="#6ee7b7" fontWeight="bold" fontSize="14">Output (Y)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Live 16:1 Cascading Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle S3 to switch banks; use S2–S0 to select individual channels</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Master Bank Select (S3):</span>
                <button
                  onClick={() => setS3(!s3)}
                  className={clsx(
                    "w-full py-2.5 rounded-lg font-mono font-bold text-sm border transition-all",
                    s3 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700"
                  )}
                >
                  S3 = {s3 ? "1 (Lower Bank MUX 2: I8–I15)" : "0 (Upper Bank MUX 1: I0–I7)"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Channel Select (S2 S1 S0):</span>
                <div className="flex gap-2">
                  {[
                    { name: "S2", val: s2, set: setS2 },
                    { name: "S1", val: s1, set: setS1 },
                    { name: "S0", val: s0, set: setS0 }
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => s.set(!s.val)}
                      className={clsx(
                        "flex-1 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                        s.val ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-800 text-slate-400 border-slate-700"
                      )}
                    >
                      {s.name} = {s.val ? "1" : "0"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Active Channel:</span>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 16:1 from two 8:1 MUXes</h2>
              <p className="text-xs text-slate-400">Marking points and diagram presentation</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">Exam Marking Breakdown (3 to 4 Marks)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Block Diagram (2 Marks):</strong> Two clearly labeled 8:1 blocks with inputs I0–I7 on one and I8–I15 on the other.</li>
                <li><strong className="text-white">Enable Connection (1 Mark):</strong> Inverter from S3 to upper Enable pin, direct line from S3 to lower Enable pin.</li>
                <li><strong className="text-white">Combining OR Gate (1 Mark):</strong> Connecting outputs Y1 and Y2 into a single OR gate.</li>
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
        topicId="topic-26-cascading"
        headline="Sukanta Hui's Board Advice on 16:1 Cascading"
        note="Remember the symmetry between Topic 25 and Topic 26: To make 8:1 from 4:1, you use S2 as chip select and S1, S0 as common select. To make 16:1 from 8:1, you use S3 as chip select and S2, S1, S0 as common select! The architecture is mathematically identical!"
      />
    </div>
  );
};

export default Topic26;
