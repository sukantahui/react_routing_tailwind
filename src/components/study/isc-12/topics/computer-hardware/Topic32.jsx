import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, ArrowRightLeft } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic32_faqs";

const Topic32 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [viewMode, setViewMode] = useState("demux"); // "demux" or "decoder"
  const [controlSignal, setControlSignal] = useState(true); // Enable E or Din
  const [bitA, setBitA] = useState(false);
  const [bitB, setBitB] = useState(false);

  const activeIdx = (bitA ? 2 : 0) + (bitB ? 1 : 0);
  const sigVal = controlSignal ? 1 : 0;
  const outputs = [0, 1, 2, 3].map((i) => (activeIdx === i ? sigVal : 0));

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 32
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Decoder with Enable as a Demultiplexer: Equivalence &amp; Realization
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Why a Decoder with an Enable Input is Structurally and Logically Identical to a Demultiplexer
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Pin-to-Pin Equivalence" },
              { id: "truthTable", label: "3. Comparative Truth Table & Schematic" },
              { id: "interactive", label: "4. Dual-Mode Interactive Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">The Fundamental Equivalence Principle</h2>
              <p className="text-xs text-slate-400">One physical hardware circuit performing two distinct architectural roles</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              In digital hardware engineering, a <strong className="text-cyan-400">Decoder with an Enable input (E)</strong> and a <strong className="text-emerald-400">Demultiplexer</strong> are the exact same physical circuit. The distinction is purely in how the user conceptually interprets the input signals:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/50 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Decoder Interpretation</span>
                <p className="text-xs text-slate-300">
                  • The binary address pins (<strong className="text-white">A1, A0</strong>) are the <strong className="text-indigo-400">Inputs</strong>.
                  <br />• The <strong className="text-white">Enable pin (E)</strong> acts as a master chip control switch.
                  <br />• Purpose: Binary-to-octal/decimal code translation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Demultiplexer Interpretation</span>
                <p className="text-xs text-slate-300">
                  • The <strong className="text-white">Enable pin (E)</strong> becomes the <strong className="text-emerald-400">Single Data Input (Din)</strong>.
                  <br />• The address pins become the <strong className="text-amber-400">Selection Lines (S1, S0)</strong>.
                  <br />• Purpose: Directing data from one source to one of many sinks.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical Equivalence Mapping</h2>
              <p className="text-xs text-slate-400">Direct term-for-term mathematical identity</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-indigo-400 font-bold">2-to-4 Line Decoder Output</th>
                    <th className="p-3 text-emerald-400 font-bold">1-to-4 Line Demultiplexer Output</th>
                    <th className="p-3 text-cyan-400 font-bold">Equivalence Substitution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 text-slate-300">D0 = E · A1&apos; · A0&apos;</td>
                    <td className="p-3 text-emerald-400">Y0 = Din · S1&apos; · S0&apos;</td>
                    <td className="p-3 text-slate-400">Substitute E → Din, A1 → S1, A0 → S0</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">D1 = E · A1&apos; · A0</td>
                    <td className="p-3 text-emerald-400">Y1 = Din · S1&apos; · S0</td>
                    <td className="p-3 text-slate-400">Identical 3-input AND gate</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">D2 = E · A1 · A0&apos;</td>
                    <td className="p-3 text-emerald-400">Y2 = Din · S1 · S0&apos;</td>
                    <td className="p-3 text-slate-400">Identical 3-input AND gate</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">D3 = E · A1 · A0</td>
                    <td className="p-3 text-emerald-400">Y3 = Din · S1 · S0</td>
                    <td className="p-3 text-slate-400">Identical 3-input AND gate</td>
                  </tr>
                </tbody>
              </table>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Comparative Truth Table &amp; Dual Schematic</h2>
              <p className="text-xs text-slate-400">Visual proof of structural identity</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. Unified Truth Table for Decoder &amp; Demultiplexer
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">Control: E / Din</th>
                    <th className="p-3 text-indigo-400 font-bold">Addr / Select: A1 / S1</th>
                    <th className="p-3 text-indigo-400 font-bold">Addr / Select: A0 / S0</th>
                    <th className="p-3 text-emerald-400 font-bold">D0 / Y0</th>
                    <th className="p-3 text-emerald-400 font-bold">D1 / Y1</th>
                    <th className="p-3 text-emerald-400 font-bold">D2 / Y2</th>
                    <th className="p-3 text-emerald-400 font-bold">D3 / Y3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-rose-400 font-bold">0</td>
                    <td className="p-3 text-slate-500">X</td>
                    <td className="p-3 text-slate-500">X</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1 (or Din)</td>
                    <td className="p-3 text-slate-300">0</td>
                    <td className="p-3 text-slate-300">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1 (Din)</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1 (or Din)</td>
                    <td className="p-3 text-slate-300">0</td>
                    <td className="p-3 text-slate-300">1</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1 (Din)</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1 (or Din)</td>
                    <td className="p-3 text-slate-300">1</td>
                    <td className="p-3 text-slate-300">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1 (Din)</td>
                    <td className="p-3 text-slate-500">0</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 text-emerald-400 font-bold">1 (or Din)</td>
                    <td className="p-3 text-slate-300">1</td>
                    <td className="p-3 text-slate-300">1</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-slate-500">0</td>
                    <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">1 (Din)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. Dual Identity Architecture Block
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 640 260" className="w-full max-w-xl h-auto select-none font-mono text-xs">
                {/* Central Block */}
                <rect x="220" y="40" width="200" height="160" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="320" y="90" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="14">HARDWARE CORE</text>
                <text x="320" y="115" fill="#a5b4fc" textAnchor="middle" fontSize="11">2 NOT + 4 AND Gates</text>

                <text x="320" y="145" fill="#38bdf8" textAnchor="middle" fontSize="10">DECODER with Enable</text>
                <text x="320" y="160" fill="#a78bfa" textAnchor="middle" fontSize="10">≡</text>
                <text x="320" y="175" fill="#10b981" textAnchor="middle" fontSize="10">DEMULTIPLEXER (1:4)</text>

                {/* Left Inputs */}
                <line x1="80" y1="80" x2="220" y2="80" stroke="#818cf8" strokeWidth="2" />
                <circle cx="80" cy="80" r="3.5" fill="#818cf8" />
                <text x="25" y="84" fill="#c7d2fe">A1 / S1 (MSB)</text>

                <line x1="80" y1="120" x2="220" y2="120" stroke="#818cf8" strokeWidth="2" />
                <circle cx="80" cy="120" r="3.5" fill="#818cf8" />
                <text x="25" y="124" fill="#c7d2fe">A0 / S0 (LSB)</text>

                <line x1="80" y1="160" x2="220" y2="160" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="80" cy="160" r="3.5" fill="#f59e0b" />
                <text x="35" y="164" fill="#fcd34d" fontWeight="bold">E / Din</text>

                {/* Right Outputs */}
                {[
                  { y: 65, name: "D0 / Y0" },
                  { y: 100, name: "D1 / Y1" },
                  { y: 135, name: "D2 / Y2" },
                  { y: 170, name: "D3 / Y3" }
                ].map((out, idx) => (
                  <g key={idx}>
                    <line x1="420" y1={out.y} x2="520" y2={out.y} stroke="#10b981" strokeWidth="2" />
                    <circle cx="520" cy={out.y} r="3.5" fill="#10b981" />
                    <text x="535" y={out.y + 4} fill="#6ee7b7" fontWeight="bold">{out.name}</text>
                  </g>
                ))}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Dual-Mode Interactive Inspector</h2>
              <p className="text-xs text-slate-400">Switch perspective between Decoder and Demultiplexer modes</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* VIEW MODE TOGGLE */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-slate-300">Interpretation Mode:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("decoder")}
                  className={clsx(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all border",
                    viewMode === "decoder" ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  Decoder Mode (E + Address)
                </button>
                <button
                  onClick={() => setViewMode("demux")}
                  className={clsx(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all border",
                    viewMode === "demux" ? "bg-emerald-600 text-white border-emerald-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  Demultiplexer Mode (Din + Select)
                </button>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400">
                  {viewMode === "decoder" ? "Enable (E):" : "Data In (Din):"}
                </span>
                <button
                  onClick={() => setControlSignal(!controlSignal)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    controlSignal ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  {controlSignal ? "1 (Active)" : "0 (Disabled)"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400">
                  {viewMode === "decoder" ? "Address (A1, A0):" : "Select (S1, S0):"}
                </span>
                <button
                  onClick={() => setBitA(!bitA)}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-800 border border-slate-700 text-slate-200"
                >
                  {viewMode === "decoder" ? "A1" : "S1"} = {bitA ? "1" : "0"}
                </button>
                <button
                  onClick={() => setBitB(!bitB)}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-800 border border-slate-700 text-slate-200"
                >
                  {viewMode === "decoder" ? "A0" : "S0"} = {bitB ? "1" : "0"}
                </button>
              </div>
            </div>

            {/* OUTPUTS */}
            <div className="grid sm:grid-cols-4 gap-3">
              {outputs.map((val, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-4 rounded-xl border text-center transition-all",
                    activeIdx === idx && controlSignal
                      ? "bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20"
                      : "bg-slate-900/40 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="text-xs font-mono text-slate-400 mb-1">
                    {viewMode === "decoder" ? "D" + idx : "Y" + idx}
                  </div>
                  <div className={clsx("text-3xl font-mono font-black mb-1", val === 1 ? "text-emerald-400 animate-pulse" : "text-slate-600")}>
                    {val}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {activeIdx === idx && controlSignal ? (
                      <span className="text-emerald-400 font-bold">● ACTIVE</span>
                    ) : (
                      "0"
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Decoder vs DEMUX Equivalence</h2>
              <p className="text-xs text-slate-400">Classic 2-mark and 3-mark conceptual question</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE Specimen Question</div>
              <p className="text-slate-200">
                &quot;How can a 3-to-8 line decoder with an Enable input be converted into a 1-to-8 line demultiplexer?&quot;
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
                <span className="font-bold text-emerald-400">Perfect 2-Mark Answer:</span>
                <p>1. Connect the single data input (Din) to the Enable input (E) of the decoder.</p>
                <p>2. Connect the three selection lines (S2, S1, S0) to the three address inputs (A, B, C) of the decoder.</p>
                <p>The 8 outputs (D0–D7) will then act as the 8 demultiplexer output channels!</p>
              </div>
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
        topicId="topic-32-equivalence"
        headline="Sukanta Hui's Insight on Digital Duality"
        note="Whenever you are asked in ISC boards whether a decoder can act as a demultiplexer, the answer is a resounding YES! The Enable pin is the secret key. If Enable is tied to logic 1, it's a Decoder. If Enable receives dynamic data pulses, it's a Demultiplexer. Same silicon, dual application!"
      />
    </div>
  );
};

export default Topic32;
